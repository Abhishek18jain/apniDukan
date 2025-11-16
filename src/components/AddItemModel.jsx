import React, { useState } from "react";
import axiosInstance from "../utlis/axiosinstance.js";
import toast from "react-hot-toast";

const AddItemModel = ({ onAdded}) => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [frequency , setFrequency] = useState("7");

  const handleAdd = async () => {
    if (!itemName.trim()) {
      toast.error("please add item name");
      return;
    }
    try {
      const res = await axiosInstance.post("/inventory/add", {
        itemName,
        category,
      });
      toast.success("Item Added");
     await onAdded();
      setItemName("");
      setCategory("");
    } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Unknown error")
    }
  };

  return (
    <div>
      <h3>Add item</h3>

      <input
        type="text"
        placeholder="Item-Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        type="text"
        placeholder="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
        <input
        type="number"
        placeholder="Frequency"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      />
       <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddItemModel;
