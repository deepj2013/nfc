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
import { getHistoryServices } from "../../redux/thunk/productServices";

const InventryHistoryModal = ({ isOpenHistory, onClose }) => {
  const [historyData, setHistoryData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getHistoryHandler = async () => {
    console.log("gered history");
    try {
      let response = await dispatch(getHistoryServices()).unwrap();
      console.log("hemender345", response);
    } catch (error) {
      console.log("hemendererror", error);
      logger(error);
    }
  };
  useEffect(() => {
    getHistoryHandler();
  }, []);
  return (
    <div
      className={`fixed w-full inset-0 flex items-center justify-center z-[999] transition-opacity duration-300 ${
        isOpenHistory ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpenHistory ? "opacity-100" : "opacity-0"
        }`}
        // onClick={onClose}
      ></div>
      <div
        className={`bg-white  w-[95vw] px-4 lg:w-[500px] py-4 rounded-lg h-[95vh] lg:h-auto  shadow-xl transform transition-transform duration-300 ${
          isOpenHistory ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ minHeight: "100px" }}
      >
        <button
          onClick={() => {
            onClose();
          }}
          className="text-2xl absolute right-2 top-2 text-secondry"
        >
          <FaXmark />
        </button>
        <div className=" flex flex-col items-center h-[600px] overflow-scroll">
          <h2 className="text-2xl  w-full font-medium lg:px-8">Add Member</h2>

          <div className="w-full lg:px-8 h-[400px] pb-5">
            <div className="pb-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventryHistoryModal;
