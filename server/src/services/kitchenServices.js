import Order from "../models/orderModel.js";

export const getKitchenOrdersService = async (restaurant_id) => {
    if (!restaurant_id) throw new Error("Restaurant ID is required");
  
    return await Order.find({
      restaurant_id: restaurant_id,
      status: { $in: ["Pending", "Cooking"] }
    }).sort({ placedAt: -1 });
  };
  
  export const updateKitchenOrderStatusService = async (orderId, status, restaurant_id) => {
    const valid = ["Cooking", "Ready"];
    if (!valid.includes(status)) throw new Error("Invalid status");
  
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
    if (order.restaurant_id !== restaurant_id) throw new Error("Unauthorized: Kitchen mismatch");
  
    order.status = status;
    return await order.save();
  };
  