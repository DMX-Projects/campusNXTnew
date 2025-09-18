import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  TrendingUpIcon,
  UserIcon,
  AwardIcon,
  DollarSignIcon,
  MapPinIcon,
  BuildingIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  ShareIcon,
  PrinterIcon,
  EyeIcon,
  BarChart3Icon,
  PieChartIcon,
  FileTextIcon,
  StarIcon,
  MailIcon,
  CopyIcon,
  RefreshCwIcon,
  XIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ZapIcon,
  TriangleRightIcon,
  TargetIcon
} from 'lucide-react';

interface PlacementResult {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  email: string;
  phone: string;
  department: string;
  cgpa: number;
  company: string;
  companyLogo: string;
  position: string;
  package: number;
  packageType: 'CTC' | 'Base' | 'Gross';
  offerType: 'Full-time' | 'Internship' | 'Part-time' | 'Contract';
  location: string;
  joiningDate: string;
  offerDate: string;
  status: 'Placed' | 'Selected' | 'Offer-Pending' | 'Joined' | 'Declined';
  round: string;
  interviewDate: string;
  feedback: string;
  skills: string[];
  projects: string[];
  certifications: string[];
  previousApplications: number;
  referral?: string;
  isHighestPackage: boolean;
  isFirstPlacement: boolean;
  mentorComments?: string;
  hrContact: {
    name: string;
    email: string;
    phone: string;
  };
  documents: {
    offerLetter?: string;
    joiningLetter?: string;
    contract?: string;
  };
}

interface CompanyStats {
  id: string;
  companyName: string;
  logo: string;
  totalHired: number;
  positions: string[];
  averagePackage: number;
  highestPackage: number;
  lowestPackage: number;
  locations: string[];
  visitDate: string;
  totalApplications: number;
  selectionRate: number;
  department: { [key: string]: number };
  rounds: string[];
  feedback: number;
  rating: number;
}

