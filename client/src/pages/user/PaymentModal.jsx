import React, { useState } from "react";

const PaymentModal = ({ setShowPaymentModal }) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [walletBalance, setWalletBalance] = useState(1000); // Dummy wallet balance
  const [orderTotal, setOrderTotal] = useState(600); // Dummy total amount

  // Handle Payment
  const handlePayment = () => {
    if (paymentMethod === "Wallet" && walletBalance < orderTotal) {
      alert("Insufficient Wallet Balance!");
      return;
    }

    alert(`Payment of ₹${orderTotal} done via ${paymentMethod}`);
    setShowPaymentModal(false);
    // Here, call API to update transaction history and mark the bill as settled
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Payment</h2>

        {/* Payment Method Selection */}
        <label className="block text-sm font-medium">Select Payment Method:</label>
        <select
          className="border px-3 py-2 w-full rounded-md mt-1"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Wallet">Wallet (₹{walletBalance})</option>
        </select>

        {/* Payment Summary */}
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm font-medium">Total Amount: <span className="text-blue-600 font-bold">₹{orderTotal}</span></p>
        </div>

        {/* Payment Button */}
        <button
          className="w-full bg-green-500 text-white py-2 mt-4 rounded-md hover:bg-green-600 transition"
          onClick={handlePayment}
        >
          Confirm Payment
        </button>

        {/* Cancel Button */}
        <button
          className="w-full bg-gray-300 text-gray-700 py-2 mt-2 rounded-md hover:bg-gray-400 transition"
          onClick={() => setShowPaymentModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;