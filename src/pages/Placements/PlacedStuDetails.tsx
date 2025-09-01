// pages/PlacedStuDetails.tsx
import React, { useState } from 'react';
import { 
  UserGroupIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  ChartBarIcon,
  AcademicCapIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const PlacedStuDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const placedStudents = [
    {
      id: 1,
      name: 'Rahul Sharma',
      rollNumber: 'CS21001',
      department: 'Computer Science',
      cgpa: 8.9,
      company: 'Google',
      position: 'Software Engineer',
      package: 45.0,
      location: 'Bangalore',
      joiningDate: '2025-07-15',
      placementDate: '2025-02-20',
      offType: 'Full Time',
      category: 'Dream',
      photo: '/api/placeholder/60/60',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      projects: 3,
      internships: 2
    },
    {
      id: 2,
      name: 'Priya Patel',
      rollNumber: 'IT21002',
      department: 'Information Technology',
      cgpa: 9.2,
      company: 'Microsoft',
      position: 'SDE-1',
      package: 38.5,
      location: 'Hyderabad',
      joiningDate: '2025-08-01',
      placementDate: '2025-02-25',
      offType: 'Full Time',
      category: 'Dream',
      photo: '/api/placeholder/60/60',
      skills: ['C#', '.NET', 'Azure', 'SQL'],
      projects: 4,
      internships: 1
    },
    {
      id: 3,
      name: 'Amit Kumar',
      rollNumber: 'CS21003',
      department: 'Computer Science',
      cgpa: 8.4,
      company: 'TCS',
      position: 'System Engineer',
      package: 4.5,
      location: 'Mumbai',
      joiningDate: '2025-06-01',
      placementDate: '2025-03-10',
      offType: 'Full Time',
      category: 'Core',
      photo: '/api/placeholder/60/60',
      skills: ['Java', 'Spring', 'MySQL', 'Jenkins'],
      projects: 2,
      internships: 1
    },
    {
      id: 4,
      name: 'Sneha Singh',
      rollNumber: 'EC21004',
      department: 'Electronics',
      cgpa: 8.7,
      company: 'Intel',
      position: 'Hardware Engineer',
      package: 12.5,
      location: 'Bangalore',
      joiningDate: '2025-07-20',
      placementDate: '2025-02-15',
      offType: 'Full Time',
      category: 'Super Dream',
      photo: '/api/placeholder/60/60',
      skills: ['VHDL', 'Verilog', 'MATLAB', 'PCB Design'],
      projects: 3,
      internships: 2
    }
  ];

  const placementStats = [
    { name: 'Total Placed', value: '234', icon: UserGroupIcon, color: 'bg-blue-500' },
    { name: 'Avg Package', value: '₹8.2L', icon: CurrencyDollarIcon, color: 'bg-green-500' },
    { name: 'Highest Package', value: '₹45L', icon: TrophyIcon, color: 'bg-yellow-500' },
    { name: 'Companies', value: '67', icon: BuildingOfficeIcon, color: 'bg-purple-500' }
  ];
const [showProfileModal, setShowProfileModal] = useState(false);
const [showCertificateModal, setShowCertificateModal] = useState(false);
const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const companyWiseData = [
    { company: 'TCS', placed: 45, avgPackage: 4.2, category: 'Core' },
    { company: 'Infosys', placed: 38, avgPackage: 4.8, category: 'Core' },
    { company: 'Google', placed: 8, avgPackage: 42.5, category: 'Dream' },
    { company: 'Microsoft', placed: 12, avgPackage: 35.2, category: 'Dream' },
    { company: 'Amazon', placed: 15, avgPackage: 28.6, category: 'Dream' },
    { company: 'Intel', placed: 6, avgPackage: 18.4, category: 'Super Dream' }
  ];

  const departmentStats = [
    { department: 'Computer Science', total: 150, placed: 142, percentage: 94.7, avgPackage: 12.5 },
    { department: 'Information Technology', total: 120, placed: 108, percentage: 90.0, avgPackage: 10.8 },
    { department: 'Electronics', total: 100, placed: 85, percentage: 85.0, avgPackage: 9.2 },
    { department: 'Mechanical', total: 80, placed: 65, percentage: 81.3, avgPackage: 7.5 }
  ];

  const filteredStudents = placedStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = selectedCompany === 'all' || student.company === selectedCompany;
    const matchesDepartment = selectedDepartment === 'all' || student.department === selectedDepartment;
    return matchesSearch && matchesCompany && matchesDepartment;
  });
  const handleExportReport = () => {
  const data = [
    ["Name", "Roll Number", "Department", "Company", "Package(LPA)"],
    ...placedStudents.map(s => [s.name, s.rollNumber, s.department, s.company, s.package])
  ];

  const csvContent = data.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "PlacementReport.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const handleViewProfile = (student: any) => {
  setSelectedStudent(student);
  setShowProfileModal(true);
};
const handleCertificate = (student: any) => {
  setSelectedStudent(student);
  setShowCertificateModal(true);
};


  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Dream': return 'bg-blue-100 text-blue-800';
      case 'Super Dream': return 'bg-purple-100 text-purple-800';
      case 'Core': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Placed Student Details</h1>
        <div className="flex space-x-3">
          <button 
  onClick={handleExportReport} 
  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
