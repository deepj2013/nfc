import React from "react";
import { FaPrint, FaCheck } from "react-icons/fa";

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-500";
    case "Preparing":
      return "bg-blue-500";
    case "Ready":
      return "bg-green-600";
    default:
      return "bg-gray-400";
  }
};

const CurrentOrders = ({ orders, onKOTPrint, onSettle }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-1">
      {orders?.length === 0 && (
        <p className="text-gray-500">No active orders.</p>
      )}

      {orders?.map((order) => (
        <div
          key={order._id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition border"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <h4 className="font-bold text-gray-700 text-sm">
                Order:{" "}
                <span className="text-blue-600">
                  #{order.orderNumber || order._id.slice(-5)}
                </span>
              </h4>
              <p className="text-sm text-gray-600">
                Table: {order.tableId} | {order.memberId || "Guest"}
              </p>
            </div>
            <span
              className={`text-xs px-3 py-1 rounded-full text-white font-semibold ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          {/* Items */}
          <div className="text-sm text-gray-700 mb-3 space-y-1">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border-b py-1"
              >
                <div>
                  <span className="font-medium">
                    {item.name} x {item.quantity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">
                    ₹{item.price * item.quantity}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full text-white ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status || "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
          <button
  onClick={() => onKOTPrint(order)}
  className="flex items-center gap-2 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
>
  <FaPrint /> Print KOT
</button>
            <button
              onClick={() => onSettle(order)}
              className="flex items-center gap-2 text-sm bg-green-600 text-white hover:bg-green-700 px-3 py-1 rounded"
            >
              <FaCheck /> Settle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurrentOrders;
