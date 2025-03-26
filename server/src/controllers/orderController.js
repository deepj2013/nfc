import {
  placeOrderService,
  getOrderByIdService,
  updateOrderStatusService,
  getKitchenOrdersService,
  getAllOrderService
} from "../services/orderServices.js";

// Place new order
export const placeOrder = async (req, res) => {
  try {
    const result = await placeOrderService(req.body);
    res.status(201).json({ msg: "Order placed", result });
  } catch (error) {
    res.status(500).json({ msg: "Failed to place order", error: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const result = await getOrderByIdService(req.params.orderId);
    res.status(200).json(result);
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ msg: "Failed to fetch order", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const result = await getAllOrderService(req.params.orderId);
    res.status(200).json(result);
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ msg: "Failed to fetch order", error: error.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const result = await updateOrderStatusService(req.params.orderId, req.body.status);
    res.status(200).json({ msg: "Status updated", result });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ msg: "Failed to update status", error: error.message });
  }
};

// Get kitchen orders
export const getKitchenOrders = async (req, res) => {
  try {
    const result = await getKitchenOrdersService();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch kitchen orders", error: error.message });
  }
};