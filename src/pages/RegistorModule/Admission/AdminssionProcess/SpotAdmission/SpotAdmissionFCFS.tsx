import React, { useState, useMemo, useEffect, ElementType } from 'react';
import { Search, Users, CheckSquare, List, PlusCircle, UploadCloud, Send, X, Download } from 'lucide-react';

// --- TYPES ---
type FcfsCandidate = {
  id: string;
  name: string;
  avatar: string;
  course: string;
  category: 'General' | 'OBC' | 'SC' | 'ST';
  timestamp: string;
};

// --- MOCK DATA ---
const initialFcfsCandidates: FcfsCandidate[] = [
    { id: 'SPOT-F01', name: 'Arjun Verma', avatar: 'AV', course: 'B.Sc Physics', category: 'General', timestamp: '2023-10-27 09:01:15' },
    { id: 'SPOT-F02', name: 'Kiara Iyengar', avatar: 'KI', course: 'B.A. History', category: 'OBC', timestamp: '2023-10-27 09:02:30' },
    { id: 'SPOT-F03', name: 'Rohan Mehta', avatar: 'RM', course: 'B.Sc Chemistry', category: 'General', timestamp: '2023-10-27 09:03:05' },
    { id: 'SPOT-F04', name: 'Priya Kumari', avatar: 'PK', course: 'B.Sc Physics', category: 'ST', timestamp: '2023-10-27 09:04:12' },
    { id: 'SPOT-F05', name: 'Aadi Joshi', avatar: 'AJ', course: 'B.A. History', category: 'General', timestamp: '2023-10-27 09:05:00' },
];

