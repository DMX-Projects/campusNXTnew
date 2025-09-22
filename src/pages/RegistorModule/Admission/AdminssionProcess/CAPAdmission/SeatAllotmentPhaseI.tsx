import React, { useState, useMemo, useEffect, ElementType } from 'react';
import { Search, Filter, Bell, ChevronsLeft, ChevronRight, ChevronsRight, ChevronLeft, CheckCircle, XCircle, Clock, Check, Users, X } from 'lucide-react';

type Status = 'Accepted' | 'Pending' | 'Rejected' | 'Confirmed';
type Candidate = {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  course: string;
  category: 'General' | 'OBC' | 'SC' | 'ST';
  status: Status;
};

const allPhase1Candidates: Candidate[] = [
  { id: 'ALLOT001', name: 'Aarav Sharma', avatar: 'AS', rank: 150, course: 'B.Tech CSE', category: 'General', status: 'Accepted' },
  { id: 'ALLOT002', name: 'Diya Patel', avatar: 'DP', rank: 210, course: 'B.Tech ECE', category: 'OBC', status: 'Pending' },
  { id: 'ALLOT003', name: 'Rohan Verma', avatar: 'RV', rank: 320, course: 'B.Tech CSE', category: 'General', status: 'Rejected' },
  { id: 'ALLOT004', name: 'Priya Singh', avatar: 'PS', rank: 450, course: 'B.Com', category: 'SC', status: 'Pending' },
  { id: 'ALLOT005', name: 'Aditya Kumar', avatar: 'AK', rank: 180, course: 'B.Tech CSE', category: 'OBC', status: 'Accepted' },
  { id: 'ALLOT006', name: 'Ananya Gupta', avatar: 'AG', rank: 500, course: 'MBA', category: 'General', status: 'Pending' },
  { id: 'ALLOT007', name: 'Kabir Das', avatar: 'KD', rank: 250, course: 'B.Tech ECE', category: 'General', status: 'Confirmed' },
  { id: 'ALLOT008', name: 'Ishaan Reddy', avatar: 'IR', rank: 600, course: 'MBA', category: 'OBC', status: 'Rejected' },
  { id: 'ALLOT009', name: 'Meera Iyer', avatar: 'MI', rank: 350, course: 'B.Com', category: 'General', status: 'Accepted' },
  { id: 'ALLOT010', name: 'Arjun Menon', avatar: 'AM', rank: 120, course: 'B.Tech CSE', category: 'General', status: 'Pending' },
  { id: 'ALLOT011', name: 'Saanvi Chen', avatar: 'SC', rank: 700, course: 'B.Sc Physics', category: 'General', status: 'Pending' },
  { id: 'ALLOT012', name: 'Vivaan Joshi', avatar: 'VJ', rank: 410, course: 'B.Com', category: 'ST', status: 'Accepted' },
  { id: 'ALLOT013', name: 'Zara Khan', avatar: 'ZK', rank: 190, course: 'B.Tech CSE', category: 'General', status: 'Confirmed' },
  { id: 'ALLOT014', name: 'Aryan Singh', avatar: 'AS', rank: 220, course: 'B.Tech ECE', category: 'OBC', status: 'Pending' },
  { id: 'ALLOT015', name: 'Naina Rao', avatar: 'NR', rank: 330, course: 'B.Tech CSE', category: 'SC', status: 'Rejected' },
];

