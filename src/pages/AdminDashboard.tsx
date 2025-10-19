
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Demarche } from '../types'
import { demarchesAPI } from '../services/api'
import { Search, Filter, Clock, DollarSign } from 'lucide-react'

const Demarches: React.FC = () => {
  const [demarches, setDemarches] = useState<Demarche[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    loadDemarches()
  }, [])

  const loadDemarches = async () => {
    try {
      const response = await demarchesAPI.getAll()
      // Assurez-vous que response.data est bien un tableau de Demarche
      setDemarches(response.data || [])
    } catch (error) {
      console.error('Erreur chargement démarches:', error)
      setDemarches([]) // Fallback à un tableau vide en cas d'erreur
    } finally {
      setLoading(false)
    }
  }

  // Utilisez le tableau 'demarches' directement, pas 'demarches.demarches'
  const categories = [...new Set(demarches.map(d => d.categorie))]

  const filteredDemarches = demarches.filter(demarche => {
    const matchesSearch = demarche.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         demarche.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || demarche.categorie === selectedCategory
    return matchesSearch && matchesCategory && demarche.isActive
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Démarches Administratives</h1>
      </div>

      {/* Filtres et recherche */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Rechercher une démarche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input-field"
        >
          <option value="">Toutes les catégories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Filter className="w-4 h-4" />
          <span>{filteredDemarches.length} démarche(s) trouvée(s)</span>
        </div>
      </div>

      {/* Liste des démarches */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDemarches.map((demarche) => (
          <Link
            key={demarche.id}
            to={`/demarches/${demarche.id}`}
            className="card hover:shadow-md transition-shadow duration-200 block"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900 text-lg">{demarche.nom}</h3>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
                {demarche.categorie}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {demarche.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{demarche.dureeEstimee} jours</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span className="font-medium text-gray-900">{demarche.frais} FCFA</span>
              </div>
            </div>

            <div className="mt-4">
              <button className="btn-primary w-full text-sm">
                Démarrer la démarche
              </button>
            </div>
          </Link>
        ))}
      </div>

      {filteredDemarches.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune démarche trouvée</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory(''); }}
            className="btn-secondary mt-2"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  )
}

export default Demarches
