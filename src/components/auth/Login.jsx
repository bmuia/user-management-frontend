import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { API_URL } from '../../config/apiConfig'
import AuthFormInput from './AuthFormInput'
import Spinner from './Spinner'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { login, user, loading: authLoading } = useContext(AuthContext)

  useEffect(() => {
    if (!authLoading && user) {
      navigate(user.is_staff ? '/admin' : '/dashboard')
    }
  }, [user, authLoading, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await axios.post(
        `${API_URL}api/users/login/`,
        { email, password },
        { withCredentials: true }
      )

      await login()
      toast.success('Login successful!')
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      toast.error('Login failed. Please check your credentials.')
      setError('Invalid credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 relative">
        {loading && <Spinner />} {/* Spinner overlays the form */}

        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AuthFormInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <AuthFormInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg text-white transition duration-300 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Login
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don’t have an account?{' '}
            <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Register here
            </a>
          </p>
          <p className="mt-2">
            Forgot your password?{' '}
            <a href="/reset-password" className="text-blue-600 hover:text-blue-700 font-medium">
              Reset it here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
