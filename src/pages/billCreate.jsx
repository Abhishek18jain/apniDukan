import React, { useState, useMemo, useRef, useEffect } from "react";
import axiosInstance from "../utlis/axiosinstance.js";
import toast from "react-hot-toast";
import AddItemModal from "../components/itemAddModel.jsx";
import CalculatorModal from "../components/calculatorModel.jsx";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

/**
 * BillCreate
 * - customerName, customerPhone optional
 * - items array
 * - + Add Item (opens modal)
 * - Calculator (opens full screen calculator)
 * - Highlight mode after apply amount
 * - Totals: subtotal, discount, total, paid, due
 */
export default function BillCreate() {
  const navigate = useNavigate();

  // customer
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // items in bill
  const [items, setItems] = useState([]); // {id,name,qty,unit,amount}
  const [showAddItem, setShowAddItem] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // calculator modal
  const [showCalculator, setShowCalculator] = useState(false);
  const [highlightMode, setHighlightMode] = useState(false);
  const [highlightAmount, setHighlightAmount] = useState(null);

  // totals
  const [discount, setDiscount] = useState(0);
  const [paid, setPaid] = useState(0);
  const notesRef = useRef("");

  // UI helpers
  const [loadingSave, setLoadingSave] = useState(false);

  // fetch customer previous due when phone changes
  const [prevBalance, setPrevBalance] = useState(0);
  useEffect(() => {
    const loadBalance = async () => {
      if (!customerPhone || customerPhone.trim().length < 3) {
        setPrevBalance(0);
        return;
      }
      try {
        const res = await axiosInstance.get(`/bills/customer-balance?phone=${encodeURIComponent(customerPhone)}`);
        setPrevBalance(res.data.balance || 0);
      } catch (err) {
        setPrevBalance(0);
      }
    };
    loadBalance();
  }, [customerPhone]);

  // derived totals
  const subtotal = useMemo(() => {
    return items.reduce((s, it) => s + Number(it.amount || 0), 0);
  }, [items]);

  const total = Math.max(0, subtotal - Number(discount || 0));
  const due = Math.max(0, total - Number(paid || 0));

  // Add item (from modal)
  const onAddItem = (item) => {
    if (editItem) {
      setItems((prev) => prev.map((p) => (p.id === editItem.id ? { ...item, id: editItem.id } : p)));
      setEditItem(null);
    } else {
      setItems((prev) => [...prev, { ...item, id: uuidv4() }]);
    }
    setShowAddItem(false);
  };

  // Edit existing item
  const onEditItem = (itemId) => {
    const it = items.find((x) => x.id === itemId);
    if (it) {
      setEditItem(it);
      setShowAddItem(true);
    }
  };

  // Delete item
  const onDeleteItem = (itemId) => {
    setItems((prev) => prev.filter((x) => x.id !== itemId));
  };

  // When calc applies amount -> enter highlight mode
  const onCalculatorApply = (value) => {
    setHighlightAmount(Number(value));
    setHighlightMode(true);
    setShowCalculator(false);
    // scroll-to-top or focus
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Apply highlight to existing item
  const applyToExistingItem = (itemId) => {
    setItems((prev) => prev.map((it) => {
      if (it.id === itemId) return { ...it, amount: highlightAmount };
      return it;
    }));
    // exit highlight
    setHighlightAmount(null);
    setHighlightMode(false);
  };

  // "Add as New Item" action when highlight active
  const openAddWithAmount = () => {
    setEditItem(null);
    setShowAddItem(true);
    // pass initial amount via editItem prop? We'll store in state
    setTimeout(() => {
      // open modal with prefilled amount via editItem temporary object
      setEditItem({ id: null, name: "", qty: 1, unit: "packet", amount: highlightAmount });
    }, 80);
    setHighlightMode(false);
    setHighlightAmount(null);
  };

  // Exit highlight
  const exitHighlight = () => {
    setHighlightMode(false);
    setHighlightAmount(null);
  };

  // Save bill flow
  const onSaveBill = async () => {
    if (items.length === 0) {
      toast.error("Add at least one item");
      return;
    }

    // if phone exists and prevBalance > 0 prompt confirm to add to account
    if (customerPhone && prevBalance > 0) {
      const ok = window.confirm(`Customer has previous due ₹${prevBalance}. Add this bill's due to their account? Press OK to continue or Cancel to abort.`);
      if (!ok) return;
    }

    setLoadingSave(true);
    try {
      const payload = {
        customerName,
        customerPhone,
        items: items.map(({ id, ...rest }) => rest),
        discount: Number(discount || 0),
        paid: Number(paid || 0),
notes: notesRef.current?.value || ""
      };

      const res = await axiosInstance.post("/bills/create", payload);
      toast.success("Bill saved");
      // optionally navigate to bills list
      navigate("/bills");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <div className="p-4 min-h-screen text-white">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Create Bill</h2>

        {/* Customer fields */}
        <div className="space-y-3 mb-4">
          <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer Name (optional)" className="w-full p-3 rounded-xl bg-[#0f172a] outline-none" />
          <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Mobile Number (optional)" className="w-full p-3 rounded-xl bg-[#0f172a] outline-none" />
          {customerPhone && prevBalance !== null && (
            <div className="text-sm text-gray-300">
              Previous balance: <span className="font-semibold text-yellow-300">₹{prevBalance}</span>
            </div>
          )}
        </div>

        {/* Items list header */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-medium">Items</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowAddItem(true)} className="bg-yellow-400 text-black px-3 py-1 rounded-lg">+ Add Item</button>
            <button onClick={() => setShowCalculator(true)} className="bg-[#0b1220] border border-gray-700 p-2 rounded-lg" title="Calculator">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 2h12v20H6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 6h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 11v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        {/* Items rows */}
        <div className="space-y-3 mb-4">
          {items.length === 0 && <div className="text-gray-400">No items yet. Tap “+ Add Item” or use Calculator and Apply Amount.</div>}
          {items.map((it) => (
            <div key={it.id} className={`bg-[#0b1220] p-3 rounded-xl flex items-center justify-between ${highlightMode ? "ring-2 ring-yellow-400" : ""}`}>
              <div className="flex-1 pr-3" onClick={() => editItem ? null : onEditItem(it.id)}>
                <div className="font-medium">{it.name || "Item"}</div>
                <div className="text-sm text-gray-400">{it.qty} {it.unit}</div>
              </div>

              <div className="text-right mr-3">
                <div className="font-semibold text-yellow-300">₹{it.amount || 0}</div>
                <div className="text-xs text-gray-400">row</div>
              </div>

              {/* If in highlight mode, clicking should apply highlight to this item */}
              {highlightMode ? (
                <button onClick={() => applyToExistingItem(it.id)} className="bg-green-600 text-black px-3 py-1 rounded-lg">Apply</button>
              ) : (
                <>
                  <button onClick={() => onEditItem(it.id)} className="bg-[#1f2937] px-2 py-1 rounded-md text-sm mr-2">Edit</button>
                  <button onClick={() => onDeleteItem(it.id)} className="bg-red-500 px-2 py-1 rounded-md text-sm">Delete</button>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Highlight floating action */}
        {highlightMode && (
          <div className="fixed left-0 right-0 bottom-24 flex justify-center z-40">
            <div className="bg-[#0b1220] p-3 rounded-xl flex items-center gap-3 shadow-xl">
              <div className="text-sm">Applied amount: <span className="font-semibold text-yellow-300">₹{highlightAmount}</span></div>
              <button onClick={openAddWithAmount} className="bg-yellow-400 text-black px-3 py-1 rounded-md">Add as New Item</button>
              <button onClick={exitHighlight} className="bg-gray-600 text-white px-3 py-1 rounded-md">X</button>
            </div>
          </div>
        )}

        {/* Totals */}
        <div className="bg-[#07111a] p-4 rounded-xl space-y-3 mb-6">
          <div className="flex justify-between">
            <div className="text-gray-400">Subtotal</div>
            <div>₹{subtotal}</div>
          </div>

          <div className="flex gap-3 items-center">
            <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value || 0))} className="flex-1 p-2 rounded-xl bg-[#0f172a]" placeholder="Discount" />
            <div className="whitespace-nowrap">- ₹{discount}</div>
          </div>

          <div className="flex justify-between font-semibold">
            <div>Total</div>
            <div>₹{total}</div>
          </div>

          <div className="flex gap-3 items-center">
            <input type="number" value={paid} onChange={(e) => setPaid(Number(e.target.value || 0))} className="flex-1 p-2 rounded-xl bg-[#0f172a]" placeholder="Paid" />
            <div className="whitespace-nowrap">Paid</div>
          </div>

          <div className="flex justify-between">
            <div className="text-gray-400">Due</div>
            <div className="text-yellow-300 font-semibold">₹{due}</div>
          </div>

          <div>
            <textarea ref={notesRef} placeholder="Notes (optional)" className="w-full p-2 rounded-xl bg-[#0f172a]" />
          </div>
        </div>

        {/* Save */}
        <div className="flex gap-3">
          <button onClick={onSaveBill} disabled={loadingSave} className="flex-1 bg-yellow-400 text-black py-3 rounded-xl font-semibold">Save Bill</button>
          <button onClick={() => { setItems([]); setDiscount(0); setPaid(0);}} className="bg-[#0b1220] border border-gray-700 px-4 py-3 rounded-xl">Clear</button>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
        <AddItemModal
          initial={editItem}
          amountPrefill={(editItem && editItem.amount) || (highlightMode ? highlightAmount : null)}
          onClose={() => { setShowAddItem(false); setEditItem(null); }}
          onSave={(item) => {
            // item: { name, qty, unit, amount }
            // If editItem.id exists -> replace
            if (editItem && editItem.id) {
              setItems((prev) => prev.map((p) => p.id === editItem.id ? { ...p, ...item } : p));
            } else {
              setItems((prev) => [...prev, { ...item, id: uuidv4() }]);
            }
            setShowAddItem(false);
            setEditItem(null);
            // exit highlight if it was active
            setHighlightMode(false);
            setHighlightAmount(null);
          }}
        />
      )}

      {/* Calculator Modal */}
      {showCalculator && (
        <CalculatorModal onClose={() => setShowCalculator(false)} onApply={onCalculatorApply} />
      )}
    </div>
  );
}
