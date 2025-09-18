 import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Download, Upload, Filter, MoreVertical, Mail, Phone, Calendar, BookOpen, Award, Users, Clock, MapPin } from 'lucide-react';

const FacultyManagement = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Sample faculty data
  const [facultyData, setFacultyData] = useState([
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      employeeId: "FAC001",
      email: "rajesh.kumar@college.edu",
      phone: "+91 9876543210",
      department: "Computer Science",
      designation: "Professor",
      qualification: "Ph.D in Computer Science",
      experience: "12 years",
      joiningDate: "2012-07-15",
      subjects: ["Data Structures", "Algorithms", "Database Systems"],
      salary: 85000,
      status: "Active",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      address: "123 Faculty Colony, Delhi",
      workload: 18,
      publications: 25,
      projects: 8
    },
    {
      id: 2,
      name: "Prof. Priya Sharma",
      employeeId: "FAC002",
      email: "priya.sharma@college.edu",
      phone: "+91 9876543211",
      department: "Mathematics",
      designation: "Associate Professor",
      qualification: "M.Sc, Ph.D in Mathematics",
      experience: "8 years",
      joiningDate: "2016-08-20",
      subjects: ["Calculus", "Linear Algebra", "Statistics"],
      salary: 75000,
      status: "Active",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b332c3f8?w=150&h=150&fit=crop&crop=face",
      address: "456 Academic Street, Delhi",
      workload: 16,
      publications: 18,
      projects: 5
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      employeeId: "FAC003",
      email: "amit.patel@college.edu",
      phone: "+91 9876543212",
      department: "Physics",
      designation: "Assistant Professor",
      qualification: "Ph.D in Physics",
      experience: "6 years",
      joiningDate: "2018-01-10",
      subjects: ["Quantum Physics", "Electronics", "Optics"],
      salary: 65000,
      status: "Active",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      address: "789 University Road, Delhi",
      workload: 20,
      publications: 12,
      projects: 3
    }
  ]);

  const departments = ["Computer Science", "Mathematics", "Physics", "Chemistry", "English", "History"];
  const designations = ["Professor", "Associate Professor", "Assistant Professor", "Lecturer"];

  const filteredFaculty = facultyData.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === '' || faculty.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const openModal = (type, faculty = null) => {
    setModalType(type);
    setSelectedFaculty(faculty);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFaculty(null);
    setModalType('');
  };

  const handleAddFaculty = (formData) => {
    // Validate required fields
    if (!formData.name || !formData.employeeId || !formData.email || !formData.department || !formData.designation) {
      alert('Please fill in all required fields');
      return;
    }

    // Check for duplicate employee ID
    if (facultyData.some(f => f.employeeId === formData.employeeId)) {
      alert('Employee ID already exists');
      return;
    }

    const newFaculty = {
      id: Date.now(), // Use timestamp for unique ID
      ...formData,
      subjects: formData.subjects || [],
      salary: parseInt(formData.salary) || 0,
      workload: parseInt(formData.workload) || 0,
      publications: parseInt(formData.publications) || 0,
      projects: parseInt(formData.projects) || 0,
      status: 'Active'
    };
    setFacultyData([...facultyData, newFaculty]);
    closeModal();
  };

  const handleEditFaculty = (formData) => {
    // Validate required fields
    if (!formData.name || !formData.employeeId || !formData.email || !formData.department || !formData.designation) {
      alert('Please fill in all required fields');
      return;
    }

    // Check for duplicate employee ID (excluding current faculty)
    if (facultyData.some(f => f.employeeId === formData.employeeId && f.id !== selectedFaculty.id)) {
      alert('Employee ID already exists');
      return;
    }

    const updatedFormData = {
      ...formData,
      subjects: formData.subjects || [],
      salary: parseInt(formData.salary) || 0,
      workload: parseInt(formData.workload) || 0,
      publications: parseInt(formData.publications) || 0,
      projects: parseInt(formData.projects) || 0,
    };

    setFacultyData(facultyData.map(f => 
      f.id === selectedFaculty.id ? { ...f, ...updatedFormData } : f
    ));
    closeModal();
  };

  const handleDeleteFaculty = (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      setFacultyData(facultyData.filter(f => f.id !== id));
    }
  };

  const FacultyCard = ({ faculty }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img 
            src={faculty.photo} 
            alt={faculty.name} 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{faculty.name}</h3>
            <p className="text-sm text-gray-600">{faculty.designation}</p>
            <p className="text-sm text-blue-600">{faculty.department}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => openModal('view', faculty)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => openModal('edit', faculty)} className="p-2 text-green-600 hover:bg-green-50 rounded">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => handleDeleteFaculty(faculty.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{faculty.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{faculty.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{faculty.experience}</span>
        </div>
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{faculty.subjects.length} Subjects</span>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          faculty.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {faculty.status}
        </span>
        <span className="text-sm text-gray-600">ID: {faculty.employeeId}</span>
      </div>
    </div>
  );

  const FacultyTable = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredFaculty.map((faculty) => (
            <tr key={faculty.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <img src={faculty.photo} alt={faculty.name} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{faculty.name}</div>
                    <div className="text-sm text-gray-500">{faculty.designation}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{faculty.department}</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                <div>{faculty.email}</div>
                <div>{faculty.phone}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{faculty.experience}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  faculty.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {faculty.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-medium space-x-2">
                <button onClick={() => openModal('view', faculty)} className="text-blue-600 hover:text-blue-900">View</button>
                <button onClick={() => openModal('edit', faculty)} className="text-green-600 hover:text-green-900">Edit</button>
                <button onClick={() => handleDeleteFaculty(faculty.id)} className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const FacultyModal = () => {
    const [formData, setFormData] = useState(selectedFaculty || {
      name: '', employeeId: '', email: '', phone: '', department: '', designation: '',
      qualification: '', experience: '', joiningDate: '', subjects: [], salary: '', address: '',
      workload: '', publications: '', projects: '', photo: ''
    });
    const [imagePreview, setImagePreview] = useState(selectedFaculty?.photo || '');
    const [subjectInput, setSubjectInput] = useState('');

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target.result;
          setImagePreview(result);
          setFormData({...formData, photo: result});
        };
        reader.readAsDataURL(file);
      }
    };

    const addSubject = () => {
      if (subjectInput.trim() && !formData.subjects.includes(subjectInput.trim())) {
        setFormData({
          ...formData, 
          subjects: [...(formData.subjects || []), subjectInput.trim()]
        });
        setSubjectInput('');
      }
    };

    const removeSubject = (subject) => {
      setFormData({
        ...formData,
        subjects: formData.subjects.filter(s => s !== subject)
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (modalType === 'add') {
        handleAddFaculty(formData);
      } else if (modalType === 'edit') {
        handleEditFaculty(formData);
      }
    };

    if (modalType === 'view') {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Faculty Details</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <img src={selectedFaculty.photo} alt={selectedFaculty.name} className="w-full h-64 object-cover rounded-lg" />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold">{selectedFaculty.name}</h3>
                  <p className="text-gray-600">{selectedFaculty.designation}</p>
                  <p className="text-blue-600">{selectedFaculty.department}</p>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Employee ID</label>
                    <p className="text-gray-900">{selectedFaculty.employeeId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{selectedFaculty.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">{selectedFaculty.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Qualification</label>
                    <p className="text-gray-900">{selectedFaculty.qualification}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Experience</label>
                    <p className="text-gray-900">{selectedFaculty.experience}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Joining Date</label>
                    <p className="text-gray-900">{selectedFaculty.joiningDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Salary</label>
                    <p className="text-gray-900">₹{selectedFaculty.salary?.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Workload</label>
                    <p className="text-gray-900">{selectedFaculty.workload} hours/week</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500">Subjects Teaching</label>
                    <p className="text-gray-900">{selectedFaculty.subjects?.join(', ')}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-gray-900">{selectedFaculty.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Publications</label>
                    <p className="text-gray-900">{selectedFaculty.publications}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Research Projects</label>
                    <p className="text-gray-900">{selectedFaculty.projects}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {modalType === 'add' ? 'Add New Faculty' : 'Edit Faculty'}
            </h2>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
              <span className="text-2xl">&times;</span>
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Image Upload Section */}
            <div className="text-center">
              <div className="mb-4">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-sm">No Image</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-md border border-blue-200">
                  <Upload className="w-4 h-4 inline mr-2" />
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Employee ID"
                value={formData.employeeId}
                onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={formData.designation}
                onChange={(e) => setFormData({...formData, designation: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Designation</option>
                {designations.map(des => (
                  <option key={des} value={des}>{des}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Qualification"
                value={formData.qualification}
                onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Experience (e.g., 5 years)"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                placeholder="Joining Date"
                value={formData.joiningDate}
                onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Workload (hours/week)"
                value={formData.workload}
                onChange={(e) => setFormData({...formData, workload: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Publications"
                value={formData.publications}
                onChange={(e) => setFormData({...formData, publications: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Research Projects"
                value={formData.projects}
                onChange={(e) => setFormData({...formData, projects: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <textarea
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
            />

            {/* Subjects Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subjects Teaching</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Enter subject name"
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSubject()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addSubject}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              {formData.subjects && formData.subjects.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {subject}
                      <button
                        type="button"
                        onClick={() => removeSubject(subject)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  // Validate form before submission
                  if (!formData.name || !formData.employeeId || !formData.email || !formData.department || !formData.designation) {
                    alert('Please fill in all required fields (Name, Employee ID, Email, Department, Designation)');
                    return;
                  }
                  
                  if (modalType === 'add') {
                    handleAddFaculty(formData);
                  } else if (modalType === 'edit') {
                    handleEditFaculty(formData);
                  }
                }}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {modalType === 'add' ? 'Add Faculty' : 'Update Faculty'}
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  };

  const StatsCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Faculty Management</h1>
            <div className="flex space-x-4">
              {/* <button onClick={() => {}} className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </button>
              <button onClick={() => {}} className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button> */}

              
              
              <button 
                onClick={() => openModal('add')}
                className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Faculty
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard icon={Users} title="Total Faculty" value={facultyData.length} color="text-blue-500" />
          <StatsCard icon={Award} title="Professors" value={facultyData.filter(f => f.designation === 'Professor').length} color="text-green-500" />
          <StatsCard icon={BookOpen} title="Active Faculty" value={facultyData.filter(f => f.status === 'Active').length} color="text-purple-500" />
          <StatsCard icon={Clock} title="Avg Experience" value="8.7 years" color="text-orange-500" />
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('list')}
                className={`px-4 py-2 rounded-md ${activeTab === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                List View
              </button>
              <button
                onClick={() => setActiveTab('grid')}
                className={`px-4 py-2 rounded-md ${activeTab === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Grid View
              </button>
            </div>
            <button className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Faculty Display */}
        {activeTab === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculty.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          </div>
        ) : (
          <FacultyTable />
        )}

        {filteredFaculty.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No faculty found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {showModal && <FacultyModal />}
    </div>
  );
};

export default FacultyManagement;