>
  <DocumentArrowDownIcon className="w-5 h-5" />
  <span>Export Report</span>
</button>

          {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
            <ChartBarIcon className="w-5 h-5" />
            <span>Analytics</span>
          </button> */}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {placementStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search students, companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select 
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
          </select>
          <select 
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Companies</option>
            <option value="Google">Google</option>
            <option value="Microsoft">Microsoft</option>
            <option value="TCS">TCS</option>
            <option value="Intel">Intel</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: 'overview', label: 'Student Overview' },
              { key: 'analytics', label: 'Analytics' },
              { key: 'companies', label: 'Company Stats' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Student Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <AcademicCapIcon className="w-8 h-8 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{student.name}</h3>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(student.category)}`}>
                            {student.category}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-gray-600">Roll Number:</span>
                            <p className="font-medium">{student.rollNumber}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Department:</span>
                            <p className="font-medium">{student.department}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">CGPA:</span>
                            <p className="font-medium">{student.cgpa}/10</p>
                          </div>
                          <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm">{student.projects} Projects</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <BuildingOfficeIcon className="w-6 h-6 mx-auto text-gray-600 mb-1" />
                            <p className="font-semibold text-gray-900">{student.company}</p>
                            <p className="text-sm text-gray-600">{student.position}</p>
                          </div>
                          <div className="text-center">
                            <CurrencyDollarIcon className="w-6 h-6 mx-auto text-green-600 mb-1" />
                            <p className="font-semibold text-green-600">₹{student.package}L</p>
                            <p className="text-sm text-gray-600">Per Annum</p>
                          </div>
                          <div className="text-center">
                            <MapPinIcon className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                            <p className="font-semibold text-gray-900">{student.location}</p>
                            <p className="text-sm text-gray-600">Joining: {student.joiningDate}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {student.skills.slice(0, 3).map((skill, idx) => (
                              <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">
                                {skill}
                              </span>
                            ))}
                            {student.skills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                +{student.skills.length - 3} more
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button 
  onClick={() => handleViewProfile(student)}
  className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
>
  <EyeIcon className="w-4 h-4" />
  <span>View Profile</span>
</button>
                            <button 
  onClick={() => handleCertificate(student)}
  className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100"
>
  <DocumentArrowDownIcon className="w-4 h-4" />
  <span>Certificate</span>
</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Profile Modal */}
{showProfileModal && selectedStudent && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
      <h2 className="text-xl font-bold mb-4">Profile: {selectedStudent.name}</h2>
      <p><strong>Roll:</strong> {selectedStudent.rollNumber}</p>
      <p><strong>Department:</strong> {selectedStudent.department}</p>
      <p><strong>Company:</strong> {selectedStudent.company}</p>
      <p><strong>Package:</strong> ₹{selectedStudent.package} LPA</p>
      <p><strong>Skills:</strong> {selectedStudent.skills.join(", ")}</p>
      <div className="flex justify-end mt-4">
        <button 
          onClick={() => setShowProfileModal(false)} 
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

{/* Certificate Modal */}
{showCertificateModal && selectedStudent && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">🎓 Certificate of Placement</h2>
      <p>This is to certify that</p>
      <p className="text-xl font-semibold mt-2">{selectedStudent.name}</p>
      <p className="mt-2">has been placed at <strong>{selectedStudent.company}</strong> as a <strong>{selectedStudent.position}</strong></p>
      <p className="mt-2 text-gray-600">Package: ₹{selectedStudent.package} LPA</p>
      <div className="flex justify-center mt-6">
        <button 
          onClick={() => setShowCertificateModal(false)} 
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Department-wise Placement Statistics</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Students</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placed</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Package</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {departmentStats.map((dept, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {dept.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dept.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dept.placed}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="font-medium text-green-600">{dept.percentage}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{dept.avgPackage}L
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all" 
                              style={{ width: `${dept.percentage}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Company Stats Tab */}
          {activeTab === 'companies' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Company-wise Placement Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companyWiseData.map((company, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{company.company}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(company.category)}`}>
                        {company.category}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Students Placed:</span>
                        <span className="font-medium">{company.placed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Package:</span>
                        <span className="font-medium text-green-600">₹{company.avgPackage}L</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacedStuDetails;
