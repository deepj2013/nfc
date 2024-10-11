import React from 'react';
import Header from '../homepage/header';
import Footer from '../homepage/footer';
import { Outlet } from 'react-router-dom';
import WhatsAppButton from '../../components/common/whatssappicon';

function PublicPage() {
  return (
    <div className="App">
     
      <Header />
    <WhatsAppButton />
      <Outlet />
      <Footer />
    </div>
  );
}

export default PublicPage;
