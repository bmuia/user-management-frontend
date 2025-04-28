import React, { useState } from 'react'
import api from '../../config/auth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await api.post('/api/users/login/', {
        email,
        password
      })

      const { access, refresh } = res.data

      // Store tokens in localStorage
      localStorage.setItem('access', access)
      localStorage.setItem('refresh', refresh)

      // Notify the user
      toast.success('Login successful!')

      // Redirect to dashboard
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      toast.error('Login failed. Please check your credentials.')
      setError('Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg text-white transition duration-300 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center mt-2">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-500 text-center mt-2">
            Login successful!
          </p>
        )}

        <div className="mt-6 text-center">
          <p>
            Don't have an account?{' '}
            <a href="/" className="text-blue-600 hover:text-blue-700">
              Register here
            </a>
          </p>
          <p className="mt-2">
            Forgot your password?{' '}
            <a href="/reset-password" className="text-blue-600 hover:text-blue-700">
              Reset it here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
