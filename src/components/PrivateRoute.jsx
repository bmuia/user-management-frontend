import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  // Check if the user is authenticated
  const auth = { token: localStorage.getItem('access') };

  return (
    auth.token ? <Outlet /> : <Navigate to='/login' />
  );
};

export default PrivateRoutes;