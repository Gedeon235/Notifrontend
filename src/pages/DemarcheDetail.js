import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Demarche } from '../types';
import { demarchesAPI } from '../services/api';
import { ArrowLeft, Clock, DollarSign, FileText, CheckCircle, Upload } from 'lucide-react';
const DemarcheDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [demarche, setDemarche] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({});
    const [files, setFiles] = useState([]);
    useEffect(() => {
        if (id) {
            loadDemarche();
        }
    }, [id]);
    const loadDemarche = async () => {
        try {
            const response = await demarchesAPI.getById(id);
            setDemarche(response.data.demarche);
        }
        catch (error) {
            console.error('Erreur chargement démarche:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleFileChange = (e) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        setSubmitting(true);
        try {
            const submitData = new FormData();
            submitData.append('demarcheId', id);
            submitData.append('donnees', JSON.stringify(formData));
            files.forEach(file => {
                submitData.append('documents', file);
            });
            await demarchesAPI.createDossier(submitData);
            navigate('/mes-dossiers');
        }
        catch (error) {
            console.error('Erreur soumission dossier:', error);
        }
        finally {
            setSubmitting(false);
        }
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" }) }));
    }
    if (!demarche) {
        return (_jsxs("div", { className: "text-center py-12", children: [_jsx("p", { className: "text-gray-500", children: "D\u00E9marche non trouv\u00E9e" }), _jsx(Link, { to: "/demarches", className: "btn-primary mt-4 inline-block", children: "Retour aux d\u00E9marches" })] }));
    }
    return (_jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Link, { to: "/demarches", className: "flex items-center space-x-2 text-gray-600 hover:text-gray-900", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), _jsx("span", { children: "Retour" })] }), _jsx("h1", { className: "text-2xl font-bold text-gray-900", children: demarche.nom })] }), _jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-1 space-y-6", children: [_jsxs("div", { className: "card", children: [_jsx("h2", { className: "font-semibold text-gray-900 mb-4", children: "Informations" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Dur\u00E9e estim\u00E9e" }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Clock, { className: "w-4 h-4 text-gray-400" }), _jsxs("span", { className: "font-medium", children: [demarche.dureeEstimee, " jours"] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Frais" }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(DollarSign, { className: "w-4 h-4 text-gray-400" }), _jsxs("span", { className: "font-medium", children: [demarche.frais, " FCFA"] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Cat\u00E9gorie" }), _jsx("span", { className: "font-medium capitalize", children: demarche.categorie })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { className: "font-semibold text-gray-900 mb-4", children: "Documents requis" }), _jsx("div", { className: "space-y-2", children: demarche.documentsRequis.map((doc, index) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(FileText, { className: "w-4 h-4 text-gray-400" }), _jsx("span", { className: "text-sm text-gray-600", children: doc })] }, index))) })] })] }), _jsx("div", { className: "lg:col-span-2", children: _jsxs("form", { onSubmit: handleSubmit, className: "card space-y-6", children: [_jsx("h2", { className: "font-semibold text-gray-900 text-lg", children: "Soumettre votre dossier" }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "font-medium text-gray-900", children: "Informations personnelles" }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nom" }), _jsx("input", { type: "text", required: true, value: formData.nom || '', onChange: (e) => setFormData({ ...formData, nom: e.target.value }), className: "input-field" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Pr\u00E9nom" }), _jsx("input", { type: "text", required: true, value: formData.prenom || '', onChange: (e) => setFormData({ ...formData, prenom: e.target.value }), className: "input-field" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date de naissance" }), _jsx("input", { type: "date", required: true, value: formData.dateNaissance || '', onChange: (e) => setFormData({ ...formData, dateNaissance: e.target.value }), className: "input-field" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Adresse" }), _jsx("textarea", { required: true, value: formData.adresse || '', onChange: (e) => setFormData({ ...formData, adresse: e.target.value }), rows: 3, className: "input-field" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "font-medium text-gray-900", children: "Documents" }), _jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center", children: [_jsx(Upload, { className: "w-8 h-8 text-gray-400 mx-auto mb-2" }), _jsx("p", { className: "text-sm text-gray-600 mb-2", children: "Glissez-d\u00E9posez vos documents ou cliquez pour parcourir" }), _jsx("input", { type: "file", multiple: true, onChange: handleFileChange, className: "hidden", id: "file-upload", accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx" }), _jsx("label", { htmlFor: "file-upload", className: "btn-secondary cursor-pointer", children: "Choisir des fichiers" })] }), files.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium text-gray-900 text-sm", children: "Fichiers s\u00E9lectionn\u00E9s:" }), files.map((file, index) => (_jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-600", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-green-500" }), _jsx("span", { children: file.name }), _jsxs("span", { className: "text-gray-400", children: ["(", (file.size / 1024 / 1024).toFixed(2), " MB)"] })] }, index)))] }))] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "font-medium text-gray-900", children: "Options de livraison" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "checkbox", id: "livraison", onChange: (e) => setFormData({
                                                        ...formData,
                                                        livraisonDomicile: e.target.checked,
                                                        fraisLivraison: e.target.checked ? 2000 : 0
                                                    }), className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500" }), _jsx("label", { htmlFor: "livraison", className: "text-sm text-gray-700", children: "Livraison \u00E0 domicile (+2,000 FCFA)" })] }), formData.livraisonDomicile && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Adresse de livraison" }), _jsx("textarea", { required: true, value: formData.adresseLivraison || '', onChange: (e) => setFormData({ ...formData, adresseLivraison: e.target.value }), rows: 2, className: "input-field", placeholder: "Sp\u00E9cifiez l'adresse compl\u00E8te de livraison" })] }))] }), _jsxs("div", { className: "border-t pt-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("span", { className: "text-gray-600", children: "Frais de la d\u00E9marche:" }), _jsxs("span", { className: "font-medium", children: [demarche.frais, " FCFA"] })] }), formData.livraisonDomicile && (_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("span", { className: "text-gray-600", children: "Frais de livraison:" }), _jsx("span", { className: "font-medium", children: "2,000 FCFA" })] })), _jsxs("div", { className: "flex justify-between items-center border-t pt-4", children: [_jsx("span", { className: "font-semibold text-gray-900", children: "Total:" }), _jsxs("span", { className: "font-bold text-lg text-primary-600", children: [demarche.frais + (formData.livraisonDomicile ? 2000 : 0), " FCFA"] })] }), _jsx("button", { type: "submit", disabled: submitting, className: "btn-primary w-full mt-6", children: submitting ? 'Soumission en cours...' : 'Soumettre le dossier' })] })] }) })] })] }));
};
export default DemarcheDetail;
//# sourceMappingURL=DemarcheDetail.js.map