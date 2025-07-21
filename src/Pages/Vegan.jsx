import React from'react';
import Categories from '../Components/Categories';
import Search from '../Components/Search'

const Vegan =()=>{
    return(
        <>
        <Search />
        <h1 className=' bg-gray-500 py-5  flex justify-center'>Vegan</h1>
        <Categories />
        </>
    )
}
export default Vegan;