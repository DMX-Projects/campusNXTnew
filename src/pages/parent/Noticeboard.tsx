import React, { useState } from 'react';

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
];

const Noticeboard = () => {
  const [filter, setFilter] = useState('All');

  const filteredNotices = noticeData.filter(notice => {
    if (filter === 'All') return true;
    return notice.category === filter;
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-800">Noticeboard 📢</h1>
      
      <div className="flex justify-center gap-4 mb-6">
        {['All', 'Academics', 'Events', 'Fees'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
              filter === cat 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredNotices.map(notice => (
          <div key={notice.id} className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 ${notice.isUrgent ? 'border-l-4 border-red-500' : 'border-l-4 border-indigo-500'}`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-gray-800">{notice.title}</h3>
                {notice.isUrgent && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500 text-white animate-pulse">
                    Urgent
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-4">{notice.date} • {notice.category}</p>
              <p className="text-gray-700 leading-relaxed">{notice.content}</p>
              <button className="mt-4 text-indigo-600 font-semibold hover:underline">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Noticeboard;