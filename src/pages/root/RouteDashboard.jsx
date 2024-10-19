import React, { useState, useEffect } from 'react';
import { rootauth } from '../../help';

function RootDashboard() {
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [students, setStudents] = useState([]); // State to hold student data
  rootauth();

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch('https://infom4th-api.robixe.online/info/all', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const formattedData = data.map(user => ({
          id: user.id,
          name: user.first ? `${user.first} ${user.last}` : user.user,
          email: user.email,
          phone: user.phone || 'N/A',
          membership: user.role, // Assuming role is used as membership
          birth: user.birth || 'N/A',
          gender: user.gender || 'N/A',
          study: user.study || 'N/A',
          seat: user.seat ? user.seat.map(s => s.name).join(', ') : 'N/A' // Joining seat names if available
        }));

        // Store the fetched data in local storage
        localStorage.setItem('studentsData', JSON.stringify(formattedData));
        setStudents(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Check if data is already in local storage
    const storedData = localStorage.getItem('studentsData');
    if (storedData) {
      setStudents(JSON.parse(storedData));
    } else {
      fetchStudents();
    }
  }, []);

  // Filtered students based on search term
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100">
      <nav className="w-full bg-blue-600 p-4 text-white flex justify-between items-center">
        <div className="text-lg font-bold w-full">Dashboard</div>
        <div className="flex space-x-4">
          <a href="/root/dashboard" className="hover:text-blue-200">Students</a>
          <a href="/root/event" className="hover:text-blue-200">Events</a>
          <a href="/root/verification" className="hover:text-blue-200">Verification</a>
        </div>
      </nav>
      <div className="bg-white p-6 rounded-lg shadow-md w-full mt-4">
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
                <th className="border border-gray-300 p-2 text-left">Birth</th>
                <th className="border border-gray-300 p-2 text-left">Gender</th>
                <th className="border border-gray-300 p-2 text-left">Study</th>
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
                    <td className="border border-gray-300 p-2">{student.birth}</td>
                    <td className="border border-gray-300 p-2">{student.gender}</td>
                    <td className="border border-gray-300 p-2">{student.study}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="border border-gray-300 p-2 text-center">
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
