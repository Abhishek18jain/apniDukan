import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../utlis/axiosinstance";
import toast from "react-hot-toast";
import AddItem from "../components/AddItemModel";
import formatDate from "../utlis/dateFormat";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTick, setActiveTick] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const [catPopup, setCatPopup] = useState({ open: false, category: null });
  const [newCatName, setNewCatName] = useState("");

  const [itemPopup, setItemPopup] = useState({ open: false, item: null });
  const [newItemName, setNewItemName] = useState("");

  const longPressTimer = useRef(null);

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/inventory/show");
      setItems(res.data.data);
    } catch {
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const uniqueCategories = [
    ...new Map(items.map((i) => [i.category._id, i.category])).values(),
  ];

  useEffect(() => {
    if (!selectedCategory && uniqueCategories.length > 0) {
      setSelectedCategory(uniqueCategories[0].name);
    }
  }, [uniqueCategories]);

  const filteredItems = items.filter(
    (i) => i.category.name === selectedCategory
  );

  const startLongPress = (cat) => {
    longPressTimer.current = setTimeout(() => {
      setCatPopup({ open: true, category: cat });
      setNewCatName(cat.name);
    }, 1200);
  };

  const cancelLongPress = () => clearTimeout(longPressTimer.current);

  const deleteCategory = async () => {
    try {
      const id = catPopup.category._id;

      await axiosInstance.delete(`/categories/${id}`);

      setItems((prev) => prev.filter((i) => i.category._id !== id));

      toast.success("Category deleted");
      setCatPopup({ open: false, category: null });
    } catch {
      toast.error("Failed");
    }
  };

  const saveCategoryEdit = async () => {
    try {
      const id = catPopup.category._id;

      await axiosInstance.put(`/categories/update/${id}`, {
        name: newCatName,
      });

      setItems((prev) =>
        prev.map((i) =>
          i.category._id === id
            ? { ...i, category: { ...i.category, name: newCatName } }
            : i
        )
      );

      toast.success("Updated");
      setCatPopup({ open: false, category: null });
    } catch {
      toast.error("Failed");
    }
  };

  const saveItemEdit = async () => {
    try {
      const id = itemPopup.item._id;
      await axiosInstance.put(`/inventory/update/${id}`, {
        itemName: newItemName,
      });

      setItems((prev) =>
        prev.map((i) => (i._id === id ? { ...i, itemName: newItemName } : i))
      );

      toast.success("Updated");
      setItemPopup({ open: false, item: null });
    } catch {
      toast.error("Failed");
    }
  };

  const handleTick = async (id) => {
    setActiveTick(id);

    try {
      const res = await axiosInstance.patch(`/inventory/${id}/date`);
      const updated = res.data.data;

      setItems((prev) =>
        prev.map((i) =>
          i._id === id ? { ...i, lastOrdered: updated.lastOrdered } : i
        )
      );
    } catch {
      toast.error("Failed to update");
    }

    setTimeout(() => setActiveTick(null), 900);
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete?")) return;

    try {
      await axiosInstance.delete(`/inventory/delete/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Failed");
    }
  };

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const navigate = useNavigate();
  const [showLogin, setShowLoginPopup] = useState(false);

  const handleProtectedClick = (path) => {
    if (!isLoggedIn) setShowLoginPopup(true);
    else navigate(path);
  };

  // LOADING SCREEN — DARK THEME
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f1217]">
        <div className="text-gray-300 text-lg animate-pulse">
          Loading inventory...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1217] text-gray-200 p-4">

      {/* LOGIN POPUP */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1a1d23] border border-[#2a2e36] p-6 rounded-xl w-[90%] max-w-sm">
            <p className="text-gray-200 text-lg mb-4 text-center">
              Please login first
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400"
              >
                Login
              </button>

              <button
                onClick={() => setShowLoginPopup(false)}
                className="px-5 py-2 bg-[#2a2e36] text-gray-200 rounded-lg hover:bg-[#3a3e46]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <h2 className="text-2xl font-bold text-center text-gray-100 mb-3">
        Inventory
      </h2>

      {/* BUTTONS */}
      <div className="flex justify-center mb-5 gap-3">
        <button
          onClick={() => setShowPopup(true)}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400"
        >
          + Add Item
        </button>

        <button
          onClick={() => handleProtectedClick("/stocks")}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400"
        >
          Stocks
        </button>
      </div>

      <AddItem show={showPopup} onClose={() => setShowPopup(false)} />

      {/* MAIN CARD */}
      <div className="bg-[#1a1d23] border border-[#2a2e36] rounded-xl overflow-hidden h-[70vh] flex">

        {/* LEFT: CATEGORIES */}
        <div className="w-1/3 border-r border-[#2a2e36] flex flex-col">
          <div className="p-3 border-b border-[#2a2e36] text-gray-300">
            <h3 className="font-semibold text-yellow-500">Categories</h3>
            <p className="text-xs text-gray-400">Tap or long press</p>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {uniqueCategories.map((cat) => (
              <div
                key={cat._id}
                onMouseDown={() => startLongPress(cat)}
                onMouseUp={cancelLongPress}
                onTouchStart={() => startLongPress(cat)}
                onTouchEnd={cancelLongPress}
                onClick={() => setSelectedCategory(cat.name)}
                className={`p-3 mb-2 rounded-lg cursor-pointer border border-[#2a2e36] 
                  ${
                    selectedCategory === cat.name
                      ? "bg-yellow-500 text-black"
                      : "bg-[#161a20] text-gray-200 hover:bg-[#1d2229]"
                  }`}
              >
                <span className="font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: ITEMS */}
        <div className="w-2/3 flex flex-col">
          <div className="p-3 border-b border-[#2a2e36]">
            <h3 className="font-semibold text-yellow-500">{selectedCategory}</h3>
            <p className="text-xs text-gray-400">
              {filteredItems.length} item
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-[#161a20] border border-[#2a2e36] p-3 rounded-lg"
              >
                <div className="flex justify-between items-center">

                  <label className="flex items-center space-x-3 flex-1 cursor-pointer">
                    <div
                      className={`w-5 h-5 border-2 rounded flex items-center justify-center
                        ${
                          activeTick === item._id
                            ? "bg-yellow-500 border-yellow-500 text-black"
                            : "border-gray-500"
                        }`}
                      onClick={() => handleTick(item._id)}
                    >
                      {activeTick === item._id && <span>✓</span>}
                    </div>

                    <span
                      className={`text-sm font-medium truncate ${
                        activeTick === item._id
                          ? "line-through text-yellow-500"
                          : "text-gray-200"
                      }`}
                    >
                      {item.itemName}
                    </span>
                  </label>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setNewItemName(item.itemName);
                        setItemPopup({ open: true, item });
                      }}
                      className="bg-yellow-500 text-black px-2 py-1 rounded text-xs hover:bg-yellow-400"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteItem(item._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-500"
                    >
                      Del
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  Last: {formatDate(item.lastOrdered)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORY MODAL */}
      {catPopup.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#1a1d23] p-5 border border-[#2a2e36] rounded-xl w-full max-w-xs">
            <h3 className="text-yellow-500 font-semibold mb-3">Edit Category</h3>

            <input
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="w-full p-2 bg-[#161a20] border border-[#2a2e36] rounded text-gray-200 outline-none"
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={saveCategoryEdit}
                className="flex-1 bg-yellow-500 text-black py-2 rounded-lg"
              >
                Save
              </button>

              <button
                onClick={deleteCategory}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg"
              >
                Delete
              </button>

              <button
                onClick={() => setCatPopup({ open: false, category: null })}
                className="flex-1 bg-[#2a2e36] text-gray-300 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ITEM MODAL */}
      {itemPopup.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#1a1d23] p-5 border border-[#2a2e36] rounded-xl max-w-xs w-full">
            <h3 className="text-yellow-500 font-semibold mb-3">Edit Item</h3>

            <input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="w-full p-2 bg-[#161a20] border border-[#2a2e36] rounded text-gray-200 outline-none"
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={saveItemEdit}
                className="flex-1 bg-yellow-500 text-black py-2 rounded-lg"
              >
                Save
              </button>

              <button
                onClick={() => setItemPopup({ open: false, item: null })}
                className="flex-1 bg-[#2a2e36] text-gray-300 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Inventory;
