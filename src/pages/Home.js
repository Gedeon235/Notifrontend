import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileCheck, Clock, Shield, Truck, CheckCircle, Users } from 'lucide-react';
const Home = () => {
    const { user } = useAuth();
    const features = [
        {
            icon: FileCheck,
            title: 'Soumission en ligne',
            description: 'Soumettez vos dossiers administratifs en ligne, sans vous déplacer.'
        },
        {
            icon: Clock,
            title: 'Suivi en temps réel',
            description: 'Suivez l\'avancement de votre dossier à chaque étape du traitement.'
        },
        {
            icon: Shield,
            title: 'Sécurisé et fiable',
            description: 'Vos données sont protégées et sécurisées conformément aux normes.'
        },
        {
            icon: Truck,
            title: 'Livraison à domicile',
            description: 'Faites-vous livrer vos documents finalisés à votre adresse.'
        }
    ];
    const stats = [
        { label: 'Dossiers traités', value: '1,200+' },
        { label: 'Démarches disponibles', value: '25+' },
        { label: 'Utilisateurs satisfaits', value: '98%' },
        { label: 'Temps moyen de traitement', value: '72h' }
    ];
    return (_jsxs("div", { className: "space-y-16", children: [_jsxs("section", { className: "text-center space-y-8", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("h1", { className: "text-4xl md:text-6xl font-bold text-gray-900", children: ["Simplifiez vos", _jsx("span", { className: "text-primary-600 block", children: "d\u00E9marches administratives" })] }), _jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "NotiTchad vous accompagne dans toutes vos proc\u00E9dures administratives avec un suivi en temps r\u00E9el et des notifications \u00E0 chaque \u00E9tape." })] }), _jsx("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: user ? (_jsx(Link, { to: "/demarches", className: "btn-primary text-lg px-8 py-3", children: "Commencer une d\u00E9marche" })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/register", className: "btn-primary text-lg px-8 py-3", children: "Cr\u00E9er un compte" }), _jsx(Link, { to: "/demarches", className: "btn-secondary text-lg px-8 py-3", children: "Voir les d\u00E9marches" })] })) })] }), _jsx("section", { className: "grid grid-cols-2 md:grid-cols-4 gap-8", children: stats.map((stat, index) => (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl md:text-3xl font-bold text-primary-600", children: stat.value }), _jsx("div", { className: "text-sm text-gray-600 mt-1", children: stat.label })] }, index))) }), _jsx("section", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (_jsxs("div", { className: "card text-center space-y-4", children: [_jsx("div", { className: "w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto", children: _jsx(Icon, { className: "w-6 h-6 text-primary-600" }) }), _jsx("h3", { className: "font-semibold text-gray-900", children: feature.title }), _jsx("p", { className: "text-sm text-gray-600", children: feature.description })] }, index));
                }) }), _jsxs("section", { className: "card max-w-4xl mx-auto", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 text-center mb-8", children: "Comment \u00E7a marche ?" }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [
                            { step: '1', title: 'Inscription', desc: 'Créez votre compte en 2 minutes' },
                            { step: '2', title: 'Soumission', desc: 'Choisissez votre démarche et soumettez votre dossier' },
                            { step: '3', title: 'Suivi', desc: 'Recevez des notifications à chaque étape' }
                        ].map((item) => (_jsxs("div", { className: "text-center space-y-3", children: [_jsx("div", { className: "w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto text-lg font-bold", children: item.step }), _jsx("h3", { className: "font-semibold text-gray-900", children: item.title }), _jsx("p", { className: "text-sm text-gray-600", children: item.desc })] }, item.step))) })] })] }));
};
export default Home;
//# sourceMappingURL=Home.js.map