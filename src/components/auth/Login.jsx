import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await axios.post('http://localhost:8000/api/users/login/', {
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
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

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
      </form>

      <div className="mt-6 text-center">
        <p>
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:text-blue-700">
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
  )
}

export default Login
