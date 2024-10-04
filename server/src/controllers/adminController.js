import {
  adminLoginService,
  adminSignUpService,
  createDepartmentService,
  getAllDepartmentsService,
  updateDepartmentService,
  getAllUserService,
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
