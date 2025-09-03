import React, { useState } from 'react';
import { FileTextIcon, DownloadIcon, PrinterIcon, SearchIcon,  CalendarIcon, UserIcon } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  semester: string;
  batch: string;
  email: string;
  phone: string;
  photoUrl: string;
}

interface ExamSchedule {
  id: string;
  examType: 'midterm' | 'final' | 'supplementary' | 'improvement';
  department: string;
  semester: string;
  startDate: string;
  endDate: string;
  venue: string;
  instructions: string[];
  status: 'scheduled' | 'ongoing' | 'completed';
}

interface HallTicket {
  id: string;
  studentId: string;
  examScheduleId: string;
  ticketNumber: string;
  generatedDate: string;
  isGenerated: boolean;
  downloadCount: number;
  examCenter: string;
  seatNumber: string;
  reportingTime: string;
}

const HallTicketComponent: React.FC = () => {
  const [students] = useState<Student[]>([
    {
      id: 'S001',
      name: 'Rahul Sharma',
      rollNumber: 'CSE001',
      department: 'CSE',
      semester: '3',
      batch: '2023-27',
      email: 'rahul.sharma@college.edu',
      phone: '+91-9876543210',
      photoUrl: '👨‍🎓'
    },
    {
      id: 'S002',
      name: 'Priya Singh',
      rollNumber: 'CSE002',
      department: 'CSE',
      semester: '3',
      batch: '2023-27',
      email: 'priya.singh@college.edu',
      phone: '+91-9876543211',
      photoUrl: '👩‍🎓'
    },
    {
      id: 'S003',
      name: 'Amit Kumar',
      rollNumber: 'CSE003',
      department: 'CSE',
      semester: '3',
      batch: '2023-27',
      email: 'amit.kumar@college.edu',
      phone: '+91-9876543212',
      photoUrl: '👨‍🎓'
    }
  ]);

  const [examSchedules] = useState<ExamSchedule[]>([
    {
      id: 'EX001',
      examType: 'midterm',
      department: 'CSE',
      semester: '3',
      startDate: '2025-09-15',
      endDate: '2025-09-25',
      venue: 'Main Examination Hall',
      instructions: [
        'Report 30 minutes before exam time',
        'Carry valid ID card and hall ticket',
        'Mobile phones not allowed in exam hall',
        'Use blue/black pen only'
      ],
      status: 'scheduled'
    },
    {
      id: 'EX002',
      examType: 'final',
      department: 'CSE',
      semester: '3',
      startDate: '2025-12-01',
      endDate: '2025-12-15',
      venue: 'Academic Block A',
      instructions: [
        'Report 30 minutes before exam time',
        'Carry valid ID card and hall ticket',
        'Calculators allowed for specific subjects',
        'No external materials allowed'
      ],
      status: 'scheduled'
    }
  ]);

  const [hallTickets, setHallTickets] = useState<HallTicket[]>([
    {
      id: 'HT001',
      studentId: 'S001',
      examScheduleId: 'EX001',
      ticketNumber: 'HT2025001',
      generatedDate: '2025-09-01',
      isGenerated: true,
      downloadCount: 3,
      examCenter: 'Main Campus',
      seatNumber: 'A-101',
      reportingTime: '09:30 AM'
    },
    {
      id: 'HT002',
      studentId: 'S002',
      examScheduleId: 'EX001',
      ticketNumber: 'HT2025002',
      generatedDate: '2025-09-01',
      isGenerated: true,
      downloadCount: 1,
      examCenter: 'Main Campus',
      seatNumber: 'A-102',
      reportingTime: '09:30 AM'
    }
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedExam, setSelectedExam] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isViewTicketModalOpen, setIsViewTicketModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<HallTicket | null>(null);
  const [bulkSelection, setBulkSelection] = useState<string[]>([]);

  const departments = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getExamTypeColor = (type: string) => {
    const colors = {
      midterm: 'bg-orange-100 text-orange-800',
      final: 'bg-red-100 text-red-800',
      supplementary: 'bg-purple-100 text-purple-800',
      improvement: 'bg-green-100 text-green-800'
    };
    return colors[type as keyof typeof colors];
  };

  const filteredStudents = students.filter(student => 
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedDepartment === 'all' || student.department === selectedDepartment)
  );

  const generateHallTicket = (studentId: string, examScheduleId: string) => {
    const existingTicket = hallTickets.find(ht => 
      ht.studentId === studentId && ht.examScheduleId === examScheduleId
    );
    
    if (existingTicket) {
      alert('Hall ticket already generated for this student and exam!');
      return;
    }

    const newTicket: HallTicket = {
      id: Date.now().toString(),
      studentId,
      examScheduleId,
      ticketNumber: `HT${Date.now()}`,
      generatedDate: new Date().toISOString().split('T')[0],
      isGenerated: true,
      downloadCount: 0,
      examCenter: 'Main Campus',
      seatNumber: `A-${Math.floor(Math.random() * 999) + 100}`,
      reportingTime: '09:30 AM'
    };

    setHallTickets([...hallTickets, newTicket]);
    alert(`Hall ticket generated successfully!\nTicket Number: ${newTicket.ticketNumber}\nSeat Number: ${newTicket.seatNumber}`);
  };

  const bulkGenerateHallTickets = () => {
    if (!selectedExam || selectedExam === 'all') {
      alert('Please select a specific exam to generate bulk hall tickets!');
      return;
    }

    const studentsToGenerate = bulkSelection.length > 0 ? bulkSelection : filteredStudents.map(s => s.id);
    let generated = 0;

    studentsToGenerate.forEach(studentId => {
      const existingTicket = hallTickets.find(ht => 
        ht.studentId === studentId && ht.examScheduleId === selectedExam
      );
      
      if (!existingTicket) {
        const newTicket: HallTicket = {
          id: `${Date.now()}_${studentId}`,
          studentId,
          examScheduleId: selectedExam,
          ticketNumber: `HT${Date.now()}${studentId}`,
          generatedDate: new Date().toISOString().split('T')[0],
          isGenerated: true,
          downloadCount: 0,
          examCenter: 'Main Campus',
          seatNumber: `A-${Math.floor(Math.random() * 999) + 100}`,
          reportingTime: '09:30 AM'
        };
        
        setHallTickets(prev => [...prev, newTicket]);
        generated++;
      }
    });

    setBulkSelection([]);
    alert(`${generated} hall tickets generated successfully!`);
  };

  const downloadHallTicket = (ticketId: string) => {
    const ticket = hallTickets.find(ht => ht.id === ticketId);
    const student = students.find(s => s.id === ticket?.studentId);
    const exam = examSchedules.find(e => e.id === ticket?.examScheduleId);

    if (ticket && student && exam) {
      // Update download count
      const updatedTickets = hallTickets.map(ht => 
        ht.id === ticketId 
          ? { ...ht, downloadCount: ht.downloadCount + 1 }
          : ht
      );
      setHallTickets(updatedTickets);

      // Generate and download hall ticket
      const ticketData = `
HALL TICKET - ${exam.examType.toUpperCase()} EXAMINATION

Student Name: ${student.name}
Roll Number: ${student.rollNumber}
Department: ${student.department}
Semester: ${student.semester}

Ticket Number: ${ticket.ticketNumber}
Exam Center: ${ticket.examCenter}
Seat Number: ${ticket.seatNumber}
Reporting Time: ${ticket.reportingTime}

Exam Period: ${exam.startDate} to ${exam.endDate}
Venue: ${exam.venue}

INSTRUCTIONS:
${exam.instructions.map((inst, i) => `${i + 1}. ${inst}`).join('\n')}

Generated on: ${ticket.generatedDate}
      `;

      const blob = new Blob([ticketData], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `HallTicket_${student.rollNumber}_${exam.examType}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

  const sendHallTicketEmail = (ticketId: string) => {
    const ticket = hallTickets.find(ht => ht.id === ticketId);
    const student = students.find(s => s.id === ticket?.studentId);
    
    if (ticket && student) {
      alert(`Hall ticket sent via email to ${student.name}\nEmail: ${student.email}\nTicket Number: ${ticket.ticketNumber}`);
    }
  };

  const printHallTicket = (ticketId: string) => {
    const ticket = hallTickets.find(ht => ht.id === ticketId);
    if (ticket) {
      alert(`Hall ticket sent to printer!\nTicket Number: ${ticket.ticketNumber}`);
    }
  };

  const exportHallTicketReport = () => {
    const reportData = hallTickets.map(ticket => {
      const student = students.find(s => s.id === ticket.studentId);
      const exam = examSchedules.find(e => e.id === ticket.examScheduleId);
      return {
        ticketNumber: ticket.ticketNumber,
        studentName: student?.name,
        rollNumber: student?.rollNumber,
        examType: exam?.examType,
        seatNumber: ticket.seatNumber,
        downloadCount: ticket.downloadCount,
        generatedDate: ticket.generatedDate
      };
    });

    const csvContent = "data:text/csv;charset=utf-8," + 
      "Ticket Number,Student Name,Roll Number,Exam Type,Seat Number,Download Count,Generated Date\n" +
      reportData.map(row => 
        `${row.ticketNumber},"${row.studentName}",${row.rollNumber},${row.examType},${row.seatNumber},${row.downloadCount},${row.generatedDate}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "hall_ticket_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = {
    totalStudents: students.length,
    totalGenerated: hallTickets.length,
    totalDownloads: hallTickets.reduce((sum, ht) => sum + ht.downloadCount, 0),
    upcomingExams: examSchedules.filter(e => e.status === 'scheduled').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hall Ticket Management</h1>
              <p className="text-gray-600 mt-1">Generate and manage examination hall tickets</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsGenerateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Generate Individual
              </button>
              <button
                onClick={bulkGenerateHallTickets}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Bulk Generate
              </button>
              <button
                onClick={exportHallTicketReport}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Export Report
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search students by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Exams</option>
              {examSchedules.map(exam => (
                <option key={exam.id} value={exam.id}>
                  {exam.examType.charAt(0).toUpperCase() + exam.examType.slice(1)} - {exam.department} Sem {exam.semester}
                </option>
              ))}
            </select>
          </div>

          {/* Bulk Selection */}
          {bulkSelection.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-800 font-medium">
                  {bulkSelection.length} students selected for bulk generation
                </span>
                <button
                  onClick={() => setBulkSelection([])}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
              <UserIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Hall Tickets Generated</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalGenerated}</p>
              </div>
              <FileTextIcon className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Downloads</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalDownloads}</p>
              </div>
              <DownloadIcon className="text-purple-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Upcoming Exams</p>
                <p className="text-2xl font-bold text-orange-600">{stats.upcomingExams}</p>
              </div>
              <CalendarIcon className="text-orange-500" size={24} />
            </div>
          </div>
        </div>

        {/* Exam Schedules */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Exam Schedules ({examSchedules.length})
            </h2>
            
            <div className="space-y-4">
              {examSchedules.map((exam) => (
                <div key={exam.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {exam.examType.charAt(0).toUpperCase() + exam.examType.slice(1)} Examination
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExamTypeColor(exam.examType)}`}>
                          {exam.examType}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                          {exam.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Department:</span> {exam.department}
                        </div>
                        <div>
                          <span className="font-medium">Semester:</span> {exam.semester}
                        </div>
                        <div>
                          <span className="font-medium">Start Date:</span> {new Date(exam.startDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">End Date:</span> {new Date(exam.endDate).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Venue:</span> {exam.venue}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const eligibleStudents = filteredStudents.filter(s => 
                            s.department === exam.department && s.semester === exam.semester
                          );
                          eligibleStudents.forEach(student => 
                            generateHallTicket(student.id, exam.id)
                          );
                        }}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-sm transition-colors"
                      >
                        Generate All
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Students ({filteredStudents.length})
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBulkSelection(filteredStudents.map(s => s.id));
                          } else {
                            setBulkSelection([]);
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="text-left p-3 font-medium text-gray-900">Student</th>
                    <th className="text-left p-3 font-medium text-gray-900">Department</th>
                    <th className="text-left p-3 font-medium text-gray-900">Hall Tickets</th>
                    <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => {
                    const studentTickets = hallTickets.filter(ht => ht.studentId === student.id);
                    return (
                      <tr key={student.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={bulkSelection.includes(student.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setBulkSelection([...bulkSelection, student.id]);
                              } else {
                                setBulkSelection(bulkSelection.filter(id => id !== student.id));
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{student.photoUrl}</div>
                            <div>
                              <div className="font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.rollNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-gray-700">{student.department} - Sem {student.semester}</td>
                        <td className="p-3">
                          <div className="space-y-1">
                            {studentTickets.length > 0 ? (
                              studentTickets.map(ticket => {
                                const exam = examSchedules.find(e => e.id === ticket.examScheduleId);
                                return (
                                  <div key={ticket.id} className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded text-xs ${getExamTypeColor(exam?.examType || 'midterm')}`}>
                                      {exam?.examType}
                                    </span>
                                    <span className="text-xs text-gray-600">
                                      {ticket.ticketNumber}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      ({ticket.downloadCount} downloads)
                                    </span>
                                  </div>
                                );
                              })
                            ) : (
                              <span className="text-sm text-gray-500">No tickets generated</span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            {studentTickets.length > 0 ? (
                              studentTickets.map(ticket => (
                                <div key={ticket.id} className="flex gap-1">
                                  <button
                                    onClick={() => downloadHallTicket(ticket.id)}
                                    className="bg-green-100 hover:bg-green-200 text-green-700 p-1 rounded transition-colors"
                                  >
                                    <DownloadIcon size={16} />
                                  </button>
                                  <button
                                    onClick={() => sendHallTicketEmail(ticket.id)}
                                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-1 rounded transition-colors"
                                  >
                                    📧
                                  </button>
                                  <button
                                    onClick={() => printHallTicket(ticket.id)}
                                    className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-1 rounded transition-colors"
                                  >
                                    <PrinterIcon size={16} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedTicket(ticket);
                                      setIsViewTicketModalOpen(true);
                                    }}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1 rounded transition-colors"
                                  >
                                    👁️
                                  </button>
                                </div>
                              ))
                            ) : (
                              <button
                                onClick={() => setIsGenerateModalOpen(true)}
                                className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs transition-colors"
                              >
                                Generate
                              </button>
                            )}
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

        {/* Generate Hall Ticket Modal */}
        {isGenerateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Generate Hall Ticket</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                    <option value="">Choose a student</option>
                    {filteredStudents.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.rollNumber})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Exam</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                    <option value="">Choose an exam</option>
                    {examSchedules.map(exam => (
                      <option key={exam.id} value={exam.id}>
                        {exam.examType.charAt(0).toUpperCase() + exam.examType.slice(1)} - {exam.department} Sem {exam.semester}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Hall Ticket Details</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Exam Center: Main Campus</p>
                    <p>Seat Number: Auto-assigned</p>
                    <p>Reporting Time: 09:30 AM</p>
                    <p>Generated Date: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsGenerateModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    generateHallTicket(filteredStudents[0]?.id || '', examSchedules[0]?.id || '');
                    setIsGenerateModalOpen(false);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Generate Ticket
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Ticket Modal */}
        {isViewTicketModalOpen && selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Hall Ticket Preview</h2>
                <button
                  onClick={() => setIsViewTicketModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              {(() => {
                const student = students.find(s => s.id === selectedTicket.studentId);
                const exam = examSchedules.find(e => e.id === selectedTicket.examScheduleId);
                
                return (
                  <div className="border-2 border-gray-300 p-6 bg-white">
                    <div className="text-center mb-6">
                      <h1 className="text-2xl font-bold">HALL TICKET</h1>
                      <p className="text-lg font-semibold">{exam?.examType.toUpperCase()} EXAMINATION</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <div>
                          <span className="font-semibold">Student Name:</span>
                          <div className="mt-1">{student?.name}</div>
                        </div>
                        <div>
                          <span className="font-semibold">Roll Number:</span>
                          <div className="mt-1">{student?.rollNumber}</div>
                        </div>
                        <div>
                          <span className="font-semibold">Department:</span>
                          <div className="mt-1">{student?.department}</div>
                        </div>
                        <div>
                          <span className="font-semibold">Semester:</span>
                          <div className="mt-1">{student?.semester}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <span className="font-semibold">Ticket Number:</span>
                          <div className="mt-1">{selectedTicket.ticketNumber}</div>
                        </div>
                        <div>
                          <span className="font-semibold">Exam Center:</span>
                          <div className="mt-1">{selectedTicket.examCenter}</div>
                        </div>
                        <div>
                          <span className="font-semibold">Seat Number:</span>
                          <div className="mt-1">{selectedTicket.seatNumber}</div>
                        </div>
                        <div>
                          <span className="font-semibold">Reporting Time:</span>
                          <div className="mt-1">{selectedTicket.reportingTime}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="font-semibold mb-2">INSTRUCTIONS:</div>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        {exam?.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        Generated on: {selectedTicket.generatedDate}
                      </p>
                    </div>
                  </div>
                );
              })()}
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => downloadHallTicket(selectedTicket.id)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Download
                </button>
                <button
                  onClick={() => printHallTicket(selectedTicket.id)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HallTicketComponent;
