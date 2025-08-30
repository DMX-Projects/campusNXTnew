import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         PieChart, Pie, Cell } from 'recharts';
import { Book, Users, AlertTriangle, TrendingUp, Search, Plus } from 'lucide-react';
import DashboardCard from '../Dashboard/DashboardCard';

const Library: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const cardData = [
    { title: 'Total Books', value: '12,450', change: '+250', trend: 'up' as const, icon: Book, color: 'bg-blue-500' },
    { title: 'Active Members', value: '2,847', change: '+45', trend: 'up' as const, icon: Users, color: 'bg-green-500' },
    { title: 'Books Issued Today', value: '124', change: '+8', trend: 'up' as const, icon: TrendingUp, color: 'bg-purple-500' },
    { title: 'Overdue Books', value: '23', change: '-5', trend: 'down' as const, icon: AlertTriangle, color: 'bg-red-500' }
  ];

  const circulationData = [
    { category: 'Computer Science', issued: 145, returned: 132 },
    { category: 'Engineering', issued: 98, returned: 89 },
    { category: 'Mathematics', issued: 76, returned: 71 },
    { category: 'Physics', issued: 54, returned: 48 },
    { category: 'Literature', issued: 32, returned: 29 }
  ];

  const categoryDistribution = [
    { name: 'Computer Science', value: 3250, color: '#3B82F6' },
    { name: 'Engineering', value: 2890, color: '#10B981' },
    { name: 'Mathematics', value: 1560, color: '#F59E0B' },
    { name: 'Science', value: 1980, color: '#EF4444' },
    { name: 'Literature', value: 1200, color: '#8B5CF6' },
    { name: 'Others', value: 1570, color: '#6B7280' }
  ];

  const topBooks = [
    { title: 'Introduction to Algorithms', author: 'Cormen et al.', category: 'Computer Science', issued: 45, available: 8 },
    { title: 'Database System Concepts', author: 'Silberschatz', category: 'Computer Science', issued: 38, available: 5 },
    { title: 'Operating System Concepts', author: 'Galvin', category: 'Computer Science', issued: 32, available: 12 },
    { title: 'Computer Networks', author: 'Tanenbaum', category: 'Computer Science', issued: 28, available: 7 },
    { title: 'Software Engineering', author: 'Pressman', category: 'Computer Science', issued: 25, available: 9 }
  ];

  const recentActivity = [
    { action: 'Book Issued', user: 'Alex Wilson', book: 'Clean Code', time: '10 mins ago' },
    { action: 'Book Returned', user: 'Emma Johnson', book: 'Design Patterns', time: '25 mins ago' },
    { action: 'Book Reserved', user: 'Michael Chen', book: 'Algorithms', time: '1 hour ago' },
    { action: 'Fine Paid', user: 'Sophia Rodriguez', book: 'Database Systems', time: '2 hours ago' }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'catalog', name: 'Book Catalog' },
    { id: 'circulation', name: 'Issue/Return' },
    { id: 'reports', name: 'Reports' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Library Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage library resources and track circulation
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Add New Book
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Issue Book
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <DashboardCard key={index} data={card} />
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Circulation Statistics */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Monthly Circulation
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={circulationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="category" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: 'none', 
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Bar dataKey="issued" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="returned" fill="#10B981" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Collection Distribution */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Collection by Category
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Recent Library Activity
                  </h3>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.action === 'Book Issued' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                          activity.action === 'Book Returned' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                          activity.action === 'Book Reserved' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' :
                          'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                        }`}>
                          <Book className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.action}: {activity.book}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Most Popular Books
                  </h3>
                  <div className="space-y-3">
                    {topBooks.map((book, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {book.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            by {book.author}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            {book.issued} issued
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {book.available} available
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'catalog' && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search books, authors, ISBN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Book</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Title</th>
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Author</th>
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Category</th>
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Available</th>
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Total</th>
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', available: 8, total: 10 },
                      { title: 'Database System Concepts', author: 'Abraham Silberschatz', category: 'Computer Science', available: 5, total: 8 },
                      { title: 'Operating System Concepts', author: 'Abraham Silberschatz', category: 'Computer Science', available: 12, total: 15 },
                      { title: 'Computer Networks', author: 'Andrew S. Tanenbaum', category: 'Computer Science', available: 6, total: 10 },
                      { title: 'Software Engineering', author: 'Roger S. Pressman', category: 'Computer Science', available: 9, total: 12 }
                    ].map((book, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                          {book.title}
                        </td>
                        <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                          {book.author}
                        </td>
                        <td className="border border-gray-200 dark:border-gray-600 px-4 py-3">
                          <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                            {book.category}
                          </span>
                        </td>
                        <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {book.available}
                        </td>
                        <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {book.total}
                        </td>
                        <td className="border border-gray-200 dark:border-gray-600 px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            book.available > 3 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            book.available > 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                            'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {book.available > 3 ? 'Available' : book.available > 0 ? 'Low Stock' : 'Out of Stock'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;