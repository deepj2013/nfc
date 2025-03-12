import {
  createMemberCategory,
  getMemberCategories,
  updateMemberCategory,
  toggleMemberCategoryStatus,
  createMember,
  createDependent,
  updateMember,
  updateDependent,
  updateMemberStatus,
  updateDependentStatus,
  getAllMembers,
  getDependentsByMember,
  getMemberById,
  depositInWalletService,
  withdrawFromWalletService,
  getTransactionHistoryService,
  updateChequeStatusService,
  checkInMemberService,
  checkOutMemberService,
  getMemberHistory,
  getAllHistory,
  bulkUploadMembersService,
  updateWalletBalanceService,
  fetchMemberDetails,
  createCredentials,
} from "../services/memberServices.js";

export const getMemberDetails = async (req, res) => {
  try {
      const { memberId, emailId, mobileNumber } = req.query;

      if (!memberId && !emailId && !mobileNumber) {
          return res.status(400).json({ success: false, message: "Provide at least one identifier (memberId, emailId, or mobileNumber)." });
      }

      const memberDetails = await fetchMemberDetails({ memberId, emailId, mobileNumber });

      if (!memberDetails) {
          return res.status(404).json({ success: false, message: "Member not found." });
      }

      return res.status(200).json({ success: true, data: memberDetails });
  } catch (error) {
      console.error("Error fetching member details:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createMemberPassword = async (req, res) => {
  try {
    const { memberId, email, mobile, password } = req.body;
    const result = await createCredentials(memberId, email, mobile, password);
    return res.status(201).json({ sucess:true, result});
  } catch (error) {
    res.status(error.httpCode || 500).json({ error: error.message });
  }
};

export const resetMemberPassword = async (req, res) => {
  try {
    const { memberId, newPassword } = req.body;
    const adminId = req.admin.id;

    const result = await resetPassword(memberId, newPassword, adminId);
    return res.status(200).json(successResponse("Password reset successfully", result));
  } catch (error) {
    res.status(error.httpCode || 500).json({ error: error.message });
  }
};

export const createMemberCategoryController = async (req, res) => {
  try {
    const result = await createMemberCategory(req.body);
    return res.status(201).json({ msg: "success", result });
  } catch (error) {
    res.status(error.httpCode || 500).json({ error: error.message });
  }
};

export const getMemberCategoriesController = async (req, res) => {
  try {
    const result = await getMemberCategories();
    return res.status(200).json({ msg: "success", result });
  } catch (error) {
    res.status(error.httpCode || 500).json({ error: error.message });
  }
};

export const updateMemberCategoryController = async (req, res) => {
  try {
    const { id } = req.params; // ID passed as a URL parameter
    const result = await updateMemberCategory(id, req.body);
    return res.status(200).json({ msg: "success", result });
  } catch (error) {
    res.status(error.httpCode || 500).json({ error: error.message });
  }
};

export const toggleMemberCategoryStatusController = async (req, res) => {
  try {
    const { id } = req.params; // ID passed as a URL parameter
    const { status } = req.body;
    const result = await toggleMemberCategoryStatus(id, status);
    return res.status(200).json({ msg: "success", result });
  } catch (error) {
    res.status(error.httpCode || 500).json({ error: error.message });
  }
};

// Create Member
export const createMemberController = async (req, res) => {
  try {
    const result = await createMember(req.body);
    res.status(201).json({ msg: "Member created successfully", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};






// Create Dependent
export const createDependentController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log(data, "controller")
    const result = await createDependent(id, data);
    
    res.status(201).json({ msg: "Dependent created successfully", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Member
export const updateMemberController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateMember(id, req.body);
    res.status(200).json({ msg: "Member updated successfully", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Dependent
export const updateDependentController = async (req, res) => {
  try {
    const { dependentId } = req.params;
    const result = await updateDependent(dependentId, req.body);
    res.status(200).json({ msg: "Dependent updated successfully", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Member Status
export const updateMemberStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateMemberStatus(id, req.body);
    res.status(200).json({ msg: "Member status updated successfully", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Dependent Status
export const updateDependentStatusController = async (req, res) => {
  try {
    const { dependentId } = req.params;
    const { status } = req.body;
    const result = await updateDependentStatus(dependentId, status);
    res
      .status(200)
      .json({ msg: "Dependent status updated successfully", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get List of Members
export const getAllMembersController = async (req, res) => {
  try {
    const result = await getAllMembers();
    res.status(200).json({ msg: "Members fetched successfully", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Dependent Related to Member
export const getDependentsByMemberController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getDependentsByMember(id);
    res.status(200).json({ msg: "Dependents fetched successfully", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Single Member Detail by MemberId
export const getMemberByIdController = async (req, res) => {
  try {
    const { memberId } = req.params;
    const result = await getMemberById(memberId);
    res
      .status(200)
      .json({ msg: "Member details fetched successfully", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deposit in wallet controller
export const depositInWalletController = async (req, res) => {
  try {
    const result = await depositInWalletService(req.body);
    res.status(200).json({ msg: "Deposit successful", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Withdraw from wallet controller
export const withdrawFromWalletController = async (req, res) => {
  try {
    const result = await withdrawFromWalletService(req.body);
    res.status(200).json({ msg: "Withdrawal successful", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get transaction history controller
export const getTransactionHistoryController = async (req, res) => {
  try {
    const result = await getTransactionHistoryService(req.params.memberId);
    res
      .status(200)
      .json({ msg: "Transaction history fetched successfully", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update cheque status controller
export const updateChequeStatusController = async (req, res) => {
  try {
    const { chequeNumber, status } = req.body;
    const result = await updateChequeStatusService(chequeNumber, status);
    res.status(200).json({ msg: result.message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all cheques by status controller
export const getAllChequesController = async (req, res) => {
  try {
    const { status } = req.params;
    const cheques = await getAllChequesService(status);
    res.status(200).json({ msg: "Cheques fetched successfully", cheques });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller for member check-in
export const checkInController = async (req, res) => {
  const { memberId, createdBy, location } = req.body;

  try {
    const response = await checkInMemberService(memberId, createdBy, location);
    res.status(200).json({ status: "success", message: response });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

// Controller for member check-out
export const checkOutController = async (req, res) => {
  const { memberId, updatedBy, location } = req.body;

  try {
    const response = await checkOutMemberService(memberId, updatedBy, location);
    res.status(200).json({ status: "success", message: response });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

// Controller for getting the check-in/out history of all members with pagination
export const getAllHistoryController = async (req, res) => {
  
  const { page, limit, startDate, endDate } = req.query;

  try {
    const history = await getAllHistory(page, limit, startDate, endDate);
    res.status(200).json({ status: "success", data: history });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

// Controller for getting the check-in/out history of a single member with pagination
export const getMemberHistoryController = async (req, res) => {
  const { memberId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const history = await getMemberHistory(memberId, page, limit);
    res.status(200).json({ status: "success", data: history });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};


//temporary controller for bulk upload 
export const bulkUploadMembersController = async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
      }

      const result = await bulkUploadMembersService(req.file.path);
      
      res.status(201).json({
          message: 'Bulk members upload completed',
          totalUploaded: result.totalUploaded,
          failedEntries: result.failedEntries,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export const updateWalletBalanceController = async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
      }

      const result = await updateWalletBalanceService(req.file.path);
      
      res.status(200).json({
          message: 'Wallet balance update process completed',
          totalUpdated: result.totalUpdated,
          failedEntries: result.failedEntries,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

