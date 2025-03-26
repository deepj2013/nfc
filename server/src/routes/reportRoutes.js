import express from "express";
import { getDailySales, getMemberReport, getPaymentModeBreakdown, getTableUsage, getTopItems } from "../controllers/reportControllers.js";
import { auth } from "../middlewares/auth.js";


const router = express.Router();

router.get("/daily-sales",[auth], getDailySales);
router.get("/table-usage",[auth], getTableUsage);
router.get("/top-items",[auth], getTopItems);
router.get("/payment-modes",[auth], getPaymentModeBreakdown);
router.get("/member/:memberId",[auth], getMemberReport);

export default router;