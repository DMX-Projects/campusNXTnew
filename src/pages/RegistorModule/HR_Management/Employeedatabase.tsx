
import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  Filter,
  Plus,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Users,
  Download,
  Edit,
  X,
  ChevronDown,
  ChevronLeft,
  Edit3,
  Star,
  CheckCircle,
  FileText,
  DollarSign,
  IndianRupee,
  Clock,
  Building,
  Upload,
  BackpackIcon,
  LucideBackpack
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

// Theme Context (simplified for this example)
const useThemeContext = React.createContext({
  isDark: false,
  setIsDark: (value: boolean) => {}
});
interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  status: string;
  location: string;
  joinDate: string;
  avatar: string;
  salary: string;
  manager: string;
}

interface Document {
  id: number;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  file?: File;
}

// Extended employee data with profile details
const getEmployeeProfileData = (employee: Employee, documents: Document[] = []) => ({
  ...employee,
  personalInfo: {
    dateOfBirth: 'March 12, 1990',
    address: '123 Main Street, San Francisco, CA 94105',
    emergencyContact: 'Michael Johnson (Spouse) - +1 (555) 987-6543',
    bloodGroup: 'O+',
    nationality: 'American'
  },
  documents: documents.length > 0 ? documents : [
    { id: 1, name: 'Employment Contract', type: 'Contract', uploadDate: '2021-01-15', size: '2.4 MB' },
    { id: 2, name: 'Bachelor\'s Degree Certificate', type: 'Education', uploadDate: '2021-01-10', size: '1.8 MB' },
    { id: 3, name: 'Previous Employment Letter', type: 'Reference', uploadDate: '2021-01-12', size: '856 KB' },
    { id: 4, name: 'Performance Review 2024', type: 'Review', uploadDate: '2024-06-15', size: '1.2 MB' }
  ],
  // salaryStructure: {
  //   baseSalary: employee.salary.replace(/,/g, '').split('.')[0] || '₹80,000',
  //   allowances: '₹8,000',
  //   bonuses: '₹7,000',
  //   deductions: '₹2,500',
  //   netSalary: employee.salary.replace(/,/g, '').split('.')[0] || '₹80,000',
  //   payFrequency: 'Monthly',
  //   bankAccount: '****1234',
  //   taxInfo: 'Federal: 22%, State: 6%'
  // },
  salaryStructure: {
  baseSalary: (95000).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }),
  allowances: '₹8,000',
  bonuses: '₹7,000',
  deductions: '₹2,500',
  netSalary: (95000).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }),
  payFrequency: 'Monthly',
  bankAccount: '****1234',
  taxInfo: 'Federal: 22%, State: 6%'
}
,
  workHistory: [
    {
      id: 1,
      position: employee.designation,
      department: employee.department,
      startDate: employee.joinDate,
      endDate: 'Present',
      manager: employee.manager,
      achievements: ['Led team projects successfully', 'Improved departmental efficiency by 30%']
    }
  ]
});

const initialEmployees: Employee[] = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@gmail.com', phone: '+1 (555) 123-4567', department: 'electronics &communication engineering', designation: 'lecturer', status: 'Active', location: 'New York', joinDate: '2022-03-15', avatar: 'SJ', salary: '$95,000', manager: 'John Smith' },
  { id: 2, name: 'Michael Chen', email: 'michael.chen@gmail.com', phone: '+1 (555) 234-5678', department: 'computer science engineering', designation: 'assistant professor', status: 'Active', location: 'San Francisco', joinDate: '2021-08-20', avatar: 'MC', salary: '$78,000', manager: 'Lisa Wong' },
  { id: 3, name: 'Emily Rodriguez', email: 'emily.rodriguez@gmail.com', phone: '+1 (555) 345-6789', department: 'artificial intelligence engineering', designation: 'recruiter', status: 'Active', location: 'Chicago', joinDate: '2023-01-10', avatar: 'ER', salary: '$65,000', manager: 'David Kim' },
  { id: 4, name: 'James Wilson', email: 'james.wilson@gmail.com', phone: '+1 (555) 456-7890', department: 'electrical engineering', designation: 'lab technician', status: 'On Leave', location: 'Boston', joinDate: '2020-11-05', avatar: 'JW', salary: '$72,000', manager: 'Sarah Brown' },
  { id: 5, name: 'Lisa Anderson', email: 'lisa.anderson@gmail.com', phone: '+1 (555) 567-8901', department: 'mechanical engineering', designation: 'hod', status: 'Active', location: 'Miami', joinDate: '2022-07-12', avatar: 'LA', salary: '$58,000', manager: 'Tom Davis' },
];

const departments = ['electronics &communication engineering', 'computer science engineering', 'artificial intelligence engineering', 'electrical engineering', 'mechanical engineering'];
const designations = ['lecturer', 'assistant professor', 'recruiter', 'lab technician', 'hod'];
const statuses = ['Active', 'On Leave', 'Inactive'];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'On Leave': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'Inactive': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

// Employee Profile Page Component
const EmployeeProfilePage = ({ employee, onBack, isDark }: { employee: Employee; onBack: () => void; isDark: boolean }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [documents, setDocuments] = useState<Document[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const employeeData = getEmployeeProfileData(employee, documents);

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'documents', label: 'Official Documents', icon: FileText },
    { id: 'salary', label: 'Salary Structure', icon: IndianRupee },
    { id: 'history', label: 'Work History', icon: Clock }
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newDocument: Document = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type.includes('pdf') ? 'PDF' : 
                file.type.includes('image') ? 'Image' : 
                file.type.includes('doc') ? 'Document' : 'File',
          uploadDate: new Date().toISOString().split('T')[0],
          size: formatFileSize(file.size),
          file: file
        };
        
        setDocuments(prev => [...prev, newDocument]);
      });
    }
    // Reset input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const handleDownloadFile = (document: Document) => {
    if (document.file) {
      // Create download link for uploaded file
      const url = URL.createObjectURL(document.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = document.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    else {
      alert('No file available for download.'); 
    }
  };

  const handleDownload = (document: Document) => {
    if (document.file) {
      // Create download link for uploaded file
      const url = URL.createObjectURL(document.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = document.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // For demo documents, create a dummy file
      const content = `This is a demo document: ${document.name}\nType: ${document.type}\nUpload Date: ${document.uploadDate}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${document.name}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleUploadDocument = () => {
    fileInputRef.current?.click();
  };

  const generateSalarySlip = () => {
    const salaryData = employeeData.salaryStructure;
    const currentDate = new Date().toLocaleDateString();
    
    const salarySlipContent = `
SALARY SLIP
===========================================

Employee Name: ${employeeData.name}
Employee ID: EMP${employeeData.id.toString().padStart(3, '0')}
Department: ${employeeData.department}
Designation: ${employeeData.designation}
Pay Period: ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
Generated On: ${currentDate}

===========================================
EARNINGS
===========================================
Base Salary:          ${salaryData.baseSalary}
Allowances:           ${salaryData.allowances}
Bonuses:              ${salaryData.bonuses}

===========================================
DEDUCTIONS
===========================================
Total Deductions:     ${salaryData.deductions}
Tax Information:      ${salaryData.taxInfo}

===========================================
NET SALARY:           ${salaryData.netSalary}
===========================================

Payment Details:
Pay Frequency:        ${salaryData.payFrequency}
Bank Account:         ${salaryData.bankAccount}

-------------------------------------------
This is a system generated salary slip.
Generated on ${currentDate}
    `;

    const blob = new Blob([salarySlipContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${employeeData.name.replace(/\s+/g, '_')}_salary_slip_${new Date().getFullYear()}_${(new Date().getMonth() + 1).toString().padStart(2, '0')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderPersonalInfo = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} border-b pb-2`}>
          Basic Information
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{employeeData.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{employeeData.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Date of Birth</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{employeeData.personalInfo.dateOfBirth}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} border-b pb-2`}>
          Contact & Emergency
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className={`w-5 h-5 mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Address</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{employeeData.personalInfo.address}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <User className={`w-5 h-5 mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Emergency Contact</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{employeeData.personalInfo.emergencyContact}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`w-5 h-5 rounded-full bg-red-500 flex items-center justify-center`}>
              <span className="text-white text-xs font-bold">+</span>
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Blood Group</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{employeeData.personalInfo.bloodGroup}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Document Library
        </h3>
        <button 
          onClick={handleUploadDocument} 
          className={`px-4 py-2 rounded-lg ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors flex items-center space-x-2`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
      />
      
      <div className="grid gap-4">
        {employeeData.documents.map((doc) => (
          <div key={doc.id} className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FileText className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                <div>
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.name}</h4>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                      {doc.type}
                    </span>
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Uploaded: {doc.uploadDate}
                    </span>
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Size: {doc.size}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDownloadFile(doc)}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
                title="Download document"
              >
                <Download className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSalaryStructure = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} border-b pb-2`}>
          Salary Breakdown
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 rounded-lg bg-green-50 dark:bg-green-900">
            <span className={`font-medium ${isDark ? 'text-green-200' : 'text-green-800'}`}>Base Salary</span>
            <span className={`font-bold ${isDark ? 'text-green-100' : 'text-green-900'}`}>{employeeData.salaryStructure.baseSalary}</span>
          </div>
          <div className="flex justify-between items-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900">
            <span className={`font-medium ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>Allowances</span>
            <span className={`font-bold ${isDark ? 'text-blue-100' : 'text-blue-900'}`}>{employeeData.salaryStructure.allowances}</span>
          </div>
          <div className="flex justify-between items-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900">
            <span className={`font-medium ${isDark ? 'text-purple-200' : 'text-purple-800'}`}>Bonuses</span>
            <span className={`font-bold ${isDark ? 'text-purple-100' : 'text-purple-900'}`}>{employeeData.salaryStructure.bonuses}</span>
          </div>
          <div className="flex justify-between items-center p-4 rounded-lg bg-red-50 dark:bg-red-900">
            <span className={`font-medium ${isDark ? 'text-red-200' : 'text-red-800'}`}>Deductions</span>
            <span className={`font-bold ${isDark ? 'text-red-100' : 'text-red-900'}`}>-{employeeData.salaryStructure.deductions}</span>
          </div>
          <div className="flex justify-between items-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600">
            <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Net Salary</span>
            <span className={`font-bold text-lg ${isDark ? 'text-green-400' : 'text-green-600'}`}>{employeeData.salaryStructure.netSalary}</span>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} border-b pb-2`}>
          Payment Details
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Calendar className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pay Frequency</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{employeeData.salaryStructure.payFrequency}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Building className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Bank Account</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{employeeData.salaryStructure.bankAccount}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FileText className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tax Information</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{employeeData.salaryStructure.taxInfo}</p>
            </div>
          </div>
        </div>
        <button 
          onClick={generateSalarySlip} 
          className={`w-full py-2 px-4 rounded-lg ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors flex items-center justify-center space-x-2`}
        >
          <Download className="w-4 h-4" />
          <span>Generate Salary Slip</span>
        </button>
      </div>
    </div>
  );

  const renderWorkHistory = () => (
    <div className="space-y-6">
      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} border-b pb-2`}>
        Career Timeline
      </h3>
      <div className="space-y-6">
        {employeeData.workHistory.map((position, index) => (
          <div key={position.id} className="relative">
            {index < employeeData.workHistory.length - 1 && (
              <div className={`absolute left-4 top-12 w-px h-20 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            )}
            <div className="flex items-start space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${position.endDate === 'Present' ? 'bg-green-500' : 'bg-gray-400'}`}>
                {position.endDate === 'Present' ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : (
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                )}
              </div>
              <div className={`flex-1 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{position.position}</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{position.department}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${position.endDate === 'Present' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                    {position.startDate} - {position.endDate}
                  </span>
                </div>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <Users className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Manager: {position.manager}</span>
                  </div>
                </div>
                <div>
                  <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Key Achievements:</p>
                  <ul className="space-y-1">
                    {position.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Star className={`w-3 h-3 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`} />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  space-y-8">
         
        {/* Employee Header */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 mb-8 `}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}>
                {employeeData.avatar}
              </div>
              
              <div>
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{employeeData.name}</h2>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{employeeData.designation}</p>
                <div className="flex items-center space-x-4 ease-in-out ">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(employeeData.status)}`}>
                    {employeeData.status}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <Briefcase className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{employeeData.department}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Joined: {employeeData.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
                 <button
                onClick={onBack}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors bg-blue-500 text-black-500 bg- flex items-center space-x-2 mb-2 border-2`}
              >
                back
                {/* <LucideBackpack className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} /> */}
              </button>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Employee ID</p>
              <p className={`font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>EMP{employeeData.id.toString().padStart(3, '0')}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm`}>
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6 scrollbar-hide overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'documents' && renderDocuments()}
            {activeTab === 'salary' && renderSalaryStructure()}
            {activeTab === 'history' && renderWorkHistory()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Employee Database Component
const EmployeeDatabase: React.FC = () => {
  const { isDark, setIsDark } = useTheme();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedDesignation, setSelectedDesignation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

  // Employee Filter
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.designation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
      const matchesDesignation = selectedDesignation === 'all' || employee.designation === selectedDesignation;
      const matchesStatus = selectedStatus === 'all' || employee.status === selectedStatus;
      return matchesSearch && matchesDepartment && matchesDesignation && matchesStatus;
    });
  }, [searchTerm, selectedDepartment, selectedDesignation, selectedStatus, employees]);

  // EXPORT CSV
  const handleExportData = () => {
    const headers = [
      'Name', 'Email', 'Phone', 'Department', 'Designation', 'Status', 'Location', 'Join Date', 'Salary', 'Manager',
    ];
    const rows = filteredEmployees.map(emp =>
      [emp.name, emp.email, emp.phone, emp.department, emp.designation, emp.status, emp.location, emp.joinDate, emp.salary, emp.manager].join(',')
    );
    const csvContent = [
      headers.join(','), ...rows
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'employees.csv';
    a.click();
  };

  // ADD EMPLOYEE
  const handleAddEmployee = (employee: Omit<Employee, 'id' | 'avatar'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1,
      avatar: employee.name.split(' ').map(s => s[0]).join(''),
    };
    setEmployees(e => [...e, newEmployee]);
    setShowAddModal(false);
  };

  // EDIT EMPLOYEE
  const handleEditEmployee = (data: Employee) => {
    setEmployees(e => e.map(emp => emp.id === data.id ? data : emp));
    setShowEditModal(false);
  };

  // OPEN EDIT FORM
  const openEditForm = (employee: Employee) => {
    setEditEmployee(employee);
    setShowEditModal(true);
  };

  // DOWNLOAD EMPLOYEE AS CSV
  const handleDownloadEmployeeAsCSV = (employee: Employee) => {
    const headers = [
      'Name', 'Email', 'Phone', 'Department', 'Designation', 'Status', 'Location', 'Join Date', 'Salary', 'Manager',
    ];
    const row = [
      employee.name, employee.email, employee.phone, employee.department,
      employee.designation, employee.status, employee.location,
      employee.joinDate, employee.salary, employee.manager,
    ].map(val => `"${val.replace(/"/g, '""')}"`); // Proper CSV escaping

    const csvContent = [
      headers.join(','),
      row.join(',')
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${employee.name.replace(/\s+/g, '_')}_employee.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Handle viewing employee profile
  const handleViewEmployeeProfile = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeProfile(true);
  };

  // Handle back from profile
  const handleBackFromProfile = () => {
    setShowEmployeeProfile(false);
    setSelectedEmployee(null);
  };

  // Employee Card component
  const EmployeeCard = ({ employee }: { employee: Employee }) => (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4 hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}>
            {employee.avatar}
          </div>
          <div>
            <button
              onClick={() => handleViewEmployeeProfile(employee)}
              className={`font-semibold ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-colors cursor-pointer`}
            >
              {employee.name}
            </button>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{employee.designation}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
          {employee.status}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2">
          <Mail className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{employee.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Briefcase className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{employee.department}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{employee.location}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => handleViewEmployeeProfile(employee)}
          className={`px-3 py-1 rounded text-sm font-medium ${isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-50 hover:bg-blue-100 text-blue-600'} transition-colors duration-200`}
        >
          View Profile
        </button>
        <div className="flex space-x-2">
          <button onClick={() => openEditForm(employee)} className={`p-1 rounded ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDownloadEmployeeAsCSV(employee)}
            className={`p-1 rounded ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Add Employee Modal
  const AddEmployeeModal = ({ onAdd, onClose }: { onAdd: (employee: Omit<Employee, 'id' | 'avatar'>) => void; onClose: () => void }) => {
    const [form, setForm] = useState<Omit<Employee, 'id' | 'avatar'>>({
      name: '',
      email: '',
      phone: '',
      department: departments[0],
      designation: designations[0],
      status: statuses[0],
      location: '',
      joinDate: '',
      salary: '',
      manager: '',
    });

    const inputClass = `w-full p-2 rounded border ${
      isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto`}>
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Add Employee</h2>
            <button onClick={onClose} className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              onAdd(form);
            }}
            className="space-y-4"
          >
            <input className={inputClass} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input className={inputClass} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required type="email" />
            <input className={inputClass} placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
            <select className={inputClass} value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select className={inputClass} value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })}>
              {designations.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select className={inputClass} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input className={inputClass} placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required />
            <input className={inputClass} type="date" value={form.joinDate} onChange={e => setForm({ ...form, joinDate: e.target.value })} required />
            <input className={inputClass} placeholder="Salary (e.g., ₹50,000)" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} required />
            <input className={inputClass} placeholder="Manager" value={form.manager} onChange={e => setForm({ ...form, manager: e.target.value })} required />
            <div className="flex justify-end space-x-3 mt-4">
              <button type="button" onClick={onClose} className={`px-4 py-2 rounded ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">Add</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Edit Employee Modal
  const EditEmployeeModal = ({ employee, onEdit, onClose }: { employee: Employee; onEdit: (employee: Employee) => void; onClose: () => void }) => {
    const [form, setForm] = useState<Employee>(employee);

    const inputClass = `w-full p-2 rounded border ${
      isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto`}>
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Edit Employee</h2>
            <button onClick={onClose} className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              onEdit(form);
            }}
            className="space-y-3"
          >
            <input className={inputClass} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value, avatar: e.target.value.split(' ').map(s => s[0]).join('') })} required />
            <input className={inputClass} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required type="email" />
            <input className={inputClass} placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
            <select className={inputClass} value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select className={inputClass} value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })}>
              {designations.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select className={inputClass} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input className={inputClass} placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required />
            <input className={inputClass} type="date" value={form.joinDate} onChange={e => setForm({ ...form, joinDate: e.target.value })} required />
            <input className={inputClass} placeholder="Salary" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} required />
            <input className={inputClass} placeholder="Manager" value={form.manager} onChange={e => setForm({ ...form, manager: e.target.value })} required />
            <div className="flex justify-end space-x-3 mt-4">
              <button type="button" onClick={onClose} className={`px-4 py-2 rounded ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // If showing employee profile, render the profile page
  if (showEmployeeProfile && selectedEmployee) {
    return <EmployeeProfilePage employee={selectedEmployee} onBack={handleBackFromProfile} isDark={isDark} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
     <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4   justify-between`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Employee Database</h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage and track all employee information
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {/* Add Employee Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className={`px-4 py-2 rounded-lg font-medium ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-200 flex items-center space-x-2`}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Employee</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors duration-200 flex items-center space-x-2`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4 mb-6`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className={`w-full p-2 rounded border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="all">All Departments</option>
                  {departments.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Designation</label>
                <select
                  value={selectedDesignation}
                  onChange={(e) => setSelectedDesignation(e.target.value)}
                  className={`w-full p-2 rounded border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="all">All Designations</option>
                  {designations.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className={`w-full p-2 rounded border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="all">All Statuses</option>
                  {statuses.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => handleExportData()}
                  className={`px-4 py-2 rounded font-medium ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-colors duration-200 flex items-center space-x-2 w-full justify-center`}
                >
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-4">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {filteredEmployees.length} of {employees.length} employees
          </p>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEmployees.map(employee => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
        
        {filteredEmployees.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No employees found</p>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modals */}
      {showAddModal && <AddEmployeeModal onAdd={handleAddEmployee} onClose={() => setShowAddModal(false)} />}
      {showEditModal && editEmployee && <EditEmployeeModal employee={editEmployee} onEdit={handleEditEmployee} onClose={() => setShowEditModal(false)} />}
    </div>
  );
};

export default EmployeeDatabase;