// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo.png";

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 🌓 Apply theme preference
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const goToProfile = () => navigate("/profile");

  return (
    <nav className="bg-blue-950 text-amber-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
        {/* 🔹 Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-wide"
        >
          <img
            src={Logo}
            alt="StudyMate Logo"
            className="w-9 h-9 rounded-md object-contain"
          />
          <span className="text-amber-200">StudyMate</span>
        </Link>

        {/* 🔹 Hamburger Icon (Mobile) */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-amber-100 text-2xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* 🔹 Desktop Menu */}
        <div className="hidden lg:flex items-center gap-5 text-base">
          <Link to="/" className="hover:text-blue-300">
            Home
          </Link>
          <Link to="/find-partners" className="hover:text-blue-300">
            Find Partners
          </Link>

          {user && (
            <>
              <Link to="/my-connections" className="hover:text-blue-300">
                My Connections
              </Link>
              <Link to="/create-profile" className="hover:text-blue-300">
                Create Profile
              </Link>
              <Link to="/dashboard" className="hover:text-blue-300">
                Dashboard
              </Link>
            </>
          )}

          {/* 🔹 Auth Section */}
          {user ? (
            <div className="relative group flex items-center gap-2 ml-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  onClick={goToProfile}
                  className="w-8 h-8 rounded-full border border-white object-cover cursor-pointer transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <div
                  onClick={goToProfile}
                  className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-sm font-semibold cursor-pointer transition-transform duration-200 group-hover:scale-105"
                >
                  {user.displayName?.charAt(0) || "U"}
                </div>
              )}

              <span
                onClick={goToProfile}
                className="hidden sm:block hover:text-blue-300 font-medium cursor-pointer"
              >
                {user.displayName || "User"}
              </span>

              {/* Tooltip */}
              <div className="absolute top-10 left-0 bg-blue-800 text-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-md">
                <p className="font-semibold">{user.displayName || "User"}</p>
                <p className="text-gray-300">{user.email}</p>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-sm btn-ghost border border-white text-white hover:bg-white hover:text-blue-900 ml-3"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-sm btn-ghost text-amber-100 hover:bg-white hover:text-blue-900"
              >
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </>
          )}

          {/* 🌙 / ☀️ Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-outline border-white text-amber-100 hover:bg-white hover:text-blue-900 flex items-center gap-2"
            title="Toggle Theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-blue-900 text-amber-100 border-t border-blue-800 px-5 py-4 space-y-3">
          <Link
            to="/"
            onClick={toggleMenu}
            className="block hover:text-blue-300"
          >
            Home
          </Link>
          <Link
            to="/find-partners"
            onClick={toggleMenu}
            className="block hover:text-blue-300"
          >
            Find Partners
          </Link>

          {user && (
            <>
              <Link
                to="/my-connections"
                onClick={toggleMenu}
                className="block hover:text-blue-300"
              >
                My Connections
              </Link>
              <Link
                to="/create-profile"
                onClick={toggleMenu}
                className="block hover:text-blue-300"
              >
                Create Profile
              </Link>
              <Link
                to="/dashboard"
                onClick={toggleMenu}
                className="block hover:text-blue-300"
              >
                Dashboard
              </Link>
            </>
          )}

          {/* Auth Links (Mobile) */}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="btn btn-sm w-full bg-white text-blue-900 font-semibold"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                onClick={toggleMenu}
                className="btn btn-sm btn-ghost w-full text-white border border-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={toggleMenu}
                className="btn btn-sm btn-primary w-full"
              >
                Register
              </Link>
            </div>
          )}

          {/* Theme Toggle (Mobile) */}
          <button
            onClick={() => {
              toggleTheme();
              toggleMenu();
            }}
            className="btn btn-sm w-full border border-white text-white hover:bg-white hover:text-blue-900 flex items-center justify-center gap-2"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />} Toggle Theme
          </button>
        </div>
      )}
    </nav>
  );
}
