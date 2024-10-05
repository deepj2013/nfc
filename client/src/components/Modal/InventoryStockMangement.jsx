import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import Dropdown from "../common/DropDown";
import { stockInOrOutServices } from "../../redux/thunk/productServices";
import { logger, successToast } from "../../utils/Helper";
import { getStorageValue } from "../../services/LocalStorageServices";
import { useDispatch } from "react-redux";
import FormInput from "../common/FormInput";
import SelectDropdown from "../common/SelectDropdown";

const InventoryStockMangement = ({ isOpenStock, onClose, view }) => {
  console.log("view is open", view);
  let userDetails = getStorageValue("userDetails");
  const [formData, setFormData] = useState({
    sku: "",
    transactionType: view === "STOCK_IN" ? "inward" : "outward",
    quantity: null,
    departmentId: "",
    createdBy: 2,
    remarks: "",
    errors: {},
  });

  const {
    sku,
    transactionType,
    quantity,
    departmentId,
    createdBy,
    remarks,
    errors,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const upadteStateHandler = (e) => {
    let { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handleValidation = () => {
    const validationRules = {
      sku: { required: true },
      quantity: { required: true },
      departmentId: { required: true },
      remarks: { required: true },
    };
    const formData = {
      sku,
      quantity,
      departmentId,
      remarks,
    };
    const { formIsValid, errors } = validateFields(formData, validationRules);
    setFormData((prev) => ({ ...prev, errors }));
    return formIsValid;
  };

  const createStockInOrOutHandler = async () => {
    // let formIsValid = handleValidation();
    // if (!formIsValid) {
    //   return;
    // }

    let payload = {
      sku,
      transactionType,
      quantity,
      departmentId,
      createdBy,
      remarks,
    };

    try {
      let response = await dispatch(stockInOrOutServices(payload)).unwrap();
      successToast("Category created successfully");
      onClose();
    } catch (error) {
      console.log(error);
      logger(error);
    }
  };

  const department_Id = [
    {
      label: "DEP001",
      value: "DEP001",
    },
    {
      label: "DEP001",
      value: "DEP001",
    },
    {
      label: "DEP001",
      value: "DEP001",
    },
  ];

  return (
    <div
      className={`fixed w-full inset-0 flex items-center justify-center z-[999] transition-opacity duration-300 ${
        isOpenStock ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpenStock ? "opacity-100" : "opacity-0"
        }`}
        // onClick={onClose}
      ></div>
      <div
        className={`bg-white  overflow-scroll w-[95vw] lg:w-[500px] py-4 rounded-lg h-[95vh] lg:h-auto  shadow-xl transform transition-transform duration-300 ${
          isOpenStock ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ minHeight: "100px" }}
      >
        <button
          onClick={onClose}
          className="text-2xl absolute right-2 top-2 text-secondry"
        >
          <FaXmark />
        </button>
        <div className=" flex flex-col items-center">
          <h2 className="text-2xl  w-full font-medium lg:px-10">
            Manage Stocks
          </h2>

          <p className="text-xl mt-4 w-full"></p>
          <div className="w-full lg:px-10">
            <FormInput
              errors={errors?.sku}
              placeholder={"sku"}
              value={sku}
              name={"sku"}
              onChange={upadteStateHandler}
            />

            <FormInput
              errors={errors?.quantity}
              placeholder={"quantity"}
              value={quantity}
              name={"quantity"}
              onChange={upadteStateHandler}
            />

            <SelectDropdown
              data={department_Id}
              handleSelectChange={(e) => {
                setFormData((pre) => ({
                  ...pre,
                  departmentId: e.target.value,
                }));
              }}
              selected={departmentId}
              label={"departmentId"}
              placeHolder={"departmentId"}
            />
            <FormInput
              errors={errors?.remarks}
              placeholder={"remarks"}
              value={remarks}
              name={"remarks"}
              onChange={upadteStateHandler}
            />

            <Button
              name={"Add"}
              style={"w-full py-2"}
              onClick={createStockInOrOutHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryStockMangement;
