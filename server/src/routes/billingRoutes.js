import express from "express";
import {
  createBill,
  settleBill,
  getCurrentBills,
  getSettledBills,
  printInvoice
} from "../controllers/billingController.js";

const router = express.Router();

router.post("/create", createBill);
router.patch("/settle/:billId", settleBill);
router.get("/current", getCurrentBills);
router.get("/settled", getSettledBills);
router.get("/print-invoice/:billId", printInvoice);

export default router;
