import React from 'react'

function WelcomeHeader({ user }) {
  const displayName = user?.full_name || 'User'

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Welcome back, {displayName} 👋
      </h1>
      {user?.created_at && (
        <p className="text-sm text-gray-500 mt-1">
          Member since: {new Date(user.created_at).toLocaleDateString()}
        </p>
      )}
    </div>
  )
}

export default WelcomeHeader
