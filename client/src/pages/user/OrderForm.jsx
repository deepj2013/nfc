import React, { useState } from "react";

const OrderForm = ({ order, setShowPaymentModal }) => {
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: "Paneer Tikka", qty: 2, price: 150 },
    { id: 2, name: "Butter Naan", qty: 4, price: 40 },
    { id: 3, name: "Dal Makhani", qty: 1, price: 220 },
  ]);

  // Calculate total
  const calculateTotal = () => {
    return orderItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  };

  // Increase Quantity
  const increaseQty = (id) => {
    setOrderItems(orderItems.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  // Decrease Quantity
  const decreaseQty = (id) => {
    setOrderItems(orderItems.map((item) =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    ));
  };

  // Remove Item
  const removeItem = (id) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  return (
    <div className="mt-4 bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Order Details - Table {order.table}
      </h2>
      <p className="text-sm text-gray-500">Member: {order.member}</p>

      {/* Order Items List */}
      <div className="mt-3 space-y-3">
        {orderItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b pb-2">
            <span className="text-sm font-medium">{item.name}</span>
            <div className="flex items-center gap-2">
              <button className="bg-gray-300 px-2 rounded-md" onClick={() => decreaseQty(item.id)}>-</button>
              <span className="text-sm">{item.qty}</span>
              <button className="bg-gray-300 px-2 rounded-md" onClick={() => increaseQty(item.id)}>+</button>
            </div>
            <span className="text-sm font-bold text-blue-600">₹{item.qty * item.price}</span>
            <button className="text-red-500 text-xs font-medium" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-4 flex justify-between items-center text-lg font-semibold">
        <span>Total:</span>
        <span className="text-blue-600">₹{calculateTotal()}</span>
      </div>

      {/* Proceed to Payment Button */}
      <button
        className="w-full bg-blue-500 text-white py-2 mt-3 rounded-md hover:bg-blue-600 transition"
        onClick={() => setShowPaymentModal(true)}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default OrderForm;