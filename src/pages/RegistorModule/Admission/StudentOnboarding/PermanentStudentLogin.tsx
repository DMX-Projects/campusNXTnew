import React, { useState, useMemo, useEffect } from 'react';
import { Search, UploadCloud, KeyRound, Contact, CheckCircle, Bell, X, FileUp } from 'lucide-react';

// --- TYPES ---
type FinalStudent = {
  id: string;
  registerNo: string;
  name: string;
  avatar: string;
  course: string;
  personalDetails: {
    dob: string;
    email: string;
    phone: string;
  };
};

// --- MOCK DATA ---
const finalAdmissionList: FinalStudent[] = [
  {
    id: 'ACAD001', registerNo: '25CS001', name: 'Ishita Sharma', avatar: 'IS', course: 'B.Tech AI & ML',
    personalDetails: { dob: '15-08-2005', email: 'ishita.sharma@example.com', phone: '+91 98765 43210' }
  },
  {
    id: 'ACAD002', registerNo: '25BC001', name: 'Reyansh Gupta', avatar: 'RG', course: 'B.Com',
    personalDetails: { dob: '22-05-2004', email: 'reyansh.gupta@example.com', phone: '+91 98765 43211' }
  },
  {
    id: 'ACAD005', registerNo: '25CS002', name: 'Kabir Das', avatar: 'KD', course: 'B.Tech CSE',
    personalDetails: { dob: '20-04-2005', email: 'kabir.das@example.com', phone: '+91 98765 11223' }
  },
  {
    id: 'ACAD006', registerNo: '25MB001', name: 'Zara Khan', avatar: 'ZK', course: 'MBA',
    personalDetails: { dob: '11-11-2001', email: 'zara.khan@example.com', phone: '+91 98765 22334' }
  },
  {
    id: 'ACAD009', registerNo: '25BA001', name: 'Rohan Verma', avatar: 'RV', course: 'BBA',
    personalDetails: { dob: '25-09-2004', email: 'rohan.verma@example.com', phone: '+91 98765 55667' }
  },
  {
    id: 'VERIFY002', registerNo: '25BC002', name: 'Myra Singh', avatar: 'MS', course: 'B.Com',
    personalDetails: { dob: '30-03-2005', email: 'myra.s@example.com', phone: '+91 98765 43214' }
  },
  {
    id: 'VERIFY009', registerNo: '25SC001', name: 'Saanvi Chen', avatar: 'SC', course: 'B.Sc Chemistry',
    personalDetails: { dob: '25-12-2004', email: 'saanvi.chen@example.com', phone: '+91 98765 43218' }
  },
];

