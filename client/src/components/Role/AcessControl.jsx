import React, { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { getStorageValue } from "../../services/LocalStorageServices";
import { roleCreationServices } from "../../redux/thunk/micellaneousServices";

// Assuming these are your menu items from API or static data
const menuOptions = [
  { id: 1, name: "Dashboard" },
  { id: 19, name: "User Management" },
  { id: 20, name: "Settings" },
  { id: 21, name: "Reports" },
  { id: 22, name: "Analytics" },
];

const AccessControl = ({ isOpen, onClose, setFeedBackModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userDetails = getStorageValue("userDetails");

  const [formData, setFormData] = useState({
    role_id: "",
    menu_ids: [], // Updated to track menu_ids
    is_active: null,
    level: "",
    supervisor: null,
    created_by: userDetails?.role_id,
    updated_by: userDetails?.role_id,
    errors: {},
  });

  const { role_name, role_description, is_active, level, supervisor, errors, menu_ids } =
    formData;

  // Update form data state
  const upadteStateHandler = (e) => {
    let { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  // Handle checkbox change for menu_ids
  const handleMenuCheckboxChange = (menuId) => {
    setFormData((prevState) => {
      const isChecked = prevState.menu_ids.includes(menuId);
      return {
        ...prevState,
        menu_ids: isChecked
          ? prevState.menu_ids.filter((id) => id !== menuId)
          : [...prevState.menu_ids, menuId],
      };
    });
  };

  // Form validation logic
  const handleValidation = () => {
    let error = {};
    let formIsValid = true;

    if (!role_name || !role_name.trim()) {
      error.role_nameError = " * Role name can't be empty";
      formIsValid = false;
    }

    if (!role_description || !role_description.trim()) {
      error.role_descriptionError = " * Role description can't be empty";
      formIsValid = false;
    }

    if (!is_active || !is_active.trim()) {
      error.is_activeError = " * Status can't be empty";
      formIsValid = false;
    }
    if (!level || !level.trim()) {
      error.levelError = " * Level can't be empty";
      formIsValid = false;
    }
    if (!supervisor || !supervisor.trim()) {
      error.supervisorError = " * Supervisor can't be empty";
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
      delete formData.errors; // Cleanup before sending the data
      let response = await dispatch(roleCreationServices(formData)).unwrap();
      successToast("Role Added Successfully");
      // Optionally navigate or handle success
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
      ></div>
      <div
        className={`bg-white  overflow-scroll w-[95vw] lg:w-[500px] py-4 rounded-lg h-[95vh] lg:h-auto shadow-xl transform transition-transform duration-300 ${
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
          <div className="w-full lg:px-10">
            <FormInput
              errors={errors.role_nameError}
              placeholder={"Role name"}
              value={role_name}
              name={"role_name"}
              onChange={upadteStateHandler}
            />
            <FormInput
              errors={errors.role_descriptionError}
              placeholder={"Role Description"}
              value={role_description}
              name={"role_description"}
              onChange={upadteStateHandler}
            />
            <FormInput
              errors={errors.is_activeError}
              placeholder={"Is active"}
              value={is_active}
              name={"is_active"}
              onChange={upadteStateHandler}
            />
            <FormInput
              errors={errors.levelError}
              placeholder={"Level"}
              value={level}
              name={"level"}
              onChange={upadteStateHandler}
            />
            <FormInput
              errors={errors.supervisorError}
              placeholder={"Supervisor"}
              value={supervisor}
              name={"supervisor"}
              onChange={upadteStateHandler}
            />

            {/* Multi-checkbox options for menu_ids */}
            <div className="my-4">
              <h3 className="font-medium">Menu Access</h3>
              {menuOptions.map((menu) => (
                <label key={menu.id} className="flex items-center space-x-2 my-2">
                  <input
                    type="checkbox"
                    checked={menu_ids.includes(menu.id)}
                    onChange={() => handleMenuCheckboxChange(menu.id)}
                  />
                  <span>{menu.name}</span>
                </label>
              ))}
            </div>

            {/* Display selected menu_ids */}
            {menu_ids.length > 0 && (
              <div className="my-4">
                <h3 className="font-medium">Selected Menus:</h3>
                <ul className="list-disc list-inside">
                  {menu_ids.map((id) => {
                    const menu = menuOptions.find((menu) => menu.id === id);
                    return <li key={id}>{menu?.name}</li>;
                  })}
                </ul>
              </div>
            )}

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

export default AccessControl;

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
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
      <span style={{ color: "red" }}>{errors}</span>
      {showButton && (
        <button className="text-sm bg-theme text-white absolute top-[34px] p-1.5 right-2 rounded-lg">
          Generate Code
        </button>
      )}
    </div>
  );
};
