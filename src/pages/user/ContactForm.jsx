import React, { useState } from 'react'
import api from '../../config/auth'
import toast from 'react-hot-toast'
import Spinner from '../../components/auth/Spinner'

function ContactForm() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isMessageSent, setIsMessageSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await api.post('api/notifications/contact-admin/', {
        body: message
      })

      console.log(res.data)
      setIsMessageSent(true)
      toast.success('Message sent successfully!')
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message.')
    } finally {
      setMessage('')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Admin</h2>

      {!isMessageSent ? (
        <>
          <p className="mb-6 text-gray-600">
            If you have any inquiries or issues, please send us a message below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="6"
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            >
              {loading ? <Spinner /> : 'Send Message'}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-bold text-green-600 mb-4">Message Sent!</h3>
          <p className="text-gray-600">
            Your message has been sent successfully to the admin. They are reviewing your inquiry and will respond shortly.
          </p>
          <button
            onClick={() => setIsMessageSent(false)}
            className="mt-6 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send Another Message
          </button>
        </div>
      )}
    </div>
  )
}

export default ContactForm
