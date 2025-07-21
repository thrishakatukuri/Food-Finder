import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Search from './Search';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryDesc, setCategoryDesc] = useState('');

  useEffect(() => {
    const fetchMealsAndDescription = async () => {
      setLoading(true);
      const mealRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
      const mealData = await mealRes.json();
      setMeals(mealData.meals || []);

      const categoryRes = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const categoryData = await categoryRes.json();
      const matchedCategory = categoryData.categories.find(
        (cat) => cat.strCategory.toLowerCase() === categoryName.toLowerCase()
      );
      setCategoryDesc(matchedCategory ? matchedCategory.strCategoryDescription : '');
      setLoading(false);
    };

    fetchMealsAndDescription();
  }, [categoryName]);

  const handleMealClick = (id) => {
    navigate(`/meal/${id}`);
  };

  return (
    <>
      <Search />
      <div className="p-15 bg-white pt-10">
        <div className="border border-orange-500 p-5">
          <h2 className="text-4xl font-bold mb-2 text-orange-500">{categoryName}</h2>
          {categoryDesc && <p className="text-gray-700 text-sm">{categoryDesc}</p>}
        </div>

        <h2 className="text-4xl font-bold m-8">Meals</h2>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-solid mx-auto mb-4"></div>
            <p className="text-orange-500 text-lg font-semibold">Loading meals...</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {meals.map((meal) => (
              <div
                key={meal.idMeal}
                onClick={() => handleMealClick(meal.idMeal)}
                className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover p-1 rounded"
                />
                <div className="p-4 text-center font-semibold">{meal.strMeal}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
