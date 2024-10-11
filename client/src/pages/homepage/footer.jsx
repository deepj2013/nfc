import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import './Footer.css'; // Custom CSS for styling

const Footer = () => {
  return (
    <footer className="footer bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Address Section */}
        <div className="footer-section">
          <h3 className="text-white text-lg font-semibold mb-2">Address</h3>
          <p>Mathura Rd, Block A, Friends Colony East,</p>
          <p>New Friends Colony, New Delhi, Delhi 110025</p>
          <p>Phone: 011 2632 8235</p>
        </div>

        {/* Navigation Section */}
        <div className="footer-section">
          <h3 className="text-white text-lg font-semibold mb-2">Navigation</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-teal-400">Home</a></li>
            <li><a href="/about" className="hover:text-teal-400">About Club</a></li>
            <li><a href="/services" className="hover:text-teal-400">Services</a></li>
            <li><a href="/gallery" className="hover:text-teal-400">Club Tour</a></li>
            <li><a href="/affiliations" className="hover:text-teal-400">Affiliations</a></li>
            <li><a href="/contact" className="hover:text-teal-400">Contact Us</a></li>
           
            <li><a href="/login" className="hover:text-teal-400">Office Login</a></li>
           


          </ul>
        </div>

        {/* Info Section with Social Media */}
        <div className="footer-section">
          <h3 className="text-white text-lg font-semibold mb-2">Info</h3>
          <p>New Friends Club in New Friends Colony, Delhi. It is an ideal Party place for get togethers in Delhi.</p>
          <div className="social-media-icons mt-4 flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400"><FaFacebookF /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400"><FaInstagram /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400"><FaTwitter /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Horizontal Divider */}
      <hr className="border-gray-700 my-4" />

      {/* Footer Bottom Section */}
      <div className="text-center text-gray-400">
        © 2023 - 24 - New Friends Club | All Rights Reserved | Developed by <a href="https://ameerait.com" className="text-teal-400 hover:underline">AICS</a>
      </div>
    </footer>
  );
};

export default Footer;
