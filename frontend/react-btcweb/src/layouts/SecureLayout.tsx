import React from "react";
import {Navbar} from "./NavbarAndFooter/Navbar";
import {Navigate, Outlet} from "react-router-dom";
import {Footer} from "./NavbarAndFooter/Footer";
import {useAuth} from "../hooks/useAuth";

export const SecureLayout: React.FC<{ themeMode: any, setThemeMode: any}> = (props) => {
    const { authState } = useAuth();
    if(!authState.isLoading && !authState.isAuthenticated){
        return <Navigate to="/signin" />
    }
    return (
        <div>
            <Navbar themeMode={props.themeMode} setThemeMode={props.setThemeMode}/>
                <Outlet/>
            <Footer/>
        </div>
    );
}