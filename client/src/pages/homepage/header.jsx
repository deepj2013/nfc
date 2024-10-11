import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/images/logo5.jpg";
import './header.css'; // Importing custom styles for additional formatting

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="logo flex items-center">
        <img src={Logo} alt="Club Logo" className="h-16 w-auto" />
      </div>
      <button
        className="text-gray-700 sm:hidden focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <nav className={`${isMenuOpen ? 'block' : 'hidden'} w-full sm:w-auto sm:flex sm:items-center`}>
        <ul className="flex flex-col sm:flex-row sm:space-x-8 text-lg font-medium text-gray-700">
          <li className="hover:text-purple-600 py-2 sm:py-0">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li className="hover:text-purple-600 py-2 sm:py-0">
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Club</Link>
          </li>
          <li className="hover:text-purple-600 py-2 sm:py-0">
            <Link to="/occasions" onClick={() => setIsMenuOpen(false)}>Club Functions</Link>
          </li>
          <li className="hover:text-purple-600 py-2 sm:py-0">
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>Our Services</Link>
          </li>
          <li className="hover:text-purple-600 py-2 sm:py-0">
            <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Club Gallery</Link>
          </li>
          <li className="hover:text-purple-600 py-2 sm:py-0">
            <Link to="/affiliations" onClick={() => setIsMenuOpen(false)}>Affiliations</Link>
          </li>
          <li className="hover:text-purple-600 py-2 sm:py-0">
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
          </li>
          <li className="hover:text-purple-600 py-2 sm:py-0">
            <a href="/tour" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Club Tour</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
