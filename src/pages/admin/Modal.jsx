// components/ui/Modal.jsx
import React from 'react';

export default function Modal({ isOpen, onClose, title, message, type = 'info' }) {
    if (!isOpen) return null;

    const colors = {
        success: 'bg-green-100 text-green-800',
        error: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                <div className={`text-center text-lg font-semibold mb-2 ${colors[type]}`}>
                    {title}
                </div>
                <div className="text-center text-gray-700 mb-4">
                    {message}
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}
