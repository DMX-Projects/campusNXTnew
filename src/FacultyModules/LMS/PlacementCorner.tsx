import React, { useState, useEffect } from 'react';
import { 
  TrendingUpIcon, 
  UsersIcon, 
  BuildingIcon, 
  DollarSignIcon,
  PlusIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  CalendarIcon,
  DownloadIcon,
  BellIcon,
  BookOpenIcon,
  BarChart3Icon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  GraduationCapIcon,
  StarIcon,
  AwardIcon,
  UserIcon
} from 'lucide-react';

interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  positions: number;
  package: string;
  eligibility: string[];
  visitDate: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  registeredStudents: number;
  selectedStudents: number;
  description: string;
  requirements: string[];
  location: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  jobType: 'full-time' | 'internship' | 'both';
  selectionProcess: string[];
  createdAt: string;
  updatedAt: string;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  cgpa: number;
  email: string;
  phone: string;
  skills: string[];
  resume: string;
  status: 'registered' | 'shortlisted' | 'selected' | 'rejected';
  companyId: string;
}

interface PlacementStats {
  totalCompanies: number;
  studentsPlaced: number;
  averagePackage: string;
  placementRate: number;
  highestPackage: string;
  totalOffers: number;
}

interface NewCompany {
  name: string;
  industry: string;
  positions: number;
  package: string;
  eligibility: string[];
  visitDate: string;
  description: string;
  requirements: string[];
  location: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  jobType: 'full-time' | 'internship' | 'both';
  selectionProcess: string[];
}

