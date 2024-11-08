import React from 'react';

const StudentTable = ({ students, filteredStudents }) => {
  return (
    <div className="mt-2">
    <table className="w-full border-collapse">
      <thead>
        <tr className=" bg-gradient-to-r from-indigo-500 to-blue-500 text-white ">
          {['Name', 'Email', 'Phone', 'Membership', 'Birth', 'Gender', 'Study','Payment'].map((heading) => (
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
  );
};

export default StudentTable;
