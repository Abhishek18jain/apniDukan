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
    } catch {
      toast.error("Failed to load inactive items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInactiveItems();
  }, [days]);

  // 👉 NEW FUNCTION: update lastOrdered on click
  const handleUpdate = async (id) => {
    try {
      await axiosInstance.patch(`/inventory/${id}/date`);

      // Remove updated item from the inactive list
      setItems(prev => prev.filter(i => i._id !== id));

      toast.success("Item marked as ordered");
    } catch {
      toast.error("Failed to update item");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1217] text-gray-200 p-5">

      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-100">Inactive Items</h2>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Filter Card */}
      <div className="bg-[#1a1d23] border border-[#2a2e36] rounded-xl p-5 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#161a20] border border-[#2a2e36] rounded-full flex items-center justify-center">
              <span className="text-yellow-500 text-2xl">⏰</span>
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-200">
                Show items not ordered in:
              </p>
              <p className="text-sm text-gray-400">Select timeframe</p>
            </div>
          </div>

          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-4 py-2 bg-[#161a20] border border-[#2a2e36] rounded-lg text-gray-200 focus:ring-2 focus:ring-yellow-500"
          >
            {daysOptions.map((d) => (
              <option key={d} value={d} className="bg-[#1a1d23]">
                {d} Days
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* Items Card */}
      <div className="bg-[#1a1d23] border border-[#2a2e36] rounded-xl p-6">

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-yellow-500 border-b-transparent"></div>
          </div>
        ) : items.length === 0 ? (
          // NO ITEMS
          <div className="text-center py-14">
            <div className="w-24 h-24 bg-[#161a20] border border-[#2a2e36] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-yellow-500 text-4xl">🎉</span>
            </div>

            <h3 className="text-2xl font-bold text-yellow-500 mb-2">
              All Good!
            </h3>

            <p className="text-gray-300 text-lg">
              No inactive items older than {days} days.
            </p>
            <p className="text-gray-500 mt-1">
              Everything is being ordered on time.
            </p>
          </div>
        ) : (
          <>
            {/* Summary */}
            <div className="flex justify-between items-center bg-[#161a20] border border-[#2a2e36] px-4 py-3 rounded-lg mb-4">
              <span className="font-semibold text-yellow-500">
                {items.length} inactive item{items.length !== 1 ? "s" : ""}
              </span>

              <span className="text-sm bg-yellow-500 text-black px-3 py-1 rounded-full font-medium">
                {days} days
              </span>
            </div>

            {/* LIST */}
            <div className="space-y-3">
              {items.map((item, i) => (
                <div
                  key={item._id}
                  onClick={() => handleUpdate(item._id)}
                  className="bg-[#161a20] border border-red-600 rounded-xl p-4 flex items-center justify-between hover:border-yellow-500 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div>
                    <h4 className="font-semibold text-lg text-gray-100">
                      {item.itemName}
                    </h4>

                    <p className="text-sm text-gray-400 flex items-center">
                      <span className="mr-2">📅</span>
                      Last ordered: {formatDate(item.lastOrdered)}
                    </p>
                  </div>

                  <div className="w-12 h-12 bg-[#1a1d23] border border-red-600 rounded-full flex items-center justify-center">
                    <span className="text-red-500 text-xl">⚠️</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InactivePage;
