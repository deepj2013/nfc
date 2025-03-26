import Order from "../models/orderModel.js";
import { v4 as uuidv4 } from "uuid";

// Place a new order
export const placeOrderService = async (data) => {
  try {
    const newOrder = new Order({
      orderNumber: "ORD-" + uuidv4().slice(0, 8).toUpperCase(),
      tableId: data.tableId,
      memberId: data.memberId || null,
      items: data.items,
      restaurant_id: data.restaurant_id,  
      totalAmount: data.totalAmount,
      placedBy: data.placedBy
    });
    return await newOrder.save();
  } catch (err) {
    throw new Error("Error placing order: " + err.message);
  }
};

// Get order by ID
export const getOrderByIdService = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
    return order;
  } catch (err) {
    throw new Error("Error fetching order: " + err.message);
  }
};
export const getAllOrderService = async () => {
  try {
    const order = await Order.find();
    if (!order) throw new Error("Order not found");
    return order;
  } catch (err) {
    throw new Error("Error fetching order: " + err.message);
  }
};

// Update order status
export const updateOrderStatusService = async (orderId, status) => {
  try {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) throw new Error("Order not found");
    return order;
  } catch (err) {
    throw new Error("Error updating order status: " + err.message);
  }
};

// Get orders for kitchen
export const getKitchenOrdersService = async () => {
  try {
    return await Order.find({ status: { $in: ["Pending", "Cooking"] } }).sort({ placedAt: -1 });
  } catch (err) {
    throw new Error("Error fetching kitchen orders: " + err.message);
  }
};