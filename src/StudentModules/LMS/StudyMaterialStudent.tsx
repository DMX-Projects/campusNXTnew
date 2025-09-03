import React, { useState, useEffect } from 'react';
import { 
  BookOpenIcon, 
  DownloadIcon, 
  FileTextIcon, 
  VideoIcon, 
  ImageIcon,
  SearchIcon,
  EyeIcon,
  ShareIcon,
  StarIcon,
  LinkIcon,
  PlayCircleIcon,
  SortAscIcon,
  SortDescIcon,
  ClockIcon,
  UserIcon,
  RefreshCwIcon,
  XIcon,
  CheckCircleIcon,
  PresentationIcon
} from 'lucide-react';

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  subject: string;
  unit: string;
  type: 'pdf' | 'video' | 'document' | 'presentation' | 'link' | 'image';
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  downloadCount: number;
  rating: number;
  isFavorite: boolean;
  isDownloaded: boolean;
  url: string;
  thumbnail?: string;
  duration?: string;
  tags: string[];
  viewCount: number;
  lastAccessed?: string;
  fileId?: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  semester: string;
  materialsCount: number;
  lastUpdated: string;
  color: string;
}

const StudyMaterialStu: React.FC = () => {
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([
    {
      id: '1',
      title: 'Data Structures - Arrays and Linked Lists',
      description: 'Comprehensive guide covering arrays, linked lists, implementation and time complexity analysis with practical examples and exercises.',
      subject: 'Data Structures',
      unit: 'Unit 1',
      type: 'pdf',
      size: '2.5 MB',
      uploadedBy: 'Dr. Rajesh Kumar',
      uploadedDate: '2025-09-01',
      downloadCount: 156,
      rating: 4.8,
      isFavorite: true,
      isDownloaded: false,
      url: '/materials/ds-arrays-linked-lists.pdf',
      tags: ['arrays', 'linked-lists', 'data-structures', 'algorithms'],
      viewCount: 234,
      lastAccessed: '2025-09-02'
    },
    {
      id: '2',
      title: 'DBMS Video Lecture - SQL Fundamentals',
      description: 'Interactive video lecture covering SQL basics, complex queries, joins, subqueries, and advanced database operations with live demonstrations.',
      subject: 'Database Management',
      unit: 'Unit 2',
      type: 'video',
      size: '125 MB',
      uploadedBy: 'Prof. Priya Sharma',
      uploadedDate: '2025-08-30',
      downloadCount: 89,
      rating: 4.6,
      isFavorite: false,
      isDownloaded: true,
      url: '/materials/dbms-sql-fundamentals.mp4',
      duration: '45:30',
      thumbnail: '/thumbnails/dbms-sql.jpg',
      tags: ['sql', 'database', 'queries', 'joins'],
      viewCount: 178,
      lastAccessed: '2025-09-01'
    },
    {
      id: '3',
      title: 'Operating Systems - Process Management',
      description: 'Detailed comprehensive notes on process scheduling algorithms, synchronization mechanisms, deadlock handling, and memory management.',
      subject: 'Operating Systems',
      unit: 'Unit 3',
      type: 'document',
      size: '1.8 MB',
      uploadedBy: 'Dr. Amit Singh',
      uploadedDate: '2025-08-28',
      downloadCount: 234,
      rating: 4.9,
      isFavorite: true,
      isDownloaded: false,
      url: '/materials/os-process-management.docx',
      tags: ['processes', 'scheduling', 'synchronization', 'deadlock'],
      viewCount: 298,
      lastAccessed: '2025-08-30'
    },
    {
      id: '4',
      title: 'Software Engineering Presentation - SDLC Models',
      description: 'Visual presentation covering Software Development Life Cycle models including Waterfall, Agile, Spiral, and DevOps methodologies.',
      subject: 'Software Engineering',
      unit: 'Unit 1',
      type: 'presentation',
      size: '3.2 MB',
      uploadedBy: 'Prof. Neha Gupta',
      uploadedDate: '2025-08-25',
      downloadCount: 67,
      rating: 4.4,
      isFavorite: false,
      isDownloaded: true,
      url: '/materials/se-sdlc-models.pptx',
      tags: ['sdlc', 'agile', 'waterfall', 'methodology'],
      viewCount: 145
    },
    {
      id: '5',
      title: 'Computer Networks - Protocol Stack Diagram',
      description: 'Detailed visual diagram explaining the OSI and TCP/IP protocol stacks with layer-wise functionality and data flow.',
      subject: 'Computer Networks',
      unit: 'Unit 2',
      type: 'image',
      size: '890 KB',
      uploadedBy: 'Prof. Ravi Mehta',
      uploadedDate: '2025-08-27',
      downloadCount: 123,
      rating: 4.7,
      isFavorite: true,
      isDownloaded: false,
      url: '/materials/networks-protocol-stack.png',
      tags: ['osi', 'tcp-ip', 'protocols', 'networking'],
      viewCount: 189
    },
    {
      id: '6',
      title: 'Mathematics Online Calculator',
      description: 'Interactive web-based calculator for solving complex mathematical equations, matrix operations, and statistical calculations.',
      subject: 'Mathematics',
      unit: 'Unit 4',
      type: 'link',
      size: 'Web App',
      uploadedBy: 'Prof. Sunita Devi',
      uploadedDate: '2025-09-02',
      downloadCount: 45,
      rating: 4.3,
      isFavorite: false,
      isDownloaded: false,
      url: 'https://calculator.math.edu',
      tags: ['calculator', 'equations', 'matrix', 'statistics'],
      viewCount: 78
    }
  ]);

  const [subjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Data Structures',
      code: 'CS301',
      semester: '3',
      materialsCount: 15,
      lastUpdated: '2025-09-01',
      color: 'blue'
    },
    {
      id: '2',
      name: 'Database Management',
      code: 'CS302',
      semester: '3',
      materialsCount: 12,
      lastUpdated: '2025-08-30',
      color: 'green'
    },
    {
      id: '3',
      name: 'Operating Systems',
      code: 'CS303',
      semester: '3',
      materialsCount: 18,
      lastUpdated: '2025-08-28',
      color: 'purple'
    },
    {
      id: '4',
      name: 'Software Engineering',
      code: 'CS304',
      semester: '3',
      materialsCount: 10,
      lastUpdated: '2025-08-25',
      color: 'orange'
    },
    {
      id: '5',
      name: 'Computer Networks',
      code: 'CS305',
      semester: '3',
      materialsCount: 14,
      lastUpdated: '2025-08-27',
      color: 'red'
    },
    {
      id: '6',
      name: 'Mathematics',
      code: 'MA301',
      semester: '3',
      materialsCount: 8,
      lastUpdated: '2025-09-02',
      color: 'indigo'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'downloads' | 'rating'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showDownloadedOnly, setShowDownloadedOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});

  // Check for mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Filter and sort materials
  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject;
    const matchesType = selectedType === 'all' || material.type === selectedType;
    const matchesUnit = selectedUnit === 'all' || material.unit === selectedUnit;
    const matchesFavorites = !showFavoritesOnly || material.isFavorite;
    const matchesDownloaded = !showDownloadedOnly || material.isDownloaded;
    
    return matchesSearch && matchesSubject && matchesType && matchesUnit && matchesFavorites && matchesDownloaded;
  }).sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'name':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'date':
        comparison = new Date(a.uploadedDate).getTime() - new Date(b.uploadedDate).getTime();
        break;
      case 'downloads':
        comparison = a.downloadCount - b.downloadCount;
        break;
      case 'rating':
        comparison = a.rating - b.rating;
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const getTypeIcon = (type: string) => {
    const icons = {
      pdf: FileTextIcon,
      video: VideoIcon,
      document: FileTextIcon,
      presentation: PresentationIcon,
      link: LinkIcon,
      image: ImageIcon
    };
    return icons[type as keyof typeof icons] || FileTextIcon;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      pdf: 'bg-red-100 text-red-800 border-red-200',
      video: 'bg-purple-100 text-purple-800 border-purple-200',
      document: 'bg-blue-100 text-blue-800 border-blue-200',
      presentation: 'bg-orange-100 text-orange-800 border-orange-200',
      link: 'bg-green-100 text-green-800 border-green-200',
      image: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[type as keyof typeof colors];
  };

  const getSubjectColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
      indigo: 'bg-indigo-500'
    };
    return colors[color as keyof typeof colors];
  };

  const handleDownload = async (material: StudyMaterial) => {
    try {
      setDownloadProgress({ ...downloadProgress, [material.id]: 0 });
      
      // Simulate download progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          const currentProgress = prev[material.id] || 0;
          if (currentProgress >= 100) {
            clearInterval(progressInterval);
            return prev;
          }
          return { ...prev, [material.id]: currentProgress + 10 };
        });
      }, 200);

      // Simulate download completion
      setTimeout(() => {
        clearInterval(progressInterval);
        setDownloadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[material.id];
          return newProgress;
        });

        setStudyMaterials(prev => prev.map(m => 
          m.id === material.id 
            ? { 
                ...m, 
                downloadCount: m.downloadCount + 1, 
                isDownloaded: true,
                lastAccessed: new Date().toISOString().split('T')[0]
              }
            : m
        ));

        // Trigger actual download
        const link = document.createElement('a');
        link.href = material.url;
        link.download = material.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert(`✅ ${material.title} downloaded successfully!`);
      }, 2200);

    } catch (error) {
      alert('❌ Download failed. Please try again.');
      setDownloadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[material.id];
        return newProgress;
      });
    }
  };

  const toggleFavorite = (materialId: string) => {
    setStudyMaterials(prev => prev.map(m => 
      m.id === materialId ? { ...m, isFavorite: !m.isFavorite } : m
    ));
    
    const material = studyMaterials.find(m => m.id === materialId);
    if (material) {
      const action = material.isFavorite ? 'removed from' : 'added to';
      alert(`📌 ${material.title} ${action} favorites!`);
    }
  };

  const shareMaterial = async (material: StudyMaterial) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: material.title,
          text: material.description,
          url: `${window.location.origin}${material.url}`
        });
      } else {
        const shareText = `📚 ${material.title}\n\n${material.description}\n\n🔗 ${window.location.origin}${material.url}`;
        await navigator.clipboard.writeText(shareText);
        alert('🔗 Study material link copied to clipboard!');
      }
    } catch (error) {
      alert('❌ Sharing failed. Please try again.');
    }
  };

  const previewMaterial = (material: StudyMaterial) => {
    setSelectedMaterial(material);
    setShowPreviewModal(true);
    
    // Update view count
    setStudyMaterials(prev => prev.map(m => 
      m.id === material.id 
        ? { ...m, viewCount: m.viewCount + 1, lastAccessed: new Date().toISOString().split('T')[0] }
        : m
    ));
  };

  const refreshMaterials = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('📚 Materials refreshed successfully!');
    } catch (error) {
      alert('❌ Failed to refresh materials.');
    } finally {
      setIsLoading(false);
    }
  };

  const syncOfflineMaterials = async () => {
    try {
      const downloadedMaterials = studyMaterials.filter(m => m.isDownloaded);
      alert(`📱 ${downloadedMaterials.length} materials synced for offline access!`);
    } catch (error) {
      alert('❌ Sync failed. Please check your internet connection.');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSubject('all');
    setSelectedType('all');
    setSelectedUnit('all');
    setShowFavoritesOnly(false);
    setShowDownloadedOnly(false);
  };

  const units = Array.from(new Set(studyMaterials.map(m => m.unit))).sort();

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Study Materials</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Access course materials, notes, videos, and resources</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm ${
                  showFavoritesOnly 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <StarIcon size={16} />
                <span className="hidden sm:inline">Favorites</span>
              </button>
              <button
                onClick={refreshMaterials}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
              >
                <RefreshCwIcon size={16} className={isLoading ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">{isLoading ? 'Refresh...' : 'Refresh'}</span>
              </button>
              {/* <button
                onClick={syncOfflineMaterials}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
              >
                <span className="hidden sm:inline">Offline</span>
                <span className="sm:hidden">📱</span>
              </button> */}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search materials by title, description, author, or tags..."
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
              
              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.name}>{subject.name}</option>
                  ))}
                </select>
                
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="pdf">PDF</option>
                  <option value="video">Video</option>
                  <option value="document">Document</option>
                  <option value="presentation">Presentation</option>
                  <option value="link">Link</option>
                  <option value="image">Image</option>
                </select>
                
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Units</option>
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Toggles */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowDownloadedOnly(!showDownloadedOnly)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  showDownloadedOnly 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Downloaded Only
              </button>
              
              {(searchTerm || selectedSubject !== 'all' || selectedType !== 'all' || selectedUnit !== 'all' || showFavoritesOnly || showDownloadedOnly) && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-sm transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Sort and View Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'downloads' | 'rating')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="date">Upload Date</option>
                <option value="name">Name</option>
                <option value="downloads">Downloads</option>
                <option value="rating">Rating</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                {sortOrder === 'asc' ? <SortAscIcon size={16} /> : <SortDescIcon size={16} />}
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {filteredMaterials.length} materials
              </span>
              
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-l-lg`}
                  title="Grid View"
                >
                  <div className="grid grid-cols-2 gap-1 w-4 h-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-r-lg`}
                  title="List View"
                >
                  <div className="space-y-1">
                    <div className="w-4 h-1 bg-current rounded"></div>
                    <div className="w-4 h-1 bg-current rounded"></div>
                    <div className="w-4 h-1 bg-current rounded"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Subjects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {subjects.map(subject => (
            <div key={subject.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all cursor-pointer"
                 onClick={() => setSelectedSubject(subject.name)}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.code} • Semester {subject.semester}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${getSubjectColor(subject.color)} flex-shrink-0 ml-2`}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">{subject.materialsCount}</p>
                  <p className="text-sm text-gray-600">Materials</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Updated</p>
                  <p className="text-sm font-medium">{new Date(subject.lastUpdated).toLocaleDateString()}</p>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSubject(subject.name);
                }}
                className="w-full mt-4 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg transition-colors text-sm"
              >
                View Materials
              </button>
            </div>
          ))}
        </div>

        {/* Study Materials */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Study Materials ({filteredMaterials.length})
            </h2>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredMaterials.map(material => {
                  const TypeIcon = getTypeIcon(material.type);
                  const isDownloading = downloadProgress[material.id] !== undefined;
                  
                  return (
                    <div key={material.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`p-2 rounded-lg ${getTypeColor(material.type)} flex-shrink-0`}>
                            <TypeIcon size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(material.type)}`}>
                              {material.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-1 flex-shrink-0">
                          <button
                            onClick={() => toggleFavorite(material.id)}
                            className={`p-1 rounded transition-colors ${
                              material.isFavorite 
                                ? 'text-yellow-500 hover:text-yellow-600' 
                                : 'text-gray-400 hover:text-yellow-500'
                            }`}
                          >
                            <StarIcon size={16} fill={material.isFavorite ? 'currentColor' : 'none'} />
                          </button>
                          <button
                            onClick={() => shareMaterial(material)}
                            className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded"
                          >
                            <ShareIcon size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        {material.type === 'video' && material.thumbnail && (
                          <div className="relative mb-3">
                            <img 
                              src={material.thumbnail} 
                              alt={material.title}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                              <PlayCircleIcon className="text-white" size={32} />
                            </div>
                            {material.duration && (
                              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                {material.duration}
                              </div>
                            )}
                          </div>
                        )}
                        
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">{material.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{material.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {material.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                          {material.tags.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              +{material.tags.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          {material.isFavorite && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                              ⭐ Favorite
                            </span>
                          )}
                          {material.isDownloaded && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              ✅ Downloaded
                            </span>
                          )}
                          {material.lastAccessed && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              Recently Viewed
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-gray-600">Subject:</span>
                            <p className="font-medium truncate">{material.subject}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Unit:</span>
                            <p className="font-medium">{material.unit}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Size:</span>
                            <p className="font-medium">{material.size}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Downloads:</span>
                            <p className="font-medium">{material.downloadCount}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <StarIcon size={14} className="text-yellow-500 fill-current" />
                            <span className="font-medium">{material.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <EyeIcon size={14} />
                            <span>{material.viewCount} views</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {isDownloading ? (
                          <div className="w-full bg-gray-200 rounded-lg h-10 flex items-center px-4">
                            <div className="flex-1 bg-blue-200 rounded-full h-2 mr-3">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                                style={{ width: `${downloadProgress[material.id]}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{downloadProgress[material.id]}%</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleDownload(material)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
                          >
                            <DownloadIcon size={16} />
                            {material.isDownloaded ? 'Re-download' : 'Download'}
                          </button>
                        )}
                        
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => previewMaterial(material)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                          >
                            <EyeIcon size={14} />
                            Preview
                          </button>
                          {/* <button 
                            onClick={() => alert(`📊 ${material.title} details coming soon!`)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm transition-colors"
                          >
                            Details
                          </button> */}
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                        <div className="flex items-center gap-1 mb-1">
                          <UserIcon size={12} />
                          <span>{material.uploadedBy}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon size={12} />
                          <span>{new Date(material.uploadedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // List View
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-medium text-gray-900">Material</th>
                      <th className="text-left p-3 font-medium text-gray-900">Subject</th>
                      <th className="text-left p-3 font-medium text-gray-900">Unit</th>
                      <th className="text-left p-3 font-medium text-gray-900">Type</th>
                      <th className="text-left p-3 font-medium text-gray-900">Size</th>
                      <th className="text-left p-3 font-medium text-gray-900">Rating</th>
                      <th className="text-left p-3 font-medium text-gray-900">Downloads</th>
                      <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMaterials.map(material => {
                      const TypeIcon = getTypeIcon(material.type);
                      const isDownloading = downloadProgress[material.id] !== undefined;
                      
                      return (
                        <tr key={material.id} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${getTypeColor(material.type)} flex-shrink-0`}>
                                <TypeIcon size={16} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="font-medium text-gray-900 line-clamp-1">{material.title}</div>
                                <div className="text-sm text-gray-500 line-clamp-1">{material.description}</div>
                                <div className="flex items-center gap-2 mt-1">
                                  {material.isFavorite && (
                                    <StarIcon size={12} className="text-yellow-500 fill-current" />
                                  )}
                                  {material.isDownloaded && (
                                    <CheckCircleIcon size={12} className="text-green-600" />
                                  )}
                                  <span className="text-xs text-gray-500">
                                    {material.viewCount} views
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-gray-700">{material.subject}</td>
                          <td className="p-3 text-gray-700">{material.unit}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(material.type)}`}>
                              {material.type.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3 text-gray-700">{material.size}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <StarIcon size={14} className="text-yellow-500 fill-current" />
                              <span className="text-gray-700">{material.rating}</span>
                            </div>
                          </td>
                          <td className="p-3 text-gray-700">{material.downloadCount}</td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              {isDownloading ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-blue-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full transition-all"
                                      style={{ width: `${downloadProgress[material.id]}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs">{downloadProgress[material.id]}%</span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleDownload(material)}
                                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded transition-colors"
                                  title="Download"
                                >
                                  <DownloadIcon size={16} />
                                </button>
                              )}
                              <button
                                onClick={() => previewMaterial(material)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded transition-colors"
                                title="Preview"
                              >
                                <EyeIcon size={16} />
                              </button>
                              <button
                                onClick={() => toggleFavorite(material.id)}
                                className={`p-2 rounded transition-colors ${
                                  material.isFavorite 
                                    ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-50' 
                                    : 'text-gray-400 hover:text-yellow-500 bg-gray-100 hover:bg-yellow-50'
                                }`}
                                title={material.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                              >
                                <StarIcon size={16} fill={material.isFavorite ? 'currentColor' : 'none'} />
                              </button>
                              <button
                                onClick={() => shareMaterial(material)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded transition-colors"
                                title="Share"
                              >
                                <ShareIcon size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            
            {filteredMaterials.length === 0 && (
              <div className="text-center py-12">
                <BookOpenIcon className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No materials found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedSubject !== 'all' || selectedType !== 'all' 
                    ? 'Try adjusting your filters or search terms'
                    : 'No study materials available at the moment'
                  }
                </p>
                {(searchTerm || selectedSubject !== 'all' || selectedType !== 'all' || selectedUnit !== 'all' || showFavoritesOnly || showDownloadedOnly) && (
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Preview Modal */}
        {showPreviewModal && selectedMaterial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-1">{selectedMaterial.title}</h2>
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <XIcon size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="mb-6">
                      {selectedMaterial.type === 'video' && selectedMaterial.thumbnail && (
                        <div className="relative mb-4">
                          <img 
                            src={selectedMaterial.thumbnail} 
                            alt={selectedMaterial.title}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                            <PlayCircleIcon className="text-white" size={64} />
                          </div>
                          {selectedMaterial.duration && (
                            <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded">
                              Duration: {selectedMaterial.duration}
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${getTypeColor(selectedMaterial.type)} mb-4`}>
                        {React.createElement(getTypeIcon(selectedMaterial.type), { size: 20 })}
                        <span className="font-medium">{selectedMaterial.type.toUpperCase()}</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedMaterial.title}</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">{selectedMaterial.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedMaterial.tags.map((tag, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Material Details</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-600">Subject:</span>
                          <span className="font-medium ml-2">{selectedMaterial.subject}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Unit:</span>
                          <span className="font-medium ml-2">{selectedMaterial.unit}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Size:</span>
                          <span className="font-medium ml-2">{selectedMaterial.size}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Uploaded by:</span>
                          <span className="font-medium ml-2">{selectedMaterial.uploadedBy}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Upload Date:</span>
                          <span className="font-medium ml-2">{new Date(selectedMaterial.uploadedDate).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Downloads:</span>
                          <span className="font-medium ml-2">{selectedMaterial.downloadCount}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Views:</span>
                          <span className="font-medium ml-2">{selectedMaterial.viewCount}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600">Rating:</span>
                          <div className="flex items-center gap-1 ml-2">
                            <StarIcon size={16} className="text-yellow-500 fill-current" />
                            <span className="font-medium">{selectedMaterial.rating}</span>
                          </div>
                        </div>
                        {selectedMaterial.lastAccessed && (
                          <div>
                            <span className="text-gray-600">Last Accessed:</span>
                            <span className="font-medium ml-2">{new Date(selectedMaterial.lastAccessed).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <button
                        onClick={() => handleDownload(selectedMaterial)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <DownloadIcon size={20} />
                        {selectedMaterial.isDownloaded ? 'Re-download' : 'Download'}
                      </button>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => toggleFavorite(selectedMaterial.id)}
                          className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                            selectedMaterial.isFavorite
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <StarIcon size={16} fill={selectedMaterial.isFavorite ? 'currentColor' : 'none'} />
                          {selectedMaterial.isFavorite ? 'Favorited' : 'Favorite'}
                        </button>
                        
                        <button
                          onClick={() => shareMaterial(selectedMaterial)}
                          className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 px-4 rounded-lg transition-colors"
                        >
                          <ShareIcon size={16} />
                          Share
                        </button>
                      </div>
                      
                      {selectedMaterial.type === 'link' && (
                        <button
                          onClick={() => window.open(selectedMaterial.url, '_blank')}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <LinkIcon size={16} />
                          Open Link
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterialStu;
