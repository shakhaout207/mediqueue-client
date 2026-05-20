import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
      setMenuOpen(false);
      toast.success("Logged out successfully!");
    } catch {
      toast.error("Failed to logout!");
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 dark:text-gray-200 hover:text-blue-600 transition";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Medi<span className="text-green-500">Queue</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 font-medium">
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/tutors" className={navLinkClass}>Tutors</NavLink></li>
          {user && (
            <>
              <li><NavLink to="/add-tutor" className={navLinkClass}>Add Tutor</NavLink></li>
              <li><NavLink to="/my-tutors" className={navLinkClass}>My Tutors</NavLink></li>
              <li><NavLink to="/my-booked-sessions" className={navLinkClass}>My Booked Sessions</NavLink></li>
            </>
          )}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                  <p className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 font-medium border-b dark:border-gray-700">
                    {user.displayName}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                Login
              </Link>
              <Link to="/register" className="border border-blue-600 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition font-semibold">
                Register
              </Link>
            </div>
          )}

          {/* Hamburger */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 shadow-lg">
          <ul className="flex flex-col gap-3 font-medium">
            <li><NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/tutors" className={navLinkClass} onClick={() => setMenuOpen(false)}>Tutors</NavLink></li>
            {user && (
              <>
                <li><NavLink to="/add-tutor" className={navLinkClass} onClick={() => setMenuOpen(false)}>Add Tutor</NavLink></li>
                <li><NavLink to="/my-tutors" className={navLinkClass} onClick={() => setMenuOpen(false)}>My Tutors</NavLink></li>
                <li><NavLink to="/my-booked-sessions" className={navLinkClass} onClick={() => setMenuOpen(false)}>My Booked Sessions</NavLink></li>
              </>
            )}
            {!user && (
              <>
                <li><NavLink to="/login" className={navLinkClass} onClick={() => setMenuOpen(false)}>Login</NavLink></li>
                <li><NavLink to="/register" className={navLinkClass} onClick={() => setMenuOpen(false)}>Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;