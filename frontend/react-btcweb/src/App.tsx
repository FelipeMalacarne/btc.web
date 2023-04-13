import React from 'react';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { DrinksPage } from './layouts/DrinksPage/DrinksPage';
import './style.scss'

export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100' >
      <Navbar/> 
      
      <div className='flex-grow-1'>
        {/* <HomePage/> */}

        <DrinksPage/>
          <h1>{`hello ${process.env.REACT_APP_NAME}`}</h1>
          <p>asdasfasfasf</p>
      </div>

      <Footer/>
    </div>
    
  );
}
