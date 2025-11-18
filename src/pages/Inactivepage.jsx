import React, { useState, useEffect } from "react";
import axiosInstance from "../utlis/axiosinstance";
import toast from "react-hot-toast";
import formatDate from "../utlis/dateFormat";

const InactivePage = () => {
  const daysOptions = [7, 15, 30, 60, 90];
  const [days, setDays] = useState(7);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadInactiveItems = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/inventory/not-ordered/${days}`);
      setItems(res.data.data);
    } catch (error) {
      toast.error("Failed to load inactive items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInactiveItems();
  }, [days]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      {/* Header */}
      <div className="mb-6 transform transition-all duration-300">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Inactive Items
        </h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 hover:rotate-12">
              <span className="text-xl">⏰</span>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Show items not ordered in last:
              </label>
              <p className="text-sm text-gray-500">Select time period to filter</p>
            </div>
          </div>
          
          <select 
            value={days} 
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 outline-none bg-white shadow-sm"
          >
            {daysOptions.map((m) => (
              <option key={m} value={m}>
                {m} Days
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 transform transition-all duration-500">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110">
              <span className="text-4xl">🎉</span>
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Great News!</h3>
            <p className="text-gray-600 text-lg">
              No inactive items older than {days} days
            </p>
            <p className="text-gray-500 mt-2">All items are being ordered regularly</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4 p-3 bg-orange-50 rounded-lg">
              <span className="font-semibold text-orange-800">
                Found {items.length} inactive item{items.length !== 1 ? 's' : ''}
              </span>
              <span className="text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                {days} days
              </span>
            </div>
            
            {items.map((item, index) => (
              <div 
                key={item._id}
                className="bg-gray-50 rounded-xl p-4 border-l-4 border-red-500 transform transition-all duration-300 hover:scale-105 hover:shadow-md"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-lg mb-1">
                      {item.itemName}
                    </h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📅</span>
                      Last ordered: {formatDate(item.lastOrdered)}
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center ml-4 transition-transform duration-300 hover:rotate-12">
                    <span className="text-red-500">⚠️</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InactivePage;