import React, { useState } from 'react';
import { Plus, Search, Download, Eye, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import Modal from '../components/Modal';
import HallTicketForm from '../components/HallTicketForm';

const HallTickets: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedExam , setSelectedExam] = useState()

  const hallTickets = [
    {
      id: 'HT001',
      studentId: 'CSE001',
      rollNo: '20CS001',
      studentName: 'John Doe',
      examSession: 'December 2024',
      course: 'B.Tech CSE',
      semester: 'VI',
      subjects: ['Computer Networks', 'Database Management', 'Operating Systems'],
      issueDate: '2024-12-01',
      status: 'issued',
      downloadCount: 3
    },
    {
      id: 'HT002',
      studentId: 'CSE002',
      rollNo: '20CS002',
      studentName: 'Jane Smith',
      examSession: 'December 2024',
      course: 'B.Tech CSE',
      semester: 'VI',
      subjects: ['Computer Networks', 'Database Management'],
      issueDate: '2024-12-01',
      status: 'pending',
      downloadCount: 0
    }
  ];

  const filteredTickets = hallTickets.filter(ticket => {
    const matchesSearch = ticket.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HALL TICKETS</h1>
          <p className="text-gray-600">Generate and manage student hall tickets</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Generate Tickets</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Bulk Download</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-600">Total Hall Tickets</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">142</p>
              <p className="text-sm text-gray-600">Issued</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <XCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">14</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>
      </div>

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
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EX001">December 2024 Session</option>
              <option value="EX002">June 2024 Session</option>
            </select>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="issued">Issued</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Ticket ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Roll No</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Student Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Course/Semester</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Exam Session</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Subjects</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Issue Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{ticket.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{ticket.rollNo}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{ticket.studentName}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{ticket.course} - Sem {ticket.semester}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{ticket.examSession}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                      {ticket.subjects.length} subjects
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{ticket.issueDate}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                      ticket.status === 'issued' 
                        ? 'bg-green-100 text-green-800'
                        : ticket.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors" title="Preview">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800 transition-colors" title="Download">
                        <Download className="h-4 w-4" />
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
        title="Generate Hall Tickets"
      >
        <HallTicketForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default HallTickets;