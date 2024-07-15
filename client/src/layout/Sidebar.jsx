// Package Imports
import React, { useEffect, useState } from "react";


import { twMerge } from "tailwind-merge";
import { GrAchievement } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronRight, FaRegUser } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { RiFileUserFill } from "react-icons/ri";

import { MdSpaceDashboard } from "react-icons/md";
import { AdminRoutes, GatekeeperRoute } from "../utils/routeByType";

// View Imports




const Sidebar = ({ open, setOpen }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
  const [profileToggle,setProfileToggle]=useState(false)
  const userType=localStorage.getItem('userType');

  console.log(userType);
  // const [open,setOpen]=useState(true)
  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };


  const toggleTheme = () => {
    const currentTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    localStorage.setItem("color-theme", newTheme);
    applyTheme(newTheme);
  };

  // Access the pathname from location
  var currentPathname = location.pathname;


  const [width,setWidth]=useState(window.innerWidth)
  const [role,setRole]=useState(1)
  const [route,setRoute]=useState(GatekeeperRoute)
  const routeToggle=()=>{
    if(width<1024){
      setOpen(false)
    }
    else{
      console.log('pom');
    }
  }



  useEffect(() => {
    if(userType=='admin'){
      setRoute(AdminRoutes)
    }
    else if(userType=='gatekeeper'){
      setRoute(GatekeeperRoute)
    }
  }, [])
  




  return (
    <div className="">
      {/* <div onClick={()=>alert('sjs')}  className="w-screen bg-black opacity-50 absolute z-50"></div> */}

      {
        <nav class=" fixed  top-0 bg-white shadow mr-64 w-full  z-30  py-3  ">
          <div class="px-3 lg:px-6 lg:pl-3">
            <div class="flex items-center justify-between ">
              <button onClick={() => setOpen(!open)}>
                <GiHamburgerMenu className="text-theme text-3xl" />
              </button>

              <div class="flex items-center">
                <div class="flex items-center ml-3 relative">
                  {/* <button className="mx-5" onClick={toggleTheme}>
                    <div className="hidden dark:flex text-white">
                  <BsFillSunFill className="text-2xl" />
                    </div>
                    <div className="dark:hidden visible">
                  <MdDarkMode className="text-2xl text-black" />
                    </div>
                  </button> */}
                  <div>
                    <button
                    onClick={()=>setProfileToggle(!profileToggle)}
                      type="button"
                      class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    
                    >
                      <span class="sr-only">Open user menu</span>
                      {/* <img
                        class="w-8 h-8 rounded-full"
                        src={userAvtar}
                        alt="user photo"
                      /> */}
                    </button>
                  </div>
                  {profileToggle&&<div
                    class="z-50  absolute top-6 right-2 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  >
                   
                    <ul class="py-1 font-normal" role="none">
                     
                     
                      <li
                        onClick={() => {
                   
                        }}
                      >
                        <p
                          class="block px-4 cursor-pointer w-[100px] py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Sign out
                        </p>
                      </li>
                    </ul>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </nav>
      }

      <aside
        id="logo-sidebar"
        class={`fixed   top-0  bg-white shadow left-0 z-[999] ${
          open ? "w-60" : "w-16 "
        } duration-500 h-screen top-20 rounded-e-[40px]  overflow-hidden    border-gray-200 lg:translate-x-0 `}
        aria-label="Sidebar"
      >
        <div
          className={`h-full  overflow-y-auto  duration-300= ${
            open ? "w-60" : "w-16 px-0"
          }`}
        >
          <div className="  mt-4 p w-full flex justify-between relative">


          </div>
          <ul class={twMerge("space-y-2  font-normal group  ",!open?'px-0':'px-4')}>

            {
              route.map((item,ind)=>{
                return(
                  <li  className="">
                  {/* <NavLink onClick={() =>routeToggle()} to={item.path}> */}
                    <p
                      href="/"
                      class={twMerge(`flex items-center p-2 text-gray-900 rounded-lg   group text-sm ` )}
                    >
                        <div className="h-10 w-10 bg-gray-200 rounded-lg text-theme text-xl flex justify-center items-center">{item?.icon}</div>
                     {open && <span class="ml-3 text-sm  text-grayText">{item.title}</span>}
                    {open && <FaChevronRight className="absolute right-4" />}

                    </p>
                  {/* </NavLink> */}

                </li>
                )
              })
            }
           
          </ul>

          {false && (
            <div
              id="dropdown-cta"
              class="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
              role="alert"
            >
              <div class="flex items-center mb-3">
                {/* <span class="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
                Beta
              </span> */}
              </div>
              <p class="mb-3 text-sm text-blue-800 dark:text-blue-400">
                Preview the new Flowbite dashboard navigation! You can turn the
                new navigation off for a limited time in your profile.
              </p>
              <a
                class="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                href="#"
              >
                Turn new navigation off
              </a>
            </div>
          )}
        </div>
      </aside>
    </div>
    // <Routes>
    // 	<Route path='/' element={<HomeView />} />
    // </Routes>
  );
};

export default Sidebar;
