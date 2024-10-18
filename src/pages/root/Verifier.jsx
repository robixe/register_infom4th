import { useState } from 'react';

function Verifier() {
  const [userStatus, setUserStatus] = useState(''); // State to hold user status
  const [membershipPaid, setMembershipPaid] = useState(false); // State to hold membership status
  const [email, setEmail] = useState(''); // State to hold email for membership update
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [jsonInput, setJsonInput] = useState(''); // State to hold JSON input
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input
  const [membershipType, setMembershipType] = useState(''); // State for membership type
  const [name, setName] = useState(''); // State for name input
  const [phone, setPhone] = useState(''); // State for phone input
  const [sector, setSector] = useState(''); // State for sector input
  const [contactMethod, setContactMethod] = useState(''); // State for contact method input
  const [message, setMessage] = useState(''); // State for message input

  const handleJsonInput = async () => {
    console.log("handle json");
  };

  const updateMembershipStatus = async () => {
    console.log("update");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">JSON Input for User Check</h1>
        <textarea
          rows="6"
          placeholder='Enter JSON here, e.g., {"name":"H2","email":"achkariplay2005@gmail.com","phone":"0639692244","sector":"SMI","contactMethod":"email","message":"Test"}'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={handleJsonInput}
        >
          Check User
        </button>
        {loading && <p className="mt-2 text-blue-500">Loading...</p>}
        <p className="mt-4">User Status: {userStatus}</p>
        {userStatus === 'no' && (
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
