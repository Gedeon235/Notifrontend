import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, LogIn } from 'lucide-react';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/');
        }
        catch (err) {
            setError(err.response?.data?.error || 'Erreur lors de la connexion');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold text-lg", children: "NT" }) }) }), _jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Connexion \u00E0 NotiTchad" }), _jsxs("p", { className: "mt-2 text-center text-sm text-gray-600", children: ["Ou", ' ', _jsx(Link, { to: "/register", className: "font-medium text-primary-600 hover:text-primary-500", children: "cr\u00E9ez un nouveau compte" })] })] }), _jsxs("form", { className: "mt-8 space-y-6", onSubmit: handleSubmit, children: [error && (_jsx("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm", children: error })), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Adresse email" }), _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "input-field mt-1", placeholder: "votre@email.com" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Mot de passe" }), _jsxs("div", { className: "relative mt-1", children: [_jsx("input", { id: "password", name: "password", type: showPassword ? 'text' : 'password', autoComplete: "current-password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "input-field pr-10", placeholder: "Votre mot de passe" }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowPassword(!showPassword), children: showPassword ? (_jsx(EyeOff, { className: "h-4 w-4 text-gray-400" })) : (_jsx(Eye, { className: "h-4 w-4 text-gray-400" })) })] })] })] }), _jsx("div", { children: _jsxs("button", { type: "submit", disabled: loading, className: "group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed", children: [_jsx("span", { className: "absolute left-0 inset-y-0 flex items-center pl-3", children: _jsx(LogIn, { className: "h-5 w-5 text-primary-500 group-hover:text-primary-400" }) }), loading ? 'Connexion...' : 'Se connecter'] }) }), _jsx("div", { className: "text-center", children: _jsx(Link, { to: "/forgot-password", className: "text-sm text-primary-600 hover:text-primary-500", children: "Mot de passe oubli\u00E9 ?" }) })] })] }) }));
};
export default Login;
//# sourceMappingURL=Login.js.map