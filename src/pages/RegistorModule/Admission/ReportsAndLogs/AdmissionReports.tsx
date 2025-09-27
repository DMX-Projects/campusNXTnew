import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Download, User, BookOpen, KeyRound } from 'lucide-react';

// --- TYPES ---
type LogCategory = 'All' | 'Verification' | 'Allotment' | 'Finalization';
type UserType = 'All' | 'Admin' | 'Academic Team' | 'System';

type LogEntry = {
  id: number;
  timestamp: string;
  user: UserType;
  category: LogCategory;
  action: string;
  target: string; // e.g., Student Name or list name
  details: string;
};

// --- MOCK DATA ---
const allLogs: LogEntry[] = [
  { id: 1, timestamp: '2025-09-27 10:15 AM', user: 'Admin', category: 'Allotment', action: 'Imported List', target: 'Phase I Allotment', details: 'Imported 18 students.' },
  { id: 2, timestamp: '2025-09-27 09:45 AM', user: 'Admin', category: 'Verification', action: 'Application Verified', target: 'Reyansh Gupta (VERIFY002)', details: 'All personal documents confirmed.' },
  { id: 3, timestamp: '2025-09-27 09:30 AM', user: 'Academic Team', category: 'Verification', action: 'Action Required', target: 'Anika Reddy (ACAD003)', details: 'Remark: Consolidated marksheet is illegible.' },
  { id: 4, timestamp: '2025-09-26 05:00 PM', user: 'Admin', category: 'Allotment', action: 'Details Edited', target: 'Rohan Verma (ACAD009)', details: 'Updated contact number.' },
  { id: 5, timestamp: '2025-09-26 04:10 PM', user: 'System', category: 'Finalization', action: 'Logins Generated', target: 'Final Admission List', details: 'Generated credentials for 7 students.' },
  { id: 6, timestamp: '2025-09-26 03:20 PM', user: 'Academic Team', category: 'Verification', action: 'Academics Verified', target: 'Zara Khan (ACAD006)', details: 'CAT scorecard and degree certificate confirmed.' },
  { id: 7, timestamp: '2025-09-26 02:00 PM', user: 'Admin', category: 'Finalization', action: 'ID Cards Initiated', target: 'Final Admission List', details: 'Generation queued, pending template.' },
  { id: 8, timestamp: '2025-09-25 11:00 AM', user: 'Admin', category: 'Allotment', action: 'Imported List', target: 'Management Quota', details: 'Imported 12 students.' },
  { id: 9, timestamp: '2025-09-25 10:30 AM', user: 'Academic Team', category: 'Verification', action: 'Details Edited', target: 'Ishita Sharma (ACAD001)', details: 'Updated entrance exam score after review.' },
  { id: 10, timestamp: '2025-09-24 01:50 PM', user: 'System', category: 'Finalization', action: 'Imported List', target: 'Final Admission List', details: 'Final list of 7 students imported.' },
];


const LogIcon = ({ category }: { category: LogCategory }) => {
    switch(category) {
        case 'Verification': return <User className="w-5 h-5 text-sky-500" />;
        case 'Allotment': return <BookOpen className="w-5 h-5 text-indigo-500" />;
        case 'Finalization': return <KeyRound className="w-5 h-5 text-green-500" />;
        default: return <User className="w-5 h-5 text-gray-500" />;
    }
}

const createCsvAndDownload = (csvContent: string, filename: string) => {
    const headers = "Timestamp,User,Category,Action,Target,Details\n";
    const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};


// --- MAIN COMPONENT ---
const ReportsAndLogs = () => {
    const [logs, setLogs] = useState<LogEntry[]>(allLogs);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<{ category: LogCategory, user: UserType }>({ category: 'All', user: 'All' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredLogs = useMemo(() => {
        return logs
            .filter(log => filters.category === 'All' || log.category === filters.category)
            .filter(log => filters.user === 'All' || log.user === filters.user)
            .filter(log =>
                searchTerm === '' ||
                log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.details.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [searchTerm, filters, logs]);

    const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

    const handleDownloadReport = () => {
        const csvContent = filteredLogs.map(log => 
            `"${log.timestamp}","${log.user}","${log.category}","${log.action}","${log.target}","${log.details}"`
        ).join("\n");
        createCsvAndDownload(csvContent, "admission_logs_report.csv");
    };

    const handleDownloadSingleLog = (log: LogEntry) => {
        const csvContent = `"${log.timestamp}","${log.user}","${log.category}","${log.action}","${log.target}","${log.details}"`;
        const filename = `log_entry_${log.id}.csv`;
        createCsvAndDownload(csvContent, filename);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Reports & Logs</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Track all administrative and academic actions across the admission cycle.</p>
                </header>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="md:col-span-2">
                             <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Search Logs</label>
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="text" placeholder="Search by action, student, details..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg border-transparent focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>
                        <div>
                             <label htmlFor="filter-category" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Category</label>
                             <select id="filter-category" value={filters.category} onChange={e => {setFilters(f => ({...f, category: e.target.value as LogCategory})); setCurrentPage(1);}} className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg border-transparent focus:ring-2 focus:ring-indigo-500">
                                <option>All</option>
                                <option>Allotment</option>
                                <option>Verification</option>
                                <option>Finalization</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="filter-user" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">User/Team</label>
                            <select id="filter-user" value={filters.user} onChange={e => {setFilters(f => ({...f, user: e.target.value as UserType})); setCurrentPage(1);}} className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg border-transparent focus:ring-2 focus:ring-indigo-500">
                                <option>All</option>
                                <option>Admin</option>
                                <option>Academic Team</option>
                                <option>System</option>
                            </select>
                        </div>
                         <div className="md:col-start-4">
                            <button onClick={handleDownloadReport} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-colors">
                                <Download className="w-5 h-5" /> Download Report
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                    {filteredLogs.length === 0 ? (
                        <div className="text-center py-20 text-gray-500"><Search className="mx-auto h-12 w-12 mb-4" /><h3 className="font-semibold text-lg">No Logs Found</h3><p>Adjust your filters or search term to find logs.</p></div>
                    ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4 whitespace-nowrap">Timestamp</th>
                                        <th className="px-6 py-4 whitespace-nowrap">User</th>
                                        <th className="px-6 py-4 whitespace-nowrap">Action</th>
                                        <th className="px-6 py-4 whitespace-nowrap">Target</th>
                                        <th className="px-6 py-4 whitespace-nowrap">Details</th>
                                        <th className="px-6 py-4 whitespace-nowrap text-center">Export</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedLogs.map((log) => (
                                        <tr key={log.id} className="border-b dark:border-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400 font-mono text-xs">{log.timestamp}</td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700 dark:text-gray-300">{log.user}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <LogIcon category={log.category} />
                                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{log.action}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300 font-medium">{log.target}</td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400 max-w-sm truncate">{log.details}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <button onClick={() => handleDownloadSingleLog(log)} className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {totalPages > 1 && (
                            <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t dark:border-gray-700 text-sm">
                                <div>Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length}</div>
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
        </div>
    );
};

export default ReportsAndLogs;

