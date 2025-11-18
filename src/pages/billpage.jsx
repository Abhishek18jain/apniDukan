import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utlis/axiosinstance";
import axios from "axios";
import toast from "react-hot-toast";

const BillReviewPage = () => {
    console.log("lets review")
  const { billId } = useParams();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
   const navigate = useNavigate();

  // Fetch data when page loads
  useEffect(() => {

console.log("fetching")
    const loadData = async () => {
      try {
        const catRes = await axiosInstance.get("/categories/all");
        const billRes = await axiosInstance.get(`/bill/details/${billId}`);
// console.log(catRes.data.items)
// console.log(catRes.data.data)

        setCategories(catRes.data.data || []);

        setItems(billRes.data.items || []);

      } catch (err) {
        toast.error("Failed to load bill data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleFieldChange = (index, key, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    setItems(updated);
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
    if (!validateItems()) return toast.error("Fix errors before submitting");
console.log("one step away")
    await axiosInstance.post(`/bill/confirm/${billId}`, { items });
    console.log("atak gya")
    toast.success("Items confirmed!");
 
    console.log("success")
      navigate("/inventory")        
  };
   

  if (loading) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>Review Your Bill</h2>

      {items.map((item, index) => (
        <div key={index} className="item-row">
          <input
            value={item.cleanName}
            className={errors.some(e => e.index === index) ? "error" : ""}
            onChange={(e) => handleFieldChange(index, "cleanName", e.target.value)}
          />

          <select
            value={item.categoryId || ""}
            onChange={(e) => handleFieldChange(index, "categoryId", e.target.value)}
          >
            <option>Select Category</option>
            {categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
      ))}

      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default BillReviewPage;
