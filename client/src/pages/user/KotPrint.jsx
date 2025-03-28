import React from "react";
import logo from "../../assets/image/logo5.jpg";

const KotPrint = ({ order }) => {
  if (!order) return <p className="text-center mt-10 text-gray-500">Loading KOT Preview...</p>;

  return (
    <div id="printable">
      <div className="p-4 font-mono w-[300px] mx-auto text-sm">
        {/* Header */}
        <div className="text-center mb-2">
          <img src={logo} alt="logo" className="h-12 mx-auto" />
          <h2 className="text-lg font-bold">NEW FRIENDS CLUB</h2>
          <p>NEW DELHI - 110025 (INDIA)</p>
          <p className="text-xs font-medium">KOT COPY DUPLICATE</p>
        </div>

        {/* Order Info */}
        <div className="mb-2">
          <p><strong>Order:</strong> #{order.orderNumber || order._id.slice(-5)}</p>
          <p><strong>Table:</strong> {order.tableId}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Member:</strong> {order.memberId || "GUEST"}</p>
        </div>

        <hr className="my-2" />

        {/* Order Items */}
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b">
              <th className="text-left">S.No</th>
              <th className="text-left">Item</th>
              <th className="text-right">Qty</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td className="text-right">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <p className="mt-2 font-semibold">
          Total Qty: {order.items.reduce((sum, i) => sum + i.quantity, 0)}
        </p>
      </div>
    </div>
  );
};

export default KotPrint;