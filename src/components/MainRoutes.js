import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import Home from "./Home";
import Navbar from "./Navbar";

const MainRoutes = () => {
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
