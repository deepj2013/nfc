import APIError, { HttpStatusCode } from "../exception/errorHandler.js"
import { comparePassword, encryptPassword } from "../helpers/passwordEncryption/passwordEncryption.js"
import UniversalAdmin from "../models/universalAdminModel.js"
import {getTokenOfUserService, generateTokenService} from "../services/authServices.js"
import Department from "../models/deptartmentModel.js"
import User from "../models/userModel.js"
import UserAssignment from "../models/UserAssignment.js"
import Role from "../models/roleModel.js"
import Restaurant from "../models/facility_restaurantModel.js"
import Kitchen from "../models/kitchenModel.js"

import publicwebsiteFunctionModel from "../models/publicwebsiteFunctionModel.js"
import PublicFunctionModel from "../models/publicwebsiteFunctionModel.js"

//#region Admin Signup Service
export const adminSignUpService = async (name, email, password) => {
    try {
      // Hashing Password
        password = await encryptPassword(password)
        const lastAdmin = await UniversalAdmin.findOne().sort({ userId: -1 }).exec();
        let userId = lastAdmin ? lastAdmin.userId + 1 : 1;
     
        // Preparing Object To Insert
        let adminObject = {
            name: name,
            email: email,
            password: password,
            userId: userId
        }
        let universaladmin = await UniversalAdmin.create(adminObject)
        await universaladmin.save()
        // Resolve Promise
        return Promise.resolve()
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}
//#endregion

//#region Admin Login Service
export const adminLoginService = async (userId, password) => {
    try {
    //#region User Pipeline
        let userPipeline = [
            {
                $project: {
                    email: { $toLower: '$email' },
                    status: '$status',
                    password: '$password',
                    name: '$name',
                    role_id: '$role_id',
                    
                }
            },
            {
                $match: {
                    email: userId
                }
            }
        ]
        //#endregion
        let result = await UniversalAdmin.aggregate(userPipeline)
        if (result.length == 0) {
            throw new APIError("UNAUTHORIZED_REQUEST", HttpStatusCode.UNAUTHORIZED_REQUEST, true, 'User not found.');
        }
        let userDetails = result[0]
        let hashedPassword = userDetails.password
        let isPasswordMatched = await comparePassword(password, hashedPassword)
        if (isPasswordMatched) {
         // getting Token of User
            let tokenObj = await getTokenOfUserService(userDetails._id)

            if (tokenObj == null || new Date().getTime() > tokenObj.expiresAt) {
                await generateTokenService(userDetails._id)
                // getting Token of User
                tokenObj = await getTokenOfUserService(userDetails._id)
            }
          console.log(userDetails)
          
            return {
                token: tokenObj.token,
                expiresAt: tokenObj.expiresAt,
                userName: userDetails.name,
                role_id: userDetails.role_id
            }
        }
        else {
            throw new APIError("UNAUTHORIZED_REQUEST", HttpStatusCode.UNAUTHORIZED_REQUEST, true, 'Password does not match.');
        }

    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}
//#endregion

const generateDepartmentId = async () => {
  const lastDepartment = await Department.findOne().sort({ department_id: -1 }).exec();

  if (!lastDepartment) {
    return 'DEP001';
  }

  const lastIdNumber = parseInt(lastDepartment.department_id.substring(3), 10);
  const newIdNumber = lastIdNumber + 1;

  return `DEP${String(newIdNumber).padStart(3, '0')}`;
};

export const createDepartmentService = async (data) => {
  try {
    const { departmentName, headOfDepartment, createdBy } = data;

    // Validate required fields
    if (!departmentName || !headOfDepartment) {
      throw new APIError('Validation Error', 400, true, 'Department name and head of department are required');
    }

    // Check if the head of department exists
    const userExists = await User.findOne({ user_id: headOfDepartment });
    if (!userExists) {
      throw new APIError('Not Found', 404, true, 'Head of Department not found');
    }

    // Generate a new department ID
    const department_id = await generateDepartmentId();
    

    // Create a new department
    const newDepartment = new Department({
      departmentName,
      department_id,
      headOfDepartment,
      createdBy,
    });

    const result = await newDepartment.save();

    return result;

  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    } else {
      throw new APIError('Internal Server Error', 500, true, error.message);
    }
  }
};

export const getAllDepartmentsService = async (page = 1, limit) => {
  try {
    // Define the aggregation pipeline
    const pipeline = [
      // Project to include only necessary fields and exclude _id
      {
        $project: {
          _id: 0, // Hide the _id field
          departmentName: 1,
          department_id: 1,
          headOfDepartment: 1,
          createdBy: 1
        }
      },
      // Skip documents for pagination
      { $skip: (page - 1) * limit },

      // Limit the results for pagination
      { $limit: limit }
    ];

    // Execute the aggregation pipeline
    const departments = await Department.aggregate(pipeline);

    // Get the total count of departments
    const totalCount = await Department.countDocuments();

    // Return the count and result
    return {
      count: totalCount,    // Total number of departments
      result: departments,  // Paginated result
    };
  } catch (error) {
    throw new APIError('Internal Server Error', 500, true, error.message);
  }
};

export const updateDepartmentService = async (department_id, data) => {
  
  try {
    const { departmentName, headOfDepartment } = data;

    // Validate required fields
    if (!departmentName || !headOfDepartment) {
      throw new APIError('Validation Error', 400, true, 'Department name and head of department are required');
    }

    // Check if the head of department exists
    const userExists = await User.findOne({ user_id: headOfDepartment });
    if (!userExists) {
      throw new APIError('Not Found', 404, true, 'Head of Department not found');
    }

    // Find and update the department
    const updatedDepartment = await Department.findOneAndUpdate(
      { department_id : `"${department_id}" `},
      { departmentName, headOfDepartment },
      { new: true, runValidators: true }
    );

    if (!updatedDepartment) {
      throw new APIError('Not Found', 404, true, 'Department not found');
    }

    return updatedDepartment;

  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    } else {
      throw new APIError('Internal Server Error', 500, true, error.message);
    }
  }
};


