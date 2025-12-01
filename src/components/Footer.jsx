import React from 'react'
import { Store, Smartphone, Globe, ShieldCheck, } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Footer = () => {
    const navigate = useNavigate();
  return (
   <footer className="bg-gray-900 text-white px-6 pt-20 pb-10">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">

      {/* Branding + CTA */}
      <div className="col-span-2">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight">MyShop</span>
        </div>

        <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
          Smart bill scanning and inventory management — built for Indian grocery stores.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-fit mb-6"
        >
          Register
        </button>

        <div className="flex space-x-3">
          {[Smartphone, Globe, ShieldCheck].map((Icon, i) => (
            <div
              key={i}
              className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition cursor-pointer"
            >
              <Icon className="w-5 h-5 text-gray-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h4 className="font-semibold mb-4 text-lg">Features</h4>
        <ul className="space-y-3 text-sm text-gray-400">
          <li><button onClick={() => navigate("/upload")} className="hover:text-white transition">Bill Scan</button></li>
          <li><button onClick={() => navigate("/inventory")} className="hover:text-white transition">Inventory</button></li>
          <li><button className="hover:text-white transition">Auto Stock Update</button></li>
          <li><button className="hover:text-white transition">Stocks</button></li>
        </ul>
      </div>

      {/* Help */}
      <div>
        <h4 className="font-semibold mb-4 text-lg">Help</h4>
        <ul className="space-y-3 text-sm text-gray-400">
          <li><button className="hover:text-white transition">Chat Support</button></li>
          <li><button className="hover:text-white transition">Call Support</button></li>
          <li><button className="hover:text-white transition">Community</button></li>
          <li><button className="hover:text-white transition">Status</button></li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h4 className="font-semibold mb-4 text-lg">Company</h4>
        <ul className="space-y-3 text-sm text-gray-400">
          <li><button className="hover:text-white transition">About Us</button></li>
          <li><button className="hover:text-white transition">Career</button></li>
          <li><button className="hover:text-white transition">Privacy</button></li>
          <li><button className="hover:text-white transition">Terms & Conditions</button></li>
        </ul>
      </div>

    </div>

    {/* Bottom Line */}
    <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} MyShop, Inc. All rights reserved.
    </div>
  </div>
</footer>
    )
}

export default Footer