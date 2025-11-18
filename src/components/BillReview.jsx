import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BillReviewPopup = ({
  isOpen,
  items,
  billId,
  categories,
  onClose,
  onUpdateItems,
}) => {

  // Validation errors stored here
  const [errors, setErrors] = useState([]);

  if (!isOpen) return null;

  // Update any item field (cleanName or category)
  const handleFieldChange = (index, key, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    onUpdateItems(updated);
  };

  // Validation before confirm
  const validateItems = () => {
    console.log("validateing")
    const newErrors = [];

    items.forEach((item, index) => {
      // 1. cleanName required
      if (!item.cleanName || item.cleanName.trim() === "") {
        console.log("yajh tak agaya")
        newErrors.push({
          index,
          field: "cleanName",
          message: "Item name cannot be empty",
        });
      }

      // // 2. category required only if item is NEW
      // if (!item.matchedItemId && !item.categoryId) {
      //   console.log("dusre wale mai")
      //   newErrors.push({
      //     index,
      //     field: "categoryId",
      //     message: "Please select a category",
      //   });
      // }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Confirm button handler
  const handleConfirm = async () => {
    console.log("button clicked")
    if (!validateItems()) return toast.error("failed to validate");
const apiCall = async () =>{console.log("sending to bckend")
  
  await axios.post(`/bill/confirm/${billId}`, { items });
  
  alert("Items confirmed successfully!");
  console.log("resApi" , apiCall)
}
   
      apiCall();

      onClose(); // close popup

  };

  return (
    <div className="overlay">

      <div className="popup">
        <h2>Review Extracted Items</h2>

        {/* Main error message */}
        {errors.length > 0 && (
          <div className="popup-error-banner">
            Please fix highlighted fields before confirming.
          </div>
        )}

        {/* Item List */}
        {items.map((item, index) => {
          const hasNameError = errors.some(e => e.index === index && e.field === "cleanName");
          const hasCategoryError = errors.some(e => e.index === index && e.field === "categoryId");

          return (
            <div key={index} className="item-row">

              <div className="raw-text">{item.rawText}</div>

              <input
                className={hasNameError ? "error-input" : ""}
                value={item.cleanName}
                onChange={(e) => handleFieldChange(index, "cleanName", e.target.value)}
              />

              <select
                className={hasCategoryError ? "error-input" : ""}
                value={item.categoryId || ""}
                onChange={(e) => handleFieldChange(index, "categoryId", e.target.value)}
              >
                <option>Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>

              <div className="confidence">
                {(item.confidence * 100).toFixed(1)}%
              </div>
            </div>
          );
        })}

        <button onClick={handleConfirm} > 
        Confirm & Update</button>
        <button onClick={onClose}>Cancel</button>

      </div>
    </div>
  );
};

export default BillReviewPopup;
