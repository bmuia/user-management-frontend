import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/apiConfig';
import AuthFormInput from './AuthFormInput';
import Spinner from './Spinner';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setModalMessage('Passwords do not match.');
      setModalType('error');
      setShowModal(true);
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_URL}accounts/pre-register/`, {
        email,
        password,
        password2: confirmPassword,
      });

      setModalMessage('Registration successful! Please check your email.');
      setModalType('success');
      setShowModal(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      const errorMsg = err.response?.data?.email?.[0] || 'Registration failed. Please try again.';
      setModalMessage(errorMsg);
      setModalType('error');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalType === 'success') {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image Section */}
      <div className="hidden md:block md:w-1/2 h-screen">

        <img
          src="https://images.pexels.com/photos/3184660/pexels-photo-3184660.jpeg"
          alt="Register"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center min-h-screen p-6">

        <div className="w-full max-w-md space-y-6">
          {loading && <Spinner />}
          <h2 className="text-4xl font-semibold text-gray-800 text-center">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthFormInput
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              showPassword={false}
              setShowPassword={() => {}}
            />
            <AuthFormInput
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <AuthFormInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
              {modalType === 'success' ? 'Success' : 'Error'}
            </h3>
            <p className="text-center text-gray-600">{modalMessage}</p>
            <div className="flex justify-center mt-4 space-x-4">
              {modalType === 'success' && (
                <button
                  onClick={() => window.open('https://mail.google.com', '_blank')}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Open Gmail
                </button>
              )}
              <button
                onClick={handleModalClose}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
              >
                {modalType === 'success' ? 'Close' : 'Try Again'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
