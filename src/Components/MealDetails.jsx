// // import React from 'react';

// // const MealDetails = ({ meal }) => {
// //   if (!meal) return null;

// //   return (
// //     <div className="bg-white border border-gray-300 shadow-lg p-4 rounded-md w-full text-sm mt-2">
// //       <h3 className="text-lg font-bold mb-2 text-orange-500">{meal.strMeal}</h3>
// //       <p className="mb-1"><strong>Category:</strong> {meal.strCategory}</p>
// //       <p className="mb-1"><strong>Area:</strong> {meal.strArea}</p>
// //       <p className="mb-1"><strong>Tags:</strong> {meal.strTags || 'None'}</p>
// //       <p className="line-clamp-3 text-gray-700">{meal.strInstructions}</p>
// //     </div>
// //   );
// // };

// // export default MealDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const MealDetailsPage = () => {
//     const { mealId } = useParams();
//     const [meal, setMeal] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchMealDetails = async () => {
//             setLoading(true);
//             try {
//                 const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
//                 const data = await res.json();
//                 setMeal(data.meals[0]);
//             } catch (err) {
//                 console.error('Error fetching meal:', err);
//             }
//             setLoading(false);
//         };

//         fetchMealDetails();
//     }, [mealId]);

//     if (loading) {
//         return (
//             <div className="text-center py-20">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-solid mx-auto mb-4"></div>
//                 <p className="text-orange-500 text-lg font-semibold">Loading meal details...</p>
//             </div>
//         );
//     }

//     if (!meal) return <div className="text-center py-20">Meal not found.</div>;

//     return (
//         <>
//             <div className="w-[100%]   mt-20 p-5 bg-gray-100 ">
//                 <h1 className="text-2xl font-bold m-6 text-black">MEAL DETAILS</h1>
               
//                 <div className='flex bg-white m-5 '>
//                    <div>
//                          <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded-lg mb-4 p-5 w-800px max-h-[400px] object-cover" /> 
//                     </div>
//                     <div className='flex flex-col items-center justify-center'>
//                          <h1 className="text-2xl font-bold mb-4 text-orange-500 pb-3 border-b border-orange-500 flex flex-col justify-start">{meal.strMeal}</h1>
//                          <p  className='flex m-3 '><p className='mx-2 font-none'>Category:</p> {meal.strCategory}</p>
//                          <p  className='flex m-3 '><p className='mx-2 font-none'>Source:</p> {meal.strMealThumb}</p>
//                          <p  className='flex m-3 '><p className='mx-2 font-none'>Tags:</p> {meal.strTags || 'None'}</p>
//                     </div>
//                 </div>

                   
//                 {/* </div> */}

//                 <div>
//                     <h2 className="text-2xl font-semibold mt-4 mb-2">Instructions:</h2>
//                     <p className="text-gray-700">{meal.strInstructions}</p>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default MealDetailsPage;

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

  // Split instructions into sentences
  const steps = meal.strInstructions
    ?.split(/(?<=\.)\s+|\n+/)
    .filter((step) => step.trim().length > 0);

  return (
    <div className="w-full mt-20 p-5 bg-gray-100">
      <h1 className="text-2xl font-bold m-6 text-black">MEAL DETAILS</h1>

      <div className="flex flex-col md:flex-row bg-white m-5 p-4 rounded shadow">
        <div className="w-full md:w-1/2">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 py-6">
          <h1 className="text-2xl font-bold mb-4 text-orange-500 border-b border-orange-500 pb-2">
            {meal.strMeal}
          </h1>
          <p className="mb-2"><span className="font-semibold">Category:</span> {meal.strCategory}</p>
          <p className="mb-2"><span className="font-semibold">Source:</span> <a href={meal.strSource || meal.strMealThumb} className="text-blue-500 underline">{meal.strSource || 'N/A'}</a></p>
          <p className="mb-2"><span className="font-semibold">Tags:</span> {meal.strTags || 'None'}</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white m-5 p-5 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">Instructions</h2>
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-orange-500 text-orange-500 font-bold rounded-full mr-4">
                {index + 1}
              </div>
              <p className="text-gray-700">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default MealDetailsPage;
