import React, { useState } from "react";

const dummySettledBills = [
  { id: 101, table: "T1", member: "John Doe", amount: 540, date: "2025-03-18", paymentMethod: "Wallet" },
  { id: 102, table: "T3", member: "Jane Smith", amount: 780, date: "2025-03-18", paymentMethod: "Cash" },
  { id: 103, table: "T2", member: "Guest", amount: 320, date: "2025-03-17", paymentMethod: "Card" },
];

const SettledBills = () => {
  const [bills, setBills] = useState(dummySettledBills);
  const [searchDate, setSearchDate] = useState("");

  const filteredBills = bills.filter((bill) => 
    searchDate === "" || bill.date === searchDate
  );

  return (
    <div>
      {/* Filter by Date */}
      <div className="mb-3">
        <label className="text-xs font-semibold text-gray-600">Filter by Date:</label>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border px-2 py-1 text-xs rounded w-full mt-1"
        />
      </div>

      {/* Settled Bills List */}
      <div className="space-y-3">
        {filteredBills.length > 0 ? (
          filteredBills.map((bill) => (
            <div key={bill.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow">
              <div>
                <h4 className="text-md font-semibold text-gray-700">Table: {bill.table}</h4>
                <p className="text-sm text-gray-500">{bill.member} | {bill.date}</p>
              </div>
              <div>
                <span className="text-lg font-bold text-blue-600">₹{bill.amount}</span>
              </div>
              <span className="text-xs px-3 py-1 font-semibold rounded-md bg-gray-700 text-white">
                {bill.paymentMethod}
              </span>
              <button className="ml-3 bg-green-500 text-white px-3 py-1 text-xs rounded-md hover:bg-green-600 transition">
                Print Invoice
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center">No settled bills found for this date.</p>
        )}
      </div>
    </div>
  );
};

export default SettledBills;