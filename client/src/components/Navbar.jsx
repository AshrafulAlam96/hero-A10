import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; 

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, logout } = useAuth();

  // Apply theme and save preference
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-blue-950 text-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left - Logo */}
        <Link to="/" className="text-2xl font-bold">
          StudyMate
        </Link>

        {/* Right - Links & User Info */}
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <Link to="/find-partners" className="hover:text-primary">
            Find Partners
          </Link>

          {/* If user logged in */}
          {user ? (
            <>
              {/* Profile photo + name */}
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full border border-white"
                    title={user.displayName || "User"}
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center"
                    title={user.displayName || "User"}
                  >
                    {user.displayName?.charAt(0) || "U"}
                  </div>
                )}
                <span className="hidden sm:block">{user.displayName}</span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="btn btn-ghost hover:bg-white hover:text-blue-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* If not logged in */}
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}

          {/* 🌙 / ☀️ Theme Toggle */}
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
