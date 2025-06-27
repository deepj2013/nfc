import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { errorToast, successToast, logger } from "../../utils/Helper";
import { getStorageValue } from "../../services/LocalStorageServices";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { getMemberService, createMemberPasswordService } from "../../redux/thunk/useMangementServices";

const MemberPasswordModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const userDetails = getStorageValue("userDetails");

  const [memberId, setMemberId] = useState("");
  const [memberData, setMemberData] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // 🔹 Verify Member & Fetch Email/Mobile
  const verifyMemberHandler = async () => {
    if (!memberId.trim()) {
      errorToast("Please enter a valid Member ID.");
      return;
    }
  
    setIsVerifying(true);
    try {
      const response = await dispatch(getMemberService(memberId)).unwrap();
      console.log(response);
  
      // Check if credentials already exist
      if (response.result?.isCredentials) {
        successToast("Password already generated. You can proceed to reset.");
      } else {
        successToast("Member verified successfully!");
      }
  
      setMemberData(response.result || {}); // Store member details
      setError("");
    } catch (error) {
      logger(error);
      setError("Member not found. Please check the ID and try again.");
      setMemberData(null);
    } finally {
      setIsVerifying(false);
    }
  };
  

  // 🔹 Create Member Password via Redux Thunk
  const updatePasswordHandler = async () => {
    if (!password || !confirmPassword) {
      errorToast("Both password fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      errorToast("Passwords do not match.");
      return;
    }

    if (!memberData?.emailId || !memberData?.mobileNumber) {
      errorToast("Member details are incomplete. Please verify again.");
      return;
    }

    setIsUpdating(true);
    try {
      const payload = {
        memberId,
        email: memberData.emailId,
        mobile: memberData.mobileNumber,
        password,
      };

      // Call Redux Thunk Service Instead of Fetch API
      const response = await dispatch(createMemberPasswordService(payload)).unwrap();
        console.log("Response from createMemberPasswordService:", response.success);
      if (response.success===true) {
        successToast("Password updated successfully!");
        onClose();
      } else {
        throw new Error(response.message || "Failed to update password.");
      }
    } catch (error) {
      logger(error);
      errorToast(error.message || "Error updating password. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className={`fixed w-full inset-0 flex items-center justify-center z-[999] transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
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
            setMemberId("");
            setMemberData(null);
            setPassword("");
            setConfirmPassword("");
            setError("");
            onClose();
          }}
          className="text-2xl absolute right-2 top-2 text-secondary"
        >
          <FaXmark />
        </button>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl w-full font-medium lg:px-8">Member Password Reset</h2>
          <div className="w-full lg:px-8">

            {/* Member ID Input & Verify Button */}
            <div className="mb-4 flex items-center gap-4">
              <Input
                placeholder="Enter Member ID"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              />
              <Button
                name={isVerifying ? "Verifying..." : "Verify"}
                width="w-auto"
                onClick={verifyMemberHandler}
                disabled={isVerifying}
                style={"bg-blue-500 hover:bg-blue-600 text-white"}
              />
            </div>

            {/* Member Info */}
            {memberData && (
              <>
                <p className="text-gray-700 text-sm mt-2">
                  <strong>Name:</strong> {`${memberData?.firstName ?? ""} ${memberData?.middleName ?? ""} ${memberData?.surname ?? ""}`.trim()}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Email:</strong> {memberData?.emailId || "N/A"}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Mobile:</strong> {memberData?.mobileNumber || "N/A"}
                </p>
                <p className="text-green-500 text-sm mt-2">
                  Member verified! Proceed to reset password.
                </p>
              </>
            )}

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Password Reset Inputs */}
            {memberData && (
              <>
                <Input
                  type="password"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-4"
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mb-4"
                />

                <Button
                  name={isUpdating ? "Updating..." : "Update Password"}
                  style={"w-full py-2 bg-green-500 hover:bg-green-600 text-white"}
                  onClick={updatePasswordHandler}
                  disabled={isUpdating}
                />
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPasswordModal;