// // // import React from "react";

// // // const Dashboard: React.FC = () => {
// // //   return (
// // //     <div style={styles.container}>
// // //       <h1>Dashboard</h1>
// // //       <p>Welcome to the Library Dashboard. Overview info displayed here.</p>
// // //     </div>
// // //   );
// // // };

// // // const styles = {
// // //   container: {
// // //     padding: 20,
// // //     fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
// // //   },
// // // };

// // // export default Dashboard;


// // import React from "react";

// // const Dashboard: React.FC = () => {
// //   // Mock data - replace with real API/fetch
// //   const issuedBooks = [
// //     { title: "Engineering Mathematics", dueDate: "2025-09-10" },
// //     { title: "Digital Systems", dueDate: "2025-09-15" },
// //   ];
// //   const reservations = [
// //     { title: "Thermodynamics", status: "Approved" },
// //     { title: "Data Structures", status: "Pending" },
// //   ];
// //   const overdueBooks = [
// //     { title: "Calculus", dueDate: "2025-08-28", fine: 50 },
// //   ];
// //   const totalBooks = 1200;
// //   const booksIssuedCount = 150;
// //   const pendingRequests = 5;

// //   return (
// //     <div style={styles.container}>
// //       <h1>Library Dashboard</h1>

// //       <section style={styles.card}>
// //         <h2>Summary</h2>
// //         <div style={styles.summaryGrid}>
// //           <div style={styles.summaryItem}>
// //             <strong>{totalBooks}</strong>
// //             <span>Total Books</span>
// //           </div>
// //           <div style={styles.summaryItem}>
// //             <strong>{booksIssuedCount}</strong>
// //             <span>Books Issued</span>
// //           </div>
// //           <div style={styles.summaryItem}>
// //             <strong>{pendingRequests}</strong>
// //             <span>Pending Requests</span>
// //           </div>
// //         </div>
// //       </section>

// //       <section style={styles.card}>
// //         <h2>My Issued Books</h2>
// //         <ul>
// //           {issuedBooks.length > 0 ? (
// //             issuedBooks.map((book, i) => (
// //               <li key={i}>
// //                 {book.title} - Due {book.dueDate}
// //               </li>
// //             ))
// //           ) : (
// //             <p>No books currently issued.</p>
// //           )}
// //         </ul>
// //       </section>

// //       <section style={styles.card}>
// //         <h2>My Book Reservations</h2>
// //         <ul>
// //           {reservations.length > 0 ? (
// //             reservations.map((res, i) => (
// //               <li key={i}>
// //                 {res.title} - <strong>{res.status}</strong>
// //               </li>
// //             ))
// //           ) : (
// //             <p>No current reservations.</p>
// //           )}
// //         </ul>
// //       </section>

// //       <section style={styles.card}>
// //         <h2>Overdue Books</h2>
// //         {overdueBooks.length > 0 ? (
// //           <table style={styles.table}>
// //             <thead>
// //               <tr>
// //                 <th>Title</th>
// //                 <th>Due Date</th>
// //                 <th>Fine (₹)</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {overdueBooks.map((book, i) => (
// //                 <tr key={i}>
// //                   <td>{book.title}</td>
// //                   <td>{book.dueDate}</td>
// //                   <td>{book.fine}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         ) : (
// //           <p>No overdue books.</p>
// //         )}
// //       </section>
// //     </div>
// //   );
// // };

// // const styles = {
// //   container: {
// //     padding: 20,
// //     fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
// //     maxWidth: 900,
// //     margin: "0 auto",
// //   },
// //   card: {
// //     backgroundColor: "#f9f9f9",
// //     padding: 20,
// //     borderRadius: 8,
// //     marginBottom: 20,
// //     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //   },
// //   summaryGrid: {
// //     display: "flex",
// //     justifyContent: "space-around",
// //     textAlign: "center" as const,
// //   },
// //   summaryItem: {
// //     flex: 1,
// //     padding: 10,
// //   },
// //   table: {
// //     width: "100%",
// //     borderCollapse: "collapse" as const,
// //   },
// //   th: {
// //     borderBottom: "1px solid #ddd",
// //     textAlign: "left" as const,
// //     padding: "8px",
// //   },
// //   td: {
// //     borderBottom: "1px solid #eee",
// //     padding: "8px",
// //   },
// // };

