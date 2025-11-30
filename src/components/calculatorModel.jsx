import React, { useState } from "react";

/**
 * Simple full-screen calculator.
 * - onApply(value) sends numeric result back
 * - onClose()
 *
 * NOTE: uses Function to evaluate expression. Keep expressions simple.
 */
export default function CalculatorModal({ onClose, onApply }) {
  const [expr, setExpr] = useState("");

  const evalExpr = (e) => {
    try {
      // sanitize: allow digits, operators, parentheses, dot, spaces
      const safe = expr.replace(/[^0-9+\-*/(). %]/g, "");
      // replace % (mod) with *0.01? But for simple percent usage, user can compute externally.
      // Evaluate
      // eslint-disable-next-line no-new-func
      const res = Function(`"use strict"; return (${safe})`)();
      return isFinite(res) ? res : null;
    } catch {
      return null;
    }
  };

  const apply = () => {
    const r = evalExpr();
    if (r == null) {
      alert("Invalid expression");
      return;
    }
    onApply(Number(r));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <button onClick={onClose} className="text-white">Close</button>
        <div className="text-lg font-semibold">Calculator</div>
        <button onClick={apply} className="bg-yellow-400 px-3 py-1 rounded-lg text-black">Apply Amount</button>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <input
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="Type expression e.g. 2*80-10"
          className="w-full p-4 text-2xl bg-[#071422] rounded-xl mb-4 outline-none"
        />

        <div className="grid grid-cols-4 gap-3">
          {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","(",")","+"].map((k)=>(
            <button key={k} onClick={()=>setExpr(prev=>prev + k)} className="p-4 bg-[#0f172a] rounded-xl text-xl">{k}</button>
          ))}
          <button onClick={()=>setExpr(prev=>prev.slice(0,-1))} className="col-span-2 p-4 bg-red-600 rounded-xl">Del</button>
          <button onClick={()=>setExpr("")} className="col-span-2 p-4 bg-gray-700 rounded-xl">Clear</button>
        </div>

        <div className="mt-4 p-3 bg-[#071422] rounded-xl">
          <div className="text-sm text-gray-400 mb-2">Preview result:</div>
          <div className="text-2xl font-semibold">{ (() => { const r = (() => { try { const safe = expr.replace(/[^0-9+\-*/(). %]/g, ""); // eslint-disable-next-line no-new-func
           return Function(`"use strict"; return (${safe})`)(); } catch { return null; } })(); return r == null ? "-" : r; })() }</div>
        </div>
      </div>
    </div>
  );
}
