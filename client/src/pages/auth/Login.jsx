import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { adminLoginServices } from "../../redux/thunk/adminServices";
import { errorLog } from "../../services/ErrorHandlerServices";
import { setStorageValue } from "../../services/LocalStorageServices";

function Login({ setIsLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginHandler = async () => {
    try {
      setErrorMessage(""); // Reset errors before login attempt
      let payload = { email_id: username, password };

      let response = await dispatch(adminLoginServices(payload)).unwrap();

      if (response?.msg === "Success") {
        setStorageValue("userDetails", response?.result);
        setIsLogin(true);
        navigate("/dashboard");
      } else {
        setErrorMessage(response?.msg || "Invalid credentials, please try again.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your details and try again.");
      errorLog(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 px-4">
      <div className="bg-white shadow-2xl rounded-xl max-w-lg w-full p-8 flex flex-col">
        
        {/* Logo / Illustration */}
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
            alt="Login"
            className="w-16 h-16"
          />
        </div>

        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Welcome Back!</h1>
        <p className="text-center text-gray-500 mb-4 text-sm">
          Enter your credentials to access your account.
        </p>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-center text-sm bg-red-100 py-2 rounded-md mb-4">
            {errorMessage}
          </p>
        )}

        {/* Form */}
        <form className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300 bg-gray-100 focus:bg-white transition"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300 bg-gray-100 focus:bg-white transition"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot Password & Remember Me */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="text-gray-600">Remember Me</span>
            </label>
            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={loginHandler}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg hover:opacity-90 transition text-lg font-semibold"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;