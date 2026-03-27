import { useEffect, useState } from "react";
import API from "../services/api";
import Card from "./Card";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [filters, setFilters] = useState({
    base: "",
    asset: "",
    startDate: "",
    endDate: ""
  });

  const [showPopup, setShowPopup] = useState(false);

  const fetchData = async () => {
    const res = await API.get("/dashboard", { params: filters });
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">

     
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          placeholder="Base"
          className="border p-2 rounded"
          onChange={(e)=>setFilters({...filters, base:e.target.value})}
        />

        <input
          placeholder="Asset"
          className="border p-2 rounded"
          onChange={(e)=>setFilters({...filters, asset:e.target.value})}
        />

        <input
          type="date"
          className="border p-2 rounded"
          onChange={(e)=>setFilters({...filters, startDate:e.target.value})}
        />

        <input
          type="date"
          className="border p-2 rounded"
          onChange={(e)=>setFilters({...filters, endDate:e.target.value})}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={fetchData}
        >
          Apply
        </button>
      </div>

     
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Card title="Opening Balance" value={data.openingBalance} />
        <Card title="Closing Balance" value={data.closingBalance} />

        <Card
          title="Net Movement"
          value={data.netMovement}
          onClick={() => setShowPopup(true)}
        />

        <Card title="Assigned" value={data.assigned} />
        <Card title="Expended" value={data.expended} />
      </div>

     
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-80">
            <h2 className="font-bold mb-2">Net Movement Breakdown</h2>

            <p>Purchases: {data.purchases}</p>
            <p>Transfer In: {data.transferIn}</p>
            <p>Transfer Out: {data.transferOut}</p>

            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}