import React, { useState, useEffect } from 'react';
import {
  BookOpenIcon,
  DownloadIcon,
  PlayIcon,
  FileTextIcon,
  VideoIcon,
  HeadphonesIcon,
  ImageIcon,
  LinkIcon,
  SearchIcon,
  FilterIcon,
  StarIcon,
  BookmarkIcon,
  ShareIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  TrendingUpIcon,
  AwardIcon,
  TargetIcon,
  ZapIcon,
  BrainIcon,
  PlusIcon,
  EyeIcon,
  ThumbsUpIcon,
  MessageSquareIcon,
  RefreshCwIcon
} from 'lucide-react';

interface PrepMaterial {
  id: string;
  title: string;
  description: string;
  category: 'aptitude' | 'technical' | 'verbal' | 'coding' | 'interview' | 'gd' | 'soft-skills';
  subcategory: string;
  type: 'pdf' | 'video' | 'audio' | 'interactive' | 'quiz' | 'practice-set' | 'article' | 'link';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  fileSize?: string;
  author: string;
  publisher: string;
  publishDate: string;
  rating: number;
  totalRatings: number;
  downloads: number;
  views: number;
  isBookmarked: boolean;
  isPremium: boolean;
  tags: string[];
  topics: string[];
  thumbnail: string;
  url: string;
  progress?: number;
  lastAccessed?: string;
  userRating?: number;
  userReview?: string;
}

interface StudyPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  materials: string[];
  completedMaterials: string[];
  progress: number;
  createdDate: string;
  targetDate: string;
  isActive: boolean;
}

