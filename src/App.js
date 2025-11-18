import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login.jsx"
import Register from "./pages/register.jsx"
import Dashboard from "./pages/dashboard.jsx"
import Inventory from "./pages/inventory.jsx"
import BaseLayout from "./layouts/baseLayout.jsx";
import ProtectedRoute from "./utlis/protectedRoutes.jsx";
import InactivePage from "./pages/Inactivepage.jsx";
import Upload from "./pages/upload.jsx"

function App() {
  return (
    <div className="App">
       <Toaster position="top-right" />
      <Router>
        <Routes>
               {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      {/* protectedRoutes */}
      <Route path="/" element={<ProtectedRoute><BaseLayout /></ProtectedRoute>}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="inventory" element={<Inventory />} />
  <Route path="stocks" element={<InactivePage />} />
  <Route path="upload" element={<Upload />} />

</Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
