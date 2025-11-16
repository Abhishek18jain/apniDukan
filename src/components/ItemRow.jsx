import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import AddItemModal from "../components/AddItemModal";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/items", {
        params: { search, category },
      });
      setItems(res.data.data);
    } catch (err) {
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [search, category]);

  const handleMarkOrdered = async (itemId) => {
    try {
      await axiosInstance.patch(`/items/${itemId}/date`);
      toast.success("Date updated ✅");
      fetchItems();
    } catch {
      toast.error("Failed to update date ❌");
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axiosInstance.delete(`/items/${itemId}`);
      toast.success("Item deleted 🗑️");
      setItems(items.filter((i) => i._id !== itemId));
    } catch {
      toast.error("Failed to delete item ❌");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-3 sm:mb-0">
          🧾 Inventory Management
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Item
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full sm:w-64 focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Categories</option>
          <option value="Snacks">Snacks</option>
          <option value="Beverages">Beverages</option>
          <option value="Groceries">Groceries</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center text-gray-500">Loading items...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-600 mt-6">No items found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Item Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-center">Frequency (days)</th>
                <th className="px-4 py-2 text-center">Last Ordered</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="px-4 py-2">{item.itemName}</td>
                  <td className="px-4 py-2">
                    {item.category?.name || "Uncategorized"}
                  </td>
                  <td className="px-4 py-2 text-center">{item.frequency}</td>
                  <td className="px-4 py-2 text-center">
                    {item.lastOrderedDate
                      ? new Date(item.lastOrderedDate).toLocaleDateString()
                      : "Never"}
                  </td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleMarkOrdered(item._id)}
                      className="px-2 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                    >
                      ✔ Ordered
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <AddItemModal onClose={() => setShowModal(false)} onAdd={fetchItems} />
      )}
    </div>
  );
};

export default Inventory;
