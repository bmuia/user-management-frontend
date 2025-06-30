import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { API_URL } from '../../config/apiConfig';
import AuthFormInput from './AuthFormInput';
import Spinner from './Spinner';
import { FaGoogle } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login, user, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!authLoading && user) {
      navigate(user.is_staff ? '/admin' : '/dashboard');
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${API_URL}accounts/login/`, { email, password });
      const { access, refresh } = res.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      await login();
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl px-8 py-12 space-y-8 relative">
        {loading && <Spinner />}
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-400">Enter your email and password to access your account</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <AuthFormInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <AuthFormInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <div className="text-right">
            <a href="/reset-password" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg text-white transition duration-300 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Login
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <div className="flex flex-col items-center mt-8 space-y-4">
          <p className="text-sm text-gray-400">or continue with</p>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition text-sm justify-center w-full max-w-xs"
          >
            <FaGoogle size={18} />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="mt-10 text-center text-sm text-gray-600">
          <p>
            Don’t have an account?{' '}
            <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium gap-4">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