// // export default Dashboard;
// import React from 'react';
// import {
//   Book,
//   Users,
//   Clock,
//   AlertTriangle,
//   Calendar,
//   DollarSign,
//   TrendingUp,
//   Activity,
// } from 'lucide-react';

// type Stat = {
//   title: string;
//   value: string;
//   icon: React.FC<React.SVGProps<SVGSVGElement>>;
//   color: string;
//   change: string;
// };

// type BookIssue = {
//   id: number;
//   bookTitle: string;
//   memberName: string;
//   status: string;
// };

// type Book = {
//   id: number;
//   title: string;
//   author: string;
//   availableCopies: number;
//   totalCopies: number;
// };

// // Mock data - replace with real API calls
// const dashboardStats = {
//   totalBooks: 1240,
//   totalMembers: 320,
//   booksIssued: 215,
//   overdueBooks: 15,
//   reservations: 48,
//   finesCollected: 1240.45,
// };

// const bookIssues: BookIssue[] = [
//   { id: 1, bookTitle: 'Engineering Mechanics', memberName: 'Dr. Sharma', status: 'Issued' },
//   { id: 2, bookTitle: 'Data Structures', memberName: 'Prof. Gupta', status: 'Returned' },
//   { id: 3, bookTitle: 'Thermodynamics', memberName: 'Dr. Iyer', status: 'Overdue' },
//   { id: 4, bookTitle: 'Fluid Mechanics', memberName: 'Prof. Singh', status: 'Issued' },
//   { id: 5, bookTitle: 'Digital Systems', memberName: 'Dr. Rao', status: 'Issued' },
// ];

// const books: Book[] = [
//   { id: 1, title: 'Calculus', author: 'James Stewart', availableCopies: 2, totalCopies: 10 },
//   { id: 2, title: 'Physics', author: 'David Halliday', availableCopies: 3, totalCopies: 8 },
//   { id: 3, title: 'Computer Networks', author: 'Andrew Tanenbaum', availableCopies: 1, totalCopies: 5 },
// ];

// export default function FacultyDashboard() {
//   const stats: Stat[] = [
//     {
//       title: 'Total Books',
//       value: dashboardStats.totalBooks.toLocaleString(),
//       icon: Book,
//       color: 'bg-blue-500',
//       change: '+12.5%',
//     },
//     {
//       title: 'Active Members',
//       value: dashboardStats.totalMembers.toLocaleString(),
//       icon: Users,
//       color: 'bg-green-500',
//       change: '+8.2%',
//     },
//     {
//       title: 'Books Issued',
//       value: dashboardStats.booksIssued.toLocaleString(),
//       icon: Clock,
//       color: 'bg-orange-500',
//       change: '+15.3%',
//     },
//     {
//       title: 'Overdue Books',
//       value: dashboardStats.overdueBooks.toLocaleString(),
//       icon: AlertTriangle,
//       color: 'bg-red-500',
//       change: '-5.1%',
//     },
//     {
//       title: 'Reservations',
//       value: dashboardStats.reservations.toLocaleString(),
//       icon: Calendar,
//       color: 'bg-purple-500',
//       change: '+23.7%',
//     },
//     {
//       title: 'Fines Collected',
//       value: `₹${dashboardStats.finesCollected.toFixed(2)}`,
//       icon: DollarSign,
//       color: 'bg-indigo-500',
//       change: '+18.9%',
//     },
//   ];

//   const recentIssues = bookIssues.slice(0, 5);
//   const popularBooks = books.filter((book) => book.availableCopies < book.totalCopies / 2);

