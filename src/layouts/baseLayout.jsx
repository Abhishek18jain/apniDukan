import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const BaseLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          🏪 Smart Inventory
        </h1>

        <div className="space-x-4">
          <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/inventory" className="hover:text-blue-600">Inventory</Link>
          <Link to="/stocks" className="hover:text-blue-600">Stocks</Link>
          <Link to="/upload" className="hover:text-blue-600">Upload</Link>

      
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 font-semibold"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white p-3 text-center shadow-inner text-gray-500 text-sm">
        © {new Date().getFullYear()} Smart Inventory System
      </footer>
    </div>
  );
};

export default BaseLayout;
