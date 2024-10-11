import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PublicPage from '../pages/homepage/PublicPage';
import Home from '../pages/homepage/home';
import About from '../pages/homepage/aboutclub'
import Login from '../pages/auth/Login';
import MemberLogin from '../pages/auth/MemberLogin';
import SuperLogin from '../pages/auth/SuperLogin';
import { getStorageValue } from '../services/LocalStorageServices';
import Occasions from '../pages/homepage/occasions';
import OurServices from '../pages/homepage/ourservices';
import ContactUs from '../pages/homepage/contact';
import Clubtour from '../pages/homepage/clubtour';

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
      
      <Route element={<PublicPage />}>
      
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/occasions' element={<Occasions />} />
        <Route path="/services" element={<OurServices />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/clubtour" element={<Clubtour />} />

        <Route path="/member-login" element={<MemberLogin setIsLogin={setIsLogin} />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/control" element={<SuperLogin setIsLogin={setIsLogin} />} />
      </Route>
      {/* Handle other routes or a 404 page if needed */}
    </Routes>
  );
}

export default PublicRoutes;
