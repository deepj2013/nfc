import { useState } from "react";
import CurrentOrders from "../../user/CurrentOrders";
import SettledBills from "../../user/SettledBills";
import OrderForm from "../../user/OrderForm";
import PaymentModal from "../../user/PaymentModal";

const POSInchargeDashboard = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        POS Incharge Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">
        {/* Current Orders Section */}
        <div className="col-span-2 bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Current Orders
          </h2>
          <CurrentOrders setSelectedOrder={setSelectedOrder} />
        </div>

        {/* Settled Bills Section */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Settled Bills
          </h2>
          <SettledBills />
        </div>
      </div>

      {/* Order Processing & Payment Modal */}
      {selectedOrder && (
        <OrderForm order={selectedOrder} setShowPaymentModal={setShowPaymentModal} />
      )}
      {showPaymentModal && <PaymentModal setShowPaymentModal={setShowPaymentModal} />}
    </div>
  );
};

export default POSInchargeDashboard;