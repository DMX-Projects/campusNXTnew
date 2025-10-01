import React, { useState, useMemo } from 'react';
import { Search, CheckCircle, X, ChevronDown } from 'lucide-react';

// --- TYPES ---
type Scholarship = {
  id: string;
  name: string;
  discount: number;
  applicableCategories: string[];
};

type StudentFeeProfile = {
  id: string;
  registerNumber: string;
  name: string;
  avatar: string;
  department: string;
  category: string;
  selectedScholarshipId: string | null;
  status: 'Pending' | 'Confirmed';
};

type DepartmentFees = Record<string, number>;

// --- CASTE-BASED SCHOLARSHIPS ---
const MOCK_SCHOLARSHIPS: Scholarship[] = [
  { id: 'schol_gen', name: 'General Category Fee Concession', discount: 10000, applicableCategories: ['General'] },
  { id: 'schol_obc', name: 'OBC Welfare Scholarship', discount: 35000, applicableCategories: ['OBC'] },
  { id: 'schol_sc', name: 'SC Development Scholarship', discount: 50000, applicableCategories: ['SC'] },
  { id: 'schol_st', name: 'ST Development Scholarship', discount: 50000, applicableCategories: ['ST'] },
];

// --- DEPARTMENT FEES ---
const MOCK_DEPARTMENT_FEES: DepartmentFees = {
  'B.Tech CSE': 150000,
  'B.Tech AI & ML': 160000,
  'B.Com': 80000,
  'BBA': 95000,
  'B.Sc Physics': 75000,
};

// --- STUDENT LIST ---
const MOCK_STUDENTS: StudentFeeProfile[] = [
  { id: 'FEE001', registerNumber: '23CS001', name: 'Ishita Sharma', avatar: 'IS', department: 'B.Tech AI & ML', category: 'General', selectedScholarshipId: null, status: 'Pending' },
  { id: 'FEE002', registerNumber: '23CM015', name: 'Reyansh Gupta', avatar: 'RG', department: 'B.Com', category: 'OBC', selectedScholarshipId: null, status: 'Pending' },
  { id: 'FEE003', registerNumber: '23BB032', name: 'Anika Reddy', avatar: 'AR', department: 'BBA', category: 'SC', selectedScholarshipId: null, status: 'Pending' },
  { id: 'FEE004', registerNumber: '23PH009', name: 'Arnav Choudhary', avatar: 'AC', department: 'B.Sc Physics', category: 'ST', selectedScholarshipId: null, status: 'Pending' },
  { id: 'FEE005', registerNumber: '23CS025', name: 'Kabir Das', avatar: 'KD', department: 'B.Tech CSE', category: 'General', selectedScholarshipId: null, status: 'Pending' },
  { id: 'FEE006', registerNumber: '23BB041', name: 'Zara Khan', avatar: 'ZK', department: 'BBA', category: 'OBC', selectedScholarshipId: null, status: 'Pending' },
  { id: 'FEE007', registerNumber: '23CS050', name: 'Suresh Kumar', avatar: 'SK', department: 'B.Tech CSE', category: 'SC', selectedScholarshipId: null, status: 'Pending' },
  { id: 'FEE008', registerNumber: '23CM022', name: 'Priya Murmu', avatar: 'PM', department: 'B.Com', category: 'ST', selectedScholarshipId: null, status: 'Pending' },
];

