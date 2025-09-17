export interface Book {
  id: string;
  isbn: string;
  title: string;
  authors: string[];
  publisher: string;
  publicationYear: number;
  edition?: string;
  category: BookCategory;
  subjects: string[];
  language: string;
  pages?: number;
  totalCopies: number;
  availableCopies: number;
  location: {
    section: string;
    shelf: string;
    row: string;
  };
  price?: number;
  coverImage?: string;
  description?: string;
  keywords?: string[];
  isReference?: boolean;
  isActive: boolean;
  addedOn: string;
  lastUpdated: string;
}

export type BookCategory = 
  | 'Computer Science'
  | 'Electronics'
  | 'Mechanical'
  | 'Civil'
  | 'Electrical'
  | 'Mathematics'
  | 'Physics'
  | 'Chemistry'
  | 'Management'
  | 'Literature'
  | 'Reference'
  | 'Journal'
  | 'Magazine'
  | 'Other';

export interface BookIssue {
  id: string;
  bookId: string;
  bookTitle: string;
  isbn: string;
  memberId: string;
  memberName: string;
  memberType: 'Student' | 'Faculty' | 'Staff';
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fine?: number;
  status: 'Issued' | 'Returned' | 'Overdue' | 'Lost';
  issuedBy: string;
  returnedTo?: string;
  remarks?: string;
}

export interface LibraryMember {
  id: string;
  memberId: string;
  name: string;
  type: 'Student' | 'Faculty' | 'Staff';
  department: string;
  email: string;
  phone: string;
  maxBooks: number;
  issuedBooks: number;
  totalFine: number;
  membershipStartDate: string;
  membershipEndDate?: string;
  isActive: boolean;
}

export interface BookReservation {
  id: string;
  bookId: string;
  bookTitle: string;
  memberId: string;
  memberName: string;
  reservationDate: string;
  expiryDate: string;
  status: 'Active' | 'Fulfilled' | 'Expired' | 'Cancelled';
  priority: number;
  notified?: boolean;
  notifiedOn?: string;
}