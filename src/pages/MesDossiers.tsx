import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Dossier } from '../types';
import { dossiersAPI } from '../services/api';
import { 
  Search, 
  Filter,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const MesDossiers: React.FC = () => {
  const [dossiers, setDossiers] = useState<Dossier[]>([]);
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
    } catch (error) {
      console.error('Erreur chargement dossiers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatutColor = (statut: string) => {
    const colors = {
      soumis: 'bg-blue-100 text-blue-800',
      en_cours: 'bg-yellow-100 text-yellow-800',
      en_attente: 'bg-orange-100 text-orange-800',
      approuve: 'bg-green-100 text-green-800',
      rejete: 'bg-red-100 text-red-800',
      termine: 'bg-purple-100 text-purple-800'
    };
    return colors[statut as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatutIcon = (statut: string) => {
    const icons = {
      soumis: Clock,
      en_cours: Clock,
      en_attente: AlertCircle,
      approuve: CheckCircle,
      rejete: XCircle,
      termine: CheckCircle
    };
    return icons[statut as keyof typeof icons] || FileText;
  };

  const filteredDossiers = dossiers.filter(dossier => {
    const matchesSearch = dossier.numeroDossier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dossier.demarche?.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterStatut || dossier.statut === filterStatut;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes Dossiers</h1>
          <p className="text-gray-600">
            Suivez l'avancement de vos démarches administratives
          </p>
        </div>
        
        <Link to="/demarches" className="btn-primary">
          Nouvelle démarche
        </Link>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 sm:max-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher un dossier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        
        <div className="relative sm:max-w-48">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="input-field pl-10"
          >
            <option value="">Tous les statuts</option>
            <option value="soumis">Soumis</option>
            <option value="en_cours">En cours</option>
            <option value="en_attente">En attente</option>
            <option value="approuve">Approuvé</option>
            <option value="rejete">Rejeté</option>
            <option value="termine">Terminé</option>
          </select>
        </div>
      </div>

      {/* Liste des dossiers */}
      <div className="space-y-4">
        {filteredDossiers.map((dossier) => {
          const StatutIcon = getStatutIcon(dossier.statut);
          return (
            <Link
              key={dossier.id}
              to={`/dossiers/${dossier.id}`}
              className="card hover:shadow-md transition-shadow duration-200 block"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {dossier.demarche?.nom}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatutColor(dossier.statut)}`}>
                      <StatutIcon className="w-3 h-3 mr-1" />
                      {dossier.statut.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">N° dossier:</span>
                      <div className="text-gray-900">{dossier.numeroDossier}</div>
                    </div>
                    
                    <div>
                      <span className="font-medium">Soumis le:</span>
                      <div>{new Date(dossier.dateSoumission).toLocaleDateString('fr-FR')}</div>
                    </div>
                    
                    <div>
                      <span className="font-medium">Frais:</span>
                      <div>{dossier.demarche?.frais} FCFA</div>
                    </div>
                    
                    <div>
                      <span className="font-medium">Documents:</span>
                      <div>{dossier.documents.length} fichier(s)</div>
                    </div>
                  </div>

                  {dossier.commentaires && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Commentaire: </span>
                        {dossier.commentaires}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredDossiers.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Aucun dossier trouvé</p>
          <Link to="/demarches" className="btn-primary">
            Commencer une démarche
          </Link>
        </div>
      )}
    </div>
  );
};

export default MesDossiers;