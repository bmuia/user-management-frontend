import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser, deleteUser, updateUser } from '../../services/userService'
import WelcomeHeader from './WelcomeHeader'
import UserInfoCard from './UserInfoCard'
import UserActions from './UserActions'
import { AuthContext } from '../../context/AuthContext'
import Spinner from '../../components/auth/Spinner'

function UserDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser()
        setUser(data)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteUser()
      await logout()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Account deletion failed:', error)
    }
  }

  const handleUpdateUser = async (data) => {
    try {
      const res = await updateUser(data)
      setUser(res.data || res)
    } catch (error) {
      console.error('Failed to update user:', error)
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-8 relative">
        {loading ? (
          <Spinner />
        ) : user ? (
          <>
            <WelcomeHeader user={user} />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="md:col-span-2">
                <UserInfoCard user={user} onUpdateUser={handleUpdateUser} />
              </div>
              <div>
                <UserActions
                  onDeleteAccount={handleDeleteAccount}
                  onLogout={handleLogout}
                />
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 text-lg">User not found.</p>
        )}
      </div>
    </div>
  )
}

export default UserDashboard
