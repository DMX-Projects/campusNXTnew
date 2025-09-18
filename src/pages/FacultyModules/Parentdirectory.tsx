import React, { useState, useMemo } from 'react';
import { Search, Filter, Phone, Mail, MapPin, User, GraduationCap, Calendar, Building } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  year: number;
  semester: number;
  cgpa: number;
  status: 'Active' | 'Inactive' | 'Graduated';
}

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  relationship: 'Father' | 'Mother' | 'Guardian';
  students: Student[];
  emergencyContact: boolean;
}

const ParentDirectory = () => {
  // Sample data - in real implementation, this would come from API
  const [parents] = useState<Parent[]>([
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 9876543210',
      address: '123 MG Road, Bangalore - 560001',
      occupation: 'Software Engineer',
      relationship: 'Father',
      emergencyContact: true,
      students: [
        {
          id: 's1',
          name: 'Priya Kumar',
          rollNumber: 'CSE21001',
          department: 'Computer Science',
          year: 3,
          semester: 6,
          cgpa: 8.5,
          status: 'Active'
        }
      ]
    },
    {
      id: '2',
      name: 'Mrs. Sunita Sharma',
      email: 'sunita.sharma@email.com',
      phone: '+91 9876543211',
      address: '456 Brigade Road, Bangalore - 560025',
      occupation: 'Teacher',
      relationship: 'Mother',
      emergencyContact: true,
      students: [
        {
          id: 's2',
          name: 'Arjun Sharma',
          rollNumber: 'ECE21002',
          department: 'Electronics & Communication',
          year: 2,
          semester: 4,
          cgpa: 7.8,
          status: 'Active'
        },
        {
          id: 's3',
          name: 'Kavya Sharma',
          rollNumber: 'ME21003',
          department: 'Mechanical Engineering',
          year: 1,
          semester: 2,
          cgpa: 9.1,
          status: 'Active'
        }
      ]
    },
    {
      id: '3',
      name: 'Mr. Venkat Reddy',
      email: 'venkat.reddy@email.com',
      phone: '+91 9876543212',
      address: '789 Koramangala, Bangalore - 560034',
      occupation: 'Business Owner',
      relationship: 'Father',
      emergencyContact: false,
      students: [
        {
          id: 's4',
          name: 'Sanjana Reddy',
          rollNumber: 'IT21004',
          department: 'Information Technology',
          year: 4,
          semester: 8,
          cgpa: 8.9,
          status: 'Active'
        }
      ]
    },
    {
      id: '4',
      name: 'Mrs. Lakshmi Nair',
      email: 'lakshmi.nair@email.com',
      phone: '+91 9876543213',
      address: '321 Indiranagar, Bangalore - 560038',
      occupation: 'Doctor',
      relationship: 'Mother',
      emergencyContact: true,
      students: [
        {
          id: 's5',
          name: 'Rahul Nair',
          rollNumber: 'CE21005',
          department: 'Civil Engineering',
          year: 2,
          semester: 3,
          cgpa: 7.2,
          status: 'Active'
        }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedRelationship, setSelectedRelationship] = useState('All');
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);

  const departments = useMemo(() => {
    const depts = new Set<string>();
    parents.forEach(parent => {
      parent.students.forEach(student => {
        depts.add(student.department);
      });
    });
    return ['All', ...Array.from(depts)];
  }, [parents]);

  const filteredParents = useMemo(() => {
    return parents.filter(parent => {
      const matchesSearch = parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           parent.students.some(student => 
                             student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
                           );

      const matchesDepartment = selectedDepartment === 'All' || 
                               parent.students.some(student => student.department === selectedDepartment);

      const matchesRelationship = selectedRelationship === 'All' || 
                                 parent.relationship === selectedRelationship;

      return matchesSearch && matchesDepartment && matchesRelationship;
    });
  }, [parents, searchTerm, selectedDepartment, selectedRelationship]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Inactive': return 'text-yellow-600 bg-yellow-100';
      case 'Graduated': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 9) return 'text-green-600';
    if (cgpa >= 8) return 'text-blue-600';
    if (cgpa >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Dummy export handler
  const handleExportData = () => {
    // For now, just alert. Replace with actual export logic as needed.
    alert('Export functionality is not implemented yet.');
  };

  // Dummy notification handler
  const handleSendNotification = () => {
    alert('Send Notification functionality is not implemented yet.');
  };
  const handleScheduleMeeting = () => {
    alert('Schedule Meeting functionality is not implemented yet.');
  };
  const handleViewStudentProgress = () => {
    alert('View Student Progress functionality is not implemented yet.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <User className="text-blue-600" size={32} />
                Parent Directory
              </h1>
              <p className="text-gray-600 mt-1">Engineering College ERP System</p>
            </div>
            <div className="text-sm text-gray-500">
              Total Parents: {parents.length} | Total Students: {parents.reduce((acc, p) => acc + p.students.length, 0)}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search parents or students..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedRelationship}
              onChange={(e) => setSelectedRelationship(e.target.value)}
            >
              <option value="All">All Relationships</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Guardian">Guardian</option>
            </select>

            <button onClick={handleExportData} className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Filter size={20} />
              Export Data
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Parent List */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Parents ({filteredParents.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {filteredParents.map((parent) => (
                  <div
                    key={parent.id}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedParent?.id === parent.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                    }`}
                    onClick={() => setSelectedParent(parent)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{parent.name}</h3>
                          <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                            {parent.relationship}
                          </span>
                          {parent.emergencyContact && (
                            <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full">
                              Emergency Contact
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Phone size={16} />
                            {parent.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail size={16} />
                            {parent.email}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {parent.students.map((student) => (
                            <div key={student.id} className="flex items-center gap-2 text-sm">
                              <GraduationCap size={16} className="text-gray-400" />
                              <span className="font-medium">{student.name}</span>
                              <span className="text-gray-500">({student.rollNumber})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Parent Details */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Parent Details</h2>
              </div>
              <div className="p-6">
                {selectedParent ? (
                  <div className="space-y-6">
                    {/* Parent Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Name</label>
                          <p className="text-gray-900">{selectedParent.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Relationship</label>
                          <p className="text-gray-900">{selectedParent.relationship}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Occupation</label>
                          <p className="text-gray-900">{selectedParent.occupation}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Phone</label>
                          <p className="text-gray-900">{selectedParent.phone}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Email</label>
                          <p className="text-gray-900 break-words">{selectedParent.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Address</label>
                          <p className="text-gray-900">{selectedParent.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Students Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Students</h3>
                      <div className="space-y-4">
                        {selectedParent.students.map((student) => (
                          <div key={student.id} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{student.name}</h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                                {student.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-600">Roll:</span>
                                <span className="ml-1 font-medium">{student.rollNumber}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Year:</span>
                                <span className="ml-1 font-medium">{student.year}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Semester:</span>
                                <span className="ml-1 font-medium">{student.semester}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">CGPA:</span>
                                <span className={`ml-1 font-medium ${getCGPAColor(student.cgpa)}`}>
                                  {student.cgpa}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className="text-gray-600">Department:</span>
                              <span className="ml-1 font-medium">{student.department}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      <button onClick={handleSendNotification} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Send Notification
                      </button>
                      <button onClick={handleScheduleMeeting} className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Schedule Meeting
                      </button>
                      <button onClick={handleViewStudentProgress} className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        View Student Progress
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <User className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">Select a parent to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDirectory;

