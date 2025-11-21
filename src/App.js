import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utlis/protectedRoutes";
import BaseLayout from "./layouts/baseLayout.jsx";
import Homepage from "./pages/homepage";
import Dashboard from "./pages/dashboard";
import InventoryPage from "./pages/inventory";
import InactivePage from "./pages/Inactivepage";
import Upload from "./pages/upload";
import BillReviewPage from "./pages/billpage";
import Login from "./pages/login";
import Register from "./pages/register";
import ConatctUs from "./pages/contact.jsx"

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
         <Route path="/" element={<BaseLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ConatctUs />} />
        

        {/* Layout route - Navbar and other common UI */}
       
          {/* Public homepage (index) inside the layout */}
          <Route index element={<Homepage />} />

          {/* Protected nested routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="stocks" element={<InactivePage />} />
            <Route path="upload" element={<Upload />} />
            <Route path="review/:billId" element={<BillReviewPage />} />
          </Route>
        </Route>

        {/* optional: catch-all 404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
