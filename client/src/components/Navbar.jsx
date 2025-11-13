// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo.png";

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 🌓 Apply theme preference
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const goToProfile = () => {
    navigate("/profile"); // Change to /profile if you have a separate profile page
  };

  return (
    <nav className="bg-blue-950 text-amber-100 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* 🔹 Brand Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-bold tracking-wide flex items-center gap-2"
        >
          <img
            src={Logo}
            alt="StudyMate Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-md object-contain"
          />
          <span className="text-amber-200">StudyMate</span>
        </Link>

        {/* 🔹 Navigation */}
        <div className="flex items-center gap-4 text-sm sm:text-base">
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
            <div className="relative group flex items-center gap-2 ml-3 cursor-pointer">
              {/* Avatar */}
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  onClick={goToProfile}
                  className="w-8 h-8 rounded-full border border-white object-cover transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <div
                  onClick={goToProfile}
                  className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-sm font-semibold transition-transform duration-200 group-hover:scale-105"
                >
                  {user.displayName?.charAt(0) || "U"}
                </div>
              )}

              {/* Name (clickable) */}
              <span
                onClick={goToProfile}
                className="hidden sm:block hover:text-blue-300 font-medium transition-colors duration-200"
              >
                {user.displayName || "User"}
              </span>

              {/* Hover Tooltip (name + email) */}
              <div className="absolute top-10 left-0 bg-blue-800 text-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-md">
                <p className="font-semibold">{user.displayName || "User"}</p>
                <p className="text-gray-300">{user.email}</p>
              </div>

              {/* Logout Button */}
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

          {/* 🔹 Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-outline border-white text-amber-100 hover:bg-white hover:text-blue-900 flex items-center gap-2"
            title="Toggle Theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
    </nav>
  );
}
