import React, { useEffect, useState } from "react";
import axiosInstance from "../utlis/axiosinstance";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const res = await axiosInstance.get("/profile/dashboard");
      setData(res.data);
    } catch (error) {
      toast.error("Failed to load dashboard Data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-200 rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <p className="text-red-500 text-xl font-medium">No data available</p>
          <button 
            onClick={fetchDashboardData}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Header */}
      <div className="mb-6 transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Dashboard Overview
        </h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-blue-500 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 hover:rotate-12">
            <span className="text-2xl">👤</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">User Information</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-blue-50 rounded-lg transition-colors duration-200 hover:bg-blue-100">
            <span className="font-medium text-gray-700 w-20">Name:</span>
            <span className="text-gray-900">{data.user.name}</span>
          </div>
          <div className="flex items-center p-3 bg-blue-50 rounded-lg transition-colors duration-200 hover:bg-blue-100">
            <span className="font-medium text-gray-700 w-20">Email:</span>
            <span className="text-gray-900">{data.user.email}</span>
          </div>
          <div className="flex items-center p-3 bg-blue-50 rounded-lg transition-colors duration-200 hover:bg-blue-100">
            <span className="font-medium text-gray-700 w-20">Shop:</span>
            <span className="text-gray-900">{data.user.shopName}</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Total Items Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 transform transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Total Items</h4>
              <p className="text-3xl font-bold text-green-600">{data.stats.totalItems}</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-12">
              <span className="text-2xl">📦</span>
            </div>
          </div>
        </div>

        {/* Inactive Items Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 transform transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Not Ordered (7 days)</h4>
                <p className="text-2xl font-bold text-orange-600">{data.stats.notOrdered7}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-12">
                <span className="text-xl">⏰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500 transform transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Not Ordered (15 days)</h4>
                <p className="text-2xl font-bold text-red-600">{data.stats.notOrdered15}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-12">
                <span className="text-xl">🚨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;