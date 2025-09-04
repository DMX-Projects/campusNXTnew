// StudyMaterials.tsx
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Eye, 
  FileText, 
  Video, 
  Image, 
  Archive,
  BookOpen,
  Calendar,
  User,
  Filter,
  Star,
  Clock,
  Folder,
  ExternalLink,
  Play,
  Headphones
} from 'lucide-react';

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  subject: string;
  subjectCode: string;
  type: 'pdf' | 'video' | 'audio' | 'presentation' | 'document' | 'image' | 'zip';
  url: string;
  uploadDate: string;
  instructor: string;
  fileSize: string;
  downloads: number;
  isFavorite: boolean;
  category: 'lecture' | 'assignment' | 'reference' | 'lab' | 'exam';
  semester: number;
  tags: string[];
}

const StudyMaterials: React.FC = () => {
  const [studentInfo] = useState({
    name: 'Arjun Kumar',
    rollNumber: '2022CSE001',
    semester: 5,
    section: 'A'
  });

  const [materials, setMaterials] = useState<StudyMaterial[]>([
    {
      id: 'SM001',
      title: 'Introduction to Data Structures - Lecture 1',
      description: 'Basic concepts of data structures, arrays, and linked lists with practical examples.',
      subject: 'Data Structures',
      subjectCode: 'CS501',
      type: 'pdf',
      url: '/materials/ds-lecture-1.pdf',
      uploadDate: '2025-09-01',
      instructor: 'Dr. Rajesh Kumar',
      fileSize: '2.5 MB',
      downloads: 145,
      isFavorite: true,
      category: 'lecture',
      semester: 5,
      tags: ['arrays', 'linked-lists', 'basics']
    },
    {
      id: 'SM002',
      title: 'Database Design Video Tutorial',
      description: 'Complete video walkthrough of database design principles and normalization.',
      subject: 'Database Management Systems',
      subjectCode: 'CS502',
      type: 'video',
      url: '/materials/db-design-tutorial.mp4',
      uploadDate: '2025-08-28',
      instructor: 'Prof. Priya Sharma',
      fileSize: '145 MB',
      downloads: 89,
      isFavorite: false,
      category: 'lecture',
      semester: 5,
      tags: ['database', 'normalization', 'design']
    },
    {
      id: 'SM003',
      title: 'Operating Systems Lab Manual',
      description: 'Complete lab manual with all practicals and sample programs for OS course.',
      subject: 'Operating Systems',
      subjectCode: 'CS503',
      type: 'pdf',
      url: '/materials/os-lab-manual.pdf',
      uploadDate: '2025-08-25',
      instructor: 'Dr. Amit Singh',
      fileSize: '5.2 MB',
      downloads: 67,
      isFavorite: true,
      category: 'lab',
      semester: 5,
      tags: ['lab', 'practicals', 'programs']
    },
    {
      id: 'SM004',
      title: 'Network Protocol Analysis Presentation',
      description: 'Detailed presentation on TCP/IP protocol analysis and network troubleshooting.',
      subject: 'Computer Networks',
      subjectCode: 'CS504',
      type: 'presentation',
      url: '/materials/network-protocols.pptx',
      uploadDate: '2025-09-03',
      instructor: 'Dr. Neha Gupta',
      fileSize: '8.7 MB',
      downloads: 34,
      isFavorite: false,
      category: 'lecture',
      semester: 5,
      tags: ['tcp-ip', 'protocols', 'analysis']
    },
    {
      id: 'SM005',
      title: 'Sample Question Papers - Mid Semester',
      description: 'Previous year question papers and sample questions for mid-semester exams.',
      subject: 'All Subjects',
      subjectCode: 'COMMON',
      type: 'zip',
      url: '/materials/sample-papers.zip',
      uploadDate: '2025-09-05',
      instructor: 'Exam Cell',
      fileSize: '12.3 MB',
      downloads: 234,
      isFavorite: true,
      category: 'exam',
      semester: 5,
      tags: ['question-papers', 'exam', 'sample']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'downloads' | 'title'>('date');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Get unique subjects for filter
  const subjects = useMemo(() => {
    return Array.from(new Set(materials.map(m => m.subjectCode)));
  }, [materials]);

  // Filter and sort materials
  const filteredMaterials = useMemo(() => {
    let filtered = materials.filter(material => {
      const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSubject = filterSubject === 'all' || material.subjectCode === filterSubject;
      const matchesType = filterType === 'all' || material.type === filterType;
      const matchesCategory = filterCategory === 'all' || material.category === filterCategory;
      const matchesFavorites = !showFavoritesOnly || material.isFavorite;
      
      return matchesSearch && matchesSubject && matchesType && matchesCategory && matchesFavorites;
    });

    // Sort materials
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'downloads':
          return b.downloads - a.downloads;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
        default:
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
    });

    return filtered;
  }, [materials, searchTerm, filterSubject, filterType, filterCategory, showFavoritesOnly, sortBy]);

  const toggleFavorite = (id: string) => {
    setMaterials(prev => prev.map(material => 
      material.id === id ? { ...material, isFavorite: !material.isFavorite } : material
    ));
  };

  const downloadMaterial = (material: StudyMaterial) => {
    // Increment download count
    setMaterials(prev => prev.map(m => 
      m.id === material.id ? { ...m, downloads: m.downloads + 1 } : m
    ));
    
    // Simulate download
    alert(`Downloading: ${material.title}`);
  };

  const previewMaterial = (material: StudyMaterial) => {
    alert(`Opening preview for: ${material.title}`);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-6 h-6 text-red-500" />;
      case 'video': return <Video className="w-6 h-6 text-blue-500" />;
      case 'audio': return <Headphones className="w-6 h-6 text-green-500" />;
      case 'presentation': return <FileText className="w-6 h-6 text-orange-500" />;
      case 'document': return <FileText className="w-6 h-6 text-blue-500" />;
      case 'image': return <Image className="w-6 h-6 text-purple-500" />;
      case 'zip': return <Archive className="w-6 h-6 text-gray-500" />;
      default: return <FileText className="w-6 h-6 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lecture': return 'bg-blue-100 text-blue-800';
      case 'assignment': return 'bg-green-100 text-green-800';
      case 'reference': return 'bg-purple-100 text-purple-800';
      case 'lab': return 'bg-orange-100 text-orange-800';
      case 'exam': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = useMemo(() => {
    const totalMaterials = materials.length;
    const favorites = materials.filter(m => m.isFavorite).length;
    const totalDownloads = materials.reduce((sum, m) => sum + m.downloads, 0);
    const recentUploads = materials.filter(m => {
      const uploadDate = new Date(m.uploadDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return uploadDate > weekAgo;
    }).length;

    return { totalMaterials, favorites, totalDownloads, recentUploads };
  }, [materials]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
              <div className="text-gray-600">
                <p>{studentInfo.name} • {studentInfo.rollNumber}</p>
                <p>Semester {studentInfo.semester} • Section {studentInfo.section}</p>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{stats.totalMaterials}</div>
            <div className="text-sm text-gray-600">Total Materials</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalMaterials}</div>
              <div className="text-sm text-gray-600">Total Materials</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <Star className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.favorites}</div>
              <div className="text-sm text-gray-600">Favorites</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</div>
              <div className="text-sm text-gray-600">Total Downloads</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.recentUploads}</div>
              <div className="text-sm text-gray-600">Recent Uploads</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="presentation">Presentation</option>
              <option value="document">Document</option>
              <option value="zip">Archive</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="lecture">Lectures</option>
              <option value="assignment">Assignments</option>
              <option value="reference">References</option>
              <option value="lab">Lab Materials</option>
              <option value="exam">Exam Materials</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="downloads">Sort by Downloads</option>
              <option value="title">Sort by Title</option>
            </select>

            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showFavoritesOnly 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Star className="w-4 h-4 inline mr-1" />
              Favorites Only
            </button>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMaterials.map(material => (
          <div key={material.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getFileIcon(material.type)}
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(material.category)}`}>
                    {material.category}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => toggleFavorite(material.id)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <Star className={`w-5 h-5 ${material.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{material.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{material.description}</p>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{material.subject} ({material.subjectCode})</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{material.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Uploaded: {new Date(material.uploadDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">{material.fileSize}</span>
              <span className="text-sm text-gray-600">{material.downloads} downloads</span>
            </div>

            {/* Tags */}
            {material.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {material.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {tag}
                  </span>
                ))}
                {material.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{material.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => previewMaterial(material)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={() => downloadMaterial(material)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No materials found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default StudyMaterials;
