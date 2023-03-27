import React from 'react';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { DrinksPage } from './layouts/DrinksPage/DrinksPage';

export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100' >
      <Navbar/> 
      
      <div className='flex-grow-1'>
        {/* <HomePage/> */}

        <DrinksPage/>


      </div>

      <Footer/>
    </div>
    
  );
}
