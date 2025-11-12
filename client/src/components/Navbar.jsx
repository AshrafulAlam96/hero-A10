import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

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

  return (
    <nav className="bg-blue-950 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* 🔹 Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          StudyMate
        </Link>

        {/* 🔹 Navigation */}
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-blue-300">Home</Link>
          <Link to="/find-partners" className="hover:text-blue-300">Find Partners</Link>

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
            <>
              <div className="flex items-center gap-2 ml-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border border-white object-cover"
                    title={user.displayName || "User"}
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-sm font-semibold"
                    title={user.displayName || "User"}
                  >
                    {user.displayName?.charAt(0) || "U"}
                  </div>
                )}
                <span className="hidden sm:block">{user.displayName}</span>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-sm btn-ghost border border-white text-white hover:bg-white hover:text-blue-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-ghost text-white hover:bg-white hover:text-blue-900">
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
            className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-blue-900 flex items-center gap-2"
            title="Toggle Theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
    </nav>
  );
}
