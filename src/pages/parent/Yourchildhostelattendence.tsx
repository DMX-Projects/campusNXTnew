


// // src/HostelAttendance.tsx

// import React, { useState, useEffect } from 'react';
// import { StudentAttendance } from './types';

// // Mock data to simulate an ERP database
// const mockStudents = [
//   { id: 'S001', name: 'John Doe', hostelRoom: 'A-101', course: 'B.Tech' },
//   { id: 'S002', name: 'Jane Smith', hostelRoom: 'B-205', course: 'B.Sc' },
//   { id: 'S003', name: 'Peter Jones', hostelRoom: 'C-310', course: 'B.Arch' },
//   { id: 'S004', name: 'Emily White', hostelRoom: 'D-402', course: 'B.A.' },
// ];

// const HostelAttendance: React.FC = () => {
//   const [attendanceData, setAttendanceData] = useState<StudentAttendance[]>([]);
//   const [currentDate, setCurrentDate] = useState<string>(
//     new Date().toISOString().slice(0, 10)
//   );

//   useEffect(() => {
//     // Generate mock attendance data for the current date
//     const todayAttendance = mockStudents.map((student) => {
//       // Create a mock attendance record for each student
//       const attendance = {
//         id: `A-${student.id}-${currentDate}`,
//         studentId: student.id,
//         date: currentDate,
//         // Randomly assign initial status for demonstration
//         status: ['Present', 'Absent', 'Leave'][Math.floor(Math.random() * 3)] as 'Present' | 'Absent' | 'Leave',
//       };
//       return { student, attendance };
//     });
//     setAttendanceData(todayAttendance);
//   }, [currentDate]);

//   const handleStatusChange = (studentId: string, newStatus: 'Present' | 'Absent' | 'Leave') => {
//     setAttendanceData(prevData =>
//       prevData.map(record =>
//         record.student.id === studentId
//           ? { ...record, attendance: { ...record.attendance, status: newStatus } }
//           : record
//       )
//     );
//   };

//   return (
//     <div className="hostel-attendance-container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2 style={{ color: '#333' }}>College Hostel Attendance</h2>
      
//       <div style={{ marginBottom: '20px' }}>
//         <label htmlFor="attendance-date" style={{ marginRight: '10px' }}>Select Date:</label>
//         <input
//           id="attendance-date"
//           type="date"
//           value={currentDate}
//           onChange={(e) => setCurrentDate(e.target.value)}
//           style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//         />
//       </div>

//       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead style={{ backgroundColor: '#f2f2f2' }}>
//           <tr>
//             <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Student Name</th>
//             <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Hostel Room</th>
//             <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Course</th>
//             <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceData.map(record => (
//             <tr key={record.student.id}>
//               <td style={{ padding: '12px', border: '1px solid #ddd' }}>{record.student.name}</td>
//               <td style={{ padding: '12px', border: '1px solid #ddd' }}>{record.student.hostelRoom}</td>
//               <td style={{ padding: '12px', border: '1px solid #ddd' }}>{record.student.course}</td>
//               <td style={{ padding: '12px', border: '1px solid #ddd' }}>
//                 <select
//                   value={record.attendance.status}
//                   onChange={(e) =>
//                     handleStatusChange(
//                       record.student.id,
//                       e.target.value as 'Present' | 'Absent' | 'Leave'
//                     )
//                   }
//                   style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//                 >
//                   <option value="Present">Present</option>
//                   <option value="Absent">Absent</option>
//                   <option value="Leave">On Leave</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default HostelAttendance;








// src/YourChildHostelAttendance.tsx

// import React from 'react';

// // 1. Define the data types for clarity and structure
// interface Student {
//   name: string;
//   hostelRoom: string;
//   course: string;
// }

// interface AttendanceRecord {
//   date: string;
//   status: 'Present' | 'Absent' | 'Leave';
// }

// // 2. Mock the data as you would receive it for a single child
// //    In a real app, this data would be fetched from an API
// const mockChildData: Student = {
//   name: 'Jane Smith',
//   hostelRoom: 'B-205',
//   course: 'B.Sc'
// };

// const mockAttendanceHistory: AttendanceRecord[] = [
//   { date: '2025-09-01', status: 'Present' },
//   { date: '2025-08-31', status: 'Present' },
//   { date: '2025-08-30', status: 'Absent' },
//   { date: '2025-08-29', status: 'Leave' },
//   { date: '2025-08-28', status: 'Present' },
// ];

// const YourChildHostelAttendance: React.FC = () => {
//   return (
//     <div className="parent-portal-container" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '700px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
//       <h2 style={{ textAlign: 'center', color: '#333' }}>Your Child's Hostel Attendance</h2>
//       <hr style={{ margin: '20px 0' }} />

//       {/* Student Information Section */}
//       <div style={{ marginBottom: '25px' }}>
//         <h3 style={{ color: '#555' }}>Student Details</h3>
//         <p><strong>Name:</strong> {mockChildData.name}</p>
//         <p><strong>Hostel Room:</strong> {mockChildData.hostelRoom}</p>
//         <p><strong>Course:</strong> {mockChildData.course}</p>
//       </div>
      
//       {/* Attendance History Section */}
//       <div>
//         <h3 style={{ color: '#555' }}>Recent Attendance History</h3>
//         <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
//           <thead style={{ backgroundColor: '#f2f2f2' }}>
//             <tr>
//               <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Date</th>
//               <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {mockAttendanceHistory.map((record, index) => (
//               <tr key={index}>
//                 <td style={{ padding: '12px', border: '1px solid #ddd' }}>{record.date}</td>
//                 <td 
//                   style={{ 
//                     padding: '12px', 
//                     border: '1px solid #ddd', 
//                     fontWeight: 'bold',
//                     color: 
//                       record.status === 'Present' ? '#28a745' :
//                       record.status === 'Absent' ? '#dc3545' :
//                       '#ffc107'
//                   }}
//                 >
//                   {record.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default YourChildHostelAttendance;

// import React, { useState } from 'react';
// import { Calendar, User, MapPin, Clock, Filter, Download, Search, Eye } from 'lucide-react';

// const YourChildHostelAttendance = () => {
//   const [selectedMonth, setSelectedMonth] = useState('2025-01');
//   const [selectedStudent, setSelectedStudent] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   // Helper functions
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Present': return 'text-green-800 bg-green-100';
//       case 'Absent': return 'text-red-800 bg-red-100';
//       case 'Late Check-in': return 'text-orange-800 bg-orange-100';
//       default: return 'text-gray-800 bg-gray-100';
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', { 
//       day: '2-digit', 
//       month: 'short', 
//       year: 'numeric' 
//     });
//   };

//   // Mock data for hostel attendance
//   const students = [
//     {
//       id: 'STU001',
//       name: 'Arjun Sharma',
//       rollNo: 'CSE2021001',
//       room: 'A-101',
//       hostel: 'Sunrise Hostel',
//       contact: '+91 9876543210',
//       parentContact: '+91 9876543211'
//     },
//     {
//       id: 'STU002',
//       name: 'Priya Patel',
//       rollNo: 'ECE2021002',
//       room: 'B-205',
//       hostel: 'Galaxy Hostel',
//       contact: '+91 9876543212',
//       parentContact: '+91 9876543213'
//     },
//     {
//       id: 'STU003',
//       name: 'Rahul Kumar',
//       rollNo: 'ME2021003',
//       room: 'C-304',
//       hostel: 'Tech Hostel',
//       contact: '+91 9876543214',
//       parentContact: '+91 9876543215'
//     }
//   ];

//   const attendanceData = [
//     { date: '2025-01-01', studentId: 'STU001', checkIn: '18:30', checkOut: '07:45', status: 'Present' },
//     { date: '2025-01-01', studentId: 'STU002', checkIn: '19:15', checkOut: '08:00', status: 'Present' },
//     { date: '2025-01-01', studentId: 'STU003', checkIn: null, checkOut: null, status: 'Absent' },
//     { date: '2025-01-02', studentId: 'STU001', checkIn: '20:00', checkOut: '07:30', status: 'Late Check-in' },
//     { date: '2025-01-02', studentId: 'STU002', checkIn: '18:45', checkOut: '07:55', status: 'Present' },
//     { date: '2025-01-02', studentId: 'STU003', checkIn: '18:20', checkOut: '08:10', status: 'Present' },
//     { date: '2025-01-03', studentId: 'STU001', checkIn: '19:00', checkOut: '07:40', status: 'Present' },
//     { date: '2025-01-03', studentId: 'STU002', checkIn: null, checkOut: null, status: 'Absent' },
//     { date: '2025-01-03', studentId: 'STU003', checkIn: '18:55', checkOut: '07:50', status: 'Present' },
//   ];

//   // Calculate attendance statistics
//   const calculateStats = (studentId) => {
//     const studentAttendance = attendanceData.filter(record => 
//       selectedStudent === 'all' ? true : record.studentId === studentId
//     );
//     const total = studentAttendance.length;
//     const present = studentAttendance.filter(record => record.status === 'Present' || record.status === 'Late Check-in').length;
//     const absent = studentAttendance.filter(record => record.status === 'Absent').length;
//     const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    
//     return { total, present, absent, percentage };
//   };

//   const filteredStudents = students.filter(student =>
//     student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 mb-2">Hostel Attendance Management</h1>
//               <p className="text-gray-600">Monitor and track student hostel attendance records</p>
//             </div>
//             <div className="flex gap-2">
//               <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
//                 <Download size={16} />
//                 Export Report
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Search Student</label>
//               <div className="relative">
//                 <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Name or Roll No."
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
//               <select
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={selectedStudent}
//                 onChange={(e) => setSelectedStudent(e.target.value)}
//               >
//                 <option value="all">All Students</option>
//                 {students.map(student => (
//                   <option key={student.id} value={student.id}>
//                     {student.name} ({student.rollNo})
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Month/Year</label>
//               <input
//                 type="month"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={selectedMonth}
//                 onChange={(e) => setSelectedMonth(e.target.value)}
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
//               <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
//                 <Filter size={16} />
//                 Apply Filters
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Students</p>
//                 <p className="text-2xl font-bold text-gray-900">{filteredStudents.length}</p>
//               </div>
//               <User className="h-8 w-8 text-blue-600" />
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Present Today</p>
//                 <p className="text-2xl font-bold text-green-600">
//                   {attendanceData.filter(r => r.date === '2025-01-03' && r.status !== 'Absent').length}
//                 </p>
//               </div>
//               <Calendar className="h-8 w-8 text-green-600" />
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Absent Today</p>
//                 <p className="text-2xl font-bold text-red-600">
//                   {attendanceData.filter(r => r.date === '2025-01-03' && r.status === 'Absent').length}
//                 </p>
//               </div>
//               <Clock className="h-8 w-8 text-red-600" />
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Average Attendance</p>
//                 <p className="text-2xl font-bold text-blue-600">85.2%</p>
//               </div>
//               <MapPin className="h-8 w-8 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         {/* Student Details */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Student List */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm border">
//               <div className="p-6 border-b">
//                 <h2 className="text-lg font-semibold text-gray-900">Students</h2>
//               </div>
//               <div className="max-h-96 overflow-y-auto">
//                 {filteredStudents.map(student => {
//                   const stats = calculateStats(student.id);
//                   return (
//                     <div
//                       key={student.id}
//                       className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
//                         selectedStudent === student.id ? 'bg-blue-50 border-blue-200' : ''
//                       }`}
//                       onClick={() => setSelectedStudent(student.id)}
//                     >
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="font-medium text-gray-900">{student.name}</h3>
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           stats.percentage >= 90 ? 'bg-green-100 text-green-800' :
//                           stats.percentage >= 75 ? 'bg-yellow-100 text-yellow-800' :
//                           'bg-red-100 text-red-800'
//                         }`}>
//                           {stats.percentage}%
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-600 mb-1">{student.rollNo}</p>
//                       <p className="text-sm text-gray-500">{student.hostel} - {student.room}</p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Attendance Details */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-sm border">
//               <div className="p-6 border-b">
//                 <h2 className="text-lg font-semibold text-gray-900">Attendance Records</h2>
//                 {selectedStudent !== 'all' && (
//                   <p className="text-gray-600 mt-1">
//                     Showing records for {students.find(s => s.id === selectedStudent)?.name}
//                   </p>
//                 )}
//               </div>
              
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {attendanceData
//                       .filter(record => selectedStudent === 'all' || record.studentId === selectedStudent)
//                       .map((record, index) => {
//                         const student = students.find(s => s.id === record.studentId);
//                         return (
//                           <tr key={index} className="hover:bg-gray-50">
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                               {formatDate(record.date)}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div>
//                                 <div className="text-sm font-medium text-gray-900">{student?.name}</div>
//                                 <div className="text-sm text-gray-500">{student?.rollNo}</div>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                               {record.checkIn || '-'}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                               {record.checkOut || '-'}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
//                                 {record.status}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                               <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
//                                 <Eye size={14} />
//                                 View
//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Detailed Student Information */}
//             {selectedStudent !== 'all' && (() => {
//               const student = students.find(s => s.id === selectedStudent);
//               const stats = calculateStats(selectedStudent);
              
//               return (
//                 <div className="mt-6 bg-white rounded-lg shadow-sm border">
//                   <div className="p-6 border-b">
//                     <h2 className="text-lg font-semibold text-gray-900">Student Details</h2>
//                   </div>
//                   <div className="p-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <h3 className="font-medium text-gray-900 mb-3">Personal Information</h3>
//                         <div className="space-y-2">
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Name:</span>
//                             <span className="font-medium">{student?.name}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Roll Number:</span>
//                             <span className="font-medium">{student?.rollNo}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Room:</span>
//                             <span className="font-medium">{student?.room}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Hostel:</span>
//                             <span className="font-medium">{student?.hostel}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Contact:</span>
//                             <span className="font-medium">{student?.contact}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Parent Contact:</span>
//                             <span className="font-medium">{student?.parentContact}</span>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div>
//                         <h3 className="font-medium text-gray-900 mb-3">Attendance Summary</h3>
//                         <div className="space-y-2">
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Total Days:</span>
//                             <span className="font-medium">{stats.total}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Present:</span>
//                             <span className="font-medium text-green-600">{stats.present}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Absent:</span>
//                             <span className="font-medium text-red-600">{stats.absent}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Attendance %:</span>
//                             <span className={`font-bold ${
//                               stats.percentage >= 90 ? 'text-green-600' :
//                               stats.percentage >= 75 ? 'text-yellow-600' :
//                               'text-red-600'
//                             }`}>
//                               {stats.percentage}%
//                             </span>
//                           </div>
//                         </div>
                        
//                         {/* Progress Bar */}
//                         <div className="mt-4">
//                           <div className="flex justify-between text-sm text-gray-600 mb-1">
//                             <span>Attendance Rate</span>
//                             <span>{stats.percentage}%</span>
//                           </div>
//                           <div className="w-full bg-gray-200 rounded-full h-2">
//                             <div 
//                               className={`h-2 rounded-full ${
//                                 stats.percentage >= 90 ? 'bg-green-500' :
//                                 stats.percentage >= 75 ? 'bg-yellow-500' :
//                                 'bg-red-500'
//                               }`}
//                               style={{ width: `${stats.percentage}%` }}
//                             ></div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })()}
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white rounded-lg shadow-sm border">
//           <div className="p-6 border-b">
//             <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
//           </div>
//           <div className="p-6">
//             <div className="space-y-3">
//               <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
//                 <div className="flex items-center gap-3">
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   <span className="text-sm font-medium">Priya Patel checked in at 18:45</span>
//                 </div>
//                 <span className="text-xs text-gray-500">Today, 6:45 PM</span>
//               </div>
              
//               <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
//                 <div className="flex items-center gap-3">
//                   <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                   <span className="text-sm font-medium">Arjun Sharma late check-in at 20:00</span>
//                 </div>
//                 <span className="text-xs text-gray-500">Yesterday, 8:00 PM</span>
//               </div>
              
//               <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
//                 <div className="flex items-center gap-3">
//                   <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                   <span className="text-sm font-medium">Rahul Kumar marked absent</span>
//                 </div>
//                 <span className="text-xs text-gray-500">Jan 1, 2025</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default YourChildHostelAttendance;


// src/App.tsx

// import React from 'react';


// // --- Data Structures ---
// type Student = {
//   id: string;
//   name: string;
//   email: string;
//   hostel: string;
//   roomNumber: string;
//   isAttending: boolean;
// };

// // --- Mock Data ---
// const mockStudents: Student[] = [
//   {
//     id: 'S101',
//     name: 'Alice Johnson',
//     email: 'alice.j@college.edu',
//     hostel: 'Hostel A',
//     roomNumber: '101',
//     isAttending: true,
//   },
//   {
//     id: 'S102',
//     name: 'Bob Williams',
//     email: 'bob.w@college.edu',
//     hostel: 'Hostel A',
//     roomNumber: '102',
//     isAttending: false,
//   },
//   {
//     id: 'S103',
//     name: 'Charlie Davis',
//     email: 'charlie.d@college.edu',
//     hostel: 'Hostel A',
//     roomNumber: '101',
//     isAttending: true,
//   },
//   {
//     id: 'S104',
//     name: 'Diana Evans',
//     email: 'diana.e@college.edu',
//     hostel: 'Hostel B',
//     roomNumber: '205',
//     isAttending: true,
//   },
// ];

// // --- Main App Component ---
// function Yourchildhostelattendance() {
//   // Group students by hostel and then by room number
//   const groupedByHostelAndRoom = mockStudents.reduce((acc, student) => {
//     if (!acc[student.hostel]) {
//       acc[student.hostel] = {};
//     }
//     if (!acc[student.hostel][student.roomNumber]) {
//       acc[student.hostel][student.roomNumber] = [];
//     }
//     acc[student.hostel][student.roomNumber].push(student);
//     return acc;
//   }, {} as { [hostel: string]: { [room: string]: Student[] } });

//   return (
//     <div className="container mx-auto p-4">
//       <header className="text-center my-8">
//         <h1 className="text-4xl font-extrabold text-blue-800">College ERP System</h1>
//       </header>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Hostel and Room Details Section */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Hostel and Room Details</h2>
//           {Object.entries(groupedByHostelAndRoom).map(([hostel, rooms]) => (
//             <div key={hostel} className="mb-6">
//               <h3 className="text-xl font-semibold mb-2">{hostel}</h3>
//               {Object.entries(rooms).map(([room, studentsInRoom]) => (
//                 <div key={room} className="border p-4 mb-4 rounded-lg shadow-sm">
//                   <h4 className="text-lg font-medium mb-2">Room Number: {room}</h4>
//                   <ul className="list-disc list-inside">
//                     {studentsInRoom.map((student) => (
//                       <li key={student.id} className="text-gray-700">
//                         <span className="font-bold">{student.name}</span> ({student.id})
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* Attendance List Section */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Daily Attendance</h2>
//           <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Student ID
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {mockStudents.map((student) => (
//                 <tr key={student.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       student.isAttending ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                     }`}>
//                       {student.isAttending ? 'Present' : 'Absent'}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Yourchildhostelattendance;


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
        <h1 className="text-4xl font-extrabold text-blue-800">College ERP System</h1>
        <p className="text-lg text-gray-600">Single Room View</p>
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