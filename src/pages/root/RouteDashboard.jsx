import React, { useState, useEffect } from 'react';
import { rootauth } from '../../help';
import NavBar from '../../components/6.DashboardAdmin/Navbar';
import StudentSearch from '../../components/6.DashboardAdmin/StudentSearch';
import StudentTable from '../../components/6.DashboardAdmin/StudentTable';

function RootDashboard() {
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [students, setStudents] = useState([]); // State to hold student data
  

  useEffect(() => {
    rootauth();
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
          seat: user.payment ? "Paid": 'No Paid' // Joining seat names if available
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
     <NavBar />
    <div className="flex-grow flex items-center justify-center py-6">
      <div className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-xl w-full px-2">
        <h1 className="lg:text-[28px] text-[25px] font-bold mb-6 ml-4 text-indigo-800">Student Dashboard</h1>
        <StudentSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <StudentTable  students={students} filteredStudents={filteredStudents}/>
      </div>
    </div>
    
  </div>
  );
}

export default RootDashboard;
