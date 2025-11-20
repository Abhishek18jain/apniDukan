import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [showLogin, setShowLoginPopup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setMobileMenuOpen(false);
  };

  const handleProtectedClick = (path) => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      setMobileMenuOpen(false);
    } else {
      navigate(path);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-white">

      {/* POPUP */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">

            <p className="text-lg font-semibold mb-4 text-gray-800">
              Please login first to access all the features
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>

              <button
                onClick={() => setShowLoginPopup(false)}
                className="px-5 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Left logo */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Store className="w-6 h-6 text-blue text-xl z-50" />
                </div>
                <span
                  onClick={() => navigate("/")}
                  className="font-bold text-xl z-50 text-gray-900 cursor-pointer"
                >
                  MyShop
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-6 text-sm text-gray-600">
                <button onClick={() => handleProtectedClick("/inventory")} className="hover:text-gray-900 transition font-medium">Inventory</button>
                <button onClick={() => handleProtectedClick("/upload")} className="hover:text-gray-900 transition font-medium">Bill Upload</button>
                <button onClick={() => handleProtectedClick("/stocks")} className="hover:text-gray-900 transition font-medium">Stocks</button>
                <button onClick={() => handleProtectedClick("/contact")} className="hover:text-gray-900 transition font-medium">Contact Us</button>
              </div>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="text-gray-600 hover:text-gray-900 transition font-medium"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-gray-600 hover:text-gray-900 transition font-medium"
                  >
                    Log In
                  </button>

                  <button
                    onClick={() => navigate("/register")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    Register
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu icon */}
            <button
              className="md:hidden z-50 relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN (UPDATED) */}
        <div
          className={`
            md:hidden fixed left-0 top-0
            w-full h-[50%] 
            bg-white border-t border-gray-100 
            px-6 py-4 space-y-3 flex flex-col justify-center
            transform transition-transform duration-300 
            z-40
            ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"}
          `}
        >
          <button onClick={() => handleProtectedClick("/inventory")} className="block text-gray-600 font-medium">Inventory</button>
          <button onClick={() => handleProtectedClick("/upload")} className="block text-gray-600 font-medium">Bill Upload</button>
          <button onClick={() => handleProtectedClick("/stocks")} className="block text-gray-600 font-medium">Stocks</button>
          <button onClick={() => handleProtectedClick("/contact")} className="block text-gray-600 font-medium">Contact Us</button>

          {isLoggedIn ? (
            <>
              <button onClick={() => navigate("/dashboard")} className="block text-gray-600 font-medium">Dashboard</button>
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="block text-gray-600 font-medium">Log In</button>
              <button
                onClick={() => navigate("/register")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
