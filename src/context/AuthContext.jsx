import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config/apiConfig'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const navigate = useNavigate() // 👈 Hook from React Router

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setAuthLoading(true)
        const res = await axios.get(`${API_URL}api/users/me/`, {
          withCredentials: true,
        })
        setUser(res.data)
      } catch (err) {
        if (err.response?.status === 401) {
          setUser(null)
        } else {
          console.error("Error fetching user:", err)
        }
      } finally {
        setAuthLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async () => {
    setAuthLoading(true)
    try {
      const res = await axios.get(`${API_URL}api/users/me/`, {
        withCredentials: true,
      })
      setUser(res.data)
    } catch (err) {
      setUser(null)
    } finally {
      setAuthLoading(false)
    }
  }

  const logout = async () => {
    setAuthLoading(true)
    try {
      await axios.post(`${API_URL}api/users/logout/`, {}, {
        withCredentials: true,
      })

      // Clean up and redirect
      setUser(null)
      localStorage.removeItem('user')
      navigate('/login') // 👈 Redirect to login page
    } catch (err) {
      console.error('Logout request failed', err)
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {!authLoading && children}
    </AuthContext.Provider>
  )
}
