import { useState } from 'react';
import { rootauth } from '../../help';
import NavBar from '../../components/6.DashboardAdmin/Navbar';

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
      const response = await fetch('https://infom4th-api-v2.robixe.online/code', {
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
      console.log(data)
      setUserStatus(data.status); // Assuming the response contains a status field
      if (data) {
        setUserData(data.user); // Store the user data
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
    try {
      const response = await fetch('https://infom4th-api-v2.robixe.online/members/modify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // Send the body as JSON
      });

      if (response.ok) {
        const jsonResponse = await response;
        console.log(jsonResponse);
        alert('Membership status updated successfully!');
        // Optionally, you can refresh user data or update UI here
      } else {
        console.error('Error updating membership status:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
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
      const response = await fetch('https://infom4th-api-v2.robixe.online/members/payment', {
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
    }
    handleJsonInput();
    
  };

  if (!rootauth()) {
    window.location.href = "/root/"
  }

  return (
    <div className="flex flex-col min-h-screen  items-center w-full bg-white">
      <NavBar />
      <div className="bg-white shadow-lg rounded-xl  lg:mt-28 mt-[16%] p-6 md:w-1/2 w-[90%] max-w-xl mx-auto mb-10">
        <h1 className="lg:text-2xl text-[22px] font-bold mb-6 text-center text-indigo-600">Code Verification Input for User Check</h1>
        <input
          type='text'
          placeholder='Verification Code'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <div className='text-center'>
          <button
            className="w-[40%] py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-blue-700"
            onClick={handleJsonInput}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Checking...' : 'Check User'}
          </button>
        </div>
        {userStatus && <p className="mt-4">User Status: {userStatus}</p>}
        {userData && (
          <div className="mt-10">
            <h2 className="text-lg font-bold mb-5">User Information:</h2>
            <p><strong>Name:</strong> {userData.first} {userData.last}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Gender:</strong> {userData.gender}</p>
            <p><strong>Birth Date:</strong> {userData.birth}</p>
            <p><strong>Study:</strong> {userData.study}</p>
            <p><strong>Pack:</strong> {userData.pack}</p>
            <p><strong>Payment:</strong> {(userData.payment === "0" || userData.payment === null) ? 'Not Paid' : 'Paid'}</p>
            <p><strong>Seats:</strong> {userData.seat ? userData.seat.map(seat => seat.name).join(', ') : 'No seats reserved'}</p>
          </div>
        )}
        {userData && (
          <div className="mt-4">
            <button
              className="w-full bg-green-500 py-2 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200"
              onClick={() => updatePaymentStatus(true)} // Mark as paid
            >
              Mark as Paid
            </button>
            <button
              className="w-full bg-red-500 text-white py-2 font-semibold rounded-md hover:bg-red-600 transition duration-200 mt-2"
              onClick={() => updatePaymentStatus(false)} // Mark as unpaid
            >
              Mark as Unpaid
            </button>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-4 mt-6 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => setMembershipType(e.target.value)}
            >
              <option>Choose Pack</option>
              <option value="begin">Pack Begin</option>
              <option value="vip">Pack Pro</option>
            </select>
            <button
              className="w-full bg-green-500 text-white py-2 font-semibold rounded-md hover:bg-green-600 transition duration-200"
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
