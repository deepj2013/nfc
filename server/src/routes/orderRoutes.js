import express from "express";
import {
  placeOrder,
  getOrderById,
  updateOrderStatus,
  getKitchenOrders,
  getAllOrders
} from "../controllers/orderController.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

router.post("/place",[auth], placeOrder);
router.get("/allorders",[auth], getAllOrders);
router.get("/:orderId",[auth] , getOrderById);
router.patch("/update-status/:orderId",[auth] , updateOrderStatus);
router.get("/kitchen",[auth] , getKitchenOrders);

export default router;
