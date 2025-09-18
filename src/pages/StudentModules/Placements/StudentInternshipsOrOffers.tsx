import React, { useState, useEffect } from 'react';
import {
  BriefcaseIcon,
  CalendarIcon,
  MapPinIcon,
  DollarSignIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  StarIcon,
  TrendingUpIcon,
  FileTextIcon,
  DownloadIcon,
  EyeIcon,
  ShareIcon,
  FilterIcon,
  SearchIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  MessageSquareIcon,
  PhoneIcon,
  MailIcon,
  BuildingIcon,
  UserIcon,
  AwardIcon,
  BookmarkIcon,
  ExternalLinkIcon,
  RefreshCwIcon,
  BarChart3Icon,
  TrendingDownIcon,
  GlobeIcon,
  HeartIcon,
  FlagIcon,
  SendIcon
} from 'lucide-react';

interface InternshipOffer {
  id: string;
  type: 'internship' | 'full-time' | 'part-time' | 'freelance';
  companyName: string;
  companyLogo: string;
  position: string;
  department: string;
  location: string;
  workMode: 'on-site' | 'remote' | 'hybrid';
  duration: string;
  stipend: number;
  currency: string;
  perks: string[];
  description: string;
  requirements: string[];
  skills: string[];
  responsibilities: string[];
  applicationDeadline: string;
  startDate: string;
  endDate?: string;
  status: 'applied' | 'under-review' | 'shortlisted' | 'interview-scheduled' | 'selected' | 'rejected' | 'withdrawn' | 'offer-received' | 'offer-accepted' | 'offer-declined';
  applicationDate: string;
  lastUpdate: string;
  priority: 'low' | 'medium' | 'high';
  isBookmarked: boolean;
  documents: Document[];
  timeline: TimelineEvent[];
  contactPerson: ContactPerson;
  companyRating: number;
  companyReviews: number;
  selectionProcess: string[];
  benefits: string[];
  learningOpportunities: string[];
  mentorship: boolean;
  certificateProvided: boolean;
  ppoChance: number; // Pre-placement offer chance percentage
  applicationSource: 'campus' | 'online' | 'referral' | 'direct';
  referredBy?: string;
  notes: string;
  interviewFeedback?: string;
  salaryNegotiable: boolean;
  tags: string[];
}

