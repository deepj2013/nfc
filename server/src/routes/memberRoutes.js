import express from "express";
import multer from 'multer';
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
  getAllMembersController,
  getDependentsByMemberController,
  getMemberByIdController,
  depositInWalletController,
  withdrawFromWalletController,
  getTransactionHistoryController,
  updateChequeStatusController,
  checkInController,
  checkOutController,
  getMemberHistoryController,
  getAllHistoryController,
  bulkUploadMembersController,
  updateWalletBalanceController,
  getMemberDetails,
  createMemberPassword,
  resetMemberPassword,
} from "../controllers/memberController.js";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.get('/member-detail', getMemberDetails);
router.post("/membercategory", [auth], createMemberCategoryController);
router.get("/membercategory", [auth], getMemberCategoriesController);
router.put("/membercategory/:id", [auth], updateMemberCategoryController);
router.patch("/membercategory/:id/status", [auth], toggleMemberCategoryStatusController);
router.post("/createmember-password", [auth], createMemberPassword);
router.post("/resetmember-password", resetMemberPassword);

// Member Routes
router.post("/member", [auth], createMemberController);
router.put("/member/:id", [auth], updateMemberController);
router.patch("/member/:id/status", [auth], updateMemberStatusController);
router.get("/members", [auth], getAllMembersController);
router.get("/member/:memberId", [auth], getMemberByIdController);
// router.post("/bulk-uploadMember", bulkUploadMembersController);




// Dependent Routes
router.post("/member/:id/dependent", [auth], createDependentController);
router.put("/dependent/:dependentId", [auth], updateDependentController);
router.get("/member/:id/dependents", [auth], getDependentsByMemberController);
// Route to deposit money in wallet
router.post("/member/wallet/deposit", [auth], depositInWalletController);
// Route to withdraw money from wallet
router.post("/member/wallet/withdraw", [auth], withdrawFromWalletController);
router.post("/member/wallet/updatechequestatus", [auth], updateChequeStatusController);
// Route to get transaction history
router.get("/member/:memberId/transactions",[auth],getTransactionHistoryController);
// Check-in route
router.post("/members/checkin", [auth], checkInController);
// Check-out route
router.post("/members/checkout", [auth], checkOutController);
// Get history for all members
router.get("/membercheck/inouthistory", [auth], getAllHistoryController);
// Get history for a single member
router.get(
  "/membercheck/history/:memberId",
  [auth],
  getMemberHistoryController
);
//temporary routes 
router.post('/bulk-uploadMember', upload.single('file'), bulkUploadMembersController);
router.post('/upload-walletbalance', upload.single('file'), updateWalletBalanceController);

export default router;
