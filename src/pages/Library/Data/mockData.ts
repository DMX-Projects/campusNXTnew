import { Book, Member, BookIssue, Reservation, Fine, Alert, Ticket, Message, DashboardStats } from '../types/index';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    category: 'Fiction',
    publisher: 'Scribner',
    publishedYear: 1925,
    totalCopies: 5,
    availableCopies: 2,
    status: 'Available',
    location: 'A-101'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    category: 'Fiction',
    publisher: 'J.B. Lippincott & Co.',
    publishedYear: 1960,
    totalCopies: 3,
    availableCopies: 0,
    status: 'Issued',
    location: 'A-102'
  },
  {
    id: '3',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-0-13-235088-4',
    category: 'Technology',
    publisher: 'Prentice Hall',
    publishedYear: 2008,
    totalCopies: 4,
    availableCopies: 1,
    status: 'Available',
    location: 'T-201'
  }
];

export const members: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1-234-567-8900',
    membershipType: 'Student',
    joinDate: '2024-01-15',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1-234-567-8901',
    membershipType: 'Faculty',
    joinDate: '2023-08-20',
    status: 'Active'
  }
];

export const bookIssues: BookIssue[] = [
  {
    id: '1',
    bookId: '2',
    memberId: '1',
    issueDate: '2024-12-01',
    dueDate: '2024-12-15',
    status: 'Overdue',
    renewCount: 0
  },
  {
    id: '2',
    bookId: '3',
    memberId: '2',
    issueDate: '2024-12-10',
    dueDate: '2024-12-24',
    status: 'Issued',
    renewCount: 1
  }
];

export const reservations: Reservation[] = [
  {
    id: '1',
    bookId: '2',
    memberId: '2',
    reservationDate: '2024-12-12',
    status: 'Active',
    priority: 1
  }
];

export const fines: Fine[] = [
  {
    id: '1',
    memberId: '1',
    issueId: '1',
    amount: 15.50,
    reason: 'Late return (7 days overdue)',
    status: 'Pending',
    createdDate: '2024-12-16'
  }
];

export const alerts: Alert[] = [
  {
    id: '1',
    type: 'Overdue',
    title: 'Book Overdue',
    message: 'The book "To Kill a Mockingbird" is 7 days overdue.',
    recipient: 'john.doe@email.com',
    status: 'Sent',
    createdDate: '2024-12-16'
  },
  {
    id: '2',
    type: 'Reservation',
    title: 'Book Available',
    message: 'Your reserved book is now available for pickup.',
    recipient: 'jane.smith@email.com',
    status: 'Pending',
    createdDate: '2024-12-20'
  }
];

export const tickets: Ticket[] = [
  {
    id: '1',
    title: 'Cannot access online catalog',
    description: 'The online catalog is not loading when I try to search for books.',
    category: 'Technical',
    priority: 'Medium',
    status: 'Open',
    createdBy: 'john.doe@email.com',
    createdDate: '2024-12-18',
    updatedDate: '2024-12-18'
  },
  {
    id: '2',
    title: 'Request new book acquisition',
    description: 'Please consider purchasing "Design Patterns" by Gang of Four',
    category: 'Book Request',
    priority: 'Low',
    status: 'In Progress',
    createdBy: 'jane.smith@email.com',
    assignedTo: 'librarian@library.edu',
    createdDate: '2024-12-17',
    updatedDate: '2024-12-19'
  }
];

export const messages: Message[] = [
  {
    id: '1',
    from: 'System',
    to: 'librarian@library.edu',
    subject: 'Daily Report Generated',
    content: 'Your daily library report has been generated and is ready for review.',
    type: 'Info',
    isRead: false,
    createdDate: '2024-12-20'
  },
  {
    id: '2',
    from: 'john.doe@email.com',
    to: 'librarian@library.edu',
    subject: 'Book Return Request',
    content: 'I would like to extend my book return date for "To Kill a Mockingbird".',
    type: 'Warning',
    isRead: true,
    createdDate: '2024-12-19'
  }
];

export const dashboardStats: DashboardStats = {
  totalBooks: 1250,
  totalMembers: 456,
  booksIssued: 234,
  overdueBooks: 12,
  reservations: 8,
  finesCollected: 1247.50
};