import React, { useState, useMemo, useEffect, ElementType } from 'react';
import { Search, Filter, Bell, UploadCloud, Send, Users, BookOpen, X, Layers, Download, PlusCircle, Eye } from 'lucide-react';

// --- TYPES ---
type Candidate = {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  course: string;
  category: 'General' | 'OBC' | 'SC' | 'ST';
};

// --- MOCK DATA ---
const initialManagementCandidates: Candidate[] = [
    { id: 'MGMT001', name: 'Kabir Mehra', avatar: 'KM', rank: 0, course: 'B.Tech CSE', category: 'General' },
    { id: 'MGMT002', name: 'Shanaya Singh', avatar: 'SS', rank: 0, course: 'MBA', category: 'General' },
    { id: 'MGMT003', name: 'Aarush Khanna', avatar: 'AK', rank: 0, course: 'B.Com', category: 'General' },
];

// --- MANAGEMENT QUOTA COMPONENT ---
const ManagementAdmissionProcess = () => {
    const [candidates, setCandidates] = useState<Candidate[]>(initialManagementCandidates);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
    const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);
    const [newStudent, setNewStudent] = useState<Omit<Candidate, 'rank'>>({ id: '', name: '', avatar: '', course: '', category: 'General' });
    
    const [filters, setFilters] = useState({ course: 'All', category: 'All' });
    const [tempFilters, setTempFilters] = useState(filters);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
    useEffect(() => {
      if (toast) {
        const timer = setTimeout(() => setToast(null), 4000);
        return () => clearTimeout(timer);
      }
    }, [toast]);
  
    const filteredCandidates = useMemo(
      () =>
        candidates
          .filter(
            (c) =>
              searchTerm === '' ||
              c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              c.id.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((c) => filters.course === 'All' || c.course === filters.course)
          .filter((c) => filters.category === 'All' || c.category === filters.category),
      [searchTerm, filters, candidates]
    );
  
    const paginatedCandidates = filteredCandidates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  
    const kpiStats = useMemo(() => {
        const courseCounts = candidates.reduce((acc, candidate) => {
          acc[candidate.course] = (acc[candidate.course] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
    
        const sortedCourses = Object.entries(courseCounts).sort(([, a], [, b]) => b - a);
        const TOP_COURSES_DISPLAY_COUNT = 3;
        const topCoursesStats = sortedCourses.slice(0, TOP_COURSES_DISPLAY_COUNT).map(([course, value]) => ({
          title: `${course} Seats`, value, icon: 'BookOpen', color: 'text-sky-500', bgColor: 'bg-sky-100 dark:bg-sky-900/50',
        }));
        if (sortedCourses.length > TOP_COURSES_DISPLAY_COUNT) {
            const otherCoursesCount = sortedCourses.slice(TOP_COURSES_DISPLAY_COUNT).reduce((sum, [, value]) => sum + value, 0);
            topCoursesStats.push({ title: 'Other Departments', value: otherCoursesCount, icon: 'Layers', color: 'text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-700' });
        }
        return [ { title: 'Total Admissions', value: candidates.length, icon: 'Users', color: 'text-indigo-500', bgColor: 'bg-indigo-100 dark:bg-indigo-900/50' }, ...topCoursesStats ];
      }, [candidates]);
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files.length > 0) setSelectedFile(e.target.files[0]) };
    const handleImportSuccess = () => { if (!selectedFile) return; setIsImportModalOpen(false); setToast({ message: `Successfully imported student list from ${selectedFile.name}.`, type: 'success' }); setSelectedFile(null); };
    const closeImportModal = () => { setIsImportModalOpen(false); setSelectedFile(null); };
    const handleDownloadSample = () => {
      const csvContent = "data:text/csv;charset=utf-8," + "id,name,avatar,rank,course,category\n" + "MGMT999,Sample Student,SS,0,B.Tech CSE,General\n";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "sample_management_list.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    const openFilterModal = () => { setTempFilters(filters); setIsFilterModalOpen(true); };
    const applyFilters = () => { setFilters(tempFilters); setIsFilterModalOpen(false); setCurrentPage(1); };
    const resetFilters = () => { const reset = { course: 'All', category: 'All' }; setTempFilters(reset); setFilters(reset); setIsFilterModalOpen(false); setCurrentPage(1); };

    const handleAddStudent = (e: React.FormEvent) => {
        e.preventDefault();
        const newCandidate: Candidate = {
            ...newStudent,
            rank: 0, // Rank is not applicable for management quota
            avatar: newStudent.name.split(' ').map(n => n[0]).join('').toUpperCase()
        };
        setCandidates(prev => [newCandidate, ...prev]);
        setIsAddStudentModalOpen(false);
        setToast({ message: `Student ${newStudent.name} added successfully.`, type: 'success' });
        setNewStudent({ id: '', name: '', avatar: '', course: '', category: 'General' });
    };

    const handleSendIndividualCredentials = (candidate: Candidate) => {
        setToast({ message: `Credentials sent to ${candidate.name}.`, type: 'info' });
        setViewingCandidate(null);
    };

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans pt-20">
        <div className="max-w-7xl mx-auto">
          {toast && (<div className={`fixed top-20 right-5 z-[100] flex items-center gap-3 p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`} role="alert">{toast.type === 'success' ? <PlusCircle className="w-6 h-6" /> : <Bell className="w-6 h-6" />}<p>{toast.message}</p></div>)}
          <header className="mb-8"><h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Management Quota Admissions</h1><p className="text-gray-500 dark:text-gray-400 mt-1">Manage direct admissions through management quota.</p></header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">{kpiStats.map((item, index) => { const IconComponent: { [key: string]: ElementType } = { Users, BookOpen, Layers }; const Icon = IconComponent[item.icon]; return (<div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-transform duration-300"><div className="flex items-start justify-between"><div className={`p-3 rounded-lg ${item.bgColor}`}><Icon className={`w-6 h-6 ${item.color}`} /></div><p className="text-3xl font-bold text-gray-900 dark:text-white">{item.value}</p></div><div className="mt-4"><p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{item.title}</p></div></div>);})}</div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 mb-6"><div className="flex flex-col sm:flex-row items-center justify-between gap-4"><div className="relative w-full sm:w-72"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Search by name or ID..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div><div className="flex items-center gap-2 w-full sm:w-auto flex-wrap justify-end"><button onClick={openFilterModal} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Filter className="w-4 h-4" /> Filters</button><button onClick={() => setIsImportModalOpen(true)} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"><UploadCloud className="w-4 h-4" /> Import List</button><button onClick={() => setIsAddStudentModalOpen(true)} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"><PlusCircle className="w-4 h-4" /> Add Student</button></div></div></div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md">{filteredCandidates.length === 0 ? (<div className="text-center py-20 text-gray-400 dark:text-gray-500"><Search className="mx-auto h-12 w-12 mb-4" /><h3 className="text-lg font-semibold">No candidates found</h3><p>Try adjusting your search/filters or add a new student.</p></div>) : (<><div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-700 dark:text-gray-400"><tr><th className="px-6 py-4 whitespace-nowrap">Candidate</th><th className="px-6 py-4 whitespace-nowrap">Course</th><th className="px-6 py-4 whitespace-nowrap">Category</th><th className="px-6 py-4 whitespace-nowrap text-center">Action</th></tr></thead><tbody>{paginatedCandidates.map((c) => (<tr key={c.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3 whitespace-nowrap"><div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-sm">{c.avatar}</div><div>{c.name}<p className="text-xs font-mono text-gray-500 dark:text-gray-400">{c.id}</p></div></td><td className="px-6 py-4 whitespace-nowrap">{c.course}</td><td className="px-6 py-4 whitespace-nowrap">{c.category}</td><td className="px-6 py-4 text-center"><button onClick={() => setViewingCandidate(c)} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold inline-flex items-center gap-1.5"><Eye size={16} /> View</button></td></tr>))}</tbody></table></div>{totalPages > 1 && (<div className="flex flex-col md:flex-row justify-between items-center p-4 border-t dark:border-gray-700 text-sm"><div className="mb-2 md:mb-0">Showing <span className="font-semibold">{((currentPage - 1) * itemsPerPage) + 1}</span>-<span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredCandidates.length)}</span> of <span className="font-semibold">{filteredCandidates.length}</span></div><div className="flex items-center gap-1">{['First', 'Prev', 'Next', 'Last'].map(label => { const isDisabled = (label === 'First' || label === 'Prev') ? currentPage === 1 : currentPage === totalPages; const newPage = { First: 1, Prev: currentPage - 1, Next: currentPage + 1, Last: totalPages }[label] || 1; return <button key={label} onClick={() => setCurrentPage(newPage)} disabled={isDisabled} className="px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">{label}</button>;})}</div></div>)}</>)}</div>
          {isFilterModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"><div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md"><div className="flex justify-between items-center p-5 border-b dark:border-gray-700"><h2 className="text-xl font-bold">Filter Candidates</h2><button onClick={() => setIsFilterModalOpen(false)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button></div><div className="p-6 space-y-4">{['course', 'category'].map(filterKey => (<div key={filterKey}><label className="block text-sm font-medium mb-1 capitalize">{filterKey}</label><select value={tempFilters[filterKey as keyof typeof tempFilters]} onChange={(e) => setTempFilters({ ...tempFilters, [filterKey]: e.target.value })} className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"><option>All</option>{[...new Set(initialManagementCandidates.map(c => c[filterKey as keyof Candidate]))].map(opt => <option key={String(opt)}>{String(opt)}</option>)}</select></div>))}</div><div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl"><button onClick={resetFilters} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Reset</button><button onClick={applyFilters} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">Apply Filters</button></div></div></div>)}
          {isImportModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"><div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg"><div className="flex justify-between items-center p-5 border-b dark:border-gray-700"><h2 className="text-xl font-bold">Upload Student List</h2><button onClick={closeImportModal} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button></div><div className="p-8"><div className="flex items-center justify-center w-full"><label htmlFor="dropzone-file-4" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">{!selectedFile ? (<div className="flex flex-col items-center justify-center pt-5 pb-6"><UploadCloud className="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400" /><p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p><p className="text-xs text-gray-500 dark:text-gray-400">CSV, XLS, or XLSX (MAX. 5MB)</p></div>) : (<div className="flex flex-col items-center justify-center pt-5 pb-6"><BookOpen className="w-10 h-10 mb-4 text-green-500" /><p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">{selectedFile.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">File selected. Ready to import.</p></div>)}<input id="dropzone-file-4" type="file" className="hidden" onChange={handleFileChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/></label></div> <div className="text-center mt-4"><button onClick={handleDownloadSample} className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"><Download className="w-4 h-4" />Download sample format</button></div></div><div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl"><button onClick={closeImportModal} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button><button onClick={handleImportSuccess} disabled={!selectedFile} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Import and Verify</button></div></div></div>)}
          {isAddStudentModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"><form onSubmit={handleAddStudent} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md"><div className="flex justify-between items-center p-5 border-b dark:border-gray-700"><h2 className="text-xl font-bold">Add New Student</h2><button type="button" onClick={() => setIsAddStudentModalOpen(false)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button></div><div className="p-6 space-y-4">{/* Form Fields */}<div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1">Student ID</label><input type="text" value={newStudent.id} onChange={(e) => setNewStudent({...newStudent, id: e.target.value})} required className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg" /></div><div><label className="block text-sm font-medium mb-1">Full Name</label><input type="text" value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} required className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg" /></div></div><div><label className="block text-sm font-medium mb-1">Course</label><input type="text" value={newStudent.course} onChange={(e) => setNewStudent({...newStudent, course: e.target.value})} required className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg" /></div><div><label className="block text-sm font-medium mb-1">Category</label><select value={newStudent.category} onChange={(e) => setNewStudent({...newStudent, category: e.target.value as Candidate['category']})} className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg"><option>General</option><option>OBC</option><option>SC</option><option>ST</option></select></div></div><div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl"><button type="button" onClick={() => setIsAddStudentModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button><button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">Save Student</button></div></form></div>)}
          {viewingCandidate && (<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"><div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md"><div className="flex justify-between items-center p-5 border-b dark:border-gray-700"><h2 className="text-xl font-bold">Student Details</h2><button onClick={() => setViewingCandidate(null)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button></div><div className="p-6 space-y-4"><div className="flex items-center gap-4"><div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-2xl">{viewingCandidate.avatar}</div><div><h3 className="font-bold text-lg text-gray-900 dark:text-white">{viewingCandidate.name}</h3><p className="text-sm font-mono text-gray-500 dark:text-gray-400">{viewingCandidate.id}</p></div></div><div className="grid grid-cols-2 gap-4 pt-4 text-sm"><div className="text-gray-500 dark:text-gray-400">Course</div><div className="font-semibold text-gray-800 dark:text-gray-200">{viewingCandidate.course}</div><div className="text-gray-500 dark:text-gray-400">Category</div><div className="font-semibold text-gray-800 dark:text-gray-200">{viewingCandidate.category}</div><div className="text-gray-500 dark:text-gray-400">Rank</div><div className="font-semibold text-gray-800 dark:text-gray-200">N/A (Management)</div></div></div><div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl"><button onClick={() => handleSendIndividualCredentials(viewingCandidate)} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-semibold"><Send className="w-4 h-4" /> Send Credentials</button></div></div></div>)}
        </div>
      </div>
    );
};

export default ManagementAdmissionProcess;
