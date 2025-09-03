// ScheduleOnlineClass.tsx
import React, { useState } from 'react';
import { Calendar, Clock, User, Video, Plus, Edit, Trash2, BookOpen, Users } from 'lucide-react';

interface OnlineClass {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  faculty: string;
  department: string;
  semester: string;
  subject: string;
  meetingLink: string;
  meetingId: string;
  password: string;
  maxStudents: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

const ScheduleOnlineClass: React.FC = () => {
  const [classes, setClasses] = useState<OnlineClass[]>([
    {
      id: '1',
      title: 'Data Structures - Arrays & Linked Lists',
      description: 'Introduction to fundamental data structures',
      date: '2025-09-04',
      startTime: '10:00',
      endTime: '11:00',
      faculty: 'Dr. Rajesh Kumar',
      department: 'Computer Science',
      semester: '3rd Semester',
      subject: 'Data Structures',
      meetingLink: 'https://meet.google.com/abc-def-ghi',
      meetingId: 'abc-def-ghi',
      password: '123456',
      maxStudents: 60,
      status: 'scheduled'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<OnlineClass | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    faculty: '',
    department: '',
    semester: '',
    subject: '',
    meetingLink: '',
    meetingId: '',
    password: '',
    maxStudents: 60
  });

  // Reset form
  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      faculty: '',
      department: '',
      semester: '',
      subject: '',
      meetingLink: '',
      meetingId: '',
      password: '',
      maxStudents: 60
    });
  };

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Open modal for new class
  const openModal = () => {
    resetForm();
    setEditingClass(null);
    setIsModalOpen(true);
  };

  // Edit class
  const editClass = (classItem: OnlineClass) => {
    setForm({
      title: classItem.title,
      description: classItem.description,
      date: classItem.date,
      startTime: classItem.startTime,
      endTime: classItem.endTime,
      faculty: classItem.faculty,
      department: classItem.department,
      semester: classItem.semester,
      subject: classItem.subject,
      meetingLink: classItem.meetingLink,
      meetingId: classItem.meetingId,
      password: classItem.password,
      maxStudents: classItem.maxStudents
    });
    setEditingClass(classItem);
    setIsModalOpen(true);
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.startTime >= form.endTime) {
      alert('End time must be after start time');
      return;
    }

    const classData: OnlineClass = {
      id: editingClass?.id || Date.now().toString(),
      ...form,
      status: 'scheduled'
    };

    if (editingClass) {
      setClasses(prev => prev.map(c => c.id === editingClass.id ? classData : c));
    } else {
      setClasses(prev => [...prev, classData]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  // Delete class
  const deleteClass = (id: string) => {
    if (confirm('Are you sure you want to delete this class?')) {
      setClasses(prev => prev.filter(c => c.id !== id));
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get upcoming classes (today and later)
  const today = new Date().toISOString().split('T')[0];
  const upcomingClasses = classes.filter(c => c.date >= today).sort((a, b) => {
    if (a.date === b.date) return a.startTime.localeCompare(b.startTime);
    return a.date.localeCompare(b.date);
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Video className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Online Class Scheduler</h1>
              <p className="text-gray-600">Schedule and manage virtual classes efficiently</p>
            </div>
          </div>
          <button
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Schedule New Class
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wider">Total Classes</h3>
              <div className="text-2xl font-bold text-gray-900">{classes.length}</div>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wider">Today's Classes</h3>
              <div className="text-2xl font-bold text-gray-900">
                {classes.filter(c => c.date === today).length}
              </div>
            </div>
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wider">Upcoming</h3>
              <div className="text-2xl font-bold text-gray-900">{upcomingClasses.length}</div>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wider">Active Now</h3>
              <div className="text-2xl font-bold text-gray-900">
                {classes.filter(c => c.status === 'ongoing').length}
              </div>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Scheduled Classes</h2>
        </div>

        {upcomingClasses.length === 0 ? (
          <div className="p-12 text-center">
            <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No classes scheduled yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Class Details</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Schedule</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Faculty</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Meeting Info</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {upcomingClasses.map(classItem => (
                  <tr key={classItem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{classItem.title}</div>
                        <div className="text-sm text-gray-600">{classItem.subject} • {classItem.semester}</div>
                        <div className="text-sm text-gray-500">{classItem.department}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(classItem.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {classItem.startTime} - {classItem.endTime}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium">{classItem.faculty}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div><strong>ID:</strong> {classItem.meetingId}</div>
                        <div><strong>Password:</strong> {classItem.password}</div>
                        <a 
                          href={classItem.meetingLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          Join Meeting
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(classItem.status)}`}>
                        {classItem.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => editClass(classItem)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteClass(classItem.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingClass ? 'Edit Class' : 'Schedule New Class'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class Title</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={form.startTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={form.endTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
                  <input
                    type="text"
                    name="faculty"
                    value={form.faculty}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                  <select
                    name="semester"
                    value={form.semester}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Semester</option>
                    {[1,2,3,4,5,6,7,8].map(sem => (
                      <option key={sem} value={`${sem}${sem === 1 ? 'st' : sem === 2 ? 'nd' : sem === 3 ? 'rd' : 'th'} Semester`}>
                        {sem}{sem === 1 ? 'st' : sem === 2 ? 'nd' : sem === 3 ? 'rd' : 'th'} Semester
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Students</label>
                  <input
                    type="number"
                    name="maxStudents"
                    value={form.maxStudents}
                    onChange={handleChange}
                    min="1"
                    max="200"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Meeting Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meeting ID</label>
                    <input
                      type="text"
                      name="meetingId"
                      value={form.meetingId}
                      onChange={handleChange}
                      placeholder="123-456-789"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="text"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
                  <input
                    type="url"
                    name="meetingLink"
                    value={form.meetingLink}
                    onChange={handleChange}
                    placeholder="https://meet.google.com/abc-def-ghi"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingClass ? 'Update Class' : 'Schedule Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleOnlineClass;
