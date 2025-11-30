import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utlis/axiosinstance";
import toast from "react-hot-toast";

export default function BillDetails() {
  const { id } = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    fetchBill();
  }, []);

  const fetchBill = async () => {
    try {
      const res = await axiosInstance.get(`/bills/${id}`);
      setBill(res.data.bill);
    } catch (err) {
      toast.error("Failed to load bill");
      console.log(err);
    }
  };

  if (!bill) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return (
    <div className="p-6 text-white min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Bill Details</h1>
        <Link to="/bills" className="text-gray-300 underline">Back</Link>
      </div>

      {/* BILL CARD */}
      <div className="bg-[#0b1220] p-4 rounded-xl space-y-4">

        {/* CUSTOMER */}
        <div>
          <div className="text-lg font-semibold">{bill.customerName || "Walk-in Customer"}</div>
          <div className="text-gray-400 text-sm">{bill.customerPhone || ""}</div>
        </div>

        {/* DATE */}
        <div className="text-gray-400 text-sm">
          Date: {new Date(bill.createdAt).toLocaleString()}
        </div>

        {/* ITEMS LIST */}
        <div className="mt-4">
          <h2 className="font-semibold mb-2">Items</h2>

          {bill.items.map((item, i) => (
            <div key={i} className="bg-[#0f172a] p-3 rounded-xl mb-2 flex justify-between">
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-400 text-sm">
                  {item.qty} {item.unit} × ₹{item.amount}
                </div>
              </div>

              <div className="font-bold text-yellow-300">
                ₹{item.qty * item.amount}
              </div>
            </div>
          ))}
        </div>

        {/* TOTALS */}
        <div className="mt-6 space-y-1 border-t border-gray-700 pt-4">
          <div className="flex justify-between text-gray-300">
            <span>Subtotal</span>
            <span>₹{bill.subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Discount</span>
            <span>₹{bill.discount}</span>
          </div>
          <div className="flex justify-between text-white text-lg font-bold">
            <span>Total</span>
            <span>₹{bill.total}</span>
          </div>
          <div className="flex justify-between text-green-300 font-semibold">
            <span>Paid</span>
            <span>₹{bill.paid}</span>
          </div>
          <div className="flex justify-between text-red-300 font-semibold">
            <span>Due</span>
            <span>₹{bill.due}</span>
          </div>
        </div>

        {/* NOTES */}
        {bill.notes && (
          <div className="mt-6 bg-[#0f172a] p-3 rounded-xl text-gray-300 text-sm">
            <div className="font-semibold text-white mb-1">Notes:</div>
            {bill.notes}
          </div>
        )}

      </div>

    </div>
  );
}
