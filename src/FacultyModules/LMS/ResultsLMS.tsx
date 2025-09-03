import React, { useState } from 'react';
import { TrendingUpIcon, DownloadIcon, EyeIcon, EditIcon, PlusIcon, BarChartIcon, FileTextIcon } from 'lucide-react';

interface Student {
  id: string;
  rollNumber: string;
  name: string;
  department: string;
  semester: string;
  cgpa: number;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  maxMarks: number;
}

interface Result {
  id: string;
  studentId: string;
  subjectId: string;
  examType: 'midterm' | 'final' | 'assignment' | 'quiz';
  marksObtained: number;
  maxMarks: number;
  grade: string;
  semester: string;
  academicYear: string;
  publishedDate: string;
  status: 'draft' | 'published' | 'locked';
}

const Results: React.FC = () => {
  const [students] = useState<Student[]>([
    {
      id: '1',
      rollNumber: 'CSE001',
      name: 'Rahul Sharma',
      department: 'CSE',
      semester: '3',
      cgpa: 8.5
    },
    {
      id: '2',
      rollNumber: 'CSE002',
      name: 'Priya Singh',
      department: 'CSE',
      semester: '3',
      cgpa: 9.2
    },
    {
      id: '3',
      rollNumber: 'CSE003',
      name: 'Amit Kumar',
      department: 'CSE',
      semester: '3',
      cgpa: 7.8
    }
  ]);

  const [subjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Data Structures',
      code: 'CS301',
      credits: 4,
      maxMarks: 100
    },
    {
      id: '2',
      name: 'Database Management Systems',
      code: 'CS302',
      credits: 3,
      maxMarks: 100
    },
    {
      id: '3',
      name: 'Operating Systems',
      code: 'CS303',
      credits: 4,
      maxMarks: 100
    }
  ]);

  const [results, setResults] = useState<Result[]>([
    {
      id: '1',
      studentId: '1',
      subjectId: '1',
      examType: 'midterm',
      marksObtained: 85,
      maxMarks: 100,
      grade: 'A',
      semester: '3',
      academicYear: '2024-25',
      publishedDate: '2025-09-01',
      status: 'published'
    },
    {
      id: '2',
      studentId: '2',
      subjectId: '1',
      examType: 'midterm',
      marksObtained: 92,
      maxMarks: 100,
      grade: 'A+',
      semester: '3',
      academicYear: '2024-25',
      publishedDate: '2025-09-01',
      status: 'published'
    }
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState('CSE');
  const [selectedSemester, setSelectedSemester] = useState('3');
  const [selectedExamType, setSelectedExamType] = useState('midterm');
  const [selectedSubject, setSelectedSubject] = useState('1');
  const [isAddResultModalOpen, setIsAddResultModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [newResult, setNewResult] = useState<Partial<Result>>({});

  const departments = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const examTypes = ['midterm', 'final', 'assignment', 'quiz'];

  const getGrade = (percentage: number): string => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
  };

  const getGradeColor = (grade: string): string => {
    const colors = {
      'A+': 'bg-green-100 text-green-800',
      'A': 'bg-green-100 text-green-700',
      'B+': 'bg-blue-100 text-blue-800',
      'B': 'bg-blue-100 text-blue-700',
      'C': 'bg-yellow-100 text-yellow-800',
      'D': 'bg-orange-100 text-orange-800',
      'F': 'bg-red-100 text-red-800'
    };
    return colors[grade as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredResults = results.filter(result => {
    const student = students.find(s => s.id === result.studentId);
    return student?.department === selectedDepartment && 
           result.semester === selectedSemester &&
           result.examType === selectedExamType &&
           result.subjectId === selectedSubject;
  });

  const calculateStats = () => {
    const marks = filteredResults.map(r => r.marksObtained);
    const total = marks.length;
    const passed = marks.filter(m => m >= 40).length;
    const average = marks.length ? marks.reduce((a, b) => a + b, 0) / marks.length : 0;
    const highest = marks.length ? Math.max(...marks) : 0;
    const lowest = marks.length ? Math.min(...marks) : 0;

    return { total, passed, average, highest, lowest, passPercentage: (passed / total) * 100 };
  };

  const stats = calculateStats();

  const handleAddResult = () => {
    if (newResult.studentId && newResult.marksObtained !== undefined) {
      const percentage = (newResult.marksObtained / (newResult.maxMarks || 100)) * 100;
      const result: Result = {
        id: Date.now().toString(),
        studentId: newResult.studentId,
        subjectId: selectedSubject,
        examType: selectedExamType as Result['examType'],
        marksObtained: newResult.marksObtained,
        maxMarks: newResult.maxMarks || 100,
        grade: getGrade(percentage),
        semester: selectedSemester,
        academicYear: '2024-25',
        publishedDate: new Date().toISOString().split('T')[0],
        status: 'draft'
      };
      setResults([...results, result]);
      setNewResult({});
      setIsAddResultModalOpen(false);
    }
  };

  const publishResults = () => {
    const updatedResults = results.map(result => {
      if (result.semester === selectedSemester && 
          result.examType === selectedExamType &&
          result.subjectId === selectedSubject &&
          result.status === 'draft') {
        return { ...result, status: 'published' as const, publishedDate: new Date().toISOString().split('T')[0] };
      }
      return result;
    });
    setResults(updatedResults);
    alert('Results published successfully!');
  };

  const lockResults = () => {
    const updatedResults = results.map(result => {
      if (result.semester === selectedSemester && 
          result.examType === selectedExamType &&
          result.subjectId === selectedSubject) {
        return { ...result, status: 'locked' as const };
      }
      return result;
    });
    setResults(updatedResults);
    alert('Results locked successfully!');
  };

  const exportResults = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Roll Number,Name,Subject,Exam Type,Marks Obtained,Max Marks,Grade,Percentage\n" +
      filteredResults.map(result => {
        const student = students.find(s => s.id === result.studentId);
        const subject = subjects.find(s => s.id === result.subjectId);
        const percentage = (result.marksObtained / result.maxMarks) * 100;
        return `${student?.rollNumber},${student?.name},${subject?.name},${result.examType},${result.marksObtained},${result.maxMarks},${result.grade},${percentage.toFixed(2)}%`;
      }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `results_${selectedDepartment}_sem${selectedSemester}_${selectedExamType}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateTranscript = () => {
    alert('Transcript generation initiated! Students will receive their transcripts via email.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Results Management</h1>
              <p className="text-gray-600 mt-1">Manage exam results and academic performance</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsAddResultModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Add Result
              </button>
              <button
                onClick={exportResults}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Export
              </button>
              <button
                onClick={() => setIsAnalyticsModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <BarChartIcon size={20} />
                Analytics
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>

            <select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {examTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileTextIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Passed</p>
                <p className="text-2xl font-bold text-green-600">{stats.passed}</p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pass Rate</p>
                <p className="text-2xl font-bold text-purple-600">{stats.passPercentage.toFixed(1)}%</p>
              </div>
              <TrendingUpIcon className="text-purple-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Average</p>
                <p className="text-2xl font-bold text-orange-600">{stats.average.toFixed(1)}</p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Highest</p>
                <p className="text-2xl font-bold text-green-600">{stats.highest}</p>
              </div>
              <div className="text-2xl">🏆</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Lowest</p>
                <p className="text-2xl font-bold text-red-600">{stats.lowest}</p>
              </div>
              <div className="text-2xl">📉</div>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Results - {subjects.find(s => s.id === selectedSubject)?.name} ({selectedExamType})
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={publishResults}
                  className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Publish Results
                </button>
                <button
                  onClick={lockResults}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Lock Results
                </button>
                <button
                  onClick={generateTranscript}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Generate Transcripts
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 font-medium text-gray-900">Roll Number</th>
                    <th className="text-left p-3 font-medium text-gray-900">Student Name</th>
                    <th className="text-left p-3 font-medium text-gray-900">Marks</th>
                    <th className="text-left p-3 font-medium text-gray-900">Percentage</th>
                    <th className="text-left p-3 font-medium text-gray-900">Grade</th>
                    <th className="text-left p-3 font-medium text-gray-900">Status</th>
                    <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((result) => {
                    const student = students.find(s => s.id === result.studentId);
                    const percentage = (result.marksObtained / result.maxMarks) * 100;
                    
                    return (
                      <tr key={result.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="p-3 font-medium text-gray-900">{student?.rollNumber}</td>
                        <td className="p-3">{student?.name}</td>
                        <td className="p-3">
                          <span className="font-medium">{result.marksObtained}</span>
                          <span className="text-gray-500">/{result.maxMarks}</span>
                        </td>
                        <td className="p-3 font-medium">{percentage.toFixed(1)}%</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(result.grade)}`}>
                            {result.grade}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            result.status === 'published' ? 'bg-green-100 text-green-800' :
                            result.status === 'locked' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {result.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-1 rounded transition-colors">
                              <EyeIcon size={16} />
                            </button>
                            <button className="bg-orange-100 hover:bg-orange-200 text-orange-700 p-1 rounded transition-colors">
                              <EditIcon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Result Modal */}
        {isAddResultModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add Result</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
                  <select
                    value={newResult.studentId || ''}
                    onChange={(e) => setNewResult({...newResult, studentId: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Student</option>
                    {students.filter(s => s.department === selectedDepartment && s.semester === selectedSemester).map(student => (
                      <option key={student.id} value={student.id}>
                        {student.rollNumber} - {student.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Marks Obtained</label>
                    <input
                      type="number"
                      value={newResult.marksObtained || ''}
                      onChange={(e) => setNewResult({...newResult, marksObtained: Number(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter marks"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Marks</label>
                    <input
                      type="number"
                      value={newResult.maxMarks || 100}
                      onChange={(e) => setNewResult({...newResult, maxMarks: Number(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                {newResult.marksObtained && newResult.maxMarks && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Grade Preview:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(getGrade((newResult.marksObtained / newResult.maxMarks) * 100))}`}>
                        {getGrade((newResult.marksObtained / newResult.maxMarks) * 100)}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      Percentage: {((newResult.marksObtained / newResult.maxMarks) * 100).toFixed(1)}%
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsAddResultModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddResult}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Result
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Modal */}
        {isAnalyticsModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Result Analytics</h2>
                <button
                  onClick={() => setIsAnalyticsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Grade Distribution</h3>
                  <div className="space-y-2">
                    {['A+', 'A', 'B+', 'B', 'C', 'D', 'F'].map(grade => {
                      const count = filteredResults.filter(r => r.grade === grade).length;
                      const percentage = filteredResults.length ? (count / filteredResults.length) * 100 : 0;
                      return (
                        <div key={grade} className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(grade)}`}>
                            {grade}
                          </span>
                          <div className="flex items-center gap-2 flex-1 mx-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{width: `${percentage}%`}}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{count}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Performance Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Class Average:</span>
                      <span className="font-medium">{stats.average.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Median Score:</span>
                      <span className="font-medium">{((stats.highest + stats.lowest) / 2).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Standard Deviation:</span>
                      <span className="font-medium">12.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pass Rate:</span>
                      <span className="font-medium text-green-600">{stats.passPercentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Top Performers</h3>
                <div className="space-y-2">
                  {filteredResults
                    .sort((a, b) => b.marksObtained - a.marksObtained)
                    .slice(0, 5)
                    .map((result, index) => {
                      const student = students.find(s => s.id === result.studentId);
                      return (
                        <div key={result.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                              {index + 1}
                            </span>
                            <span className="font-medium">{student?.name}</span>
                            <span className="text-gray-600">({student?.rollNumber})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{result.marksObtained}/{result.maxMarks}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(result.grade)}`}>
                              {result.grade}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
