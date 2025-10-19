import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Demarches from './pages/Demarches';
import DemarcheDetail from './pages/DemarcheDetail';
import MesDossiers from './pages/MesDossiers';
import DossierDetail from './pages/DossierDetail';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
    return (_jsx(AuthProvider, { children: _jsx(Router, { children: _jsx(Layout, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/demarches", element: _jsx(Demarches, {}) }), _jsx(Route, { path: "/demarches/:id", element: _jsx(DemarcheDetail, {}) }), _jsx(Route, { path: "/mes-dossiers", element: _jsx(ProtectedRoute, { children: _jsx(MesDossiers, {}) }) }), _jsx(Route, { path: "/dossiers/:id", element: _jsx(ProtectedRoute, { children: _jsx(DossierDetail, {}) }) }), _jsx(Route, { path: "/admin", element: _jsx(ProtectedRoute, { requiredRole: "admin", children: _jsx(AdminDashboard, {}) }) })] }) }) }) }));
}
export default App;
//# sourceMappingURL=App.js.map