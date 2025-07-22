import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MealDetailsPage = () => {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await res.json();
        setMeal(data.meals[0]);
      } catch (err) {
        console.error('Error fetching meal:', err);
      }
      setLoading(false);
    };

    fetchMealDetails();
  }, [mealId]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-solid mx-auto mb-4"></div>
        <p className="text-orange-500 text-lg font-semibold">Loading meal details...</p>
      </div>
    );
  }

  if (!meal) return <div className="text-center py-20">Meal not found.</div>;

  const steps = meal.strInstructions
    ?.split(/(?<=\.)\s+|\n+/)
    .map((step) =>
      step
        .replace(/^Step\s*\d+:\s*/i, '') // Remove "Step 1:", "Step 2:", etc.
        .trim()
    )
    .filter((step) => step.length > 0);


  // ✅ Extract ingredients and measures after meal is available
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="flex flex-col p-5 mt-15  bg-gray-100 md:mt-15 ">
      <h1 className="text-2xl font-bold md:m-10 m-7 md:mb-2 text-black">
        <span className="border-b-4 md:text-3xl border-orange-500 pb-1">MEAL DETAILS</span>
      </h1>
      <div className="flex flex-col md:m-5 md:flex-row bg-white gap-6 p-6 rounded shadow">
        <div className="w-full md:w-1/2 md:p-1">
           <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded-lg w-full h-auto object-cover" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center md:px-8 py-6">
           <h1 className="md:text-4xl  text-3xl font-bold mb-4 text-orange-500 border-b-2  border-orange-500 pb-2">
            {meal.strMeal} </h1>
          <p className="mb-2  md:text-2xl"><span className="font-semibold md:text-3xl">Category:</span> {meal.strCategory}</p>
          <p className="mb-2">
            <span className="font-semibold flex flex-wrap md:text-3xl">Source:</span>{' '}
            <a href={meal.strSource || meal.strMealThumb}
              className="text-blue-500 underline break-all w-full">
              {meal.strSource || 'N/A'}</a>
          </p>
          <p className="mb-2">
            <span className="font-semibold md:text-3xl">Tags:</span>{' '}
            <span className="border border-orange-500 px-2 py-1 rounded">{meal.strTags || 'None'}</span>
          </p>
        </div>
      </div>
      {/* ✅ Ingredients Section */}
      <div className="bg-white mt-5  md:m-5 p-5 rounded shadow">
        <h2 className="text-4xl font-semibold m-4 md:mb-15 ">Measures :</h2>
        <ul className="space-y-2 md:m-5 md:p-5  py-5 border border-gray-200  bg-gray-100 grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {ingredients.map((item, index) => (
            <li key={index} className="flex items-center pl-3 text-gray-800">
              <span className="font-semibold text-1xl ">🗝️ {item.ingredient}</span>: {item.measure}
            </li>
          ))}
        </ul>
      </div>
      {/* ✅ Instructions Section */}
      <div className="bg-white mt-5 p-10 rounded shadow bg-white md:m-5 p-5 rounded shadow">
        <h1 className="text-3xl font-semibold mb-6 ">
          <span className="text-4xl pb-1">Instructions :</span>
        </h1>
        <ul className="space-y-4 list-none">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start text-gray-700">
              <span className="w-3 h-3 mt-2 mr-4 border-2 border-orange-500 rounded-full flex-shrink-0"></span>
              <p className="text-base leading-relaxed">{step} </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealDetailsPage;
