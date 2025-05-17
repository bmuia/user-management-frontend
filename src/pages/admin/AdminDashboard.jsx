import React, { useContext, useCallback,useState} from 'react';
 import CreateNewUserButton from './CreateNewUser';
 import UserList from './GetAllProfiles';
 import { AuthContext } from '../../context/AuthContext';
 import { useNavigate } from 'react-router-dom';
 import { Power } from 'lucide-react';

 function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [refreshUsers, setRefreshUsers] = useState(false); 

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const handleUserCreated = useCallback(() => {
    setRefreshUsers((prev) => !prev); 
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen flex flex-col">
      <header className="bg-white shadow-md p-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-indigo-700 tracking-tight">Admin Dashboard</h1>
        <CreateNewUserButton onUserCreated={handleUserCreated} /> 
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">User Management</h2>
            <UserList refresh={refreshUsers} /> 
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 p-4 text-center text-sm text-gray-600">
        <p className="mb-2">&copy; 2025 User Management Platform</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center"
        >
          <Power className="mr-2 h-4 w-4" /> Logout
        </button>
      </footer>
    </div>
  );
 }

 export default AdminDashboard;