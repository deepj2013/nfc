import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import Dropdown from "../common/DropDown";
import { useDispatch } from "react-redux";
import {
  UpdateCategoryServices,
  createCategoryServices,
} from "../../redux/thunk/categoryServices";
import { logger, successToast } from "../../utils/Helper";
import moment from "moment";
import { getStorageValue } from "../../services/LocalStorageServices";
let initialState = {
  categoryName: null,
  description: null,
  parentCategoryId: "",
  updatedBy: "",
};
const AddCategory = ({
  isOpen,
  onClose,
  setFeedBackModal,
  selectedItem,
  type,
  setType,
}) => {
  const navigate = useNavigate();
  let userDetails = getStorageValue("userDetails");

  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const { categoryName, description, parentCategoryId, updatedBy } = formData;

  const upadteStateHandler = (e) => {
    let { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const createHandler = async () => {
    // alert("this is test")
    try {
      let response = await dispatch(
        createCategoryServices({
          ...formData,
          createdBy: userDetails?.role_id,
          updatedBy: userDetails?.role_id,
        })
      ).unwrap();
      successToast("Category created successfully");
      onClose();
    } catch (error) {
      console.log(error);
      logger(error);
    }
  };

  useEffect(() => {
    if (selectedItem !== null && type === "edit") {
      setFormData((pre) => ({
        ...pre,
        categoryName: selectedItem?.categoryName,
        description: selectedItem?.description,
        parentCategoryId: selectedItem?._id,
        updatedBy: moment(selectedItem?.updatedAt).format("YYYY-MM-DD"),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        categoryName: "",
        description: "",
        parentCategoryId: "",
        updatedBy: "",
      }));
    }
  }, [isOpen]);

  const updateHandler = async () => {
    let payload = {
      category_id: selectedItem?.category_id,
      categoryName: categoryName,
      description: description,
      parentCategoryId: selectedItem?._id,
      updatedBy: 12345,
    };
    try {
      let response = await dispatch(UpdateCategoryServices(payload)).unwrap();
      console.log("responseresponse", response);
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
          onClick={() => {
            setFormData(initialState);
            onClose();
          }}
          className="text-2xl absolute right-2 top-2 text-secondry"
        >
          <FaXmark />
        </button>
        <div className=" flex flex-col items-center">
          <h2 className="text-2xl  w-full font-medium lg:px-10">
            {`${type === "add" ? "Add" : "Edit"} Category`}
          </h2>
          {/* <img className="w-64  h-32 my-6 object-cover" src={TeacherFeedback}/> */}
          <p className="text-xl mt-4 w-full"></p>
          <div className="w-full lg:px-10">
            <Input
              placeholder={"Name"}
              value={categoryName}
              name={"categoryName"}
              onChange={upadteStateHandler}
            />

            <Input
              placeholder={"Description"}
              value={description}
              name={"description"}
              onChange={upadteStateHandler}
            />

            {/* <Input
              placeholder={"Parent Category Id"}
              value={parentCategoryId}
              name={"parentCategoryId"}
              onChange={upadteStateHandler}
            /> */}

            <Input
              type={"date"}
              placeholder={"updatedBy"}
              //   value={updatedBy}
              name="updatedBy"
              value={updatedBy}
              onChange={upadteStateHandler}
            />

            {/* <Dropdown /> */}

            <div className="mt-4">
              {/* <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Logo</label>
                            <div className="flex items-center justify-center w-full">
                                <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-28 mb-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                                    <div className="flex flex-col items-center justify-center ">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div> */}
            </div>
            <Button
              name={"Add"}
              style={"w-full py-2"}
              onClick={selectedItem ? updateHandler : createHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
