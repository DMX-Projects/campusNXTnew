import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Users } from 'lucide-react';

const ViewDetailsStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  // Mock function to load student data (replace with actual API call)
  useEffect(() => {
    // This would typically fetch student data by ID
    // For now, using mock data
    const mockStudent = {
      id: 'STU001',
      name: 'John Doe',
      rollNumber: 'STU001',
      gender: 'Male',
      dateOfBirth: 'March 15, 2000 (23)',
      contact: '123-456-7890',
      email: 'john.doe@example.com',
      course: 'Computer Science',
      year: '3',
      section: 'A',
      busNumber: 'BUS007',
      route: 'Route12',
      pickupPoint: 'Main Gate',
      dropPoint: 'Central Library',
      parentName: 'Jane Doe',
      parentContact: '098-765-4321',
      address: '123 Main St, City, State 12345',
      photo: null // Would contain photo URL in real implementation
    };
    setStudent(mockStudent);
  }, [id]);

  const handleEdit = () => {
    // Fixed: Navigate to correct edit route
    navigate(`/transport/edit-student/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      // Handle delete logic here
      console.log('Deleting student:', id);
      // Navigate back to students list after deletion
      navigate('/transport/student-list');
    }
  };

  if (!student) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">View Student</h1>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleEdit}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Student</span>
          </button>
          <button 
            onClick={handleDelete}
            className="px-4 py-2 text-red-700 border border-red-300 rounded-lg hover:bg-red-50 transition-colors flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Student</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {/* Basic Details */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Details</h2>
          <div className="flex items-start space-x-8">
            <div className="flex-shrink-0">
              {student.photo ? (
                <img 
                  src={student.photo} 
                  alt={student.name}
                  className="w-32 h-32 rounded-lg object-cover border border-gray-200"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-200">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700 block mb-1">Student ID / Admission Number</span>
                  <p className="text-gray-900">{student.rollNumber}</p>
                </div>
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700 block mb-1">Full Name</span>
                  <p className="text-gray-900">{student.name}</p>
                </div>
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700 block mb-1">Gender</span>
                  <p className="text-gray-900">{student.gender}</p>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700 block mb-1">Date of Birth</span>
                  <p className="text-gray-900">{student.dateOfBirth}</p>
                </div>
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700 block mb-1">Contact Number</span>
                  <p className="text-gray-900">{student.contact}</p>
                </div>
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700 block mb-1">Email</span>
                  <p className="text-gray-900">{student.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Academic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1">Course</span>
              <p className="text-gray-900">{student.course}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1">Year</span>
              <p className="text-gray-900">{student.year}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1">Section</span>
              <p className="text-gray-900">{student.section}</p>
            </div>
          </div>
        </div>

        {/* Transport Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Transport Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1">Bus Number</span>
              <p className="text-gray-900">{student.busNumber}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1">Route</span>
              <p className="text-gray-900">{student.route}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1">Pickup Point</span>
              <p className="text-gray-900">{student.pickupPoint}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1">Drop Point</span>
              <p className="text-gray-900">{student.dropPoint}</p>
            </div>
          </div>
        </div>

        {/* Parent/Guardian Details */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Parent / Guardian Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-700 block mb-1">Parent/Guardian Name</span>
                <p className="text-gray-900">{student.parentName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 block mb-1">Parent Contact Number</span>
                <p className="text-gray-900">{student.parentContact}</p>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1">Address</span>
              <p className="text-gray-900">{student.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsStudent;