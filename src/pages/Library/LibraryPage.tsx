import React, { useState } from 'react';
import { Plus, BookOpen, Users, AlertTriangle, TrendingUp, Search } from 'lucide-react';
import DataTable from '../../components/Common/DataTable';
import Modal from '../../components/Common/Modal';
import Form from '../../components/Common/Form';
import { mockBooks, Book } from '../../data/mockData';

const LibraryPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [issuedBooks, setIssuedBooks] = useState([
    { id: 'ISS001', bookId: 'BOO001', studentName: 'John Doe', issueDate: '2025-01-10', dueDate: '2025-01-25', status: 'Issued' },
    { id: 'ISS002', bookId: 'BOO002', studentName: 'Jane Smith', issueDate: '2025-01-08', dueDate: '2025-01-23', status: 'Overdue' },
  ]);

  const bookFormConfig = {
    title: 'Book Information',
    fields: [
      { name: 'title', type: 'text', label: 'Book Title', required: true },
      { name: 'author', type: 'text', label: 'Author', required: true },
      { name: 'isbn', type: 'text', label: 'ISBN', required: true },
      { name: 'category', type: 'select', label: 'Category', required: true, options: ['Academic', 'Reference', 'Fiction', 'Technical', 'Research'] },
      { name: 'department', type: 'select', label: 'Department', required: true, options: ['General', 'Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'] },
      { name: 'totalCopies', type: 'number', label: 'Total Copies', required: true, min: 1 },
      { name: 'price', type: 'number', label: 'Price', required: true, min: 0 },
    ]
  };

  const issueFormConfig = {
    title: 'Issue Book',
    fields: [
      { name: 'bookId', type: 'select', label: 'Book', required: true, options: books.filter(b => b.availableCopies > 0).map(b => b.id) },
      { name: 'studentName', type: 'text', label: 'Student Name', required: true },
      { name: 'issueDate', type: 'date', label: 'Issue Date', required: true },
      { name: 'dueDate', type: 'date', label: 'Due Date', required: true },
    ]
  };

  const columns = [
    { key: 'id', label: 'Book ID', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'author', label: 'Author', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { 
      key: 'availableCopies', 
      label: 'Available', 
      sortable: true,
      render: (value: number, row: Book) => (
        <span className={`font-semibold ${
          value > 5 ? 'text-green-600 dark:text-green-400' :
          value > 0 ? 'text-yellow-600 dark:text-yellow-400' :
          'text-red-600 dark:text-red-400'
        }`}>
          {value}/{row.totalCopies}
        </span>
      )
    },
    { 
      key: 'price', 
      label: 'Price', 
      sortable: true,
      render: (value: number) => `₹${value}`
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: any, row: Book) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.availableCopies > 5 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
          row.availableCopies > 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {row.availableCopies > 5 ? 'Available' : row.availableCopies > 0 ? 'Low Stock' : 'Out of Stock'}
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
        return book ? book.title : 'Unknown';
      }
    },
    { key: 'studentName', label: 'Student', sortable: true },
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
    const newBook: Book = {
      ...bookData,
      id: `BOO${String(books.length + 1).padStart(3, '0')}`,
      availableCopies: bookData.totalCopies,
    };
    setBooks(prev => [...prev, newBook]);
    setShowAddModal(false);
  };

  const handleEditBook = (bookData: any) => {
    if (selectedBook) {
      setBooks(prev => prev.map(book => 
        book.id === selectedBook.id ? { ...book, ...bookData } : book
      ));
      setShowEditModal(false);
      setSelectedBook(null);
    }
  };

  const handleDeleteBook = (book: Book) => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      setBooks(prev => prev.filter(b => b.id !== book.id));
    }
  };

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };

  const handleIssueBook = (issueData: any) => {
    const newIssue = {
      ...issueData,
      id: `ISS${String(issuedBooks.length + 1).padStart(3, '0')}`,
      status: 'Issued'
    };
    
    setIssuedBooks(prev => [...prev, newIssue]);
    
    // Update book availability
    setBooks(prev => prev.map(book => 
      book.id === issueData.bookId 
        ? { ...book, availableCopies: book.availableCopies - 1 }
        : book
    ));
    
    setShowIssueModal(false);
    alert('Book issued successfully!');
  };

  const handleReturnBook = (issueId: string) => {
    const issue = issuedBooks.find(i => i.id === issueId);
    if (issue) {
      setIssuedBooks(prev => prev.map(i => 
        i.id === issueId ? { ...i, status: 'Returned' } : i
      ));
      
      // Update book availability
      setBooks(prev => prev.map(book => 
        book.id === issue.bookId 
          ? { ...book, availableCopies: book.availableCopies + 1 }
          : book
      ));
      
      alert('Book returned successfully!');
    }
  };

  const stats = [
    {
      title: 'Total Books',
      value: books.reduce((sum, book) => sum + book.totalCopies, 0).toString(),
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+25'
    },
    {
      title: 'Available Books',
      value: books.reduce((sum, book) => sum + book.availableCopies, 0).toString(),
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+12'
    },
    {
      title: 'Books Issued',
      value: issuedBooks.filter(i => i.status === 'Issued').length.toString(),
      icon: Users,
      color: 'bg-purple-500',
      change: '+8'
    },
    {
      title: 'Overdue Books',
      value: issuedBooks.filter(i => i.status === 'Overdue').length.toString(),
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '-2'
    }
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
            Manage library books and circulation
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-green-600 dark:text-green-400 text-sm">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Books Table */}
      <DataTable
        data={books}
        columns={columns}
        onEdit={handleEditClick}
        onDelete={handleDeleteBook}
        searchable={true}
        exportable={true}
      />

      {/* Issued Books Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Issued Books</h3>
        </div>
        <div className="p-6">
          <DataTable
            data={issuedBooks}
            columns={[
              ...issueColumns,
              {
                key: 'actions',
                label: 'Actions',
                render: (value: any, row: any) => (
                  row.status === 'Issued' ? (
                    <button
                      onClick={() => handleReturnBook(row.id)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Return
                    </button>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">
                      {row.status}
                    </span>
                  )
                )
              }
            ]}
            searchable={true}
            exportable={true}
          />
        </div>
      </div>

      {/* Add Book Modal */}
      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Add New Book"
        size="lg"
      >
        <Form
          config={bookFormConfig}
          onSubmit={handleAddBook}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Book Modal */}
      <Modal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)}
        title="Edit Book"
        size="lg"
      >
        {selectedBook && (
          <Form
            config={bookFormConfig}
            initialData={selectedBook}
            onSubmit={handleEditBook}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedBook(null);
            }}
          />
        )}
      </Modal>

      {/* Issue Book Modal */}
      <Modal 
        isOpen={showIssueModal} 
        onClose={() => setShowIssueModal(false)}
        title="Issue Book"
        size="lg"
      >
        <Form
          config={issueFormConfig}
          onSubmit={handleIssueBook}
          onCancel={() => setShowIssueModal(false)}
        />
      </Modal>
    </div>
  );
};

export default LibraryPage;