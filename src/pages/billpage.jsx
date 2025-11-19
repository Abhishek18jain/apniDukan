import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utlis/axiosinstance";
import toast from "react-hot-toast";

const BillReviewPage = () => {
  const { billId } = useParams();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  // Fetch data when page loads
  useEffect(() => {
    const loadData = async () => {
      try {
        const [catRes, billRes] = await Promise.all([
          axiosInstance.get("/categories/all"),
          axiosInstance.get(`/bill/details/${billId}`)
        ]);

        setCategories(catRes.data.data || []);
        setItems(billRes.data.items || []);
      } catch (err) {
        toast.error("Failed to load bill data");
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [billId]);

  const handleFieldChange = (index, key, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    setItems(updated);
    
    // Clear error for this field when user starts typing
    setErrors(prev => prev.filter(e => !(e.index === index && e.field === key)));
  };

  const validateItems = () => {
    const newErrors = [];
    items.forEach((item, index) => {
      if (!item.cleanName || item.cleanName.trim() === "") {
        newErrors.push({ index, field: "cleanName" });
      }
    });
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleConfirm = async () => {
    if (!validateItems()) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    setSaving(true);
    try {
      await axiosInstance.post(`/bill/confirm/${billId}`, { items });
      toast.success("Bill items confirmed successfully!");
      navigate("/inventory");
    } catch (err) {
      toast.error("Failed to confirm items");
      console.error("Error confirming items:", err);
    } finally {
      setSaving(false);
    }
  };

  const getErrorMessage = (index, field) => {
    const error = errors.find(e => e.index === index && e.field === field);
    return error ? "This field is required" : "";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bill data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Review Your Bill</h1>
              <p className="text-gray-600 mt-1">Bill ID: {billId}</p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          </div>
        </div>

        {/* Bill Items */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Bill Items</h2>
            <div className="text-sm text-gray-600">
              {items.length} item{items.length !== 1 ? 's' : ''} found
            </div>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div 
                key={index} 
                className={`
                  border rounded-xl p-4 transition-all duration-200
                  ${errors.some(e => e.index === index) 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Item Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      value={item.cleanName}
                      onChange={(e) => handleFieldChange(index, "cleanName", e.target.value)}
                      className={`
                        w-full px-4 py-3 border rounded-lg transition-colors
                        ${errors.some(e => e.index === index && e.field === "cleanName")
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        }
                      `}
                      placeholder="Enter item name"
                    />
                    {errors.some(e => e.index === index && e.field === "cleanName") && (
                      <p className="mt-1 text-sm text-red-600">
                        {getErrorMessage(index, "cleanName")}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={item.categoryId || ""}
                      onChange={(e) => handleFieldChange(index, "categoryId", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Item Info */}
                {item.originalName && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Original:</span> {item.originalName}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={saving}
              className={`
                flex-1 px-6 py-3 rounded-xl font-semibold text-white
                transition-all duration-300
                ${saving 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-[1.02] active:scale-[0.98]'
                }
              `}
            >
              {saving ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Saving...</span>
                </div>
              ) : (
                'Confirm Items'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillReviewPage;