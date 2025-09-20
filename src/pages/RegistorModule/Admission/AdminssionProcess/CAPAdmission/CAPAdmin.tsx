// src/components/CAPAdmin.tsx

import { useState, useMemo } from 'react';
import { Upload, Search, Filter, MoreVertical, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, FileUp, Eye, CheckCircle, Edit } from 'lucide-react';

// --- MOCK DATA (EXPANDED) & TYPES ---
type Status = 'New' | 'Pending' | 'Processed';
type Candidate = {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  course: string;
  category: 'General' | 'OBC' | 'SC' | 'ST';
  round: 1 | 2 | 3;
  status: Status;
};

const allCapCandidates: Candidate[] = [
  { id: 'CAP2025001', name: 'Aarav Sharma', avatar: 'AS', rank: 150, course: 'B.Tech CSE', category: 'General', round: 1, status: 'New' },
  { id: 'CAP2025002', name: 'Diya Patel', avatar: 'DP', rank: 210, course: 'B.Tech ECE', category: 'OBC', round: 1, status: 'New' },
  { id: 'CAP2025003', name: 'Rohan Verma', avatar: 'RV', rank: 320, course: 'B.Tech CSE', category: 'General', round: 1, status: 'Processed' },
  { id: 'CAP2025004', name: 'Priya Singh', avatar: 'PS', rank: 450, course: 'B.Com', category: 'SC', round: 2, status: 'New' },
  { id: 'CAP2025005', name: 'Aditya Kumar', avatar: 'AK', rank: 180, course: 'B.Tech CSE', category: 'OBC', round: 1, status: 'Pending' },
  { id: 'CAP2025006', name: 'Ananya Gupta', avatar: 'AG', rank: 500, course: 'MBA', category: 'General', round: 2, status: 'New' },
  { id: 'CAP2025007', name: 'Kabir Das', avatar: 'KD', rank: 250, course: 'B.Tech ECE', category: 'General', round: 1, status: 'Processed' },
  { id: 'CAP2025008', name: 'Ishaan Reddy', avatar: 'IR', rank: 600, course: 'MBA', category: 'OBC', round: 3, status: 'New' },
  { id: 'CAP2025009', name: 'Meera Iyer', avatar: 'MI', rank: 350, course: 'B.Com', category: 'General', round: 2, status: 'Processed' },
  { id: 'CAP2025010', name: 'Arjun Menon', avatar: 'AM', rank: 120, course: 'B.Tech CSE', category: 'General', round: 1, status: 'New' },
  { id: 'CAP2025011', name: 'Saanvi Chen', avatar: 'SC', rank: 700, course: 'B.Sc', category: 'General', round: 3, status: 'Pending' },
  { id: 'CAP2025012', name: 'Vivaan Joshi', avatar: 'VJ', rank: 410, course: 'B.Com', category: 'ST', round: 2, status: 'New' },
];

const getStatusChip = (status: Status) => {
    switch(status) {
        case 'New': return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300";
        case 'Pending': return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
        case 'Processed': return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
    }
};

