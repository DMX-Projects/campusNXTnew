import React from 'react';
import { Plus, Search, Filter, MoreVertical, X, Check, XCircle, Clock, Users, UserCheck, UserX, Trash2, Edit, Loader2, Info } from 'lucide-react';

// --- ENHANCED DATA TYPES & MOCK DATA ---
type ApplicantStatus = 'Under Review' | 'Approved' | 'Rejected' | 'On Hold';
type Applicant = {
  id: string;
  name: string;
  avatar: string;
  course: string;
  score: number;
  status: ApplicantStatus;
  remarks: string;
  appliedDate: string;
};

const initialApplicants: Applicant[] = [
  { id: 'MQ25001', name: 'Riya Kapoor', avatar: 'RK', course: 'B.Tech CSE', score: 96.5, status: 'Approved', remarks: 'High academic scores.', appliedDate: '2024-07-10' },
  { id: 'MQ25002', name: 'Arjun Mehta', avatar: 'AM', course: 'MBA', score: 88.0, status: 'Under Review', remarks: 'Awaiting interview feedback.', appliedDate: '2024-07-11' },
  { id: 'MQ25003', name: 'Sana Ali', avatar: 'SA', course: 'B.Com', score: 75.2, status: 'Rejected', remarks: 'Incomplete documentation.', appliedDate: '2024-07-09' },
  { id: 'MQ25004', name: 'Vikram Singh', avatar: 'VS', course: 'B.Tech ECE', score: 91.8, status: 'On Hold', remarks: 'Pending decision from board.', appliedDate: '2024-07-12' },
  { id: 'MQ25005', name: 'Neha Sharma', avatar: 'NS', course: 'B.Tech CSE', score: 94.1, status: 'Under Review', remarks: '', appliedDate: '2024-07-13' },
  { id: 'MQ25006', name: 'Karan Choi', avatar: 'KC', course: 'MBA', score: 85.5, status: 'Approved', remarks: 'Strong GMAT score.', appliedDate: '2024-07-14' },
];

// --- UTILITY FUNCTIONS ---
const getStatusChip = (status: ApplicantStatus) => {
    switch(status) {
        case 'Approved': return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
        case 'Under Review': return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300";
        case 'Rejected': return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
        case 'On Hold': return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
    }
};

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

