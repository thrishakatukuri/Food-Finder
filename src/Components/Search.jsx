import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const data = await res.json();
    setSearchResults(data.meals || []);
  };

  const handleHover = (idMeal) => {
    navigate(`/meal/${idMeal}`);
  };

  return (
    <>
      {/*  search by input starts*/}
      <div className="w-full min-h-[700px] bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')", }} >
        
        <div className="absolute inset-0 z-10 bg-[rgba(0,0,0,0.6)] flex flex-col justify-center items-center text-center px-4">
          <div className="flex justify-center items-center md:gap-3 gap-2 mb-3 flex-wrap">
           <input type="text" placeholder="Search recipes here ..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="bg-gray-100 border border-gray-300 rounded-full p-3 px-5 w-[220px] md:p-5 md:w-[350px]" />
           <span onClick={handleSearch} className="bg-orange-500 p-3 border border-white text-white rounded-full hover:bg-orange-600 cursor-pointer transition"> <FaSearch size={28} /> </span>
          </div>

          <h1 className="text-2xl md:text-5xl font-bold text-white p-2 md:p-5"> What are Your favorite cuisines?</h1>
          <p className="text-sm md:text-2xl pt-1 md:pt-5 text-gray-200">PERSONALIZE YOUR EXPERIENCE</p>
          
        </div>
      </div>

      {/* Search Results Section */}
      <div className=" bg-white">{searchResults.length > 0 ? (
          <>
          <div className='px-5 md:px-20 pt-10 bg-gray-100'>

            <h2 className="text-3xl font-bold md:mb-10 mb-5 ">Search Results :</h2>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {searchResults.map((meal) => (
                <div key={meal.idMeal} className="bg-white rounded shadow  hover:shadow-lg transition cursor-pointer p-5 " onMouseEnter={() => handleHover(meal.idMeal)} >
                  <img  src={meal.strMealThumb}  alt={meal.strMeal}  className="w-full h-48 object-cover rounded-t rounded" />
                  <div className="p-4 pb-0 font-semibold text-center">{meal.strMeal}</div>
                </div>
              ))}
            </div>
            </div>
          </>
        ) 
        :
        (searchInput && (<p className="text-center text-gray-500 text-lg">No results found for "{searchInput}"</p>) )
         }
      </div>
      {/*  search by input starts*/}
    </>
  );
};

export default Search;
