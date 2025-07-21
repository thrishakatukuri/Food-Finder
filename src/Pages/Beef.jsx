import React from'react';
import Categories from '../Components/Categories';
// import { Search } from 'lucide-react';
import Search from '../Components/Search'
const Beef =()=>{
    return(
        <>
        <Search />
        <h1 className=' bg-gray-500 py-5  flex justify-center'>Beef</h1>
        <Categories />
        </>
    )
}
export default Beef;