import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../utlis/axiosinstance";
import toast from "react-hot-toast";
import AddItem from "../components/AddItemModel";
import formatDate from "../utlis/dateFormat";

const Inventory = () => {
  console.log("called me ")
  // ==============================
  // STATE
  // ==============================
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTick, setActiveTick] = useState(null);
  const [loading, setLoading] = useState(true);

  // CATEGORY POPUP (edit/delete)
  const [catPopup, setCatPopup] = useState({ open: false, category: null });
  const [newCatName, setNewCatName] = useState("");

  // ITEM POPUP (edit only)
  const [itemPopup, setItemPopup] = useState({ open: false, item: null });
  const [newItemName, setNewItemName] = useState("");
  const [frequency, setFrequency] = useState("7");

  const longPressTimer = useRef(null);

  // ==============================
  // LOAD ALL ITEMS
  // ==============================
  const loadItems = async () => {
    console.log("checking")
    setLoading(true);
    try {
      const res = await axiosInstance.get("/inventory/show");
      setItems(res.data.data);
      console.log(
        "done"
      )
    } catch {
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // ==============================
  // UNIQUE CATEGORIES
  // ==============================
  const uniqueCategories = [
    ...new Map(items.map((i) => [i.category._id, i.category])).values(),
  ];

  useEffect(() => {
    if (!selectedCategory && uniqueCategories.length > 0) {
      setSelectedCategory(uniqueCategories[0].name);
    }
  }, [uniqueCategories]);

  // ==============================
  // FILTER ITEMS BY CATEGORY
  // ==============================
  const filteredItems = items.filter(
    (i) => i.category.name === selectedCategory
  );

  // ==============================
  // LONG PRESS HANDLERS
  // ==============================
  const startLongPress = (category) => {
    longPressTimer.current = setTimeout(() => {
      setCatPopup({ open: true, category });
      setNewCatName(category.name);
    }, 1500);
  };

  const cancelLongPress = () => {
    clearTimeout(longPressTimer.current);
  };

  // ==============================
  // CATEGORY OPERATIONS
  // ==============================
  const deleteCategory = async () => {
    const id = catPopup.category._id;
    try {
      await axiosInstance.delete(`/categories/${id}`);
      setItems((prev) => prev.filter((item) => item.category._id !== id));
      toast.success("Category deleted");
      setCatPopup({ open: false, category: null });
    } catch {
      toast.error("Failed to delete category");
    }
  };

  const saveCategoryEdit = async () => {
    const id = catPopup.category._id;
    try {
      await axiosInstance.put(`/categories/update/${id}`, {
        name: newCatName,
      });

      setItems((prev) =>
        prev.map((item) =>
          item.category._id === id
            ? { ...item, category: { ...item.category, name: newCatName } }
            : item
        )
      );

      toast.success("Category updated");
      setCatPopup({ open: false, category: null });
    } catch {
      toast.error("Failed to edit category");
    }
  };

  // ==============================
  // ITEM OPERATIONS
  // ==============================
  const saveItemEdit = async () => {
    const id = itemPopup.item._id;
    try {
      await axiosInstance.put(`/inventory/update/${id}`, {
        itemName: newItemName,
      });

      setItems((prev) =>
        prev.map((i) => (i._id === id ? { ...i, itemName: newItemName } : i))
      );

      toast.success("Item updated");
      setItemPopup({ open: false, item: null });
    } catch {
      toast.error("Failed to edit item");
    }
  };

  const handleTick = async (id) => {
    setActiveTick(id);
    try {
      const res = await axiosInstance.patch(`/inventory/${id}/date`);
      const updated = res.data.data;

      setItems((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, lastOrdered: updated.lastOrdered }
            : item
        )
      );
    } catch {
      toast.error("Failed to update date");
    }
    setTimeout(() => setActiveTick(null), 1000);
  };

  const deleteItem = async (id) => {
    const ok = window.confirm("Delete this item?");
    if (!ok) return;

    try {
      await axiosInstance.delete(`/inventory/delete/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success("Item deleted");
    } catch {
      toast.error("Failed to delete item");
    }
  };

  // ==============================
  // RENDER
  // ==============================
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-200 rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2">
      {/* Header */}
      <div className="mb-4 transform transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
          Inventory
        </h2>
        <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      {/* Add Item Button */}
      <div className="flex justify-center mb-3">
        <AddItem onAdded={loadItems} />
      </div>

      {/* Main Content - Side by Side Columns */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-row h-[70vh]">
          
          {/* Left Column - Categories (Fixed Width) */}
          <div className="w-2/5 border-r border-gray-200 bg-gray-50 flex flex-col">
            <div className="p-3 border-b border-gray-200 bg-white flex-shrink-0">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <span className="mr-1">📦</span>
                Categories
              </h3>
              <p className="text-xs text-gray-600 mt-1">Tap to view items</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
              {uniqueCategories.map((cat, index) => (
                <div
                  key={cat._id}
                  onMouseDown={() => startLongPress(cat)}
                  onMouseUp={cancelLongPress}
                  onTouchStart={() => startLongPress(cat)}
                  onTouchEnd={cancelLongPress}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`p-3 mb-1 rounded-lg cursor-pointer transform transition-all duration-200 hover:scale-102 ${
                    selectedCategory === cat.name
                      ? "bg-blue-500 text-white shadow-md scale-102"
                      : "bg-white text-gray-800 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm truncate">{cat.name}</span>
                    {selectedCategory === cat.name && (
                      <span className="text-xs bg-white text-blue-500 px-1 py-0.5 rounded-full animate-pulse">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Items (Flexible Width) */}
          <div className="w-3/5 flex flex-col">
            <div className="p-3 border-b border-gray-200 flex-shrink-0">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <span className="mr-1">🛍️</span>
                <span className="truncate">{selectedCategory || "Select Category"}</span>
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
              </p>
            </div>

            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 text-center p-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">📝</span>
                </div>
                <h4 className="text-base font-semibold text-gray-700 mb-1">No Items</h4>
                <p className="text-gray-500 text-sm">Add items to this category</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-2">
                  {filteredItems.map((item, index) => (
                    <div
                      key={item._id}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200 transform transition-all duration-200 hover:scale-102"
                    >
                      <div className="flex items-center justify-between">
                        {/* Checkbox and Item Name */}
                        <label className="flex items-center space-x-2 cursor-pointer flex-1 min-w-0">
                          <div className="relative flex-shrink-0">
                            <input
                              type="checkbox"
                              checked={activeTick === item._id}
                              onChange={() => handleTick(item._id)}
                              className="hidden"
                            />
                            <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                              activeTick === item._id
                                ? "bg-green-500 border-green-500 scale-110"
                                : "border-gray-400 hover:border-gray-600"
                            }`}>
                              {activeTick === item._id && (
                                <span className="text-white text-xs font-bold animate-bounce">✓</span>
                              )}
                            </div>
                          </div>
                          
                          {/* Item Name */}
                          <span className={`font-medium text-sm truncate flex-1 ${
                            activeTick === item._id ? "text-green-600 line-through" : "text-gray-800"
                          } transition-all duration-300`}>
                            {item.itemName}
                          </span>
                        </label>

                        {/* Action Buttons */}
                        <div className="flex space-x-1 ml-2 flex-shrink-0">
                          <button
                            onClick={() => {
                              setNewItemName(item.itemName);
                              setItemPopup({ open: true, item });
                            }}
                            className="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center transition-all duration-200 hover:bg-blue-200 text-xs"
                            title="Edit item"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => deleteItem(item._id)}
                            className="w-6 h-6 bg-red-100 text-red-600 rounded flex items-center justify-center transition-all duration-200 hover:bg-red-200 text-xs"
                            title="Delete item"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>

                      {/* Last Ordered Date */}
                      <div className="mt-1 text-xs text-gray-500 flex items-center truncate">
                        <span className="mr-1">📅</span>
                        Last: {formatDate(item.lastOrdered)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CATEGORY EDIT/DELETE MODAL */}
      {catPopup.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-4 max-w-xs w-full transform transition-all duration-300">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">📝</span>
              Edit Category
            </h3>
            <input
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none mb-3 text-sm"
              placeholder="Category name"
            />
            <div className="flex space-x-2">
              <button
                onClick={saveCategoryEdit}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-green-600 text-sm"
              >
                Save
              </button>
              <button
                onClick={deleteCategory}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-red-600 text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => setCatPopup({ open: false, category: null })}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-600 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ITEM EDIT MODAL */}
      {itemPopup.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-4 max-w-xs w-full transform transition-all duration-300">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">✏️</span>
              Edit Item
            </h3>
            <input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none mb-3 text-sm"
              placeholder="Item name"
            />
            <div className="flex space-x-2">
              <button
                onClick={saveItemEdit}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-green-600 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setItemPopup({ open: false, item: null })}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-600 text-sm"
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