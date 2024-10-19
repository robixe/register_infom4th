import React, { useState, useEffect } from 'react';

const EventForm = () => {
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [events, setEvents] = useState([]); // State to hold the list of events
    const [loading, setLoading] = useState(true); // State to manage loading status

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem('Token'); // Retrieve token from local storage
            const body = JSON.stringify({ token }); // Prepare the body with the token

            const response = await fetch('https://infom4th-api.robixe.online/info/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body, // Send the token in the request body
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setEvents(data); // Set the fetched events
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventData = {
            name: eventName,
            description,
            start,
            end,
        };
        console.log(eventData); 
        try {
            const response = await fetch('https://infom4th-api.robixe.online/events/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('Event added successfully:', jsonResponse);
                // Optionally, fetch events again to update the list
                fetchEvents();
                // Reset form fields
                setEventName('');
                setDescription('');
                setStart('');
                setEnd('');
            } else {
                console.error('Error adding event:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const addSpot = async (eventId) => {
        const count = prompt("Enter the number of spots to add:"); // Prompt user for the number of spots
        if (!count || isNaN(count) || count <= 0) {
            alert("Please enter a valid number of spots.");
            return;
        }

        try {
            const token = localStorage.getItem('Token'); // Retrieve token from local storage
            const response = await fetch('https://infom4th-api.robixe.online/seats/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ count: Number(count), id: eventId }), // Send count and event ID
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('Spots added successfully:', jsonResponse);
                alert('Spots added successfully!');
                // Optionally, fetch events again to update the list
                fetchEvents();
            } else {
                console.error('Error adding spots:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchEvents(); // Fetch events when the component mounts
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 ">
            {/* Navigation Bar */}
            <nav className="w-full bg-blue-600 p-4 text-white flex justify-between items-center rounded-md shadow-md">
                <div className="text-lg font-bold">Dashboard</div>
                <div className="flex space-x-4">
                    <a href="/root/dashboard" className="hover:text-blue-200">Students</a>
                    <a href="/root/event" className="hover:text-blue-200">Events</a>
                    <a href="/root/verification" className="hover:text-blue-200">Verification</a>
                </div>
            </nav>

            <div className='flex md:flex-row flex-col'>
                {/* Form Section */}
                <div className="bg-white mt-6 p-6 md:w-1/2 w-full rounded-lg shadow-md max-w-xl mx-auto">
                    <h2 className="text-xl font-bold mb-4">Add New Event</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Event Name:
                                <input
                                    type="text"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Description:
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Start Date:
                                <input
                                    type="date"
                                    value={start}
                                    onChange={(e) => setStart(e.target.value)}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                End Date:
                                <input
                                    type="date"
                                    value={end}
                                    onChange={(e) => setEnd(e.target.value)}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                />
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            Add Event
                        </button>
                    </form>
                </div>

                {/* Events List Section */}
                <div className="bg-white mt-6 p-6 md:w-1/2 w-full rounded-lg shadow-md max-w-xl mx-auto">
                    <h2 className="text-xl font-bold mb-4">Existing Events</h2>
                    {loading ? (
                        <p>Loading events...</p>
                    ) : (
                        <ul>
                            {events.length > 0 ? (
                                events.map((event) => (
                                    <li key={event.id} className="border-b py-2">
                                        <h3 className="font-semibold">{event.name}</h3>
                                        <p>{event.description}</p>
                                        <p><strong>Start:</strong> {event.start}</p>
                                        <p><strong>End:</strong> {event.end}</p>
                                        <button
                                            onClick={() => addSpot(event.id)} // Add spot button
                                            className="mt-2 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
                                        >
                                            Add Spots
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p>No events available.</p>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventForm;