import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../Components/Header';
import Home from '../Pages/Home';
import CategoryPage from '../Components/CategoryPage';
import MealDetails from '../Components/MealDetails';

const AppRouting = () => {
  return (
    <Router >
      <Header />
      <Routes>
        <Route path="/meal/:mealId" element={<MealDetails />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRouting;
