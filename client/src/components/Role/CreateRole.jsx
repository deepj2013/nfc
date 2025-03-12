import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { getStorageValue } from "../../services/LocalStorageServices";
import { roleCreationServices } from "../../redux/thunk/micellaneousServices";

const CreateRole = ({ isOpen, onClose, setFeedBackModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userDetails = getStorageValue("userDetails");

  const [formData, setFormData] = useState({
    role_name: "",
    role_description: "",
    is_active: null,
    level: "",
    supervisor: null,
    created_by: userDetails?.role_id,
    updated_by: userDetails?.role_id,
    errors: {},
  });
  const { role_name, role_description, is_active, level, supervisor, errors } =
    formData;

  const upadteStateHandler = (e) => {
    let { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handleValidation = () => {
    let error = {};
    let formIsValid = true;

    if (!role_name || !role_name.trim()) {
      error.role_nameError = " * First name can't be empty";
      formIsValid = false;
    }

    if (!role_description || !role_description.trim()) {
      error.role_descriptionError = " * Smiddle name can't be empty";
      formIsValid = false;
    }

    if (!is_active || !is_active.trim()) {
      error.is_activeError = " * Surname can't be empty";
      formIsValid = false;
    }
    if (!level || !level.trim()) {
      error.levelError = " * Father Name can't be empty";
      formIsValid = false;
    }
    if (!supervisor || !supervisor.trim()) {
      error.supervisorError = " * Husband Name can't be empty";
      formIsValid = false;
    }

    setFormData((prev) => ({ ...prev, errors: error }));
    return formIsValid;
  };

  const roleCreationHandler = async (e) => {
    e.preventDefault();
    let formIsValid = handleValidation();
    if (!formIsValid) {
      return;
    }
    try {
      delete [formData.errors];
      let response = await dispatch(roleCreationServices(formData)).unwrap();
      successToast("Add Sucessfully");
      // navigate("/members");
    } catch (error) {
      console.log(error);
      logger(error);
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
        // onClick={onClose}
      ></div>
      <div
        className={`bg-white  overflow-scroll w-[95vw] lg:w-[500px] py-4 rounded-lg h-[95vh] lg:h-auto  shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ minHeight: "100px" }}
      >
        <button
          onClick={onClose}
          className="text-2xl absolute right-2 top-2 text-secondry"
        >
          <FaXmark />
        </button>
        <div className="p-4 flex flex-col items-center">
          <h2 className="text-2xl  w-full font-medium lg:px-10">
            Role Creation
          </h2>
          {/* <img className="w-64  h-32 my-6 object-cover" src={TeacherFeedback}/> */}
          <p className="text-xl mt-4 w-full"></p>
          <div className="w-full lg:px-10">
            <FormInput
              errors={errors.role_nameError}
              //   width={"w-[30%]"}
              placeholder={"Role name"}
              value={role_name}
              name={"role_name"}
              onChange={upadteStateHandler}
            />
            <FormInput
              errors={errors.role_descriptionError}
              //   width={"w-[30%]"}
              placeholder={"Role Description"}
              value={role_description}
              name={"role_description"}
              onChange={upadteStateHandler}
            />
            <FormInput
              errors={errors.is_activeError}
              //   width={"w-[30%]"}
              placeholder={"Isactive"}
              value={is_active}
              name={"is_active"}
              onChange={upadteStateHandler}
            />
            <FormInput
              errors={errors.levelError}
              //   width={"w-[30%]"}
              placeholder={"level"}
              value={level}
              name={"level"}
              onChange={upadteStateHandler}
            />

            <FormInput
              errors={errors.supervisorError}
              //   width={"w-[30%]"}
              placeholder={"supervisor"}
              value={supervisor}
              name={"supervisor"}
              onChange={upadteStateHandler}
            />

            <button
              onClick={(e) => roleCreationHandler(e)}
              type="submit"
              className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;

const FormInput = ({
  width,
  showButton,
  placeholder,
  name,
  onChange,
  value,
  type,
  errors,
}) => {
  return (
    <div className={twMerge("mb-5 relative", width)}>
      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">
        {placeholder}
      </label>
      <input
        onChange={onChange}
        value={value}
        name={name}
        type={type ? type : "text"}
        id="email"
        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
        // chooseDate={date}
      />
      <span style={{ color: "red" }}>{errors}</span>
      {showButton && (
        <button className="text-sm bg-theme text-white absolute top-[34px] p-1.5 right-2 rounded-lg ">
          Genrate Code
        </button>
      )}
    </div>
  );
};
