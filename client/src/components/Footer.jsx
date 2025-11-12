// src/components/Footer.jsx

import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-amber-100 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-amber-200 mb-2">StudyMate</h2>
          <p className="text-sm">
            Find your perfect study partner and collaborate for better learning outcomes. Built with MERN Stack.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="footer-title">Company</h3>
          <ul className="text-sm space-y-1">
            <li><a className="link link-hover">About Us</a></li>
            <li><a className="link link-hover">Our Mission</a></li>
            <li><a className="link link-hover">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="footer-title">Services</h3>
          <ul className="text-sm space-y-1">
            <li><a className="link link-hover">Partner Matching</a></li>
            <li><a className="link link-hover">Skill Sharing</a></li>
            <li><a className="link link-hover">Study Groups</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="footer-title">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-xl hover:text-primary"><FaFacebookF /></a>
            <a href="#" className="text-xl hover:text-primary"><FaXTwitter /></a>
            <a href="#" className="text-xl hover:text-primary"><FaLinkedinIn /></a>
            <a href="#" className="text-xl hover:text-primary"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-base-300 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} StudyMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;