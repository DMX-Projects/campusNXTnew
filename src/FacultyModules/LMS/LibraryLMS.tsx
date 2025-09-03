import React, { useState } from 'react';
import { BookOpenIcon, SearchIcon, PlusIcon, UserIcon, CalendarIcon, ClockIcon } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  location: string;
  publisher: string;
  yearPublished: number;
  language: string;
}

interface Transaction {
  id: string;
  bookId: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'issued' | 'returned' | 'overdue';
  fine: number;
}

interface LibraryMember {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  memberType: 'student' | 'faculty' | 'staff';
  booksIssued: number;
  maxBooks: number;
  joinDate: string;
  status: 'active' | 'suspended';
}

const LibraryLMS: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '978-0262033848',
      category: 'Computer Science',
      totalCopies: 5,
      availableCopies: 2,
      location: 'CS-A-101',
      publisher: 'MIT Press',
      yearPublished: 2009,
      language: 'English'
    },
    {
      id: '2',
      title: 'Database System Concepts',
      author: 'Abraham Silberschatz',
      isbn: '978-0073523323',
      category: 'Computer Science',
      totalCopies: 3,
      availableCopies: 1,
      location: 'CS-B-205',
      publisher: 'McGraw-Hill',
      yearPublished: 2019,
      language: 'English'
    },
    {
      id: '3',
      title: 'Operating System Concepts',
      author: 'Abraham Silberschatz',
      isbn: '978-1118063330',
      category: 'Computer Science',
      totalCopies: 4,
      availableCopies: 0,
      location: 'CS-C-150',
      publisher: 'Wiley',
      yearPublished: 2018,
      language: 'English'
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      bookId: '1',
      studentId: 'S001',
      studentName: 'Rahul Sharma',
      rollNumber: 'CSE001',
      issueDate: '2025-08-15',
      dueDate: '2025-09-15',
      status: 'issued',
      fine: 0
    },
    {
      id: '2',
      bookId: '2',
      studentId: 'S002',
      studentName: 'Priya Singh',
      rollNumber: 'CSE002',
      issueDate: '2025-08-01',
      dueDate: '2025-08-31',
      status: 'overdue',
      fine: 50
    },
    {
      id: '3',
      bookId: '3',
      studentId: 'S003',
      studentName: 'Amit Kumar',
      rollNumber: 'CSE003',
      issueDate: '2025-08-10',
      dueDate: '2025-09-10',
      returnDate: '2025-09-01',
      status: 'returned',
      fine: 0
    }
  ]);

  const [members] = useState<LibraryMember[]>([
    {
      id: 'S001',
      name: 'Rahul Sharma',
      rollNumber: 'CSE001',
      department: 'CSE',
      memberType: 'student',
      booksIssued: 2,
      maxBooks: 5,
      joinDate: '2025-07-01',
      status: 'active'
    },
    {
      id: 'S002',
      name: 'Priya Singh',
      rollNumber: 'CSE002',
      department: 'CSE',
      memberType: 'student',
      booksIssued: 1,
      maxBooks: 5,
      joinDate: '2025-07-01',
      status: 'active'
    }
  ]);

  const [selectedTab, setSelectedTab] = useState<'books' | 'transactions' | 'members'>('books');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isIssueBookModalOpen, setIsIssueBookModalOpen] = useState(false);
  const [newBook, setNewBook] = useState<Partial<Book>>({});
  const [, setSelectedBook] = useState<Book | null>(null);

  const categories = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Mechanical', 'Electronics', 'Literature'];

  const filteredBooks = books.filter(book => 
    (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
     book.isbn.includes(searchTerm)) &&
    (selectedCategory === 'all' || book.category === selectedCategory)
  );

  const filteredTransactions = transactions.filter(transaction =>
    transaction.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    books.find(book => book.id === transaction.bookId)?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalBooks: books.reduce((sum, book) => sum + book.totalCopies, 0),
    availableBooks: books.reduce((sum, book) => sum + book.availableCopies, 0),
    issuedBooks: transactions.filter(t => t.status === 'issued').length,
    overdueBooks: transactions.filter(t => t.status === 'overdue').length,
    totalFines: transactions.reduce((sum, t) => sum + t.fine, 0),
    totalMembers: members.length
  };

  const handleAddBook = () => {
    if (newBook.title && newBook.author && newBook.isbn) {
      const book: Book = {
        id: Date.now().toString(),
        title: newBook.title,
        author: newBook.author,
        isbn: newBook.isbn,
        category: newBook.category || 'Computer Science',
        totalCopies: newBook.totalCopies || 1,
        availableCopies: newBook.availableCopies || newBook.totalCopies || 1,
        location: newBook.location || 'General',
        publisher: newBook.publisher || '',
        yearPublished: newBook.yearPublished || new Date().getFullYear(),
        language: newBook.language || 'English'
      };
      setBooks([...books, book]);
      setNewBook({});
      setIsAddBookModalOpen(false);
      alert('Book added successfully!');
    }
  };

  const issueBook = (bookId: string, studentId: string) => {
    const book = books.find(b => b.id === bookId);
    const member = members.find(m => m.id === studentId);
    
    if (book && book.availableCopies > 0 && member) {
      const transaction: Transaction = {
        id: Date.now().toString(),
        bookId,
        studentId,
        studentName: member.name,
        rollNumber: member.rollNumber,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'issued',
        fine: 0
      };
      
      setTransactions([...transactions, transaction]);
      setBooks(books.map(b => 
        b.id === bookId 
          ? { ...b, availableCopies: b.availableCopies - 1 }
          : b
      ));
      setIsIssueBookModalOpen(false);
      alert('Book issued successfully!');
    }
  };

  const returnBook = (transactionId: string) => {
    const transaction = transactions.find(t => t.id === transactionId);
    if (transaction) {
      const returnDate = new Date();
      const dueDate = new Date(transaction.dueDate);
      const fine = returnDate > dueDate ? Math.ceil((returnDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)) * 2 : 0;
      
      setTransactions(transactions.map(t => 
        t.id === transactionId 
          ? { ...t, status: 'returned', returnDate: returnDate.toISOString().split('T')[0], fine }
          : t
      ));
      
      setBooks(books.map(b => 
        b.id === transaction.bookId 
          ? { ...b, availableCopies: b.availableCopies + 1 }
          : b
      ));
      
      alert(`Book returned successfully! ${fine > 0 ? `Fine: ₹${fine}` : 'No fine.'}`);
    }
  };

  const renewBook = (transactionId: string) => {
    const newDueDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    setTransactions(transactions.map(t => 
      t.id === transactionId 
        ? { ...t, dueDate: newDueDate }
        : t
    ));
    alert('Book renewed for 15 more days!');
  };

  const generateReport = () => {
    const reportData = {
      totalBooks: stats.totalBooks,
      issuedBooks: stats.issuedBooks,
      overdueBooks: stats.overdueBooks,
      totalFines: stats.totalFines,
      popularBooks: books.sort((a, b) => (b.totalCopies - b.availableCopies) - (a.totalCopies - a.availableCopies)).slice(0, 5)
    };
    
    alert(`Library Report Generated!\n\nTotal Books: ${reportData.totalBooks}\nIssued: ${reportData.issuedBooks}\nOverdue: ${reportData.overdueBooks}\nTotal Fines: ₹${reportData.totalFines}`);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      issued: 'bg-blue-100 text-blue-800',
      returned: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Library Management System</h1>
              <p className="text-gray-600 mt-1">Manage books, transactions, and library members</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsAddBookModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Add Book
              </button>
              <button
                onClick={() => setIsIssueBookModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Issue Book
              </button>
              <button
                onClick={generateReport}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Generate Report
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search books, students, or transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {selectedTab === 'books' && (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            )}
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { key: 'books', label: 'Books', icon: BookOpenIcon },
              { key: 'transactions', label: 'Transactions', icon: ClockIcon },
              { key: 'members', label: 'Members', icon: UserIcon }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedTab(key as 'books' | 'transactions' | 'members')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedTab === key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Books</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBooks}</p>
              </div>
              <BookOpenIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Available</p>
                <p className="text-2xl font-bold text-green-600">{stats.availableBooks}</p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Issued</p>
                <p className="text-2xl font-bold text-blue-600">{stats.issuedBooks}</p>
              </div>
              <CalendarIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{stats.overdueBooks}</p>
              </div>
              <div className="text-2xl">⚠️</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Fines</p>
                <p className="text-2xl font-bold text-orange-600">₹{stats.totalFines}</p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Members</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalMembers}</p>
              </div>
              <UserIcon className="text-purple-500" size={24} />
            </div>
          </div>
        </div>

        {/* Content based on selected tab */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            {selectedTab === 'books' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Books Catalog ({filteredBooks.length})
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-medium text-gray-900">Title</th>
                        <th className="text-left p-3 font-medium text-gray-900">Author</th>
                        <th className="text-left p-3 font-medium text-gray-900">ISBN</th>
                        <th className="text-left p-3 font-medium text-gray-900">Category</th>
                        <th className="text-left p-3 font-medium text-gray-900">Availability</th>
                        <th className="text-left p-3 font-medium text-gray-900">Location</th>
                        <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBooks.map((book) => (
                        <tr key={book.id} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="p-3">
                            <div className="font-medium text-gray-900">{book.title}</div>
                            <div className="text-sm text-gray-500">{book.publisher} ({book.yearPublished})</div>
                          </td>
                          <td className="p-3 text-gray-700">{book.author}</td>
                          <td className="p-3 text-gray-600">{book.isbn}</td>
                          <td className="p-3">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              {book.category}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className={`text-sm font-medium ${
                              book.availableCopies > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {book.availableCopies}/{book.totalCopies} available
                            </div>
                          </td>
                          <td className="p-3 text-gray-600">{book.location}</td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <button
                                onClick={() => {
                                  setSelectedBook(book);
                                  setIsIssueBookModalOpen(true);
                                }}
                                disabled={book.availableCopies === 0}
                                className={`px-3 py-1 rounded text-xs transition-colors ${
                                  book.availableCopies > 0
                                    ? 'bg-green-100 hover:bg-green-200 text-green-700'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                              >
                                Issue
                              </button>
                              <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs transition-colors">
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {selectedTab === 'transactions' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Transactions ({filteredTransactions.length})
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-medium text-gray-900">Book</th>
                        <th className="text-left p-3 font-medium text-gray-900">Student</th>
                        <th className="text-left p-3 font-medium text-gray-900">Issue Date</th>
                        <th className="text-left p-3 font-medium text-gray-900">Due Date</th>
                        <th className="text-left p-3 font-medium text-gray-900">Status</th>
                        <th className="text-left p-3 font-medium text-gray-900">Fine</th>
                        <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction) => {
                        const book = books.find(b => b.id === transaction.bookId);
                        return (
                          <tr key={transaction.id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="p-3">
                              <div className="font-medium text-gray-900">{book?.title}</div>
                              <div className="text-sm text-gray-500">{book?.author}</div>
                            </td>
                            <td className="p-3">
                              <div className="font-medium text-gray-900">{transaction.studentName}</div>
                              <div className="text-sm text-gray-500">{transaction.rollNumber}</div>
                            </td>
                            <td className="p-3 text-gray-600">
                              {new Date(transaction.issueDate).toLocaleDateString()}
                            </td>
                            <td className="p-3 text-gray-600">
                              {new Date(transaction.dueDate).toLocaleDateString()}
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                {transaction.status.replace('_', ' ').toUpperCase()}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className={`font-medium ${transaction.fine > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                ₹{transaction.fine}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex gap-1">
                                {transaction.status === 'issued' && (
                                  <>
                                    <button
                                      onClick={() => returnBook(transaction.id)}
                                      className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-xs transition-colors"
                                    >
                                      Return
                                    </button>
                                    <button
                                      onClick={() => renewBook(transaction.id)}
                                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs transition-colors"
                                    >
                                      Renew
                                    </button>
                                  </>
                                )}
                                {transaction.status === 'overdue' && (
                                  <button
                                    onClick={() => returnBook(transaction.id)}
                                    className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-xs transition-colors"
                                  >
                                    Return & Pay Fine
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {selectedTab === 'members' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Library Members ({filteredMembers.length})
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-medium text-gray-900">Name</th>
                        <th className="text-left p-3 font-medium text-gray-900">Roll Number</th>
                        <th className="text-left p-3 font-medium text-gray-900">Department</th>
                        <th className="text-left p-3 font-medium text-gray-900">Type</th>
                        <th className="text-left p-3 font-medium text-gray-900">Books Issued</th>
                        <th className="text-left p-3 font-medium text-gray-900">Status</th>
                        <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMembers.map((member) => (
                        <tr key={member.id} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="p-3 font-medium text-gray-900">{member.name}</td>
                          <td className="p-3 text-gray-700">{member.rollNumber}</td>
                          <td className="p-3 text-gray-600">{member.department}</td>
                          <td className="p-3">
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs capitalize">
                              {member.memberType}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="font-medium">{member.booksIssued}</span>
                            <span className="text-gray-500">/{member.maxBooks}</span>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                              {member.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs transition-colors">
                                View History
                              </button>
                              {member.status === 'active' ? (
                                <button className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-xs transition-colors">
                                  Suspend
                                </button>
                              ) : (
                                <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-xs transition-colors">
                                  Activate
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Add Book Modal */}
        {isAddBookModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Book</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newBook.title || ''}
                    onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter book title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={newBook.author || ''}
                    onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter author name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ISBN</label>
                  <input
                    type="text"
                    value={newBook.isbn || ''}
                    onChange={(e) => setNewBook({...newBook, isbn: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter ISBN"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newBook.category || ''}
                    onChange={(e) => setNewBook({...newBook, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
                  <input
                    type="text"
                    value={newBook.publisher || ''}
                    onChange={(e) => setNewBook({...newBook, publisher: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter publisher"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year Published</label>
                  <input
                    type="number"
                    value={newBook.yearPublished || ''}
                    onChange={(e) => setNewBook({...newBook, yearPublished: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter year"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Copies</label>
                  <input
                    type="number"
                    value={newBook.totalCopies || ''}
                    onChange={(e) => setNewBook({...newBook, totalCopies: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter number of copies"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={newBook.location || ''}
                    onChange={(e) => setNewBook({...newBook, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter shelf location"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsAddBookModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBook}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Book
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Issue Book Modal */}
        {isIssueBookModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Issue Book</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Book</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                    <option value="">Choose a book</option>
                    {books.filter(book => book.availableCopies > 0).map(book => (
                      <option key={book.id} value={book.id}>
                        {book.title} by {book.author} (Available: {book.availableCopies})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                    <option value="">Choose a student</option>
                    {members.filter(member => member.status === 'active').map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name} ({member.rollNumber}) - Books: {member.booksIssued}/{member.maxBooks}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Issue Details</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Issue Date: {new Date().toLocaleDateString()}</p>
                    <p>Due Date: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                    <p>Duration: 30 days</p>
                    <p>Fine: ₹2 per day after due date</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsIssueBookModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => issueBook(books[0].id, members[0].id)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Issue Book
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryLMS;
