import express from "express";
import {
  getKitchenOrders,
  updateKitchenOrderStatus
} from "../controllers/kitchenController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/orders",[auth], getKitchenOrders);
router.patch("/update-status/:orderId",[auth], updateKitchenOrderStatus);

export default router;
