import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaUtensils } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navigate = useNavigate();
  const location = useLocation();

  const handleHoverToHome = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const categoryLinks = [
    'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat', 'Lamb',
    'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Vegan', 'Vegetarian'
  ];

  return (
    <>
      <header className="
      fixed top-0 left-0 right-0 z-50 bg-orange-500  text-white  shadow-md 
      position-fixed fixed bg-orange-500 p-5 text-white flex justify-between items-center">
        <div className="relative group hover:cursor-pointer" onMouseEnter={handleHoverToHome}>
          <h1 className="flex items-center text-2xl font-bold ml-2  ">
            <FaUtensils className=" md:ml-5 mr-1 lg:ml-40" /> MEAL FINDER
          </h1>        </div>
        <button onClick={toggleMenu}><Menu className='cursor-pointer md:mr-5 lg:mr-40' size={28} /></button>
      </header>

      <div
        className={`fixed top-0 right-0 z-50 w-full md:w-[30%] bg-white shadow-lg transition-transform duration-300
    ${menuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col h-[400px] md:h-[750px]`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <X
              className="text-white border bg-orange-500 rounded-full p-1 cursor-pointer"
              size={28}
            />
          </button>
        </div>

        {/* Scrollable Menu Area */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <ul className="text-black space-y-2">
            {categoryLinks.map((item) => (
              <li key={item}>

                <Link
                  to={`/category/${item}`}
                  className="block px-4 py-2 border-b border-b-gray-200 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>

              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
};

export default Header;
