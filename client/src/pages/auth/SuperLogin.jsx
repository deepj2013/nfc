import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { adminLoginServices, superAdminLoginServices } from "../../redux/thunk/adminServices";
import { errorLog } from "../../services/ErrorHandlerServices";
import { setStorageValue } from "../../services/LocalStorageServices";

function SuperLogin({ setIsLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const loginHander = async () => {
    try {
      let payload = {
        userId: username,
        password: password,
      };
    //   console.log("resporty", payload);
      let response = await dispatch(superAdminLoginServices(payload)).unwrap();
      console.log("res909",response)
      if (response.msg === "Success") {
        console.log(response.result);
        setStorageValue('userDetails', response?.result);
        setIsLogin(true);
      }
    } catch (error) {
      errorLog(error);
    }
    // if(username=='admin@123gmail.com'){
    //   localStorage.setItem('userType','admin')
    //   alert('rrrr')
    // }
    // if(username=='gatekeeper@gmail.com'){
    //   localStorage.setItem('userType','gatekeeper')
    // }
    // setIsLogin(true)
  };

  return (
    <div className="  mt-10">
      <div class=" w-screen flex justify-center items-center ">
        <img
          className="w-[50%] h-full "
          src="https://static.vecteezy.com/system/resources/thumbnails/005/879/539/small_2x/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg"
        />
        <div class="grid gap-8 w-[50%] px-10">
          <div id="back-div" class="bg-gradient-to-r  rounded-[26px] m-4">
            <div class="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
              <h1 class="pt-8 pb-6 font-semibold dark:text-gray-400 text-5xl text-center cursor-default">
                Log in
              </h1>
              <form action="#" method="post" class="space-y-4">
                <div>
                  <label for="email" class="mb-2  dark:text-gray-400 text-lg">
                    Email
                  </label>
                  <input
                    onChange={(e) => setusername(e.target.value)}
                    value={username}
                    id="email"
                    class="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <label for="password" class="mb-2 dark:text-gray-400 text-lg">
                    Password
                  </label>
                  <input
                    onChange={(e) => setpassword(e.target.value)}
                    value={password}
                    id="password"
                    class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <a
                  class="group text-blue-400 transition-all duration-100 ease-in-out"
                  href="#"
                >
                  <span class="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Forget your password?
                  </span>
                </a>
              </form>

              <button
                onClick={() => {
                  loginHander();
                }}
                class="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                // type=""
              >
                LOG IN
              </button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperLogin;
