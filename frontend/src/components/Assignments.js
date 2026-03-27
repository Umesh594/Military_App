import { useState } from "react";
import API from "../services/api";

export function Assignments() {
  const [form, setForm] = useState({
    asset: "",
    quantity: "",
    base: "",
    assignedTo: ""
  });

  const inputClass = "border p-3 rounded-lg w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const btnClass = "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700";

  const submit = async () => {
    await API.post("/assignments", form);
    alert("Assigned");
  };

  return (
    <div className="p-6 max-w-lg">
      <input className={inputClass} placeholder="Asset" onChange={(e)=>setForm({...form,asset:e.target.value})} />
      <input className={inputClass} type="number" placeholder="Quantity" onChange={(e)=>setForm({...form,quantity:e.target.value})} />
      <input className={inputClass} placeholder="Base" onChange={(e)=>setForm({...form,base:e.target.value})} />
      <input className={inputClass} placeholder="Assigned To" onChange={(e)=>setForm({...form,assignedTo:e.target.value})} />
      <button className={btnClass} onClick={submit}>Assign</button>
    </div>
  );
}