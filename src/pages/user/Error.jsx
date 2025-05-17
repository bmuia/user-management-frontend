import React from 'react';
 import { AlertTriangle } from 'lucide-react';
 import { Link } from 'react-router-dom'

 function Error() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <AlertTriangle className="mx-auto text-red-500 w-12 h-12 mb-4" />
        <h1 className="text-2xl font-semibold text-red-600 mb-4">Oops! Something went wrong.</h1>
        <p className="text-gray-700 mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Back to Home
        </Link>
      </div>
    </div>
  );
 }

 export default Error;