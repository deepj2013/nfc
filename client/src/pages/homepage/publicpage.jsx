  import React from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import Header from '../homepage/header';
  import Footer from '../homepage/footer';
  import Home from '../homepage/home';
  import About from '../homepage/aboutclub'
  // import Services from './components/Services';
  // import Gallery from './components/Gallery';
  // import Contact from './components/Contact';
  // import ClubTour from './components/ClubTour';

  function pubilicpage() {
    return (
      
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          {/*  <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tour" element={<ClubTour />} /> */}
          </Routes>
          <Footer />
        </div>
      
    );
  }

  export default pubilicpage;
