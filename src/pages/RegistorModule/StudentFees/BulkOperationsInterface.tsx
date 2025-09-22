// import React, { useState, useMemo } from 'react';
// import { Search, Filter, Users, Mail, MessageCircle, Ban, DollarSign, Check, X, Sun, Moon, AlertTriangle } from 'lucide-react';

// interface Student {
//   id: string;
//   name: string;
//   rollNumber: string;
//   year: number;
//   department: string;
//   email: string;
//   phone: string;
//   feeStatus: 'paid' | 'pending' | 'overdue';
//   outstandingAmount: number;
//   lastPaymentDate?: string;
// }

// interface BulkAction {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
//   description: string;
//   confirmationRequired: boolean;
// }

// const BulkOperationsInterface: React.FC = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     year: '',
//     department: '',
//     feeStatus: '',
//   });
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [selectedAction, setSelectedAction] = useState<BulkAction | null>(null);

//   // Mock student data
//   const students: Student[] = [
//     {
//       id: '1',
//       name: 'Alice Johnson',
//       rollNumber: 'CS2021001',
//       year: 3,
//       department: 'Computer Science',
//       email: 'alice.johnson@university.edu',
//       phone: '+1234567890',
//       feeStatus: 'overdue',
//       outstandingAmount: 2500,
//       lastPaymentDate: '2024-08-15',
//     },
//     {
//       id: '2',
//       name: 'Bob Smith',
//       rollNumber: 'EE2021002',
//       year: 3,
//       department: 'Electrical Engineering',
//       email: 'bob.smith@university.edu',
//       phone: '+1234567891',
//       feeStatus: 'pending',
//       outstandingAmount: 1800,
//       lastPaymentDate: '2024-09-01',
//     },
//     {
//       id: '3',
//       name: 'Carol Davis',
//       rollNumber: 'ME2020001',
//       year: 4,
//       department: 'Mechanical Engineering',
//       email: 'carol.davis@university.edu',
//       phone: '+1234567892',
//       feeStatus: 'paid',
//       outstandingAmount: 0,
//     },
//     {
//       id: '4',
//       name: 'David Wilson',
//       rollNumber: 'CS2022001',
//       year: 2,
//       department: 'Computer Science',
//       email: 'david.wilson@university.edu',
//       phone: '+1234567893',
//       feeStatus: 'overdue',
//       outstandingAmount: 3200,
//       lastPaymentDate: '2024-07-20',
//     },
//     {
//       id: '5',
//       name: 'Eva Brown',
//       rollNumber: 'CE2021001',
//       year: 3,
//       department: 'Civil Engineering',
//       email: 'eva.brown@university.edu',
//       phone: '+1234567894',
//       feeStatus: 'pending',
//       outstandingAmount: 2100,
//     },
//   ];

//   const bulkActions: BulkAction[] = [
//     {
//       id: 'apply-fine',
//       label: 'Apply Late Fee Fine',
//       icon: <DollarSign className="w-4 h-4" />,
//       description: 'Add late payment charges to selected students',
//       confirmationRequired: true,
//     },
//     {
//       id: 'send-email',
//       label: 'Send Payment Reminder (Email)',
//       icon: <Mail className="w-4 h-4" />,
//       description: 'Send email reminders to selected students',
//       confirmationRequired: false,
//     },
//     {
//       id: 'send-sms',
//       label: 'Send Payment Reminder (SMS)',
//       icon: <MessageCircle className="w-4 h-4" />,
//       description: 'Send SMS reminders to selected students',
//       confirmationRequired: false,
//     },
//     {
//       id: 'block-access',
//       label: 'Block Portal Access',
//       icon: <Ban className="w-4 h-4" />,
//       description: 'Temporarily block portal access for selected students',
//       confirmationRequired: true,
//     },
//   ];

//   const filteredStudents = useMemo(() => {
//     return students.filter(student => {
//       const matchesSearch = 
//         student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const matchesYear = !filters.year || student.year.toString() === filters.year;
//       const matchesDepartment = !filters.department || student.department === filters.department;
//       const matchesFeeStatus = !filters.feeStatus || student.feeStatus === filters.feeStatus;
      
