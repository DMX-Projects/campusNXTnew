import React, { useState } from 'react';
import { Search, BookOpen, RotateCcw, FileCheck,Calendar, User } from 'lucide-react';
import { bookIssues, books, members } from './Data/mockData';

export default function BookIssueReturn() {
  const [activeTab, setActiveTab] = useState<'issue' | 'return'>('issue');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedMember, setSelectedMember] = useState('');

  const currentIssues = bookIssues.filter(issue => issue.status === 'Issued' || issue.status === 'Overdue');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Book Issue & Return</h2>
        <p className="text-gray-600">Manage book circulation</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('issue')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'issue'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          Issue Book
        </button>
        <button
          onClick={() => setActiveTab('return')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'return'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FileCheck className="h-4 w-4" />
          Return Book
        </button>
      </div>

      {activeTab === 'issue' && (
        <div className="space-y-6">
          {/* Issue Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Issue New Book</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Book</label>
                <select 
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a book...</option>
                  {books.filter(book => book.availableCopies > 0).map(book => (
                    <option key={book.id} value={book.id}>
                      {book.title} - {book.author}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Member</label>
                <select 
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a member...</option>
                  {members.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name} - {member.membershipType}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                <input 
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input 
                  type="date"
                  defaultValue={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2 flex justify-end">
                <button 
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Issue Book
                </button>
              </div>
            </form>
          </div>

          {/* Available Books */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Books</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {books.filter(book => book.availableCopies > 0).map(book => (
                <div key={book.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-900">{book.title}</h4>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                  <p className="text-sm text-gray-500 mt-1">{book.category}</p>
                  <p className="text-sm text-green-600 mt-2">
                    {book.availableCopies} copies available
                  </p>
                  <button className="w-full mt-3 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                    Issue This Book
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'return' && (
        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Find Issued Book</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by member name, book title, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Current Issues */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Currently Issued Books</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issue Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentIssues.map((issue) => {
                    const book = books.find(b => b.id === issue.bookId);
                    const member = members.find(m => m.id === issue.memberId);
                    return (
                      <tr key={issue.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{book?.title}</div>
                            <div className="text-sm text-gray-500">by {book?.author}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{member?.name}</div>
                              <div className="text-sm text-gray-500">{member?.membershipType}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            {new Date(issue.issueDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            {new Date(issue.dueDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            issue.status === 'Issued' ? 'bg-green-100 text-green-800' :
                            issue.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {issue.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors">
                            Return Book
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}