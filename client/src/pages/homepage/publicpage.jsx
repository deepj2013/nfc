import React from 'react';
import Header from '../homepage/header';
import Footer from '../homepage/footer';
import { Outlet } from 'react-router-dom';

function PublicPage() {
  return (
    <div className="App">
      <Header />
 
      <Outlet />
      <Footer />
    </div>
  );
}

export default PublicPage;
