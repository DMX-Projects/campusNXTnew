import React, { useState } from 'react';
import { Plus, Search, Download, Eye, Edit, Trash2, Calculator } from 'lucide-react';
import Modal from '../components/Modal';
import MarksForm from '../components/MarksForm';

const MarksList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [marksData, setMarksData] = useState([
    {
      id: 'M001',
      rollNo: '20CS001',
      studentName: 'John Doe',
      subject: 'Computer Networks',
      internalMarks: 18,
      externalMarks: 75,
      totalMarks: 93,
      grade: 'A',
      result: 'Pass',
      examDate: '2024-12-15'
    },
    {
      id: 'M002',
      rollNo: '20CS002',
      studentName: 'Jane Smith',
      subject: 'Computer Networks',
      internalMarks: 20,
      externalMarks: 68,
      totalMarks: 88,
      grade: 'A',
      result: 'Pass',
      examDate: '2024-12-15'
    },
    {
      id: 'M003',
      rollNo: '20CS003',
      studentName: 'Bob Wilson',
      subject: 'Computer Networks',
      internalMarks: 15,
      externalMarks: 42,
      totalMarks: 57,
      grade: 'D',
      result: 'Fail',
      examDate: '2024-12-15'
    }
  ]);

  // Grade calculation logic
  const calculateGrades = () => {
    const updatedMarks = marksData.map((mark) => {
      const total = mark.internalMarks + mark.externalMarks;
      let grade = '';
      let result = 'Fail';

      if (total >= 90) grade = 'A';
      else if (total >= 75) grade = 'B';
      else if (total >= 60) grade = 'C';
      else if (total >= 50) grade = 'D';
      else grade = 'F';

      if (grade !== 'F') result = 'Pass';

      return { ...mark, totalMarks: total, grade, result };
    });

    setMarksData(updatedMarks);
    alert('Grades recalculated successfully!');
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'Roll No',
      'Student Name',
      'Subject',
      'Internal (20)',
      'External (80)',
      'Total (100)',
      'Grade',
      'Result',
      'Exam Date'
    ];

    const rows = marksData.map((mark) => [
      mark.rollNo,
      mark.studentName,
      mark.subject,
      mark.internalMarks,
      mark.externalMarks,
      mark.totalMarks,
      mark.grade,
      mark.result,
      mark.examDate
    ]);

    let csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'marks_list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-100 text-green-800';
      case 'B':
        return 'bg-blue-100 text-blue-800';
      case 'C':
        return 'bg-yellow-100 text-yellow-800';
      case 'D':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getResultColor = (result: string) => {
    return result === 'Pass'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Marks</span>
          </button>
          <button
            onClick={calculateGrades}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors"
          >
            <Calculator className="h-4 w-4" />
            <span>Calculate Grades</span>
          </button>
          <button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">156</p>
            <p className="text-sm text-gray-600">Total Students</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">142</p>
            <p className="text-sm text-gray-600">Passed</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">14</p>
            <p className="text-sm text-gray-600">Failed</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">78.5</p>
            <p className="text-sm text-gray-600">Average Score</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Subjects</option>
              <option value="Computer Networks">Computer Networks</option>
              <option value="Database Management">Database Management</option>
              <option value="Operating Systems">Operating Systems</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Roll No
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Student Name
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Subject
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Internal (20)
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  External (80)
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Total (100)
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Grade
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Result
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {marksData
                .filter(
                  (mark) =>
                    mark.studentName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    mark.rollNo
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .filter(
                  (mark) =>
                    selectedSubject === 'all' ||
                    mark.subject === selectedSubject
                )
                .map((mark) => (
                  <tr
                    key={mark.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {mark.rollNo}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {mark.studentName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {mark.subject}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {mark.internalMarks}/20
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {mark.externalMarks}/80
                    </td>
                    <td className="py-3 px-4 text-sm font-bold text-gray-900">
                      {mark.totalMarks}/100
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${getGradeColor(
                          mark.grade
                        )}`}
                      >
                        {mark.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${getResultColor(
                          mark.result
                        )}`}
                      >
                        {mark.result}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-800 transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Student Marks"
      >
        <MarksForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default MarksList;
