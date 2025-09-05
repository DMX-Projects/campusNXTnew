import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, BookOpen, Plus, Edit, Trash2, Download, RefreshCw, Search, Filter, Save, X } from 'lucide-react';

// Updated interfaces to match your DB structure
interface TimeSlot {
  id: string;
  subject: string;
  class: string;
  section: string;
  facultyId: string;
  facultyName?: string;
  schedule: string;
  room: string;
  totalStudents: number;
  startTime: string;
  endTime: string;
  days: string[];
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  email: string;
  phone: string;
}

interface Faculty {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  email: string;
  subjects: string[];
}

interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  subject: string;
  class: string;
  section: string;
  status: 'Present' | 'Absent';
  markedAt: string;
  location: string;
}

// API endpoints
const API_BASE_URL = 'http://localhost:3001';

const apiService = {
  // Timetable APIs
  getTimetables: async (): Promise<TimeSlot[]> => {
    const response = await fetch(`${API_BASE_URL}/timetables`);
    return response.json();
  },
  
  createTimetable: async (timetable: Omit<TimeSlot, 'id'>): Promise<TimeSlot> => {
    const response = await fetch(`${API_BASE_URL}/timetables`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(timetable)
    });
    return response.json();
  },
  
  updateTimetable: async (id: string, timetable: Partial<TimeSlot>): Promise<TimeSlot> => {
    const response = await fetch(`${API_BASE_URL}/timetables/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(timetable)
    });
    return response.json();
  },
  
  deleteTimetable: async (id: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/timetables/${id}`, {
      method: 'DELETE'
    });
  },

  // Students API
  getStudents: async (): Promise<Student[]> => {
    const response = await fetch(`${API_BASE_URL}/students`);
    return response.json();
  },

  // Faculty API  
  getFaculty: async (): Promise<Faculty[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    return response.json();
  },

  // Attendance API
  getAttendance: async (): Promise<AttendanceRecord[]> => {
    const response = await fetch(`${API_BASE_URL}/attendance`);
    return response.json();
  }
};

const CollegeTimetableSystem = () => {
  // State management
  const [timetables, setTimetables] = useState<TimeSlot[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Filter states
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'view' | 'create' | 'generate'>('view');
  
  // Modal states
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Form state
  const [newSlot, setNewSlot] = useState<Partial<TimeSlot>>({
    subject: '',
    class: 'BTech CSE',
    section: 'A',
    facultyId: '',
    room: '',
    totalStudents: 60,
    startTime: '09:00',
    endTime: '10:00',
    days: ['Monday'],
    schedule: ''
  });

  // Generate parameters
  const [generateParams, setGenerateParams] = useState({
    class: 'BTech CSE',
    section: 'A',
    workingDays: 5,
    hoursPerDay: 6
  });

  // Extract unique values from data
  const classes = [...new Set(timetables.map(t => t.class))].filter(Boolean);
  const sections = [...new Set(timetables.map(t => t.section))].filter(Boolean);
  const subjects = [...new Set(timetables.map(t => t.subject))].filter(Boolean);
  const rooms = [...new Set(timetables.map(t => t.room))].filter(Boolean);
  
  const timeSlots = [
    '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
    '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'
  ];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Available class options
  const availableClasses = ['BTech CSE', 'BTech ECE', 'BTech ME', 'BTech CE', 'BTech IT', 'MBA', 'BBA'];

  // Load data on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [timetableData, studentData, facultyData, attendanceData] = await Promise.all([
        apiService.getTimetables(),
        apiService.getStudents(),
        apiService.getFaculty(),
        apiService.getAttendance()
      ]);

      // Enrich timetable data with faculty names
      const enrichedTimetables = timetableData.map(tt => ({
        ...tt,
        facultyName: facultyData.find(f => f.id === tt.facultyId)?.name || 'Unknown Faculty'
      }));

      setTimetables(enrichedTimetables);
      setStudents(studentData);
      setFaculty(facultyData);
      setAttendance(attendanceData);
    } catch (err) {
      setError('Failed to load data. Please check if the server is running on http://localhost:3001');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create timetable grid structure
  const createTimetableGrid = () => {
    const grid: { [key: string]: { [key: string]: TimeSlot | null } } = {};
    
    days.forEach(day => {
      grid[day] = {};
      timeSlots.forEach(timeSlot => {
        grid[day][timeSlot] = null;
      });
    });

    // Filter timetables based on current filters
    const filteredTimetables = timetables.filter(tt => {
      const classMatch = selectedClass === 'All' || tt.class === selectedClass;
      const sectionMatch = selectedSection === 'All' || tt.section === selectedSection;
      const subjectMatch = selectedSubject === 'All' || tt.subject === selectedSubject;
      const searchMatch = searchTerm === '' || 
        tt.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tt.facultyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tt.room.toLowerCase().includes(searchTerm.toLowerCase());
      
      return classMatch && sectionMatch && subjectMatch && searchMatch;
    });

    // Place timetables in grid
    filteredTimetables.forEach(tt => {
      const timeSlotKey = `${tt.startTime}-${tt.endTime}`;
      tt.days.forEach(day => {
        if (grid[day] && grid[day][timeSlotKey] !== undefined) {
          grid[day][timeSlotKey] = tt;
        }
      });
    });

    return grid;
  };

  // Handle form submission
  const handleSaveSlot = async () => {
    if (!newSlot.subject || !newSlot.facultyId || !newSlot.room || !newSlot.class) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const scheduleStr = `${newSlot.days?.join(', ')} - ${newSlot.startTime}`;
      const slotData = {
        ...newSlot,
        schedule: scheduleStr,
        totalStudents: newSlot.totalStudents || 60
      } as Omit<TimeSlot, 'id'>;

      if (editingSlot) {
        const updated = await apiService.updateTimetable(editingSlot.id, slotData);
        setTimetables(prev => prev.map(t => t.id === editingSlot.id ? { ...updated, facultyName: faculty.find(f => f.id === updated.facultyId)?.name } : t));
      } else {
        const created = await apiService.createTimetable(slotData);
        setTimetables(prev => [...prev, { ...created, facultyName: faculty.find(f => f.id === created.facultyId)?.name }]);
      }
      
      resetForm();
      setShowModal(false);
      alert(editingSlot ? 'Timetable updated successfully!' : 'Timetable created successfully!');
    } catch (err) {
      alert('Failed to save timetable. Please try again.');
      console.error('Save Error:', err);
    }
  };

  const handleEditSlot = (slot: TimeSlot) => {
    setEditingSlot(slot);
    setNewSlot({
      subject: slot.subject,
      class: slot.class,
      section: slot.section,
      facultyId: slot.facultyId,
      room: slot.room,
      totalStudents: slot.totalStudents,
      startTime: slot.startTime,
      endTime: slot.endTime,
      days: slot.days,
      schedule: slot.schedule
    });
    setShowModal(true);
  };

  const handleDeleteSlot = async (slotId: string) => {
    if (!confirm('Are you sure you want to delete this timetable slot?')) return;
    
    try {
      await apiService.deleteTimetable(slotId);
      setTimetables(prev => prev.filter(t => t.id !== slotId));
      alert('Timetable deleted successfully!');
    } catch (err) {
      alert('Failed to delete timetable. Please try again.');
      console.error('Delete Error:', err);
    }
  };

  const resetForm = () => {
    setNewSlot({
      subject: '',
      class: 'BTech CSE',
      section: 'A',
      facultyId: '',
      room: '',
      totalStudents: 60,
      startTime: '09:00',
      endTime: '10:00',
      days: ['Monday'],
      schedule: ''
    });
    setEditingSlot(null);
  };

  const exportTimetable = () => {
    const filteredData = timetables.filter(tt => {
      const classMatch = selectedClass === 'All' || tt.class === selectedClass;
      const sectionMatch = selectedSection === 'All' || tt.section === selectedSection;
      const subjectMatch = selectedSubject === 'All' || tt.subject === selectedSubject;
      return classMatch && sectionMatch && subjectMatch;
    });
    
    const data = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'timetable-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSlotColor = (subject: string) => {
    const colors = [
      'bg-blue-100 border-blue-300',
      'bg-green-100 border-green-300',
      'bg-yellow-100 border-yellow-300',
      'bg-purple-100 border-purple-300',
      'bg-red-100 border-red-300',
      'bg-indigo-100 border-indigo-300'
    ];
    const hash = subject.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  // Auto-generate timetable function
  const generateAutoTimetable = async () => {
    if (!confirm('This will replace existing timetables for the selected class and section. Continue?')) {
      return;
    }

    try {
      setLoading(true);
      const { class: selectedClass, section, workingDays, hoursPerDay } = generateParams;
      
      // Get relevant faculty for the selected class - Smart department matching
const relevantFaculty = faculty.filter(f => {
  const selectedDept = generateParams.class.toLowerCase();
  const facultyDept = f.department.toLowerCase();
  
  // Define department mapping for better matching
  const deptMappings = {
    'btech cse': ['computer science', 'cse', 'cs'],
    'btech ece': ['electronics', 'ece', 'electronic', 'communication'],
    'btech me': ['mechanical', 'me', 'mech'],
    'btech ce': ['civil', 'ce', 'construction'],
    'btech it': ['information technology', 'it', 'computer'],
    'mba': ['management', 'business', 'mba', 'administration'],
    'bba': ['business', 'bba', 'administration', 'commerce']
  };
  
  // Get matching keywords for selected class
  const matchingKeywords = deptMappings[selectedDept] || [];
  
  // Check if faculty department contains any of the matching keywords
  return matchingKeywords.some(keyword => facultyDept.includes(keyword));
});

      
      if (relevantFaculty.length === 0) {
        alert('No faculty found for the selected class. Please add faculty members first.');
        setLoading(false);
        return;
      }

      // Define available rooms (you can make this dynamic from your database)
      const availableRooms = [
        'Room CSE-204', 'Room CSE-205', 'Room CSE-206', 'Room CSE-207',
        'Room ECE-301', 'Room ECE-302', 'Room ME-401', 'Room ME-402',
        'Room CE-501', 'Room CE-502', 'Lab-101', 'Lab-102', 'Auditorium-1'
      ];

      // Sample subjects based on class
      const subjectsByClass: { [key: string]: string[] } = {
        'BTech CSE': ['Data Structures', 'Algorithms', 'Database Systems', 'Computer Networks', 'Operating Systems', 'Software Engineering'],
        'BTech ECE': ['Digital Electronics', 'Signals & Systems', 'Communication Systems', 'Control Systems', 'Microprocessors', 'VLSI Design'],
        'BTech ME': ['Thermodynamics', 'Fluid Mechanics', 'Machine Design', 'Heat Transfer', 'Manufacturing Technology', 'Automation'],
        'BTech CE': ['Structural Analysis', 'Concrete Technology', 'Geotechnical Engineering', 'Transportation Engineering', 'Water Resources', 'Construction Management']
      };

      const availableSubjects = subjectsByClass[selectedClass] || ['General Subject 1', 'General Subject 2', 'General Subject 3'];

      // Delete existing timetables for the selected class and section
      const existingSlots = timetables.filter(tt => tt.class === selectedClass && tt.section === section);
      for (const slot of existingSlots) {
        await apiService.deleteTimetable(slot.id);
      }

      const generatedSlots: TimeSlot[] = [];

      // Generate timetable for each day
      for (let dayIndex = 0; dayIndex < Math.min(workingDays, days.length); dayIndex++) {
        const day = days[dayIndex];
        
        for (let hour = 0; hour < hoursPerDay; hour++) {
          // Skip lunch break (usually 12:00-13:00)
          if (hour === 3) {
            continue; // Skip lunch hour
          }
          
          const actualHour = hour >= 3 ? hour + 1 : hour; // Adjust for lunch break
          const startHour = 9 + actualHour;
          const endHour = startHour + 1;
          
          // Skip if time goes beyond working hours
          if (startHour >= 17) break;
          
          const subject = availableSubjects[hour % availableSubjects.length];
          const facultyMember = relevantFaculty[hour % relevantFaculty.length];
          const room = availableRooms[hour % availableRooms.length];
          
          const startTime = `${startHour.toString().padStart(2, '0')}:00`;
          const endTime = `${endHour.toString().padStart(2, '0')}:00`;
          const schedule = `${day} - ${startTime}`;
          
          const slotData: Omit<TimeSlot, 'id'> = {
            subject,
            class: selectedClass,
            section,
            facultyId: facultyMember.id,
            room,
            totalStudents: 60,
            startTime,
            endTime,
            days: [day],
            schedule
          };

          try {
            const created = await apiService.createTimetable(slotData);
            const enrichedSlot = {
              ...created,
              facultyName: facultyMember.name
            };
            generatedSlots.push(enrichedSlot);
          } catch (error) {
            console.error('Error creating timetable slot:', error);
          }
        }
      }

      // Update local state
      setTimetables(prev => [
        ...prev.filter(t => !(t.class === selectedClass && t.section === section)),
        ...generatedSlots
      ]);

      setActiveTab('view');
      alert(`Timetable generated successfully! Created ${generatedSlots.length} time slots for ${selectedClass} Section ${section}.`);
      
    } catch (err) {
      alert('Failed to generate timetable. Please try again.');
      console.error('Generation Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <RefreshCw className="animate-spin text-blue-600" size={24} />
          <span className="text-lg text-gray-600">Loading timetable data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-4">{error}</div>
          <button
            onClick={loadAllData}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  const timetableGrid = createTimetableGrid();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Classes</option>
                    {classes.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
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
                    {sections.map(section => (
                      <option key={section} value={section}>Section {section}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Subjects</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
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
                    {timeSlots.map(timeSlot => (
                      <tr key={timeSlot} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-700 border-r bg-gray-50">
                          {timeSlot}
                        </td>
                        {days.map(day => {
                          const slot = timetableGrid[day][timeSlot];
                          return (
                            <td key={`${day}-${timeSlot}`} className="px-2 py-1 border-r">
                              {slot ? (
                                <div className={`p-3 rounded-lg border-2 ${getSlotColor(slot.subject)} relative group`}>
                                  <div className="font-semibold text-sm text-gray-800">{slot.subject}</div>
                                  <div className="text-xs text-gray-600 mt-1">{slot.facultyName}</div>
                                  <div className="text-xs text-gray-500">{slot.room}</div>
                                  <div className="text-xs text-blue-600 mt-1">
                                    {slot.class} - {slot.section} ({slot.totalStudents} students)
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
              Create New Timetable Slot
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  value={newSlot.subject || ''}
                  onChange={(e) => setNewSlot({...newSlot, subject: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter subject name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                <select
                  value={newSlot.class || ''}
                  onChange={(e) => setNewSlot({...newSlot, class: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Class</option>
                  {availableClasses.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section *</label>
                <select
                  value={newSlot.section || ''}
                  onChange={(e) => setNewSlot({...newSlot, section: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Section</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Faculty *</label>
                <select
                  value={newSlot.facultyId || ''}
                  onChange={(e) => setNewSlot({...newSlot, facultyId: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Faculty</option>
                  {faculty.map(fac => (
                    <option key={fac.id} value={fac.id}>
                      {fac.name} - {fac.department}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room *</label>
                <input
                  type="text"
                  value={newSlot.room || ''}
                  onChange={(e) => setNewSlot({...newSlot, room: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Room CSE-204"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Students</label>
                <input
                  type="number"
                  value={newSlot.totalStudents || 60}
                  onChange={(e) => setNewSlot({...newSlot, totalStudents: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <input
                  type="time"
                  value={newSlot.startTime || '09:00'}
                  onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  value={newSlot.endTime || '10:00'}
                  onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Days *</label>
                <div className="flex flex-wrap gap-2">
                  {days.map(day => (
                    <label key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newSlot.days?.includes(day) || false}
                        onChange={(e) => {
                          const currentDays = newSlot.days || [];
                          if (e.target.checked) {
                            setNewSlot({...newSlot, days: [...currentDays, day]});
                          } else {
                            setNewSlot({...newSlot, days: currentDays.filter(d => d !== day)});
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="text-sm text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSaveSlot}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save size={20} />
                Save Timetable
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors"
              >
                Reset Form
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                <select
                  value={generateParams.class}
                  onChange={(e) => setGenerateParams({...generateParams, class: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {availableClasses.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
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
                <p>Class: <span className="font-medium">{generateParams.class}</span></p>
                <p>Section: <span className="font-medium">{generateParams.section}</span></p>
                <p>Schedule: <span className="font-medium">{generateParams.workingDays} days × {generateParams.hoursPerDay} hours</span></p>
                <p>Available Faculty: <span className="font-medium">
                  {faculty.filter(f => f.department.toLowerCase().includes(generateParams.class.toLowerCase().split(' ')[1])).length} members
                </span></p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-yellow-800 mb-2">⚠️ Important Notes</h3>
              <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
                <li>This will replace all existing timetable entries for the selected class and section</li>
                <li>Faculty assignments are made automatically based on department matching</li>
                <li>Lunch break (12:00-13:00) is automatically excluded</li>
                <li>Room assignments are distributed across available classrooms</li>
              </ul>
            </div>

            <button
              onClick={generateAutoTimetable}
              disabled={loading}
              className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center gap-2 text-lg"
            >
              <RefreshCw size={24} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Generating...' : 'Generate Complete Timetable'}
            </button>
          </div>
        )}

        {/* Modal for editing */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center justify-between">
                  {editingSlot ? 'Edit Timetable Slot' : 'Create Timetable Slot'}
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingSlot(null);
                      resetForm();
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
                    <input
                      type="text"
                      value={newSlot.subject || ''}
                      onChange={(e) => setNewSlot({...newSlot, subject: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter subject name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                    <select
                      value={newSlot.class || ''}
                      onChange={(e) => setNewSlot({...newSlot, class: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Class</option>
                      {availableClasses.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section *</label>
                    <select
                      value={newSlot.section || ''}
                      onChange={(e) => setNewSlot({...newSlot, section: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Section</option>
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Faculty *</label>
                    <select
                      value={newSlot.facultyId || ''}
                      onChange={(e) => setNewSlot({...newSlot, facultyId: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Faculty</option>
                      {faculty.map(fac => (
                        <option key={fac.id} value={fac.id}>
                          {fac.name} - {fac.department}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Room *</label>
                    <input
                      type="text"
                      value={newSlot.room || ''}
                      onChange={(e) => setNewSlot({...newSlot, room: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Room CSE-204"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Students</label>
                    <input
                      type="number"
                      value={newSlot.totalStudents || 60}
                      onChange={(e) => setNewSlot({...newSlot, totalStudents: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <input
                      type="time"
                      value={newSlot.startTime || '09:00'}
                      onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <input
                      type="time"
                      value={newSlot.endTime || '10:00'}
                      onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Days *</label>
                    <div className="flex flex-wrap gap-2">
                      {days.map(day => (
                        <label key={day} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={newSlot.days?.includes(day) || false}
                            onChange={(e) => {
                              const currentDays = newSlot.days || [];
                              if (e.target.checked) {
                                setNewSlot({...newSlot, days: [...currentDays, day]});
                              } else {
                                setNewSlot({...newSlot, days: currentDays.filter(d => d !== day)});
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="text-sm text-gray-700">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingSlot(null);
                      resetForm();
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
                    {editingSlot ? 'Update' : 'Create'} Timetable
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
                <h3 className="text-lg font-semibold text-gray-800">Total Subjects</h3>
                <p className="text-2xl font-bold text-blue-600">{subjects.length}</p>
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
                <p className="text-2xl font-bold text-green-600">{faculty.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="text-purple-600" size={24} />
              </div>
              {/* <div>
                <h3 className="text-lg font-semibold text-gray-800">Students</h3>
                <p className="text-2xl font-bold text-purple-600">{students.length}</p>
              </div> */}
            {/* </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="text-orange-600" size={24} />
              </div> */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Timetables</h3>
                <p className="text-2xl font-bold text-orange-600">{timetables.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={loadAllData}
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
              onClick={() => setActiveTab('generate')}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw size={20} />
              Generate Timetable
            </button>
            <button
              onClick={exportTimetable}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Download size={20} />
              Export Timetable
            </button>
            <button
              onClick={() => {
                setSelectedClass('All');
                setSelectedSection('All');
                setSelectedSubject('All');
                setSearchTerm('');
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeTimetableSystem;
