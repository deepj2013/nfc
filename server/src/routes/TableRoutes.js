import express from "express";
import {
  assignTable,
  releaseTable,
  getActiveOccupiedTables,
  getOccupiedDuration
} from "../controllers/tableController.js";

const router = express.Router();

router.post("/assign", assignTable);
router.patch("/release/:table_id", releaseTable);
router.get("/active", getActiveOccupiedTables);
router.get("/duration/:table_id", getOccupiedDuration);

export default router;
