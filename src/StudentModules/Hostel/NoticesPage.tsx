import React, { useState } from 'react';
import { 
  Bell, Search, Filter, Calendar, Clock, X,
  Pin, Eye, Download, Share2, Star,
  MessageCircle, Paperclip, ChevronDown, Tag, Menu
} from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'General' | 'Academic' | 'Hostel' | 'Mess' | 'Emergency' | 'Event' | 'Fee' | 'Maintenance';
  priority: 'High' | 'Medium' | 'Low';
  postedBy: string;
  postedDate: string;
  validTill?: string;
  attachments?: string[];
  isPinned: boolean;
  isRead: boolean;
  targetAudience: 'All Students' | 'Hostel Students' | 'Specific Block';
  views: number;
}

const NoticesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Sample notices data
  const notices: Notice[] = [
    {
      id: 'N001',
      title: 'Hostel Fee Payment Reminder - Due October 10th',
      content: 'All hostel students are requested to clear their pending fees by October 10th, 2025. Late payment charges of ₹100 per day will be applicable after the due date. Please visit the accounts office or use the online payment portal.',
      category: 'Fee',
      priority: 'High',
      postedBy: 'Hostel Accounts Office',
      postedDate: '2025-09-01T10:00:00Z',
      validTill: '2025-10-10T23:59:59Z',
      attachments: ['fee-structure-2025.pdf', 'payment-instructions.pdf'],
      isPinned: true,
      isRead: false,
      targetAudience: 'Hostel Students',
      views: 1247
    },
    {
      id: 'N002',
      title: 'Block B Water Supply Maintenance - Oct 5-7',
      content: 'Water supply will be temporarily disrupted in Block B from October 5th to 7th, 2025, between 9:00 AM to 5:00 PM for pipeline maintenance. Alternative arrangements have been made. Water tankers will be available in the ground floor.',
      category: 'Maintenance',
      priority: 'High',
      postedBy: 'Maintenance Department',
      postedDate: '2025-09-02T14:30:00Z',
      validTill: '2025-10-07T17:00:00Z',
      isPinned: true,
      isRead: true,
      targetAudience: 'Specific Block',
      views: 892
    },
    {
      id: 'N003',
      title: 'Updated Mess Timings - Effective October 1st',
      content: 'New mess timings are as follows:\n\nBreakfast: 7:30 AM - 9:30 AM\nLunch: 12:00 PM - 2:30 PM\nSnacks: 4:00 PM - 6:00 PM\nDinner: 7:30 PM - 9:30 PM\n\nPlease adhere to these timings to avoid inconvenience.',
      category: 'Mess',
      priority: 'Medium',
      postedBy: 'Mess Committee',
      postedDate: '2025-09-25T09:15:00Z',
      isPinned: false,
      isRead: true,
      targetAudience: 'Hostel Students',
      views: 2103
    }
  ];

  // Filter notices based on search and category
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort notices (pinned first, then by date)
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Emergency': return 'bg-red-100 text-red-800 border-red-200';
      case 'Fee': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Maintenance': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Event': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Mess': return 'bg-green-100 text-green-800 border-green-200';
      case 'Academic': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Hostel': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedNotice(null);
  };

  // WhatsApp Share Function
  const handleWhatsAppShare = (notice: Notice) => {
    const message = `*${notice.title}*\n\n${notice.content}\n\n📅 Posted: ${formatDate(notice.postedDate)}\n👤 By: ${notice.postedBy}\n\n_Shared from Hostel Portal_`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-first responsive padding */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className=" mx-auto">
        
          {/* Search and Filters - Enhanced mobile layout */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Search notices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                >
                  <option value="All">All Categories</option>
                  <option value="General">General</option>
                  <option value="Academic">Academic</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Mess">Mess</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Event">Event</option>
                  <option value="Fee">Fee</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
                
                {/* Filter Toggle Button - Mobile friendly */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm sm:text-base font-medium"
                >
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Filters</span>
                </button>
              </div>

              {/* Extended Filters - Responsive */}
              {showFilters && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    <button className="px-3 py-2 bg-red-100 text-red-800 rounded-full text-xs sm:text-sm font-medium">
                      High Priority
                    </button>
                    <button className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
                      Unread Only
                    </button>
                    <button className="px-3 py-2 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-medium">
                      This Week
                    </button>
                    <button className="px-3 py-2 bg-purple-100 text-purple-800 rounded-full text-xs sm:text-sm font-medium">
                      Attachments
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notice Count - Mobile optimized */}
          <div className="mb-4">
            <p className="text-sm sm:text-base text-gray-600">
              Showing <span className="font-semibold">{sortedNotices.length}</span> notices
              {searchTerm && (
                <span> for "<span className="font-semibold">{searchTerm}</span>"</span>
              )}
            </p>
          </div>

          {/* Notices List - Fully responsive cards */}
          <div className="space-y-3 sm:space-y-4">
            {sortedNotices.length > 0 ? (
              sortedNotices.map((notice) => (
                <div
                  key={notice.id}
                  className={`bg-white rounded-lg shadow-sm border-l-4 p-4 sm:p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 ${
                    notice.priority === 'High' ? 'border-l-red-500' :
                    notice.priority === 'Medium' ? 'border-l-yellow-500' : 'border-l-green-500'
                  } ${!notice.isRead ? 'bg-blue-50' : ''}`}
                  onClick={() => handleNoticeClick(notice)}
                >
                  {/* Notice Header - Mobile-first layout */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                      {notice.isPinned && (
                        <Pin className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-base sm:text-lg leading-tight ${!notice.isRead ? 'text-blue-900' : 'text-gray-900'} break-words`}>
                          {notice.title}
                        </h3>
                        {/* Tags - Responsive layout */}
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(notice.category)}`}>
                            {notice.category}
                          </span>
                          <span className={`text-xs font-medium ${getPriorityColor(notice.priority)}`}>
                            {notice.priority}
                          </span>
                          {!notice.isRead && (
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats and Date - Mobile-friendly */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 text-xs sm:text-sm text-gray-500 flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{notice.views}</span>
                      </div>
                      <div className="hidden sm:block">{formatDate(notice.postedDate)}</div>
                      <div className="sm:hidden">{new Date(notice.postedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</div>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2">
                    {notice.content.substring(0, 150)}...
                  </p>

                  {/* Footer - Mobile responsive */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    {/* Meta info - Stack on mobile */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                      <span className="text-gray-600">
                        By <span className="font-medium">{notice.postedBy}</span>
                      </span>
                      {notice.validTill && (
                        <span className="text-red-600 flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Valid till </span>
                          <span className="sm:hidden">Till </span>
                          {formatDate(notice.validTill)}
                        </span>
                      )}
                      {notice.attachments && notice.attachments.length > 0 && (
                        <span className="text-blue-600 flex items-center gap-1">
                          <Paperclip className="w-3 h-3 sm:w-4 sm:h-4" />
                          {notice.attachments.length} file{notice.attachments.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    
                    {/* Action buttons - Mobile optimized */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsAppShare(notice);
                        }}
                        className="px-3 py-1.5 text-green-600 hover:bg-green-100 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Share</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNoticeClick(notice);
                        }}
                        className="px-3 py-1.5 text-blue-600 hover:bg-blue-100 rounded-lg text-xs sm:text-sm font-medium"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12 text-center">
                <Bell className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-2">No notices found</h3>
                <p className="text-sm sm:text-base text-gray-500">
                  {searchTerm ? 'Try adjusting your search terms or filters' : 'No notices available at the moment'}
                </p>
              </div>
            )}
          </div>

          {/* Notice Detail Modal - Fully responsive */}
          {showModal && selectedNotice && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
              <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
                {/* Modal Header - Mobile optimized */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex justify-between items-start rounded-t-xl sm:rounded-t-2xl">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      {selectedNotice.isPinned && (
                        <Pin className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                      )}
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 break-words">
                        {selectedNotice.title}
                      </h2>
                    </div>
                    {/* Tags in modal - Responsive */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full border ${getCategoryColor(selectedNotice.category)}`}>
                        {selectedNotice.category}
                      </span>
                      <span className={`text-xs sm:text-sm font-medium ${getPriorityColor(selectedNotice.priority)}`}>
                        {selectedNotice.priority} Priority
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600">{selectedNotice.views} views</span>
                    </div>
                  </div>
                  {/* Close button - Touch friendly */}
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-4 sm:p-6">
                  <div className="mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 mb-4 gap-2">
                      <span>Posted by <strong>{selectedNotice.postedBy}</strong></span>
                      <span>{formatDate(selectedNotice.postedDate)}</span>
                    </div>
                    
                    {selectedNotice.validTill && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 text-yellow-800">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span className="font-medium text-sm sm:text-base">Valid until: {formatDate(selectedNotice.validTill)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="prose prose-sm sm:prose max-w-none mb-4 sm:mb-6">
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed text-sm sm:text-base">
                      {selectedNotice.content}
                    </div>
                  </div>

                  {/* Attachments */}
                  {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                    <div className="border-t border-gray-200 pt-4 sm:pt-6">
                      <h4 className="font-semibold text-gray-800 mb-3 text-base sm:text-lg">Attachments</h4>
                      <div className="space-y-2">
                        {selectedNotice.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <Paperclip className="w-4 h-4 text-gray-500 flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-700 truncate">{attachment}</span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex-shrink-0 ml-2">
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Modal Footer - Mobile responsive actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 sm:pt-6 border-t border-gray-200 gap-3">
                    <div className="text-xs sm:text-sm text-gray-600">
                      Target Audience: <span className="font-medium">{selectedNotice.targetAudience}</span>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <button 
                        onClick={() => handleWhatsAppShare(selectedNotice)}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">Share on WhatsApp</span>
                        <span className="sm:hidden">Share</span>
                      </button>
                      <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-medium">
                        <Star className="w-4 h-4" />
                        <span className="hidden sm:inline">Bookmark</span>
                        <span className="sm:hidden">Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticesPage;
