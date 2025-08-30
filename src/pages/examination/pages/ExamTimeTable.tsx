import React, { useState } from 'react';
import { Plus, Search, Calendar, Clock, MapPin, Users } from 'lucide-react';
import Modal from '../components/Modal';
import TimeTableForm from '../components/TimeTableForm';

const ExamTimeTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [searchTerm, setSearchTerm] = useState('');

  const examSchedules = [
    {
      id: 'EX001',
      date: '2024-12-15',
      time: '09:00 AM - 12:00 PM',
      subject: 'Computer Networks',
      course: 'B.Tech CSE',
      semester: 'VI',
      room: 'Room 101',
      invigilator: 'Dr. Smith',
      totalStudents: 45
    },
    {
      id: 'EX002',
      date: '2024-12-16',
      time: '02:00 PM - 05:00 PM',
      subject: 'Database Management',
      course: 'B.Tech CSE',
      semester: 'VI',
      room: 'Room 102',
      invigilator: 'Prof. Johnson',
      totalStudents: 42
    },
    {
      id: 'EX003',
      date: '2024-12-17',
      time: '09:00 AM - 12:00 PM',
      subject: 'Operating Systems',
      course: 'B.Tech CSE',
      semester: 'V',
      room: 'Room 103',
      invigilator: 'Dr. Williams',
      totalStudents: 48
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">EXAM TIME TABLE</h1>
          <p className="text-gray-600">Schedule and manage examination timetables</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Schedule</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by subject, course, or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select 
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="current">Current Week</option>
              <option value="next">Next Week</option>
              <option value="upcoming">All Upcoming</option>
            </select>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-4">
            {examSchedules.map((exam) => (
              <div key={exam.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{exam.subject}</h3>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {exam.course} - Sem {exam.semester}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{exam.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{exam.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{exam.room}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{exam.totalStudents} students</span>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Invigilator: </span>
                      <span className="text-sm font-medium text-gray-700">{exam.invigilator}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Add Exam Schedule"
      >
        <TimeTableForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ExamTimeTable;