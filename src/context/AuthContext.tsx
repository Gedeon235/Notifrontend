
import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User, AuthContextType, RegisterData } from '../types'
import type { ReactNode } from 'react'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      verifyToken()
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async () => {
    try {
      // Simulation - à remplacer par votre API
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      localStorage.removeItem('token')
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => { // ✅ 'password' est maintenant utilisé
    try {
      // Simulation de connexion
      console.log('Login attempt with password length:', password.length) // ✅ Utilise password
      const mockUser: User = {
        id: '1',
        email,
        nom: 'Utilisateur',
        prenom: 'Test',
        role: 'user'
      }
      setUser(mockUser)
      localStorage.setItem('token', 'mock-token')
    } catch (error) {
      throw error
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      // Simulation d'inscription
      const mockUser: User = {
        id: '2',
        email: userData.email,
        nom: userData.nom,
        prenom: userData.prenom,
        role: 'user'
      }
      setUser(mockUser)
      localStorage.setItem('token', 'mock-token')
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
