import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa"; // 👈 Import icons

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme and store preference
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="bg-blue-950 text-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side - Logo */}
        <Link to="/" className="text-2xl font-bold">
          StudyMate
        </Link>

        {/* Right side - Links + Theme toggle */}
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <Link to="/find-partners" className="hover:text-primary">
            Find Partners
          </Link>
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>

          {/* 🌙 / ☀️ Theme Toggle with Icons */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-blue-900 flex items-center gap-2"
            title="Toggle Theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </div>
    </nav>
  );
}
