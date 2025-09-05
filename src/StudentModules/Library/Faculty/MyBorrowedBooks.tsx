import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle, RefreshCw, Book } from 'lucide-react';

// Sample data for borrowed books
const borrowedBooksData = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    author: "John Smith",
    isbn: "978-0123456789",
    borrowDate: "2025-08-15",
    dueDate: "2025-09-15",
    status: "active",
    renewalsLeft: 2,
    coverImage: "/api/placeholder/80/120"
  },
  {
    id: 2,
    title: "Advanced Mathematics",
    author: "Sarah Johnson",
    isbn: "978-0987654321",
    borrowDate: "2025-08-20",
    dueDate: "2025-09-05",
    status: "overdue",
    renewalsLeft: 1,
    coverImage: "/api/placeholder/80/120"
  },
  {
    id: 3,
    title: "Physics Fundamentals",
    author: "Michael Brown",
    isbn: "978-0456789123",
    borrowDate: "2025-08-25",
    dueDate: "2025-09-25",
    status: "due_soon",
    renewalsLeft: 3,
    coverImage: "/api/placeholder/80/120"
  },
  {
    id: 4,
    title: "Web Development Complete Guide",
    author: "Emily Davis",
    isbn: "978-0789123456",
    borrowDate: "2025-08-10",
    dueDate: "2025-09-20",
    status: "active",
    renewalsLeft: 1,
    coverImage: "/api/placeholder/80/120"
  }
];

const MyBorrowedBooks = () => {
  const [books, setBooks] = useState(borrowedBooksData);
  const [selectedBooks, setSelectedBooks] = useState([]);

  // Calculate days remaining until due date
  const getDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status-based color classes
  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue': return 'text-red-600 bg-red-50 border-red-200';
      case 'due_soon': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  // Get human-readable status text
  const getStatusText = (book) => {
    const daysLeft = getDaysLeft(book.dueDate);
    if (daysLeft < 0) return `Overdue by ${Math.abs(daysLeft)} days`;
    if (daysLeft <= 3) return `Due in ${daysLeft} days`;
    return `${daysLeft} days remaining`;
  };

  // Handle bulk renewal of selected books
  const handleRenewSelected = () => {
    if (selectedBooks.length === 0) {
      alert('Please select at least one book to renew');
      return;
    }
    alert(`Renewal request submitted for ${selectedBooks.length} book(s)`);
    setSelectedBooks([]);
  };

  // Handle individual book renewal
  const handleRenewSingle = (bookId, bookTitle) => {
    alert(`Renewal request submitted for "${bookTitle}"`);
  };

  // Toggle book selection for bulk operations
  const toggleBookSelection = (bookId) => {
    setSelectedBooks(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  // Select all books
  const selectAllBooks = () => {
    if (selectedBooks.length === books.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(books.map(book => book.id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Book className="text-blue-600" />
            My Borrowed Books
          </h1>
          
          <div className="flex gap-3">
            <button 
              onClick={selectAllBooks}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
            >
              {selectedBooks.length === books.length ? 'Deselect All' : 'Select All'}
            </button>
            <button 
              onClick={handleRenewSelected}
              disabled={selectedBooks.length === 0}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Renew Selected ({selectedBooks.length})
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-800">Total Books</h3>
            <p className="text-2xl font-bold text-blue-600">{books.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-800">Active</h3>
            <p className="text-2xl font-bold text-green-600">
              {books.filter(book => book.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-800">Due Soon</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {books.filter(book => book.status === 'due_soon').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-800">Overdue</h3>
            <p className="text-2xl font-bold text-red-600">
              {books.filter(book => book.status === 'overdue').length}
            </p>
          </div>
        </div>

        {/* Books List */}
        <div className="space-y-4">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <div className="flex items-center pt-2">
                  <input
                    type="checkbox"
                    checked={selectedBooks.includes(book.id)}
                    onChange={() => toggleBookSelection(book.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                
                {/* Book Cover */}
                <div className="flex-shrink-0">
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="w-20 h-28 object-cover rounded-lg bg-gray-200 shadow-sm"
                  />
                </div>
                
                {/* Book Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 mb-1">by {book.author}</p>
                  <p className="text-sm text-gray-500 mb-4">ISBN: {book.isbn}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-600">
                        Borrowed: {new Date(book.borrowDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-gray-600">
                        Due: {new Date(book.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Status and Actions */}
                <div className="flex flex-col items-end gap-3">
                  <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium border ${getStatusColor(book.status)}`}>
                    {book.status === 'overdue' && <AlertTriangle size={14} className="mr-1" />}
                    {getStatusText(book)}
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-2">
                      {book.renewalsLeft} renewals remaining
                    </p>
                    <button 
                      onClick={() => handleRenewSingle(book.id, book.title)}
                      disabled={book.renewalsLeft === 0}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw size={12} />
                      Renew Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {books.length === 0 && (
          <div className="text-center py-12">
            <Book size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Borrowed Books</h3>
            <p className="text-gray-500">You don't have any books currently borrowed from the library.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBorrowedBooks;