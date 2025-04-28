import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../../config/auth'
import toast from 'react-hot-toast'

function PasswordResetConfirm() {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const token = searchParams.get('token')


React.useEffect(() => {
  if (!token) toast.error('Invalid password reset link.')
}, [token])


    if (!token) {
      toast.error('Invalid or missing password reset token.')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.')
      setLoading(false)
      return
    }

    try {
      const res = await api.post(`/api/users/password-reset-confirm/`, {
        token,
        new_password: password,
      })
      console.log(res.data)
      toast.success('🎉 Your password has been reset! Redirecting to login...')
      setPassword('')
      setConfirmPassword('')
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err) {
      console.error(err)
      toast.error('❌ Password reset failed. The link may be invalid or expired.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-200 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg text-white transition duration-300 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-yellow-500 hover:bg-yellow-600'
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
