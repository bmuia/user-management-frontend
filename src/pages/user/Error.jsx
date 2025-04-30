import React from 'react'
import { AlertTriangle } from 'lucide-react'

function Error() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <AlertTriangle className="mx-auto text-red-500 w-12 h-12 mb-4" />
        <h1 className="text-2xl font-semibold text-red-600 mb-2">Account Not Verified</h1>
        <p className="text-gray-700 mb-4">
          Your account has not been verified yet. Please contact the admin to reactivate it.
        </p>
        <a href="mailto:belammuia0@gmail.com" className="text-blue-600 hover:underline">
          Contact Admin
        </a>
        <div className="mt-4">
          <p className="text-gray-600">
            You may have missed the verification email.{' '}
            <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Check your Gmail inbox
            </a>
            .
          </p>
        </div>
        <div className="mt-6">
          <p className="text-gray-600">
            After verifying your account, you can{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              log in here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Error
