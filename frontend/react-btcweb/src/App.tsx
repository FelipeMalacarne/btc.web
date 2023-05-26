import { darkTheme, lightTheme } from './Theme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SignInPage } from "./layouts/SignInAndSignUp/SignInPage";
import { SignUpPage } from "./layouts/SignInAndSignUp/SignUpPage";
import React, { createContext, useEffect, useState } from "react";
import { InventoryPage } from "./layouts/InventoryPage/InventoryPage";
import { SecureLayout } from "./layouts/SecureLayout";
import { NotFoundPage } from "./layouts/NotFoundPage";
import { ProductsPage } from './layouts/ProductsPage/ProductsPage';
import { IngredientsPage } from './layouts/IngredientsPage/IngredientsPage';
import { SalesPage } from './layouts/SalesPage/SalesPage';
import { DashboardPage } from './layouts/DashboardPage/DashboardPage';
import { IngredientFormsPage } from './layouts/FormPages/IngredientFormsPage';

export const App = () => {

  const [themeMode, setThemeMode] = useState(lightTheme);
  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme === 'darkTheme') {
      setThemeMode(darkTheme);
    } else {
      setThemeMode(lightTheme);
    }
  }, [themeMode])
  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline />

      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<Navigate to='/secure/dashboard' />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />

        <Route path='/secure' element={<SecureLayout themeMode={themeMode} setThemeMode={setThemeMode} />}>
          <Route path='/secure/dashboard' element={<DashboardPage />} />
          <Route path='/secure/inventory' element={<InventoryPage />} />
          <Route path='/secure/products' element={<ProductsPage />} />
          <Route path='/secure/ingredients' element={<IngredientsPage />} />
          <Route path='/secure/ingredient-registration' element={<IngredientFormsPage />} />
          <Route path='/secure/sales' element={<SalesPage />} />
        </Route>



      </Routes>
    </ThemeProvider>

  );
}