// --- MAIN COMPONENT ---
const ManagementAdmissionProcess = () => {
    const [applicants, setApplicants] = React.useState<Applicant[]>(initialApplicants);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingApplicant, setEditingApplicant] = React.useState<Applicant | null>(null);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filters, setFilters] = React.useState<{ status: ApplicantStatus | 'All'; course: string | 'All' }>({ status: 'All', course: 'All' });
    const [toast, setToast] = React.useState<{ id: number, message: string } | null>(null);
    
    // --- NEW: State for confirmation and remarks modals ---
    const [remarksAction, setRemarksAction] = React.useState<{ applicant: Applicant; newStatus: ApplicantStatus } | null>(null);
    const [deleteAction, setDeleteAction] = React.useState<Applicant | null>(null);


    // --- COMPUTED VALUES ---
    const filteredApplicants = React.useMemo(() => {
        return applicants
            .filter(app => searchTerm === '' || app.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(app => filters.status === 'All' || app.status === filters.status)
            .filter(app => filters.course === 'All' || app.course === filters.course);
    }, [applicants, searchTerm, filters]);

    const kpiStats = React.useMemo(() => ({
        total: applicants.length,
        approved: applicants.filter(a => a.status === 'Approved').length,
        rejected: applicants.filter(a => a.status === 'Rejected').length,
        underReview: applicants.filter(a => a.status === 'Under Review' || a.status === 'On Hold').length,
    }), [applicants]);

    const availableCourses = [...new Set(initialApplicants.map(a => a.course))];

    // --- HANDLERS ---
    const showToast = (message: string) => setToast({ id: Date.now(), message });

    React.useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);
    
    const handleOpenModal = (applicant: Applicant | null = null) => {
        setEditingApplicant(applicant);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingApplicant(null);
    };

    const handleSaveApplicant = (applicantData: Omit<Applicant, 'id' | 'avatar' | 'appliedDate'>) => {
        if (editingApplicant) {
            setApplicants(applicants.map(app => app.id === editingApplicant.id ? { ...editingApplicant, ...applicantData } : app));
            showToast("Applicant updated successfully!");
        } else {
            const newApplicant: Applicant = {
                id: `MQ25${(Math.random() * 1000).toFixed(0).padStart(3, '0')}`,
                avatar: applicantData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
                ...applicantData,
                appliedDate: new Date().toISOString().split('T')[0],
            };
            setApplicants([newApplicant, ...applicants]);
            showToast("Applicant added successfully!");
        }
        handleCloseModal();
    };
    
    // --- UPDATED: Status change now requires remarks and confirmation ---
    const handleStatusChange = (id: string, newStatus: ApplicantStatus, newRemarks: string) => {
        setApplicants(applicants.map(app => app.id === id ? { ...app, status: newStatus, remarks: newRemarks } : app));
        showToast(`Status updated to ${newStatus}.`);
        setRemarksAction(null);
    };

    // --- UPDATED: Delete now requires confirmation ---
    const handleDelete = (id: string) => {
        setApplicants(applicants.filter(app => app.id !== id));
        showToast("Applicant removed.");
        setDeleteAction(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
            {toast && <div className="fixed top-5 right-5 z-50 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg">{toast.message}</div>}

            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Management Quota Admissions</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Manage the lifecycle of direct admissions from application to approval.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KpiCard icon={Users} title="Total Applicants" value={kpiStats.total} color="blue" />
                <KpiCard icon={UserCheck} title="Approved" value={kpiStats.approved} color="green" />
                <KpiCard icon={UserX} title="Rejected" value={kpiStats.rejected} color="red" />
                <KpiCard icon={Clock} title="Pending Review" value={kpiStats.underReview} color="yellow" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative w-full sm:w-auto sm:flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input type="text" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full sm:max-w-xs pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"/>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value as ApplicantStatus | 'All'})} className="w-full sm:w-auto p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                                <option value="All">All Statuses</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                                <option value="On Hold">On Hold</option>
                            </select>
                            <select value={filters.course} onChange={e => setFilters({...filters, course: e.target.value})} className="w-full sm:w-auto p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                                <option value="All">All Courses</option>
                                {availableCourses.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <button onClick={() => handleOpenModal()} className="hidden sm:flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                                <Plus className="w-5 h-5" /> Add
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Applicant</th>
                                <th className="px-6 py-3">Course / Score</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Remarks</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplicants.map(app => (
                                <tr key={app.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-xs">{app.avatar}</div>
                                        <div>
                                            <p className="text-gray-900 dark:text-white">{app.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Applied: {formatDate(app.appliedDate)}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-semibold">{app.course}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Score: {app.score.toFixed(1)}%</p>
                                    </td>
                                    <td className="px-6 py-4"><span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusChip(app.status)}`}>{app.status}</span></td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 italic text-xs max-w-xs truncate">{app.remarks || '-'}</td>
                                    <td className="px-6 py-4 text-right">
                                        <ActionsMenu applicant={app} onStatusChange={(applicant, newStatus) => setRemarksAction({applicant, newStatus})} onEdit={() => handleOpenModal(app)} onDelete={() => setDeleteAction(app)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <button onClick={() => handleOpenModal()} className="sm:hidden fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700">
                <Plus className="w-7 h-7" />
            </button>
            
            {/* --- NEW: Modals are rendered here --- */}
            {isModalOpen && <ApplicantModal applicant={editingApplicant} onClose={handleCloseModal} onSave={handleSaveApplicant} availableCourses={availableCourses} />}
            {remarksAction && <RemarksModal action={remarksAction} onClose={() => setRemarksAction(null)} onConfirm={handleStatusChange} />}
            {deleteAction && <ConfirmationModal applicant={deleteAction} onClose={() => setDeleteAction(null)} onConfirm={handleDelete} />}

        </div>
    );
};

// --- SUB-COMPONENTS ---
const KpiCard = ({ icon: Icon, title, value, color }: { icon: React.ElementType, title: string, value: number, color: string }) => {
    const colors = {
        blue: 'text-blue-500 bg-blue-100 dark:bg-blue-900/50',
        green: 'text-green-500 bg-green-100 dark:bg-green-900/50',
        red: 'text-red-500 bg-red-100 dark:bg-red-900/50',
        yellow: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/50',
    };
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${colors[color]}`}><Icon className="w-6 h-6" /></div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                </div>
            </div>
        </div>
    );
};

const ActionsMenu = ({ applicant, onStatusChange, onEdit, onDelete }: { applicant: Applicant, onStatusChange: (applicant: Applicant, status: ApplicantStatus) => void, onEdit: () => void, onDelete: (applicant: Applicant) => void }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="relative inline-block text-left">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"><MoreVertical className="w-5 h-5" /></button>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                    <div className="py-1">
                        <a href="#" onClick={(e) => { e.preventDefault(); onEdit(); setIsOpen(false); }} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"><Edit className="w-4 h-4"/>Edit</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); onStatusChange(applicant, 'Approved'); setIsOpen(false); }} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"><Check className="w-4 h-4 text-green-500"/>Approve</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); onStatusChange(applicant, 'Rejected'); setIsOpen(false); }} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"><XCircle className="w-4 h-4 text-red-500"/>Reject</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); onStatusChange(applicant, 'On Hold'); setIsOpen(false); }} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"><Clock className="w-4 h-4 text-yellow-500"/>Put on Hold</a>
                        <div className="border-t my-1 border-gray-200 dark:border-gray-600"></div>
                        <a href="#" onClick={(e) => { e.preventDefault(); onDelete(applicant); setIsOpen(false); }} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50"><Trash2 className="w-4 h-4"/>Delete</a>
                    </div>
                </div>
            )}
        </div>
    );
};

