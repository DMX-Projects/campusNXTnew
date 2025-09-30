import React, { useState, useCallback, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, FileText, CalendarDays, ChevronsRight, ArrowRightLeft, Package } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface CarryForwardPolicy {
  enabled: boolean;
  maxDays: number | null;
}

interface LeaveType {
  id: string;
  name: string;
  abbreviation: string;
  annualQuota: number;
  allowHalfDays: boolean;
  requiresDocumentationAfterDays: number | null; // e.g., sick note required after 2 consecutive days
  carryForward: CarryForwardPolicy;
  notes: string;
}

// --- MOCK DATA ---
const INITIAL_LEAVE_TYPES: LeaveType[] = [
  {
    id: 'lt_1',
    name: 'Casual Leave',
    abbreviation: 'CL',
    annualQuota: 12,
    allowHalfDays: true,
    requiresDocumentationAfterDays: null,
    carryForward: { enabled: false, maxDays: null },
    notes: 'For personal matters and unforeseen circumstances. Cannot be taken for more than 3 days at a time.',
  },
  {
    id: 'lt_2',
    name: 'Sick Leave',
    abbreviation: 'SL',
    annualQuota: 10,
    allowHalfDays: true,
    requiresDocumentationAfterDays: 2,
    carryForward: { enabled: true, maxDays: 5 },
    notes: 'A medical certificate is required for leaves longer than 2 consecutive days.',
  },
  {
    id: 'lt_3',
    name: 'Earned Leave',
    abbreviation: 'EL',
    annualQuota: 15,
    allowHalfDays: false,
    requiresDocumentationAfterDays: null,
    carryForward: { enabled: true, maxDays: 30 },
    notes: 'Can be encashed as per university policy. Must be applied for at least 15 days in advance.',
  },
  {
    id: 'lt_4',
    name: 'Maternity Leave',
    abbreviation: 'ML',
    annualQuota: 180,
    allowHalfDays: false,
    requiresDocumentationAfterDays: 1,
    carryForward: { enabled: false, maxDays: null },
    notes: 'As per government regulations. Applicable for up to two children. Must be applied for with a medical certificate.',
  },
  {
    id: 'lt_5',
    name: 'Paternity Leave',
    abbreviation: 'PL',
    annualQuota: 15,
    allowHalfDays: false,
    requiresDocumentationAfterDays: 1,
    carryForward: { enabled: false, maxDays: null },
    notes: 'Applicable for up to two children, to be taken within 6 months of childbirth.',
  },
  {
    id: 'lt_6',
    name: 'Leave Without Pay',
    abbreviation: 'LWP',
    annualQuota: 90,
    allowHalfDays: false,
    requiresDocumentationAfterDays: null,
    carryForward: { enabled: false, maxDays: null },
    notes: 'Requires prior approval from the Head of Department and Principal. Does not count towards service length for certain benefits.',
  },
  {
    id: 'lt_7',
    name: 'Compensatory Off',
    abbreviation: 'Comp-Off',
    annualQuota: 10,
    allowHalfDays: true,
    requiresDocumentationAfterDays: null,
    carryForward: { enabled: true, maxDays: 5 },
    notes: 'Granted for working on holidays or weekends with prior approval. Must be availed within 60 days of earning it.',
  },
  {
    id: 'lt_8',
    name: 'Duty Leave',
    abbreviation: 'DL',
    annualQuota: 20,
    allowHalfDays: false,
    requiresDocumentationAfterDays: 1,
    carryForward: { enabled: false, maxDays: null },
    notes: 'For attending official duties like seminars, conferences, workshops, or examination work outside the institution.',
  }
];

const DEFAULT_LEAVE_TYPE: Omit<LeaveType, 'id'> = {
    name: '',
    abbreviation: '',
    annualQuota: 10,
    allowHalfDays: true,
    requiresDocumentationAfterDays: null,
    carryForward: { enabled: false, maxDays: null },
    notes: '',
};


// --- UI Sub-Components ---

