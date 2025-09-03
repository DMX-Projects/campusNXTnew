import React, { useState } from 'react';
import { Search, Filter, BookOpen, Calendar, User, Building2, RefreshCw, Download, Eye, X, MapPin, Hash } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publisher: string;
  publishedYear: number;
  availableCopies: number;
  totalCopies: number;
  location: string;
  status: 'Available' | 'Issued' | 'Reserved';
}

const LibrarySearchUI: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Sample data - replace with actual API calls
  const [books] = useState<Book[]>([
    {
      id: '1',
      title: 'Introduction to Computer Science',
      author: 'John Smith',
      isbn: '978-0123456789',
      category: 'Computer Science',
      publisher: 'Tech Publications',
      publishedYear: 2023,
      availableCopies: 3,
      totalCopies: 5,
      location: 'Section A - Shelf 12',
      status: 'Available'
    },
    {
      id: '2',
      title: 'Advanced Mathematics',
      author: 'Dr. Sarah Johnson',
      isbn: '978-0987654321',
      category: 'Mathematics',
      publisher: 'Academic Press',
      publishedYear: 2022,
      availableCopies: 0,
      totalCopies: 3,
      location: 'Section B - Shelf 5',
      status: 'Issued'
    },
    {
      id: '3',
      title: 'Modern Physics Concepts',
      author: 'Prof. Michael Brown',
      isbn: '978-0555666777',
      category: 'Physics',
      publisher: 'Science Publishers',
      publishedYear: 2024,
      availableCopies: 2,
      totalCopies: 4,
      location: 'Section C - Shelf 8',
      status: 'Available'
    }
  ]);

  const categories = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Literature', 'History'];

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
    setShowDetails(false);
  };

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Issued':
        return 'bg-red-100 text-red-800';
      case 'Reserved':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="space-y-4">
            {/* Main Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by title, author, ISBN, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  Search
                </button>
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Status</option>
                      <option value="Available">Available</option>
                      <option value="Issued">Issued</option>
                      <option value="Reserved">Reserved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Publication Year</label>
                    <input
                      type="number"
                      placeholder="e.g., 2023"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Search Results</h2>
              <div className="text-sm text-gray-600">
                Showing {books.length} of {books.length} books
              </div>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Searching...</span>
              </div>
            ) : (
              <div className="grid gap-4">
                {books.map((book) => (
                  <div key={book.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(book.status)}`}>
                            {book.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Author: {book.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            <span>Publisher: {book.publisher}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Year: {book.publishedYear}</span>
                          </div>
                          <div>
                            <span>ISBN: {book.isbn}</span>
                          </div>
                          <div>
                            <span>Category: {book.category}</span>
                          </div>
                          <div>
                            <span>Location: {book.location}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center gap-4 text-sm">
                          <span className="text-gray-600">
                            Available: <span className="font-medium text-green-600">{book.availableCopies}</span> / {book.totalCopies}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-row lg:flex-col gap-2">
                        <button 
                          onClick={() => handleViewDetails(book)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Book Details Modal */}
        {showDetails && selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Book Details</h2>
                <button
                  onClick={handleCloseDetails}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {/* Title and Status */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{selectedBook.title}</h3>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedBook.status)}`}>
                        {selectedBook.status}
                      </span>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Basic Information
                      </h4>
                      
                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Author</p>
                          <p className="font-medium text-gray-900">{selectedBook.author}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Hash className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">ISBN</p>
                          <p className="font-medium text-gray-900">{selectedBook.isbn}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <BookOpen className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Category</p>
                          <p className="font-medium text-gray-900">{selectedBook.category}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        Publication Details
                      </h4>
                      
                      <div className="flex items-start gap-3">
                        <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Publisher</p>
                          <p className="font-medium text-gray-900">{selectedBook.publisher}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Publication Year</p>
                          <p className="font-medium text-gray-900">{selectedBook.publishedYear}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="font-medium text-gray-900">{selectedBook.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Availability Information */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                      Availability
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{selectedBook.totalCopies}</p>
                          <p className="text-sm text-gray-600">Total Copies</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{selectedBook.availableCopies}</p>
                          <p className="text-sm text-gray-600">Available</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-red-600">{selectedBook.totalCopies - selectedBook.availableCopies}</p>
                          <p className="text-sm text-gray-600">Issued</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={handleCloseDetails}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibrarySearchUI;