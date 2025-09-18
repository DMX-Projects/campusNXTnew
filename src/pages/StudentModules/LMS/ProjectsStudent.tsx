import React, { useState, useEffect } from 'react';
import { 
  FolderIcon, 
  PlusIcon, 
  CalendarIcon, 
  UsersIcon, 
  CheckCircleIcon,
  ClockIcon,
  UploadIcon,
  DownloadIcon,
  EyeIcon,
  MessageCircleIcon,
  CodeIcon,
  FileTextIcon,
  StarIcon,
  AlertTriangleIcon,
  EditIcon,
  XIcon,
  FilterIcon,
  RefreshCwIcon,
  GithubIcon,
  ExternalLinkIcon,
  TrendingUpIcon,
  Target,
  ChevronDownIcon,
  ChevronRightIcon,
  VideoIcon,
  ImageIcon,
  LinkIcon,
  UserCheckIcon,
  SearchIcon,
  MoreVerticalIcon
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: 'individual' | 'group';
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'submitted';
  priority: 'low' | 'medium' | 'high';
  startDate: string;
  dueDate: string;
  progress: number;
  teamMembers: TeamMember[];
  supervisor: string;
  technologies: string[];
  requirements: string[];
  milestones: Milestone[];
  submissions: Submission[];
  repository?: string;
  liveDemo?: string;
  grade?: number;
  feedback?: string;
  lastUpdated: string;
  timeSpent: number;
  estimatedHours: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  contribution: number;
  email: string;
  isOnline: boolean;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  completedDate?: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high';
}

interface Submission {
  id: string;
  title: string;
  type: 'document' | 'code' | 'presentation' | 'demo' | 'video' | 'image';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  status: 'submitted' | 'reviewed' | 'approved' | 'rejected';
  grade?: number;
  feedback?: string;
  submittedBy: string;
  reviewedBy?: string;
  version: number;
}

interface NewProject {
  title: string;
  description: string;
  subject: string;
  type: 'individual' | 'group';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  supervisor: string;
  technologies: string[];
  requirements: string[];
  estimatedHours: number;
}

