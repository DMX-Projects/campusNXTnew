import React, { useState, useCallback, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, FileText, CalendarDays, Percent, CheckSquare, Package } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface LeaveType {
  id: string;
  name: string;
  abbreviation: string;
  annualQuota: number;
  grantsAttendanceCredit: boolean;
  requiresDocumentation: boolean;
  notes: string;
}

// --- MOCK DATA ---
const INITIAL_STUDENT_LEAVE_TYPES: LeaveType[] = [
  {
    id: 'slt_1',
    name: 'Sick Leave',
    abbreviation: 'SL',
    annualQuota: 10,
    grantsAttendanceCredit: true,
    requiresDocumentation: true,
    notes: 'Medical certificate required if leave exceeds 2 consecutive days. Grants attendance credit upon approval.',
  },
  {
    id: 'slt_2',
    name: 'On-Duty Leave',
    abbreviation: 'OD',
    annualQuota: 15,
    grantsAttendanceCredit: true,
    requiresDocumentation: true,
    notes: 'For representing the college in official events. Requires a letter from the concerned department head.',
  },
  {
    id: 'slt_4',
    name: 'Emergency Leave',
    abbreviation: 'EML',
    annualQuota: 3,
    grantsAttendanceCredit: true,
    requiresDocumentation: false,
    notes: 'For unforeseen personal or family emergencies. Post-facto approval may be sought.',
  },
  {
    id: 'slt_5',
    name: 'Placement & Internship',
    abbreviation: 'PIL',
    annualQuota: 30,
    grantsAttendanceCredit: true,
    requiresDocumentation: true,
    notes: 'For attending interviews or joining internships. Requires offer letter or interview call letter.',
  },
];

const DEFAULT_STUDENT_LEAVE_TYPE: Omit<LeaveType, 'id'> = {
    name: '',
    abbreviation: '',
    annualQuota: 5,
    grantsAttendanceCredit: false,
    requiresDocumentation: false,
    notes: '',
};


// --- UI Sub-Components ---

