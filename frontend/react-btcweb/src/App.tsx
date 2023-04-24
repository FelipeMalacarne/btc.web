import {Navbar} from './layouts/NavbarAndFooter/Navbar';
import {Footer} from './layouts/NavbarAndFooter/Footer';
import {DarkTheme, Theme} from './Theme';
import {Box, CssBaseline, ThemeProvider} from '@mui/material';
import {Navigate, Outlet, Route, Router, RouterProvider, Routes} from 'react-router-dom';

import {SignInPage} from "./layouts/SignInAndSignUp/SignInPage";
import {SignUpPage} from "./layouts/SignInAndSignUp/SignUpPage";
import React, {createContext} from "react";
import {InventoryPage} from "./layouts/InventoryPage/InventoryPage";
import {SecureLayout} from "./layouts/SecureLayout";
import {NotFoundPage} from "./layouts/NotFoundPage";

export const App = () => {


    return (
        <ThemeProvider theme={DarkTheme}>
            <CssBaseline/>
            <Routes>
                <Route path='*' element={<NotFoundPage/>}/>
                <Route path='/signin' element={<SignInPage/>}/>
                <Route path='/signup' element={<SignUpPage/>}/>

                <Route path='/secure' element={<SecureLayout/>}>
                    <Route path='/secure/inventory' element={<InventoryPage/>}/>
                </Route>



            </Routes>


        </ThemeProvider>

    );
}
