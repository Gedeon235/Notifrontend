import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Demarche } from '../types';
import { demarchesAPI } from '../services/api';
import { Search, Clock, DollarSign } from 'lucide-react';
const Demarches = () => {
    const [demarches, setDemarches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        loadDemarches();
    }, []);
    const loadDemarches = async () => {
        try {
            const response = await demarchesAPI.getAll();
            setDemarches(response.data.demarches);
        }
        catch (error) {
            console.error('Erreur chargement démarches:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const filteredDemarches = demarches.filter(demarche => demarche.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demarche.description.toLowerCase().includes(searchTerm.toLowerCase()));
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "D\u00E9marches Administratives" }), _jsx("p", { className: "text-gray-600", children: "Choisissez la d\u00E9marche que vous souhaitez effectuer" })] }), _jsxs("div", { className: "relative w-full sm:w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx("input", { type: "text", placeholder: "Rechercher une d\u00E9marche...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "input-field pl-10" })] })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredDemarches.map((demarche) => (_jsx(Link, { to: `/demarches/${demarche.id}`, className: "card hover:shadow-md transition-shadow duration-200 block", children: _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "font-semibold text-gray-900 text-lg", children: demarche.nom }), _jsx("p", { className: "text-gray-600 text-sm line-clamp-2", children: demarche.description }), _jsxs("div", { className: "flex justify-between items-center text-sm text-gray-500", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Clock, { className: "w-4 h-4" }), _jsxs("span", { children: [demarche.dureeEstimee, " jours"] })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(DollarSign, { className: "w-4 h-4" }), _jsxs("span", { children: [demarche.frais, " FCFA"] })] })] }), _jsxs("div", { className: "flex flex-wrap gap-1", children: [demarche.documentsRequis.slice(0, 3).map((doc, index) => (_jsx("span", { className: "inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded", children: doc }, index))), demarche.documentsRequis.length > 3 && (_jsxs("span", { className: "inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded", children: ["+", demarche.documentsRequis.length - 3] }))] })] }) }, demarche.id))) }), filteredDemarches.length === 0 && (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-gray-500", children: "Aucune d\u00E9marche trouv\u00E9e" }) }))] }));
};
export default Demarches;
//# sourceMappingURL=Demarches.js.map