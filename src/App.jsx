import React, { useContext, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, AuthContext } from './context/AuthContext'
import Spinner from './components/auth/Spinner'
import { Analytics } from '@vercel/analytics/react'

// Lazily load components
const VerifyEmailPage = React.lazy(() => import('./pages/VerifyEmailPage'))
const PasswordReset = React.lazy(() => import('./components/unlock/PasswordReset'))
const PasswordResetConfirm = React.lazy(() => import('./components/unlock/PasswordResetConfirm'))
const Login = React.lazy(() => import('./components/auth/Login'))
const Register = React.lazy(() => import('./components/auth/Register'))
const CustomDashboard = React.lazy(() => import('./pages/user/CustomDashboard'))
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'))
const AdminRoute = React.lazy(() => import('./pages/admin/AdminRoutes'))
const Error = React.lazy(() => import('./pages/user/Error'))
const Homepage = React.lazy(() => import('./pages/HomePage'))
const PolicyPage = React.lazy(() => import('./pages/PolicyPage'))

import PrivateRoutes from './components/PrivateRoute'

function AppContent() {
  const { authLoading } = useContext(AuthContext)

  if (authLoading) {
    return <Spinner />
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/password-reset-confirm" element={<PasswordResetConfirm />} />
        <Route path="/error" element={<Error />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/privacy' element={<PolicyPage />} />
        <Route path="*" element={<h1>Page not found</h1>} />

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<CustomDashboard />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Analytics />
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
