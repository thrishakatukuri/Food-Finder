// import React, { useEffect, useState } from 'react';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     async function fetchCategories() {
//         const dataApi = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
//         const {categories} = await dataApi.json();
//         setCategories(categories); 
//     }
//     fetchCategories()
//   }, []);

//   return (
//     <>
//     <div className='p-20 bg-gray-100 pt-10"'>
//       <h2 className="text-4xl font-bold mb-8"> CATEGORIES</h2>

//       <div className="bg-gray-100 flex justify-center items-center">
//           <center className="bg-gray-100  mt-10  rounded grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//        {categories.map((cat) => (
//             <div className='bg-white rounded relative p-2  shadow hover:shadow-lg transition' key={cat.idCategory} >
//             <span className="absolute  right-2 bg-orange-500 text-white text-sm px-3 py-1 rounded shadow">{cat.strCategory}</span>
//             <img className='p-3 ' src={cat.strCategoryThumb} alt={cat.strCategory} width="100%" />
//           </div>
//         ))}
//       </center>
//       </div>
//       </div>
//     </>
//   );
// };

// export default Categories;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      const dataApi = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const { categories } = await dataApi.json();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="p-5 md:p-20 bg-gray-100 pt-10">
      <h2 className="text-4xl font-bold mb-8">CATEGORIES</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <div
            key={cat.idCategory}
            onClick={() => handleCategoryClick(cat.strCategory)}
            className="cursor-pointer bg-white rounded relative p-2 shadow hover:shadow-lg transition hover:scale-105"
          >
            <span className="absolute right-2 bg-orange-500 text-white text-sm px-3 py-1 rounded shadow">
              {cat.strCategory}
            </span>
            <img className="p-3 w-full h-48 object-cover rounded" src={cat.strCategoryThumb} alt={cat.strCategory} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
