import React, { useEffect, useState } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
        const dataApi = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const {categories} = await dataApi.json();
        setCategories(categories); 
    }
    fetchCategories()
  }, []);

  return (
    <>
    <div className="bg-gray-100">
       <h1  className="p-8 justify-center flex text-3xl font-bold">CATEGORIES</h1>
      <div className="bg-gray-100  p-8 rounded grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
       {categories.map((cat) => (
            <div className='bg-white rounded relative p-2' key={cat.idCategory} >
            <span className="absolute  right-2 bg-orange-500 text-white text-sm px-3 py-1 rounded shadow">{cat.strCategory}</span>
            <img className='p-3 ' src={cat.strCategoryThumb} alt={cat.strCategory} width="100%" />
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default Categories;
