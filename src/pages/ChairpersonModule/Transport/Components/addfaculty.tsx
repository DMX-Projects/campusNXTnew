import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';

const AddFaculty = () => {
  const navigate = useNavigate(); // Add this hook
  
  const [formData, setFormData] = useState({
    facultyId: '',
    fullName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    department: '',
    designation: '',
    busNumber: '',
    routeNumber: '',
    address: '',
    photo: null
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      photo: file
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.facultyId.trim()) {
      newErrors.facultyId = 'Faculty ID is required';
    }
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Faculty form submitted:', formData);
      alert('Faculty added successfully!');
      
      // Reset form after successful submission
      setFormData({
        facultyId: '',
        fullName: '',
        gender: '',
        dateOfBirth: '',
        email: '',
        department: '',
        designation: '',
        busNumber: '',
        routeNumber: '',
        address: '',
        photo: null
      });
      
      // Clear file input
      const fileInput = document.getElementById('photo');
      if (fileInput) {
        fileInput.value = '';
      }

      // Navigate back to staff list after successful submission
      navigate('/transport/faculty');
    }
  };

  const handleBack = () => {
    // Navigate back to staff list
    navigate('/transport/faculty');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
        {/* Header with Back Button */}
       
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Add Faculty</h1>
        
        <div className="space-y-8">
          {/* 1 Basic Details Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">1 Basic Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Faculty ID / Employee ID *
                </label>
                <input
                  type="text"
                  name="facultyId"
                  value={formData.facultyId}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.facultyId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter faculty ID"
                />
                {errors.facultyId && (
                  <p className="text-red-500 text-sm mt-1">{errors.facultyId}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>
              
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 2 Academic Info Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">2 Academic Info</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.department ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter department"
                />
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">{errors.department}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation *
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.designation ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter designation"
                />
                {errors.designation && (
                  <p className="text-red-500 text-sm mt-1">{errors.designation}</p>
                )}
              </div>
            </div>
          </div>

          {/* 3 Transport Info Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">3 Transport Info</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bus Number
                </label>
                <input
                  type="text"
                  name="busNumber"
                  value={formData.busNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter bus number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Route Number / Stop Name
                </label>
                <input
                  type="text"
                  name="routeNumber"
                  value={formData.routeNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter route number or stop name"
                />
              </div>
            </div>
          </div>

          {/* 4 Other Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">4 Other</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Enter complete address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo Upload (optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="photo"
                    accept=".jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="photo"
                    className="w-full px-3 py-3 border border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 flex items-center justify-between min-h-[120px] transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center w-full">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-gray-700 text-center">
                        {formData.photo ? formData.photo.name : 'Click to upload photo'}
                      </span>
                      <span className="text-gray-500 text-sm text-center mt-1">
                        {!formData.photo && 'JPG, JPEG, PNG (Max 5MB)'}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-4 px-6 rounded-md transition-colors duration-200 text-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-md transition-colors duration-200 text-lg"
              >
                Add Faculty
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFaculty;