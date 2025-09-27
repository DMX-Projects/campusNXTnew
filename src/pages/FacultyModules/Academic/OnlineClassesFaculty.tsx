
import React, { useState, useContext } from 'react';
import {
  Sun,
  Moon,
  Users,
  BookOpen,
  Calendar,
  Filter,
  Search,
  Video,
  Copy,
  Check,
  PlusCircle,
  X as CloseIcon,
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

// Sample data for engineering college
const departments = [
  'Computer Science',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Information Technology',
  'Chemical Engineering',
];

const sections = ['A', 'B', 'C', 'D'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const initialSampleClasses = [
  {
    id: 1,
    subject: 'Data Structures & Algorithms',
    code: 'CSE301',
    onlineCode: 'DSA-2024-CS3A',
    department: 'Computer Science',
    year: '3rd Year',
    section: 'A',
    studentCount: 45,
    faculty: 'Dr. Sarah Johnson',
    time: '10:00 AM - 11:30 AM',
    date: '2024-09-27',
    status: 'ongoing',
  },
  {
    id: 2,
    subject: 'Digital Signal Processing',
    code: 'ECE402',
    onlineCode: 'DSP-2024-EC4B',
    department: 'Electronics & Communication',
    year: '4th Year',
    section: 'B',
    studentCount: 38,
    faculty: 'Prof. Michael Chen',
    time: '2:00 PM - 3:30 PM',
    date: '2024-09-27',
    status: 'scheduled',
  },
  {
    id: 3,
    subject: 'Thermodynamics',
    code: 'ME201',
    onlineCode: 'THERMO-2024-ME2C',
    department: 'Mechanical Engineering',
    year: '2nd Year',
    section: 'C',
    studentCount: 52,
    faculty: 'Dr. Priya Sharma',
    time: '11:45 AM - 1:15 PM',
    date: '2024-09-27',
    status: 'completed',
  },
  {
    id: 4,
    subject: 'Database Management Systems',
    code: 'IT301',
    onlineCode: 'DBMS-2024-IT3A',
    department: 'Information Technology',
    year: '3rd Year',
    section: 'A',
    studentCount: 41,
    faculty: 'Dr. Rajesh Kumar',
    time: '9:00 AM - 10:30 AM',
    date: '2024-09-27',
    status: 'ongoing',
  },
  {
    id: 5,
    subject: 'Power Systems',
    code: 'EE401',
    onlineCode: 'PS-2024-EE4B',
    department: 'Electrical Engineering',
    year: '4th Year',
    section: 'B',
    studentCount: 35,
    faculty: 'Prof. Anita Verma',
    time: '3:45 PM - 5:15 PM',
    date: '2024-09-27',
    status: 'scheduled',
  },
];

const ClassCard = ({ classData }) => {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(classData.onlineCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'scheduled':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
        <div>
          <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {classData.subject}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {classData.code} • {classData.faculty}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
            classData.status,
          )}`}
        >
          {classData.status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          <BookOpen size={16} />
          <span>{classData.department}</span>
        </div>
        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          <Calendar size={16} />
          <span>
            {classData.year} - Section {classData.section}
          </span>
        </div>
        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          <Users size={16} />
          <span>{classData.studentCount} Students</span>
        </div>
        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          <Video size={16} />
          <span>{classData.time}</span>
        </div>
      </div>

      <div
        className={`p-3 rounded-md ${isDark ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-between`}
      >
        <div>
          <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
            Online Class Code:
          </p>
          <code className={`text-sm font-mono ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            {classData.onlineCode}
          </code>
        </div>
        <button
          onClick={copyCode}
          className={`p-2 rounded-md transition-colors ${
            isDark ? 'hover:bg-gray-600 text-gray-400 hover:text-white' : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
          }`}
          title="Copy class code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
};

const FilterDropdown = ({ label, value, options, onChange, icon: Icon }) => {
  const { isDark } = useTheme();

  return (
    <div className="flex-1 min-w-0">
      <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        <Icon size={14} className="inline mr-1" />
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 text-sm rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
        }`}
      >
        <option value="">All {label}s</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const ClassManagement = () => {
  const { isDark, toggleTheme } = useTheme();

  const [sampleClasses, setSampleClasses] = useState(initialSampleClasses);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState('');
  const [newClassData, setNewClassData] = useState({
    subject: '',
    code: '',
    onlineCode: '',
    department: '',
    year: '',
    section: '',
    studentCount: '',
    faculty: '',
    time: '',
    date: '',
    status: 'scheduled',
  });

  // Filter classes based on search and dropdown selections
  const filteredClasses = sampleClasses.filter((cls) => {
    const matchesSearch =
      cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.onlineCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || cls.department === selectedDepartment;
    const matchesYear = !selectedYear || cls.year === selectedYear;
    const matchesSection = !selectedSection || cls.section === selectedSection;

    return matchesSearch && matchesDepartment && matchesYear && matchesSection;
  });

  // Calculate statistics
  const totalClasses = filteredClasses.length;
  const totalStudents = filteredClasses.reduce((sum, cls) => sum + cls.studentCount, 0);
  const ongoingClasses = filteredClasses.filter((cls) => cls.status === 'ongoing').length;

  // Handle input change in new class form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClassData((prev) => ({
      ...prev,
      [name]: name === 'studentCount' ? (value === '' ? '' : parseInt(value)) : value,
    }));
  };

  // Validate mandatory fields before adding
  const isFormValid = () => {
    const {
      subject,
      code,
      onlineCode,
      department,
      year,
      section,
      faculty,
      time,
      date,
    } = newClassData;
    return (
      subject &&
      code &&
      onlineCode &&
      department &&
      year &&
      section &&
      faculty &&
      time &&
      date
    );
  };

  // Schedule new class
  const handleScheduleClass = () => {
    if (!isFormValid()) {
      setNotification('Please fill all required fields');
      setTimeout(() => setNotification(''), 3000);
      return;
    }
    const newClass = {
      ...newClassData,
      studentCount: newClassData.studentCount || 0,
      id: sampleClasses.length ? Math.max(...sampleClasses.map((c) => c.id)) + 1 : 1,
    };
    setSampleClasses([...sampleClasses, newClass]);
    setShowModal(false);
    setNotification(`Class "${newClassData.subject}" scheduled successfully!`);
    // Reset form data
    setNewClassData({
      subject: '',
      code: '',
      onlineCode: '',
      department: '',
      year: '',
      section: '',
      studentCount: '',
      faculty: '',
      time: '',
      date: '',
      status: 'scheduled',
    });
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ERP Class Management
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Engineering College Faculty Portal
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                title="Schedule New Class"
              >
                <PlusCircle size={18} />
                Schedule Class
              </button>
              {/* <button
                onClick={toggleTheme}
                className={`p-2 rounded-md transition-colors ${
                  isDark
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Toggle Theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg z-50 ${
            isDark ? 'bg-green-700 text-white' : 'bg-green-300 text-green-900'
          }`}
        >
          {notification}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div
            className={`p-4 rounded-lg ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center">
              <BookOpen className={`h-8 w-8 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
              <div className="ml-3">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Classes</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalClasses}</p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center">
              <Users className={`h-8 w-8 ${isDark ? 'text-green-400' : 'text-green-500'}`} />
              <div className="ml-3">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Students</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {totalStudents}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center">
              <Video className={`h-8 w-8 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
              <div className="ml-3">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Ongoing Classes</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {ongoingClasses}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
              <input
                type="text"
                placeholder="Search classes, codes, or subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-3">
              <FilterDropdown
                label="Department"
                value={selectedDepartment}
                options={departments}
                onChange={setSelectedDepartment}
                icon={BookOpen}
              />
              <FilterDropdown
                label="Year"
                value={selectedYear}
                options={years}
                onChange={setSelectedYear}
                icon={Calendar}
              />
              <FilterDropdown
                label="Section"
                value={selectedSection}
                options={sections}
                onChange={setSelectedSection}
                icon={Filter}
              />
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClasses.map((classData) => (
            <ClassCard key={classData.id} classData={classData} />
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No classes found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Schedule Class Modal */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-lg relative`}>
            <button
              onClick={() => setShowModal(false)}
              className={`absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300`}
              aria-label="Close"
            >
              <CloseIcon size={20} />
            </button>
            <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Schedule New Class
            </h2>
            <div className="space-y-3">
              <input
                name="subject"
                placeholder="Subject"
                value={newClassData.subject}
                onChange={handleInputChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                name="code"
                placeholder="Code"
                value={newClassData.code}
                onChange={handleInputChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                name="onlineCode"
                placeholder="Online Code"
                value={newClassData.onlineCode}
                onChange={handleInputChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <select
                name="department"
                value={newClassData.department}
                onChange={handleInputChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                name="year"
                value={newClassData.year}
                onChange={handleInputChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                name="section"
                value={newClassData.section}
                onChange={handleInputChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Section</option>
                {sections.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                name="studentCount"
                type="number"
                min={0}
                placeholder="Student Count"
                value={newClassData.studentCount}
                onChange={handleInputChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                name="faculty"
                placeholder="Faculty Name"
                value={newClassData.faculty}
                onChange={handleInputChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                name="time"
                placeholder="Class Time (e.g. 10:00 AM - 11:30 AM)"
                value={newClassData.time}
                onChange={handleInputChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                name="date"
                type="date"
                value={newClassData.date}
                onChange={handleInputChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button
              onClick={handleScheduleClass}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2 transition"
            >
              Schedule Class
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return <ClassManagement />;
}
