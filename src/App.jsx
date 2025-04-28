import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import VerifyEmailPage from './pages/VerifyEmailPage'
import PasswordReset from './components/unlock/PasswordReset'
import PasswordResetConfirm from './components/unlock/PasswordResetConfirm'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import PrivateRoutes from './components/PrivateRoute'
import { Toaster } from 'react-hot-toast'
import CustomDashboard from './pages/user/CustomDashboard '
function App() {
  return (
    <div>
      <Router>
      <Toaster position="top-center" reverseOrder={false} />      
        <Routes>              
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/password-reset-confirm" element={<PasswordResetConfirm />} />
          <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<CustomDashboard />} />

          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
