// BaseLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* nested routes will render here */}
        
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default BaseLayout;
