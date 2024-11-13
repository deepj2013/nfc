import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStorageValue } from "../../services/LocalStorageServices";
import {
  errorToast,
  logger,
  successToast,
  validateFields,
} from "../../utils/Helper";
import Button from "../../components/common/Button";
import FormInput from "../../components/common/FormInput";
import FormSelect from "../../components/common/FromSelect";
import {
  addDependentServices,
  getMemberService,
} from "../../redux/thunk/useMangementServices";
let userDetails = getStorageValue("userDetails");
const initialState = {
  firstName: "",
  middleName: "",
  surname: "",
  relationship: "",
  dateOfBirth: "",
  gender: "",
  bloodGroup: "",
  mobileNumber: "",
  emailId: "",
  phoneNumber: "",
  picture: null,
  createdBy: userDetails?.role_id,
  updatedBy: userDetails?.role_id,
  errors: {},
};

const AddDependent = ({
  isOpen,
  onClose,
  dropdownData,
  selectedItem,
  type,
}) => {
  
  const [formData, setFormData] = useState(initialState);
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const [memberNumber, setMemberNumber] = useState(""); // New State for Member Number
  const [isVerifying, setIsVerifying] = useState(false); // State to track verification process

  const verifyMemberHandler = async () => {
    if (!memberNumber) {
      errorToast("Please enter a member number.");
      return;
    }
  
    setIsVerifying(true);
    try {
      const response = await dispatch(getMemberService(memberNumber)).unwrap();
      successToast("Member verified successfully!");
      // Update the formData with the verified memberNumber as memberId
      setFormData((prev) => ({ ...prev, memberId: memberNumber })); 
      
    } catch (error) {
      logger(error);
      errorToast("Member not found. Please check the number and try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const dispatch = useDispatch();

  const {
    memberId,
    firstName,
    middleName,
    surname,
    relationship,
    dateOfBirth,
    gender,
    bloodGroup,
    mobileNumber,
    emailId,
    phoneNumber,
    errors,
  } = formData;

  const updateStateHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleValidation = () => {
    const validationRules = {
      firstName: { required: true },
      middleName: { required: false },
      surname: { required: true },
      relationship: { required: true },
      dateOfBirth: { required: true },
      gender: { required: true },
      bloodGroup: { required: true },
      mobileNumber: { required: true, },
      emailId: { required: true, email: true },
      phoneNumber: { required: false,  },
      picture: { required: true, },
    };

    const formDataToValidate = {
      firstName,
      middleName,
      surname,
      relationship,
      dateOfBirth,
      gender,
      bloodGroup,
      mobileNumber,
      emailId,
      phoneNumber,
      picture,
    };

    const { formIsValid, errors } = validateFields(
      formDataToValidate,
      validationRules
    );
    setFormData((prev) => ({ ...prev, errors }));
    return formIsValid;
  };

  // const addDependentHandler = async () => {
  //   const formIsValid = handleValidation();
  //   if (!formIsValid) {
    
  //     return;
  //   }

  //   const formDataToSend = new FormData();
   
  //   formDataToSend.append("picture", picture);
  //   Object.keys(formData).forEach((key) => {
  //     if (key !== "errors" && formData[key]) {
  //       formDataToSend.append(key, formData[key]);
  //     }
  //   });
  
  //   if (!formData.memberId) {
  //     errorToast("Member must be verified before adding a dependent.");
  //     return;
  //   }
  
  //   try {
  //     const response = await dispatch(
  //       addDependentServices({ id: formData.memberId, payload: formDataToSend })
  //     ).unwrap();
    
  //     setFormData(initialState);
  //     setPicture(null);
  //     setPreview(null);
  //     successToast("Dependent added successfully!");
  //     onClose();
  //   } catch (error) {
  //     logger(error);
  //     errorToast("Failed to add dependent. Try again later.");
  //   }
  // };

  const addDependentHandler = async () => {
    const formIsValid = handleValidation();
    if (!formIsValid) {
      return;
    }
  
    if (!formData.memberId) {
      errorToast("Member must be verified before adding a dependent.");
      return;
    }
  
    // Convert mobileNumber to number type
    const updatedFormData = {
      ...formData,
      mobileNumber: Number(formData.mobileNumber),
    };
  
    const formDataToSend = new FormData();
    formDataToSend.append("picture", picture);
    Object.keys(updatedFormData).forEach((key) => {
      if (key !== "errors" && updatedFormData[key]) {
        formDataToSend.append(key, updatedFormData[key]);
      }
    });
  
    // Log the payload to the console
    console.log("Payload to Backend:", {
      id: formData.memberId,
      payload: updatedFormData,
    });
  
    try {
      const response = await dispatch(
        addDependentServices({ id: updatedFormData.memberId, payload: updatedFormData })
      ).unwrap();
  
      setFormData(initialState);
      setPicture(null);
      setPreview(null);
      successToast("Dependent added successfully!");
      onClose();
    } catch (error) {
      logger(error);
      errorToast("Failed to add dependent. Try again later.");
    }
  };

  return (
    <div
      className={`fixed w-full inset-0 flex items-center justify-center z-[999] transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      ></div>
      <div
        className={`bg-white w-[95vw] px-4 lg:w-[500px] py-4 rounded-lg h-[95vh] lg:h-auto shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          onClick={() => {
            setFormData(initialState);
            setPicture(null);
            setPreview(null);
            onClose();
          }}
          className="text-2xl absolute right-2 top-2 text-secondary"
        >
          <FaXmark />
        </button>

        <div className="flex flex-col items-center h-[600px] overflow-scroll">
          <h2 className="text-2xl font-medium lg:px-8">Add Dependent</h2>

          <div className="w-full lg:px-8 h-[400px] pb-5">
            <div className="mb-4 flex items-center gap-4">
              <FormInput
                width="flex-1" // Take up remaining space
                label="Enter Member Number"
                placeholder="Member Number"
                value={memberNumber}
                onChange={(e) => setMemberNumber(e.target.value)}
              />
              <Button
                name="Verify"
                width="w-auto" // Let button size adapt to content
                onClick={verifyMemberHandler}
                disabled={isVerifying}
                style={"bg-blue-500 hover:bg-blue-600 text-white"}
              />
            </div>

            {formData.memberId && (
              <p className="text-green-500 text-sm mt-2">
                Member verified! Proceed to fill the form.
              </p>
            )}

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 h-24 w-24 object-cover rounded-full"
                />
              )}
            </div>

            <FormInput
              errors={errors?.firstName}
              placeholder={"First Name"}
              value={firstName}
              name={"firstName"}
              onChange={updateStateHandler}
            />
            <FormInput
              errors={errors?.middleName}
              placeholder={"Middle Name"}
              value={middleName}
              name={"middleName"}
              onChange={updateStateHandler}
            />
            <FormInput
              errors={errors?.surname}
              placeholder={"Surname"}
              value={surname}
              name={"surname"}
              onChange={updateStateHandler}
            />
            <FormInput
              errors={errors?.relationship}
              placeholder={"Relationship"}
              value={relationship}
              name={"relationship"}
              onChange={updateStateHandler}
            />
            <FormInput
              errors={errors?.dateOfBirth}
              type={"date"}
              placeholder={"Date of Birth"}
              value={dateOfBirth}
              name={"dateOfBirth"}
              onChange={updateStateHandler}
            />
            <FormSelect
              placeholder="Select Gender"
              name="gender"
              onChange={updateStateHandler}
              value={gender}
              options={["Male", "Female", "Other"]}
              errors={errors.genderError}
            />
            <FormSelect
              placeholder="Select Blood Group"
              name="bloodGroup"
              onChange={updateStateHandler}
              value={bloodGroup}
              options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
            />
            <FormInput
              errors={errors?.mobileNumber}
              placeholder={"Mobile Number"}
              value={mobileNumber}
              name={"mobileNumber"}
              onChange={updateStateHandler}
            />
            <FormInput
              errors={errors?.emailId}
              placeholder={"Email ID"}
              value={emailId}
              name={"emailId"}
              onChange={updateStateHandler}
            />
            <FormInput
              errors={errors?.phoneNumber}
              placeholder={"Phone Number"}
              value={phoneNumber}
              name={"phoneNumber"}
              onChange={updateStateHandler}
            />

            <div className="pb-10"></div>
          </div>
        </div>

        <Button
          name={"Add"}
          style={"w-[90%] ml-6 py-2 mb-1"}
          onClick={addDependentHandler}
        />
      </div>
    </div>
  );
};

export default AddDependent;