//   return (
//     <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
//                   <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                   <p
//                     className={`text-sm mt-2 flex items-center gap-1 ${
//                       stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
//                     }`}
//                   >
//                     <TrendingUp className="h-4 w-4" />
//                     {stat.change} from last month
//                   </p>
//                 </div>
//                 <div className={`${stat.color} rounded-full p-3`}>
//                   <Icon className="h-6 w-6 text-white" />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <button className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
//             <Book className="h-8 w-8 text-blue-600" />
//             <span className="text-sm font-medium text-gray-700">Add New Book</span>
//           </button>
//           <button className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
//             <Users className="h-8 w-8 text-green-600" />
//             <span className="text-sm font-medium text-gray-700">Add Member</span>
//           </button>
//           <button className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
//             <Clock className="h-8 w-8 text-orange-600" />
//             <span className="text-sm font-medium text-gray-700">Issue Book</span>
//           </button>
//           <button className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
//             <Activity className="h-8 w-8 text-purple-600" />
//             <span className="text-sm font-medium text-gray-700">Generate Report</span>
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Issues */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Book Issues</h3>
//           <div className="space-y-3">
//             {recentIssues.map((issue) => (
//               <div
//                 key={issue.id}
//                 className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
//               >
//                 <div>
//                   <p className="font-medium text-gray-800">{issue.bookTitle}</p>
//                   <p className="text-sm text-gray-600">by {issue.memberName}</p>
//                 </div>
//                 <span
//                   className={`px-2 py-1 text-xs font-medium rounded-full ${
//                     issue.status === 'Issued'
//                       ? 'bg-green-100 text-green-800'
//                       : issue.status === 'Overdue'
//                       ? 'bg-red-100 text-red-800'
//                       : 'bg-gray-100 text-gray-800'
//                   }`}
//                 >
//                   {issue.status}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Popular Books */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Books</h3>
//           <div className="space-y-3">
//             {popularBooks.map((book) => (
//               <div
//                 key={book.id}
//                 className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
//               >
//                 <div>
//                   <p className="font-medium text-gray-800">{book.title}</p>
//                   <p className="text-sm text-gray-600">by {book.author}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-gray-800">
//                     {book.availableCopies}/{book.totalCopies} available
//                   </p>
//                   <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
//                     <div
//                       className="bg-blue-600 h-2 rounded-full"
//                       style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import { 
//   BookOpen, 
//   Users, 
//   TrendingUp, 
//   Calendar, 
//   Search, 
//   Filter,
//   Download,
//   Plus,
//   Edit3,
//   Trash2,
//   Eye,
//   AlertCircle,
//   CheckCircle,
//   Clock,
//   BarChart3,
//   PieChart,
//   Book,
//   UserCheck,
//   RefreshCw
// } from 'lucide-react';

// interface Book {
//   id: string;
//   title: string;
//   author: string;
//   isbn: string;
//   category: string;
//   totalCopies: number;
//   availableCopies: number;
//   status: 'Available' | 'Limited' | 'Out of Stock';
// }

// interface Student {
//   id: string;
//   name: string;
//   rollNumber: string;
//   department: string;
//   year: string;
//   booksIssued: number;
//   overdueBooks: number;
//   status: 'Active' | 'Suspended' | 'Graduated';
// }

// interface Transaction {
//   id: string;
//   studentName: string;
//   bookTitle: string;
//   type: 'Issue' | 'Return' | 'Renew';
//   date: string;
//   dueDate?: string;
//   status: 'Completed' | 'Overdue' | 'Pending';
// }

// const FacultyLibraryDashboard: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterCategory, setFilterCategory] = useState('all');

//   // Sample data
//   const [books] = useState<Book[]>([
//     {
//       id: '1',
//       title: 'Data Structures and Algorithms',
//       author: 'Thomas H. Cormen',
//       isbn: '978-0262033848',
//       category: 'Computer Science',
//       totalCopies: 15,
//       availableCopies: 8,
//       status: 'Available'
//     },
//     {
//       id: '2',
//       title: 'Engineering Mathematics',
//       author: 'K.A. Stroud',
//       isbn: '978-1137031198',
//       category: 'Mathematics',
//       totalCopies: 20,
//       availableCopies: 3,
//       status: 'Limited'
//     },
//     {
//       id: '3',
//       title: 'Thermodynamics',
//       author: 'Yunus A. Cengel',
//       isbn: '978-0073398174',
//       category: 'Mechanical',
//       totalCopies: 12,
//       availableCopies: 0,
//       status: 'Out of Stock'
//     },
//     {
//       id: '4',
//       title: 'Digital Electronics',
//       author: 'Morris Mano',
//       isbn: '978-0132543262',
//       category: 'Electronics',
//       totalCopies: 10,
//       availableCopies: 6,
//       status: 'Available'
//     }
//   ]);

