import React from 'react';

function Homepage() {
  return (
    <div className="bg-gray-100 font-sans">
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">provacu lnl</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-blue-200">Features</a></li>
              <li><a href="#" className="hover:text-blue-200">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-200">Contact</a></li>
              <li>
  <a
    href="/register"
    className="bg-white text-blue-500 hover:bg-blue-100 font-semibold py-2 px-4 rounded-full"
  >
    Sign Up
  </a>
</li>

            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Discover the Power of provacu lnl</h2>
          <p className="text-lg text-gray-600 mb-8">
            Your solution for [briefly describe your app's main benefit or purpose].
          </p>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg">
            Get Started Now
          </button>
        </section>

        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-blue-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.523 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13l-1.253 1.253A3 3 0 0111 8.975l-1.253-1.253m0 0L8.975 11a3 3 0 01-1.253 1.253L7.5 11m-3-3L5.477 8.975a3 3 0 010 4.05l1.253 1.253m0 0L8.975 15a3 3 0 011.253 1.253L12 15"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Feature One</h3>
              <p className="text-gray-600">Brief description of the first feature and its benefits.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-green-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12h18.084m-9-9v18M9 11h6"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Feature Two</h3>
              <p className="text-gray-600">Brief description of the second feature and how it helps users.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-purple-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14m-9-3h-4m9-3h4m-12 6h.01M12 11h.01M15 7h.01"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Feature Three</h3>
              <p className="text-gray-600">Explanation of the third feature and its key advantages.</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-200 py-12 rounded-lg">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to experience provacu lnl?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of satisfied users and unlock the full potential of [your app's category].
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg">
              Start Your Free Trial
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 provacu lnl. All rights reserved.</p>
          <nav className="mt-2">
            <ul className="flex justify-center space-x-4">
              <li><a href="#" className="hover:text-gray-100">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-100">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-100">Contact Us</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;