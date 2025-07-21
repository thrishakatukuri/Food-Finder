import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  return (
    <>
      <div
        className="w-full mt-18 min-h-[700px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
        }}
      >
        {/* Absolute center content with full cover and centered items */}
        <div className="absolute inset-0 z-10 bg-[rgba(0,0,0,0.6)] flex flex-col justify-center items-center text-center px-4">
          <div className="flex justify-center items-center md:gap-3 gap-2 mb-3 flex-wrap">
            <input
              type="text"
              placeholder="Search recipes here ..."
              className="bg-gray-100 border border-gray-300 rounded-full p-3 px-5 w-[220px] md:p-5 md:w-[350px]"
              required
            />
            <span className="bg-orange-500 p-3 border border-white text-white rounded-full">
              <FaSearch className="cursor-pointer"  size={28} />
            </span>
          </div>

          <h1 className="text-2xl md:text-5xl font-bold text-white p-2 md:p-5">
            What are Your favorite cuisines?
          </h1>
          <p className="text-sm md:text-2xl  pt-1 md:pt-5 text-gray-200">PERSONALIZE YOUR EXPERIENCE</p>
        </div>
      </div>
    </>
  );
};

export default Search;
