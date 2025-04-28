import React, { useState } from 'react'
import axios from 'axios'

function AccountSettings() {
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleDeactivate = async () => {
    setLoading(true)
    setError('')
    try {
      // Replace with your actual endpoint
      await axios.post('http://localhost:8000/api/users/deactivate-account/',{
}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      })
      setSuccess(true)
    } catch (err) {
      setError('Failed to deactivate account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
      <p className="text-gray-700 mb-6">
        You can deactivate your account. This will prevent you from logging in or using services until reactivated by an admin.
      </p>

      {success ? (
        <p className="text-green-600">Your account has been deactivated.</p>
      ) : (
        <div>
          {error && <p className="text-red-600 mb-2">{error}</p>}

          {!confirm ? (
            <button
              onClick={() => setConfirm(true)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Deactivate Account
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Are you sure you want to deactivate?</p>
              <div className="flex space-x-4">
                <button
                  onClick={handleDeactivate}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  disabled={loading}
                >
                  {loading ? 'Deactivating...' : 'Yes, Deactivate'}
                </button>
                <button
                  onClick={() => setConfirm(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AccountSettings
