import React, { useEffect, useState } from 'react';
import { getUserMessages } from '../../services/UserMessages';

const PAGE_SIZE = 5;

function ChatMessage() {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getUserMessages();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const paginated = sortedMessages.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(messages.length / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold text-center mb-4">💬 Inbox</h2>

        {paginated.length === 0 ? (
          <p className="text-center text-gray-500">No messages found</p>
        ) : (
          paginated.map((msg) => (
            <div
              key={msg.id}
              className="border rounded p-3 mb-3 hover:bg-gray-50 transition cursor-pointer"
            >
              <div className="flex justify-between text-sm text-gray-600">
                <span>{msg.user_email || `User #${msg.user}`}</span>
                <span>{new Date(msg.created_at).toLocaleString()}</span>
              </div>
              <p className="mt-1 text-gray-800">{msg.body}</p>
            </div>
          ))
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="text-sm px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="text-sm px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
