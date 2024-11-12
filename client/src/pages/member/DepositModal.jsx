import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
// import Dropdown from "../common/DropDown";
import { useDispatch } from "react-redux";
import {
  getMeasurementUnitsServices,
  measurementUnitsServices,
  measurementUpdateUnitServices,
} from "../../redux/thunk/unitServices";
import { handleError } from "../../utils/ErrorHandler";
import { errorToast, logger } from "../../utils/Helper";
import moment from "moment";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import {
  UpdateMemberServices,
  createMemberServices,
  getMemberCategoryServices,
} from "../../redux/thunk/vendorServices";
import { addDepositServices } from "../../redux/thunk/useMangementServices";
import SelectDropdown from "../../components/common/SelectDropdown";

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
const DepositModal = ({
  isOpen,
  onClose,
  setFeedBackModal,
  selectedItem,
  type,
  dropdownData,
}) => {
  
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    memberId: "",
    amount: null,
    depositType: "",
    modeOfTransaction: "",
    transactionRef: "",
    remarks: "",
    createdBy: 1,
    updatedBy: 1,
  });
  console;
  const {
    memberId,
    amount,
    depositType,
    modeOfTransaction,
    transactionRef,
    remarks,
  } = formData;
  

  const upadteStateHandler = (e) => {
    let { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  //   const validation = () => {
  //     if (!memberCategory) {
  //       errorToast("memberCategory can't be empaty");
  //       return false;
  //     }
  //     return true;
  //   };

  const addDepositeHandler = async () => {
    // if (!validation()) {
    //   return;
    // }
    try {
      let response = await dispatch(addDepositServices(formData)).unwrap();
      setFormData(intialState);
      onClose();
    } catch (error) {
      console.log(error);
      logger(error);
    }
  };

  const handleSelectChange = (e) => {

    setFormData((pre) => ({ ...pre, memberId: e.target.value }));
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
            setFormData(intialState);
            onClose();
          }}
          className="text-2xl absolute right-2 top-2 text-secondry"
        >
          <FaXmark />
        </button>
        <div className=" flex flex-col items-center">
          <h2 className="text-2xl  w-full font-medium lg:px-8">Add Member</h2>
          {/* <img className="w-64  h-32 my-6 object-cover" src={TeacherFeedback}/> */}
          <p className="text-xl mt-4 w-full"></p>
          <div className="w-full lg:px-8">
            <SelectDropdown
              data={dropdownData}
              handleSelectChange={handleSelectChange}
              selected={formData?.memberId}
              label={"Member Id"}
              placeHolder={"Member Id"}
            />

            <Input
              placeholder={"Amount"}
              value={amount}
              name={"amount"}
              onChange={upadteStateHandler}
            />
            <Input
              placeholder={"depositType"}
              value={depositType}
              name={"depositType"}
              onChange={upadteStateHandler}
            />
            <Input
              placeholder={"modeOfTransaction"}
              value={modeOfTransaction}
              name={"modeOfTransaction"}
              onChange={upadteStateHandler}
            />
            <Input
              placeholder={"transactionRef"}
              value={transactionRef}
              name={"transactionRef"}
              onChange={upadteStateHandler}
            />
            <Input
              placeholder={"remarks"}
              value={remarks}
              name={"remarks"}
              onChange={upadteStateHandler}
            />

            <Button
              name={"Add"}
              style={"w-full py-2"}
              onClick={addDepositeHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
