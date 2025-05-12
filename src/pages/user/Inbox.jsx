import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '../../services/UserMessages';
import Spinner from '../../components/auth/Spinner';

function Inbox() {
  const [notifications, setNotifications] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to load notifications
  const loadNotifications = async () => {
    setLoading(true);
    try {
      const allNotifications = await fetchNotifications();
      setNotifications(allNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh the notifications every 30 seconds
  useEffect(() => {
    loadNotifications();
    const intervalId = setInterval(loadNotifications, 30000); // 30 seconds interval
    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, []);

  // Handle when a user closes a message to refresh the notifications
  const handleCloseMessage = () => {
    setSelectedMessage(null);
    loadNotifications(); // Refresh notifications when a message is closed
  };

  return (
    <div className="max-w-5xl mx-auto p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Inbox</h1>

      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow overflow-hidden h-[70vh]">
        {/* Left: Message List */}
        <div className="w-full lg:w-1/3 border-b lg:border-r overflow-y-auto max-h-full">
          {loading ? (
            <div className="flex justify-center items-center h-full py-10">
              <Spinner />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex justify-center items-center h-full py-10">
              <p className="text-center text-gray-500 mt-4">No messages yet from an admin.</p>
            </div>
          ) : (
            notifications.map((not) => (
              <div
                key={not.id}
                onClick={() => setSelectedMessage(not)}
                className={`cursor-pointer p-4 border-b lg:border-none hover:bg-gray-50 ${
                  selectedMessage?.id === not.id ? 'bg-gray-100' : ''
                }`}
              >
                <p className="font-semibold text-sm text-gray-800">{not.message_sent}</p>
                <p className="text-xs text-gray-500 truncate">{not.admin_message}</p>
                <span className="text-xs text-gray-400 block mt-1">
                  {new Date(not.created_at).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Right: Thread View */}
        <div className="w-full lg:w-2/3 p-4 overflow-y-auto max-h-full">
          {selectedMessage ? (
            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <div className="bg-gray-100 p-3 rounded-xl max-w-lg">
                  <p className="text-sm text-gray-800">{selectedMessage.message_sent}</p>
                  <span className="text-xs text-gray-500 block mt-1">
                    Sent • {new Date(selectedMessage.created_at).toLocaleTimeString()}
                  </span>
                </div>

                <div className="bg-blue-100 p-3 rounded-xl max-w-lg self-end">
                  <p className="text-sm text-blue-900">{selectedMessage.admin_message}</p>
                  <span className="text-xs text-gray-500 block text-right mt-1">
                    Admin • {new Date(selectedMessage.created_at).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              <div className="text-center text-xs text-gray-400 italic">
                {selectedMessage.content}
              </div>

              <div className="text-center mt-4">
                <button
                  onClick={handleCloseMessage}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Close Message
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full py-10">
              <p className="text-center text-gray-400 mt-10">Select a message to view the thread</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inbox;