interface Document {
  id: string;
  name: string;
  type: 'resume' | 'cover-letter' | 'certificate' | 'portfolio' | 'other';
  fileName: string;
  uploadDate: string;
  size: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface TimelineEvent {
  id: string;
  event: string;
  date: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface ContactPerson {
  name: string;
  designation: string;
  email: string;
  phone?: string;
  linkedIn?: string;
}

const StudentInternshipsOrOffers: React.FC = () => {
  const [internshipsOffers, setInternshipsOffers] = useState<InternshipOffer[]>([
    {
      id: '1',
      type: 'internship',
      companyName: 'Google',
      companyLogo: '🪟',
      position: 'Software Engineering Intern',
      department: 'Engineering',
      location: 'Bangalore, India',
      workMode: 'hybrid',
      duration: '3 months',
      stipend: 75000,
      currency: 'INR',
      perks: ['Health Insurance', 'Free Meals', 'Gym Access', 'Learning Stipend'],
      description: 'Join our engineering team to work on cutting-edge projects that impact millions of users worldwide. You\'ll be mentored by senior engineers and contribute to real products.',
      requirements: [
        'Currently pursuing BTech/MTech in Computer Science',
        'Strong programming skills in Java, Python, or C++',
        'Knowledge of data structures and algorithms',
        'Previous internship experience preferred'
      ],
      skills: ['Java', 'Python', 'Data Structures', 'Algorithms', 'System Design'],
      responsibilities: [
        'Develop and maintain software applications',
        'Collaborate with cross-functional teams',
        'Write clean, efficient, and well-documented code',
        'Participate in code reviews and design discussions'
      ],
      applicationDeadline: '2025-09-15',
      startDate: '2025-12-01',
      endDate: '2026-02-28',
      status: 'interview-scheduled',
      applicationDate: '2025-08-20',
      lastUpdate: '2025-09-02',
      priority: 'high',
      isBookmarked: true,
      documents: [
        {
          id: '1',
          name: 'Resume',
          type: 'resume',
          fileName: 'John_Doe_Resume.pdf',
          uploadDate: '2025-08-20',
          size: '1.2 MB',
          status: 'approved'
        },
        {
          id: '2',
          name: 'Cover Letter',
          type: 'cover-letter',
          fileName: 'Google_Cover_Letter.pdf',
          uploadDate: '2025-08-20',
          size: '256 KB',
          status: 'approved'
        }
      ],
      timeline: [
        {
          id: '1',
          event: 'Application Submitted',
          date: '2025-08-20',
          description: 'Your application has been successfully submitted',
          status: 'completed'
        },
        {
          id: '2',
          event: 'Application Under Review',
          date: '2025-08-25',
          description: 'Your application is being reviewed by the hiring team',
          status: 'completed'
        },
        {
          id: '3',
          event: 'Technical Interview Scheduled',
          date: '2025-09-02',
          description: 'Technical interview scheduled for September 5, 2025 at 2:00 PM',
          status: 'current'
        },
        {
          id: '4',
          event: 'Final Interview',
          date: 'TBD',
          description: 'Final round interview with hiring manager',
          status: 'upcoming'
        }
      ],
      contactPerson: {
        name: 'Sarah Johnson',
        designation: 'Technical Recruiter',
        email: 'sarah.johnson@google.com',
        phone: '+91-9876543210',
        linkedIn: 'linkedin.com/in/sarahjohnson'
      },
      companyRating: 4.8,
      companyReviews: 15000,
      selectionProcess: ['Resume Screening', 'Online Test', 'Technical Interview', 'HR Interview'],
      benefits: ['Flexible Working Hours', 'Professional Development', 'Networking Opportunities'],
      learningOpportunities: ['Machine Learning', 'Cloud Computing', 'Mobile Development', 'DevOps'],
      mentorship: true,
      certificateProvided: true,
      ppoChance: 85,
      applicationSource: 'campus',
      notes: 'Dream internship at Google. Technical interview scheduled. Need to prepare system design.',
      salaryNegotiable: false,
      tags: ['dream-company', 'high-package', 'tech-giant']
    },
    {
      id: '2',
      type: 'full-time',
      companyName: 'Microsoft',
      companyLogo: '🪟',
      position: 'Software Development Engineer',
      department: 'Azure Cloud Services',
      location: 'Hyderabad, India',
      workMode: 'hybrid',
      duration: 'Permanent',
      stipend: 1200000,
      currency: 'INR',
      perks: ['Health & Dental', 'Stock Options', 'Flexible PTO', 'Home Office Setup'],
      description: 'Join Microsoft Azure team to build and scale cloud services used by millions of customers worldwide. Work with cutting-edge technologies and contribute to the future of cloud computing.',
      requirements: [
        'BTech/MTech in Computer Science or related field',
        'Strong programming skills in C#, Java, or Python',
        'Experience with cloud technologies',
        'Understanding of distributed systems'
      ],
      skills: ['C#', 'Azure', 'Cloud Computing', 'Distributed Systems', 'Microservices'],
      responsibilities: [
        'Design and develop scalable cloud services',
        'Collaborate with global teams on feature development',
        'Ensure high availability and performance of services',
        'Participate in on-call rotation for production support'
      ],
      applicationDeadline: '2025-09-20',
      startDate: '2026-01-15',
      status: 'offer-received',
      applicationDate: '2025-08-15',
      lastUpdate: '2025-09-01',
      priority: 'high',
      isBookmarked: true,
      documents: [
        {
          id: '1',
          name: 'Updated Resume',
          type: 'resume',
          fileName: 'John_Doe_Microsoft_Resume.pdf',
          uploadDate: '2025-08-15',
          size: '1.1 MB',
          status: 'approved'
        }
      ],
      timeline: [
        {
          id: '1',
          event: 'Application Submitted',
          date: '2025-08-15',
          description: 'Application submitted through campus placement',
          status: 'completed'
        },
        {
          id: '2',
          event: 'Online Assessment',
          date: '2025-08-22',
          description: 'Completed online coding assessment',
          status: 'completed'
        },
        {
          id: '3',
          event: 'Technical Interviews',
          date: '2025-08-28',
          description: 'Completed 3 rounds of technical interviews',
          status: 'completed'
        },
        {
          id: '4',
          event: 'HR Interview',
          date: '2025-08-30',
          description: 'Final HR discussion completed',
          status: 'completed'
        },
        {
          id: '5',
          event: 'Offer Received',
          date: '2025-09-01',
          description: 'Job offer received with joining details',
          status: 'current'
        }
      ],
      contactPerson: {
        name: 'Rajesh Kumar',
        designation: 'Senior Engineering Manager',
        email: 'rajesh.kumar@microsoft.com',
        linkedIn: 'linkedin.com/in/rajeshkumar'
      },
      companyRating: 4.6,
      companyReviews: 12000,
      selectionProcess: ['Resume Review', 'Online Assessment', 'Technical Interview (3 rounds)', 'HR Interview'],
      benefits: ['Comprehensive Health Insurance', 'Employee Stock Purchase Plan', 'Professional Development'],
      learningOpportunities: ['Azure Certifications', 'Leadership Programs', 'Conferences', 'Internal Training'],
      mentorship: true,
      certificateProvided: false,
      ppoChance: 0,
      applicationSource: 'campus',
      interviewFeedback: 'Strong technical skills. Good problem-solving approach. Team fit confirmed.',
      notes: 'Excellent opportunity at Microsoft Azure. Offer received - need to respond by Sep 8.',
      salaryNegotiable: true,
      tags: ['offer-received', 'azure', 'cloud-computing']
    },
    {
      id: '3',
      type: 'internship',
      companyName: 'Flipkart',
      companyLogo: '🛒',
      position: 'Product Management Intern',
      department: 'Product Management',
      location: 'Bangalore, India',
      workMode: 'on-site',
      duration: '6 months',
      stipend: 50000,
      currency: 'INR',
      perks: ['Transportation Allowance', 'Free Lunch', 'Product Credits'],
      description: 'Work with product managers to define and execute product strategy for one of India\'s largest e-commerce platforms. Great opportunity to learn product management skills.',
      requirements: [
        'MBA or BTech with interest in product management',
        'Strong analytical and communication skills',
        'Understanding of e-commerce domain',
        'Previous internship in tech/product preferred'
      ],
      skills: ['Product Strategy', 'Data Analysis', 'User Research', 'A/B Testing'],
      responsibilities: [
        'Assist in product roadmap planning',
        'Conduct user research and analyze feedback',
        'Support in feature specification writing',
        'Collaborate with engineering and design teams'
      ],
      applicationDeadline: '2025-09-10',
      startDate: '2025-11-01',
      endDate: '2026-04-30',
      status: 'rejected',
      applicationDate: '2025-08-18',
      lastUpdate: '2025-08-30',
      priority: 'medium',
      isBookmarked: false,
      documents: [
        {
          id: '1',
          name: 'Resume',
          type: 'resume',
          fileName: 'PM_Resume.pdf',
          uploadDate: '2025-08-18',
          size: '980 KB',
          status: 'rejected'
        }
      ],
      timeline: [
        {
          id: '1',
          event: 'Application Submitted',
          date: '2025-08-18',
          description: 'Application submitted online',
          status: 'completed'
        },
        {
          id: '2',
          event: 'Application Reviewed',
          date: '2025-08-25',
          description: 'Application reviewed by hiring team',
          status: 'completed'
        },
        {
          id: '3',
          event: 'Application Rejected',
          date: '2025-08-30',
          description: 'Application not selected for next round',
          status: 'completed'
        }
      ],
      contactPerson: {
        name: 'Priya Sharma',
        designation: 'Senior Product Manager',
        email: 'priya.sharma@flipkart.com'
      },
      companyRating: 4.2,
      companyReviews: 8500,
      selectionProcess: ['Resume Screening', 'Case Study', 'Product Sense Interview', 'Final Interview'],
      benefits: ['Learning Opportunities', 'Networking', 'Product Experience'],
      learningOpportunities: ['Product Analytics', 'User Experience', 'Strategy Planning'],
      mentorship: true,
      certificateProvided: true,
      ppoChance: 60,
      applicationSource: 'online',
      notes: 'Interesting PM role but rejected in first round. Need to improve product case study skills.',
      salaryNegotiable: false,
      tags: ['product-management', 'e-commerce', 'rejected']
    }
  ]);

  const [filteredItems, setFilteredItems] = useState<InternshipOffer[]>(internshipsOffers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedWorkMode, setSelectedWorkMode] = useState('all');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'deadline' | 'stipend' | 'updated' | 'priority'>('updated');
  const [selectedItem, setSelectedItem] = useState<InternshipOffer | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'documents' | 'contact' | 'notes'>('overview');
  const [newNote, setNewNote] = useState('');

  const [newInternship, setNewInternship] = useState({
    companyName: '',
    position: '',
    type: 'internship' as const,
    location: '',
    workMode: 'on-site' as const,
    stipend: 0,
    applicationDeadline: '',
    startDate: '',
    applicationSource: 'online' as const,
    notes: ''
  });
const handleDownload = (doc: Document) => {
  const fileContent = `This is placeholder content for document: ${doc.name}`;
  const blob = new Blob([fileContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = doc.fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

  // Filter and sort items
  useEffect(() => {
    let filtered = internshipsOffers.filter(item => {
      const matchesSearch = item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = selectedType === 'all' || item.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
      const matchesWorkMode = selectedWorkMode === 'all' || item.workMode === selectedWorkMode;
      const matchesBookmarked = !showBookmarkedOnly || item.isBookmarked;
      
      return matchesSearch && matchesType && matchesStatus && matchesWorkMode && matchesBookmarked;
    });

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
        case 'stipend':
          return b.stipend - a.stipend;
        case 'updated':
          return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

    setFilteredItems(filtered);
  }, [internshipsOffers, searchTerm, selectedType, selectedStatus, selectedWorkMode, showBookmarkedOnly, sortBy]);

  const toggleBookmark = (itemId: string) => {
    setInternshipsOffers(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, isBookmarked: !item.isBookmarked }
        : item
    ));
    
    const item = internshipsOffers.find(i => i.id === itemId);
    if (item) {
      alert(`${item.isBookmarked ? '💔 Removed from' : '❤️ Added to'} bookmarks!`);
    }
  };

  const updateStatus = (itemId: string, newStatus: InternshipOffer['status']) => {
    setInternshipsOffers(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            status: newStatus, 
            lastUpdate: new Date().toISOString().split('T')[0],
            timeline: [
              ...item.timeline,
              {
                id: Date.now().toString(),
                event: `Status Updated to ${newStatus.replace('-', ' ').toUpperCase()}`,
                date: new Date().toISOString().split('T')[0],
                description: `Application status changed to ${newStatus.replace('-', ' ')}`,
                status: 'current'
              }
            ]
          }
        : item
    ));
    
    alert(`✅ Status updated to ${newStatus.replace('-', ' ')}!`);
  };

  const updatePriority = (itemId: string, newPriority: InternshipOffer['priority']) => {
    setInternshipsOffers(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, priority: newPriority }
        : item
    ));
    
    alert(`🎯 Priority updated to ${newPriority}!`);
  };

  const addNote = (itemId: string) => {
    if (!newNote.trim()) {
      alert('⚠️ Please enter a note!');
      return;
    }

    setInternshipsOffers(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            notes: item.notes 
              ? `${item.notes}\n\n[${new Date().toLocaleDateString()}] ${newNote}`
              : `[${new Date().toLocaleDateString()}] ${newNote}`
          }
        : item
    ));
    
    setNewNote('');
    alert('📝 Note added successfully!');
  };

  const deleteItem = (itemId: string) => {
    const item = internshipsOffers.find(i => i.id === itemId);
    if (!item) return;

    if (confirm(`Are you sure you want to delete the application for ${item.position} at ${item.companyName}?`)) {
      setInternshipsOffers(prev => prev.filter(i => i.id !== itemId));
      alert('🗑️ Application deleted successfully!');
    }
  };

  const shareItem = (item: InternshipOffer) => {
    const shareText = `Check out this opportunity: ${item.position} at ${item.companyName}
    
💰 Stipend: ${item.currency} ${item.stipend.toLocaleString()}/month
📍 Location: ${item.location}
🏢 Work Mode: ${item.workMode}
📅 Deadline: ${new Date(item.applicationDeadline).toLocaleDateString()}

Status: ${item.status.replace('-', ' ').toUpperCase()}`;

    if (navigator.share) {
      navigator.share({
        title: `${item.position} - ${item.companyName}`,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('🔗 Opportunity details copied to clipboard!');
    }
  };

  const addNewInternship = () => {
    if (!newInternship.companyName || !newInternship.position) {
      alert('⚠️ Please fill in all required fields!');
      return;
    }

    const newItem: InternshipOffer = {
      id: Date.now().toString(),
      companyName: newInternship.companyName,
      position: newInternship.position,
      type: newInternship.type,
      location: newInternship.location,
      workMode: newInternship.workMode,
      stipend: newInternship.stipend,
      applicationDeadline: newInternship.applicationDeadline,
      startDate: newInternship.startDate,
      applicationSource: newInternship.applicationSource,
      notes: newInternship.notes,
      companyLogo: '🏢',
      department: '',
      duration: newInternship.type === 'internship' ? '3-6 months' : 'Permanent',
      currency: 'INR',
      perks: [],
      description: '',
      requirements: [],
      skills: [],
      responsibilities: [],
      status: 'applied',
      applicationDate: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      isBookmarked: false,
      documents: [],
      timeline: [
        {
          id: '1',
          event: 'Application Submitted',
          date: new Date().toISOString().split('T')[0],
          description: 'Application manually added to tracker',
          status: 'completed'
        }
      ],
      contactPerson: {
        name: '',
        designation: '',
        email: ''
      },
      companyRating: 0,
      companyReviews: 0,
      selectionProcess: [],
      benefits: [],
      learningOpportunities: [],
      mentorship: false,
      certificateProvided: false,
      ppoChance: 0,
      salaryNegotiable: false,
      tags: []
    };

    setInternshipsOffers(prev => [...prev, newItem]);
    setNewInternship({
      companyName: '',
      position: '',
      type: 'internship',
      location: '',
      workMode: 'on-site',
      stipend: 0,
      applicationDeadline: '',
      startDate: '',
      applicationSource: 'online',
      notes: ''
    });
    setShowAddModal(false);
    alert('✅ New opportunity added to your tracker!');
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'applied': 'bg-blue-100 text-blue-800',
      'under-review': 'bg-yellow-100 text-yellow-800',
      'shortlisted': 'bg-green-100 text-green-800',
      'interview-scheduled': 'bg-purple-100 text-purple-800',
      'selected': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'withdrawn': 'bg-gray-100 text-gray-800',
      'offer-received': 'bg-emerald-100 text-emerald-800',
      'offer-accepted': 'bg-green-100 text-green-800',
      'offer-declined': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'applied': ClockIcon,
      'under-review': AlertCircleIcon,
      'shortlisted': TrendingUpIcon,
      'interview-scheduled': CalendarIcon,
      'selected': CheckCircleIcon,
      'rejected': XCircleIcon,
      'withdrawn': XCircleIcon,
      'offer-received': AwardIcon,
      'offer-accepted': CheckCircleIcon,
      'offer-declined': XCircleIcon
    };
    return icons[status as keyof typeof icons] || AlertCircleIcon;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedStatus('all');
    setSelectedWorkMode('all');
    setShowBookmarkedOnly(false);
  };

  const stats = {
    total: internshipsOffers.length,
    applied: internshipsOffers.filter(i => ['applied', 'under-review'].includes(i.status)).length,
    interviewed: internshipsOffers.filter(i => ['interview-scheduled', 'shortlisted'].includes(i.status)).length,
    offers: internshipsOffers.filter(i => ['offer-received', 'offer-accepted', 'selected'].includes(i.status)).length,
    avgStipend: internshipsOffers.length > 0 
      ? Math.round(internshipsOffers.reduce((sum, i) => sum + i.stipend, 0) / internshipsOffers.length)
      : 0
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Internships & Job Offers</h1>
              <p className="text-gray-600 mt-1">Track your applications, interviews, and offers in one place</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Add Application
              </button>
              <button
                onClick={() => alert('📊 Generating application analytics...')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <BarChart3Icon size={20} />
                Analytics
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Applications</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                </div>
                <BriefcaseIcon className="text-blue-600" size={24} />
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-900">{stats.applied}</p>
                </div>
                <ClockIcon className="text-yellow-600" size={24} />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Interviews</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.interviewed}</p>
                </div>
                <UserIcon className="text-purple-600" size={24} />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Offers</p>
                  <p className="text-2xl font-bold text-green-900">{stats.offers}</p>
                </div>
                <AwardIcon className="text-green-600" size={24} />
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 text-sm font-medium">Avg Stipend</p>
                  <p className="text-2xl font-bold text-indigo-900">₹{stats.avgStipend.toLocaleString()}</p>
                </div>
                <DollarSignIcon className="text-indigo-600" size={24} />
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
                  placeholder="Search by company, position, location, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="internship">Internship</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="freelance">Freelance</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="updated">Recently Updated</option>
                  <option value="deadline">By Deadline</option>
                  <option value="stipend">By Stipend</option>
                  <option value="priority">By Priority</option>
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
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="applied">Applied</option>
                  <option value="under-review">Under Review</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview-scheduled">Interview Scheduled</option>
                  <option value="selected">Selected</option>
                  <option value="rejected">Rejected</option>
                  <option value="offer-received">Offer Received</option>
                  <option value="offer-accepted">Offer Accepted</option>
                </select>
                
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
                
                <button
                  onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    showBookmarkedOnly 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Bookmarked Only
                </button>
                
                {(searchTerm || selectedType !== 'all' || selectedStatus !== 'all' || 
                  selectedWorkMode !== 'all' || showBookmarkedOnly) && (
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

        {/* Applications List */}
        <div className="space-y-4">
          {filteredItems.map(item => {
            const StatusIcon = getStatusIcon(item.status);
            const daysLeft = getDaysUntilDeadline(item.applicationDeadline);
            const isDeadlineSoon = daysLeft <= 3 && daysLeft >= 0;
            const isDeadlinePassed = daysLeft < 0;
            
            return (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">{item.companyLogo}</div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900">{item.position}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                                {item.priority.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <span className="font-medium">{item.companyName}</span>
                              <span>•</span>
                              <span>{item.department}</span>
                              {item.companyRating > 0 && (
                                <>
                                  <span>•</span>
                                  <div className="flex items-center gap-1">
                                    <StarIcon size={14} className="text-yellow-500 fill-current" />
                                    <span className="text-sm">{item.companyRating}</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleBookmark(item.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              item.isBookmarked 
                                ? 'text-red-500 bg-red-100' 
                                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                            }`}
                          >
                            <HeartIcon size={16} fill={item.isBookmarked ? 'currentColor' : 'none'} />
                          </button>
                          <button
                            onClick={() => shareItem(item)}
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <ShareIcon size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Status and Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <StatusIcon size={16} className="text-gray-400" />
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                            {item.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <MapPinIcon size={16} className="text-gray-400" />
                          <span>{item.location}</span>
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {item.workMode}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSignIcon size={16} className="text-gray-400" />
                          <span className="font-medium">₹{item.stipend.toLocaleString()}</span>
                          <span className="text-gray-600">/{item.type === 'internship' ? 'month' : 'year'}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarIcon size={16} className="text-gray-400" />
                          <span className={
                            isDeadlinePassed ? 'text-red-600 font-medium' :
                            isDeadlineSoon ? 'text-orange-600 font-medium' : 'text-gray-600'
                          }>
                            {isDeadlinePassed ? 'Deadline passed' :
                             isDeadlineSoon ? `${daysLeft} days left` :
                             `${daysLeft} days left`}
                          </span>
                        </div>
                      </div>

                      {/* Skills and Tags */}
                      {item.skills.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {item.skills.slice(0, 5).map((skill, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                            {item.skills.length > 5 && (
                              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                +{item.skills.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Timeline Preview */}
                      <div className="mb-4">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Applied: {new Date(item.applicationDate).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Updated: {new Date(item.lastUpdate).toLocaleDateString()}</span>
                          {item.timeline.length > 1 && (
                            <>
                              <span>•</span>
                              <button
                                onClick={() => {
                                  setSelectedItem(item);
                                  setShowTimelineModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                              >
                                View Timeline ({item.timeline.length} events)
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setShowDetailModal(true);
                          }}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                        >
                          <EyeIcon size={14} />
                          View Details
                        </button>
                        
                        <div className="relative">
                          <select
                            value={item.status}
                            onChange={(e) => updateStatus(item.id, e.target.value as any)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors appearance-none pr-8"
                          >
                            <option value="applied">Applied</option>
                            <option value="under-review">Under Review</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="interview-scheduled">Interview Scheduled</option>
                            <option value="selected">Selected</option>
                            <option value="rejected">Rejected</option>
                            <option value="withdrawn">Withdrawn</option>
                            <option value="offer-received">Offer Received</option>
                            <option value="offer-accepted">Offer Accepted</option>
                            <option value="offer-declined">Offer Declined</option>
                          </select>
                        </div>
                        
                        <div className="relative">
                          <select
                            value={item.priority}
                            onChange={(e) => updatePriority(item.id, e.target.value as any)}
                            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-lg text-sm transition-colors appearance-none pr-8"
                          >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                          </select>
                        </div>
                        
                        {item.contactPerson.email && (
                          <button
                            onClick={() => window.open(`mailto:${item.contactPerson.email}`)}
                            className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                          >
                            <MailIcon size={14} />
                            Contact
                          </button>
                        )}
                        
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Quick Info Panel */}
                    <div className="lg:w-80">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Quick Info</h4>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium capitalize">{item.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{item.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Source:</span>
                            <span className="font-medium capitalize">{item.applicationSource}</span>
                          </div>
                          {item.ppoChance > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">PPO Chance:</span>
                              <span className="font-medium text-green-600">{item.ppoChance}%</span>
                            </div>
                          )}
                          {item.mentorship && (
                            <div className="flex items-center gap-2">
                              <CheckCircleIcon size={14} className="text-green-500" />
                              <span className="text-green-700 text-xs">Mentorship Available</span>
                            </div>
                          )}
                          {item.certificateProvided && (
                            <div className="flex items-center gap-2">
                              <AwardIcon size={14} className="text-blue-500" />
                              <span className="text-blue-700 text-xs">Certificate Provided</span>
                            </div>
                          )}
                        </div>

                        {item.perks.length > 0 && (
                          <div className="mt-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Perks:</h5>
                            <div className="flex flex-wrap gap-1">
                              {item.perks.slice(0, 3).map((perk, index) => (
                                <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                  {perk}
                                </span>
                              ))}
                              {item.perks.length > 3 && (
                                <span className="text-xs text-gray-500">+{item.perks.length - 3} more</span>
                              )}
                            </div>
                          </div>
                        )}

                        {item.notes && (
                          <div className="mt-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Notes:</h5>
                            <p className="text-xs text-gray-600 bg-white p-2 rounded border line-clamp-3">
                              {item.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <BriefcaseIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedType !== 'all' || selectedStatus !== 'all' || 
               selectedWorkMode !== 'all' || showBookmarkedOnly
                ? 'Try adjusting your search criteria or filters'
                : 'Start tracking your internship and job applications'
              }
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Add Your First Application
            </button>
          </div>
        )}

        {/* Add New Application Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add New Application</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                    <input
                      type="text"
                      value={newInternship.companyName}
                      onChange={(e) => setNewInternship({...newInternship, companyName: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Google"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                    <input
                      type="text"
                      value={newInternship.position}
                      onChange={(e) => setNewInternship({...newInternship, position: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Software Engineering Intern"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={newInternship.type}
                      onChange={(e) => setNewInternship({...newInternship, type: e.target.value as any})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="internship">Internship</option>
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Work Mode</label>
                    <select
                      value={newInternship.workMode}
                      onChange={(e) => setNewInternship({...newInternship, workMode: e.target.value as any})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="on-site">On-site</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={newInternship.location}
                      onChange={(e) => setNewInternship({...newInternship, location: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Bangalore, India"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stipend/Salary (₹)</label>
                    <input
                      type="number"
                      value={newInternship.stipend || ''}
                      onChange={(e) => setNewInternship({...newInternship, stipend: parseInt(e.target.value) || 0})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 50000"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
                    <input
                      type="date"
                      value={newInternship.applicationDeadline}
                      onChange={(e) => setNewInternship({...newInternship, applicationDeadline: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={newInternship.startDate}
                      onChange={(e) => setNewInternship({...newInternship, startDate: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Application Source</label>
                  <select
                    value={newInternship.applicationSource}
                    onChange={(e) => setNewInternship({...newInternship, applicationSource: e.target.value as any})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="online">Online Portal</option>
                    <option value="campus">Campus Placement</option>
                    <option value="referral">Referral</option>
                    <option value="direct">Direct Application</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={newInternship.notes}
                    onChange={(e) => setNewInternship({...newInternship, notes: e.target.value})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Add any additional notes or information..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addNewInternship}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Application
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedItem.position}</h2>
                    <p className="text-gray-600">{selectedItem.companyName}</p>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="flex gap-1 mt-4">
                  {['overview', 'timeline', 'documents', 'contact', 'notes'].map(tab => (
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
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Department:</span>
                            <span className="font-medium">{selectedItem.department}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium">{selectedItem.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Work Mode:</span>
                            <span className="font-medium capitalize">{selectedItem.workMode}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{selectedItem.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Stipend:</span>
                            <span className="font-medium">₹{selectedItem.stipend.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Application Info</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                              {selectedItem.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Applied Date:</span>
                            <span className="font-medium">{new Date(selectedItem.applicationDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Deadline:</span>
                            <span className="font-medium">{new Date(selectedItem.applicationDeadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Source:</span>
                            <span className="font-medium capitalize">{selectedItem.applicationSource}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Priority:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedItem.priority)}`}>
                              {selectedItem.priority.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {selectedItem.description && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                        <p className="text-gray-700 leading-relaxed">{selectedItem.description}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {selectedItem.requirements.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {selectedItem.requirements.map((req, index) => (
                              <li key={index} className="text-sm">{req}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {selectedItem.responsibilities.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Responsibilities</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {selectedItem.responsibilities.map((resp, index) => (
                              <li key={index} className="text-sm">{resp}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    {selectedItem.skills.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.skills.map((skill, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedItem.perks.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Perks & Benefits</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.perks.map((perk, index) => (
                            <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                              {perk}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'timeline' && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-6">Application Timeline</h3>
                    <div className="space-y-4">
                      {selectedItem.timeline.map((event, index) => (
                        <div key={event.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              event.status === 'completed' ? 'bg-green-500 border-green-500' :
                              event.status === 'current' ? 'bg-blue-500 border-blue-500' :
                              'bg-gray-300 border-gray-300'
                            }`}></div>
                            {index < selectedItem.timeline.length - 1 && (
                              <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-medium text-gray-900">{event.event}</h4>
                              <span className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm text-gray-600">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'documents' && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-6">Documents</h3>
                    {selectedItem.documents.length > 0 ? (
                      <div className="space-y-3">
                        {selectedItem.documents.map(doc => (
                          <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileTextIcon size={20} className="text-gray-400" />
                              <div>
                                <h4 className="font-medium text-gray-900">{doc.name}</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <span>{doc.fileName}</span>
                                  <span>•</span>
                                  <span>{doc.size}</span>
                                  <span>•</span>
                                  <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                                doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {doc.status.toUpperCase()}
                              </span>
                              {/* <button className="p-1 text-gray-400 hover:text-blue-600">
                                <DownloadIcon size={16} />
                              </button> */}


                              <button
  onClick={() => handleDownload(doc)}
  className="p-1 text-gray-400 cursor-pointer hover:text-blue-600"
  title="Download Document"
>
  <DownloadIcon size={16} />
</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileTextIcon className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-600">No documents uploaded yet</p>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'contact' && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-6">Contact Information</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900">{selectedItem.contactPerson.name}</h4>
                          <p className="text-sm text-gray-600">{selectedItem.contactPerson.designation}</p>
                        </div>
                        
                        {selectedItem.contactPerson.email && (
                          <div className="flex items-center gap-2">
                            <MailIcon size={16} className="text-gray-400" />
                            <a 
                              href={`mailto:${selectedItem.contactPerson.email}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {selectedItem.contactPerson.email}
                            </a>
                          </div>
                        )}
                        
                        {selectedItem.contactPerson.phone && (
                          <div className="flex items-center gap-2">
                            <PhoneIcon size={16} className="text-gray-400" />
                            <a 
                              href={`tel:${selectedItem.contactPerson.phone}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {selectedItem.contactPerson.phone}
                            </a>
                          </div>
                        )}
                        
                        {selectedItem.contactPerson.linkedIn && (
                          <div className="flex items-center gap-2">
                            <ExternalLinkIcon size={16} className="text-gray-400" />
                            <a 
                              href={`https://${selectedItem.contactPerson.linkedIn}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              LinkedIn Profile
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'notes' && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-6">Notes</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex gap-3">
                        <textarea
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          placeholder="Add a new note..."
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => addNote(selectedItem.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <SendIcon size={16} />
                          Add Note
                        </button>
                      </div>
                    </div>
                    
                    {selectedItem.notes ? (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                          {selectedItem.notes}
                        </pre>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <MessageSquareIcon className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-600">No notes added yet</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Timeline Modal */}
        {showTimelineModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Application Timeline - {selectedItem.companyName}
                </h2>
                <button
                  onClick={() => setShowTimelineModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                {selectedItem.timeline.map((event, index) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        event.status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                        event.status === 'current' ? 'bg-blue-500 border-blue-500 text-white' :
                        'bg-gray-300 border-gray-300'
                      }`}>
                        {event.status === 'completed' && <CheckCircleIcon size={12} />}
                        {event.status === 'current' && <ClockIcon size={12} />}
                      </div>
                      {index < selectedItem.timeline.length - 1 && (
                        <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{event.event}</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowTimelineModal(false)}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
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

export default StudentInternshipsOrOffers;
