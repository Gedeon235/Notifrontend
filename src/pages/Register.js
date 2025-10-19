import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
const Register = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        password: '',
        confirmPassword: '',
        adresse: '',
        dateNaissance: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            setLoading(false);
            return;
        }
        if (formData.password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères');
            setLoading(false);
            return;
        }
        try {
            const { confirmPassword, ...registerData } = formData;
            await register(registerData);
            navigate('/');
        }
        catch (err) {
            setError(err.response?.data?.error || 'Erreur lors de l\'inscription');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold text-lg", children: "NT" }) }) }), _jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Cr\u00E9er un compte" }), _jsxs("p", { className: "mt-2 text-center text-sm text-gray-600", children: ["Ou", ' ', _jsx(Link, { to: "/login", className: "font-medium text-primary-600 hover:text-primary-500", children: "connectez-vous \u00E0 votre compte existant" })] })] }), _jsxs("form", { className: "mt-8 space-y-6", onSubmit: handleSubmit, children: [error && (_jsx("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm", children: error })), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "prenom", className: "block text-sm font-medium text-gray-700", children: "Pr\u00E9nom" }), _jsx("input", { id: "prenom", name: "prenom", type: "text", required: true, value: formData.prenom, onChange: handleChange, className: "input-field mt-1" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "nom", className: "block text-sm font-medium text-gray-700", children: "Nom" }), _jsx("input", { id: "nom", name: "nom", type: "text", required: true, value: formData.nom, onChange: handleChange, className: "input-field mt-1" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Adresse email" }), _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", required: true, value: formData.email, onChange: handleChange, className: "input-field mt-1" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "telephone", className: "block text-sm font-medium text-gray-700", children: "Num\u00E9ro de t\u00E9l\u00E9phone" }), _jsx("input", { id: "telephone", name: "telephone", type: "tel", required: true, value: formData.telephone, onChange: handleChange, className: "input-field mt-1", placeholder: "+235 XX XX XX XX" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "dateNaissance", className: "block text-sm font-medium text-gray-700", children: "Date de naissance" }), _jsx("input", { id: "dateNaissance", name: "dateNaissance", type: "date", required: true, value: formData.dateNaissance, onChange: handleChange, className: "input-field mt-1" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "adresse", className: "block text-sm font-medium text-gray-700", children: "Adresse" }), _jsx("textarea", { id: "adresse", name: "adresse", rows: 3, required: true, value: formData.adresse, onChange: handleChange, className: "input-field mt-1" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Mot de passe" }), _jsxs("div", { className: "relative mt-1", children: [_jsx("input", { id: "password", name: "password", type: showPassword ? 'text' : 'password', autoComplete: "new-password", required: true, value: formData.password, onChange: handleChange, className: "input-field pr-10" }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowPassword(!showPassword), children: showPassword ? (_jsx(EyeOff, { className: "h-4 w-4 text-gray-400" })) : (_jsx(Eye, { className: "h-4 w-4 text-gray-400" })) })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-700", children: "Confirmer le mot de passe" }), _jsxs("div", { className: "relative mt-1", children: [_jsx("input", { id: "confirmPassword", name: "confirmPassword", type: showConfirmPassword ? 'text' : 'password', autoComplete: "new-password", required: true, value: formData.confirmPassword, onChange: handleChange, className: "input-field pr-10" }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowConfirmPassword(!showConfirmPassword), children: showConfirmPassword ? (_jsx(EyeOff, { className: "h-4 w-4 text-gray-400" })) : (_jsx(Eye, { className: "h-4 w-4 text-gray-400" })) })] })] })] }), _jsx("div", { children: _jsxs("button", { type: "submit", disabled: loading, className: "group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed", children: [_jsx("span", { className: "absolute left-0 inset-y-0 flex items-center pl-3", children: _jsx(UserPlus, { className: "h-5 w-5 text-primary-500 group-hover:text-primary-400" }) }), loading ? 'Création du compte...' : 'Créer le compte'] }) })] })] }) }));
};
export default Register;
//# sourceMappingURL=Register.js.map