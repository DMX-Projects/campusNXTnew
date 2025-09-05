 // StudentExams.tsx
import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  FileText, 
  Eye, 
  AlertCircle, 
  CheckCircle, 
  Bell,
  Search,
  Filter,
  User,
  BookOpen,
  Award,
  TrendingUp,
  Printer,
  RefreshCw,
  Info,
  Star,
  X,
  ExternalLink
} from 'lucide-react';

interface Exam {
  id: string;
  subject: string;
  subjectCode: string;
  type: 'midterm' | 'final' | 'quiz' | 'supplementary' | 'practical';
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  venue: string;
  instructor: string;
  totalMarks: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  registrationRequired: boolean;
  registrationDeadline?: string;
  isRegistered: boolean;
  admitCardAvailable: boolean;
  resultPublished: boolean;
  resultDate?: string;
  marksObtained?: number;
  grade?: string;
  semester: number;
  instructions?: string[];
  allowedMaterials?: string[];
}

interface ExamResult {
  examId: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  percentage: number;
  rank?: number;
  totalStudents?: number;
}

const StudentExams: React.FC = () => {
  // Student Information
  const [studentInfo] = useState({
    name: 'Arjun Kumar',
    rollNumber: '2022CSE001',
    registrationNumber: 'REG2022001',
    department: 'Computer Science Engineering',
    semester: 5,
    section: 'A',
    batch: '2022-2026',
    profileImage: '/api/placeholder/100/100'
  });

  // Exams Data
  const [exams] = useState<Exam[]>([
    {
      id: 'EX001',
      subject: 'Advanced Data Structures',
      subjectCode: 'CS501',
      type: 'midterm',
      date: '2025-09-20',
      startTime: '10:00',
      endTime: '13:00',
      duration: 180,
      venue: 'Main Hall - Block A',
      instructor: 'Dr. Rajesh Kumar',
      totalMarks: 75,
      status: 'upcoming',
      registrationRequired: true,
      registrationDeadline: '2025-09-15',
      isRegistered: true,
      admitCardAvailable: true,
      resultPublished: false,
      semester: 5,
      instructions: [
        'Report 30 minutes before exam time',
        'Bring student ID card and admit card',
        'No electronic devices allowed',
        'Use only blue/black pen'
      ],
      allowedMaterials: ['Calculator', 'Geometry box', 'Graph paper']
    },
    {
      id: 'EX002',
      subject: 'Database Management Systems',
      subjectCode: 'CS502',
      type: 'final',
      date: '2025-12-15',
      startTime: '14:00',
      endTime: '17:00',
      duration: 180,
      venue: 'Computer Lab - Block B',
      instructor: 'Prof. Priya Sharma',
      totalMarks: 100,
      status: 'upcoming',
      registrationRequired: false,
      isRegistered: true,
      admitCardAvailable: false,
      resultPublished: false,
      semester: 5,
      instructions: [
        'Practical exam on computers',
        'Login credentials will be provided',
        'Save work frequently'
      ]
    },
    {
      id: 'EX003',
      subject: 'Operating Systems',
      subjectCode: 'CS503',
      type: 'quiz',
      date: '2025-09-10',
      startTime: '11:00',
      endTime: '12:00',
      duration: 60,
      venue: 'Room 205',
      instructor: 'Dr. Amit Singh',
      totalMarks: 25,
      status: 'completed',
      registrationRequired: false,
      isRegistered: true,
      admitCardAvailable: false,
      resultPublished: true,
      resultDate: '2025-09-12',
      marksObtained: 22,
      grade: 'A',
      semester: 5
    },
    {
      id: 'EX004',
      subject: 'Computer Networks',
      subjectCode: 'CS504',
      type: 'midterm',
      date: '2025-09-25',
      startTime: '09:00',
      endTime: '12:00',
      duration: 180,
      venue: 'Main Hall - Block C',
      instructor: 'Dr. Neha Gupta',
      totalMarks: 75,
      status: 'upcoming',
      registrationRequired: true,
      registrationDeadline: '2025-09-20',
      isRegistered: false,
      admitCardAvailable: false,
      resultPublished: false,
      semester: 5
    }
  ]);

  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | Exam['status']>('all');
  const [filterType, setFilterType] = useState<'all' | Exam['type']>('all');
  const [sortBy, setSortBy] = useState<'date' | 'subject' | 'type'>('date');

  // Filter and sort exams
  const filteredAndSortedExams = useMemo(() => {
    let filtered = exams.filter(exam => {
      const matchesSearch = exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exam.subjectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exam.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || exam.status === filterStatus;
      const matchesType = filterType === 'all' || exam.type === filterType;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    // Sort exams
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'subject':
          return a.subject.localeCompare(b.subject);
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

    return filtered;
  }, [exams, searchTerm, filterStatus, filterType, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const upcoming = exams.filter(e => e.status === 'upcoming').length;
    const completed = exams.filter(e => e.status === 'completed').length;
    const resultsAvailable = exams.filter(e => e.resultPublished).length;
    const avgScore = exams.filter(e => e.marksObtained && e.totalMarks)
      .reduce((acc, e) => acc + ((e.marksObtained! / e.totalMarks) * 100), 0) / 
      Math.max(exams.filter(e => e.marksObtained && e.totalMarks).length, 1);

    return {
      total: exams.length,
      upcoming,
      completed,
      resultsAvailable,
      avgScore: avgScore.toFixed(1)
    };
  }, [exams]);

  const getStatusColor = (status: Exam['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ongoing': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Exam['status']) => {
    switch (status) {
      case 'upcoming': return <Clock className="w-4 h-4" />;
      case 'ongoing': return <RefreshCw className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getExamTypeColor = (type: Exam['type']) => {
    switch (type) {
      case 'final': return 'bg-red-100 text-red-800';
      case 'midterm': return 'bg-orange-100 text-orange-800';
      case 'quiz': return 'bg-green-100 text-green-800';
      case 'practical': return 'bg-purple-100 text-purple-800';
      case 'supplementary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const isExamToday = (examDate: string) => {
    const today = new Date().toISOString().split('T')[0];
    return examDate === today;
  };

  const isRegistrationOpen = (exam: Exam) => {
    if (!exam.registrationRequired) return false;
    if (exam.isRegistered) return false;
    return exam.registrationDeadline ? new Date(exam.registrationDeadline) > new Date() : false;
  };

  const downloadAdmitCard = (exam: Exam) => {
    if (exam.admitCardAvailable) {
      alert(`Downloading admit card for ${exam.subject} exam`);
    }
  };

  const downloadResult = (exam: Exam) => {
    if (exam.resultPublished) {
      alert(`Downloading result for ${exam.subject} exam`);
    }
  };

  const registerForExam = (exam: Exam) => {
    alert(`Registration for ${exam.subject} exam initiated`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Examinations</h1>
              <div className="text-gray-600">
                <p>{studentInfo.name} - {studentInfo.rollNumber}</p>
                <p>{studentInfo.department} - Semester {studentInfo.semester}</p>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{stats.avgScore}%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.upcoming}</div>
              <div className="text-sm text-gray-600">Upcoming Exams</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.resultsAvailable}</div>
              <div className="text-sm text-gray-600">Results Available</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.avgScore}%</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Exams Alert */}
      {exams.filter(exam => isExamToday(exam.date) && exam.status === 'upcoming').length > 0 && (
        <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-yellow-600" />
            <div>
              <h3 className="font-semibold text-yellow-800">Exam Today!</h3>
              <p className="text-yellow-700">
                You have {exams.filter(exam => isExamToday(exam.date)).length} exam(s) scheduled for today.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by subject, code, or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="midterm">Mid-term</option>
              <option value="final">Final</option>
              <option value="quiz">Quiz</option>
              <option value="practical">Practical</option>
              <option value="supplementary">Supplementary</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="subject">Sort by Subject</option>
              <option value="type">Sort by Type</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exams List */}
      <div className="space-y-4">
        {filteredAndSortedExams.map(exam => (
          <div key={exam.id} className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow ${
            isExamToday(exam.date) ? 'ring-2 ring-yellow-500 bg-yellow-50' : ''
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{exam.subject}</h3>
                  <span className="text-gray-600">({exam.subjectCode})</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getExamTypeColor(exam.type)}`}>
                    {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(exam.status)}`}>
                    {getStatusIcon(exam.status)}
                    {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(exam.date).toLocaleDateString()}</span>
                    {isExamToday(exam.date) && (
                      <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        Today
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(exam.startTime)} - {formatTime(exam.endTime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{exam.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{exam.instructor}</span>
                  </div>
                </div>

                {/* Exam Details */}
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                  <span>Duration: {exam.duration} minutes</span>
                  <span>Total Marks: {exam.totalMarks}</span>
                  {exam.marksObtained !== undefined && (
                    <span>Score: {exam.marksObtained}/{exam.totalMarks}</span>
                  )}
                  {exam.grade && (
                    <span className={`font-medium ${getGradeColor(exam.grade)}`}>
                      Grade: {exam.grade}
                    </span>
                  )}
                </div>

                {/* Registration Alert */}
                {exam.registrationRequired && !exam.isRegistered && isRegistrationOpen(exam) && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg mb-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-orange-800">Registration Required</span>
                    </div>
                    <p className="text-orange-700 text-sm mt-1">
                      Registration deadline: {exam.registrationDeadline ? new Date(exam.registrationDeadline).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                )}

                {/* Result Published Alert */}
                {exam.resultPublished && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Result Published</span>
                    </div>
                    {exam.resultDate && (
                      <p className="text-green-700 text-sm mt-1">
                        Published on: {new Date(exam.resultDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 ml-4">
                <button
                  onClick={() => {
                    setSelectedExam(exam);
                    setShowDetails(true);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>

                {exam.admitCardAvailable && (
                  <button
                    onClick={() => downloadAdmitCard(exam)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Admit Card
                  </button>
                )}

                {exam.resultPublished && (
                  <button
                    onClick={() => downloadResult(exam)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Result
                  </button>
                )}

                {isRegistrationOpen(exam) && (
                  <button
                    onClick={() => registerForExam(exam)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Register
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredAndSortedExams.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No exams found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Exam Details Modal */}
      {selectedExam && showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedExam.subject}</h2>
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedExam(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Exam Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Subject:</strong> {selectedExam.subject} ({selectedExam.subjectCode})</div>
                    <div><strong>Type:</strong> {selectedExam.type.charAt(0).toUpperCase() + selectedExam.type.slice(1)}</div>
                    <div><strong>Instructor:</strong> {selectedExam.instructor}</div>
                    <div><strong>Total Marks:</strong> {selectedExam.totalMarks}</div>
                    <div><strong>Duration:</strong> {selectedExam.duration} minutes</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Schedule & Venue</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Date:</strong> {new Date(selectedExam.date).toLocaleDateString()}</div>
                    <div><strong>Time:</strong> {formatTime(selectedExam.startTime)} - {formatTime(selectedExam.endTime)}</div>
                    <div><strong>Venue:</strong> {selectedExam.venue}</div>
                    <div><strong>Status:</strong> {selectedExam.status.charAt(0).toUpperCase() + selectedExam.status.slice(1)}</div>
                  </div>
                </div>
              </div>

              {selectedExam.instructions && selectedExam.instructions.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Exam Instructions</h3>
                  <ul className="space-y-1">
                    {selectedExam.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedExam.allowedMaterials && selectedExam.allowedMaterials.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Allowed Materials</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedExam.allowedMaterials.map((material, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedExam.resultPublished && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Exam Result</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>Marks Obtained:</strong> {selectedExam.marksObtained}/{selectedExam.totalMarks}</div>
                    <div><strong>Percentage:</strong> {selectedExam.marksObtained && ((selectedExam.marksObtained / selectedExam.totalMarks) * 100).toFixed(1)}%</div>
                    {selectedExam.grade && (
                      <div><strong>Grade:</strong> <span className={getGradeColor(selectedExam.grade)}>{selectedExam.grade}</span></div>
                    )}
                    {selectedExam.resultDate && (
                      <div><strong>Result Date:</strong> {new Date(selectedExam.resultDate).toLocaleDateString()}</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              {selectedExam.admitCardAvailable && (
                <button
                  onClick={() => downloadAdmitCard(selectedExam)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Admit Card
                </button>
              )}
              
              {selectedExam.resultPublished && (
                <button
                  onClick={() => downloadResult(selectedExam)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Result
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentExams;
