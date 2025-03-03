import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("user"); // Remove invalid data
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 px-4 py-2 rounded-md ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:text-white hover:bg-blue-500"
    }`;

  return (
    <nav className="bg-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex-shrink-0 flex items-center text-white text-xl font-bold"
            >
              Job Portal
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/jobs" className={navLinkClass}>
              Jobs
            </NavLink>

            {!user ? (
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
            ) : (
              <>
                {user.role === "admin" && (
                  <NavLink to="/admin-dashboard" className={navLinkClass}>
                    Dashboard
                  </NavLink>
                )}

                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white hover:bg-blue-500 px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/jobs"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Jobs
            </NavLink>

            {!user ? (
              <NavLink
                to="/login"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
            ) : (
              <>
                {user.role === "admin" && (
                  <NavLink
                    to="/admin-dashboard"
                    className={navLinkClass}
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                )}

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left text-gray-300 hover:text-white hover:bg-blue-500 px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
