// FacultyStudyMaterial.tsx - FIXED VERSION WITH VIEW DETAILS MODAL
import React, { useState, useMemo } from 'react';
import { 
  Upload, 
  Search, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  FileText, 
  Video, 
  Image, 
  File, 
  BookOpen,
  Filter,
  Calendar,
  Users,
  BarChart3,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  Folder,
  Link,
  ExternalLink
} from 'lucide-react';

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'video' | 'image' | 'presentation' | 'document' | 'link';
  subject: string;
  subjectCode: string;
  unit?: string;
  topic?: string;
  uploadDate: string;
  lastModified: string;
  downloadCount: number;
  isActive: boolean;
  tags: string[];
  targetSemester: string;
  section: string;
  fileUrl: string;
}

interface Subject {
  code: string;
  name: string;
  semester: string;
  section: string;
}

const FacultyStudyMaterial: React.FC = () => {
  // Faculty information
  const facultyInfo = {
    name: 'Dr. Rajesh Kumar',
    employeeId: 'FAC001',
    department: 'Computer Science Engineering'
  };

  // Faculty's assigned subjects
  const [assignedSubjects] = useState<Subject[]>([
    { code: 'CS301', name: 'Data Structures and Algorithms', semester: '3rd', section: 'A' },
    { code: 'CS302', name: 'Database Management Systems', semester: '3rd', section: 'A' },
    { code: 'CS301L', name: 'Data Structures Lab', semester: '3rd', section: 'A' }
  ]);

  // Study materials data
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([
    {
      id: '1',
      title: 'Introduction to Data Structures',
      description: 'Comprehensive notes covering arrays, linked lists, and basic operations. This material includes detailed explanations, examples, and practice problems to help students understand fundamental data structure concepts.',
      fileName: 'data_structures_unit1.pdf',
      fileSize: '2.5 MB',
      fileType: 'pdf',
      subject: 'Data Structures and Algorithms',
      subjectCode: 'CS301',
      unit: 'Unit 1',
      topic: 'Introduction',
      uploadDate: '2025-08-15',
      lastModified: '2025-08-20',
      downloadCount: 45,
      isActive: true,
      tags: ['arrays', 'linked-lists', 'basics'],
      targetSemester: '3rd',
      section: 'A',
      fileUrl: '/files/data_structures_unit1.pdf'
    },
    {
      id: '2',
      title: 'Binary Trees Explained',
      description: 'Video lecture explaining binary tree concepts with examples',
      fileName: 'binary_trees_lecture.mp4',
      fileSize: '150 MB',
      fileType: 'video',
      subject: 'Data Structures and Algorithms',
      subjectCode: 'CS301',
      unit: 'Unit 3',
      topic: 'Trees',
      uploadDate: '2025-09-01',
      lastModified: '2025-09-01',
      downloadCount: 32,
      isActive: true,
      tags: ['trees', 'binary-trees', 'video-lecture'],
      targetSemester: '3rd',
      section: 'A',
      fileUrl: '/files/binary_trees_lecture.mp4'
    },
    {
      id: '3',
      title: 'SQL Query Examples',
      description: 'Collection of SQL queries for database operations',
      fileName: 'sql_queries_examples.pdf',
      fileSize: '1.8 MB',
      fileType: 'pdf',
      subject: 'Database Management Systems',
      subjectCode: 'CS302',
      unit: 'Unit 2',
      topic: 'SQL',
      uploadDate: '2025-08-25',
      lastModified: '2025-09-02',
      downloadCount: 28,
      isActive: true,
      tags: ['sql', 'queries', 'database'],
      targetSemester: '3rd',
      section: 'A',
      fileUrl: '/files/sql_queries_examples.pdf'
    },
    {
      id: '4',
      title: 'Stack Implementation Code',
      description: 'C++ code examples for stack data structure implementation',
      fileName: 'stack_implementation.cpp',
      fileSize: '0.5 MB',
      fileType: 'document',
      subject: 'Data Structures Lab',
      subjectCode: 'CS301L',
      unit: 'Lab 3',
      topic: 'Stack',
      uploadDate: '2025-09-03',
      lastModified: '2025-09-03',
      downloadCount: 15,
      isActive: true,
      tags: ['stack', 'cpp', 'implementation'],
      targetSemester: '3rd',
      section: 'A',
      fileUrl: '/files/stack_implementation.cpp'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState<'all' | string>('all');
  const [filterType, setFilterType] = useState<'all' | string>('all');
  const [sortBy, setSortBy] = useState<'uploadDate' | 'title' | 'downloadCount'>('uploadDate');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);
  
  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    subject: '',
    unit: '',
    topic: '',
    tags: '',
    file: null as File | null,
    isLink: false,
    linkUrl: ''
  });
  const [isUploading, setIsUploading] = useState(false);

  // Filter and sort materials
  const filteredMaterials = useMemo(() => {
    let filtered = studyMaterials.filter(material => {
      const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSubject = filterSubject === 'all' || material.subjectCode === filterSubject;
      const matchesType = filterType === 'all' || material.fileType === filterType;
      
      return matchesSearch && matchesSubject && matchesType && material.isActive;
    });

    // Sort materials
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'downloadCount':
          return b.downloadCount - a.downloadCount;
        default:
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
    });

    return filtered;
  }, [studyMaterials, searchTerm, filterSubject, filterType, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalMaterials = studyMaterials.filter(m => m.isActive).length;
    const totalDownloads = studyMaterials.reduce((sum, m) => sum + m.downloadCount, 0);
    const subjectCount = new Set(studyMaterials.map(m => m.subjectCode)).size;
    const recentUploads = studyMaterials.filter(m => {
      const uploadDate = new Date(m.uploadDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return uploadDate >= weekAgo;
    }).length;

    return { totalMaterials, totalDownloads, subjectCount, recentUploads };
  }, [studyMaterials]);

  // Get file type icon
  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
      case 'document':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-500" />;
      case 'image':
        return <Image className="w-5 h-5 text-green-500" />;
      case 'presentation':
        return <File className="w-5 h-5 text-orange-500" />;
      case 'link':
        return <Link className="w-5 h-5 text-blue-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  // Handle view material
  const handleViewMaterial = (material: StudyMaterial) => {
    setSelectedMaterial(material);
    setIsViewModalOpen(true);
    // Increment download count when viewing
    setStudyMaterials(prev => prev.map(m => 
      m.id === material.id ? { ...m, downloadCount: m.downloadCount + 1 } : m
    ));
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setUploadForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setUploadForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle file selection - FIXED
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadForm(prev => ({ ...prev, file }));
  };

  // Upload material
  const handleUpload = async () => {
    if (!uploadForm.title || (!uploadForm.file && !uploadForm.isLink) || (!uploadForm.linkUrl && uploadForm.isLink)) {
      alert('Please fill in all required fields');
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));

      const selectedSubject = assignedSubjects.find(s => s.code === uploadForm.subject);
      const fileSize = uploadForm.file ? (uploadForm.file.size / (1024 * 1024)).toFixed(2) + ' MB' : '0 MB';
      
      let fileType: StudyMaterial['fileType'] = 'document';
      if (uploadForm.isLink) {
        fileType = 'link';
      } else if (uploadForm.file) {
        const type = uploadForm.file.type;
        if (type.includes('pdf')) fileType = 'pdf';
        else if (type.includes('video')) fileType = 'video';
        else if (type.includes('image')) fileType = 'image';
        else if (type.includes('presentation')) fileType = 'presentation';
      }

      const newMaterial: StudyMaterial = {
        id: Date.now().toString(),
        title: uploadForm.title,
        description: uploadForm.description,
        fileName: uploadForm.isLink ? 'External Link' : (uploadForm.file?.name || ''),
        fileSize,
        fileType,
        subject: selectedSubject?.name || '',
        subjectCode: uploadForm.subject,
        unit: uploadForm.unit,
        topic: uploadForm.topic,
        uploadDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        downloadCount: 0,
        isActive: true,
        tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        targetSemester: selectedSubject?.semester || '',
        section: selectedSubject?.section || '',
        fileUrl: uploadForm.isLink ? uploadForm.linkUrl : `/files/${uploadForm.file?.name}`
      };

      setStudyMaterials(prev => [newMaterial, ...prev]);
      setUploadForm({
        title: '',
        description: '',
        subject: '',
        unit: '',
        topic: '',
        tags: '',
        file: null,
        isLink: false,
        linkUrl: ''
      });
      setIsUploadModalOpen(false);
      alert('Study material uploaded successfully!');
    } catch (error) {
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Delete material
  const deleteMaterial = (id: string) => {
    if (window.confirm('Are you sure you want to delete this study material?')) {
      setStudyMaterials(prev => prev.map(m => 
        m.id === id ? { ...m, isActive: false } : m
      ));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
              <p className="text-gray-600">{facultyInfo.name} • {facultyInfo.department}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Employee ID: {facultyInfo.employeeId}</p>
              <p className="text-sm text-blue-600 font-medium">{stats.totalMaterials} Materials</p>
            </div>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Upload Material
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalMaterials}</div>
              <div className="text-sm text-gray-600">Total Materials</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <Download className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</div>
              <div className="text-sm text-gray-600">Total Downloads</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <Folder className="w-8 h-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.subjectCount}</div>
              <div className="text-sm text-gray-600">Subjects Covered</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <Upload className="w-8 h-8 text-orange-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.recentUploads}</div>
              <div className="text-sm text-gray-600">Recent Uploads</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
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
          
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Subjects</option>
            {assignedSubjects.map(subject => (
              <option key={subject.code} value={subject.code}>
                {subject.name} ({subject.code})
              </option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="pdf">PDF Documents</option>
            <option value="video">Videos</option>
            <option value="presentation">Presentations</option>
            <option value="document">Documents</option>
            <option value="link">External Links</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="uploadDate">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="downloadCount">Sort by Downloads</option>
          </select>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMaterials.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-sm p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No study materials found</p>
          </div>
        ) : (
          filteredMaterials.map(material => (
            <div key={material.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3">
                    {getFileTypeIcon(material.fileType)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{material.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                          {material.subjectCode}
                        </span>
                        {material.unit && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {material.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteMaterial(material.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{material.description}</p>

                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span>{material.fileSize}</span>
                  <span>{material.downloadCount} downloads</span>
                </div>

                {/* Tags */}
                {material.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {material.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {material.tags.length > 3 && (
                      <span className="text-gray-500 text-xs">+{material.tags.length - 3} more</span>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                  <span>Uploaded: {new Date(material.uploadDate).toLocaleDateString()}</span>
                  <span>Modified: {new Date(material.lastModified).toLocaleDateString()}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleViewMaterial(material)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium text-center transition-colors"
                  >
                    <Eye className="w-4 h-4 inline mr-1" />
                    View Details
                  </button>
                  <a
                    href={material.fileUrl}
                    download={material.fileName}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View Details Modal */}
      {isViewModalOpen && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {getFileTypeIcon(selectedMaterial.fileType)}
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMaterial.title}</h2>
                </div>
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    setSelectedMaterial(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Subject</label>
                    <p className="text-gray-900 font-medium">{selectedMaterial.subject}</p>
                    <p className="text-sm text-gray-600">({selectedMaterial.subjectCode})</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">File Name</label>
                    <p className="text-gray-900">{selectedMaterial.fileName}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">File Size</label>
                    <p className="text-gray-900">{selectedMaterial.fileSize}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">File Type</label>
                    <div className="flex items-center gap-2">
                      {getFileTypeIcon(selectedMaterial.fileType)}
                      <span className="text-gray-900 capitalize">{selectedMaterial.fileType}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedMaterial.unit && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Unit/Chapter</label>
                      <p className="text-gray-900">{selectedMaterial.unit}</p>
                    </div>
                  )}

                  {selectedMaterial.topic && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Topic</label>
                      <p className="text-gray-900">{selectedMaterial.topic}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Target Semester</label>
                    <p className="text-gray-900">{selectedMaterial.targetSemester} Semester</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Section</label>
                    <p className="text-gray-900">Section {selectedMaterial.section}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Description</label>
                <p className="text-gray-900 leading-relaxed">{selectedMaterial.description}</p>
              </div>

              {/* Tags */}
              {selectedMaterial.tags.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedMaterial.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Statistics & Dates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedMaterial.downloadCount}</div>
                  <div className="text-sm text-gray-600">Total Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {new Date(selectedMaterial.uploadDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">Upload Date</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {new Date(selectedMaterial.lastModified).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">Last Modified</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                {selectedMaterial.fileType === 'link' ? (
                  <a
                    href={selectedMaterial.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-center font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Open Link
                  </a>
                ) : (
                  <>
                    <a
                      href={selectedMaterial.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-center font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-5 h-5" />
                      Open File
                    </a>
                    <a
                      href={selectedMaterial.fileUrl}
                      download={selectedMaterial.fileName}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Upload Study Material</h2>
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={uploadForm.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter material title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={uploadForm.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the content and purpose"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                  <select
                    name="subject"
                    value={uploadForm.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    {assignedSubjects.map(subject => (
                      <option key={subject.code} value={subject.code}>
                        {subject.name} ({subject.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit/Chapter</label>
                  <input
                    type="text"
                    name="unit"
                    value={uploadForm.unit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Unit 1, Chapter 3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                  <input
                    type="text"
                    name="topic"
                    value={uploadForm.topic}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Binary Trees, SQL Queries"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={uploadForm.tags}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="comma,separated,tags"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isLink"
                    checked={uploadForm.isLink}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">This is an external link</span>
                </label>
              </div>

              {uploadForm.isLink ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">External Link URL*</label>
                  <input
                    type="url"
                    name="linkUrl"
                    value={uploadForm.linkUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/resource"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Upload*</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-semibold text-blue-600 cursor-pointer">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF, DOC, PPT, MP4, PNG, JPG (max 100MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mp3,.png,.jpg,.jpeg,.txt"
                      id="fileInput"
                    />
                    <label
                      htmlFor="fileInput"
                      className="absolute inset-0 cursor-pointer"
                    ></label>
                  </div>
                  {uploadForm.file && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <File className="w-5 h-5 text-blue-600" />
                        <div className="flex-1">
                          <p className="font-medium text-blue-900">{uploadForm.file.name}</p>
                          <p className="text-sm text-blue-700">
                            {(uploadForm.file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={() => setUploadForm(prev => ({ ...prev, file: null }))}
                          className="p-1 hover:bg-blue-200 rounded"
                        >
                          <X className="w-4 h-4 text-blue-600" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </div>
                ) : (
                  'Upload Material'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyStudyMaterial;
