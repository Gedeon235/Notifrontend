import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Demarche } from '../types';
import { demarchesAPI } from '../services/api';
import { Search, Clock, DollarSign } from 'lucide-react';

const Demarches: React.FC = () => {
  const [demarches, setDemarches] = useState<Demarche[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDemarches();
  }, []);

  const loadDemarches = async () => {
    try {
      const response = await demarchesAPI.getAll();
      setDemarches(response.data.demarches);
    } catch (error) {
      console.error('Erreur chargement démarches:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDemarches = demarches.filter(demarche =>
    demarche.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demarche.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-gray-900">Démarches Administratives</h1>
          <p className="text-gray-600">Choisissez la démarche que vous souhaitez effectuer</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher une démarche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDemarches.map((demarche) => (
          <Link
            key={demarche.id}
            to={`/demarches/${demarche.id}`}
            className="card hover:shadow-md transition-shadow duration-200 block"
          >
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">
                {demarche.nom}
              </h3>
              
              <p className="text-gray-600 text-sm line-clamp-2">
                {demarche.description}
              </p>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{demarche.dureeEstimee} jours</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{demarche.frais} FCFA</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {demarche.documentsRequis.slice(0, 3).map((doc, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {doc}
                  </span>
                ))}
                {demarche.documentsRequis.length > 3 && (
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    +{demarche.documentsRequis.length - 3}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredDemarches.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune démarche trouvée</p>
        </div>
      )}
    </div>
  );
};

export default Demarches;