import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Download, 
  Search,
  Filter,
  Sun,
  Moon,
  Eye,
  FileText,
  Video,
  Link,
  Image,
  Archive,
  Star,
  Calendar,
  User,
  Tag
} from 'lucide-react';

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  subject: string;
  faculty: string;
  unit: string;
  chapter: string;
  type: 'pdf' | 'video' | 'presentation' | 'image' | 'archive' | 'link';
  category: 'notes' | 'reference' | 'assignment' | 'tutorial' | 'quiz' | 'project';
  uploadDate: string;
  fileSize: string;
  downloads: number;
  rating: number;
  tags: string[];
  url: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const StudyMaterial: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  // Sample study materials data
  const [studyMaterials] = useState<StudyMaterial[]>([
    {
      id: '1',
      title: 'Data Structures Complete Notes',
      description: 'Comprehensive notes covering all data structures with examples and implementations',
      subject: 'Data Structures & Algorithms',
      faculty: 'Dr. Rajesh Kumar',
      unit: 'All Units',
      chapter: 'Complete Syllabus',
      type: 'pdf',
      category: 'notes',
      uploadDate: '2025-09-15',
      fileSize: '5.2 MB',
      downloads: 245,
      rating: 4.8,
      tags: ['arrays', 'linked-lists', 'trees', 'graphs'],
      url: '#',
      difficulty: 'intermediate'
    },
    {
      id: '2',
      title: 'Database Design Tutorial Videos',
      description: 'Step-by-step video tutorials for database design and normalization',
      subject: 'Database Management Systems',
      faculty: 'Prof. Priya Sharma',
      unit: 'Unit 2-3',
      chapter: 'Database Design',
      type: 'video',
      category: 'tutorial',
      uploadDate: '2025-09-20',
      fileSize: '850 MB',
      downloads: 128,
      rating: 4.6,
      tags: ['normalization', 'er-diagram', 'sql'],
      url: '#',
      difficulty: 'beginner'
    },
    {
      id: '3',
      title: 'Machine Learning Algorithms Reference',
      description: 'Quick reference guide for all ML algorithms with implementation tips',
      subject: 'Machine Learning',
      faculty: 'Dr. Arjun Reddy',
      unit: 'Unit 1-4',
      chapter: 'All Algorithms',
      type: 'pdf',
      category: 'reference',
      uploadDate: '2025-09-18',
      fileSize: '3.7 MB',
      downloads: 189,
      rating: 4.9,
      tags: ['classification', 'regression', 'clustering', 'neural-networks'],
      url: '#',
      difficulty: 'advanced'
    },
    {
      id: '4',
      title: 'Web Development Project Templates',
      description: 'Collection of web development project templates and starter codes',
      subject: 'Web Technologies',
      faculty: 'Ms. Kavya Singh',
      unit: 'Unit 4-5',
      chapter: 'Project Work',
      type: 'archive',
      category: 'project',
      uploadDate: '2025-09-22',
      fileSize: '125 MB',
      downloads: 167,
      rating: 4.7,
      tags: ['react', 'nodejs', 'html', 'css', 'javascript'],
      url: '#',
      difficulty: 'intermediate'
    },
    {
      id: '5',
      title: 'Network Security Presentation Slides',
      description: 'Detailed presentation slides covering network security concepts and protocols',
      subject: 'Network Security',
      faculty: 'Prof. Deepika Nair',
      unit: 'Unit 1-2',
      chapter: 'Security Fundamentals',
      type: 'presentation',
      category: 'notes',
      uploadDate: '2025-09-10',
      fileSize: '15.8 MB',
      downloads: 203,
      rating: 4.5,
      tags: ['encryption', 'protocols', 'firewall', 'vpn'],
      url: '#',
      difficulty: 'intermediate'
    },
    {
      id: '6',
      title: 'Software Testing Assignment Problems',
      description: 'Practice problems and assignments for software testing methodologies',
      subject: 'Software Engineering',
      faculty: 'Dr. Vikash Yadav',
      unit: 'Unit 5',
      chapter: 'Testing Methods',
      type: 'pdf',
      category: 'assignment',
      uploadDate: '2025-09-25',
      fileSize: '2.1 MB',
      downloads: 89,
      rating: 4.4,
      tags: ['unit-testing', 'integration-testing', 'automation'],
      url: '#',
      difficulty: 'intermediate'
    },
    {
      id: '7',
      title: 'Algorithm Visualization Tools',
      description: 'Interactive tools and links for visualizing algorithms and data structures',
      subject: 'Data Structures & Algorithms',
      faculty: 'Dr. Rajesh Kumar',
      unit: 'All Units',
      chapter: 'Visual Learning',
      type: 'link',
      category: 'tutorial',
      uploadDate: '2025-09-12',
      fileSize: 'N/A',
      downloads: 156,
      rating: 4.6,
      tags: ['visualization', 'interactive', 'learning'],
      url: '#',
      difficulty: 'beginner'
    },
    {
      id: '8',
      title: 'Database Schema Diagrams',
      description: 'Sample database schema diagrams and ER models for reference',
      subject: 'Database Management Systems',
      faculty: 'Prof. Priya Sharma',
      unit: 'Unit 2',
      chapter: 'Database Modeling',
      type: 'image',
      category: 'reference',
      uploadDate: '2025-09-14',
      fileSize: '8.5 MB',
      downloads: 134,
      rating: 4.3,
      tags: ['er-diagram', 'schema', 'modeling'],
      url: '#',
      difficulty: 'beginner'
    }
  ]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = searchTerm === '' || 
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === '' || material.type === typeFilter;
    const matchesCategory = categoryFilter === '' || material.category === categoryFilter;
    const matchesSubject = subjectFilter === '' || material.subject === subjectFilter;
    
    return matchesSearch && matchesType && matchesCategory && matchesSubject;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'video': return <Video className="w-5 h-5 text-blue-500" />;
      case 'presentation': return <FileText className="w-5 h-5 text-orange-500" />;
      case 'image': return <Image className="w-5 h-5 text-green-500" />;
      case 'archive': return <Archive className="w-5 h-5 text-purple-500" />;
      case 'link': return <Link className="w-5 h-5 text-indigo-500" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'notes': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'reference': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'assignment': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
      case 'tutorial': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'quiz': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'project': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500 text-white';
      case 'intermediate': return 'bg-yellow-500 text-white';
      case 'advanced': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleViewDetails = (material: StudyMaterial) => {
    setSelectedMaterial(material);
    setShowDetailModal(true);
  };

  const handleDownload = (material: StudyMaterial) => {
    // Simulate download
    console.log('Downloading:', material.title);
    // Update download count (in real app, this would be an API call)
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const summaryStats = {
    total: studyMaterials.length,
    notes: studyMaterials.filter(m => m.category === 'notes').length,
    videos: studyMaterials.filter(m => m.type === 'video').length,
    assignments: studyMaterials.filter(m => m.category === 'assignment').length,
    projects: studyMaterials.filter(m => m.category === 'project').length,
    totalDownloads: studyMaterials.reduce((acc, m) => acc + m.downloads, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-blue-500" />
            Study Materials
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Access comprehensive study materials, notes, videos, and resources for all your subjects
          </p>
        </div>
        <button
          className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-xl hover:bg-blue-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total</p>
              <p className="text-2xl font-bold">{summaryStats.total}</p>
            </div>
            <BookOpen className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Notes</p>
              <p className="text-2xl font-bold">{summaryStats.notes}</p>
            </div>
            <FileText className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Videos</p>
              <p className="text-2xl font-bold">{summaryStats.videos}</p>
            </div>
            <Video className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Assignments</p>
              <p className="text-2xl font-bold">{summaryStats.assignments}</p>
            </div>
            <FileText className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm font-medium">Projects</p>
              <p className="text-2xl font-bold">{summaryStats.projects}</p>
            </div>
            <Archive className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Downloads</p>
              <p className="text-2xl font-bold">{summaryStats.totalDownloads}</p>
            </div>
            <Download className="w-6 h-6 opacity-80" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
            <option value="presentation">Presentation</option>
            <option value="image">Image</option>
            <option value="archive">Archive</option>
            <option value="link">Link</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="notes">Notes</option>
            <option value="reference">Reference</option>
            <option value="assignment">Assignment</option>
            <option value="tutorial">Tutorial</option>
            <option value="quiz">Quiz</option>
            <option value="project">Project</option>
          </select>

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Subjects</option>
            <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
            <option value="Database Management Systems">Database Management Systems</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Web Technologies">Web Technologies</option>
            <option value="Network Security">Network Security</option>
            <option value="Software Engineering">Software Engineering</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm('');
              setTypeFilter('');
              setCategoryFilter('');
              setSubjectFilter('');
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Study Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <div
            key={material.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(material.type)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(material.difficulty)}`}>
                    {material.difficulty.toUpperCase()}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(material.category)}`}>
                  {material.category.toUpperCase()}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {material.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {material.description}
              </p>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">{material.subject}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{material.faculty}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(material.uploadDate).toLocaleDateString('en-IN')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Size: {material.fileSize}</span>
                  <span className="text-gray-600 dark:text-gray-400">{material.downloads} downloads</span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(material.rating)}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {material.rating}/5
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {material.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {material.tags.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      +{material.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewDetails(material)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => handleDownload(material)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedMaterial.title}
              </h2>
              <button
                className="text-gray-400 hover:text-red-500 text-2xl font-bold"
                onClick={() => setShowDetailModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Material Details</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedMaterial.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Subject:</span>
                        <p className="text-gray-600 dark:text-gray-400">{selectedMaterial.subject}</p>
                      </div>
                      <div>
                        <span className="font-medium">Faculty:</span>
                        <p className="text-gray-600 dark:text-gray-400">{selectedMaterial.faculty}</p>
                      </div>
                      <div>
                        <span className="font-medium">Unit:</span>
                        <p className="text-gray-600 dark:text-gray-400">{selectedMaterial.unit}</p>
                      </div>
                      <div>
                        <span className="font-medium">Chapter:</span>
                        <p className="text-gray-600 dark:text-gray-400">{selectedMaterial.chapter}</p>
                      </div>
                      <div>
                        <span className="font-medium">Upload Date:</span>
                        <p className="text-gray-600 dark:text-gray-400">{new Date(selectedMaterial.uploadDate).toLocaleDateString('en-IN')}</p>
                      </div>
                      <div>
                        <span className="font-medium">File Size:</span>
                        <p className="text-gray-600 dark:text-gray-400">{selectedMaterial.fileSize}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMaterial.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Material Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Type:</span>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(selectedMaterial.type)}
                          <span className="capitalize">{selectedMaterial.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Category:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(selectedMaterial.category)}`}>
                          {selectedMaterial.category.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Difficulty:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(selectedMaterial.difficulty)}`}>
                          {selectedMaterial.difficulty.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Downloads:</span>
                        <span className="font-medium">{selectedMaterial.downloads}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Rating:</span>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {renderStars(selectedMaterial.rating)}
                          </div>
                          <span className="font-medium">{selectedMaterial.rating}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Quick Access</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-300 mb-3">
                      Download or access this study material directly
                    </p>
                    <button
                      onClick={() => handleDownload(selectedMaterial)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2"
                    >
                      {selectedMaterial.type === 'link' ? <Link className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                      <span>{selectedMaterial.type === 'link' ? 'Open Link' : 'Download Now'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setShowDetailModal(false)}
              >
                Close
              </button>
              <button
                onClick={() => handleDownload(selectedMaterial)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyMaterial;
