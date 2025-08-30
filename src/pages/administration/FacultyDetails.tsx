import React, { useState } from 'react';
import { User, Mail, Phone, GraduationCap, BookOpen, Award, Calendar, MapPin, Edit, Download, Star } from 'lucide-react';

interface Faculty {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  qualification: string;
  experience: number;
  joiningDate: string;
  subjects: string[];
  rating: number;
  totalStudents: number;
  office: string;
  status: 'active' | 'on-leave' | 'inactive';
  researchArea: string;
  publications: number;
}

const FacultyDetails: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const faculty: Faculty[] = [
    {
      id: 'FAC001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@college.edu',
      phone: '+1 (555) 123-4567',
      department: 'Computer Science',
      designation: 'Professor',
      qualification: 'Ph.D. Computer Science',
      experience: 12,
      joiningDate: '2015-08-15',
      subjects: ['Data Structures', 'Algorithms', 'Machine Learning'],
      rating: 4.8,
      totalStudents: 150,
      office: 'CS-301',
      status: 'active',
      researchArea: 'Artificial Intelligence',
      publications: 25
    },
    {
      id: 'FAC002',
      name: 'Prof. Michael Brown',
      email: 'michael.brown@college.edu',
      phone: '+1 (555) 234-5678',
      department: 'Mathematics',
      designation: 'Associate Professor',
      qualification: 'Ph.D. Mathematics',
      experience: 8,
      joiningDate: '2018-01-20',
      subjects: ['Calculus', 'Linear Algebra', 'Statistics'],
      rating: 4.6,
      totalStudents: 120,
      office: 'MATH-205',
      status: 'active',
      researchArea: 'Applied Mathematics',
      publications: 18
    },
    {
      id: 'FAC003',
      name: 'Dr. Emily Davis',
      email: 'emily.davis@college.edu',
      phone: '+1 (555) 345-6789',
      department: 'Physics',
      designation: 'Assistant Professor',
      qualification: 'Ph.D. Physics',
      experience: 5,
      joiningDate: '2021-09-01',
      subjects: ['Quantum Physics', 'Thermodynamics'],
      rating: 4.7,
      totalStudents: 80,
      office: 'PHY-102',
      status: 'active',
      researchArea: 'Quantum Mechanics',
      publications: 12
    },
    {
      id: 'FAC004',
      name: 'Prof. David Wilson',
      email: 'david.wilson@college.edu',
      phone: '+1 (555) 456-7890',
      department: 'Chemistry',
      designation: 'Professor',
      qualification: 'Ph.D. Chemistry',
      experience: 15,
      joiningDate: '2012-03-10',
      subjects: ['Organic Chemistry', 'Biochemistry'],
      rating: 4.5,
      totalStudents: 100,
      office: 'CHEM-201',
      status: 'on-leave',
      researchArea: 'Organic Synthesis',
      publications: 30
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredFaculty = faculty.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const totalFaculty = faculty.length;
  const activeFaculty = faculty.filter(f => f.status === 'active').length;
  const onLeaveFaculty = faculty.filter(f => f.status === 'on-leave').length;
  const avgRating = faculty.reduce((sum, f) => sum + f.rating, 0) / faculty.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Faculty Details</h1>
          <p className="text-gray-600">Manage faculty profiles, qualifications, and teaching assignments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Faculty</p>
                <p className="text-2xl font-bold text-purple-600">{totalFaculty}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <User className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Faculty</p>
                <p className="text-2xl font-bold text-green-600">{activeFaculty}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">On Leave</p>
                <p className="text-2xl font-bold text-yellow-600">{onLeaveFaculty}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Rating</p>
                <p className="text-2xl font-bold text-pink-600">{avgRating.toFixed(1)}</p>
              </div>
              <div className="p-3 bg-pink-100 rounded-full">
                <Star className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Faculty Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFaculty.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                      <p className="text-purple-600 font-medium">{member.designation}</p>
                      <p className="text-sm text-gray-500">{member.department}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {renderStars(member.rating)}
                    <span className="text-sm text-gray-600 ml-1">({member.rating})</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{member.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Office: {member.office}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{member.experience}y exp</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Qualification</h4>
                <p className="text-sm text-gray-600">{member.qualification}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Subjects Teaching</h4>
                <div className="flex flex-wrap gap-2">
                  {member.subjects.map((subject, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center py-3 bg-gray-50 rounded-lg mb-4">
                <div>
                  <p className="text-sm text-gray-500">Students</p>
                  <p className="font-semibold text-gray-900">{member.totalStudents}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Publications</p>
                  <p className="font-semibold text-gray-900">{member.publications}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Research</p>
                  <p className="font-semibold text-gray-900 text-xs">{member.researchArea.split(' ')[0]}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  CV
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredFaculty.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No faculty members found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDetails;