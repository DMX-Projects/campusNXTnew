import React, { useState } from 'react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  block: string;
  roomNumber: string;
  branch: string;
  semester: number;
  parentContact: string;
  parentEmail: string;
  emergencyContact: string;
  profileImage?: string;
}

interface OutTimeEntry {
  id: string;
  student: Student;
  requestedDate: string;
  outTime: string;
  expectedReturnTime: string;
  actualReturnTime?: string;
  destination: string;
  purpose: string;
  outPassType: 'Local' | 'Outstation' | 'Emergency' | 'Medical' | 'Official' | 'Weekend';
  status: 'Pending' | 'Approved' | 'Denied' | 'Cancelled';
  currentStatus: 'In Hostel' | 'Out' | 'Returned' | 'Overdue';
  approvals: {
    parentApproval: {
      status: boolean;
      timestamp?: string;
      contactNumber?: string;
    };
    wardenApproval: {
      status: boolean;
      timestamp?: string;
      approvedBy?: string;
      remarks?: string;
    };
    hodApproval?: {
      status: boolean;
      timestamp?: string;
      approvedBy?: string;
    };
  };
  contactDuringOut: string;
  accompaniedBy?: string;
  vehicleDetails?: string;
  expectedRoute?: string;
  guardianConsent: boolean;
  remarks?: string;
  violations?: string[];
  biometricOut?: {
    timestamp: string;
    deviceId: string;
  };
  biometricIn?: {
    timestamp: string;
    deviceId: string;
  };
}

const OutTimeManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'requests' | 'history' | 'analytics'>('current');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'approved' | 'pending' | 'overdue' | 'returned'>('all');
  const [selectedEntry, setSelectedEntry] = useState<OutTimeEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Current active out/in entries
  const [currentEntries, setCurrentEntries] = useState<OutTimeEntry[]>([
    {
      id: 'OUT001',
      student: {
        id: 'STU001', name: 'Rahul Kumar', rollNumber: '2023CSE001', block: 'A Block', roomNumber: 'A-101',
        branch: 'Computer Science Engineering', semester: 4, parentContact: '+91-9876543210',
        parentEmail: 'rahul.parent@email.com', emergencyContact: '+91-9876543211'
      },
      requestedDate: '2025-08-30T10:00:00Z',
      outTime: '2025-08-30T16:00:00Z',
      expectedReturnTime: '2025-08-30T21:30:00Z',
      actualReturnTime: '2025-08-30T21:45:00Z',
      destination: 'City Hospital, MG Road',
      purpose: 'Medical checkup for fever and headache',
      outPassType: 'Medical',
      status: 'Approved',
      currentStatus: 'Returned',
      approvals: {
        parentApproval: { status: true, timestamp: '2025-08-30T11:00:00Z', contactNumber: '+91-9876543210' },
        wardenApproval: { status: true, timestamp: '2025-08-30T14:00:00Z', approvedBy: 'Dr. Rajesh Sharma', remarks: 'Medical emergency approved' }
      },
      contactDuringOut: '+91-9876543210',
      accompaniedBy: 'Self',
      vehicleDetails: 'Auto Rickshaw',
      expectedRoute: 'Hostel -> MG Road -> Hospital -> Hostel',
      guardianConsent: true,
      biometricOut: { timestamp: '2025-08-30T16:05:00Z', deviceId: 'BIO_GATE_01' },
      biometricIn: { timestamp: '2025-08-30T21:45:00Z', deviceId: 'BIO_GATE_01' },
      violations: ['Late return by 15 minutes']
    },
    {
      id: 'OUT004',
      student: {
        id: 'STU004', name: 'Sneha Patel', rollNumber: '2023IT008', block: 'A Block', roomNumber: 'A-204',
        branch: 'Information Technology', semester: 4, parentContact: '+91-9876543216',
        parentEmail: 'sneha.parent@email.com', emergencyContact: '+91-9876543217'
      },
      requestedDate: '2025-08-31T15:00:00Z',
      outTime: '2025-08-31T17:00:00Z',
      expectedReturnTime: '2025-08-31T21:00:00Z',
      destination: 'Forum Mall, Koramangala',
      purpose: 'Shopping for project materials and personal items',
      outPassType: 'Local',
      status: 'Approved',
      currentStatus: 'Out',
      approvals: {
        parentApproval: { status: true, timestamp: '2025-08-31T15:30:00Z', contactNumber: '+91-9876543216' },
        wardenApproval: { status: true, timestamp: '2025-08-31T16:30:00Z', approvedBy: 'Mrs. Kavitha Rao' }
      },
      contactDuringOut: '+91-9876543216',
      accompaniedBy: 'Roommate Asha Menon',
      vehicleDetails: 'Metro + Auto',
      expectedRoute: 'Hostel -> Metro -> Forum Mall -> Hostel',
      guardianConsent: true,
      biometricOut: { timestamp: '2025-08-31T17:05:00Z', deviceId: 'BIO_GATE_01' }
    },
    {
      id: 'OUT006',
      student: {
        id: 'STU006', name: 'Anjali Gupta', rollNumber: '2023EEE012', block: 'E Block', roomNumber: 'E-301',
        branch: 'Electrical & Electronics', semester: 4, parentContact: '+91-9876543220',
        parentEmail: 'anjali.parent@email.com', emergencyContact: '+91-9876543221'
      },
      requestedDate: '2025-08-30T20:00:00Z',
      outTime: '2025-08-31T05:00:00Z',
      expectedReturnTime: '2025-08-31T23:00:00Z',
      destination: 'Emergency - Father hospitalized',
      purpose: 'Family emergency - father admitted to hospital',
      outPassType: 'Emergency',
      status: 'Approved',
      currentStatus: 'Out',
      approvals: {
        parentApproval: { status: true, timestamp: '2025-08-30T20:15:00Z', contactNumber: '+91-9876543220' },
        wardenApproval: { status: true, timestamp: '2025-08-30T20:30:00Z', approvedBy: 'Night Warden - Mr. Kumar', remarks: 'Emergency approved immediately' }
      },
      contactDuringOut: '+91-9876543220',
      accompaniedBy: 'Uncle came to pick up',
      vehicleDetails: 'Private Car - KA 02 CD 9876',
      expectedRoute: 'Hostel -> Manipal Hospital -> Home -> Hostel',
      guardianConsent: true,
      biometricOut: { timestamp: '2025-08-31T05:00:00Z', deviceId: 'BIO_GATE_01' }
    }
  ]);

  // Out Pass Requests (Pending/Recent approvals)
  const [outPassRequests, setOutPassRequests] = useState<OutTimeEntry[]>([
    {
      id: 'REQ001',
      student: {
        id: 'STU007', name: 'Karthik Nair', rollNumber: '2022CIVIL018', block: 'B Block', roomNumber: 'B-105',
        branch: 'Civil Engineering', semester: 6, parentContact: '+91-9876543222',
        parentEmail: 'karthik.parent@email.com', emergencyContact: '+91-9876543223'
      },
      requestedDate: '2025-08-31T09:00:00Z',
      outTime: '2025-09-01T14:00:00Z',
      expectedReturnTime: '2025-09-02T09:00:00Z',
      destination: 'Home - Chennai',
      purpose: 'Sister\'s wedding ceremony - family function',
      outPassType: 'Outstation',
      status: 'Pending',
      currentStatus: 'In Hostel',
      approvals: {
        parentApproval: { status: true, timestamp: '2025-08-31T09:30:00Z', contactNumber: '+91-9876543222' },
        wardenApproval: { status: false, remarks: 'Awaiting HOD approval for weekend outstation travel' },
        hodApproval: { status: false }
      },
      contactDuringOut: '+91-9876543222',
      accompaniedBy: 'With family members',
      vehicleDetails: 'Train - Shatabdi Express',
      expectedRoute: 'Hostel -> Railway Station -> Chennai -> Hostel',
      guardianConsent: true,
      remarks: 'Important family function, parents have already booked tickets'
    },
    {
      id: 'REQ002',
      student: {
        id: 'STU008', name: 'Divya Krishnan', rollNumber: '2023CHEM005', block: 'C Block', roomNumber: 'C-205',
        branch: 'Chemical Engineering', semester: 4, parentContact: '+91-9876543224',
        parentEmail: 'divya.parent@email.com', emergencyContact: '+91-9876543225'
      },
      requestedDate: '2025-08-31T16:00:00Z',
      outTime: '2025-09-01T10:00:00Z',
      expectedReturnTime: '2025-09-01T18:00:00Z',
      destination: 'IISC Bangalore - Research Lab',
      purpose: 'Academic workshop on Advanced Materials Science',
      outPassType: 'Official',
      status: 'Approved',
      currentStatus: 'In Hostel',
      approvals: {
        parentApproval: { status: true, timestamp: '2025-08-31T16:30:00Z', contactNumber: '+91-9876543224' },
        wardenApproval: { status: true, timestamp: '2025-08-31T17:00:00Z', approvedBy: 'Dr. Kavitha Rao', remarks: 'Academic workshop approved' },
        hodApproval: { status: true, timestamp: '2025-08-31T17:30:00Z', approvedBy: 'Dr. Chemical HOD' }
      },
      contactDuringOut: '+91-9876543224',
      accompaniedBy: 'Fellow classmates and faculty',
      vehicleDetails: 'College Bus - KA 01 AC 2345',
      expectedRoute: 'College -> IISC -> College',
      guardianConsent: true,
      remarks: 'Department organized academic visit'
    },
    {
      id: 'REQ003',
      student: {
        id: 'STU009', name: 'Ravi Shankar', rollNumber: '2023ME025', block: 'D Block', roomNumber: 'D-208',
        branch: 'Mechanical Engineering', semester: 4, parentContact: '+91-9876543226',
        parentEmail: 'ravi.parent@email.com', emergencyContact: '+91-9876543227'
      },
      requestedDate: '2025-08-31T11:00:00Z',
      outTime: '2025-09-01T16:00:00Z',
      expectedReturnTime: '2025-09-01T21:30:00Z',
      destination: 'Whitefield - Tech Mahindra Office',
      purpose: 'Campus placement interview - Final round',
      outPassType: 'Official',
      status: 'Approved',
      currentStatus: 'In Hostel',
      approvals: {
        parentApproval: { status: true, timestamp: '2025-08-31T11:30:00Z', contactNumber: '+91-9876543226' },
        wardenApproval: { status: true, timestamp: '2025-08-31T12:00:00Z', approvedBy: 'Dr. Rajesh Sharma', remarks: 'Placement interview approved' },
        hodApproval: { status: true, timestamp: '2025-08-31T12:30:00Z', approvedBy: 'Dr. Mechanical HOD' }
      },
      contactDuringOut: '+91-9876543226',
      accompaniedBy: 'Self',
      vehicleDetails: 'Cab booking via college placement cell',
      expectedRoute: 'Hostel -> Whitefield -> Hostel',
      guardianConsent: true,
      remarks: 'Final round placement interview - very important'
    },
    {
      id: 'REQ004',
      student: {
        id: 'STU010', name: 'Meera Reddy', rollNumber: '2022ECE067', block: 'E Block', roomNumber: 'E-105',
        branch: 'Electronics & Communication', semester: 6, parentContact: '+91-9876543228',
        parentEmail: 'meera.parent@email.com', emergencyContact: '+91-9876543229'
      },
      requestedDate: '2025-08-31T08:00:00Z',
      outTime: '2025-09-01T15:00:00Z',
      expectedReturnTime: '2025-09-01T20:00:00Z',
      destination: 'Jayanagar - Dental Clinic',
      purpose: 'Dental treatment - root canal procedure',
      outPassType: 'Medical',
      status: 'Pending',
      currentStatus: 'In Hostel',
      approvals: {
        parentApproval: { status: true, timestamp: '2025-08-31T08:30:00Z', contactNumber: '+91-9876543228' },
        wardenApproval: { status: false, remarks: 'Awaiting medical certificate submission' }
      },
      contactDuringOut: '+91-9876543228',
      accompaniedBy: 'Mother accompanying',
      vehicleDetails: 'Private Car',
      expectedRoute: 'Hostel -> Jayanagar -> Hostel',
      guardianConsent: true,
      remarks: 'Dental emergency, appointment already booked'
    },
    {
      id: 'REQ005',
      student: {
        id: 'STU011', name: 'Arun Kumar', rollNumber: '2023CSE089', block: 'A Block', roomNumber: 'A-305',
        branch: 'Computer Science Engineering', semester: 4, parentContact: '+91-9876543230',
        parentEmail: 'arun.parent@email.com', emergencyContact: '+91-9876543231'
      },
      requestedDate: '2025-08-31T14:00:00Z',
      outTime: '2025-09-01T17:00:00Z',
      expectedReturnTime: '2025-09-01T21:00:00Z',
      destination: 'Phoenix Mall - Local shopping',
      purpose: 'Purchase laptop and study materials for upcoming project',
      outPassType: 'Local',
      status: 'Denied',
      currentStatus: 'In Hostel',
      approvals: {
        parentApproval: { status: false },
        wardenApproval: { status: false, remarks: 'Parent consent not received, request denied' }
      },
      contactDuringOut: '+91-9876543230',
      accompaniedBy: 'Two friends from same batch',
      vehicleDetails: 'Metro + Bus',
      expectedRoute: 'Hostel -> Phoenix Mall -> Hostel',
      guardianConsent: false,
      remarks: 'Parent consent required for local outings'
    }
  ]);

  // Historical Records (Past 6 months)
  const historicalRecords: OutTimeEntry[] = [
    {
      id: 'HIST001',
      student: {
        id: 'STU012', name: 'Priya Sharma', rollNumber: '2021ECE099', block: 'A Block', roomNumber: 'A-108',
        branch: 'Electronics & Communication', semester: 8, parentContact: '+91-9876543232',
        parentEmail: 'priya.parent@email.com', emergencyContact: '+91-9876543233'
      },
      requestedDate: '2025-02-15T13:00:00Z',
      outTime: '2025-02-15T14:00:00Z',
      expectedReturnTime: '2025-02-17T20:00:00Z',
      actualReturnTime: '2025-02-17T19:30:00Z',
      destination: 'Home - Hyderabad',
      purpose: 'Festival vacation - Maha Shivratri celebrations',
      outPassType: 'Weekend',
      status: 'Approved',
      currentStatus: 'Returned',
      approvals: {
        parentApproval: { status: true, timestamp: '2025-02-14T20:00:00Z', contactNumber: '+91-9876543232' },
        wardenApproval: { status: true, timestamp: '2025-02-14T22:00:00Z', approvedBy: 'Warden Suresh Kumar' },
        hodApproval: { status: true, timestamp: '2025-02-14T17:00:00Z', approvedBy: 'HOD ECE' }
      },
      contactDuringOut: '+91-9876543232',
      accompaniedBy: 'Family members',
      vehicleDetails: 'Train - Rajdhani Express',
      expectedRoute: 'Hostel -> Railway Station -> Hyderabad -> Hostel',
      guardianConsent: true,
      biometricOut: { timestamp: '2025-02-15T14:00:00Z', deviceId: 'BIO_GATE_01' },
      biometricIn: { timestamp: '2025-02-17T19:30:00Z', deviceId: 'BIO_GATE_01' },
      violations: []
    },
    {
      id: 'HIST002',
      student: {
        id: 'STU013', name: 'Arjun Singh', rollNumber: '2022ME034', block: 'B Block', roomNumber: 'B-210',
        branch: 'Mechanical Engineering', semester: 6, parentContact: '+91-9876543234',
        parentEmail: 'arjun.parent@email.com', emergencyContact: '+91-9876543235'
      },
      requestedDate: '2025-01-10T10:30:00Z',
      outTime: '2025-01-10T11:00:00Z',
      expectedReturnTime: '2025-01-10T22:00:00Z',
      actualReturnTime: '2025-01-11T02:00:00Z',
      destination: 'Manipal Hospital - Emergency',
      purpose: 'Medical emergency - severe stomach pain and fever',
      outPassType: 'Emergency',
      status: 'Approved',
      currentStatus: 'Returned',
      approvals: {
        parentApproval: { status: true, timestamp: '2025-01-09T17:00:00Z', contactNumber: '+91-9876543234' },
        wardenApproval: { status: true, timestamp: '2025-01-10T10:00:00Z', approvedBy: 'Night Warden - Anil Kumar', remarks: 'Medical emergency approved immediately' }
      },
      contactDuringOut: '+91-9876543234',
      accompaniedBy: 'Roommate and hostel supervisor',
      vehicleDetails: 'College Emergency Vehicle',
      expectedRoute: 'Hostel -> Hospital -> Hostel',
      guardianConsent: true,
      biometricOut: { timestamp: '2025-01-10T11:00:00Z', deviceId: 'BIO_GATE_01' },
      biometricIn: { timestamp: '2025-01-11T02:00:00Z', deviceId: 'BIO_GATE_01' },
      violations: ['Returned 4 hours late due to medical emergency - No penalty applied']
    }
  ];

  // Action Handlers
  const handleSendSMS = (entry: OutTimeEntry) => {
    const message = `Alert: Your child ${entry.student.name} (${entry.student.rollNumber}) is currently ${entry.currentStatus.toLowerCase()}. Out time: ${formatDateTime(entry.outTime)}. Expected return: ${formatDateTime(entry.expectedReturnTime)}.`;
    console.log(`Sending SMS to ${entry.student.parentContact}: ${message}`);
    alert(`SMS sent to parent: ${entry.student.parentContact}`);
  };

  const handleMarkAsReturned = (entry: OutTimeEntry) => {
    const updatedEntry = {
      ...entry,
      currentStatus: 'Returned' as const,
      actualReturnTime: new Date().toISOString(),
      biometricIn: {
        timestamp: new Date().toISOString(),
        deviceId: 'BIO_GATE_01'
      }
    };

    // Update in currentEntries
    setCurrentEntries(prev => 
      prev.map(e => e.id === entry.id ? updatedEntry : e)
    );

    // Update selectedEntry if it's the same
    if (selectedEntry?.id === entry.id) {
      setSelectedEntry(updatedEntry);
    }

    alert(`${entry.student.name} marked as returned successfully!`);
  };

  const handleGenerateReport = (entry: OutTimeEntry) => {
    const reportData = {
      studentName: entry.student.name,
      rollNumber: entry.student.rollNumber,
      outTime: entry.outTime,
      returnTime: entry.actualReturnTime || 'Not returned',
      destination: entry.destination,
      purpose: entry.purpose,
      status: entry.status
    };
    
    console.log('Generating report for:', reportData);
    alert(`Report generated for ${entry.student.name}`);
  };

  const handleSendOverdueAlert = (entry: OutTimeEntry) => {
    const currentTime = new Date();
    const expectedReturn = new Date(entry.expectedReturnTime);
    const overdueHours = Math.ceil((currentTime.getTime() - expectedReturn.getTime()) / (1000 * 60 * 60));
    
    const alertMessage = `URGENT: ${entry.student.name} is overdue by ${overdueHours} hours. Please contact immediately.`;
    
    console.log(`Sending overdue alert: ${alertMessage}`);
    alert(`Overdue alert sent to parent, warden, and emergency contacts`);
  };

  const handleApproveRequest = (entry: OutTimeEntry) => {
    const updatedEntry = {
      ...entry,
      status: 'Approved' as const,
      approvals: {
        ...entry.approvals,
        wardenApproval: {
          status: true,
          timestamp: new Date().toISOString(),
          approvedBy: 'Current Warden',
          remarks: 'Approved via management system'
        }
      }
    };
    
    setOutPassRequests(prev => 
      prev.map(e => e.id === entry.id ? updatedEntry : e)
    );

    if (selectedEntry?.id === entry.id) {
      setSelectedEntry(updatedEntry);
    }

    alert(`Request approved for ${entry.student.name}`);
  };

  const handleDenyRequest = (entry: OutTimeEntry) => {
    const reason = prompt('Please enter reason for denial:');
    if (reason) {
      const updatedEntry = {
        ...entry,
        status: 'Denied' as const,
        approvals: {
          ...entry.approvals,
          wardenApproval: {
            status: false,
            timestamp: new Date().toISOString(),
            approvedBy: 'Current Warden',
            remarks: reason
          }
        }
      };
      
      setOutPassRequests(prev => 
        prev.map(e => e.id === entry.id ? updatedEntry : e)
      );

      if (selectedEntry?.id === entry.id) {
        setSelectedEntry(updatedEntry);
      }

      alert(`Request denied for ${entry.student.name}`);
    }
  };

  const handleEditRequest = (entry: OutTimeEntry) => {
    console.log('Opening edit form for:', entry);
    alert(`Edit form opened for ${entry.student.name}`);
  };

  // Combine all entries based on active tab
  const getAllEntries = () => {
    switch (activeTab) {
      case 'current': return currentEntries;
      case 'requests': return outPassRequests;
      case 'history': return historicalRecords;
      default: return [...currentEntries, ...outPassRequests, ...historicalRecords];
    }
  };

  const filteredEntries = getAllEntries().filter(entry => {
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'approved' && entry.status === 'Approved') ||
      (selectedFilter === 'pending' && entry.status === 'Pending') ||
      (selectedFilter === 'overdue' && entry.currentStatus === 'Overdue') ||
      (selectedFilter === 'returned' && entry.currentStatus === 'Returned');
    
    const matchesSearch = entry.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleViewDetails = (entry: OutTimeEntry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-secondary-500 text-white';
      case 'Pending': return 'bg-accent-400 text-white';
      case 'Denied': return 'bg-red-500 text-white';
      case 'Cancelled': return 'bg-gray-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const getCurrentStatusColor = (status: string) => {
    switch (status) {
      case 'In Hostel': return 'bg-secondary-500 text-white';
      case 'Out': return 'bg-blue-500 text-white';
      case 'Returned': return 'bg-primary-500 text-white';
      case 'Overdue': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getOutPassTypeColor = (type: string) => {
    switch (type) {
      case 'Emergency': return 'bg-red-100 text-red-800';
      case 'Medical': return 'bg-blue-100 text-blue-800';
      case 'Official': return 'bg-green-100 text-green-800';
      case 'Outstation': return 'bg-purple-100 text-purple-800';
      case 'Local': return 'bg-gray-100 text-gray-800';
      case 'Weekend': return 'bg-accent-100 text-accent-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Analytics data
  const allEntries = [...currentEntries, ...outPassRequests, ...historicalRecords];
  const totalRequests = allEntries.length;
  const approvedRequests = allEntries.filter(entry => entry.status === 'Approved').length;
  const currentlyOut = currentEntries.filter(entry => entry.currentStatus === 'Out').length;
  const overdueStudents = allEntries.filter(entry => entry.currentStatus === 'Overdue').length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="">
        
        {/* Tab Navigation */}
        <nav className="flex gap-2 mb-8 bg-white p-2 rounded-lg shadow-sm border">
          {[
            { key: 'current', label: 'Current Out/In Status' },
            { key: 'requests', label: 'Out Pass Requests' },
            { key: 'history', label: 'Historical Records' },
            { key: 'analytics', label: 'Analytics Dashboard' }
          ].map((tab) => (
            <button
              key={tab.key}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 text-sm ${
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

        {/* Content for all tabs */}
        {(activeTab === 'current' || activeTab === 'requests' || activeTab === 'history') && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {activeTab === 'current' ? 'Currently Out' : 
                   activeTab === 'requests' ? 'Pending Requests' : 'Total Records'}
                </h3>
                <p className="text-3xl font-bold text-primary-600">
                  {activeTab === 'current' ? currentlyOut : 
                   activeTab === 'requests' ? outPassRequests.filter(r => r.status === 'Pending').length :
                   historicalRecords.length}
                </p>
                <p className="text-sm text-gray-600">
                  {activeTab === 'current' ? 'Students outside hostel' : 
                   activeTab === 'requests' ? 'Awaiting approval' : 'Past 6 months'}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-secondary-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {activeTab === 'current' ? 'In Hostel' : 
                   activeTab === 'requests' ? 'Approved Today' : 'Approved Records'}
                </h3>
                <p className="text-3xl font-bold text-secondary-600">
                  {activeTab === 'current' ? currentEntries.filter(e => e.currentStatus === 'In Hostel').length : 
                   activeTab === 'requests' ? outPassRequests.filter(r => r.status === 'Approved').length :
                   historicalRecords.filter(r => r.status === 'Approved').length}
                </p>
                <p className="text-sm text-gray-600">
                  {activeTab === 'current' ? 'Students in hostel' : 
                   activeTab === 'requests' ? 'Ready to go out' : 'Successfully completed'}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-accent-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {activeTab === 'current' ? 'Returned Today' : 
                   activeTab === 'requests' ? 'Denied Requests' : 'Emergency Cases'}
                </h3>
                <p className="text-3xl font-bold text-accent-600">
                  {activeTab === 'current' ? currentEntries.filter(e => e.currentStatus === 'Returned').length : 
                   activeTab === 'requests' ? outPassRequests.filter(r => r.status === 'Denied').length :
                   historicalRecords.filter(r => r.outPassType === 'Emergency').length}
                </p>
                <p className="text-sm text-gray-600">
                  {activeTab === 'current' ? 'Safe returns' : 
                   activeTab === 'requests' ? 'Need resubmission' : 'Emergency approvals'}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {activeTab === 'current' ? 'Overdue' : 
                   activeTab === 'requests' ? 'Urgent Approvals' : 'Violations'}
                </h3>
                <p className="text-3xl font-bold text-red-600">
                  {activeTab === 'current' ? overdueStudents : 
                   activeTab === 'requests' ? outPassRequests.filter(r => r.outPassType === 'Emergency').length :
                   historicalRecords.filter(r => r.violations && r.violations.length > 0).length}
                </p>
                <p className="text-sm text-gray-600">
                  {activeTab === 'current' ? 'Late returns' : 
                   activeTab === 'requests' ? 'Need immediate action' : 'Rule violations'}
                </p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search by name, roll number, or destination..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'all', label: 'All' },
                    { key: 'approved', label: 'Approved' },
                    { key: 'pending', label: 'Pending' },
                    { key: 'returned', label: 'Returned' },
                    { key: 'overdue', label: 'Overdue' },
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
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Out Pass Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timing</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {activeTab === 'current' ? 'Current Status' : activeTab === 'requests' ? 'Approval Status' : 'Return Status'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEntries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{entry.student.name}</div>
                            <div className="text-sm text-gray-500">{entry.student.rollNumber}</div>
                            <div className="text-xs text-gray-400">{entry.student.block} - {entry.student.roomNumber}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOutPassTypeColor(entry.outPassType)}`}>
                            {entry.outPassType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{entry.destination}</div>
                          <div className="text-xs text-gray-500">{entry.purpose}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="text-gray-900">Out: {formatDateTime(entry.outTime)}</div>
                          <div className="text-gray-500">Expected: {formatDateTime(entry.expectedReturnTime)}</div>
                          {entry.actualReturnTime && (
                            <div className="text-secondary-600">Returned: {formatDateTime(entry.actualReturnTime)}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(entry.status)}`}>
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCurrentStatusColor(entry.currentStatus)}`}>
                            {entry.currentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleViewDetails(entry)}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredEntries.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m0 0V9a1 1 0 011-1h.01a1 1 0 011 1v3m-6 0v6a1 1 0 001 1h6a1 1 0 001-1v-6m0 0V9a1 1 0 011-1h.01a1 1 0 011 1v3m0 9v6a1 1 0 01-1 1H7a1 1 0 01-1-1v-6a1 1 0 011-1h6z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No records found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Out Pass Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Requests:</span>
                    <span className="font-semibold">{totalRequests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Approved:</span>
                    <span className="font-semibold text-secondary-600">{approvedRequests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Approval Rate:</span>
                    <span className="font-semibold text-primary-600">{Math.round((approvedRequests/totalRequests)*100)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Out Pass Types</h3>
                <div className="space-y-2">
                  {['Local', 'Medical', 'Official', 'Outstation', 'Emergency', 'Weekend'].map((type) => {
                    const count = allEntries.filter(entry => entry.outPassType === type).length;
                    return (
                      <div key={type} className="flex justify-between text-sm">
                        <span className="text-gray-600">{type}:</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Violation Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Late Returns:</span>
                    <span className="font-medium text-red-600">
                      {allEntries.filter(entry => entry.violations && entry.violations.length > 0).length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">On Time:</span>
                    <span className="font-medium text-secondary-600">
                      {allEntries.filter(entry => !entry.violations || entry.violations.length === 0).length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Compliance Rate:</span>
                    <span className="font-medium text-primary-600">
                      {Math.round((allEntries.filter(entry => !entry.violations || entry.violations.length === 0).length / allEntries.length) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Block-wise Distribution</h3>
                <div className="space-y-2">
                  {['A Block', 'B Block', 'C Block', 'D Block', 'E Block'].map((block) => {
                    const count = allEntries.filter(entry => entry.student.block === block).length;
                    return (
                      <div key={block} className="flex justify-between text-sm">
                        <span className="text-gray-600">{block}:</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Out Pass Trends</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {['Aug 2025', 'Jul 2025', 'Jun 2025', 'May 2025', 'Apr 2025', 'Mar 2025'].map((month, index) => {
                  const requests = Math.floor(Math.random() * 50) + 20; // Simulated data
                  const approved = Math.floor(requests * 0.8);
                  return (
                    <div key={month} className="text-center p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">{month}</h4>
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-600">Requests: {requests}</div>
                        <div className="text-secondary-600">Approved: {approved}</div>
                        <div className="text-primary-600">Rate: {Math.round((approved/requests)*100)}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Detailed Modal */}
        {isModalOpen && selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Out Pass Details - {selectedEntry.id}</h2>
                  <p className="text-gray-600">{selectedEntry.student.name} • {selectedEntry.student.rollNumber}</p>
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Student & Request Information */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-600">Name:</span>
                            <p className="font-medium">{selectedEntry.student.name}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Roll Number:</span>
                            <p className="font-medium">{selectedEntry.student.rollNumber}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Branch:</span>
                            <p className="font-medium">{selectedEntry.student.branch}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Semester:</span>
                            <p className="font-medium">{selectedEntry.student.semester}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Room:</span>
                            <p className="font-medium">{selectedEntry.student.block} - {selectedEntry.student.roomNumber}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Parent Contact:</span>
                            <p className="font-medium">{selectedEntry.student.parentContact}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Out Pass Request Details</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-600">Request Date:</span>
                          <p className="font-medium">{formatDateTime(selectedEntry.requestedDate)}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Out Pass Type:</span>
                          <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded ${getOutPassTypeColor(selectedEntry.outPassType)}`}>
                            {selectedEntry.outPassType}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Destination:</span>
                          <p className="font-medium">{selectedEntry.destination}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Purpose:</span>
                          <p className="font-medium">{selectedEntry.purpose}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Contact During Out:</span>
                          <p className="font-medium">{selectedEntry.contactDuringOut}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Accompanied By:</span>
                          <p className="font-medium">{selectedEntry.accompaniedBy || 'Self'}</p>
                        </div>
                        {selectedEntry.vehicleDetails && (
                          <div>
                            <span className="text-gray-600">Vehicle Details:</span>
                            <p className="font-medium">{selectedEntry.vehicleDetails}</p>
                          </div>
                        )}
                        {selectedEntry.expectedRoute && (
                          <div>
                            <span className="text-gray-600">Expected Route:</span>
                            <p className="font-medium">{selectedEntry.expectedRoute}</p>
                          </div>
                        )}
                        {selectedEntry.remarks && (
                          <div>
                            <span className="text-gray-600">Remarks:</span>
                            <p className="font-medium">{selectedEntry.remarks}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Timing & Approval Information */}
                  <div className="space-y-6">
                    <div className="bg-secondary-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Timing Information</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-600">Out Time:</span>
                          <p className="font-medium">{formatDateTime(selectedEntry.outTime)}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Expected Return Time:</span>
                          <p className="font-medium">{formatDateTime(selectedEntry.expectedReturnTime)}</p>
                        </div>
                        {selectedEntry.actualReturnTime && (
                          <div>
                            <span className="text-gray-600">Actual Return Time:</span>
                            <p className="font-medium text-secondary-600">{formatDateTime(selectedEntry.actualReturnTime)}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-600">Current Status:</span>
                          <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getCurrentStatusColor(selectedEntry.currentStatus)}`}>
                            {selectedEntry.currentStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-accent-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Approval Status</h3>
                      <div className="space-y-4 text-sm">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Parent Approval:</span>
                            <span className={`px-2 py-1 text-xs rounded ${selectedEntry.approvals.parentApproval.status ? 'bg-secondary-100 text-secondary-700' : 'bg-red-100 text-red-700'}`}>
                              {selectedEntry.approvals.parentApproval.status ? 'Approved' : 'Pending'}
                            </span>
                          </div>
                          {selectedEntry.approvals.parentApproval.timestamp && (
                            <p className="text-xs text-gray-500">
                              Approved on: {formatDateTime(selectedEntry.approvals.parentApproval.timestamp)}
                            </p>
                          )}
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Warden Approval:</span>
                            <span className={`px-2 py-1 text-xs rounded ${selectedEntry.approvals.wardenApproval.status ? 'bg-secondary-100 text-secondary-700' : 'bg-red-100 text-red-700'}`}>
                              {selectedEntry.approvals.wardenApproval.status ? 'Approved' : 'Pending'}
                            </span>
                          </div>
                          {selectedEntry.approvals.wardenApproval.approvedBy && (
                            <p className="text-xs text-gray-500">
                              Approved by: {selectedEntry.approvals.wardenApproval.approvedBy}
                            </p>
                          )}
                          {selectedEntry.approvals.wardenApproval.remarks && (
                            <p className="text-xs text-gray-600 mt-1">
                              Remarks: {selectedEntry.approvals.wardenApproval.remarks}
                            </p>
                          )}
                        </div>

                        {selectedEntry.approvals.hodApproval && (
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-600">HOD Approval:</span>
                              <span className={`px-2 py-1 text-xs rounded ${selectedEntry.approvals.hodApproval.status ? 'bg-secondary-100 text-secondary-700' : 'bg-red-100 text-red-700'}`}>
                                {selectedEntry.approvals.hodApproval.status ? 'Approved' : 'Pending'}
                              </span>
                            </div>
                            {selectedEntry.approvals.hodApproval.approvedBy && (
                              <p className="text-xs text-gray-500">
                                Approved by: {selectedEntry.approvals.hodApproval.approvedBy}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {(selectedEntry.biometricOut || selectedEntry.biometricIn || selectedEntry.violations) && (
                      <div className="bg-primary-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Security & Compliance Records</h3>
                        <div className="space-y-3 text-sm">
                          {selectedEntry.biometricOut && (
                            <div>
                              <span className="text-gray-600">Biometric Out:</span>
                              <p className="font-medium">{formatDateTime(selectedEntry.biometricOut.timestamp)}</p>
                              <p className="text-xs text-gray-500">Device: {selectedEntry.biometricOut.deviceId}</p>
                            </div>
                          )}
                          {selectedEntry.biometricIn && (
                            <div>
                              <span className="text-gray-600">Biometric In:</span>
                              <p className="font-medium">{formatDateTime(selectedEntry.biometricIn.timestamp)}</p>
                              <p className="text-xs text-gray-500">Device: {selectedEntry.biometricIn.deviceId}</p>
                            </div>
                          )}
                          {selectedEntry.violations && selectedEntry.violations.length > 0 && (
                            <div>
                              <span className="text-gray-600">Violations:</span>
                              <div className="mt-2 space-y-1">
                                {selectedEntry.violations.map((violation, index) => (
                                  <p key={index} className="text-red-600 text-xs bg-red-50 p-2 rounded">
                                    {violation}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Responsive Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200">
                  {/* Always show SMS button */}
                  <button 
                    onClick={() => handleSendSMS(selectedEntry)}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Send SMS to Parent
                  </button>

                  {/* Show Mark as Returned only if student is currently out */}
                  {selectedEntry.currentStatus === 'Out' && (
                    <button 
                      onClick={() => handleMarkAsReturned(selectedEntry)}
                      className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mark as Returned
                    </button>
                  )}

                  {/* Always show Generate Report */}
                  <button 
                    onClick={() => handleGenerateReport(selectedEntry)}
                    className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Generate Report
                  </button>

                  {/* Show Overdue Alert only if student is overdue */}
                  {(selectedEntry.currentStatus === 'Overdue' || 
                   (selectedEntry.currentStatus === 'Out' && new Date() > new Date(selectedEntry.expectedReturnTime))) && (
                    <button 
                      onClick={() => handleSendOverdueAlert(selectedEntry)}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      Send Overdue Alert
                    </button>
                  )}

                  {/* Show approval buttons only for pending requests */}
                  {selectedEntry.status === 'Pending' && (
                    <>
                      <button 
                        onClick={() => handleApproveRequest(selectedEntry)}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Approve Request
                      </button>
                      <button 
                        onClick={() => handleDenyRequest(selectedEntry)}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Deny Request
                      </button>
                    </>
                  )}

                  {/* Show Edit button only for pending or approved requests that haven't started */}
                  {(selectedEntry.status === 'Pending' || 
                    (selectedEntry.status === 'Approved' && selectedEntry.currentStatus === 'In Hostel')) && (
                    <button 
                      onClick={() => handleEditRequest(selectedEntry)}
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Request
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutTimeManagement;
