import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Demarches from './pages/Demarches'
import DemarcheDetail from './pages/DemarcheDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import MesDossiers from './pages/MesDossiers'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demarches" element={<Demarches />} />
          <Route path="/demarches/:id" element={<DemarcheDetail />} />
          <Route path="/mes-dossiers" element={<MesDossiers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App