// --- MAIN COMPONENT ---
const FinalAdmissionList = () => {
    const [students, setStudents] = useState<FinalStudent[]>(finalAdmissionList);
    const [searchTerm, setSearchTerm] = useState('');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false); // Placeholder for modal logic
    const [currentPage, setCurrentPage] = useState(1);
    const [fileToImport, setFileToImport] = useState<File | null>(null);
    const [loginsGenerated, setLoginsGenerated] = useState(false);
    const itemsPerPage = 7;
    
    useEffect(() => {
        if (toast) {
          const timer = setTimeout(() => setToast(null), 5000);
          return () => clearTimeout(timer);
        }
    }, [toast]);

    const filteredStudents = useMemo(() => {
        return students.filter((s) => 
            searchTerm === '' || 
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            s.registerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.course.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, students]);

    const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

    const handleGenerateLogins = () => {
        setLoginsGenerated(true);
        setToast({ message: `Permanent logins generated for ${students.length} students.`, type: 'success' });
        // In a real app, this would trigger a backend process.
    };

    const handleGenerateIdCards = () => {
        setToast({ message: "ID card generation will be done after getting the template.", type: 'info' });
        // In a real app, this might queue a job.
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileToImport(e.target.files[0]);
        }
    };

    const handleImport = () => {
        if (fileToImport) {
            // In a real app, you would parse the file and update the students state.
            setToast({ message: `Successfully imported data from ${fileToImport.name}.`, type: 'success' });
            setIsImportModalOpen(false);
            setFileToImport(null);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
            {toast && (
                <div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`} role="alert">
                    {toast.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
                    <p>{toast.message}</p>
                </div>
            )}
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Final Admission List</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage permanent records, credentials, and ID cards for admitted students.</p>
                </header>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                         <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="text" placeholder="Search by name, Reg. No, or course..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg border-transparent focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
                            <button onClick={() => setIsImportModalOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-colors">
                                <UploadCloud className="w-5 h-5" /> Import Final List
                            </button>
                            <button onClick={handleGenerateLogins} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 font-semibold transition-colors">
                                <KeyRound className="w-5 h-5" /> Generate Logins
                            </button>
                             <button onClick={handleGenerateIdCards} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-semibold transition-colors">
                                <Contact className="w-5 h-5" /> Generate ID Cards
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                    {filteredStudents.length === 0 ? (
                        <div className="text-center py-20 text-gray-500"><Search className="mx-auto h-12 w-12 mb-4" /><h3 className="font-semibold text-lg">No Students Found</h3><p>Import the final list to get started.</p></div>
                    ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4 whitespace-nowrap">Student Name</th>
                                        <th className="px-6 py-4 whitespace-nowrap">Register No.</th>
                                        {loginsGenerated && <th className="px-6 py-4 whitespace-nowrap">Login Credentials</th>}
                                        <th className="px-6 py-4 whitespace-nowrap">Course Admitted</th>
                                        <th className="px-6 py-4 whitespace-nowrap">Date of Birth</th>
                                        <th className="px-6 py-4 whitespace-nowrap">Contact Email</th>
                                        <th className="px-6 py-4 whitespace-nowrap">Contact Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedStudents.map((s) => (
                                        <tr key={s.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="px-6 py-4 flex items-center gap-3 whitespace-nowrap text-gray-900 dark:text-white font-medium">
                                                <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-sm">{s.avatar}</div>
                                                {s.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-mono font-semibold text-indigo-600 dark:text-indigo-400">{s.registerNo}</td>
                                            {loginsGenerated && (
                                                <td className="px-6 py-4 whitespace-nowrap font-mono text-xs">
                                                    <div><span className="font-semibold text-gray-500 dark:text-gray-400">User: </span>{s.registerNo}</div>
                                                    <div><span className="font-semibold text-gray-500 dark:text-gray-400">Pass: </span>{s.name.split(' ')[0].toLowerCase()}123</div>
                                                </td>
                                            )}
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{s.course}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{s.personalDetails.dob}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{s.personalDetails.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{s.personalDetails.phone}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                         {totalPages > 1 && (
                            <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t dark:border-gray-700 text-sm">
                                <div>Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length}</div>
                                <div className="flex items-center gap-1 mt-2 md:mt-0">
                                    {['First', 'Prev', 'Next', 'Last'].map(label => {
                                        const isDisabled = (label === 'First' || label === 'Prev') ? currentPage === 1 : currentPage === totalPages;
                                        const newPage = { First: 1, Prev: currentPage - 1, Next: currentPage + 1, Last: totalPages }[label] || 1;
                                        return <button key={label} onClick={() => setCurrentPage(newPage)} disabled={isDisabled} className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600">{label}</button>;
                                    })}
                                </div>
                            </div>
                         )}
                    </>
                    )}
                </div>
            </div>

            {/* Import Modal */}
            {isImportModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg">
                        <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
                            <h2 className="text-xl font-bold">Import Final Student List</h2>
                            <button onClick={() => setIsImportModalOpen(false)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Close modal">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <FileUp className="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400" />
                                        {fileToImport ? (
                                            <>
                                                <p className="mb-2 text-sm font-semibold text-indigo-600">{fileToImport.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{(fileToImport.size / 1024).toFixed(2)} KB</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">CSV, XLS, or XLSX (MAX. 5MB)</p>
                                            </>
                                        )}
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileSelect} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                </label>
                            </div>
                        </div>
                        <div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                            <button onClick={() => { setIsImportModalOpen(false); setFileToImport(null); }} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                Cancel
                            </button>
                            <button
                                onClick={handleImport}
                                disabled={!fileToImport}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Import
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinalAdmissionList;