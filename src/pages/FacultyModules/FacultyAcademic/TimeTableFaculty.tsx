

// import React, { useState, useEffect } from 'react';
// import { Plus, Filter, Clock, Users, BookOpen, User, ChevronLeft, ChevronRight, Calendar, Grid, List } from 'lucide-react';


// // TypeScript interfaces
// interface TimeSlot {
//   start: string;
//   end: string;
// }

// interface Class {
//   id: string;
//   subject: string;
//   faculty: string;
//   department: string;
//   room: string;
//   day: string;
//   timeSlot: TimeSlot;
//   students: number;
//   color: string;
//   section: string;
//   semester: string;
// }

// interface Department {
//   id: string;
//   name: string;
//   color: string;
// }

// const FacultyTimetable: React.FC = () => {
//   // View state
//   const [currentView, setCurrentView] = useState<'grid' | 'calendar'>('grid');
  
//   // Sample data
//   const [departments] = useState<Department[]>([
//     { id: '1', name: 'Computer Science', color: '#3B82F6' },
//     { id: '2', name: 'Mathematics', color: '#10B981' },
//     { id: '3', name: 'Physics', color: '#8B5CF6' },
//     { id: '4', name: 'Chemistry', color: '#F59E0B' },
//     { id: '5', name: 'English', color: '#EF4444' }
//   ]);

//   const [semesters] = useState<string[]>(['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester']);
  
//   const [sections] = useState<string[]>(['A', 'B', 'C', 'D', 'E']);

//   const [classes, setClasses] = useState<Class[]>([
//     {
//       id: '1',
//       subject: 'Data Structures',
//       faculty: 'Dr. Smith',
//       department: 'Computer Science',
//       room: 'CS-101',
//       day: 'Monday',
//       timeSlot: { start: '09:00', end: '10:00' },
//       students: 45,
//       color: '#3B82F6',
//       section: 'A',
//       semester: '3rd Semester'
//     },
//     {
//       id: '2',
//       subject: 'Calculus I',
//       faculty: 'Prof. Johnson',
//       department: 'Mathematics',
//       room: 'M-201',
//       day: 'Monday',
//       timeSlot: { start: '10:00', end: '11:00' },
//       students: 38,
//       color: '#10B981',
//       section: 'B',
//       semester: '1st Semester'
//     },
//     {
//       id: '3',
//       subject: 'Database Management',
//       faculty: 'Dr. Wilson',
//       department: 'Computer Science',
//       room: 'CS-102',
//       day: 'Tuesday',
//       timeSlot: { start: '14:00', end: '15:00' },
//       students: 42,
//       color: '#3B82F6',
//       section: 'A',
//       semester: '5th Semester'
//     },
//     {
//       id: '4',
//       subject: 'Quantum Physics',
//       faculty: 'Dr. Brown',
//       department: 'Physics',
//       room: 'P-301',
//       day: 'Wednesday',
//       timeSlot: { start: '11:00', end: '12:00' },
//       students: 28,
//       color: '#8B5CF6',
//       section: 'C',
//       semester: '6th Semester'
//     },
//     {
//       id: '5',
//       subject: 'Organic Chemistry',
//       faculty: 'Prof. Davis',
//       department: 'Chemistry',
//       room: 'C-201',
//       day: 'Thursday',
//       timeSlot: { start: '09:00', end: '10:00' },
//       students: 35,
//       color: '#F59E0B',
//       section: 'B',
//       semester: '4th Semester'
//     },
//     {
//       id: '6',
//       subject: 'Literature',
//       faculty: 'Dr. Miller',
//       department: 'English',
//       room: 'E-101',
//       day: 'Friday',
//       timeSlot: { start: '15:00', end: '16:00' },
//       students: 30,
//       color: '#EF4444',
//       section: 'A',
//       semester: '2nd Semester'
//     },
//     {
//       id: '7',
//       subject: 'Operating Systems',
//       faculty: 'Dr. Smith',
//       department: 'Computer Science',
//       room: 'CS-103',
//       day: 'Wednesday',
//       timeSlot: { start: '14:00', end: '15:00' },
//       students: 40,
//       color: '#3B82F6',
//       section: 'B',
//       semester: '5th Semester'
//     },
//     {
//       id: '8',
//       subject: 'Linear Algebra',
//       faculty: 'Prof. Johnson',
//       department: 'Mathematics',
//       room: 'M-202',
//       day: 'Friday',
//       timeSlot: { start: '10:00', end: '11:00' },
//       students: 33,
//       color: '#10B981',
//       section: 'A',
//       semester: '2nd Semester'
//     }
//   ]);

//   // Filter states
//   const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
//   const [selectedSemester, setSelectedSemester] = useState<string>('all');
//   const [selectedSection, setSelectedSection] = useState<string>('all');
//   const [selectedFaculty, setSelectedFaculty] = useState<string>('all');
  
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newClass, setNewClass] = useState<Partial<Class>>({
//     subject: '',
//     faculty: '',
//     department: '',
//     room: '',
//     day: 'Monday',
//     timeSlot: { start: '09:00', end: '10:00' },
//     students: 0,
//     section: 'A',
//     semester: '1st Semester'
//   });

//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
//   const timeSlots = [
//     '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
//   ];

//   // Get unique faculty members
//   const faculties = Array.from(new Set(classes.map(cls => cls.faculty)));

//   // Filter classes
//   const filteredClasses = classes.filter(cls => {
//     return (selectedDepartment === 'all' || cls.department === selectedDepartment) &&
//            (selectedSemester === 'all' || cls.semester === selectedSemester) &&
//            (selectedSection === 'all' || cls.section === selectedSection) &&
//            (selectedFaculty === 'all' || cls.faculty === selectedFaculty);
//   });

//   const getClassesForSlot = (day: string, time: string) => {
//     return filteredClasses.filter(cls => 
//       cls.day === day && cls.timeSlot.start === time
//     );
//   };

//   const handleAddClass = () => {
//     if (!newClass.subject || !newClass.faculty || !newClass.department) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     const department = departments.find(d => d.name === newClass.department);
//     const classToAdd: Class = {
//       id: Date.now().toString(),
//       subject: newClass.subject!,
//       faculty: newClass.faculty!,
//       department: newClass.department!,
//       room: newClass.room || 'TBA',
//       day: newClass.day!,
//       timeSlot: newClass.timeSlot!,
//       students: newClass.students || 0,
//       color: department?.color || '#6B7280',
//       section: newClass.section!,
//       semester: newClass.semester!
//     };

//     setClasses([...classes, classToAdd]);
//     setNewClass({
//       subject: '',
//       faculty: '',
//       department: '',
//       room: '',
//       day: 'Monday',
//       timeSlot: { start: '09:00', end: '10:00' },
//       students: 0,
//       section: 'A',
//       semester: '1st Semester'
//     });
//     setShowAddModal(false);
//   };

//   const handleDeleteClass = (classId: string) => {
//     setClasses(classes.filter(cls => cls.id !== classId));
//   };

//   // Calendar View Component
//   const CalendarView = () => (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//       <div className="p-4 border-b border-gray-200 bg-gray-50">
//         <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//           <Calendar className="w-5 h-5" />
//           Weekly Schedule
//         </h3>
//       </div>
      
//       <div className="grid grid-cols-6 gap-0 min-h-96">
//         {/* Header Row */}
//         <div className="bg-gray-100 p-4 font-semibold text-gray-700 border-r border-b border-gray-200 sticky top-0">
//           Time
//         </div>
//         {days.map(day => (
//           <div key={day} className="bg-gray-100 p-4 font-semibold text-gray-700 text-center border-r border-b border-gray-200 sticky top-0">
//             {day}
//           </div>
//         ))}

//         {/* Time Slots */}
//         {timeSlots.map(time => (
//           <React.Fragment key={time}>
//             <div className="p-4 font-medium text-gray-600 bg-gray-50 border-r border-b border-gray-200 min-h-20 flex items-center">
//               <div>
//                 <div className="text-sm">{time}</div>
//                 <div className="text-xs text-gray-400">
//                   {String(parseInt(time.split(':')[0]) + 1).padStart(2, '0')}:00
//                 </div>
//               </div>
//             </div>
//             {days.map(day => (
//               <div key={`${day}-${time}`} className="p-2 min-h-20 border-r border-b border-gray-200 relative hover:bg-gray-50 transition-colors">
//                 {getClassesForSlot(day, time).map((cls, index) => (
//                   <div
//                     key={cls.id}
//                     className={`absolute inset-x-1 rounded-md text-white text-xs p-2 cursor-pointer hover:shadow-lg transition-all group ${
//                       index > 0 ? 'opacity-75 transform translate-y-1' : ''
//                     }`}
//                     style={{ 
//                       backgroundColor: cls.color,
//                       top: `${4 + index * 2}px`,
//                       zIndex: 10 - index
//                     }}
//                   >
//                     <div className="font-bold text-sm mb-1 leading-tight">{cls.subject}</div>
//                     <div className="text-xs opacity-90 mb-1">
//                       Section {cls.section} • {cls.room}
//                     </div>
//                     <div className="text-xs opacity-75 flex items-center justify-between">
//                       <span>{cls.timeSlot.start}-{cls.timeSlot.end}</span>
//                       <span>{cls.students} students</span>
//                     </div>
                    
//                     {/* Delete button */}
//                     <button
//                       onClick={() => handleDeleteClass(cls.id)}
//                       className="absolute top-1 right-1 w-4 h-4 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
                
//                 {/* Empty slot indicator */}
//                 {getClassesForSlot(day, time).length === 0 && (
//                   <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-xs">
//                     <Plus className="w-4 h-4" />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );

//   // Grid View Component (Original)
//   const GridView = () => (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//       <div className="grid grid-cols-6 gap-0">
//         {/* Header Row */}
//         <div className="bg-gray-100 p-4 font-semibold text-gray-700 border-r border-b border-gray-200">
//           Time
//         </div>
//         {days.map(day => (
//           <div key={day} className="bg-gray-100 p-4 font-semibold text-gray-700 text-center border-r border-b border-gray-200">
//             {day}
//           </div>
//         ))}

//         {/* Time Slots */}
//         {timeSlots.map(time => (
//           <React.Fragment key={time}>
//             <div className="p-4 font-medium text-gray-600 bg-gray-50 border-r border-b border-gray-200">
//               {time} - {String(parseInt(time.split(':')[0]) + 1).padStart(2, '0')}:00
//             </div>
//             {days.map(day => (
//               <div key={`${day}-${time}`} className="p-2 min-h-24 border-r border-b border-gray-200">
//                 {getClassesForSlot(day, time).map(cls => (
//                   <div
//                     key={cls.id}
//                     className="p-3 rounded-md text-white text-sm mb-1 cursor-pointer hover:opacity-90 transition-opacity group relative"
//                     style={{ backgroundColor: cls.color }}
//                   >
//                     <div className="font-semibold">{cls.subject}</div>
//                     <div className="text-xs opacity-90 flex items-center gap-1 mt-1">
//                       <User className="w-3 h-3" />
//                       {cls.faculty}
//                     </div>
//                     <div className="text-xs opacity-90 flex items-center gap-1">
//                       <BookOpen className="w-3 h-3" />
//                       Section {cls.section} • {cls.room}
//                     </div>
//                     <div className="text-xs opacity-90 flex items-center gap-1">
//                       <Users className="w-3 h-3" />
//                       {cls.students} students
//                     </div>
                    
//                     {/* Delete button on hover */}
//                     <button
//                       onClick={() => handleDeleteClass(cls.id)}
//                       className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-3xl font-bold text-gray-900">Faculty Timetable</h1>
//             <div className="flex items-center gap-4">
//               {/* View Toggle */}
//               <div className="flex bg-gray-100 rounded-lg p-1">
//                 <button
//                   onClick={() => setCurrentView('grid')}
//                   className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
//                     currentView === 'grid'
//                       ? 'bg-white text-gray-900 shadow-sm'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   <Grid className="w-4 h-4" />
//                   Grid View
//                 </button>
//                 <button
//                   onClick={() => setCurrentView('calendar')}
//                   className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
//                     currentView === 'calendar'
//                       ? 'bg-white text-gray-900 shadow-sm'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   <Calendar className="w-4 h-4" />
//                   Calendar View
//                 </button>
//               </div>
              
//               <button
//                 onClick={() => setShowAddModal(true)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//               >
//                 <Plus className="w-4 h-4" />
//                 Add Class
//               </button>
//             </div>
//           </div>

//           {/* Enhanced Filters */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <Filter className="w-4 h-4 text-gray-600" />
//               <span className="font-medium text-gray-700">Filters:</span>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {/* Department Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
//                 <select
//                   value={selectedDepartment}
//                   onChange={(e) => setSelectedDepartment(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="all">All Departments</option>
//                   {departments.map(dept => (
//                     <option key={dept.id} value={dept.name}>{dept.name}</option>
//                   ))}
//                 </select>
//               </div>
              
//               {/* Faculty Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Faculty</label>
//                 <select
//                   value={selectedFaculty}
//                   onChange={(e) => setSelectedFaculty(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="all">All Faculty</option>
//                   {faculties.map(faculty => (
//                     <option key={faculty} value={faculty}>{faculty}</option>
//                   ))}
//                 </select>
//               </div>
              
//               {/* Semester Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
//                 <select
//                   value={selectedSemester}
//                   onChange={(e) => setSelectedSemester(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="all">All Semesters</option>
//                   {semesters.map(semester => (
//                     <option key={semester} value={semester}>{semester}</option>
//                   ))}
//                 </select>
//               </div>
              
//               {/* Section Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
//                 <select
//                   value={selectedSection}
//                   onChange={(e) => setSelectedSection(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="all">All Sections</option>
//                   {sections.map(section => (
//                     <option key={section} value={section}>Section {section}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Dynamic View Rendering */}
//         {currentView === 'calendar' ? <CalendarView /> : <GridView />}

//         {/* Statistics */}
//         <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <BookOpen className="w-6 h-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900">{filteredClasses.length}</p>
//                 <p className="text-gray-600">Total Classes</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                 <Users className="w-6 h-6 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {filteredClasses.reduce((sum, cls) => sum + cls.students, 0)}
//                 </p>
//                 <p className="text-gray-600">Total Students</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                 <User className="w-6 h-6 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {new Set(filteredClasses.map(cls => cls.faculty)).size}
//                 </p>
//                 <p className="text-gray-600">Faculty Members</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
//                 <Clock className="w-6 h-6 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {new Set(filteredClasses.map(cls => cls.section)).size}
//                 </p>
//                 <p className="text-gray-600">Active Sections</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Add Class Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">Add New Class</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
//                 <input
//                   type="text"
//                   value={newClass.subject || ''}
//                   onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter subject name"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Faculty *</label>
//                 <input
//                   type="text"
//                   value={newClass.faculty || ''}
//                   onChange={(e) => setNewClass({...newClass, faculty: e.target.value})}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter faculty name"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
//                 <select
//                   value={newClass.department || ''}
//                   onChange={(e) => setNewClass({...newClass, department: e.target.value})}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">Select Department</option>
//                   {departments.map(dept => (
//                     <option key={dept.id} value={dept.name}>{dept.name}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
//                 <input
//                   type="text"
//                   value={newClass.room || ''}
//                   onChange={(e) => setNewClass({...newClass, room: e.target.value})}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter room number"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
//                 <select
//                   value={newClass.semester || '1st Semester'}
//                   onChange={(e) => setNewClass({...newClass, semester: e.target.value})}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   {semesters.map(semester => (
//                     <option key={semester} value={semester}>{semester}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
//                 <select
//                   value={newClass.section || 'A'}
//                   onChange={(e) => setNewClass({...newClass, section: e.target.value})}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   {sections.map(section => (
//                     <option key={section} value={section}>Section {section}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
//                 <select
//                   value={newClass.day || 'Monday'}
//                   onChange={(e) => setNewClass({...newClass, day: e.target.value})}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   {days.map(day => (
//                     <option key={day} value={day}>{day}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
//                 <select
//                   value={newClass.timeSlot?.start || '09:00'}
//                   onChange={(e) => setNewClass({
//                     ...newClass, 
//                     timeSlot: { 
//                       start: e.target.value, 
//                       end: String(parseInt(e.target.value.split(':')[0]) + 1).padStart(2, '0') + ':00'
//                     }
//                   })}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   {timeSlots.map(time => (
//                     <option key={time} value={time}>{time}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Number of Students</label>
//                 <input
//                   type="number"
//                   value={newClass.students || 0}
//                   onChange={(e) => setNewClass({...newClass, students: parseInt(e.target.value) || 0})}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter number of students"
//                   min="0"
//                 />
//               </div>
//             </div>
            
//             <div className="flex gap-4 mt-6">
//               <button
//                 onClick={handleAddClass}
//                 className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
//               >
//                 Add Class
//               </button>
//               <button
//                 onClick={() => setShowAddModal(false)}
//                 className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FacultyTimetable;

import React, { useState } from 'react';
import { Plus, Filter, Clock, Users, BookOpen, User, Calendar, Grid } from 'lucide-react';

// TypeScript interfaces
interface TimeSlot {
  start: string;
  end: string;
}

interface Class {
  id: string;
  subject: string;
  faculty: string;
  department: string;
  room: string;
  day: string;
  timeSlot: TimeSlot;
  students: number;
  color: string;
  section: string;
  semester: string;
}

interface Department {
  id: string;
  name: string;
  color: string;
}

const FacultyTimetable: React.FC = () => {
  // View state
  const [currentView, setCurrentView] = useState<'grid' | 'calendar'>('grid');
  
  // Sample data
  const [departments] = useState<Department[]>([
    { id: '1', name: 'Computer Science', color: '#3B82F6' },
    { id: '2', name: 'Mathematics', color: '#10B981' },
    { id: '3', name: 'Physics', color: '#8B5CF6' },
    { id: '4', name: 'Chemistry', color: '#F59E0B' },
    { id: '5', name: 'English', color: '#EF4444' }
  ]);

  const [semesters] = useState<string[]>(['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester']);
  
  const [sections] = useState<string[]>(['A', 'B', 'C', 'D', 'E']);

  const [classes, setClasses] = useState<Class[]>([
    {
      id: '1',
      subject: 'Data Structures',
      faculty: 'Dr. Smith',
      department: 'Computer Science',
      room: 'CS-101',
      day: 'Monday',
      timeSlot: { start: '09:00', end: '10:00' },
      students: 45,
      color: '#3B82F6',
      section: 'A',
      semester: '3rd Semester'
    },
    {
      id: '2',
      subject: 'Calculus I',
      faculty: 'Prof. Johnson',
      department: 'Mathematics',
      room: 'M-201',
      day: 'Monday',
      timeSlot: { start: '10:00', end: '11:00' },
      students: 38,
      color: '#10B981',
      section: 'B',
      semester: '1st Semester'
    },
    {
      id: '3',
      subject: 'Database Management',
      faculty: 'Dr. Wilson',
      department: 'Computer Science',
      room: 'CS-102',
      day: 'Tuesday',
      timeSlot: { start: '14:00', end: '15:00' },
      students: 42,
      color: '#3B82F6',
      section: 'A',
      semester: '5th Semester'
    },
    {
      id: '4',
      subject: 'Quantum Physics',
      faculty: 'Dr. Brown',
      department: 'Physics',
      room: 'P-301',
      day: 'Wednesday',
      timeSlot: { start: '11:00', end: '12:00' },
      students: 28,
      color: '#8B5CF6',
      section: 'C',
      semester: '6th Semester'
    },
    {
      id: '5',
      subject: 'Organic Chemistry',
      faculty: 'Prof. Davis',
      department: 'Chemistry',
      room: 'C-201',
      day: 'Thursday',
      timeSlot: { start: '09:00', end: '10:00' },
      students: 35,
      color: '#F59E0B',
      section: 'B',
      semester: '4th Semester'
    },
    {
      id: '6',
      subject: 'Literature',
      faculty: 'Dr. Miller',
      department: 'English',
      room: 'E-101',
      day: 'Friday',
      timeSlot: { start: '15:00', end: '16:00' },
      students: 30,
      color: '#EF4444',
      section: 'A',
      semester: '2nd Semester'
    },
    {
      id: '7',
      subject: 'Operating Systems',
      faculty: 'Dr. Smith',
      department: 'Computer Science',
      room: 'CS-103',
      day: 'Wednesday',
      timeSlot: { start: '14:00', end: '15:00' },
      students: 40,
      color: '#3B82F6',
      section: 'B',
      semester: '5th Semester'
    },
    {
      id: '8',
      subject: 'Linear Algebra',
      faculty: 'Prof. Johnson',
      department: 'Mathematics',
      room: 'M-202',
      day: 'Friday',
      timeSlot: { start: '10:00', end: '11:00' },
      students: 33,
      color: '#10B981',
      section: 'A',
      semester: '2nd Semester'
    }
  ]);

  // Filter states
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('all');
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClass, setNewClass] = useState<Partial<Class>>({
    subject: '',
    faculty: '',
    department: '',
    room: '',
    day: 'Monday',
    timeSlot: { start: '09:00', end: '10:00' },
    students: 0,
    section: 'A',
    semester: '1st Semester'
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Get unique faculty members
  const faculties = Array.from(new Set(classes.map(cls => cls.faculty)));

  // Filter classes
  const filteredClasses = classes.filter(cls => {
    return (selectedDepartment === 'all' || cls.department === selectedDepartment) &&
           (selectedSemester === 'all' || cls.semester === selectedSemester) &&
           (selectedSection === 'all' || cls.section === selectedSection) &&
           (selectedFaculty === 'all' || cls.faculty === selectedFaculty);
  });

  const getClassesForSlot = (day: string, time: string) => {
    return filteredClasses.filter(cls => 
      cls.day === day && cls.timeSlot.start === time
    );
  };

  const handleAddClass = () => {
    if (!newClass.subject || !newClass.faculty || !newClass.department) {
      alert('Please fill in all required fields');
      return;
    }

    const department = departments.find(d => d.name === newClass.department);
    const classToAdd: Class = {
      id: Date.now().toString(),
      subject: newClass.subject!,
      faculty: newClass.faculty!,
      department: newClass.department!,
      room: newClass.room || 'TBA',
      day: newClass.day!,
      timeSlot: newClass.timeSlot!,
      students: newClass.students || 0,
      color: department?.color || '#6B7280',
      section: newClass.section!,
      semester: newClass.semester!
    };

    setClasses([...classes, classToAdd]);
    setNewClass({
      subject: '',
      faculty: '',
      department: '',
      room: '',
      day: 'Monday',
      timeSlot: { start: '09:00', end: '10:00' },
      students: 0,
      section: 'A',
      semester: '1st Semester'
    });
    setShowAddModal(false);
  };

  const handleDeleteClass = (classId: string) => {
    setClasses(classes.filter(cls => cls.id !== classId));
  };

  // Calendar View Component
  const CalendarView = () => (
    <div className="bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Weekly Schedule
        </h3>
      </div>
      
      <div className="bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        {/* Header Row */}
        <div className="grid grid-cols-6 sticky top-0 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="p-2 font-semibold text-gray-700 dark:text-gray-300">Time</div>
          {days.map(day => (
            <div key={day} className="p-2 font-semibold text-gray-700 dark:text-gray-300 text-center border-l border-gray-200 dark:border-gray-700">
              {day}
            </div>
          ))}
        </div>

        {/* Time Slots */}
        {timeSlots.map(time => (
          <div key={time} className="grid grid-cols-6 border-b border-gray-200 dark:border-gray-700 relative min-h-20">
            <div className="p-2 font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-900 border-r border-gray-200 dark:border-gray-700">
              {time} - {String(parseInt(time.split(':')[0]) + 1).padStart(2, '0')}:00
            </div>
            {days.map(day => (
              <div key={`${day}-${time}`} className="p-2 border-l border-gray-200 dark:border-gray-700 relative hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer">
                {getClassesForSlot(day, time).map((cls, index) => (
                  <div
                    key={cls.id}
                    className={`absolute inset-x-1 rounded-md text-white text-xs p-2 transition-all group cursor-pointer ${
                      index > 0 ? 'opacity-75 translate-y-1' : ''
                    }`}
                    style={{ 
                      backgroundColor: cls.color,
                      top: `${4 + index * 2}px`,
                      zIndex: 10 - index,
                      boxShadow: '0 0 8px rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255,255,255,0.15)'
                    }}
                  >
                    <div className="font-bold text-sm mb-1 leading-tight">{cls.subject}</div>
                    <div className="text-xs opacity-90 mb-1">
                      Section {cls.section} • {cls.room}
                    </div>
                    <div className="text-xs opacity-75 flex items-center justify-between">
                      <span>{cls.timeSlot.start}-{cls.timeSlot.end}</span>
                      <span>{cls.students} students</span>
                    </div>
                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteClass(cls.id)}
                      className="absolute top-1 right-1 w-4 h-4 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {/* Empty slot indicator */}
                {getClassesForSlot(day, time).length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-600 text-xs">
                    <Plus className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  // Grid View Component
  const GridView = () => (
    <div className="bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="grid grid-cols-6 gap-0">
        {/* Header Row */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 font-semibold text-gray-700 dark:text-gray-300 border-r border-b border-gray-200 dark:border-gray-700">
          Time
        </div>
        {days.map(day => (
          <div key={day} className="bg-gray-100 dark:bg-gray-800 p-4 font-semibold text-gray-700 dark:text-gray-300 text-center border-r border-b border-gray-200 dark:border-gray-700">
            {day}
          </div>
        ))}

        {/* Time Slots */}
        {timeSlots.map(time => (
          <React.Fragment key={time}>
            <div className="p-4 font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-900 border-r border-b border-gray-200 dark:border-gray-700">
              {time} - {String(parseInt(time.split(':')[0]) + 1).padStart(2, '0')}:00
            </div>
            {days.map(day => (
              <div key={`${day}-${time}`} className="p-2 min-h-24 border-r border-b border-gray-200 dark:border-gray-700">
                {getClassesForSlot(day, time).map(cls => (
                  <div
                    key={cls.id}
                    className="p-3 rounded-md text-white text-sm mb-1 cursor-pointer hover:opacity-90 transition-opacity group relative"
                    style={{ 
                      backgroundColor: cls.color,
                      boxShadow: '0 0 8px rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255,255,255,0.15)'
                    }}
                  >
                    <div className="font-semibold">{cls.subject}</div>
                    <div className="text-xs opacity-90 flex items-center gap-1 mt-1">
                      <User className="w-3 h-3" />
                      {cls.faculty}
                    </div>
                    <div className="text-xs opacity-90 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      Section {cls.section} • {cls.room}
                    </div>
                    <div className="text-xs opacity-90 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {cls.students} students
                    </div>
                    {/* Delete button on hover */}
                    <button
                      onClick={() => handleDeleteClass(cls.id)}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Faculty Timetable</h1>
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setCurrentView('grid')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    currentView === 'grid'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  Grid View
                </button>
                <button
                  onClick={() => setCurrentView('calendar')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    currentView === 'calendar'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Calendar View
                </button>
              </div>
              
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Class
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <span className="font-medium text-gray-700 dark:text-gray-300">Filters:</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Faculty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Faculty</label>
                <select
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Faculty</option>
                  {faculties.map(faculty => (
                    <option key={faculty} value={faculty}>{faculty}</option>
                  ))}
                </select>
              </div>
              
              {/* Semester Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Semester</label>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Semesters</option>
                  {semesters.map(semester => (
                    <option key={semester} value={semester}>{semester}</option>
                  ))}
                </select>
              </div>
              
              {/* Section Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Section</label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Sections</option>
                  {sections.map(section => (
                    <option key={section} value={section}>Section {section}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic View Rendering */}
        {currentView === 'calendar' ? <CalendarView /> : <GridView />}

        {/* Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-lg shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredClasses.length}</p>
                <p className="text-gray-600 dark:text-gray-400">Total Classes</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-lg shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredClasses.reduce((sum, cls) => sum + cls.students, 0)}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Total Students</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-lg shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(filteredClasses.map(cls => cls.faculty)).size}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Faculty Members</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-lg shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-300" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(filteredClasses.map(cls => cls.section)).size}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Active Sections</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto transition-colors duration-300">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add New Class</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject *</label>
                <input
                  type="text"
                  value={newClass.subject || ''}
                  onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter subject name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Faculty *</label>
                <input
                  type="text"
                  value={newClass.faculty || ''}
                  onChange={(e) => setNewClass({...newClass, faculty: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter faculty name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department *</label>
                <select
                  value={newClass.department || ''}
                  onChange={(e) => setNewClass({...newClass, department: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Room</label>
                <input
                  type="text"
                  value={newClass.room || ''}
                  onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter room number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
                <select
                  value={newClass.semester || '1st Semester'}
                  onChange={(e) => setNewClass({...newClass, semester: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {semesters.map(semester => (
                    <option key={semester} value={semester}>{semester}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section</label>
                <select
                  value={newClass.section || 'A'}
                  onChange={(e) => setNewClass({...newClass, section: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {sections.map(section => (
                    <option key={section} value={section}>Section {section}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Day</label>
                <select
                  value={newClass.day || 'Monday'}
                  onChange={(e) => setNewClass({...newClass, day: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                <select
                  value={newClass.timeSlot?.start || '09:00'}
                  onChange={(e) => setNewClass({
                    ...newClass, 
                    timeSlot: { 
                      start: e.target.value, 
                      end: String(parseInt(e.target.value.split(':')[0]) + 1).padStart(2, '0') + ':00'
                    }
                  })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Students</label>
                <input
                  type="number"
                  value={newClass.students || 0}
                  onChange={(e) => setNewClass({...newClass, students: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter number of students"
                  min="0"
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddClass}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Add Class
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 dark:text-gray-900 py-2 px-4 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyTimetable;
