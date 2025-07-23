import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';


const MealDetailsPage = () => {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      step.replace(/^Step\s*\d+:\s*/i, '').trim()
    )
    .filter((step) => step.length > 0);

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="flex flex-col p-5 mt-15 bg-gray-100 md:px-10 lg:px-30">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 my-4 md:mt-15 pl-6 p-2 py-3 text-white bg-orange-500  md:m-6 border border-orange-500  flex  items-center rounded">
        <span
          className=" cursor-pointer md:text-3xl text-3xl "
          onClick={() => navigate('/')}
        >
          <FaHome />
        </span>
        <span className="mx-2 text-1xl font-bold">{'>>'}</span>

        <span
          className=" cursor-pointer md:text-2xl text-2xl "
          onClick={() => navigate(`/category/${meal.strCategory}`)}
        >
          {meal.strCategory}
        </span>

        <span className="mx-2 text-1xl font-bold">{'>'}</span>
        <span className="capitalize font-medium md:text-2xl">{meal.strMeal}</span>
      </div>

      {/* Meal Details */}
      <h1 className="text-2xl font-bold md:m-10 m-10 md:mb-2 text-black">
        <span className="border-b-4 md:text-3xl border-orange-500 pb-1">MEAL DETAILS</span>
      </h1>

      <div className="flex flex-col md:m-5 md:flex-row bg-white gap-6 p-6 rounded shadow">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded-lg w-full h-auto object-cover" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center md:px-8 py-6">
          <h1 className="md:text-4xl text-3xl font-bold mb-4 text-orange-500 border-b-2 border-orange-500 pb-2">
            {meal.strMeal}
          </h1>
          <p className="mb-2 md:text-2xl">
            <span className="font-semibold md:text-3xl">Category:</span> {meal.strCategory}
          </p>
          <p className="mb-2">
            <span className="font-semibold flex flex-wrap md:text-3xl">Source:</span>{' '}
            <a
              href={meal.strSource || meal.strMealThumb}
              className="text-blue-500 underline break-all w-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              {meal.strSource || 'N/A'}
            </a>
          </p>
          <p className="mb-2 flex gap-2">
            <span className="font-semibold md:text-3xl block mb-2">Tags:</span>
            <span className="flex flex-wrap items-center gap-2">
              {meal.strTags?.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="border border-orange-500 px-3 py-1 rounded text-sm bg-orange-50 text-orange-700"
                >
                  {tag.trim()}
                </span>
              ))}
            </span>
          </p>
          <div className="sm:text-3xl md:hidden xl:block bg-orange-500 text-white border border-gray-200 rounded-md md:m-5 md:p-2 p-4">
            <h2 className="text-3xl xl:text-1xl font-semibold m-1 pl-10  mb-3 text-white">Ingredients :</h2>

           <ul className="grid sm:grid-cols-2 grid-cols-1 gap-2 bg-orange-500 text-white text-2xl rounded-md md:m-1 md:p-1 p-4 xl:gap-1 xl:p-1 2xl:text-5xl">
  {ingredients.map((item, index) => (
    <li key={index} className="flex items-center pl-3">
      <span className="font-semibold text-lg pb-1 flex items-center gap-2">
  <span className="w-8 h-8 flex items-center justify-center border border-green-500 bg-green-600 text-white rounded-full text-sm">
    {index + 1}
  </span>
  {item.ingredient}
</span>

    </li>
  ))}
</ul>

          </div>


        </div>

      </div>
      {/* Ingredients block visible only on md+ screens */}
      <div className="hidden md:block lg:block xl:hidden bg-orange-500 text-white border border-gray-200 rounded-md md:m-4 md:p-1">
  <h2 className="text-3xl font-semibold m-1  text-white">Ingredients :</h2>

  <ul className="md:grid grid-cols-1 md:grid-cols-3 gap-0 bg-orange-500 text-white text-xl rounded-md md:m-1 md:p-1 p-1">
    {ingredients.map((item, index) => (
      <li
        key={index}
        className="flex items-center pl-3 py-2  rounded-sm"
      >
       <span className="font-semibold text-lg pb-1 flex items-center gap-2">
  <span className="w-8 h-8 flex items-center justify-center border border-green-500 bg-green-600 text-white rounded-full border-white
   text-sm">
    {index + 1}
  </span>
  {item.ingredient}
</span>

      </li>
    ))}
  </ul>
</div>


      {/* Ingredients Section */}
      <div className="bg-white mt-5 md:m-5 p-5 rounded shadow">
        <h2 className="text-4xl font-semibold m-4">Measures :</h2>
        <ul className="space-y-2 md:m-5 md:p-5 py-5 border border-gray-200 bg-gray-100 grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {ingredients.map((item, index) => (
            <li key={index} className="flex items-center pl-3 text-gray-800">
              <span className="font-semibold text-1xl">🗝️ {item.ingredient}</span>: {item.measure}
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions Section */}
      <div className="bg-white mt-5 md:m-5 p-5 rounded shadow">
        <h1 className="text-3xl font-semibold mb-6">
          <span className="text-4xl pb-1">Instructions :</span>
        </h1>
        <ul className="space-y-4 list-none">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start text-gray-700">
              <span className="w-3 h-3 mt-2 mr-4 border-2 border-orange-500 rounded-full flex-shrink-0"></span>
              <p className="text-base leading-relaxed">{step}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealDetailsPage;
