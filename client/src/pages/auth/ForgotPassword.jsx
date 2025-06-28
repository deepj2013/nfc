import { useState } from "react";
import { useParams } from "react-router-dom";
import { sendOtpService, verifyOtpService, resetPasswordService } from "../../redux/thunk/authServices";
import { errorToast, successToast } from "../../utils/Helper";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function ForgotPassword() {
  const { type } = useParams();
  const [userType] = useState(type === "user" ? "user" : "member");
  const dispatch = useDispatch(); //
  const [step, setStep] = useState(1);
  const [memberId, setMemberId] = useState("");
  const [maskedInfo, setMaskedInfo] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [member_id, setmember_id] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      if (!memberId.trim()) return errorToast("Please enter your ID.");
  
      console.log("Triggered sendOtpService with:", memberId);
  
      const payload = { memberId };
      
      // ✅ Proper way to dispatch the thunk
      const response = await dispatch(sendOtpService(payload)).unwrap();
      console.log(response, "response in sendOtpService");
  
      if (response?.status===200) {
        setMaskedInfo(response?.result);
        setStep(2);
        successToast("OTP sent to registered WhatsApp number.");
      } else {
        errorToast(response?.message || "ID not found.");
      }
    } catch (err) {
      console.error("Error in handleSearch:", err);
      errorToast("Error sending OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await dispatch(verifyOtpService({ memberId, otp })).unwrap();
      if (response?.status===200) {
        setmember_id(response?.member_id);
        setIsOtpVerified(true);
        setStep(3);
        successToast("OTP verified.");
      } else {
        errorToast(response?.message || "Invalid OTP.");
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      errorToast("Failed to verify OTP.");
    }
  };

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) return errorToast("Please fill both password fields.");
    if (password !== confirmPassword) return errorToast("Passwords do not match.");
    if (password.length < 6) return errorToast("Password must be at least 6 characters.");
  
    try {
      const payload = { userId: member_id, password };
      const response = await dispatch(resetPasswordService(payload)).unwrap();
  
      if (response?.status === 200) {
        successToast("Password updated successfully. Redirecting to login...");
  
        // Reset state
        setStep(1);
        setMemberId("");
        setPassword("");
        setConfirmPassword("");
        setOtp("");
        setMaskedInfo(null);
        setIsOtpVerified(false);
  
        // ✅ Redirect after a short delay (optional)
        setTimeout(() => {
          navigate("/member-login");
        }, 1000);
      } else {
        errorToast(response?.message || "Failed to update password.");
      }
    } catch (err) {
      console.error("Reset Password Error:", err);
      errorToast("Something went wrong.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center relative px-4"
      style={{
        backgroundImage: 'url("http://localhost:5173/src/assets/images/s1.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-white/10 backdrop-blur-xl dark:bg-gray-900/60 shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white dark:text-gray-200 mb-4">
          Forgot Password
        </h1>
        <p className="text-center text-sm text-gray-300 mb-4">
          Reset your {userType === "member" ? "Member" : "User"} password via OTP
        </p>

        {step === 1 && (
          <>
            <input
              type="text"
              placeholder={`Enter your ${userType === "member" ? "Member ID" : "User ID"}`}
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              className="border p-3 shadow-md bg-white/30 backdrop-blur-sm text-white dark:bg-indigo-700 dark:text-white placeholder:text-gray-300 border-gray-300 dark:border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={handleSearch}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4 transition duration-200"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-white text-sm bg-white/10 rounded p-3 mb-2">
              <p><b>ID:</b> {memberId}</p>
              <p><b>Name:</b> {maskedInfo?.name || "*****"}</p>
              <p><b>Mobile:</b> {maskedInfo?.mobile || "+91 ***XX"}</p>
              <p>OTP sent to registered WhatsApp.</p>
            </div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-3 shadow-md bg-white/30 backdrop-blur-sm text-white dark:bg-indigo-700 dark:text-white placeholder:text-gray-300 border-gray-300 dark:border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg mt-4 transition duration-200"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && isOtpVerified && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 shadow-md bg-white/30 backdrop-blur-sm text-white dark:bg-indigo-700 dark:text-white placeholder:text-gray-300 border-gray-300 dark:border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-3 border p-3 shadow-md bg-white/30 backdrop-blur-sm text-white dark:bg-indigo-700 dark:text-white placeholder:text-gray-300 border-gray-300 dark:border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg mt-4 transition duration-200"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;