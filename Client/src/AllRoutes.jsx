import React from "react";
import { Routes, Route } from "react-router-dom";
import AboutUs from "./Components/AboutUs";
import Footer from "./Components/Footer";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Footer />} />
    </Routes>
  );
};

export default AllRoutes;
