import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { API_URL } from '../../config/apiConfig'

function PasswordResetConfirm() {
  const [searchParams] = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) toast.error('Invalid password reset link.')
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!token) {
      toast.error('Missing token.')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.')
      setLoading(false)
      return
    }

    try {
      await axios.post(`${API_URL}accounts/password-reset-confirm/`, {
        token,
        new_password: password,
      })
      toast.success('Password reset! Redirecting to login...')
      setPassword('')
      setConfirmPassword('')
      setTimeout(() => navigate('/login'), 3000)
    } catch {
      toast.error('Reset failed. Link may be invalid or expired.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-sm p-6 space-y-5">
        <h2 className="text-xl font-semibold text-center text-gray-800">Set New Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-600">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-sm font-medium rounded-md text-white ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PasswordResetConfirm
