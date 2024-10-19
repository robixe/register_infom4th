import React, { useState } from 'react';

const EventForm = () => {
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

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
            console.log(response);
            if (response.ok) {
                const jsonResponse = await response;
                console.log('Event added successfully:', jsonResponse);
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

            {/* Form Section */}
            <div className="bg-white mt-6 p-6 rounded-lg shadow-md max-w-xl mx-auto">
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
        </div>
    );
};

export default EventForm;
