import React, { useState, useEffect } from 'react';
import { rootauth } from '../../help';

function RootDashboard() {
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [students, setStudents] = useState([]); // State to hold student data
  

  useEffect(() => {
    if (!rootauth())
    {
      window.location.href = "/root/"
    }
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
          membership: user.pack || 'N/A', // Assuming role is used as membership
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
      fetchStudents();
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
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-r from-gray-300 via-blue-200 to-gray-300 ">
    <nav className="w-full bg-white/30 backdrop-blur-md p-4 text-indigo-800 shadow-lg flex ">
      <div className="lg:text-2xl text-[20px] font-bold lg:ml-16">Dashboard</div>
      <div className="flex lg:space-x-14 space-x-4 lg:ml-[25%] ml-[13%] mt-1 lg:text-[17px]  text-[15px] font-[500]">
        <a href="/root/dashboard" className="hover:text-blue-500 transition duration-300">Students</a>
        <a href="/root/event" className="hover:text-blue-500 transition duration-300">Events</a>
        <a href="/root/verification" className="hover:text-blue-500 transition duration-300">Verification</a>
      </div>
      <a
        href="https://www.instagram.com/robixe.online/"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:flex space-x-2 text-black hover:text-blue-800 lg:ml-[22%] lg:mt-2"
      >
        <img src="/Robixe.png" alt="Robixe Logo" className="w-5 h-5" />
        <span className="text-[12px] font-bold  ">Dev by Robixe</span>
      </a>
    {/* for small screens */}
      <a
     href="https://www.instagram.com/robixe.online/"
    target="_blank"
    rel="noopener noreferrer"
    className="lg:hidden flex space-x-2 text-black hover:text-blue-800 absolute mt-[55%] left-1/2 transform -translate-x-1/2"
     >
    <img src="/Robixe.png" alt="Robixe Logo" className="w-5 h-5" />
    <span className="text-[12px] font-bold">Dev by Robixe</span>
     </a>
    </nav>

    <div className="flex-grow flex items-center justify-center p-6">
      <div className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-xl w-full max-w-7xl p-9">
        <h1 className="lg:text-[28px] text-[25px] font-bold mb-6 text-indigo-800">Student Dashboard</h1>
  
        <input
          type="text"
          placeholder=" Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
        />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className=" bg-gradient-to-r from-indigo-500 to-blue-500 text-white ">
                {['ID', 'Name', 'Email', 'Phone', 'Membership', 'Birth', 'Gender', 'Study','Reserved Seats'].map((heading) => (
                  <th key={heading} className="lg:p-3 text-[15px] font-semibold border border-indigo-300">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-indigo-100 transition">
                    {Object.values(student).map((value, idx) => (
                      <td key={idx} className="lg:p-4 p-3 lg:text-[16px] text-[15px]  border border-indigo-300 text-gray-700">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-6 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  </div>
  );
}

export default RootDashboard;
