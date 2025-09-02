import React, { useState } from 'react';
import { Calendar, Tag, AlertCircle, Eye, Filter } from 'lucide-react';

const noticeData = [
  {
    id: 1,
    title: 'Academic Calendar for the 2025-26 Session',
    date: 'August 28, 2025',
    category: 'Academics',
    isUrgent: false,
    content: 'The new academic calendar is now available. Please review all key dates, including holidays and examination periods.',
  },
  {
    id: 2,
    title: 'PTA Meeting on September 15',
    date: 'August 25, 2025',
    category: 'Events',
    isUrgent: true,
    content: 'This is an urgent reminder about the upcoming Parent-Teacher Association (PTA) meeting. Your attendance is mandatory.',
  },
  {
    id: 3,
    title: 'Revision of Fee Structure for B.Tech',
    date: 'August 20, 2025',
    category: 'Fees',
    isUrgent: false,
    content: 'Please note the revised fee structure for the B.Tech program, effective from the next semester.',
  },
  {
    id: 4,
    title: 'Annual College Fest - Registration Open',
    date: 'August 18, 2025',
    category: 'Events',
    isUrgent: false,
    content: 'Registration for the annual college fest "Synergy 2025" is now open. Register now to participate in various cultural and technical events.',
  },
  {
    id: 5,
    title: 'Library Timings Extended',
    date: 'August 15, 2025',
    category: 'Academics',
    isUrgent: false,
    content: 'The library will now remain open until 10 PM on weekdays to facilitate better study environment for students.',
  },
  {
    id: 6,
    title: 'Hostel Fee Payment Deadline',
    date: 'August 10, 2025',
    category: 'Fees',
    isUrgent: true,
    content: 'Last date for hostel fee payment is September 5, 2025. Late payments will incur additional charges.',
  },
];

const Noticeboard = () => {
  const [filter, setFilter] = useState('All');
  const [expandedNotice, setExpandedNotice] = useState(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const filteredNotices = noticeData.filter(notice => {
    if (filter === 'All') return true;
    return notice.category === filter;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Academics': 'bg-blue-100 text-blue-800 border-blue-200',
      'Events': 'bg-purple-100 text-purple-800 border-purple-200',
      'Fees': 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const toggleNoticeExpansion = (noticeId) => {
    setExpandedNotice(expandedNotice === noticeId ? null : noticeId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-800 mb-2 sm:mb-4">
            Noticeboard 📢
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Stay updated with the latest announcements and important information
          </p>
        </div>

        {/* Filter Section */}
        <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
          {/* Desktop Filter */}
          <div className="hidden sm:flex justify-center gap-2 lg:gap-4">
            {['All', 'Academics', 'Events', 'Fees'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                  filter === cat 
                    ? 'bg-indigo-600 text-white shadow-lg transform scale-105' 
                    : 'bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-50 hover:scale-105'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Filter */}
          <div className="sm:hidden">
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="w-full bg-white border border-indigo-300 text-indigo-600 px-4 py-3 rounded-lg font-medium flex items-center justify-between"
            >
              <span className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter: {filter}
              </span>
              <span className={`transform transition-transform ${showMobileFilter ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {showMobileFilter && (
              <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                {['All', 'Academics', 'Events', 'Fees'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFilter(cat);
                      setShowMobileFilter(false);
                    }}
                    className={`w-full px-4 py-3 text-left transition-colors ${
                      filter === cat 
                        ? 'bg-indigo-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notice Count */}
        <div className="max-w-7xl mx-auto mb-4 sm:mb-6">
          <p className="text-center text-sm sm:text-base text-gray-600">
            Showing {filteredNotices.length} notice{filteredNotices.length !== 1 ? 's' : ''}
            {filter !== 'All' && ` in ${filter}`}
          </p>
        </div>
        
        {/* Notices Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredNotices.map(notice => (
              <div 
                key={notice.id} 
                className={`bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] ${
                  notice.isUrgent ? 'border-l-4 sm:border-l-6 border-red-500 ring-2 ring-red-100' : 'border-l-4 sm:border-l-6 border-indigo-500'
                }`}
              >
                <div className="p-4 sm:p-6">
                  {/* Notice Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 leading-tight pr-2">
                      {notice.title}
                    </h3>
                    {notice.isUrgent && (
                      <div className="flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1 text-red-500" />
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-500 text-white animate-pulse whitespace-nowrap">
                          URGENT
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Notice Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span>{notice.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Tag className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(notice.category)}`}>
                        {notice.category}
                      </span>
                    </div>
                  </div>

                  {/* Notice Content */}
                  <div className="mb-4">
                    <p className={`text-gray-700 leading-relaxed text-sm sm:text-base ${
                      expandedNotice === notice.id ? '' : 'line-clamp-3'
                    }`}>
                      {notice.content}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button 
                      onClick={() => toggleNoticeExpansion(notice.id)}
                      className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {expandedNotice === notice.id ? 'Show Less' : 'Read More'}
                    </button>
                    
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 text-sm sm:text-base">
                      Download PDF
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedNotice === notice.id && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 bg-gray-50 border-t border-gray-200">
                    <div className="pt-4">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Additional Information:</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        For more details regarding this notice, please contact the administration office during working hours (9 AM - 5 PM) or visit the student portal for complete documentation.
                      </p>
                      <div className="mt-3 pt-3 border-t border-gray-300">
                        <p className="text-xs text-gray-500">Notice ID: {notice.id} | Category: {notice.category}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredNotices.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 max-w-md mx-auto">
                <div className="text-4xl sm:text-6xl mb-4">📭</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No Notices Found</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  There are no notices in the "{filter}" category at the moment.
                </p>
                <button 
                  onClick={() => setFilter('All')}
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  View All Notices
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Footer */}
        <div className="max-w-7xl mx-auto mt-8 sm:mt-12">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">Notice Statistics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{noticeData.length}</p>
                <p className="text-xs sm:text-sm text-gray-600">Total Notices</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-xl sm:text-2xl font-bold text-red-600">
                  {noticeData.filter(n => n.isUrgent).length}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">Urgent</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-xl sm:text-2xl font-bold text-purple-600">
                  {noticeData.filter(n => n.category === 'Events').length}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">Events</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  {noticeData.filter(n => n.category === 'Academics').length}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">Academic</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Noticeboard;