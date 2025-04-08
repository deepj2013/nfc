import Order from "../models/orderModel.js";

export const getKitchenOrdersService = async (restaurant_id) => {
    if (!restaurant_id) throw new Error("Restaurant ID is required");
  
    return await Order.find({
      restaurant_id: restaurant_id,
      status: { $in: ["Pending", "Cooking"] }
    }).sort({ placedAt: -1 });
  };
  
  export const updateKitchenOrderStatusService = async (orderId, status ) => {
    const valid = ["Cooking", "Ready"];
    if (!valid.includes(status)) throw new Error("Invalid status");
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
  
    order.status = status;
    return await order.save();
  };
  
  

  export const updateKitchenItemStatusService = async (itemId, orderId, status) => {
    const validStatuses = ["Cooking", "Ready"];
    if (!validStatuses.includes(status)) throw new Error("Invalid status");
  
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
  
    const item = order.items.find(item => item._id.toString() === itemId);
    if (!item) throw new Error("Item not found in the order");
  
    item.status = status;
  
    await order.save();
    return item; // return the updated item
  };