const PlacementCorner: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: '1',
      name: 'Google',
      logo: '🟢',
      industry: 'Technology',
      positions: 25,
      package: '₹35-45 LPA',
      eligibility: ['CSE', 'IT', 'ECE'],
      visitDate: '2025-09-15',
      status: 'upcoming',
      registeredStudents: 180,
      selectedStudents: 0,
      description: 'Leading technology company focusing on internet-related services and products',
      requirements: ['Strong programming skills', 'Problem-solving abilities', 'Team collaboration'],
      location: 'Bangalore, India',
      contactPerson: 'Rahul Sharma',
      email: 'rahul.sharma@google.com',
      phone: '+91-9876543210',
      website: 'https://careers.google.com',
      jobType: 'full-time',
      selectionProcess: ['Online Test', 'Technical Interview', 'HR Interview'],
      createdAt: '2025-08-01T10:00:00Z',
      updatedAt: '2025-09-01T14:30:00Z'
    },
    {
      id: '2',
      name: 'Microsoft',
      logo: '🔵',
      industry: 'Technology',
      positions: 20,
      package: '₹28-38 LPA',
      eligibility: ['CSE', 'IT'],
      visitDate: '2025-09-10',
      status: 'ongoing',
      registeredStudents: 156,
      selectedStudents: 8,
      description: 'Multinational technology corporation producing computer software and services',
      requirements: ['Strong coding skills', 'System design knowledge', 'Communication skills'],
      location: 'Hyderabad, India',
      contactPerson: 'Priya Singh',
      email: 'priya.singh@microsoft.com',
      phone: '+91-9876543211',
      website: 'https://careers.microsoft.com',
      jobType: 'full-time',
      selectionProcess: ['Coding Round', 'Technical Interview', 'System Design', 'HR Round'],
      createdAt: '2025-07-15T09:00:00Z',
      updatedAt: '2025-09-02T11:20:00Z'
    },
    {
      id: '3',
      name: 'Tata Consultancy Services',
      logo: '🔷',
      industry: 'IT Services',
      positions: 50,
      package: '₹3.5-7 LPA',
      eligibility: ['All Branches'],
      visitDate: '2025-08-28',
      status: 'completed',
      registeredStudents: 320,
      selectedStudents: 45,
      description: 'Indian multinational information technology services and consulting company',
      requirements: ['Basic programming knowledge', 'Good communication', 'Adaptability'],
      location: 'Mumbai, India',
      contactPerson: 'Amit Kumar',
      email: 'amit.kumar@tcs.com',
      phone: '+91-9876543212',
      website: 'https://careers.tcs.com',
      jobType: 'full-time',
      selectionProcess: ['Aptitude Test', 'Technical Interview', 'HR Interview'],
      createdAt: '2025-07-01T08:00:00Z',
      updatedAt: '2025-08-28T16:45:00Z'
    },
    {
      id: '4',
      name: 'Amazon',
      logo: '🟠',
      industry: 'E-commerce',
      positions: 15,
      package: '₹42-55 LPA',
      eligibility: ['CSE', 'IT'],
      visitDate: '2025-09-20',
      status: 'upcoming',
      registeredStudents: 98,
      selectedStudents: 0,
      description: 'American multinational technology company focusing on e-commerce and cloud computing',
      requirements: ['Strong algorithms knowledge', 'System design skills', 'Leadership principles'],
      location: 'Chennai, India',
      contactPerson: 'Neha Gupta',
      email: 'neha.gupta@amazon.com',
      phone: '+91-9876543213',
      website: 'https://amazon.jobs',
      jobType: 'full-time',
      selectionProcess: ['Online Assessment', 'Technical Interview', 'Bar Raiser Interview'],
      createdAt: '2025-08-15T12:00:00Z',
      updatedAt: '2025-09-01T10:15:00Z'
    }
  ]);

  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      rollNumber: 'CSE2021001',
      department: 'CSE',
      cgpa: 9.2,
      email: 'rajesh.kumar@college.edu',
      phone: '+91-9876543214',
      skills: ['Java', 'Python', 'React', 'AWS'],
      resume: 'rajesh_kumar_resume.pdf',
      status: 'selected',
      companyId: '1'
    },
    {
      id: '2',
      name: 'Priya Singh',
      rollNumber: 'IT2021002',
      department: 'IT',
      cgpa: 8.8,
      email: 'priya.singh@college.edu',
      phone: '+91-9876543215',
      skills: ['JavaScript', 'Node.js', 'MongoDB', 'Docker'],
      resume: 'priya_singh_resume.pdf',
      status: 'selected',
      companyId: '2'
    }
  ]);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'visitDate' | 'package' | 'positions'>('visitDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Modal states
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [isEditCompanyModalOpen, setIsEditCompanyModalOpen] = useState(false);
  const [isViewCompanyModalOpen, setIsViewCompanyModalOpen] = useState(false);
  const [isDeleteCompanyModalOpen, setIsDeleteCompanyModalOpen] = useState(false);
  const [isStudentListModalOpen, setIsStudentListModalOpen] = useState(false);
  const [isScheduleDriveModalOpen, setIsScheduleDriveModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Form and selected data states
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [newCompany, setNewCompany] = useState<NewCompany>({
    name: '',
    industry: '',
    positions: 1,
    package: '',
    eligibility: [],
    visitDate: '',
    description: '',
    requirements: [],
    location: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    jobType: 'full-time',
    selectionProcess: []
  });

  // Input helpers
  const [eligibilityInput, setEligibilityInput] = useState('');
  const [requirementInput, setRequirementInput] = useState('');
  const [processInput, setProcessInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(companies);

  const departments = ['CSE', 'IT', 'ECE', 'ME', 'CE', 'EE'];
  const industries = Array.from(new Set(companies.map(c => c.industry)));
  const statuses = ['upcoming', 'ongoing', 'completed', 'cancelled'];
  const jobTypes = ['full-time', 'internship', 'both'];

  // Filter and sort companies
  useEffect(() => {
    let filtered = companies;

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(term) ||
        c.industry.toLowerCase().includes(term) ||
        c.location.toLowerCase().includes(term) ||
        c.contactPerson.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    if (selectedStatus !== 'all') filtered = filtered.filter(c => c.status === selectedStatus);
    if (selectedIndustry !== 'all') filtered = filtered.filter(c => c.industry === selectedIndustry);
    if (selectedJobType !== 'all') filtered = filtered.filter(c => c.jobType === selectedJobType);

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'visitDate':
          comparison = new Date(a.visitDate).getTime() - new Date(b.visitDate).getTime();
          break;
        case 'positions':
          comparison = a.positions - b.positions;
          break;
        case 'package':
          // Simple package comparison (extract first number)
          { const aPackage = parseInt(a.package.match(/\d+/)?.[0] || '0');
          const bPackage = parseInt(b.package.match(/\d+/)?.[0] || '0');
          comparison = aPackage - bPackage;
          break; }
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredCompanies(filtered);
  }, [searchTerm, selectedStatus, selectedIndustry, selectedJobType, sortBy, sortOrder, companies]);

  // Helper functions
  const getStatusColor = (status: string) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
      ongoing: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-gray-100 text-gray-800 border-gray-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors];
  };

  const getJobTypeColor = (jobType: string) => {
    const colors = {
      'full-time': 'bg-green-100 text-green-800',
      'internship': 'bg-blue-100 text-blue-800',
      'both': 'bg-purple-100 text-purple-800'
    };
    return colors[jobType as keyof typeof colors];
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // CRUD Operations
  const handleAddCompany = () => {
    if (!newCompany.name || !newCompany.visitDate || !newCompany.contactPerson) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const company: Company = {
        ...newCompany,
        id: Date.now().toString(),
        logo: '🏢',
        status: 'upcoming',
        registeredStudents: 0,
        selectedStudents: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setCompanies([...companies, company]);
      resetForm();
      setIsAddCompanyModalOpen(false);
      setLoading(false);
      alert('Company added successfully!');
    }, 500);
  };

  const handleEditCompany = () => {
    if (!editingCompany) return;

    setLoading(true);
    setTimeout(() => {
      const updatedCompanies = companies.map(c =>
        c.id === editingCompany.id
          ? {
              ...editingCompany,
              updatedAt: new Date().toISOString()
            }
          : c
      );

      setCompanies(updatedCompanies);
      setIsEditCompanyModalOpen(false);
      setEditingCompany(null);
      setLoading(false);
      alert('Company updated successfully!');
    }, 500);
  };

  const handleDeleteCompany = () => {
    if (!selectedCompany) return;

    setLoading(true);
    setTimeout(() => {
      setCompanies(companies.filter(c => c.id !== selectedCompany.id));
      setIsDeleteCompanyModalOpen(false);
      setSelectedCompany(null);
      setLoading(false);
      alert('Company deleted successfully!');
    }, 500);
  };

  const resetForm = () => {
    setNewCompany({
      name: '',
      industry: '',
      positions: 1,
      package: '',
      eligibility: [],
      visitDate: '',
      description: '',
      requirements: [],
      location: '',
      contactPerson: '',
      email: '',
      phone: '',
      website: '',
      jobType: 'full-time',
      selectionProcess: []
    });
    setEligibilityInput('');
    setRequirementInput('');
    setProcessInput('');
  };

  const addEligibility = () => {
    if (eligibilityInput.trim() && !newCompany.eligibility.includes(eligibilityInput.trim())) {
      setNewCompany({
        ...newCompany,
        eligibility: [...newCompany.eligibility, eligibilityInput.trim()]
      });
      setEligibilityInput('');
    }
  };

  const removeEligibility = (item: string) => {
    setNewCompany({
      ...newCompany,
      eligibility: newCompany.eligibility.filter(e => e !== item)
    });
  };

  const addRequirement = () => {
    if (requirementInput.trim() && !newCompany.requirements.includes(requirementInput.trim())) {
      setNewCompany({
        ...newCompany,
        requirements: [...newCompany.requirements, requirementInput.trim()]
      });
      setRequirementInput('');
    }
  };

  const removeRequirement = (item: string) => {
    setNewCompany({
      ...newCompany,
      requirements: newCompany.requirements.filter(r => r !== item)
    });
  };

  const addProcess = () => {
    if (processInput.trim() && !newCompany.selectionProcess.includes(processInput.trim())) {
      setNewCompany({
        ...newCompany,
        selectionProcess: [...newCompany.selectionProcess, processInput.trim()]
      });
      setProcessInput('');
    }
  };

  const removeProcess = (item: string) => {
    setNewCompany({
      ...newCompany,
      selectionProcess: newCompany.selectionProcess.filter(p => p !== item)
    });
  };

  const openEditModal = (company: Company) => {
    setEditingCompany(company);
    setNewCompany({
      name: company.name,
      industry: company.industry,
      positions: company.positions,
      package: company.package,
      eligibility: company.eligibility,
      visitDate: company.visitDate,
      description: company.description,
      requirements: company.requirements,
      location: company.location,
      contactPerson: company.contactPerson,
      email: company.email,
      phone: company.phone,
      website: company.website,
      jobType: company.jobType,
      selectionProcess: company.selectionProcess
    });
    setIsEditCompanyModalOpen(true);
  };

  const openDeleteModal = (company: Company) => {
    setSelectedCompany(company);
    setIsDeleteCompanyModalOpen(true);
  };

  const openViewModal = (company: Company) => {
    setSelectedCompany(company);
    setIsViewCompanyModalOpen(true);
  };

  const openStudentListModal = (company: Company) => {
    setSelectedCompany(company);
    setIsStudentListModalOpen(true);
  };

  const sendNotifications = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (company) {
      alert(`Notifications sent to all eligible students for ${company.name}!`);
    }
  };

  const exportReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Company,Industry,Positions,Package,Status,Visit Date,Registered,Selected\n" +
      filteredCompanies.map(c => 
        `"${c.name}","${c.industry}",${c.positions},"${c.package}","${c.status}","${c.visitDate}",${c.registeredStudents},${c.selectedStudents}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "placement_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedIndustry('all');
    setSelectedJobType('all');
  };

  // Statistics
  const stats: PlacementStats = {
    totalCompanies: companies.length,
    studentsPlaced: companies.reduce((sum, c) => sum + c.selectedStudents, 0),
    averagePackage: '₹12.8 LPA',
    placementRate: 78,
    highestPackage: '₹55 LPA',
    totalOffers: companies.reduce((sum, c) => sum + c.selectedStudents, 0)
  };

  const recentPlacements = students.filter(s => s.status === 'selected').slice(0, 4);

  const departmentStats = [
    { name: 'CSE', rate: 85, color: 'bg-blue-500' },
    { name: 'IT', rate: 80, color: 'bg-green-500' },
    { name: 'ECE', rate: 72, color: 'bg-orange-500' },
    { name: 'ME', rate: 68, color: 'bg-purple-500' },
    { name: 'CE', rate: 65, color: 'bg-yellow-500' },
    { name: 'EE', rate: 70, color: 'bg-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Placement Corner</h1>
              <p className="text-gray-600 mt-1">Comprehensive campus recruitment and placement management system</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setIsAddCompanyModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Add Company
              </button>
              {/* <button
                onClick={() => setIsScheduleDriveModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <CalendarIcon size={20} />
                Schedule Drive
              </button> */}
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Reports
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search companies by name, industry, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              
              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Job Types</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>
                    {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort and Clear Filters */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as unknown as 'visitDate' | 'name' | 'positions')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="visitDate">Visit Date</option>
                <option value="name">Company Name</option>
                <option value="positions">Positions</option>
                <option value="package">Package</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
            
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Companies Visiting</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCompanies}</p>
              </div>
              <BuildingIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Students Placed</p>
                <p className="text-2xl font-bold text-green-600">{stats.studentsPlaced}</p>
              </div>
              <UsersIcon className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Average Package</p>
                <p className="text-2xl font-bold text-orange-600">{stats.averagePackage}</p>
              </div>
              <DollarSignIcon className="text-orange-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Placement Rate</p>
                <p className="text-2xl font-bold text-purple-600">{stats.placementRate}%</p>
              </div>
              <TrendingUpIcon className="text-purple-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Highest Package</p>
                <p className="text-2xl font-bold text-red-600">{stats.highestPackage}</p>
              </div>
              <AwardIcon className="text-red-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Offers</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalOffers}</p>
              </div>
              <StarIcon className="text-blue-500" size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Companies List */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Visiting Companies ({filteredCompanies.length})
              </h2>
            </div>
            
            <div className="space-y-4">
              {filteredCompanies.map((company) => (
                <div key={company.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{company.logo}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{company.name}</h3>
                        <p className="text-sm text-gray-600">{company.industry}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPinIcon size={14} className="text-gray-400" />
                          <span className="text-xs text-gray-500">{company.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(company.status)}`}>
                        {company.status.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(company.jobType)}`}>
                        {company.jobType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={() => openViewModal(company)}
                          className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                        >
                          <EyeIcon size={16} />
                        </button>
                        <button
                          onClick={() => openEditModal(company)}
                          className="text-gray-400 hover:text-green-600 transition-colors p-1"
                        >
                          <EditIcon size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(company)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        >
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-600">Positions</p>
                      <p className="font-medium">{company.positions}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Package</p>
                      <p className="font-medium text-green-600">{company.package}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Visit Date</p>
                      <p className="font-medium">{formatDate(company.visitDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Registered</p>
                      <p className="font-medium">{company.registeredStudents}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-2">Eligible Branches:</p>
                    <div className="flex flex-wrap gap-1">
                      {company.eligibility.map((branch, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                          {branch}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => openViewModal(company)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-sm transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openStudentListModal(company)}
                      className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-sm transition-colors"
                    >
                      Student List
                    </button>
                    <button
                      onClick={() => sendNotifications(company.id)}
                      className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1 rounded text-sm transition-colors"
                    >
                      <BellIcon size={14} className="inline mr-1" />
                      Notify
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredCompanies.length === 0 && (
              <div className="text-center py-12">
                <BuildingIcon className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedStatus !== 'all' || selectedIndustry !== 'all'
                    ? 'Try adjusting your filters or search terms'
                    : 'Add your first company to get started'
                  }
                </p>
                <button
                  onClick={() => setIsAddCompanyModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Add Company
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Placements */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Placements</h2>
              <div className="space-y-3">
                {recentPlacements.map((student, index) => {
                  const company = companies.find(c => c.id === student.companyId);
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.rollNumber} • {student.department}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-medium text-blue-600">{company?.name}</span>
                        <span className="text-sm font-bold text-green-600">{company?.package?.split('-')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-gray-500">CGPA: {student.cgpa}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              size={12}
                              className={i < Math.floor(student.cgpa / 2) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Department-wise Statistics */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Placement Rate</h2>
              <div className="space-y-3">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{dept.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${dept.color} h-2 rounded-full transition-all`}
                          style={{ width: `${dept.rate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600 min-w-[3rem]">{dept.rate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {/* <button
                  onClick={() => setIsScheduleDriveModalOpen(true)}
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg transition-colors text-left flex items-center gap-2"
                >
                  <CalendarIcon size={16} />
                  Schedule Campus Drive
                </button> */}
                <button
                  onClick={() => alert('Notifications sent to all students!')}
                  className="w-full bg-green-100 hover:bg-green-200 text-green-700 py-2 px-4 rounded-lg transition-colors text-left flex items-center gap-2"
                >
                  <BellIcon size={16} />
                  Send Notifications
                </button>
                <button
                  onClick={exportReport}
                  className="w-full bg-orange-100 hover:bg-orange-200 text-orange-700 py-2 px-4 rounded-lg transition-colors text-left flex items-center gap-2"
                >
                  <DownloadIcon size={16} />
                  Export Placement Data
                </button>
                <button
                  onClick={() => alert('Student preparation resources opened!')}
                  className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 px-4 rounded-lg transition-colors text-left flex items-center gap-2"
                >
                  <BookOpenIcon size={16} />
                  Student Preparation
                </button>
                {/* <button
                  onClick={() => alert('Interview scheduling system opened!')}
                  className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-2 px-4 rounded-lg transition-colors text-left flex items-center gap-2"
                >
                  <ClockIcon size={16} />
                  Schedule Interviews
                </button> */}
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interviews</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ClockIcon size={16} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Microsoft</p>
                      <p className="text-xs text-gray-600">Technical Round</p>
                    </div>
                  </div>
                  <span className="text-xs text-blue-600">Today 2:00 PM</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ClockIcon size={16} className="text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Google</p>
                      <p className="text-xs text-gray-600">HR Round</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-600">Tomorrow 10:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Company Modal */}
        {isAddCompanyModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Company</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <input
                    type="text"
                    value={newCompany.industry}
                    onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter industry"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Positions</label>
                  <input
                    type="number"
                    min="1"
                    value={newCompany.positions}
                    onChange={(e) => setNewCompany({...newCompany, positions: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Number of positions"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Package Range</label>
                  <input
                    type="text"
                    value={newCompany.package}
                    onChange={(e) => setNewCompany({...newCompany, package: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., ₹8-12 LPA"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Visit Date *</label>
                  <input
                    type="date"
                    value={newCompany.visitDate}
                    onChange={(e) => setNewCompany({...newCompany, visitDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select
                    value={newCompany.jobType}
                    onChange={(e) => setNewCompany({...newCompany, jobType: e.target.value as unknown as 'full-time' | 'internship' | 'both'})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="internship">Internship</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={newCompany.location}
                    onChange={(e) => setNewCompany({...newCompany, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                  <input
                    type="text"
                    value={newCompany.contactPerson}
                    onChange={(e) => setNewCompany({...newCompany, contactPerson: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter contact person name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newCompany.email}
                    onChange={(e) => setNewCompany({...newCompany, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newCompany.phone}
                    onChange={(e) => setNewCompany({...newCompany, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    value={newCompany.website}
                    onChange={(e) => setNewCompany({...newCompany, website: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter website URL"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newCompany.description}
                  onChange={(e) => setNewCompany({...newCompany, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company description"
                ></textarea>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Eligible Departments</label>
                <div className="flex gap-2 mb-2">
                  <select
                    value={eligibilityInput}
                    onChange={(e) => setEligibilityInput(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <button
                    onClick={addEligibility}
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newCompany.eligibility.map((dept, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                      {dept}
                      <button
                        onClick={() => removeEligibility(dept)}
                        type="button"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={requirementInput}
                    onChange={(e) => setRequirementInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Add requirement"
                  />
                  <button
                    onClick={addRequirement}
                    type="button"
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newCompany.requirements.map((req, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                      {req}
                      <button
                        onClick={() => removeRequirement(req)}
                        type="button"
                        className="text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Selection Process</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={processInput}
                    onChange={(e) => setProcessInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addProcess()}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Add selection process step"
                  />
                  <button
                    onClick={addProcess}
                    type="button"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newCompany.selectionProcess.map((process, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                      {process}
                      <button
                        onClick={() => removeProcess(process)}
                        type="button"
                        className="text-purple-600 hover:text-purple-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsAddCompanyModalOpen(false);
                    resetForm();
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCompany}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Company'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Company Modal */}
        {isViewCompanyModalOpen && selectedCompany && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{selectedCompany.logo}</div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedCompany.name}</h2>
                    <p className="text-gray-600">{selectedCompany.industry}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsViewCompanyModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Company Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Industry:</span>
                      <span>{selectedCompany.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCompany.status)}`}>
                        {selectedCompany.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Job Type:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(selectedCompany.jobType)}`}>
                        {selectedCompany.jobType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Positions:</span>
                      <span>{selectedCompany.positions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Package:</span>
                      <span className="text-green-600 font-semibold">{selectedCompany.package}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Visit Date:</span>
                      <span>{formatDate(selectedCompany.visitDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Location:</span>
                      <span>{selectedCompany.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <UserIcon size={16} className="text-gray-400" />
                        <span>{selectedCompany.contactPerson}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MailIcon size={16} className="text-gray-400" />
                        <span>{selectedCompany.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PhoneIcon size={16} className="text-gray-400" />
                        <span>{selectedCompany.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedCompany.description}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Recruitment Details</h3>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Eligible Departments</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.eligibility.map((dept, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {dept}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {selectedCompany.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircleIcon size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Selection Process</h4>
                    <div className="space-y-2">
                      {selectedCompany.selectionProcess.map((process, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                          <span className="text-sm">{process}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Registration Stats</h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{selectedCompany.registeredStudents}</p>
                        <p className="text-sm text-gray-600">Registered</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{selectedCompany.selectedStudents}</p>
                        <p className="text-sm text-gray-600">Selected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => sendNotifications(selectedCompany.id)}
                  className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  <BellIcon size={16} className="inline mr-2" />
                  Send Notifications
                </button>
                <button
                  onClick={() => openStudentListModal(selectedCompany)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  View Student List
                </button>
                <button
                  onClick={() => {
                    setIsViewCompanyModalOpen(false);
                    openEditModal(selectedCompany);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Edit Company
                </button>
                <button
                  onClick={() => setIsViewCompanyModalOpen(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Company Modal */}
        {isEditCompanyModalOpen && editingCompany && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Company</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editingCompany.status}
                    onChange={(e) => setEditingCompany({...editingCompany, status: e.target.value as 'upcoming' | 'ongoing' | 'completed' | 'cancelled'})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Positions</label>
                  <input
                    type="number"
                    value={newCompany.positions}
                    onChange={(e) => setNewCompany({...newCompany, positions: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Package</label>
                  <input
                    type="text"
                    value={newCompany.package}
                    onChange={(e) => setNewCompany({...newCompany, package: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newCompany.description}
                  onChange={(e) => setNewCompany({...newCompany, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsEditCompanyModalOpen(false);
                    setEditingCompany(null);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (editingCompany) {
                      setEditingCompany({
                        ...editingCompany,
                        name: newCompany.name,
                        positions: newCompany.positions,
                        package: newCompany.package,
                        description: newCompany.description
                      });
                      handleEditCompany();
                    }
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Company Modal */}
        {isDeleteCompanyModalOpen && selectedCompany && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Company</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "<strong>{selectedCompany.name}</strong>"? 
                This action cannot be undone and will remove all related data.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsDeleteCompanyModalOpen(false);
                    setSelectedCompany(null);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCompany}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Company
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Student List Modal */}
        {isStudentListModalOpen && selectedCompany && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Student List - {selectedCompany.name}
                </h2>
                <button
                  onClick={() => setIsStudentListModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-medium text-gray-900">Student</th>
                      <th className="text-left p-3 font-medium text-gray-900">Roll Number</th>
                      <th className="text-left p-3 font-medium text-gray-900">Department</th>
                      <th className="text-left p-3 font-medium text-gray-900">CGPA</th>
                      <th className="text-left p-3 font-medium text-gray-900">Status</th>
                      <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.filter(s => s.companyId === selectedCompany.id).map((student) => (
                      <tr key={student.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </td>
                        <td className="p-3 text-gray-700">{student.rollNumber}</td>
                        <td className="p-3 text-gray-700">{student.department}</td>
                        <td className="p-3 text-gray-700">{student.cgpa}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.status === 'selected' ? 'bg-green-100 text-green-800' :
                            student.status === 'shortlisted' ? 'bg-blue-100 text-blue-800' :
                            student.status === 'registered' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {student.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-1 rounded transition-colors">
                              <EyeIcon size={16} />
                            </button>
                            <button className="bg-green-100 hover:bg-green-200 text-green-700 p-1 rounded transition-colors">
                              <DownloadIcon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setIsStudentListModalOpen(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Drive Modal */}
        {isScheduleDriveModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Schedule Campus Drive</h2>
              
              <div className="text-center py-8">
                <CalendarIcon className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Campus Drive Scheduler</h3>
                <p className="text-gray-600 mb-6">
                  Advanced scheduling system for managing campus drives, interview slots, 
                  and recruitment timeline coordination.
                </p>
                <button
                  onClick={() => {
                    setIsScheduleDriveModalOpen(false);
                    alert('Campus drive scheduled successfully!');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Schedule Drive
                </button>
              </div>
              
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setIsScheduleDriveModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reports Modal */}
        {isReportModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Generate Reports</h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    exportReport();
                    setIsReportModalOpen(false);
                  }}
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 px-4 rounded-lg transition-colors text-left flex items-center gap-3"
                >
                  <DownloadIcon size={20} />
                  <div>
                    <p className="font-medium">Company Report</p>
                    <p className="text-sm">Export list of visiting companies</p>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    alert('Placement statistics report generated!');
                    setIsReportModalOpen(false);
                  }}
                  className="w-full bg-green-100 hover:bg-green-200 text-green-700 py-3 px-4 rounded-lg transition-colors text-left flex items-center gap-3"
                >
                  <BarChart3Icon size={20} />
                  <div>
                    <p className="font-medium">Placement Statistics</p>
                    <p className="text-sm">Department-wise placement data</p>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    alert('Student report generated!');
                    setIsReportModalOpen(false);
                  }}
                  className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 py-3 px-4 rounded-lg transition-colors text-left flex items-center gap-3"
                >
                  <GraduationCapIcon size={20} />
                  <div>
                    <p className="font-medium">Student Report</p>
                    <p className="text-sm">Registered and placed students</p>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    alert('Interview schedule report generated!');
                    setIsReportModalOpen(false);
                  }}
                  className="w-full bg-orange-100 hover:bg-orange-200 text-orange-700 py-3 px-4 rounded-lg transition-colors text-left flex items-center gap-3"
                >
                  <ClockIcon size={20} />
                  <div>
                    <p className="font-medium">Interview Schedule</p>
                    <p className="text-sm">Upcoming interviews and drives</p>
                  </div>
                </button>
              </div>
              
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setIsReportModalOpen(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementCorner;
