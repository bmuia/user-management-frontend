import React from 'react';
import { Github } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-lg text-gray-600 py-6 mt-10">
      <div className="flex justify-center items-center space-x-2">
        <p>&copy; {new Date().getFullYear()} AccessHub. All rights reserved.</p>
        <a
          href="https://github.com/bmuia/user-management-frontend.git"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600"
        >
          <Github className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
