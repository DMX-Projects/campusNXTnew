import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Eye, AlertTriangle, CheckCircle, Clock, CreditCard, Banknote, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

interface Student {
  id: string;
  name: string;
  course: string;
  year: number;
  semester: string;
  totalPayable: number;
  amountPaid: number;
  balance: number;
  lastPaymentDate: string;
  status: 'paid' | 'partial' | 'defaulter';
  email: string;
  phone: string;
}

interface Transaction {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  type: 'online' | 'offline';
  method: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
  feeType: string;
}

const FeeMonitoringSystem: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const theme = isDark ? 'dark' : 'light';

  const [activeTab, setActiveTab] = useState<'monitoring' | 'transactions'>('monitoring');
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [transactionSearch, setTransactionSearch] = useState('');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('all');
  const [transactionStatusFilter, setTransactionStatusFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');

  // Sample data
  const students: Student[] = [
    {
      id: 'STU001',
      name: 'John Doe',
      course: 'Computer Science',
      year: 2,
      semester: 'Semester-I',
      totalPayable: 50000,
      amountPaid: 50000,
      balance: 0,
      lastPaymentDate: '2024-08-15',
      status: 'paid',
      email: 'john.doe@email.com',
      phone: '+1234567890'
    },
    {
      id: 'STU002',
      name: 'Jane Smith',
      course: 'Engineering',
      year: 3,
      semester: 'Semester-I',
      totalPayable: 60000,
      amountPaid: 35000,
      balance: 25000,
      lastPaymentDate: '2024-07-20',
      status: 'partial',
      email: 'jane.smith@email.com',
      phone: '+1234567891'
    },
    {
      id: 'STU003',
      name: 'Mike Johnson',
      course: 'Business',
      year: 1,
      semester: 'Semester-II',
      totalPayable: 45000,
      amountPaid: 15000,
      balance: 30000,
      lastPaymentDate: '2024-06-10',
      status: 'defaulter',
      email: 'mike.johnson@email.com',
      phone: '+1234567892'
    },
    {
      id: 'STU004',
      name: 'Sarah Wilson',
      course: 'Computer Science',
      year: 4,
      semester: 'Semester-III',
      totalPayable: 55000,
      amountPaid: 55000,
      balance: 0,
      lastPaymentDate: '2024-08-25',
      status: 'paid',
      email: 'sarah.wilson@email.com',
      phone: '+1234567893'
    },
    {
      id: 'STU005',
      name: 'David Brown',
      course: 'Engineering',
      year: 2,
      semester: 'Semester-IV',
      totalPayable: 58000,
      amountPaid: 20000,
      balance: 38000,
      lastPaymentDate: '2024-05-15',
      status: 'defaulter',
      email: 'david.brown@email.com',
      phone: '+1234567894'
    }
  ];

  const transactions: Transaction[] = [
    {
      id: 'TXN001',
      studentId: 'STU001',
      studentName: 'John Doe',
      amount: 25000,
      type: 'online',
      method: 'Credit Card',
      date: '2024-08-15',
      status: 'completed',
      reference: 'PAY001',
      feeType: 'Tuition'
    },
    {
      id: 'TXN002',
      studentId: 'STU002',
      studentName: 'Jane Smith',
      amount: 15000,
      type: 'offline',
      method: 'Cash',
      date: '2024-07-20',
      status: 'completed',
      reference: 'PAY002',
      feeType: 'Tuition'
    },
    {
      id: 'TXN003',
      studentId: 'STU003',
      studentName: 'Mike Johnson',
      amount: 10000,
      type: 'online',
      method: 'Bank Transfer',
      date: '2024-06-10',
      status: 'failed',
      reference: 'PAY003',
      feeType: 'Tuition'
    },
    {
      id: 'TXN004',
      studentId: 'STU004',
      studentName: 'Sarah Wilson',
      amount: 30000,
      type: 'online',
      method: 'UPI',
      date: '2024-08-25',
      status: 'completed',
      reference: 'PAY004',
      feeType: 'Tuition'
    },
    {
      id: 'TXN005',
      studentId: 'STU005',
      studentName: 'David Brown',
      amount: 20000,
      type: 'offline',
      method: 'Cheque',
      date: '2024-05-15',
      status: 'pending',
      reference: 'PAY005',
      feeType: 'Tuition'
    }
  ];

  // Theme classes - same as other components
  const themeClasses = {
    light: {
      bg: 'bg-white',
      cardBg: 'bg-white',
      text: 'text-slate-900',
      textSecondary: 'text-slate-600',
      textMuted: 'text-slate-500',
      border: 'border-slate-200',
      hover: 'hover:bg-slate-50',
      button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
      buttonSecondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300',
      input: 'bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400',
      tableHeader: 'bg-slate-50',
      activeTab: 'border-blue-500 text-blue-600',
      inactiveTab: 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
      statusPaid: 'bg-emerald-100 text-emerald-800',
      statusPartial: 'bg-yellow-100 text-yellow-800',
      statusDefaulter: 'bg-red-100 text-red-800',
      statusCompleted: 'bg-emerald-100 text-emerald-800',
      statusPending: 'bg-yellow-100 text-yellow-800',
      statusFailed: 'bg-red-100 text-red-800',
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
      button: 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm',
      buttonSecondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600',
      input: 'bg-slate-700 border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400',
      tableHeader: 'bg-slate-750',
      activeTab: 'border-blue-400 text-blue-400',
      inactiveTab: 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600',
      statusPaid: 'bg-emerald-900 text-emerald-300',
      statusPartial: 'bg-yellow-900 text-yellow-300',
      statusDefaulter: 'bg-red-900 text-red-300',
      statusCompleted: 'bg-emerald-900 text-emerald-300',
      statusPending: 'bg-yellow-900 text-yellow-300',
      statusFailed: 'bg-red-900 text-red-300',
      shadow: 'shadow-sm shadow-black/20',
      shadowLarge: 'shadow-xl shadow-black/30'
    }
  };

  const currentTheme = themeClasses[theme];

  const filteredStudents = useMemo(() => {
  return students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
    const matchesYear = yearFilter === 'all' || student.year.toString() === yearFilter;
    const matchesSemester = semesterFilter === 'all' || student.semester === semesterFilter;
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    
    return matchesSearch && matchesCourse && matchesYear && matchesSemester && matchesStatus;
  });
}, [students, searchTerm, courseFilter, yearFilter, semesterFilter, statusFilter]);


  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.studentName.toLowerCase().includes(transactionSearch.toLowerCase()) ||
                          transaction.reference.toLowerCase().includes(transactionSearch.toLowerCase());
      const matchesType = transactionTypeFilter === 'all' || transaction.type === transactionTypeFilter;
      const matchesStatus = transactionStatusFilter === 'all' || transaction.status === transactionStatusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [transactions, transactionSearch, transactionTypeFilter, transactionStatusFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'partial':
        return <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />;
      case 'defaulter':
        return <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  const getTransactionStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'online' ? <CreditCard className="w-4 h-4" /> : <Banknote className="w-4 h-4" />;
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const exportData = () => {
    console.log('Exporting data...');
  };

  const courses = [...new Set(students.map(s => s.course))];
  const years = [...new Set(students.map(s => s.year))];
  const semesters = [...new Set(students.map(s => s.semester))];

  return (
    <div className={`${currentTheme.bg} min-h-screen transition-colors duration-300`}>
      {/* Header */}
      <div className={`${currentTheme.cardBg} ${currentTheme.shadow} border-b ${currentTheme.border}`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-2xl font-bold ${currentTheme.text}`}>Fee Monitoring System</h1>
              
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={exportData}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${currentTheme.button} font-medium transition-colors`}
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={`${currentTheme.cardBg} ${currentTheme.border} border-b`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'monitoring' ? currentTheme.activeTab : currentTheme.inactiveTab
              }`}
            >
              Fee Monitoring
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'transactions' ? currentTheme.activeTab : currentTheme.inactiveTab
              }`}
            >
              Transaction Logs
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 'monitoring' ? (
          <div>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className={`${currentTheme.cardBg} p-6 rounded-xl ${currentTheme.shadow} ${currentTheme.border} border`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${currentTheme.textSecondary}`}>Total Students</p>
                    <p className={`text-2xl font-semibold ${currentTheme.text}`}>{students.length}</p>
                  </div>
                </div>
              </div>
              
              <div className={`${currentTheme.cardBg} p-6 rounded-xl ${currentTheme.shadow} ${currentTheme.border} border`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${currentTheme.textSecondary}`}>Paid</p>
                    <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
                      {students.filter(s => s.status === 'paid').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${currentTheme.cardBg} p-6 rounded-xl ${currentTheme.shadow} ${currentTheme.border} border`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${currentTheme.textSecondary}`}>Partial</p>
                    <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
                      {students.filter(s => s.status === 'partial').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${currentTheme.cardBg} p-6 rounded-xl ${currentTheme.shadow} ${currentTheme.border} border`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${currentTheme.textSecondary}`}>Defaulters</p>
                    <p className="text-2xl font-semibold text-red-600 dark:text-red-400">
                      {students.filter(s => s.status === 'defaulter').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className={`${currentTheme.cardBg} p-6 rounded-xl ${currentTheme.shadow} mb-6 ${currentTheme.border} border`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${currentTheme.textMuted}`} />
                  <input
                    type="text"
                    placeholder="Search students..."
                    className={`pl-10 pr-4 py-2.5 border rounded-lg w-full ${currentTheme.input} transition-colors`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <select
                  className={`px-3 py-2.5 border rounded-lg ${currentTheme.input} transition-colors`}
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                >
                  <option value="all">All Courses</option>
                  {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>

                <select
                  className={`px-3 py-2.5 border rounded-lg ${currentTheme.input} transition-colors`}
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                >
                  <option value="all">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year.toString()}>Year {year}</option>
                  ))}
                </select>
                <select
  className={`px-3 py-2.5 border rounded-lg ${currentTheme.input} transition-colors`}
  value={semesterFilter}
  onChange={(e) => setSemesterFilter(e.target.value)}
>
  <option value="all">All Semesters</option>
  {semesters.map(sem => (
    <option key={sem} value={sem}>{sem}</option>
  ))}
</select>


                <select
                  className={`px-3 py-2.5 border rounded-lg ${currentTheme.input} transition-colors`}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="partial">Partial</option>
                  <option value="defaulter">Defaulter</option>
                </select>

                <button className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg ${currentTheme.button} font-medium transition-colors`}>
                  <Filter className="w-4 h-4" />
                  Apply Filters
                </button>
              </div>
            </div>

            {/* Student Table */}
            <div className={`${currentTheme.cardBg} rounded-xl ${currentTheme.shadow} overflow-hidden ${currentTheme.border} border`}>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className={currentTheme.tableHeader}>
                    <tr>
                      <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
                        Student Details
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
                        Course & Year
                      </th>
                   
                       <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
                          Semester
                        </th>
                          <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
                        Total Payable
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
                        Amount Paid
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
                        Balance
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
                        Status
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
                        Last Payment
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${currentTheme.border}`}>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className={`${currentTheme.hover} transition-colors`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className={`text-sm font-medium ${currentTheme.text}`}>{student.name}</div>
                            <div className={`text-sm ${currentTheme.textSecondary}`}>{student.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${currentTheme.text}`}>{student.course}</div>
                          <div className={`text-sm ${currentTheme.textSecondary}`}>Year {student.year}</div>
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${currentTheme.text}`}>{student.semester}</div>
                         
                        </td>
                       
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${currentTheme.text}`}>
                          {formatCurrency(student.totalPayable)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                          {formatCurrency(student.amountPaid)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <span className={student.balance > 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}>
                            {formatCurrency(student.balance)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(student.status)}
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              student.status === 'paid' ? currentTheme.statusPaid :
                              student.status === 'partial' ? currentTheme.statusPartial :
                              currentTheme.statusDefaulter
                            }`}>
                              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.textSecondary}`}>
                          {formatDate(student.lastPaymentDate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Transaction Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className={`${currentTheme.cardBg} p-6 rounded-xl ${currentTheme.shadow} ${currentTheme.border} border`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${currentTheme.textSecondary}`}>Completed</p>
                    <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
                      {transactions.filter(t => t.status === 'completed').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${currentTheme.cardBg} p-6 rounded-xl ${currentTheme.shadow} ${currentTheme.border} border`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${currentTheme.textSecondary}`}>Pending</p>
                    <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
                      {transactions.filter(t => t.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${currentTheme.cardBg} p-6 rounded-xl ${currentTheme.shadow} ${currentTheme.border} border`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${currentTheme.textSecondary}`}>Failed</p>
                    <p className="text-2xl font-semibold text-red-600 dark:text-red-400">
                      {transactions.filter(t => t.status === 'failed').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Filters */}
            <div className={`${currentTheme.cardBg} p-6 rounded-xl ${currentTheme.shadow} mb-6 ${currentTheme.border} border`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${currentTheme.textMuted}`} />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className={`pl-10 pr-4 py-2.5 border rounded-lg w-full ${currentTheme.input} transition-colors`}
                    value={transactionSearch}
                    onChange={(e) => setTransactionSearch(e.target.value)}
                  />
                </div>
                
                <select
                  className={`px-3 py-2.5 border rounded-lg ${currentTheme.input} transition-colors`}
                  value={transactionTypeFilter}
                  onChange={(e) => setTransactionTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                 </select>

                <select
                  className={`px-3 py-2 border rounded-md ${currentTheme.input} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={transactionStatusFilter}
                  onChange={(e) => setTransactionStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>

                <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  <Filter className="w-4 h-4" />
                  <span>Apply Filters</span>
                </button>
              </div>
            </div>

            {/* Transaction Table */}
            <div className={`${themeClasses.cardBg} rounded-lg shadow overflow-hidden ${themeClasses.border} border`}>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reference
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${themeClasses.border}`}>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className={themeClasses.hover}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {transaction.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium">{transaction.studentName}</div>
                            <div className={`text-sm ${themeClasses.textSecondary}`}>{transaction.studentId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(transaction.type)}
                            <span className="text-sm capitalize">{transaction.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {transaction.method}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getTransactionStatusIcon(transaction.status)}
                            <span className={`text-sm capitalize ${
                              transaction.status === 'completed' ? 'text-green-600' :
                              transaction.status === 'pending' ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {transaction.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                          {transaction.reference}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeeMonitoringSystem;