export const getAllUserService = async () => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "roles",            // name of your Role collection
          localField: "role_id",
          foreignField: "role_id",
          as: "role_info"
        }
      },
      {
        $unwind: {
          path: "$role_info",
          preserveNullAndEmptyArrays: true // still include if no matching role
        }
      },
      {
        $addFields: {
          role_name: "$role_info.role_name" // directly add role_name
        }
      },
      {
        $project: {
          password: 0,
          __v: 0,
          role_info: 0 // remove full role_info object
        }
      }
    ]);

    return users;
  } catch (error) {
    throw new APIError("Internal Server Error", 500, true, error.message);
  }
};
  

export const assignUserToEntityService = async (payload) => {
  const {
    user_id,
    role_id,
    restaurant_id,
    kitchen_code,
    department_id,
    designation,
    assigned_by
  } = payload;

  // 1️⃣ Basic Required Fields Validation
  if (!user_id || !role_id || !designation || !assigned_by) {
    throw new APIError("Missing required fields", 400);
  }

  // 2️⃣ Check if User Exists
  const user = await User.findOne({ user_id });
  if (!user) throw new APIError(`User with ID ${user_id} does not exist`, 404);

  // 3️⃣ Check if Role Exists
  const role = await Role.findOne({ role_id });
  if (!role) throw new APIError(`Role with ID ${role_id} does not exist`, 404);

  // 4️⃣ If restaurant_id is present, validate it
  if (restaurant_id) {
    const restaurant = await Restaurant.findOne({ restaurant_id });
    if (!restaurant) throw new APIError(`Restaurant with ID ${restaurant_id} does not exist`, 404);
  }

  // 5️⃣ If kitchen_code is present, validate it
  if (kitchen_code) {
    const kitchen = await Kitchen.findOne({ kitchen_code });
    if (!kitchen) throw new APIError(`Kitchen with code ${kitchen_code} does not exist`, 404);
  }

  // 6️⃣ If department_id is present, validate it
  if (department_id) {
    const department = await Department.findOne({ department_id });
    if (!department) throw new APIError(`Department with ID ${department_id} does not exist`, 404);
  }

  // 7️⃣ Check for Duplicate Assignment
  const existing = await UserAssignment.findOne({
    user_id,
    role_id,
    restaurant_id: restaurant_id || null,
    department_id: department_id || null,
  });

  if (existing) {
    throw new APIError("User is already assigned to this role/entity", 409);
  }

  // 8️⃣ Save Assignment
  const assignment = new UserAssignment(payload);
  return await assignment.save();
};

export const createFunctionService = async (payload) => {
  const { title, date, galleryImages } = payload;

  // 1️⃣ Validate Required Fields
  if (!title || !date || !galleryImages || !Array.isArray(galleryImages) || galleryImages.length === 0) {
    throw new APIError('Missing required fields: title, date, or images', 400);
  }

  // 2️⃣ Check for Duplicate Title (Optional)
  const exists = await PublicFunctionModel.findOne({ title, date });
  if (exists) {
    throw new APIError('A function with the same title and date already exists', 409);
  }

  // 3️⃣ Save Function
  const newFunction = new PublicFunctionModel({
    title,
    date,
    galleryImages
  });

  return await newFunction.save();
};

export const getAllFunctionsService = async () => {
  return await PublicFunctionModel.find().sort({ date: -1 });
};

export const updateFunctionById = async (id, payload) => {
  const { title, date, galleryImages = [], mode = 'append' } = payload;

  const existing = await PublicFunctionModel.findById(id);
  if (!existing) throw new Error('Function not found');

  existing.title = title || existing.title;
  existing.date = date || existing.date;

  if (mode === 'replace') {
    // Fully replace gallery
    existing.galleryImages = galleryImages;
  } else {
    // Merge new images with existing
    const existingSet = new Set(existing.galleryImages);
    galleryImages.forEach((img) => existingSet.add(img));
    existing.galleryImages = Array.from(existingSet);
  }

  return await existing.save();
};

// For preview (first image only + title + date)
export const getFunctionPreviewWithImage = async (page, limit) => {
  const skip = (page - 1) * limit;

  const result = await PublicFunctionModel.aggregate([
    { $sort: { date: -1 } },
    { $skip: skip },
    { $limit: limit },
    {
      $project: {
        title: 1,
        date: 1,
        previewImage: { $arrayElemAt: ['$galleryImages', 0] }
      }
    }
  ]);

  return result;
};

// For full data (galleryImages, etc.)
export const getFunctionListWithPagination = async (page, limit) => {
  const skip = (page - 1) * limit;
  return await publicwebsiteFunctionModel.find({})
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .select('_id title date galleryImages');
};
