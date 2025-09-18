import React, { useState, useEffect } from 'react';
import { 
  ProjectorIcon, 
  PlusIcon, 
  CalendarIcon, 
  UsersIcon, 
  TrendingUpIcon, 
  ClockIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  SearchIcon,
  DownloadIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  UserIcon,
  BarChart3Icon
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  department: string;
  semester: string;
  students: string[];
  supervisor: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  progress: number;
  category: 'major' | 'minor' | 'capstone' | 'research';
  technologies: string[];
  budget?: number;
  priority: 'low' | 'medium' | 'high';
  milestones: Milestone[];
  documents: string[];
  createdAt: string;
  updatedAt: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  completedDate?: string;
}

interface NewProject {
  title: string;
  description: string;
  department: string;
  semester: string;
  students: string[];
  supervisor: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  progress: number;
  category: 'major' | 'minor' | 'capstone' | 'research';
  technologies: string[];
  budget: number;
  priority: 'low' | 'medium' | 'high';
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-Commerce Web Application',
      description: 'Full-stack web application with React frontend and Node.js backend for online shopping platform',
      department: 'CSE',
      semester: '6',
      students: ['Rahul Sharma', 'Priya Singh', 'Amit Kumar'],
      supervisor: 'Dr. Rajesh Verma',
      status: 'in-progress',
      startDate: '2025-08-01',
      endDate: '2025-11-30',
      progress: 65,
      category: 'major',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      budget: 15000,
      priority: 'high',
      milestones: [
        {
          id: '1',
          title: 'Frontend Development',
          description: 'Complete React frontend with all components',
          dueDate: '2025-09-15',
          isCompleted: true,
          completedDate: '2025-09-12'
        },
        {
          id: '2',
          title: 'Backend API Development',
          description: 'Develop REST APIs for all functionalities',
          dueDate: '2025-10-15',
          isCompleted: false
        }
      ],
      documents: ['proposal.pdf', 'requirements.doc'],
      createdAt: '2025-07-15T10:00:00Z',
      updatedAt: '2025-09-01T14:30:00Z'
    },
    {
      id: '2',
      title: 'IoT-based Smart Home System',
      description: 'Automated home management system using IoT sensors and mobile application',
      department: 'ECE',
      semester: '7',
      students: ['Sneha Patel', 'Arjun Reddy'],
      supervisor: 'Prof. Anita Sharma',
      status: 'review',
      startDate: '2025-07-15',
      endDate: '2025-12-15',
      progress: 85,
      category: 'capstone',
      technologies: ['Arduino', 'React Native', 'Firebase', 'ESP32'],
      budget: 25000,
      priority: 'medium',
      milestones: [
        {
          id: '3',
          title: 'Hardware Setup',
          description: 'Complete IoT sensor integration',
          dueDate: '2025-09-30',
          isCompleted: true,
          completedDate: '2025-09-25'
        }
      ],
      documents: ['technical_spec.pdf'],
      createdAt: '2025-07-01T09:00:00Z',
      updatedAt: '2025-08-30T11:20:00Z'
    },
    {
      id: '3',
      title: 'Machine Learning Stock Predictor',
      description: 'Stock price prediction system using various machine learning algorithms',
      department: 'CSE',
      semester: '8',
      students: ['Vikash Gupta'],
      supervisor: 'Dr. Meera Joshi',
      status: 'completed',
      startDate: '2025-06-01',
      endDate: '2025-08-31',
      progress: 100,
      category: 'research',
      technologies: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'],
      budget: 10000,
      priority: 'high',
      milestones: [
        {
          id: '4',
          title: 'Data Collection & Analysis',
          description: 'Gather historical stock data and perform analysis',
          dueDate: '2025-07-15',
          isCompleted: true,
          completedDate: '2025-07-10'
        },
        {
          id: '5',
          title: 'Model Development',
          description: 'Build and train ML models',
          dueDate: '2025-08-15',
          isCompleted: true,
          completedDate: '2025-08-12'
        }
      ],
      documents: ['research_paper.pdf', 'dataset.csv'],
      createdAt: '2025-05-15T08:00:00Z',
      updatedAt: '2025-08-31T16:45:00Z'
    }
  ]);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [sortBy, setSortBy] = useState<'title' | 'progress' | 'startDate' | 'priority'>('startDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  // Form and selected project states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<NewProject>({
    title: '',
    description: '',
    department: 'CSE',
    semester: '1',
    students: [],
    supervisor: '',
    status: 'planning',
    startDate: '',
    endDate: '',
    progress: 0,
    category: 'major',
    technologies: [],
    budget: 0,
    priority: 'medium'
  });

  // Input helpers
  const [studentInput, setStudentInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  const departments = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];
  const statuses = ['planning', 'in-progress', 'review', 'completed', 'on-hold'];
  const categories = ['major', 'minor', 'capstone', 'research'];
  const priorities = ['low', 'medium', 'high'];
  const semesters = Array.from({ length: 8 }, (_, i) => (i + 1).toString());

  // Filter and sort projects
  useEffect(() => {
    let filtered = projects;

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.supervisor.toLowerCase().includes(term) ||
        p.students.some(s => s.toLowerCase().includes(term)) ||
        p.technologies.some(t => t.toLowerCase().includes(term))
      );
    }

    // Apply other filters
    if (selectedDepartment !== 'all') filtered = filtered.filter(p => p.department === selectedDepartment);
    if (selectedStatus !== 'all') filtered = filtered.filter(p => p.status === selectedStatus);
    if (selectedCategory !== 'all') filtered = filtered.filter(p => p.category === selectedCategory);
    if (selectedPriority !== 'all') filtered = filtered.filter(p => p.priority === selectedPriority);

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'progress':
          comparison = a.progress - b.progress;
          break;
        case 'startDate':
          comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          break;
        case 'priority':
          { const priorityOrder = { low: 1, medium: 2, high: 3 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break; }
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredProjects(filtered);
  }, [searchTerm, selectedDepartment, selectedStatus, selectedCategory, selectedPriority, sortBy, sortOrder, projects]);

  // Helper functions
  const getStatusColor = (status: string) => {
    const colors = {
      planning: 'bg-gray-100 text-gray-800 border-gray-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      review: 'bg-orange-100 text-orange-800 border-orange-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      'on-hold': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors];
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      major: 'bg-purple-100 text-purple-800 border-purple-200',
      minor: 'bg-blue-100 text-blue-800 border-blue-200',
      capstone: 'bg-red-100 text-red-800 border-red-200',
      research: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[category as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // CRUD Operations
  const handleCreateProject = () => {
    if (!newProject.title || !newProject.supervisor || !newProject.startDate || !newProject.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const project: Project = {
        ...newProject,
        id: Date.now().toString(),
        milestones: [],
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setProjects([...projects, project]);
      resetForm();
      setIsCreateModalOpen(false);
      setLoading(false);
      alert('Project created successfully!');
    }, 500);
  };

  const handleEditProject = () => {
    if (!editingProject) return;

    setLoading(true);
    setTimeout(() => {
      const updatedProjects = projects.map(p =>
        p.id === editingProject.id
          ? {
              ...editingProject,
              updatedAt: new Date().toISOString()
            }
          : p
      );

      setProjects(updatedProjects);
      setIsEditModalOpen(false);
      setEditingProject(null);
      setLoading(false);
      alert('Project updated successfully!');
    }, 500);
  };

  const handleDeleteProject = () => {
    if (!selectedProject) return;

    setLoading(true);
    setTimeout(() => {
      setProjects(projects.filter(p => p.id !== selectedProject.id));
      setIsDeleteModalOpen(false);
      setSelectedProject(null);
      setLoading(false);
      alert('Project deleted successfully!');
    }, 500);
  };

  const handleUpdateProgress = (projectId: string, newProgress: number) => {
    const updatedProjects = projects.map(p =>
      p.id === projectId
        ? {
            ...p,
            progress: newProgress,
            status: newProgress === 100 ? 'completed' as const : p.status,
            updatedAt: new Date().toISOString()
          }
        : p
    );
    setProjects(updatedProjects);
    setIsProgressModalOpen(false);
    alert('Progress updated successfully!');
  };

  const addStudent = () => {
    if (studentInput.trim() && !newProject.students.includes(studentInput.trim())) {
      setNewProject({
        ...newProject,
        students: [...newProject.students, studentInput.trim()]
      });
      setStudentInput('');
    }
  };

  const removeStudent = (student: string) => {
    setNewProject({
      ...newProject,
      students: newProject.students.filter(s => s !== student)
    });
  };

  const addTechnology = () => {
    if (techInput.trim() && !newProject.technologies.includes(techInput.trim())) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter(t => t !== tech)
    });
  };

  const resetForm = () => {
    setNewProject({
      title: '',
      description: '',
      department: 'CSE',
      semester: '1',
      students: [],
      supervisor: '',
      status: 'planning',
      startDate: '',
      endDate: '',
      progress: 0,
      category: 'major',
      technologies: [],
      budget: 0,
      priority: 'medium'
    });
    setStudentInput('');
    setTechInput('');
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      description: project.description,
      department: project.department,
      semester: project.semester,
      students: project.students,
      supervisor: project.supervisor,
      status: project.status,
      startDate: project.startDate,
      endDate: project.endDate,
      progress: project.progress,
      category: project.category,
      technologies: project.technologies,
      budget: project.budget || 0,
      priority: project.priority
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const openViewModal = (project: Project) => {
    setSelectedProject(project);
    setIsViewModalOpen(true);
  };

  const openProgressModal = (project: Project) => {
    setSelectedProject(project);
    setIsProgressModalOpen(true);
  };

  const exportProjects = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Title,Department,Semester,Status,Progress,Supervisor,Students,Start Date,End Date,Category,Priority\n" +
      filteredProjects.map(p => 
        `"${p.title}","${p.department}","${p.semester}","${p.status}",${p.progress}%,"${p.supervisor}","${p.students.join('; ')}","${p.startDate}","${p.endDate}","${p.category}","${p.priority}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "projects_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('all');
    setSelectedStatus('all');
    setSelectedCategory('all');
    setSelectedPriority('all');
  };

  // Statistics
  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
    onHold: projects.filter(p => p.status === 'on-hold').length,
    avgProgress: projects.length > 0 ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) : 0,
    totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Management System</h1>
              <p className="text-gray-600 mt-1">Monitor, manage, and track student projects across all departments</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {/*<button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Create Project
              </button>*/}
              <button
                onClick={exportProjects}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Export
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects by title, description, supervisor, or students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                {priorities.map(priority => (
                  <option key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'title' | 'progress' | 'startDate' | 'priority')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="startDate">Start Date</option>
                <option value="title">Title</option>
                <option value="progress">Progress</option>
                <option value="priority">Priority</option>
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

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <ProjectorIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <ClockIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckCircleIcon className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">On Hold</p>
                <p className="text-2xl font-bold text-red-600">{stats.onHold}</p>
              </div>
              <AlertCircleIcon className="text-red-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Progress</p>
                <p className="text-2xl font-bold text-orange-600">{stats.avgProgress}%</p>
              </div>
              <TrendingUpIcon className="text-orange-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Budget</p>
                <p className="text-2xl font-bold text-purple-600">₹{stats.totalBudget.toLocaleString()}</p>
              </div>
              <BarChart3Icon className="text-purple-500" size={24} />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
              {/* Project Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                </div>
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={() => openViewModal(project)}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                  >
                    <EyeIcon size={16} />
                  </button>
                  <button
                    onClick={() => openEditModal(project)}
                    className="text-gray-400 hover:text-green-600 transition-colors p-1"
                  >
                    <EditIcon size={16} />
                  </button>
                  <button
                    onClick={() => openDeleteModal(project)}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>

              {/* Project Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ').toUpperCase()}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                  {project.category.toUpperCase()}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                  {project.priority.toUpperCase()}
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {project.department} - S{project.semester}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Progress</span>
                  <span className="font-semibold">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all ${getProgressColor(project.progress)}`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <UsersIcon size={16} />
                  <span className="truncate">Students: {project.students.join(', ')}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <UserIcon size={16} />
                  <span>Supervisor: {project.supervisor}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarIcon size={16} />
                  <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                </div>
                
                {project.budget && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <BarChart3Icon size={16} />
                    <span>Budget: ₹{project.budget.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => openViewModal(project)}
                  className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-lg transition-colors text-sm"
                >
                  View Details
                </button>
                {/*<button
                  onClick={() => openProgressModal(project)}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-2 px-3 rounded-lg transition-colors text-sm"
                >
                  Update Progress
                </button>*/}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <ProjectorIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedDepartment !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your filters or search terms'
                : 'Create your first project to get started'
              }
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create Project
            </button>
          </div>
        )}

        {/* Create Project Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Project</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supervisor *</label>
                  <input
                    type="text"
                    value={newProject.supervisor}
                    onChange={(e) => setNewProject({...newProject, supervisor: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter supervisor name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={newProject.department}
                    onChange={(e) => setNewProject({...newProject, department: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                  <select
                    value={newProject.semester}
                    onChange={(e) => setNewProject({...newProject, semester: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {semesters.map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({...newProject, category: e.target.value as 'major' | 'minor' | 'capstone' | 'research'})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newProject.priority}
                    onChange={(e) => setNewProject({...newProject, priority: e.target.value as 'low' | 'medium' | 'high'})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                  <input
                    type="date"
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget (₹)</label>
                  <input
                    type="number"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({...newProject, budget: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter budget amount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({...newProject, status: e.target.value as 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold'})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project description"
                ></textarea>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Students</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={studentInput}
                    onChange={(e) => setStudentInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addStudent()}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Add student name"
                  />
                  <button
                    onClick={addStudent}
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newProject.students.map((student, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                      {student}
                      <button
                        onClick={() => removeStudent(student)}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Add technology"
                  />
                  <button
                    onClick={addTechnology}
                    type="button"
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newProject.technologies.map((tech, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                      {tech}
                      <button
                        onClick={() => removeTechnology(tech)}
                        type="button"
                        className="text-green-600 hover:text-green-800"
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
                    setIsCreateModalOpen(false);
                    resetForm();
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProject}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Project Modal */}
        {isViewModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">{selectedProject.title}</h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Project Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Department:</span>
                      <span>{selectedProject.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Semester:</span>
                      <span>{selectedProject.semester}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Category:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedProject.category)}`}>
                        {selectedProject.category.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProject.status)}`}>
                        {selectedProject.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Priority:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedProject.priority)}`}>
                        {selectedProject.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Supervisor:</span>
                      <span>{selectedProject.supervisor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Duration:</span>
                      <span>
                        {formatDate(selectedProject.startDate)} - {formatDate(selectedProject.endDate)}
                      </span>
                    </div>
                    {selectedProject.budget && (
                      <div className="flex justify-between">
                        <span className="font-medium">Budget:</span>
                        <span>₹{selectedProject.budget.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Team & Progress</h3>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Students</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.students.map((student, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {student}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Progress</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${getProgressColor(selectedProject.progress)}`}
                          style={{ width: `${selectedProject.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{selectedProject.progress}%</span>
                    </div>
                  </div>
                  
                  {selectedProject.milestones.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Milestones</h4>
                      <div className="space-y-2">
                        {selectedProject.milestones.map((milestone) => (
                          <div key={milestone.id} className="flex items-center gap-2 text-sm">
                            {milestone.isCompleted ? (
                              <CheckCircleIcon size={16} className="text-green-500" />
                            ) : (
                              <ClockIcon size={16} className="text-gray-400" />
                            )}
                            <span className={milestone.isCompleted ? 'line-through text-gray-500' : ''}>
                              {milestone.title}
                            </span>
                            <span className="text-gray-400 text-xs">
                              ({formatDate(milestone.dueDate)})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => openProgressModal(selectedProject)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Update Progress
                </button>
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    openEditModal(selectedProject);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Edit Project
                </button>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Project Modal */}
        {isEditModalOpen && editingProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Project</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({...newProject, status: e.target.value as 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold'})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingProject(null);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (editingProject) {
                      setEditingProject({
                        ...editingProject,
                        title: newProject.title,
                        description: newProject.description,
                        status: newProject.status
                      });
                      handleEditProject();
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

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Project</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "<strong>{selectedProject.title}</strong>"? 
                This action cannot be undone and will remove all project data.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedProject(null);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProject}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress Update Modal */}
        {isProgressModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Update Progress</h2>
              <p className="text-gray-600 mb-4">Project: <strong>{selectedProject.title}</strong></p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Progress: {newProject.progress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newProject.progress}
                  onChange={(e) => setNewProject({...newProject, progress: Number(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsProgressModalOpen(false);
                    setNewProject({...newProject, progress: selectedProject.progress});
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateProgress(selectedProject.id, newProject.progress)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Update Progress
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;