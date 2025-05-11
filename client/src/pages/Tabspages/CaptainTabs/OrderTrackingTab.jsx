import React, { useEffect, useState } from "react";
// import { getCaptainOrders } from "../../../services/captainServices"; // You can rename if needed
import moment from "moment";
import { toast } from "react-toastify";

const OrderStatusTab = ({ memberId }) => {
  const [orders, setOrders] = useState([]);
  const [timers, setTimers] = useState({});

  // useEffect(() => {
  //   fetchOrders();
  //   const interval = setInterval(fetchOrders, 30000); // auto-refresh every 30 seconds
  //   return () => clearInterval(interval);
  // }, []);

  // const fetchOrders = async () => {
  //   try {
  //     const res = await getCaptainOrders(memberId);
  //     setOrders(res.data || []);
  //   } catch (err) {
  //     toast.error("Failed to fetch orders");
  //   }
  // };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const timeObj = {};
      orders.forEach((order) => {
        const diff = moment.utc(moment().diff(moment(order.createdAt))).format("HH:mm:ss");
        timeObj[order._id] = diff;
      });
      setTimers(timeObj);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [orders]);

  const statusGroups = {
    Pending: [],
    Preparing: [],
    Ready: [],
  };

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!statusGroups[item.status]) statusGroups[item.status] = [];
      statusGroups[item.status].push({ ...item, tableId: order.tableId, time: timers[order._id] });
    });
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {["Pending", "Preparing", "Ready"].map((status) => (
        <div key={status} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3 text-center">{status}</h3>
          {statusGroups[status]?.length > 0 ? (
            <ul className="space-y-3">
              {statusGroups[status].map((item, idx) => (
                <li key={idx} className="bg-gray-50 p-3 rounded shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold">{item.name}</span>
                    <span className="text-xs text-gray-500">{item.time || "00:00:00"}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Table: <strong>{item.tableId}</strong> | Qty: {item.quantity}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm text-center">No items</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderStatusTab;