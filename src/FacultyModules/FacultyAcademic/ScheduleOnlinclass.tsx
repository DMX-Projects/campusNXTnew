// FacultyScheduleOnlineClass.tsx
import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  Users, 
  Link, 
  Bell, 
  Play, 
  Edit, 
  Trash2, 
  Plus,
  Copy,
  Eye,
  BookOpen,
  Send
} from 'lucide-react';

interface OnlineClass {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  class: string;
  section: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  meetingLink: string;
  meetingId: string;
  password?: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  studentsCount: number;
  description?: string;
  attachments?: string[];
}

const FacultyScheduleOnlineClass: React.FC = () => {
  const facultyInfo = {
    name: 'Dr. Rajesh Kumar',
    department: 'Computer Science Engineering',
    employeeId: 'FAC001'
  };

  const [onlineClasses, setOnlineClasses] = useState<OnlineClass[]>([
    {
      id: '1',
      title: 'Data Structures - Arrays and Linked Lists',
      subject: 'Data Structures',
      subjectCode: 'CS301',
      class: 'BTech CSE',
      section: 'A',
      date: '2025-09-05',
      startTime: '10:00',
      endTime: '11:00',
      duration: 60,
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      meetingId: 'abc-defg-hij',
      password: '123456',
      status: 'scheduled',
      studentsCount: 45,
      description: 'Introduction to Arrays and implementation of Linked Lists'
    },
    {
      id: '2',
      title: 'Database Systems - SQL Queries',
      subject: 'Database Systems',
      subjectCode: 'CS302',
      class: 'BTech CSE',
      section: 'A',
      date: '2025-09-04',
      startTime: '14:00',
      endTime: '15:30',
      duration: 90,
      meetingLink: 'https://meet.google.com/xyz-uvwx-rst',
      meetingId: 'xyz-uvwx-rst',
      status: 'live',
      studentsCount: 42,
      description: 'Advanced SQL queries and joins'
    }
  ]);

  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newClass, setNewClass] = useState({
    title: '',
    subject: '',
    subjectCode: '',
    class: '',
    section: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    password: ''
  });

  const subjects = [
    { code: 'CS301', name: 'Data Structures', class: 'BTech CSE', section: 'A' },
    { code: 'CS302', name: 'Database Systems', class: 'BTech CSE', section: 'A' },
    { code: 'CS303', name: 'Operating Systems', class: 'BTech CSE', section: 'B' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewClass(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (subjectCode: string) => {
    const subject = subjects.find(s => s.code === subjectCode);
    if (subject) {
      setNewClass(prev => ({
        ...prev,
        subjectCode: subject.code,
        subject: subject.name,
        class: subject.class,
        section: subject.section
      }));
    }
  };

  const generateMeetingLink = () => {
    const meetingId = Math.random().toString(36).substring(2, 15);
    return {
      meetingLink: `https://meet.google.com/${meetingId}`,
      meetingId: meetingId
    };
  };

  const scheduleClass = () => {
    if (!newClass.title || !newClass.subjectCode || !newClass.date || !newClass.startTime || !newClass.endTime) {
      alert('Please fill all required fields');
      return;
    }

    const startTime = new Date(`${newClass.date}T${newClass.startTime}`);
    const endTime = new Date(`${newClass.date}T${newClass.endTime}`);
    const duration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));

    if (duration <= 0) {
      alert('End time must be after start time');
      return;
    }

    const { meetingLink, meetingId } = generateMeetingLink();
    const selectedSubject = subjects.find(s => s.code === newClass.subjectCode);

    const scheduledClass: OnlineClass = {
      id: Date.now().toString(),
      title: newClass.title,
      subject: newClass.subject,
      subjectCode: newClass.subjectCode,
      class: newClass.class,
      section: newClass.section,
      date: newClass.date,
      startTime: newClass.startTime,
      endTime: newClass.endTime,
      duration,
      meetingLink,
      meetingId,
      password: newClass.password || undefined,
      status: 'scheduled',
      studentsCount: selectedSubject ? 45 : 0,
      description: newClass.description
    };

    setOnlineClasses(prev => [...prev, scheduledClass]);
    setNewClass({
      title: '',
      subject: '',
      subjectCode: '',
      class: '',
      section: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
      password: ''
    });
    setShowScheduleForm(false);
    alert('Online class scheduled successfully! Students will be notified.');
  };

  const copyMeetingLink = (link: string) => {
    navigator.clipboard.writeText(link);
    alert('Meeting link copied to clipboard!');
  };

  const startClass = (classId: string) => {
    const classToStart = onlineClasses.find(c => c.id === classId);
    if (classToStart) {
      setOnlineClasses(prev => prev.map(c => 
        c.id === classId ? { ...c, status: 'live' } : c
      ));
      window.open(classToStart.meetingLink, '_blank');
    }
  };

  const deleteClass = (classId: string) => {
    if (confirm('Are you sure you want to delete this scheduled class?')) {
      setOnlineClasses(prev => prev.filter(c => c.id !== classId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'live': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'live': return <Play className="w-4 h-4" />;
      case 'completed': return <Eye className="w-4 h-4" />;
      case 'cancelled': return <Trash2 className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const todayClasses = onlineClasses.filter(c => c.date === new Date().toISOString().split('T')[0]);
  const upcomingClasses = onlineClasses.filter(c => new Date(c.date) > new Date());

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Video className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Schedule Online Classes</h1>
              <p className="text-gray-600">{facultyInfo.name} • {facultyInfo.department}</p>
            </div>
          </div>
          <button
            onClick={() => setShowScheduleForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Schedule Class
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-gray-900">{onlineClasses.length}</div>
          <div className="text-sm text-gray-600">Total Scheduled</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">{onlineClasses.filter(c => c.status === 'live').length}</div>
          <div className="text-sm text-gray-600">Live Now</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-blue-600">{todayClasses.length}</div>
          <div className="text-sm text-gray-600">Today's Classes</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-purple-600">{upcomingClasses.length}</div>
          <div className="text-sm text-gray-600">Upcoming</div>
        </div>
      </div>

      {/* Today's Classes */}
      {todayClasses.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayClasses.map(classItem => (
              <div key={classItem.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900">{classItem.title}</h3>
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(classItem.status)}`}>
                    {getStatusIcon(classItem.status)}
                    {classItem.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1 mb-3">
                  <div>{classItem.subjectCode} • {classItem.class} {classItem.section}</div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {classItem.startTime} - {classItem.endTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {classItem.studentsCount} students
                  </div>
                </div>

                <div className="flex gap-2">
                  {classItem.status === 'scheduled' && (
                    <button
                      onClick={() => startClass(classItem.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
                    >
                      <Play className="w-4 h-4 inline mr-1" />
                      Start Class
                    </button>
                  )}
                  {classItem.status === 'live' && (
                    <button
                      onClick={() => window.open(classItem.meetingLink, '_blank')}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
                    >
                      <Video className="w-4 h-4 inline mr-1" />
                      Join Live
                    </button>
                  )}
                  <button
                    onClick={() => copyMeetingLink(classItem.meetingLink)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Scheduled Classes */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">All Scheduled Classes</h2>
        
        {onlineClasses.length === 0 ? (
          <div className="text-center py-12">
            <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No online classes scheduled yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {onlineClasses.map(classItem => (
              <div key={classItem.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{classItem.title}</h3>
                    <div className="text-sm text-gray-600">
                      {classItem.subjectCode} • {classItem.class} Section {classItem.section}
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(classItem.status)}`}>
                    {getStatusIcon(classItem.status)}
                    {classItem.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(classItem.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {classItem.startTime} - {classItem.endTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {classItem.studentsCount} students
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    {classItem.duration} minutes
                  </div>
                </div>

                {classItem.description && (
                  <p className="text-sm text-gray-700 mb-4">{classItem.description}</p>
                )}

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-700">Meeting Details</span>
                    <button
                      onClick={() => copyMeetingLink(classItem.meetingLink)}
                      className="text-blue-600 hover:text-blue-800 text-xs"
                    >
                      <Copy className="w-3 h-3 inline mr-1" />
                      Copy Link
                    </button>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>ID: {classItem.meetingId}</div>
                    {classItem.password && <div>Password: {classItem.password}</div>}
                  </div>
                </div>

                <div className="flex gap-3">
                  {classItem.status === 'scheduled' && (
                    <>
                      <button
                        onClick={() => startClass(classItem.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        <Play className="w-4 h-4 inline mr-1" />
                        Start Class
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
                        <Edit className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {classItem.status === 'live' && (
                    <button
                      onClick={() => window.open(classItem.meetingLink, '_blank')}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      <Video className="w-4 h-4 inline mr-1" />
                      Join Live Class
                    </button>
                  )}
                  <button
                    onClick={() => deleteClass(classItem.id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Schedule Class Modal */}
      {showScheduleForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Schedule Online Class</h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Title*</label>
                <input
                  type="text"
                  name="title"
                  value={newClass.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter class title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                <select
                  name="subjectCode"
                  value={newClass.subjectCode}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject.code} value={subject.code}>
                      {subject.code} - {subject.name} ({subject.class} {subject.section})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                  <input
                    type="date"
                    name="date"
                    value={newClass.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time*</label>
                  <input
                    type="time"
                    name="startTime"
                    value={newClass.startTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time*</label>
                  <input
                    type="time"
                    name="endTime"
                    value={newClass.endTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Password (Optional)</label>
                <input
                  type="text"
                  name="password"
                  value={newClass.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Set meeting password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Description</label>
                <textarea
                  name="description"
                  value={newClass.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter class description or agenda"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowScheduleForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={scheduleClass}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                Schedule Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyScheduleOnlineClass;
