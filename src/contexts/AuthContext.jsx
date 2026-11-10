import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'

import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Get authenticated user from Laravel
  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('access_token')

    if (!token) {
      setUser(null)
      return null
    }

    try {
      const response = await api.get('/me')

      const currentUser = response.data.user

      setUser(currentUser)

      return currentUser
    } catch (error) {
      localStorage.removeItem('access_token')
      setUser(null)

      throw error
    }
  }, [])

  // Check authentication when application starts
  useEffect(() => {
    let isMounted = true

    const initializeAuth = async () => {
      try {
        await refreshUser()
      } catch (error) {
        console.error('Authentication initialization failed:', error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    initializeAuth()

    return () => {
      isMounted = false
    }
  }, [refreshUser])

  // Login
  const login = async (credentials) => {
    const response = await api.post('/login', credentials)

    const { token, user: loggedInUser } = response.data

    localStorage.setItem('access_token', token)
    setUser(loggedInUser)

    return loggedInUser
  }

  // Register
  const register = async (userData) => {
    const response = await api.post('/register', userData)

    const { token, user: registeredUser } = response.data

    localStorage.setItem('access_token', token)
    setUser(registeredUser)

    return registeredUser
  }

  // Logout
  const logout = async () => {
    try {
      await api.post('/logout')
    } catch (error) {
      console.error('Backend logout failed:', error)
    } finally {
      localStorage.removeItem('access_token')
      setUser(null)
    }
  }

  const value = useMemo(() => ({
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    refreshUser,
  }), [user, isLoading, refreshUser])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
