import Order from "../models/orderModel.js";
import Kitchen from "../models/kitchenmodel.js";
import APIError from "../exception/errorHandler.js";

export const createKitchenService = async (payload) => {
  const {
    kitchen_name,
    kitchen_type,
    lease_start_date,
    lease_end_date,
    partner_name,
  } = payload;

  const existing = await Kitchen.findOne({ kitchen_name });
  if (existing) throw new APIError("Kitchen already exists", 409);

  if (kitchen_type === "Leased" && (!lease_start_date || !lease_end_date)) {
    throw new APIError("Lease start and end date required for leased kitchen", 400);
  }

  if (kitchen_type === "Partnership" && !partner_name) {
    throw new APIError("Partner name is required for partnership kitchen", 400);
  }

  // 🔐 Auto-generate a unique kitchen code
  let baseCode = kitchen_name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  let uniqueCode = baseCode;
  let counter = 1;

  while (await Kitchen.findOne({ kitchen_code: uniqueCode })) {
    uniqueCode = `${baseCode}-${counter++}`;
  }

  payload.kitchen_code = uniqueCode;

  return await Kitchen.create(payload);
};

export const getAllKitchenService = async () => {
  return await Kitchen.find({ is_active: true });
};

export const updateKitchenService = async (id, payload) => {
  const kitchen = await Kitchen.findById(id);
  if (!kitchen) throw new APIError("Kitchen not found", 404);

  Object.assign(kitchen, payload);
  return await kitchen.save();
};

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
