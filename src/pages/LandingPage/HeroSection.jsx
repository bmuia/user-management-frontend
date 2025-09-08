import React from "react";

function HeroSection() {
  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center text-center px-6 py-16 min-h-screen"
    >
      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl">
        Manage users{" "}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text animate-pulse">
          efficiently
        </span>{" "}
        and smarter 🚀
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
        Simplify onboarding, manage permissions, and track activity with ease.
        A modern, secure, and scalable solution for your team.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <a
          href="/register"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 text-lg bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition font-semibold"
        >
          Get Started
        </a>
        <a
          href="#demo"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 text-lg bg-white text-gray-800 rounded-lg border border-gray-300 shadow-md hover:bg-gray-50 transition font-semibold"
        >
          View Demo
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
