import React from 'react';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import {ProductsPage } from './layouts/ProductsPage/ProductsPage';
import './style.scss'

export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100' >
      <Navbar/> 
      
      <div className='flex-grow-1'>
        {/* <HomePage/> */}

        <ProductsPage/>

      </div>

      <Footer/>
    </div>
    
  );
}
