import React from 'react';
import './NotFound.css'; // Ensure you have the CSS for additional styling

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="animation-container mb-6 text-center">       
                <h1 className="text-6xl font-bold text-blue-600">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800">Oops! Page Not Found</h2>
                <p className="text-gray-600">The page you are looking for does not exist.</p>
            </div>
            <div className="navigation-links">
                <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">Go to Home</a>
            </div>
        </div>
    );
};

export default NotFound;
