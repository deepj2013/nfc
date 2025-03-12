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
  const [historyData, setHistoryData] = useState([]);
  console.log("hemender345", historyData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getHistoryHandler = async () => {
    console.log("gered history");
    try {
      let response = await dispatch(getHistoryServices()).unwrap();
      setHistoryData(response?.result);
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
        className={`bg-white  w-[95vw] px-4 md:w-[80vw] lg:w-[80vw] py-4 rounded-lg h-[95vh] lg:h-auto  shadow-xl transform transition-transform duration-300 ${
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
          <h2 className="text-2xl  w-full font-medium lg:px-8">
            Inventory History
          </h2>

          <div className="w-full lg:px-8 h-[400px] pb-5">
            <div className="pb-10">
              <table className="table-auto min-w-full rounded-xl">
                <thead>
                  <tr className="bg-gray-50">
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      {" "}
                      Id{" "}
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      {" "}
                      Department{" "}
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"
                    >
                      {" "}
                      Quantity{" "}
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      {" "}
                      Remarks{" "}
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      {" "}
                      SKU{" "}
                    </th>

                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      {" "}
                      Transaction Type{" "}
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      {" "}
                      Transaction Date{" "}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 ">
                  {historyData.map((ele, ind) => {
                    return (
                      <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {ind + 1}{" "}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                          {ele?.department}
                        </td>

                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {ele?.quantity}{" "}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {ele?.remarks}{" "}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {ele?.sku}{" "}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {ele?.transactionType}{" "}
                        </td>

                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {ele?.transactionDate}{" "}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventryHistoryModal;
