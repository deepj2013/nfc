import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { superAdminLoginServices } from "../../redux/thunk/adminServices";
import { errorLog } from "../../services/ErrorHandlerServices";
import { setStorageValue } from "../../services/LocalStorageServices";

function SuperLogin({ setIsLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    try {
      let payload = {
        userId: username,
        password: password,
      };
      let response = await dispatch(superAdminLoginServices(payload)).unwrap();
      if (response.msg === "Success") {
        setStorageValue("userDetails", response?.result);
        setIsLogin(true);
        navigate("/dashboard");
      }
    } catch (error) {
      errorLog(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-10">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/005/879/539/small_2x/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg')" }}>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-gray-700 dark:text-gray-300 text-center">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mt-2">Log in to access your account</p>
          
          <form className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">Email</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              />
            </div>
            <div className="text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
            </div>
            <button
              type="button"
              onClick={loginHandler}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SuperLogin;
