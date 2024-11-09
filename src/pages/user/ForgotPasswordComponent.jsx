// RequestResetPasswordComponent.js
import React, { useState } from 'react';

const RequestResetPasswordComponent = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleRequestReset = async () => {
    if (!email) {
      setMessage('Email is required.');
      return;
    }

    try {
      const response = await fetch('https://infom4th-api-v2.robixe.online/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage(true);
        setMessage('Check your email to reset password.');
        setEmail(''); // Clear the email input
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      setMessage('An error occurred while requesting the password reset.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {successMessage && (
          <div className="fixed inset-0 flex items-center text-center justify-center z-50">
            <div className="lg:w-[30%] lg:h-[20%] w-[80%] bg-indigo-100 text-indigo-800 border border-indigo-300 p-6 rounded-xl shadow-xl relative">
              <span className='font-medium'>{message}</span>
              <button onClick={() => setSuccessMessage(false)} className="absolute top-1 right-2 text-2xl font-bold">
                &times;
              </button>
            </div>
          </div>
        )}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Request Password Reset</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleRequestReset}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Request Password Reset
        </button>
        {message && !successMessage && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default RequestResetPasswordComponent;