// --- MAIN COMPONENT ---
const App = () => {
  const [students, setStudents] = useState<StudentFeeProfile[]>(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<{ message: string } | null>(null);
  const [modalState, setModalState] = useState<{ isOpen: boolean; student: StudentFeeProfile | null }>({ isOpen: false, student: null });
  const itemsPerPage = 5;

  const showToast = (message: string) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleScholarshipChange = (studentId: string, scholarshipId: string) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === studentId ? { ...s, selectedScholarshipId: scholarshipId === "none" ? null : scholarshipId } : s
      )
    );
  };

  const handleConfirmFee = (studentId: string) => {
    const studentToConfirm = students.find(s => s.id === studentId);
    if (!studentToConfirm) return;

    setStudents(prev =>
      prev.map(s => s.id === studentId ? { ...s, status: 'Confirmed' } : s)
    );
    setModalState({ isOpen: false, student: null });
    showToast(`Fees assigned for ${studentToConfirm.name}.`);
  };

  const filteredStudents = useMemo(() => {
    return students.filter(s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.registerNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, students]);

  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const getFeeDetails = (student: StudentFeeProfile) => {
    const totalFee = MOCK_DEPARTMENT_FEES[student.department] || 0;
    const selectedScholarship = MOCK_SCHOLARSHIPS.find(s => s.id === student.selectedScholarshipId);
    const discount = selectedScholarship ? selectedScholarship.discount : 0;
    const finalFee = totalFee - discount;
    return { totalFee, discount, finalFee, scholarshipName: selectedScholarship?.name || 'N/A' };
  };

  const ConfirmationModal = () => {
    if (!modalState.isOpen || !modalState.student) return null;
    const { student } = modalState;
    const { totalFee, discount, finalFee, scholarshipName } = getFeeDetails(student);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
          <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
            <h2 className="text-xl font-bold">Confirm Fee Assignment</h2>
            <button onClick={() => setModalState({ isOpen: false, student: null })}><X className="w-6 h-6" /></button>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-center">Please confirm the fee details for <strong>{student.name}</strong> ({student.registerNumber}).</p>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between"><span>Department Fee ({student.department}):</span> <span className="font-semibold">₹{totalFee.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span>Scholarship ({scholarshipName}):</span> <span className="font-semibold text-green-600">- ₹{discount.toLocaleString('en-IN')}</span></div>
              <hr className="dark:border-gray-600"/>
              <div className="flex justify-between font-bold text-base"><span>Final Fees Payable:</span> <span className="text-indigo-600 dark:text-indigo-400">₹{finalFee.toLocaleString('en-IN')}</span></div>
            </div>
          </div>
          <div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
            <button onClick={() => setModalState({ isOpen: false, student: null })} className="px-4 py-2 border dark:border-gray-600 rounded-lg">Cancel</button>
            <button onClick={() => handleConfirmFee(student.id)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"><CheckCircle size={18} /> Confirm & Assign</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 font-sans text-gray-800 dark:text-gray-200">
      {toast && (<div className="fixed top-5 right-5 bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-3 z-50"><CheckCircle className="w-6 h-6" /><p>{toast.message}</p></div>)}
      <ConfirmationModal />

      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Fee Confirmation</h1>
          <p className="text-gray-500 dark:text-gray-400">Assign scholarships and confirm final fees.</p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search by name or register no..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-gray-900/50 rounded-lg border-transparent focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
        </div>
        
        {/* --- Mobile View - Cards --- */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginatedStudents.map(student => {
                 const { totalFee, discount, finalFee } = getFeeDetails(student);
                 const applicableScholarships = MOCK_SCHOLARSHIPS.filter(s => s.applicableCategories.includes(student.category));
                return (
                    <div key={student.id} className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 space-y-4 ${student.status === 'Confirmed' ? 'opacity-70 bg-green-50 dark:bg-green-900/20' : ''}`}>
                        <div className="flex justify-between items-start">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center font-bold text-indigo-700 dark:text-indigo-300">{student.avatar}</div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">{student.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{student.registerNumber}</p>
                                </div>
                            </div>
                            {student.status === 'Confirmed' && <span className="text-green-600 dark:text-green-400 text-xs font-semibold flex items-center gap-1"><CheckCircle size={14}/> Confirmed</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                             <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Department</p>
                                <p className="font-medium">{student.department}</p>
                            </div>
                             <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Category</p>
                                <p className="font-medium">{student.category}</p>
                            </div>
                        </div>
                        
                         <div>
                            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Scholarship</label>
                             <div className="relative">
                                <select
                                    value={student.selectedScholarshipId || "none"}
                                    onChange={(e) => handleScholarshipChange(student.id, e.target.value)}
                                    disabled={student.status === 'Confirmed'}
                                    className="w-full appearance-none bg-gray-100 dark:bg-gray-900/50 rounded-lg py-2 pl-3 pr-8 text-sm"
                                >
                                    <option value="none">No Scholarship</option>
                                    {applicableScholarships.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="border-t dark:border-gray-700 pt-4 space-y-3">
                           <div className="text-sm space-y-1">
                                <div className="flex justify-between"><span>Total Fee:</span> <span className="font-mono">₹{totalFee.toLocaleString('en-IN')}</span></div>
                                <div className="flex justify-between text-green-600 dark:text-green-400"><span>Discount:</span> <span className="font-mono">- ₹{discount.toLocaleString('en-IN')}</span></div>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="font-bold text-base">Final Fee:</span>
                                <span className="font-bold text-lg font-mono text-indigo-600 dark:text-indigo-400">₹{finalFee.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        {student.status !== 'Confirmed' && (
                            <button 
                                onClick={() => setModalState({ isOpen: true, student })} 
                                className="w-full px-4 py-2.5 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 font-semibold">
                                <CheckCircle size={16} /> Confirm Fee
                            </button>
                        )}
                    </div>
                )
            })}
        </div>


        {/* --- Desktop Table --- */}
        <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs text-gray-600 dark:text-gray-400 uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Student</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Scholarship</th>
                <th className="px-6 py-4 font-semibold text-right">Total Fee</th>
                <th className="px-6 py-4 font-semibold text-right">Discount</th>
                <th className="px-6 py-4 font-semibold text-right">Final Fee</th>
                <th className="px-6 py-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedStudents.map(student => {
                const { totalFee, discount, finalFee } = getFeeDetails(student);
                const applicableScholarships = MOCK_SCHOLARSHIPS.filter(s => s.applicableCategories.includes(student.category));

                return (
                  <tr key={student.id} className={`${student.status === 'Confirmed' ? 'bg-green-50/50 dark:bg-green-900/20 opacity-70' : 'hover:bg-gray-50 dark:hover:bg-gray-900/30'}`}>
                    <td className="px-6 py-4 flex items-center gap-3 font-medium text-gray-900 dark:text-white">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center font-bold text-indigo-700 dark:text-indigo-300">{student.avatar}</div>
                      <div>{student.name}<p className="text-xs text-gray-500 dark:text-gray-400">{student.registerNumber}</p></div>
                    </td>
                    <td className="px-6 py-4">{student.department}</td>
                    <td className="px-6 py-4 font-medium">{student.category}</td>
                    <td className="px-6 py-4">
                      <div className="relative w-52">
                        <select
                          value={student.selectedScholarshipId || "none"}
                          onChange={(e) => handleScholarshipChange(student.id, e.target.value)}
                          disabled={student.status === 'Confirmed'}
                          className="w-full appearance-none bg-gray-100 dark:bg-gray-900/50 rounded-lg py-2 pl-3 pr-8 border-transparent focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="none">No Scholarship</option>
                          {applicableScholarships.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono">₹{totalFee.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-right font-mono text-green-600 dark:text-green-400">- ₹{discount.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400">₹{finalFee.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-center">
                      {student.status === 'Confirmed' ? (
                        <span className="inline-flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-semibold text-xs"><CheckCircle size={16} /> Confirmed</span>
                      ) : (
                        <button onClick={() => setModalState({ isOpen: true, student })} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs flex items-center gap-2 font-semibold hover:bg-indigo-700 transition-colors"><CheckCircle size={14} /> Confirm</button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* --- Pagination --- */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-600 dark:text-gray-400 space-y-4 sm:space-y-0">
            <div>Showing <strong>{((currentPage - 1) * itemsPerPage) + 1}</strong>-<strong>{Math.min(currentPage * itemsPerPage, filteredStudents.length)}</strong> of <strong>{filteredStudents.length}</strong> results</div>
            <div className="flex items-center gap-2">
                 <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="px-3 py-1.5 rounded-md bg-white dark:bg-gray-800 border dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700">First</button>
                 <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="px-3 py-1.5 rounded-md bg-white dark:bg-gray-800 border dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700">Prev</button>
                 <span className="px-2">Page {currentPage} of {totalPages}</span>
                 <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className="px-3 py-1.5 rounded-md bg-white dark:bg-gray-800 border dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700">Next</button>
                 <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="px-3 py-1.5 rounded-md bg-white dark:bg-gray-800 border dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700">Last</button>
            </div>
          </div>
        )}
         {paginatedStudents.length === 0 && (
            <div className="text-center py-12">
                <p className="text-gray-500">No students found.</p>
            </div>
         )}
      </div>
    </div>
  );
};

export default App;
