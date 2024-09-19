import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Dropzone from "../../components/common/Dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductsServices,
  getAllProductListServices,
} from "../../redux/thunk/productServices";
import { logger } from "../../utils/Helper";
import moment from "moment";
import { menuCreationServices } from "../../redux/thunk/adminServices";
import ModalWrapper from "../../layout/ModalWrapper";
import { FaXmark, FaTrash } from "react-icons/fa6";

function MenuCreation({ isOpen, onClose }) {
  const data = [
    { isActive: "active", code: 1 },
    { isActive: "inactive", code: 0 },
  ];
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    menuName: "",
    menuDescription: "",
    isActive: null,
    parentMenuId: 0,
    subMenus: [],
    createdBy: 1,
    updatedBy: 1,
    routeUrl: "#",
    menuOrder: 1,
    iconClass: "fa-mainmenu",
    errors: {},
    submenuType: "",
    submenuRef: "",
  });
  const {
    menuName,
    menuDescription,
    isActive,
    parentMenuId,
    subMenus,
    createdBy,
    updatedBy,
    routeUrl,
    menuOrder,
    iconClass,
    errors,
    submenuType,
    submenuRef,
  } = formData;

  const upadteStateHandler = (e) => {
    let { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const dropDownChange = (item) => {
    console.log("::::", item);
    setFormData((pre) => ({ ...pre, isActive: item?.code }));
  };

  //   const dropDownChangeVender = (item) => {
  //     setFormData((pre) => ({ ...pre, vendorId: item?.vendor }));
  //   };

  const handleValidation = () => {
    let error = {};
    let formIsValid = true;

    if (!menuName || !menuName.trim()) {
      error.menuNameError = " * Menu Name can't be empty";
      formIsValid = false;
    }

    if (!menuDescription || !menuDescription.trim()) {
      error.menuDescriptionError = " * Menu Description can't be empty";
      formIsValid = false;
    }

    // if (!menuOrder || !menuOrder.trim()) {
    //   error.menuOrderError = " * Menu Order can't be empty";
    //   formIsValid = false;
    // }

    // Add more validation checks as needed
    setFormData((prev) => ({ ...prev, errors: error }));
    return formIsValid;
  };

  const menuCreateHandler = async (e) => {
    alert("hello");
    e.preventDefault();
    let formIsValid = handleValidation();
    if (formIsValid) {
      try {
        const payload = {
          menuName,
          menuDescription,
          isActive,
          parentMenuId,
          subMenus,
          createdBy,
          updatedBy,
          routeUrl,
          menuOrder,
          iconClass,
          errors,
          submenuType,
          submenuRef,
        };
        // console.log("hgjklsachin", payload);

        let response = await dispatch(menuCreationServices(payload)).unwrap();
        // dispatch(getAllProductListServices());
        navigate("/menu-creation-list");
      } catch (error) {
        console.log(error);
        logger(error);
      }
    }
  };

  const getHandler = async () => {
    try {
      let response = await dispatch(getcategoryServices()).unwarp();
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    getHandler();
  }, []);

  const addSubmenu = () => {
    if (!submenuType || !submenuRef) {
      alert("Both Type and Ref fields are required");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      subMenus: [
        ...prev.subMenus,
        { type: Number(submenuType), ref: submenuRef }, // Add the new submenu object
      ],
      submenuType: "", // Reset the type input field
      submenuRef: "", // Reset the ref input field
    }));
  };

  const removeSubmenu = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      subMenus: prev.subMenus.filter((_, index) => index !== indexToRemove), // Remove the submenu at the selected index
    }));
  };
  const { allVenderList } = useSelector((state) => state.inventaryState);

  return (
    <ModalWrapper isOpen={isOpen}>
      <div className="flex bg-white p-4 rounded-lg  w-full border justify-between flex-wrap overflow-scroll">
        <div className="w-full mb-6 flex items-center justify-between">
          <p className="font-semibold h28">Add Menu/Creation </p>
          <div className="">
            <button
              onClick={() => {
                onClose();
              }}
              className="text-2xl right-2 top-2 text-secondry"
            >
              {/* kjhgf */}
              <FaXmark />
            </button>
          </div>
        </div>
        <div className="bg-white  w-full">
          <FormInput
            errors={errors.menuNameError}
            width={"w-[100%]"}
            placeholder={"Menu Name"}
            value={menuName}
            name={"menuName"}
            onChange={upadteStateHandler}
          />
          <FormInput
            errors={errors.menuDescriptionError}
            width={"w-[100%]"}
            placeholder={"Menu Description"}
            value={menuDescription}
            name={"menuDescription"}
            onChange={upadteStateHandler}
          />

          <Dropdown
            width={"w-[100%]"}
            data={data}
            placeholder={"Active"}
            onChange={(val) => dropDownChange(val)}
          />
          {/* <div className="mt-5">
            <label class="block mb-2 text-sm font-medium text-gray-900 ">
              Submenu Name
            </label>
            <div className=" bg-white border rounded-lg p-3">
              <div className=" bg-white">
                <input
                  width={"w-[30%]"}
                  placeholder={"Submenu Type"}
                  name={"submenuType"}
                  value={submenuType}
                  onChange={upadteStateHandler}
                />

                <input
                  width={"w-[30%]"}
                  placeholder={"Submenu Ref"}
                  name={"submenuRef"}
                  value={submenuRef}
                  onChange={upadteStateHandler}
                />

                <button
                  onClick={addSubmenu}
                  type="button"
                  class="text-white px-2 py-1 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto  text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
                >
                  + Add
                </button>
              </div>
              <div className="w-full mt-4">
                <ul>
                  {subMenus?.map((submenu, index) => (
                    <li key={index} className="p-2 border-b">
                      {submenu.type}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div> */}
          {/* <div className="mt-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Submenu Name
            </label>
            <div className="bg-white border rounded-lg p-3">
              <div className="bg-white">
                <input
                  width={"w-[30%]"}
                  placeholder={"Submenu Type"}
                  name={"submenuType"}
                  value={submenuType}
                  onChange={upadteStateHandler}
                />

                <input
                  width={"w-[30%]"}
                  placeholder={"Submenu Ref"}
                  name={"submenuRef"}
                  value={submenuRef}
                  onChange={upadteStateHandler}
                />

                <button
                  onClick={addSubmenu}
                  type="button"
                  className="text-white px-2 py-1 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center"
                >
                  + Add
                </button>
              </div>

              <div className="w-full mt-4">
                {subMenus?.map((submenu, index) => (
                  <div key={index} className="p-2 border-b">
                    <input
                      placeholder="Submenu Type"
                      value={submenu.type}
                      onChange={(e) => {
                        const updatedSubMenus = [...subMenus];
                        updatedSubMenus[index].type = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          subMenus: updatedSubMenus,
                        }));
                      }}
                      className="mr-2 border border-gray-300 p-2 rounded"
                    />
                    <input
                      placeholder="Submenu Ref"
                      value={submenu.ref}
                      onChange={(e) => {
                        const updatedSubMenus = [...subMenus];
                        updatedSubMenus[index].ref = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          subMenus: updatedSubMenus,
                        }));
                      }}
                      className="border border-gray-300 p-2 rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div> */}
          {/* <div className="mt-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Submenu Name
            </label>
            <div className="bg-white border rounded-lg p-3">
              
              <div className="w-full mt-4">
                {subMenus?.map((submenu, index) => (
                  <div key={index} className="p-2 border-b flex space-x-2">
                    <input
                      placeholder="Submenu Type"
                      value={submenu.type}
                      onChange={(e) => {
                        const updatedSubMenus = [...subMenus];
                        updatedSubMenus[index].type = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          subMenus: updatedSubMenus,
                        }));
                      }}
                      className="mr-2 border border-gray-300 p-2 rounded w-[45%]"
                    />
                    <input
                      placeholder="Submenu Ref"
                      value={submenu.ref}
                      onChange={(e) => {
                        const updatedSubMenus = [...subMenus];
                        updatedSubMenus[index].ref = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          subMenus: updatedSubMenus,
                        }));
                      }}
                      className="border border-gray-300 p-2 rounded w-[45%]"
                    />
                  </div>
                ))}
              </div>

              
              <div className="bg-white flex mt-4">
                <input
                  
                  placeholder={"Submenu Type"}
                  name={"submenuType"}
                  value={submenuType}
                  onChange={upadteStateHandler}
                  className="w-[40%] mr-2 border border-gray-300 p-2 rounded"
                />

                <input
                  
                  placeholder={"Submenu Ref"}
                  name={"submenuRef"}
                  value={submenuRef}
                  onChange={upadteStateHandler}
                  className="w-[40%] mr-2 border border-gray-300 p-2 rounded"
                />

                <button
                  onClick={addSubmenu}
                  type="button"
                  className="text-white px-2 py-1 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm"
                >
                  + Add
                </button>
              </div>
            </div>
          </div> */}
          <div className="mt-5 overflow-scroll">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Submenu Name
            </label>
            <div className="bg-white border rounded-lg p-3">
              {/* Render dynamic submenu inputs */}
              <div className="w-full mt-4">
                {subMenus?.map((submenu, index) => (
                  <div
                    key={index}
                    className="p-2 border-b flex space-x-2 items-center"
                  >
                    <input
                      placeholder="Submenu Type"
                      value={submenu.type}
                      onChange={(e) => {
                        const updatedSubMenus = [...subMenus];
                        updatedSubMenus[index].type = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          subMenus: updatedSubMenus,
                        }));
                      }}
                      className=" mr-2 border border-gray-300 p-2 rounded w-[40%]"
                    />
                    <input
                      placeholder="Submenu Ref"
                      value={submenu.ref}
                      onChange={(e) => {
                        const updatedSubMenus = [...subMenus];
                        updatedSubMenus[index].ref = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          subMenus: updatedSubMenus,
                        }));
                      }}
                      className="border border-gray-300 p-2 rounded w-[40%]"
                    />
                    <button
                      onClick={() => removeSubmenu(index)} // Call remove function on click
                      className="text-red-600 w-4 hover:text-red-800"
                    >
                      <FaTrash /> {/* Trash icon for deletion */}
                    </button>
                  </div>
                ))}
              </div>

              {/* Inputs for new submenu type and ref */}
              <div className="bg-white flex mt-4">
                <input
                  placeholder={"Submenu Type"}
                  name={"submenuType"}
                  value={submenuType}
                  onChange={upadteStateHandler}
                  className="w-[45%] mr-2 border border-gray-300 p-2 rounded"
                />

                <input
                  placeholder={"Submenu Ref"}
                  name={"submenuRef"}
                  value={submenuRef}
                  onChange={upadteStateHandler}
                  className="w-[45%] mr-2 border border-gray-300 p-2 rounded"
                />

                <button
                  onClick={addSubmenu}
                  type="button"
                  className="text-white w-auto px-2 py-1 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={(e) => menuCreateHandler(e)}
          type="submit"
          class="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[100%] px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </ModalWrapper>
  );
}

export default MenuCreation;

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
    <div class={twMerge("mb-5 relative", width)}>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">
        {placeholder}
      </label>
      <input
        onChange={onChange}
        value={value}
        name={name}
        type={type ? type : "text"}
        id="email"
        class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

const Dropdown = ({ width, placeholder, data, onChange }) => {
  const [selectedVal, setSelectedVal] = useState("select");
  console.log("se", selectedVal);
  return (
    <div class={twMerge(" text-gray-900 dark:text-gray-100 ", width)}>
      <div class="relative w-full group">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 "
        >
          {placeholder}
        </label>

        <button class="py-2.5 px-3 w-full md:text-sm text-site text-black bg-transparent border border-dimmed  focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded ">
          {selectedVal}
        </button>
        <div class="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg w-full  peer-focus:visible peer-focus:opacity-100 opacity-0 invisible duration-200 p-1 bg-gray-100   border border-dimmed text-xs md:text-sm">
          {data?.map((ele, ind) => {
            return (
              <div
                onClick={() => {
                  onChange(ele);
                  setSelectedVal(ele?.isActive);
                }}
                class=" w-full block cursor-pointer  text-black  hover:text-link px-3 py-2 rounded-md"
              >
                {ele?.isActive}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
