import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../utlis/axiosinstance.js"
import BillReviewPopup from "../components/BillReview.jsx";

const UploadBill = () => {
  // Local states
  const [file, setFile] = useState(null);

  // Popup states
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [billId, setBillId] = useState(null);

  // Categories stored in parent (loaded once)
  const [categories, setCategories] = useState([]);

  // Fetch categories on page load
  useEffect(() => {
    console.log("calling categories")
  axiosInstance.get("/categories/all")
      .then(res => setCategories(res.data.categories))
      .catch(err => console.log("Category Fetch Error:", err));
  }, []);

  // Upload handler
  const handleUpload = async () => {
    console.log("button clicked")
    if (!file) return alert("Please select a bill before uploading.");

    const form = new FormData();
    form.append("bill", file);

    try {
      console.log("biil uploading api called")
      const res = await axiosInstance.post("/bill/upload", form, { headers: { "Content-Type": "multipart/form-data"}});
      console.log("ITEMS RECEIVED:", res.data.data);

      // Extract from backend
      setItems(res.data.data);        // extracted OCR items
      setBillId(res.data.billId);     // bill ID from backend
      setIsOpen(true);                // open popup

      alert("Bill uploaded successfully! Please review items.");

    } catch (error) {
      console.log("prinitng error", error);

      alert("Bill upload failed.");
    }
  };

  return (
    <div>
      <h2>Upload Bill</h2>

      {/* File selector */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload bill</button>

      {/* Popup */}
      <BillReviewPopup
        isOpen={isOpen}
        items={items}
        billId={billId}
        categories={categories}
        onClose={() => setIsOpen(false)}
        onUpdateItems={setItems}
      />
    </div>
  );
};

export default UploadBill;
