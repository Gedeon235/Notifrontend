import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Dossier } from '../types';
import { dossiersAPI } from '../services/api';
import { ArrowLeft, FileText, Download, Calendar, User, DollarSign, Truck } from 'lucide-react';
const DossierDetail = () => {
    const { id } = useParams();
    const [dossier, setDossier] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (id) {
            loadDossier();
        }
    }, [id]);
    const loadDossier = async () => {
        try {
            const response = await dossiersAPI.getById(id);
            setDossier(response.data.dossier);
        }
        catch (error) {
            console.error('Erreur chargement dossier:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const getStatutColor = (statut) => {
        const colors = {
            soumis: 'bg-blue-100 text-blue-800 border-blue-200',
            en_cours: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            en_attente: 'bg-orange-100 text-orange-800 border-orange-200',
            approuve: 'bg-green-100 text-green-800 border-green-200',
            rejete: 'bg-red-100 text-red-800 border-red-200',
            termine: 'bg-purple-100 text-purple-800 border-purple-200'
        };
        return colors[statut] || 'bg-gray-100 text-gray-800 border-gray-200';
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" }) }));
    }
    if (!dossier) {
        return (_jsxs("div", { className: "text-center py-12", children: [_jsx("p", { className: "text-gray-500", children: "Dossier non trouv\u00E9" }), _jsx(Link, { to: "/mes-dossiers", className: "btn-primary mt-4 inline-block", children: "Retour \u00E0 mes dossiers" })] }));
    }
    return (_jsxs("div", { className: "max-w-4xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Link, { to: "/mes-dossiers", className: "flex items-center space-x-2 text-gray-600 hover:text-gray-900", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), _jsx("span", { children: "Retour" })] }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: dossier.Demarche?.nom }), _jsxs("p", { className: "text-gray-600", children: ["N\u00B0 ", dossier.numeroDossier] })] })] }), _jsx("div", { className: `px-3 py-1 rounded-full border text-sm font-medium ${getStatutColor(dossier.statut)}`, children: dossier.statut.replace('_', ' ').toUpperCase() })] }), _jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs("div", { className: "card", children: [_jsx("h2", { className: "font-semibold text-gray-900 mb-4", children: "Progression du dossier" }), _jsx("div", { className: "space-y-4", children: [
                                            {
                                                etape: 'Soumission',
                                                date: dossier.dateSoumission,
                                                active: true
                                            },
                                            {
                                                etape: 'En traitement',
                                                date: dossier.dateTraitement,
                                                active: ['en_cours', 'en_attente', 'approuve', 'rejete', 'termine'].includes(dossier.statut)
                                            },
                                            {
                                                etape: 'Finalisation',
                                                date: dossier.dateFinalisation,
                                                active: ['approuve', 'rejete', 'termine'].includes(dossier.statut)
                                            }
                                        ].map((etape, index) => (_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: `w-2 h-2 rounded-full mt-2 ${etape.active ? 'bg-primary-600' : 'bg-gray-300'}` }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: `font-medium ${etape.active ? 'text-gray-900' : 'text-gray-400'}`, children: etape.etape }), etape.date && (_jsx("p", { className: "text-sm text-gray-500", children: new Date(etape.date).toLocaleDateString('fr-FR', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            }) }))] })] }, index))) })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { className: "font-semibold text-gray-900 mb-4", children: "Documents du dossier" }), _jsx("div", { className: "space-y-3", children: dossier.documents.map((doc, index) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(FileText, { className: "w-5 h-5 text-gray-400" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: doc.nom }), _jsx("p", { className: "text-sm text-gray-500", children: doc.type })] })] }), _jsxs("button", { onClick: () => window.open(`/uploads/${doc.chemin}`, '_blank'), className: "flex items-center space-x-1 text-primary-600 hover:text-primary-700", children: [_jsx(Download, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm", children: "T\u00E9l\u00E9charger" })] })] }, index))) })] }), dossier.commentaires && (_jsxs("div", { className: "card", children: [_jsx("h2", { className: "font-semibold text-gray-900 mb-4", children: "Commentaires" }), _jsx("p", { className: "text-gray-700", children: dossier.commentaires })] }))] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "card", children: [_jsx("h2", { className: "font-semibold text-gray-900 mb-4", children: "Informations" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-600", children: "D\u00E9marche" }), _jsx("span", { className: "font-medium", children: dossier.Demarche?.nom })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Dur\u00E9e estim\u00E9e" }), _jsxs("span", { className: "font-medium", children: [dossier.Demarche?.dureeEstimee, " jours"] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Frais" }), _jsxs("span", { className: "font-medium", children: [dossier.Demarche?.frais, " FCFA"] })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { className: "font-semibold text-gray-900 mb-4", children: "Vos informations" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(User, { className: "w-4 h-4 text-gray-400" }), _jsxs("span", { className: "text-gray-600", children: [dossier.donnees.prenom, " ", dossier.donnees.nom] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Calendar, { className: "w-4 h-4 text-gray-400" }), _jsx("span", { className: "text-gray-600", children: new Date(dossier.donnees.dateNaissance).toLocaleDateString('fr-FR') })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(DollarSign, { className: "w-4 h-4 text-gray-400" }), _jsxs("span", { className: "text-gray-600", children: [dossier.Demarche?.frais, " FCFA"] })] }), dossier.fraisLivraison > 0 && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Truck, { className: "w-4 h-4 text-gray-400" }), _jsxs("span", { className: "text-gray-600", children: ["Livraison: ", dossier.fraisLivraison, " FCFA"] })] }))] })] }), dossier.Paiements && dossier.Paiements.length > 0 && (_jsxs("div", { className: "card", children: [_jsx("h2", { className: "font-semibold text-gray-900 mb-4", children: "Paiements" }), _jsx("div", { className: "space-y-3", children: dossier.Paiements.map((paiement) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsxs("p", { className: "font-medium text-gray-900", children: [paiement.montant, " FCFA"] }), _jsxs("p", { className: "text-sm text-gray-500 capitalize", children: [paiement.methode.replace('_', ' '), " - ", paiement.statut] })] }), paiement.datePaiement && (_jsx("span", { className: "text-sm text-gray-500", children: new Date(paiement.datePaiement).toLocaleDateString('fr-FR') }))] }, paiement.id))) })] }))] })] })] }));
};
export default DossierDetail;
//# sourceMappingURL=DossierDetail.js.map