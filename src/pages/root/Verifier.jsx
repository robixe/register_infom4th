import { useState } from 'react';
import { rootauth } from '../../help';

function Verifier() {
  const [userStatus, setUserStatus] = useState(''); // State to hold user status
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [jsonInput, setJsonInput] = useState(''); // State to hold JSON input
  const [userData, setUserData] = useState(null); // State to hold user data
  const [membershipType, setMembershipType] = useState('basic'); // State to hold membership type

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
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    const body = {
      token: token, // Token for authentication
      memberId: userData.auth, // Assuming userData contains the member ID
      newType: membershipType, // New membership type
    };
    console.log(body);
    try {
      const response = await fetch('https://infom4th-api.robixe.online/members/modify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // Send the body as JSON
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Membership status updated successfully:', jsonResponse);
        alert('Membership status updated successfully!');
        // Optionally, you can refresh user data or update UI here
      } else {
        console.error('Error updating membership status:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating membership status.');
    }
    handleJsonInput();
  };

  const updatePaymentStatus = async (paymentStatus) => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    const body = {
      token: token, // Token for authentication
      memberId: userData.auth, // Assuming userData contains the member ID
      paymentStatus: paymentStatus, // Set payment status based on button clicked
    };

    try {
      const response = await fetch('https://infom4th-api.robixe.online/members/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // Send the body as JSON
      });

      if (response.ok) {
        const jsonResponse = await response.json();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating payment status.');
    }
    handleJsonInput();
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
        <h1 className="text-2xl font-bold mb-4">Code Verification Input for User Check</h1>
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
            <p><strong>Pack:</strong> {userData.pack}</p>
            <p><strong>Payment:</strong> {userData.payment === "0" ? 'Not Paid' : 'Paid'}</p>
            <p><strong>Seats:</strong> {userData.seat ? userData.seat.map(seat => seat.name).join(', ') : 'No seats reserved'}</p>
          </div>
        )}
        {userData && (
          <div className="mt-4">
            <button
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
              onClick={() => updatePaymentStatus(true)} // Mark as paid
            >
              Mark as Paid
            </button>
            <button
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200 mt-2"
              onClick={() => updatePaymentStatus(false)} // Mark as unpaid
            >
              Mark as Unpaid
            </button>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setMembershipType(e.target.value)}
            >
              <option value="begin">Pack Begin</option>
              <option value="vip">Pack Pro</option>
            </select>
            <button
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
              onClick={updateMembershipStatus} // Update membership status
            >
              Update Membership Status
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Verifier;