const CAPAdmin = () => {
    const [candidates] = useState<Candidate[]>(allCapCandidates);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [filters, setFilters] = useState({ course: 'All', category: 'All', round: 'All' });
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null); // State to manage open dropdown
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const filteredCandidates = useMemo(() => {
        return candidates
            .filter(c => searchTerm === '' || c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(c => filters.course === 'All' || c.course === filters.course)
            .filter(c => filters.category === 'All' || c.category === filters.category)
            .filter(c => filters.round === 'All' || c.round === parseInt(filters.round));
    }, [searchTerm, filters, candidates]);

    const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
    const paginatedCandidates = filteredCandidates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleFilterApply = (newFilters: unknown) => {
        setFilters(newFilters as { course: string; category: string; round: string });
        setCurrentPage(1);
        setIsFilterModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">CAP Candidate Management</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Import and manage candidates from the Centralized Admission Process.</p>
            </header>
            
            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm"><h4 className="text-sm text-gray-500 dark:text-gray-400">Total Imported</h4><p className="text-2xl font-bold text-gray-900 dark:text-white">{candidates.length}</p></div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm"><h4 className="text-sm text-gray-500 dark:text-gray-400">Processed</h4><p className="text-2xl font-bold text-green-600 dark:text-green-400">{candidates.filter(c=>c.status === 'Processed').length}</p></div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm"><h4 className="text-sm text-gray-500 dark:text-gray-400">Pending Action</h4><p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{candidates.filter(c=>c.status !== 'Processed').length}</p></div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
                {/* Header with Actions and Filters */}
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                        <input 
                            type="text" 
                            placeholder="Search by name or ID..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button onClick={() => setIsFilterModalOpen(true)} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <Filter className="w-4 h-4" /> Filters
                        </button>
                        <button onClick={() => setIsImportModalOpen(true)} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                            <Upload className="w-4 h-4" /> Import Data
                        </button>
                    </div>
                </div>
                
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Candidate Name</th>
                                <th className="px-6 py-3">Application ID</th>
                                <th className="px-6 py-3">Rank</th>
                                <th className="px-6 py-3">Course</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedCandidates.map((candidate) => (
                                <tr key={candidate.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">{candidate.avatar}</div>
                                        {candidate.name}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-gray-500 dark:text-gray-400">{candidate.id}</td>
                                    <td className="px-6 py-4 font-semibold">{candidate.rank}</td>
                                    <td className="px-6 py-4">{candidate.course}</td>
                                    <td className="px-6 py-4">{candidate.category}</td>
                                    <td className="px-6 py-4"><span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusChip(candidate.status)}`}>{candidate.status}</span></td>
                                     <td className="px-6 py-4 text-right relative">
                                        <div>
                                            {/* Toggle button */}
                                            <button
                                                onClick={() => setOpenDropdownId(openDropdownId === candidate.id ? null : candidate.id)}
                                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>

                                            {/* Dropdown menu */}
                                            {openDropdownId === candidate.id && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                                                    <a
                                                        href="#"
                                                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    >
                                                        <Eye className="w-4 h-4 text-gray-500" />
                                                        View Details
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    >
                                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                                        Initiate Verification
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Page {currentPage} of {totalPages}</span>
                    <div className="flex items-center gap-1 mt-4 sm:mt-0">
                        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"><ChevronsLeft className="w-4 h-4"/></button>
                        <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"><ChevronLeft className="w-4 h-4"/></button>
                        <span className="px-4 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-md font-medium">{currentPage}</span>
                        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"><ChevronRight className="w-4 h-4"/></button>
                        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"><ChevronsRight className="w-4 h-4"/></button>
                    </div>
                </div>
            </div>

            {/* Filter Modal */}
            {isFilterModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
                        <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
                            <h2 className="text-xl font-bold">Filter Candidates</h2>
                            <button onClick={() => setIsFilterModalOpen(false)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Filter form content */}
                            <div><label className="block text-sm font-medium mb-1">Course</label><select defaultValue={filters.course} id="courseFilter" className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"><option>All</option><option>B.Tech CSE</option><option>B.Tech ECE</option><option>B.Com</option><option>MBA</option><option>B.Sc</option></select></div>
                            <div><label className="block text-sm font-medium mb-1">Category</label><select defaultValue={filters.category} id="categoryFilter" className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"><option>All</option><option>General</option><option>OBC</option><option>SC</option><option>ST</option></select></div>
                            <div><label className="block text-sm font-medium mb-1">Admission Round</label><select defaultValue={filters.round} id="roundFilter" className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"><option>All</option><option>1</option><option>2</option><option>3</option></select></div>
                        </div>
                        <div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                            <button onClick={() => handleFilterApply({ course: 'All', category: 'All', round: 'All' })} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Reset</button>
                            <button onClick={() => {
                                const newFilters = {
                                    course: (document.getElementById('courseFilter') as HTMLSelectElement).value,
                                    category: (document.getElementById('categoryFilter') as HTMLSelectElement).value,
                                    round: (document.getElementById('roundFilter') as HTMLSelectElement).value,
                                };
                                handleFilterApply(newFilters);
                            }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">Apply Filters</button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Import Data Modal */}
            {isImportModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg">
                        <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
                            <h2 className="text-xl font-bold">Import Candidate Data</h2>
                            <button onClick={() => setIsImportModalOpen(false)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button>
                        </div>
                        <div className="p-6 text-center">
                           <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-10 flex flex-col items-center">
                              <FileUp className="w-12 h-12 text-gray-400 mb-4"/>
                              <p className="font-semibold mb-2">Drag & drop your file here</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or</p>
                              <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium">Browse Files</button>
                              <p className="text-xs text-gray-400 mt-4">Supports: CSV, Excel</p>
                           </div>
                        </div>
                         <div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                            <button onClick={() => setIsImportModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                            <button onClick={() => setIsImportModalOpen(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">Upload & Process</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CAPAdmin;