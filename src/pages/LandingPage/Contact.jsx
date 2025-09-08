import React from 'react'
import { MailCheckIcon, Send } from 'lucide-react'

function Contact() {
  return (
    <section className="min-h-screen w-full flex justify-center items-center px-6 py-12" id='contact'>
      <div className="mx-auto max-w-3xl w-full">
        <h1 className="text-5xl font-bold text-gray-900 text-center mb-6">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Have inquiries? Want to understand how our project is built, scaled, or how your
          data is protected? Feel free to reach out to us — we’d love to hear from you!
        </p>

        {/* Email shortcut */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Email Us</h2>
          <p className="text-gray-600">Our team constantly checks email 24/7.</p>
          <a
            href="mailto:belammuia0@gmail.com"
            className="inline-flex items-center gap-2 mt-2 text-blue-600 hover:text-blue-800 transition"
          >
            <MailCheckIcon className="w-5 h-5" /> Shoot us a message
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center my-10">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Contact form */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            <Send className="w-5 h-5" /> Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
