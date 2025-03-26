import { getKitchenOrdersService, updateKitchenOrderStatusService } from "../services/kitchenServices.js";
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
  