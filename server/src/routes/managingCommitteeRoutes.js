import express from "express";
const router = express.Router();

import {
  createCommitteeController,
  getAllCommitteeController,
  getCommitteeByIdController,
  updateCommitteeController,
  deleteCommitteeController,
  getCurrentCommitteePublicController,
} from "../controllers/managingCommitteeController.js";

// ✅ Admin Routes
router.post("/admin/committee", createCommitteeController);
router.get("/admin/committee", getAllCommitteeController);
router.get("/admin/committee/:id", getCommitteeByIdController);
router.put("/admin/committee/:id", updateCommitteeController);
router.delete("/admin/committee/:id", deleteCommitteeController);

// 🌐 Public Route
router.get("/public/committee", getCurrentCommitteePublicController);

export default router;