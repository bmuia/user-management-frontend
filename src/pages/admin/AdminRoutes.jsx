// components/AdminRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminRoute = () => {
  const { user, loading: authLoading } = useContext(AuthContext);

  if (authLoading) return null;

  return user && user.is_staff ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
