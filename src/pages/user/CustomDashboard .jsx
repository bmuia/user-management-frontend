import React, { useState } from 'react'
import ProfileInfo from './ProfileInfo'
import ContactForm from './ContactForm'
import AccountSettings from './AccountSettings'
import { Menu, X } from 'lucide-react' // Icons from lucide-react

function CustomDashboard() {
  const [activeTab, setActiveTab] = useState('profile')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderTab = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileInfo />
      case 'support':
        return <ContactForm />
      case 'settings':
        return <AccountSettings />
      default:
        return null
    }
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    setSidebarOpen(false) // Close sidebar on mobile after click
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold">User Dashboard</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:block bg-gray-900 text-white w-full md:w-64 p-4 space-y-4 md:min-h-screen transition duration-300 ease-in-out`}
      >
        <div className="text-xl font-bold mb-4 md:mb-6 hidden md:block">User Dashboard</div>
        <button
          onClick={() => handleTabClick('profile')}
          className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition ${
            activeTab === 'profile' ? 'bg-gray-800 text-blue-400' : ''
          }`}
        >
          Profile Info
        </button>
        <button
          onClick={() => handleTabClick('support')}
          className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition ${
            activeTab === 'support' ? 'bg-gray-800 text-blue-400' : ''
          }`}
        >
          Contact Admin
        </button>
        <button
          onClick={() => handleTabClick('settings')}
          className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition ${
            activeTab === 'settings' ? 'bg-gray-800 text-blue-400' : ''
          }`}
        >
          Account Settings
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-10 bg-gray-50">{renderTab()}</div>
    </div>
  )
}

export default CustomDashboard
