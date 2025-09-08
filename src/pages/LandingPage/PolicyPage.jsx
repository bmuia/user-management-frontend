// src/pages/PolicyPage.jsx
import React from 'react'

function PolicyPage() {
  return (
    <div className="bg-gray-100 font-sans py-12">
      <div className="container mx-auto px-4 max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Privacy Policy</h1>

        <p className="text-gray-700 mb-4">
          At provacu lnl, your privacy is important to us. This page explains what information we collect, how we use it, and your choices.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">What We Collect</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Email and contact info</li>
          <li>Usage data</li>
          <li>Device info</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">How We Use It</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>To provide and improve our service</li>
          <li>To communicate with you</li>
          <li>To analyze usage</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">Sharing</h2>
        <p className="text-gray-700 mb-4">
          We do not sell your data. We only share it with trusted partners or when required by law.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">Security</h2>
        <p className="text-gray-700 mb-4">
          We use reasonable measures to protect your data but cannot guarantee 100% security.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Rights</h2>
        <p className="text-gray-700 mb-4">
          You can request to view, update, or delete your data by contacting us.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact</h2>
        <p className="text-gray-700">
          Questions? Reach us at <a href="mailto:belammuia0@gmail.com" className="text-blue-500 hover:underline">belammuia0@gmail.com</a>.
        </p>
      </div>
    </div>
  )
}

export default PolicyPage
