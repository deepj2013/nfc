import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo5.jpg";
import fileDownload from "../../assets/images/affiliation-2022.doc";
import "./header.css"; // Importing custom styles for additional formatting

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-2 bg-white shadow-md">
      <div className="logo flex items-center">
        <img src={Logo} alt="Club Logo" className="h-12 w-auto" />
      </div>
      <button
        className="text-gray-700 sm:hidden focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-5 h-5"
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
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } w-full sm:w-auto sm:flex sm:items-center`}
      >
        <ul className="flex flex-col sm:flex-row sm:space-x-6 text-base font-medium text-gray-700">
          <li className="hover:text-purple-600 py-1 sm:py-0">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="hover:text-purple-600 py-1 sm:py-0">
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About Club
            </Link>
          </li>
          <li className="hover:text-purple-600 py-1 sm:py-0">
            <Link to="/occasions" onClick={() => setIsMenuOpen(false)}>
              Club Functions
            </Link>
          </li>
          <li className="hover:text-purple-600 py-1 sm:py-0">
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>
              Our Services
            </Link>
          </li>
          <li className="hover:text-purple-600 py-1 sm:py-0">
            <Link to="/clubtour" onClick={() => setIsMenuOpen(false)}>
              Club Tour
            </Link>
          </li>
          <li className="hover:text-purple-600 py-1 sm:py-0">
            <a
              href={fileDownload}
              download
              onClick={() => setIsMenuOpen(false)}
              className="fusion-background-highlight"
            >
              Affiliations
            </a>
          </li>
          <li className="hover:text-purple-600 py-1 sm:py-0">
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact Us
            </Link>
          </li>
          <li className="py-1 sm:py-0 no-underline">
            <Link
              to="/member-login"
              onClick={() => setIsMenuOpen(false)}
              className="bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
            >
              Member Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
