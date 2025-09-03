import React, { useState } from 'react';
import {
  Plus, Search, Calendar, Clock, MapPin, UserCheck, X, Edit3, Trash2
} from 'lucide-react';
import { format } from 'date-fns';

const branches = ['CSE', 'EEE', 'ME'];
const years = [1, 2, 3, 4];
const semesters = ['Odd', 'Even'];

// Mock faculty data for standalone app
const faculty = {
  name: 'Dr. Sarah Johnson',
  assignedSubjects: ['Data Structures', 'Algorithms', 'Database Systems', 'Operating Systems', 'Computer Networks']
};

interface ExamSchedule {
  id: string;
  date: string;
  time: string;
  subject: string;
  branch: string;
  year: number;
  semester: string;
  room: string;
  invigilator: string;
  totalStudents: number;
}

const initialFacultyExamSchedules: ExamSchedule[] = [
  {
    id: 'EX101',
    date: '2025-02-12',
    time: '10:00 AM - 1:00 PM',
    subject: 'Data Structures',
    branch: 'CSE',
    year: 3,
    semester: 'Odd',
    room: 'Room 201',
    invigilator: 'Dr. Sarah Johnson',
    totalStudents: 50,
  },
  {
    id: 'EX102',
    date: '2025-02-15',
    time: '2:00 PM - 5:00 PM',
    subject: 'Algorithms',
    branch: 'CSE',
    year: 2,
    semester: 'Even',
    room: 'Room 105',
    invigilator: 'Dr. Sarah Johnson',
    totalStudents: 40,
  },
  {
    id: 'EX103',
    date: '2025-02-18',
    time: '10:00 AM - 1:00 PM',
    subject: 'Database Systems',
    branch: 'CSE',
    year: 2,
    semester: 'Odd',
    room: 'Room 202',
    invigilator: 'Dr. Sarah Johnson',
    totalStudents: 60,
  },
];

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
};

