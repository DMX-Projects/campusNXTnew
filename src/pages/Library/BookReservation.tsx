import React, { useState, useEffect } from 'react';
import { Search, Book, User, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Types and Enums
enum ReservationStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  EXPIRED = "expired",
  FULFILLED = "fulfilled"
}

enum BookStatus {
  AVAILABLE = "available",
  CHECKED_OUT = "checked_out",
  RESERVED = "reserved",
  MAINTENANCE = "maintenance"
}

interface BookType {
  bookId: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  location: string;
  status: BookStatus;
  dueDate?: Date;
  currentBorrower?: string;
}

interface UserType {
  userId: string;
  name: string;
  email: string;
  phone: string;
  userType: 'student' | 'faculty' | 'staff';
  activeReservations: string[];
  reservationHistory: string[];
}

interface ReservationType {
  reservationId: string;
  userId: string;
  bookId: string;
  reservationDate: Date;
  expiryDate: Date;
  status: ReservationStatus;
  pickupDate?: Date;
  notes: string;
}

// Main Library Reservation System
class LibraryReservationSystem {
  private books: Map<string, BookType> = new Map();
  private users: Map<string, UserType> = new Map();
  private reservations: Map<string, ReservationType> = new Map();
  private reservationQueue: Map<string, string[]> = new Map();

  addBook(book: BookType): boolean {
    try {
      this.books.set(book.bookId, book);
      return true;
    } catch (error) {
      console.error('Error adding book:', error);
      return false;
    }
  }

  addUser(user: UserType): boolean {
    try {
      this.users.set(user.userId, user);
      return true;
    } catch (error) {
      console.error('Error adding user:', error);
      return false;
    }
  }

  searchBooks(query: string, searchType: 'title' | 'author' | 'isbn' | 'category' = 'title'): BookType[] {
    const results: BookType[] = [];
    const searchQuery = query.toLowerCase();

    this.books.forEach(book => {
      switch (searchType) {
        case 'title':
          if (book.title.toLowerCase().includes(searchQuery)) results.push(book);
          break;
        case 'author':
          if (book.author.toLowerCase().includes(searchQuery)) results.push(book);
          break;
        case 'isbn':
          if (book.isbn.includes(searchQuery)) results.push(book);
          break;
        case 'category':
          if (book.category.toLowerCase().includes(searchQuery)) results.push(book);
          break;
      }
    });

    return results;
  }

  checkBookAvailability(bookId: string): { available: boolean; reason: string } {
    const book = this.books.get(bookId);
    if (!book) {
      return { available: false, reason: 'Book not found' };
    }

    switch (book.status) {
      case BookStatus.AVAILABLE:
        return { available: true, reason: 'Book is available' };
      case BookStatus.CHECKED_OUT:
        const dueDate = book.dueDate ? book.dueDate.toLocaleDateString() : 'Unknown';
        return { available: false, reason: `Book checked out until ${dueDate}` };
      case BookStatus.RESERVED:
        return { available: false, reason: 'Book is already reserved' };
      default:
        return { available: false, reason: `Book status: ${book.status}` };
    }
  }

  createReservation(userId: string, bookId: string, reservationDays: number = 7): { success: boolean; message: string; reservationId?: string; status?: string; expiryDate?: string } {
    const user = this.users.get(userId);
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const book = this.books.get(bookId);
    if (!book) {
      return { success: false, message: 'Book not found' };
    }

    // Check reservation limits
    const activeCount = user.activeReservations.filter(resId => {
      const res = this.reservations.get(resId);
      return res && [ReservationStatus.PENDING, ReservationStatus.CONFIRMED].includes(res.status);
    }).length;

    const maxReservations = user.userType === 'faculty' ? 5 : 3;
    if (activeCount >= maxReservations) {
      return { success: false, message: `Maximum ${maxReservations} reservations allowed` };
    }

    // Create reservation
    const reservation: ReservationType = {
      reservationId: `RES${Date.now()}${Math.random().toString(36).substr(2, 5)}`,
      userId,
      bookId,
      reservationDate: new Date(),
      expiryDate: new Date(Date.now() + reservationDays * 24 * 60 * 60 * 1000),
      status: ReservationStatus.PENDING,
      notes: ''
    };

    const availability = this.checkBookAvailability(bookId);
    
    if (availability.available) {
      reservation.status = ReservationStatus.CONFIRMED;
      book.status = BookStatus.RESERVED;
    } else {
      if (!this.reservationQueue.has(bookId)) {
        this.reservationQueue.set(bookId, []);
      }
      this.reservationQueue.get(bookId)!.push(reservation.reservationId);
    }

    this.reservations.set(reservation.reservationId, reservation);
    user.activeReservations.push(reservation.reservationId);

    return {
      success: true,
      reservationId: reservation.reservationId,
      status: reservation.status,
      expiryDate: reservation.expiryDate.toLocaleDateString(),
      message: 'Reservation created successfully'
    };
  }

  cancelReservation(reservationId: string, userId?: string): { success: boolean; message: string } {
    const reservation = this.reservations.get(reservationId);
    if (!reservation) {
      return { success: false, message: 'Reservation not found' };
    }

    if (userId && reservation.userId !== userId) {
      return { success: false, message: 'Unauthorized to cancel this reservation' };
    }

    reservation.status = ReservationStatus.CANCELLED;

    const book = this.books.get(reservation.bookId);
    if (book && book.status === BookStatus.RESERVED) {
      book.status = BookStatus.AVAILABLE;
    }

    const user = this.users.get(reservation.userId);
    if (user) {
      user.activeReservations = user.activeReservations.filter(id => id !== reservationId);
      user.reservationHistory.push(reservationId);
    }

    this.processReservationQueue(reservation.bookId);

    return { success: true, message: 'Reservation cancelled successfully' };
  }

  private processReservationQueue(bookId: string): void {
    const queue = this.reservationQueue.get(bookId);
    if (!queue || queue.length === 0) return;

    const nextReservationId = queue.shift()!;
    const reservation = this.reservations.get(nextReservationId);
    
    if (reservation && new Date() <= reservation.expiryDate) {
      reservation.status = ReservationStatus.CONFIRMED;
      const book = this.books.get(bookId);
      if (book) {
        book.status = BookStatus.RESERVED;
      }
    }
  }

  getAllBooks(): BookType[] {
    return Array.from(this.books.values());
  }

  getAllUsers(): UserType[] {
    return Array.from(this.users.values());
  }

  getUserReservations(userId: string): any[] {
    const user = this.users.get(userId);
    if (!user) return [];

    const userReservations: any[] = [];
    
    [...user.activeReservations, ...user.reservationHistory].forEach(resId => {
      const reservation = this.reservations.get(resId);
      if (reservation) {
        const book = this.books.get(reservation.bookId);
        if (book) {
          userReservations.push({
            reservationId: reservation.reservationId,
            bookTitle: book.title,
            bookAuthor: book.author,
            reservationDate: reservation.reservationDate.toLocaleDateString(),
            expiryDate: reservation.expiryDate.toLocaleDateString(),
            status: reservation.status,
            pickupDate: reservation.pickupDate?.toLocaleDateString()
          });
        }
      }
    });

    return userReservations;
  }
}

