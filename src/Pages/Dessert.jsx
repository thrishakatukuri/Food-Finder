import React from'react';
import Categories from '../Components/Categories';
import Search from '../Components/Search'

const Dessert =()=>{
    return(
        <>
        <Search />
        <h1 className= 'bg-gray-500 py-5  flex justify-center'>Dessert</h1>
        <Categories />
        </>
    )
}
export default Dessert;