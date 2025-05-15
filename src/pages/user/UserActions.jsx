import React, { useState } from 'react'
import ConfirmModal from './ConfirmModal'

function UserActions({ onDeleteAccount, onLogout }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleConfirmDelete = () => {
    onDeleteAccount()
    closeModal()
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow p-6 max-w-md mx-auto space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Actions</h3>

        <button
          onClick={openModal}
          className="w-full px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition"
        >
          Delete Account
        </button>

        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Log Out
        </button>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Account Deletion"
        message="Are you sure you want to delete your account? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={closeModal}
      />
    </>
  )
}

export default UserActions
