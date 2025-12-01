import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Package,
  Users,
  Calculator,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      icon: Camera,
      title: "Scan Bills (OCR)",
      page: "/upload",
      color: "text-yellow-400",
    },
    {
      icon: Package,
      title: "Inventory",
      page: "/inventory",
      color: "text-blue-400",
    },
    {
      icon: Calculator,
      title: "Billing",
      page: "/bills",
      color: "text-green-400",
    },
    {
      icon: Users,
      title: "Customer Ledger",
      page: "/customers",
      color: "text-pink-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1217] text-gray-200">

      {/* HERO */}
      <section className="px-4 py-14 text-center pb-0">
        <div className="inline-flex items-center bg-yellow-500/10 px-3 py-1 rounded-full mb-4">
          <span className="text-yellow-400 text-sm font-medium">
            Smart Tools For Indian Shops
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-200 leading-snug mb-4">
          Manage Your Shop  
          <span className="block text-yellow-400">Digitally & Easily</span>
        </h1>

        <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">
          Billing, stock, customers, alerts — everything in one place.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-yellow-600 active:scale-95 transition inline-flex items-center space-x-2"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* MAIN FEATURE GRID */}
      <section className="px-4 py-10 pb-0">
        <h2 className="text-xl font-bold text-center text-gray-100 mb-6">
          Main Features
        </h2>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                onClick={() => navigate(c.page)}
                className="bg-[#1a1d23] border border-[#262a32] rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-yellow-500 cursor-pointer transition"
              >
                <Icon className={`w-7 h-7 mb-2 ${c.color}`} />
                <p className="text-sm font-medium text-gray-100">{c.title}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* QUICK SECTIONS */}
      <section className="px-4 py-10 space-y-6 max-w-md mx-auto pb-0">

        <div className="bg-[#1a1d23] border border-[#262a32] rounded-2xl p-5">
          <h3 className="text-lg font-bold text-gray-100 mb-2">
            Billing + Stock Sync
          </h3>
          <p className="text-gray-400 text-sm mb-3">
            Make bills in seconds — stock updates automatically.
          </p>

          <ul className="space-y-1 text-sm text-gray-300">
            <li>• GST billing</li>
            <li>• Print / PDF invoice</li>
            <li>• Instant stock reduction</li>
          </ul>
        </div>

        <div className="bg-[#1a1d23] border border-[#262a32] rounded-2xl p-5">
          <h3 className="text-lg font-bold text-gray-100 mb-2">
            Customer Ledger (Udhaar)
          </h3>
          <p className="text-gray-400 text-sm mb-3">
            Track udhaar and send payment reminders automatically.
          </p>

          <ul className="space-y-1 text-sm text-gray-300">
            <li>• Payment history</li>
            <li>• Auto WhatsApp reminders</li>
            <li>• Customer balance summary</li>
          </ul>
        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 py-12 text-center border-t border-[#1c1f26]">
        <h2 className="text-xl font-bold text-gray-100 mb-8">How It Works</h2>

        <div className="space-y-8 max-w-xs mx-auto">
          {[
            { num: "1", title: "Scan Bill", desc: "OCR auto reads items." },
            { num: "2", title: "Approve Items", desc: "Confirm detected items." },
            { num: "3", title: "Stock Updates", desc: "Inventory updates instantly." },
          ].map((s, i) => (
            <div key={i}>
              <div className="w-14 h-14 bg-yellow-500 rounded-full mx-auto flex items-center justify-center text-black font-bold text-lg">
                {s.num}
              </div>
              <h4 className="font-semibold text-gray-100 mt-3">{s.title}</h4>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b0d11] text-gray-500 text-center py-8 text-sm border-t border-[#1a1d23]">
        <p>© {new Date().getFullYear()} MyShop — All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Home;
