import React, { useState } from 'react'
import Sidebar from './layout/Sidebar'
import { twMerge } from 'tailwind-merge';
import Chart from './components/common/Chart';
import CircleChart from './components/common/CircleChart';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';
import AuthRoute from './Routes/AuthRoute';
import DashboardRoutes from './Routes/DashboardRoutes';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  console.log(open);
  return (
    <>
      {
        !isLogin ? <AuthRoute setIsLogin={setIsLogin} /> : <DashboardRoutes />
      }
    </>
  )
}

export default App