import { useState } from 'react';
import { rootauth } from '../../help';

function Verifier() {
  const [userStatus, setUserStatus] = useState(''); // State to hold user status
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [jsonInput, setJsonInput] = useState(''); // State to hold JSON input
  const [userData, setUserData] = useState(null); // State to hold user data

  const handleJsonInput = async () => {
    setLoading(true); // Set loading state to true
    setUserStatus(''); // Reset user status before checking
    setUserData(null); // Reset user data

    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      const response = await fetch('https://infom4th-api.robixe.online/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token, code: jsonInput }) // Send token and verification code
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUserStatus(data.status); // Assuming the response contains a status field
      console.log(data);
      if (data) {
        setUserData(data); // Store the user data
      }
    } catch (error) {
      console.error("Error checking user status:", error);
      setUserStatus('error'); // Set user status to error if there's an issue
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const updateMembershipStatus = async () => {
    console.log("update");
  };

  rootauth();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <nav className="w-full bg-blue-600 p-4 text-white flex justify-between items-center">
        <div className="text-lg font-bold">Dashboard</div>
        <div className="flex space-x-4">
          <a href="/root/dashboard" className="hover:text-blue-200">Students</a>
          <a href="/root/event" className="hover:text-blue-200">Events</a>
          <a href="/root/verification" className="hover:text-blue-200">Verification</a>
        </div>
      </nav>
      <div className="bg-white mt-8 p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Code Virification Input for User Check</h1>
        <input
          type='text'
          placeholder='Code de verification'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={handleJsonInput}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Checking...' : 'Check User'}
        </button>
        {userStatus && <p className="mt-4">User Status: {userStatus}</p>}
        {userData && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">User Information:</h2>
            <p><strong>Name:</strong> {userData.first} {userData.last}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Gender:</strong> {userData.gender}</p>
            <p><strong>Birth Date:</strong> {userData.birth}</p>
            <p><strong>Study:</strong> {userData.study}</p>
            <p><strong>Payment:</strong> {userData.payment === null ? 'Not Paid' : 'Paid'}</p>
            <p><strong>Seats:</strong> {userData.seat ? userData.seat.map(seat => seat.name).join(', ') : 'No seats reserved'}</p>
          </div>
        )}
        {userData && userData.payment === null && (
          <div className="mt-4">
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setMembershipType(e.target.value)}
            >
              <option value="basic">Pack Begin</option>
              <option value="pro">Pack Pro</option>
            </select>
            <button
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
              onClick={() => updateMembershipStatus(true)}
            >
              Mark as Paid
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Verifier;
