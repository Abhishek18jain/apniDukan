import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../utlis/axiosinstance";
import toast from "react-hot-toast";
import AddItem from "../components/AddItemModel";
import formatDate from "../utlis/dateFormat";

const Inventory = () => {

  // ==============================
  // STATE
  // ==============================
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTick, setActiveTick] = useState(null);

  // CATEGORY POPUP (edit/delete)
  const [catPopup, setCatPopup] = useState({ open: false, category: null });
  const [newCatName, setNewCatName] = useState("");

  // ITEM POPUP (edit only)
  const [itemPopup, setItemPopup] = useState({ open: false, item: null });
  const [newItemName, setNewItemName] = useState("");
const [frequency , setFrequency] = useState("7");
  const longPressTimer = useRef(null);

  // ==============================
  // LOAD ALL ITEMS
  // ==============================
  const loadItems = async () => {
    try {
      const res = await axiosInstance.get("/inventory/show");
      setItems(res.data.data);
    } catch {
      toast.error("Failed to load items");
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
  // LONG PRESS START
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
  // DELETE CATEGORY
  // ==============================
  const deleteCategory = async () => {
    const id = catPopup.category._id;

    try {
      await axiosInstance.delete(`/categories/${id}`);
      setItems((prev) =>
        prev.filter((item) => item.category._id !== id)
      );
      toast.success("Category deleted");
      setCatPopup({ open: false, category: null });
    } catch {
      toast.error("Failed to delete category");
    }
  };

  // ==============================
  // EDIT CATEGORY
  // ==============================
  const saveCategoryEdit = async () => {
    const id = catPopup.category._id;

    try {
      await axiosInstance.put(`/categories/update/${id}`, {
        name: newCatName,
      });

      // Update UI
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
  // EDIT ITEM
  // ==============================
  const saveItemEdit = async () => {
    const id = itemPopup.item._id;

    try {
      await axiosInstance.put(`/inventory/update/${id}`, {
        itemName: newItemName,
      });

      setItems((prev) =>
        prev.map((i) =>
          i._id === id ? { ...i, itemName: newItemName } : i
        )
      );

      toast.success("Item updated");
      setItemPopup({ open: false, item: null });
    } catch {
      toast.error("Failed to edit item");
    }
  };

  // ==============================
  // UPDATE DATE (CHECKBOX)
  // ==============================
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

  // ==============================
  // DELETE ITEM
  // ==============================
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
  // UI
  // ==============================
  return (
    <div>
      <h2>Inventory</h2>

      <AddItem onAdded={loadItems} />

      {/* CATEGORY EDIT/DELETE POPUP */}
      {catPopup.open && (
        <div style={{ border: "1px solid black", padding: 20 }}>
          <h3>Edit Category</h3>
          <input
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
          />
          <button onClick={saveCategoryEdit}>Save</button>
          <button onClick={deleteCategory}>Delete</button>
          <button onClick={() => setCatPopup({ open: false, category: null })}>
            Cancel
          </button>
        </div>
      )}

      {/* ITEM EDIT POPUP */}
      {itemPopup.open && (
        <div style={{ border: "1px solid black", padding: 20 }}>
          <h3>Edit Item</h3>
          <input
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
            <input
            value={setFrequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
          <button onClick={saveItemEdit}>Save</button>
          <button onClick={() => setItemPopup({ open: false, item: null })}>
            Cancel
          </button>
        </div>
      )}

      {/* CATEGORY LIST */}
      <ul>
        {uniqueCategories.map((cat) => (
          <li
            key={cat._id}
            onMouseDown={() => startLongPress(cat)}
            onMouseUp={cancelLongPress}
            onClick={() => setSelectedCategory(cat.name)}
            style={{ cursor: "pointer" }}
          >
            {cat.name}
          </li>
        ))}
      </ul>

      <hr />

      {/* ITEMS LIST */}
      <ul>
        {filteredItems.map((item) => (
          <li key={item._id}>
            <input
              type="checkbox"
              checked={activeTick === item._id}
              onChange={() => handleTick(item._id)}
            />

            {/* ITEM NAME */}
            {item.itemName}
             {/* DATE */}
            <span style={{ marginLeft: 10 }}>
              {formatDate(item.lastOrdered)}
            </span>

            {/* EDIT ITEM BUTTON */}
            <button
              onClick={() => {
                setNewItemName(item.itemName);
                setItemPopup({ open: true, item });
              }}
            >
              ✏️
            </button>
            {/* DELETE ITEM */}
            <button onClick={() => deleteItem(item._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
