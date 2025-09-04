// StudentProfile.tsx
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Camera,
  Save,
  X,
  Eye,
  EyeOff,
  Download,
  Upload,
  Shield,
  BookOpen,
  Award,
  Clock,
  Bell,
  Settings,
  FileText,
  Heart,
  Home,
  Briefcase,
  GraduationCap
} from 'lucide-react';

interface StudentInfo {
  profileImage: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  registrationNumber: string;
  email: string;
  personalEmail?: string;
  phone: string;
  alternatePhone?: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  nationality: string;
  religion?: string;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'Other';
  aadharNumber: string;
  panNumber?: string;
  currentAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  permanentAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  academicInfo: {
    department: string;
    course: string;
    semester: number;
    section: string;
    batch: string;
    admissionDate: string;
    expectedGraduation: string;
    currentCGPA: number;
    totalCredits: number;
  };
  parentInfo: {
    fatherName: string;
    fatherOccupation: string;
    fatherPhone: string;
    motherName: string;
    motherOccupation: string;
    motherPhone: string;
    annualIncome: string;
  };
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
    email?: string;
    address: string;
  };
  bankDetails?: {
    accountNumber: string;
    bankName: string;
    branchName: string;
    ifscCode: string;
  };
  documents: {
    admissionLetter: boolean;
    tenthMarksheet: boolean;
    twelfthMarksheet: boolean;
    transferCertificate: boolean;
    characterCertificate: boolean;
    categoryProof: boolean;
    aadharCard: boolean;
    photos: boolean;
  };
}

