// src/components/Footer.jsx
import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-amber-100 px-6 pt-10 pb-20 relative">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src={Logo}
              alt="StudyMate Logo"
              className="w-10 h-10 object-contain"
            />
            <h2 className="text-2xl font-bold text-amber-200">StudyMate</h2>
          </div>

          <p className="text-sm">
            Find your perfect study partner and collaborate for better learning outcomes. Built with MERN Stack.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="footer-title font-semibold mb-2">Company</h3>
          <ul className="text-sm space-y-1">
            <li><a className="link link-hover">About Us</a></li>
            <li><a className="link link-hover">Our Mission</a></li>
            <li><a className="link link-hover">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="footer-title font-semibold mb-2">Services</h3>
          <ul className="text-sm space-y-1">
            <li><a className="link link-hover">Partner Matching</a></li>
            <li><a className="link link-hover">Skill Sharing</a></li>
            <li><a className="link link-hover">Study Groups</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="footer-title font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-xl hover:text-primary"><FaFacebookF /></a>
            <a href="#" className="text-xl hover:text-primary"><FaXTwitter /></a>
            <a href="#" className="text-xl hover:text-primary"><FaLinkedinIn /></a>
            <a href="#" className="text-xl hover:text-primary"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-blue-950 border-t border-blue-800 py-3 text-center text-sm text-gray-400 shadow-inner z-40">
        © {new Date().getFullYear()} <span className="text-amber-200 font-semibold">StudyMate</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