interface PlacementAnalytics {
  totalPlacements: number;
  placementPercentage: number;
  averagePackage: number;
  highestPackage: number;
  medianPackage: number;
  totalCompanies: number;
  departmentWise: { [key: string]: { placed: number; total: number; percentage: number } };
  packageRanges: { [key: string]: number };
  topCompanies: string[];
  growthRate: number;
  previousYearComparison: {
    placements: number;
    companies: number;
    averagePackage: number;
  };
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface FilterState {
  search: string;
  department: string;
  company: string;
  packageRange: { min: number; max: number };
  cgpaRange: { min: number; max: number };
  status: string;
  offerType: string;
  location: string;
  dateRange: { start: string; end: string };
}

const StudentPlacementResult: React.FC = () => {
  // Sample data
  const [placementResults, setPlacementResults] = useState<PlacementResult[]>([
    {
      id: '1',
      studentId: 'STU2025001',
      studentName: 'Arjun Sharma',
      rollNumber: '21CSE001',
      email: 'arjun.sharma@college.edu',
      phone: '+91-9876543210',
      department: 'Computer Science Engineering',
      cgpa: 9.2,
      company: 'Google',
      companyLogo: '🔍',
      position: 'Software Engineer',
      package: 2800000,
      packageType: 'CTC',
      offerType: 'Full-time',
      location: 'Bangalore, India',
      joiningDate: '2025-07-01',
      offerDate: '2025-03-15',
      status: 'Placed',
      round: 'Final Round',
      interviewDate: '2025-03-10',
      feedback: 'Excellent technical skills and problem-solving abilities. Strong candidate for the role.',
      skills: ['React.js', 'Node.js', 'Python', 'System Design', 'Algorithms'],
      projects: ['E-commerce Platform', 'Real-time Chat App', 'ML Recommendation System'],
      certifications: ['AWS Solutions Architect', 'Google Cloud Professional'],
      previousApplications: 8,
      referral: 'Alumni - Priya Singh (Google)',
      isHighestPackage: true,
      isFirstPlacement: true,
      mentorComments: 'Outstanding student with exceptional coding skills and leadership qualities.',
      hrContact: {
        name: 'Sarah Johnson',
        email: 'sarah.j@google.com',
        phone: '+91-9012345678'
      },
      documents: {
        offerLetter: 'google_offer_letter.pdf',
        joiningLetter: 'google_joining_letter.pdf'
      }
    },
    {
      id: '2',
      studentId: 'STU2025002',
      studentName: 'Priya Patel',
      rollNumber: '21CSE002',
      email: 'priya.patel@college.edu',
      phone: '+91-9876543211',
      department: 'Computer Science Engineering',
      cgpa: 8.9,
      company: 'Microsoft',
      companyLogo: '🪟',
      position: 'Software Development Engineer',
      package: 2600000,
      packageType: 'CTC',
      offerType: 'Full-time',
      location: 'Hyderabad, India',
      joiningDate: '2025-06-15',
      offerDate: '2025-03-20',
      status: 'Placed',
      round: 'Technical Round 3',
      interviewDate: '2025-03-18',
      feedback: 'Strong problem-solving skills and good understanding of software engineering principles.',
      skills: ['C#', '.NET', 'Azure', 'SQL Server', 'JavaScript'],
      projects: ['Cloud Management System', 'Enterprise Web App', 'Mobile API Gateway'],
      certifications: ['Microsoft Azure Fundamentals', 'Azure Developer Associate'],
      previousApplications: 6,
      isHighestPackage: false,
      isFirstPlacement: true,
      hrContact: {
        name: 'David Chen',
        email: 'david.chen@microsoft.com',
        phone: '+91-9012345679'
      },
      documents: {
        offerLetter: 'microsoft_offer_letter.pdf'
      }
    },
    {
      id: '3',
      studentId: 'STU2025003',
      studentName: 'Rahul Kumar',
      rollNumber: '21ECE001',
      email: 'rahul.kumar@college.edu',
      phone: '+91-9876543212',
      department: 'Electronics & Communication Engineering',
      cgpa: 8.7,
      company: 'Intel',
      companyLogo: '🔧',
      position: 'Hardware Design Engineer',
      package: 1800000,
      packageType: 'CTC',
      offerType: 'Full-time',
      location: 'Bangalore, India',
      joiningDate: '2025-08-01',
      offerDate: '2025-04-01',
      status: 'Selected',
      round: 'Technical Interview',
      interviewDate: '2025-03-25',
      feedback: 'Good knowledge of digital circuits and VLSI design. Needs to improve communication skills.',
      skills: ['VLSI', 'Verilog', 'Digital Circuit Design', 'FPGA', 'SystemC'],
      projects: ['32-bit Processor Design', 'Image Processing System', 'IoT Security Module'],
      certifications: ['Cadence Certified', 'ARM Processor Design'],
      previousApplications: 5,
      isHighestPackage: false,
      isFirstPlacement: true,
      hrContact: {
        name: 'Jennifer Smith',
        email: 'jennifer.smith@intel.com',
        phone: '+91-9012345680'
      },
      documents: {}
    },
    {
      id: '4',
      studentId: 'STU2025004',
      studentName: 'Sneha Reddy',
      rollNumber: '21ME001',
      email: 'sneha.reddy@college.edu',
      phone: '+91-9876543213',
      department: 'Mechanical Engineering',
      cgpa: 8.5,
      company: 'Tata Motors',
      companyLogo: '🚗',
      position: 'Design Engineer',
      package: 1200000,
      packageType: 'CTC',
      offerType: 'Full-time',
      location: 'Pune, India',
      joiningDate: '2025-07-15',
      offerDate: '2025-04-10',
      status: 'Joined',
      round: 'Final Interview',
      interviewDate: '2025-04-05',
      feedback: 'Excellent understanding of mechanical systems and automotive engineering.',
      skills: ['AutoCAD', 'SolidWorks', 'ANSYS', 'Automotive Design', 'Manufacturing'],
      projects: ['Electric Vehicle Design', 'Engine Optimization', 'Safety System Analysis'],
      certifications: ['AutoCAD Certified', 'Six Sigma Green Belt'],
      previousApplications: 4,
      isHighestPackage: false,
      isFirstPlacement: true,
      hrContact: {
        name: 'Ravi Agarwal',
        email: 'ravi.agarwal@tatamotors.com',
        phone: '+91-9012345681'
      },
      documents: {
        offerLetter: 'tata_offer_letter.pdf',
        joiningLetter: 'tata_joining_letter.pdf',
        contract: 'tata_employment_contract.pdf'
      }
    }
  ]);

  const [companyStats, setCompanyStats] = useState<CompanyStats[]>([
    {
      id: '1',
      companyName: 'Google',
      logo: '🔍',
      totalHired: 12,
      positions: ['Software Engineer', 'Data Scientist', 'Product Manager'],
      averagePackage: 2650000,
      highestPackage: 2800000,
      lowestPackage: 2400000,
      locations: ['Bangalore', 'Hyderabad', 'Mumbai'],
      visitDate: '2025-03-10',
      totalApplications: 145,
      selectionRate: 8.3,
      department: { 'CSE': 8, 'ECE': 2, 'IT': 2 },
      rounds: ['Online Test', 'Technical Interview 1', 'Technical Interview 2', 'HR Round'],
      feedback: 4.8,
      rating: 4.9
    },
    {
      id: '2',
      companyName: 'Microsoft',
      logo: '🪟',
      totalHired: 15,
      positions: ['SDE', 'Cloud Engineer', 'AI Engineer'],
      averagePackage: 2450000,
      highestPackage: 2600000,
      lowestPackage: 2200000,
      locations: ['Hyderabad', 'Bangalore', 'Noida'],
      visitDate: '2025-03-15',
      totalApplications: 178,
      selectionRate: 8.4,
      department: { 'CSE': 10, 'IT': 3, 'ECE': 2 },
      rounds: ['Coding Test', 'Technical Round', 'System Design', 'HR Discussion'],
      feedback: 4.6,
      rating: 4.7
    }
  ]);

  // State management
  const [selectedView, setSelectedView] = useState<'overview' | 'students' | 'companies' | 'analytics'>('overview');
  const [selectedStudent, setSelectedStudent] = useState<PlacementResult | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<CompanyStats | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    department: 'all',
    company: 'all',
    packageRange: { min: 0, max: 5000000 },
    cgpaRange: { min: 0, max: 10 },
    status: 'all',
    offerType: 'all',
    location: 'all',
    dateRange: { start: '', end: '' }
  });

  const [sortConfig, setSortConfig] = useState<{
    key: keyof PlacementResult;
    direction: 'asc' | 'desc';
  }>({
    key: 'package',
    direction: 'desc'
  });

  // Toast notification system
  const showToast = useCallback((type: Toast['type'], title: string, message: string, duration = 5000) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, type, title, message, duration };
    setToasts(prev => [...prev, newToast]);
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Calculate analytics
  const analytics = useMemo((): PlacementAnalytics => {
    const totalStudents = 280; // Total students in batch
    const placedStudents = placementResults.filter(r => ['Placed', 'Joined'].includes(r.status));
    
    const packages = placedStudents.map(r => r.package);
    const averagePackage = packages.length > 0 ? packages.reduce((sum, p) => sum + p, 0) / packages.length : 0;
    const sortedPackages = [...packages].sort((a, b) => a - b);
    const medianPackage = sortedPackages.length > 0 ? 
      sortedPackages.length % 2 === 0 
        ? (sortedPackages[sortedPackages.length / 2 - 1] + sortedPackages[sortedPackages.length / 2]) / 2
        : sortedPackages[Math.floor(sortedPackages.length / 2)] : 0;

    const departments = placedStudents.reduce((acc, student) => {
      const dept = student.department;
      if (!acc[dept]) acc[dept] = { placed: 0, total: 70 }; // Assuming 70 students per department
      acc[dept].placed++;
      return acc;
    }, {} as { [key: string]: { placed: number; total: number } });

    Object.keys(departments).forEach(dept => {
      departments[dept].percentage = (departments[dept].placed / departments[dept].total) * 100;
    });

    const packageRanges = {
      '0-5L': packages.filter(p => p < 500000).length,
      '5-10L': packages.filter(p => p >= 500000 && p < 1000000).length,
      '10-20L': packages.filter(p => p >= 1000000 && p < 2000000).length,
      '20L+': packages.filter(p => p >= 2000000).length,
    };

    const companyCounts = placedStudents.reduce((acc, student) => {
      acc[student.company] = (acc[student.company] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const topCompanies = Object.entries(companyCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([company]) => company);

    return {
      totalPlacements: placedStudents.length,
      placementPercentage: (placedStudents.length / totalStudents) * 100,
      averagePackage,
      highestPackage: Math.max(...packages, 0),
      medianPackage,
      totalCompanies: new Set(placedStudents.map(r => r.company)).size,
      departmentWise: departments,
      packageRanges,
      topCompanies,
      growthRate: 15.2, // Mock growth rate
      previousYearComparison: {
        placements: 198,
        companies: 45,
        averagePackage: 1850000
      }
    };
  }, [placementResults]);

  // Filter and sort results
  const filteredResults = useMemo(() => {
    let filtered = placementResults.filter(result => {
      const matchesSearch = filters.search === '' || 
        result.studentName.toLowerCase().includes(filters.search.toLowerCase()) ||
        result.rollNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
        result.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        result.position.toLowerCase().includes(filters.search.toLowerCase());

      const matchesDepartment = filters.department === 'all' || result.department === filters.department;
      const matchesCompany = filters.company === 'all' || result.company === filters.company;
      const matchesPackage = result.package >= filters.packageRange.min && result.package <= filters.packageRange.max;
      const matchesCGPA = result.cgpa >= filters.cgpaRange.min && result.cgpa <= filters.cgpaRange.max;
      const matchesStatus = filters.status === 'all' || result.status === filters.status;
      const matchesOfferType = filters.offerType === 'all' || result.offerType === filters.offerType;
      const matchesLocation = filters.location === 'all' || result.location.toLowerCase().includes(filters.location.toLowerCase());

      return matchesSearch && matchesDepartment && matchesCompany && matchesPackage && 
             matchesCGPA && matchesStatus && matchesOfferType && matchesLocation;
    });

    // Sort results
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return filtered;
  }, [placementResults, filters, sortConfig]);

  // Event handlers
  const handleSort = useCallback((key: keyof PlacementResult) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  }, []);

  const handleViewStudent = useCallback((student: PlacementResult) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  }, []);

  const handleViewCompany = useCallback((company: CompanyStats) => {
    setSelectedCompany(company);
    setShowCompanyModal(true);
  }, []);

  const handleExportData = useCallback((format: 'pdf' | 'excel' | 'csv') => {
    setIsLoading(true);
    
    setTimeout(() => {
      const data = {
        format,
        timestamp: new Date().toISOString(),
        totalRecords: filteredResults.length,
        results: filteredResults,
        analytics
      };

      console.log(`Exporting data as ${format.toUpperCase()}:`, data);
      
      // Simulate file download
      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `Placement_Results_${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xlsx' : format}`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      setIsLoading(false);
      setShowExportOptions(false);
      showToast('success', 'Export Complete', `Data exported as ${format.toUpperCase()} successfully`);
    }, 2000);
  }, [filteredResults, analytics, showToast]);

  const handlePrintResults = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Placement Results Report</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
                .stat-card { border: 1px solid #ddd; padding: 15px; border-radius: 5px; text-align: center; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f5f5f5; }
                @media print { .no-print { display: none; } }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>College Placement Results 2025</h1>
                <p>Generated on: ${new Date().toLocaleDateString()}</p>
              </div>
              
              <div class="stats">
                <div class="stat-card">
                  <h3>Total Placements</h3>
                  <p>${analytics.totalPlacements}</p>
                </div>
                <div class="stat-card">
                  <h3>Placement %</h3>
                  <p>${analytics.placementPercentage.toFixed(1)}%</p>
                </div>
                <div class="stat-card">
                  <h3>Average Package</h3>
                  <p>₹${(analytics.averagePackage / 100000).toFixed(1)}L</p>
                </div>
                <div class="stat-card">
                  <h3>Highest Package</h3>
                  <p>₹${(analytics.highestPackage / 100000).toFixed(1)}L</p>
                </div>
              </div>
              
              <table>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Department</th>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Package</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${filteredResults.map(result => `
                    <tr>
                      <td>${result.studentName}</td>
                      <td>${result.department}</td>
                      <td>${result.company}</td>
                      <td>${result.position}</td>
                      <td>₹${(result.package / 100000).toFixed(1)}L</td>
                      <td>${result.location}</td>
                      <td>${result.status}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      }
      
      setIsLoading(false);
      showToast('success', 'Print Ready', 'Print preview opened successfully');
    }, 1000);
  }, [filteredResults, analytics, showToast]);

  const handleShareResults = useCallback(() => {
    const shareText = `🎓 Placement Results 2025

📊 Total Placements: ${analytics.totalPlacements}
📈 Placement Rate: ${analytics.placementPercentage.toFixed(1)}%
💰 Average Package: ₹${(analytics.averagePackage / 100000).toFixed(1)}L
🏆 Highest Package: ₹${(analytics.highestPackage / 100000).toFixed(1)}L
🏢 Total Companies: ${analytics.totalCompanies}

Excellence in placements continues! 🚀`;

    if (navigator.share) {
      navigator.share({
        title: 'Placement Results 2025',
        text: shareText,
        url: window.location.href
      }).then(() => {
        showToast('success', 'Shared Successfully', 'Results shared successfully');
      }).catch(() => {
        navigator.clipboard.writeText(shareText);
        showToast('success', 'Copied to Clipboard', 'Results copied to clipboard');
      });
    } else {
      navigator.clipboard.writeText(shareText);
      showToast('success', 'Copied to Clipboard', 'Results copied to clipboard');
    }
  }, [analytics, showToast]);

  const handleContactHR = useCallback((hrContact: PlacementResult['hrContact'], company: string) => {
    const message = `Subject: Regarding Placement - ${company}

Dear ${hrContact.name},

I hope this email finds you well. I am writing to inquire about the placement process and next steps.

Best regards,
[Your Name]`;

    window.open(`mailto:${hrContact.email}?subject=Regarding Placement - ${company}&body=${encodeURIComponent(message)}`);
    showToast('success', 'Email Opened', `Compose email to ${hrContact.name} opened`);
  }, [showToast]);

  const clearAllFilters = useCallback(() => {
    setFilters({
      search: '',
      department: 'all',
      company: 'all',
      packageRange: { min: 0, max: 5000000 },
      cgpaRange: { min: 0, max: 10 },
      status: 'all',
      offerType: 'all',
      location: 'all',
      dateRange: { start: '', end: '' }
    });
    showToast('success', 'Filters Cleared', 'All filters have been reset');
  }, [showToast]);

  const refreshData = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Simulate data refresh
      const updatedResults = placementResults.map(result => ({
        ...result,
        // Add small random variation to simulate updates
        package: result.package + Math.floor((Math.random() - 0.5) * 50000)
      }));
      
      setPlacementResults(updatedResults);
      setIsLoading(false);
      showToast('success', 'Data Refreshed', 'Latest placement data loaded successfully');
    }, 2000);
  }, [placementResults, showToast]);

  // Utility functions
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Placed': 'bg-green-100 text-green-800 border-green-200',
      'Selected': 'bg-blue-100 text-blue-800 border-blue-200',
      'Offer-Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Joined': 'bg-purple-100 text-purple-800 border-purple-200',
      'Declined': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPackageColor = (packageAmount: number) => {
    if (packageAmount >= 2500000) return 'text-green-600 font-bold';
    if (packageAmount >= 1500000) return 'text-blue-600 font-semibold';
    if (packageAmount >= 800000) return 'text-yellow-600 font-medium';
    return 'text-gray-600';
  };

  const getDepartmentAbbreviation = (department: string) => {
    const abbreviations: { [key: string]: string } = {
      'Computer Science Engineering': 'CSE',
      'Electronics & Communication Engineering': 'ECE',
      'Mechanical Engineering': 'ME',
      'Civil Engineering': 'CE',
      'Information Technology': 'IT',
      'Electrical Engineering': 'EE'
    };
    return abbreviations[department] || department.substring(0, 3).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Toast Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg max-w-sm transition-all transform ${
                toast.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                toast.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
                toast.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                'bg-blue-100 text-blue-800 border border-blue-200'
              }`}
            >
              <div className="flex-1">
                <div className="font-medium text-sm">{toast.title}</div>
                <div className="text-xs mt-1">{toast.message}</div>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Placement Results 2025</h1>
              <p className="text-gray-600 mt-1">Comprehensive placement statistics and student results</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <RefreshCwIcon size={20} className={isLoading ? 'animate-spin' : ''} />
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowExportOptions(!showExportOptions)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <DownloadIcon size={20} />
                  Export
                </button>
                
                {showExportOptions && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-2">
                      <button
                        onClick={() => handleExportData('pdf')}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-sm flex items-center gap-2"
                      >
                        <FileTextIcon size={16} />
                        Export as PDF
                      </button>
                      <button
                        onClick={() => handleExportData('excel')}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-sm flex items-center gap-2"
                      >
                        <BarChart3Icon size={16} />
                        Export as Excel
                      </button>
                      <button
                        onClick={() => handleExportData('csv')}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-sm flex items-center gap-2"
                      >
                        <FileTextIcon size={16} />
                        Export as CSV
                      </button>
                      <hr className="my-2" />
                      <button
                        onClick={handlePrintResults}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-sm flex items-center gap-2"
                      >
                        <PrinterIcon size={16} />
                        Print Report
                      </button>
                      <button
                        onClick={handleShareResults}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-sm flex items-center gap-2"
                      >
                        <ShareIcon size={16} />
                        Share Results
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
            {[
              { key: 'overview', label: 'Overview', icon: BarChart3Icon },
              { key: 'students', label: 'Students', icon: UserIcon },
              { key: 'companies', label: 'Companies', icon: BuildingIcon },
              { key: 'analytics', label: 'Analytics', icon: PieChartIcon }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedView(key as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedView === key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Placements</p>
                  <p className="text-2xl font-bold text-blue-900">{analytics.totalPlacements}</p>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUpIcon size={12} />
                    <span>+{analytics.growthRate}%</span>
                  </div>
                </div>
                <AwardIcon className="text-blue-600" size={24} />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Placement Rate</p>
                  <p className="text-2xl font-bold text-green-900">{analytics.placementPercentage.toFixed(1)}%</p>
                  <p className="text-xs text-green-700">Target: 85%</p>
                </div>
                <TargetIcon className="text-green-600" size={24} />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Avg Package</p>
                  <p className="text-2xl font-bold text-purple-900">{formatCurrency(analytics.averagePackage)}</p>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <ArrowUpIcon size={12} />
                    <span>+12%</span>
                  </div>
                </div>
                <DollarSignIcon className="text-purple-600" size={24} />
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Highest Package</p>
                  <p className="text-2xl font-bold text-yellow-900">{formatCurrency(analytics.highestPackage)}</p>
                  <p className="text-xs text-yellow-700">Google</p>
                </div>
                <StarIcon className="text-yellow-600" size={24} />
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 text-sm font-medium">Companies</p>
                  <p className="text-2xl font-bold text-indigo-900">{analytics.totalCompanies}</p>
                  <p className="text-xs text-indigo-700">Visited: 67</p>
                </div>
                <BuildingIcon className="text-indigo-600" size={24} />
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">Median Package</p>
                  <p className="text-2xl font-bold text-red-900">{formatCurrency(analytics.medianPackage)}</p>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUpIcon size={12} />
                    <span>+8%</span>
                  </div>
                </div>
                <TriangleRightIcon className="text-red-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Content Based on Selected View */}
        {selectedView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department-wise Placement */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Placements</h3>
              <div className="space-y-4">
                {Object.entries(analytics.departmentWise).map(([dept, stats]) => (
                  <div key={dept} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{getDepartmentAbbreviation(dept)}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{stats.placed}/{stats.total}</span>
                        <span className="text-sm font-semibold text-gray-900">{stats.percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          stats.percentage >= 80 ? 'bg-green-500' :
                          stats.percentage >= 60 ? 'bg-blue-500' :
                          stats.percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${stats.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Package Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Distribution</h3>
              <div className="space-y-4">
                {Object.entries(analytics.packageRanges).map(([range, count]) => (
                  <div key={range} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${
                        range === '20L+' ? 'bg-green-500' :
                        range === '10-20L' ? 'bg-blue-500' :
                        range === '5-10L' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}></div>
                      <span className="text-sm text-gray-700">{range}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                      <span className="text-xs text-gray-500">
                        ({((count / analytics.totalPlacements) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Companies */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Recruiting Companies</h3>
              <div className="space-y-3">
                {analytics.topCompanies.map((company, index) => {
                  const companyData = companyStats.find(c => c.companyName === company);
                  return (
                    <div key={company} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{companyData?.logo || '🏢'}</span>
                        <div>
                          <div className="font-medium text-gray-900">{company}</div>
                          <div className="text-xs text-gray-600">
                            Avg: {companyData ? formatCurrency(companyData.averagePackage) : 'N/A'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">#{index + 1}</div>
                        <div className="text-xs text-gray-600">
                          {companyData?.totalHired || 0} hired
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Placements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Placements</h3>
                <button
                  onClick={() => setSelectedView('students')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {placementResults.slice(0, 5).map(result => (
                  <div key={result.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <UserIcon size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{result.studentName}</div>
                        <div className="text-xs text-gray-600">{result.company} • {result.position}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${getPackageColor(result.package)}`}>
                        {formatCurrency(result.package)}
                      </div>
                      <div className="text-xs text-gray-600">{result.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'students' && (
          <div>
            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by name, roll number, company, or position..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={filters.department}
                    onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Departments</option>
                    <option value="Computer Science Engineering">CSE</option>
                    <option value="Electronics & Communication Engineering">ECE</option>
                    <option value="Mechanical Engineering">ME</option>
                    <option value="Civil Engineering">CE</option>
                  </select>
                  
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="Placed">Placed</option>
                    <option value="Selected">Selected</option>
                    <option value="Joined">Joined</option>
                    <option value="Offer-Pending">Offer Pending</option>
                  </select>
                  
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                  >
                    <FilterIcon size={16} />
                  </button>
                </div>
              </div>
              
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Package Range</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.packageRange.min || ''}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          packageRange: { ...prev.packageRange, min: Number(e.target.value) || 0 }
                        }))}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.packageRange.max === 5000000 ? '' : filters.packageRange.max}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          packageRange: { ...prev.packageRange, max: Number(e.target.value) || 5000000 }
                        }))}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CGPA Range</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        min="0"
                        max="10"
                        step="0.1"
                        value={filters.cgpaRange.min || ''}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          cgpaRange: { ...prev.cgpaRange, min: Number(e.target.value) || 0 }
                        }))}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        min="0"
                        max="10"
                        step="0.1"
                        value={filters.cgpaRange.max === 10 ? '' : filters.cgpaRange.max}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          cgpaRange: { ...prev.cgpaRange, max: Number(e.target.value) || 10 }
                        }))}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      onClick={clearAllFilters}
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">
                  Showing {filteredResults.length} of {placementResults.length} students
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortConfig.key}
                    onChange={(e) => handleSort(e.target.value as keyof PlacementResult)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="package">Package</option>
                    <option value="cgpa">CGPA</option>
                    <option value="studentName">Name</option>
                    <option value="company">Company</option>
                    <option value="offerDate">Offer Date</option>
                  </select>
                  <button
                    onClick={() => handleSort(sortConfig.key)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    {sortConfig.direction === 'asc' ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Students Results Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Student</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Package</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredResults.map(result => (
                      <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <UserIcon size={16} className="text-gray-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{result.studentName}</div>
                              <div className="text-sm text-gray-600">{result.rollNumber}</div>
                              <div className="text-xs text-gray-500">CGPA: {result.cgpa}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {getDepartmentAbbreviation(result.department)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{result.companyLogo}</span>
                            <div>
                              <div className="font-medium text-gray-900">{result.company}</div>
                              <div className="text-sm text-gray-600">{result.position}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className={`font-semibold ${getPackageColor(result.package)}`}>
                            {formatCurrency(result.package)}
                          </div>
                          <div className="text-xs text-gray-500">{result.packageType}</div>
                          {result.isHighestPackage && (
                            <div className="flex items-center gap-1 text-xs text-yellow-600 mt-1">
                              <StarIcon size={10} className="fill-current" />
                              <span>Highest</span>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPinIcon size={12} />
                            <span>{result.location}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Joining: {new Date(result.joiningDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(result.status)}`}>
                            {result.status}
                          </span>
                          {result.offerType !== 'Full-time' && (
                            <div className="text-xs text-gray-500 mt-1">{result.offerType}</div>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewStudent(result)}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <EyeIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleContactHR(result.hrContact, result.company)}
                              className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors"
                              title="Contact HR"
                            >
                              <MailIcon size={16} />
                            </button>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(`${result.studentName} - ${result.company} - ${formatCurrency(result.package)}`);
                                showToast('success', 'Copied', 'Student details copied to clipboard');
                              }}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors"
                              title="Copy Details"
                            >
                              <CopyIcon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredResults.length === 0 && (
                <div className="text-center py-12">
                  <UserIcon className="mx-auto text-gray-300 mb-4" size={64} />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                  <p className="text-gray-600">
                    {filters.search || filters.department !== 'all' || filters.status !== 'all'
                      ? 'Try adjusting your search criteria or filters'
                      : 'No placement results available'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedView === 'companies' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {companyStats.map(company => (
              <div key={company.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{company.logo}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{company.companyName}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <StarIcon size={14} className="text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{company.rating}</span>
                        <span className="text-xs text-gray-500">({company.feedback} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewCompany(company)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                  >
                    <EyeIcon size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center bg-blue-50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-blue-900">{company.totalHired}</div>
                    <div className="text-xs text-blue-600">Students Hired</div>
                  </div>
                  <div className="text-center bg-green-50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-green-900">{company.selectionRate.toFixed(1)}%</div>
                    <div className="text-xs text-green-600">Selection Rate</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Average Package:</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(company.averagePackage)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Highest Package:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(company.highestPackage)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Applications:</span>
                    <span className="font-medium text-gray-900">{company.totalApplications}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm font-medium text-gray-700 mb-2">Positions:</div>
                  <div className="flex flex-wrap gap-1">
                    {company.positions.slice(0, 3).map((position, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {position}
                      </span>
                    ))}
                    {company.positions.length > 3 && (
                      <span className="text-xs text-gray-500">+{company.positions.length - 3} more</span>
                    )}
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-sm font-medium text-gray-700 mb-2">Locations:</div>
                  <div className="flex flex-wrap gap-1">
                    {company.locations.slice(0, 2).map((location, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        {location}
                      </span>
                    ))}
                    {company.locations.length > 2 && (
                      <span className="text-xs text-gray-500">+{company.locations.length - 2} more</span>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    Visit Date: {new Date(company.visitDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedView === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Yearly Comparison */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-over-Year Comparison</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium text-blue-900">Total Placements</div>
                    <div className="text-sm text-blue-700">Current vs Previous Year</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-900">{analytics.totalPlacements}</div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUpIcon size={14} />
                      <span>+{analytics.totalPlacements - analytics.previousYearComparison.placements}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-green-900">Average Package</div>
                    <div className="text-sm text-green-700">Growth in compensation</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-900">{formatCurrency(analytics.averagePackage)}</div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <ArrowUpIcon size={14} />
                      <span>+{formatCurrency(analytics.averagePackage - analytics.previousYearComparison.averagePackage)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div>
                    <div className="font-medium text-purple-900">Companies Visited</div>
                    <div className="text-sm text-purple-700">Industry participation</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-purple-900">{analytics.totalCompanies}</div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUpIcon size={14} />
                      <span>+{analytics.totalCompanies - analytics.previousYearComparison.companies}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Placement Success Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${analytics.placementPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{analytics.placementPercentage.toFixed(1)}%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Package Growth Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <span className="text-sm font-semibold text-green-600">+15.2%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Premium Placements (20L)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full w-1/3"></div>
                    </div>
                    <span className="text-sm font-semibold">
                      {analytics.packageRanges['20L+']} ({((analytics.packageRanges['20L+'] / analytics.totalPlacements) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Industry Diversity</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-5/6"></div>
                    </div>
                    <span className="text-sm font-semibold">{analytics.totalCompanies} sectors</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Highlights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUpIcon className="text-green-600" size={20} />
                    <span className="font-medium text-green-900">Record Breaking</span>
                  </div>
                  <p className="text-sm text-green-800">
                    Highest placement rate in college history at {analytics.placementPercentage.toFixed(1)}%
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <StarIcon className="text-blue-600" size={20} />
                    <span className="font-medium text-blue-900">Top Package</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    Secured {formatCurrency(analytics.highestPackage)} from Google - new record!
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <BuildingIcon className="text-purple-600" size={20} />
                    <span className="font-medium text-purple-900">Industry Leaders</span>
                  </div>
                  <p className="text-sm text-purple-800">
                    {analytics.totalCompanies} top companies including FAANG and unicorns
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AwardIcon className="text-yellow-600" size={20} />
                    <span className="font-medium text-yellow-900">Growth</span>
                  </div>
                  <p className="text-sm text-yellow-800">
                    {analytics.growthRate}% increase in average package year-over-year
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Student Detail Modal */}
        {showDetailModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedStudent.studentName}</h2>
                    <p className="text-gray-600">{selectedStudent.rollNumber} • {selectedStudent.company}</p>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XIcon size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedStudent.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{selectedStudent.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Department:</span>
                        <span className="font-medium">{selectedStudent.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">CGPA:</span>
                        <span className="font-bold text-blue-600">{selectedStudent.cgpa}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Placement Details */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Placement Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Company:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{selectedStudent.companyLogo}</span>
                          <span className="font-medium">{selectedStudent.company}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Position:</span>
                        <span className="font-medium">{selectedStudent.position}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Package:</span>
                        <span className={`font-bold ${getPackageColor(selectedStudent.package)}`}>
                          {formatCurrency(selectedStudent.package)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{selectedStudent.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Joining Date:</span>
                        <span className="font-medium">{new Date(selectedStudent.joiningDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Skills */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Projects */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Projects</h3>
                  <div className="space-y-2">
                    {selectedStudent.projects.map((project, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{project}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* HR Contact */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">HR Contact</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{selectedStudent.hrContact.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedStudent.hrContact.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{selectedStudent.hrContact.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Feedback */}
                {selectedStudent.feedback && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Interview Feedback</h3>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <p className="text-green-800">{selectedStudent.feedback}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleContactHR(selectedStudent.hrContact, selectedStudent.company)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <MailIcon size={16} />
                    Contact HR
                  </button>
                  <button
                    onClick={() => {
                      const studentData = JSON.stringify(selectedStudent, null, 2);
                      navigator.clipboard.writeText(studentData);
                      showToast('success', 'Copied', 'Student details copied to clipboard');
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <CopyIcon size={16} />
                    Copy Details
                  </button>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Company Detail Modal */}
        {showCompanyModal && selectedCompany && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedCompany.logo}</span>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedCompany.companyName}</h2>
                      <div className="flex items-center gap-1">
                        <StarIcon size={14} className="text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{selectedCompany.rating} ({selectedCompany.feedback} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCompanyModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XIcon size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-900">{selectedCompany.totalHired}</div>
                    <div className="text-sm text-blue-600">Students Hired</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-900">{selectedCompany.selectionRate.toFixed(1)}%</div>
                    <div className="text-sm text-green-600">Selection Rate</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-900">{selectedCompany.totalApplications}</div>
                    <div className="text-sm text-purple-600">Total Applications</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Package Information */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Package Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Package:</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(selectedCompany.averagePackage)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Highest Package:</span>
                        <span className="font-semibold text-green-600">{formatCurrency(selectedCompany.highestPackage)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lowest Package:</span>
                        <span className="font-semibold text-red-600">{formatCurrency(selectedCompany.lowestPackage)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Visit Information */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Visit Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Visit Date:</span>
                        <span className="font-medium">{new Date(selectedCompany.visitDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Applications:</span>
                        <span className="font-medium">{selectedCompany.totalApplications}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Selection Rate:</span>
                        <span className="font-bold text-green-600">{selectedCompany.selectionRate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Positions */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Available Positions</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.positions.map((position, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium">
                        {position}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Locations */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Office Locations</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.locations.map((location, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
                        <MapPinIcon size={14} className="inline mr-1" />
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Department-wise Distribution */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Department-wise Hiring</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedCompany.department).map(([dept, count]) => (
                      <div key={dept} className="flex items-center justify-between">
                        <span className="text-gray-700">{dept}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(count / selectedCompany.totalHired) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Interview Rounds */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Interview Process</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.rounds.map((round, index) => (
                      <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {index + 1}
                        </span>
                        <span className="text-sm text-gray-700">{round}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const companyData = JSON.stringify(selectedCompany, null, 2);
                      navigator.clipboard.writeText(companyData);
                      showToast('success', 'Copied', 'Company details copied to clipboard');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <CopyIcon size={16} />
                    Copy Details
                  </button>
                  <button
                    onClick={() => {
                      const shareText = `${selectedCompany.companyName} Placement Stats:
                      
🏢 Hired: ${selectedCompany.totalHired} students
💰 Average Package: ${formatCurrency(selectedCompany.averagePackage)}
🎯 Selection Rate: ${selectedCompany.selectionRate.toFixed(1)}%
⭐ Rating: ${selectedCompany.rating}/5`;
                      
                      navigator.clipboard.writeText(shareText);
                      showToast('success', 'Copied', 'Company stats copied to clipboard');
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <ShareIcon size={16} />
                    Share Stats
                  </button>
                  <button
                    onClick={() => setShowCompanyModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <RefreshCwIcon size={20} className="animate-spin text-blue-600" />
                <span className="text-gray-900">Processing...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPlacementResult;
