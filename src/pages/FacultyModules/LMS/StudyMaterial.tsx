import React, { useState, useEffect } from 'react';
import { 
  FileTextIcon, 
  DownloadIcon, 
  EyeIcon, 
  UploadIcon, 
  SearchIcon, 
  EditIcon, 
  TrashIcon, 
  Share2Icon, 
  
  GridIcon, 
  ListIcon,
  StarIcon,
  CheckCircleIcon,
  
  SortAscIcon,
  SortDescIcon,

  HeartIcon
} from 'lucide-react';

interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  department: string;
  semester: string;
  type: 'pdf' | 'ppt' | 'doc' | 'video' | 'audio';
  size: string;
  downloads: number;
  views: number;
  uploadedBy: string;
  uploadedAt: string;
  updatedAt: string;
  tags: string[];
  description: string;
  isVerified: boolean;
  rating: number;
  isFavorite: boolean;
  category: string;
}

interface NewMaterial {
  title: string;
  subject: string;
  department: string;
  semester: string;
  type: 'pdf' | 'ppt' | 'doc' | 'video' | 'audio';
  description: string;
  tags: string[];
  category: string;
}

const StudyMaterial: React.FC = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([
    {
      id: '1',
      title: 'Data Structures - Trees and Graphs',
      subject: 'Data Structures',
      department: 'CSE',
      semester: '3',
      type: 'pdf',
      size: '2.5 MB',
      downloads: 145,
      views: 320,
      uploadedBy: 'Dr. Priya Sharma',
      uploadedAt: '2025-08-20T10:00:00Z',
      updatedAt: '2025-09-01T14:30:00Z',
      tags: ['trees', 'graphs', 'algorithms'],
      description: 'Comprehensive notes covering all types of trees and graph algorithms with examples.',
      isVerified: true,
      rating: 4.8,
      isFavorite: false,
      category: 'Notes'
    },
    {
      id: '2',
      title: 'Database Normalization Techniques',
      subject: 'DBMS',
      department: 'CSE',
      semester: '4',
      type: 'ppt',
      size: '5.1 MB',
      downloads: 98,
      views: 180,
      uploadedBy: 'Prof. Rajesh Kumar',
      uploadedAt: '2025-08-18T11:30:00Z',
      updatedAt: '2025-08-25T16:45:00Z',
      tags: ['normalization', 'database', 'sql'],
      description: 'Presentation slides explaining 1NF, 2NF, 3NF, and BCNF with practical examples.',
      isVerified: true,
      rating: 4.5,
      isFavorite: true,
      category: 'Lectures'
    },
    {
      id: '3',
      title: 'Software Development Lifecycle',
      subject: 'Software Engineering',
      department: 'CSE',
      semester: '5',
      type: 'video',
      size: '125 MB',
      downloads: 67,
      views: 250,
      uploadedBy: 'Dr. Anita Gupta',
      uploadedAt: '2025-08-15T09:00:00Z',
      updatedAt: '2025-08-22T12:00:00Z',
      tags: ['sdlc', 'agile', 'waterfall'],
      description: 'A detailed video lecture explaining various SDLC models with their pros and cons.',
      isVerified: true,
      rating: 4.9,
      isFavorite: false,
      category: 'Video Lectures'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterSemester, setFilterSemester] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'downloads' | 'rating' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showFavoritesOnly] = useState(false);
  
  // Modal states
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);
  
  // Form states
  const [newMaterial, setNewMaterial] = useState<NewMaterial>({
    title: '',
    subject: '',
    department: 'CSE',
    semester: '1',
    type: 'pdf',
    description: '',
    tags: [],
    category: 'Notes'
  });
  const [editingMaterial, setEditingMaterial] = useState<StudyMaterial | null>(null);
  const [tagInput, setTagInput] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [filteredMaterials, setFilteredMaterials] = useState<StudyMaterial[]>(materials);

  const departments = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const fileTypes = ['pdf', 'ppt', 'doc', 'video', 'audio'];
  const categories = ['Notes', 'Lectures', 'Video Lectures', 'Assignments', 'Lab Manuals', 'Reference Books'];

  useEffect(() => {
    let filtered = materials;

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(term) ||
        m.subject.toLowerCase().includes(term) ||
        m.description.toLowerCase().includes(term) ||
        m.uploadedBy.toLowerCase().includes(term) ||
        m.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Apply other filters
    if (filterDepartment !== 'all') filtered = filtered.filter(m => m.department === filterDepartment);
    if (filterSemester !== 'all') filtered = filtered.filter(m => m.semester === filterSemester);
    if (filterType !== 'all') filtered = filtered.filter(m => m.type === filterType);
    if (filterCategory !== 'all') filtered = filtered.filter(m => m.category === filterCategory);
    if (showFavoritesOnly) filtered = filtered.filter(m => m.isFavorite);

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'downloads':
          comparison = a.downloads - b.downloads;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'date':
        default:
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredMaterials(filtered);
  }, [searchTerm, filterDepartment, filterSemester, filterType, filterCategory, sortBy, sortOrder, showFavoritesOnly, materials]);

  const getFileIcon = (type: string) => {
    const icons = {
      pdf: '📄',
      ppt: '📊',
      doc: '📝',
      video: '🎥',
      audio: '🎵'
    };
    return icons[type as keyof typeof icons] || '📄';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      pdf: 'bg-red-100 text-red-800 border-red-200',
      ppt: 'bg-orange-100 text-orange-800 border-orange-200',
      doc: 'bg-blue-100 text-blue-800 border-blue-200',
      video: 'bg-purple-100 text-purple-800 border-purple-200',
      audio: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleUpload = () => {
    if (!newMaterial.title || !newMaterial.subject || !newMaterial.description) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const material: StudyMaterial = {
        id: Date.now().toString(),
        title: newMaterial.title,
        subject: newMaterial.subject,
        department: newMaterial.department,
        semester: newMaterial.semester,
        type: newMaterial.type,
        size: '0 MB',
        downloads: 0,
        views: 0,
        uploadedBy: 'Chairperson',
        uploadedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: newMaterial.tags,
        description: newMaterial.description,
        isVerified: true,
        rating: 0,
        isFavorite: false,
        category: newMaterial.category
      };

      setMaterials([...materials, material]);
      setNewMaterial({
        title: '',
        subject: '',
        department: 'CSE',
        semester: '1',
        type: 'pdf',
        description: '',
        tags: [],
        category: 'Notes'
      });
      setIsUploadModalOpen(false);
      setLoading(false);
      alert('Material uploaded successfully!');
    }, 1000);
  };
  
  const handleDelete = (materialId: string) => {
    const material = materials.find(m => m.id === materialId);
    if (material) {
      setSelectedMaterial(material);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = () => {
    if (selectedMaterial) {
      setMaterials(materials.filter(m => m.id !== selectedMaterial.id));
      setIsDeleteModalOpen(false);
      setSelectedMaterial(null);
      alert('Material deleted successfully!');
    }
  };

  const handleEdit = (material: StudyMaterial) => {
    setEditingMaterial(material);
    setNewMaterial({
      title: material.title,
      subject: material.subject,
      department: material.department,
      semester: material.semester,
      type: material.type,
      description: material.description,
      tags: material.tags,
      category: material.category
    });
    setIsEditModalOpen(true);
  };

  const saveEdit = () => {
    if (editingMaterial && newMaterial.title && newMaterial.subject) {
      const updatedMaterials = materials.map(m =>
        m.id === editingMaterial.id
          ? {
              ...m,
              title: newMaterial.title,
              subject: newMaterial.subject,
              department: newMaterial.department,
              semester: newMaterial.semester,
              type: newMaterial.type,
              description: newMaterial.description,
              tags: newMaterial.tags,
              category: newMaterial.category,
              updatedAt: new Date().toISOString()
            }
          : m
      );
      
      setMaterials(updatedMaterials);
      setIsEditModalOpen(false);
      setEditingMaterial(null);
      setNewMaterial({
        title: '',
        subject: '',
        department: 'CSE',
        semester: '1',
        type: 'pdf',
        description: '',
        tags: [],
        category: 'Notes'
      });
      alert('Material updated successfully!');
    }
  };

  const handleShare = (material: StudyMaterial) => {
    const shareUrl = `${window.location.origin}/materials/${material.id}`;
    navigator.clipboard.writeText(shareUrl);
    alert(`Share link copied to clipboard!\n${shareUrl}`);
  };

  const handleDownload = (material: StudyMaterial) => {
    // Increment download count
    const updatedMaterials = materials.map(m =>
      m.id === material.id ? { ...m, downloads: m.downloads + 1 } : m
    );
    setMaterials(updatedMaterials);
    alert(`Downloading ${material.title}...`);
  };

  const handlePreview = (material: StudyMaterial) => {
    // Increment view count
    const updatedMaterials = materials.map(m =>
      m.id === material.id ? { ...m, views: m.views + 1 } : m
    );
    setMaterials(updatedMaterials);
    setSelectedMaterial(material);
    setIsPreviewModalOpen(true);
  };

  const toggleFavorite = (materialId: string) => {
    const updatedMaterials = materials.map(m =>
      m.id === materialId ? { ...m, isFavorite: !m.isFavorite } : m
    );
    setMaterials(updatedMaterials);
  };

  const addTag = () => {
    if (tagInput.trim() && !newMaterial.tags.includes(tagInput.trim())) {
      setNewMaterial({
        ...newMaterial,
        tags: [...newMaterial.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewMaterial({
      ...newMaterial,
      tags: newMaterial.tags.filter(tag => tag !== tagToRemove)
    });
  };


  const exportMaterials = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Title,Subject,Department,Semester,Type,Size,Downloads,Views,Rating,Uploaded By,Category,Tags\n" +
      filteredMaterials.map(m => 
        `"${m.title}","${m.subject}","${m.department}","${m.semester}","${m.type}","${m.size}",${m.downloads},${m.views},${m.rating},"${m.uploadedBy}","${m.category}","${m.tags.join(';')}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "study_materials.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = {
    totalMaterials: materials.length,
    totalDownloads: materials.reduce((sum, m) => sum + m.downloads, 0),
    totalViews: materials.reduce((sum, m) => sum + m.views, 0),
    averageRating: materials.length > 0 ? (materials.reduce((sum, m) => sum + m.rating, 0) / materials.length).toFixed(1) : '0',
    verifiedMaterials: materials.filter(m => m.isVerified).length,
    favorites: materials.filter(m => m.isFavorite).length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Study Materials Management</h1>
              <p className="text-gray-600 mt-1">Organize, manage, and distribute academic resources efficiently</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <UploadIcon size={20} />
                Upload Material
              </button>
              <button
                onClick={exportMaterials}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by title, subject, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              
              <select
                value={filterSemester}
                onChange={(e) => setFilterSemester(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Semesters</option>
                {semesters.map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {fileTypes.map(type => (
                  <option key={type} value={type}>{type.toUpperCase()}</option>
                ))}
              </select>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort and View Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              {/* <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFavoritesOnly}
                  onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <HeartIcon size={16} className="text-red-500" />
                <span className="text-sm">Favorites only</span>
              </label> */}
              
              {/* <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800 ml-4"
              >
                Clear all filters
              </button> */}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'downloads' | 'rating' | 'title')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="downloads">Downloads</option>
                <option value="rating">Rating</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                {sortOrder === 'asc' ? <SortAscIcon size={16} /> : <SortDescIcon size={16} />}
              </button>
              
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <ListIcon size={16} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <GridIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Materials</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMaterials}</p>
              </div>
              <FileTextIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Downloads</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalDownloads}</p>
              </div>
              <DownloadIcon className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalViews}</p>
              </div>
              <EyeIcon className="text-purple-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg. Rating</p>
                <p className="text-2xl font-bold text-orange-600">{stats.averageRating}</p>
              </div>
              <StarIcon className="text-orange-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Verified</p>
                <p className="text-2xl font-bold text-blue-600">{stats.verifiedMaterials}</p>
              </div>
              <CheckCircleIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Favorites</p>
                <p className="text-2xl font-bold text-red-600">{stats.favorites}</p>
              </div>
              <HeartIcon className="text-red-500" size={24} />
            </div>
          </div>
        </div>

        {/* Materials Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <div key={material.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{getFileIcon(material.type)}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{material.title}</h3>
                      <div className="flex items-center gap-2">
                        {material.isVerified && <CheckCircleIcon size={16} className="text-blue-500" />}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(material.type)}`}>
                          {material.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleFavorite(material.id)}
                    className={`p-1 rounded-full ${material.isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                  >
                    <HeartIcon size={20} fill={material.isFavorite ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <p><span className="font-medium">Subject:</span> {material.subject}</p>
                  <p><span className="font-medium">Department:</span> {material.department} - Sem {material.semester}</p>
                  <p><span className="font-medium">Category:</span> {material.category}</p>
                  <p><span className="font-medium">Size:</span> {material.size}</p>
                  <p><span className="font-medium">Uploaded by:</span> {material.uploadedBy}</p>
                </div>
                
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">{material.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {material.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        size={16}
                        className={i < Math.floor(material.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">{material.rating.toFixed(1)}</span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {material.downloads} downloads • {material.views} views
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePreview(material)}
                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-lg text-sm transition-colors"
                  >
                    <EyeIcon size={16} className="inline mr-1" />
                    Preview
                  </button>
                  <button
                    onClick={() => handleDownload(material)}
                    className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-2 px-3 rounded-lg text-sm transition-colors"
                  >
                    <DownloadIcon size={16} className="inline mr-1" />
                    Download
                  </button>
                </div>
                
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleShare(material)}
                    className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 px-3 rounded-lg text-sm transition-colors"
                  >
                    <Share2Icon size={16} className="inline mr-1" />
                    Share
                  </button>
                  <button
                    onClick={() => handleEdit(material)}
                    className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 p-2 rounded-lg transition-colors"
                  >
                    <EditIcon size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(material.id)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {filteredMaterials.length} Materials Found
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-medium text-gray-900">Material</th>
                      <th className="text-left p-3 font-medium text-gray-900">Subject</th>
                      <th className="text-left p-3 font-medium text-gray-900">Department</th>
                      <th className="text-left p-3 font-medium text-gray-900">Type</th>
                      <th className="text-left p-3 font-medium text-gray-900">Stats</th>
                      <th className="text-left p-3 font-medium text-gray-900">Rating</th>
                      <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMaterials.map((material) => (
                      <tr key={material.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{getFileIcon(material.type)}</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-gray-900">{material.title}</h3>
                                {material.isVerified && <CheckCircleIcon size={16} className="text-blue-500" />}
                                {material.isFavorite && <HeartIcon size={16} className="text-red-500 fill-current" />}
                              </div>
                              <p className="text-sm text-gray-500">{material.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-gray-700">{material.subject}</td>
                        <td className="p-3 text-gray-700">{material.department} - S{material.semester}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(material.type)}`}>
                            {material.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-gray-600">
                          <div>{material.downloads} downloads</div>
                          <div>{material.views} views</div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                size={14}
                                className={i < Math.floor(material.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">{material.rating.toFixed(1)}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <button
                              onClick={() => handlePreview(material)}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-1 rounded transition-colors"
                              title="Preview"
                            >
                              <EyeIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleDownload(material)}
                              className="bg-green-100 hover:bg-green-200 text-green-700 p-1 rounded transition-colors"
                              title="Download"
                            >
                              <DownloadIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleShare(material)}
                              className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-1 rounded transition-colors"
                              title="Share"
                            >
                              <Share2Icon size={16} />
                            </button>
                            <button
                              onClick={() => handleEdit(material)}
                              className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 p-1 rounded transition-colors"
                              title="Edit"
                            >
                              <EditIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(material.id)}
                              className="bg-red-100 hover:bg-red-200 text-red-700 p-1 rounded transition-colors"
                              title="Delete"
                            >
                              <TrashIcon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Study Material</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter material title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    value={newMaterial.subject}
                    onChange={(e) => setNewMaterial({...newMaterial, subject: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter subject name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={newMaterial.department}
                    onChange={(e) => setNewMaterial({...newMaterial, department: e.target.value})}
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
                    value={newMaterial.semester}
                    onChange={(e) => setNewMaterial({...newMaterial, semester: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {semesters.map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File Type</label>
                  <select
                    value={newMaterial.type}
                    onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value as 'pdf' | 'ppt' | 'doc' | 'video' | 'audio'})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {fileTypes.map(type => (
                      <option key={type} value={type}>{type.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newMaterial.category}
                    onChange={(e) => setNewMaterial({...newMaterial, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter material description"
                ></textarea>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a tag and press Enter"
                  />
                  <button
                    onClick={addTag}
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newMaterial.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">File Upload</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <UploadIcon className="mx-auto text-gray-400 mb-2" size={24} />
                  <p className="text-gray-600">Drag and drop your file here, or click to browse</p>
                  <input type="file" className="hidden" />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    setNewMaterial({
                      title: '',
                      subject: '',
                      department: 'CSE',
                      semester: '1',
                      type: 'pdf',
                      description: '',
                      tags: [],
                      category: 'Notes'
                    });
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Uploading...' : 'Upload Material'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {isPreviewModalOpen && selectedMaterial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">{selectedMaterial.title}</h2>
                <button
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="bg-gray-100 p-8 rounded-lg text-center mb-4">
                    <div className="text-6xl mb-4">{getFileIcon(selectedMaterial.type)}</div>
                    <p className="text-gray-600">Preview of {selectedMaterial.title}</p>
                    <p className="text-gray-500">File type: {selectedMaterial.type.toUpperCase()}</p>
                    <p className="text-gray-500">Size: {selectedMaterial.size}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(selectedMaterial)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      <DownloadIcon size={16} className="inline mr-2" />
                      Download
                    </button>
                    <button
                      onClick={() => handleShare(selectedMaterial)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      <Share2Icon size={16} className="inline mr-2" />
                      Share
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Material Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Subject:</span>
                      <span>{selectedMaterial.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Department:</span>
                      <span>{selectedMaterial.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Semester:</span>
                      <span>{selectedMaterial.semester}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Category:</span>
                      <span>{selectedMaterial.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Uploaded by:</span>
                      <span>{selectedMaterial.uploadedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Upload date:</span>
                      <span>{formatDate(selectedMaterial.uploadedAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Last updated:</span>
                      <span>{formatDate(selectedMaterial.updatedAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Downloads:</span>
                      <span>{selectedMaterial.downloads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Views:</span>
                      <span>{selectedMaterial.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Rating:</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            size={14}
                            className={i < Math.floor(selectedMaterial.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                        <span className="ml-1">{selectedMaterial.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedMaterial.description}
                    </p>
                  </div>
                  
                  {selectedMaterial.tags.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMaterial.tags.map((tag, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && editingMaterial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Study Material</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    value={newMaterial.subject}
                    onChange={(e) => setNewMaterial({...newMaterial, subject: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={newMaterial.department}
                    onChange={(e) => setNewMaterial({...newMaterial, department: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newMaterial.category}
                    onChange={(e) => setNewMaterial({...newMaterial, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingMaterial(null);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && selectedMaterial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Material</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "<strong>{selectedMaterial.title}</strong>"? 
                This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedMaterial(null);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterial;
