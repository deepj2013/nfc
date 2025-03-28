import React, { useState } from "react";
import moment from "moment";

const SettledBills = ({ bills = [], onInvoicePrint }) => {
  const [searchDate, setSearchDate] = useState("");

  const filteredBills = bills.filter((bill) => {
    if (!searchDate) return true;
    const billDate = moment(bill.settledAt).format("YYYY-MM-DD");
    return billDate === searchDate;
  });

  return (
    <div>
      {/* Date Filter */}
      <div className="mb-3">
        <label className="text-xs font-semibold text-gray-600">
          Filter by Date:
        </label>
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
            <div
              key={bill._id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow"
            >
              <div>
                <h4 className="text-md font-semibold text-gray-700">
                  Table: {bill.tableId || "N/A"}
                </h4>
                <p className="text-sm text-gray-500">
                  {bill.memberId || "Guest"} |{" "}
                  {moment(bill.settledAt).format("DD-MM-YYYY")}
                </p>
              </div>
              <div>
                <span className="text-lg font-bold text-blue-600">
                  ₹{bill.totalAmount}
                </span>
              </div>
              <span className="text-xs px-3 py-1 font-semibold rounded-md bg-gray-700 text-white">
                {bill.paymentMethod}
              </span>
              <button
                onClick={() => onInvoicePrint(bill.billNumber)}
                className="ml-3 bg-green-500 text-white px-3 py-1 text-xs rounded-md hover:bg-green-600 transition"
              >
                Print Invoice
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center">
            No settled bills found for this date.
          </p>
        )}
      </div>
    </div>
  );
};

export default SettledBills;
