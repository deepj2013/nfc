import {
  adminLoginService,
  adminSignUpService,
  createDepartmentService,
  getAllDepartmentsService,
  updateDepartmentService,
  getAllUserService,
  assignUserToEntityService,
  createFunctionService,
  getAllFunctionsService,
  updateFunctionById,
  getFunctionPreviewWithImage,
  getFunctionListWithPagination,
} from "../services/adminServices.js";

export const adminSignupController = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    await adminSignUpService(name, email, password);
    return res.status(200).json({ msg: "Success" });
  } catch (error) {
    next(error);
  }
};

export const adminLoginController = async (req, res, next) => {
  try {
    let { userId, password } = req.body;

    const result = await adminLoginService(userId, password);

    return res.status(200).json({ msg: "Success", result });
  } catch (error) {
    next(error);
  }
};

export const createDepartmentController = async (req, res) => {
  try {
    const result = await createDepartmentService(req.body);
    return res
      .status(201)
      .json({ msg: "Department created successfully", result });
  } catch (error) {
    res.status(error.httpCode || 500).json({ error: error.message });
  }
};
export const getAllDepartmentController = async (req, res) => {
  try {
    let {page, limit} = req.body
    const result = await getAllDepartmentsService(page, limit);
    return res
      .status(200)
      .json({ msg: "sucess", result });
  } catch (error) {
    res.status(error.httpCode || 500).json({ error: error.message });
  }
};

export const updateDepartmentController = async (req, res) => {
  try {
    let department_id = req.params
    const result = await updateDepartmentService(department_id,req.body);
    return res
      .status(201)
      .json({ msg: "sucess", result });
  } catch (error) {
    res.status(error.httpCode || 500).json({ error: error.message });
  }
};

export const getAllUserController = async (req, res) => {
  try {
    const result = await getAllUserService();
    return res
      .status(200)
      .json({ msg: "Sucess", result });
  } catch (error) {
    res.status(error.httpCode || 500).json({ error: error.message });
  }
};

export const assignUserToEntityController = async (req, res) => {
  try {
    const result = await assignUserToEntityService(req.body);
    res.status(200).json({ message: "User assigned successfully", result });
  } catch (error) {
    console.error("❌ Assignment Error:", error);  // ✅ LOG THE REAL ERROR
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
      error: error.stack,
    });
  }
};

export const createFunctionController = async (req, res) => {
  try {
    const result = await createFunctionService(req.body);
    res.status(200).json({ message: 'Function created successfully', result });
  } catch (error) {
    console.error('❌ Function Creation Error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
      error: error.stack,
    });
  }
};

export const getAllFunctionsController = async (req, res) => {
  try {
    const result = await getAllFunctionsService();
    res.status(200).json({ message: 'Function list retrieved', result });
  } catch (error) {
    console.error('❌ Function Fetch Error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
      error: error.stack,
    });
  }
};


export const getPublicFunctionsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const [preview, functions] = await Promise.all([
      getFunctionPreviewWithImage(page, limit),
      getFunctionListWithPagination(page, limit)
    ]);

    res.status(200).json({
      message: 'Public functions fetched successfully',
      preview,
      functions
    });
  } catch (error) {
    console.error('❌ Public Function Fetch Error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
      error: error.stack,
    });
  }
};


export const updateFunctionController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePayload = req.body;

    const updated = await updateFunctionById(id, updatePayload);
    res.status(200).json({ success: true, result: updated });
  } catch (err) {
    console.error('Error updating function:', err);
    res.status(500).json({ success: false, message: err.message || 'Server Error' });
  }
};