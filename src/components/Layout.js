import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, FileText, User, LogOut, Settings } from 'lucide-react';
const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigation = [
        { name: 'Accueil', href: '/', icon: Home },
        { name: 'Démarches', href: '/demarches', icon: FileText },
    ];
    if (user) {
        navigation.push({ name: 'Mes Dossiers', href: '/mes-dossiers', icon: FileText });
        if (user.role === 'admin') {
            navigation.push({ name: 'Administration', href: '/admin', icon: Settings });
        }
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("nav", { className: "bg-white shadow-sm border-b border-gray-200", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between h-16", children: [_jsxs("div", { className: "flex items-center", children: [_jsxs(Link, { to: "/", className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold text-sm", children: "NT" }) }), _jsx("span", { className: "font-bold text-xl text-gray-900", children: "NotiTchad" })] }), _jsx("div", { className: "hidden md:ml-8 md:flex md:space-x-4", children: navigation.map((item) => {
                                            const Icon = item.icon;
                                            const isActive = location.pathname === item.href;
                                            return (_jsxs(Link, { to: item.href, className: `inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                                    ? 'bg-primary-100 text-primary-700'
                                                    : 'text-gray-700 hover:bg-gray-100'}`, children: [_jsx(Icon, { className: "w-4 h-4 mr-2" }), item.name] }, item.name));
                                        }) })] }), _jsx("div", { className: "flex items-center space-x-4", children: user ? (_jsxs(_Fragment, { children: [_jsxs("span", { className: "text-sm text-gray-700", children: [user.prenom, " ", user.nom] }), _jsxs("button", { onClick: logout, className: "inline-flex items-center px-3 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors", children: [_jsx(LogOut, { className: "w-4 h-4 mr-1" }), "D\u00E9connexion"] })] })) : (_jsxs("div", { className: "flex space-x-2", children: [_jsx(Link, { to: "/login", className: "btn-secondary", children: "Connexion" }), _jsx(Link, { to: "/register", className: "btn-primary", children: "Inscription" })] })) })] }) }) }), _jsx("main", { className: "max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8", children: children })] }));
};
export default Layout;
//# sourceMappingURL=Layout.js.map