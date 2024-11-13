import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { errorToast, successToast, logger } from "../../utils/Helper";
import Button from "../../components/common/Button";
import FormInput from "../../components/common/FormInput";
import {
  getMemberService,
  getTransactionHistoryService,
  updateChequeStatusService,
} from "../../redux/thunk/useMangementServices";
import moment from "moment";

const TransactionHistory = () => {
  const dispatch = useDispatch();
  const [memberNumber, setMemberNumber] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});

  const toggleExpandRow = (id, field) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !prev[id]?.[field],
      },
    }));
  };

  const verifyMemberHandler = async () => {
    if (!memberNumber) {
      errorToast("Please enter a member number.");
      return;
    }

    setIsVerifying(true);
    try {
      const response = await dispatch(getMemberService(memberNumber)).unwrap();
      successToast("Member verified successfully!");
      const title = response?.result?.title || "";
      const firstName = response?.result?.firstName || "";
      const surname = response?.result?.surname || "";
      setMemberName(`${title} ${firstName} ${surname}`);
      setWalletBalance(response?.result?.balance || 0);

      fetchTransactionHistory(memberNumber);
    } catch (error) {
      logger(error);
      errorToast("Member not found. Please check the number and try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const fetchTransactionHistory = async (memberId) => {
    setIsFetchingHistory(true);
    try {
      const response = await dispatch(
        getTransactionHistoryService(memberId)
      ).unwrap();
      setTransactionHistory(response?.result || []);
    } catch (error) {
      logger(error);
      errorToast("Failed to fetch transaction history.");
    } finally {
      setIsFetchingHistory(false);
    }
  };

  const updateChequeStatusHandler = async (transactionId) => {
    try {
      await dispatch(
        updateChequeStatusService({ transactionId, status: "Cleared" })
      ).unwrap();
      successToast("Cheque status updated successfully!");
      fetchTransactionHistory(memberNumber);
    } catch (error) {
      logger(error);
      errorToast("Failed to update cheque status.");
    }
  };

  const calculateTotals = (transactions) => {
    let totalCredit = 0;
    let totalDebit = 0;

    transactions.forEach((transaction) => {
      if (transaction.transactionType === "Credit") {
        totalCredit += transaction.amount;
      } else if (transaction.transactionType === "Debit") {
        totalDebit += transaction.amount;
      }
    });

    return { totalCredit, totalDebit };
  };

  const { totalCredit, totalDebit } = calculateTotals(transactionHistory);
  const netBalance = totalCredit - totalDebit;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-full mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">
          Transaction History
        </h2>

        <div className="flex items-center gap-4 mb-6">
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

        {memberName && (
          <>
            <p className="text-gray-700 text-lg font-medium">
              Member Name: <span className="font-bold">{memberName}</span>
            </p>
            <p className="text-gray-700 text-lg font-medium">
              Wallet Balance: <span className="font-bold">{walletBalance}</span>
            </p>
          </>
        )}

        {isFetchingHistory ? (
          <p className="text-center text-gray-500 mt-4">
            Loading transaction history...
          </p>
        ) : (
          transactionHistory.length > 0 && (
            <div className="mt-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-md shadow">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">
                      Sr.No
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">
                      Date
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">
                      Narration
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">
                      Amount
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">
                      Description
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">
                      Remarks
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">
                      Transaction Mode
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((transaction, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="p-4 text-sm text-gray-900">{idx + 1}</td>
                      <td className="p-4 text-sm text-gray-900 whitespace-nowrap">
                        {moment(transaction.transactionDate).format(
                          "DD-MM-YYYY"
                        )}
                      </td>
                      <td className="p-4 text-sm text-gray-900">
                        {transaction.narration}
                      </td>
                      <td
                        className={`p-4 text-sm font-medium ${
                          transaction.transactionType === "Credit"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.transactionType === "Credit"
                          ? `+${transaction.amount}`
                          : `-${transaction.amount}`}
                      </td>

                      <td className="p-4 text-sm text-gray-900">
                        {expandedRows[transaction._id]
                          ? transaction.description
                          : `${transaction.description.substring(0, 10)}... `}
                        <button
                          onClick={() => toggleExpandRow(transaction._id)}
                          className="text-blue-500 underline text-xs"
                        >
                          {expandedRows[transaction._id]
                            ? "Read Less"
                            : "Read More"}
                        </button>
                      </td>
                      <td className="p-4 text-sm text-gray-900">
                        <div className="truncate max-w-xs">
                          {expandedRows[transaction._id]?.remarks
                            ? transaction.remarks
                            : `${transaction.remarks.substring(0, 20)}... `}
                          <button
                            onClick={() =>
                              toggleExpandRow(transaction._id, "remarks")
                            }
                            className="text-blue-500 underline text-xs"
                          >
                            {expandedRows[transaction._id]?.remarks
                              ? "Read Less"
                              : "Read More"}
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-900">
                        {transaction.modeOfTransaction}
                      </td>
                      <td className="p-4 text-sm text-gray-900">
                        {transaction.modeOfTransaction === "Cheque" &&
                        transaction.chequeStatus === "Pending" ? (
                          <Button
                            name="Clear Cheque"
                            style="bg-yellow-500 hover:bg-yellow-600 text-white text-sm"
                            onClick={() =>
                              updateChequeStatusHandler(transaction._id)
                            }
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-200">
                    <td colSpan="3" className="p-4 text-right font-bold">
                      Total:
                    </td>
                    <td className="p-4 text-green-600 font-bold">
                      {netBalance < 0 ? (
                        <>
                          <span className="text-red-600">
                            {" "}
                            - {Math.abs(netBalance)}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-green-600"> +{netBalance}</span>
                        </>
                      )}
                    </td>
                    <td colSpan="4" className="p-4 text-right font-bold">
                      {netBalance < 0 ? (
                        <>
                          Total Payable till {moment().format("DD-MM-YYYY")}:
                          <span className="text-red-600">
                            {" "}
                            {Math.abs(netBalance)}
                          </span>
                        </>
                      ) : (
                        <>
                          Balance as on {moment().format("DD-MM-YYYY")}:
                          <span className="text-green-600"> {netBalance}</span>
                        </>
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
