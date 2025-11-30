import React, { useEffect, useState } from "react";
import axiosInstance from "../utlis/axiosinstance.js";
import { Link } from "react-router-dom";

export default function BillsList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/bills");
      setList(res.data.list || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  return (
    <div className="p-4 min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-4">Bills</h2>
      {loading && <div>Loading...</div>}
      <div className="space-y-3">
        {list.map(b => (
          <Link to={`/bills/${b._id}`} key={b._id} className="block bg-[#0b1220] p-4 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{b.customerName || b.customerPhone || "Walk-in"}</div>
                <div className="text-sm text-gray-400">{new Date(b.createdAt).toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">₹{b.total}</div>
                <div className="text-sm text-gray-400">Paid ₹{b.paid} | Due ₹{b.due}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
