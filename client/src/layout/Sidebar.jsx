// Package Imports
import React, { useEffect, useState } from "react";

import { twMerge } from "tailwind-merge";
import { GrAchievement } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronRight, FaCircle, FaRegUser, FaUser } from "react-icons/fa";
import { FaBuildingUser, FaFlorinSign } from "react-icons/fa6";
import { RiFileUserFill } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";

import { MdSpaceDashboard } from "react-icons/md";
import {
  AdminRoutes,
  GatekeeperRoute,
  universalAdmin,
} from "../utils/routeByType";
import { NavLink, useNavigate } from "react-router-dom";
import { useMicellaneousServices } from "../services/useMicellaneousServices";
import { getStorageValue } from "../services/LocalStorageServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// View Imports

const Sidebar = ({ open, setOpen }) => {
  const [profileToggle, setProfileToggle] = useState(true);
  const [menu, setMenu] = useState([]);
  const userType = localStorage.getItem("userType");
  const navigate=useNavigate()
  const [active, setActive] = useState(null);
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

  const [width, setWidth] = useState(window.innerWidth);
  const [role, setRole] = useState(1);
  const [route, setRoute] = useState(AdminRoutes);
  // console.log("rakeshho",route)
  const routeToggle = () => {
    if (width < 1024) {
      setOpen(false);
    } else {
      console.log("pom");
    }
  };



  let userDetails = getStorageValue('userDetails')
  const { getmenubyroleHandler } = useMicellaneousServices()

  useEffect(() => {
    const featch = async () => {
      try {
        let temp = await getmenubyroleHandler({ role_id: Number(userDetails?.role_id) })
        setMenu(temp)
      } catch (error) {
        console.log(error);
      }

    }
    featch()
  }, [])



  // console.log(menu);

  // useEffect(() => {
  //   const featchData=async()=>{
  //     let response = await dashBoardMenuHandler()
  //     console.log(response);
  //   }
  //   featchData()
  // }, [])


  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }


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
                      onClick={() => setProfileToggle(!profileToggle)}
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
                  {/* {profileToggle&&<div
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
                  </div>} */}
                </div>
              </div>
            </div>
          </div>
        </nav>
      }

      <aside
        id="logo-sidebar"
        class={`fixed   top-0  bg-white shadow left-0 z-[999] ${open ? "w-60" : "w-16 "
          } duration-500 h-screen top-20 rounded-e-[40px]  overflow-hidden    border-gray-200 lg:translate-x-0 `}
        aria-label="Sidebar"
      >
        <div
          className={`h-full  overflow-y-auto  duration-300= ${open ? "w-60" : "w-16 px-0"
            }`}
        >
          <div className="  mt-4 p w-full flex justify-between relative"></div>
          <ul
            class={twMerge(
              "space-y-2  font-normal group  ",
              !open ? "px-0" : "px-4"
            )}
          >

{/* <FontAwesomeIcon className="text-red-400 border " icon="fa-solid fa-house" /> */}

            {menu?.map((item, ind) => {
                return (
                  <div
                    onClick={() => {
                      setActive(ind);
                      navigate(item?.routeUrl)
                      // if(!active){
                      //   setActive(ind)
                      // }
                      // else{
                      //   setActive(null)
                      // }
                    }}
                    className="cursor-pointer "
                  >
                    <li className="flex items-center">
                      <div className="h-10 w-10 bg-bgColor rounded-lg text-theme text-xl flex justify-center items-center">
                        
                      </div>
                      {open && (
                        <span class="ml-3 text-sm  text-grayText">
                          {item.Menu_name}
                        </span>
                      )}
                      {open  &&  item?.submenus.length>0 &&<FaChevronRight className="absolute right-4" />}
                    </li>
                    {active == ind &&
                      item?.subMenu?.map((ele, ind) => {
                        return (
                          <NavLink to={ele?.path}>
                            <div className="w-full flex items-center gap-2 ml-14 text-center py-1 mt-1  text-theme">
                              <FaCircle className="text-[6px] font-semibold " />

                              <p className="text-sm">{ele?.title}</p>
                            </div>
                          </NavLink>
                        );
                      })}
                  </div>
                );
           
            })}
          </ul>

          <button
            onClick={() => {
              handleLogout()
            }}
            className=" mt-32 border mx-auto p-3 flex items-center gap-4 w-[90%] bg-theme text-white rounded-md">
            <LuLogOut />
            <p className="text-white">Logout</p>
          </button>
        </div>
      </aside>
    </div>
    // <Routes>
    // 	<Route path='/' element={<HomeView />} />
    // </Routes>
  );
};

export default Sidebar;
