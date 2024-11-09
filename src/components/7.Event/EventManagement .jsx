import React, { useState, useEffect } from 'react';
import { rootauth } from '../../help';

const EventManagement = () => {
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [events, setEvents] = useState([]); // State to hold the list of events
    const [loading, setLoading] = useState(true); // State to manage loading status
    if (!rootauth()) {
        window.location.href = "/root/"
    }
    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from local storage
            const body = JSON.stringify({ token }); // Prepare the body with the token

            const response = await fetch('https://infom4th-api-v2.robixe.online/events/info', {
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
            localStorage.setItem("event", JSON.stringify(data));

        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        const eventData = {
            token:token ,
            name: eventName,
            description :description,
            start :start,
            end :end,
        };
        console.log(eventData);
        try {
            const response = await fetch('https://infom4th-api-v2.robixe.online/events/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                
                // Optionally, fetch events again to update the list
                fetchEvents();
            } else {
                console.error('Error adding event:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            // Clean the inputs after handling
            setEventName('');
            setDescription('');
            setStart('');
            setEnd('');
        }
        fetchEvents();
    };

    const deleteEvent = async (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch('https://infom4th-api-v2.robixe.online/events/delete', {
                    method: 'POST', // Use POST method as specified
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: eventId, token: token })
                });
                if (response.ok) {
                    const jsonResponse = await response.json();

                    alert('Event deleted successfully!', jsonResponse);
                    // Optionally, fetch events again to update the list
                    fetchEvents();
                } else {
                    console.error('Error deleting event:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchEvents();
    };

    const addSpot = async (eventId) => {
        const count = prompt("Enter the number of seats to add:"); // Prompt to get count
        let token = localStorage.getItem("token");
        const seatData = {
            token : token,
            count: parseInt(count, 10), // Convert count to an integer
            id: eventId, // Event ID
        };

        try {
            const response = await fetch('https://infom4th-api-v2.robixe.online/seats/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(seatData), // Send the seat data in the request body
            });

            if (response.ok) {
                const jsonResponse = await response;
                console.log(jsonResponse);
                alert('Seats added successfully!');
                // Optionally, you can fetch events again to update the list or handle UI updates
            } else {
                console.error('Error adding seats:', response.statusText);
                alert('Error adding seats. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding seats.');
        }
        fetchEvents();
    };

    useEffect(() => {
        fetchEvents(); // Fetch events when the component mounts
    }, []);


    return (
        <div className="flex flex-col mt-12">
        <div className=" bg-white/70 backdrop-blur-lg shadow-2xl rounded-xl lg:mt-6 mt-[14%] p-6 md:w-1/2 w-[90%] max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center text-indigo-800">Add New Event</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                                Event Name:
                                <input
                                    type="text"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </label>
                        </div>
                        <div className='text-center'>
                        <button
                            type="submit"
                            className="w-[40%] py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-blue-700"
                        >
                            Add Event
                        </button>
                        </div>
                    </form>
                </div>

                {/* Events List Section */}
                <div className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-xl mt-6 p-6 md:w-1/2 w-[90%] max-w-xl mx-auto mb-10">
                    <h2 className="text-2xl font-bold mb-10 text-center text-indigo-800">Existing Events</h2>
                    {loading ? (
                        <p>Loading events...</p>
                    ) : (
                        <ul>
                            {events.length > 0 ? (
                                events.map((event) => (
                                    <li key={event.id} className="border-b-2 border-gray-300 py-2">
                                        <h3 className="font-bold text-1xl">{event.name}</h3>
                                        <p>{event.description}</p>
                                        <p><strong>Start:</strong> {event.start}</p>
                                        <p><strong>End:</strong> {event.end}</p>
                                        <p><strong>Total:</strong> {event.total}</p>
                                        <p><strong>Available:</strong> {event.available}</p>
                                        <button
                                            onClick={() => addSpot(event.id)} // Add spot button
                                            className="text-sm mt-3 bg-green-500 text-white py-1 px-3 font-semibold rounded-md hover:bg-green-600"
                                        >
                                            Add Spots
                                        </button>
                                        <button
                                            onClick={() => deleteEvent(event.id)} // Delete event button
                                            className=" text-sm mt-3 bg-red-500 text-white py-1 px-3  font-semibold rounded-md hover:bg-red-600 ml-2"
                                        >
                                            Delete Event
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
    );
};

export default EventManagement;
