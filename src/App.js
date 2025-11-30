import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utlis/protectedRoutes";
import BaseLayout from "./layouts/baseLayout.jsx";

// Public Pages
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import ConatctUs from "./pages/contact.jsx";
import ForgotPassword from "./pages/forgetPage.jsx";
import ResetPassword from "./pages/resetPassword.jsx";
import SignupVerifyOtp from "./pages/verifyOtpPage.jsx";

// Protected Pages
import Dashboard from "./pages/dashboard";
import InventoryPage from "./pages/inventory";
import InactivePage from "./pages/Inactivepage";
import Upload from "./pages/upload";
import BillReviewPage from "./pages/billpage";
import BillCreate from "./pages/billCreate.jsx";
import BillsList from "./pages/billList.jsx";
// NEW – Kirana Khata Pages
import BillDetails from "./pages/billDetails.jsx";
import Customers from "./pages/customer.jsx";
import CustomerDetail from "./pages/CustomerDetails.jsx";

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC LAYOUT */}
        <Route path="/" element={<BaseLayout />}>

          {/* Public Screens */}
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="contact" element={<ConatctUs />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="register/verify" element={<SignupVerifyOtp />} />

          {/* PROTECTED PAGES */}
          <Route element={<ProtectedRoute />}>

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="stocks" element={<InactivePage />} />
            <Route path="upload" element={<Upload />} />
            <Route path="review/:billId" element={<BillReviewPage />} />
            <Route path="/bills/:id" element={<BillDetails />} />


<Route path="/bills/create" element={<BillCreate />} />
<Route path="/bills" element={<BillsList />} />


X    <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
     

          </Route>

        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<div>404 Not Found</div>} />

      </Routes>
    </Router>
  );
}

export default App;
