import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthContextType, RegisterData } from '../types';
import { authAPI } from '../services/api';
const AuthContext = createContext(undefined);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            authAPI.getProfile()
                .then(response => {
                setUser(response.data.user);
            })
                .catch(() => {
                localStorage.removeItem('token');
            })
                .finally(() => {
                setIsLoading(false);
            });
        }
        else {
            setIsLoading(false);
        }
    }, []);
    const login = async (email, password) => {
        const response = await authAPI.login(email, password);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setUser(user);
    };
    const register = async (userData) => {
        const response = await authAPI.register(userData);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setUser(user);
    };
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };
    const value = {
        user,
        login,
        register,
        logout,
        isLoading
    };
    return (_jsx(AuthContext.Provider, { value: value, children: children }));
};
//# sourceMappingURL=AuthContext.js.map