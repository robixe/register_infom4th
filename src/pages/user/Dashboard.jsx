import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../help';

export default function Dashboard() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [takingSpot, setTakingSpot] = useState(false);
  const [spotTaken, setSpotTaken] = useState([]);

  useEffect(() => {
    if (!auth()) {
      window.location.href = "/";
    }
    fetchUserData();
    fetchEvents();
    fetchEvents();
  }, []);

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://infom4th-api.robixe.online/info/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log((data));
        if (
          JSON.stringify(data.id) == "null" ||
          JSON.stringify(data.auth) == "null" ||
          JSON.stringify(data.user) == "null" ||
          JSON.stringify(data.email) == "null" ||
          JSON.stringify(data.role) == "null" ||
          JSON.stringify(data.first) == "null" ||
          JSON.stringify(data.last) == "null" ||
          JSON.stringify(data.gender) == "null" ||
          JSON.stringify(data.birth) == "null" ||
          JSON.stringify(data.phone) == "null" ||
          JSON.stringify(data.study) == "null"
        ) {

          window.location.href = "/form";
        }
        localStorage.setItem("info", JSON.stringify(data));
        setFormData(data);
        // Check reserved spots and set them in state
        if (data.seat) {
          setSpotTaken(data.seat.map(seat => seat.event)); // Store event IDs of reserved spots
        }
      } else {
        console.error('Error fetching user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://infom4th-api.robixe.online/seats/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data);
        localStorage.setItem('eventsData', JSON.stringify(data));
      } else {
        console.error(`Error fetching events: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, []);

  const handleTakeSpot = async (eventId) => {
    const token = localStorage.getItem('token');
    setTakingSpot(true);

    // Check if the user is already taking a spot for the event
    if (spotTaken.includes(eventId)) {
      alert('You have already reserved a spot for this event.');
      setTakingSpot(false);
      return;
    }

    try {
      const response = await fetch('https://infom4th-api.robixe.online/seats/take', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, event: eventId }),
      });

      if (response.ok) {
        alert('Spot taken successfully!');
        setSpotTaken(prev => [...prev, eventId]); // Update the reserved spots
        await fetchEvents(); // Refresh the events information
      } else {
        const errorText = await response.text();
        console.error(`Error taking spot: ${response.status} - ${errorText}`);
        alert('Failed to take the spot.');
      }
    } catch (error) {
      console.error('Error taking spot:', error);
      alert('An error occurred while taking the spot.');
    } finally {
      setTakingSpot(false);
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!formData) {
    return (
      <div className="container flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-blue-800 text-center mb-3">No Information Available</h1>
        <p className="text-center">Please complete the form to view your information.</p>
        <Link className="px-3 py-1 rounded text-white mt-4 bg-blue-600" to="/form">
          Go to form
        </Link>
      </div>
    );
  }

  const qrData = JSON.stringify(formData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-white to-gray-400 backdrop-blur-md p-3">
      <h1 className="lg:text-[33px]  text-[25px] font-bold text-indigo-800 text-center mb-3">
        Hi {formData.first}! 👋 <br /> Welcome to Your Dashboard
      </h1>
      <p className="text-center text-[16px] text-gray-600 mb-8">
        Together, we can achieve greatness and make a difference!
      </p>
      <div className=" lg:ml-[44%] ml-[30%]">
      <a
        href="https://www.instagram.com/robixe.online/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex space-x-2 hover:text-blue-800"
      >
        <img src="/Robixe.png" alt="Robixe Logo" className="w-6 h-6  -mt-1 " />
        <span className="text-[12px] font-bold ">Developed by Robixe</span>
      </a>
    </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8">
        {/* Candidate Details Section */}
        <div className="bg-white/90  md:w-1/2 w-full backdrop-blur-lg shadow-2xl rounded-xl p-8">
          <h2 className="text-2xl text-gray-600 font-bold mb-6">Candidate Details:</h2>
          <p className="mb-2"><strong>First Name:</strong> {formData.first}</p>
          <p className="mb-2"><strong>Last Name:</strong> {formData.last}</p>
          <p className="mb-2"><strong>Birth Date:</strong> {formData.birth}</p>
          <p className="mb-2"><strong>Gender:</strong> {formData.gender}</p>
          <p className="mb-2"><strong>Phone:</strong> {formData.phone}</p>
          <p className="mb-2"><strong>Email:</strong> {formData.email}</p>
          <p className="mb-2"><strong>Field of Study:</strong> {formData.study}</p>
          <p className="mb-2 px-4 py-2 bg-gradient-to-br from-gray-200 via-white to-gray-200 rounded-md backdrop-blur-md shadow-lg lg:w-[37%] w-[70%] text-indigo-800 font-bold ">
            <strong>Verification:</strong> {formData.auth}</p>

          <div className="mt-6">
            <h3 className="text-xl text-gray-600 font-bold mb-4">
              Scan this QR Code for your Information:
            </h3>
            <QRCodeCanvas value={qrData} size={156} className="mx-auto ml-4" />
          </div>
        </div>

        {/* Event Details Section */}
        <div className="bg-white/90  backdrop-blur-lg shadow-2xl rounded-xl md:w-1/2 w-full  p-8">
          <h2 className="text-2xl text-gray-600 font-bold mb-6">Event Details:</h2>
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="mb-6">
                <p className="mb-1"><strong>Name:</strong> {event.name}</p>
                <p className="mb-1"><strong>Description:</strong> {event.description}</p>
                <p className="mb-1"><strong>Start:</strong> {event.start}</p>
                <p className="mb-1"><strong>End:</strong> {event.end}</p>
                <p className="mb-1">
                  <strong>Available Seats:</strong> {event.total - event.available} / {event.total}
                </p>

                <button
                  onClick={() => handleTakeSpot(event.id)}
                  className={`mt-4 px-4 py-2 rounded-lg font-semibold transition 
                ${takingSpot || spotTaken.includes(event.id) || event.available === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-800 hover:bg-blue-500 text-white'
                    }`}
                  disabled={takingSpot || spotTaken.includes(event.id) || event.available === 0}
                >
                  {spotTaken.includes(event.id)
                    ? 'Spot Taken'
                    : takingSpot
                      ? 'Processing...'
                      : 'Take Spot'}
                </button>
              </div>
            ))
          ) : (
            <p>No events information available.</p>
          )}
        </div>
        {/* your reservation  */}
      </div>

      <div className="flex flex-col w-full gap-8 mt-8 mb-10 ">
        <h2 className="text-2xl text-gray-600 font-bold mb-6 text-center">Your Reserved Seats :</h2>
        {formData.seat && formData.seat.length > 0 ? (
          formData.seat.map((reservedSeat) => (
            <div
              key={reservedSeat.event}
              className=" bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl p-6 w-80"
            >
              <p className="mb-2"><strong>Event Name:</strong> {reservedSeat.name}</p>
              <p className="mb-2"><strong>Description:</strong> {reservedSeat.description}</p>
              <p className="mb-2"><strong>Seat Number:</strong> {reservedSeat.seat}</p>
            </div>

          ))
        ) : (
          <p className="text-center">You have not reserved any seats yet.</p>
        )}  </div>
    </div>
  );
}
