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

      {/* Login Popup */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <p className="text-lg font-semibold mb-4 text-gray-800">
              Please login first to access all the features
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg"
              >
                Login
              </button>

              <button
                onClick={() => setShowLoginPopup(false)}
                className="px-5 py-2 bg-gray-200 text-gray-900 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">MyShop</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 text-sm text-gray-600">
              <button onClick={() => handleProtectedClick("/inventory")} className="font-medium">Inventory</button>
              <button onClick={() => handleProtectedClick("/stocks")} className="font-medium">Stocks</button>
              <button onClick={() => handleProtectedClick("/customers")} className="font-medium">Transaction</button>
                <button onClick={() => handleProtectedClick("/bills/create")} className="font-medium">Item-billing</button>
              <button onClick={() => handleProtectedClick("/upload")} className="font-medium">Bill Upload</button>
              <button onClick={() => handleProtectedClick("/contact")} className="font-medium">Contact Us</button>
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <button onClick={() => navigate("/dashboard")} className="text-gray-600">Dashboard</button>
                  <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate("/login")} className="text-gray-600">Log In</button>
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Register
                  </button>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
<div
  className={`md:hidden fixed left-0 top-0 w-full h-[50%] bg-white px-6 py-4 flex flex-col justify-center space-y-4 transform transition-transform duration-300 z-40
    ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
>
  {/* Close Button Inside Panel */}
  <button
    className="absolute top-4 right-4"
    onClick={() => setMobileMenuOpen(false)}
  >
    <X className="w-6 h-6 text-gray-700" />
  </button>

  <button onClick={() => handleProtectedClick("/inventory")} className="text-gray-700">Inventory</button>
  <button onClick={() => handleProtectedClick("/upload")} className="text-gray-700">Bill Upload</button>
  <button onClick={() => handleProtectedClick("/stocks")} className="text-gray-700">Stocks</button>
  <button onClick={() => handleProtectedClick("/customers")} className="text-gray-700">Transaction</button>
  <button onClick={() => handleProtectedClick("/bills/create")} className="text-gray-700">Item-billing</button>
  <button onClick={() => handleProtectedClick("/contact")} className="text-gray-700">Contact Us</button>

  {isLoggedIn ? (
    <>
      <button onClick={() => navigate("/dashboard")} className="text-gray-700">Dashboard</button>
      <button
        onClick={handleLogout}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <button onClick={() => navigate("/login")} className="text-gray-700">Log In</button>
      <button
        onClick={() => navigate("/register")}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
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
