import React, { useState } from 'react';
import { 
  BellIcon, 
  PinIcon, 
  CalendarIcon, 
  UserIcon,

  EyeIcon,
  DownloadIcon,
  SearchIcon,
  
  BookmarkIcon,
  ShareIcon,
  ClockIcon,
  AlertCircleIcon,
  InfoIcon,

} from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'exam' | 'event' | 'administrative' | 'placement' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  author: string;
  department: string;
  publishDate: string;
  expiryDate?: string;
  isPinned: boolean;
  attachments: NoticeAttachment[];
  tags: string[];
  viewCount: number;
  isRead: boolean;
  isBookmarked: boolean;
  targetAudience: string[];
}

interface NoticeAttachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

const NoticeboardStu: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      title: 'Mid-Semester Examination Schedule Released',
      content: 'The mid-semester examination schedule for all branches has been released. Students are requested to check their respective timetables and prepare accordingly. The exams will commence from September 15, 2025.',
      category: 'exam',
      priority: 'high',
      author: 'Academic Office',
      department: 'Academic Affairs',
      publishDate: '2025-09-01T10:00:00Z',
      expiryDate: '2025-09-20T23:59:59Z',
      isPinned: true,
      attachments: [
        {
          id: '1',
          name: 'Mid-Sem-Timetable-2025.pdf',
          size: '1.2 MB',
          type: 'pdf',
          url: '/attachments/mid-sem-timetable.pdf'
        }
      ],
      tags: ['exam', 'timetable', 'important'],
      viewCount: 1250,
      isRead: false,
      isBookmarked: true,
      targetAudience: ['all-students']
    },
    {
      id: '2',
      title: 'Campus Recruitment Drive - Tech Giants',
      content: 'Major tech companies including Google, Microsoft, and Amazon will be visiting our campus for recruitment. Eligible students from CSE, ECE, and IT branches can register through the placement portal.',
      category: 'placement',
      priority: 'high',
      author: 'Placement Cell',
      department: 'Training & Placement',
      publishDate: '2025-08-30T14:30:00Z',
      expiryDate: '2025-09-15T23:59:59Z',
      isPinned: true,
      attachments: [
        {
          id: '2',
          name: 'Company-Details.pdf',
          size: '2.5 MB',
          type: 'pdf',
          url: '/attachments/company-details.pdf'
        },
        {
          id: '3',
          name: 'Registration-Form.docx',
          size: '0.5 MB',
          type: 'docx',
          url: '/attachments/registration-form.docx'
        }
      ],
      tags: ['placement', 'recruitment', 'tech-companies'],
      viewCount: 850,
      isRead: true,
      isBookmarked: false,
      targetAudience: ['cse', 'ece', 'it']
    },
    {
      id: '3',
      title: 'Library Hours Extended for Exam Period',
      content: 'The central library will remain open 24/7 during the examination period (September 10-25, 2025). Students need to carry their ID cards for entry after 10 PM.',
      category: 'academic',
      priority: 'medium',
      author: 'Library Staff',
      department: 'Library',
      publishDate: '2025-08-28T09:00:00Z',
      isPinned: false,
      attachments: [],
      tags: ['library', 'exam-period', 'extended-hours'],
      viewCount: 420,
      isRead: false,
      isBookmarked: false,
      targetAudience: ['all-students']
    },
    {
      id: '4',
      title: 'Annual Sports Meet Registration Open',
      content: 'Registration for the annual sports meet is now open. Students can participate in various events including athletics, cricket, football, basketball, and indoor games. Last date for registration: September 10, 2025.',
      category: 'event',
      priority: 'medium',
      author: 'Sports Committee',
      department: 'Sports & Recreation',
      publishDate: '2025-08-25T11:15:00Z',
      expiryDate: '2025-09-10T23:59:59Z',
      isPinned: false,
      attachments: [
        {
          id: '4',
          name: 'Sports-Events-List.pdf',
          size: '0.8 MB',
          type: 'pdf',
          url: '/attachments/sports-events.pdf'
        }
      ],
      tags: ['sports', 'registration', 'annual-meet'],
      viewCount: 320,
      isRead: false,
      isBookmarked: true,
      targetAudience: ['all-students']
    }
  ]);

  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const categories = ['academic', 'exam', 'event', 'administrative', 'placement', 'general'];
  const priorities = ['low', 'medium', 'high', 'urgent'];

  const getCategoryColor = (category: string) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800 border-blue-200',
      exam: 'bg-red-100 text-red-800 border-red-200',
      event: 'bg-green-100 text-green-800 border-green-200',
      administrative: 'bg-purple-100 text-purple-800 border-purple-200',
      placement: 'bg-orange-100 text-orange-800 border-orange-200',
      general: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-blue-100 text-blue-700',
      high: 'bg-yellow-100 text-yellow-700',
      urgent: 'bg-red-100 text-red-700'
    };
    return colors[priority as keyof typeof colors];
  };

  const getPriorityIcon = (priority: string) => {
    const icons = {
      low: InfoIcon,
      medium: BellIcon,
      high: AlertCircleIcon,
      urgent: AlertCircleIcon
    };
    return icons[priority as keyof typeof icons];
  };

  const markAsRead = (noticeId: string) => {
    setNotices(prev => prev.map(notice => 
      notice.id === noticeId ? { ...notice, isRead: true, viewCount: notice.viewCount + 1 } : notice
    ));
  };

  const toggleBookmark = (noticeId: string) => {
    setNotices(prev => prev.map(notice => 
      notice.id === noticeId ? { ...notice, isBookmarked: !notice.isBookmarked } : notice
    ));
  };

  const downloadAttachment = (attachment: NoticeAttachment) => {
    // Simulate download
    alert(`Downloading ${attachment.name}...`);
  };

  const shareNotice = (notice: Notice) => {
    if (navigator.share) {
      navigator.share({
        title: notice.title,
        text: notice.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${notice.title}\n${notice.content}\n${window.location.href}`);
      alert('Notice link copied to clipboard!');
    }
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || notice.priority === selectedPriority;
    const matchesUnread = !showUnreadOnly || !notice.isRead;
    const matchesBookmarked = !showBookmarkedOnly || notice.isBookmarked;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesUnread && matchesBookmarked;
  });

  // Sort notices: pinned first, then by priority, then by date
  const sortedNotices = filteredNotices.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notice Board</h1>
              <p className="text-gray-600 mt-1">Stay updated with important announcements and notices</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {notices.filter(n => !n.isRead).length} unread notices
              </span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search notices by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
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

          {/* Filter Toggles */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                showUnreadOnly 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unread Only
            </button>
            <button
              onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                showBookmarkedOnly 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bookmarked Only
            </button>
          </div>
        </div>

        {/* Notices List */}
        <div className="space-y-4">
          {sortedNotices.map(notice => {
            const PriorityIcon = getPriorityIcon(notice.priority);
            const expired = isExpired(notice.expiryDate);
            
            return (
              <div 
                key={notice.id} 
                className={`bg-white rounded-xl shadow-sm border transition-all hover:shadow-md ${
                  !notice.isRead ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'
                } ${expired ? 'opacity-60' : ''}`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Notice Icon & Priority */}
                    <div className="flex-shrink-0 pt-1">
                      {notice.isPinned && (
                        <PinIcon className="text-red-500 mb-2" size={20} />
                      )}
                      <PriorityIcon 
                        className={`${
                          notice.priority === 'urgent' ? 'text-red-600' :
                          notice.priority === 'high' ? 'text-yellow-600' :
                          notice.priority === 'medium' ? 'text-blue-600' :
                          'text-gray-600'
                        }`} 
                        size={20} 
                      />
                    </div>

                    {/* Notice Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h2 className={`text-lg font-semibold mb-1 ${
                            !notice.isRead ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notice.title}
                            {!notice.isRead && (
                              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full ml-2"></span>
                            )}
                          </h2>
                          
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(notice.category)}`}>
                              {notice.category.toUpperCase()}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notice.priority)}`}>
                              {notice.priority.toUpperCase()}
                            </span>
                            {expired && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                EXPIRED
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => toggleBookmark(notice.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              notice.isBookmarked 
                                ? 'text-yellow-600 bg-yellow-100 hover:bg-yellow-200' 
                                : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                            }`}
                            title={notice.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                          >
                            <BookmarkIcon size={16} fill={notice.isBookmarked ? 'currentColor' : 'none'} />
                          </button>
                          <button
                            onClick={() => shareNotice(notice)}
                            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Share notice"
                          >
                            <ShareIcon size={16} />
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-3">{notice.content}</p>

                      {/* Tags */}
                      {notice.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {notice.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Attachments */}
                      {notice.attachments.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments:</h4>
                          <div className="flex flex-wrap gap-2">
                            {notice.attachments.map(attachment => (
                              <button
                                key={attachment.id}
                                onClick={() => downloadAttachment(attachment)}
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm transition-colors"
                              >
                                <DownloadIcon size={14} />
                                <span>{attachment.name}</span>
                                <span className="text-gray-500">({attachment.size})</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Notice Metadata */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <UserIcon size={14} />
                          <span>{notice.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon size={14} />
                          <span>{new Date(notice.publishDate).toLocaleDateString()}</span>
                        </div>
                        {notice.expiryDate && !expired && (
                          <div className="flex items-center gap-1">
                            <ClockIcon size={14} />
                            <span>Expires: {new Date(notice.expiryDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <EyeIcon size={14} />
                          <span>{notice.viewCount} views</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      {!notice.isRead && (
                        <button
                          onClick={() => markAsRead(notice.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedNotice(notice);
                          markAsRead(notice.id);
                        }}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        View Full Notice
                      </button>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {notice.department}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedNotices.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <BellIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notices found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory !== 'all' || selectedPriority !== 'all' || showUnreadOnly || showBookmarkedOnly
                ? 'Try adjusting your search criteria or filters'
                : 'No notices are currently available'
              }
            </p>
          </div>
        )}

        {/* Notice Detail Modal */}
        {selectedNotice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">{selectedNotice.title}</h2>
                  <button
                    onClick={() => setSelectedNotice(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(selectedNotice.category)}`}>
                    {selectedNotice.category.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedNotice.priority)}`}>
                    {selectedNotice.priority.toUpperCase()}
                  </span>
                  {selectedNotice.isPinned && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      PINNED
                    </span>
                  )}
                </div>

                <div className="prose max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedNotice.content}</p>
                </div>

                {selectedNotice.tags.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedNotice.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedNotice.attachments.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Attachments:</h4>
                    <div className="grid gap-3">
                      {selectedNotice.attachments.map(attachment => (
                        <div key={attachment.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <DownloadIcon size={20} className="text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{attachment.name}</p>
                              <p className="text-sm text-gray-600">{attachment.size} • {attachment.type.toUpperCase()}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => downloadAttachment(attachment)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Published by:</strong> {selectedNotice.author}</p>
                      <p><strong>Department:</strong> {selectedNotice.department}</p>
                      <p><strong>Published on:</strong> {new Date(selectedNotice.publishDate).toLocaleString()}</p>
                      {selectedNotice.expiryDate && (
                        <p><strong>Expires on:</strong> {new Date(selectedNotice.expiryDate).toLocaleString()}</p>
                      )}
                    </div>
                    <div>
                      <p><strong>Views:</strong> {selectedNotice.viewCount}</p>
                      <p><strong>Target audience:</strong> {selectedNotice.targetAudience.join(', ')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => toggleBookmark(selectedNotice.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedNotice.isBookmarked
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <BookmarkIcon size={16} fill={selectedNotice.isBookmarked ? 'currentColor' : 'none'} />
                    {selectedNotice.isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
                  </button>
                  <button
                    onClick={() => shareNotice(selectedNotice)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <ShareIcon size={16} />
                    Share
                  </button>
                  <button
                    onClick={() => setSelectedNotice(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
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

export default NoticeboardStu;
