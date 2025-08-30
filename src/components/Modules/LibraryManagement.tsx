import React, { useState } from 'react';
import { Plus, Search, Filter, Download, BookOpen, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { DataTable, Modal, DynamicForm } from '../Common/FormComponents';
import { FORM_CONFIGS } from '../../data/formConfigs';
import libraryData from '../../data/library.json';

const LibraryManagement: React.FC = () => {
  const [books, setBooks] = useState(libraryData.books);
  const [issuedBooks, setIssuedBooks] = useState<any[]>([
    { id: 'ISS001', bookId: 'BOOK001', userId: 'CS2023001', userName: 'Alex Wilson', issueDate: '2025-01-10', dueDate: '2025-01-25', status: 'Issued' },
    { id: 'ISS002', bookId: 'BOOK002', userId: 'CS2023002', userName: 'Emma Johnson', issueDate: '2025-01-08', dueDate: '2025-01-23', status: 'Overdue' },
    { id: 'ISS003', bookId: 'BOOK003', userId: 'FAC001', userName: 'Prof. Emily Davis', issueDate: '2025-01-12', dueDate: '2025-01-27', status: 'Issued' }
  ]);
  const [activeTab, setActiveTab] = useState('books');
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const tabs = [
    { id: 'books', name: 'Book Catalog', icon: BookOpen },
    { id: 'issue', name: 'Issue/Return', icon: Users },
    { id: 'overdue', name: 'Overdue Books', icon: AlertTriangle },
    { id: 'reports', name: 'Reports', icon: Download }
  ];

  const bookColumns = [
    { key: 'id', label: 'Book ID', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'author', label: 'Author', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { 
      key: 'availableCopies', 
      label: 'Available', 
      sortable: true,
      render: (value: number, item: any) => (
        <span className={`font-semibold ${
          value > 5 ? 'text-green-600 dark:text-green-400' :
          value > 0 ? 'text-yellow-600 dark:text-yellow-400' :
          'text-red-600 dark:text-red-400'
        }`}>
          {value} / {item.totalCopies}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: any, item: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.availableCopies > 5 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
          item.availableCopies > 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {item.availableCopies > 5 ? 'Available' : item.availableCopies > 0 ? 'Low Stock' : 'Out of Stock'}
        </span>
      )
    }
  ];

  const issueColumns = [
    { key: 'id', label: 'Issue ID', sortable: true },
    { 
      key: 'bookId', 
      label: 'Book', 
      render: (value: string) => {
        const book = books.find(b => b.id === value);
        return book ? book.title : value;
      }
    },
    { key: 'userName', label: 'Issued To', sortable: true },
    { key: 'issueDate', label: 'Issue Date', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Issued' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
          value === 'Returned' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const handleAddBook = (bookData: any) => {
    const newBook = {
      ...bookData,
      id: `BOOK${String(books.length + 1).padStart(3, '0')}`,
      availableCopies: bookData.quantity,
      totalCopies: bookData.quantity,
      issuedTo: []
    };
    setBooks(prev => [...prev, newBook]);
    setShowAddBookModal(false);
  };

  const handleIssueBook = (issueData: any) => {
    const book = books.find(b => b.id === issueData.bookId);
    if (book && book.availableCopies > 0) {
      const newIssue = {
        id: `ISS${String(issuedBooks.length + 1).padStart(3, '0')}`,
        ...issueData,
        status: 'Issued'
      };
      
      setIssuedBooks(prev => [...prev, newIssue]);
      setBooks(prev => prev.map(b => 
        b.id === issueData.bookId 
          ? { ...b, availableCopies: b.availableCopies - 1, issuedTo: [...(b.issuedTo || []), issueData.userId] }
          : b
      ));
      setShowIssueModal(false);
    }
  };

  const handleReturnBook = (issue: any) => {
    setIssuedBooks(prev => prev.map(i => 
      i.id === issue.id ? { ...i, status: 'Returned', returnDate: new Date().toISOString().split('T')[0] } : i
    ));
    
    setBooks(prev => prev.map(b => 
      b.id === issue.bookId 
        ? { 
            ...b, 
            availableCopies: b.availableCopies + 1,
            issuedTo: (b.issuedTo || []).filter((userId: string) => userId !== issue.userId)
          }
        : b
    ));
  };

  const overdueBooks = issuedBooks.filter(issue => {
    const dueDate = new Date(issue.dueDate);
    const today = new Date();
    return issue.status === 'Issued' && dueDate < today;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Library Management System
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive library operations and book circulation management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddBookModal(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Book</span>
          </button>
          <button
            onClick={() => setShowIssueModal(true)}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Issue Book</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Books</p>
              <p className="text-3xl font-bold">{books.reduce((sum, book) => sum + book.totalCopies, 0)}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Available Books</p>
              <p className="text-3xl font-bold">{books.reduce((sum, book) => sum + book.availableCopies, 0)}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Books Issued</p>
              <p className="text-3xl font-bold">{issuedBooks.filter(i => i.status === 'Issued').length}</p>
            </div>
            <Users className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Overdue Books</p>
              <p className="text-3xl font-bold">{overdueBooks.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-200" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'books' && (
            <DataTable
              data={books}
              columns={bookColumns}
              onEdit={(book) => {
                setSelectedBook(book);
                // Handle edit
              }}
              onDelete={(book) => {
                if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
                  setBooks(prev => prev.filter(b => b.id !== book.id));
                }
              }}
              onView={(book) => {
                setSelectedBook(book);
                // Handle view
              }}
              searchable={true}
              exportable={true}
            />
          )}

          {activeTab === 'issue' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Book Issue/Return Management</h3>
                <button
                  onClick={() => setShowIssueModal(true)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Issue Book</span>
                </button>
              </div>
              
              <DataTable
                data={issuedBooks}
                columns={[
                  ...issueColumns,
                  {
                    key: 'actions',
                    label: 'Actions',
                    render: (value: any, item: any) => (
                      item.status === 'Issued' ? (
                        <button
                          onClick={() => handleReturnBook(item)}
                          className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors"
                        >
                          Return Book
                        </button>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">Returned</span>
                      )
                    )
                  }
                ]}
                searchable={true}
                exportable={true}
              />
            </div>
          )}

          {activeTab === 'overdue' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Overdue Books Management</h3>
                <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Send Reminders</span>
                </button>
              </div>
              
              {overdueBooks.length > 0 ? (
                <DataTable
                  data={overdueBooks.map(issue => ({
                    ...issue,
                    bookTitle: books.find(b => b.id === issue.bookId)?.title || 'Unknown',
                    daysOverdue: Math.floor((new Date().getTime() - new Date(issue.dueDate).getTime()) / (1000 * 60 * 60 * 24))
                  }))}
                  columns={[
                    { key: 'bookTitle', label: 'Book Title', sortable: true },
                    { key: 'userName', label: 'Issued To', sortable: true },
                    { key: 'dueDate', label: 'Due Date', sortable: true },
                    { 
                      key: 'daysOverdue', 
                      label: 'Days Overdue', 
                      sortable: true,
                      render: (value: number) => (
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          {value} days
                        </span>
                      )
                    },
                    {
                      key: 'fine',
                      label: 'Fine Amount',
                      render: (value: any, item: any) => (
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          ₹{item.daysOverdue * 5}
                        </span>
                      )
                    }
                  ]}
                  searchable={true}
                  exportable={true}
                />
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Overdue Books</h3>
                  <p className="text-gray-600 dark:text-gray-400">All books have been returned on time!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Library Reports & Analytics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Monthly Circulation Report', description: 'Books issued and returned this month', action: 'Generate' },
                  { title: 'Popular Books Report', description: 'Most frequently issued books', action: 'Generate' },
                  { title: 'Overdue Analysis', description: 'Detailed overdue books analysis', action: 'Generate' },
                  { title: 'Department Usage Report', description: 'Library usage by department', action: 'Generate' },
                  { title: 'Fine Collection Report', description: 'Late fees collected', action: 'Generate' },
                  { title: 'Inventory Report', description: 'Complete book inventory status', action: 'Generate' }
                ].map((report, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{report.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{report.description}</p>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      {report.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Book Modal */}
      <Modal isOpen={showAddBookModal} onClose={() => setShowAddBookModal(false)}>
        <DynamicForm
          config={FORM_CONFIGS.ADD_BOOK}
          onSubmit={handleAddBook}
          onCancel={() => setShowAddBookModal(false)}
        />
      </Modal>

      {/* Issue Book Modal */}
      <Modal isOpen={showIssueModal} onClose={() => setShowIssueModal(false)}>
        <DynamicForm
          config={FORM_CONFIGS.BOOK_ISSUE}
          onSubmit={handleIssueBook}
          onCancel={() => setShowIssueModal(false)}
        />
      </Modal>
    </div>
  );
};

export default LibraryManagement;