import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import DashboardCard from './DashboardCard';
import { Book, Users, TrendingUp, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';

const LibraryDashboard: React.FC = () => {
  const cardData = [
    { title: 'Total Books', value: '12,450', change: '+250', trend: 'up' as const, icon: Book, color: 'bg-blue-500' },
    { title: 'Active Members', value: '2,847', change: '+45', trend: 'up' as const, icon: Users, color: 'bg-green-500' },
    { title: 'Books Issued Today', value: '124', change: '+8', trend: 'up' as const, icon: TrendingUp, color: 'bg-purple-500' },
    { title: 'Overdue Books', value: '23', change: '-5', trend: 'down' as const, icon: AlertTriangle, color: 'bg-red-500' },
    { title: 'New Arrivals', value: '45', change: '+12', trend: 'up' as const, icon: CheckCircle, color: 'bg-teal-500' },
    { title: 'Fine Collected', value: '₹2,340', change: '-18%', trend: 'down' as const, icon: DollarSign, color: 'bg-orange-500' }
  ];

  const circulationData = [
    { month: 'Aug', issued: 1245, returned: 1198 },
    { month: 'Sep', issued: 1156, returned: 1134 },
    { month: 'Oct', issued: 1334, returned: 1289 },
    { month: 'Nov', issued: 1278, returned: 1245 },
    { month: 'Dec', issued: 1189, returned: 1167 },
    { month: 'Jan', issued: 1298, returned: 1256 }
  ];

  const categoryDistribution = [
    { name: 'Computer Science', value: 3250, color: '#3B82F6' },
    { name: 'Engineering', value: 2890, color: '#10B981' },
    { name: 'Mathematics', value: 1560, color: '#F59E0B' },
    { name: 'Science', value: 1980, color: '#EF4444' },
    { name: 'Literature', value: 1200, color: '#8B5CF6' },
    { name: 'Others', value: 1570, color: '#6B7280' }
  ];

  const topCirculationBooks = [
    { title: 'Introduction to Algorithms', author: 'Cormen et al.', issued: 45, category: 'Computer Science' },
    { title: 'Database System Concepts', author: 'Silberschatz', issued: 38, category: 'Computer Science' },
    { title: 'Operating System Concepts', author: 'Galvin', issued: 32, category: 'Computer Science' },
    { title: 'Computer Networks', author: 'Tanenbaum', issued: 28, category: 'Computer Science' },
    { title: 'Software Engineering', author: 'Pressman', issued: 25, category: 'Computer Science' },
    { title: 'Digital Electronics', author: 'Morris Mano', issued: 23, category: 'Electronics' },
    { title: 'Engineering Mathematics', author: 'B.S. Grewal', issued: 22, category: 'Mathematics' },
    { title: 'Physics for Engineers', author: 'Serway', issued: 20, category: 'Physics' },
    { title: 'Chemistry Fundamentals', author: 'Chang', issued: 18, category: 'Chemistry' },
    { title: 'Technical Communication', author: 'Meenakshi Raman', issued: 16, category: 'English' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Library Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive library operations and circulation analytics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Issue Book
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {cardData.map((card, index) => (
          <DashboardCard key={index} data={card} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Circulation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Monthly Book Circulation
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={circulationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line type="monotone" dataKey="issued" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
              <Line type="monotone" dataKey="returned" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Collection Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
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

      {/* Top 10 Book Circulations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Top 10 Book Circulations
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Rank</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Author</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Times Issued</th>
              </tr>
            </thead>
            <tbody>
              {topCirculationBooks.map((book, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index < 3 ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                    {book.title}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {book.author}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                      {book.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-bold text-green-600 dark:text-green-400">
                    {book.issued}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LibraryDashboard;