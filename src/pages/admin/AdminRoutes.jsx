// components/AdminRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return user && user.is_staff ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
