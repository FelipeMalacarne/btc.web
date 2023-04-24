import React from "react";
import {Navbar} from "./NavbarAndFooter/Navbar";
import {Navigate, Outlet} from "react-router-dom";
import {Footer} from "./NavbarAndFooter/Footer";
import {useAuth} from "../services/useAuth";

export const SecureLayout = () => {
    const { authState } = useAuth();
    if(!authState.isLoading && !authState.isAuthenticated){
        return <Navigate to="/signin" />
    }
    return (
        <div>
            <Navbar/>
                <Outlet/>
            <Footer/>
        </div>
    );
}