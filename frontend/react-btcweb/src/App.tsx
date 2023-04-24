import {Navbar} from './layouts/NavbarAndFooter/Navbar';
import {Footer} from './layouts/NavbarAndFooter/Footer';
import {darkTheme, lightTheme} from './Theme';
import {Box, CssBaseline, ThemeProvider} from '@mui/material';
import {Navigate, Outlet, Route, Router, RouterProvider, Routes} from 'react-router-dom';

import {SignInPage} from "./layouts/SignInAndSignUp/SignInPage";
import {SignUpPage} from "./layouts/SignInAndSignUp/SignUpPage";
import React, {createContext, useState} from "react";
import {InventoryPage} from "./layouts/InventoryPage/InventoryPage";
import {SecureLayout} from "./layouts/SecureLayout";
import {NotFoundPage} from "./layouts/NotFoundPage";

export const App = () => {

    const [themeMode, setThemeMode] = useState(lightTheme);

    return (
        <ThemeProvider theme={themeMode}>
            <CssBaseline/>
            <Routes>
                <Route path='*' element={<NotFoundPage/>}/>
                <Route path='/signin' element={<SignInPage/>}/>
                <Route path='/signup' element={<SignUpPage/>}/>

                <Route path='/secure' element={<SecureLayout themeMode={themeMode} setThemeMode={setThemeMode}/>}>
                    <Route path='/secure/inventory' element={<InventoryPage/>}/>
                </Route>



            </Routes>


        </ThemeProvider>

    );
}
