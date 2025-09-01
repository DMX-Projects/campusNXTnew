import React from 'react';
import { Book, Users, Clock, AlertTriangle, Calendar, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { dashboardStats, bookIssues, books, members } from './Data/mockData';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Books',
      value: dashboardStats.totalBooks.toLocaleString(),
      icon: Book,
      color: 'bg-blue-500',
      change: '+12.5%'
    },
    {
      title: 'Active Members',
      value: dashboardStats.totalMembers.toLocaleString(),
      icon: Users,
      color: 'bg-green-500',
      change: '+8.2%'
    },
    {
      title: 'Books Issued',
      value: dashboardStats.booksIssued.toLocaleString(),
      icon: Clock,
      color: 'bg-orange-500',
      change: '+15.3%'
    },
    {
      title: 'Overdue Books',
      value: dashboardStats.overdueBooks.toLocaleString(),
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '-5.1%'
    },
    {
      title: 'Reservations',
      value: dashboardStats.reservations.toLocaleString(),
      icon: Calendar,
      color: 'bg-purple-500',
      change: '+23.7%'
    },
    {
      title: 'Fines Collected',
      value: `₹${dashboardStats.finesCollected.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-indigo-500',
      change: '+18.9%'
    }
  ];

  const recentIssues = bookIssues.slice(0, 5);
  const popularBooks = books.filter(book => book.availableCopies < book.totalCopies / 2);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm mt-2 flex items-center gap-1 ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="h-4 w-4" />
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} rounded-full p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Book className="h-8 w-8 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Add New Book</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <Users className="h-8 w-8 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Add Member</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
            <Clock className="h-8 w-8 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Issue Book</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <Activity className="h-8 w-8 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Generate Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Issues */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Book Issues</h3>
          <div className="space-y-3">
            {recentIssues.map((issue, index) => {
              const book = books.find(b => b.id === issue.bookId);
              const member = members.find(m => m.id === issue.memberId);
              return (
                <div key={issue.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{book?.title}</p>
                    <p className="text-sm text-gray-600">by {member?.name}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    issue.status === 'Issued' ? 'bg-green-100 text-green-800' :
                    issue.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {issue.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Books */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Books</h3>
          <div className="space-y-3">
            {popularBooks.map((book, index) => (
              <div key={book.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{book.title}</p>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">
                    {book.availableCopies}/{book.totalCopies} available
                  </p>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}