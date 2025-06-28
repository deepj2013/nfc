import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { memberLoginServices } from "../../redux/thunk/authServices";
import { errorLog } from "../../services/ErrorHandlerServices";
import { setStorageValue } from "../../services/LocalStorageServices";
import { Link } from "react-router-dom";

function MemberLogin({ setIsLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginHandler = async () => {
    try {
      setErrorMessage("");
      const payload = {
        memberId: username.trim(),
        password: password,
      };

      const response = await dispatch(memberLoginServices(payload)).unwrap();

      if (response?.status === 200) {
        setStorageValue("memberDetails", response); // You can use response.result if needed
        localStorage.setItem("isMemberLoggedIn", "true"); // 🔐 For persistence
        setIsLogin(true);
        navigate("/dashboard");
      } else {
        throw new Error(response.message || "Login failed.");
      }
    } catch (error) {
      errorLog(error);
      setErrorMessage(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center relative px-4"
      style={{
        backgroundImage:
          'url("http://localhost:5173/src/assets/images/s1.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-white/10 backdrop-blur-xl dark:bg-gray-900/60 shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white dark:text-gray-200 mb-4">
          Member Login
        </h1>
        <p className="text-center text-sm text-gray-300 mb-4">
          Sign in with your Member ID and Password
        </p>

        {errorMessage && (
          <p className="bg-red-100 text-red-700 text-sm p-2 rounded mb-4 text-center">
            {errorMessage}
          </p>
        )}

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="block mb-1 text-white text-sm">
              Member ID
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              id="email"
              type="text"
              placeholder="Enter your Member ID"
              className="border p-3 shadow-md bg-white/30 backdrop-blur-sm text-white dark:bg-indigo-700 dark:text-white placeholder:text-gray-300 border-gray-300 dark:border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-white text-sm">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border p-3 shadow-md bg-white/30 backdrop-blur-sm text-white dark:bg-indigo-700 dark:text-white placeholder:text-gray-300 border-gray-300 dark:border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <Link
              to="/forgot-password/member"
              className="text-blue-300 hover:underline"
            >
              Forgot Password?
            </Link>
            <a
              href="/request-membership"
              className="text-blue-300 hover:underline"
            >
              Request Membership
            </a>
          </div>

          <button
            type="button"
            onClick={loginHandler}
            className="bg-gradient-to-r from-purple-500 to-blue-500 mt-4 p-3 text-white font-semibold rounded-lg w-full shadow-lg hover:scale-105 transition transform duration-300 ease-in-out"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}

export default MemberLogin;
