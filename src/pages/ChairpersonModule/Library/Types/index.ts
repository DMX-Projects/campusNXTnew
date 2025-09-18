export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publisher: string;
  publishedYear: number;
  totalCopies: number;
  availableCopies: number;
  status: 'Available' | 'Issued' | 'Reserved' | 'Maintenance';
  location: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: 'Student' | 'Faculty' | 'Staff' | 'Guest';
  joinDate: string;
  status: 'Active' | 'Inactive' | 'Suspended';
}

export interface BookIssue {
  id: string;
  bookId: string;
  memberId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Issued' | 'Returned' | 'Overdue';
  renewCount: number;
}

export interface Reservation {
  id: string;
  bookId: string;
  memberId: string;
  reservationDate: string;
  status: 'Active' | 'Fulfilled' | 'Cancelled';
  priority: number;
}

export interface Fine {
  id: string;
  memberId: string;
  issueId: string;
  amount: number;
  reason: string;
  status: 'Pending' | 'Paid' | 'Waived';
  createdDate: string;
}

export interface Alert {
  id: string;
  type: 'Overdue' | 'Reservation' | 'Fine' | 'System';
  title: string;
  message: string;
  recipient: string;
  status: 'Sent' | 'Pending' | 'Failed';
  createdDate: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: 'Technical' | 'Book Request' | 'Account' | 'General';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdBy: string;
  assignedTo?: string;
  createdDate: string;
  updatedDate: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  type: 'Info' | 'Warning' | 'Error' | 'Success';
  isRead: boolean;
  createdDate: string;
}

export interface DashboardStats {
  totalBooks: number;
  totalMembers: number;
  booksIssued: number;
  overdueBooks: number;
  reservations: number;
  finesCollected: number;
}