//       return matchesSearch && matchesYear && matchesDepartment && matchesFeeStatus;
//     });
//   }, [students, searchTerm, filters]);

//   const handleSelectAll = () => {
//     if (selectedStudents.size === filteredStudents.length) {
//       setSelectedStudents(new Set());
//     } else {
//       setSelectedStudents(new Set(filteredStudents.map(s => s.id)));
//     }
//   };

//   const handleSelectStudent = (studentId: string) => {
//     const newSelected = new Set(selectedStudents);
//     if (newSelected.has(studentId)) {
//       newSelected.delete(studentId);
//     } else {
//       newSelected.add(studentId);
//     }
//     setSelectedStudents(newSelected);
//   };

//   const handleBulkAction = (action: BulkAction) => {
//     setSelectedAction(action);
//     if (action.confirmationRequired) {
//       setShowConfirmation(true);
//     } else {
//       executeBulkAction(action);
//     }
//   };

//   const executeBulkAction = (action: BulkAction) => {
//     console.log(`Executing ${action.label} for ${selectedStudents.size} students`);
//     // Implement actual bulk action logic here
//     setShowConfirmation(false);
//     setSelectedAction(null);
//     setSelectedStudents(new Set());
//   };

//   const getFeeStatusColor = (status: string) => {
//     switch (status) {
//       case 'paid':
//         return darkMode ? 'text-green-400 bg-green-400/10' : 'text-green-600 bg-green-50';
//       case 'pending':
//         return darkMode ? 'text-yellow-400 bg-yellow-400/10' : 'text-yellow-600 bg-yellow-50';
//       case 'overdue':
//         return darkMode ? 'text-red-400 bg-red-400/10' : 'text-red-600 bg-red-50';
//       default:
//         return darkMode ? 'text-gray-400 bg-gray-400/10' : 'text-gray-600 bg-gray-50';
//     }
//   };

//   const themeClasses = {
//     bg: darkMode ? 'bg-gray-900' : 'bg-gray-50',
//     cardBg: darkMode ? 'bg-gray-800' : 'bg-white',
//     text: darkMode ? 'text-gray-100' : 'text-gray-900',
//     textSecondary: darkMode ? 'text-gray-400' : 'text-gray-600',
//     border: darkMode ? 'border-gray-700' : 'border-gray-200',
//     input: darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900',
//     button: darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700',
//     buttonSecondary: darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700',
//     danger: darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700',
//   };

//   return (
//     <div className={`min-h-screen p-4 ${themeClasses.bg} transition-colors duration-200`}>
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className={`${themeClasses.cardBg} rounded-lg shadow-lg p-6 mb-6 ${themeClasses.border} border`}>
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <h1 className={`text-2xl font-bold ${themeClasses.text}`}>Bulk Operations</h1>
//               <p className={themeClasses.textSecondary}>Manage student fees and communications efficiently</p>
//             </div>
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className={`p-2 rounded-lg ${themeClasses.buttonSecondary} transition-colors`}
//             >
//               {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className={`${themeClasses.cardBg} rounded-lg shadow-lg p-6 mb-6 ${themeClasses.border} border`}>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//             <div className="lg:col-span-2">
//               <div className="relative">
//                 <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.textSecondary}`} />
//                 <input
//                   type="text"
//                   placeholder="Search students..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className={`w-full pl-10 pr-4 py-2 rounded-lg ${themeClasses.input} transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//                 />
//               </div>
//             </div>
//             <select
//               value={filters.year}
//               onChange={(e) => setFilters({...filters, year: e.target.value})}
//               className={`px-3 py-2 rounded-lg ${themeClasses.input} transition-colors focus:ring-2 focus:ring-blue-500`}
//             >
//               <option value="">All Years</option>
//               <option value="1">1st Year</option>
//               <option value="2">2nd Year</option>
//               <option value="3">3rd Year</option>
//               <option value="4">4th Year</option>
//             </select>
//             <select
//               value={filters.department}
//               onChange={(e) => setFilters({...filters, department: e.target.value})}
//               className={`px-3 py-2 rounded-lg ${themeClasses.input} transition-colors focus:ring-2 focus:ring-blue-500`}
//             >
//               <option value="">All Departments</option>
//               <option value="Computer Science">Computer Science</option>
//               <option value="Electrical Engineering">Electrical Engineering</option>
//               <option value="Mechanical Engineering">Mechanical Engineering</option>
//               <option value="Civil Engineering">Civil Engineering</option>
//             </select>
//             <select
//               value={filters.feeStatus}
//               onChange={(e) => setFilters({...filters, feeStatus: e.target.value})}
//               className={`px-3 py-2 rounded-lg ${themeClasses.input} transition-colors focus:ring-2 focus:ring-blue-500`}
//             >
//               <option value="">All Statuses</option>
//               <option value="paid">Paid</option>
//               <option value="pending">Pending</option>
//               <option value="overdue">Overdue</option>
//             </select>
//           </div>
//         </div>