const StudentLeaveModal = ({
    isOpen,
    onClose,
    onSave,
    leaveType
}: {
    isOpen: boolean,
    onClose: () => void,
    onSave: (leaveType: LeaveType) => void,
    leaveType: LeaveType | null
}) => {
    const [currentConfig, setCurrentConfig] = useState<Omit<LeaveType, 'id'>>(DEFAULT_STUDENT_LEAVE_TYPE);

    useEffect(() => {
        if (isOpen) {
            setCurrentConfig(leaveType ? { ...leaveType } : DEFAULT_STUDENT_LEAVE_TYPE);
        }
    }, [leaveType, isOpen]);

    const handleSave = () => {
        const id = leaveType ? leaveType.id : `slt_${Date.now()}`;
        onSave({ id, ...currentConfig });
    };

    const isFormValid = currentConfig.name && currentConfig.abbreviation && currentConfig.annualQuota >= 0;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-xl border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{leaveType ? 'Edit Leave Type' : 'Add New Leave Type'}</h2>
                    <button onClick={onClose} className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"><X size={24} /></button>
                </div>
                
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leave Name</label>
                            <input type="text" placeholder="e.g., Sick Leave" value={currentConfig.name} onChange={(e) => setCurrentConfig(p => ({ ...p, name: e.target.value }))} className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Abbreviation</label>
                            <input type="text" placeholder="e.g., SL" value={currentConfig.abbreviation} onChange={(e) => setCurrentConfig(p => ({ ...p, abbreviation: e.target.value }))} className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400"/>
                        </div>
                    </div>

                    {/* Quota */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Days Allowed per Year</label>
                        <input type="number" value={currentConfig.annualQuota} onChange={(e) => setCurrentConfig(p => ({ ...p, annualQuota: parseInt(e.target.value, 10) || 0 }))} className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
                    </div>
                    
                    {/* Policies */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md h-full">
                            <input type="checkbox" id="grantsAttendance" checked={currentConfig.grantsAttendanceCredit} onChange={(e) => setCurrentConfig(p => ({ ...p, grantsAttendanceCredit: e.target.checked }))} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                            <label htmlFor="grantsAttendance" className="ml-3 block text-sm font-medium text-gray-800 dark:text-gray-200">Grants Attendance Credit</label>
                        </div>
                         <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md h-full">
                            <input type="checkbox" id="requiresDoc" checked={currentConfig.requiresDocumentation} onChange={(e) => setCurrentConfig(p => ({ ...p, requiresDocumentation: e.target.checked }))} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                            <label htmlFor="requiresDoc" className="ml-3 block text-sm font-medium text-gray-800 dark:text-gray-200">Requires Documentation</label>
                        </div>
                    </div>

                     {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Policy Notes / Description</label>
                        <textarea rows={4} placeholder="Describe the rules, documentation needed, and approval process for this leave..." value={currentConfig.notes} onChange={(e) => setCurrentConfig(p => ({ ...p, notes: e.target.value }))} className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400"/>
                    </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 font-semibold transition-colors">Cancel</button>
                    <button onClick={handleSave} disabled={!isFormValid} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center font-semibold transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed">
                        <Save size={18} className="mr-2" /> {leaveType ? 'Save Changes' : 'Create Leave Type'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const StudentLeaveCard = ({ leaveType, onEdit, onDelete }: { leaveType: LeaveType, onEdit: () => void, onDelete: () => void }) => (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 flex flex-col">
        <div className="flex justify-between items-start">
            <div>
                <span className="px-3 py-1 text-xs font-semibold text-indigo-800 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">{leaveType.abbreviation}</span>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-2">{leaveType.name}</h3>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
                <button onClick={onEdit} className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><Edit size={18} /></button>
                <button onClick={onDelete} className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><Trash2 size={18} /></button>
            </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex-grow">{leaveType.notes}</p>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center" title="Annual Quota">
                <CalendarDays size={18} className="text-teal-600 dark:text-teal-400 mr-2 flex-shrink-0" />
                <span className="font-semibold text-gray-700 dark:text-gray-200">{leaveType.annualQuota} Days / Year</span>
            </div>
            <div className="flex items-center" title="Grants Attendance Credit">
                <Percent size={18} className={`mr-2 flex-shrink-0 ${leaveType.grantsAttendanceCredit ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                <span className={`${leaveType.grantsAttendanceCredit ? 'text-gray-700 dark:text-gray-200 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                    {leaveType.grantsAttendanceCredit ? 'Attendance Credit' : 'No Credit'}
                </span>
            </div>
            <div className="flex items-center" title="Requires Documentation">
                <FileText size={18} className={`mr-2 flex-shrink-0 ${leaveType.requiresDocumentation ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400'}`} />
                 <span className={`${leaveType.requiresDocumentation ? 'text-gray-700 dark:text-gray-200 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                    {leaveType.requiresDocumentation ? 'Proof Required' : 'No Proof Needed'}
                </span>
            </div>
        </div>
    </div>
);


// --- Main Component ---

export default function ConfigureStudentLeave() {
    const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>(INITIAL_STUDENT_LEAVE_TYPES);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLeaveType, setEditingLeaveType] = useState<LeaveType | null>(null);

    const handleOpenModalForEdit = useCallback((leaveType: LeaveType) => {
        setEditingLeaveType(leaveType);
        setIsModalOpen(true);
    }, []);

    const handleOpenModalForAdd = () => {
        setEditingLeaveType(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingLeaveType(null);
    };

    const handleSaveLeaveType = (leaveTypeToSave: LeaveType) => {
        if (editingLeaveType) {
            setLeaveTypes(prev => prev.map(lt => lt.id === leaveTypeToSave.id ? leaveTypeToSave : lt));
        } else {
            setLeaveTypes(prev => [...prev, leaveTypeToSave]);
        }
        handleCloseModal();
    };

    const handleDeleteLeaveType = (id: string) => {
        if (window.confirm('Are you sure you want to delete this leave type? This action cannot be undone.')) {
            setLeaveTypes(prev => prev.filter(lt => lt.id !== id));
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 md:mb-12">
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                                
                                Student Leave Policy
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Define and manage the leave policies applicable to students.</p>
                        </div>
                        <button onClick={handleOpenModalForAdd} className="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center whitespace-nowrap">
                            <Plus className="mr-2" /> Add New Leave Type
                        </button>
                    </div>
                </header>

                <main>
                    {leaveTypes.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {leaveTypes.map(lt => (
                                <StudentLeaveCard
                                    key={lt.id}
                                    leaveType={lt}
                                    onEdit={() => handleOpenModalForEdit(lt)}
                                    onDelete={() => handleDeleteLeaveType(lt.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No Leave Types Configured</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Click "Add New Leave Type" to get started.</p>
                        </div>
                    )}
                </main>

                {/* <footer className="text-center mt-12">
                     <button className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
                        <Save className="mr-2" /> Save & Publish Policy
                    </button>
                </footer> */}
            </div>

            <StudentLeaveModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveLeaveType}
                leaveType={editingLeaveType}
            />
        </div>
    );
}