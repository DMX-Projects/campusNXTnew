 import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, BookOpen, Plus, Edit, Trash2, Download, RefreshCw, Search, Filter, Save, X } from 'lucide-react';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  subject: string;
  faculty: string;
  room: string;
  type: 'lecture' | 'lab' | 'tutorial' | 'break';
  department: string;
  semester: number;
  section: string;
}

interface TimetableEntry {
  id: string;
  day: string;
  timeSlots: TimeSlot[];
}

interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  credits: number;
}

interface Faculty {
  id: string;
  name: string;
  department: string;
  specialization: string;
}

interface Room {
  id: string;
  name: string;
  type: 'classroom' | 'lab' | 'auditorium';
  capacity: number;
  building: string;
}

const CollegeTimetableSystem = () => {
  // Dummy Data
  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'IT', 'MBA', 'BBA'];
  const timeSlots = [
    '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
    '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'
  ];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const dummyCourses: Course[] = [
    { id: '1', name: 'Data Structures', code: 'CS301', department: 'Computer Science', credits: 4 },
    { id: '2', name: 'Database Management', code: 'CS302', department: 'Computer Science', credits: 4 },
    { id: '3', name: 'Computer Networks', code: 'CS303', department: 'Computer Science', credits: 3 },
    { id: '4', name: 'Operating Systems', code: 'CS304', department: 'Computer Science', credits: 4 },
    { id: '5', name: 'Software Engineering', code: 'CS305', department: 'Computer Science', credits: 3 },
    { id: '6', name: 'Digital Electronics', code: 'EC201', department: 'Electronics', credits: 4 },
    { id: '7', name: 'Microprocessors', code: 'EC202', department: 'Electronics', credits: 4 },
    { id: '8', name: 'Signal Processing', code: 'EC203', department: 'Electronics', credits: 3 },
    { id: '9', name: 'Thermodynamics', code: 'ME201', department: 'Mechanical', credits: 4 },
    { id: '10', name: 'Fluid Mechanics', code: 'ME202', department: 'Mechanical', credits: 4 },
    { id: '11', name: 'Machine Design', code: 'ME203', department: 'Mechanical', credits: 3 },
    { id: '12', name: 'Structural Analysis', code: 'CE201', department: 'Civil', credits: 4 },
    { id: '13', name: 'Concrete Technology', code: 'CE202', department: 'Civil', credits: 3 },
    { id: '14', name: 'Web Development', code: 'IT301', department: 'IT', credits: 4 },
    { id: '15', name: 'Mobile Computing', code: 'IT302', department: 'IT', credits: 3 },
    { id: '16', name: 'Marketing Management', code: 'MBA401', department: 'MBA', credits: 3 },
    { id: '17', name: 'Financial Accounting', code: 'BBA201', department: 'BBA', credits: 4 },
    { id: '18', name: 'Machine Learning', code: 'CS401', department: 'Computer Science', credits: 4 },
    { id: '19', name: 'Artificial Intelligence', code: 'CS402', department: 'Computer Science', credits: 3 },
    { id: '20', name: 'Cyber Security', code: 'CS403', department: 'Computer Science', credits: 3 }
  ];

  const dummyFaculty: Faculty[] = [
    { id: '1', name: 'Dr. Rajesh Kumar', department: 'Computer Science', specialization: 'Data Structures' },
    { id: '2', name: 'Prof. Anita Sharma', department: 'Computer Science', specialization: 'Database Systems' },
    { id: '3', name: 'Dr. Vikram Singh', department: 'Computer Science', specialization: 'Networks' },
    { id: '4', name: 'Prof. Meera Patel', department: 'Electronics', specialization: 'Digital Systems' },
    { id: '5', name: 'Dr. Amit Gupta', department: 'Mechanical', specialization: 'Thermodynamics' },
    { id: '6', name: 'Prof. Priya Jain', department: 'Civil', specialization: 'Structures' },
    { id: '7', name: 'Dr. Suresh Reddy', department: 'Computer Science', specialization: 'Operating Systems' },
    { id: '8', name: 'Prof. Kavita Nair', department: 'IT', specialization: 'Web Technologies' },
    { id: '9', name: 'Dr. Ravi Krishnan', department: 'Electronics', specialization: 'Microprocessors' },
    { id: '10', name: 'Prof. Sneha Agarwal', department: 'MBA', specialization: 'Marketing' },
    { id: '11', name: 'Dr. Manoj Tiwari', department: 'Computer Science', specialization: 'AI/ML' },
    { id: '12', name: 'Prof. Deepika Roy', department: 'BBA', specialization: 'Finance' },
    { id: '13', name: 'Dr. Arun Kumar', department: 'Mechanical', specialization: 'Design' },
    { id: '14', name: 'Prof. Sunita Das', department: 'Civil', specialization: 'Materials' },
    { id: '15', name: 'Dr. Rahul Mishra', department: 'IT', specialization: 'Mobile Tech' }
  ];

  const dummyRooms: Room[] = [
    { id: '1', name: 'CS-101', type: 'classroom', capacity: 60, building: 'Computer Science Block' },
    { id: '2', name: 'CS-102', type: 'classroom', capacity: 60, building: 'Computer Science Block' },
    { id: '3', name: 'CS-Lab1', type: 'lab', capacity: 30, building: 'Computer Science Block' },
    { id: '4', name: 'CS-Lab2', type: 'lab', capacity: 30, building: 'Computer Science Block' },
    { id: '5', name: 'EC-201', type: 'classroom', capacity: 50, building: 'Electronics Block' },
    { id: '6', name: 'EC-Lab1', type: 'lab', capacity: 25, building: 'Electronics Block' },
    { id: '7', name: 'ME-301', type: 'classroom', capacity: 55, building: 'Mechanical Block' },
    { id: '8', name: 'ME-Workshop', type: 'lab', capacity: 20, building: 'Mechanical Block' },
    { id: '9', name: 'Auditorium-1', type: 'auditorium', capacity: 200, building: 'Main Block' },
    { id: '10', name: 'CE-401', type: 'classroom', capacity: 50, building: 'Civil Block' },
    { id: '11', name: 'IT-501', type: 'classroom', capacity: 45, building: 'IT Block' },
    { id: '12', name: 'MBA-601', type: 'classroom', capacity: 40, building: 'Management Block' },
    { id: '13', name: 'Library-Hall', type: 'auditorium', capacity: 100, building: 'Library Block' },
    { id: '14', name: 'CS-103', type: 'classroom', capacity: 65, building: 'Computer Science Block' },
    { id: '15', name: 'EC-202', type: 'classroom', capacity: 55, building: 'Electronics Block' }
  ];

  // Generate comprehensive dummy timetable data
  const generateDummyTimetable = (): TimetableEntry[] => {
    const timetable: TimetableEntry[] = [];
    
    days.forEach(day => {
      const daySchedule: TimeSlot[] = [];
      
      timeSlots.forEach((time, index) => {
        if (time === '13:00-14:00') {
          // Lunch break
          daySchedule.push({
            id: `${day}-${index}`,
            startTime: '13:00',
            endTime: '14:00',
            subject: 'Lunch Break',
            faculty: '',
            room: 'Cafeteria',
            type: 'break',
            department: '',
            semester: 0,
            section: ''
          });
        } else {
          const course = dummyCourses[Math.floor(Math.random() * dummyCourses.length)];
          const faculty = dummyFaculty.find(f => f.department === course.department) || dummyFaculty[0];
          const room = dummyRooms[Math.floor(Math.random() * dummyRooms.length)];
          const sections = ['A', 'B', 'C'];
          const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
          
          daySchedule.push({
            id: `${day}-${index}`,
            startTime: time.split('-')[0],
            endTime: time.split('-')[1],
            subject: course.name,
            faculty: faculty.name,
            room: room.name,
            type: Math.random() > 0.8 ? 'lab' : 'lecture',
            department: course.department,
            semester: semesters[Math.floor(Math.random() * semesters.length)],
            section: sections[Math.floor(Math.random() * sections.length)]
          });
        }
      });
      
      timetable.push({
        id: day,
        day,
        timeSlots: daySchedule
      });
    });
    
    return timetable;
  };

  const [timetable, setTimetable] = useState<TimetableEntry[]>(generateDummyTimetable());
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedSemester, setSelectedSemester] = useState<number>(0);
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'view' | 'create' | 'generate'>('view');
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Form states
  const [newSlot, setNewSlot] = useState<Partial<TimeSlot>>({
    startTime: '9:00',
    endTime: '10:00',
    subject: '',
    faculty: '',
    room: '',
    type: 'lecture',
    department: 'Computer Science',
    semester: 1,
    section: 'A'
  });

  const [generateParams, setGenerateParams] = useState({
    department: 'Computer Science',
    semester: 1,
    section: 'A',
    workingDays: 6,
    hoursPerDay: 6
  });

  // Filter timetable based on selected criteria
  const filteredTimetable = timetable.map(day => ({
    ...day,
    timeSlots: day.timeSlots.filter(slot => {
      const departmentMatch = selectedDepartment === 'All' || slot.department === selectedDepartment;
      const semesterMatch = selectedSemester === 0 || slot.semester === selectedSemester;
      const sectionMatch = selectedSection === 'All' || slot.section === selectedSection;
      const searchMatch = searchTerm === '' || 
        slot.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slot.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slot.room.toLowerCase().includes(searchTerm.toLowerCase());
      
      return departmentMatch && semesterMatch && sectionMatch && searchMatch;
    })
  }));

  const handleSaveSlot = () => {
    if (!newSlot.subject || !newSlot.faculty || !newSlot.room) {
      alert('Please fill all required fields');
      return;
    }

    const updatedTimetable = [...timetable];
    const dayIndex = updatedTimetable.findIndex(d => d.day === 'Monday'); // Default to Monday for new slots
    
    if (editingSlot) {
      // Update existing slot
      const slotIndex = updatedTimetable[dayIndex].timeSlots.findIndex(s => s.id === editingSlot.id);
      if (slotIndex !== -1) {
        updatedTimetable[dayIndex].timeSlots[slotIndex] = {
          ...editingSlot,
          ...newSlot
        } as TimeSlot;
      }
    } else {
      // Add new slot
      const newTimeSlot: TimeSlot = {
        id: `new-${Date.now()}`,
        startTime: newSlot.startTime || '9:00',
        endTime: newSlot.endTime || '10:00',
        subject: newSlot.subject || '',
        faculty: newSlot.faculty || '',
        room: newSlot.room || '',
        type: newSlot.type || 'lecture',
        department: newSlot.department || 'Computer Science',
        semester: newSlot.semester || 1,
        section: newSlot.section || 'A'
      };
      updatedTimetable[dayIndex].timeSlots.push(newTimeSlot);
    }
    
    setTimetable(updatedTimetable);
    setShowModal(false);
    setEditingSlot(null);
    setNewSlot({
      startTime: '9:00',
      endTime: '10:00',
      subject: '',
      faculty: '',
      room: '',
      type: 'lecture',
      department: 'Computer Science',
      semester: 1,
      section: 'A'
    });
  };

  const handleEditSlot = (slot: TimeSlot) => {
    setEditingSlot(slot);
    setNewSlot(slot);
    setShowModal(true);
  };

  const handleDeleteSlot = (slotId: string) => {
    if (confirm('Are you sure you want to delete this slot?')) {
      const updatedTimetable = timetable.map(day => ({
        ...day,
        timeSlots: day.timeSlots.filter(slot => slot.id !== slotId)
      }));
      setTimetable(updatedTimetable);
    }
  };

  const generateAutoTimetable = () => {
    const newTimetable: TimetableEntry[] = [];
    const { department, semester, section, workingDays, hoursPerDay } = generateParams;
    
    const relevantCourses = dummyCourses.filter(c => c.department === department);
    const relevantFaculty = dummyFaculty.filter(f => f.department === department);
    const availableRooms = [...dummyRooms];
    
    for (let dayIndex = 0; dayIndex < workingDays; dayIndex++) {
      const day = days[dayIndex];
      const daySchedule: TimeSlot[] = [];
      
      for (let hour = 0; hour < hoursPerDay; hour++) {
        if (hour === 3) { // Lunch break at 4th hour
          daySchedule.push({
            id: `gen-${day}-${hour}`,
            startTime: '13:00',
            endTime: '14:00',
            subject: 'Lunch Break',
            faculty: '',
            room: 'Cafeteria',
            type: 'break',
            department: '',
            semester: 0,
            section: ''
          });
        } else {
          const course = relevantCourses[hour % relevantCourses.length];
          const faculty = relevantFaculty[hour % relevantFaculty.length];
          const room = availableRooms[hour % availableRooms.length];
          const startHour = 9 + hour + (hour >= 3 ? 1 : 0); // Account for lunch break
          
          daySchedule.push({
            id: `gen-${day}-${hour}`,
            startTime: `${startHour}:00`,
            endTime: `${startHour + 1}:00`,
            subject: course.name,
            faculty: faculty.name,
            room: room.name,
            type: hour % 4 === 3 ? 'lab' : 'lecture',
            department,
            semester,
            section
          });
        }
      }
      
      newTimetable.push({
        id: day,
        day,
        timeSlots: daySchedule
      });
    }
    
    setTimetable(newTimetable);
    setActiveTab('view');
    alert('Timetable generated successfully!');
  };

  const exportTimetable = () => {
    const data = JSON.stringify(filteredTimetable, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'timetable.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSlotColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 border-blue-300';
      case 'lab': return 'bg-green-100 border-green-300';
      case 'tutorial': return 'bg-yellow-100 border-yellow-300';
      case 'break': return 'bg-gray-100 border-gray-300';
      default: return 'bg-blue-100 border-blue-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Calendar className="text-blue-600" />
            College Timetable Management System
          </h1>
          <p className="text-gray-600">Manage and generate academic schedules for your institution</p>
        </div> */}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('view')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'view' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'
              }`}
            >
              <BookOpen className="inline mr-2" size={20} />
              View Timetable
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'create' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'
              }`}
            >
              <Plus className="inline mr-2" size={20} />
              Create Slot
            </button>
            <button
              onClick={() => setActiveTab('generate')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'generate' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'
              }`}
            >
              <RefreshCw className="inline mr-2" size={20} />
              Generate Timetable
            </button>
          </div>
        </div>

        {/* View Timetable Tab */}
        {activeTab === 'view' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Filter className="text-blue-600" />
                Filters & Search
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>All Semesters</option>
                    {[1,2,3,4,5,6,7,8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Sections</option>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search subjects, faculty, rooms..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={exportTimetable}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={20} />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Timetable Grid */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Clock className="text-blue-600" />
                  Weekly Timetable
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r">Time</th>
                      {days.map(day => (
                        <th key={day} className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-r min-w-48">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map(time => (
                      <tr key={time} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-700 border-r bg-gray-50">
                          {time}
                        </td>
                        {filteredTimetable.map(day => {
                          const slot = day.timeSlots.find(s => 
                            `${s.startTime}-${s.endTime}` === time
                          );
                          return (
                            <td key={`${day.day}-${time}`} className="px-2 py-1 border-r">
                              {slot ? (
                                <div className={`p-3 rounded-lg border-2 ${getSlotColor(slot.type)} relative group`}>
                                  <div className="font-semibold text-sm text-gray-800">{slot.subject}</div>
                                  <div className="text-xs text-gray-600 mt-1">{slot.faculty}</div>
                                  <div className="text-xs text-gray-500">{slot.room}</div>
                                  <div className="text-xs text-blue-600 mt-1">
                                    {slot.department !== '' && `${slot.department} - Sem ${slot.semester}${slot.section}`}
                                  </div>
                                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                      onClick={() => handleEditSlot(slot)}
                                      className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-1"
                                    >
                                      <Edit size={12} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteSlot(slot.id)}
                                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="h-20 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                                  <span className="text-xs">No class</span>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Create/Edit Slot Tab */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Plus className="text-blue-600" />
              Create New Time Slot
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <select
                  value={newSlot.subject}
                  onChange={(e) => setNewSlot({...newSlot, subject: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Subject</option>
                  {dummyCourses.map(course => (
                    <option key={course.id} value={course.name}>{course.name} ({course.code})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Faculty *</label>
                <select
                  value={newSlot.faculty}
                  onChange={(e) => setNewSlot({...newSlot, faculty: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Faculty</option>
                  {dummyFaculty.map(faculty => (
                    <option key={faculty.id} value={faculty.name}>{faculty.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room *</label>
                <select
                  value={newSlot.room}
                  onChange={(e) => setNewSlot({...newSlot, room: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Room</option>
                  {dummyRooms.map(room => (
                    <option key={room.id} value={room.name}>{room.name} ({room.type})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <input
                  type="time"
                  value={newSlot.startTime}
                  onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  value={newSlot.endTime}
                  onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={newSlot.type}
                  onChange={(e) => setNewSlot({...newSlot, type: e.target.value as any})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="lecture">Lecture</option>
                  <option value="lab">Lab</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="break">Break</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={newSlot.department}
                  onChange={(e) => setNewSlot({...newSlot, department: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                <select
                  value={newSlot.semester}
                  onChange={(e) => setNewSlot({...newSlot, semester: Number(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                <select
                  value={newSlot.section}
                  onChange={(e) => setNewSlot({...newSlot, section: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSaveSlot}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save size={20} />
                Save Slot
              </button>
              <button
                onClick={() => {
                  setNewSlot({
                    startTime: '9:00',
                    endTime: '10:00',
                    subject: '',
                    faculty: '',
                    room: '',
                    type: 'lecture',
                    department: 'Computer Science',
                    semester: 1,
                    section: 'A'
                  });
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Generate Timetable Tab */}
        {activeTab === 'generate' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <RefreshCw className="text-blue-600" />
              Auto Generate Timetable
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={generateParams.department}
                  onChange={(e) => setGenerateParams({...generateParams, department: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                <select
                  value={generateParams.semester}
                  onChange={(e) => setGenerateParams({...generateParams, semester: Number(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                <select
                  value={generateParams.section}
                  onChange={(e) => setGenerateParams({...generateParams, section: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
                <select
                  value={generateParams.workingDays}
                  onChange={(e) => setGenerateParams({...generateParams, workingDays: Number(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>5 Days (Mon-Fri)</option>
                  <option value={6}>6 Days (Mon-Sat)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hours Per Day</label>
                <select
                  value={generateParams.hoursPerDay}
                  onChange={(e) => setGenerateParams({...generateParams, hoursPerDay: Number(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={6}>6 Hours</option>
                  <option value={7}>7 Hours</option>
                  <option value={8}>8 Hours</option>
                </select>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-800 mb-2">Generation Settings Preview</h3>
              <div className="text-sm text-blue-700">
                <p>Department: <span className="font-medium">{generateParams.department}</span></p>
                <p>Semester: <span className="font-medium">{generateParams.semester}</span></p>
                <p>Section: <span className="font-medium">{generateParams.section}</span></p>
                <p>Schedule: <span className="font-medium">{generateParams.workingDays} days × {generateParams.hoursPerDay} hours</span></p>
              </div>
            </div>

            <button
              onClick={generateAutoTimetable}
              className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2 text-lg"
            >
              <RefreshCw size={24} />
              Generate Complete Timetable
            </button>
          </div>
        )}

        {/* Modal for editing */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-90vh overflow-y-auto">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center justify-between">
                  {editingSlot ? 'Edit Time Slot' : 'Create Time Slot'}
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingSlot(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <select
                      value={newSlot.subject}
                      onChange={(e) => setNewSlot({...newSlot, subject: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Subject</option>
                      {dummyCourses.map(course => (
                        <option key={course.id} value={course.name}>{course.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Faculty *</label>
                    <select
                      value={newSlot.faculty}
                      onChange={(e) => setNewSlot({...newSlot, faculty: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Faculty</option>
                      {dummyFaculty.map(faculty => (
                        <option key={faculty.id} value={faculty.name}>{faculty.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Room *</label>
                    <select
                      value={newSlot.room}
                      onChange={(e) => setNewSlot({...newSlot, room: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Room</option>
                      {dummyRooms.map(room => (
                        <option key={room.id} value={room.name}>{room.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={newSlot.type}
                      onChange={(e) => setNewSlot({...newSlot, type: e.target.value as any})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="lecture">Lecture</option>
                      <option value="lab">Lab</option>
                      <option value="tutorial">Tutorial</option>
                      <option value="break">Break</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <input
                      type="time"
                      value={newSlot.startTime}
                      onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <input
                      type="time"
                      value={newSlot.endTime}
                      onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      value={newSlot.department}
                      onChange={(e) => setNewSlot({...newSlot, department: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                    <select
                      value={newSlot.semester}
                      onChange={(e) => setNewSlot({...newSlot, semester: Number(e.target.value)})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1,2,3,4,5,6,7,8].map(sem => (
                        <option key={sem} value={sem}>Semester {sem}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                    <select
                      value={newSlot.section}
                      onChange={(e) => setNewSlot({...newSlot, section: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingSlot(null);
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSlot}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Save size={20} />
                    {editingSlot ? 'Update' : 'Create'} Slot
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Total Courses</h3>
                <p className="text-2xl font-bold text-blue-600">{dummyCourses.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Faculty</h3>
                <p className="text-2xl font-bold text-green-600">{dummyFaculty.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Rooms</h3>
                <p className="text-2xl font-bold text-purple-600">{dummyRooms.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Departments</h3>
                <p className="text-2xl font-bold text-orange-600">{departments.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setTimetable(generateDummyTimetable())}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw size={20} />
              Refresh Data
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Add New Slot
            </button>
            <button
              onClick={exportTimetable}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Download size={20} />
              Export Timetable
            </button>
            <button
              onClick={() => {
                setSelectedDepartment('All');
                setSelectedSemester(0);
                setSelectedSection('All');
                setSearchTerm('');
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Resource Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Courses List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="text-blue-600" />
              Available Courses
            </h3>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {dummyCourses.slice(0, 10).map(course => (
                <div key={course.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800">{course.name}</div>
                  <div className="text-sm text-gray-600">{course.code} - {course.department}</div>
                  <div className="text-xs text-blue-600">{course.credits} Credits</div>
                </div>
              ))}
            </div>
          </div>

          {/* Faculty List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="text-green-600" />
              Faculty Members
            </h3>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {dummyFaculty.slice(0, 10).map(faculty => (
                <div key={faculty.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800">{faculty.name}</div>
                  <div className="text-sm text-gray-600">{faculty.department}</div>
                  <div className="text-xs text-green-600">{faculty.specialization}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rooms List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="text-purple-600" />
              Available Rooms
            </h3>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {dummyRooms.slice(0, 10).map(room => (
                <div key={room.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800">{room.name}</div>
                  <div className="text-sm text-gray-600">{room.building}</div>
                  <div className="text-xs text-purple-600 capitalize">{room.type} - {room.capacity} seats</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeTimetableSystem;