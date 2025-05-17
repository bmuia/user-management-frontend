import React, { useEffect, useState } from 'react';
 import { getAllProfiles } from '../../services/AllProfile';
 import { adminUpdateUser } from '../../services/userService';
 import Spinner from '../../components/auth/Spinner';
 import Modal from './Modal';
 import { ChevronLeft, ChevronRight } from 'lucide-react';

 const ITEMS_PER_PAGE = 10;

 function UserList({ refresh }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    type: 'info',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const res = await getAllProfiles();
      setProfiles(res || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
    setCurrentPage(1); 
  }, [refresh]); 

  const handleUpdateUser = async (id, field, value) => {
    try {
      const user = profiles.find((profile) => profile.id === id);
      if (!user) {
        setModalContent({
          title: 'Error',
          message: 'User not found.',
          type: 'error',
        });
        setModalOpen(true);
        return;
      }

      const payload = { [field]: value };
      await adminUpdateUser(id, payload);

      setProfiles((prev) =>
        prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
      );

      setModalContent({
        title: 'Success',
        message: 'User updated!',
        type: 'success',
      });
    } catch (error) {
      setModalContent({
        title: 'Error',
        message: `Failed to update ${field}.`,
        type: 'error',
      });
    } finally {
      setModalOpen(true);
    }
  };

  const toggleMenu = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const safeField = (field) => field || '-';

  const totalPages = Math.ceil(profiles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProfiles = profiles.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) return <div className="text-center py-8"><Spinner /></div>;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Management
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Manage and update user profiles.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Picture</th>
              <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Verified</th>
              <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Staff</th>
              <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">DOB</th>
              <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Referral</th>
              <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Bio</th>
              <th scope="col" className="relative px-3 py-3 text-right">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProfiles.map((profile) => (
              <tr key={profile.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 whitespace-nowrap">
                  {profile.profile_picture ? (
                    <img
                      src={profile.profile_picture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-900">{safeField(profile.full_name)}</td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-500">{safeField(profile.email)}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${profile.is_verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {profile.is_verified ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${profile.is_active ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {profile.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${profile.is_staff ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                    {profile.is_staff ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-500">{safeField(profile.date_of_birth)}</td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-500">{safeField(profile.phone_number)}</td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-500">{safeField(profile.gender)}</td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-500">{safeField(profile.country)}</td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-500">{safeField(profile.referral_code)}</td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-500">{safeField(profile.address)}</td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-500">{safeField(profile.bio)}</td>
                <td className="px-3 py-2 relative text-right">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => toggleMenu(profile.id)}
                    aria-expanded={activeMenuId === profile.id}
                    aria-haspopup="true"
                  >
                    Actions
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-gray-50 flex justify-between items-center border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={goToPreviousPage}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, profiles.length)}</span> of <span className="font-medium">{profiles.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={goToPreviousPage}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  aria-current={currentPage === pageNumber ? 'page' : undefined}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNumber ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'} focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={goToNextPage}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {profiles.map((profile) => (
        activeMenuId === profile.id && (
          <div
            key={`actions-${profile.id}`}
            className="absolute z-20 bg-white border border-gray-300 shadow-lg rounded-md w-32 right-4 mt-2"
          >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu-button">
              <button
                onClick={() => handleUpdateUser(profile.id, 'is_active', !profile.is_active)}
                className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900`}
                role="menuitem"
              >
                {profile.is_active ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={() => handleUpdateUser(profile.id, 'is_verified', !profile.is_verified)}
                className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900`}
                role="menuitem"
              >
                {profile.is_verified ? 'Unverify' : 'Verify'}
              </button>
              <button
                onClick={() => handleUpdateUser(profile.id, 'is_staff', !profile.is_staff)}
                className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900`}
                role="menuitem"
              >
                {profile.is_staff ? 'Unstaff' : 'Staff'}
              </button></div>
          </div>
        )
      ))}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
        type={modalContent.type}
      />
    </div>
  );
 }

 export default UserList;