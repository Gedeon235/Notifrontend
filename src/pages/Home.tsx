import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Bienvenue sur AdminService
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Simplifiez vos démarches administratives en ligne. 
        Accédez à tous les services publics depuis chez vous.
      </p>
      
      <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
        <Link to="/demarches" className="btn-primary inline-block">
          Voir les démarches
        </Link>
        {!user && (
          <Link to="/register" className="btn-secondary inline-block">
            Créer un compte
          </Link>
        )}
      </div>

      {/* Features */}
      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 font-bold">⚡</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Rapide</h3>
          <p className="text-gray-600">
            Traitement accéléré de vos dossiers
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 font-bold">📱</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">En ligne</h3>
          <p className="text-gray-600">
            Accédez à tous les services 24h/24
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-purple-600 font-bold">🛡️</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Sécurisé</h3>
          <p className="text-gray-600">
            Vos données sont protégées
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home