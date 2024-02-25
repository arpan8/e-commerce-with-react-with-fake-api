// Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Cartdetails } from './pages/carts/cartDetails';
import Home from './pages/home/home';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/carts" element={<Cartdetails />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default AllRoutes;
