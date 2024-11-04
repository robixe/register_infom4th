import React from 'react';

const StudentSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
    type="text"
    placeholder=" Search by name..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full p-2 mb-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
    />
  );
};

export default StudentSearch;
