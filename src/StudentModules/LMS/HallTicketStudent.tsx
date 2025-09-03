import React, { useState } from 'react';
import { 
  DownloadIcon, 
  PrinterIcon, 
  EyeIcon, 
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
 
  AlertCircleIcon,
 
  FileTextIcon,
  
} from 'lucide-react';

interface Exam {
  id: string;
  subject: string;
  subjectCode: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  seatNumber: string;
  examType: 'theory' | 'practical' | 'viva';
  semester: string;
  maxMarks: number;
  instructions: string[];
}

interface HallTicket {
  id: string;
  ticketNumber: string;
  studentName: string;
  rollNumber: string;
  registrationNumber: string;
  semester: string;
  branch: string;
  section: string;
  examPeriod: string;
  issuedDate: string;
  validUntil: string;
  photo: string;
  signature: string;
  exams: Exam[];
  status: 'active' | 'expired' | 'cancelled';
  qrCode: string;
}

const HallTicketStu: React.FC = () => {
  const [hallTickets] = useState<HallTicket[]>([
    {
      id: '1',
      ticketNumber: 'HT2025090001',
      studentName: 'John Doe',
      rollNumber: '2022CSE001',
      registrationNumber: 'REG2022001',
      semester: '5',
      branch: 'Computer Science Engineering',
      section: 'A',
      examPeriod: 'Mid-Semester Examination - September 2025',
      issuedDate: '2025-09-01',
      validUntil: '2025-09-25',
      photo: '👤',
      signature: '✍️',
      status: 'active',
      qrCode: 'QR_CODE_DATA',
      exams: [
        {
          id: '1',
          subject: 'Data Structures and Algorithms',
          subjectCode: 'CS301',
          date: '2025-09-15',
          time: '09:00 AM',
          duration: '3 hours',
          venue: 'Main Hall A',
          seatNumber: 'A-15',
          examType: 'theory',
          semester: '5',
          maxMarks: 100,
          instructions: [
            'Report to the examination hall 30 minutes before the exam time',
            'Carry valid ID proof along with hall ticket',
            'Mobile phones and electronic devices are not allowed',
            'Use only blue/black ink pen for writing'
          ]
        },
        {
          id: '2',
          subject: 'Database Management Systems',
          subjectCode: 'CS302',
          date: '2025-09-17',
          time: '02:00 PM',
          duration: '3 hours',
          venue: 'Computer Lab 1',
          seatNumber: 'PC-08',
          examType: 'practical',
          semester: '5',
          maxMarks: 50,
          instructions: [
            'Lab exam will be conducted on designated computers',
            'Students must bring their own login credentials',
            'Save work frequently during the exam',
            'No external storage devices allowed'
          ]
        },
        {
          id: '3',
          subject: 'Software Engineering',
          subjectCode: 'CS303',
          date: '2025-09-20',
          time: '10:00 AM',
          duration: '3 hours',
          venue: 'Block B - Room 201',
          seatNumber: 'B-22',
          examType: 'theory',
          semester: '5',
          maxMarks: 100,
          instructions: [
            'Carry drawing instruments for diagrams',
            'Graph paper will be provided if required',
            'Read all questions carefully before answering',
            'Manage time effectively across all sections'
          ]
        }
      ]
    },
    {
      id: '2',
      ticketNumber: 'HT2025070015',
      studentName: 'John Doe',
      rollNumber: '2022CSE001',
      registrationNumber: 'REG2022001',
      semester: '4',
      branch: 'Computer Science Engineering',
      section: 'A',
      examPeriod: 'End-Semester Examination - July 2025',
      issuedDate: '2025-07-01',
      validUntil: '2025-07-30',
      photo: '👤',
      signature: '✍️',
      status: 'expired',
      qrCode: 'QR_CODE_DATA_OLD',
      exams: [
        {
          id: '4',
          subject: 'Operating Systems',
          subjectCode: 'CS201',
          date: '2025-07-15',
          time: '09:00 AM',
          duration: '3 hours',
          venue: 'Main Hall B',
          seatNumber: 'B-18',
          examType: 'theory',
          semester: '4',
          maxMarks: 100,
          instructions: []
        }
      ]
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState<HallTicket | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState('all');

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      expired: 'bg-red-100 text-red-800 border-red-200',
      cancelled: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status as keyof typeof colors];
  };

  const getExamTypeColor = (type: string) => {
    const colors = {
      theory: 'bg-blue-100 text-blue-800',
      practical: 'bg-green-100 text-green-800',
      viva: 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors];
  };

  const downloadHallTicket = (ticket: HallTicket) => {
    // Simulate PDF generation and download
    alert(`Downloading hall ticket ${ticket.ticketNumber}...`);
    
    // In a real implementation, this would generate and download a PDF
    const element = document.createElement('a');
    const file = new Blob([generateHallTicketHTML(ticket)], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `hall_ticket_${ticket.ticketNumber}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const printHallTicket = (ticket: HallTicket) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(generateHallTicketHTML(ticket));
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  const generateHallTicketHTML = (ticket: HallTicket) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Hall Ticket - ${ticket.ticketNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
          .student-info { display: flex; justify-content: space-between; margin: 20px 0; }
          .photo-section { text-align: center; }
          .exam-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .exam-table th, .exam-table td { border: 1px solid #000; padding: 8px; text-align: left; }
          .instructions { margin: 20px 0; }
          .signature-section { display: flex; justify-content: space-between; margin-top: 40px; }
          @media print { 
            body { margin: 0; } 
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>COLLEGE OF ENGINEERING</h1>
          <h2>HALL TICKET</h2>
          <h3>${ticket.examPeriod}</h3>
        </div>
        
        <div class="student-info">
          <div>
            <p><strong>Hall Ticket No:</strong> ${ticket.ticketNumber}</p>
            <p><strong>Student Name:</strong> ${ticket.studentName}</p>
            <p><strong>Roll Number:</strong> ${ticket.rollNumber}</p>
            <p><strong>Registration No:</strong> ${ticket.registrationNumber}</p>
            <p><strong>Branch:</strong> ${ticket.branch}</p>
            <p><strong>Semester:</strong> ${ticket.semester}</p>
            <p><strong>Section:</strong> ${ticket.section}</p>
          </div>
          <div class="photo-section">
            <div style="width: 120px; height: 150px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-size: 48px;">
              ${ticket.photo}
            </div>
            <p>Student Photo</p>
          </div>
        </div>
        
        <table class="exam-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Subject Code</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Venue</th>
              <th>Seat No.</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            ${ticket.exams.map(exam => `
              <tr>
                <td>${exam.subject}</td>
                <td>${exam.subjectCode}</td>
                <td>${new Date(exam.date).toLocaleDateString()}</td>
                <td>${exam.time}</td>
                <td>${exam.duration}</td>
                <td>${exam.venue}</td>
                <td>${exam.seatNumber}</td>
                <td>${exam.examType}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="instructions">
          <h4>General Instructions:</h4>
          <ol>
            <li>Students must carry this hall ticket along with valid ID proof to the examination hall.</li>
            <li>Report to the examination venue at least 30 minutes before the scheduled time.</li>
            <li>Mobile phones and electronic devices are strictly prohibited in the examination hall.</li>
            <li>Use only blue or black ink pen for writing answers.</li>
            <li>Any form of malpractice will lead to cancellation of the examination.</li>
            <li>Students are responsible for checking their seat numbers and exam timings.</li>
          </ol>
        </div>
        
        <div class="signature-section">
          <div>
            <p>Student Signature:</p>
            <div style="margin-top: 40px; font-size: 24px;">${ticket.signature}</div>
          </div>
          <div style="text-align: right;">
            <p>Controller of Examinations</p>
            <div style="margin-top: 40px;">_________________</div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; font-size: 12px;">
          <p>This hall ticket is computer generated and does not require signature.</p>
          <p>Issued on: ${new Date(ticket.issuedDate).toLocaleDateString()} | Valid until: ${new Date(ticket.validUntil).toLocaleDateString()}</p>
        </div>
      </body>
      </html>
    `;
  };

  const filteredTickets = selectedSemester === 'all' 
    ? hallTickets 
    : hallTickets.filter(ticket => ticket.semester === selectedSemester);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hall Tickets</h1>
              <p className="text-gray-600 mt-1">Download and manage your examination hall tickets</p>
            </div>
            
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
            </div>
          </div>
        </div>

        {/* Hall Tickets List */}
        <div className="space-y-6">
          {filteredTickets.map(ticket => (
            <div key={ticket.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-gray-900">{ticket.examPeriod}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ticket.status)}`}>
                        {ticket.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600">Hall Ticket Number: <strong>{ticket.ticketNumber}</strong></p>
                    <p className="text-gray-600">Issued: {new Date(ticket.issuedDate).toLocaleDateString()} | Valid until: {new Date(ticket.validUntil).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setShowPreviewModal(true);
                      }}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <EyeIcon size={16} />
                      Preview
                    </button>
                    <button
                      onClick={() => downloadHallTicket(ticket)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <DownloadIcon size={16} />
                      Download
                    </button>
                    <button
                      onClick={() => printHallTicket(ticket)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <PrinterIcon size={16} />
                      Print
                    </button>
                  </div>
                </div>

                {/* Student Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-gray-900 mb-3">Student Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium ml-2">{ticket.studentName}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Roll Number:</span>
                        <span className="font-medium ml-2">{ticket.rollNumber}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Registration:</span>
                        <span className="font-medium ml-2">{ticket.registrationNumber}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Branch:</span>
                        <span className="font-medium ml-2">{ticket.branch}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Semester:</span>
                        <span className="font-medium ml-2">{ticket.semester}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Section:</span>
                        <span className="font-medium ml-2">{ticket.section}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="text-center">
                      <div className="w-24 h-32 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center text-4xl mb-2">
                        {ticket.photo}
                      </div>
                      <p className="text-xs text-gray-600">Student Photo</p>
                    </div>
                  </div>
                </div>

                {/* Examination Schedule */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Examination Schedule ({ticket.exams.length} exams)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left p-3 font-medium text-gray-900">Subject</th>
                          <th className="text-left p-3 font-medium text-gray-900">Code</th>
                          <th className="text-left p-3 font-medium text-gray-900">Date & Time</th>
                          <th className="text-left p-3 font-medium text-gray-900">Duration</th>
                          <th className="text-left p-3 font-medium text-gray-900">Venue</th>
                          <th className="text-left p-3 font-medium text-gray-900">Seat</th>
                          <th className="text-left p-3 font-medium text-gray-900">Type</th>
                          <th className="text-left p-3 font-medium text-gray-900">Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ticket.exams.map(exam => (
                          <tr key={exam.id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="p-3">
                              <div className="font-medium text-gray-900">{exam.subject}</div>
                            </td>
                            <td className="p-3 text-gray-700">{exam.subjectCode}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2 text-sm">
                                <CalendarIcon size={14} className="text-gray-400" />
                                <span>{new Date(exam.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <ClockIcon size={14} className="text-gray-400" />
                                <span>{exam.time}</span>
                              </div>
                            </td>
                            <td className="p-3 text-gray-700">{exam.duration}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPinIcon size={14} className="text-gray-400" />
                                <span>{exam.venue}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium text-sm">
                                {exam.seatNumber}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExamTypeColor(exam.examType)}`}>
                                {exam.examType.toUpperCase()}
                              </span>
                            </td>
                            <td className="p-3 text-gray-700">{exam.maxMarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Important Instructions */}
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircleIcon size={20} className="text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900 mb-2">Important Instructions</h4>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• Carry this hall ticket along with valid photo ID to the examination hall</li>
                        <li>• Report to the examination venue 30 minutes before the scheduled time</li>
                        <li>• Mobile phones and electronic devices are strictly prohibited</li>
                        <li>• Any discrepancy in hall ticket should be reported immediately to examination section</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTickets.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FileTextIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hall tickets found</h3>
            <p className="text-gray-600">
              {selectedSemester !== 'all' 
                ? 'No hall tickets available for the selected semester'
                : 'Your examination hall tickets will appear here once they are issued'
              }
            </p>
          </div>
        )}

        {/* Hall Ticket Preview Modal */}
        {showPreviewModal && selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Hall Ticket Preview</h2>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6" style={{ fontFamily: 'Arial, sans-serif' }}>
                {/* Header */}
                <div className="text-center mb-8 pb-6 border-b-2 border-black">
                  <h1 className="text-2xl font-bold mb-2">COLLEGE OF ENGINEERING</h1>
                  <h2 className="text-xl font-semibold mb-1">HALL TICKET</h2>
                  <h3 className="text-lg">{selectedTicket.examPeriod}</h3>
                </div>
                
                {/* Student Info with Photo */}
                <div className="flex justify-between mb-8">
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><strong>Hall Ticket No:</strong> {selectedTicket.ticketNumber}</div>
                      <div><strong>Student Name:</strong> {selectedTicket.studentName}</div>
                      <div><strong>Roll Number:</strong> {selectedTicket.rollNumber}</div>
                      <div><strong>Registration No:</strong> {selectedTicket.registrationNumber}</div>
                      <div><strong>Branch:</strong> {selectedTicket.branch}</div>
                      <div><strong>Semester:</strong> {selectedTicket.semester}</div>
                      <div><strong>Section:</strong> {selectedTicket.section}</div>
                    </div>
                  </div>
                  <div className="ml-8 text-center">
                    <div className="w-32 h-40 border-2 border-black flex items-center justify-center text-6xl mb-2">
                      {selectedTicket.photo}
                    </div>
                    <p className="text-sm">Student Photo</p>
                  </div>
                </div>
                
                {/* Exam Schedule Table */}
                <table className="w-full border-collapse border border-black mb-8">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-black p-2 text-left">Subject</th>
                      <th className="border border-black p-2 text-left">Code</th>
                      <th className="border border-black p-2 text-left">Date</th>
                      <th className="border border-black p-2 text-left">Time</th>
                      <th className="border border-black p-2 text-left">Duration</th>
                      <th className="border border-black p-2 text-left">Venue</th>
                      <th className="border border-black p-2 text-left">Seat</th>
                      <th className="border border-black p-2 text-left">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTicket.exams.map(exam => (
                      <tr key={exam.id}>
                        <td className="border border-black p-2">{exam.subject}</td>
                        <td className="border border-black p-2">{exam.subjectCode}</td>
                        <td className="border border-black p-2">{new Date(exam.date).toLocaleDateString()}</td>
                        <td className="border border-black p-2">{exam.time}</td>
                        <td className="border border-black p-2">{exam.duration}</td>
                        <td className="border border-black p-2">{exam.venue}</td>
                        <td className="border border-black p-2">{exam.seatNumber}</td>
                        <td className="border border-black p-2">{exam.examType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Instructions */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-3">General Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Students must carry this hall ticket along with valid ID proof to the examination hall.</li>
                    <li>Report to the examination venue at least 30 minutes before the scheduled time.</li>
                    <li>Mobile phones and electronic devices are strictly prohibited in the examination hall.</li>
                    <li>Use only blue or black ink pen for writing answers.</li>
                    <li>Any form of malpractice will lead to cancellation of the examination.</li>
                    <li>Students are responsible for checking their seat numbers and exam timings.</li>
                  </ol>
                </div>
                
                {/* Signatures */}
                <div className="flex justify-between mt-12">
                  <div>
                    <p className="mb-8">Student Signature:</p>
                    <div className="text-2xl">{selectedTicket.signature}</div>
                  </div>
                  <div className="text-right">
                    <p className="mb-8">Controller of Examinations</p>
                    <div className="border-t border-black w-48"></div>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="text-center mt-8 text-xs text-gray-600 border-t pt-4">
                  <p>This hall ticket is computer generated and does not require signature.</p>
                  <p>Issued on: {new Date(selectedTicket.issuedDate).toLocaleDateString()} | Valid until: {new Date(selectedTicket.validUntil).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
                <button
                  onClick={() => downloadHallTicket(selectedTicket)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <DownloadIcon size={16} />
                  Download PDF
                </button>
                <button
                  onClick={() => printHallTicket(selectedTicket)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <PrinterIcon size={16} />
                  Print
                </button>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HallTicketStu;
