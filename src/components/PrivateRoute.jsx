
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  // if (!user.is_verified) {
  //   return <Navigate to="/error" />;
  // }

  return <Outlet />;
};

export default PrivateRoutes;