const PlacementPrepMaterials: React.FC = () => {
  const [materials, setMaterials] = useState<PrepMaterial[]>([
    {
      id: '1',
      title: 'Quantitative Aptitude - Complete Guide',
      description: 'Comprehensive guide covering all quantitative aptitude topics including arithmetic, algebra, geometry, and data interpretation with solved examples and practice problems.',
      category: 'aptitude',
      subcategory: 'Quantitative Aptitude',
      type: 'pdf',
      difficulty: 'intermediate',
      duration: '4-6 hours',
      fileSize: '15.2 MB',
      author: 'Dr. R.S. Aggarwal',
      publisher: 'S. Chand Publishing',
      publishDate: '2024-08-15',
      rating: 4.7,
      totalRatings: 1250,
      downloads: 8500,
      views: 12000,
      isBookmarked: true,
      isPremium: false,
      tags: ['mathematics', 'problem-solving', 'placement-prep'],
      topics: ['Arithmetic', 'Algebra', 'Geometry', 'Data Interpretation', 'Number System'],
      thumbnail: '📊',
      url: '/materials/quantitative-aptitude-guide.pdf',
      progress: 65,
      lastAccessed: '2025-09-02'
    },
    {
      id: '2',
      title: 'Data Structures & Algorithms Masterclass',
      description: 'Complete video series covering all important DSA concepts with coding examples in multiple languages. Perfect for technical interview preparation.',
      category: 'technical',
      subcategory: 'Data Structures',
      type: 'video',
      difficulty: 'intermediate',
      duration: '12 hours',
      fileSize: '2.1 GB',
      author: 'Coding Ninja',
      publisher: 'TechEd Platform',
      publishDate: '2024-09-01',
      rating: 4.8,
      totalRatings: 2100,
      downloads: 5600,
      views: 18500,
      isBookmarked: false,
      isPremium: true,
      tags: ['dsa', 'coding', 'interview-prep', 'algorithms'],
      topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming'],
      thumbnail: '🎥',
      url: '/materials/dsa-masterclass-videos',
      progress: 30,
      lastAccessed: '2025-09-01'
    },
    {
      id: '3',
      title: 'English Grammar & Comprehension',
      description: 'Essential English grammar rules, vocabulary building exercises, and reading comprehension practice for verbal ability sections.',
      category: 'verbal',
      subcategory: 'Grammar & Comprehension',
      type: 'interactive',
      difficulty: 'beginner',
      duration: '3-4 hours',
      author: 'Prof. Sarah Johnson',
      publisher: 'English Mastery',
      publishDate: '2024-07-20',
      rating: 4.5,
      totalRatings: 890,
      downloads: 3200,
      views: 5400,
      isBookmarked: true,
      isPremium: false,
      tags: ['english', 'grammar', 'vocabulary', 'comprehension'],
      topics: ['Grammar Rules', 'Vocabulary', 'Reading Comprehension', 'Sentence Correction'],
      thumbnail: '📝',
      url: '/materials/english-grammar-interactive',
      progress: 80,
      lastAccessed: '2025-08-30'
    },
    {
      id: '4',
      title: 'JavaScript Interview Questions - 500+ Problems',
      description: 'Extensive collection of JavaScript interview questions with detailed explanations and solutions. Covers ES6+, async programming, and more.',
      category: 'coding',
      subcategory: 'JavaScript',
      type: 'practice-set',
      difficulty: 'advanced',
      duration: '8-10 hours',
      fileSize: '8.7 MB',
      author: 'Tech Interview Pro',
      publisher: 'CodeMaster',
      publishDate: '2024-08-28',
      rating: 4.9,
      totalRatings: 1800,
      downloads: 7200,
      views: 15600,
      isBookmarked: false,
      isPremium: true,
      tags: ['javascript', 'interview', 'coding', 'es6'],
      topics: ['ES6 Features', 'Promises', 'Closures', 'Prototypes', 'DOM Manipulation'],
      thumbnail: '💻',
      url: '/materials/javascript-interview-questions.pdf'
    },
    {
      id: '5',
      title: 'HR Interview Mastery - Video Course',
      description: 'Complete guide to ace HR interviews with common questions, behavioral interview techniques, and presentation tips.',
      category: 'interview',
      subcategory: 'HR Interview',
      type: 'video',
      difficulty: 'beginner',
      duration: '5 hours',
      fileSize: '1.2 GB',
      author: 'Career Counselor Team',
      publisher: 'PlacementPro',
      publishDate: '2024-08-10',
      rating: 4.6,
      totalRatings: 1450,
      downloads: 6800,
      views: 11200,
      isBookmarked: true,
      isPremium: false,
      tags: ['hr-interview', 'behavioral', 'soft-skills', 'presentation'],
      topics: ['Common HR Questions', 'Behavioral Techniques', 'Body Language', 'Salary Negotiation'],
      thumbnail: '🎤',
      url: '/materials/hr-interview-mastery-videos',
      progress: 45
    },
    {
      id: '6',
      title: 'Group Discussion Topics & Techniques',
      description: 'Current GD topics with analysis, discussion techniques, and tips to lead group discussions effectively.',
      category: 'gd',
      subcategory: 'Group Discussion',
      type: 'article',
      difficulty: 'intermediate',
      duration: '2-3 hours',
      author: 'Communication Expert',
      publisher: 'Skill Development Hub',
      publishDate: '2024-09-02',
      rating: 4.4,
      totalRatings: 650,
      downloads: 2800,
      views: 4200,
      isBookmarked: false,
      isPremium: false,
      tags: ['group-discussion', 'communication', 'leadership', 'current-affairs'],
      topics: ['Current Affairs', 'Technology Topics', 'Social Issues', 'Leadership Skills'],
      thumbnail: '👥',
      url: '/materials/gd-topics-techniques'
    }
  ]);

  const [studyPlans] = useState<StudyPlan[]>([
    {
      id: '1',
      name: 'Complete Placement Preparation - 30 Days',
      description: 'Comprehensive 30-day study plan covering all placement topics',
      duration: '30 days',
      materials: ['1', '2', '3', '4', '5'],
      completedMaterials: ['3'],
      progress: 20,
      createdDate: '2025-08-20',
      targetDate: '2025-09-20',
      isActive: true
    },
    {
      id: '2',
      name: 'Technical Interview Focus - 15 Days',
      description: 'Intensive technical preparation for coding interviews',
      duration: '15 days',
      materials: ['2', '4'],
      completedMaterials: [],
      progress: 0,
      createdDate: '2025-09-01',
      targetDate: '2025-09-15',
      isActive: false
    }
  ]);

  const [filteredMaterials, setFilteredMaterials] = useState<PrepMaterial[]>(materials);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'downloads' | 'recent' | 'alphabetical'>('rating');
  const [selectedMaterial, setSelectedMaterial] = useState<PrepMaterial | null>(null);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [showCreatePlanModal, setShowCreatePlanModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort materials
  useEffect(() => {
    let filtered = materials.filter(material => {
      const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           material.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
      const matchesType = selectedType === 'all' || material.type === selectedType;
      const matchesDifficulty = selectedDifficulty === 'all' || material.difficulty === selectedDifficulty;
      const matchesBookmarked = !showBookmarkedOnly || material.isBookmarked;
      const matchesPremium = !showPremiumOnly || material.isPremium;
      
      return matchesSearch && matchesCategory && matchesType && 
             matchesDifficulty && matchesBookmarked && matchesPremium;
    });

    // Sort materials
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloads - a.downloads;
        case 'recent':
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredMaterials(filtered);
  }, [materials, searchTerm, selectedCategory, selectedType, selectedDifficulty, 
      showBookmarkedOnly, showPremiumOnly, sortBy]);

  const toggleBookmark = (materialId: string) => {
    setMaterials(prev => prev.map(material => 
      material.id === materialId 
        ? { ...material, isBookmarked: !material.isBookmarked }
        : material
    ));
    
    const material = materials.find(m => m.id === materialId);
    if (material) {
      alert(`${material.isBookmarked ? '💔 Removed from' : '❤️ Added to'} bookmarks!`);
    }
  };

  const downloadMaterial = (material: PrepMaterial) => {
    setMaterials(prev => prev.map(m => 
      m.id === material.id 
        ? { ...m, downloads: m.downloads + 1 }
        : m
    ));
    alert(`📥 Downloading ${material.title}...`);
  };

  const viewMaterial = (material: PrepMaterial) => {
    setMaterials(prev => prev.map(m => 
      m.id === material.id 
        ? { 
            ...m, 
            views: m.views + 1, 
            lastAccessed: new Date().toISOString().split('T')[0] 
          }
        : m
    ));
    setSelectedMaterial(material);
    setShowMaterialModal(true);
  };

  const shareMaterial = (material: PrepMaterial) => {
    const shareText = `Check out this study material: ${material.title}
    
📚 Category: ${material.category}
⭐ Rating: ${material.rating}/5 (${material.totalRatings} reviews)
⏱️ Duration: ${material.duration}

Perfect for placement preparation!`;

    if (navigator.share) {
      navigator.share({
        title: material.title,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('📋 Material details copied to clipboard!');
    }
  };

  const submitRating = (materialId: string) => {
    if (userRating === 0) {
      alert('⚠️ Please select a rating!');
      return;
    }

    setMaterials(prev => prev.map(material => 
      material.id === materialId 
        ? { 
            ...material, 
            userRating: userRating,
            userReview: userReview,
            // Update average rating (simplified)
            rating: ((material.rating * material.totalRatings) + userRating) / (material.totalRatings + 1),
            totalRatings: material.totalRatings + 1
          }
        : material
    ));

    alert('⭐ Thank you for your feedback!');
    setUserRating(0);
    setUserReview('');
  };

  const updateProgress = (materialId: string, progress: number) => {
    setMaterials(prev => prev.map(material => 
      material.id === materialId 
        ? { ...material, progress: progress }
        : material
    ));
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      aptitude: '🔢',
      technical: '💻',
      verbal: '📝',
      coding: '⌨️',
      interview: '🎤',
      gd: '👥',
      'soft-skills': '🧠'
    };
    return icons[category as keyof typeof icons] || '📚';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      aptitude: 'bg-blue-100 text-blue-800',
      technical: 'bg-green-100 text-green-800',
      verbal: 'bg-purple-100 text-purple-800',
      coding: 'bg-orange-100 text-orange-800',
      interview: 'bg-red-100 text-red-800',
      gd: 'bg-yellow-100 text-yellow-800',
      'soft-skills': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      pdf: FileTextIcon,
      video: VideoIcon,
      audio: HeadphonesIcon,
      interactive: ZapIcon,
      quiz: BrainIcon,
      'practice-set': TargetIcon,
      article: BookOpenIcon,
      link: LinkIcon
    };
    return icons[type as keyof typeof icons] || FileTextIcon;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors];
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedDifficulty('all');
    setShowBookmarkedOnly(false);
    setShowPremiumOnly(false);
  };

  const stats = {
    totalMaterials: materials.length,
    bookmarkedMaterials: materials.filter(m => m.isBookmarked).length,
    completedMaterials: materials.filter(m => m.progress && m.progress >= 100).length,
    averageProgress: materials.filter(m => m.progress).length > 0 
      ? Math.round(materials.filter(m => m.progress).reduce((sum, m) => sum + (m.progress || 0), 0) / materials.filter(m => m.progress).length)
      : 0
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Placement Preparation Materials</h1>
              <p className="text-gray-600 mt-1">Access comprehensive study materials for placement preparation</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* <button
                onClick={() => setShowCreatePlanModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Create Study Plan
              </button> */}
              <button
                onClick={() => alert('📊 Generating progress report...')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <TrendingUpIcon size={20} />
                Progress Report
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Materials</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.totalMaterials}</p>
                </div>
                <BookOpenIcon className="text-blue-600" size={24} />
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">Bookmarked</p>
                  <p className="text-2xl font-bold text-red-900">{stats.bookmarkedMaterials}</p>
                </div>
                <BookmarkIcon className="text-red-600" size={24} />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-900">{stats.completedMaterials}</p>
                </div>
                <AwardIcon className="text-green-600" size={24} />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Avg Progress</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.averageProgress}%</p>
                </div>
                <TargetIcon className="text-purple-600" size={24} />
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
                  placeholder="Search materials by title, topic, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="aptitude">Aptitude</option>
                  <option value="technical">Technical</option>
                  <option value="verbal">Verbal</option>
                  <option value="coding">Coding</option>
                  <option value="interview">Interview</option>
                  <option value="gd">Group Discussion</option>
                  <option value="soft-skills">Soft Skills</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="rating">By Rating</option>
                  <option value="downloads">By Downloads</option>
                  <option value="recent">Most Recent</option>
                  <option value="alphabetical">Alphabetical</option>
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
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="pdf">PDF</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                  <option value="interactive">Interactive</option>
                  <option value="quiz">Quiz</option>
                  <option value="practice-set">Practice Set</option>
                  <option value="article">Article</option>
                  <option value="link">External Link</option>
                </select>
                
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Difficulties</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    showBookmarkedOnly 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Bookmarked Only ({stats.bookmarkedMaterials})
                </button>
                
                <button
                  onClick={() => setShowPremiumOnly(!showPremiumOnly)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    showPremiumOnly 
                      ? 'bg-yellow-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Premium Only
                </button>
                
                {(searchTerm || selectedCategory !== 'all' || selectedType !== 'all' || 
                  selectedDifficulty !== 'all' || showBookmarkedOnly || showPremiumOnly) && (
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

        {/* Materials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMaterials.map(material => {
            const TypeIcon = getTypeIcon(material.type);
            
            return (
              <div key={material.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
                <div className="p-6">
                  {/* Material Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{getCategoryIcon(material.category)}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 line-clamp-1">{material.title}</h3>
                          {material.isPremium && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                              Premium
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{material.subcategory}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <button
                        onClick={() => toggleBookmark(material.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          material.isBookmarked 
                            ? 'text-red-500 bg-red-100' 
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                      >
                        <BookmarkIcon size={16} fill={material.isBookmarked ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={() => shareMaterial(material)}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <ShareIcon size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{material.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(material.category)}`}>
                      {material.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(material.difficulty)}`}>
                      {material.difficulty}
                    </span>
                    <div className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      <TypeIcon size={12} />
                      <span>{material.type}</span>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {material.topics.slice(0, 3).map((topic, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                      {material.topics.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{material.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <StarIcon size={14} className="text-yellow-500 fill-current" />
                      <span className="font-medium">{material.rating}</span>
                      <span className="text-gray-500">({material.totalRatings})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DownloadIcon size={14} className="text-gray-400" />
                      <span className="text-gray-600">{material.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon size={14} className="text-gray-400" />
                      <span className="text-gray-600">{material.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <EyeIcon size={14} className="text-gray-400" />
                      <span className="text-gray-600">{material.views.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Progress Bar (if available) */}
                  {material.progress !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{material.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            material.progress >= 100 ? 'bg-green-500' :
                            material.progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${material.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Author Info */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <UserIcon size={14} />
                    <span>by {material.author}</span>
                    <span>•</span>
                    <span>{new Date(material.publishDate).toLocaleDateString()}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => viewMaterial(material)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                      >
                        <EyeIcon size={14} />
                        View Details
                      </button>
                      <button
                        onClick={() => downloadMaterial(material)}
                        className="bg-green-100 hover:bg-green-200 text-green-700 py-2 px-4 rounded-lg transition-colors text-sm"
                      >
                        <DownloadIcon size={14} />
                      </button>
                    </div>
                    
                    {material.type === 'video' && (
                      <button
                        onClick={() => alert(`▶️ Playing: ${material.title}`)}
                        className="w-full bg-red-100 hover:bg-red-200 text-red-700 py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                      >
                        <PlayIcon size={14} />
                        Play Video
                      </button>
                    )}
                    
                    {material.type === 'quiz' && (
                      <button
                        onClick={() => alert(`🧠 Starting quiz: ${material.title}`)}
                        className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                      >
                        <BrainIcon size={14} />
                        Take Quiz
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredMaterials.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <BookOpenIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No materials found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== 'all' || selectedType !== 'all' || 
               selectedDifficulty !== 'all' || showBookmarkedOnly || showPremiumOnly
                ? 'Try adjusting your search criteria or filters'
                : 'Study materials will appear here'
              }
            </p>
            {(searchTerm || selectedCategory !== 'all' || selectedType !== 'all' || 
              selectedDifficulty !== 'all' || showBookmarkedOnly || showPremiumOnly) && (
              <button
                onClick={clearAllFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Material Detail Modal */}
        {showMaterialModal && selectedMaterial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">{selectedMaterial.title}</h2>
                  <button
                    onClick={() => setShowMaterialModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                        <p className="text-gray-700 leading-relaxed">{selectedMaterial.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Topics Covered</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedMaterial.topics.map((topic, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedMaterial.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {selectedMaterial.progress !== undefined && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Your Progress</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between text-sm mb-2">
                              <span>Progress</span>
                              <span className="font-medium">{selectedMaterial.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                              <div 
                                className={`h-3 rounded-full transition-all ${
                                  selectedMaterial.progress >= 100 ? 'bg-green-500' :
                                  selectedMaterial.progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'
                                }`}
                                style={{ width: `${selectedMaterial.progress}%` }}
                              ></div>
                            </div>
                            
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateProgress(selectedMaterial.id, Math.min((selectedMaterial.progress || 0) + 25, 100))}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                              >
                                +25%
                              </button>
                              <button
                                onClick={() => updateProgress(selectedMaterial.id, 100)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                              >
                                Mark Complete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Rate This Material</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-medium">Your Rating:</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map(rating => (
                                <button
                                  key={rating}
                                  onClick={() => setUserRating(rating)}
                                  className={`p-1 ${userRating >= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                >
                                  <StarIcon size={20} fill={userRating >= rating ? 'currentColor' : 'none'} />
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <textarea
                            value={userReview}
                            onChange={(e) => setUserReview(e.target.value)}
                            placeholder="Write your review (optional)"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 text-sm focus:ring-2 focus:ring-blue-500"
                          />
                          
                          <button
                            onClick={() => submitRating(selectedMaterial.id)}
                            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                          >
                            Submit Rating
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Material Info</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium capitalize">{selectedMaterial.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium capitalize">{selectedMaterial.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Difficulty:</span>
                          <span className="font-medium capitalize">{selectedMaterial.difficulty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{selectedMaterial.duration}</span>
                        </div>
                        {selectedMaterial.fileSize && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">File Size:</span>
                            <span className="font-medium">{selectedMaterial.fileSize}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Author:</span>
                          <span className="font-medium">{selectedMaterial.author}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Publisher:</span>
                          <span className="font-medium">{selectedMaterial.publisher}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Published:</span>
                          <span className="font-medium">{new Date(selectedMaterial.publishDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Statistics</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <StarIcon size={14} className="text-yellow-500 fill-current" />
                            <span className="text-gray-600">Rating:</span>
                          </div>
                          <span className="font-medium">{selectedMaterial.rating}/5 ({selectedMaterial.totalRatings} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <DownloadIcon size={14} className="text-gray-400" />
                            <span className="text-gray-600">Downloads:</span>
                          </div>
                          <span className="font-medium">{selectedMaterial.downloads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <EyeIcon size={14} className="text-gray-400" />
                            <span className="text-gray-600">Views:</span>
                          </div>
                          <span className="font-medium">{selectedMaterial.views.toLocaleString()}</span>
                        </div>
                        {selectedMaterial.lastAccessed && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Accessed:</span>
                            <span className="font-medium">{new Date(selectedMaterial.lastAccessed).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <button
                        onClick={() => downloadMaterial(selectedMaterial)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <DownloadIcon size={16} />
                        Download Material
                      </button>
                      
                      <button
                        onClick={() => toggleBookmark(selectedMaterial.id)}
                        className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                          selectedMaterial.isBookmarked
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <BookmarkIcon size={16} />
                        {selectedMaterial.isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                      </button>
                      
                      <button
                        onClick={() => shareMaterial(selectedMaterial)}
                        className="w-full bg-green-100 hover:bg-green-200 text-green-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <ShareIcon size={16} />
                        Share Material
                      </button>
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

export default PlacementPrepMaterials;