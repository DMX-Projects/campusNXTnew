import React, { useState, useMemo } from 'react';
import { Search, Calendar, User, Book, AlertTriangle, Clock, Mail, Phone } from 'lucide-react';

interface FacultyMember {
  id: string;
  name: string;
  department: string;
  email: string;
  phone: string;
}

interface OverdueBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  issueDate: string;
  dueDate: string;
  daysOverdue: number;
  faculty: FacultyMember;
  category: string;
  fine: number;
}

const FacultyLibraryOverdue = () => {
  // Sample data
  const [overdueBooks] = useState<OverdueBook[]>([
    {
      id: '1',
      title: 'Advanced Machine Learning Techniques',
      author: 'Dr. Sarah Johnson',
      isbn: '978-1234567890',
      issueDate: '2024-07-15',
      dueDate: '2024-08-15',
      daysOverdue: 19,
      faculty: {
        id: 'F001',
        name: 'Prof. Michael Chen',
        department: 'Computer Science',
        email: 'michael.chen@university.edu',
        phone: '+1-555-0123'
      },
      category: 'Technology',
      fine: 38.00
    },
    {
      id: '2',
      title: 'Quantum Physics: A Modern Approach',
      author: 'Prof. Robert Williams',
      isbn: '978-9876543210',
      issueDate: '2024-06-20',
      dueDate: '2024-07-20',
      daysOverdue: 45,
      faculty: {
        id: 'F002',
        name: 'Dr. Emily Rodriguez',
        department: 'Physics',
        email: 'emily.rodriguez@university.edu',
        phone: '+1-555-0456'
      },
      category: 'Science',
      fine: 90.00
    },
    {
      id: '3',
      title: 'Modern European History',
      author: 'Dr. James Thompson',
      isbn: '978-5555666677',
      issueDate: '2024-07-01',
      dueDate: '2024-08-01',
      daysOverdue: 33,
      faculty: {
        id: 'F003',
        name: 'Prof. Lisa Anderson',
        department: 'History',
        email: 'lisa.anderson@university.edu',
        phone: '+1-555-0789'
      },
      category: 'History',
      fine: 66.00
    },
    {
      id: '4',
      title: 'Financial Markets and Institutions',
      author: 'Dr. David Brown',
      isbn: '978-1111222233',
      issueDate: '2024-07-10',
      dueDate: '2024-08-10',
      daysOverdue: 24,
      faculty: {
        id: 'F004',
        name: 'Dr. Amanda Smith',
        department: 'Business',
        email: 'amanda.smith@university.edu',
        phone: '+1-555-0321'
      },
      category: 'Business',
      fine: 48.00
    },
    {
      id: '5',
      title: 'Organic Chemistry Fundamentals',
      author: 'Prof. Maria Garcia',
      isbn: '978-7777888899',
      issueDate: '2024-06-15',
      dueDate: '2024-07-15',
      daysOverdue: 50,
      faculty: {
        id: 'F005',
        name: 'Dr. John Martinez',
        department: 'Chemistry',
        email: 'john.martinez@university.edu',
        phone: '+1-555-0654'
      },
      category: 'Science',
      fine: 100.00
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('daysOverdue');
  const [selectedBook, setSelectedBook] = useState<OverdueBook | null>(null);

  // Get unique departments and categories
  const departments = useMemo(() => 
    Array.from(new Set(overdueBooks.map(book => book.faculty.department))).sort(),
    [overdueBooks]
  );

  const categories = useMemo(() => 
    Array.from(new Set(overdueBooks.map(book => book.category))).sort(),
    [overdueBooks]
  );

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let filtered = overdueBooks.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm);

      const matchesDepartment = !selectedDepartment || book.faculty.department === selectedDepartment;
      const matchesCategory = !selectedCategory || book.category === selectedCategory;

      return matchesSearch && matchesDepartment && matchesCategory;
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'daysOverdue':
          return b.daysOverdue - a.daysOverdue;
        case 'fine':
          return b.fine - a.fine;
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'facultyName':
          return a.faculty.name.localeCompare(b.faculty.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [overdueBooks, searchTerm, selectedDepartment, selectedCategory, sortBy]);

  const totalFines = useMemo(() => 
    filteredBooks.reduce((sum, book) => sum + book.fine, 0),
    [filteredBooks]
  );

  const getSeverityColor = (daysOverdue: number) => {
    if (daysOverdue > 30) return 'text-red-600 bg-red-50';
    if (daysOverdue > 14) return 'text-orange-600 bg-orange-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  const getSeverityBorder = (daysOverdue: number) => {
    if (daysOverdue > 30) return 'border-l-red-500';
    if (daysOverdue > 14) return 'border-l-orange-500';
    return 'border-l-yellow-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Book className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Overdue Books </h1>
                
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600">₹{totalFines.toFixed(2)}</div>
              <div className="text-sm text-gray-500">Total Outstanding Fines</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{filteredBooks.length}</p>
                <p className="text-gray-600">Overdue Books</p>
              </div>
            </div>
          </div>
          
          
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(filteredBooks.reduce((sum, book) => sum + book.daysOverdue, 0) / filteredBooks.length) || 0}
                </p>
                <p className="text-gray-600">Avg Days Overdue</p>
              </div>
            </div>
          </div>
          
        
        </div>

      
            
        

        {/* Books List */}
        <div className="space-y-4">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className={`bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 ${getSeverityBorder(
              book.daysOverdue
            )} cursor-pointer`}
            onClick={() => setSelectedBook(book)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
                      <p className="text-gray-600 mb-2">by {book.author}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>ISBN: {book.isbn}</span>
                        <span>Category: {book.category}</span>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                        book.daysOverdue
                      )}`}
                    >
                      {book.daysOverdue} days overdue
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Faculty Info */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Faculty Information</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          {book.faculty.name}
                        </div>
                        <div className="flex items-center">
                          <Book className="w-4 h-4 mr-2" />
                          {book.faculty.department}
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          {book.faculty.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {book.faculty.phone}
                        </div>
                      </div>
                    </div>

                    {/* Loan Details */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Loan Details</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Issued: {new Date(book.issueDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Due: {new Date(book.dueDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center font-medium text-red-600">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Fine: ₹{book.fine.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No overdue books found</h3>
            <p className="text-gray-500">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Book Details</h2>
                <button
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                  onClick={() => setSelectedBook(null)}
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedBook.title}</h3>
                  <p className="text-gray-600 mb-4">by {selectedBook.author}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">ISBN:</span> {selectedBook.isbn}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {selectedBook.category}
                    </div>
                  </div>
                </div>

                {/* Faculty Info */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Faculty Information</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium">{selectedBook.faculty.name}</div>
                        <div className="text-sm text-gray-500">{selectedBook.faculty.department}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-3" />
                      <span>{selectedBook.faculty.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-3" />
                      <span>{selectedBook.faculty.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Loan Timeline */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Loan Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="font-medium">Book Issued</div>
                        <div className="text-sm text-gray-500">{new Date(selectedBook.issueDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="font-medium">Due Date</div>
                        <div className="text-sm text-gray-500">{new Date(selectedBook.dueDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="font-medium text-red-600">Overdue: {selectedBook.daysOverdue} days</div>
                        <div className="text-sm text-red-500">Fine: ₹{selectedBook.fine.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 mt-8">
  <button
    onClick={() => alert("Reminder email sent!")}
    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
  >
    Send Reminder Email
  </button>
  
  <button
    onClick={() => alert("Marked as returned!")}
    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
  >
    Mark as Returned
  </button>
</div>

            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default FacultyLibraryOverdue;