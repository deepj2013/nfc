import React, { useEffect, useState } from 'react';
import Sidebar from './layout/Sidebar';
import { twMerge } from 'tailwind-merge';
import Chart from './components/common/Chart';
import CircleChart from './components/common/CircleChart';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';
import AuthRoute from './Routes/AuthRoute';
import DashboardRoutes from './Routes/DashboardRoutes';
import { getStorageValue } from './services/LocalStorageServices';
import { useNavigate } from 'react-router';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  let token = getStorageValue('token');
   const navigate=useNavigate();
  
  const checkLogin=()=>{
    // console.log(token,'9090909');
    if(token){
      setIsLogin(true)
    }
    else{
      setIsLogin(false)
    }
  }

  useEffect(() => {
   checkLogin()
  //  handleLogout()
  }, [])


  const handleLogout=()=>{
    // localStorage.clear()
    // navigate("/")
  }

  

  return (
    <>
      {
        !isLogin ? <AuthRoute setIsLogin={setIsLogin} /> : <DashboardRoutes />
      }
    </>
  )
}

export default App