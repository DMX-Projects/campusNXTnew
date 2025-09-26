import React, { useState, useMemo, useEffect, ElementType } from 'react';
import { Search, Filter, Bell, UploadCloud, Send, Users, BookOpen, X, Layers, Download } from 'lucide-react';

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
const initialPhase1Candidates: Candidate[] = [
  { id: 'ALLOT001', name: 'Aarav Sharma', avatar: 'AS', rank: 150, course: 'B.Tech CSE', category: 'General' },
  { id: 'ALLOT002', name: 'Diya Patel', avatar: 'DP', rank: 210, course: 'B.Tech ECE', category: 'OBC' },
  { id: 'ALLOT003', name: 'Rohan Verma', avatar: 'RV', rank: 320, course: 'B.Tech CSE', category: 'General' },
  { id: 'ALLOT004', name: 'Priya Singh', avatar: 'PS', rank: 450, course: 'B.Com', category: 'SC' },
  { id: 'ALLOT005', name: 'Aditya Kumar', avatar: 'AK', rank: 180, course: 'B.Tech CSE', category: 'OBC' },
  { id: 'ALLOT006', name: 'Ananya Gupta', avatar: 'AG', rank: 500, course: 'MBA', category: 'General' },
  { id: 'ALLOT007', name: 'Kabir Das', avatar: 'KD', rank: 250, course: 'B.Tech ECE', category: 'General' },
  { id: 'ALLOT008', name: 'Ishaan Reddy', avatar: 'IR', rank: 600, course: 'MBA', category: 'OBC' },
  { id: 'ALLOT009', name: 'Meera Iyer', avatar: 'MI', rank: 350, course: 'B.Com', category: 'General' },
  { id: 'ALLOT010', name: 'Arjun Menon', avatar: 'AM', rank: 120, course: 'B.Tech CSE', category: 'General' },
  { id: 'ALLOT011', name: 'Saanvi Chen', avatar: 'SC', rank: 700, course: 'B.Sc Physics', category: 'General' },
  { id: 'ALLOT012', name: 'Vivaan Joshi', avatar: 'VJ', rank: 410, course: 'B.Com', category: 'ST' },
  { id: 'ALLOT013', name: 'Zara Khan', avatar: 'ZK', rank: 190, course: 'B.Tech CSE', category: 'General' },
  { id: 'ALLOT014', name: 'Aryan Singh', avatar: 'AS', rank: 220, course: 'B.Tech ECE', category: 'OBC' },
  { id: 'ALLOT015', name: 'Naina Rao', avatar: 'NR', rank: 330, course: 'B.Tech CSE', category: 'SC' },
  { id: 'ALLOT016', name: 'Advik Mehta', avatar: 'AM', rank: 800, course: 'BBA', category: 'General' },
  { id: 'ALLOT017', name: 'Kyra Desai', avatar: 'KD', rank: 810, course: 'BBA', category: 'OBC' },
  { id: 'ALLOT018', name: 'Vihaan Shah', avatar: 'VS', rank: 340, course: 'B.Tech ECE', category: 'General' },
];

const initialPhase2Candidates: Candidate[] = [
    { id: 'ALLOT101', name: 'Ishita Verma', avatar: 'IV', rank: 850, course: 'B.Tech ECE', category: 'General' },
    { id: 'ALLOT102', name: 'Reyansh Gupta', avatar: 'RG', rank: 870, course: 'B.Com', category: 'OBC' },
    { id: 'ALLOT103', name: 'Anika Reddy', avatar: 'AR', rank: 890, course: 'BBA', category: 'General' },
    { id: 'ALLOT104', name: 'Arnav Choudhary', avatar: 'AC', rank: 910, course: 'B.Sc Physics', category: 'SC' },
    { id: 'ALLOT105', name: 'Myra Singh', avatar: 'MS', rank: 920, course: 'MBA', category: 'General' },
    { id: 'ALLOT106', name: 'Sai Kumar', avatar: 'SK', rank: 930, course: 'B.Tech CSE', category: 'OBC' },
    { id: 'ALLOT107', name: 'Kiara Patel', avatar: 'KP', rank: 950, course: 'B.Tech ECE', category: 'ST' },
    { id: 'ALLOT108', name: 'Yash Sharma', avatar: 'YS', rank: 980, course: 'B.Com', category: 'General' },
];

