import React, { useState } from 'react';
import { Calendar, Upload } from 'lucide-react';

export default function AddStudent() {
  const [formData, setFormData] = useState({
    studentId: '',
    gender: '',
    fullName: '',
    email: '',
    dateOfBirth: '',
    course: '',
    section: '',
    transportInfo: '',
    rollNumber: '',
    routeNumber: '',
    pickupPoint: '',
    parentName: '',
    parentContact: '',
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

  const handleCancel = () => {
   
    console.log('Navigating back to student list');
   
    window.history.back();
   
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
    
    // Required fields validation
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.course.trim()) newErrors.course = 'Course/Department/Year is required';
    if (!formData.section.trim()) newErrors.section = 'Section is required';
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll Number is required';
    if (!formData.transportInfo) newErrors.transportInfo = 'Transport Info is required';
    if (!formData.routeNumber.trim()) newErrors.routeNumber = 'Route Number/Stop Name is required';
    if (!formData.pickupPoint.trim()) newErrors.pickupPoint = 'Pickup Point is required';
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent/Guardian Name is required';
    if (!formData.parentContact.trim()) newErrors.parentContact = 'Parent Contact Number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    // Email validation (if provided)
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.parentContact && !/^\+?[\d\s-()]+$/.test(formData.parentContact)) {
      newErrors.parentContact = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Student Data:', formData);
      alert('Student added successfully!');
      
      // Reset form
      setFormData({
        studentId: '',
        gender: '',
        fullName: '',
        email: '',
        dateOfBirth: '',
        course: '',
        section: '',
        transportInfo: '',
        rollNumber: '',
        routeNumber: '',
        pickupPoint: '',
        parentName: '',
        parentContact: '',
        address: '',
        photo: null
      });
      setErrors({});
    }
  };

  const handleReset = () => {
    setFormData({
      studentId: '',
      gender: '',
      fullName: '',
      email: '',
      dateOfBirth: '',
      course: '',
      section: '',
      transportInfo: '',
      rollNumber: '',
      routeNumber: '',
      pickupPoint: '',
      parentName: '',
      parentContact: '',
      address: '',
      photo: null
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Add Student</h1>
          </div>

          <div className="space-y-8">
            {/* Basic Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Basic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student ID / Admission Number
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                      errors.studentId ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.studentId && <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white ${
                      errors.gender ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                </div>
              </div>
            </div>

            {/* Academic Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Academic Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course / Department / Year
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    placeholder="e.g., 10th Grade, BSc Computer Science"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                      errors.course ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section
                  </label>
                  <input
                    type="text"
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    placeholder="e.g., A, B, C"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                      errors.section ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.section && <p className="text-red-500 text-xs mt-1">{errors.section}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                      errors.rollNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.rollNumber && <p className="text-red-500 text-xs mt-1">{errors.rollNumber}</p>}
                </div>
              </div>

              {/* Transport Info Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transport Info
                  </label>
                  <select
                    name="transportInfo"
                    value={formData.transportInfo}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white ${
                      errors.transportInfo ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Transport</option>
                    <option value="bus">School Bus</option>
                    <option value="van">Van Service</option>
                    <option value="private">Private Transport</option>
                    <option value="walking">Walking</option>
                  </select>
                  {errors.transportInfo && <p className="text-red-500 text-xs mt-1">{errors.transportInfo}</p>}
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
                    placeholder="e.g., Route 1, Main Street Stop"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                      errors.routeNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.routeNumber && <p className="text-red-500 text-xs mt-1">{errors.routeNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Point
                  </label>
                  <input
                    type="text"
                    name="pickupPoint"
                    value={formData.pickupPoint}
                    onChange={handleInputChange}
                    placeholder="e.g., Main Gate, Shopping Mall"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                      errors.pickupPoint ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.pickupPoint && <p className="text-red-500 text-xs mt-1">{errors.pickupPoint}</p>}
                </div>
              </div>
            </div>

            {/* Parent/Guardian Details & Other */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Parent / Guardian Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Parent / Guardian Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent/Guardian Name
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.parentName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent Contact Number
                    </label>
                    <input
                      type="tel"
                      name="parentContact"
                      value={formData.parentContact}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.parentContact ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.parentContact && <p className="text-red-500 text-xs mt-1">{errors.parentContact}</p>}
                  </div>
                </div>
              </div>

              {/* Other */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Other</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Enter complete address"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photo Upload (optional)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between bg-white"
                      >
                        <span className="text-gray-700">
                          {formData.photo ? formData.photo.name : 'Choose file'}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {formData.photo ? '' : 'No file chosen'}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-4 px-6 rounded-md transition-colors duration-200 text-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-md transition-colors duration-200 text-lg"
                >
                  Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}