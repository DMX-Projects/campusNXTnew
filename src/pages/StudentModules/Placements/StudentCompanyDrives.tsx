import React, { useState, useEffect } from 'react';
import {
  BriefcaseIcon,
  BuildingIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  DollarSignIcon,
  StarIcon,
  FilterIcon,
  SearchIcon,
  BookmarkIcon,
  ExternalLinkIcon,
  TrendingUpIcon,
  AwardIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  InfoIcon,
  FileTextIcon,
  DownloadIcon,
  ShareIcon,
  HeartIcon,
  EyeIcon,
  MessageSquareIcon,
  ThumbsUpIcon,
  UserCheckIcon
} from 'lucide-react';

interface CompanyDrive {
  id: string;
  companyName: string;
  companyLogo: string;
  jobTitle: string;
  jobType: 'full-time' | 'internship' | 'part-time' | 'contract';
  department: string;
  location: string;
  workMode: 'on-site' | 'remote' | 'hybrid';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
  applicationDeadline: string;
  driveDate: string;
  driveTime: string;
  venue: string;
  eligibilityCriteria: {
    cgpa: number;
    branches: string[];
    backlogs: number;
    passingYear: string[];
  };
  selectionProcess: string[];
  companyRating: number;
  employeeCount: string;
  companyType: 'startup' | 'mnc' | 'product' | 'service' | 'government';
  industry: string;
  foundedYear: number;
  website: string;
  isBookmarked: boolean;
  hasApplied: boolean;
  applicationStatus: 'not-applied' | 'applied' | 'shortlisted' | 'rejected' | 'selected';
  documentsRequired: string[];
  keySkills: string[];
  applicantsCount: number;
  maxApplications: number;
  isEligible: boolean;
  registrationStatus: 'open' | 'closed' | 'coming-soon';
  companyReviews: CompanyReview[];
  interviewExperiences: InterviewExperience[];
}

interface CompanyReview {
  id: string;
  reviewer: string;
  rating: number;
  pros: string;
  cons: string;
  advice: string;
  jobTitle: string;
  workExperience: string;
  date: string;
}

interface InterviewExperience {
  id: string;
  student: string;
  year: string;
  position: string;
  rounds: string[];
  questions: string[];
  tips: string;
  outcome: 'selected' | 'rejected';
  rating: number;
  date: string;
}

const StudentCompanyDrives: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyDrive[]>([
    {
      id: '1',
      companyName: 'Google',
      companyLogo: '🪟',
      jobTitle: 'Software Engineer - New Grad',
      jobType: 'full-time',
      department: 'Engineering',
      location: 'Bangalore, India',
      workMode: 'hybrid',
      salary: { min: 15, max: 25, currency: 'LPA' },
      experience: 'Fresh Graduate',
      description: `Join Google as a Software Engineer and work on products used by billions of users worldwide. You'll be part of a team that develops next-generation technologies that change how users connect, explore, and interact with information.

Key Responsibilities:
• Design and implement scalable software solutions
• Collaborate with cross-functional teams to deliver high-quality products
• Write clean, efficient, and well-documented code
• Participate in code reviews and technical design discussions
• Contribute to open-source projects and engineering best practices

What We Offer:
• Competitive compensation and equity
• Comprehensive health benefits
• Learning and development opportunities
• Flexible work arrangements
• Access to cutting-edge technology and tools`,
      requirements: [
        'Bachelor\'s degree in Computer Science or related field',
        'Strong programming skills in Java, Python, or C++',
        'Understanding of data structures and algorithms',
        'Experience with software development lifecycle',
        'Problem-solving and analytical thinking skills',
        'Excellent communication and collaboration abilities'
      ],
      benefits: [
        'Health insurance for you and family',
        'Free meals and snacks',
        'Gym and wellness programs',
        'Learning stipend ₹50,000/year',
        'Flexible working hours',
        'Stock options',
        'Relocation assistance',
        '20 days paid vacation'
      ],
      applicationDeadline: '2025-09-15',
      driveDate: '2025-09-20',
      driveTime: '09:00 AM',
      venue: 'Main Auditorium, College Campus',
      eligibilityCriteria: {
        cgpa: 7.0,
        branches: ['CSE', 'IT', 'ECE'],
        backlogs: 0,
        passingYear: ['2025', '2026']
      },
      selectionProcess: [
        'Online Coding Test',
        'Technical Interview Round 1',
        'Technical Interview Round 2',
        'Behavioral Interview',
        'Final HR Discussion'
      ],
      companyRating: 4.5,
      employeeCount: '100,000+',
      companyType: 'mnc',
      industry: 'Technology',
      foundedYear: 1998,
      website: 'https://careers.google.com',
      isBookmarked: true,
      hasApplied: false,
      applicationStatus: 'not-applied',
      documentsRequired: [
        'Updated Resume (PDF)',
        'Academic Transcripts',
        'Photo ID Proof',
        'No Objection Certificate'
      ],
      keySkills: ['Java', 'Python', 'Data Structures', 'Algorithms', 'System Design'],
      applicantsCount: 1250,
      maxApplications: 2000,
      isEligible: true,
      registrationStatus: 'open',
      companyReviews: [
        {
          id: '1',
          reviewer: 'Anonymous Software Engineer',
          rating: 5,
          pros: 'Amazing work culture, great learning opportunities, excellent benefits',
          cons: 'High performance expectations, can be stressful at times',
          advice: 'Be prepared for challenging technical interviews. Focus on system design.',
          jobTitle: 'Software Engineer',
          workExperience: '2 years',
          date: '2025-08-15'
        }
      ],
      interviewExperiences: [
        {
          id: '1',
          student: 'Rahul S. (CSE 2024)',
          year: '2024',
          position: 'Software Engineer',
          rounds: ['Coding Test', 'Technical Round 1', 'Technical Round 2', 'HR Round'],
          questions: [
            'Implement LRU Cache',
            'Design a URL shortener',
            'Find median in a stream of integers',
            'Why do you want to join Google?'
          ],
          tips: 'Practice coding problems daily. Focus on optimization and clean code.',
          outcome: 'selected',
          rating: 4,
          date: '2025-03-10'
        }
      ]
    },
    {
      id: '2',
      companyName: 'Microsoft',
      companyLogo: '🪟',
      jobTitle: 'Software Development Engineer',
      jobType: 'full-time',
      department: 'Cloud & AI',
      location: 'Hyderabad, India',
      workMode: 'hybrid',
      salary: { min: 12, max: 20, currency: 'LPA' },
      experience: '0-2 years',
      description: `Microsoft is looking for passionate software engineers to join our Cloud & AI division. Work on Azure services that power millions of applications worldwide.

Role Overview:
• Develop and maintain cloud services and infrastructure
• Build scalable and reliable distributed systems
• Work with cutting-edge AI and machine learning technologies
• Collaborate with global teams on product development
• Contribute to Microsoft's open-source initiatives

Growth Opportunities:
• Mentorship from senior engineers
• Access to Microsoft Learn platform
• Conference attendance and training
• Internal mobility across divisions
• Leadership development programs`,
      requirements: [
        'BE/BTech in Computer Science or related field',
        'Strong coding skills in C#, Java, or Python',
        'Knowledge of cloud computing concepts',
        'Understanding of web technologies',
        'Database management skills',
        'Team collaboration experience'
      ],
      benefits: [
        'Comprehensive health coverage',
        'Professional development budget',
        'Flexible work arrangements',
        'Employee stock purchase plan',
        'Parental leave benefits',
        'Wellness programs',
        'Transportation allowance',
        'Performance bonuses'
      ],
      applicationDeadline: '2025-09-18',
      driveDate: '2025-09-25',
      driveTime: '10:00 AM',
      venue: 'Computer Science Block, Seminar Hall',
      eligibilityCriteria: {
        cgpa: 6.5,
        branches: ['CSE', 'IT', 'ECE', 'EEE'],
        backlogs: 1,
        passingYear: ['2025']
      },
      selectionProcess: [
        'Online Assessment',
        'Technical Phone Interview',
        'Onsite Technical Rounds (2)',
        'Behavioral Interview'
      ],
      companyRating: 4.4,
      employeeCount: '200,000+',
      companyType: 'mnc',
      industry: 'Technology',
      foundedYear: 1975,
      website: 'https://careers.microsoft.com',
      isBookmarked: false,
      hasApplied: true,
      applicationStatus: 'applied',
      documentsRequired: [
        'Resume in Word/PDF format',
        'All semester marksheets',
        'Photo ID',
        'Passport size photos (2)'
      ],
      keySkills: ['C#', 'Azure', 'SQL Server', 'ASP.NET', 'REST APIs'],
      applicantsCount: 890,
      maxApplications: 1500,
      isEligible: true,
      registrationStatus: 'open',
      companyReviews: [
        {
          id: '1',
          reviewer: 'Senior SDE',
          rating: 4,
          pros: 'Good work-life balance, learning opportunities, job security',
          cons: 'Bureaucratic processes, slow decision making',
          advice: 'Prepare well for system design questions. Show passion for technology.',
          jobTitle: 'Software Development Engineer',
          workExperience: '3 years',
          date: '2025-07-20'
        }
      ],
      interviewExperiences: [
        {
          id: '1',
          student: 'Priya K. (IT 2024)',
          year: '2024',
          position: 'SDE',
          rounds: ['Online Test', 'Technical Round', 'Managerial Round'],
          questions: [
            'Reverse a linked list',
            'Design a parking lot system',
            'Tell me about a challenging project'
          ],
          tips: 'Be honest about what you know. They value learning attitude.',
          outcome: 'selected',
          rating: 5,
          date: '2025-02-28'
        }
      ]
    },
    {
      id: '3',
      companyName: 'Amazon',
      companyLogo: '📦',
      jobTitle: 'Software Development Engineer - Intern',
      jobType: 'internship',
      department: 'AWS',
      location: 'Bangalore, India',
      workMode: 'on-site',
      salary: { min: 50000, max: 80000, currency: 'per month' },
      experience: 'Student',
      description: `Amazon Web Services (AWS) Summer Internship Program offers hands-on experience with cloud technologies used by millions of customers worldwide.

Internship Highlights:
• Work on real AWS services and features
• Mentorship from senior engineers
• Networking opportunities with leadership
• Potential for full-time conversion
• Access to AWS training and certification

What You'll Do:
• Contribute to production systems
• Develop features for AWS services
• Participate in code reviews and design meetings
• Present your work to stakeholders
• Build scalable and reliable software solutions`,
      requirements: [
        'Currently pursuing BE/BTech in CSE/IT/ECE',
        'Strong programming fundamentals',
        'Knowledge of object-oriented programming',
        'Understanding of data structures',
        'Problem-solving skills',
        'Available for 2-3 months internship'
      ],
      benefits: [
        'Competitive monthly stipend',
        'Free accommodation assistance',
        'Transportation allowance',
        'Learning and development budget',
        'Networking events',
        'Certificate of completion',
        'Potential full-time offer',
        'AWS credits for learning'
      ],
      applicationDeadline: '2025-09-10',
      driveDate: '2025-09-15',
      driveTime: '02:00 PM',
      venue: 'Online (Microsoft Teams)',
      eligibilityCriteria: {
        cgpa: 7.5,
        branches: ['CSE', 'IT'],
        backlogs: 0,
        passingYear: ['2026', '2027']
      },
      selectionProcess: [
        'Online Coding Assessment',
        'Technical Interview',
        'Behavioral Interview'
      ],
      companyRating: 4.2,
      employeeCount: '1,500,000+',
      companyType: 'mnc',
      industry: 'E-commerce & Cloud',
      foundedYear: 1994,
      website: 'https://amazon.jobs',
      isBookmarked: true,
      hasApplied: false,
      applicationStatus: 'not-applied',
      documentsRequired: [
        'Resume (PDF only)',
        'Current semester transcript',
        'College ID card copy'
      ],
      keySkills: ['Java', 'AWS', 'Python', 'Linux', 'Distributed Systems'],
      applicantsCount: 2100,
      maxApplications: 3000,
      isEligible: true,
      registrationStatus: 'open',
      companyReviews: [
        {
          id: '1',
          reviewer: 'Former Intern',
          rating: 4,
          pros: 'Real work experience, great mentors, learning opportunities',
          cons: 'Fast-paced environment, high expectations',
          advice: 'Be prepared for leadership principles questions. Practice coding.',
          jobTitle: 'SDE Intern',
          workExperience: 'Intern',
          date: '2025-06-15'
        }
      ],
      interviewExperiences: [
        {
          id: '1',
          student: 'Amit R. (CSE 2026)',
          year: '2025',
          position: 'SDE Intern',
          rounds: ['Coding Test', 'Technical Interview', 'HR Round'],
          questions: [
            'Two sum problem variations',
            'Design a simple cache system',
            'Why Amazon? Leadership principles.'
          ],
          tips: 'Focus on Amazon leadership principles. Code should be clean and optimized.',
          outcome: 'selected',
          rating: 4,
          date: '2025-01-20'
        }
      ]
    }
  ]);

  const [filteredCompanies, setFilteredCompanies] = useState<CompanyDrive[]>(companies);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [selectedWorkMode, setSelectedWorkMode] = useState('all');
  const [selectedCompanyType, setSelectedCompanyType] = useState('all');
  const [salaryRange, setSalaryRange] = useState({ min: 0, max: 50 });
  const [showEligibleOnly, setShowEligibleOnly] = useState(false);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'deadline' | 'salary' | 'rating' | 'applicants'>('deadline');
  const [selectedCompany, setSelectedCompany] = useState<CompanyDrive | null>(null);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'interviews' | 'eligibility'>('overview');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort companies
  useEffect(() => {
    let filtered = companies.filter(company => {
      const matchesSearch = company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.keySkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesJobType = selectedJobType === 'all' || company.jobType === selectedJobType;
      const matchesWorkMode = selectedWorkMode === 'all' || company.workMode === selectedWorkMode;
      const matchesCompanyType = selectedCompanyType === 'all' || company.companyType === selectedCompanyType;
      
      const companySalary = typeof company.salary.min === 'number' ? company.salary.min : 0;
      const matchesSalary = companySalary >= salaryRange.min && companySalary <= salaryRange.max;
      
      const matchesEligibility = !showEligibleOnly || company.isEligible;
      const matchesBookmarked = !showBookmarkedOnly || company.isBookmarked;
      
      return matchesSearch && matchesJobType && matchesWorkMode && 
             matchesCompanyType && matchesSalary && matchesEligibility && matchesBookmarked;
    });

    // Sort companies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
        case 'salary':
          return b.salary.min - a.salary.min;
        case 'rating':
          return b.companyRating - a.companyRating;
        case 'applicants':
          return a.applicantsCount - b.applicantsCount;
        default:
          return 0;
      }
    });

    setFilteredCompanies(filtered);
  }, [companies, searchTerm, selectedJobType, selectedWorkMode, selectedCompanyType, 
      salaryRange, showEligibleOnly, showBookmarkedOnly, sortBy]);

  const toggleBookmark = (companyId: string) => {
    setCompanies(prev => prev.map(company => 
      company.id === companyId 
        ? { ...company, isBookmarked: !company.isBookmarked }
        : company
    ));
    
    const company = companies.find(c => c.id === companyId);
    if (company) {
      alert(`${company.isBookmarked ? '💔 Removed from' : '❤️ Added to'} bookmarks!`);
    }
  };

  const applyToCompany = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (!company) return;

    if (!company.isEligible) {
      alert('❌ You are not eligible for this position. Please check the eligibility criteria.');
      return;
    }

    if (company.hasApplied) {
      alert('ℹ️ You have already applied to this position.');
      return;
    }

    if (company.registrationStatus === 'closed') {
      alert('⏰ Registration for this drive has been closed.');
      return;
    }

    // Simulate application process
    const confirmApply = confirm(`Are you sure you want to apply for ${company.jobTitle} at ${company.companyName}?`);
    
    if (confirmApply) {
      setCompanies(prev => prev.map(c => 
        c.id === companyId 
          ? { 
              ...c, 
              hasApplied: true, 
              applicationStatus: 'applied',
              applicantsCount: c.applicantsCount + 1
            }
          : c
      ));
      alert('🎉 Application submitted successfully! You will receive confirmation via email.');
    }
  };

  const shareCompany = (company: CompanyDrive) => {
    const shareText = `Check out this job opportunity: ${company.jobTitle} at ${company.companyName}
    
📍 Location: ${company.location}
💰 Salary: ₹${company.salary.min}-${company.salary.max} ${company.salary.currency}
📅 Deadline: ${new Date(company.applicationDeadline).toLocaleDateString()}

Apply now through the placement portal!`;

    if (navigator.share) {
      navigator.share({
        title: `${company.jobTitle} - ${company.companyName}`,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('🔗 Job details copied to clipboard!');
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getApplicationStatusColor = (status: string) => {
    const colors = {
      'not-applied': 'bg-gray-100 text-gray-800',
      'applied': 'bg-blue-100 text-blue-800',
      'shortlisted': 'bg-yellow-100 text-yellow-800',
      'rejected': 'bg-red-100 text-red-800',
      'selected': 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRegistrationStatusColor = (status: string) => {
    const colors = {
      'open': 'bg-green-100 text-green-800',
      'closed': 'bg-red-100 text-red-800',
      'coming-soon': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors];
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedJobType('all');
    setSelectedWorkMode('all');
    setSelectedCompanyType('all');
    setSalaryRange({ min: 0, max: 50 });
    setShowEligibleOnly(false);
    setShowBookmarkedOnly(false);
  };

  const stats = {
    total: companies.length,
    eligible: companies.filter(c => c.isEligible).length,
    applied: companies.filter(c => c.hasApplied).length,
    bookmarked: companies.filter(c => c.isBookmarked).length,
    openRegistrations: companies.filter(c => c.registrationStatus === 'open').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Company Drives</h1>
              <p className="text-gray-600 mt-1">Explore job opportunities and apply to your dream companies</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  showBookmarkedOnly 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <HeartIcon size={16} />
                Bookmarks ({stats.bookmarked})
              </button>
              {/* <button
                onClick={() => alert('📊 Generating placement statistics report...')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <TrendingUpIcon size={16} className="inline mr-2" />
                Analytics
              </button> */}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Drives</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                </div>
                <BriefcaseIcon className="text-blue-600" size={24} />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Eligible</p>
                  <p className="text-2xl font-bold text-green-900">{stats.eligible}</p>
                </div>
                <CheckCircleIcon className="text-green-600" size={24} />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Applied</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.applied}</p>
                </div>
                <UserCheckIcon className="text-purple-600" size={24} />
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Open Now</p>
                  <p className="text-2xl font-bold text-yellow-900">{stats.openRegistrations}</p>
                </div>
                <ClockIcon className="text-yellow-600" size={24} />
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">Bookmarked</p>
                  <p className="text-2xl font-bold text-red-900">{stats.bookmarked}</p>
                </div>
                <BookmarkIcon className="text-red-600" size={24} />
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by company name, job title, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="full-time">Full Time</option>
                  <option value="internship">Internship</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="deadline">By Deadline</option>
                  <option value="salary">By Salary</option>
                  <option value="rating">By Rating</option>
                  <option value="applicants">By Applicants</option>
                </select>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg transition-colors lg:hidden"
                >
                  <FilterIcon size={16} />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-4`}>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <select
                  value={selectedWorkMode}
                  onChange={(e) => setSelectedWorkMode(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Work Modes</option>
                  <option value="on-site">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                
                <select
                  value={selectedCompanyType}
                  onChange={(e) => setSelectedCompanyType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Company Types</option>
                  <option value="startup">Startup</option>
                  <option value="mnc">MNC</option>
                  <option value="product">Product</option>
                  <option value="service">Service</option>
                  <option value="government">Government</option>
                </select>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Min Salary:</label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={salaryRange.min}
                    onChange={(e) => setSalaryRange({...salaryRange, min: parseInt(e.target.value)})}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600">{salaryRange.min} LPA</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Max Salary:</label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={salaryRange.max}
                    onChange={(e) => setSalaryRange({...salaryRange, max: parseInt(e.target.value)})}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600">{salaryRange.max} LPA</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowEligibleOnly(!showEligibleOnly)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    showEligibleOnly 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Eligible Only ({stats.eligible})
                </button>
                
                {(searchTerm || selectedJobType !== 'all' || selectedWorkMode !== 'all' || 
                  selectedCompanyType !== 'all' || salaryRange.min > 0 || salaryRange.max < 50 || 
                  showEligibleOnly || showBookmarkedOnly) && (
                  <button
                    onClick={clearAllFilters}
                    className="px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-sm transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCompanies.map(company => {
            const daysLeft = getDaysUntilDeadline(company.applicationDeadline);
            const isDeadlineSoon = daysLeft <= 3 && daysLeft >= 0;
            const isDeadlinePassed = daysLeft < 0;
            
            return (
              <div key={company.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
                <div className="p-6">
                  {/* Company Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{company.companyLogo}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{company.companyName}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <StarIcon size={14} className="text-yellow-500 fill-current" />
                          <span>{company.companyRating}</span>
                          <span>•</span>
                          <span>{company.employeeCount}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleBookmark(company.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          company.isBookmarked 
                            ? 'text-red-500 bg-red-100' 
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                      >
                        <HeartIcon size={16} fill={company.isBookmarked ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={() => shareCompany(company)}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <ShareIcon size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Job Title */}
                  <div className="mb-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{company.jobTitle}</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        company.jobType === 'full-time' ? 'bg-green-100 text-green-800' :
                        company.jobType === 'internship' ? 'bg-blue-100 text-blue-800' :
                        company.jobType === 'part-time' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {company.jobType.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        company.workMode === 'remote' ? 'bg-purple-100 text-purple-800' :
                        company.workMode === 'hybrid' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {company.workMode.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRegistrationStatusColor(company.registrationStatus)}`}>
                        {company.registrationStatus.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Key Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPinIcon size={14} className="text-gray-400" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSignIcon size={14} className="text-gray-400" />
                      <span>₹{company.salary.min}-{company.salary.max} {company.salary.currency}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon size={14} className="text-gray-400" />
                      <span>Drive: {new Date(company.driveDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ClockIcon size={14} className="text-gray-400" />
                      <span className={`font-medium ${
                        isDeadlinePassed ? 'text-red-600' :
                        isDeadlineSoon ? 'text-orange-600' : 'text-gray-700'
                      }`}>
                        Deadline: {new Date(company.applicationDeadline).toLocaleDateString()}
                        {isDeadlinePassed ? ' (EXPIRED)' : 
                         isDeadlineSoon ? ` (${daysLeft} days left)` :
                         ` (${daysLeft} days left)`}
                      </span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {company.keySkills.slice(0, 4).map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {company.keySkills.length > 4 && (
                        <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                          +{company.keySkills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Application Status */}
                  {company.hasApplied && (
                    <div className="mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getApplicationStatusColor(company.applicationStatus)}`}>
                        Status: {company.applicationStatus.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Eligibility & Applications */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-1">
                      {company.isEligible ? (
                        <CheckCircleIcon size={14} className="text-green-500" />
                      ) : (
                        <AlertCircleIcon size={14} className="text-red-500" />
                      )}
                      <span className={company.isEligible ? 'text-green-600' : 'text-red-600'}>
                        {company.isEligible ? 'Eligible' : 'Not Eligible'}
                      </span>
                    </div>
                    <div className="text-gray-600">
                      {company.applicantsCount}/{company.maxApplications} applied
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${(company.applicantsCount / company.maxApplications) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedCompany(company);
                          setShowCompanyModal(true);
                        }}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm"
                      >
                        <EyeIcon size={14} className="inline mr-2" />
                        View Details
                      </button>
                      <button
                        onClick={() => window.open(company.website, '_blank')}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg transition-colors text-sm"
                      >
                        <ExternalLinkIcon size={14} />
                      </button>
                    </div>
                    
                    {!company.hasApplied && company.registrationStatus === 'open' && !isDeadlinePassed && (
                      <button
                        onClick={() => applyToCompany(company.id)}
                        disabled={!company.isEligible}
                        className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                          company.isEligible 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {company.isEligible ? 'Apply Now' : 'Not Eligible'}
                      </button>
                    )}
                    
                    {company.hasApplied && (
                      <button
                        disabled
                        className="w-full bg-green-100 text-green-700 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed"
                      >
                        ✓ Applied
                      </button>
                    )}
                    
                    {company.registrationStatus === 'closed' && (
                      <button
                        disabled
                        className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed"
                      >
                        Registration Closed
                      </button>
                    )}
                    
                    {isDeadlinePassed && (
                      <button
                        disabled
                        className="w-full bg-gray-100 text-gray-500 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed"
                      >
                        Deadline Passed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <BriefcaseIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No company drives found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedJobType !== 'all' || showEligibleOnly || showBookmarkedOnly
                ? 'Try adjusting your search criteria or filters'
                : 'New company drives will appear here'
              }
            </p>
            {(searchTerm || selectedJobType !== 'all' || showEligibleOnly || showBookmarkedOnly) && (
              <button
                onClick={clearAllFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Company Detail Modal */}
        {showCompanyModal && selectedCompany && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedCompany.companyLogo}</span>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedCompany.companyName}</h2>
                      <p className="text-gray-600">{selectedCompany.jobTitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCompanyModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Tab Navigation */}
                <div className="flex gap-1 mt-4">
                  {['overview', 'reviews', 'interviews', 'eligibility'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Job Details</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Department:</span>
                            <span className="font-medium">{selectedCompany.department}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Experience:</span>
                            <span className="font-medium">{selectedCompany.experience}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Work Mode:</span>
                            <span className="font-medium capitalize">{selectedCompany.workMode}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Industry:</span>
                            <span className="font-medium">{selectedCompany.industry}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Founded:</span>
                            <span className="font-medium">{selectedCompany.foundedYear}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Drive Information</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Drive Date:</span>
                            <span className="font-medium">{new Date(selectedCompany.driveDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Time:</span>
                            <span className="font-medium">{selectedCompany.driveTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Venue:</span>
                            <span className="font-medium">{selectedCompany.venue}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Applications:</span>
                            <span className="font-medium">{selectedCompany.applicantsCount}/{selectedCompany.maxApplications}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Job Description</h3>
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedCompany.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Requirements</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {selectedCompany.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Benefits</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {selectedCompany.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Selection Process</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCompany.selectionProcess.map((step, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {index + 1}. {step}
                            </div>
                            {index < selectedCompany.selectionProcess.length - 1 && (
                              <span className="text-gray-400">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <h3 className="font-semibold text-gray-900">Company Reviews</h3>
                    {selectedCompany.companyReviews.map(review => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{review.reviewer}</h4>
                            <p className="text-sm text-gray-600">{review.jobTitle} • {review.workExperience}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                size={16}
                                className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                              />
                            ))}
                            <span className="ml-1 text-sm text-gray-600">{review.rating}/5</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          <div>
                            <h5 className="font-medium text-green-700 mb-1">Pros:</h5>
                            <p className="text-gray-700">{review.pros}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-red-700 mb-1">Cons:</h5>
                            <p className="text-gray-700">{review.cons}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-blue-700 mb-1">Advice:</h5>
                            <p className="text-gray-700">{review.advice}</p>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500 mt-3">
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'interviews' && (
                  <div className="space-y-6">
                    <h3 className="font-semibold text-gray-900">Interview Experiences</h3>
                    {selectedCompany.interviewExperiences.map(experience => (
                      <div key={experience.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{experience.student}</h4>
                            <p className="text-sm text-gray-600">{experience.position} • {experience.year}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              experience.outcome === 'selected' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {experience.outcome.toUpperCase()}
                            </span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  size={14}
                                  className={i < experience.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Interview Rounds:</h5>
                            <div className="flex flex-wrap gap-1">
                              {experience.rounds.map((round, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                  {round}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Questions Asked:</h5>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {experience.questions.map((question, index) => (
                                <li key={index}>{question}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Tips:</h5>
                            <p className="text-gray-700">{experience.tips}</p>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500 mt-3">
                          {new Date(experience.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'eligibility' && (
                  <div className="space-y-6">
                    <h3 className="font-semibold text-gray-900">Eligibility Criteria</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Academic Requirements</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Minimum CGPA:</span>
                            <span className="font-medium">{selectedCompany.eligibilityCriteria.cgpa}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Maximum Backlogs:</span>
                            <span className="font-medium">{selectedCompany.eligibilityCriteria.backlogs}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Passing Year:</span>
                            <span className="font-medium">{selectedCompany.eligibilityCriteria.passingYear.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Eligible Branches</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCompany.eligibilityCriteria.branches.map((branch, index) => (
                            <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              {branch}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Required Documents</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {selectedCompany.documentsRequired.map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Key Skills Required</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCompany.keySkills.map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg border-l-4 ${
                      selectedCompany.isEligible 
                        ? 'bg-green-50 border-green-400' 
                        : 'bg-red-50 border-red-400'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {selectedCompany.isEligible ? (
                          <CheckCircleIcon className="text-green-600" size={20} />
                        ) : (
                          <AlertCircleIcon className="text-red-600" size={20} />
                        )}
                        <h4 className={`font-medium ${selectedCompany.isEligible ? 'text-green-900' : 'text-red-900'}`}>
                          Eligibility Status
                        </h4>
                      </div>
                      <p className={`text-sm ${selectedCompany.isEligible ? 'text-green-700' : 'text-red-700'}`}>
                        {selectedCompany.isEligible 
                          ? 'You meet all the eligibility criteria for this position.'
                          : 'You do not meet some of the eligibility criteria for this position.'
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Modal Actions */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                <div className="flex gap-3">
                  {!selectedCompany.hasApplied && selectedCompany.registrationStatus === 'open' && (
                    <button
                      onClick={() => {
                        applyToCompany(selectedCompany.id);
                        setShowCompanyModal(false);
                      }}
                      disabled={!selectedCompany.isEligible}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                        selectedCompany.isEligible 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {selectedCompany.isEligible ? 'Apply Now' : 'Not Eligible'}
                    </button>
                  )}
                  
                  <button
                    onClick={() => toggleBookmark(selectedCompany.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCompany.isBookmarked 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedCompany.isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
                  </button>
                  
                  <button
                    onClick={() => window.open(selectedCompany.website, '_blank')}
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Visit Website
                  </button>
                  
                  <button
                    onClick={() => setShowCompanyModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCompanyDrives;
