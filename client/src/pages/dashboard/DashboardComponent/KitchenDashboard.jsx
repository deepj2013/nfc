import React, { useState, useEffect } from "react";

const dummyOrders = [
  { id: 101, table: "T1", items: ["Paneer Tikka", "Butter Naan"], status: "Pending", placedAt: "2025-03-19T12:30:00Z" },
  { id: 102, table: "T3", items: ["Dal Makhani", "Jeera Rice"], status: "Cooking", placedAt: "2025-03-19T12:45:00Z" },
  { id: 103, table: "T2", items: ["Biryani", "Raita"], status: "Pending", placedAt: "2025-03-19T13:00:00Z" },
];

const KitchenDashboard = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const [cookingTimes, setCookingTimes] = useState({});

  // Track Cooking Time
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimes = {};
      orders.forEach((order) => {
        if (order.status !== "Ready") {
          const elapsed = Math.floor((new Date() - new Date(order.placedAt)) / 60000);
          newTimes[order.id] = elapsed;
        }
      });
      setCookingTimes(newTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  // Update Order Status
  const updateStatus = (orderId, newStatus) => {
    setOrders(orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Kitchen Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-lg font-semibold">Table {order.table}</h2>
            <p className="text-sm text-gray-500">Items: {order.items.join(", ")}</p>
            <p className="text-sm text-gray-500">Time: {cookingTimes[order.id] || 0} mins</p>

            <div className="mt-2 flex justify-between">
              {order.status !== "Ready" && (
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
                  onClick={() => updateStatus(order.id, order.status === "Pending" ? "Cooking" : "Ready")}
                >
                  {order.status === "Pending" ? "Start Cooking" : "Mark as Ready"}
                </button>
              )}
              {order.status === "Ready" && (
                <span className="text-green-600 font-bold">Ready for Pickup</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitchenDashboard;