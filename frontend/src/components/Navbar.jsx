import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom"; // Import useLocation hook
// import "../styles/index.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Assuming user state holds user information
  const navigate = useNavigate(); // For navigation programmatically
  const location = useLocation(); // Hook to get current location

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-blue-600 rounded-lg px-5 py-2 transition-all duration-300 ease-in-out transform hover:scale-105"
      : "text-gray-300 hover:text-white hover:bg-blue-500 rounded-lg px-5 py-2 transition-all duration-300 ease-in-out transform hover:scale-105";

  // Effect to reset the menu state when route changes
  useEffect(() => {
    setMenuOpen(false); // Reset the menu when the route changes
  }, [location]); // Trigger when location changes (route changes)

  return (
    <nav className="bg-blue-700 border-b border-blue-600 shadow-lg py-4 px-6">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Left side (Logo and brand) */}
        <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <NavLink className="flex flex-shrink-0 items-center mr-8" to="/">
            <span className="text-white text-3xl font-bold tracking-wider">
              Job Portal
            </span>
          </NavLink>
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 ml-auto">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/jobs" className={linkClass}>
              Jobs
            </NavLink>
            {/* Login Button */}
            {!user ? (
              <NavLink to="/login" className={linkClass} onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
            ) : user.role === "admin" ? (
              <NavLink to="/admin-dashboard" className={linkClass} onClick={() => setMenuOpen(false)}>
                Admin Dashboard
              </NavLink>
            ) : (
              <NavLink to="/employee-dashboard" className={linkClass} onClick={() => setMenuOpen(false)}>
                Employee Dashboard
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu absolute top-20 right-0 bg-white bg-opacity-30 backdrop-blur-lg w-2/3 p-6 rounded-lg shadow-2xl space-y-6 md:hidden ${menuOpen ? "block" : "hidden"}`}>
        <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/jobs" className={linkClass} onClick={() => setMenuOpen(false)}>
          Jobs
        </NavLink>
        {/* Login Button in Mobile Menu */}
        {!user ? (
          <NavLink to="/login" className={linkClass} onClick={() => setMenuOpen(false)}>
            Login
          </NavLink>
        ) : user.role === "admin" ? (
          <NavLink to="/admin-dashboard" className={linkClass} onClick={() => setMenuOpen(false)}>
            Admin Dashboard
          </NavLink>
        ) : (
          <NavLink to="/employee-dashboard" className={linkClass} onClick={() => setMenuOpen(false)}>
            Employee Dashboard
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
