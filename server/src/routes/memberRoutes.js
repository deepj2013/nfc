import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  createMemberCategoryController,
  getMemberCategoriesController,
  updateMemberCategoryController,
  toggleMemberCategoryStatusController,
    createMemberController,
    createDependentController,
    updateMemberController,
    updateDependentController,
    updateMemberStatusController,
    updateDependentStatusController,
    getAllMembersController,
    getDependentsByMemberController,
    getMemberByIdController,
} from "../controllers/memberController.js";

const router = express.Router();

router.post("/membercategory", [auth], createMemberCategoryController);
router.get("/membercategory", [auth], getMemberCategoriesController);
router.put("/membercategory/:id", [auth], updateMemberCategoryController);
router.patch(
  "/membercategory/:id/status",
  [auth],
  toggleMemberCategoryStatusController
);

// Member Routes
router.post("/member", [auth], createMemberController);
router.put("/member/:id", [auth], updateMemberController);
router.patch("/member/:id/status", [auth], updateMemberStatusController);
router.get("/members", [auth], getAllMembersController);
router.get("/member/:memberId", auth, getMemberByIdController);

// Dependent Routes
router.post("/member/:id/dependent", [auth], createDependentController);
router.put("/dependent/:dependentId", [auth], updateDependentController);
router.patch(
  "/dependent/:dependentId/status",
  [auth],
  updateDependentStatusController
);
router.get("/member/:id/dependents", [auth], getDependentsByMemberController);

export default router;
