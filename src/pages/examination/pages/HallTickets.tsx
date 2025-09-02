import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plus, Search, Download, Eye, CreditCard, CheckCircle, XCircle, 
  Filter, Calendar, Users, BookOpen, MapPin, RefreshCw, FileText,
  GraduationCap, Building, Clock, AlertCircle, Printer, Mail,
  Edit, Trash2, Settings, Upload, ChevronDown, X, User,
  Phone, Globe, BookMarked, Award, Shield, Bell
} from 'lucide-react';

// Mock data for comprehensive ERP system
const mockData = {
  branches: [
    { id: 'BR001', name: 'Main Campus', code: 'MAIN', location: 'Delhi', address: 'Sector 15, New Delhi, 110001' },
    { id: 'BR002', name: 'North Campus', code: 'NORTH', location: 'Mumbai', address: 'Andheri West, Mumbai, 400058' },
    { id: 'BR003', name: 'South Campus', code: 'SOUTH', location: 'Bangalore', address: 'Electronic City, Bangalore, 560100' },
    { id: 'BR004', name: 'East Campus', code: 'EAST', location: 'Kolkata', address: 'Salt Lake City, Kolkata, 700064' }
  ],
  departments: [
    { id: 'DEPT001', name: 'Computer Science Engineering', code: 'CSE', branchId: 'BR001', hod: 'Dr. Rajesh Kumar' },
    { id: 'DEPT002', name: 'Electrical Engineering', code: 'EE', branchId: 'BR001', hod: 'Dr. Priya Sharma' },
    { id: 'DEPT003', name: 'Mechanical Engineering', code: 'ME', branchId: 'BR001', hod: 'Dr. Amit Singh' },
    { id: 'DEPT004', name: 'Information Technology', code: 'IT', branchId: 'BR002', hod: 'Dr. Sunita Patel' },
    { id: 'DEPT005', name: 'Electronics & Communication', code: 'ECE', branchId: 'BR002', hod: 'Dr. Ravi Gupta' },
    { id: 'DEPT006', name: 'Civil Engineering', code: 'CE', branchId: 'BR003', hod: 'Dr. Meera Joshi' },
    { id: 'DEPT007', name: 'Biotechnology', code: 'BT', branchId: 'BR003', hod: 'Dr. Kiran Reddy' },
    { id: 'DEPT008', name: 'Chemical Engineering', code: 'CHE', branchId: 'BR004', hod: 'Dr. Sanjay Das' }
  ],
  academicYears: [
    { id: 'AY2024', name: '2024-25', isActive: true, startDate: '2024-07-01', endDate: '2025-06-30' },
    { id: 'AY2023', name: '2023-24', isActive: false, startDate: '2023-07-01', endDate: '2024-06-30' },
    { id: 'AY2022', name: '2022-23', isActive: false, startDate: '2022-07-01', endDate: '2023-06-30' }
  ],
  examSessions: [
    { 
      id: 'EX001', 
      name: 'December 2024 - End Semester', 
      type: 'end_semester', 
      year: 'AY2024',
      startDate: '2024-12-15',
      endDate: '2024-12-28',
      registrationDeadline: '2024-12-05',
      status: 'active'
    },
    { 
      id: 'EX002', 
      name: 'December 2024 - Supplementary', 
      type: 'supplementary', 
      year: 'AY2024',
      startDate: '2024-12-30',
      endDate: '2025-01-05',
      registrationDeadline: '2024-12-20',
      status: 'upcoming'
    },
    { 
      id: 'EX003', 
      name: 'June 2024 - End Semester', 
      type: 'end_semester', 
      year: 'AY2024',
      startDate: '2024-06-15',
      endDate: '2024-06-28',
      registrationDeadline: '2024-06-05',
      status: 'completed'
    }
  ],
  examCenters: [
    { id: 'CENTER001', name: 'Main Examination Center', branchId: 'BR001', capacity: 500, address: 'Block A, Main Campus' },
    { id: 'CENTER002', name: 'North Campus Center', branchId: 'BR002', capacity: 300, address: 'Block B, North Campus' },
    { id: 'CENTER003', name: 'South Campus Center', branchId: 'BR003', capacity: 400, address: 'Block C, South Campus' },
    { id: 'CENTER004', name: 'East Campus Center', branchId: 'BR004', capacity: 250, address: 'Block D, East Campus' }
  ],
  hallTickets: [
    {
      id: 'HT001',
      ticketNo: 'MAIN-CSE-2024-001',
      studentId: 'STU001',
      rollNo: '24CSE001',
      studentName: 'Rajesh Kumar',
      email: 'rajesh.kumar@student.edu',
      phone: '+91-9876543210',
      fatherName: 'Suresh Kumar',
      motherName: 'Sunita Kumar',
      dateOfBirth: '2002-03-15',
      address: '123 MG Road, Delhi, 110001',
      branchId: 'BR001',
      departmentId: 'DEPT001',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      section: 'A',
      examSessionId: 'EX001',
      subjects: [
        { code: 'CS401', name: 'Database Management Systems', credits: 4, examDate: '2024-12-16', examTime: '10:00 AM', duration: '3 hours' },
        { code: 'CS402', name: 'Computer Networks', credits: 4, examDate: '2024-12-18', examTime: '10:00 AM', duration: '3 hours' },
        { code: 'CS403', name: 'Operating Systems', credits: 4, examDate: '2024-12-20', examTime: '10:00 AM', duration: '3 hours' },
        { code: 'CS404', name: 'Software Engineering', credits: 3, examDate: '2024-12-22', examTime: '2:00 PM', duration: '3 hours' }
      ],
      issueDate: '2024-12-01',
      examStartDate: '2024-12-15',
      examEndDate: '2024-12-28',
      status: 'issued',
      downloadCount: 3,
      generatedBy: 'admin@college.edu',
      lastModified: '2024-12-01T10:30:00Z',
      centerCode: 'CENTER001',
      centerName: 'Main Examination Center',
      seatNumber: 'A-001',
      photo: '/api/placeholder/150/200',
      signature: '/api/placeholder/150/80',
      instructions: [
        'Bring valid ID proof (Aadhar Card / Driving License)',
        'Report to examination center 30 minutes before exam time',
        'Mobile phones and electronic devices are strictly prohibited',
        'Bring your own stationery items',
        'Follow COVID-19 safety protocols'
      ],
      fees: { paid: true, amount: 2500, receiptNo: 'FEE001' }
    },
    {
      id: 'HT002',
      ticketNo: 'MAIN-CSE-2024-002',
      studentId: 'STU002',
      rollNo: '24CSE002',
      studentName: 'Priya Sharma',
      email: 'priya.sharma@student.edu',
      phone: '+91-9876543211',
      fatherName: 'Ramesh Sharma',
      motherName: 'Kavita Sharma',
      dateOfBirth: '2002-07-22',
      address: '456 CP Road, Delhi, 110002',
      branchId: 'BR001',
      departmentId: 'DEPT001',
      course: 'B.Tech',
      year: 2,
      semester: 4,
      section: 'A',
      examSessionId: 'EX001',
      subjects: [
        { code: 'CS401', name: 'Database Management Systems', credits: 4, examDate: '2024-12-16', examTime: '10:00 AM', duration: '3 hours' },
        { code: 'CS402', name: 'Computer Networks', credits: 4, examDate: '2024-12-18', examTime: '10:00 AM', duration: '3 hours' }
      ],
      issueDate: '2024-12-01',
      examStartDate: '2024-12-15',
      examEndDate: '2024-12-28',
      status: 'pending',
      downloadCount: 0,
      generatedBy: 'admin@college.edu',
      lastModified: '2024-12-01T10:30:00Z',
      centerCode: 'CENTER001',
      centerName: 'Main Examination Center',
      seatNumber: 'A-002',
      photo: '/api/placeholder/150/200',
      signature: '/api/placeholder/150/80',
      instructions: [
        'Bring valid ID proof (Aadhar Card / Driving License)',
        'Report to examination center 30 minutes before exam time',
        'Mobile phones and electronic devices are strictly prohibited',
        'Bring your own stationery items',
        'Follow COVID-19 safety protocols'
      ],
      fees: { paid: false, amount: 2500, receiptNo: null }
    },
    {
      id: 'HT003',
      ticketNo: 'NORTH-IT-2024-001',
      studentId: 'STU003',
      rollNo: '24IT001',
      studentName: 'Amit Patel',
      email: 'amit.patel@student.edu',
      phone: '+91-9876543212',
      fatherName: 'Vijay Patel',
      motherName: 'Nisha Patel',
      dateOfBirth: '2001-11-08',
      address: '789 Link Road, Mumbai, 400058',
      branchId: 'BR002',
      departmentId: 'DEPT004',
      course: 'B.Tech',
      year: 3,
      semester: 6,
      section: 'B',
      examSessionId: 'EX001',
      subjects: [
        { code: 'IT601', name: 'Software Engineering', credits: 4, examDate: '2024-12-16', examTime: '10:00 AM', duration: '3 hours' },
        { code: 'IT602', name: 'Web Technologies', credits: 3, examDate: '2024-12-18', examTime: '2:00 PM', duration: '3 hours' },
        { code: 'IT603', name: 'Machine Learning', credits: 4, examDate: '2024-12-20', examTime: '10:00 AM', duration: '3 hours' }
      ],
      issueDate: '2024-12-02',
      examStartDate: '2024-12-15',
      examEndDate: '2024-12-28',
      status: 'issued',
      downloadCount: 1,
      generatedBy: 'admin@college.edu',
      lastModified: '2024-12-02T09:15:00Z',
      centerCode: 'CENTER002',
      centerName: 'North Campus Center',
      seatNumber: 'B-001',
      photo: '/api/placeholder/150/200',
      signature: '/api/placeholder/150/80',
      instructions: [
        'Bring valid ID proof (Aadhar Card / Driving License)',
        'Report to examination center 30 minutes before exam time',
        'Mobile phones and electronic devices are strictly prohibited',
        'Bring your own stationery items',
        'Follow COVID-19 safety protocols'
      ],
      fees: { paid: true, amount: 3000, receiptNo: 'FEE002' }
    },
    {
      id: 'HT004',
      ticketNo: 'SOUTH-CE-2024-001',
      studentId: 'STU004',
      rollNo: '24CE001',
      studentName: 'Sneha Reddy',
      email: 'sneha.reddy@student.edu',
      phone: '+91-9876543213',
      fatherName: 'Krishna Reddy',
      motherName: 'Lakshmi Reddy',
      dateOfBirth: '2002-05-12',
      address: '321 Ring Road, Bangalore, 560100',
      branchId: 'BR003',
      departmentId: 'DEPT006',
      course: 'B.Tech',
      year: 1,
      semester: 2,
      section: 'A',
      examSessionId: 'EX001',
      subjects: [
        { code: 'CE201', name: 'Engineering Mechanics', credits: 4, examDate: '2024-12-17', examTime: '10:00 AM', duration: '3 hours' },
        { code: 'CE202', name: 'Building Materials', credits: 3, examDate: '2024-12-19', examTime: '2:00 PM', duration: '3 hours' }
      ],
      issueDate: '2024-12-03',
      examStartDate: '2024-12-15',
      examEndDate: '2024-12-28',
      status: 'rejected',
      downloadCount: 0,
      generatedBy: 'admin@college.edu',
      lastModified: '2024-12-03T11:45:00Z',
      centerCode: 'CENTER003',
      centerName: 'South Campus Center',
      seatNumber: 'C-001',
      photo: '/api/placeholder/150/200',
      signature: '/api/placeholder/150/80',
      instructions: [
        'Bring valid ID proof (Aadhar Card / Driving License)',
        'Report to examination center 30 minutes before exam time',
        'Mobile phones and electronic devices are strictly prohibited',
        'Bring your own stationery items',
        'Follow COVID-19 safety protocols'
      ],
      fees: { paid: false, amount: 2000, receiptNo: null },
      rejectionReason: 'Outstanding library dues - Rs. 500'
    }
  ]
};

// Utility Components
const StatusBadge = ({ status }) => {
  const config = {
    issued: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', icon: CheckCircle },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', icon: Clock },
    rejected: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', icon: XCircle },
    expired: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200', icon: AlertCircle }
  };
  
  const { bg, text, border, icon: Icon } = config[status] || config.pending;
  
  return (
    <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full border ${bg} ${text} ${border}`}>
      <Icon className="h-3 w-3" />
      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    </span>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

// Modal Component
const Modal = ({ isOpen, onClose, title, children, size = 'max-w-2xl' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white rounded-lg shadow-xl ${size} w-full max-h-[90vh] overflow-y-auto`}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, ticket }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={true} onClose={onClose} title="Confirm Deletion" size="max-w-md">
      <div className="p-6">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Hall Ticket</h3>
          <p className="text-gray-600">
            Are you sure you want to delete the hall ticket for{' '}
            <span className="font-medium text-gray-900">{ticket?.studentName}</span>?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Roll No: {ticket?.rollNo} | Ticket No: {ticket?.ticketNo}
          </p>
          <p className="text-sm text-red-600 mt-3 font-medium">
            This action cannot be undone.
          </p>
        </div>
        
        <div className="flex justify-center space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Edit Hall Ticket Form Component
const EditHallTicketForm = ({ ticket, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    studentName: ticket.studentName,
    rollNo: ticket.rollNo,
    email: ticket.email,
    phone: ticket.phone,
    fatherName: ticket.fatherName,
    motherName: ticket.motherName,
    dateOfBirth: ticket.dateOfBirth,
    address: ticket.address,
    branchId: ticket.branchId,
    departmentId: ticket.departmentId,
    course: ticket.course,
    year: ticket.year,
    semester: ticket.semester,
    section: ticket.section,
    examSessionId: ticket.examSessionId,
    centerCode: ticket.centerCode,
    centerName: ticket.centerName,
    seatNumber: ticket.seatNumber,
    status: ticket.status,
    rejectionReason: ticket.rejectionReason || '',
    subjects: [...ticket.subjects]
  });
  
  const [loading, setLoading] = useState(false);

  const availableDepartments = useMemo(() => {
    if (!formData.branchId) return mockData.departments;
    return mockData.departments.filter(dept => dept.branchId === formData.branchId);
  }, [formData.branchId]);

  const availableCenters = useMemo(() => {
    if (!formData.branchId) return mockData.examCenters;
    return mockData.examCenters.filter(center => center.branchId === formData.branchId);
  }, [formData.branchId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedTicket = {
      ...ticket,
      ...formData,
      lastModified: new Date().toISOString()
    };
    
    setLoading(false);
    onSave(updatedTicket);
    onClose();
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { code: '', name: '', credits: 3, examDate: '', examTime: '', duration: '3 hours' }]
    });
  };

  const removeSubject = (index) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((_, i) => i !== index)
    });
  };

  const updateSubject = (index, field, value) => {
    const updatedSubjects = formData.subjects.map((subject, i) => 
      i === index ? { ...subject, [field]: value } : subject
    );
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Edit Hall Ticket" size="max-w-4xl">
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-6">
          {/* Student Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name *
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roll Number *
                </label>
                <input
                  type="text"
                  value={formData.rollNo}
                  onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Father's Name *
                </label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mother's Name *
                </label>
                <input
                  type="text"
                  value={formData.motherName}
                  onChange={(e) => setFormData({...formData, motherName: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seat Number *
                </label>
                <input
                  type="text"
                  value={formData.seatNumber}
                  onChange={(e) => setFormData({...formData, seatNumber: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                required
              />
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch *
                </label>
                <select 
                  value={formData.branchId}
                  onChange={(e) => setFormData({...formData, branchId: e.target.value, departmentId: ''})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {mockData.branches.map(branch => (
                    <option key={branch.id} value={branch.id}>{branch.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <select 
                  value={formData.departmentId}
                  onChange={(e) => setFormData({...formData, departmentId: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {availableDepartments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course *
                </label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <select 
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semester *
                </label>
                <select 
                  value={formData.semester}
                  onChange={(e) => setFormData({...formData, semester: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                  <option value="3">3rd Semester</option>
                  <option value="4">4th Semester</option>
                  <option value="5">5th Semester</option>
                  <option value="6">6th Semester</option>
                  <option value="7">7th Semester</option>
                  <option value="8">8th Semester</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section *
                </label>
                <select 
                  value={formData.section}
                  onChange={(e) => setFormData({...formData, section: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
            </div>
          </div>

          {/* Exam Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exam Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exam Session *
                </label>
                <select 
                  value={formData.examSessionId}
                  onChange={(e) => setFormData({...formData, examSessionId: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {mockData.examSessions.map(session => (
                    <option key={session.id} value={session.id}>{session.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Examination Center *
                </label>
                <select 
                  value={formData.centerCode}
                  onChange={(e) => {
                    const center = availableCenters.find(c => c.id === e.target.value);
                    setFormData({
                      ...formData, 
                      centerCode: e.target.value,
                      centerName: center?.name || ''
                    });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {availableCenters.map(center => (
                    <option key={center.id} value={center.id}>{center.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Status and Rejection Reason */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="issued">Issued</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              {formData.status === 'rejected' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rejection Reason
                  </label>
                  <input
                    type="text"
                    value={formData.rejectionReason}
                    onChange={(e) => setFormData({...formData, rejectionReason: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter reason for rejection"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Subjects */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Subjects</h3>
              <button
                type="button"
                onClick={addSubject}
                className="px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors text-sm flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>Add Subject</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.subjects.map((subject, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject Code
                      </label>
                      <input
                        type="text"
                        value={subject.code}
                        onChange={(e) => updateSubject(index, 'code', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., CS401"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject Name
                      </label>
                      <input
                        type="text"
                        value={subject.name}
                        onChange={(e) => updateSubject(index, 'name', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Database Management"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Exam Date
                      </label>
                      <input
                        type="date"
                        value={subject.examDate}
                        onChange={(e) => updateSubject(index, 'examDate', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Exam Time
                      </label>
                      <input
                        type="time"
                        value={subject.examTime}
                        onChange={(e) => updateSubject(index, 'examTime', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Credits
                        </label>
                        <input
                          type="number"
                          value={subject.credits}
                          onChange={(e) => updateSubject(index, 'credits', parseInt(e.target.value))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="1"
                          max="6"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSubject(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove Subject"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Hall Ticket Preview Component
const HallTicketPreview = ({ ticket, onClose }) => {
  const branch = mockData.branches.find(b => b.id === ticket.branchId);
  const department = mockData.departments.find(d => d.id === ticket.departmentId);
  const examSession = mockData.examSessions.find(e => e.id === ticket.examSessionId);

  return (
    <Modal isOpen={true} onClose={onClose} title="Hall Ticket Preview" size="max-w-4xl">
      <div className="p-6">
        {/* Hall Ticket Content */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-8 max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">UNIVERSITY OF TECHNOLOGY</h1>
                <p className="text-gray-600">{branch?.name} - {branch?.location}</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">HALL TICKET</h2>
            <p className="text-gray-700">{examSession?.name}</p>
          </div>

          {/* Student Details */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Hall Ticket No:</span>
                  <p className="text-lg font-bold text-gray-900">{ticket.ticketNo}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Roll Number:</span>
                  <p className="text-lg font-bold text-gray-900">{ticket.rollNo}</p>
                </div>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Student Name:</span>
                <p className="text-lg font-semibold text-gray-900">{ticket.studentName}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Father's Name:</span>
                  <p className="font-medium text-gray-900">{ticket.fatherName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Date of Birth:</span>
                  <p className="font-medium text-gray-900">{ticket.dateOfBirth}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Course:</span>
                  <p className="font-medium text-gray-900">{ticket.course} - {department?.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Year/Semester:</span>
                  <p className="font-medium text-gray-900">Year {ticket.year}, Semester {ticket.semester}</p>
                </div>
              </div>
            </div>
            
            {/* Photo and Signature */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-32 h-40 bg-gray-200 border-2 border-gray-300 mx-auto mb-2 flex items-center justify-center">
                  <User className="h-16 w-16 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">Student Photo</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-16 bg-gray-200 border-2 border-gray-300 mx-auto mb-2"></div>
                <p className="text-xs text-gray-500">Student Signature</p>
              </div>
            </div>
          </div>

          {/* Examination Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Examination Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Examination Center:</span>
                <p className="font-medium text-gray-900">{ticket.centerName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Seat Number:</span>
                <p className="font-medium text-gray-900">{ticket.seatNumber}</p>
              </div>
            </div>
            
            {/* Subjects Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Subject Code</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Subject Name</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Exam Date</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Time</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {ticket.subjects.map((subject, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium">{subject.code}</td>
                      <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900">{subject.name}</td>
                      <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900">{subject.examDate}</td>
                      <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900">{subject.examTime}</td>
                      <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900">{subject.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Instructions</h3>
            <ul className="space-y-2">
              {ticket.instructions.map((instruction, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                  <span className="font-bold">{index + 1}.</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-gray-300 pt-4 text-center">
            <p className="text-sm text-gray-600 mb-2">
              This hall ticket is computer generated and does not require signature.
            </p>
            <p className="text-xs text-gray-500">
              Generated on: {new Date(ticket.issueDate).toLocaleDateString('en-IN')} | 
              Contact: registrar@university.edu | Phone: +91-11-12345678
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Close
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Download PDF</span>
        </button>
        <button className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors flex items-center space-x-2">
          <Printer className="h-4 w-4" />
          <span>Print</span>
        </button>
      </div>
    </Modal>
  );
};

// Generate Hall Tickets Form Component
const GenerateHallTicketsForm = ({ onClose, onGenerate }) => {
  const [formData, setFormData] = useState({
    branchId: '',
    departmentId: '',
    academicYearId: 'AY2024',
    examSessionId: '',
    year: '',
    semester: '',
    section: '',
    centerId: '',
    instructions: '',
    generateForAll: true,
    specificStudents: []
  });
  
  const [loading, setLoading] = useState(false);
  const [estimatedCount, setEstimatedCount] = useState(0);

  const availableDepartments = useMemo(() => {
    if (!formData.branchId) return mockData.departments;
    return mockData.departments.filter(dept => dept.branchId === formData.branchId);
  }, [formData.branchId]);

  const availableCenters = useMemo(() => {
    if (!formData.branchId) return mockData.examCenters;
    return mockData.examCenters.filter(center => center.branchId === formData.branchId);
  }, [formData.branchId]);

  useEffect(() => {
    // Calculate estimated student count based on filters
    let count = mockData.hallTickets.length;
    if (formData.branchId) count = Math.floor(count * 0.7);
    if (formData.departmentId) count = Math.floor(count * 0.5);
    if (formData.year) count = Math.floor(count * 0.3);
    setEstimatedCount(Math.max(count, 1));
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    onGenerate(formData);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Generate Hall Tickets" size="max-w-3xl">
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-6">
          {/* Basic Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Branch *
              </label>
              <select 
                value={formData.branchId}
                onChange={(e) => setFormData({...formData, branchId: e.target.value, departmentId: '', centerId: ''})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Branch</option>
                {mockData.branches.map(branch => (
                  <option key={branch.id} value={branch.id}>{branch.name} - {branch.location}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <select 
                value={formData.departmentId}
                onChange={(e) => setFormData({...formData, departmentId: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={!formData.branchId}
              >
                <option value="">Select Department</option>
                {availableDepartments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name} ({dept.code})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year *
              </label>
              <select 
                value={formData.academicYearId}
                onChange={(e) => setFormData({...formData, academicYearId: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {mockData.academicYears.map(year => (
                  <option key={year.id} value={year.id}>{year.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exam Session *
              </label>
              <select 
                value={formData.examSessionId}
                onChange={(e) => setFormData({...formData, examSessionId: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Exam Session</option>
                {mockData.examSessions.map(session => (
                  <option key={session.id} value={session.id}>{session.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Student Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select 
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Years</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Semester
              </label>
              <select 
                value={formData.semester}
                onChange={(e) => setFormData({...formData, semester: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Semesters</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section
              </label>
              <select 
                value={formData.section}
                onChange={(e) => setFormData({...formData, section: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Sections</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
          </div>

          {/* Exam Center */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Examination Center *
            </label>
            <select 
              value={formData.centerId}
              onChange={(e) => setFormData({...formData, centerId: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={!formData.branchId}
            >
              <option value="">Select Examination Center</option>
              {availableCenters.map(center => (
                <option key={center.id} value={center.id}>{center.name} (Capacity: {center.capacity})</option>
              ))}
            </select>
          </div>

          {/* Additional Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Instructions (Optional)
            </label>
            <textarea 
              value={formData.instructions}
              onChange={(e) => setFormData({...formData, instructions: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Enter any additional instructions for students..."
            />
          </div>

          {/* Generation Options */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Generation Options</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="generateType"
                  checked={formData.generateForAll}
                  onChange={() => setFormData({...formData, generateForAll: true})}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">Generate for all eligible students</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="generateType"
                  checked={!formData.generateForAll}
                  onChange={() => setFormData({...formData, generateForAll: false})}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">Generate for specific students</span>
              </label>
            </div>
            
            {!formData.generateForAll && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Roll Numbers (comma separated)
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 24CSE001, 24CSE002, 24CSE003"
                />
              </div>
            )}
          </div>

          {/* Estimated Count */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                Estimated Hall Tickets to Generate: {estimatedCount}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Generate Hall Tickets</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Main Hall Ticket Management Component
const HallTicketManagement = () => {
  const [hallTickets, setHallTickets] = useState(mockData.hallTickets);
  const [filteredTickets, setFilteredTickets] = useState(mockData.hallTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showGenerateForm, setShowGenerateForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editingTicket, setEditingTicket] = useState(null);
  const [deletingTicket, setDeletingTicket] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filter hall tickets based on search and filters
  useEffect(() => {
    let filtered = hallTickets;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.ticketNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    // Branch filter
    if (branchFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.branchId === branchFilter);
    }

    // Department filter
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.departmentId === departmentFilter);
    }

    setFilteredTickets(filtered);
  }, [hallTickets, searchTerm, statusFilter, branchFilter, departmentFilter]);

  const handleGenerateTickets = (formData) => {
    // Simulate generating new tickets
    const newTicket = {
      id: `HT${Date.now()}`,
      ticketNo: `${formData.branchId}-${formData.departmentId}-2024-${String(hallTickets.length + 1).padStart(3, '0')}`,
      studentName: 'New Student',
      rollNo: `24NEW${String(hallTickets.length + 1).padStart(3, '0')}`,
      status: 'pending',
      issueDate: new Date().toISOString().split('T')[0],
      ...formData
    };
    
    setHallTickets([...hallTickets, newTicket]);
  };

  const handleDownloadTicket = (ticketId) => {
    const ticket = hallTickets.find(t => t.id === ticketId);
    if (ticket) {
      setHallTickets(hallTickets.map(t => 
        t.id === ticketId 
          ? { ...t, downloadCount: t.downloadCount + 1 }
          : t
      ));
      
      // Simulate PDF download
      console.log(`Downloading hall ticket for ${ticket.studentName}`);
      alert(`Hall ticket downloaded for ${ticket.studentName}`);
    }
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleSaveEdit = (updatedTicket) => {
    setHallTickets(hallTickets.map(ticket => 
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    ));
    setEditingTicket(null);
    alert(`Hall ticket updated for ${updatedTicket.studentName}`);
  };

  const handleDeleteTicket = (ticket) => {
    setDeletingTicket(ticket);
  };

  const confirmDelete = () => {
    if (deletingTicket) {
      setHallTickets(hallTickets.filter(ticket => ticket.id !== deletingTicket.id));
      setDeletingTicket(null);
      alert(`Hall ticket deleted for ${deletingTicket.studentName}`);
    }
  };

  const handleBulkExport = async (format) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    
    // Simulate download
    alert(`Exported ${filteredTickets.length} tickets as ${format.toUpperCase()}`);
  };

  const stats = useMemo(() => {
    const total = hallTickets.length;
    const issued = hallTickets.filter(t => t.status === 'issued').length;
    const pending = hallTickets.filter(t => t.status === 'pending').length;
    const rejected = hallTickets.filter(t => t.status === 'rejected').length;
    
    return { total, issued, pending, rejected };
  }, [hallTickets]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Issued</p>
                <p className="text-2xl font-bold text-green-600">{stats.issued}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, roll no, ticket no..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    showFilters 
                      ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
                
                
                
                <button
                  onClick={() => setShowGenerateForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Generate Tickets</span>
                </button>
              </div>
            </div>
            
            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Statuses</option>
                      <option value="issued">Issued</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                    <select 
                      value={branchFilter}
                      onChange={(e) => setBranchFilter(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Branches</option>
                      {mockData.branches.map(branch => (
                        <option key={branch.id} value={branch.id}>{branch.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select 
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Departments</option>
                      {mockData.departments.map(dept => (
                        <option key={dept.id} value={dept.id}>{dept.code}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('all');
                        setBranchFilter('all');
                        setDepartmentFilter('all');
                      }}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hall Tickets Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Hall Tickets</h2>
              <span className="text-sm text-gray-500">
                Showing {filteredTickets.length} of {hallTickets.length} tickets
              </span>
            </div>
          </div>
          
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exam Session
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTickets.map((ticket) => {
                    const branch = mockData.branches.find(b => b.id === ticket.branchId);
                    const department = mockData.departments.find(d => d.id === ticket.departmentId);
                    const examSession = mockData.examSessions.find(e => e.id === ticket.examSessionId);
                    
                    return (
                      <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{ticket.studentName}</p>
                              <p className="text-sm text-gray-500">{ticket.rollNo}</p>
                              <p className="text-xs text-gray-400">{ticket.email}</p>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{department?.code}</p>
                            <p className="text-sm text-gray-500">Year {ticket.year}, Sem {ticket.semester}</p>
                            <p className="text-xs text-gray-400">{branch?.name}</p>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{examSession?.name}</p>
                            <p className="text-sm text-gray-500">{ticket.centerName}</p>
                            <p className="text-xs text-gray-400">Seat: {ticket.seatNumber}</p>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <StatusBadge status={ticket.status} />
                          {ticket.status === 'rejected' && ticket.rejectionReason && (
                            <p className="text-xs text-red-600 mt-1">{ticket.rejectionReason}</p>
                          )}
                          {ticket.fees && !ticket.fees.paid && (
                            <p className="text-xs text-orange-600 mt-1">Fee pending: ₹{ticket.fees.amount}</p>
                          )}
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedTicket(ticket)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Preview"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            
                            {ticket.status === 'issued' && (
                              <button
                                onClick={() => handleDownloadTicket(ticket.id)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Download"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            )}
                            
                            <button
                              onClick={() => handleEditTicket(ticket)}
                              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            
                            <button
                              onClick={() => handleDeleteTicket(ticket)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {filteredTickets.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hall tickets found</h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm || statusFilter !== 'all' || branchFilter !== 'all' || departmentFilter !== 'all'
                      ? 'Try adjusting your search criteria or filters.'
                      : 'Start by generating hall tickets for your students.'}
                  </p>
                  <button
                    onClick={() => setShowGenerateForm(true)}
                    className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors inline-flex items-center space-x-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Generate Hall Tickets</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {filteredTickets.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleBulkExport('pdf')}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                <FileText className="h-4 w-4" />
                <span>Export All as PDF</span>
              </button>
              
              <button
                onClick={() => handleBulkExport('excel')}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                <span>Export as Excel</span>
              </button>
              
              <button
                className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>Send via Email</span>
              </button>
              
              <button
                
                className="px-4 py-2 bg-orange-600 text-white hover:bg-orange-700 rounded-lg transition-colors flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Regenerate Selected</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showGenerateForm && (
        <GenerateHallTicketsForm
          onClose={() => setShowGenerateForm(false)}
          onGenerate={handleGenerateTickets}
        />
      )}
      
      {selectedTicket && (
        <HallTicketPreview
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}

      {editingTicket && (
        <EditHallTicketForm
          ticket={editingTicket}
          onClose={() => setEditingTicket(null)}
          onSave={handleSaveEdit}
        />
      )}

      {deletingTicket && (
        <DeleteConfirmationModal
          isOpen={true}
          onClose={() => setDeletingTicket(null)}
          onConfirm={confirmDelete}
          ticket={deletingTicket}
        />
      )}
    </div>
  );
};

function App() {
  return <HallTicketManagement />;
}

export default App;