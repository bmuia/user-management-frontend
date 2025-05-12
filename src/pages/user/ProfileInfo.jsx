import React, { useEffect, useState } from 'react'
import { getUser, updateUser, deleteUser } from '../../services/userService'
import Spinner from '../../components/auth/Spinner'

function ProfileInfo() {
  const [me, setMe] = useState(null)
  const [formData, setFormData] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const data = await getUser()
      setMe(data)
      setFormData({
        email: data.email || '',
        full_name: data.full_name || '',
        bio: data.bio || '',
        phone_number: data.phone_number || '',
        address: data.address || '',
        gender: data.gender || '',
        country: data.country || '',
        date_of_birth: data.date_of_birth || '',
      })
    } catch (err) {
      console.error('Failed to load profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    setUpdating(true)
    try {
      const data = new FormData()
      Object.entries(formData).forEach(([key, value]) => data.append(key, value))

      const response = await updateUser(data)

      if (response.status === 200) {
        await fetchProfile()
        setIsEditing(false)
        setSuccessMsg('Update success!')
        setTimeout(() => setSuccessMsg(''), 3000)
      } else {
        console.error('Update failed, status:', response.status)
      }
    } catch (err) {
      console.error('Update error:', err)
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete your account permanently?')) return
    try {
      await deleteUser()
      alert('Account deleted.')
      window.location.href = '/register'
    } catch (err) {
      console.error('Failed to delete account:', err)
    }
  }

  if (loading) return <p className="text-center mt-10">Loading profile...</p>
  if (!me) return <p className="text-center text-red-600">Profile not found.</p>

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        <img
          src={me.profile_picture || 'https://api.dicebear.com/7.x/initials/svg?seed=User'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-md"
        />
        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">{me.full_name || 'Unnamed User'}</h2>
          <p className="text-gray-500">@{me.email}</p>
          <p className="text-sm text-gray-600 italic">{me.bio || 'No bio yet.'}</p>

          <div className="flex gap-3 justify-center sm:justify-start mt-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Info Section */}
      {!isEditing ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-sm text-gray-800">
          <p><strong>Phone:</strong> {me.phone_number || '—'}</p>
          <p><strong>DOB:</strong> {me.date_of_birth || '—'}</p>
          <p><strong>Gender:</strong> {me.gender || '—'}</p>
          <p><strong>Country:</strong> {me.country || '—'}</p>
          <p><strong>Address:</strong> {me.address || '—'}</p>
          <p><strong>Referral Code:</strong> {me.referral_code || '—'}</p>
          <p><strong>Verified:</strong> {me.is_verified ? 'Yes' : 'No'}</p>
          <p><strong>Active:</strong> {me.is_active ? 'Yes' : 'No'}</p>
          <p><strong>Staff:</strong> {me.is_staff ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            ['Full Name', 'full_name'],
            ['Email', 'email'],
            ['Bio', 'bio'],
            ['Phone Number', 'phone_number'],
            ['Address', 'address'],
            ['Gender', 'gender'],
            ['Country', 'country'],
            ['Date of Birth', 'date_of_birth'],
          ].map(([label, name]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={name === 'date_of_birth' ? 'date' : 'text'}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition"
              />
            </div>
          ))}

          <div className="sm:col-span-2 text-right mt-4">
            <button
              onClick={handleUpdate}
              disabled={updating}
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {updating ? <Spinner /> : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {successMsg && (
        <div className="mt-4 text-center text-green-600">
          <p>{successMsg}</p>
        </div>
      )}
    </div>
  )
}

export default ProfileInfo
