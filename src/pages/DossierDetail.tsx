import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Dossier } from '../types';
import { dossiersAPI } from '../services/api';
import { 
  ArrowLeft, 
  FileText, 
  Download,
  Calendar,
  User,
  DollarSign,
  Truck
} from 'lucide-react';

const DossierDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [dossier, setDossier] = useState<Dossier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadDossier();
    }
  }, [id]);

  const loadDossier = async () => {
    try {
      const response = await dossiersAPI.getById(id!);
      setDossier(response.data.dossier || response.data); // Gestion des différentes structures de réponse
    } catch (error) {
      console.error('Erreur chargement dossier:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatutColor = (statut: string) => {
    const colors = {
      soumis: 'bg-blue-100 text-blue-800 border-blue-200',
      en_cours: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      en_attente: 'bg-orange-100 text-orange-800 border-orange-200',
      approuve: 'bg-green-100 text-green-800 border-green-200',
      rejete: 'bg-red-100 text-red-800 border-red-200',
      termine: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[statut as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!dossier) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Dossier non trouvé</p>
        <Link to="/mes-dossiers" className="btn-primary mt-4 inline-block">
          Retour à mes dossiers
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/mes-dossiers"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {dossier.demarche?.nom || dossier.demarcheNom || 'Démarche'}
            </h1>
            <p className="text-gray-600">N° {dossier.numeroDossier || dossier.id}</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatutColor(dossier.statut)}`}>
          {dossier.statut.replace('_', ' ').toUpperCase()}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline du dossier */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">Progression du dossier</h2>
            <div className="space-y-4">
              {[
                { 
                  etape: 'Soumission', 
                  date: dossier.dateSoumission, 
                  active: true 
                },
                { 
                  etape: 'En traitement', 
                  date: (dossier as any).dateTraitement, // Propriété potentiellement manquante
                  active: ['en_cours', 'en_attente', 'approuve', 'rejete', 'termine'].includes(dossier.statut) 
                },
                { 
                  etape: 'Finalisation', 
                  date: (dossier as any).dateFinalisation, // Propriété potentiellement manquante
                  active: ['approuve', 'rejete', 'termine'].includes(dossier.statut) 
                }
              ].map((etape, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    etape.active ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                  <div className="flex-1">
                    <p className={`font-medium ${
                      etape.active ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {etape.etape}
                    </p>
                    {etape.date && (
                      <p className="text-sm text-gray-500">
                        {new Date(etape.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">Documents du dossier</h2>
            <div className="space-y-3">
              {(dossier.documents && dossier.documents.length > 0) ? (
                dossier.documents.map((doc, index) => {
                  // Gestion des différents formats de documents (string ou objet)
                  const documentName = typeof doc === 'string' ? doc : (doc as any).nom || `Document ${index + 1}`;
                  const documentPath = typeof doc === 'string' ? doc : (doc as any).chemin || doc;
                  
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{documentName}</p>
                          <p className="text-sm text-gray-500">
                            {typeof doc !== 'string' && (doc as any).type ? (doc as any).type : 'Document'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => window.open(`/uploads/${documentPath}`, '_blank')}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Télécharger</span>
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center py-4">Aucun document disponible</p>
              )}
            </div>
          </div>

          {/* Commentaires */}
          {dossier.commentaires && (
            <div className="card">
              <h2 className="font-semibold text-gray-900 mb-4">Commentaires</h2>
              <p className="text-gray-700">{dossier.commentaires}</p>
            </div>
          )}
        </div>

        {/* Sidebar avec informations */}
        <div className="space-y-6">
          {/* Informations de la démarche */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">Informations</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Démarche</span>
                <span className="font-medium">{dossier.demarche?.nom || dossier.demarcheNom || 'Non spécifié'}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Durée estimée</span>
                <span className="font-medium">{dossier.demarche?.dureeEstimee || 'Non spécifié'} jours</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Frais</span>
                <span className="font-medium">{dossier.frais} FCFA</span>
              </div>
            </div>
          </div>

          {/* Informations personnelles */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">Vos informations</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {dossier.donnees?.prenom || 'Non spécifié'} {dossier.donnees?.nom || 'Non spécifié'}
                </span>
              </div>
              
              {dossier.donnees?.dateNaissance && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    {new Date(dossier.donnees.dateNaissance).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {dossier.frais} FCFA
                </span>
              </div>

              {dossier.fraisLivraison && dossier.fraisLivraison > 0 && (
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    Livraison: {dossier.fraisLivraison} FCFA
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Paiements */}
          {dossier.paiements && dossier.paiements.length > 0 && (
            <div className="card">
              <h2 className="font-semibold text-gray-900 mb-4">Paiements</h2>
              <div className="space-y-3">
                {dossier.paiements.map((paiement) => (
                  <div key={paiement.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">
                        {paiement.montant} FCFA
                      </p>
                      <p className="text-sm text-gray-500 capitalize">
                        {paiement.methode.replace('_', ' ')} - {paiement.statut}
                      </p>
                    </div>
                    {paiement.datePaiement && (
                      <span className="text-sm text-gray-500">
                        {new Date(paiement.datePaiement).toLocaleDateString('fr-FR')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DossierDetail;