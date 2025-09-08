import React, { useEffect, useState } from "react";
import { Github } from "lucide-react";

function Navbar() {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/bmuia/user-management-frontend"
        );
        const data = await res.json();
        setStars(data.stargazers_count);
      } catch (err) {
        console.error("Failed to fetch GitHub stars:", err);
      }
    }

    fetchStars();
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Use Cases", href: "#usecases" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-blue-600 tracking-tight">
          UMC
        </div>

        {/* Navigation links */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          {navLinks.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <ul className="flex items-center space-x-4">
          <li className="flex items-center px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer">
            <Github className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">
              {stars !== null ? `${stars} ⭐` : "…"}
            </span>
          </li>
          <li>
            <a
              href="/register"
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition font-medium"
            >
              Register
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-md"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
