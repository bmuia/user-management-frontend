import React from 'react';

function HeroSection() {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen px-4">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold text-gray-800">
          Streamline Access Management with AccessHub
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Securely manage team access, enhance collaboration, and protect your organizational data with our intuitive platform.
        </p>
        <a
          href="/dashboard"
          className="inline-block mt-6 bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}

export default HeroSection;
