import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "./AuthService";
import SigninRequestModel from "../models/auth/SigninRequestModel";

interface User {
    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
    roles: string[];
}

export const useAuth = () => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null as User | null,
        isLoading: true
    });
    const navigate = useNavigate();


    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if(user){
            setAuthState({
                isAuthenticated: true,
                user,
                isLoading: false
            });
        } else {
            setAuthState({
                isAuthenticated: false,
                user: null,
                isLoading: false
            });
        }
    }, []);

    async function login(signinRequest: SigninRequestModel) {
        setAuthState({
            ...authState,
            isLoading: true
        })

        try {
            const response = await AuthService.login(signinRequest);
            const user: User = response;
            setAuthState({
                isAuthenticated: true,
                user,
                isLoading: false
            })
        } catch (error) {
            setAuthState({
                isAuthenticated: false,
                user: null,
                isLoading: false
            });
            throw error;
        }
    }


    async function logout() {
        await AuthService.logout();
        setAuthState({
            isAuthenticated: false,
            user: null,
            isLoading: false
        });
        navigate('/signin');
    }

    return { authState, login, logout}

    }

