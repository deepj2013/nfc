import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
// import Dropdown from "../common/DropDown";
import { useDispatch } from "react-redux";

import {
  GENDER_DATA,
  errorToast,
  logger,
  successToast,
  validateFields,
} from "../../utils/Helper";
import Button from "../../components/common/Button";

import {
  addDependentServices,
  addDepositServices,
} from "../../redux/thunk/useMangementServices";
import SelectDropdown from "../../components/common/SelectDropdown";
import FormInput from "../../components/common/FormInput";

const intialState = {
  memberId: "",
  amount: null,
  depositType: "",
  modeOfTransaction: "",
  transactionRef: "",
  remarks: "",
  createdBy: 1,
  updatedBy: 1,
};
const AddDependent = ({
  isOpen,
  onClose,
  setFeedBackModal,
  selectedItem,
  type,
  dropdownData,
}) => {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
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
    createdBy: 1,
    updatedBy: 1,
    errors: {},
  });
  const {
    firstName,
    middleName,
    surname,
    dateOfBirth,
    gender,
    bloodGroup,
    mobileNumber,
    emailId,
    phoneNumber,
    createdBy,
    updatedBy,
    relationship,
    errors,
  } = formData;

  const upadteStateHandler = (e) => {
    let { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handleValidation = () => {
    const validationRules = {
      firstName: { required: true },
      middleName: { required: true },
      surname: { required: true },
      relationship: { required: true },
      dateOfBirth: { required: true },
      gender: { required: true },
      bloodGroup: { required: true },
      mobileNumber: { required: true, phone: true },
      emailId: { required: true, email: true },
      phoneNumber: { required: true, phone: true },
    };
    const formData = {
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
    };
    const { formIsValid, errors } = validateFields(formData, validationRules);
    setFormData((prev) => ({ ...prev, errors }));
    return formIsValid;
  };

  const validation = () => {
    if (!memberCategory) {
      errorToast("memberCategory can't be empaty");
      return false;
    }
    return true;
  };

  const addDepositeHandler = async () => {
    let formIsValid = handleValidation();
    if (!formIsValid) {
      return;
    }
    try {
      let response = await dispatch(
        addDependentServices({ id: memberId, payload: formData })
      ).unwrap();
      setFormData(intialState);
      successToast("Dependent Added Sucessfully ");
      onClose();
    } catch (error) {
      console.log(error);
      logger(error);
    }
  };

  const handleSelectChange = (e) => {
    // setMemberId(e.target.value)
    setFormData((pre) => ({ ...pre, gender: e.target.value }));
  };

  console.log(errors);

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
        // onClick={onClose}
      ></div>
      <div
        className={`bg-white  w-[95vw] px-4 lg:w-[500px] py-4 rounded-lg h-[95vh] lg:h-auto  shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ minHeight: "100px" }}
      >
        <button
          onClick={() => {
            setFormData(intialState);
            onClose();
          }}
          className="text-2xl absolute right-2 top-2 text-secondry"
        >
          <FaXmark />
        </button>
        <div className=" flex flex-col items-center h-[600px] overflow-scroll">
          <h2 className="text-2xl  w-full font-medium lg:px-8">Add Member</h2>
          {/* <img className="w-64  h-32 my-6 object-cover" src={TeacherFeedback}/> */}
          <p className="text-xl mt-4 w-full"></p>
          <div className="w-full lg:px-8 h-[400px] pb-5">
            <SelectDropdown
              data={dropdownData}
              handleSelectChange={(e) => {
                setMemberId(e.target.value);
              }}
              // selected={formData?.memberId}
              label={"Member Id"}
              placeHolder={"Member Id"}
            />

            <FormInput
              errors={errors?.firstName}
              placeholder={"firstName"}
              value={firstName}
              name={"firstName"}
              onChange={upadteStateHandler}
            />
            <FormInput
              errors={errors?.middleName}
              placeholder={"middleName"}
              value={middleName}
              name={"middleName"}
              onChange={upadteStateHandler}
            />
            <FormInput
              errors={errors?.surname}
              placeholder={"surname"}
              value={surname}
              name={"surname"}
              onChange={upadteStateHandler}
            />
            <FormInput
              errors={errors?.relationship}
              placeholder={"relationship"}
              value={relationship}
              name={"relationship"}
              onChange={upadteStateHandler}
            />
            <FormInput
              errors={errors?.date}
              type={"date"}
              placeholder={"dateOfBirth"}
              value={dateOfBirth}
              name={"dateOfBirth"}
              onChange={upadteStateHandler}
            />

            <SelectDropdown
              data={GENDER_DATA}
              handleSelectChange={handleSelectChange}
              selected={gender}
              label={"Gender"}
              placeHolder={"Gender"}
            />

            <FormInput
              errors={errors?.bloodGroup}
              placeholder={"bloodGroup"}
              value={bloodGroup}
              name={"bloodGroup"}
              onChange={upadteStateHandler}
            />

            <FormInput
              errors={errors?.mobileNumber}
              type={"number"}
              placeholder={"mobileNumber"}
              value={mobileNumber}
              name={"mobileNumber"}
              onChange={upadteStateHandler}
            />

            <FormInput
              errors={errors?.emailId}
              placeholder={"emailId"}
              value={emailId}
              name={"emailId"}
              onChange={upadteStateHandler}
            />

            <FormInput
              errors={errors?.phoneNumber}
              placeholder={"phoneNumber"}
              value={phoneNumber}
              name={"phoneNumber"}
              type={"number"}
              onChange={upadteStateHandler}
            />

            <div className="pb-10"></div>
          </div>
        </div>

        <Button
          name={"Add"}
          style={"w-[90%] ml-6 py-2 mb-1"}
          onClick={addDepositeHandler}
        />
      </div>
    </div>
  );
};

export default AddDependent;
