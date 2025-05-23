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

      setModalMessage('Registration successful! Please check your email to verify your account.');
      setModalType('success');
      setShowModal(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      if (err.response?.data?.email) {
        setModalMessage(err.response.data.email[0]);
      } else {
        setModalMessage('Registration failed. Please try again.');
      }
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 relative">
        {loading && <Spinner />}

        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>

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
            className={`w-full py-3 font-semibold rounded-lg text-white transition duration-300 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </a>
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-semibold text-center text-gray-800">
              {modalType === 'success' ? 'Registration Successful!' : 'Registration Failed'}
            </h3>
            <p className="text-center text-gray-600">{modalMessage}</p>
            <div className="flex justify-center space-x-4">
              {modalType === 'success' && (
                <button
                  onClick={() => window.open('https://mail.google.com', '_blank')}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg"
                >
                  Go to Gmail
                </button>
              )}
              <button
                onClick={handleModalClose}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg"
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