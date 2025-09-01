import React from 'react';

// Static data updated to include results for multiple semesters
const studentResults = {
  name: 'Rahul Sharma',
  studentId: 'B-TECH/CS/2023/001',
  summary: {
    gpa: 8.5,
    cgpa: 8.2,
    status: 'Good Standing',
  },
  semesters: [
    {
      name: 'Semester 1',
      gpa: 7.8,
      details: [
        { id: 1, course: 'M-101', name: 'Calculus I', marks: 'B+', result: 'Pass' },
        { id: 2, course: 'PH-102', name: 'Physics for Engineers', marks: 'A-', result: 'Pass' },
        { id: 3, course: 'CS-103', name: 'Introduction to Programming', marks: 'A', result: 'Pass' },
      ],
    },
    {
      name: 'Semester 2',
      gpa: 8.0,
      details: [
        { id: 1, course: 'M-201', name: 'Linear Algebra', marks: 'A-', result: 'Pass' },
        { id: 2, course: 'EE-202', name: 'Basic Electrical Engineering', marks: 'B', result: 'Pass' },
        { id: 3, course: 'CS-203', name: 'Object-Oriented Programming', marks: 'A', result: 'Pass' },
      ],
    },
    {
      name: 'Semester 3',
      gpa: 8.5,
      details: [
        { id: 1, course: 'CS-301', name: 'Data Structures', marks: 'A', result: 'Pass' },
        { id: 2, course: 'CS-302', name: 'Algorithms', marks: 'B+', result: 'Pass' },
        { id: 3, course: 'CS-303', name: 'Database Management Systems', marks: 'A-', result: 'Pass' },
      ],
    },
    {
      name: 'Semester 4',
      gpa: 8.2,
      details: [
        { id: 1, course: 'CS-401', name: 'Operating Systems', marks: 'A', result: 'Pass' },
        { id: 2, course: 'CS-402', name: 'Software Engineering', marks: 'B+', result: 'Pass' },
        { id: 3, course: 'HS-401', name: 'Professional Ethics', marks: 'A+', result: 'Pass' },
      ],
    },
  ],
};

const YourChildResults = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">Your Child's Results 📈</h1>
      <p className="text-lg text-center text-gray-600 mb-8">{studentResults.name} ({studentResults.studentId})</p>

      {/* Results Summary Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500 font-medium">Latest Semester GPA</p>
          <p className="text-4xl font-bold text-green-600 mt-1">{studentResults.semesters[studentResults.semesters.length - 1].gpa}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500 font-medium">Cumulative CGPA</p>
          <p className="text-4xl font-bold text-blue-600 mt-1">{studentResults.summary.cgpa}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500 font-medium">Academic Status</p>
          <p className={`text-4xl font-bold mt-1 ${
            studentResults.summary.status === 'Good Standing' ? 'text-green-600' : 'text-red-600'
          }`}>{studentResults.summary.status}</p>
        </div>
      </div>

      <hr className="my-8" />

      {/* Detailed Results Tables for each semester */}
      <div className="max-w-5xl mx-auto space-y-8">
        {studentResults.semesters.map((semester, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">{semester.name} Results</h2>
              <p className="text-blue-600 font-medium">GPA: {semester.gpa}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {semester.details.map((subject, subjectIndex) => (
                    <tr key={subjectIndex} className={subject.result === 'Pass' ? 'hover:bg-gray-50' : 'bg-red-50 hover:bg-red-100'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subject.course}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-gray-900">{subject.marks}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          subject.result === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {subject.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-8" />

      {/* Grade Legend Section */}
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Grade Legend</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
          <div><span className="font-bold">A+</span>: 95-100</div>
          <div><span className="font-bold">A</span>: 90-94</div>
          <div><span className="font-bold">A-</span>: 85-89</div>
          <div><span className="font-bold">B+</span>: 80-84</div>
          <div><span className="font-bold">B</span>: 75-79</div>
          <div><span className="font-bold">B-</span>: 70-74</div>
          <div><span className="font-bold">C+</span>: 65-69</div>
          <div><span className="font-bold">C</span>: 60-64</div>
        </div>
      </div>
    </div>
  );
};

export default YourChildResults;