//         {/* Results Summary and Bulk Actions */}
//         <div className={`${themeClasses.cardBg} rounded-lg shadow-lg p-6 mb-6 ${themeClasses.border} border`}>
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <Users className={`w-5 h-5 ${themeClasses.textSecondary}`} />
//                 <span className={themeClasses.text}>
//                   {filteredStudents.length} students found, {selectedStudents.size} selected
//                 </span>
//               </div>
//               <button
//                 onClick={handleSelectAll}
//                 className={`px-3 py-1 rounded-md text-sm ${themeClasses.buttonSecondary} transition-colors`}
//               >
//                 {selectedStudents.size === filteredStudents.length ? 'Deselect All' : 'Select All'}
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {bulkActions.map((action) => (
//                 <button
//                   key={action.id}
//                   onClick={() => handleBulkAction(action)}
//                   disabled={selectedStudents.size === 0}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                     selectedStudents.size === 0
//                       ? darkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                       : action.id === 'block-access' || action.id === 'apply-fine'
//                       ? `${themeClasses.danger} text-white`
//                       : `${themeClasses.button} text-white`
//                   }`}
//                 >
//                   {action.icon}
//                   {action.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Students Table */}
//         <div className={`${themeClasses.cardBg} rounded-lg shadow-lg overflow-hidden ${themeClasses.border} border`}>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
//                 <tr>
//                   <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>
//                     <input
//                       type="checkbox"
//                       checked={selectedStudents.size === filteredStudents.length && filteredStudents.length > 0}
//                       onChange={handleSelectAll}
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                     />
//                   </th>
//                   <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>
//                     Student Details
//                   </th>
//                   <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>
//                     Academic Info
//                   </th>
//                   <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>
//                     Fee Status
//                   </th>
//                   <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>
//                     Outstanding Amount
//                   </th>
//                   <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>
//                     Last Payment
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                 {filteredStudents.map((student) => (
//                   <tr
//                     key={student.id}
//                     className={`hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors ${
//                       selectedStudents.has(student.id) ? (darkMode ? 'bg-blue-900/20' : 'bg-blue-50') : ''
//                     }`}
//                   >
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <input
//                         type="checkbox"
//                         checked={selectedStudents.has(student.id)}
//                         onChange={() => handleSelectStudent(student.id)}
//                         className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                       />
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div>
//                         <div className={`text-sm font-medium ${themeClasses.text}`}>{student.name}</div>
//                         <div className={`text-sm ${themeClasses.textSecondary}`}>{student.email}</div>
//                         <div className={`text-sm ${themeClasses.textSecondary}`}>{student.phone}</div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className={`text-sm ${themeClasses.text}`}>{student.rollNumber}</div>
//                       <div className={`text-sm ${themeClasses.textSecondary}`}>Year {student.year}</div>
//                       <div className={`text-sm ${themeClasses.textSecondary}`}>{student.department}</div>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getFeeStatusColor(student.feeStatus)}`}>
//                         {student.feeStatus.charAt(0).toUpperCase() + student.feeStatus.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className={`text-sm font-medium ${student.outstandingAmount > 0 ? 'text-red-600' : themeClasses.text}`}>
//                         ${student.outstandingAmount.toLocaleString()}
//                       </div>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className={`text-sm ${themeClasses.textSecondary}`}>
//                         {student.lastPaymentDate || 'No payments'}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Confirmation Modal */}
//         {showConfirmation && selectedAction && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className={`${themeClasses.cardBg} rounded-lg shadow-xl p-6 max-w-md w-full ${themeClasses.border} border`}>
//               <div className="flex items-center gap-3 mb-4">
//                 <AlertTriangle className="w-6 h-6 text-orange-500" />
//                 <h3 className={`text-lg font-semibold ${themeClasses.text}`}>Confirm Action</h3>
//               </div>
//               <p className={`mb-4 ${themeClasses.textSecondary}`}>
//                 Are you sure you want to perform "{selectedAction.label}" on {selectedStudents.size} selected students?
//               </p>
//               <p className={`text-sm mb-6 ${themeClasses.textSecondary}`}>
//                 {selectedAction.description}
//               </p>
//               <div className="flex gap-3 justify-end">
//                 <button
//                   onClick={() => {
//                     setShowConfirmation(false);
//                     setSelectedAction(null);
//                   }}
//                   className={`px-4 py-2 rounded-lg ${themeClasses.buttonSecondary} transition-colors`}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => executeBulkAction(selectedAction)}
//                   className={`px-4 py-2 rounded-lg ${themeClasses.danger} text-white transition-colors`}
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BulkOperationsInterface;
import React, { useState, useMemo } from 'react';
import { Search, Filter, Users, Mail, MessageCircle, Ban, DollarSign, Check, X, Sun, Moon, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  year: number;
  department: string;
  email: string;
  phone: string;
  feeStatus: 'paid' | 'pending' | 'overdue';
  outstandingAmount: number;
  lastPaymentDate?: string;
}

interface BulkAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  confirmationRequired: boolean;
}

const BulkOperationsInterface: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const theme = isDark ? 'dark' : 'light';

  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    year: '',
    department: '',
    feeStatus: '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAction, setSelectedAction] = useState<BulkAction | null>(null);

  // Mock student data
  const students: Student[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      rollNumber: 'CS2021001',
      year: 3,
      department: 'Computer Science',
      email: 'alice.johnson@university.edu',
      phone: '+1234567890',
      feeStatus: 'overdue',
      outstandingAmount: 2500,
      lastPaymentDate: '2024-08-15',
    },
    {
      id: '2',
      name: 'Bob Smith',
      rollNumber: 'EE2021002',
      year: 3,
      department: 'Electrical Engineering',
      email: 'bob.smith@university.edu',
      phone: '+1234567891',
      feeStatus: 'pending',
      outstandingAmount: 1800,
      lastPaymentDate: '2024-09-01',
    },
    {
      id: '3',
      name: 'Carol Davis',
      rollNumber: 'ME2020001',
      year: 4,
      department: 'Mechanical Engineering',
      email: 'carol.davis@university.edu',
      phone: '+1234567892',
      feeStatus: 'paid',
      outstandingAmount: 0,
    },
    {
      id: '4',
      name: 'David Wilson',
      rollNumber: 'CS2022001',
      year: 2,
      department: 'Computer Science',
      email: 'david.wilson@university.edu',
      phone: '+1234567893',
      feeStatus: 'overdue',
      outstandingAmount: 3200,
      lastPaymentDate: '2024-07-20',
    },
    {
      id: '5',
      name: 'Eva Brown',
      rollNumber: 'CE2021001',
      year: 3,
      department: 'Civil Engineering',
      email: 'eva.brown@university.edu',
      phone: '+1234567894',
      feeStatus: 'pending',
      outstandingAmount: 2100,
    },
  ];

  const bulkActions: BulkAction[] = [
    {
      id: 'apply-fine',
      label: 'Apply Late Fee Fine',
      icon: <DollarSign className="w-4 h-4" />,
      description: 'Add late payment charges to selected students',
      confirmationRequired: true,
    },
    {
      id: 'send-email',
      label: 'Send Payment Reminder (Email)',
      icon: <Mail className="w-4 h-4" />,
      description: 'Send email reminders to selected students',
      confirmationRequired: false,
    },
    {
      id: 'send-sms',
      label: 'Send Payment Reminder (SMS)',
      icon: <MessageCircle className="w-4 h-4" />,
      description: 'Send SMS reminders to selected students',
      confirmationRequired: false,
    },
    {
      id: 'block-access',
      label: 'Block Portal Access',
      icon: <Ban className="w-4 h-4" />,
      description: 'Temporarily block portal access for selected students',
      confirmationRequired: true,
    },
  ];

  // Theme classes - same as Fee Structure Management
  const themeClasses = {
    light: {
      bg: 'bg-white',
      cardBg: 'bg-white',
      text: 'text-slate-900',
      textSecondary: 'text-slate-600',
      textMuted: 'text-slate-500',
      border: 'border-slate-200',
      hover: 'hover:bg-slate-50',
      hoverCard: 'hover:bg-slate-25',
      button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
      buttonSecondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300',
      buttonDanger: 'bg-red-600 hover:bg-red-700 text-white',
      input: 'bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400',
      modal: 'bg-white',
      overlay: 'bg-black/50 backdrop-blur-sm',
      tableHeader: 'bg-slate-50',
      statusPaid: 'bg-emerald-100 text-emerald-800',
      statusPending: 'bg-yellow-100 text-yellow-800',
      statusOverdue: 'bg-red-100 text-red-800',
      highlight: 'bg-blue-50',
      shadow: 'shadow-sm',
      shadowLarge: 'shadow-xl'
    },
    dark: {
      bg: 'bg-gray-900',
      cardBg: 'bg-slate-800',
      text: 'text-slate-100',
      textSecondary: 'text-slate-300',
      textMuted: 'text-slate-400',
      border: 'border-slate-700',
      hover: 'hover:bg-slate-700',
      hoverCard: 'hover:bg-slate-750',
      button: 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm',
      buttonSecondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600',
      buttonDanger: 'bg-red-600 hover:bg-red-500 text-white',
      input: 'bg-slate-700 border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400',
      modal: 'bg-slate-800',
      overlay: 'bg-black/70 backdrop-blur-sm',
      tableHeader: 'bg-slate-750',
      statusPaid: 'bg-emerald-900 text-emerald-300',
      statusPending: 'bg-yellow-900 text-yellow-300',
      statusOverdue: 'bg-red-900 text-red-300',
      highlight: 'bg-blue-900/20',
      shadow: 'shadow-sm shadow-black/20',
      shadowLarge: 'shadow-xl shadow-black/30'
    }
  };

  const currentTheme = themeClasses[theme];

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = !filters.year || student.year.toString() === filters.year;
      const matchesDepartment = !filters.department || student.department === filters.department;
      const matchesFeeStatus = !filters.feeStatus || student.feeStatus === filters.feeStatus;
      
      return matchesSearch && matchesYear && matchesDepartment && matchesFeeStatus;
    });
  }, [students, searchTerm, filters]);

  const handleSelectAll = () => {
    if (selectedStudents.size === filteredStudents.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(filteredStudents.map(s => s.id)));
    }
  };

  const handleSelectStudent = (studentId: string) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      newSelected.add(studentId);
    }
    setSelectedStudents(newSelected);
  };

  const handleBulkAction = (action: BulkAction) => {
    setSelectedAction(action);
    if (action.confirmationRequired) {
      setShowConfirmation(true);
    } else {
      executeBulkAction(action);
    }
  };

  const executeBulkAction = (action: BulkAction) => {
    console.log(`Executing ${action.label} for ${selectedStudents.size} students`);
    // Implement actual bulk action logic here
    setShowConfirmation(false);
    setSelectedAction(null);
    setSelectedStudents(new Set());
  };

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return currentTheme.statusPaid;
      case 'pending':
        return currentTheme.statusPending;
      case 'overdue':
        return currentTheme.statusOverdue;
      default:
        return currentTheme.textMuted;
    }
  };

  return (
    <div className={`${currentTheme.bg} min-h-screen transition-colors duration-300 p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${currentTheme.text}`}>Bulk Operations</h1>
            <p className={`${currentTheme.textSecondary} mt-2`}>Manage student fees and communications efficiently</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className={`${currentTheme.cardBg} rounded-xl shadow-lg p-6 mb-6 border ${currentTheme.border}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textMuted}`} />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${currentTheme.input} transition-colors`}
                />
              </div>
            </div>
            <select
              value={filters.year}
              onChange={(e) => setFilters({...filters, year: e.target.value})}
              className={`px-3 py-2.5 rounded-lg border ${currentTheme.input} transition-colors`}
            >
              <option value="">All Years</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
            <select
              value={filters.department}
              onChange={(e) => setFilters({...filters, department: e.target.value})}
              className={`px-3 py-2.5 rounded-lg border ${currentTheme.input} transition-colors`}
            >
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
            </select>
            <select
              value={filters.feeStatus}
              onChange={(e) => setFilters({...filters, feeStatus: e.target.value})}
              className={`px-3 py-2.5 rounded-lg border ${currentTheme.input} transition-colors`}
            >
              <option value="">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Results Summary and Bulk Actions */}
        <div className={`${currentTheme.cardBg} rounded-xl shadow-lg p-6 mb-6 border ${currentTheme.border}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className={`w-5 h-5 ${currentTheme.textMuted}`} />
                <span className={currentTheme.text}>
                  {filteredStudents.length} students found, {selectedStudents.size} selected
                </span>
              </div>
              <button
                onClick={handleSelectAll}
                className={`px-3 py-1.5 rounded-lg text-sm ${currentTheme.buttonSecondary} transition-colors`}
              >
                {selectedStudents.size === filteredStudents.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {bulkActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleBulkAction(action)}
                  disabled={selectedStudents.size === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStudents.size === 0
                      ? `${currentTheme.buttonSecondary} opacity-50 cursor-not-allowed`
                      : action.id === 'block-access' || action.id === 'apply-fine'
                      ? currentTheme.buttonDanger
                      : currentTheme.button
                  }`}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className={`${currentTheme.cardBg} rounded-xl shadow-lg overflow-hidden border ${currentTheme.border}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={currentTheme.tableHeader}>
                <tr>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
                    <input
                      type="checkbox"
                      checked={selectedStudents.size === filteredStudents.length && filteredStudents.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
                    Student Details
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
                    Academic Info
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
                    Fee Status
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
                    Outstanding Amount
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
                    Last Payment
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${currentTheme.border}`}>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className={`${currentTheme.hover} transition-colors ${
                      selectedStudents.has(student.id) ? currentTheme.highlight : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedStudents.has(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className={`text-sm font-medium ${currentTheme.text}`}>{student.name}</div>
                        <div className={`text-sm ${currentTheme.textSecondary}`}>{student.email}</div>
                        <div className={`text-sm ${currentTheme.textSecondary}`}>{student.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${currentTheme.text}`}>{student.rollNumber}</div>
                      <div className={`text-sm ${currentTheme.textSecondary}`}>Year {student.year}</div>
                      <div className={`text-sm ${currentTheme.textSecondary}`}>{student.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getFeeStatusColor(student.feeStatus)}`}>
                        {student.feeStatus.charAt(0).toUpperCase() + student.feeStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${student.outstandingAmount > 0 ? 'text-red-600 dark:text-red-400' : currentTheme.text}`}>
                        ₹{student.outstandingAmount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${currentTheme.textSecondary}`}>
                        {student.lastPaymentDate ? new Date(student.lastPaymentDate).toLocaleDateString() : 'No payments'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && selectedAction && (
          <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${currentTheme.overlay}`}>
            <div className={`${currentTheme.modal} rounded-xl ${currentTheme.shadowLarge} p-6 max-w-md w-full border ${currentTheme.border}`}>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Confirm Action</h3>
              </div>
              <p className={`mb-4 ${currentTheme.textSecondary}`}>
                Are you sure you want to perform "{selectedAction.label}" on {selectedStudents.size} selected students?
              </p>
              <p className={`text-sm mb-6 ${currentTheme.textMuted}`}>
                {selectedAction.description}
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowConfirmation(false);
                    setSelectedAction(null);
                  }}
                  className={`px-4 py-2 rounded-lg ${currentTheme.buttonSecondary} transition-colors`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => executeBulkAction(selectedAction)}
                  className={`px-4 py-2 rounded-lg ${currentTheme.buttonDanger} transition-colors`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkOperationsInterface;