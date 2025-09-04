 // StudentAcademicRecords.tsx
import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  BarChart3, 
  Download, 
  Eye, 
  Calendar,
  BookOpen,
  Award,
  Target,
  Filter,
  Search,
  FileText,
  Star,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  maxMarks: number;
  grade: string;
  gradePoint: number;
  status: 'pass' | 'fail' | 'absent';
  examType: 'regular' | 'supplementary';
}

interface SemesterResult {
  semester: number;
  academicYear: string;
  sgpa: number;
  totalCredits: number;
  earnedCredits: number;
  subjects: Subject[];
  resultDate: string;
  status: 'published' | 'pending' | 'withheld';
  percentage: number;
}

interface AcademicSummary {
  cgpa: number;
  totalCredits: number;
  earnedCredits: number;
  overallPercentage: number;
  rank?: number;
  totalStudents?: number;
  distinctions: number;
  backlogs: number;
}

const StudentAcademicRecords: React.FC = () => {
  // Student Information
  const [studentInfo] = useState({
    name: 'Arjun Kumar',
    rollNumber: '2022CSE001',
    registrationNumber: 'REG2022001',
    department: 'Computer Science Engineering',
    course: 'Bachelor of Technology',
    batch: '2022-2026',
    section: 'A',
    currentSemester: 5,
    admissionDate: '2022-08-15',
    profileImage: '/api/placeholder/100/100'
  });

  // Academic Results Data
  const [semesterResults] = useState<SemesterResult[]>([
    {
      semester: 1,
      academicYear: '2022-23',
      sgpa: 8.2,
      totalCredits: 22,
      earnedCredits: 22,
      percentage: 78.5,
      resultDate: '2023-01-15',
      status: 'published',
      subjects: [
        {
          id: 'CS101',
          code: 'CS101',
          name: 'Programming Fundamentals',
          credits: 4,
          internalMarks: 18,
          externalMarks: 62,
          totalMarks: 80,
          maxMarks: 100,
          grade: 'A',
          gradePoint: 9,
          status: 'pass',
          examType: 'regular'
        },
        {
          id: 'MA101',
          code: 'MA101', 
          name: 'Engineering Mathematics I',
          credits: 4,
          internalMarks: 16,
          externalMarks: 58,
          totalMarks: 74,
          maxMarks: 100,
          grade: 'B+',
          gradePoint: 8,
          status: 'pass',
          examType: 'regular'
        },
        {
          id: 'PH101',
          code: 'PH101',
          name: 'Engineering Physics',
          credits: 3,
          internalMarks: 19,
          externalMarks: 65,
          totalMarks: 84,
          maxMarks: 100,
          grade: 'A',
          gradePoint: 9,
          status: 'pass',
          examType: 'regular'
        }
      ]
    },
    {
      semester: 2,
      academicYear: '2022-23',
      sgpa: 8.5,
      totalCredits: 24,
      earnedCredits: 24,
      percentage: 81.2,
      resultDate: '2023-07-20',
      status: 'published',
      subjects: [
        {
          id: 'CS102',
          code: 'CS102',
          name: 'Data Structures',
          credits: 4,
          internalMarks: 20,
          externalMarks: 68,
          totalMarks: 88,
          maxMarks: 100,
          grade: 'A+',
          gradePoint: 10,
          status: 'pass',
          examType: 'regular'
        },
        {
          id: 'MA102',
          code: 'MA102',
          name: 'Engineering Mathematics II',
          credits: 4,
          internalMarks: 17,
          externalMarks: 60,
          totalMarks: 77,
          maxMarks: 100,
          grade: 'B+',
          gradePoint: 8,
          status: 'pass',
          examType: 'regular'
        }
      ]
    },
    {
      semester: 3,
      academicYear: '2023-24',
      sgpa: 8.8,
      totalCredits: 26,
      earnedCredits: 26,
      percentage: 84.3,
      resultDate: '2024-01-10',
      status: 'published',
      subjects: [
        {
          id: 'CS301',
          code: 'CS301',
          name: 'Database Management Systems',
          credits: 4,
          internalMarks: 19,
          externalMarks: 72,
          totalMarks: 91,
          maxMarks: 100,
          grade: 'A+',
          gradePoint: 10,
          status: 'pass',
          examType: 'regular'
        },
        {
          id: 'CS302',
          code: 'CS302',
          name: 'Operating Systems',
          credits: 4,
          internalMarks: 18,
          externalMarks: 65,
          totalMarks: 83,
          maxMarks: 100,
          grade: 'A',
          gradePoint: 9,
          status: 'pass',
          examType: 'regular'
        }
      ]
    },
    {
      semester: 4,
      academicYear: '2023-24',
      sgpa: 9.1,
      totalCredits: 25,
      earnedCredits: 25,
      percentage: 87.6,
      resultDate: '2024-07-15',
      status: 'published',
      subjects: [
        {
          id: 'CS401',
          code: 'CS401',
          name: 'Computer Networks',
          credits: 4,
          internalMarks: 20,
          externalMarks: 75,
          totalMarks: 95,
          maxMarks: 100,
          grade: 'A+',
          gradePoint: 10,
          status: 'pass',
          examType: 'regular'
        }
      ]
    }
  ]);

  const [selectedSemester, setSelectedSemester] = useState<number>(4);
  const [viewMode, setViewMode] = useState<'semester' | 'summary' | 'transcript'>('semester');
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate Academic Summary
  const academicSummary = useMemo((): AcademicSummary => {
    const publishedResults = semesterResults.filter(result => result.status === 'published');
    
    let totalCredits = 0;
    let totalGradePoints = 0;
    let earnedCredits = 0;
    let totalMarks = 0;
    let totalMaxMarks = 0;
    let distinctions = 0;
    let backlogs = 0;

    publishedResults.forEach(result => {
      totalCredits += result.totalCredits;
      earnedCredits += result.earnedCredits;
      
      result.subjects.forEach(subject => {
        totalGradePoints += subject.gradePoint * subject.credits;
        totalMarks += subject.totalMarks;
        totalMaxMarks += subject.maxMarks;
        
        if (subject.grade === 'A+' || subject.grade === 'A') {
          distinctions++;
        }
        if (subject.status === 'fail') {
          backlogs++;
        }
      });
    });

    const cgpa = totalCredits > 0 ? Number((totalGradePoints / totalCredits).toFixed(2)) : 0;
    const overallPercentage = totalMaxMarks > 0 ? Number(((totalMarks / totalMaxMarks) * 100).toFixed(2)) : 0;

    return {
      cgpa,
      totalCredits,
      earnedCredits,
      overallPercentage,
      distinctions,
      backlogs,
      rank: 15,
      totalStudents: 120
    };
  }, [semesterResults]);

  // Get grade color
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800 border-green-200';
      case 'A': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'B+': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'B': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'C': return 'bg-red-100 text-red-800 border-red-200';
      case 'F': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'fail': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'absent': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default: return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
  };

  // Download transcript
  const downloadTranscript = () => {
    alert('Downloading official transcript...');
  };

  // Filter subjects based on search
  const filteredSubjects = useMemo(() => {
    const selectedResult = semesterResults.find(result => result.semester === selectedSemester);
    if (!selectedResult) return [];
    
    return selectedResult.subjects.filter(subject =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [semesterResults, selectedSemester, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Academic Records & Results</h1>
              <div className="text-gray-600">
                <p>{studentInfo.name} • {studentInfo.rollNumber}</p>
                <p>{studentInfo.department} • {studentInfo.course}</p>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">CGPA: {academicSummary.cgpa}</div>
            <div className="text-sm text-gray-600">
              Overall: {academicSummary.overallPercentage}% | Rank: {academicSummary.rank}/{academicSummary.totalStudents}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{academicSummary.cgpa}</div>
              <div className="text-sm text-gray-600">Current CGPA</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{academicSummary.earnedCredits}</div>
              <div className="text-sm text-gray-600">Credits Earned</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{academicSummary.distinctions}</div>
              <div className="text-sm text-gray-600">Distinctions</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{academicSummary.overallPercentage}%</div>
              <div className="text-sm text-gray-600">Overall Percentage</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'semester', label: 'Semester Results', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'summary', label: 'Academic Summary', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'transcript', label: 'Transcript', icon: <FileText className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                viewMode === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {viewMode === 'semester' && (
            <div className="space-y-6">
              {/* Semester Selection and Search */}
              <div className="flex flex-col md:flex-row gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Semester</label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(parseInt(e.target.value))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {semesterResults.map(result => (
                      <option key={result.semester} value={result.semester}>
                        Semester {result.semester} ({result.academicYear})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search Subjects</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by subject name or code..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Semester Performance Summary */}
              {semesterResults.find(r => r.semester === selectedSemester) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {semesterResults.find(r => r.semester === selectedSemester)?.sgpa}
                      </div>
                      <div className="text-sm text-blue-700">SGPA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {semesterResults.find(r => r.semester === selectedSemester)?.percentage}%
                      </div>
                      <div className="text-sm text-blue-700">Percentage</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {semesterResults.find(r => r.semester === selectedSemester)?.earnedCredits}
                      </div>
                      <div className="text-sm text-blue-700">Credits Earned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {semesterResults.find(r => r.semester === selectedSemester)?.subjects.length}
                      </div>
                      <div className="text-sm text-blue-700">Subjects</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Subject Results Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Subject Code</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Subject Name</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Credits</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Internal</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">External</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Total</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Grade</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubjects.map(subject => (
                      <tr key={subject.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium">{subject.code}</td>
                        <td className="border border-gray-300 px-4 py-3">{subject.name}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">{subject.credits}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">{subject.internalMarks}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">{subject.externalMarks}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-medium">
                          {subject.totalMarks}/{subject.maxMarks}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getGradeColor(subject.grade)}`}>
                            {subject.grade}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {getStatusIcon(subject.status)}
                            <span className="capitalize">{subject.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {viewMode === 'summary' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Academic Performance Summary</h3>
              
              {/* Performance Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">SGPA Trend</h4>
                  <div className="space-y-3">
                    {semesterResults.map(result => (
                      <div key={result.semester} className="flex items-center justify-between">
                        <span className="text-gray-600">Semester {result.semester}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(result.sgpa / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-medium text-blue-600">{result.sgpa}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h4>
                  <div className="space-y-3">
                    {['A+', 'A', 'B+', 'B', 'C'].map(grade => {
                      const count = semesterResults.flatMap(r => r.subjects).filter(s => s.grade === grade).length;
                      return (
                        <div key={grade} className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(grade)}`}>
                            {grade}
                          </span>
                          <span className="font-medium">{count} subjects</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Semester-wise Results Summary */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Semester-wise Performance</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Semester</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Academic Year</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">SGPA</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Percentage</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Credits</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {semesterResults.map(result => (
                        <tr key={result.semester} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 text-center font-medium">{result.semester}</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">{result.academicYear}</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-medium text-blue-600">{result.sgpa}</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">{result.percentage}%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">{result.earnedCredits}/{result.totalCredits}</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              result.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {result.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'transcript' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Official Transcript</h3>
                <button
                  onClick={downloadTranscript}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Transcript
                </button>
              </div>

              {/* Student Details */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Student Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Name:</strong> {studentInfo.name}</div>
                      <div><strong>Roll Number:</strong> {studentInfo.rollNumber}</div>
                      <div><strong>Registration:</strong> {studentInfo.registrationNumber}</div>
                      <div><strong>Course:</strong> {studentInfo.course}</div>
                      <div><strong>Department:</strong> {studentInfo.department}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Academic Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>CGPA:</strong> {academicSummary.cgpa}</div>
                      <div><strong>Overall Percentage:</strong> {academicSummary.overallPercentage}%</div>
                      <div><strong>Credits Earned:</strong> {academicSummary.earnedCredits}/{academicSummary.totalCredits}</div>
                      <div><strong>Class Rank:</strong> {academicSummary.rank}/{academicSummary.totalStudents}</div>
                      <div><strong>Batch:</strong> {studentInfo.batch}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete Academic Record */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Complete Academic Record</h4>
                {semesterResults.map(result => (
                  <div key={result.semester} className="mb-8">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center">
                        <h5 className="font-semibold text-blue-900">
                          Semester {result.semester} ({result.academicYear})
                        </h5>
                        <div className="text-blue-900">
                          SGPA: <span className="font-bold">{result.sgpa}</span> | 
                          Percentage: <span className="font-bold">{result.percentage}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300 mb-6">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-900">Subject Code</th>
                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-900">Subject Name</th>
                            <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-900">Credits</th>
                            <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-900">Marks</th>
                            <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-900">Grade</th>
                            <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-900">Grade Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.subjects.map(subject => (
                            <tr key={subject.id} className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-3 py-2 text-sm font-medium">{subject.code}</td>
                              <td className="border border-gray-300 px-3 py-2 text-sm">{subject.name}</td>
                              <td className="border border-gray-300 px-3 py-2 text-center text-sm">{subject.credits}</td>
                              <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                {subject.totalMarks}/{subject.maxMarks}
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(subject.grade)}`}>
                                  {subject.grade}
                                </span>
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">{subject.gradePoint}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              {/* Transcript Footer */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center text-sm text-gray-600">
                <p>This is a system-generated transcript. For official purposes, please contact the Academic Office.</p>
                <p className="mt-2">Generated on: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAcademicRecords;
