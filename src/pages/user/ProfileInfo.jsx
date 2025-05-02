import React, { useState } from 'react'
import { getUser, updateUser, deleteUser } from '../../services/userService'

function ProfileInfo() {
  const [me, setMe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [editEmail, setEditEmail] = useState('')

  const getMe = async () => {
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      const data = await getUser()
      setMe(data)
      setEditEmail(data.email)
      setSuccess(true)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch user data.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    try {
      const updated = await updateUser({ email: editEmail })
      setMe(updated)
      alert('Profile updated!')
    } catch (err) {
      console.error(err)
      alert('Failed to update profile.')
    }
  }

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete your account?')
    if (!confirm) return
    try {
      await deleteUser()
      alert('Account deleted.')
      window.location.href = '/register'
    } catch (err) {
      console.error(err)
      alert('Failed to delete account.')
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Profile Info</h2>

      <button
        onClick={getMe}
        disabled={loading}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Loading...' : 'Load Profile'}
      </button>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">User data fetched successfully!</p>}

      {me && (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <p>
              <span className="font-medium text-gray-700">Verified:</span>{' '}
              {me.is_verified ? 'Yes' : 'No'}
            </p>
            <p>
              <span className="font-medium text-gray-700">Active:</span>{' '}
              {me.is_active ? 'Yes' : 'No'}
            </p>
            <p>
              <span className="font-medium text-gray-700">Staff:</span>{' '}
              {me.is_staff ? 'Yes' : 'No'}
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update Email
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileInfo
