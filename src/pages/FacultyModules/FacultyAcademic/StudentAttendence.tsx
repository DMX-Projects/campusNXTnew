

// // import React, { useState, useEffect } from 'react';
// // import { Moon, Sun, Users, Calendar, Clock, Filter, Save, ArrowLeft } from 'lucide-react';

// // // Types
// // interface Student {
// //   id: string;
// //   name: string;
// //   rollNo: string;
// //   status: 'Present' | 'Absent' | 'Leave';
// // }

// // interface ClassInfo {
// //   id: string;
// //   subject: string;
// //   department: string;
// //   year: number;
// //   semester: number;
// //   section: string;
// //   startTime: string;
// //   endTime: string;
// //   students: Student[];
// // }

// // interface Filters {
// //   department: string;
// //   year: string;
// //   semester: string;
// //   section: string;
// // }

// // const FacultyStudentAttendance: React.FC = () => {
// //   const [isDarkMode, setIsDarkMode] = useState(false);
// //   const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
// //   const [filters, setFilters] = useState<Filters>({
// //     department: '',
// //     year: '',
// //     semester: '',
// //     section: ''
// //   });
// //   const [currentTime, setCurrentTime] = useState(new Date());

// //   // Mock data for classes
// //   const [classes] = useState<ClassInfo[]>([
// //     {
// //       id: '1',
// //       subject: 'Data Structures',
// //       department: 'CSE',
// //       year: 2,
// //       semester: 3,
// //       section: 'A',
// //       startTime: '09:00',
// //       endTime: '10:00',
// //       students: [
// //         { id: '1', name: 'John Doe', rollNo: '20CS001', status: 'Present' },
// //         { id: '2', name: 'Jane Smith', rollNo: '20CS002', status: 'Absent' },
// //         { id: '3', name: 'Mike Johnson', rollNo: '20CS003', status: 'Present' },
// //         { id: '4', name: 'Sarah Wilson', rollNo: '20CS004', status: 'Leave' },
// //       ]
// //     },
// //     {
// //       id: '2',
// //       subject: 'Database Management',
// //       department: 'CSE',
// //       year: 3,
// //       semester: 5,
// //       section: 'B',
// //       startTime: '11:00',
// //       endTime: '12:00',
// //       students: [
// //         { id: '5', name: 'Alice Brown', rollNo: '19CS021', status: 'Present' },
// //         { id: '6', name: 'Bob Davis', rollNo: '19CS022', status: 'Present' },
// //         { id: '7', name: 'Carol Miller', rollNo: '19CS023', status: 'Absent' },
// //       ]
// //     },
// //     {
// //       id: '3',
// //       subject: 'Digital Electronics',
// //       department: 'ECE',
// //       year: 2,
// //       semester: 4,
// //       section: 'A',
// //       startTime: '14:00',
// //       endTime: '15:00',
// //       students: [
// //         { id: '8', name: 'David Lee', rollNo: '20EC001', status: 'Present' },
// //         { id: '9', name: 'Eva Garcia', rollNo: '20EC002', status: 'Present' },
// //         { id: '10', name: 'Frank Taylor', rollNo: '20EC003', status: 'Leave' },
// //       ]
// //     }
// //   ]);

// //   // Update current time every minute
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date());
// //     }, 60000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // Check if current time is within class time
// //   const isClassActive = (classInfo: ClassInfo): boolean => {
// //     const now = currentTime;
// //     const currentTimeStr = now.getHours().toString().padStart(2, '0') + ':' + 
// //                           now.getMinutes().toString().padStart(2, '0');
// //     return currentTimeStr >= classInfo.startTime && currentTimeStr <= classInfo.endTime;
// //   };

// //   // Filter classes based on selected filters
// //   const filteredClasses = classes.filter(classItem => {
// //     return (
// //       (!filters.department || classItem.department === filters.department) &&
// //       (!filters.year || classItem.year.toString() === filters.year) &&
// //       (!filters.semester || classItem.semester.toString() === filters.semester) &&
// //       (!filters.section || classItem.section === filters.section)
// //     );
// //   });

// //   // Get unique filter options
// //   const departments = [...new Set(classes.map(c => c.department))];
// //   const years = [...new Set(classes.map(c => c.year.toString()))];
// //   const semesters = [...new Set(classes.map(c => c.semester.toString()))];
// //   const sections = [...new Set(classes.map(c => c.section))];

// //   const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Leave') => {
// //     if (selectedClass && isClassActive(selectedClass)) {
// //       const updatedStudents = selectedClass.students.map(student =>
// //         student.id === studentId ? { ...student, status } : student
// //       );
// //       setSelectedClass({ ...selectedClass, students: updatedStudents });
// //     }
// //   };

// //   const handleSaveAttendance = () => {
// //     if (selectedClass) {
// //       // Here you would typically save to backend
// //       alert('Attendance saved successfully!');
// //     }
// //   };

// //   const resetFilters = () => {
// //     setFilters({ department: '', year: '', semester: '', section: '' });
// //   };

// //   const themeClasses = isDarkMode 
// //     ? 'bg-gray-900 text-white' 
// //     : 'bg-gray-50 text-gray-900';

// //   if (selectedClass) {
// //     const isActive = isClassActive(selectedClass);
    
// //     return (
// //       <div className={`min-h-screen transition-colors duration-300 ${themeClasses}`}>
// //         <div className="container mx-auto px-4 py-6">
// //           {/* Header */}
// //           <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-6`}>
// //             <div className="flex items-center justify-between mb-4">
// //               <div className="flex items-center gap-4">
// //                 <button
// //                   onClick={() => setSelectedClass(null)}
// //                   className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
// //                     isDarkMode 
// //                       ? 'bg-gray-700 hover:bg-gray-600' 
// //                       : 'bg-gray-200 hover:bg-gray-300'
// //                   } transition-colors`}
// //                 >
// //                   <ArrowLeft size={16} />
// //                   Back
// //                 </button>
// //                 <h1 className="text-2xl font-bold">Attendance - {selectedClass.subject}</h1>
// //                 {isActive && (
// //                   <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
// //                     LIVE
// //                   </span>
// //                 )}
// //               </div>
// //               <button
// //                 onClick={() => setIsDarkMode(!isDarkMode)}
// //                 className={`p-2 rounded-lg ${
// //                   isDarkMode 
// //                     ? 'bg-gray-700 hover:bg-gray-600' 
// //                     : 'bg-gray-200 hover:bg-gray-300'
// //                 } transition-colors`}
// //               >
// //                 {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
// //               </button>
// //             </div>

// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// //               <div>
// //                 <span className="font-medium">Department:</span> {selectedClass.department}
// //               </div>
// //               <div>
// //                 <span className="font-medium">Year:</span> {selectedClass.year}
// //               </div>
// //               <div>
// //                 <span className="font-medium">Semester:</span> {selectedClass.semester}
// //               </div>
// //               <div>
// //                 <span className="font-medium">Section:</span> {selectedClass.section}
// //               </div>
// //             </div>

// //             <div className="mt-4 flex items-center gap-4 text-sm">
// //               <div className="flex items-center gap-2">
// //                 <Clock size={16} />
// //                 <span>Time: {selectedClass.startTime} - {selectedClass.endTime}</span>
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <Calendar size={16} />
// //                 <span>Date: {currentTime.toLocaleDateString()}</span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Attendance Table */}
// //           <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
// //             <div className="p-4 border-b border-gray-200 dark:border-gray-700">
// //               <div className="flex items-center justify-between">
// //                 <h2 className="text-lg font-semibold">Student Attendance</h2>
// //                 {isActive && (
// //                   <button
// //                     onClick={handleSaveAttendance}
// //                     className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
// //                   >
// //                     <Save size={16} />
// //                     Save Attendance
// //                   </button>
// //                 )}
// //               </div>
// //               {!isActive && (
// //                 <p className="text-yellow-600 dark:text-yellow-400 text-sm mt-2">
// //                   Attendance marking is disabled. Class time: {selectedClass.startTime} - {selectedClass.endTime}
// //                 </p>
// //               )}
// //             </div>

// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
// //                   <tr>
// //                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
// //                       Roll No
// //                     </th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
// //                       Student Name
// //                     </th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
// //                       Status
// //                     </th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
// //                   {selectedClass.students.map((student) => (
// //                     <tr key={student.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// //                         {student.rollNo}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                         {student.name}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <select
// //                           value={student.status}
// //                           onChange={(e) => handleStatusChange(student.id, e.target.value as 'Present' | 'Absent' | 'Leave')}
// //                           disabled={!isActive}
// //                           className={`px-3 py-2 rounded-lg border text-sm ${
// //                             isDarkMode 
// //                               ? 'bg-gray-700 border-gray-600' 
// //                               : 'bg-white border-gray-300'
// //                           } ${!isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${
// //                             student.status === 'Present' ? 'text-green-600' :
// //                             student.status === 'Absent' ? 'text-red-600' : 'text-yellow-600'
// //                           }`}
// //                         >
// //                           <option value="Present">Present</option>
// //                           <option value="Absent">Absent</option>
// //                           <option value="Leave">Leave</option>
// //                         </select>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className={`min-h-screen transition-colors duration-300 ${themeClasses}`}>
// //       <div className="container mx-auto px-4 py-6">
// //         {/* Header */}
// //         <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-6`}>
// //           <div className="flex items-center justify-between mb-4">
// //             <h1 className="text-3xl font-bold">Faculty Attendance System</h1>
// //             <button
// //               onClick={() => setIsDarkMode(!isDarkMode)}
// //               className={`p-3 rounded-lg ${
// //                 isDarkMode 
// //                   ? 'bg-gray-700 hover:bg-gray-600' 
// //                   : 'bg-gray-200 hover:bg-gray-300'
// //               } transition-colors`}
// //             >
// //               {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
// //             </button>
// //           </div>
          
// //           <div className="text-sm opacity-75">
// //             Current Time: {currentTime.toLocaleString()}
// //           </div>
// //         </div>

// //         {/* Filters */}
// //         <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-6`}>
// //           <div className="flex items-center gap-2 mb-4">
// //             <Filter size={20} />
// //             <h2 className="text-lg font-semibold">Filters</h2>
// //           </div>
          
// //           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
// //             <select
// //               value={filters.department}
// //               onChange={(e) => setFilters({...filters, department: e.target.value})}
// //               className={`px-4 py-2 rounded-lg border ${
// //                 isDarkMode 
// //                   ? 'bg-gray-700 border-gray-600' 
// //                   : 'bg-white border-gray-300'
// //               }`}
// //             >
// //               <option value="">All Departments</option>
// //               {departments.map(dept => (
// //                 <option key={dept} value={dept}>{dept}</option>
// //               ))}
// //             </select>

// //             <select
// //               value={filters.year}
// //               onChange={(e) => setFilters({...filters, year: e.target.value})}
// //               className={`px-4 py-2 rounded-lg border ${
// //                 isDarkMode 
// //                   ? 'bg-gray-700 border-gray-600' 
// //                   : 'bg-white border-gray-300'
// //               }`}
// //             >
// //               <option value="">All Years</option>
// //               {years.map(year => (
// //                 <option key={year} value={year}>Year {year}</option>
// //               ))}
// //             </select>

// //             <select
// //               value={filters.semester}
// //               onChange={(e) => setFilters({...filters, semester: e.target.value})}
// //               className={`px-4 py-2 rounded-lg border ${
// //                 isDarkMode 
// //                   ? 'bg-gray-700 border-gray-600' 
// //                   : 'bg-white border-gray-300'
// //               }`}
// //             >
// //               <option value="">All Semesters</option>
// //               {semesters.map(sem => (
// //                 <option key={sem} value={sem}>Semester {sem}</option>
// //               ))}
// //             </select>

// //             <select
// //               value={filters.section}
// //               onChange={(e) => setFilters({...filters, section: e.target.value})}
// //               className={`px-4 py-2 rounded-lg border ${
// //                 isDarkMode 
// //                   ? 'bg-gray-700 border-gray-600' 
// //                   : 'bg-white border-gray-300'
// //               }`}
// //             >
// //               <option value="">All Sections</option>
// //               {sections.map(section => (
// //                 <option key={section} value={section}>Section {section}</option>
// //               ))}
// //             </select>
// //           </div>

// //           <button
// //             onClick={resetFilters}
// //             className={`px-4 py-2 rounded-lg ${
// //               isDarkMode 
// //                 ? 'bg-gray-700 hover:bg-gray-600' 
// //                 : 'bg-gray-200 hover:bg-gray-300'
// //             } transition-colors`}
// //           >
// //             Clear Filters
// //           </button>
// //         </div>

// //         {/* Classes Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredClasses.map((classItem) => {
// //             const isActive = isClassActive(classItem);
// //             return (
// //               <div
// //                 key={classItem.id}
// //                 onClick={() => setSelectedClass(classItem)}
// //                 className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} 
// //                   rounded-lg shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg border-l-4 ${
// //                   isActive ? 'border-green-500' : 'border-gray-300'
// //                 }`}
// //               >
// //                 <div className="flex items-start justify-between mb-4">
// //                   <div className="flex items-center gap-2">
// //                     <Users size={20} className="text-blue-500" />
// //                     <h3 className="text-lg font-semibold">{classItem.subject}</h3>
// //                   </div>
// //                   {isActive && (
// //                     <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
// //                       LIVE
// //                     </span>
// //                   )}
// //                 </div>

// //                 <div className="space-y-2 text-sm">
// //                   <div className="flex justify-between">
// //                     <span className="font-medium">Department:</span>
// //                     <span>{classItem.department}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="font-medium">Year & Sem:</span>
// //                     <span>{classItem.year}-{classItem.semester}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="font-medium">Section:</span>
// //                     <span>{classItem.section}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="font-medium">Time:</span>
// //                     <span>{classItem.startTime} - {classItem.endTime}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="font-medium">Students:</span>
// //                     <span>{classItem.students.length}</span>
// //                   </div>
// //                 </div>

// //                 <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
// //                   <div className="flex items-center justify-between text-xs">
// //                     <span className={isActive ? 'text-green-600' : 'text-gray-500'}>
// //                       {isActive ? 'Click to mark attendance' : 'Attendance disabled'}
// //                     </span>
// //                     <Clock size={14} className={isActive ? 'text-green-500' : 'text-gray-400'} />
// //                   </div>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {filteredClasses.length === 0 && (
// //           <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-12 text-center`}>
// //             <Users size={48} className="mx-auto mb-4 opacity-50" />
// //             <h3 className="text-lg font-medium mb-2">No Classes Found</h3>
// //             <p className="text-gray-500">Try adjusting your filters to see more classes.</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default FacultyStudentAttendance;

//  import React, { useState, useEffect } from 'react';
// import { Users, Calendar, Clock, Filter, Save, ArrowLeft } from 'lucide-react';

// // Types
// interface Student {
//   id: string;
//   name: string;
//   rollNo: string;
//   status: 'Present' | 'Absent' | 'Leave';
// }

// interface ClassInfo {
//   id: string;
//   subject: string;
//   department: string;
//   year: number;
//   semester: number;
//   section: string;
//   startTime: string;
//   endTime: string;
//   students: Student[];
// }

// interface Filters {
//   department: string;
//   year: string;
//   semester: string;
//   section: string;
// }

// const FacultyStudentAttendance: React.FC = () => {
//   const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
//   const [filters, setFilters] = useState<Filters>({
//     department: '',
//     year: '',
//     semester: '',
//     section: ''
//   });
//   const [currentTime, setCurrentTime] = useState(new Date());

//   const [classes] = useState<ClassInfo[]>([
//     {
//       id: '1',
//       subject: 'Data Structures',
//       department: 'CSE',
//       year: 2,
//       semester: 3,
//       section: 'A',
//       startTime: '09:00',
//       endTime: '10:00',
//       students: [
//         { id: '1', name: 'John Doe', rollNo: '20CS001', status: 'Present' },
//         { id: '2', name: 'Jane Smith', rollNo: '20CS002', status: 'Absent' },
//         { id: '3', name: 'Mike Johnson', rollNo: '20CS003', status: 'Present' },
//         { id: '4', name: 'Sarah Wilson', rollNo: '20CS004', status: 'Leave' },
//       ]
//     },
//     {
//       id: '2',
//       subject: 'Database Management',
//       department: 'CSE',
//       year: 3,
//       semester: 5,
//       section: 'B',
//       startTime: '11:00',
//       endTime: '12:00',
//       students: [
//         { id: '5', name: 'Alice Brown', rollNo: '19CS021', status: 'Present' },
//         { id: '6', name: 'Bob Davis', rollNo: '19CS022', status: 'Present' },
//         { id: '7', name: 'Carol Miller', rollNo: '19CS023', status: 'Absent' },
//       ]
//     },
//     {
//       id: '3',
//       subject: 'Digital Electronics',
//       department: 'ECE',
//       year: 2,
//       semester: 4,
//       section: 'A',
//       startTime: '14:00',
//       endTime: '15:00',
//       students: [
//         { id: '8', name: 'David Lee', rollNo: '20EC001', status: 'Present' },
//         { id: '9', name: 'Eva Garcia', rollNo: '20EC002', status: 'Present' },
//         { id: '10', name: 'Frank Taylor', rollNo: '20EC003', status: 'Leave' },
//       ]
//     }
//   ]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);
//     return () => clearInterval(timer);
//   }, []);

//   const isClassActive = (classInfo: ClassInfo): boolean => {
//     const now = currentTime;
//     const currentTimeStr = now.getHours().toString().padStart(2, '0') + ':' +
//       now.getMinutes().toString().padStart(2, '0');
//     return currentTimeStr >= classInfo.startTime && currentTimeStr <= classInfo.endTime;
//   };

//   const filteredClasses = classes.filter(classItem => {
//     return (
//       (!filters.department || classItem.department === filters.department) &&
//       (!filters.year || classItem.year.toString() === filters.year) &&
//       (!filters.semester || classItem.semester.toString() === filters.semester) &&
//       (!filters.section || classItem.section === filters.section)
//     );
//   });

//   const departments = [...new Set(classes.map(c => c.department))];
//   const years = [...new Set(classes.map(c => c.year.toString()))];
//   const semesters = [...new Set(classes.map(c => c.semester.toString()))];
//   const sections = [...new Set(classes.map(c => c.section))];

//   const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Leave') => {
//     if (selectedClass && isClassActive(selectedClass)) {
//       const updatedStudents = selectedClass.students.map(student =>
//         student.id === studentId ? { ...student, status } : student
//       );
//       setSelectedClass({ ...selectedClass, students: updatedStudents });
//     }
//   };

//   const handleSaveAttendance = () => {
//     if (selectedClass) alert('Attendance saved successfully!');
//   };

//   const resetFilters = () => {
//     setFilters({ department: '', year: '', semester: '', section: '' });
//   };

//   if (selectedClass) {
//     const isActive = isClassActive(selectedClass);

//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
//         <div className="container mx-auto px-4 py-6">
//           {/* Header */}
//           <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={() => setSelectedClass(null)}
//                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
//                 >
//                   <ArrowLeft size={16} />
//                   Back
//                 </button>
//                 <h1 className="text-2xl font-bold">Attendance - {selectedClass.subject}</h1>
//                 {isActive && (
//                   <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
//                     LIVE
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//               <div><span className="font-medium">Department:</span> {selectedClass.department}</div>
//               <div><span className="font-medium">Year:</span> {selectedClass.year}</div>
//               <div><span className="font-medium">Semester:</span> {selectedClass.semester}</div>
//               <div><span className="font-medium">Section:</span> {selectedClass.section}</div>
//             </div>

//             <div className="mt-4 flex items-center gap-4 text-sm">
//               <div className="flex items-center gap-2"><Clock size={16} /><span>Time: {selectedClass.startTime} - {selectedClass.endTime}</span></div>
//               <div className="flex items-center gap-2"><Calendar size={16} /><span>Date: {currentTime.toLocaleDateString()}</span></div>
//             </div>
//           </div>

//           {/* Attendance Table */}
//           <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
//             <div className="p-4 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-lg font-semibold">Student Attendance</h2>
//                 {isActive && (
//                   <button
//                     onClick={handleSaveAttendance}
//                     className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
//                   >
//                     <Save size={16} /> Save Attendance
//                   </button>
//                 )}
//               </div>
//               {!isActive && (
//                 <p className="text-yellow-600 text-sm mt-2">
//                   Attendance marking is disabled. Class time: {selectedClass.startTime} - {selectedClass.endTime}
//                 </p>
//               )}
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Roll No</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Student Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {selectedClass.students.map((student) => (
//                     <tr key={student.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{student.rollNo}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm">{student.name}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <select
//                           value={student.status}
//                           onChange={(e) => handleStatusChange(student.id, e.target.value as 'Present' | 'Absent' | 'Leave')}
//                           disabled={!isActive}
//                           className={`px-3 py-2 rounded-lg border text-sm bg-white border-gray-300 ${
//                             !isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
//                           } ${
//                             student.status === 'Present' ? 'text-green-600' : student.status === 'Absent' ? 'text-red-600' : 'text-yellow-600'
//                           }`}
//                         >
//                           <option value="Present">Present</option>
//                           <option value="Absent">Absent</option>
//                           <option value="Leave">Leave</option>
//                         </select>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300">
//       <div className="container mx-auto px-4 py-6">
//         {/* Header */}
//         <div className=" bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-3xl font-bold">Faculty Attendance System</h1>
//           </div>
//           <div className="text-sm opacity-75">Current Time: {currentTime.toLocaleString()}</div>
//         </div>

//         {/* Filters */}
//         <div className=" bg-gray-50 text-gray-900 transition-colors duration-300">
//           <div className="flex items-center gap-2 mb-4">
//             <Filter size={20} />
//             <h2 className="text-lg font-semibold">Filters</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//             <select
//               value={filters.department}
//               onChange={(e) => setFilters({ ...filters, department: e.target.value })}
//               className="px-4 py-2 rounded-lg border bg-white border-gray-300"
//             >
//               <option value="">All Departments</option>
//               {departments.map(dept => (
//                 <option key={dept} value={dept}>{dept}</option>
//               ))}
//             </select>

//             <select
//               value={filters.year}
//               onChange={(e) => setFilters({ ...filters, year: e.target.value })}
//               className="px-4 py-2 rounded-lg border bg-white border-gray-300"
//             >
//               <option value="">All Years</option>
//               {years.map(year => (
//                 <option key={year} value={year}>Year {year}</option>
//               ))}
//             </select>

//             <select
//               value={filters.semester}
//               onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
//               className="px-4 py-2 rounded-lg border bg-white border-gray-300"
//             >
//               <option value="">All Semesters</option>
//               {semesters.map(sem => (
//                 <option key={sem} value={sem}>Semester {sem}</option>
//               ))}
//             </select>

//             <select
//               value={filters.section}
//               onChange={(e) => setFilters({ ...filters, section: e.target.value })}
//               className="px-4 py-2 rounded-lg border bg-white border-gray-300"
//             >
//               <option value="">All Sections</option>
//               {sections.map(section => (
//                 <option key={section} value={section}>Section {section}</option>
//               ))}
//             </select>
//           </div>

//           <button
//             onClick={resetFilters}
//             className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
//           >
//             Clear Filters
//           </button>
//         </div>

//         {/* Classes Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredClasses.map(classItem => {
//             const isActive = isClassActive(classItem);
//             return (
//               <div
//                 key={classItem.id}
//                 onClick={() => setSelectedClass(classItem)}
//                 className={`bg-white hover:bg-gray-50 rounded-lg shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg border-l-4 ${
//                   isActive ? 'border-green-500' : 'border-gray-300'
//                 }`}
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-2">
//                     <Users size={20} className="text-blue-500" />
//                     <h3 className="text-lg font-semibold">{classItem.subject}</h3>
//                   </div>
//                   {isActive && (
//                     <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
//                       LIVE
//                     </span>
//                   )}
//                 </div>

//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="font-medium">Department:</span>
//                     <span>{classItem.department}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium">Year &amp; Sem:</span>
//                     <span>{classItem.year}-{classItem.semester}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium">Section:</span>
//                     <span>{classItem.section}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium">Time:</span>
//                     <span>{classItem.startTime} - {classItem.endTime}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium">Students:</span>
//                     <span>{classItem.students.length}</span>
//                   </div>
//                 </div>

//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                   <div className="flex items-center justify-between text-xs">
//                     <span className={isActive ? 'text-green-600' : 'text-gray-500'}>
//                       {isActive ? 'Click to mark attendance' : 'Attendance disabled'}
//                     </span>
//                     <Clock size={14} className={isActive ? 'text-green-500' : 'text-gray-400'} />
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {filteredClasses.length === 0 && (
//           <div className="bg-gray-50 text-gray-900 transition-colors duration-300">
//             <Users size={48} className="mx-auto mb-4 opacity-50" />
//             <h3 className="text-lg font-medium mb-2">No Classes Found</h3>
//             <p className="text-gray-500">Try adjusting your filters to see more classes.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FacultyStudentAttendance;


import React, { useState, useEffect } from 'react';
import { Users, Calendar, Clock, Filter, Save, ArrowLeft, Moon, Sun } from 'lucide-react';

// Types
interface Student {
  id: string;
  name: string;
  rollNo: string;
  status: 'Present' | 'Absent' | 'Leave';
}

interface ClassInfo {
  id: string;
  subject: string;
  department: string;
  year: number;
  semester: number;
  section: string;
  startTime: string;
  endTime: string;
  students: Student[];
}

interface Filters {
  department: string;
  year: string;
  semester: string;
  section: string;
}

const FacultyStudentAttendance: React.FC = () => {
 
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  const [filters, setFilters] = useState<Filters>({
    department: '',
    year: '',
    semester: '',
    section: ''
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  const [classes] = useState<ClassInfo[]>([
    {
      id: '1',
      subject: 'Data Structures',
      department: 'CSE',
      year: 2,
      semester: 3,
      section: 'A',
      startTime: '09:00',
      endTime: '10:00',
      students: [
        { id: '1', name: 'John Doe', rollNo: '20CS001', status: 'Present' },
        { id: '2', name: 'Jane Smith', rollNo: '20CS002', status: 'Absent' },
        { id: '3', name: 'Mike Johnson', rollNo: '20CS003', status: 'Present' },
        { id: '4', name: 'Sarah Wilson', rollNo: '20CS004', status: 'Leave' },
      ]
    },
    {
      id: '2',
      subject: 'Database Management',
      department: 'CSE',
      year: 3,
      semester: 5,
      section: 'B',
      startTime: '11:00',
      endTime: '12:00',
      students: [
        { id: '5', name: 'Alice Brown', rollNo: '19CS021', status: 'Present' },
        { id: '6', name: 'Bob Davis', rollNo: '19CS022', status: 'Present' },
        { id: '7', name: 'Carol Miller', rollNo: '19CS023', status: 'Absent' },
      ]
    },
    {
      id: '3',
      subject: 'Digital Electronics',
      department: 'ECE',
      year: 2,
      semester: 4,
      section: 'A',
      startTime: '14:00',
      endTime: '15:00',
      students: [
        { id: '8', name: 'David Lee', rollNo: '20EC001', status: 'Present' },
        { id: '9', name: 'Eva Garcia', rollNo: '20EC002', status: 'Present' },
        { id: '10', name: 'Frank Taylor', rollNo: '20EC003', status: 'Leave' },
      ]
    }
  ]);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const isClassActive = (classInfo: ClassInfo): boolean => {
    const now = currentTime;
    const currentTimeStr = now.getHours().toString().padStart(2, '0') + ':' +
      now.getMinutes().toString().padStart(2, '0');
    return currentTimeStr >= classInfo.startTime && currentTimeStr <= classInfo.endTime;
  };

  const filteredClasses = classes.filter(classItem => {
    return (
      (!filters.department || classItem.department === filters.department) &&
      (!filters.year || classItem.year.toString() === filters.year) &&
      (!filters.semester || classItem.semester.toString() === filters.semester) &&
      (!filters.section || classItem.section === filters.section)
    );
  });

  const departments = [...new Set(classes.map(c => c.department))];
  const years = [...new Set(classes.map(c => c.year.toString()))];
  const semesters = [...new Set(classes.map(c => c.semester.toString()))];
  const sections = [...new Set(classes.map(c => c.section))];

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Leave') => {
    if (selectedClass && isClassActive(selectedClass)) {
      const updatedStudents = selectedClass.students.map(student =>
        student.id === studentId ? { ...student, status } : student
      );
      setSelectedClass({ ...selectedClass, students: updatedStudents });
    }
  };

  const handleSaveAttendance = () => {
    if (selectedClass) alert('Attendance saved successfully!');
  };

  const resetFilters = () => {
    setFilters({ department: '', year: '', semester: '', section: '' });
  };

  return (
  
      <div className="bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="container mx-auto px-4 py-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Faculty Attendance System</h1>
          
          </div>

          <div className="text-sm opacity-75 mb-6">Current Time: {currentTime.toLocaleString()}</div>

          {/* Conditional rendering for selectedClass */}
          {selectedClass ? (
            <div>
              {/* Back Header */}
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setSelectedClass(null)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white transition-colors"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <h1 className="text-2xl font-bold">Attendance - {selectedClass.subject}</h1>
                {isClassActive(selectedClass) && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    LIVE
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div><span className="font-medium">Department:</span> {selectedClass.department}</div>
                <div><span className="font-medium">Year:</span> {selectedClass.year}</div>
                <div><span className="font-medium">Semester:</span> {selectedClass.semester}</div>
                <div><span className="font-medium">Section:</span> {selectedClass.section}</div>
              </div>

              <div className="flex items-center gap-4 text-sm mb-6">
                <div className="flex items-center gap-2"><Clock size={16} /><span>Time: {selectedClass.startTime} - {selectedClass.endTime}</span></div>
                <div className="flex items-center gap-2"><Calendar size={16} /><span>Date: {currentTime.toLocaleDateString()}</span></div>
              </div>

              {/* Attendance Table */}
              <div className="rounded-lg shadow-md bg-white dark:bg-gray-800 transition-colors duration-300">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Student Attendance</h2>
                    {isClassActive(selectedClass) && (
                      <button
                        onClick={handleSaveAttendance}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Save size={16} /> Save Attendance
                      </button>
                    )}
                  </div>
                  {!isClassActive(selectedClass) && (
                    <p className="text-yellow-600 dark:text-yellow-400 text-sm mt-2">
                      Attendance marking is disabled. Class time: {selectedClass.startTime} - {selectedClass.endTime}
                    </p>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Roll No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {selectedClass.students.map(student => (
                        <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{student.rollNo}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{student.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={student.status}
                              onChange={(e) => handleStatusChange(student.id, e.target.value as 'Present' | 'Absent' | 'Leave')}
                              disabled={!isClassActive(selectedClass)}
                              className={`px-3 py-2 rounded-lg border text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                                !isClassActive(selectedClass) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                              } ${
                                student.status === 'Present' ? 'text-green-600' :
                                  student.status === 'Absent' ? 'text-red-600' : 'text-yellow-600'
                              }`}
                            >
                              <option value="Present">Present</option>
                              <option value="Absent">Absent</option>
                              <option value="Leave">Leave</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Filters */}
              <div className="rounded-lg shadow-md bg-white dark:bg-gray-800 p-6 mb-6 transition-colors duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <Filter size={20} />
                  <h2 className="text-lg font-semibold">Filters</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <select
                    value={filters.department}
                    onChange={e => setFilters({ ...filters, department: e.target.value })}
                    className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>

                  <select
                    value={filters.year}
                    onChange={e => setFilters({ ...filters, year: e.target.value })}
                    className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  >
                    <option value="">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>Year {year}</option>
                    ))}
                  </select>

                  <select
                    value={filters.semester}
                    onChange={e => setFilters({ ...filters, semester: e.target.value })}
                    className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  >
                    <option value="">All Semesters</option>
                    {semesters.map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>

                  <select
                    value={filters.section}
                    onChange={e => setFilters({ ...filters, section: e.target.value })}
                    className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  >
                    <option value="">All Sections</option>
                    {sections.map(section => (
                      <option key={section} value={section}>Section {section}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>

              {/* Classes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClasses.map(classItem => {
                  const isActive = isClassActive(classItem);
                  return (
                    <div
                      key={classItem.id}
                      onClick={() => setSelectedClass(classItem)}
                      className={`bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg border-l-4 ${
                        isActive ? 'border-green-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Users size={20} className="text-blue-500" />
                          <h3 className="text-lg font-semibold">{classItem.subject}</h3>
                        </div>
                        {isActive && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            LIVE
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">Department:</span>
                          <span>{classItem.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Year &amp; Sem:</span>
                          <span>{classItem.year}-{classItem.semester}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Section:</span>
                          <span>{classItem.section}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Time:</span>
                          <span>{classItem.startTime} - {classItem.endTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Students:</span>
                          <span>{classItem.students.length}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between text-xs">
                          <span className={isActive ? 'text-green-600' : 'text-gray-500 dark:text-gray-400'}>
                            {isActive ? 'Click to mark attendance' : 'Attendance disabled'}
                          </span>
                          <Clock size={14} className={isActive ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredClasses.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center transition-colors duration-300">
                  <Users size={48} className="mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Classes Found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters to see more classes.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
  
  );
};

export default FacultyStudentAttendance;
