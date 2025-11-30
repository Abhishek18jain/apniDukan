import React, { useEffect, useState } from "react";
import axiosInstance from "../utlis/axiosinstance.js";
/**
 * Props:
 * - initial: optional { id, name, qty, unit, amount } OR null
 * - amountPrefill: number or null
 * - onClose()
 * - onSave(item) -> item: { name, qty, unit, amount }
 */
export default function AddItemModal({ initial = null, amountPrefill = null, onClose, onSave }) {
  const [name, setName] = useState(initial?.name || "");
  const [qty, setQty] = useState(initial?.qty ?? 1);
  const [form, setForm] = useState({ name: initial?.name || "" });
  const [unit, setUnit] = useState(initial?.unit || "packet");
  const [suggestions, setSuggestions] = useState([]);

  const [amount, setAmount] = useState(initial?.amount ?? (amountPrefill ?? 0));

  useEffect(() => {
    if (amountPrefill != null && (initial == null || initial.amount == null)) {
      setAmount(amountPrefill);
    }
  }, [amountPrefill]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Enter item name");
      return;
    }
    onSave({ name: name.trim(), qty: Number(qty || 1), unit: unit || "", amount: Number(amount || 0) });
  };
const onSearchItem = async (name) => {
  setName(name);

  if (!name.trim()) {
    setSuggestions([]);
    return;
  }

  try {
    const res = await axiosInstance.get(`/inventory/search?query=${name}`);
    setSuggestions(res.data.items || []);
  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[#071422] w-full max-w-md rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Add Item</h3>
          <button onClick={onClose} className="text-gray-300">Close</button>
        </div>

        <form onSubmit={submit} className="space-y-3">
        <input
  className="bg-[#0f172a] p-3 rounded-xl w-full"
  placeholder="Item Name"
  value={name}
  onChange={(e) => onSearchItem(e.target.value)}
/>
{suggestions.length > 0 && (
  <div className="bg-[#0f172a] rounded-xl mt-1 p-2 max-h-40 overflow-y-auto">
    {suggestions.map((it) => (
      <div
        key={it._id}
        onClick={() => {
          setName(it.itemName);
          setSuggestions([]);
        }}
        className="p-2 hover:bg-[#1a2335] cursor-pointer "
      >
        {it.itemName}
      </div>
    ))}
  </div>
)}



          <div className="flex gap-2">
            <input type="number" value={qty} onChange={(e)=>setQty(e.target.value)} className="flex-1 p-3 rounded-xl bg-[#0f172a]" placeholder="Qty" />
            <select value={unit} onChange={(e)=>setUnit(e.target.value)} className="p-3 rounded-xl bg-[#0f172a]">
              <option value="packet">packet</option>
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="ltr">ltr</option>
              <option value="pcs">pcs</option>
            </select>
          </div>
          <input value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Amount" className="w-full p-3 rounded-xl bg-[#0f172a]" />

          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-yellow-400 text-black p-3 rounded-xl">Add Item</button>
            <button type="button" onClick={onClose} className="flex-1 bg-[#0b1220] p-3 rounded-xl border">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