//   const [students] = useState<Student[]>([
//     {
//       id: '1',
//       name: 'Rahul Sharma',
//       rollNumber: 'CS21B001',
//       department: 'Computer Science',
//       year: '3rd Year',
//       booksIssued: 3,
//       overdueBooks: 1,
//       status: 'Active'
//     },
//     {
//       id: '2',
//       name: 'Priya Patel',
//       rollNumber: 'EC21B015',
//       department: 'Electronics',
//       year: '3rd Year',
//       booksIssued: 2,
//       overdueBooks: 0,
//       status: 'Active'
//     },
//     {
//       id: '3',
//       name: 'Amit Kumar',
//       rollNumber: 'ME21B032',
//       department: 'Mechanical',
//       year: '2nd Year',
//       booksIssued: 1,
//       overdueBooks: 2,
//       status: 'Suspended'
//     }
//   ]);

//   const [transactions] = useState<Transaction[]>([
//     {
//       id: '1',
//       studentName: 'Rahul Sharma',
//       bookTitle: 'Data Structures and Algorithms',
//       type: 'Issue',
//       date: '2024-08-15',
//       dueDate: '2024-09-15',
//       status: 'Completed'
//     },
//     {
//       id: '2',
//       studentName: 'Priya Patel',
//       bookTitle: 'Digital Electronics',
//       type: 'Return',
//       date: '2024-08-20',
//       status: 'Completed'
//     },
//     {
//       id: '3',
//       studentName: 'Amit Kumar',
//       bookTitle: 'Engineering Mathematics',
//       type: 'Issue',
//       date: '2024-07-10',
//       dueDate: '2024-08-10',
//       status: 'Overdue'
//     }
//   ]);

//   // Dashboard stats
//   const stats = {
//     totalBooks: books.reduce((sum, book) => sum + book.totalCopies, 0),
//     availableBooks: books.reduce((sum, book) => sum + book.availableCopies, 0),
//     issuedBooks: books.reduce((sum, book) => sum + (book.totalCopies - book.availableCopies), 0),
//     activeStudents: students.filter(s => s.status === 'Active').length,
//     overdueReturns: transactions.filter(t => t.status === 'Overdue').length,
//     todayTransactions: transactions.filter(t => t.date === '2024-08-20').length
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'Available':
//       case 'Active':
//       case 'Completed':
//         return 'text-green-600 bg-green-100';
//       case 'Limited':
//       case 'Suspended':
//       case 'Pending':
//         return 'text-yellow-600 bg-yellow-100';
//       case 'Out of Stock':
//       case 'Overdue':
//         return 'text-red-600 bg-red-100';
//       default:
//         return 'text-gray-600 bg-gray-100';
//     }
//   };

