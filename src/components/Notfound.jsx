import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <img
        src="/logo.png" // Replace with an actual image URL
        alt="Page not found"
        className="w-64 h-64 mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Go Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
;