// --- MAIN COMPONENT ---
const FcfsAdmission = () => {
    const [candidates, setCandidates] = useState<FcfsCandidate[]>(initialFcfsCandidates);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [newStudent, setNewStudent] = useState<Omit<FcfsCandidate, 'avatar' | 'timestamp'>>({ id: '', name: '', course: '', category: 'General' });
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => { if (toast) { const timer = setTimeout(() => setToast(null), 4000); return () => clearTimeout(timer); } }, [toast]);

    const filteredCandidates = useMemo(() => candidates.filter((c) => searchTerm === '' || c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm, candidates]);
    const paginatedCandidates = filteredCandidates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);

    const kpiStats = useMemo(() => [
        { title: 'Total FCFS Seats', value: 40, icon: 'Users', color: 'text-indigo-500', bgColor: 'bg-indigo-100 dark:bg-indigo-900/50' },
        { title: 'Seats Filled', value: candidates.length, icon: 'CheckSquare', color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/50' },
        { title: 'Available Courses', value: 5, icon: 'List', color: 'text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-700' },
    ], [candidates]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files.length > 0) setSelectedFile(e.target.files[0]) };
    const handleImportSuccess = () => { if (!selectedFile) return; setIsImportModalOpen(false); setToast({ message: `Successfully imported student list from ${selectedFile.name}.`, type: 'success' }); setSelectedFile(null); };
    const closeImportModal = () => { setIsImportModalOpen(false); setSelectedFile(null); };
    const handleDownloadSample = () => {
        const csvContent = "data:text/csv;charset=utf-8," + "id,name,course,category,timestamp\n" + "SPOT-F99,Sample Student,B.Sc Physics,General,2023-10-28 10:00:00\n";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "sample_fcfs_list.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleAddStudent = (e: React.FormEvent) => {
        e.preventDefault();
        const newCandidate: FcfsCandidate = {
            ...newStudent,
            avatar: newStudent.name.split(' ').map(n => n[0]).join('').toUpperCase(),
            timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        setCandidates(prev => [newCandidate, ...prev]);
        setIsAddStudentModalOpen(false);
        setToast({ message: `Student ${newStudent.name} added successfully.`, type: 'success' });
        setNewStudent({ id: '', name: '', course: '', category: 'General' });
    };

    const handleSendCredentials = () => { if (candidates.length > 0) setToast({ message: `Credentials sent to all ${candidates.length} candidates.`, type: 'info' }) };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {toast && (<div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`} role="alert">{toast.type === 'success' ? <PlusCircle className="w-6 h-6" /> : <Send className="w-6 h-6" />}<p>{toast.message}</p></div>)}
                <header className="mb-8"><h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">FCFS Spot Admission</h1><p className="text-gray-500 dark:text-gray-400 mt-1">Manage admissions for available seats on a first-come, first-serve basis.</p></header>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">{kpiStats.map((item, index) => { const IconComponent: { [key: string]: ElementType } = { Users, CheckSquare, List }; const Icon = IconComponent[item.icon]; return (<div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-transform duration-300"><div className="flex items-start justify-between"><div className={`p-3 rounded-lg ${item.bgColor}`}><Icon className={`w-6 h-6 ${item.color}`} /></div><p className="text-3xl font-bold text-gray-900 dark:text-white">{item.value}</p></div><div className="mt-4"><p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{item.title}</p></div></div>);})}</div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 mb-6"><div className="flex flex-col sm:flex-row items-center justify-between gap-4"><div className="relative w-full sm:w-72"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Search by name or ID..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div><div className="flex items-center gap-2 w-full sm:w-auto flex-wrap justify-end"><button onClick={() => setIsAddStudentModalOpen(true)} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"><PlusCircle className="w-4 h-4" /> Add Student</button><button onClick={() => setIsImportModalOpen(true)} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"><UploadCloud className="w-4 h-4" /> Import List</button><button onClick={handleSendCredentials} disabled={candidates.length === 0} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"><Send className="w-4 h-4" /> Send Credentials</button></div></div></div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md">{filteredCandidates.length === 0 ? (<div className="text-center py-20 text-gray-400 dark:text-gray-500"><Search className="mx-auto h-12 w-12 mb-4" /><h3 className="text-lg font-semibold">No candidates found</h3><p>Add a student or import a list to get started.</p></div>) : (<><div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-700 dark:text-gray-400"><tr><th className="px-6 py-4 whitespace-nowrap">Candidate</th><th className="px-6 py-4 whitespace-nowrap">Course</th><th className="px-6 py-4 whitespace-nowrap">Category</th><th className="px-6 py-4 whitespace-nowrap">Applied On</th></tr></thead><tbody>{paginatedCandidates.map((c) => (<tr key={c.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3 whitespace-nowrap"><div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-sm">{c.avatar}</div><div>{c.name}<p className="text-xs font-mono text-gray-500 dark:text-gray-400">{c.id}</p></div></td><td className="px-6 py-4 whitespace-nowrap">{c.course}</td><td className="px-6 py-4 whitespace-nowrap">{c.category}</td><td className="px-6 py-4 whitespace-nowrap font-mono text-xs">{c.timestamp}</td></tr>))}</tbody></table></div>{totalPages > 1 && (<div className="flex flex-col md:flex-row justify-between items-center p-4 border-t dark:border-gray-700 text-sm"><div className="mb-2 md:mb-0">Showing <span className="font-semibold">{((currentPage - 1) * itemsPerPage) + 1}</span>-<span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredCandidates.length)}</span> of <span className="font-semibold">{filteredCandidates.length}</span></div><div className="flex items-center gap-1">{['First', 'Prev', 'Next', 'Last'].map(label => { const isDisabled = (label === 'First' || label === 'Prev') ? currentPage === 1 : currentPage === totalPages; const newPage = { First: 1, Prev: currentPage - 1, Next: currentPage + 1, Last: totalPages }[label] || 1; return <button key={label} onClick={() => setCurrentPage(newPage)} disabled={isDisabled} className="px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">{label}</button>;})}</div></div>)}</>)}</div>
                {isAddStudentModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"><form onSubmit={handleAddStudent} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md"><div className="flex justify-between items-center p-5 border-b dark:border-gray-700"><h2 className="text-xl font-bold">Add FCFS Student</h2><button type="button" onClick={() => setIsAddStudentModalOpen(false)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button></div><div className="p-6 space-y-4"><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1">Student ID</label><input type="text" value={newStudent.id} onChange={(e) => setNewStudent({...newStudent, id: e.target.value})} required className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg" /></div><div><label className="block text-sm font-medium mb-1">Full Name</label><input type="text" value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} required className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg" /></div></div><div><label className="block text-sm font-medium mb-1">Course</label><input type="text" value={newStudent.course} onChange={(e) => setNewStudent({...newStudent, course: e.target.value})} required className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg" /></div><div><label className="block text-sm font-medium mb-1">Category</label><select value={newStudent.category} onChange={(e) => setNewStudent({...newStudent, category: e.target.value as FcfsCandidate['category']})} className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg"><option>General</option><option>OBC</option><option>SC</option><option>ST</option></select></div></div><div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl"><button type="button" onClick={() => setIsAddStudentModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button><button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">Save Student</button></div></form></div>)}
                {isImportModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"><div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg"><div className="flex justify-between items-center p-5 border-b dark:border-gray-700"><h2 className="text-xl font-bold">Upload FCFS List</h2><button onClick={closeImportModal} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button></div><div className="p-8"><div className="flex items-center justify-center w-full"><label htmlFor="dropzone-file-fcfs" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">{!selectedFile ? (<div className="flex flex-col items-center justify-center pt-5 pb-6"><UploadCloud className="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400" /><p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p></div>) : (<div className="flex flex-col items-center justify-center pt-5 pb-6"><List className="w-10 h-10 mb-4 text-green-500" /><p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">{selectedFile.name}</p></div>)}<input id="dropzone-file-fcfs" type="file" className="hidden" onChange={handleFileChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/></label></div> <div className="text-center mt-4"><button onClick={handleDownloadSample} className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"><Download className="w-4 h-4" />Download sample format</button></div></div><div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl"><button onClick={closeImportModal} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button><button onClick={handleImportSuccess} disabled={!selectedFile} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Import and Verify</button></div></div></div>)}
            </div>
        </div>
    );
};

export default FcfsAdmission;
