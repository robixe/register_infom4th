import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../help';
import UserInfo from '../../components/4.DashboardUser/UserInfo';

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
  }, []);

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://infom4th-api-v2.robixe.online/info/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("role", data.role);
        if (
          JSON.stringify(data.id) === "null" ||
          JSON.stringify(data.auth) === "null" ||
          JSON.stringify(data.user) === "null" ||
          JSON.stringify(data.email) === "null" ||
          JSON.stringify(data.role) === "null" ||
          JSON.stringify(data.first) === "null" ||
          JSON.stringify(data.last) === "null" ||
          JSON.stringify(data.gender) === "null" ||
          JSON.stringify(data.birth) === "null" ||
          JSON.stringify(data.phone) === "null" ||
          JSON.stringify(data.study) === "null"
        ) {
          window.location.href = "/form";
        }
        localStorage.setItem("info", JSON.stringify(data));
        setFormData(data);
        if (data.seat) {
          setSpotTaken(data.seat.map(seat => seat.event));
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
      const response = await fetch('https://infom4th-api-v2.robixe.online/seats/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
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

    if (spotTaken.includes(eventId)) {
      alert('You have already reserved a spot for this event.');
      setTakingSpot(false);
      return;
    }

    try {
      const response = await fetch('https://infom4th-api-v2.robixe.online/seats/take', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, event: eventId }),
      });

      if (response.ok) {
        alert('Spot taken successfully!');
        setSpotTaken(prev => [...prev, eventId]);
        await fetchEvents();
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
        <h1 className="text-4xl font-bold text-indigo-400 text-center mb-3">No Information Available</h1>
        <p className="text-center">Please complete the form to view your information.</p>
        <Link className="px-3 py-1 rounded text-white mt-4 bg-blue-600" to="/form">
          Go to form
        </Link>
      </div>
    );
  }

  const qrData = JSON.stringify(formData);

  return (
    <div className="min-h-screen bg-white p-3">
      <h1 className="lg:text-[33px] text-[25px] font-bold text-indigo-400 text-center mb-3">
        Hi {formData.first}! 👋 <br /> Welcome to Your Dashboard
      </h1>
      <p className="text-center text-[15px] font-semibold text-gray-600 mb-8">
        Together, we can achieve greatness and make a difference!
      </p>
      <div className="lg:ml-[44%] ml-[30%]">
        <a
          href="https://www.instagram.com/robixe.online/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex space-x-2 hover:text-blue-400"
        >
          <img src="/Robixe.png" alt="Robixe Logo" className="w-6 h-6 -mt-1" />
          <span className="text-[12px] font-bold">Developed by Robixe</span>
        </a>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8">
        {/* Candidate Details Section */}
        <UserInfo formData={formData} />

        {/* Event Details Section */}
        <div className="bg-white shadow-2xl rounded-xl md:w-1/2 w-full p-8">
          <h2 className="text-2xl text-gray-800 font-bold mb-6">Event Details:</h2>
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
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
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
      </div>

      <div className="flex flex-col w-full gap-8 mt-8 mb-10">
        <h2 className="text-2xl text-gray-800 font-bold mb-6 text-center">Your Reserved Seats :</h2>
        {formData.seat && formData.seat.length > 0 ? (
          formData.seat.map((reservedSeat) => (
            <div
              key={reservedSeat.event}
              className="bg-white shadow-2xl rounded-xl p-6 w-80"
            >
              <p className="mb-2"><strong>Event Name:</strong> {reservedSeat.name}</p>
              <p className="mb-2"><strong>Description:</strong> {reservedSeat.description}</p>
              <p className="mb-2"><strong>Seat Number:</strong> {reservedSeat.seat}</p>
            </div>
          ))
        ) : (
          <p className="text-center">You have not reserved any seats yet.</p>
        )}
      </div>
    </div>
  );
}
