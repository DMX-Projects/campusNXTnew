import React, { useState} from 'react';
import { 
  BarChart3Icon, 
  TrendingUpIcon, 
  TrendingDownIcon, 
  DownloadIcon,
  EyeIcon,
  AwardIcon,
  TargetIcon,
  BookOpenIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon,
  PrinterIcon,
  FileTextIcon
} from 'lucide-react';

interface Result {
  id: string;
  examName: string;
  subject: string;
  examType: 'internal' | 'external' | 'assignment' | 'project' | 'quiz';
  semester: string;
  examDate: string;
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
  gradePoint: number;
  percentage: number;
  rank?: number;
  totalStudents?: number;
  feedback?: string;
  instructor: string;
  status: 'published' | 'pending' | 'under-review';
}

interface SemesterSummary {
  semester: string;
  sgpa: number;
  totalCredits: number;
  earnedCredits: number;
  subjects: number;
  status: 'completed' | 'ongoing';
}

const ResultsStu: React.FC = () => {
  const [results] = useState<Result[]>([
    {
      id: '1',
      examName: 'Mid-term Examination',
      subject: 'Data Structures',
      examType: 'internal',
      semester: '3',
      examDate: '2025-08-15',
      maxMarks: 100,
      obtainedMarks: 87,
      grade: 'A',
      gradePoint: 9.0,
      percentage: 87,
      rank: 5,
      totalStudents: 65,
      feedback: 'Excellent understanding of concepts. Keep it up!',
      instructor: 'Dr. Rajesh Kumar',
      status: 'published'
    },
    {
      id: '2',
      examName: 'Assignment 1',
      subject: 'Database Management',
      examType: 'assignment',
      semester: '3',
      examDate: '2025-08-20',
      maxMarks: 50,
      obtainedMarks: 42,
      grade: 'A',
      gradePoint: 8.4,
      percentage: 84,
      feedback: 'Good work on SQL queries. Minor improvements needed in optimization.',
      instructor: 'Prof. Priya Sharma',
      status: 'published'
    },
    {
      id: '3',
      examName: 'Quiz 2',
      subject: 'Operating Systems',
      examType: 'quiz',
      semester: '3',
      examDate: '2025-08-25',
      maxMarks: 25,
      obtainedMarks: 23,
      grade: 'A+',
      gradePoint: 9.2,
      percentage: 92,
      rank: 2,
      totalStudents: 68,
      instructor: 'Dr. Amit Singh',
      status: 'published'
    },
    {
      id: '4',
      examName: 'Project Submission',
      subject: 'Software Engineering',
      examType: 'project',
      semester: '3',
      examDate: '2025-09-01',
      maxMarks: 100,
      obtainedMarks: 0,
      grade: '',
      gradePoint: 0,
      percentage: 0,
      instructor: 'Prof. Neha Gupta',
      status: 'pending'
    }
  ]);

  const [semesterSummaries] = useState<SemesterSummary[]>([
    {
      semester: '1',
      sgpa: 8.7,
      totalCredits: 22,
      earnedCredits: 22,
      subjects: 6,
      status: 'completed'
    },
    {
      semester: '2',
      sgpa: 8.9,
      totalCredits: 24,
      earnedCredits: 24,
      subjects: 6,
      status: 'completed'
    },
    {
      semester: '3',
      sgpa: 8.8,
      totalCredits: 26,
      earnedCredits: 20,
      subjects: 7,
      status: 'ongoing'
    }
  ]);

  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'detailed' | 'summary' | 'analytics'>('detailed');
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);

  const getGradeColor = (grade: string) => {
    const colors: { [key: string]: string } = {
      'A+': 'bg-green-100 text-green-800 border-green-200',
      'A': 'bg-green-100 text-green-800 border-green-200',
      'B+': 'bg-blue-100 text-blue-800 border-blue-200',
      'B': 'bg-blue-100 text-blue-800 border-blue-200',
      'C+': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'C': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'D': 'bg-red-100 text-red-800 border-red-200',
      'F': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[grade] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      published: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      'under-review': 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      internal: BookOpenIcon,
      external: AwardIcon,
      assignment: FileTextIcon,
      project: TargetIcon,
      quiz: CheckCircleIcon
    };
    return icons[type as keyof typeof icons] || BookOpenIcon;
  };

  const filteredResults = results.filter(result => {
    const semesterMatch = selectedSemester === 'all' || result.semester === selectedSemester;
    const typeMatch = selectedType === 'all' || result.examType === selectedType;
    return semesterMatch && typeMatch;
  });

  const calculateOverallStats = () => {
    const publishedResults = results.filter(r => r.status === 'published');
    const totalMarks = publishedResults.reduce((sum, r) => sum + r.maxMarks, 0);
    const obtainedMarks = publishedResults.reduce((sum, r) => sum + r.obtainedMarks, 0);
    const averagePercentage = publishedResults.length > 0 ? (obtainedMarks / totalMarks) * 100 : 0;
    const averageGradePoint = publishedResults.length > 0 
      ? publishedResults.reduce((sum, r) => sum + r.gradePoint, 0) / publishedResults.length 
      : 0;
    
    return {
      totalExams: results.length,
      publishedResults: publishedResults.length,
      pendingResults: results.filter(r => r.status === 'pending').length,
      averagePercentage: averagePercentage.toFixed(1),
      averageGradePoint: averageGradePoint.toFixed(2),
      cgpa: semesterSummaries.length > 0 
        ? (semesterSummaries.reduce((sum, s) => sum + s.sgpa, 0) / semesterSummaries.length).toFixed(2)
        : '0.00'
    };
  };

  const downloadResults = (format: 'pdf' | 'excel') => {
    // Simulate download
    const filename = `results_semester_${selectedSemester}.${format}`;
    alert(`Downloading ${filename}...`);
  };

  const printResults = () => {
    window.print();
  };

  const stats = calculateOverallStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Results</h1>
              <p className="text-gray-600 mt-1">View your academic performance and grades</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => downloadResults('pdf')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Download PDF
              </button>
              <button
                onClick={() => downloadResults('excel')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Export Excel
              </button>
              <button
                onClick={printResults}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PrinterIcon size={20} />
                Print
              </button>
            </div>
          </div>

          {/* Filters and View Mode */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex gap-2">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Semesters</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem.toString()}>Semester {sem}</option>
                ))}
              </select>
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="internal">Internal Exams</option>
                <option value="external">External Exams</option>
                <option value="assignment">Assignments</option>
                <option value="project">Projects</option>
                <option value="quiz">Quizzes</option>
              </select>
            </div>
            
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('detailed')}
                className={`px-4 py-2 ${viewMode === 'detailed' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Detailed View
              </button>
              <button
                onClick={() => setViewMode('summary')}
                className={`px-4 py-2 ${viewMode === 'summary' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Summary
              </button>
              <button
                onClick={() => setViewMode('analytics')}
                className={`px-4 py-2 ${viewMode === 'analytics' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Analytics
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">CGPA</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.cgpa}</p>
                </div>
                <StarIcon className="text-blue-600" size={24} />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Average %</p>
                  <p className="text-2xl font-bold text-green-900">{stats.averagePercentage}%</p>
                </div>
                <TrendingUpIcon className="text-green-600" size={24} />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Total Exams</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.totalExams}</p>
                </div>
                <BookOpenIcon className="text-purple-600" size={24} />
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Published</p>
                  <p className="text-2xl font-bold text-orange-900">{stats.publishedResults}</p>
                </div>
                <CheckCircleIcon className="text-orange-600" size={24} />
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Pending</p>
                  <p className="text-2xl font-bold text-yellow-900">{stats.pendingResults}</p>
                </div>
                <XCircleIcon className="text-yellow-600" size={24} />
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 text-sm font-medium">Avg GPA</p>
                  <p className="text-2xl font-bold text-indigo-900">{stats.averageGradePoint}</p>
                </div>
                <AwardIcon className="text-indigo-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {viewMode === 'detailed' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Detailed Results ({filteredResults.length})
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-medium text-gray-900">Exam Details</th>
                      <th className="text-left p-4 font-medium text-gray-900">Type</th>
                      <th className="text-left p-4 font-medium text-gray-900">Date</th>
                      <th className="text-left p-4 font-medium text-gray-900">Marks</th>
                      <th className="text-left p-4 font-medium text-gray-900">Grade</th>
                      <th className="text-left p-4 font-medium text-gray-900">Percentage</th>
                      <th className="text-left p-4 font-medium text-gray-900">Rank</th>
                      <th className="text-left p-4 font-medium text-gray-900">Status</th>
                      <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map(result => {
                      const TypeIcon = getTypeIcon(result.examType);
                      return (
                        <tr key={result.id} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <div className="font-medium text-gray-900">{result.examName}</div>
                              <div className="text-sm text-gray-600">{result.subject}</div>
                              <div className="text-sm text-gray-500">Sem {result.semester} • {result.instructor}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <TypeIcon size={16} className="text-gray-600" />
                              <span className="capitalize text-sm">{result.examType}</span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-700">
                            {new Date(result.examDate).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <div className="font-medium">
                              {result.obtainedMarks > 0 ? `${result.obtainedMarks}/${result.maxMarks}` : '-'}
                            </div>
                          </td>
                          <td className="p-4">
                            {result.grade ? (
                              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getGradeColor(result.grade)}`}>
                                {result.grade}
                              </span>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {result.percentage > 0 ? `${result.percentage}%` : '-'}
                              </span>
                              {result.percentage > 0 && (
                                result.percentage >= 90 ? (
                                  <TrendingUpIcon size={16} className="text-green-500" />
                                ) : result.percentage >= 75 ? (
                                  <TrendingUpIcon size={16} className="text-blue-500" />
                                ) : (
                                  <TrendingDownIcon size={16} className="text-red-500" />
                                )
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            {result.rank ? (
                              <div className="text-center">
                                <div className="font-bold text-blue-600">#{result.rank}</div>
                                <div className="text-xs text-gray-500">of {result.totalStudents}</div>
                              </div>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                              {result.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => {
                                setSelectedResult(result);
                                setShowResultModal(true);
                              }}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <EyeIcon size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'summary' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Semester-wise Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Semester-wise Performance</h2>
              <div className="space-y-4">
                {semesterSummaries.map(semester => (
                  <div key={semester.semester} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">Semester {semester.semester}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        semester.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {semester.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">SGPA:</span>
                        <span className="font-bold text-blue-600 ml-2">{semester.sgpa}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Credits:</span>
                        <span className="font-medium ml-2">{semester.earnedCredits}/{semester.totalCredits}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Subjects:</span>
                        <span className="font-medium ml-2">{semester.subjects}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium ml-2 ${
                          semester.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {semester.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grade Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Grade Distribution</h2>
              <div className="space-y-3">
                {['A+', 'A', 'B+', 'B', 'C+', 'C'].map(grade => {
                  const count = results.filter(r => r.grade === grade && r.status === 'published').length;
                  const percentage = results.length > 0 ? (count / results.length) * 100 : 0;
                  return (
                    <div key={grade} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getGradeColor(grade)}`}>
                          {grade}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'analytics' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Performance Analytics</h2>
            <div className="text-center py-12">
              <BarChart3Icon className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600 mb-6">
                Interactive charts and graphs showing your performance trends, 
                subject-wise analysis, and improvement suggestions.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                View Detailed Analytics
              </button>
            </div>
          </div>
        )}

        {/* Result Detail Modal */}
        {showResultModal && selectedResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Result Details</h2>
                <button
                  onClick={() => setShowResultModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700">Exam Information</h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><strong>Name:</strong> {selectedResult.examName}</p>
                      <p><strong>Subject:</strong> {selectedResult.subject}</p>
                      <p><strong>Type:</strong> {selectedResult.examType}</p>
                      <p><strong>Semester:</strong> {selectedResult.semester}</p>
                      <p><strong>Date:</strong> {new Date(selectedResult.examDate).toLocaleDateString()}</p>
                      <p><strong>Instructor:</strong> {selectedResult.instructor}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-700">Performance</h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><strong>Marks:</strong> {selectedResult.obtainedMarks}/{selectedResult.maxMarks}</p>
                      <p><strong>Percentage:</strong> {selectedResult.percentage}%</p>
                      <p><strong>Grade:</strong> {selectedResult.grade || 'Not assigned'}</p>
                      <p><strong>Grade Point:</strong> {selectedResult.gradePoint}</p>
                      {selectedResult.rank && (
                        <p><strong>Rank:</strong> #{selectedResult.rank} of {selectedResult.totalStudents}</p>
                      )}
                      <p><strong>Status:</strong> {selectedResult.status}</p>
                    </div>
                  </div>
                </div>
                
                {selectedResult.feedback && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Instructor Feedback</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800">{selectedResult.feedback}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <button
                    onClick={() => downloadResults('pdf')}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Download Certificate
                  </button>
                  <button
                    onClick={() => setShowResultModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredResults.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <BookOpenIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              {selectedSemester !== 'all' || selectedType !== 'all'
                ? 'Try adjusting your filters to see more results'
                : 'Your exam results will appear here once they are published'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsStu;