const ExamTimetable: React.FC = () => {
  const [examSchedules, setExamSchedules] = useState<ExamSchedule[]>(initialFacultyExamSchedules);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    branch: '',
    year: '',
    semester: '',
  });
  const [subjectFilter, setSubjectFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editExam, setEditExam] = useState<ExamSchedule | null>(null);
  const [form, setForm] = useState<Omit<ExamSchedule, 'id' | 'invigilator'>>({
    date: '',
    time: '',
    subject: '',
    branch: '',
    year: 1,
    semester: '',
    room: '',
    totalStudents: 1,
  });

  // Filter exams for faculty's assigned subjects
  const filteredSchedules = examSchedules.filter(
    (exam) =>
      faculty?.assignedSubjects.includes(exam.subject) &&
      (subjectFilter ? exam.subject === subjectFilter : true) &&
      (filters.branch ? exam.branch === filters.branch : true) &&
      (filters.year ? exam.year === Number(filters.year) : true) &&
      (filters.semester ? exam.semester === filters.semester : true) &&
      (
        exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.branch.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const openModalForAdd = () => {
    setForm({
      date: '',
      time: '',
      subject: faculty?.assignedSubjects[0] || '',
      branch: '',
      year: 1,
      semester: '',
      room: '',
      totalStudents: 1,
    });
    setEditExam(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (exam: ExamSchedule) => {
    setForm({
      date: exam.date,
      time: exam.time,
      subject: exam.subject,
      branch: exam.branch,
      year: exam.year,
      semester: exam.semester,
      room: exam.room,
      totalStudents: exam.totalStudents,
    });
    setEditExam(exam);
    setIsModalOpen(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: (name === 'year' || name === 'totalStudents') ? Number(value) : value,
    }));
  };

  const validateForm = (): boolean => {
    if (!form.subject.trim()) {
      alert('Subject is required');
      return false;
    }
    if (!form.branch) {
      alert('Branch is required');
      return false;
    }
    if (!form.year) {
      alert('Year is required');
      return false;
    }
    if (!form.semester) {
      alert('Semester is required');
      return false;
    }
    if (!form.date) {
      alert('Date is required');
      return false;
    }
    if (!form.time.trim()) {
      alert('Time is required');
      return false;
    }
    if (!form.room.trim()) {
      alert('Room is required');
      return false;
    }
    if (form.totalStudents < 1) {
      alert('Total students must be at least 1');
      return false;
    }
    return true;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editExam) {
      setExamSchedules((prev) =>
        prev.map((ex) =>
          ex.id === editExam.id
            ? { id: editExam.id, invigilator: faculty?.name || 'You', ...form }
            : ex
        )
      );
    } else {
      const newExam: ExamSchedule = {
        id: `EX${Date.now().toString().slice(-5)}`,
        invigilator: faculty?.name || 'You',
        ...form,
      };
      setExamSchedules((prev) => [newExam, ...prev]);
    }
    setIsModalOpen(false);
    setEditExam(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this exam schedule?')) {
      setExamSchedules((prev) => prev.filter((ex) => ex.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">My Exam Schedule</h1>
            <p className="text-gray-600">Manage exams for your assigned subjects</p>
          </div>
          <button
            onClick={openModalForAdd}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
          >
            <Plus className="h-5 w-5" />
            <span>Schedule Exam</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <select
              value={subjectFilter}
              onChange={e => setSubjectFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All My Subjects</option>
              {faculty?.assignedSubjects.map(subj => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
            
            <select
              value={filters.branch}
              onChange={e => setFilters({ ...filters, branch: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Branches</option>
              {branches.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            
            <select
              value={filters.year}
              onChange={e => setFilters({ ...filters, year: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Years</option>
              {years.map(y => (
                <option key={y} value={y}>Year {y}</option>
              ))}
            </select>
            
            <select
              value={filters.semester}
              onChange={e => setFilters({ ...filters, semester: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Semesters</option>
              {semesters.map(s => (
                <option key={s} value={s}>{s} Semester</option>
              ))}
            </select>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Exam Cards */}
        <div className="space-y-4">
          {filteredSchedules.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
              <Calendar className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
              <p className="text-gray-500">Try adjusting your filters or add a new exam schedule.</p>
            </div>
          ) : (
            filteredSchedules.map(exam => (
              <div key={exam.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-semibold text-xl text-gray-900">{exam.subject}</h3>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {exam.branch} - Year {exam.year} - {exam.semester} Sem
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>{format(new Date(exam.date), 'EEEE, MMMM do, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span>{exam.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-purple-500" />
                        <span>{exam.room}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-orange-500" />
                        <span>{exam.totalStudents} students</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-6">
                    <button
                      onClick={() => openModalForEdit(exam)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit exam"
                    >
                      <Edit3 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(exam.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete exam"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditExam(null);
        }}
        title={editExam ? 'Edit Exam Schedule' : 'Schedule New Exam'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Subject</option>
              {faculty?.assignedSubjects.map(subj => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
                Branch
              </label>
              <select
                id="branch"
                name="branch"
                value={form.branch}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Branch</option>
                {branches.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select
                id="year"
                name="year"
                value={form.year}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {years.map((y) => (
                  <option key={y} value={y}>Year {y}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
              Semester
            </label>
            <select
              id="semester"
              name="semester"
              value={form.semester}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Semester</option>
              {semesters.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={form.date}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="text"
                id="time"
                name="time"
                placeholder="e.g., 10:00 AM - 1:00 PM"
                value={form.time}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-2">
                Room
              </label>
              <input
                type="text"
                id="room"
                name="room"
                value={form.room}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="totalStudents" className="block text-sm font-medium text-gray-700 mb-2">
                Total Students
              </label>
              <input
                type="number"
                id="totalStudents"
                name="totalStudents"
                min={1}
                value={form.totalStudents}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditExam(null);
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editExam ? 'Update' : 'Add'} Exam
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

function App() {
  return <ExamTimetable />;
}

export default App;