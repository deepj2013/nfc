import { adminLoginService, adminSignUpService, createDepartmentService, getAllUserService} from "../services/adminServices.js"


export const adminSignupController = async (req, res, next) => {
    try {
        let { name, email, password } = req.body        
        await adminSignUpService(name, email.toLowerCase(), password)
        return res.status(200).json({ msg: 'Success' })
    } catch (error) {
        next(error)
    }
}

export const adminLoginController = async (req, res, next) => {
    try {
        let { userId, password } = req.body

        const result = await adminLoginService(userId, password)

        return res.status(200).json({ msg: 'Success', result })
    } catch (error) {
        next(error)
    }
}

export const createDepartmentController = async (req, res) => {
    try {
      const result = await createDepartmentService(req.body);
      return res.status(201).json({ msg: "Department created successfully", result });
    } catch (error) {
      res.status(error.httpCode || 500).json({ error: error.message });
    }
  };

  export const getDepartmentController = async (req, res) => {
    try {
      const { departmentId } = req.params; // departmentId passed as a URL parameter
  
      // Find the department by custom department_id
      const department = await Department.findOne({ department_id: departmentId });
      if (!department) {
        return res.status(404).json({ error: "Department not found" });
      }
  
      return res.status(200).json({ msg: "success", department });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const   getAllUserController  = async (req, res) => {
    try {
      const result = await getAllUserService();
      return res.status(201).json({ msg: "Department created successfully", result });
    } catch (error) {
      res.status(error.httpCode || 500).json({ error: error.message });
    }
  };