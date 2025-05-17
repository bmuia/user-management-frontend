import React, { useState } from 'react';
 import { createAdminNormalUser } from '../../services/userService';
 import Spinner from '../../components/auth/Spinner';

 function CreateNewUserButton({ onUserCreated }) { 
  const [openForm, setOpenForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await createAdminNormalUser({ email, password, password2 });
      setSuccess(true);
      setEmail('');
      setPassword('');
      setPassword2('');
      setOpenForm(false);
      onUserCreated();
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenForm(true)}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-md shadow-sm hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-all"
      >
        Create User
      </button>

      {openForm && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">User Registration</h2>

              {loading && <Spinner />}
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-600">User created successfully!</p>}

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setOpenForm(false)}
                  className="text-sm text-gray-500 hover:underline focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all ml-2"
                >
                  Submit
                </button>
              </div>
            </form>
            <button
              onClick={() => setOpenForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
 }

 export default CreateNewUserButton;