//   const renderOverview = () => (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
//         <div className="bg-white p-4 rounded-lg shadow-sm border">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Books</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.totalBooks}</p>
//             </div>
//             <BookOpen className="h-8 w-8 text-blue-500" />
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded-lg shadow-sm border">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Available</p>
//               <p className="text-2xl font-bold text-green-600">{stats.availableBooks}</p>
//             </div>
//             <CheckCircle className="h-8 w-8 text-green-500" />
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded-lg shadow-sm border">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Issued</p>
//               <p className="text-2xl font-bold text-blue-600">{stats.issuedBooks}</p>
//             </div>
//             <Book className="h-8 w-8 text-blue-500" />
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded-lg shadow-sm border">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Active Students</p>
//               <p className="text-2xl font-bold text-indigo-600">{stats.activeStudents}</p>
//             </div>
//             <UserCheck className="h-8 w-8 text-indigo-500" />
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded-lg shadow-sm border">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Overdue</p>
//               <p className="text-2xl font-bold text-red-600">{stats.overdueReturns}</p>
//             </div>
//             <AlertCircle className="h-8 w-8 text-red-500" />
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded-lg shadow-sm border">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Today's Activity</p>
//               <p className="text-2xl font-bold text-purple-600">{stats.todayTransactions}</p>
//             </div>
//             <TrendingUp className="h-8 w-8 text-purple-500" />
//           </div>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm border">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
//             <RefreshCw className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
//           </div>
//           <div className="space-y-3">
//             {transactions.slice(0, 5).map((transaction) => (
//               <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                 <div className="flex-1">
//                   <p className="font-medium text-gray-900">{transaction.studentName}</p>
//                   <p className="text-sm text-gray-600">{transaction.bookTitle}</p>
//                 </div>
//                 <div className="text-right">
//                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
//                     {transaction.status}
//                   </span>
//                   <p className="text-xs text-gray-500 mt-1">{transaction.date}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Low Stock Alert</h3>
//             <AlertCircle className="h-5 w-5 text-red-400" />
//           </div>
//           <div className="space-y-3">
//             {books.filter(book => book.availableCopies <= 3).map((book) => (
//               <div key={book.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
//                 <div className="flex-1">
//                   <p className="font-medium text-gray-900">{book.title}</p>
//                   <p className="text-sm text-gray-600">{book.author}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-red-600">{book.availableCopies} left</p>
//                   <p className="text-xs text-gray-500">of {book.totalCopies}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderBooks = () => (
//     <div className="space-y-6">
//       {/* Search and Filter */}
//       <div className="bg-white p-4 rounded-lg shadow-sm border">
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               type="text"
//               placeholder="Search books by title, author, or ISBN..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//           <div className="flex gap-2">
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Categories</option>
//               <option value="Computer Science">Computer Science</option>
//               <option value="Mathematics">Mathematics</option>
//               <option value="Electronics">Electronics</option>
//               <option value="Mechanical">Mechanical</option>
//             </select>
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
//               <Plus className="h-4 w-4" />
//               Add Book
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Books Table */}
//       <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Details</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Copies</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {books.map((book) => (
//                 <tr key={book.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div>
//                       <div className="text-sm font-medium text-gray-900">{book.title}</div>
//                       <div className="text-sm text-gray-500">{book.author}</div>
//                       <div className="text-xs text-gray-400">ISBN: {book.isbn}</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
//                       {book.category}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <div>Available: {book.availableCopies}</div>
//                     <div className="text-gray-500">Total: {book.totalCopies}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(book.status)}`}>
//                       {book.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex gap-2">
//                       <button className="text-blue-600 hover:text-blue-900">
//                         <Eye className="h-4 w-4" />
//                       </button>
//                       <button className="text-green-600 hover:text-green-900">
//                         <Edit3 className="h-4 w-4" />
//                       </button>
//                       <button className="text-red-600 hover:text-red-900">
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   const renderStudents = () => (
//     <div className="space-y-6">
//       {/* Students Table */}
//       <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
//         <div className="p-4 border-b border-gray-200">
//           <h3 className="text-lg font-medium text-gray-900">Student Records</h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Books Issued</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overdue</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {students.map((student) => (
//                 <tr key={student.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div>
//                       <div className="text-sm font-medium text-gray-900">{student.name}</div>
//                       <div className="text-sm text-gray-500">{student.rollNumber}</div>
//                       <div className="text-xs text-gray-400">{student.year}</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="inline-flex px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
//                       {student.department}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {student.booksIssued}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {student.overdueBooks > 0 ? (
//                       <span className="text-red-600 font-medium">{student.overdueBooks}</span>
//                     ) : (
//                       <span className="text-green-600">0</span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
//                       {student.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex gap-2">
//                       <button className="text-blue-600 hover:text-blue-900">
//                         <Eye className="h-4 w-4" />
//                       </button>
//                       <button className="text-green-600 hover:text-green-900">
//                         <Edit3 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   const renderTransactions = () => (
//     <div className="space-y-6">
//       {/* Transactions Table */}
//       <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
//             <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
//               <Download className="h-4 w-4" />
//               Export
//             </button>
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {transactions.map((transaction) => (
//                 <tr key={transaction.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {transaction.studentName}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {transaction.bookTitle}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
//                       transaction.type === 'Issue' ? 'bg-blue-100 text-blue-800' :
//                       transaction.type === 'Return' ? 'bg-green-100 text-green-800' :
//                       'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       {transaction.type}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {transaction.date}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {transaction.dueDate || '-'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
//                       {transaction.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   const renderAnalytics = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm border">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//             <BarChart3 className="h-5 w-5" />
//             Category Distribution
//           </h3>
//           <div className="space-y-4">
//             {['Computer Science', 'Mathematics', 'Electronics', 'Mechanical'].map((category, index) => {
//               const count = books.filter(book => book.category === category).length;
//               const percentage = (count / books.length) * 100;
//               return (
//                 <div key={category} className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-700">{category}</span>
//                   <div className="flex items-center gap-3">
//                     <div className="w-24 bg-gray-200 rounded-full h-2">
//                       <div
//                         className={`h-2 rounded-full ${
//                           index === 0 ? 'bg-blue-500' :
//                           index === 1 ? 'bg-green-500' :
//                           index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
//                         }`}
//                         style={{ width: `${percentage}%` }}
//                       />
//                     </div>
//                     <span className="text-sm text-gray-500 w-12 text-right">{count}</span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm border">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//             <PieChart className="h-5 w-5" />
//             Usage Statistics
//           </h3>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
//               <span className="font-medium text-blue-900">Most Popular Category</span>
//               <span className="text-blue-700">Mathematics</span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
//               <span className="font-medium text-green-900">Average Books/Student</span>
//               <span className="text-green-700">2.1</span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
//               <span className="font-medium text-yellow-900">Return Rate</span>
//               <span className="text-yellow-700">94%</span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
//               <span className="font-medium text-purple-900">Monthly Circulation</span>
//               <span className="text-purple-700">342</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Library Management System</h1>
//               <p className="text-sm text-gray-500">Faculty Dashboard - Engineering College ERP</p>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-gray-900">Prof. Dr. Rajesh Kumar</p>
//                 <p className="text-xs text-gray-500">Head Librarian</p>
//               </div>
//               <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
//                 <span className="text-white text-sm font-medium">RK</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <nav className="flex space-x-8">
//             {[
//               { id: 'overview', label: 'Overview', icon: BarChart3 },
//               { id: 'books', label: 'Books', icon: BookOpen },
//               { id: 'students', label: 'Students', icon: Users },
//               { id: 'transactions', label: 'Transactions', icon: Calendar },
//               { id: 'analytics', label: 'Analytics', icon: TrendingUp }
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
//                   activeTab === tab.id
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <tab.icon className="h-4 w-4" />
//                 {tab.label}
//               </button>
//             ))}
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {activeTab === 'overview' && renderOverview()}
//         {activeTab === 'books' && renderBooks()}
//         {activeTab === 'students' && renderStudents()}
//         {activeTab === 'transactions' && renderTransactions()}
//         {activeTab === 'analytics' && renderAnalytics()}
//       </div>

//       {/* Quick Actions Floating Button */}
//       <div className="fixed bottom-6 right-6">
//         <div className="relative group">
//           <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
//             <Plus className="h-6 w-6" />
//           </button>
//           <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-lg border p-2 min-w-48">
//             <div className="space-y-1">
//               <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2">
//                 <BookOpen className="h-4 w-4" />
//                 Add New Book
//               </button>
//               <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2">
//                 <Users className="h-4 w-4" />
//                 Register Student
//               </button>
//               <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2">
//                 <Calendar className="h-4 w-4" />
//                 Issue Book
//               </button>
//               <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2">
//                 <RefreshCw className="h-4 w-4" />
//                 Return Book
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FacultyLibraryDashboard;


import React from "react";
import { BookOpen, Clock, AlertCircle, Bookmark, PlusSquare } from "lucide-react";

export default function FacultyLibraryDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Dashboard Title */}
      <h1 className="text-2xl font-bold text-gray-800">Library Dashboard</h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Books Borrowed */}
        <div className="bg-white shadow-md rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Books Borrowed</h2>
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold mt-2">12</p>
          <p className="text-sm text-gray-500">Active borrowed books</p>
        </div>

        {/* Due Soon */}
        <div className="bg-white shadow-md rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Due Soon</h2>
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold mt-2">3</p>
          <p className="text-sm text-gray-500">Books due within 7 days</p>
        </div>

        {/* Overdue Books */}
        <div className="bg-white shadow-md rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Overdue Books</h2>
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <p className="text-2xl font-bold mt-2">1</p>
          <p className="text-sm text-gray-500">Books overdue</p>
        </div>

        {/* Reserved Books */}
        <div className="bg-white shadow-md rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Reserved Books</h2>
            <Bookmark className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold mt-2">2</p>
          <p className="text-sm text-gray-500">Books reserved</p>
        </div>

        {/* Book Requests */}
        <div className="bg-white shadow-md rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Book Requests</h2>
            <PlusSquare className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-2xl font-bold mt-2">5</p>
          <p className="text-sm text-gray-500">Requests submitted</p>
        </div>
      </div>
    </div>
  );
}