const initialPhase3Candidates: Candidate[] = [
    { id: 'ALLOT201', name: 'Riya Singh', avatar: 'RS', rank: 1010, course: 'B.Tech CSE', category: 'General' },
    { id: 'ALLOT202', name: 'Ayaan Khan', avatar: 'AK', rank: 1050, course: 'BBA', category: 'OBC' },
    { id: 'ALLOT203', name: 'Anvi Sharma', avatar: 'AS', rank: 1100, course: 'MBA', category: 'SC' },
    { id: 'ALLOT204', name: 'Dhruv Gupta', avatar: 'DG', rank: 1120, course: 'B.Com', category: 'General' },
    { id: 'ALLOT205', name: 'Sana Patel', avatar: 'SP', rank: 1150, course: 'B.Tech ECE', category: 'ST' },
];

// --- SEPARATE COMPONENT FOR PHASE I ---
const SeatAllotmentPhaseI = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialPhase1Candidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
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
    return [ { title: 'Total Allotted', value: candidates.length, icon: 'Users', color: 'text-indigo-500', bgColor: 'bg-indigo-100 dark:bg-indigo-900/50' }, ...topCoursesStats ];
  }, [candidates]);

  const handleSendCredentials = () => { if (candidates.length > 0) setToast({ message: `Credentials sent to all ${candidates.length} candidates.`, type: 'info' }) };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files.length > 0) setSelectedFile(e.target.files[0]) };
  const handleImportSuccess = () => { if (!selectedFile) return; setIsImportModalOpen(false); setToast({ message: `Successfully imported student list from ${selectedFile.name}.`, type: 'success' }); setSelectedFile(null); };
  const closeImportModal = () => { setIsImportModalOpen(false); setSelectedFile(null); };
  const handleDownloadSample = () => {
    const csvContent = "data:text/csv;charset=utf-8," + "id,name,avatar,rank,course,category\n" + "ALLOT999,Sample Student,SS,999,B.Tech CSE,General\n" + "ALLOT998,Another Student,AS,998,B.Tech ECE,OBC\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sample_student_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const openFilterModal = () => { setTempFilters(filters); setIsFilterModalOpen(true); };
  const applyFilters = () => { setFilters(tempFilters); setIsFilterModalOpen(false); setCurrentPage(1); };
  const resetFilters = () => { const reset = { course: 'All', category: 'All' }; setTempFilters(reset); setFilters(reset); setIsFilterModalOpen(false); setCurrentPage(1); };

  return (
    <div>
        {toast && (<div className={`fixed top-20 right-5 z-[100] flex items-center gap-3 p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`} role="alert">{toast.type === 'success' ? <UploadCloud className="w-6 h-6" /> : <Bell className="w-6 h-6" />}<p>{toast.message}</p></div>)}
        <header className="mb-8"><h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Seat Allotment - Phase 1</h1><p className="text-gray-500 dark:text-gray-400 mt-1">Manage the initial list of allotted students.</p></header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">{kpiStats.map((item, index) => { const IconComponent: { [key: string]: ElementType } = { Users, BookOpen, Layers }; const Icon = IconComponent[item.icon]; return (<div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-transform duration-300"><div className="flex items-start justify-between"><div className={`p-3 rounded-lg ${item.bgColor}`}><Icon className={`w-6 h-6 ${item.color}`} /></div><p className="text-3xl font-bold text-gray-900 dark:text-white">{item.value}</p></div><div className="mt-4"><p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{item.title}</p></div></div>);})}</div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 mb-6"><div className="flex flex-col sm:flex-row items-center justify-between gap-4"><div className="relative w-full sm:w-72"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Search by name or ID..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div><div className="flex items-center gap-2 w-full sm:w-auto flex-wrap justify-end"><button onClick={openFilterModal} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Filter className="w-4 h-4" /> Filters</button><button onClick={() => setIsImportModalOpen(true)} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"><UploadCloud className="w-4 h-4" /> Import List</button><button onClick={handleSendCredentials} disabled={candidates.length === 0} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"><Send className="w-4 h-4" /> Send Credentials</button></div></div></div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md">{filteredCandidates.length === 0 ? (<div className="text-center py-20 text-gray-400 dark:text-gray-500"><Search className="mx-auto h-12 w-12 mb-4" /><h3 className="text-lg font-semibold">No candidates found</h3><p>Try adjusting your search/filters or import a new list.</p></div>) : (<><div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-700 dark:text-gray-400"><tr><th className="px-6 py-4 whitespace-nowrap">Candidate</th><th className="px-6 py-4 whitespace-nowrap">Rank</th><th className="px-6 py-4 whitespace-nowrap">Course</th><th className="px-6 py-4 whitespace-nowrap">Category</th></tr></thead><tbody>{paginatedCandidates.map((c) => (<tr key={c.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3 whitespace-nowrap"><div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-sm">{c.avatar}</div><div>{c.name}<p className="text-xs font-mono text-gray-500 dark:text-gray-400">{c.id}</p></div></td><td className="px-6 py-4 font-semibold whitespace-nowrap">{c.rank}</td><td className="px-6 py-4 whitespace-nowrap">{c.course}</td><td className="px-6 py-4 whitespace-nowrap">{c.category}</td></tr>))}</tbody></table></div>{totalPages > 1 && (<div className="flex flex-col md:flex-row justify-between items-center p-4 border-t dark:border-gray-700 text-sm"><div className="mb-2 md:mb-0">Showing <span className="font-semibold">{((currentPage - 1) * itemsPerPage) + 1}</span>-<span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredCandidates.length)}</span> of <span className="font-semibold">{filteredCandidates.length}</span></div><div className="flex items-center gap-1">{['First', 'Prev', 'Next', 'Last'].map(label => { const isDisabled = (label === 'First' || label === 'Prev') ? currentPage === 1 : currentPage === totalPages; const newPage = { First: 1, Prev: currentPage - 1, Next: currentPage + 1, Last: totalPages }[label] || 1; return <button key={label} onClick={() => setCurrentPage(newPage)} disabled={isDisabled} className="px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">{label}</button>;})}</div></div>)}</>)}</div>
        {isFilterModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"><div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md"><div className="flex justify-between items-center p-5 border-b dark:border-gray-700"><h2 className="text-xl font-bold">Filter Candidates</h2><button onClick={() => setIsFilterModalOpen(false)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button></div><div className="p-6 space-y-4">{['course', 'category'].map(filterKey => (<div key={filterKey}><label className="block text-sm font-medium mb-1 capitalize">{filterKey}</label><select value={tempFilters[filterKey as keyof typeof tempFilters]} onChange={(e) => setTempFilters({ ...tempFilters, [filterKey]: e.target.value })} className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"><option>All</option>{[...new Set(initialPhase1Candidates.map(c => c[filterKey as keyof Candidate]))].map(opt => <option key={String(opt)}>{String(opt)}</option>)}</select></div>))}</div><div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl"><button onClick={resetFilters} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Reset</button><button onClick={applyFilters} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">Apply Filters</button></div></div></div>)}
        {isImportModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"><div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg"><div className="flex justify-between items-center p-5 border-b dark:border-gray-700"><h2 className="text-xl font-bold">Upload Student List</h2><button onClick={closeImportModal} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button></div><div className="p-8"><div className="flex items-center justify-center w-full"><label htmlFor="dropzone-file-1" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">{!selectedFile ? (<div className="flex flex-col items-center justify-center pt-5 pb-6"><UploadCloud className="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400" /><p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p><p className="text-xs text-gray-500 dark:text-gray-400">CSV, XLS, or XLSX (MAX. 5MB)</p></div>) : (<div className="flex flex-col items-center justify-center pt-5 pb-6"><BookOpen className="w-10 h-10 mb-4 text-green-500" /><p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">{selectedFile.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">File selected. Ready to import.</p></div>)}<input id="dropzone-file-1" type="file" className="hidden" onChange={handleFileChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/></label></div> <div className="text-center mt-4"><button onClick={handleDownloadSample} className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"><Download className="w-4 h-4" />Download sample format</button></div></div><div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl"><button onClick={closeImportModal} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button><button onClick={handleImportSuccess} disabled={!selectedFile} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Import and Verify</button></div></div></div>)}
    </div>
  );
};

// --- SEPARATE COMPONENT FOR PHASE II ---
const SeatAllotmentPhaseII = () => {
    const [candidates, setCandidates] = useState<Candidate[]>(initialPhase2Candidates);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
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
        return [ { title: 'Total Allotted', value: candidates.length, icon: 'Users', color: 'text-indigo-500', bgColor: 'bg-indigo-100 dark:bg-indigo-900/50' }, ...topCoursesStats ];
      }, [candidates]);
  
    const handleSendCredentials = () => { if (candidates.length > 0) setToast({ message: `Credentials sent to all ${candidates.length} candidates.`, type: 'info' }) };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files.length > 0) setSelectedFile(e.target.files[0]) };
    const handleImportSuccess = () => { if (!selectedFile) return; setIsImportModalOpen(false); setToast({ message: `Successfully imported student list from ${selectedFile.name}.`, type: 'success' }); setSelectedFile(null); };
    const closeImportModal = () => { setIsImportModalOpen(false); setSelectedFile(null); };
    const handleDownloadSample = () => {
      const csvContent = "data:text/csv;charset=utf-8," + "id,name,avatar,rank,course,category\n" + "ALLOT999,Sample Student,SS,999,B.Tech CSE,General\n" + "ALLOT998,Another Student,AS,998,B.Tech ECE,OBC\n";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "sample_student_list.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    const openFilterModal = () => { setTempFilters(filters); setIsFilterModalOpen(true); };
    const applyFilters = () => { setFilters(tempFilters); setIsFilterModalOpen(false); setCurrentPage(1); };
    const resetFilters = () => { const reset = { course: 'All', category: 'All' }; setTempFilters(reset); setFilters(reset); setIsFilterModalOpen(false); setCurrentPage(1); };
  
    return (
      <div>
          {toast && (<div className={`fixed top-20 right-5 z-[100] flex items-center gap-3 p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`} role="alert">{toast.type === 'success' ? <UploadCloud className="w-6 h-6" /> : <Bell className="w-6 h-6" />}<p>{toast.message}</p></div>)}
          <header className="mb-8"><h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Seat Allotment - Phase 2</h1><p className="text-gray-500 dark:text-gray-400 mt-1">Manage the second list of allotted students.</p></header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">{kpiStats.map((item, index) => { const IconComponent: { [key: string]: ElementType } = { Users, BookOpen, Layers }; const Icon = IconComponent[item.icon]; return (<div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-transform duration-300"><div className="flex items-start justify-between"><div className={`p-3 rounded-lg ${item.bgColor}`}><Icon className={`w-6 h-6 ${item.color}`} /></div><p className="text-3xl font-bold text-gray-900 dark:text-white">{item.value}</p></div><div className="mt-4"><p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{item.title}</p></div></div>);})}</div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 mb-6"><div className="flex flex-col sm:flex-row items-center justify-between gap-4"><div className="relative w-full sm:w-72"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Search by name or ID..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div><div className="flex items-center gap-2 w-full sm:w-auto flex-wrap justify-end"><button onClick={openFilterModal} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Filter className="w-4 h-4" /> Filters</button><button onClick={() => setIsImportModalOpen(true)} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"><UploadCloud className="w-4 h-4" /> Import List</button><button onClick={handleSendCredentials} disabled={candidates.length === 0} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"><Send className="w-4 h-4" /> Send Credentials</button></div></div></div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md">{filteredCandidates.length === 0 ? (<div className="text-center py-20 text-gray-400 dark:text-gray-500"><Search className="mx-auto h-12 w-12 mb-4" /><h3 className="text-lg font-semibold">No candidates found</h3><p>Try adjusting your search/filters or import a new list.</p></div>) : (<><div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-700 dark:text-gray-400"><tr><th className="px-6 py-4 whitespace-nowrap">Candidate</th><th className="px-6 py-4 whitespace-nowrap">Rank</th><th className="px-6 py-4 whitespace-nowrap">Course</th><th className="px-6 py-4 whitespace-nowrap">Category</th></tr></thead><tbody>{paginatedCandidates.map((c) => (<tr key={c.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3 whitespace-nowrap"><div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-sm">{c.avatar}</div><div>{c.name}<p className="text-xs font-mono text-gray-500 dark:text-gray-400">{c.id}</p></div></td><td className="px-6 py-4 font-semibold whitespace-nowrap">{c.rank}</td><td className="px-6 py-4 whitespace-nowrap">{c.course}</td><td className="px-6 py-4 whitespace-nowrap">{c.category}</td></tr>))}</tbody></table></div>{totalPages > 1 && (<div className="flex flex-col md:flex-row justify-between items-center p-4 border-t dark:border-gray-700 text-sm"><div className="mb-2 md:mb-0">Showing <span className="font-semibold">{((currentPage - 1) * itemsPerPage) + 1}</span>-<span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredCandidates.length)}</span> of <span className="font-semibold">{filteredCandidates.length}</span></div><div className="flex items-center gap-1">{['First', 'Prev', 'Next', 'Last'].map(label => { const isDisabled = (label === 'First' || label === 'Prev') ? currentPage === 1 : currentPage === totalPages; const newPage = { First: 1, Prev: currentPage - 1, Next: currentPage + 1, Last: totalPages }[label] || 1; return <button key={label} onClick={() => setCurrentPage(newPage)} disabled={isDisabled} className="px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">{label}</button>;})}</div></div>)}</>)}</div>
          {isFilterModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"><div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md"><div className="flex justify-between items-center p-5 border-b dark:border-gray-700"><h2 className="text-xl font-bold">Filter Candidates</h2><button onClick={() => setIsFilterModalOpen(false)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button></div><div className="p-6 space-y-4">{['course', 'category'].map(filterKey => (<div key={filterKey}><label className="block text-sm font-medium mb-1 capitalize">{filterKey}</label><select value={tempFilters[filterKey as keyof typeof tempFilters]} onChange={(e) => setTempFilters({ ...tempFilters, [filterKey]: e.target.value })} className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"><option>All</option>{[...new Set(initialPhase2Candidates.map(c => c[filterKey as keyof Candidate]))].map(opt => <option key={String(opt)}>{String(opt)}</option>)}</select></div>))}</div><div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl"><button onClick={resetFilters} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Reset</button><button onClick={applyFilters} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">Apply Filters</button></div></div></div>)}
          {isImportModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"><div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg"><div className="flex justify-between items-center p-5 border-b dark:border-gray-700"><h2 className="text-xl font-bold">Upload Student List</h2><button onClick={closeImportModal} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button></div><div className="p-8"><div className="flex items-center justify-center w-full"><label htmlFor="dropzone-file-2" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">{!selectedFile ? (<div className="flex flex-col items-center justify-center pt-5 pb-6"><UploadCloud className="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400" /><p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p><p className="text-xs text-gray-500 dark:text-gray-400">CSV, XLS, or XLSX (MAX. 5MB)</p></div>) : (<div className="flex flex-col items-center justify-center pt-5 pb-6"><BookOpen className="w-10 h-10 mb-4 text-green-500" /><p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">{selectedFile.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">File selected. Ready to import.</p></div>)}<input id="dropzone-file-2" type="file" className="hidden" onChange={handleFileChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/></label></div> <div className="text-center mt-4"><button onClick={handleDownloadSample} className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"><Download className="w-4 h-4" />Download sample format</button></div></div><div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl"><button onClick={closeImportModal} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button><button onClick={handleImportSuccess} disabled={!selectedFile} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Import and Verify</button></div></div></div>)}
      </div>
    );
  };

// --- SEPARATE COMPONENT FOR PHASE III ---
const SeatAllotmentPhaseIII = () => {
    const [candidates, setCandidates] = useState<Candidate[]>(initialPhase3Candidates);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
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
        return [ { title: 'Total Allotted', value: candidates.length, icon: 'Users', color: 'text-indigo-500', bgColor: 'bg-indigo-100 dark:bg-indigo-900/50' }, ...topCoursesStats ];
      }, [candidates]);
  
    const handleSendCredentials = () => { if (candidates.length > 0) setToast({ message: `Credentials sent to all ${candidates.length} candidates.`, type: 'info' }) };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files.length > 0) setSelectedFile(e.target.files[0]) };
    const handleImportSuccess = () => { if (!selectedFile) return; setIsImportModalOpen(false); setToast({ message: `Successfully imported student list from ${selectedFile.name}.`, type: 'success' }); setSelectedFile(null); };
    const closeImportModal = () => { setIsImportModalOpen(false); setSelectedFile(null); };
    const handleDownloadSample = () => {
      const csvContent = "data:text/csv;charset=utf-8," + "id,name,avatar,rank,course,category\n" + "ALLOT999,Sample Student,SS,999,B.Tech CSE,General\n" + "ALLOT998,Another Student,AS,998,B.Tech ECE,OBC\n";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "sample_student_list.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    const openFilterModal = () => { setTempFilters(filters); setIsFilterModalOpen(true); };
    const applyFilters = () => { setFilters(tempFilters); setIsFilterModalOpen(false); setCurrentPage(1); };
    const resetFilters = () => { const reset = { course: 'All', category: 'All' }; setTempFilters(reset); setFilters(reset); setIsFilterModalOpen(false); setCurrentPage(1); };
  
    return (
      <div>
          {toast && (<div className={`fixed top-20 right-5 z-[100] flex items-center gap-3 p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`} role="alert">{toast.type === 'success' ? <UploadCloud className="w-6 h-6" /> : <Bell className="w-6 h-6" />}<p>{toast.message}</p></div>)}
          <header className="mb-8"><h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Seat Allotment - Phase 3</h1><p className="text-gray-500 dark:text-gray-400 mt-1">Manage the third list of allotted students.</p></header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">{kpiStats.map((item, index) => { const IconComponent: { [key: string]: ElementType } = { Users, BookOpen, Layers }; const Icon = IconComponent[item.icon]; return (<div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-transform duration-300"><div className="flex items-start justify-between"><div className={`p-3 rounded-lg ${item.bgColor}`}><Icon className={`w-6 h-6 ${item.color}`} /></div><p className="text-3xl font-bold text-gray-900 dark:text-white">{item.value}</p></div><div className="mt-4"><p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{item.title}</p></div></div>);})}</div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 mb-6"><div className="flex flex-col sm:flex-row items-center justify-between gap-4"><div className="relative w-full sm:w-72"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Search by name or ID..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div><div className="flex items-center gap-2 w-full sm:w-auto flex-wrap justify-end"><button onClick={openFilterModal} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Filter className="w-4 h-4" /> Filters</button><button onClick={() => setIsImportModalOpen(true)} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"><UploadCloud className="w-4 h-4" /> Import List</button><button onClick={handleSendCredentials} disabled={candidates.length === 0} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"><Send className="w-4 h-4" /> Send Credentials</button></div></div></div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md">{filteredCandidates.length === 0 ? (<div className="text-center py-20 text-gray-400 dark:text-gray-500"><Search className="mx-auto h-12 w-12 mb-4" /><h3 className="text-lg font-semibold">No candidates found</h3><p>Try adjusting your search/filters or import a new list.</p></div>) : (<><div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-700 dark:text-gray-400"><tr><th className="px-6 py-4 whitespace-nowrap">Candidate</th><th className="px-6 py-4 whitespace-nowrap">Rank</th><th className="px-6 py-4 whitespace-nowrap">Course</th><th className="px-6 py-4 whitespace-nowrap">Category</th></tr></thead><tbody>{paginatedCandidates.map((c) => (<tr key={c.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3 whitespace-nowrap"><div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-sm">{c.avatar}</div><div>{c.name}<p className="text-xs font-mono text-gray-500 dark:text-gray-400">{c.id}</p></div></td><td className="px-6 py-4 font-semibold whitespace-nowrap">{c.rank}</td><td className="px-6 py-4 whitespace-nowrap">{c.course}</td><td className="px-6 py-4 whitespace-nowrap">{c.category}</td></tr>))}</tbody></table></div>{totalPages > 1 && (<div className="flex flex-col md:flex-row justify-between items-center p-4 border-t dark:border-gray-700 text-sm"><div className="mb-2 md:mb-0">Showing <span className="font-semibold">{((currentPage - 1) * itemsPerPage) + 1}</span>-<span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredCandidates.length)}</span> of <span className="font-semibold">{filteredCandidates.length}</span></div><div className="flex items-center gap-1">{['First', 'Prev', 'Next', 'Last'].map(label => { const isDisabled = (label === 'First' || label === 'Prev') ? currentPage === 1 : currentPage === totalPages; const newPage = { First: 1, Prev: currentPage - 1, Next: currentPage + 1, Last: totalPages }[label] || 1; return <button key={label} onClick={() => setCurrentPage(newPage)} disabled={isDisabled} className="px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">{label}</button>;})}</div></div>)}</>)}</div>
          {isFilterModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"><div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md"><div className="flex justify-between items-center p-5 border-b dark:border-gray-700"><h2 className="text-xl font-bold">Filter Candidates</h2><button onClick={() => setIsFilterModalOpen(false)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button></div><div className="p-6 space-y-4">{['course', 'category'].map(filterKey => (<div key={filterKey}><label className="block text-sm font-medium mb-1 capitalize">{filterKey}</label><select value={tempFilters[filterKey as keyof typeof tempFilters]} onChange={(e) => setTempFilters({ ...tempFilters, [filterKey]: e.target.value })} className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"><option>All</option>{[...new Set(initialPhase3Candidates.map(c => c[filterKey as keyof Candidate]))].map(opt => <option key={String(opt)}>{String(opt)}</option>)}</select></div>))}</div><div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl"><button onClick={resetFilters} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Reset</button><button onClick={applyFilters} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">Apply Filters</button></div></div></div>)}
          {isImportModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"><div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg"><div className="flex justify-between items-center p-5 border-b dark:border-gray-700"><h2 className="text-xl font-bold">Upload Student List</h2><button onClick={closeImportModal} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button></div><div className="p-8"><div className="flex items-center justify-center w-full"><label htmlFor="dropzone-file-3" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">{!selectedFile ? (<div className="flex flex-col items-center justify-center pt-5 pb-6"><UploadCloud className="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400" /><p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p><p className="text-xs text-gray-500 dark:text-gray-400">CSV, XLS, or XLSX (MAX. 5MB)</p></div>) : (<div className="flex flex-col items-center justify-center pt-5 pb-6"><BookOpen className="w-10 h-10 mb-4 text-green-500" /><p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">{selectedFile.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">File selected. Ready to import.</p></div>)}<input id="dropzone-file-3" type="file" className="hidden" onChange={handleFileChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/></label></div> <div className="text-center mt-4"><button onClick={handleDownloadSample} className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"><Download className="w-4 h-4" />Download sample format</button></div></div><div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl"><button onClick={closeImportModal} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button><button onClick={handleImportSuccess} disabled={!selectedFile} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Import and Verify</button></div></div></div>)}
      </div>
    );
  };


// --- MAIN DASHBOARD CONTAINER ---
const SeatAllotmentDashboard = () => {
  const [activePhase, setActivePhase] = useState<'phase1' | 'phase2' | 'phase3'>('phase1');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-4 sm:space-x-6 overflow-x-auto" aria-label="Tabs">
            <button
              onClick={() => setActivePhase('phase1')}
              className={`${
                activePhase === 'phase1'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Phase 1 Allotment
            </button>
            <button
              onClick={() => setActivePhase('phase2')}
              className={`${
                activePhase === 'phase2'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Phase 2 Allotment
            </button>
            <button
              onClick={() => setActivePhase('phase3')}
              className={`${
                activePhase === 'phase3'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Phase 3 Allotment
            </button>
          </nav>
        </div>

        {activePhase === 'phase1' && <SeatAllotmentPhaseI />}
        {activePhase === 'phase2' && <SeatAllotmentPhaseII />}
        {activePhase === 'phase3' && <SeatAllotmentPhaseIII />}
      </div>
    </div>
  );
};

export default SeatAllotmentDashboard;