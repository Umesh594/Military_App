import { useState } from "react";  
import API from "../services/api";

export function Transfers() {
  const [form, setForm] = useState({
    asset: "",
    quantity: "",
    fromBase: "",
    toBase: ""
  });

  const inputClass = "border p-3 rounded-lg w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const btnClass = "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700";

  const submit = async () => {
    await API.post("/transfers", form);
    alert("Transfer Added");
  };

  return (
    <div className="p-6 max-w-lg">
      <input className={inputClass} placeholder="Asset" onChange={(e)=>setForm({...form,asset:e.target.value})} />
      <input className={inputClass} type="number" placeholder="Quantity" onChange={(e)=>setForm({...form,quantity:e.target.value})} />
      <input className={inputClass} placeholder="From Base" onChange={(e)=>setForm({...form,fromBase:e.target.value})} />
      <input className={inputClass} placeholder="To Base" onChange={(e)=>setForm({...form,toBase:e.target.value})} />
      <button className={btnClass} onClick={submit}>Transfer</button>
    </div>
  );
}