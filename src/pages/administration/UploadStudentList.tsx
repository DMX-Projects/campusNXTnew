import React, { useState, ChangeEvent, useRef } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Edit, 
  User, 
  Plus,
  X,
  Save,
  ArrowLeft,
  ArrowRight,
  FileText,
  Users,
  School,
  Home,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  GraduationCap,
  UserCheck,
  Building,
  CreditCard,
  Eye,
  Trash2
} from 'lucide-react';

import { Student, FormData, Tab, ViewType, TabType, EducationRecord, FilterOptions } from '../types/student';
import { generateStudentTemplate, parseCSV, convertCSVToStudents, convertToCSV, downloadCSV } from './utils/excelUtils';
import NotificationSystem from './NotificationSystem';
import FilterModal from './FilterModal';

const StudentManagementSystem: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [showProgramModal, setShowProgramModal] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notification state
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    isVisible: boolean;
  }>({
    type: 'info',
    message: '',
    isVisible: false
  });

  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    program: '',
    gender: '',
    status: '',
    caste: ''
  });

  const showNotification = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    setNotification({ type, message, isVisible: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };
  
  const [formData, setFormData] = useState<FormData>({
    // Basic Details
    studentName: '',
    rollNumber: '',
    admissionNumber: '',
    program: '',
    batch: '',
    academicYear: '',
    studentId: '',
    registrationNumber: '',
    
    // Course Details
    course: '',
    branch: '',
    semester: '',
    section: '',
    specialization: '',
    courseDuration: '',
    
    // Correspondence Address
    corrAddress: '',
    corrCity: '',
    corrState: '',
    corrPincode: '',
    corrCountry: 'India',
    corrLandmark: '',
    
    // Permanent Address
    permAddress: '',
    permCity: '',
    permState: '',
    permPincode: '',
    permCountry: 'India',
    permLandmark: '',
    sameAsCorrespondence: false,
    
    // Personal Details
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    nationality: 'Indian',
    religion: '',
    caste: '',
    category: '',
    aadharNumber: '',
    panNumber: '',
    passportNumber: '',
    maritalStatus: 'Single',
    phoneNumber: '',
    alternatePhone: '',
    email: '',
    alternateEmail: '',
    
    // Father Details
    fatherName: '',
    fatherOccupation: '',
    fatherPhone: '',
    fatherEmail: '',
    fatherIncome: '',
    fatherEducation: '',
    fatherOrganization: '',
    
    // Mother Details
    motherName: '',
    motherOccupation: '',
    motherPhone: '',
    motherEmail: '',
    motherIncome: '',
    motherEducation: '',
    motherOrganization: '',
    
    // Guardian Details
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianAddress: '',
    guardianOccupation: '',
    isGuardianRequired: false,
    
    // Previous Year
    previousSchool: '',
    previousBoard: '',
    previousPercentage: '',
    previousYear: '',
    previousGrade: '',
    previousRollNumber: '',
    tcNumber: '',
    migrationNumber: '',
    
    // Educational Information
    educationRecords: []
  });

  // Static sample data for display
  const sampleStudents: Student[] = [
    {
      id: 1,
      name: 'SHINDE SHIVANJALI VINOD',
      mobile: '8390641919',
      email: 'divyasainemmani@gmail.com',
      gender: 'Female',
      caste: 'OPEN',
      status: 'CAP',
      program: 'XII Science',
      rollNumber: 'SC001'
    },
    {
      id: 2,
      name: 'SAYYAD UZMA ARIF',
      mobile: '9175857755',
      email: 'r.srirampur@gmail.com',
      gender: 'Male',
      caste: 'SC',
      status: 'CAP',
      program: 'XI Arts',
      rollNumber: 'AR002'
    },
    {
      id: 3,
      name: 'RAGHUVARAN K',
      mobile: '9876543210',
      email: 'raghuvarank@pragmatiqinc.com',
      gender: 'Male',
      caste: 'OPEN',
      status: 'CAP',
      program: 'XII Arts',
      rollNumber: 'AR003'
    },
    {
      id: 4,
      name: 'PRIYA SHARMA',
      mobile: '8765432109',
      email: 'priya.sharma@email.com',
      gender: 'Female',
      caste: 'OPEN',
      status: 'MANAGEMENT',
      program: 'XI Science',
      rollNumber: 'SC004'
    },
    {
      id: 5,
      name: 'AMIT PATEL',
      mobile: '7654321098',
      email: 'amit.patel@email.com',
      gender: 'Male',
      caste: 'OBC',
      status: 'CAP',
      program: 'XII Science',
      rollNumber: 'SC005'
    }
  ];

  // Initialize students with sample data and apply filters
  React.useEffect(() => {
    if (students.length === 0) {
      setStudents(sampleStudents);
      setFilteredStudents(sampleStudents);
    }
  }, []);

  // Filter and search logic
  React.useEffect(() => {
    let filtered = students;

    // Apply search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.mobile.includes(searchQuery)
      );
    }

    // Apply filters
    if (filters.program) {
      filtered = filtered.filter(student => student.program === filters.program);
    }
    if (filters.gender) {
      filtered = filtered.filter(student => student.gender === filters.gender);
    }
    if (filters.status) {
      filtered = filtered.filter(student => student.status === filters.status);
    }
    if (filters.caste) {
      filtered = filtered.filter(student => student.caste === filters.caste);
    }

    setFilteredStudents(filtered);
  }, [students, searchQuery, filters]);

  const programs: string[] = ['XI Arts', 'XI Science', 'XII Arts', 'XII Science'];
  const states: string[] = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];
  const bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const categories: string[] = ['General', 'OBC', 'SC', 'ST', 'EWS'];
  const religions: string[] = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'];
  const occupations: string[] = ['Government Employee', 'Private Employee', 'Business', 'Farmer', 'Doctor', 'Engineer', 'Teacher', 'Lawyer', 'Self Employed', 'Unemployed', 'Other'];
  const educationLevels: string[] = ['Below 10th', '10th Pass', '12th Pass', 'Graduate', 'Post Graduate', 'PhD', 'Other'];

  const tabs: Tab[] = [
    { id: 'basic', label: 'Basic Details', icon: User },
    { id: 'course', label: 'Course Details', icon: BookOpen },
    { id: 'correspondence', label: 'Correspondence Address', icon: Mail },
    { id: 'permanent', label: 'Permanent Address', icon: Home },
    { id: 'personal', label: 'Personal Details', icon: UserCheck },
    { id: 'father', label: 'Father Details', icon: User },
    { id: 'mother', label: 'Mother Details', icon: User },
    { id: 'guardian', label: 'Guardian Details', icon: Users },
    { id: 'previous', label: 'Previous Year', icon: Calendar },
    { id: 'educational', label: 'Educational Information', icon: GraduationCap }
  ];

  // Excel Upload/Download Functions
  const handleDownloadTemplate = (): void => {
    try {
      generateStudentTemplate();
      showNotification('success', 'Template downloaded successfully!');
    } catch (error) {
      console.error('Error downloading template:', error);
      showNotification('error', 'Error downloading template. Please try again.');
    }
  };

  const handleUploadClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      showNotification('error', 'Please upload a CSV or Excel file.');
      return;
    }

    setIsUploading(true);

    try {
      const text = await file.text();
      const parsedData = parseCSV(text);
      
      if (parsedData.length === 0) {
        showNotification('warning', 'No valid data found in the uploaded file.');
        setIsUploading(false);
        return;
      }

      const newStudents = convertCSVToStudents(parsedData);
      
      if (newStudents.length === 0) {
        showNotification('warning', 'No valid student records found in the uploaded file.');
        setIsUploading(false);
        return;
      }

      // Add new students to existing list
      setStudents(prevStudents => {
        const existingIds = new Set(prevStudents.map(s => s.rollNumber));
        const uniqueNewStudents = newStudents.filter(s => !existingIds.has(s.rollNumber));
        return [...prevStudents, ...uniqueNewStudents];
      });

      showNotification('success', `Successfully uploaded ${newStudents.length} student records!`);
    } catch (error) {
      console.error('Error uploading file:', error);
      showNotification('error', 'Error processing the uploaded file. Please check the file format and try again.');
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleExportStudents = (): void => {
    try {
      if (students.length === 0) {
        showNotification('warning', 'No student data to export.');
        return;
      }

      const exportData = students.map(student => ({
        'Student Name': student.name,
        'Roll Number': student.rollNumber,
        'Mobile': student.mobile,
        'Email': student.email,
        'Gender': student.gender,
        'Caste': student.caste,
        'Status': student.status,
        'Program': student.program
      }));

      const csvContent = convertToCSV(exportData);
      downloadCSV(csvContent, `students_export_${new Date().toISOString().split('T')[0]}.csv`);
      showNotification('success', 'Student data exported successfully!');
    } catch (error) {
      console.error('Error exporting students:', error);
      showNotification('error', 'Error exporting student data. Please try again.');
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    setShowFilterModal(false);
    showNotification('info', 'Filters applied successfully');
  };

  const handleClearFilters = () => {
    setFilters({
      program: '',
      gender: '',
      status: '',
      caste: ''
    });
    setSearchQuery('');
    showNotification('info', 'Filters cleared');
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSameAsCorrespondence = (): void => {
    const newValue = !formData.sameAsCorrespondence;
    if (newValue) {
      setFormData(prev => ({
        ...prev,
        sameAsCorrespondence: newValue,
        permAddress: prev.corrAddress,
        permCity: prev.corrCity,
        permState: prev.corrState,
        permPincode: prev.corrPincode,
        permCountry: prev.corrCountry,
        permLandmark: prev.corrLandmark
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        sameAsCorrespondence: newValue
      }));
    }
  };

  const addEducationRecord = (): void => {
    const newRecord: EducationRecord = {
      id: Date.now(),
      instituteName: '',
      boardUni: '',
      year: '',
      month: '',
      obtained: '',
      maximum: '',
      percentage: '',
      grade: '',
      attempt: '1'
    };
    setFormData(prev => ({
      ...prev,
      educationRecords: [...prev.educationRecords, newRecord]
    }));
  };

  const updateEducationRecord = (id: number, field: keyof EducationRecord, value: string): void => {
    setFormData(prev => ({
      ...prev,
      educationRecords: prev.educationRecords.map(record =>
        record.id === id ? { ...record, [field]: value } : record
      )
    }));
  };

  const removeEducationRecord = (id: number): void => {
    setFormData(prev => ({
      ...prev,
      educationRecords: prev.educationRecords.filter(record => record.id !== id)
    }));
  };

  const resetForm = (): void => {
    setFormData({
      // Basic Details
      studentName: '',
      rollNumber: '',
      admissionNumber: '',
      program: '',
      batch: '',
      academicYear: '',
      studentId: '',
      registrationNumber: '',
      
      // Course Details
      course: '',
      branch: '',
      semester: '',
      section: '',
      specialization: '',
      courseDuration: '',
      
      // Correspondence Address
      corrAddress: '',
      corrCity: '',
      corrState: '',
      corrPincode: '',
      corrCountry: 'India',
      corrLandmark: '',
      
      // Permanent Address
      permAddress: '',
      permCity: '',
      permState: '',
      permPincode: '',
      permCountry: 'India',
      permLandmark: '',
      sameAsCorrespondence: false,
      
      // Personal Details
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      nationality: 'Indian',
      religion: '',
      caste: '',
      category: '',
      aadharNumber: '',
      panNumber: '',
      passportNumber: '',
      maritalStatus: 'Single',
      phoneNumber: '',
      alternatePhone: '',
      email: '',
      alternateEmail: '',
      
      // Father Details
      fatherName: '',
      fatherOccupation: '',
      fatherPhone: '',
      fatherEmail: '',
      fatherIncome: '',
      fatherEducation: '',
      fatherOrganization: '',
      
      // Mother Details
      motherName: '',
      motherOccupation: '',
      motherPhone: '',
      motherEmail: '',
      motherIncome: '',
      motherEducation: '',
      motherOrganization: '',
      
      // Guardian Details
      guardianName: '',
      guardianRelation: '',
      guardianPhone: '',
      guardianEmail: '',
      guardianAddress: '',
      guardianOccupation: '',
      isGuardianRequired: false,
      
      // Previous Year
      previousSchool: '',
      previousBoard: '',
      previousPercentage: '',
      previousYear: '',
      previousGrade: '',
      previousRollNumber: '',
      tcNumber: '',
      migrationNumber: '',
      
      // Educational Information
      educationRecords: []
    });
  };

  const saveStudent = (): void => {
    try {
      // Validate required fields
      if (!formData.studentName || !formData.rollNumber || !formData.program) {
        showNotification('error', 'Please fill in all required fields (Student Name, Roll Number, and Program).');
        return;
      }

      const newStudent: Student = {
        id: selectedStudent ? selectedStudent.id : Date.now(),
        name: formData.studentName,
        mobile: formData.phoneNumber,
        email: formData.email,
        gender: formData.gender,
        caste: formData.caste || 'OPEN',
        status: 'CAP', // Default status
        program: formData.program,
        rollNumber: formData.rollNumber
      };

      if (selectedStudent) {
        // Update existing student
        setStudents(prev => prev.map(student => 
          student.id === selectedStudent.id ? newStudent : student
        ));
        showNotification('success', 'Student updated successfully!');
      } else {
        // Add new student
        setStudents(prev => [...prev, newStudent]);
        showNotification('success', 'Student added successfully!');
      }

      // Reset form and go back to list view
      resetForm();
      setSelectedStudent(null);
      setCurrentView('list');
    } catch (error) {
      console.error('Error saving student:', error);
      showNotification('error', 'Error saving student data. Please try again.');
    }
  };

  const editStudent = (student: Student): void => {
    setSelectedStudent(student);
    // Pre-populate form with student data
    setFormData(prev => ({
      ...prev,
      studentName: student.name,
      phoneNumber: student.mobile,
      email: student.email,
      gender: student.gender,
      caste: student.caste,
      program: student.program,
      rollNumber: student.rollNumber
    }));
    setCurrentView('edit');
    setActiveTab('basic');
  };

  const deleteStudent = (studentId: number): void => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      setStudents(prev => prev.filter(s => s.id !== studentId));
      showNotification('success', `Student ${student.name} deleted successfully!`);
    }
  };

  const renderStudentList = (): JSX.Element => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Student Management</h2>
        <div className="flex space-x-3">
          <button 
            onClick={handleDownloadTemplate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            <span>Download Template</span>
          </button>
          <button 
            onClick={handleUploadClick}
            disabled={isUploading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Upload className="w-5 h-5" />
            <span>{isUploading ? 'Uploading...' : 'Upload Student List'}</span>
          </button>
          <button 
            onClick={handleExportStudents}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            <span>Export Students</span>
          </button>
          <button 
            onClick={() => {
              setCurrentView('edit');
              setSelectedStudent(null);
              resetForm();
              setActiveTab('basic');
            }}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Student</span>
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".csv,.xlsx,.xls"
        style={{ display: 'none' }}
      />

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students by name, email, or roll number..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-3 w-80 border border-gray-300 rounded-lg   transition-all duration-200"
                />
              </div>
              <button 
                onClick={() => setShowFilterModal(true)}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                {(filters.program || filters.gender || filters.status || filters.caste) && (
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {[filters.program, filters.gender, filters.status, filters.caste].filter(Boolean).length}
                  </span>
                )}
              </button>
              {(searchQuery || filters.program || filters.gender || filters.status || filters.caste) && (
                <button
                  onClick={handleClearFilters}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredStudents.length} of {students.length} students
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Details</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <Users className="w-16 h-16 mb-4 opacity-30" />
                      <p className="text-lg font-medium mb-2">No students found</p>
                      <p className="text-sm">
                        {searchQuery || filters.program || filters.gender || filters.status || filters.caste
                          ? 'Try adjusting your search or filters'
                          : 'Start by adding your first student'
                        }
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                          onClick={() => editStudent(student)}
                          title="Edit Student"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-800 p-1 rounded transition-colors"
                          onClick={() => showNotification('info', `Viewing details for ${student.name}`)}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                          onClick={() => deleteStudent(student.id)}
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">Roll: {student.rollNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">{student.mobile}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.program}</div>
                        <div className="text-sm text-gray-500">{student.gender}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.caste}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === 'CAP' ? 'bg-green-100 text-green-800' : 
                        student.status === 'MANAGEMENT' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
          
        </div>
      </div>
    </div>
  );

  const renderFormField = (
    label: string, 
    field: keyof FormData, 
    type: string = 'text', 
    options: string[] | null = null, 
    required: boolean = false, 
    placeholder: string = ''
  ): JSX.Element => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'select' && options ? (
        <select
          value={formData[field] as string}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(field, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          value={formData[field] as string}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(field, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          rows={3}
          placeholder={placeholder}
        />
      ) : type === 'checkbox' ? (
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData[field] as boolean}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(field, e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label className="ml-2 text-sm text-gray-700">{placeholder}</label>
        </div>
      ) : (
        <input
          type={type}
          value={formData[field] as string}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(field, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder={placeholder}
        />
      )}
    </div>
  );

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Basic Student Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderFormField('Student Full Name', 'studentName', 'text', null, true, 'Enter full name as per documents')}
                {renderFormField('Roll Number', 'rollNumber', 'text', null, true, 'Enter roll number')}
                {renderFormField('Admission Number', 'admissionNumber', 'text', null, true, 'Enter admission number')}
                {renderFormField('Student ID', 'studentId', 'text', null, false, 'Enter unique student ID')}
                {renderFormField('Registration Number', 'registrationNumber', 'text', null, false, 'Enter registration number')}
                {renderFormField('Academic Year', 'academicYear', 'text', null, true, 'e.g., 2023-24')}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                Program Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderFormField('Program', 'program', 'select', programs, true)}
                {renderFormField('Batch', 'batch', 'text', null, false, 'e.g., Morning, Evening')}
              </div>
            </div>
          </div>
        );

      case 'course':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                Course Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderFormField('Course', 'course', 'text', null, true, 'Enter course name')}
                {renderFormField('Branch/Stream', 'branch', 'text', null, false, 'Enter branch or stream')}
                {renderFormField('Semester', 'semester', 'select', ['1', '2', '3', '4', '5', '6', '7', '8'], false)}
                {renderFormField('Section', 'section', 'text', null, false, 'e.g., A, B, C')}
                {renderFormField('Specialization', 'specialization', 'text', null, false, 'Enter specialization if any')}
                {renderFormField('Course Duration', 'courseDuration', 'text', null, false, 'e.g., 2 years, 4 years')}
              </div>
            </div>
          </div>
        );

      case 'correspondence':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-600" />
                Correspondence Address
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {renderFormField('Address', 'corrAddress', 'textarea', null, true, 'Enter complete address')}
                  {renderFormField('Landmark', 'corrLandmark', 'text', null, false, 'Enter nearby landmark')}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {renderFormField('City', 'corrCity', 'text', null, true, 'Enter city name')}
                  {renderFormField('State', 'corrState', 'select', states, true)}
                  {renderFormField('Pincode', 'corrPincode', 'text', null, true, 'Enter 6-digit pincode')}
                  {renderFormField('Country', 'corrCountry', 'text', null, true, 'Enter country name')}
                </div>
              </div>
            </div>
          </div>
        );

      case 'permanent':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Home className="w-5 h-5 mr-2 text-green-600" />
                Permanent Address
              </h3>
              
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.sameAsCorrespondence}
                    onChange={handleSameAsCorrespondence}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label className="ml-2 text-sm text-gray-700">Same as correspondence address</label>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {renderFormField('Address', 'permAddress', 'textarea', null, true, 'Enter complete permanent address')}
                  {renderFormField('Landmark', 'permLandmark', 'text', null, false, 'Enter nearby landmark')}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {renderFormField('City', 'permCity', 'text', null, true, 'Enter city name')}
                  {renderFormField('State', 'permState', 'select', states, true)}
                  {renderFormField('Pincode', 'permPincode', 'text', null, true, 'Enter 6-digit pincode')}
                  {renderFormField('Country', 'permCountry', 'text', null, true, 'Enter country name')}
                </div>
              </div>
            </div>
          </div>
        );

      case 'personal':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-purple-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderFormField('Date of Birth', 'dateOfBirth', 'date', null, true)}
                {renderFormField('Gender', 'gender', 'select', ['Male', 'Female', 'Other'], true)}
                {renderFormField('Blood Group', 'bloodGroup', 'select', bloodGroups, false)}
                {renderFormField('Nationality', 'nationality', 'text', null, true, 'Enter nationality')}
                {renderFormField('Religion', 'religion', 'select', religions, false)}
                {renderFormField('Caste', 'caste', 'text', null, false, 'Enter caste')}
                {renderFormField('Category', 'category', 'select', categories, true)}
                {renderFormField('Marital Status', 'maritalStatus', 'select', ['Single', 'Married', 'Divorced', 'Widowed'], false)}
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-yellow-600" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderFormField('Phone Number', 'phoneNumber', 'tel', null, true, 'Enter primary phone number')}
                {renderFormField('Alternate Phone', 'alternatePhone', 'tel', null, false, 'Enter alternate phone number')}
                {renderFormField('Email Address', 'email', 'email', null, true, 'Enter primary email address')}
                {renderFormField('Alternate Email', 'alternateEmail', 'email', null, false, 'Enter alternate email address')}
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-red-600" />
                Document Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderFormField('Aadhar Number', 'aadharNumber', 'text', null, false, 'Enter 12-digit Aadhar number')}
                {renderFormField('PAN Number', 'panNumber', 'text', null, false, 'Enter PAN number')}
                {renderFormField('Passport Number', 'passportNumber', 'text', null, false, 'Enter passport number (if any)')}
              </div>
            </div>
          </div>
        );

      case 'father':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Father's Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderFormField("Father's Full Name", 'fatherName', 'text', null, true, "Enter father's full name")}
                {renderFormField('Occupation', 'fatherOccupation', 'select', occupations, false)}
                {renderFormField('Organization/Company', 'fatherOrganization', 'text', null, false, 'Enter organization name')}
                {renderFormField('Phone Number', 'fatherPhone', 'tel', null, false, "Enter father's phone number")}
                {renderFormField('Email Address', 'fatherEmail', 'email', null, false, "Enter father's email address")}
                {renderFormField('Education Level', 'fatherEducation', 'select', educationLevels, false)}
                {renderFormField('Annual Income (₹)', 'fatherIncome', 'number', null, false, 'Enter annual income in rupees')}
              </div>
            </div>
          </div>
        );

      case 'mother':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-pink-600" />
                Mother's Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderFormField("Mother's Full Name", 'motherName', 'text', null, true, "Enter mother's full name")}
                {renderFormField('Occupation', 'motherOccupation', 'select', occupations, false)}
                {renderFormField('Organization/Company', 'motherOrganization', 'text', null, false, 'Enter organization name')}
                {renderFormField('Phone Number', 'motherPhone', 'tel', null, false, "Enter mother's phone number")}
                {renderFormField('Email Address', 'motherEmail', 'email', null, false, "Enter mother's email address")}
                {renderFormField('Education Level', 'motherEducation', 'select', educationLevels, false)}
                {renderFormField('Annual Income (₹)', 'motherIncome', 'number', null, false, 'Enter annual income in rupees')}
              </div>
            </div>
          </div>
        );

      case 'guardian':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-teal-600" />
                Guardian Details (if applicable)
              </h3>
              
              <div className="mb-6">
                {renderFormField('', 'isGuardianRequired', 'checkbox', null, false, 'Guardian information is required')}
              </div>

              {formData.isGuardianRequired && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderFormField("Guardian's Full Name", 'guardianName', 'text', null, true, "Enter guardian's full name")}
                    {renderFormField('Relation to Student', 'guardianRelation', 'text', null, true, 'e.g., Uncle, Aunt, Elder Brother')}
                    {renderFormField('Phone Number', 'guardianPhone', 'tel', null, true, "Enter guardian's phone number")}
                    {renderFormField('Email Address', 'guardianEmail', 'email', null, false, "Enter guardian's email address")}
                    {renderFormField('Occupation', 'guardianOccupation', 'select', occupations, false)}
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {renderFormField('Guardian Address', 'guardianAddress', 'textarea', null, true, "Enter guardian's complete address")}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'previous':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                Previous Academic Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderFormField('Previous School/College', 'previousSchool', 'text', null, true, 'Enter previous institution name')}
                {renderFormField('Board/University', 'previousBoard', 'text', null, true, 'Enter board or university name')}
                {renderFormField('Roll Number', 'previousRollNumber', 'text', null, false, 'Enter previous roll number')}
                {renderFormField('Passing Year', 'previousYear', 'text', null, true, 'Enter passing year')}
                {renderFormField('Percentage/CGPA', 'previousPercentage', 'text', null, true, 'Enter percentage or CGPA')}
                {renderFormField('Grade', 'previousGrade', 'text', null, false, 'Enter grade if applicable')}
                {renderFormField('Transfer Certificate Number', 'tcNumber', 'text', null, false, 'Enter TC number')}
                {renderFormField('Migration Certificate Number', 'migrationNumber', 'text', null, false, 'Enter migration certificate number')}
              </div>
            </div>
          </div>
        );

      case 'educational':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />
                  Educational Information
                </h3>
                <button
                  onClick={addEducationRecord}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Record</span>
                </button>
              </div>

              {formData.educationRecords.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium mb-2">No Educational Records Added</p>
                  <p className="text-sm">Click "Add Record" to start adding educational information.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 rounded-lg bg-white">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">S.No</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">Institute Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">Board/Uni.</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">Year</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">Month</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">Obtained</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">Maximum</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">Percentage</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">Grade</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">Attempt</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.educationRecords.map((record, index) => (
                        <tr key={record.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm border-r">{index + 1}</td>
                          <td className="px-4 py-3 border-r">
                            <input
                              type="text"
                              value={record.instituteName}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => updateEducationRecord(record.id, 'instituteName', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 min-w-32"
                              placeholder="Institute name"
                            />
                          </td>
                          <td className="px-4 py-3 border-r">
                            <input
                              type="text"
                              value={record.boardUni}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => updateEducationRecord(record.id, 'boardUni', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 min-w-28"
                              placeholder="Board/University"
                            />
                          </td>
                          <td className="px-4 py-3 border-r">
                            <input
                              type="text"
                              value={record.year}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => updateEducationRecord(record.id, 'year', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 min-w-20"
                              placeholder="Year"
                            />
                          </td>
                          <td className="px-4 py-3 border-r">
                            <input
                              type="text"
                              value={record.month}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => updateEducationRecord(record.id, 'month', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 min-w-20"
                              placeholder="Month"
                            />
                          </td>
                          <td className="px-4 py-3 border-r">
                            <input
                              type="text"
                              value={record.obtained}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => updateEducationRecord(record.id, 'obtained', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 min-w-20"
                              placeholder="Obtained"
                            />
                          </td>
                          <td className="px-4 py-3 border-r">
                            <input
                              type="text"
                              value={record.maximum}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => updateEducationRecord(record.id, 'maximum', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 min-w-20"
                              placeholder="Maximum"
                            />
                          </td>
                          <td className="px-4 py-3 border-r">
                            <input
                              type="text"
                              value={record.percentage}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => updateEducationRecord(record.id, 'percentage', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 min-w-20"
                              placeholder="Percentage"
                            />
                          </td>
                          <td className="px-4 py-3 border-r">
                            <input
                              type="text"
                              value={record.grade}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => updateEducationRecord(record.id, 'grade', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 min-w-16"
                              placeholder="Grade"
                            />
                          </td>
                          <td className="px-4 py-3 border-r">
                            <select
                              value={record.attempt}
                              onChange={(e: ChangeEvent<HTMLSelectElement>) => updateEducationRecord(record.id, 'attempt', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="1">1st</option>
                              <option value="2">2nd</option>
                              <option value="3">3rd</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => removeEducationRecord(record.id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                              title="Remove Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              <div className="mt-4 text-right text-sm text-gray-500">
                Edited by: Admin
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-center py-8 text-gray-500">Content for {activeTab} tab</div>;
    }
  };

  const renderEditForm = (): JSX.Element => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentView('list')}
            className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-bold text-gray-800">
            {selectedStudent ? 'Edit Student Details' : 'Add New Student'}
          </h2>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={resetForm}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <X className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button 
            onClick={() => showNotification('info', 'PDF generation feature coming soon!')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <FileText className="w-4 h-4" />
            <span>Generate PDF</span>
          </button>
          <button 
            onClick={saveStudent}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Save className="w-4 h-4" />
            <span>Save Student</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg mb-6 border border-gray-100">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 flex justify-between rounded-b-xl">
          <button
            onClick={() => {
              const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
              if (currentIndex > 0) {
                setActiveTab(tabs[currentIndex - 1].id as TabType);
              }
            }}
            disabled={activeTab === tabs[0].id}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          
          <div className="text-sm text-gray-500 flex items-center">
            Step {tabs.findIndex(tab => tab.id === activeTab) + 1} of {tabs.length}
          </div>
          
          <button
            onClick={() => {
              const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
              if (currentIndex < tabs.length - 1) {
                setActiveTab(tabs[currentIndex + 1].id as TabType);
              }
            }}
            disabled={activeTab === tabs[tabs.length - 1].id}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderProgramModal = (): JSX.Element | null => {
    if (!showProgramModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-96 shadow-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
              Select Program
            </h3>
            <button
              onClick={() => setShowProgramModal(false)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <select
              value={selectedProgram}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedProgram(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select a program</option>
              {programs.map(program => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
            
            <div className="flex justify-end space-x-3 mt-8">
              <button
                onClick={() => setShowProgramModal(false)}
                className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle program selection
                  showNotification('success', `Selected program: ${selectedProgram}`);
                  setShowProgramModal(false);
                  setSelectedProgram('');
                }}
                disabled={!selectedProgram}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Select Program
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full min-h-screen">
        {currentView === 'list' ? renderStudentList() : renderEditForm()}
      </div>

      {renderProgramModal()}
      
      {/* Filter Modal */}
      <FilterModal 
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Notification System */}
      <NotificationSystem 
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default StudentManagementSystem;