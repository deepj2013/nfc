import { createKitchenService, getAllKitchenService, getKitchenOrdersService, updateKitchenItemStatusService, updateKitchenOrderStatusService, updateKitchenService } from "../services/kitchenServices.js";

export const getKitchenOrders = async (req, res) => {
    try {
     

      const { restaurant_id } = req.query;
      const orders = await getKitchenOrdersService(Number(restaurant_id));
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ msg: "Failed to fetch kitchen orders", error: error.message });
    }
  };
  
  export const updateKitchenOrderStatus = async (req, res) => {
    try {
      const { status, restaurant_id } = req.body;
      const result = await updateKitchenOrderStatusService(
        req.params.orderId,
        status,
        Number(restaurant_id)
      );
      res.status(200).json({ msg: "Status updated", result });
    } catch (error) {
      res.status(500).json({ msg: "Failed to update status", error: error.message });
    }
  };

  export const updateKitchenItemStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const result = await updateKitchenItemStatusService(
        req.params.itemId,
        req.params.orderId,
        status,
      );
      res.status(200).json({ msg: "Status updated", result });
    } catch (error) {
      res.status(500).json({ msg: "Failed to update status", error: error.message });
    }
  };
  


  export const createKitchen = async (req, res) => {
    try {
      const payload = { ...req.body, created_by: req.user?.user_id || 0 };
      const result = await createKitchenService (payload);
      res.status(201).json({ success: true, result });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
        error: error.stack,
      });
    }
  };
  
  export const getKitchens = async (req, res) => {
    try {
      const kitchens = await getAllKitchenService();
      res.status(200).json({ success: true, kitchens });
    } catch (error) {
      res.status(error.statusCode || 500).json({ success: false, message: error.message });
    }
  };
  
  export const updateKitchen = async (req, res) => {
    try {
      const result = await updateKitchenService(req.params.id, {
        ...req.body,
        updated_by: req.user?.user_id || 0,
      });
      res.status(200).json({ success: true, result });
    } catch (error) {
      res.status(error.statusCode || 500).json({ success: false, message: error.message });
    }
  };
  