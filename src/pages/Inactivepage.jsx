import React, { useState, useEffect } from "react";
import axiosInstance from "../utlis/axiosinstance";
import toast from "react-hot-toast";
import formatDate from "../utlis/dateFormat";

const InactivePage = () => {
  const daysOptions = [7, 15 , 30 , 60 , 90];
const [days, setDays] = useState(7);
const [items, setItems] = useState([])

const loadInactiveItems = async () => {
  try {
    const res = await axiosInstance.get(`/inventory/not-ordered/${days}`);
    setItems(res.data.data);
  } catch (error) {
    toast.error("Failed to load inactive items");
  }
};
  useEffect(() => {
    loadInactiveItems();
  }, [days]);
  return (
    <div>
      <h2>Inactive Items</h2>
<label>Show items not ordered in last:</label>
<select value={days} onChange={(e) => setDays(Number(e.target.value))}>
  {daysOptions.map((m) => (
    <option key={m} value={m}>
      {m} Days
    </option>
  ))}
</select>


    <ul>
  {items.length === 0 && <p>No inactive items older than {days} min</p>}

  {items.map((item) => (
    <li key={item._id}>
      {item.itemName} —
      <span style={{ marginLeft: "10px", fontSize: "12px" }}>
        Last ordered: {formatDate(item.lastOrdered)}
      </span>
    </li>
  ))}
</ul>

    </div>  
  );
};

export default InactivePage;
