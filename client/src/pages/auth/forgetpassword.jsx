import React, { useState } from 'react'
import { useNavigate } from 'react-router'

function Login({setIsLogin}) {
  const navigate=useNavigate()
  const [username,setusername] =useState('')
  const loginHander=()=>{

    if(username=='admin@123gmail.com'){
      localStorage.setItem('userType','admin')
      alert('rrrr')
    }
    if(username=='gatekeeper@gmail.com'){
      localStorage.setItem('userType','gatekeeper')
    }
    setIsLogin(true)
  }
  
  return (
    <div className='  mt-10'>
         <div className=" w-screen flex justify-center items-center ">

          <img className='w-[50%] h-full ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYh7056AB0WU_qII7iOs4mZG-0Oo8kV2IZow&s'/>
    <div className="grid gap-8 w-[50%] px-10">
      <div
        id="back-div"
        className="bg-gradient-to-r  rounded-[26px] m-4"
      >
        <div
          className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2"
        >
          <h1 className="pt-8 pb-6 font-semibold dark:text-gray-400 text-5xl text-center cursor-default">
            Log in
          </h1>
          <form action="#" method="post" className="space-y-4">
            <div>
              <label for="email" className="mb-2  dark:text-gray-400 text-lg">Email</label>
              <input
                onChange={(e)=>setusername(e.target.value)}
                id="email"
                className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label for="password" className="mb-2 dark:text-gray-400 text-lg">Password</label>
              <input
                id="password"
                className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <a
              className="group text-blue-400 transition-all duration-100 ease-in-out"
              href="#"
            >
              <span
                className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
              >
                Forget your password?
              </span>
            </a>
    
          </form>


          <button
            onClick={()=>{
             loginHander();
            }}
              className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              // type=""
            >
              LOG IN
            </button>
     

         
        </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Login