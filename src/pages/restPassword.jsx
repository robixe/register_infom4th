// ResetPasswordComponent.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ResetPasswordComponent = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokens = localStorage.getItem("restPass") ;
    setToken(tokens);
  }, [location]);

  const handleResetPassword = async () => {
    if (!newPassword || newPassword !== confirmPassword) {
      setMessage('Passwords do not match or are empty.');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Password should be at least 6 characters long.');
      return;
    }

    try {
      const response = await fetch(`https://infom4th-api.robixe.online/reset-password?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        setMessage('Password reset successfully!');
        localStorage.removeItem("restPass");
        window.location.href = "/";
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      setMessage('An error occurred while resetting the password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={handleResetPassword}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Reset Password
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