const LeaveTypeModal = ({
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
    const [currentConfig, setCurrentConfig] = useState<Omit<LeaveType, 'id'>>(DEFAULT_LEAVE_TYPE);

    useEffect(() => {
        if (isOpen) {
            setCurrentConfig(leaveType ? { ...leaveType } : DEFAULT_LEAVE_TYPE);
        }
    }, [leaveType, isOpen]);

    const handleSave = () => {
        const id = leaveType ? leaveType.id : `lt_${Date.now()}`;
        onSave({ id, ...currentConfig });
    };

    const isFormValid = currentConfig.name && currentConfig.abbreviation && currentConfig.annualQuota > 0;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{leaveType ? 'Edit Leave Type' : 'Add New Leave Type'}</h2>
                    <button onClick={onClose} className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"><X size={24} /></button>
                </div>
                
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leave Name</label>
                            <input type="text" placeholder="e.g., Maternity Leave" value={currentConfig.name} onChange={(e) => setCurrentConfig(p => ({ ...p, name: e.target.value }))} className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Abbreviation</label>
                            <input type="text" placeholder="e.g., ML" value={currentConfig.abbreviation} onChange={(e) => setCurrentConfig(p => ({ ...p, abbreviation: e.target.value }))} className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400"/>
                        </div>
                    </div>

                    {/* Quota and Half-days */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Quota (Days)</label>
                            <input type="number" value={currentConfig.annualQuota} onChange={(e) => setCurrentConfig(p => ({ ...p, annualQuota: parseInt(e.target.value, 10) || 0 }))} className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
                        </div>
                        <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md h-full">
                            <input type="checkbox" id="allowHalfDays" checked={currentConfig.allowHalfDays} onChange={(e) => setCurrentConfig(p => ({ ...p, allowHalfDays: e.target.checked }))} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                            <label htmlFor="allowHalfDays" className="ml-3 block text-sm font-medium text-gray-800 dark:text-gray-200">Allow Half-Day Applications</label>
                        </div>
                    </div>
                    
                    {/* Documentation Policy */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                         <div className="flex flex-wrap items-center">
                            <input type="checkbox" id="requiresDoc" checked={currentConfig.requiresDocumentationAfterDays !== null} onChange={(e) => setCurrentConfig(p => ({ ...p, requiresDocumentationAfterDays: e.target.checked ? 1 : null }))} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                             <label htmlFor="requiresDoc" className="ml-3 flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                                 <FileText size={16} /> Requires Documentation After
                            </label>
                            {currentConfig.requiresDocumentationAfterDays !== null && (
                                <div className="flex items-center mt-2 sm:mt-0 sm:ml-2">
                                    <input type="number" value={currentConfig.requiresDocumentationAfterDays || 1} onChange={(e) => setCurrentConfig(p => ({ ...p, requiresDocumentationAfterDays: parseInt(e.target.value) || 1 }))} className="w-20 p-1 mx-2 text-center border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-500"/>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">consecutive days</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Carry Forward Policy */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center">
                           <input type="checkbox" id="carryForward" checked={currentConfig.carryForward.enabled} onChange={(e) => setCurrentConfig(p => ({ ...p, carryForward: { ...p.carryForward, enabled: e.target.checked, maxDays: e.target.checked ? 10 : null } }))} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                            <label htmlFor="carryForward" className="ml-3 flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                                <ArrowRightLeft size={16} /> Allow Carry Forward
                            </label>
                        </div>
                        {currentConfig.carryForward.enabled && (
                            <div className="mt-3 pl-8 flex items-center">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Max Days to Carry Forward:</label>
                                <input type="number" placeholder="e.g., 15" value={currentConfig.carryForward.maxDays || ''} onChange={(e) => setCurrentConfig(p => ({ ...p, carryForward: { ...p.carryForward, maxDays: parseInt(e.target.value) || null } }))} className="w-24 p-1 text-center border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-500 dark:placeholder-gray-400"/>
                            </div>
                        )}
                    </div>

                     {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Policy Notes / Description</label>
                        <textarea rows={3} placeholder="Add any specific rules or details..." value={currentConfig.notes} onChange={(e) => setCurrentConfig(p => ({ ...p, notes: e.target.value }))} className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400"/>
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

const LeaveTypeCard = ({ leaveType, onEdit, onDelete }: { leaveType: LeaveType, onEdit: () => void, onDelete: () => void }) => (
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
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 h-10 overflow-hidden flex-grow">{leaveType.notes}</p>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center" title="Annual Quota">
                <CalendarDays size={18} className="text-teal-600 dark:text-teal-400 mr-2 flex-shrink-0" />
                <span className="font-semibold text-gray-700 dark:text-gray-200">{leaveType.annualQuota} Days / Year</span>
            </div>
            <div className="flex items-center" title="Carry Forward">
                <ArrowRightLeft size={18} className={`mr-2 flex-shrink-0 ${leaveType.carryForward.enabled ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                <span className={`${leaveType.carryForward.enabled ? 'text-gray-700 dark:text-gray-200 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                    {leaveType.carryForward.enabled ? `Up to ${leaveType.carryForward.maxDays || '∞'} days` : 'No Carry Over'}
                </span>
            </div>
            <div className="flex items-center" title="Documentation Required">
                <FileText size={18} className={`mr-2 flex-shrink-0 ${leaveType.requiresDocumentationAfterDays ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400'}`} />
                 <span className={`${leaveType.requiresDocumentationAfterDays ? 'text-gray-700 dark:text-gray-200 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                    {leaveType.requiresDocumentationAfterDays ? `Note after ${leaveType.requiresDocumentationAfterDays} days` : 'No Note Needed'}
                </span>
            </div>
            <div className="flex items-center" title="Half-Day Option">
                 <ChevronsRight size={18} className={`mr-2 flex-shrink-0 ${leaveType.allowHalfDays ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                 <span className={`${leaveType.allowHalfDays ? 'text-gray-700 dark:text-gray-200 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                    {leaveType.allowHalfDays ? 'Half-Days OK' : 'Full Days Only'}
                </span>
            </div>
        </div>
    </div>
);


// --- Main Component ---

export default function ConfigureFacultyLeave() {
    const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>(INITIAL_LEAVE_TYPES);
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
            // Update existing
            setLeaveTypes(prev => prev.map(lt => lt.id === leaveTypeToSave.id ? leaveTypeToSave : lt));
        } else {
            // Add new
            setLeaveTypes(prev => [...prev, leaveTypeToSave]);
        }
        handleCloseModal();
    };

    const handleDeleteLeaveType = (id: string) => {
        // In a real app, you would show a confirmation dialog first.
        if (window.confirm('Are you sure you want to delete this leave type?')) {
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
                                Faculty Leave Policy
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Create and manage the types of leave available to faculty members.</p>
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
                                <LeaveTypeCard
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

                <footer className="text-center mt-12">
                     <button className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
                        <Save className="mr-2" /> Save & Publish Policy
                    </button>
                </footer>
            </div>

            <LeaveTypeModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveLeaveType}
                leaveType={editingLeaveType}
            />
        </div>
    );
}

