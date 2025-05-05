import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerifyEmailPage from './pages/VerifyEmailPage';
import PasswordReset from './components/unlock/PasswordReset';
import PasswordResetConfirm from './components/unlock/PasswordResetConfirm';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoutes from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import CustomDashboard from './pages/user/CustomDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './pages/admin/AdminRoutes';
import AuthProvider from './context/AuthContext';
import Error from './pages/user/Error';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Analytics />
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/password-reset-confirm" element={<PasswordResetConfirm />} />
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<h1>Page not found</h1>} />
            
            {/* Private Routes */}
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<CustomDashboard />} />
              <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
