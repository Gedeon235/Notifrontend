import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const ProtectedRoute = ({ children, requiredRole = 'citoyen' }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" }) }));
    }
    if (!user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    if (requiredRole === 'admin' && user.role !== 'admin') {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    if (requiredRole === 'agent' && !['agent', 'admin'].includes(user.role)) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
//# sourceMappingURL=ProtectedRoute.js.map