const StudentProfile: React.FC = () => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    profileImage: '/api/placeholder/200/200',
    firstName: 'Arjun',
    lastName: 'Kumar',
    rollNumber: '2022CSE001',
    registrationNumber: 'REG2022001',
    email: 'arjun.kumar@college.edu',
    personalEmail: 'arjun.personal@gmail.com',
    phone: '+91 98765 43210',
    alternatePhone: '+91 87654 32109',
    dateOfBirth: '2004-02-15',
    gender: 'Male',
    bloodGroup: 'B+',
    nationality: 'Indian',
    religion: 'Hindu',
    category: 'General',
    aadharNumber: '1234 5678 9012',
    panNumber: 'ABCDE1234F',
    currentAddress: {
      street: '123 Student Hostel, Block A',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    permanentAddress: {
      street: '456 Main Street, Sector 15',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      country: 'India'
    },
    academicInfo: {
      department: 'Computer Science Engineering',
      course: 'Bachelor of Technology',
      semester: 5,
      section: 'A',
      batch: '2022-2026',
      admissionDate: '2022-08-15',
      expectedGraduation: '2026-06-30',
      currentCGPA: 8.45,
      totalCredits: 120
    },
    parentInfo: {
      fatherName: 'Rajesh Kumar',
      fatherOccupation: 'Software Engineer',
      fatherPhone: '+91 99887 76655',
      motherName: 'Priya Kumar',
      motherOccupation: 'Teacher',
      motherPhone: '+91 88776 65544',
      annualIncome: '₹8,00,000'
    },
    emergencyContact: {
      name: 'Rajesh Kumar',
      relation: 'Father',
      phone: '+91 99887 76655',
      email: 'rajesh.kumar@email.com',
      address: '456 Main Street, Sector 15, Delhi, 110001'
    },
    bankDetails: {
      accountNumber: '1234567890123456',
      bankName: 'State Bank of India',
      branchName: 'Delhi Main Branch',
      ifscCode: 'SBIN0001234'
    },
    documents: {
      admissionLetter: true,
      tenthMarksheet: true,
      twelfthMarksheet: true,
      transferCertificate: true,
      characterCertificate: true,
      categoryProof: false,
      aadharCard: true,
      photos: true
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(studentInfo);
  const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'family' | 'documents' | 'settings'>('personal');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleInputChange = (section: keyof StudentInfo, field: string, value: any) => {
    setEditForm(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' && prev[section] !== null
        ? { ...prev[section], [field]: value }
        : value
    }));
  };

  const handleSave = () => {
    setStudentInfo(editForm);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditForm(studentInfo);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    
    alert('Password changed successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowChangePassword(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditForm(prev => ({ ...prev, profileImage: imageUrl }));
    }
  };

  const downloadDocument = (docType: string) => {
    alert(`Downloading ${docType}...`);
  };

  const uploadDocument = (docType: string) => {
    alert(`Upload ${docType} functionality would open file picker`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={isEditing ? editForm.profileImage : studentInfo.profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-600"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {studentInfo.firstName} {studentInfo.lastName}
              </h1>
              <div className="text-gray-600">
                <p>{studentInfo.rollNumber} • {studentInfo.registrationNumber}</p>
                <p>{studentInfo.academicInfo.department} • Semester {studentInfo.academicInfo.semester}</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'personal', label: 'Personal Info', icon: <User className="w-4 h-4" /> },
            { id: 'academic', label: 'Academic Details', icon: <GraduationCap className="w-4 h-4" /> },
            { id: 'family', label: 'Family & Emergency', icon: <Heart className="w-4 h-4" /> },
            { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
            { id: 'settings', label: 'Account Settings', icon: <Settings className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Basic Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.firstName}
                        onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{studentInfo.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.lastName}
                        onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{studentInfo.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editForm.dateOfBirth}
                        onChange={(e) => setEditForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{new Date(studentInfo.dateOfBirth).toLocaleDateString()}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    {isEditing ? (
                      <select
                        value={editForm.gender}
                        onChange={(e) => setEditForm(prev => ({ ...prev, gender: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{studentInfo.gender}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.bloodGroup}
                        onChange={(e) => setEditForm(prev => ({ ...prev, bloodGroup: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{studentInfo.bloodGroup}</p>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Contact Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">College Email</label>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      {studentInfo.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Personal Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.personalEmail || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, personalEmail: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {studentInfo.personalEmail || 'Not provided'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {studentInfo.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.alternatePhone || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, alternatePhone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {studentInfo.alternatePhone || 'Not provided'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Current Address</h3>
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={editForm.currentAddress.street}
                        onChange={(e) => handleInputChange('currentAddress', 'street', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="City"
                          value={editForm.currentAddress.city}
                          onChange={(e) => handleInputChange('currentAddress', 'city', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={editForm.currentAddress.state}
                          onChange={(e) => handleInputChange('currentAddress', 'state', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Pincode"
                          value={editForm.currentAddress.pincode}
                          onChange={(e) => handleInputChange('currentAddress', 'pincode', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Country"
                          value={editForm.currentAddress.country}
                          onChange={(e) => handleInputChange('currentAddress', 'country', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-900 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                      <div>
                        <p>{studentInfo.currentAddress.street}</p>
                        <p>{studentInfo.currentAddress.city}, {studentInfo.currentAddress.state}</p>
                        <p>{studentInfo.currentAddress.pincode}, {studentInfo.currentAddress.country}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Permanent Address</h3>
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={editForm.permanentAddress.street}
                        onChange={(e) => handleInputChange('permanentAddress', 'street', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="City"
                          value={editForm.permanentAddress.city}
                          onChange={(e) => handleInputChange('permanentAddress', 'city', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={editForm.permanentAddress.state}
                          onChange={(e) => handleInputChange('permanentAddress', 'state', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Pincode"
                          value={editForm.permanentAddress.pincode}
                          onChange={(e) => handleInputChange('permanentAddress', 'pincode', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Country"
                          value={editForm.permanentAddress.country}
                          onChange={(e) => handleInputChange('permanentAddress', 'country', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-900 flex items-start gap-2">
                      <Home className="w-4 h-4 text-gray-500 mt-1" />
                      <div>
                        <p>{studentInfo.permanentAddress.street}</p>
                        <p>{studentInfo.permanentAddress.city}, {studentInfo.permanentAddress.state}</p>
                        <p>{studentInfo.permanentAddress.pincode}, {studentInfo.permanentAddress.country}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Academic Details Tab */}
          {activeTab === 'academic' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Academic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Current Academic Status</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                      <p className="text-gray-900 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-gray-500" />
                        {studentInfo.academicInfo.course}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <p className="text-gray-900 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        {studentInfo.academicInfo.department}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                        <p className="text-gray-900">{studentInfo.academicInfo.semester}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                        <p className="text-gray-900">{studentInfo.academicInfo.section}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
                      <p className="text-gray-900">{studentInfo.academicInfo.batch}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Academic Performance</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current CGPA</label>
                      <p className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                        <Award className="w-6 h-6" />
                        {studentInfo.academicInfo.currentCGPA}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Credits Earned</label>
                      <p className="text-gray-900">{studentInfo.academicInfo.totalCredits}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Admission Date</label>
                      <p className="text-gray-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {new Date(studentInfo.academicInfo.admissionDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expected Graduation</label>
                      <p className="text-gray-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {new Date(studentInfo.academicInfo.expectedGraduation).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student ID Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Student Identification</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Roll Number</label>
                    <p className="font-mono text-blue-900">{studentInfo.rollNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Registration Number</label>
                    <p className="font-mono text-blue-900">{studentInfo.registrationNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Aadhar Number</label>
                    <p className="font-mono text-blue-900">{studentInfo.aadharNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Family & Emergency Tab */}
          {activeTab === 'family' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Family & Emergency Contacts</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Parent Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Parent Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.parentInfo.fatherName}
                          onChange={(e) => handleInputChange('parentInfo', 'fatherName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{studentInfo.parentInfo.fatherName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Father's Occupation</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.parentInfo.fatherOccupation}
                          onChange={(e) => handleInputChange('parentInfo', 'fatherOccupation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gray-500" />
                          {studentInfo.parentInfo.fatherOccupation}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Father's Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editForm.parentInfo.fatherPhone}
                          onChange={(e) => handleInputChange('parentInfo', 'fatherPhone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          {studentInfo.parentInfo.fatherPhone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.parentInfo.motherName}
                          onChange={(e) => handleInputChange('parentInfo', 'motherName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{studentInfo.parentInfo.motherName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Occupation</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.parentInfo.motherOccupation}
                          onChange={(e) => handleInputChange('parentInfo', 'motherOccupation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gray-500" />
                          {studentInfo.parentInfo.motherOccupation}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editForm.parentInfo.motherPhone}
                          onChange={(e) => handleInputChange('parentInfo', 'motherPhone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          {studentInfo.parentInfo.motherPhone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Annual Family Income</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.parentInfo.annualIncome}
                          onChange={(e) => handleInputChange('parentInfo', 'annualIncome', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{studentInfo.parentInfo.annualIncome}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Emergency Contact</h3>
                  
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-red-700 mb-1">Contact Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.emergencyContact.name}
                            onChange={(e) => handleInputChange('emergencyContact', 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-red-900 font-medium">{studentInfo.emergencyContact.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-red-700 mb-1">Relationship</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.emergencyContact.relation}
                            onChange={(e) => handleInputChange('emergencyContact', 'relation', e.target.value)}
                            className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-red-900">{studentInfo.emergencyContact.relation}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-red-700 mb-1">Phone Number</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editForm.emergencyContact.phone}
                            onChange={(e) => handleInputChange('emergencyContact', 'phone', e.target.value)}
                            className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-red-900 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {studentInfo.emergencyContact.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-red-700 mb-1">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editForm.emergencyContact.email || ''}
                            onChange={(e) => handleInputChange('emergencyContact', 'email', e.target.value)}
                            className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-red-900 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {studentInfo.emergencyContact.email || 'Not provided'}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-red-700 mb-1">Address</label>
                        {isEditing ? (
                          <textarea
                            value={editForm.emergencyContact.address}
                            onChange={(e) => handleInputChange('emergencyContact', 'address', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-red-900 flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-1" />
                            {studentInfo.emergencyContact.address}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Documents & Certificates</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(studentInfo.documents).map(([docKey, isUploaded]) => (
                  <div key={docKey} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-gray-500" />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {docKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </h3>
                          <p className={`text-sm ${isUploaded ? 'text-green-600' : 'text-red-600'}`}>
                            {isUploaded ? 'Uploaded' : 'Not Uploaded'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {isUploaded ? (
                          <button
                            onClick={() => downloadDocument(docKey)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            Download
                          </button>
                        ) : (
                          <button
                            onClick={() => uploadDocument(docKey)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                          >
                            <Upload className="w-3 h-3" />
                            Upload
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bank Details */}
              {studentInfo.bankDetails && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Bank Account Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-1">Account Number</label>
                      <p className="font-mono text-green-900">{studentInfo.bankDetails.accountNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-1">Bank Name</label>
                      <p className="text-green-900">{studentInfo.bankDetails.bankName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-1">Branch</label>
                      <p className="text-green-900">{studentInfo.bankDetails.branchName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-1">IFSC Code</label>
                      <p className="font-mono text-green-900">{studentInfo.bankDetails.ifscCode}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password Management */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Security</h3>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">Password</span>
                      </div>
                      <button
                        onClick={() => setShowChangePassword(!showChangePassword)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Change Password
                      </button>
                    </div>
                    
                    {showChangePassword && (
                      <div className="space-y-3">
                        <div className="relative">
                          <input
                            type={showPasswords.current ? 'text' : 'password'}
                            placeholder="Current Password"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                          >
                            {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        
                        <div className="relative">
                          <input
                            type={showPasswords.new ? 'text' : 'password'}
                            placeholder="New Password"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                          >
                            {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        
                        <div className="relative">
                          <input
                            type={showPasswords.confirm ? 'text' : 'password'}
                            placeholder="Confirm New Password"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                          >
                            {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={handlePasswordChange}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                          >
                            Update Password
                          </button>
                          <button
                            onClick={() => setShowChangePassword(false)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notification Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Preferences</h3>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-900">Email Notifications</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Phone className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-900">SMS Notifications</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Actions</h3>
                <div className="flex gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                    Download Profile Data
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
                    Deactivate Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
