import React, { useEffect, useState } from "react";
import axiosInstance from "../utlis/axiosinstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { User, Mail, Store, Package, AlertTriangle, Clock } from "lucide-react";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [not7, setNot7] = useState(0);
  const [not15, setNot15] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/profile/dashboard");
      const items7 = await axiosInstance.get(`/inventory/not-ordered/7`);
      const items15 = await axiosInstance.get(`/inventory/not-ordered/15`);

      setData(res.data);
      setNot7(items7.data.data.length);
      setNot15(items15.data.data.length);

    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f1217]">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-yellow-500 border-b-transparent"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f1217]">
        <div className="p-6 bg-[#1a1d23] border border-red-600 rounded-xl text-center">
          <div className="text-red-500 text-6xl mb-3">⚠️</div>
          <p className="text-red-400 text-lg font-semibold">No Data Available</p>
          <button
            onClick={fetchDashboardData}
            className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1217] text-gray-200 p-6">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-100">Dashboard Overview</h2>
        <div className="w-28 h-1 bg-yellow-500 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* USER INFO */}
      <div className="bg-[#1a1d23] border border-[#2a2e36] rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-yellow-500 flex items-center gap-2 mb-5">
          <User className="w-6 h-6" />
          User Information
        </h3>

        <div className="space-y-3">
          <div className="flex items-center bg-[#161a20] border border-[#2a2e36] rounded-lg p-3">
            <span className="w-24 text-gray-400">Name:</span>
            <span className="text-gray-200">{data.user.name}</span>
          </div>

          <div className="flex items-center bg-[#161a20] border border-[#2a2e36] rounded-lg p-3">
            <span className="w-24 text-gray-400">Email:</span>
            <span className="text-gray-200">{data.user.email}</span>
          </div>

          <div className="flex items-center bg-[#161a20] border border-[#2a2e36] rounded-lg p-3">
            <span className="w-24 text-gray-400">Shop:</span>
            <span className="text-gray-200">{data.user.shopName}</span>
          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* TOTAL ITEMS */}
        <div className="bg-[#1a1d23] border border-[#2a2e36] rounded-xl p-6 flex justify-between items-center hover:border-yellow-500 transition cursor-pointer">
          <div>
            <h4 className="text-lg font-semibold text-gray-300">Total Items</h4>
            <p className="text-4xl font-bold text-yellow-500 mt-2">
              {data.stats.totalItems}
            </p>
          </div>
          <Package className="w-14 h-14 text-yellow-500 opacity-80" />
        </div>

        {/* NOT ORDERED: 7 DAYS */}
        <div
          className="bg-[#1a1d23] border border-orange-600 rounded-xl p-6 flex justify-between items-center hover:bg-[#221c15] hover:border-yellow-500 transition cursor-pointer"
          onClick={() =>
            navigate("/stocks", { state: { filterDays: 7 } })
          }
        >
          <div>
            <h4 className="text-lg font-semibold text-gray-300">
              Not Ordered (7 days)
            </h4>
            <p className="text-4xl font-bold text-orange-500 mt-2">{not7}</p>
          </div>
          <Clock className="w-14 h-14 text-orange-500" />
        </div>

        {/* NOT ORDERED: 15 DAYS */}
        <div
          className="bg-[#1a1d23] border border-red-600 rounded-xl p-6 flex justify-between items-center hover:bg-[#221717] hover:border-yellow-500 transition cursor-pointer"
          onClick={() =>
            navigate("/stocks", { state: { filterDays: 15 } })
          }
        >
          <div>
            <h4 className="text-lg font-semibold text-gray-300">
              Not Ordered (15 days)
            </h4>
            <p className="text-4xl font-bold text-red-500 mt-2">{not15}</p>
          </div>
          <AlertTriangle className="w-14 h-14 text-red-500" />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