// React Component
const  BookReservation: React.FC = () => {
  const [library] = useState(() => new LibraryReservationSystem());
  const [books, setBooks] = useState<BookType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<'title' | 'author' | 'isbn' | 'category'>('title');
  const [userReservations, setUserReservations] = useState<any[]>([]);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Initialize sample data
  useEffect(() => {
    // Add sample books
    const sampleBooks: BookType[] = [
      {
        bookId: 'B001',
        title: 'Advanced React Patterns',
        author: 'Sarah Johnson',
        isbn: '978-0123456789',
        category: 'Programming',
        location: 'Section A-1',
        status: BookStatus.AVAILABLE
      },
      {
        bookId: 'B002',
        title: 'TypeScript Handbook',
        author: 'Mike Chen',
        isbn: '978-0987654321',
        category: 'Programming',
        location: 'Section A-2',
        status: BookStatus.AVAILABLE
      },
      {
        bookId: 'B003',
        title: 'Database Design Principles',
        author: 'Emily Davis',
        isbn: '978-0456789123',
        category: 'Database',
        location: 'Section B-1',
        status: BookStatus.CHECKED_OUT,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      },
      {
        bookId: 'B004',
        title: 'Machine Learning Fundamentals',
        author: 'Alex Rodriguez',
        isbn: '978-0789123456',
        category: 'AI/ML',
        location: 'Section C-1',
        status: BookStatus.AVAILABLE
      }
    ];

    // Add sample users
    const sampleUsers: UserType[] = [
      {
        userId: 'U001',
        name: 'John Smith',
        email: 'john.smith@university.edu',
        phone: '123-456-7890',
        userType: 'student',
        activeReservations: [],
        reservationHistory: []
      },
      {
        userId: 'U002',
        name: 'Dr. Maria Garcia',
        email: 'maria.garcia@university.edu',
        phone: '098-765-4321',
        userType: 'faculty',
        activeReservations: [],
        reservationHistory: []
      },
      {
        userId: 'U003',
        name: 'Lisa Wilson',
        email: 'lisa.wilson@university.edu',
        phone: '555-123-4567',
        userType: 'student',
        activeReservations: [],
        reservationHistory: []
      }
    ];

    sampleBooks.forEach(book => library.addBook(book));
    sampleUsers.forEach(user => library.addUser(user));

    setBooks(library.getAllBooks());
    setUsers(library.getAllUsers());
  }, [library]);

  // Update user reservations when user changes
  useEffect(() => {
    if (selectedUser) {
      setUserReservations(library.getUserReservations(selectedUser));
    }
  }, [selectedUser, library]);

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateReservation = (bookId: string) => {
    if (!selectedUser) {
      showNotification('error', 'Please select a user first');
      return;
    }

    const result = library.createReservation(selectedUser, bookId);
    
    if (result.success) {
      showNotification('success', result.message);
      setBooks([...library.getAllBooks()]);
      setUserReservations(library.getUserReservations(selectedUser));
    } else {
      showNotification('error', result.message);
    }
  };

  const handleCancelReservation = (reservationId: string) => {
    const result = library.cancelReservation(reservationId, selectedUser);
    
    if (result.success) {
      showNotification('success', result.message);
      setBooks([...library.getAllBooks()]);
      setUserReservations(library.getUserReservations(selectedUser));
    } else {
      showNotification('error', result.message);
    }
  };

  const getStatusIcon = (status: BookStatus | ReservationStatus) => {
    switch (status) {
      case BookStatus.AVAILABLE:
      case ReservationStatus.CONFIRMED:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case BookStatus.CHECKED_OUT:
      case ReservationStatus.FULFILLED:
        return <Book className="w-4 h-4 text-blue-500" />;
      case BookStatus.RESERVED:
      case ReservationStatus.PENDING:
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case ReservationStatus.CANCELLED:
      case ReservationStatus.EXPIRED:
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: BookStatus | ReservationStatus) => {
    switch (status) {
      case BookStatus.AVAILABLE:
      case ReservationStatus.CONFIRMED:
        return 'text-green-600 bg-green-50';
      case BookStatus.CHECKED_OUT:
      case ReservationStatus.FULFILLED:
        return 'text-blue-600 bg-blue-50';
      case BookStatus.RESERVED:
      case ReservationStatus.PENDING:
        return 'text-yellow-600 bg-yellow-50';
      case ReservationStatus.CANCELLED:
      case ReservationStatus.EXPIRED:
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredBooks = searchQuery 
    ? library.searchBooks(searchQuery, searchType)
    : books;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Library Reservation System</h1>
          <p className="text-gray-600">Manage book reservations for your ERP system</p>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg border ${
            notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-center">
              {notification.type === 'success' && <CheckCircle className="w-5 h-5 mr-2" />}
              {notification.type === 'error' && <XCircle className="w-5 h-5 mr-2" />}
              {notification.type === 'info' && <AlertCircle className="w-5 h-5 mr-2" />}
              {notification.message}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Book Search & List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Book Catalog</h2>
              
              {/* Search Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search books..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as 'title' | 'author' | 'isbn' | 'category')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="isbn">ISBN</option>
                  <option value="category">Category</option>
                </select>
              </div>

              {/* Book List */}
              <div className="space-y-4">
                {filteredBooks.map((book) => (
                  <div key={book.bookId} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">{book.title}</h3>
                        <p className="text-gray-600">by {book.author}</p>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                          <span>ISBN: {book.isbn}</span>
                          <span>Category: {book.category}</span>
                          <span>Location: {book.location}</span>
                        </div>
                        <div className="flex items-center mt-2">
                          {getStatusIcon(book.status)}
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}>
                            {book.status.replace('_', ' ').toUpperCase()}
                          </span>
                          {book.dueDate && (
                            <span className="ml-4 text-sm text-gray-500">
                              Due: {book.dueDate.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCreateReservation(book.bookId)}
                        disabled={!selectedUser || book.status !== BookStatus.AVAILABLE}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - User Selection & Reservations */}
          <div className="space-y-6">
            {/* User Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Select User</h2>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a user...</option>
                {users.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {user.name} ({user.userType})
                  </option>
                ))}
              </select>
              
              {selectedUser && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="font-medium">{users.find(u => u.userId === selectedUser)?.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {users.find(u => u.userId === selectedUser)?.email}
                  </p>
                </div>
              )}
            </div>

            {/* User Reservations */}
            {selectedUser && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">My Reservations</h2>
                
                {userReservations.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No reservations found</p>
                ) : (
                  <div className="space-y-3">
                    {userReservations.map((reservation) => (
                      <div key={reservation.reservationId} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{reservation.bookTitle}</h4>
                            <p className="text-sm text-gray-600">by {reservation.bookAuthor}</p>
                            <div className="flex items-center mt-2">
                              {getStatusIcon(reservation.status)}
                              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                                {reservation.status.toUpperCase()}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                Reserved: {reservation.reservationDate}
                              </div>
                              <div className="flex items-center mt-1">
                                <Clock className="w-3 h-3 mr-1" />
                                Expires: {reservation.expiryDate}
                              </div>
                              {reservation.pickupDate && (
                                <div className="flex items-center mt-1">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Picked up: {reservation.pickupDate}
                                </div>
                              )}
                            </div>
                          </div>
                          {(reservation.status === ReservationStatus.PENDING || reservation.status === ReservationStatus.CONFIRMED) && (
                            <button
                              onClick={() => handleCancelReservation(reservation.reservationId)}
                              className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReservation;