// src/Routes/AppRoutes.js
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router';
import { getStorageValue } from '../services/LocalStorageServices';
import PublicRoutes from './PublicRoute';

const DashboardRoutes = lazy(() => import('./DashboardRoutes'));

function AppRoutes() {
  const [isLogin, setIsLogin] = useState(false);
  let userDetails = getStorageValue('userDetails');
  const navigate = useNavigate();

  const checkLogin = () => {
    if (userDetails?.token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      {!isLogin ? (
        <PublicRoutes setIsLogin={setIsLogin} />
      ) : (
        <Suspense fallback={<div>Loading Dashboard...</div>}>
          <DashboardRoutes />
        </Suspense>
      )}
    </>
  );
}

export default AppRoutes;
