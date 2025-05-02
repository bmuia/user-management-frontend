import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config/apiConfig'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Get user info on mount using the cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}api/users/me/`, {
          withCredentials: true,
        })
        setUser(res.data)
      } catch (err) {
        setUser(null) // Not logged in
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async () => {
    try {
      const res = await axios.get(`${API_URL}api/users/me/`, {
        withCredentials: true,
      })
      setUser(res.data)
    } catch (err) {
      setUser(null)
    }
  }

  const logout = async () => {
    await axios.post(`${API_URL}api/users/logout/`, {}, {
      withCredentials: true,
    })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
