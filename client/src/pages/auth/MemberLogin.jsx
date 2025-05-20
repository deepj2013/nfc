import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
// import { memberLoginServices } from "../../redux/thunk/memberServices";
import { errorLog } from "../../services/ErrorHandlerServices";
import { setStorageValue } from "../../services/LocalStorageServices";

function MemberLogin({ setIsLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    try {
      let payload = {
        email_id: username,
        password: password,
      };
    //   let response = await dispatch(memberLoginServices(payload)).unwrap();
      if (response.msg === "Success") {
        setStorageValue("memberDetails", response?.result);
        setIsLogin(true);
      }
    } catch (error) {
      errorLog(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("https://example.com/your-background.jpg")' }} // Replace with your background image
    >
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-10 max-w-md w-full">
        <h1 className="text-4xl font-semibold text-center text-gray-700 dark:text-gray-400 mb-8">
          Member Login
        </h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-lg text-gray-700 dark:text-gray-400">
              Email / MemberID / RegisterNumber
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-lg text-gray-700 dark:text-gray-400">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
              required
            />
          </div>
          <div className="flex justify-between items-center text-sm mt-4">
            <a href="#" className="text-blue-400 hover:underline">
              Forgot Password?
            </a>
            <a href="/request-membership" className="text-blue-400 hover:underline">
              Request Membership
            </a>
          </div>
        </form>

        <button
          onClick={loginHandler}
          className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
}

export default MemberLogin;
