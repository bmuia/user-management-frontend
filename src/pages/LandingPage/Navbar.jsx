import React from 'react';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white shadow-sm w-full text-md">
      <div className="text-xl font-bold">
        <h1>AccessHub</h1>
      </div>

      <ul className="flex space-x-6 text-sm font-medium">
        <li>
          <a href="/" className="hover:text-blue-600 transition">Home</a>
        </li>
        <li>
          <a href="/login" className="hover:text-blue-600 transition">Login</a>
        </li>
        <li>
          <a href="/register" className="bg-blue-400 text-white p-3 rounded-xl hover:bg-blue-800 transition">Register</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
