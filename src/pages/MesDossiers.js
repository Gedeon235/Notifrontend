import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dossier } from '../types';
import { dossiersAPI } from '../services/api';
import { Search, Filter, FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
const MesDossiers = () => {
    const [dossiers, setDossiers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatut, setFilterStatut] = useState('');
    useEffect(() => {
        loadDossiers();
    }, []);
    const loadDossiers = async () => {
        try {
            const response = await dossiersAPI.getMyDossiers();
            setDossiers(response.data.dossiers);
        }
        catch (error) {
            console.error('Erreur chargement dossiers:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const getStatutColor = (statut) => {
        const colors = {
            soumis: 'bg-blue-100 text-blue-800',
            en_cours: 'bg-yellow-100 text-yellow-800',
            en_attente: 'bg-orange-100 text-orange-800',
            approuve: 'bg-green-100 text-green-800',
            rejete: 'bg-red-100 text-red-800',
            termine: 'bg-purple-100 text-purple-800'
        };
        return colors[statut] || 'bg-gray-100 text-gray-800';
    };
    const getStatutIcon = (statut) => {
        const icons = {
            soumis: Clock,
            en_cours: Clock,
            en_attente: AlertCircle,
            approuve: CheckCircle,
            rejete: XCircle,
            termine: CheckCircle
        };
        return icons[statut] || FileText;
    };
    const filteredDossiers = dossiers.filter(dossier => {
        const matchesSearch = dossier.numeroDossier.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dossier.Demarche?.nom.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = !filterStatut || dossier.statut === filterStatut;
        return matchesSearch && matchesFilter;
    });
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Mes Dossiers" }), _jsx("p", { className: "text-gray-600", children: "Suivez l'avancement de vos d\u00E9marches administratives" })] }), _jsx(Link, { to: "/demarches", className: "btn-primary", children: "Nouvelle d\u00E9marche" })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1 sm:max-w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx("input", { type: "text", placeholder: "Rechercher un dossier...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "input-field pl-10" })] }), _jsxs("div", { className: "relative sm:max-w-48", children: [_jsx(Filter, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsxs("select", { value: filterStatut, onChange: (e) => setFilterStatut(e.target.value), className: "input-field pl-10", children: [_jsx("option", { value: "", children: "Tous les statuts" }), _jsx("option", { value: "soumis", children: "Soumis" }), _jsx("option", { value: "en_cours", children: "En cours" }), _jsx("option", { value: "en_attente", children: "En attente" }), _jsx("option", { value: "approuve", children: "Approuv\u00E9" }), _jsx("option", { value: "rejete", children: "Rejet\u00E9" }), _jsx("option", { value: "termine", children: "Termin\u00E9" })] })] })] }), _jsx("div", { className: "space-y-4", children: filteredDossiers.map((dossier) => {
                    const StatutIcon = getStatutIcon(dossier.statut);
                    return (_jsx(Link, { to: `/dossiers/${dossier.id}`, className: "card hover:shadow-md transition-shadow duration-200 block", children: _jsx("div", { className: "flex items-start justify-between", children: _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: dossier.Demarche?.nom }), _jsxs("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatutColor(dossier.statut)}`, children: [_jsx(StatutIcon, { className: "w-3 h-3 mr-1" }), dossier.statut.replace('_', ' ')] })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "N\u00B0 dossier:" }), _jsx("div", { className: "text-gray-900", children: dossier.numeroDossier })] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Soumis le:" }), _jsx("div", { children: new Date(dossier.dateSoumission).toLocaleDateString('fr-FR') })] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Frais:" }), _jsxs("div", { children: [dossier.Demarche?.frais, " FCFA"] })] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Documents:" }), _jsxs("div", { children: [dossier.documents.length, " fichier(s)"] })] })] }), dossier.commentaires && (_jsx("div", { className: "mt-3 p-3 bg-gray-50 rounded-lg", children: _jsxs("p", { className: "text-sm text-gray-600", children: [_jsx("span", { className: "font-medium", children: "Commentaire: " }), dossier.commentaires] }) }))] }) }) }, dossier.id));
                }) }), filteredDossiers.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(FileText, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500 mb-4", children: "Aucun dossier trouv\u00E9" }), _jsx(Link, { to: "/demarches", className: "btn-primary", children: "Commencer une d\u00E9marche" })] }))] }));
};
export default MesDossiers;
//# sourceMappingURL=MesDossiers.js.map