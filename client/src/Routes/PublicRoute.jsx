import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import Homepage from '../pages/homepage/publicpage';
import Login from '../pages/auth/Login'
import SuperLogin from '../pages/auth/SuperLogin';
import { getStorageValue } from '../services/LocalStorageServices';

function PublicRoutes({ setIsLogin }) {
  const navigate = useNavigate();
  const userDetails = getStorageValue('userDetails');

  useEffect(() => {
    // Redirect to the dashboard if the user is already logged in
    if (userDetails?.token) {
      setIsLogin(true);
      navigate('/dashboard'); // Redirect to the dashboard page
    }
  }, [userDetails, navigate, setIsLogin]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
      <Route path="/control" element={<SuperLogin setIsLogin={setIsLogin} />} />
      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
}

export default PublicRoutes;
