import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { errorToast, logger, successToast } from "../../utils/Helper";
import { getStorageValue } from "../../services/LocalStorageServices";
import Button from "../../components/common/Button";
import FormInput from "../../components/common/FormInput";
import FormSelect from "../../components/common/FromSelect"
import Input from "../../components/common/Input";
import {
  addDepositServices,
  getMemberService,
} from "../../redux/thunk/useMangementServices";

const DepositModal = ({ isOpen, onClose, selectedItem }) => {
  const dispatch = useDispatch();
  let userDetails = getStorageValue("userDetails");
  
  const [memberNumber, setMemberNumber] = useState("");
  const [formData, setFormData] = useState({
    memberId: "",
    amount: null,
    depositType: "",
    modeOfTransaction: "",
    transactionRef: "",
    chequeNumber: "",
    bankName: "",
    branchName: "",
    remarks: "",
    createdBy: userDetails?.role_id,
    updatedBy: userDetails?.role_id,
  });

  const [isVerifying, setIsVerifying] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [previousBalance, setPreviousBalance] = useState(0);

  const verifyMemberHandler = async () => {
    if (!memberNumber) {
      errorToast("Please enter a member number.");
      return;
    }

    setIsVerifying(true);
    try {
      const response = await dispatch(getMemberService(memberNumber)).unwrap();

      successToast("Member verified successfully!");
      setFormData((prev) => ({ ...prev, memberId: memberNumber }));
      const memberName = `${response?.result?.title} ${response?.result?.firstName} ${response?.result?.surname}`;
      setMemberName(memberName || "");
      setPreviousBalance(response?.result?.balance || 0);
    } catch (error) {
      logger(error);
      errorToast("Member not found. Please check the number and try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const updateStateHandler = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? (value === "" ? "" : parseFloat(value) || 0) : value,
    }));
  };
  

  const addDepositHandler = async () => {
    try {
      console.log(formData)
      let response = await dispatch(addDepositServices(formData)).unwrap();
    
      if (response?.msg === "Deposit successful") { 
        // Assuming response structure contains `status` or `success` field for success check
        successToast( "Deposit added successfully!");
      }
      setFormData({
        memberId: "",
        amount: null,
        depositType: "",
        modeOfTransaction: "",
        transactionRef: "",
        chequeNumber: "",
        bankName: "",
        branchName: "",
        remarks: "",
        createdBy: userDetails?.role_id,
        updatedBy: userDetails?.role_id,
      });
      onClose();
    } catch (error) {
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
        className={`bg-white overflow-scroll w-[95vw] lg:w-[500px] py-4 rounded-lg h-[95vh] lg:h-auto shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          onClick={() => {
            setFormData({
              memberId: "",
              amount: null,
              depositType: "",
              modeOfTransaction: "",
              transactionRef: "",
              chequeNumber: "",
              bankName: "",
              branchName: "",
              remarks: "",
              createdBy: userDetails?.role_id,
              updatedBy: userDetails?.role_id,
            });
            setMemberNumber("");
            onClose();
          }}
          className="text-2xl absolute right-2 top-2 text-secondary"
        >
          <FaXmark />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl w-full font-medium lg:px-8">Add Deposit</h2>
          <div className="w-full lg:px-8">
            <div className="mb-4 flex items-center gap-4">
              <FormInput
                width="flex-1"
                label="Enter Member Number"
                placeholder="Member Number"
                value={memberNumber}
                onChange={(e) => setMemberNumber(e.target.value)}
              />
              <Button
                name="Verify"
                width="w-auto"
                onClick={verifyMemberHandler}
                disabled={isVerifying}
                style={"bg-blue-500 hover:bg-blue-600 text-white"}
              />
            </div>

            {formData.memberId && (
              <>
                <p className="text-gray-700 text-sm mt-2">
                  Member Name: <span className="font-medium">{memberName}</span>
                </p>
                <p className="text-gray-700 text-sm">
                  Previous Balance:{" "}
                  <span className="font-medium">{previousBalance}</span>
                </p>
                <p className="text-green-500 text-sm mt-2">
                  Member verified! Proceed to fill the form.
                </p>
              </>
            )}

            <Input
              placeholder={"Amount"}
              value={formData.amount}
              name={"amount"}
              onChange={updateStateHandler}
            />
            <FormSelect
              placeholder="Select Mode of Transaction"
              name="modeOfTransaction"
              onChange={updateStateHandler}
              value={formData.modeOfTransaction}
              options={["Cash", "UPI", "NEFT", "Cheque"]}
            />

            {/* Conditional Rendering Based on modeOfTransaction */}
            {formData.modeOfTransaction === "UPI" && (
              <>
                <Input
                  placeholder={"Transaction Reference"}
                  value={formData.transactionRef}
                  name={"transactionRef"}
                  onChange={updateStateHandler}
                />
                <Input
                  type="file"
                  placeholder="Upload Payment Screenshot"
                  name="paymentScreenshot"
                />
              </>
            )}

            {formData.modeOfTransaction === "Cheque" && (
              <>
                <Input
                  placeholder={"Cheque Number"}
                  value={formData.chequeNumber}
                  name={"chequeNumber"}
                  onChange={updateStateHandler}
                />
                <Input
                  placeholder={"Bank Name"}
                  value={formData.bankName}
                  name={"bankName"}
                  onChange={updateStateHandler}
                />
                <Input
                  placeholder={"Branch Name"}
                  value={formData.branchName}
                  name={"branchName"}
                  onChange={updateStateHandler}
                />
              </>
            )}

            {formData.modeOfTransaction === "NEFT" && (
              <Input
                placeholder={"Transaction Reference"}
                value={formData.transactionRef}
                name={"transactionRef"}
                onChange={updateStateHandler}
              />
            )}

            {formData.modeOfTransaction === "Cash" && (
              <Input
                placeholder={"Deposit Cash"}
                value={`Received by: ${userDetails?.userName || ""}`}
                name={"transactionRef"}
                disabled
              />
              

            )}
            <Input
                placeholder={"Type oF Transaction"}
                value={formData.depositType}
                name={"depositType"}
                onChange={updateStateHandler}
              />

            <Input
              placeholder={"Remarks"}
              value={formData.remarks}
              name={"remarks"}
              onChange={updateStateHandler}
            />

            <Button
              name={"Add"}
              style={"w-full py-2"}
              onClick={addDepositHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
