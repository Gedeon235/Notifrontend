import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Demarche } from '../types';
import { demarchesAPI, dossiersAPI } from '../services/api'; // Importez dossiersAPI
import { 
  ArrowLeft, 
  Clock, 
  DollarSign, 
  FileText, 
  CheckCircle,
  Upload
} from 'lucide-react';

const DemarcheDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [demarche, setDemarche] = useState<Demarche | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (id) {
      loadDemarche();
    }
  }, [id]);

  const loadDemarche = async () => {
    try {
      const response = await demarchesAPI.getById(id!);
      setDemarche(response.data.demarche);
    } catch (error) {
      console.error('Erreur chargement démarche:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      const submitData = new FormData();
      submitData.append('demarcheId', id!);
      submitData.append('userId', user.id);
      submitData.append('donnees', JSON.stringify(formData));
      
      files.forEach(file => {
        submitData.append('documents', file);
      });

      // CORRECTION : Utilisez dossiersAPI.create
      await dossiersAPI.create(submitData);
      navigate('/mes-dossiers');
    } catch (error) {
      console.error('Erreur soumission dossier:', error);
      alert('Erreur lors de la soumission du dossier. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!demarche) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Démarche non trouvée</p>
        <Link to="/demarches" className="btn-primary mt-4 inline-block">
          Retour aux démarches
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* En-tête */}
      <div className="flex items-center space-x-4">
        <Link
          to="/demarches"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour</span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{demarche.nom}</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Informations de la démarche */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">Informations</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Durée estimée</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{demarche.dureeEstimee} jours</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Frais</span>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{demarche.frais} FCFA</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Catégorie</span>
                <span className="font-medium capitalize">{demarche.categorie}</span>
              </div>
            </div>
          </div>

          {/* Documents requis */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">Documents requis</h2>
            <div className="space-y-2">
              {demarche.documentsRequis.map((doc, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Formulaire de soumission */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card space-y-6">
            <h2 className="font-semibold text-gray-900 text-lg">
              Soumettre votre dossier
            </h2>

            {/* Informations personnelles */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Informations personnelles</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nom || ''}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.prenom || ''}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de naissance
                </label>
                <input
                  type="date"
                  required
                  value={formData.dateNaissance || ''}
                  onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                <textarea
                  required
                  value={formData.adresse || ''}
                  onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                  rows={3}
                  className="input-field"
                />
              </div>
            </div>

            {/* Upload de documents */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Documents</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Glissez-déposez vos documents ou cliquez pour parcourir
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <label
                  htmlFor="file-upload"
                  className="btn-secondary cursor-pointer"
                >
                  Choisir des fichiers
                </label>
              </div>

              {/* Liste des fichiers */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 text-sm">Fichiers sélectionnés:</h4>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{file.name}</span>
                      <span className="text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Options de livraison */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Options de livraison</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="livraison"
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    livraisonDomicile: e.target.checked,
                    fraisLivraison: e.target.checked ? 2000 : 0
                  })}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="livraison" className="text-sm text-gray-700">
                  Livraison à domicile (+2,000 FCFA)
                </label>
              </div>

              {formData.livraisonDomicile && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse de livraison
                  </label>
                  <textarea
                    required
                    value={formData.adresseLivraison || ''}
                    onChange={(e) => setFormData({ ...formData, adresseLivraison: e.target.value })}
                    rows={2}
                    className="input-field"
                    placeholder="Spécifiez l'adresse complète de livraison"
                  />
                </div>
              )}
            </div>

            {/* Résumé et soumission */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Frais de la démarche:</span>
                <span className="font-medium">{demarche.frais} FCFA</span>
              </div>
              {formData.livraisonDomicile && (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Frais de livraison:</span>
                  <span className="font-medium">2,000 FCFA</span>
                </div>
              )}
              <div className="flex justify-between items-center border-t pt-4">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="font-bold text-lg text-primary-600">
                  {demarche.frais + (formData.livraisonDomicile ? 2000 : 0)} FCFA
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full mt-6"
              >
                {submitting ? 'Soumission en cours...' : 'Soumettre le dossier'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DemarcheDetail;