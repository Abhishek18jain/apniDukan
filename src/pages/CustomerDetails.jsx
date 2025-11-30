import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utlis/axiosinstance.js";
import toast from "react-hot-toast";

export default function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const [form, setForm] = useState({
    type: "given",
    amount: "",
    description: "",
  });

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = async () => {
    try {
      const res = await axiosInstance.get(`customers/details/${id}`);
      setCustomer(res.data.customer);
      setTransactions(res.data.transactions);
    } catch (err) {
      console.log(err);
    }
  };

  const addEntry = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post(`/customers/addTransaction/${id}/`, {
        customerId: id,
        ...form,
        amount: Number(form.amount),
      });

      toast.success("Entry added");
      setForm({ type: "given", amount: "", description: "" });
      loadDetails();
    } catch (err) {
      toast.error("Failed");
    }
  };

  const totalGiven = transactions
    .filter((t) => t.type === "given")
    .reduce((a, b) => a + b.amount, 0);

  const totalTaken = transactions
    .filter((t) => t.type === "taken")
    .reduce((a, b) => a + b.amount, 0);

  const balance = totalGiven - totalTaken;

  if (!customer) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6 text-white min-h-screen">
      {/* Header Card */}
      <div className="bg-[#0b1220] p-5 rounded-xl mb-5">
        <div className="text-xl font-bold">{customer.name}</div>
        <div className="text-gray-400 text-sm">{customer.phone}</div>

        <div className="mt-4">
          <div className="text-2xl font-bold text-yellow-300">
            ₹{Math.abs(balance)}
          </div>
          <div className="text-gray-400 text-sm">
            {balance > 0
              ? "Customer owes you"
              : balance < 0
              ? "You owe customer"
              : "Settled"}
          </div>
        </div>
      </div>

      {/* Add Entry */}
      <h2 className="text-lg font-semibold my-3">Add Entry</h2>

      <form onSubmit={addEntry} className="bg-[#0b1220] p-4 rounded-xl space-y-3">
        <select
          className="bg-[#0f172a] p-3 rounded-xl w-full"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="given">Credit (Given)</option>
          <option value="taken">Payment (Taken)</option>
        </select>

        <input
          className="bg-[#0f172a] p-3 rounded-xl w-full"
          placeholder="Amount"
          required
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <input
          className="bg-[#0f172a] p-3 rounded-xl w-full"
          placeholder="Note (optional)"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button className="w-full bg-yellow-400 text-black py-2 rounded-xl">
          Save
        </button>
      </form>

      {/* Transaction List */}
      <h2 className="text-lg font-semibold mt-6 mb-3">Transactions</h2>

      {transactions.map((t) => (
        <div
          key={t._id}
          className="bg-[#0b1220] p-4 rounded-xl mb-3 flex justify-between"
        >
          <div>
            <div className="font-semibold">
              {t.description || (t.type === "given" ? "Given" : "Taken")}
            </div>
            <div className="text-sm text-gray-400">
              {new Date(t.date).toDateString()}
            </div>
          </div>
          <div
            className={`font-bold ${
              t.type === "given" ? "text-yellow-300" : "text-green-400"
            }`}
          >
            {t.type === "given" ? "+" : "-"} ₹{t.amount}
          </div>
        </div>
      ))}
    </div>
  );
}
