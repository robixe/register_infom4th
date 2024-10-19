import React, { useState } from 'react';
import { rootauth } from '../../help';

// Sample student data
const initialStudents = [
    { id: 1, name: 'Alice', email: 'alice@example.com', phone: '0639692241', membership: 'Pro' },
    { id: 2, name: 'Bob', email: 'bob@example.com', phone: '0639692242', membership: 'Basic' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', phone: '0639692243', membership: 'Pro' },
    // Add more student objects here...
];

function RootDashboard() {
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
    const [students] = useState(initialStudents); // State to hold student data
    rootauth();

    // Filtered students based on search term
    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
           <nav className="w-full bg-blue-600 p-4 text-white flex justify-between items-center">
            <div className="text-lg font-bold">Dashboard</div>
            <div className="flex space-x-4">
                <a href="/root/dashboard" className="hover:text-blue-200">Students</a>
                <a href="/root/event" className="hover:text-blue-200">Events</a>
                <a href="/root/verification" className="hover:text-blue-200">Verification</a>
            </div>
        </nav>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mt-4">
                <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Responsive Table Container */}
                <div className="overflow-x-auto w-full">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2 text-left">ID</th>
                                <th className="border border-gray-300 p-2 text-left">Name</th>
                                <th className="border border-gray-300 p-2 text-left">Email</th>
                                <th className="border border-gray-300 p-2 text-left">Phone</th>
                                <th className="border border-gray-300 p-2 text-left">Membership</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 p-2">{student.id}</td>
                                        <td className="border border-gray-300 p-2">{student.name}</td>
                                        <td className="border border-gray-300 p-2">{student.email}</td>
                                        <td className="border border-gray-300 p-2">{student.phone}</td>
                                        <td className="border border-gray-300 p-2">{student.membership}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="border border-gray-300 p-2 text-center">
                                        No students found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RootDashboard;
