import React, { useState } from "react";
import axiosInstance from "../utlis/axiosinstance.js";
import toast from "react-hot-toast";

const AddItemModel = ({ show, onClose, onAdded }) => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState("7");
  const [loading, setLoading] = useState(false);

  if (!show) return null; // IF NOT OPEN → return nothing

  const handleAdd = async () => {
    if (!itemName.trim()) {
      toast.error("Item name is required");
      return;
    }
    if (!category.trim()) {
      toast.error("Category is required");
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.post("/inventory/add", {
        itemName,
        category,
        frequency,
      });

      toast.success("Item Added");

      await onAdded();
      onClose(); // CLOSE POPUP

      setItemName("");
      setCategory("");
      setFrequency("7");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Add New Item</h3>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Item name"
            className="w-full border px-4 py-2 rounded-lg"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full border px-4 py-2 rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="number"
            placeholder="Frequency"
            className="w-full border px-4 py-2 rounded-lg"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />

          <div className="flex justify-between mt-4">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleAdd}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemModel;
