import React, { useEffect, useState } from "react";
import axiosInstance from "../utlis/axiosinstance.js";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Customers() {
  const [query, setQuery] = useState("");
  const [customers, setCustomers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    notes: "",
    initialAmount: "",
    initialType: "given",
  });

  useEffect(() => {
    fetchCustomers("");
  }, []);

  const fetchCustomers = async (q) => {
    try {
      const res = await axiosInstance.get(`/customers/search?query=${q}`);
      setCustomers(res.data.results || []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete customer?")) return;

    try {
      await axiosInstance.delete(`/customers/${id}`);
      toast.success("Deleted");
      fetchCustomers("");
    } catch (err) {
      toast.error("Failed");
    }
  };

  const submitCustomer = async (e) => {
    e.preventDefault();
    try {
      // 1. Create customer
      const res = await axiosInstance.post(`/customers/create`, {
        name: form.name,
        phone: form.phone,
        notes: form.notes,
      });

      const createdId = res.data.customer._id;

      // 2. If initial amount provided → add first entry
      if (form.initialAmount && Number(form.initialAmount) > 0) {
        await axiosInstance.post(`/customers/addTransaction/${createdId}/`, {
          customerId: createdId,
          type: form.initialType,
          amount: Number(form.initialAmount),
          description: "Opening Balance",
        });
      }

      toast.success("Customer created");

      setForm({
        name: "",
        phone: "",
        notes: "",
        initialAmount: "",
        initialType: "given",
      });

      setShowAdd(false);
      fetchCustomers("");
    } catch (err) {
      toast.error("Failed");
    }
  };

  return (
    <div className="p-5 text-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-5">Customers</h1>

      {/* Search */}
      <input
        className="w-full bg-[#0f172a] p-3 rounded-xl mb-4 outline-none"
        placeholder="Search customers"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchCustomers(e.target.value);
        }}
      />

      {/* Add Button */}
      <button
        className="bg-yellow-400 text-black px-4 py-2 rounded-xl mb-4"
        onClick={() => setShowAdd(!showAdd)}
      >
        + Add Customer
      </button>

      {/* Add Customer Form */}
      {showAdd && (
        <form
          onSubmit={submitCustomer}
          className="bg-[#0b1220] p-4 rounded-xl space-y-3 mb-5"
        >
          <input
            className="w-full bg-[#0f172a] p-3 rounded-xl"
            placeholder="Customer Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="w-full bg-[#0f172a] p-3 rounded-xl"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <textarea
            className="w-full bg-[#0f172a] p-3 rounded-xl"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          {/* Initial Amount */}
          <input
            className="w-full bg-[#0f172a] p-3 rounded-xl"
            placeholder="Initial amount (optional)"
            value={form.initialAmount}
            onChange={(e) =>
              setForm({ ...form, initialAmount: e.target.value })
            }
          />

          {/* Initial Type */}
          <select
            className="w-full bg-[#0f172a] p-3 rounded-xl"
            value={form.initialType}
            onChange={(e) =>
              setForm({ ...form, initialType: e.target.value })
            }
          >
            <option value="given">Given (Customer owes you)</option>
            <option value="taken">Taken (You owe customer)</option>
          </select>

          <button className="w-full bg-yellow-400 text-black py-2 rounded-xl">
            Create
          </button>
        </form>
      )}

      {/* Customer List */}
      {customers.map((c) => (
        <div
          key={c._id}
          className="bg-[#0b1220] p-4 rounded-xl mb-3 flex justify-between items-center"
        >
          <Link to={`/customers/${c._id}`} className="flex-1">
            <div className="text-lg font-semibold">{c.name}</div>
            <div className="text-sm text-gray-400">{c.phone}</div>
          </Link>

          <div className="text-yellow-300 font-bold mr-4">
            ₹{c.balance ?? 0}
          </div>

          {/* DELETE BUTTON */}
          <button
            onClick={() => deleteCustomer(c._id)}
            className="bg-red-500 text-white px-3 py-1 rounded-lg"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
