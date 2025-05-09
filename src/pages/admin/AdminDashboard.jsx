import React, { useState } from 'react'
import { Menu, X, LogOut } from 'lucide-react'
import UserLogs from './UserLogs'
import api from '../../config/auth'
import { API_URL } from '../../config/apiConfig'
import ChatMessage from './ChatMessage'
import AllUserProfile from './AllUserProfile'
import ProfileInfo from '../user/ProfileInfo'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('profile')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const renderTab = () => {
    switch (activeTab) { 
      case 'profiles':
        return <AllUserProfile />
      case 'userlogs':
        return <UserLogs />
      case 'chat':
        return <ChatMessage />
      case 'profile':
        return <ProfileInfo />
      default:
        return <div>Select a tab</div>
    }
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      await api.post(`${API_URL}api/users/logout/`, {}, { withCredentials: true }) 
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout failed:', error)
      alert('Logout failed. Please try again.')
    } finally {
      setLoading(false)
      setShowLogoutConfirm(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold">Admin User Dashboard</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? 'block' : 'hidden'} md:block bg-gray-900 text-white w-full md:w-64 p-4 space-y-4 md:min-h-screen transition duration-300 ease-in-out`}
      >
        <div className="text-xl font-bold mb-4 md:mb-6 hidden md:block">Admin Dashboard</div>

        <button onClick={()=> handleTabClick('profiles')}
        className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition ${activeTab === 'profiles' ? 'bg-gray-800 text-blue-400' : ''}`}
          >
            Users
        </button>

        <button
          onClick={() => handleTabClick('userlogs')}
          className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition ${activeTab === 'userlogs' ? 'bg-gray-800 text-blue-400' : ''}`}
        >
          User Logs
        </button>

        <button 
        onClick={() => handleTabClick('chat')}
        className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition ${activeTab === 'chat' ? 'bg-gray-800 text-blue-400' : ''}`}
        >
          Chat Messages
        </button>

        <button
          onClick={() => handleTabClick('profile')}  // New profile button
          className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition ${activeTab === 'profile' ? 'bg-gray-800 text-blue-400' : ''}`}
        >
          Profile
        </button>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="block w-full text-left px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-white mt-6 flex items-center gap-2 disabled:opacity-50"
          disabled={loading}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-10 bg-gray-50">
        {renderTab()}  {/* Render the active tab content */}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-2">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
