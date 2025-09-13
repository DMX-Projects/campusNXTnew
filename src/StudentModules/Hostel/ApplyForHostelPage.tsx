import React, { useState } from 'react';
import { 
  Home, User, MapPin, Calendar, FileText, CheckCircle, 
  AlertCircle, Building2, BedDouble, Users, Clock, 
  Phone, Mail, GraduationCap, DollarSign, Info
} from 'lucide-react';

interface HostelApplication {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  branch: string;
  semester: number;
  preferredBlock: string;
  preferredRoomType: string;
  reason: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Processing';
  priority: 'Low' | 'Medium' | 'High';
  remarks?: string;
}

interface Hostel {
  id: string;
  name: string;
  block: string;
  capacity: number;
  occupied: number;
  gender: string;
  amenities: string[];
  rules: string[];
}

const ApplyForHostelPage: React.FC = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    preferredBlock: '',
    preferredRoomType: '',
    reason: '',
    emergencyContact: '',
    bloodGroup: '',
    medicalConditions: '',
    specialRequirements: ''
  });

  // Sample data - would come from API in real application
  const currentStudent = {
    id: 'CS2023004',
    name: 'Vikram Singh',
    rollNumber: '2023ME001',
    branch: 'Mechanical Engineering',
    semester: 2,
    phoneNumber: '+91-9876543240',
    email: 'vikram.singh@college.edu.in',
    emergencyContact: '+91-9876543241',
    bloodGroup: 'AB+',
    hometown: 'Pune, Maharashtra'
  };

  const hostels: Hostel[] = [
    {
      id: 'H001',
      name: 'Boys Hostel A',
      block: 'A Block',
      capacity: 160,
      occupied: 145,
      gender: 'Male',
      amenities: ['Wi-Fi', 'AC', 'Laundry', 'Gym', 'Common Room'],
      rules: ['No smoking', 'Curfew 10 PM', 'Visitor registration required']
    },
    {
      id: 'H002',
      name: 'Girls Hostel A',
      block: 'B Block',
      capacity: 120,
      occupied: 98,
      gender: 'Female',
      amenities: ['Wi-Fi', 'AC', 'Laundry', 'Study Room', 'Common Room'],
      rules: ['No smoking', 'Curfew 9 PM', 'Visitor registration required']
    },
    {
      id: 'H003',
      name: 'Boys Hostel B',
      block: 'C Block',
      capacity: 200,
      occupied: 180,
      gender: 'Male',
      amenities: ['Wi-Fi', 'Non-AC', 'Laundry', 'Gym', 'Common Room'],
      rules: ['No smoking', 'Curfew 10 PM', 'Visitor registration required']
    }
  ];

  const roomTypes = [
    { type: 'Single AC', price: 7500, description: 'Single occupancy with AC' },
    { type: 'Single Non-AC', price: 5500, description: 'Single occupancy without AC' },
    { type: 'Double AC', price: 5500, description: 'Double occupancy with AC' },
    { type: 'Double Non-AC', price: 4000, description: 'Double occupancy without AC' },
    { type: 'Triple', price: 3500, description: 'Triple occupancy' }
  ];

  const existingApplications: HostelApplication[] = [
    {
      id: 'APP001',
      studentId: 'CS2023004',
      studentName: 'Vikram Singh',
      rollNumber: '2023ME001',
      branch: 'Mechanical Engineering',
      semester: 2,
      preferredBlock: 'A Block',
      preferredRoomType: 'Double AC',
      reason: 'Need accommodation for academic year 2024-25',
      submittedDate: '2025-01-10',
      status: 'Pending',
      priority: 'High',
      remarks: 'Under review by hostel administration'
    }
  ];

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Hostel application submitted:', applicationForm);
    alert('Hostel application submitted successfully! You will be notified about the status.');
    setShowApplicationForm(false);
    setApplicationForm({
      preferredBlock: '',
      preferredRoomType: '',
      reason: '',
      emergencyContact: '',
      bloodGroup: '',
      medicalConditions: '',
      specialRequirements: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Home className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Hostel Application</h1>
                <p className="text-gray-600">Apply for hostel accommodation and manage your applications</p>
              </div>
            </div>
            <button
              onClick={() => setShowApplicationForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              New Application
            </button>
          </div>
        </div>

        {/* Student Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Student Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{currentStudent.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Roll Number</p>
                <p className="font-medium">{currentStudent.rollNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Branch</p>
                <p className="font-medium">{currentStudent.branch}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Semester</p>
                <p className="font-medium">{currentStudent.semester}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{currentStudent.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{currentStudent.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hostel Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Available Hostels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostels.map((hostel) => (
              <div key={hostel.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{hostel.name}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {hostel.block}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Occupancy: {hostel.occupied}/{hostel.capacity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Gender: {hostel.gender}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-1">
                    {hostel.amenities.map((amenity, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Rules</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {hostel.rules.map((rule, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room Types */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Room Types & Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomTypes.map((room, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{room.type}</h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">₹{room.price}</p>
                    <p className="text-xs text-gray-500">per month</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{room.description}</p>
                <div className="flex items-center gap-2">
                  <BedDouble className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {room.type.includes('Single') ? '1' : room.type.includes('Double') ? '2' : '3'} Occupant
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Applications */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Applications</h2>
          
          {existingApplications.length > 0 ? (
            <div className="space-y-4">
              {existingApplications.map((application) => (
                <div key={application.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Application #{application.id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(application.priority)}`}>
                        {application.priority} Priority
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Submitted: {new Date(application.submittedDate).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Preferences</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Block: {application.preferredBlock}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BedDouble className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Room Type: {application.preferredRoomType}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Reason</h4>
                      <p className="text-sm text-gray-600">{application.reason}</p>
                    </div>
                  </div>

                  {application.remarks && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Admin Remarks:</strong> {application.remarks}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Applications Found</h3>
              <p className="text-gray-500">You haven't submitted any hostel applications yet</p>
            </div>
          )}
        </div>

        {/* Application Form Modal */}
        {showApplicationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">New Hostel Application</h3>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <AlertCircle className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Block <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={applicationForm.preferredBlock}
                      onChange={(e) => setApplicationForm({...applicationForm, preferredBlock: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Block</option>
                      <option value="A Block">A Block (Boys)</option>
                      <option value="B Block">B Block (Girls)</option>
                      <option value="C Block">C Block (Boys)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Room Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={applicationForm.preferredRoomType}
                      onChange={(e) => setApplicationForm({...applicationForm, preferredRoomType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Room Type</option>
                      <option value="Single AC">Single AC (₹7,500/month)</option>
                      <option value="Single Non-AC">Single Non-AC (₹5,500/month)</option>
                      <option value="Double AC">Double AC (₹5,500/month)</option>
                      <option value="Double Non-AC">Double Non-AC (₹4,000/month)</option>
                      <option value="Triple">Triple (₹3,500/month)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Hostel Accommodation <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={applicationForm.reason}
                    onChange={(e) => setApplicationForm({...applicationForm, reason: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Please explain why you need hostel accommodation..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={applicationForm.emergencyContact}
                      onChange={(e) => setApplicationForm({...applicationForm, emergencyContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="+91-9876543210"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Group <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={applicationForm.bloodGroup}
                      onChange={(e) => setApplicationForm({...applicationForm, bloodGroup: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Conditions (if any)
                  </label>
                  <textarea
                    value={applicationForm.medicalConditions}
                    onChange={(e) => setApplicationForm({...applicationForm, medicalConditions: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Please mention any medical conditions or allergies..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requirements
                  </label>
                  <textarea
                    value={applicationForm.specialRequirements}
                    onChange={(e) => setApplicationForm({...applicationForm, specialRequirements: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Any special requirements or preferences..."
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Important Information</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Applications are processed on a first-come, first-served basis</li>
                        <li>• You will be notified via email about the application status</li>
                        <li>• Security deposit and first month's rent must be paid upon approval</li>
                        <li>• Hostel rules and regulations must be followed strictly</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyForHostelPage;