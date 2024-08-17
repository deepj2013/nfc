import { createUserService,userLoginService } from "../services/userServices.js";

export const createUserController = async (req, res, next) => {
  try {
    let {
      user_name,
      mobile_number,
      email_id,
      password,
      role_id,
      user_id_parent,
    } = req.body;
    // Create a UserData object with the required fields
    const userData = {
      user_name,
      mobile_number,
      email_id: email_id.toLowerCase(),
      password,
      role_id,
      user_id_parent,
    };

    // Call the user service to create a new user
    const result = await createUserService(userData);
    return res.status(200).json({ msg: "Success", result });
  } catch (error) {
    next(error);
  }
};

export const userLoginController = async (req, res, next) => {
  try {
    
    let { email_id, password } = req.body;
    // Call the user service to authenticate the user
    const result = await userLoginService(email_id, password);
    return res.status(200).json({ msg: "Success", result });
  } catch (error) {
    next(error);
  }
}