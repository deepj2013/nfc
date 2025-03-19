import React, { useState } from "react";

const dummyOrders = [
  { id: 1, table: "T1", member: "John Doe", time: "12:30 PM", total: 540, status: "Pending" },
  { id: 2, table: "T2", member: "Jane Smith", time: "12:45 PM", total: 780, status: "Preparing" },
  { id: 3, table: "T3", member: "Guest", time: "1:00 PM", total: 320, status: "Ready" },
];

const CurrentOrders = ({ setSelectedOrder }) => {
  const [orders, setOrders] = useState(dummyOrders);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Preparing":
        return "bg-blue-500";
      case "Ready":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow cursor-pointer hover:bg-gray-200"
          onClick={() => setSelectedOrder(order)}
        >
          <div>
            <h4 className="text-md font-semibold text-gray-700">Table: {order.table}</h4>
            <p className="text-sm text-gray-500">{order.member} | {order.time}</p>
          </div>
          <div>
            <span className="text-lg font-bold text-blue-600">₹{order.total}</span>
          </div>
          <span className={`px-3 py-1 text-white text-xs font-semibold rounded-md ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CurrentOrders;