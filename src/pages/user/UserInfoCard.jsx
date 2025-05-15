import React, { useState } from 'react'
import Spinner from '../../components/auth/Spinner'

function UserInfoCard({ user, onUpdateUser }) {
  const displayName = user?.full_name || 'User'
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: user.full_name || '',
    phone_number: user.phone_number || '',
    country: user.country || '',
    bio: user.bio || '',
  })
  const [loading, setLoading] = useState(false)

  const formatDateOrDash = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : '-'
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onUpdateUser(formData)
      setIsEditing(false)
    } catch (error) {
      console.error('Update failed:', error)
    }
    setLoading(false)
  }

  return (
    <div className="relative bg-white rounded-2xl shadow p-6 mb-6 flex flex-col md:flex-row items-center space-x-0 md:space-x-6">
      {loading && <Spinner />}
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0 mb-4 md:mb-0">
        {user?.profile_picture ? (
          <img
            src={user.profile_picture}
            alt={`${displayName}'s profile`}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center bg-gray-200 text-gray-500 w-full h-full text-3xl font-bold">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex-1 w-full">
        {!isEditing ? (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">{displayName}</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
            </div>

            {user?.is_verified && (
              <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Verified
              </span>
            )}

            <p className="mt-2 text-gray-600">{user.email || '-'}</p>

            <div className="mt-4 text-gray-700 text-sm space-y-1">
              <p><strong>DOB:</strong> {user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : '-'}</p>
              <p><strong>Phone:</strong> {user.phone_number || '-'}</p>
              <p><strong>Country:</strong> {user.country || '-'}</p>
              {user.bio ? (
                <p className="mt-2 italic text-gray-500 max-w-md truncate">"{user.bio}"</p>
              ) : (
                <p><strong>Bio:</strong> -</p>
              )}
              <p className="text-xs text-gray-400 mt-3">
                Member since: {formatDateOrDash(user.date_joined)}
              </p>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                disabled={loading}
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default UserInfoCard
