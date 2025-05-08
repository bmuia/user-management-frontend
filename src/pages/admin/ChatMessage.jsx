import React, { useEffect, useState } from 'react';
import { getUserMessages, sendReplyToMessage } from '../../services/UserMessages';
import { Dialog } from '@headlessui/react';

const PAGE_SIZE = 5;

function ChatMessage() {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await getUserMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const paginated = sortedMessages.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(messages.length / PAGE_SIZE);

  const openModal = (msg) => {
    setSelectedMessage(msg);
    setReplyText(msg.reply || '');
    setIsModalOpen(true);
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    try {
      await sendReplyToMessage(selectedMessage.id, replyText);
      setIsModalOpen(false);
      await fetchMessages();
    } catch (error) {
      console.error('Failed to send reply', error);
    }
  };

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
              className="border rounded p-3 mb-3 hover:bg-gray-50 transition"
            >
              <div className="flex justify-between text-sm text-gray-600">
                <span>{msg.user_email || `User #${msg.user}`}</span>
                <span>{new Date(msg.created_at).toLocaleString()}</span>
              </div>
              <p className="mt-1 text-gray-800 whitespace-pre-wrap">{msg.body}</p>

              {msg.reply && (
                <div className="mt-2 border-t pt-2 text-sm text-gray-700">
                  <p className="font-medium text-gray-500">Reply:</p>
                  <p className="bg-gray-100 rounded p-2">{msg.reply}</p>
                </div>
              )}

              <button
                onClick={() => openModal(msg)}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                {msg.reply ? 'Reply Again' : 'Reply'}
              </button>
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

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg rounded-xl bg-white p-6 shadow-xl space-y-4 relative">
            <Dialog.Title className="text-lg font-semibold">
              {selectedMessage?.reply ? 'Edit Reply' : 'Write a Reply'}
            </Dialog.Title>
            <div>
              <p className="text-sm text-gray-500 mb-1">
                From: <span className="font-medium">{selectedMessage?.user_email || `User #${selectedMessage?.user}`}</span>
              </p>
              <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage?.body}</p>
            </div>

            <div className="mt-4">
              <textarea
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full border rounded p-2 text-sm"
                placeholder="Write your reply..."
              />
              <button
                onClick={handleReplySubmit}
                className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                {selectedMessage?.reply ? 'Update Reply' : 'Send Reply'}
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default ChatMessage;
