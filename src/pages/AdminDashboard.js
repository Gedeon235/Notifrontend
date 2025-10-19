import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Dossier, Demarche } from '../types';
import { dossiersAPI, demarchesAPI } from '../services/api';
import { Users, FileText, DollarSign, CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';
const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalDossiers: 0,
        dossiersEnCours: 0,
        dossiersTermines: 0,
        revenus: 0
    });
    const [recentDossiers, setRecentDossiers] = useState([]);
    const [demarches, setDemarches] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadDashboardData();
    }, []);
    const loadDashboardData = async () => {
        try {
            const [dossiersResponse, demarchesResponse] = await Promise.all([
                dossiersAPI.getAll({ page: 1, limit: 10 }),
                demarchesAPI.getAll()
            ]);
            const dossiers = dossiersResponse.data.dossiers;
            // Calcul des statistiques
            const totalDossiers = dossiersResponse.data.totalCount;
            const dossiersEnCours = dossiers.filter(d => ['soumis', 'en_cours', 'en_attente'].includes(d.statut)).length;
            const dossiersTermines = dossiers.filter(d => ['termine', 'approuve'].includes(d.statut)).length;
            const revenus = dossiers.reduce((total, dossier) => {
                return total + (dossier.Demarche?.frais || 0);
            }, 0);
            setStats({
                totalDossiers,
                dossiersEnCours,
                dossiersTermines,
                revenus
            });
            setRecentDossiers(dossiers);
            setDemarches(demarchesResponse.data.demarches);
        }
        catch (error) {
            console.error('Erreur chargement dashboard:', error);
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
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Tableau de Bord Administratif" }), _jsx("p", { className: "text-gray-600", children: "Vue d'ensemble des activit\u00E9s du syst\u00E8me" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx("div", { className: "card", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4", children: _jsx(FileText, { className: "w-6 h-6 text-blue-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: "Total Dossiers" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: stats.totalDossiers })] })] }) }), _jsx("div", { className: "card", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4", children: _jsx(Clock, { className: "w-6 h-6 text-yellow-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: "En Cours" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: stats.dossiersEnCours })] })] }) }), _jsx("div", { className: "card", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4", children: _jsx(CheckCircle, { className: "w-6 h-6 text-green-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: "Termin\u00E9s" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: stats.dossiersTermines })] })] }) }), _jsx("div", { className: "card", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4", children: _jsx(DollarSign, { className: "w-6 h-6 text-purple-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: "Revenus" }), _jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [stats.revenus.toLocaleString(), " FCFA"] })] })] }) })] }), _jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "card", children: [_jsx("h2", { className: "font-semibold text-gray-900 mb-4", children: "Dossiers R\u00E9cents" }), _jsx("div", { className: "space-y-3", children: recentDossiers.slice(0, 5).map((dossier) => (_jsxs("div", { className: "flex items-center justify-between p-3 border border-gray-200 rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900 text-sm", children: dossier.Demarche?.nom }), _jsx("p", { className: "text-xs text-gray-500", children: dossier.numeroDossier })] }), _jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(dossier.statut)}`, children: dossier.statut.replace('_', ' ') })] }, dossier.id))) })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { className: "font-semibold text-gray-900 mb-4", children: "D\u00E9marches Disponibles" }), _jsx("div", { className: "space-y-3", children: demarches.slice(0, 5).map((demarche) => (_jsxs("div", { className: "flex items-center justify-between p-3 border border-gray-200 rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900 text-sm", children: demarche.nom }), _jsxs("p", { className: "text-xs text-gray-500", children: [demarche.dureeEstimee, " jours \u2022 ", demarche.frais, " FCFA"] })] }), _jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${demarche.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`, children: demarche.isActive ? 'Active' : 'Inactive' })] }, demarche.id))) })] })] })] }));
};
export default AdminDashboard;
//# sourceMappingURL=AdminDashboard.js.map