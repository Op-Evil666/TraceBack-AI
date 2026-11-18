import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Info,
  FilePlus,
  ClipboardList,
  LogIn,
  LogOut,
  UserRound,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "../../context/useAuth";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          to={isAuthenticated ? "/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          <div className="bg-blue-600 text-white p-2 rounded-xl">
            <Search size={22} />
          </div>

          <span className="text-xl font-bold text-slate-900">
            TraceBack <span className="text-blue-600">AI</span>
          </span>
        </Link>

        {/* Navigation links */}
        <div className="hidden lg:flex items-center gap-7">
          <Link
            to="/about"
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition font-medium"
          >
            <Info size={17} />
            About
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/create-report"
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition font-medium"
              >
                <FilePlus size={17} />
                Create Report
              </Link>

              <Link
                to="/submit-complaint"
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition font-medium"
              >
                <ClipboardList size={17} />
                Submit Complaint
              </Link>

              <Link
                to="/notifications"
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition font-medium"
              >
                <Bell size={17} />
                Notifications
              </Link>
            </>
          )}
        </div>

        {/* Authentication / Profile */}
        {isAuthenticated ? (
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-expanded={profileOpen}
              aria-label="Open profile menu"
              className="flex items-center gap-2 rounded-xl p-2 hover:bg-slate-100 transition"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {initial}
              </div>

              <span className="hidden sm:block font-semibold text-slate-700">
                {user?.name || "My Account"}
              </span>

              <ChevronDown
                size={17}
                className={`text-slate-500 transition-transform ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-60 bg-white border border-slate-200 rounded-xl shadow-lg py-2">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="font-semibold text-slate-900 truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-sm text-slate-500 truncate">
                    {user?.email || ""}
                  </p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 transition"
                >
                  <UserRound size={18} />
                  My Profile
                </Link>

                <Link
                  to="/my-reports"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 transition"
                >
                  <FilePlus size={18} />
                  My Reports
                </Link>

                <Link
                  to="/my-complaints"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 transition"
                >
                  <ClipboardList size={18} />
                  My Complaints
                </Link>

                <div className="border-t border-slate-100 mt-2 pt-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition"
          >
            <LogIn size={18} />
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;