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

      console.log("Login Payload:", payload);

      let response = await dispatch(adminLoginServices(payload)).unwrap();

      console.log("Login Response:", response);

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8 flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Log in</h1>
        
        {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>}

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-blue-500 text-sm hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="button"
            onClick={loginHandler}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;