const ApplicantModal = ({ applicant, onClose, onSave, availableCourses }: { applicant: Applicant | null, onClose: () => void, onSave: (data: Omit<Applicant, 'id'|'avatar'|'appliedDate'>) => void, availableCourses: string[] }) => {
    const [formData, setFormData] = React.useState({
        name: applicant?.name || '',
        course: applicant?.course || availableCourses[0],
        score: applicant?.score || 0,
        status: applicant?.status || 'Under Review',
        remarks: applicant?.remarks || '',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'score' ? parseFloat(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg">
                <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold">{applicant ? 'Edit' : 'Add New'} Applicant</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium mb-1">Full Name</label><input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" /></div>
                        <div><label className="block text-sm font-medium mb-1">Academic Score (%)</label><input required name="score" value={formData.score} onChange={handleChange} type="number" step="0.1" min="0" max="100" className="w-full p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" /></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium mb-1">Course</label><select name="course" value={formData.course} onChange={handleChange} className="w-full p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">{availableCourses.map(c => <option key={c}>{c}</option>)}</select></div>
                        <div><label className="block text-sm font-medium mb-1">Status</label><select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">{['Under Review', 'Approved', 'Rejected', 'On Hold'].map(s => <option key={s}>{s}</option>)}</select></div>
                    </div>
                    <div><label className="block text-sm font-medium mb-1">Remarks</label><textarea name="remarks" value={formData.remarks} onChange={handleChange} rows={3} className="w-full p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" /></div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">Save Applicant</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- NEW: Remarks Modal ---
const RemarksModal = ({ action, onClose, onConfirm }: { action: { applicant: Applicant; newStatus: ApplicantStatus }, onClose: () => void, onConfirm: (id: string, status: ApplicantStatus, remarks: string) => void }) => {
    const [remarks, setRemarks] = React.useState(action.applicant.remarks || '');

    const handleSubmit = () => {
        onConfirm(action.applicant.id, action.newStatus, remarks);
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
                <div className="p-6 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold">Update Status to "{action.newStatus}"</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">For applicant: {action.applicant.name}</p>
                </div>
                <div className="p-6">
                    <label className="block text-sm font-medium mb-1">Remarks</label>
                    <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows={4} className="w-full p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Add remarks (optional)"/>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3 rounded-b-xl">
                    <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                    <button type="button" onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">Confirm Update</button>
                </div>
            </div>
        </div>
    )
};

// --- NEW: Generic Confirmation Modal ---
const ConfirmationModal = ({ applicant, onClose, onConfirm }: { applicant: Applicant, onClose: () => void, onConfirm: (id: string) => void }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md text-center p-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50 mb-4">
                    <Trash2 className="h-6 w-6 text-red-600 dark:text-red-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Deletion</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-6">
                    Are you sure you want to delete the applicant <strong>{applicant.name}</strong>? This action cannot be undone.
                </p>
                <div className="flex justify-center gap-3">
                    <button onClick={onClose} className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium">Cancel</button>
                    <button onClick={() => onConfirm(applicant.id)} className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">Yes, Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ManagementAdmissionProcess;

