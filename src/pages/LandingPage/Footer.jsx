import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold text-white">UMC</h1>
          <p className="mt-2 text-gray-400">
            A smarter, safer user management system.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-white transition">Home</a></li>
            <li><a href="#features" className="hover:text-white transition">Features</a></li>
            <li><a href="#usecases" className="hover:text-white transition">Use Cases</a></li>
            <li><a href="#team" className="hover:text-white transition">Team</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a 
                href="https://github.com/bmuia/user-management-frontend" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                GitHub Repo
              </a>
            </li>
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms & Conditions</a></li>
            <li>
              <a 
              href="https://github.com/bmuia/user-management-frontend/blob/main/LICENSE" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition"
              >
    Open Source License
  </a>
</li>

          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} UMC. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
