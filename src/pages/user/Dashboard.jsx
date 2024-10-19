import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../help';

export default function Dashboard() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth();
    fetchUserInfo();
  }, []);
 
  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch("https://infom4th-api.robixe.online/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json(); 
      setFormData(data);
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!formData) {
    return (
      <div className="container flex flex-col items-center justify-center ml-10 p-8">
        <h1 className="text-4xl font-bold text-blue-800 text-center mb-3">
          No Information Available
        </h1>
        <p className="text-center">Please complete the form to view your information.</p>
        <Link className='px-3 py-1 rounded text-white mt-4 bg-blue-600' to="/form">
          Go to form
        </Link>
      </div>
    );
  }

  const qrData = JSON.stringify(formData);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-blue-800 text-center mb-3">
        Your Information
      </h1>
      <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl text-gray-600 font-bold mb-6">Candidate Details:</h2>
        <p className="mb-1"><strong>First Name:</strong> {formData.first}</p>
        <p className="mb-1"><strong>Last Name:</strong> {formData.last}</p>
        <p className="mb-1"><strong>Birth Date:</strong> {formData.birth}</p>
        <p className="mb-1"><strong>Gender:</strong> {formData.gender}</p>
        <p className="mb-1"><strong>Phone:</strong> {formData.phone}</p>
        <p className="mb-1"><strong>Email:</strong> {formData.email}</p>
        <p><strong>Field of Study:</strong> {formData.study}</p>
      
        <div className="mt-6">
          <h3 className="text-1xl text-gray-600 font-bold mb-6">
            Scan this QR Code for your Information:
          </h3>
          <QRCodeCanvas value={qrData} size={256} aria-label="QR code containing candidate information" />
        </div>
      </div>
    </div>
  );
}
