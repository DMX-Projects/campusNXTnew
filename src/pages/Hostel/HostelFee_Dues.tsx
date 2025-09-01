import React, { useState } from 'react';

interface RoomType {
  id: string;
  block: string;
  roomType: 'Single' | 'Double' | '4-Bed';
  feeAmount: number;
  totalRooms: number;
  occupiedRooms: number;
  amenities: string[];
  floor: string;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  roomNumber: string;
  block: string;
  roomType: 'Single' | 'Double' | '4-Bed';
  feeAmount: number;
  feeStatus: 'Paid' | 'Pending' | 'Overdue' | 'Partial';
  amountPaid: number;
  amountDue: number;
  dueDate: string;
  lastPaymentDate?: string;
  parentContact: string;
  parentEmail: string;
  admissionDate: string;
  semester: number;
  branch: string;
  address: string;
  emergencyContact: string;
  bloodGroup: string;
  guardianName: string;
  paymentHistory: PaymentRecord[];
}

interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  method: 'Cash' | 'Online' | 'Bank Transfer' | 'UPI' | 'Cheque' | 'DD';
  receiptNumber: string;
  status: 'Success' | 'Failed' | 'Pending';
  transactionId?: string;
  bankName?: string;
  remarks?: string;
}

const FeeDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'room-fees' | 'students' | 'analytics'>('room-fees');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'paid' | 'pending' | 'overdue' | 'partial'>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Comprehensive room types and fee structure
  const roomTypes: RoomType[] = [
    { 
      id: '1', block: 'A Block', roomType: 'Single', feeAmount: 25000, totalRooms: 50, occupiedRooms: 47, 
      amenities: ['AC', 'Wi-Fi', 'Study Table', 'Wardrobe', 'Attached Bathroom'], floor: '1-4'
    },
    { 
      id: '2', block: 'A Block', roomType: 'Double', feeAmount: 18000, totalRooms: 60, occupiedRooms: 56, 
      amenities: ['Fan', 'Wi-Fi', 'Study Table', 'Shared Wardrobe', 'Common Bathroom'], floor: '1-4'
    },
    { 
      id: '3', block: 'A Block', roomType: '4-Bed', feeAmount: 12000, totalRooms: 30, occupiedRooms: 28, 
      amenities: ['Fan', 'Wi-Fi', 'Bunk Beds', 'Common Study Area', 'Common Bathroom'], floor: '1-3'
    },
    { 
      id: '4', block: 'B Block', roomType: 'Single', feeAmount: 23000, totalRooms: 45, occupiedRooms: 42, 
      amenities: ['AC', 'Wi-Fi', 'Study Table', 'Wardrobe', 'Attached Bathroom'], floor: '1-4'
    },
    { 
      id: '5', block: 'B Block', roomType: 'Double', feeAmount: 16000, totalRooms: 55, occupiedRooms: 52, 
      amenities: ['Fan', 'Wi-Fi', 'Study Table', 'Shared Wardrobe', 'Common Bathroom'], floor: '1-4'
    },
    { 
      id: '6', block: 'B Block', roomType: '4-Bed', feeAmount: 11000, totalRooms: 25, occupiedRooms: 24, 
      amenities: ['Fan', 'Wi-Fi', 'Bunk Beds', 'Common Study Area', 'Common Bathroom'], floor: '1-3'
    },
    { 
      id: '7', block: 'C Block', roomType: 'Single', feeAmount: 22000, totalRooms: 40, occupiedRooms: 38, 
      amenities: ['AC', 'Wi-Fi', 'Study Table', 'Wardrobe', 'Attached Bathroom'], floor: '1-4'
    },
    { 
      id: '8', block: 'C Block', roomType: 'Double', feeAmount: 15000, totalRooms: 50, occupiedRooms: 46, 
      amenities: ['Fan', 'Wi-Fi', 'Study Table', 'Shared Wardrobe', 'Common Bathroom'], floor: '1-4'
    },
    { 
      id: '9', block: 'C Block', roomType: '4-Bed', feeAmount: 10000, totalRooms: 20, occupiedRooms: 19, 
      amenities: ['Fan', 'Wi-Fi', 'Bunk Beds', 'Common Study Area', 'Common Bathroom'], floor: '1-3'
    },
    { 
      id: '10', block: 'D Block', roomType: 'Single', feeAmount: 27000, totalRooms: 35, occupiedRooms: 33, 
      amenities: ['AC', 'Wi-Fi', 'Study Table', 'Wardrobe', 'Attached Bathroom', 'Balcony'], floor: '1-4'
    },
    { 
      id: '11', block: 'D Block', roomType: 'Double', feeAmount: 20000, totalRooms: 40, occupiedRooms: 38, 
      amenities: ['AC', 'Wi-Fi', 'Study Table', 'Shared Wardrobe', 'Attached Bathroom'], floor: '1-4'
    },
    { 
      id: '12', block: 'E Block', roomType: 'Single', feeAmount: 24000, totalRooms: 42, occupiedRooms: 40, 
      amenities: ['AC', 'Wi-Fi', 'Study Table', 'Wardrobe', 'Attached Bathroom'], floor: '1-4'
    },
  ];

  // Extensive student data
  const students: Student[] = [
    {
      id: '1', name: 'Rahul Kumar', rollNumber: '2023CSE001', roomNumber: 'A-101', block: 'A Block',
      roomType: 'Single', feeAmount: 25000, feeStatus: 'Paid', amountPaid: 25000, amountDue: 0,
      dueDate: '2025-08-15', lastPaymentDate: '2025-07-20', parentContact: '+91-9876543210',
      parentEmail: 'rahul.parent@email.com', admissionDate: '2023-07-15', semester: 4,
      branch: 'Computer Science Engineering', address: '123 MG Road, Bangalore, Karnataka - 560001',
      emergencyContact: '+91-9876543211', bloodGroup: 'B+', guardianName: 'Mr. Suresh Kumar',
      paymentHistory: [
        { id: 'p1', amount: 25000, date: '2025-07-20', method: 'UPI', receiptNumber: 'RCP001', 
          status: 'Success', transactionId: 'TXN123456789', remarks: 'Semester fee payment' },
      ]
    },
    {
      id: '2', name: 'Priya Sharma', rollNumber: '2023ECE015', roomNumber: 'B-205', block: 'B Block',
      roomType: 'Double', feeAmount: 16000, feeStatus: 'Partial', amountPaid: 8000, amountDue: 8000,
      dueDate: '2025-09-15', lastPaymentDate: '2025-06-10', parentContact: '+91-9876543212',
      parentEmail: 'priya.parent@email.com', admissionDate: '2023-07-15', semester: 4,
      branch: 'Electronics & Communication Engineering', address: '456 Brigade Road, Bangalore, Karnataka - 560025',
      emergencyContact: '+91-9876543213', bloodGroup: 'A+', guardianName: 'Mrs. Sunita Sharma',
      paymentHistory: [
        { id: 'p2', amount: 8000, date: '2025-06-10', method: 'Bank Transfer', receiptNumber: 'RCP002', 
          status: 'Success', bankName: 'SBI', remarks: 'Partial payment' },
      ]
    },
    {
      id: '3', name: 'Amit Singh', rollNumber: '2022ME020', roomNumber: 'C-301', block: 'C Block',
      roomType: '4-Bed', feeAmount: 10000, feeStatus: 'Overdue', amountPaid: 0, amountDue: 10000,
      dueDate: '2025-07-15', parentContact: '+91-9876543214', parentEmail: 'amit.parent@email.com',
      admissionDate: '2022-07-15', semester: 6, branch: 'Mechanical Engineering',
      address: '789 Commercial Street, Bangalore, Karnataka - 560012', emergencyContact: '+91-9876543215',
      bloodGroup: 'O+', guardianName: 'Mr. Rajesh Singh', paymentHistory: []
    },
    {
      id: '4', name: 'Sneha Patel', rollNumber: '2023IT008', roomNumber: 'A-204', block: 'A Block',
      roomType: 'Double', feeAmount: 18000, feeStatus: 'Pending', amountPaid: 0, amountDue: 18000,
      dueDate: '2025-09-30', parentContact: '+91-9876543216', parentEmail: 'sneha.parent@email.com',
      admissionDate: '2023-07-15', semester: 4, branch: 'Information Technology',
      address: '321 Koramangala, Bangalore, Karnataka - 560034', emergencyContact: '+91-9876543217',
      bloodGroup: 'AB+', guardianName: 'Mr. Kishore Patel', paymentHistory: []
    },
    {
      id: '5', name: 'Vikram Reddy', rollNumber: '2022CSE045', roomNumber: 'D-102', block: 'D Block',
      roomType: 'Single', feeAmount: 27000, feeStatus: 'Paid', amountPaid: 27000, amountDue: 0,
      dueDate: '2025-08-20', lastPaymentDate: '2025-07-25', parentContact: '+91-9876543218',
      parentEmail: 'vikram.parent@email.com', admissionDate: '2022-07-15', semester: 6,
      branch: 'Computer Science Engineering', address: '654 Jayanagar, Bangalore, Karnataka - 560041',
      emergencyContact: '+91-9876543219', bloodGroup: 'B-', guardianName: 'Mr. Venkat Reddy',
      paymentHistory: [
        { id: 'p3', amount: 27000, date: '2025-07-25', method: 'Cheque', receiptNumber: 'RCP003', 
          status: 'Success', bankName: 'HDFC Bank', remarks: 'Annual fee payment' },
      ]
    },
    {
      id: '6', name: 'Anjali Gupta', rollNumber: '2023EEE012', roomNumber: 'E-301', block: 'E Block',
      roomType: 'Single', feeAmount: 24000, feeStatus: 'Partial', amountPaid: 12000, amountDue: 12000,
      dueDate: '2025-09-10', lastPaymentDate: '2025-06-15', parentContact: '+91-9876543220',
      parentEmail: 'anjali.parent@email.com', admissionDate: '2023-07-15', semester: 4,
      branch: 'Electrical & Electronics Engineering', address: '987 Whitefield, Bangalore, Karnataka - 560066',
      emergencyContact: '+91-9876543221', bloodGroup: 'A-', guardianName: 'Mrs. Meera Gupta',
      paymentHistory: [
        { id: 'p4', amount: 12000, date: '2025-06-15', method: 'Online', receiptNumber: 'RCP004', 
          status: 'Success', transactionId: 'TXN987654321', remarks: 'First installment' },
      ]
    },
    {
      id: '7', name: 'Karthik Nair', rollNumber: '2022CIVIL18', roomNumber: 'B-105', block: 'B Block',
      roomType: '4-Bed', feeAmount: 11000, feeStatus: 'Overdue', amountPaid: 0, amountDue: 11000,
      dueDate: '2025-07-20', parentContact: '+91-9876543222', parentEmail: 'karthik.parent@email.com',
      admissionDate: '2022-07-15', semester: 6, branch: 'Civil Engineering',
      address: '123 Electronic City, Bangalore, Karnataka - 560100', emergencyContact: '+91-9876543223',
      bloodGroup: 'O-', guardianName: 'Mr. Suresh Nair', paymentHistory: []
    },
    {
      id: '8', name: 'Divya Krishnan', rollNumber: '2023CHEM005', roomNumber: 'C-205', block: 'C Block',
      roomType: 'Double', feeAmount: 15000, feeStatus: 'Paid', amountPaid: 15000, amountDue: 0,
      dueDate: '2025-08-25', lastPaymentDate: '2025-07-30', parentContact: '+91-9876543224',
      parentEmail: 'divya.parent@email.com', admissionDate: '2023-07-15', semester: 4,
      branch: 'Chemical Engineering', address: '456 HSR Layout, Bangalore, Karnataka - 560102',
      emergencyContact: '+91-9876543225', bloodGroup: 'AB-', guardianName: 'Dr. Krishnan Iyer',
      paymentHistory: [
        { id: 'p5', amount: 15000, date: '2025-07-30', method: 'DD', receiptNumber: 'RCP005', 
          status: 'Success', bankName: 'Canara Bank', remarks: 'Hostel fee - Semester 4' },
      ]
    },
  ];

  const filteredStudents = students.filter(student => {
    const matchesFilter = selectedFilter === 'all' || student.feeStatus.toLowerCase() === selectedFilter;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-secondary-500 text-white';
      case 'pending': return 'bg-accent-400 text-white';
      case 'overdue': return 'bg-red-500 text-white';
      case 'partial': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const totalStudents = students.length;
  const totalRevenue = students.reduce((sum, student) => sum + student.amountPaid, 0);
  const totalDue = students.reduce((sum, student) => sum + student.amountDue, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans ">
      <div className="">
        
        {/* Tab Navigation */}
        <nav className="flex gap-2 mb-8 bg-white p-2 rounded-lg shadow-sm border">
          {[
            { key: 'room-fees', label: 'Room Fee Structure' },
            { key: 'students', label: 'Student Fee Management' },
            { key: 'analytics', label: 'Fee Analytics' }
          ].map((tab) => (
            <button
              key={tab.key}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Room Fee Structure Tab */}
        {activeTab === 'room-fees' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Hostel Fee Structure by Block & Room Type</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {['A Block', 'B Block', 'C Block', 'D Block', 'E Block'].map((block) => (
                  <div key={block} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4">
                      <h3 className="text-lg font-bold">{block}</h3>
                      <p className="text-primary-100 text-sm">
                        {roomTypes.filter(r => r.block === block).reduce((sum, r) => sum + r.totalRooms, 0)} Total Rooms
                      </p>
                    </div>
                    
                    <div className="p-4 space-y-4">
                      {roomTypes.filter(room => room.block === block).map((room) => (
                        <div key={room.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-800">{room.roomType} Occupancy</h4>
                              <p className="text-sm text-gray-600">Floor: {room.floor}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-primary-600">₹{room.feeAmount.toLocaleString()}</p>
                              <p className="text-xs text-gray-500">per semester</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                            <div className="text-center">
                              <p className="font-medium text-gray-800">{room.totalRooms}</p>
                              <p className="text-gray-600">Total</p>
                            </div>
                            <div className="text-center">
                              <p className="font-medium text-secondary-600">{room.occupiedRooms}</p>
                              <p className="text-gray-600">Occupied</p>
                            </div>
                            <div className="text-center">
                              <p className="font-medium text-accent-600">{room.totalRooms - room.occupiedRooms}</p>
                              <p className="text-gray-600">Available</p>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(room.occupiedRooms / room.totalRooms) * 100}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {Math.round((room.occupiedRooms / room.totalRooms) * 100)}% Occupancy Rate
                            </p>
                          </div>

                          <div className="border-t pt-3">
                            <p className="text-xs font-medium text-gray-700 mb-2">Room Amenities:</p>
                            <div className="flex flex-wrap gap-1">
                              {room.amenities.slice(0, 3).map((amenity, index) => (
                                <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                  {amenity}
                                </span>
                              ))}
                              {room.amenities.length > 3 && (
                                <span className="text-xs text-gray-500">+{room.amenities.length - 3} more</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Student Fee Management Tab */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            {/* Search and Filter Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search by name, roll number, or room..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'all', label: 'All Students', count: students.length },
                    { key: 'paid', label: 'Paid', count: students.filter(s => s.feeStatus === 'Paid').length },
                    { key: 'pending', label: 'Pending', count: students.filter(s => s.feeStatus === 'Pending').length },
                    { key: 'partial', label: 'Partial', count: students.filter(s => s.feeStatus === 'Partial').length },
                    { key: 'overdue', label: 'Overdue', count: students.filter(s => s.feeStatus === 'Overdue').length },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedFilter === filter.key
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'border border-gray-300 text-gray-600 hover:border-primary-500 hover:text-primary-600'
                      }`}
                      onClick={() => setSelectedFilter(filter.key as any)}
                    >
                      {filter.label} ({filter.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Students Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Info</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.rollNumber}</div>
                            <div className="text-xs text-gray-400">{student.branch}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.roomNumber}</div>
                          <div className="text-sm text-gray-500">{student.block}</div>
                          <div className="text-xs text-gray-400">{student.roomType} Room</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">₹{student.feeAmount.toLocaleString()}</div>
                          <div className="text-sm text-secondary-600">Paid: ₹{student.amountPaid.toLocaleString()}</div>
                          {student.amountDue > 0 && (
                            <div className="text-sm text-red-600">Due: ₹{student.amountDue.toLocaleString()}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyles(student.feeStatus)}`}>
                            {student.feeStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(student.dueDate).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleViewStudent(student)}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Students</h3>
                <p className="text-3xl font-bold text-primary-600">{totalStudents}</p>
                <p className="text-sm text-gray-600">Across all blocks</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-secondary-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Revenue Collected</h3>
                <p className="text-3xl font-bold text-secondary-600">₹{totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Current semester</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Outstanding Dues</h3>
                <p className="text-3xl font-bold text-red-600">₹{totalDue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Pending collection</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Fee Collection Summary by Block</h3>
              <div className="space-y-4">
                {['A Block', 'B Block', 'C Block', 'D Block', 'E Block'].map((block) => {
                  const blockStudents = students.filter(s => s.block === block);
                  const blockRevenue = blockStudents.reduce((sum, s) => sum + s.amountPaid, 0);
                  const blockDue = blockStudents.reduce((sum, s) => sum + s.amountDue, 0);
                  const collectionRate = blockRevenue / (blockRevenue + blockDue) * 100;
                  
                  return (
                    <div key={block} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-800">{block}</h4>
                        <span className="text-sm text-gray-600">{blockStudents.length} students</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                        <div>
                          <p className="text-gray-600">Collected</p>
                          <p className="font-semibold text-secondary-600">₹{blockRevenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Outstanding</p>
                          <p className="font-semibold text-red-600">₹{blockDue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Collection Rate</p>
                          <p className="font-semibold text-primary-600">{collectionRate.toFixed(1)}%</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${collectionRate}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Student Detail Modal */}
        {isModalOpen && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedStudent.name}</h2>
                  <p className="text-gray-600">{selectedStudent.rollNumber} • {selectedStudent.branch} • Semester {selectedStudent.semester}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Student Information */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Roll Number:</span>
                          <span className="font-medium">{selectedStudent.rollNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Branch:</span>
                          <span className="font-medium">{selectedStudent.branch}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Semester:</span>
                          <span className="font-medium">{selectedStudent.semester}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Blood Group:</span>
                          <span className="font-medium">{selectedStudent.bloodGroup}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Admission Date:</span>
                          <span className="font-medium">{new Date(selectedStudent.admissionDate).toLocaleDateString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Parent Contact:</span>
                          <span className="font-medium">{selectedStudent.parentContact}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Parent Email:</span>
                          <span className="font-medium">{selectedStudent.parentEmail}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Emergency Contact:</span>
                          <span className="font-medium">{selectedStudent.emergencyContact}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Guardian:</span>
                          <span className="font-medium">{selectedStudent.guardianName}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Address:</span>
                          <p className="font-medium mt-1 text-xs">{selectedStudent.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Room Assignment</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Room Number:</span>
                          <span className="font-medium">{selectedStudent.roomNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Block:</span>
                          <span className="font-medium">{selectedStudent.block}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Room Type:</span>
                          <span className="font-medium">{selectedStudent.roomType} Occupancy</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fee Information */}
                  <div className="space-y-6">
                    <div className="bg-secondary-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Fee Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Fee Amount:</span>
                          <span className="text-xl font-bold text-gray-800">₹{selectedStudent.feeAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Amount Paid:</span>
                          <span className="text-lg font-semibold text-secondary-600">₹{selectedStudent.amountPaid.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Amount Due:</span>
                          <span className={`text-lg font-semibold ${selectedStudent.amountDue > 0 ? 'text-red-600' : 'text-secondary-600'}`}>
                            ₹{selectedStudent.amountDue.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Due Date:</span>
                          <span className="font-medium">{new Date(selectedStudent.dueDate).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Status:</span>
                          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusStyles(selectedStudent.feeStatus)}`}>
                            {selectedStudent.feeStatus}
                          </span>
                        </div>
                        {selectedStudent.lastPaymentDate && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Payment:</span>
                            <span className="font-medium">{new Date(selectedStudent.lastPaymentDate).toLocaleDateString('en-IN')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Payment History */}
                  <div className="space-y-6">
                    <div className="bg-accent-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment History</h3>
                      {selectedStudent.paymentHistory.length > 0 ? (
                        <div className="space-y-3">
                          {selectedStudent.paymentHistory.map((payment) => (
                            <div key={payment.id} className="bg-white rounded-lg p-4 border border-accent-200">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <span className="font-semibold text-gray-800">₹{payment.amount.toLocaleString()}</span>
                                  <span className="text-sm text-gray-600 ml-2">via {payment.method}</span>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded ${payment.status === 'Success' ? 'bg-secondary-100 text-secondary-700' : 'bg-red-100 text-red-700'}`}>
                                  {payment.status}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 space-y-1">
                                <div>Date: {new Date(payment.date).toLocaleDateString('en-IN')}</div>
                                <div>Receipt: {payment.receiptNumber}</div>
                                {payment.transactionId && (
                                  <div>Transaction ID: {payment.transactionId}</div>
                                )}
                                {payment.bankName && (
                                  <div>Bank: {payment.bankName}</div>
                                )}
                                {payment.remarks && (
                                  <div>Remarks: {payment.remarks}</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <p className="font-medium">No payment history available</p>
                          <p className="text-sm">Payment records will appear here once transactions are made</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                    Record Payment
                  </button>
                  {selectedStudent.amountDue > 0 && (
                    <button className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                      Send Fee Reminder
                    </button>
                  )}
                  <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                    Generate Receipt
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                    Download Fee History
                  </button>
                  <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                    Edit Student Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeeDetails;
