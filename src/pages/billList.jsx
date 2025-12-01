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

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="p-4 min-h-screen text-white bg-[#050b14]">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Bills</h2>

          <Link
            to="/bills/create"
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500"
          >
            + New Bill
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-[#0b1220] p-4 rounded-xl">
                <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Bills */}
        {!loading && list.length === 0 && (
          <div className="text-gray-400 text-center mt-10">
            No bills found.
          </div>
        )}

        <div className="space-y-3">
          {list.map((b) => (
            <Link
              to={`/bills/${b._id}`}
              key={b._id}
              className="block bg-[#0b1220] p-4 rounded-xl hover:bg-[#131c30] transition"
            >
              <div className="flex justify-between items-center">

                {/* Customer */}
                <div>
                  <div className="font-semibold text-lg">
                    {b.customerName || b.customerPhone || "Walk-in"}
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(b.createdAt).toLocaleString()}
                  </div>
                </div>

                {/* Amounts */}
                <div className="text-right">
                  <div className="font-bold text-yellow-300 text-lg">₹{b.total}</div>
                  <div className="text-sm text-gray-400">
                    Paid ₹{b.paid} | Due{" "}
                    <span className="text-red-400 font-semibold">₹{b.due}</span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
