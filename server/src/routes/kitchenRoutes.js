import express from "express";
import {
  getKitchenOrders,
  updateKitchenItemStatus,
  updateKitchenOrderStatus
} from "../controllers/kitchenController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();


// router.get("/orders",[auth],(req, res)=>{res.send("kitchen")})

router.get("/orders", [auth], getKitchenOrders);
router.patch("/update-status/:orderId", [auth], updateKitchenOrderStatus); // ✅
router.patch("/update-itemstatus/:orderId/:itemId", [auth],updateKitchenItemStatus);

export default router;
