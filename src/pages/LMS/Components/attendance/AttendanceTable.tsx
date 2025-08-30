import React, { useState } from 'react';
import { Check, X, Clock, Users } from 'lucide-react';

interface AttendanceTableProps {
  course: string;
  date: string;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ course, date }) => {
  const [attendance, setAttendance] = useState<{ [key: string]: 'present' | 'absent' | 'late' }>({});

  const students = [
    { id: 1, name: 'John Smith', studentId: '2024001' },
    { id: 2, name: 'Sarah Johnson', studentId: '2024002' },
    { id: 3, name: 'Mike Chen', studentId: '2024003' },
    { id: 4, name: 'Emily Davis', studentId: '2024004' },
    { id: 5, name: 'David Wilson', studentId: '2024005' },
  ];

  const markAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  if (!course) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>Select a course to mark attendance</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Attendance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => {
              const status = attendance[student.studentId];
              return (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => markAttendance(student.studentId, 'present')}
                        className={`p-2 rounded-lg transition-colors ${
                          status === 'present'
                            ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-500'
                            : 'bg-gray-100 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600'
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => markAttendance(student.studentId, 'late')}
                        className={`p-2 rounded-lg transition-colors ${
                          status === 'late'
                            ? 'bg-orange-100 text-orange-700 border-2 border-orange-500'
                            : 'bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                        }`}
                      >
                        <Clock className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => markAttendance(student.studentId, 'absent')}
                        className={`p-2 rounded-lg transition-colors ${
                          status === 'absent'
                            ? 'bg-red-100 text-red-700 border-2 border-red-500'
                            : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600'
                        }`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Save as Draft
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;