const ProjectsStu: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-Commerce Website Development',
      description: 'Full-stack e-commerce platform with React frontend, Node.js backend, payment integration, and admin dashboard',
      subject: 'Web Development',
      type: 'group',
      status: 'in-progress',
      priority: 'high',
      startDate: '2025-08-15',
      dueDate: '2025-10-15',
      progress: 65,
      lastUpdated: '2025-09-03',
      timeSpent: 45,
      estimatedHours: 80,
      teamMembers: [
        { id: '1', name: 'John Doe', role: 'Frontend Developer', avatar: '👨‍💻', contribution: 85, email: 'john@email.com', isOnline: true },
        { id: '2', name: 'Jane Smith', role: 'Backend Developer', avatar: '👩‍💻', contribution: 90, email: 'jane@email.com', isOnline: false },
        { id: '3', name: 'Mike Johnson', role: 'UI/UX Designer', avatar: '🎨', contribution: 75, email: 'mike@email.com', isOnline: true }
      ],
      supervisor: 'Prof. Sarah Wilson',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'Stripe API'],
      requirements: [
        'User authentication and authorization system',
        'Product catalog with advanced search and filtering',
        'Shopping cart and wishlist functionality',
        'Secure payment gateway integration',
        'Comprehensive admin dashboard',
        'Responsive mobile-first design',
        'Email notifications and order tracking'
      ],
      milestones: [
        {
          id: '1',
          title: 'Project Setup & Design',
          description: 'Initialize project structure, setup development environment, and create UI/UX designs',
          dueDate: '2025-08-25',
          completed: true,
          completedDate: '2025-08-23',
          assignedTo: 'Mike Johnson',
          priority: 'high'
        },
        {
          id: '2',
          title: 'Frontend Development',
          description: 'Develop React components, implement routing, and create responsive user interface',
          dueDate: '2025-09-15',
          completed: true,
          completedDate: '2025-09-12',
          assignedTo: 'John Doe',
          priority: 'high'
        },
        {
          id: '3',
          title: 'Backend API Development',
          description: 'Create REST APIs, implement database models, and setup authentication',
          dueDate: '2025-09-30',
          completed: false,
          assignedTo: 'Jane Smith',
          priority: 'high'
        },
        {
          id: '4',
          title: 'Payment Integration',
          description: 'Integrate Stripe payment gateway and implement order processing',
          dueDate: '2025-10-08',
          completed: false,
          assignedTo: 'Jane Smith',
          priority: 'medium'
        },
        {
          id: '5',
          title: 'Testing & Deployment',
          description: 'Comprehensive testing, bug fixes, and production deployment',
          dueDate: '2025-10-15',
          completed: false,
          assignedTo: 'All Team',
          priority: 'high'
        }
      ],
      submissions: [
        {
          id: '1',
          title: 'Project Proposal',
          type: 'document',
          fileName: 'ecommerce-proposal.pdf',
          fileSize: '2.5 MB',
          uploadDate: '2025-08-20',
          status: 'approved',
          grade: 85,
          feedback: 'Good project scope and realistic timeline. Consider adding more details about security measures.',
          submittedBy: 'John Doe',
          reviewedBy: 'Prof. Sarah Wilson',
          version: 1
        },
        {
          id: '2',
          title: 'UI/UX Design Mockups',
          type: 'image',
          fileName: 'ecommerce-mockups.zip',
          fileSize: '15.3 MB',
          uploadDate: '2025-08-25',
          status: 'approved',
          grade: 92,
          feedback: 'Excellent design work. Very professional and user-friendly interface.',
          submittedBy: 'Mike Johnson',
          reviewedBy: 'Prof. Sarah Wilson',
          version: 2
        }
      ],
      repository: 'https://github.com/team/ecommerce-project',
      liveDemo: 'https://ecommerce-demo.netlify.app'
    },
    {
      id: '2',
      title: 'Machine Learning Stock Predictor',
      description: 'Advanced stock price prediction system using multiple ML algorithms, real-time data processing, and comprehensive performance analysis',
      subject: 'Machine Learning',
      type: 'individual',
      status: 'review',
      priority: 'medium',
      startDate: '2025-07-01',
      dueDate: '2025-09-30',
      progress: 90,
      lastUpdated: '2025-09-02',
      timeSpent: 65,
      estimatedHours: 70,
      teamMembers: [],
      supervisor: 'Dr. Robert Chen',
      technologies: ['Python', 'TensorFlow', 'Pandas', 'NumPy', 'Matplotlib', 'Flask', 'PostgreSQL'],
      requirements: [
        'Real-time data collection from multiple financial APIs',
        'Advanced data preprocessing and feature engineering',
        'Implementation of multiple ML algorithms (LSTM, Random Forest, SVM)',
        'Comprehensive model performance comparison and analysis',
        'Interactive web interface for predictions and visualizations',
        'Historical data analysis and trend identification',
        'Risk assessment and confidence intervals'
      ],
      milestones: [
        {
          id: '1',
          title: 'Data Collection & Analysis',
          description: 'Gather historical stock data and perform exploratory data analysis',
          dueDate: '2025-07-15',
          completed: true,
          completedDate: '2025-07-12',
          priority: 'high'
        },
        {
          id: '2',
          title: 'Feature Engineering',
          description: 'Create relevant features and indicators for ML models',
          dueDate: '2025-07-30',
          completed: true,
          completedDate: '2025-07-28',
          priority: 'high'
        },
        {
          id: '3',
          title: 'Model Development & Training',
          description: 'Implement and train multiple ML models',
          dueDate: '2025-08-30',
          completed: true,
          completedDate: '2025-08-25',
          priority: 'high'
        },
        {
          id: '4',
          title: 'Web Interface Development',
          description: 'Create user interface for predictions and visualizations',
          dueDate: '2025-09-20',
          completed: true,
          completedDate: '2025-09-18',
          priority: 'medium'
        },
        {
          id: '5',
          title: 'Documentation & Testing',
          description: 'Complete documentation and comprehensive testing',
          dueDate: '2025-09-25',
          completed: false,
          priority: 'medium'
        }
      ],
      submissions: [
        {
          id: '1',
          title: 'Literature Review',
          type: 'document',
          fileName: 'ml-stock-literature-review.pdf',
          fileSize: '3.8 MB',
          uploadDate: '2025-07-20',
          status: 'approved',
          grade: 88,
          feedback: 'Comprehensive review of existing literature. Good understanding of current techniques.',
          submittedBy: 'You',
          reviewedBy: 'Dr. Robert Chen',
          version: 1
        },
        {
          id: '2',
          title: 'Final Project Report',
          type: 'document',
          fileName: 'ml-stock-predictor-report.pdf',
          fileSize: '5.2 MB',
          uploadDate: '2025-09-25',
          status: 'reviewed',
          grade: 92,
          feedback: 'Excellent analysis and implementation. Very thorough evaluation of different models.',
          submittedBy: 'You',
          reviewedBy: 'Dr. Robert Chen',
          version: 3
        },
        {
          id: '3',
          title: 'Source Code & Models',
          type: 'code',
          fileName: 'stock-predictor-source.zip',
          fileSize: '15.8 MB',
          uploadDate: '2025-09-25',
          status: 'approved',
          submittedBy: 'You',
          version: 1
        },
        {
          id: '4',
          title: 'Demo Video',
          type: 'video',
          fileName: 'stock-predictor-demo.mp4',
          fileSize: '125 MB',
          uploadDate: '2025-09-26',
          status: 'submitted',
          submittedBy: 'You',
          version: 1
        }
      ],
      repository: 'https://github.com/student/ml-stock-predictor',
      liveDemo: 'https://stock-predictor-ml.herokuapp.com'
    },
    {
      id: '3',
      title: 'Mobile Recipe App',
      description: 'Cross-platform mobile application for recipe sharing, meal planning, and grocery list management',
      subject: 'Mobile Development',
      type: 'group',
      status: 'planning',
      priority: 'medium',
      startDate: '2025-09-01',
      dueDate: '2025-12-15',
      progress: 15,
      lastUpdated: '2025-09-03',
      timeSpent: 8,
      estimatedHours: 100,
      teamMembers: [
        { id: '1', name: 'Alex Chen', role: 'Mobile Developer', avatar: '📱', contribution: 20, email: 'alex@email.com', isOnline: true },
        { id: '2', name: 'Sarah Kim', role: 'Backend Developer', avatar: '⚙️', contribution: 15, email: 'sarah@email.com', isOnline: true }
      ],
      supervisor: 'Prof. Michael Torres',
      technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB', 'Redux'],
      requirements: [
        'User registration and profile management',
        'Recipe browsing and search functionality',
        'Recipe creation and sharing',
        'Meal planning calendar',
        'Automated grocery list generation',
        'Social features (following, likes, comments)',
        'Offline recipe access'
      ],
      milestones: [
        {
          id: '1',
          title: 'Project Planning',
          description: 'Define requirements, create wireframes, and setup development environment',
          dueDate: '2025-09-15',
          completed: false,
          priority: 'high'
        },
        {
          id: '2',
          title: 'UI/UX Design',
          description: 'Create app designs and user flow diagrams',
          dueDate: '2025-09-30',
          completed: false,
          priority: 'high'
        }
      ],
      submissions: [
        {
          id: '1',
          title: 'Project Proposal',
          type: 'document',
          fileName: 'recipe-app-proposal.pdf',
          fileSize: '1.8 MB',
          uploadDate: '2025-09-02',
          status: 'submitted',
          submittedBy: 'Alex Chen',
          version: 1
        }
      ]
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'calendar'>('list');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [selectedProjectForSubmission, setSelectedProjectForSubmission] = useState<string>('');
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [isMobileView, setIsMobileView] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [newProject, setNewProject] = useState<NewProject>({
    title: '',
    description: '',
    subject: '',
    type: 'individual',
    priority: 'medium',
    dueDate: '',
    supervisor: '',
    technologies: [],
    requirements: [],
    estimatedHours: 40
  });

  const [newSubmission, setNewSubmission] = useState({
    title: '',
    type: 'document' as const,
    file: null as File | null,
    description: ''
  });

  // Check for mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      planning: 'bg-gray-100 text-gray-800 border-gray-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      review: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      submitted: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[status as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const getSubmissionStatusColor = (status: string) => {
    const colors = {
      submitted: 'bg-blue-100 text-blue-800',
      reviewed: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getSubmissionTypeIcon = (type: string) => {
    const icons = {
      document: FileTextIcon,
      code: CodeIcon,
      presentation: FileTextIcon,
      demo: ExternalLinkIcon,
      video: VideoIcon,
      image: ImageIcon
    };
    return icons[type as keyof typeof icons] || FileTextIcon;
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredProjects = projects.filter(project => {
    const statusMatch = filterStatus === 'all' || project.status === filterStatus;
    const typeMatch = filterType === 'all' || project.type === filterType;
    const priorityMatch = filterPriority === 'all' || project.priority === filterPriority;
    const searchMatch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return statusMatch && typeMatch && priorityMatch && searchMatch;
  });

  const createProject = () => {
    if (!newProject.title.trim() || !newProject.description.trim()) {
      alert('⚠️ Please fill in all required fields!');
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      status: 'planning',
      progress: 0,
      teamMembers: [],
      milestones: [],
      submissions: [],
      lastUpdated: new Date().toISOString().split('T')[0],
      timeSpent: 0,
      startDate: new Date().toISOString().split('T')[0]
    };

    setProjects(prev => [...prev, project]);
    setNewProject({
      title: '',
      description: '',
      subject: '',
      type: 'individual',
      priority: 'medium',
      dueDate: '',
      supervisor: '',
      technologies: [],
      requirements: [],
      estimatedHours: 40
    });
    setShowCreateModal(false);
    
    alert('🎉 Project created successfully!');
  };

  const uploadSubmission = () => {
    if (!newSubmission.title.trim() || !selectedProjectForSubmission) {
      alert('⚠️ Please fill in all required fields!');
      return;
    }

    const submission: Submission = {
      id: Date.now().toString(),
      title: newSubmission.title,
      type: newSubmission.type,
      fileName: newSubmission.file?.name || `${newSubmission.title}.${newSubmission.type}`,
      fileSize: newSubmission.file ? `${(newSubmission.file.size / 1024 / 1024).toFixed(1)} MB` : '1.0 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'submitted',
      submittedBy: 'You',
      version: 1
    };

    setProjects(prev => prev.map(project =>
      project.id === selectedProjectForSubmission
        ? { ...project, submissions: [...project.submissions, submission] }
        : project
    ));

    setNewSubmission({
      title: '',
      type: 'document',
      file: null,
      description: ''
    });
    setSelectedProjectForSubmission('');
    setShowSubmissionModal(false);
    
    alert('📤 Submission uploaded successfully!');
  };

  const markMilestoneComplete = (projectId: string, milestoneId: string) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? {
            ...project,
            milestones: project.milestones.map(milestone =>
              milestone.id === milestoneId
                ? { ...milestone, completed: true, completedDate: new Date().toISOString().split('T')[0] }
                : milestone
            ),
            progress: Math.min(project.progress + 20, 100)
          }
        : project
    ));
    
    alert('✅ Milestone marked as completed!');
  };

  const updateProjectProgress = (projectId: string, newProgress: number) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? { ...project, progress: Math.min(Math.max(newProgress, 0), 100) }
        : project
    ));
  };

  const deleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      setProjects(prev => prev.filter(project => project.id !== projectId));
      alert('🗑️ Project deleted successfully!');
    }
  };

  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const openRepository = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('🔗 Repository URL not available');
    }
  };

  const openLiveDemo = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('🔗 Live demo URL not available');
    }
  };

  const downloadSubmission = (submission: Submission) => {
    alert(`📥 Downloading ${submission.fileName}...`);
    // In a real app, this would trigger actual file download
  };

  const addTechnology = (tech: string) => {
    if (tech.trim() && !newProject.technologies.includes(tech.trim())) {
      setNewProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, tech.trim()]
      }));
    }
  };

  const removeTechnology = (tech: string) => {
    setNewProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addRequirement = (req: string) => {
    if (req.trim() && !newProject.requirements.includes(req.trim())) {
      setNewProject(prev => ({
        ...prev,
        requirements: [...prev.requirements, req.trim()]
      }));
    }
  };

  const removeRequirement = (req: string) => {
    setNewProject(prev => ({
      ...prev,
      requirements: prev.requirements.filter(r => r !== req)
    }));
  };

  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
    avgProgress: projects.length > 0 ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) : 0,
    totalTimeSpent: projects.reduce((sum, p) => sum + p.timeSpent, 0),
    avgGrade: projects.filter(p => p.grade).length > 0 
      ? Math.round(projects.filter(p => p.grade).reduce((sum, p) => sum + (p.grade || 0), 0) / projects.filter(p => p.grade).length)
      : 0
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Projects</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your academic projects and track progress</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
              >
                <PlusIcon size={16} />
                <span className="hidden sm:inline">New Project</span>
                <span className="sm:hidden">New</span>
              </button>
              <button
                onClick={() => alert('📋 Project templates feature coming soon!')}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
              >
                <span className="hidden sm:inline">Templates</span>
                <span className="sm:hidden">📋</span>
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg transition-colors text-sm lg:hidden"
              >
                <FilterIcon size={16} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects by title, description, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XIcon size={16} />
              </button>
            )}
          </div>

          {/* Filters and View Mode */}
          <div className={`${showFilters || !isMobileView ? 'block' : 'hidden'} space-y-4`}>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex flex-wrap gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="planning">Planning</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Under Review</option>
                  <option value="completed">Completed</option>
                  <option value="submitted">Submitted</option>
                </select>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="individual">Individual</option>
                  <option value="group">Group</option>
                </select>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-l-lg`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`px-3 py-2 text-sm ${viewMode === 'kanban' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Kanban
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-2 text-sm ${viewMode === 'calendar' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-r-lg`}
                >
                  Calendar
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-xs font-medium">Total</p>
                    <p className="text-lg sm:text-2xl font-bold text-blue-900">{stats.total}</p>
                  </div>
                  <FolderIcon className="text-blue-600" size={20} />
                </div>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-600 text-xs font-medium">In Progress</p>
                    <p className="text-lg sm:text-2xl font-bold text-yellow-900">{stats.inProgress}</p>
                  </div>
                  <ClockIcon className="text-yellow-600" size={20} />
                </div>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-xs font-medium">Completed</p>
                    <p className="text-lg sm:text-2xl font-bold text-green-900">{stats.completed}</p>
                  </div>
                  <CheckCircleIcon className="text-green-600" size={20} />
                </div>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-xs font-medium">Avg Grade</p>
                    <p className="text-lg sm:text-2xl font-bold text-purple-900">{stats.avgGrade}%</p>
                  </div>
                  <StarIcon className="text-purple-600" size={20} />
                </div>
              </div>
              
              <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-600 text-xs font-medium">Avg Progress</p>
                    <p className="text-lg sm:text-2xl font-bold text-indigo-900">{stats.avgProgress}%</p>
                  </div>
                  <TrendingUpIcon className="text-indigo-600" size={20} />
                </div>
              </div>
              
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 text-xs font-medium">Time Spent</p>
                    <p className="text-lg sm:text-2xl font-bold text-orange-900">{stats.totalTimeSpent}h</p>
                  </div>
                  <ClockIcon className="text-orange-600" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project List */}
        {viewMode === 'list' && (
          <div className="space-y-4 sm:space-y-6">
            {filteredProjects.map(project => {
              const isExpanded = expandedProjects.has(project.id);
              const daysUntilDue = getDaysUntilDue(project.dueDate);
              const isOverdue = daysUntilDue < 0;
              const isUrgent = daysUntilDue <= 7 && daysUntilDue >= 0;

              return (
                <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <button
                                onClick={() => toggleProjectExpansion(project.id)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                {isExpanded ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
                              </button>
                              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-1">{project.title}</h2>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                                {project.status.replace('-', ' ').toUpperCase()}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                                {project.priority.toUpperCase()}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                project.type === 'group' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {project.type.toUpperCase()}
                              </span>
                              {isOverdue && (
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  OVERDUE
                                </span>
                              )}
                              {isUrgent && (
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                  URGENT
                                </span>
                              )}
                            </div>
                            
                            <p className="text-gray-600 mb-3 text-sm line-clamp-2">{project.description}</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 text-sm">
                              <div className="flex items-center gap-2">
                                <CalendarIcon size={14} className="text-gray-400 flex-shrink-0" />
                                <span className="min-w-0">
                                  Due: {new Date(project.dueDate).toLocaleDateString()}
                                  {isOverdue && <span className="text-red-600 ml-1">({Math.abs(daysUntilDue)} days overdue)</span>}
                                  {isUrgent && <span className="text-orange-600 ml-1">({daysUntilDue} days left)</span>}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <UsersIcon size={14} className="text-gray-400 flex-shrink-0" />
                                <span className="truncate">Supervisor: {project.supervisor}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FolderIcon size={14} className="text-gray-400 flex-shrink-0" />
                                <span className="truncate">Subject: {project.subject}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center lg:text-right">
                            <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">{project.progress}%</div>
                            <div className="text-xs sm:text-sm text-gray-500">Progress</div>
                            {project.grade && (
                              <div className="mt-2">
                                <div className="text-lg font-bold text-green-600">{project.grade}%</div>
                                <div className="text-xs text-gray-500">Grade</div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Project Progress</span>
                            <div className="flex items-center gap-2">
                              <span>{project.progress}% Complete</span>
                              <button
                                onClick={() => {
                                  const newProgress = prompt(`Update progress for "${project.title}" (0-100):`, project.progress.toString());
                                  if (newProgress && !isNaN(parseInt(newProgress))) {
                                    updateProjectProgress(project.id, parseInt(newProgress));
                                  }
                                }}
                                className="text-blue-600 hover:text-blue-800 text-xs"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${
                                project.progress >= 100 ? 'bg-green-500' :
                                project.progress >= 70 ? 'bg-blue-500' :
                                project.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        {isExpanded && (
                          <div className="space-y-4 mb-4">
                            {/* Team Members */}
                            {project.teamMembers.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Team Members:</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {project.teamMembers.map(member => (
                                    <div key={member.id} className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg">
                                      <span className="text-lg">{member.avatar}</span>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <div className="text-sm font-medium text-gray-900 truncate">{member.name}</div>
                                          {member.isOnline && (
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                          )}
                                        </div>
                                        <div className="text-xs text-gray-500">{member.role}</div>
                                      </div>
                                      <div className="text-xs text-green-600 font-medium">
                                        {member.contribution}%
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Technologies */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Technologies:</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs border border-blue-200">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Requirements */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                {project.requirements.slice(0, 3).map((req, index) => (
                                  <li key={index} className="line-clamp-1">{req}</li>
                                ))}
                                {project.requirements.length > 3 && (
                                  <li className="text-blue-600">+{project.requirements.length - 3} more requirements</li>
                                )}
                              </ul>
                            </div>

                            {/* Milestones Progress */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-3">Milestones ({project.milestones.filter(m => m.completed).length}/{project.milestones.length}):</h4>
                              <div className="space-y-2">
                                {project.milestones.slice(0, 4).map(milestone => (
                                  <div key={milestone.id} className="flex items-center gap-3 text-sm">
                                    <button
                                      onClick={() => !milestone.completed && markMilestoneComplete(project.id, milestone.id)}
                                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                        milestone.completed 
                                          ? 'bg-green-500 border-green-500 text-white' 
                                          : 'border-gray-300 hover:border-blue-500 transition-colors'
                                      }`}
                                      disabled={milestone.completed}
                                    >
                                      {milestone.completed && <CheckCircleIcon size={12} />}
                                    </button>
                                    <div className="flex-1 min-w-0">
                                      <span className={`${milestone.completed ? 'line-through text-gray-500' : 'text-gray-700'} line-clamp-1`}>
                                        {milestone.title}
                                      </span>
                                      <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span>
                                          {milestone.completed 
                                            ? `Completed ${new Date(milestone.completedDate!).toLocaleDateString()}`
                                            : `Due ${new Date(milestone.dueDate).toLocaleDateString()}`
                                          }
                                        </span>
                                        {milestone.assignedTo && (
                                          <span>• {milestone.assignedTo}</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                {project.milestones.length > 4 && (
                                  <div className="text-sm text-blue-600">
                                    +{project.milestones.length - 4} more milestones
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1"
                          >
                            <EyeIcon size={14} />
                            View Details
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProjectForSubmission(project.id);
                              setShowSubmissionModal(true);
                            }}
                            className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1"
                          >
                            <UploadIcon size={14} />
                            Submit Work
                          </button>
                         {/* {project.repository && (
                            <button
                              onClick={() => openRepository(project.repository)}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1"
                            >
                              <CodeIcon size={14} />
                              Repository
                            </button>
                          )}
                          {project.liveDemo && (
                            <button
                              onClick={() => openLiveDemo(project.liveDemo)}
                              className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1"
                            >
                              <ExternalLinkIcon size={14} />
                              Live Demo
                            </button>
                          )}
                          <button 
                            onClick={() => alert(`💬 Team chat for ${project.title} opening soon!`)}
                            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1"
                          >
                            <MessageCircleIcon size={14} />
                            Chat
                          </button>*/}
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {/* Submissions Panel */}
                      <div className="lg:w-80 lg:border-l lg:border-gray-200 lg:pl-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">Submissions ({project.submissions.length})</h4>
                          <button
                            onClick={() => {
                              setSelectedProjectForSubmission(project.id);
                              setShowSubmissionModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <PlusIcon size={16} />
                          </button>
                        </div>
                        <div className="space-y-3">
                          {project.submissions.slice(0, 3).map(submission => {
                            const TypeIcon = getSubmissionTypeIcon(submission.type);
                            
                            return (
                              <div key={submission.id} className="border border-gray-200 rounded-lg p-3">
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="font-medium text-sm text-gray-900 line-clamp-1 flex-1 mr-2">{submission.title}</h5>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubmissionStatusColor(submission.status)} flex-shrink-0`}>
                                    {submission.status}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                  <TypeIcon size={12} />
                                  <span className="truncate">{submission.fileName}</span>
                                  <span>•</span>
                                  <span>{submission.fileSize}</span>
                                </div>
                                
                                <div className="flex items-center justify-between text-xs mb-2">
                                  <span className="text-gray-500">
                                    {new Date(submission.uploadDate).toLocaleDateString()}
                                  </span>
                                  {submission.grade && (
                                    <span className="font-medium text-green-600">{submission.grade}%</span>
                                  )}
                                </div>
                                
                                {submission.feedback && (
                                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                                    <p className="text-gray-700 line-clamp-2">{submission.feedback}</p>
                                  </div>
                                )}
                               {/* 
                                <div className="flex gap-1 mt-2">
                                  <button 
                                    onClick={() => downloadSubmission(submission)}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded text-xs transition-colors flex items-center justify-center gap-1"
                                  >
                                    <DownloadIcon size={10} />
                                    Download
                                  </button>
                                  <button 
                                    onClick={() => alert(`👀 Viewing ${submission.fileName}`)}
                                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 px-2 rounded text-xs transition-colors flex items-center justify-center gap-1"
                                  >
                                    <EyeIcon size={10} />
                                    View
                                  </button>
                                </div>*/}
                              </div>
                            );
                          })}
                          
                          {project.submissions.length > 3 && (
                            <div className="text-center">
                              <button
                                onClick={() => setSelectedProject(project)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                View all {project.submissions.length} submissions
                              </button>
                            </div>
                          )}
                          
                          {project.submissions.length === 0 && (
                            <div className="text-center py-6 text-gray-500">
                              <UploadIcon className="mx-auto mb-2" size={24} />
                              <p className="text-sm">No submissions yet</p>
                              <button
                                onClick={() => {
                                  setSelectedProjectForSubmission(project.id);
                                  setShowSubmissionModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-800 text-sm mt-1"
                              >
                                Upload first submission
                              </button>
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
        )}

        {viewMode === 'kanban' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Kanban Board</h2>
            <div className="overflow-x-auto">
              <div className="flex gap-6 min-w-max pb-4">
                {['planning', 'in-progress', 'review', 'completed'].map(status => (
                  <div key={status} className="w-80 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900 capitalize">
                        {status.replace('-', ' ')} ({filteredProjects.filter(p => p.status === status).length})
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {filteredProjects.filter(p => p.status === status).map(project => (
                        <div key={project.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{project.title}</h4>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className={`px-2 py-1 rounded-full ${getPriorityColor(project.priority)}`}>
                              {project.priority}
                            </span>
                            <span className="text-gray-500">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                            <div 
                              className="bg-blue-500 h-1 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'calendar' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Calendar View</h2>
            <div className="text-center py-12">
              <CalendarIcon className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Project Timeline</h3>
              <p className="text-gray-600 mb-6">
                View project deadlines and milestones in calendar format
              </p>
              <div className="space-y-4">
                {filteredProjects.map(project => (
                  <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{project.title}</h4>
                      <p className="text-sm text-gray-600">Due: {new Date(project.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FolderIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' || filterType !== 'all' || filterPriority !== 'all'
                ? 'Try adjusting your search criteria or filters'
                : 'Create your first project to get started'
              }
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create Project
            </button>
          </div>
        )}

        {/* Create Project Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your project"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={newProject.subject}
                      onChange={(e) => setNewProject({...newProject, subject: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Web Development"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={newProject.type}
                      onChange={(e) => setNewProject({...newProject, type: e.target.value as 'individual' | 'group'})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="individual">Individual</option>
                      <option value="group">Group</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={newProject.priority}
                      onChange={(e) => setNewProject({...newProject, priority: e.target.value as 'low' | 'medium' | 'high'})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={newProject.dueDate}
                      onChange={(e) => setNewProject({...newProject, dueDate: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Supervisor</label>
                    <input
                      type="text"
                      value={newProject.supervisor}
                      onChange={(e) => setNewProject({...newProject, supervisor: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Prof. John Smith"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
                    <input
                      type="number"
                      value={newProject.estimatedHours}
                      onChange={(e) => setNewProject({...newProject, estimatedHours: parseInt(e.target.value) || 0})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      min="1"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newProject.technologies.map((tech, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                        {tech}
                        <button
                          onClick={() => removeTechnology(tech)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <XIcon size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add technology and press Enter"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addTechnology(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                  <div className="space-y-2 mb-2">
                    {newProject.requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                        <span className="flex-1 text-sm">{req}</span>
                        <button
                          onClick={() => removeRequirement(req)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <XIcon size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add requirement and press Enter"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addRequirement(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createProject}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Submission Modal */}
        {showSubmissionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upload Submission</h2>
                <button
                  onClick={() => setShowSubmissionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={newSubmission.title}
                    onChange={(e) => setNewSubmission({...newSubmission, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Final Report"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newSubmission.type}
                    onChange={(e) => setNewSubmission({...newSubmission, type: e.target.value as any})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="document">Document</option>
                    <option value="code">Source Code</option>
                    <option value="presentation">Presentation</option>
                    <option value="demo">Demo</option>
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
                  <input
                    type="file"
                    onChange={(e) => setNewSubmission({...newSubmission, file: e.target.files?.[0] || null})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                  {newSubmission.file && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: {newSubmission.file.name} ({(newSubmission.file.size / 1024 / 1024).toFixed(1)} MB)
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                  <textarea
                    value={newSubmission.description}
                    onChange={(e) => setNewSubmission({...newSubmission, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500"
                    placeholder="Additional notes about this submission"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowSubmissionModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={uploadSubmission}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">{selectedProject.title}</h2>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XIcon size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Project Overview</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                          <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Subject</h4>
                            <p className="text-gray-600">{selectedProject.subject}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Supervisor</h4>
                            <p className="text-gray-600">{selectedProject.supervisor}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Type</h4>
                            <p className="text-gray-600 capitalize">{selectedProject.type}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Priority</h4>
                            <span className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(selectedProject.priority)}`}>
                              {selectedProject.priority.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm border border-blue-200">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Requirements</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {selectedProject.requirements.map((req, index) => (
                              <li key={index} className="text-gray-600 text-sm">{req}</li>
                            ))}
                          </ul>
                        </div>

                        {selectedProject.teamMembers.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-700 mb-3">Team Members</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {selectedProject.teamMembers.map(member => (
                                <div key={member.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                                  <span className="text-2xl">{member.avatar}</span>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <div className="font-medium text-gray-900">{member.name}</div>
                                      {member.isOnline && (
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                      )}
                                    </div>
                                    <div className="text-sm text-gray-600">{member.role}</div>
                                    <div className="text-sm text-gray-500">{member.email}</div>
                                  </div>
                                  <div className="text-sm font-medium text-green-600">
                                    {member.contribution}%
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Milestones & Progress</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Overall Progress</span>
                            <span>{selectedProject.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-blue-500 h-3 rounded-full transition-all"
                              style={{ width: `${selectedProject.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {selectedProject.milestones.map(milestone => (
                            <div key={milestone.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                                {milestone.completed && <CheckCircleIcon size={16} className="text-white" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="font-medium text-gray-900">{milestone.title}</div>
                                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(milestone.priority)}`}>
                                    {milestone.priority}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">{milestone.description}</div>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                                  {milestone.assignedTo && (
                                    <span>Assigned to: {milestone.assignedTo}</span>
                                  )}
                                  {milestone.completed && milestone.completedDate && (
                                    <span>Completed: {new Date(milestone.completedDate).toLocaleDateString()}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Project Details</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedProject.status)}`}>
                            {selectedProject.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Start Date:</span>
                          <span>{new Date(selectedProject.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Due Date:</span>
                          <span>{new Date(selectedProject.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time Spent:</span>
                          <span>{selectedProject.timeSpent}h / {selectedProject.estimatedHours}h</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Updated:</span>
                          <span>{new Date(selectedProject.lastUpdated).toLocaleDateString()}</span>
                        </div>
                        {selectedProject.grade && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Grade:</span>
                            <span className="font-medium text-green-600">{selectedProject.grade}%</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            setSelectedProjectForSubmission(selectedProject.id);
                            setShowSubmissionModal(true);
                            setSelectedProject(null);
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <UploadIcon size={16} />
                          Upload Submission
                        </button>
                        {selectedProject.repository && (
                          <button
                            onClick={() => openRepository(selectedProject.repository)}
                            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <CodeIcon size={16} />
                            View Repository
                          </button>
                        )}
                        {selectedProject.liveDemo && (
                          <button
                            onClick={() => openLiveDemo(selectedProject.liveDemo)}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <ExternalLinkIcon size={16} />
                            Live Demo
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">All Submissions ({selectedProject.submissions.length})</h3>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {selectedProject.submissions.map(submission => {
                          const TypeIcon = getSubmissionTypeIcon(submission.type);
                          
                          return (
                            <div key={submission.id} className="border border-gray-200 rounded-lg p-3">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-sm text-gray-900">{submission.title}</h5>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubmissionStatusColor(submission.status)}`}>
                                  {submission.status}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <TypeIcon size={12} />
                                <span>{submission.fileName}</span>
                                <span>•</span>
                                <span>{submission.fileSize}</span>
                              </div>
                              
                              <div className="flex items-center justify-between text-xs mb-2">
                                <span className="text-gray-500">
                                  {new Date(submission.uploadDate).toLocaleDateString()}
                                </span>
                                {submission.grade && (
                                  <span className="font-medium text-green-600">{submission.grade}%</span>
                                )}
                              </div>
                              
                              {submission.feedback && (
                                <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                                  <p className="text-gray-700">{submission.feedback}</p>
                                </div>
                              )}
                              
                              <div className="flex gap-1 mt-2">
                                <button 
                                  onClick={() => downloadSubmission(submission)}
                                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded text-xs transition-colors"
                                >
                                  Download
                                </button>
                                <button 
                                  onClick={() => alert(`👀 Viewing ${submission.fileName}`)}
                                  className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 px-2 rounded text-xs transition-colors"
                                >
                                  View
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        
                        {selectedProject.submissions.length === 0 && (
                          <div className="text-center py-6 text-gray-500">
                            <UploadIcon className="mx-auto mb-2" size={32} />
                            <p className="text-sm">No submissions yet</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
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

export default ProjectsStu;
