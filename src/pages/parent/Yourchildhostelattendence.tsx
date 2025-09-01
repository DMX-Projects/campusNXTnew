

import React, { useState, useEffect } from 'react';

// --- Data Structures ---
type Student = {
  id: string;
  name: string;
  email: string;
  hostel: string;
  roomNumber: string;
  isAttending: boolean;
};

// --- Mock Data ---
const mockStudents: Student[] = [
  { id: 'S101', name: 'Alice Johnson', email: 'alice.j@college.edu', hostel: 'Hostel A', roomNumber: '101', isAttending: true },
  { id: 'S102', name: 'Bob Williams', email: 'bob.w@college.edu', hostel: 'Hostel A', roomNumber: '102', isAttending: false },
  { id: 'S103', name: 'Charlie Davis', email: 'charlie.d@college.edu', hostel: 'Hostel A', roomNumber: '101', isAttending: true },
  { id: 'S104', name: 'Diana Evans', email: 'diana.e@college.edu', hostel: 'Hostel B', roomNumber: '205', isAttending: true },
  { id: 'S105', name: 'Frank White', email: 'frank.w@college.edu', hostel: 'Hostel B', roomNumber: '205', isAttending: false },
  { id: 'S106', name: 'Grace Lee', email: 'grace.l@college.edu', hostel: 'Hostel A', roomNumber: '102', isAttending: true },
];

// --- Main App Component ---
function Yourchildhostelattendance() {
  const [selectedRoom, setSelectedRoom] = useState('101');
  const [roomDetails, setRoomDetails] = useState<Student[]>([]);

  useEffect(() => {
    // Filter students to find all occupants of the selected room
    const filteredStudents = mockStudents.filter(student => student.roomNumber === selectedRoom);
    setRoomDetails(filteredStudents);
  }, [selectedRoom]);

  return (
    <div className="container mx-auto p-4">
      <header className="text-center my-8">
      </header>

      {/* Room Selection Input */}
      <div className="mb-6 flex justify-center items-center gap-4">
        <label htmlFor="room-select" className="text-xl font-medium text-gray-700">
          Select Room Number:
        </label>
        <input
          id="room-select"
          type="text"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          placeholder="e.g., 101"
          className="border rounded-md px-3 py-2 w-40 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <hr className="my-8" />

      {/* Display Room Details and Attendance */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Details for Room {selectedRoom}
        </h2>
        {roomDetails.length > 0 ? (
          <div>
            <p className="text-gray-600 text-center mb-4">
              Hostel: <span className="font-semibold text-blue-700">{roomDetails[0].hostel}</span>
            </p>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roomDetails.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.isAttending ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {student.isAttending ? 'Present' : 'Absent'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-red-500 text-lg">
            No students found for room **{selectedRoom}**. Please enter a valid room number.
          </p>
        )}
      </div>
    </div>
  );
}

export default Yourchildhostelattendance;