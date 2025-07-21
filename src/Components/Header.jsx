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
      <header className="bg-orange-500 p-5 text-white flex justify-between items-center">
        <div className="relative group hover:cursor-pointer" onMouseEnter={handleHoverToHome}>
          <h1 className="flex items-center text-2xl font-bold">
            <FaUtensils className="mr-2" /> MEAL FINDER
          </h1>        </div>
        <button onClick={toggleMenu}><Menu className='cursor-pointer' size={28} /></button>
      </header>

      <div className={`fixed top-0 right-0 z-50 w-full md:w-[30%] bg-white shadow-lg transition-transform duration-300
        ${menuOpen ? 'translate-x-0' : 'translate-x-full'} h-[700px] flex flex-col overflow-y-auto`}>

        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <X
              className="text-white border bg-orange-500 rounded-full p-1 cursor-pointer"
              size={28}
            />
          </button>
        </div>

        <ul className="text-black px-4  mt-5 space-y-2">
          {categoryLinks.map((item) => (
            <li key={item}><Link to={`/${item}`} className="block px-4 py-2 border-b border-b-gray-200 hover:bg-gray-100" onClick={() => setMenuOpen(false)} >{item}</Link> </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Header;
