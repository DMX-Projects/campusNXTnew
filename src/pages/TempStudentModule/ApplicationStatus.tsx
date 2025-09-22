import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Award, 
  FileText, 
  Download, 
  CheckCircle,
  ArrowLeft,
  Users,
  BookOpen,
  Star
} from 'lucide-react';

const ApplicationStatus = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Sample student data - in real app this would come from API
  const studentData = {
    personalDetails: {
      name: "Alex Johnson",
      photo: "/api/placeholder/150/150", // Placeholder for student photo
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "March 15, 2005",
      address: "123 Main Street, Springfield, IL 62701",
      nationality: "American",
      emergencyContact: "+1 (555) 987-6543"
    },
    parentDetails: {
      fatherName: "Robert Johnson",
      fatherOccupation: "Software Engineer",
      fatherPhone: "+1 (555) 111-2222",
      motherName: "Sarah Johnson",
      motherOccupation: "Teacher",
      motherPhone: "+1 (555) 333-4444",
      guardianEmail: "parents.johnson@email.com"
    },
    academicDetails: {
      highSchool: "Springfield High School",
      graduationYear: "2023",
      gpa: "3.8/4.0",
      satScore: "1450/1600",
      subjects: [
        { name: "Mathematics", grade: "A" },
        { name: "Physics", grade: "A-" },
        { name: "Chemistry", grade: "B+" },
        { name: "English", grade: "A" },
        { name: "Computer Science", grade: "A+" }
      ],
      extracurriculars: [
        "Debate Team Captain",
        "Math Olympiad - State Level",
        "Volunteer at Local Library"
      ]
    },
    courseAllotted: {
      program: "Bachelor of Science in Computer Science",
      department: "Computer Science & Engineering",
      duration: "4 Years",
      specialization: "Artificial Intelligence",
      campusLocation: "Main Campus",
      startDate: "August 15, 2024",
      studentId: "CS2024001234"
    },
    applicationDetails: {
      applicationId: "APP-2024-CS-001234",
      submissionDate: "January 15, 2024",
      status: "Accepted",
      lastUpdated: "February 10, 2024"
    }
  };

  const InfoCard = ({ title, children, icon: Icon }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>
      {children}
    </div>
  );

  const InfoRow = ({ label, value, fullWidth = false }) => (
    <div className={`${fullWidth ? 'col-span-2' : ''}`}>
      <dt className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</dt>
      <dd className="text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg">
        {value || 'N/A'}
      </dd>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-8xl mx-auto">
        {/* Application Status Banner */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              <div>
                <h2 className="text-xl font-bold text-green-900 dark:text-green-100">
                  Application Accepted
                </h2>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Application ID: {studentData.applicationDetails.applicationId}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-600 dark:text-green-400">Submitted</p>
              <p className="font-semibold text-green-900 dark:text-green-100">
                {studentData.applicationDetails.submissionDate}
              </p>
            </div>
          </div>
        </div>

        {/* Course Allotted - Prominent Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Course Allotted</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <InfoRow label="Program" value={studentData.courseAllotted.program} fullWidth />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoRow label="Department" value={studentData.courseAllotted.department} />
                <InfoRow label="Duration" value={studentData.courseAllotted.duration} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoRow label="Specialization" value={studentData.courseAllotted.specialization} />
                <InfoRow label="Campus" value={studentData.courseAllotted.campusLocation} />
              </div>
            </div>
            <div className="space-y-4">
              <InfoRow label="Student ID" value={studentData.courseAllotted.studentId} />
              <InfoRow label="Start Date" value={studentData.courseAllotted.startDate} />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Student Photo and Basic Info */}
          <div className="lg:col-span-1">
            <InfoCard title="Student Profile" icon={User}>
              <div className="text-center mb-4">
                <img
                  src={studentData.personalDetails.photo}
                  alt="Student Photo"
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-slate-200 dark:border-slate-600"
                />
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {studentData.personalDetails.name}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {studentData.courseAllotted.studentId}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-900 dark:text-white">{studentData.personalDetails.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-900 dark:text-white">{studentData.personalDetails.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-900 dark:text-white">{studentData.personalDetails.dateOfBirth}</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-slate-500 mt-0.5" />
                  <span className="text-slate-900 dark:text-white">{studentData.personalDetails.address}</span>
                </div>
              </div>
            </InfoCard>
          </div>

          {/* Personal Details */}
          <div className="lg:col-span-2">
            <InfoCard title="Personal Information" icon={FileText}>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoRow label="Full Name" value={studentData.personalDetails.name} />
                <InfoRow label="Date of Birth" value={studentData.personalDetails.dateOfBirth} />
                <InfoRow label="Nationality" value={studentData.personalDetails.nationality} />
                <InfoRow label="Emergency Contact" value={studentData.personalDetails.emergencyContact} />
                <InfoRow label="Address" value={studentData.personalDetails.address} fullWidth />
              </dl>
            </InfoCard>
          </div>
        </div>

        {/* Parent/Guardian Details */}
        <div className="mb-6">
          <InfoCard title="Parent/Guardian Information" icon={Users}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-3">Father's Details</h4>
                <dl className="space-y-3">
                  <InfoRow label="Name" value={studentData.parentDetails.fatherName} />
                  <InfoRow label="Occupation" value={studentData.parentDetails.fatherOccupation} />
                  <InfoRow label="Phone" value={studentData.parentDetails.fatherPhone} />
                </dl>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-3">Mother's Details</h4>
                <dl className="space-y-3">
                  <InfoRow label="Name" value={studentData.parentDetails.motherName} />
                  <InfoRow label="Occupation" value={studentData.parentDetails.motherOccupation} />
                  <InfoRow label="Phone" value={studentData.parentDetails.motherPhone} />
                </dl>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <InfoRow label="Guardian Email" value={studentData.parentDetails.guardianEmail} />
            </div>
          </InfoCard>
        </div>

        {/* Academic Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InfoCard title="Academic Information" icon={BookOpen}>
            <dl className="space-y-4">
              <InfoRow label="High School" value={studentData.academicDetails.highSchool} />
              <InfoRow label="Graduation Year" value={studentData.academicDetails.graduationYear} />
              <InfoRow label="GPA" value={studentData.academicDetails.gpa} />
              <InfoRow label="SAT Score" value={studentData.academicDetails.satScore} />
            </dl>

            <div className="mt-6">
              <h4 className="font-medium text-slate-900 dark:text-white mb-3">Subject Grades</h4>
              <div className="space-y-2">
                {studentData.academicDetails.subjects.map((subject, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <span className="text-sm text-slate-900 dark:text-white">{subject.name}</span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{subject.grade}</span>
                  </div>
                ))}
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Extracurricular Activities" icon={Star}>
            <div className="space-y-3">
              {studentData.academicDetails.extracurriculars.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-sm text-slate-900 dark:text-white">{activity}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h4 className="font-medium text-slate-900 dark:text-white mb-3">Application Summary</h4>
              <dl className="space-y-3">
                <InfoRow label="Last Updated" value={studentData.applicationDetails.lastUpdated} />
                <InfoRow label="Status" value={studentData.applicationDetails.status} />
              </dl>
            </div>
          </InfoCard>
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
            This is a read-only view of your submitted application. If you notice any discrepancies, 
            please contact the admissions office immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;