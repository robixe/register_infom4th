import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../help';
import UserInfo from '../../components/4.DashboardUser/UserInfo';
import NavBar from '../../components/6.DashboardAdmin/Navbar';

export default function Dashboard() {
  const [formData, setFormData] = useState(null);
  const [seatData, setSeatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [takingSpot, setTakingSpot] = useState(false);
  const [spotTaken, setSpotTaken] = useState(() => {
    const storedSeats = localStorage.getItem('reservedSeats');
    return storedSeats ? JSON.parse(storedSeats) : [];
  });
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

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
        localStorage.setItem("role", data.user.role);
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
        setFormData(data.user);
        setSeatData(data.seats);
        if (data.seat) {
          const reservedSeats = data.seat.map(seat => seat.event);
          setSpotTaken(reservedSeats);
          localStorage.setItem('reservedSeats', JSON.stringify(reservedSeats));
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
      const response = await fetch('https://infom4th-api-v2.robixe.online/events/info', {
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

  const handleAnnulSpot = async (eventId) => {
    const token = localStorage.getItem('token');
    setTakingSpot(true);

    if (!spotTaken.includes(eventId)) {
      alert('You have not reserved a spot for this event.');
      setTakingSpot(false);
      return;
    }

    try {
      const response = await fetch('https://infom4th-api-v2.robixe.online/seats/return', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, id: eventId }),
      });

      if (response.ok) {
        alert('Spot annulled successfully!');
        setSpotTaken(prev => {
          const updatedSpots = prev.filter(id => id !== eventId);
          localStorage.setItem('reservedSeats', JSON.stringify(updatedSpots));
          return updatedSpots;
        });
        await fetchEvents();
      } else {
        const errorText = await response.text();
        console.error(`Error annulling spot: ${response.status} - ${errorText}`);
        alert('Failed to annul the spot.');
      }
    } catch (error) {
      console.error('Error annulling spot:', error);
      alert('An error occurred while annulling the spot.');
    } finally {
      setTakingSpot(false);
    }
  };

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
        body: JSON.stringify({ token, id: eventId }),
      });

      if (response.ok) {
        alert('Spot taken successfully!');
        setSpotTaken(prev => {
          const updatedSpots = [...prev, eventId];
          localStorage.setItem('reservedSeats', JSON.stringify(updatedSpots));
          return updatedSpots;
        });
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
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <h1 className="lg:text-[33px] text-[25px] font-bold text-center mb-3">
        Hi {formData.first}! 👋 <br /> Welcome to Your Dashboard
      </h1>
      <p className="text-center text-[15px] font-semibold mb-8">
        Together, we can achieve greatness and make a difference!
      </p>
      <div className="flex justify-center mb-4">
        <a
          href="https://www.instagram.com/robixe.online/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-blue-400"
        >
          <img src="/Robixe.png" alt="Robixe Logo" className="w-6 h-6" />
          <span className="text-[12px] font-bold">Developed by Robixe</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Candidate Details Section */}
        <UserInfo formData={formData} />

        {/* Event Details Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Event Details:</h2>
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="mb-4 border-b pb-4">
                <p className="mb-1"><strong>Name:</strong> {event.name}</p>
                <p className="mb-1"><strong>Description:</strong> {event.description}</p>
                <p className="mb-1"><strong>Start:</strong> {event.start}</p>
                <p className="mb-1"><strong>End:</strong> {event.end}</p>
                <p className="mb-1">
                  <strong>Available Seats:</strong> {event.total - event.available} / {event.total}
                </p>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleTakeSpot(event.id)}
                    className={`mt-2 px-4 py-2 rounded-lg font-semibold transition 
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
                  <button
                    onClick={() => handleAnnulSpot(event.id)}
                    className={`mt-2 px-4 py-2 rounded-lg font-semibold transition 
                  ${takingSpot || !spotTaken.includes(event.id) || event.available === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                      }`}
                    disabled={takingSpot || !spotTaken.includes(event.id) || event.available === 0}
                  >
                    Annuller
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No events information available.</p>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full gap-6 mt-8 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Reserved Seats :</h2>
        {seatData && seatData.length > 0 ? (
          seatData.map((reservedSeat) => (
            <div 
              key={reservedSeat.event}
              className="bg-white shadow-lg rounded-lg p-6"
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