const getStatusChipClasses = (status: Status) => {
  switch (status) {
    case 'Accepted':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
    case 'Pending':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
    case 'Rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
    case 'Confirmed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const SeatAllotmentPhaseI = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(allPhase1Candidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({ course: 'All', category: 'All', status: 'All' });
  const [tempFilters, setTempFilters] = useState(filters);
  const [selected, setSelected] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
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
        .filter((c) => filters.category === 'All' || c.category === filters.category)
        .filter((c) => filters.status === 'All' || c.status === filters.status),
    [searchTerm, filters, candidates]
  );

  const paginatedCandidates = filteredCandidates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(paginatedCandidates.map((c) => c.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleConfirm = (id: string) => {
    setCandidates(candidates.map((c) => (c.id === id ? { ...c, status: 'Confirmed' } : c)));
    setToast({ message: `Allotment for ${id} has been confirmed.`, type: 'success' });
    setSelected(selected.filter((s) => s !== id));
  };

  const handleSendReminders = () => {
    const pendingCount = selected.filter((id) => candidates.find((c) => c.id === id)?.status === 'Pending').length;
    if (pendingCount > 0) {
      setToast({ message: `Reminders sent to ${pendingCount} pending candidate(s).`, type: 'info' });
      setSelected([]);
    }
  };

  const handleBulkConfirm = () => {
    const toConfirmIds = selected.filter((id) => {
      const candidate = candidates.find((c) => c.id === id);
      return candidate && candidate.status === 'Accepted';
    });

    if (toConfirmIds.length > 0) {
      setCandidates((prev) =>
        prev.map((c) => (toConfirmIds.includes(c.id) ? { ...c, status: 'Confirmed' } : c))
      );
      setToast({ message: `${toConfirmIds.length} candidate(s) confirmed.`, type: 'success' });
      setSelected([]);
    }
  };

  const isReminderButtonActive = useMemo(() => {
    return selected.some((id) => candidates.find((c) => c.id === id)?.status === 'Pending');
  }, [selected, candidates]);

  const isConfirmButtonActive = useMemo(() => {
    return selected.some((id) => candidates.find((c) => c.id === id)?.status === 'Accepted');
  }, [selected, candidates]);

  const openFilterModal = () => {
    setTempFilters(filters);
    setIsFilterModalOpen(true);
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setIsFilterModalOpen(false);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    const reset = { course: 'All', category: 'All', status: 'All' };
    setTempFilters(reset);
    setFilters(reset);
    setIsFilterModalOpen(false);
    setCurrentPage(1);
  };

  const kpiStats = [
    { title: 'Total Allotted', value: candidates.length, icon: 'Users', color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/50' },
    { title: 'Accepted/Confirmed', value: candidates.filter((c) => c.status === 'Accepted' || c.status === 'Confirmed').length, icon: 'CheckCircle', color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/50' },
    { title: 'Pending Response', value: candidates.filter((c) => c.status === 'Pending').length, icon: 'Clock', color: 'text-amber-500', bgColor: 'bg-amber-100 dark:bg-amber-900/50' },
    { title: 'Rejected', value: candidates.filter((c) => c.status === 'Rejected').length, icon: 'XCircle', color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/50' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 p-4 rounded-lg shadow-lg text-white ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-blue-600'
          }`}
          role="alert"
          aria-live="assertive"
        >
          {toast.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
          <p>{toast.message}</p>
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Seat Allotment - Phase 1</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and confirm the initial list of seat allotments.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiStats.map((item, index) => {
          const IconComponent: { [key: string]: ElementType } = {
            Users: Users,
            CheckCircle: CheckCircle,
            Clock: Clock,
            XCircle: XCircle,
          };
          const Icon = IconComponent[item.icon];
          return (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-transform duration-300`}
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg ${item.bgColor}`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{item.value}</p>
              </div>
              <div className="mt-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{item.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              aria-label="Search candidates by name or ID"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap justify-end">
            <button
              onClick={openFilterModal}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-haspopup="dialog"
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button
              onClick={handleBulkConfirm}
              disabled={!isConfirmButtonActive}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4" /> Confirm Selected
            </button>
            <button
              onClick={handleSendReminders}
              disabled={!isReminderButtonActive}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Bell className="w-4 h-4" /> Send Reminders
            </button>
          </div>
        </div>
      </div>

      {/* Table for desktop */}
      <div className="overflow-x-auto hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-md">
        {filteredCandidates.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            <Search className="mx-auto h-12 w-12 mb-4" />
            <h3 className="text-lg font-semibold">No candidates found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-700 dark:text-gray-400">
              <tr>
                <th className="p-4">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selected.length === paginatedCandidates.length && paginatedCandidates.length > 0}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    aria-label="Select all candidates on this page"
                  />
                </th>
                <th className="px-6 py-3">Candidate</th>
                <th className="px-6 py-3">Rank</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCandidates.map((c) => (
                <tr
                  key={c.id}
                  className={`border-b dark:border-gray-700 ${
                    selected.includes(c.id)
                      ? 'bg-indigo-50 dark:bg-indigo-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      onChange={() => handleSelectOne(c.id)}
                      checked={selected.includes(c.id)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      aria-label={`Select candidate ${c.name} (${c.id})`}
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
                      {c.avatar}
                    </div>
                    <div>
                      {c.name}
                      <p className="text-xs font-mono text-gray-500 dark:text-gray-400">{c.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold">{c.rank}</td>
                  <td className="px-6 py-4">{c.course}</td>
                  <td className="px-6 py-4">{c.category}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusChipClasses(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {c.status === 'Accepted' && (
                      <button
                        onClick={() => handleConfirm(c.id)}
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 font-semibold"
                        aria-label={`Confirm allotment for ${c.name}`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Confirm
                      </button>
                    )}
                    {c.status === 'Confirmed' && (
                      <span className="flex items-center justify-center gap-1.5 text-green-700 dark:text-green-300 text-xs font-semibold">
                        <Check className="w-4 h-4" />
                        Confirmed
                      </span>
                    )}
                    {c.status === 'Rejected' && (
                      <span className="flex items-center justify-center gap-1.5 text-red-700 dark:text-red-300 text-xs font-semibold">
                        <XCircle className="w-4 h-4" />
                        Rejected
                      </span>
                    )}
                    {c.status === 'Pending' && (
                      <span className="flex items-center justify-center gap-1.5 text-amber-700 dark:text-amber-300 text-xs font-semibold">
                        <Clock className="w-4 h-4" />
                        Awaiting
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {paginatedCandidates.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            <Search className="mx-auto h-12 w-12 mb-4" />
            <h3 className="text-lg font-semibold">No candidates found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          paginatedCandidates.map((c) => (
            <div
              key={c.id}
              className={`rounded-lg p-4 shadow-sm ${
                selected.includes(c.id) ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'bg-gray-50 dark:bg-gray-700/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    onChange={() => handleSelectOne(c.id)}
                    checked={selected.includes(c.id)}
                    className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    aria-label={`Select candidate ${c.name} (${c.id})`}
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold">
                      {c.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{c.name}</p>
                      <p className="text-xs font-mono text-gray-500 dark:text-gray-400">{c.id}</p>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusChipClasses(c.status)}`}>{c.status}</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Rank</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{c.rank}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Course</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{c.course}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Category</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{c.category}</p>
                </div>
              </div>
              <div className="mt-4">
                {c.status === 'Accepted' && (
                  <button
                    onClick={() => handleConfirm(c.id)}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 font-semibold"
                    aria-label={`Confirm allotment for ${c.name}`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirm
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-dialog-title"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
              <h2 id="filter-dialog-title" className="text-xl font-bold">
                Filter Candidates
              </h2>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Close filter dialog"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="courseFilter" className="block text-sm font-medium mb-1">
                  Course
                </label>
                <select
                  id="courseFilter"
                  value={tempFilters.course}
                  onChange={(e) => setTempFilters({ ...tempFilters, course: e.target.value })}
                  className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option>All</option>
                  <option>B.Tech CSE</option>
                  <option>B.Tech ECE</option>
                  <option>B.Com</option>
                  <option>MBA</option>
                  <option>B.Sc Physics</option>
                </select>
              </div>
              <div>
                <label htmlFor="categoryFilter" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  id="categoryFilter"
                  value={tempFilters.category}
                  onChange={(e) => setTempFilters({ ...tempFilters, category: e.target.value })}
                  className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option>All</option>
                  <option>General</option>
                  <option>OBC</option>
                  <option>SC</option>
                  <option>ST</option>
                </select>
              </div>
              <div>
                <label htmlFor="statusFilter" className="block text-sm font-medium mb-1">
                  Status
                </label>
                <select
                  id="statusFilter"
                  value={tempFilters.status}
                  onChange={(e) => setTempFilters({ ...tempFilters, status: e.target.value })}
                  className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option>All</option>
                  <option>Accepted</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                  <option>Confirmed</option>
                </select>
              </div>
            </div>
            <div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
              <button
                onClick={resetFilters}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatAllotmentPhaseI;

