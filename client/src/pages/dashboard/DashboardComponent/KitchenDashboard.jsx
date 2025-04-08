import { useEffect, useState } from "react";
import {
  getKitchenOrders,
  updateKitchenOrderItemStatus,
  updateKitchenOrderStatus,
} from "../../../services/posApiServices";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const KitchenDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [timers, setTimers] = useState({});
  const navigate = useNavigate();

  const restaurantId = 2; // Replace with dynamic value if needed

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/"; // Redirects to the home page after logout
  };

  const fetchOrders = async () => {
    try {
      const res = await getKitchenOrders(restaurantId);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load kitchen orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      orders.forEach((order) => {
        const diff = moment
          .utc(moment().diff(moment(order.placedAt)))
          .format("HH:mm:ss");
        newTimers[order._id] = diff;
      });
      setTimers(newTimers);
    }, 1000);
    return () => clearInterval(interval);
  }, [orders]);

  const allItemsReady = (order) => {
    return order.items.every((item) => item.status === "Ready");
  };

  const handleOrderStatusUpdate = async (orderId, restaurantId, status) => {
    try {
      await updateKitchenOrderStatus(orderId, { restaurantId, status });
      fetchOrders();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };
  const handleItemStatusUpdate = async (itemId, orderId, status) => {
    try {
      await updateKitchenOrderItemStatus(itemId, orderId, { status });
      fetchOrders();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm p-4 z-50">
      <div className="relative bg-white rounded-xl p-4 h-full overflow-y-auto">
      <button
        className="sticky top-3 right-4 z-50 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-full shadow-lg transition duration-200 ease-in-out"
        style={{ position: "sticky", float: "right" }}
        onClick={handleLogout}
      >
        Logout
      </button>

        <h1 className="text-2xl font-bold mb-4 text-center">
          Kitchen Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => {
            const elapsedMinutes = moment().diff(
              moment(order.placedAt),
              "minutes"
            );
            const isDelayed = elapsedMinutes > 30;

            return (
              <div
                key={order._id}
                className={`relative border rounded-lg p-4 shadow ${
                  isDelayed ? "bg-red-100" : "bg-gray-50"
                }`}
              >
                {/* Timer */}
                <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded shadow">
                  {timers[order._id] || "00:00:00"}
                </div>

                <h2 className="font-semibold text-lg mb-1">
                  Order #{order.orderNumber || order._id.slice(-5)} - Table{" "}
                  {order.tableId}
                </h2>
                <p className="text-sm text-gray-500 mb-1">
                  Member: {order.memberId || "GUEST"}
                </p>

                <div className="space-y-2 mt-2">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center bg-white p-2 rounded shadow"
                    >
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-xs text-gray-400">
                          Status: {item.status}
                        </p>
                      </div>
                      <div className="text-right">
                        {item.status !== "Ready" ? (
                          <button
                            onClick={() =>
                              handleItemStatusUpdate(
                                item._id,
                                order._id,
                                item.status === "Pending" ? "Cooking" : "Ready"
                              )
                            }
                            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          >
                            {item.status === "Pending" ? "Start" : "Mark Ready"}
                          </button>
                        ) : (
                          <span className="text-green-600 text-sm font-semibold">
                            ✅ Ready
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Status Control Button */}
                <div className="mt-4">
                  <button
                    className={`w-full py-2 rounded-xl text-white font-semibold ${
                      order.status === "Pending"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : order.status === "Cooking"
                        ? allItemsReady(order)
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-400 cursor-not-allowed"
                        : order.status === "Ready"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={
                      (order.status === "Cooking" && !allItemsReady(order)) ||
                      order.status === "Served"
                    }
                    onClick={() => {
                      let nextStatus = "";

                      if (order.status === "Pending") nextStatus = "Cooking";
                      else if (
                        order.status === "Cooking" &&
                        allItemsReady(order)
                      )
                        nextStatus = "Ready";
                      else if (order.status === "Ready") nextStatus = "Served";

                      if (nextStatus) {
                        handleOrderStatusUpdate(
                          order._id,
                          restaurantId,
                          nextStatus
                        );
                      }
                    }}
                  >
                    {order.status === "Pending" && "Start Cooking Order"}
                    {order.status === "Cooking" &&
                      (allItemsReady(order)
                        ? "Mark Order Ready"
                        : "Waiting for Items...")}
                    {order.status === "Ready" && "Mark as Served"}
                    {order.status === "Served" && "Completed"}
                  </button>
                </div>

                {/* Menu Button */}
                <div className="text-right mt-3">
                  <button
                    className="text-xs text-blue-600 underline"
                    onClick={() => alert("Show Menu Modal (Coming soon...)")}
                  >
                    View Full Menu
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KitchenDashboard;
