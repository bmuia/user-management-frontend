import React, { useEffect, useState } from 'react'
import { getAllProfiles } from '../../services/AllProfile'
import api from '../../config/auth'
import { API_URL } from '../../config/apiConfig'
import { useNavigate } from 'react-router-dom'

function AllUserProfile() {
  const [profiles, setProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [impersonating, setImpersonating] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getAllProfiles()
        setProfiles(data)
      } catch (error) {
        console.error('Error fetching profiles:', error)
      }
    }
    fetchProfiles()
  }, [])

  const openModal = (profile) => {
    setSelectedProfile(profile)
  }

  const closeModal = () => {
    setSelectedProfile(null)
  }

  const handleImpersonate = async (email) => {
    setImpersonating(true)
    try {
      await api.post(`${API_URL}api/users/impersonate/`, { email })
      navigate('/dashboard')
    } catch (error) {
      console.error('Impersonation failed:', error)
      alert('Failed to impersonate user. Please try again.')
    } finally {
      setImpersonating(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-5 border border-gray-200 transition hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-1">
              {profile.full_name || 'No Name'}
            </h2>
            <p className="text-sm text-gray-600 mb-2">{profile.email}</p>
            <p className="text-sm">
              <span className="font-medium">Status:</span>{' '}
              {profile.is_active ? '✅ Active' : '❌ Inactive'}
            </p>
            <p className="text-sm">
              <span className="font-medium">Verified:</span>{' '}
              {profile.is_verified ? '✅ Yes' : '❌ No'}
            </p>
            <div className="mt-4 flex flex-col space-y-2">
              <button
                className="text-blue-600 hover:underline text-sm"
                onClick={() => openModal(profile)}
              >
                View Details
              </button>
              <button
                className="bg-indigo-600 text-white text-sm px-3 py-1.5 rounded hover:bg-indigo-700 disabled:opacity-50"
                onClick={() => handleImpersonate(profile.email)}
                disabled={impersonating}
              >
                {impersonating ? 'Switching...' : 'Impersonate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <div className="text-sm space-y-2">
              <p><strong>Email:</strong> {selectedProfile.email}</p>
              {selectedProfile.full_name && <p><strong>Name:</strong> {selectedProfile.full_name}</p>}
              {selectedProfile.phone_number && <p><strong>Phone:</strong> {selectedProfile.phone_number}</p>}
              {selectedProfile.gender && <p><strong>Gender:</strong> {selectedProfile.gender}</p>}
              {selectedProfile.country && <p><strong>Country:</strong> {selectedProfile.country}</p>}
              {selectedProfile.date_of_birth && <p><strong>DOB:</strong> {selectedProfile.date_of_birth}</p>}
              {selectedProfile.address && <p><strong>Address:</strong> {selectedProfile.address}</p>}
              {selectedProfile.bio && <p><strong>Bio:</strong> {selectedProfile.bio}</p>}
              <p><strong>Verified:</strong> {selectedProfile.is_verified ? 'Yes' : 'No'}</p>
              <p><strong>Status:</strong> {selectedProfile.is_active ? 'Active' : 'Inactive'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllUserProfile
