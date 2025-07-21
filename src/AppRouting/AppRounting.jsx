// AppRouting.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Beef from '../Pages/Beef';
import Chicken from '../Pages/Chicken';
import Goat from '../Pages/Goat';
import Dessert from '../Pages/Dessert';
import Vegan from '../Pages/Vegan';
import Lamb from '../Pages/Lamb';
import Miscellaneous from '../Pages/Miscellaneous';
import Pasta from '../Pages/Pasta';
import Pork from '../Pages/Pork';
import Seafood from '../Pages/Seafood';
import Vegetarian from '../Pages/Vegetarian';
import Breakfast from '../Pages/Breakfast';
import Header from '../Components/Header';
import Home from '../Pages/Home';

const AppRouting = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} /> {/* ✅ Home page with Categories */}
        <Route path='/' element={<Header/>}></Route>
        <Route path="/beef" element={<Beef />} />
        <Route path="/breakfast" element={<Breakfast />} />
        <Route path="/chicken" element={<Chicken />} />
        <Route path="/dessert" element={<Dessert />} />
        <Route path="/goat" element={<Goat />} />
        <Route path="/lamb" element={<Lamb />} />
        <Route path="/miscellaneous" element={<Miscellaneous />} />
        <Route path="/pasta" element={<Pasta />} />
        <Route path="/pork" element={<Pork />} />
        <Route path="/seafood" element={<Seafood />} />
        <Route path="/vegan" element={<Vegan />} />
        <Route path="/vegetarian" element={<Vegetarian />} />
      </Routes>
    </Router>
  );
};

export default AppRouting;
