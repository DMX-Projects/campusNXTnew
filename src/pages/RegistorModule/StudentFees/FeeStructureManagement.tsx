import React, { useState } from 'react';
import { Plus, Edit, Eye, Trash2, Search, Filter, GraduationCap, Calendar, Sun, Moon, IndianRupee, UserRound ,} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { CategoryScale } from 'chart.js';

// Types
interface FeeHead {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

interface FeeStructureItem {
  feeHeadId: string;
  amount: number;
  isOptional: boolean;
}

interface FeeStructure {
  id: string;
  name: string;
  Department: string;
  Program: string;
  academicYear: string;
    Semester: string;
    Year: string;
    Category: string;
  items: FeeStructureItem[];
  totalAmount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

type ActiveTab = 'fee-heads' | 'fee-structures';
type ModalType = 'fee-head' | 'fee-structure' | 'view-structure' | null;

const FeeStructureManagement: React.FC = () => {
  const { isDark} = useTheme();
  const theme = isDark ? 'dark' : 'light';

  const [activeTab, setActiveTab] = useState<ActiveTab>('fee-heads');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('all');
  const [editingItem, setEditingItem] = useState<any>(null);

  // Sample data
  const [feeHeads, setFeeHeads] = useState<FeeHead[]>([
    { id: '1', name: 'Tuition Fee', description: 'Main academic fee for Department instruction', isActive: true, createdAt: '2024-01-15' },
    { id: '2', name: 'Exam Fee', description: 'Fee for examinations and assessments', isActive: true, createdAt: '2024-01-15' },
    { id: '3', name: 'Library Fee', description: 'Access to library resources and facilities', isActive: true, createdAt: '2024-01-15' },
    { id: '4', name: 'Lab Fee', description: 'Laboratory equipment and materials', isActive: true, createdAt: '2024-01-15' }
  ]);

  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([
    {
      id: '1',
      name: 'Computer Science - Standard',
      Department: 'Computer Science',
      Program: 'Engineering',
      academicYear: '2024-25',
      Semester: 'I-Semester',
      Category: 'General',
      Year: 'Year-1',
      items: [
        { feeHeadId: '1', amount: 50000, isOptional: false },
        { feeHeadId: '2', amount: 5000, isOptional: false },
        { feeHeadId: '3', amount: 3000, isOptional: false },
        { feeHeadId: '4', amount: 8000, isOptional: false }
      ],
      totalAmount: 66000,
      isActive: true,
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      name: 'Business Administration - Premium',
      Department: 'Business Administration',
      Program: 'Management',
      academicYear: '2024-25',
      Semester: 'II-Semester',
      Category: 'sc',
      Year: 'Year-2',
      items: [
        { feeHeadId: '1', amount: 40000, isOptional: false },
        { feeHeadId: '2', amount: 4000, isOptional: false },
        { feeHeadId: '3', amount: 2500, isOptional: false }
      ],
      totalAmount: 46500,
      isActive: true,
      createdAt: '2024-01-22',
      updatedAt: '2024-01-22'
    }
  ]);

  // Theme classes
  const themeClasses = {
    light: {
      bg: 'bg-white',
      cardBg: 'bg-white',
      text: 'text-slate-900',
      textSecondary: 'text-slate-600',
      textMuted: 'text-slate-500',
      border: 'border-slate-200',
      hover: 'hover:bg-slate-50',
      hoverCard: 'hover:bg-slate-25',
      button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
      buttonSecondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300',
      buttonDanger: 'text-red-600 hover:bg-red-50 hover:text-red-700',
      input: 'bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400',
      modal: 'bg-white',
      overlay: 'bg-black/50 backdrop-blur-sm',
      activeTab: 'border-blue-500 text-blue-600',
      inactiveTab: 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
      statusActive: 'bg-emerald-100 text-emerald-800',
      statusInactive: 'bg-red-100 text-red-800',
      highlight: 'bg-blue-50 border-blue-200',
      shadow: 'shadow-sm',
      shadowLarge: 'shadow-xl'
    },
    dark: {
      bg: 'bg-gray-900',
      cardBg: 'bg-slate-800',
      text: 'text-slate-100',
      textSecondary: 'text-slate-300',
      textMuted: 'text-slate-400',
      border: 'border-slate-700',
      hover: 'hover:bg-slate-700',
      hoverCard: 'hover:bg-slate-750',
      button: 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm',
      buttonSecondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600',
      buttonDanger: 'text-red-400 hover:bg-red-950 hover:text-red-300',
      input: 'bg-slate-700 border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400',
      modal: 'bg-slate-800',
      overlay: 'bg-black/70 backdrop-blur-sm',
      activeTab: 'border-blue-400 text-blue-400',
      inactiveTab: 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600',
      statusActive: 'bg-emerald-900 text-emerald-300',
      statusInactive: 'bg-red-900 text-red-300',
      highlight: 'bg-slate-750 border-slate-600',
      shadow: 'shadow-sm shadow-black/20',
      shadowLarge: 'shadow-xl shadow-black/30'
    }
  };

  const currentTheme = themeClasses[theme];

  // -------------------- MODALS --------------------
  const FeeHeadModal: React.FC = () => {
    const [formData, setFormData] = useState({
      name: editingItem?.name || '',
      description: editingItem?.description || '',
      isActive: editingItem?.isActive ?? true
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (editingItem) {
        setFeeHeads(prev => prev.map(item => 
          item.id === editingItem.id 
            ? { ...item, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
            : item
        ));
      } else {
        const newFeeHead: FeeHead = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setFeeHeads(prev => [...prev, newFeeHead]);
      }
      setActiveModal(null);
      setEditingItem(null);
    };

    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${currentTheme.overlay}`}>
        <div className={`w-full max-w-md rounded-xl ${currentTheme.modal} p-6 ${currentTheme.shadowLarge} border ${currentTheme.border}`}>
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-6`}>
            {editingItem ? 'Fees Type ' : 'Create New Fees '}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Fees Type</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border ${currentTheme.input} transition-colors`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border ${currentTheme.input} transition-colors`}
                rows={3}
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3"
              />
              <label htmlFor="isActive" className={`text-sm ${currentTheme.text}`}>Active</label>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setActiveModal(null)} className={`px-4 py-2 rounded-lg ${currentTheme.buttonSecondary}`}>Cancel</button>
              <button type="submit" className={`px-4 py-2 rounded-lg ${currentTheme.button}`}>{editingItem ? 'Update' : 'Create'}</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const FeeStructureModal: React.FC = () => {
    const [formData, setFormData] = useState({
      name: editingItem?.name || '',
      Department: editingItem?.Department || '',
      Program: editingItem?.Program || '',
      academicYear: editingItem?.academicYear || '2024-25',
      items: editingItem?.items || [],
      isActive: editingItem?.isActive ?? true,
      FeeStatus: editingItem?.FeeStatus || '',
      Semester: editingItem?.Semester || '',
      Year: editingItem?.Year || '',
      Category: editingItem?.Category || '',
    });

    const addFeeItem = () => {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, { feeHeadId: '', amount: 0, isOptional: false }]
      }));
    };

    const removeFeeItem = (index: number) => {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    };

    const updateFeeItem = (index: number, field: keyof FeeStructureItem, value: any) => {
      setFormData(prev => ({
        ...prev,
        items: prev.items.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }));
    };

    const totalAmount = formData.items.reduce((sum, item) => sum + item.amount, 0);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const structureData = {
        ...formData,
        totalAmount
      };

      if (editingItem) {
        setFeeStructures(prev => prev.map(item => 
          item.id === editingItem.id 
            ? { ...item, ...structureData, updatedAt: new Date().toISOString().split('T')[0] }
            : item
        ));
      } else {
        const newStructure: FeeStructure = {
          id: Date.now().toString(),
          ...structureData,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };
        setFeeStructures(prev => [...prev, newStructure]);
      }
      setActiveModal(null);
      setEditingItem(null);
    };

    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${currentTheme.overlay}`}>
        <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl ${currentTheme.modal} p-6 ${currentTheme.shadowLarge} border ${currentTheme.border}`}>
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-6`}>
            {editingItem ? 'Edit Fee ' : 'Create Fee'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
              <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Fee Type</label>
                <select
                  value={formData.FeeStatus}
                  onChange={(e) => setFormData(prev => ({ ...prev, FeeStatus: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border ${currentTheme.input} transition-colors`}
                  required
                >
                  <option value="">Select Fees</option>
                  <option value="Tuition">Tuition</option>
                  <option value="Exam Fees">Exam Fees</option>
                  <option value="Library Fees">Library Fees</option>
                  <option value="Lab Fees">Lab Fees</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Department</label>
                <select
                  value={formData.Department}
                  onChange={(e) => setFormData(prev => ({ ...prev, Department: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border ${currentTheme.input} transition-colors`}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Program</label>
                <select
                  value={formData.Program}
                  onChange={(e) => setFormData(prev => ({ ...prev, Program: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border ${currentTheme.input} transition-colors`}
                  required
                >
                  <option value="">Select Program</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Management">Management</option>
                  <option value="Arts">Arts</option>
                  <option value="Science">Science</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Year</label>
                <select
                  value={formData.Year}
                  onChange={(e) => setFormData(prev => ({ ...prev, Year: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border ${currentTheme.input} transition-colors`}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="Year-1">Year-1</option>
                  <option value="Year-2">Year-2</option>
                  <option value="Year-3">Year-3</option>
                  <option value="Year-4">Year-4</option>
                </select>
              </div>
                           
                           <div>
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Semester</label>
                <select
                  value={formData.Semester}
                  onChange={(e) => setFormData(prev => ({ ...prev, Semester: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border ${currentTheme.input} transition-colors`}
                  required
                >
                  <option value="I-Semester">I-Semester</option>
                  <option value="II-Semester">II-Semester</option>
                  <option value="III-Semester">III-Semester</option>
                  <option value="IV-Semester">IV-Semester</option>
                  <option value="V-Semester">V-Semester</option>
                  <option value="VI-Semester">VI-Semester</option>
                  <option value="VII-Semester">VII-Semester</option>
                  <option value="VIII-Semester">VIII-Semester</option>
                </select>
              </div>
               <div>
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Category</label>
                <select
                  value={formData.Category}
                  onChange={(e) => setFormData(prev => ({ ...prev, Category: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border ${currentTheme.input} transition-colors`}
                  required
                >
                  <option value="General">General</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="OBC">OBC</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Academic Year</label>
                <select
                  value={formData.academicYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, academicYear: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border ${currentTheme.input} transition-colors`}
                  required
                >
                  <option value="2024-25">2024-25</option>
                  <option value="2025-26">2025-26</option>
                  <option value="2026-27">2026-27</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className={`text-md font-medium ${currentTheme.text}`}>Add Fees</h4>
                <button
                  type="button"
                  onClick={addFeeItem}
                 className={`px-4 py-2.5 rounded-lg ${currentTheme.button} flex items-center gap-2 whitespace-nowrap transition-colors font-medium`}
                >
                 <Plus className="w-4 h-4 mr-2" /> Add Fees
                </button>
                
              </div>
              <div className="space-y-3">
                {formData.items.map((item, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${currentTheme.border} ${currentTheme.highlight}`}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <select
                        value={item.feeHeadId}
                        onChange={(e) => updateFeeItem(index, 'feeHeadId', e.target.value)}
                        className={`px-3 py-2 rounded-lg border ${currentTheme.input} text-sm transition-colors`}
                        required
                      >
                        <option value="">Select Fees</option>
                        {feeHeads.filter(head => head.isActive).map(head => (
                          <option key={head.id} value={head.id}>{head.name}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        placeholder="Amount"
                        value={item.amount}
                        onChange={(e) => updateFeeItem(index, 'amount', parseFloat(e.target.value) || 0)}
                        className={`px-3 py-2 rounded-lg border ${currentTheme.input} text-sm transition-colors`}
                        required
                      />
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={item.isOptional}
                          onChange={(e) => updateFeeItem(index, 'isOptional', e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2"
                        />
                        <span className={currentTheme.text}>Optional</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeFeeItem(index)}
                        className={`px-3 py-2 rounded-lg ${currentTheme.buttonDanger} text-sm transition-colors`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-4 rounded-lg border ${currentTheme.border} ${currentTheme.highlight}`}>
              <div className="flex justify-between items-center">
                <span className={`font-medium ${currentTheme.text}`}>Total Amount:</span>
                <span className={`text-xl font-bold ${currentTheme.text}`}>₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="structureActive"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3"
              />
              <label htmlFor="structureActive" className={`text-sm ${currentTheme.text}`}>
                Active
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className={`flex-1 px-4 py-2.5 rounded-lg ${currentTheme.button} font-medium transition-colors`}
              >
                {editingItem ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  setEditingItem(null);
                }}
                className={`flex-1 px-4 py-2.5 rounded-lg ${currentTheme.buttonSecondary} font-medium transition-colors`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ViewStructureModal: React.FC = () => {
    if (!editingItem) return null;

    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${currentTheme.overlay}`}>
        <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl ${currentTheme.modal} p-6 ${currentTheme.shadowLarge} border ${currentTheme.border}`}>
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-6`}>
            Fee Structure Details
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className={`text-sm ${currentTheme.textMuted}`}>Branch Name:</span>
                <p className={`font-medium ${currentTheme.text} mt-1`}>{editingItem.name}</p>
              </div>
              <div>
                <span className={`text-sm ${currentTheme.textMuted}`}>Department:</span>
                <p className={`font-medium ${currentTheme.text} mt-1`}>{editingItem.Department}</p>
              </div>
              <div>
                <span className={`text-sm ${currentTheme.textMuted}`}>Program:</span>
                <p className={`font-medium ${currentTheme.text} mt-1`}>{editingItem.Program}</p>
              </div>
              <div>
                <span className={`text-sm ${currentTheme.textMuted}`}>Academic Year:</span>
                <p className={`font-medium ${currentTheme.text} mt-1`}>{editingItem.academicYear}</p>
              </div>
              
            </div>
            <div>
  <span className={`text-sm ${currentTheme.textMuted}`}>Semester:</span>
  <p className={`font-medium ${currentTheme.text} mt-1`}>{editingItem.Semester}</p>
</div>

            <div>
              <h4 className={`text-md font-medium ${currentTheme.text} mb-4`}>Fee Breakdown</h4>
              <div className="space-y-3">
                {editingItem.items.map((item: FeeStructureItem, index: number) => {
                  const feeHead = feeHeads.find(head => head.id === item.feeHeadId);
                  return (
                    <div key={index} className={`flex justify-between items-center p-4 rounded-lg border ${currentTheme.border} ${currentTheme.highlight}`}>
                      <div>
                        <span className={`font-medium ${currentTheme.text}`}>{feeHead?.name}</span>
                        {item.isOptional && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full">
                            Optional
                          </span>
                        )}
                      </div>
                      <span className={`font-medium ${currentTheme.text}`}>₹{item.amount.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`p-4 rounded-lg border ${currentTheme.border} ${currentTheme.highlight}`}>
              <div className="flex justify-between items-center">
                <span className={`text-lg font-medium ${currentTheme.text}`}>Total Amount:</span>
                <span className={`text-xl font-bold ${currentTheme.text}`}>₹{editingItem.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  setActiveModal(null);
                  setEditingItem(null);
                }}
                className={`px-6 py-2.5 rounded-lg ${currentTheme.buttonSecondary} font-medium transition-colors`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filter functions
  const filteredFeeHeads = feeHeads.filter(head =>
    head.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    head.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFeeStructures = feeStructures.filter(structure => {
    const matchesSearch = structure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         structure.Department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterProgram === 'all' || structure.Program === filterProgram;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`${currentTheme.bg} min-h-screen transition-colors duration-300 p-6`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${currentTheme.text}`}>Fee Structure Management</h1>
         
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-300 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('fee-heads')}
          className={`px-4 py-2 border-b-2 font-medium flex items-center gap-2 ${activeTab === 'fee-heads' ? currentTheme.activeTab : currentTheme.inactiveTab}`}
        >
          <IndianRupee size={16} />
         All Fees ({feeHeads.length})
        </button>
        <button
          onClick={() => setActiveTab('fee-structures')}
          className={`px-4 py-2 border-b-2 font-medium flex items-center gap-2 ${activeTab === 'fee-structures' ? currentTheme.activeTab : currentTheme.inactiveTab}`}
        >
          <GraduationCap size={16} />
          Fee Structures ({feeStructures.length})
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme.textMuted}`} size={20} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${currentTheme.input} transition-colors`}
          />
        </div>
        {activeTab === 'fee-structures' && (
          <div className="flex items-center gap-2">
            <Filter size={20} className={currentTheme.textMuted} />
            <select
              value={filterProgram}
              onChange={(e) => setFilterProgram(e.target.value)}
              className={`px-3 py-2.5 rounded-lg border ${currentTheme.input} transition-colors`}
            >
              <option value="all">Program</option>
              <option value="Engineering">Engineering</option>
              <option value="Management">Management</option>
              <option value="Arts">Arts</option>
              <option value="Science">Science</option>
            </select>
          </div>
        )}
        <button
          onClick={() => setActiveModal(activeTab === 'fee-heads' ? 'fee-head' : 'fee-structure')}
          className={`px-4 py-2.5 rounded-lg ${currentTheme.button} flex items-center gap-2 whitespace-nowrap transition-colors font-medium`}
        >
          <Plus size={20} />
          {activeTab === 'fee-heads' ? 'Add Fees' : 'Create Structure'}
        </button>
      </div>

      {/* Content */}
      <div>
        {/* Fee Heads Tab */}
        {activeTab === 'fee-heads' && (
          <div>
            {filteredFeeHeads.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredFeeHeads.map((head) => (
                  <div key={head.id} className={`${currentTheme.cardBg} ${currentTheme.border} border rounded-xl p-5 ${currentTheme.shadow} hover:shadow-md transition-all duration-200`}>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`font-semibold ${currentTheme.text}`}>{head.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        head.isActive ? currentTheme.statusActive : currentTheme.statusInactive
                      }`}>
                        {head.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className={`${currentTheme.textSecondary} text-sm mb-4 line-clamp-2`}>{head.description}</p>
                    <div className={`text-xs ${currentTheme.textMuted} mb-4`}>
                      Created: {new Date(head.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(head);
                          setActiveModal('fee-head');
                        }}
                        className={`flex-1 px-3 py-2 rounded-lg ${currentTheme.buttonSecondary} text-sm flex items-center justify-center gap-1 transition-colors`}
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => setFeeHeads(prev => prev.filter(item => item.id !== head.id))}
                        className={`px-3 py-2 rounded-lg ${currentTheme.buttonDanger} text-sm flex items-center justify-center transition-colors`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-16 ${currentTheme.cardBg} rounded-xl border ${currentTheme.border} ${currentTheme.shadow}`}>
                <div className={`mx-auto w-16 h-16 ${currentTheme.textMuted} mb-6 flex items-center justify-center`}>
                  <IndianRupee size={64} />
                </div>
                <h3 className={`text-lg font-medium ${currentTheme.text} mb-3`}>
                  No Fees Found
                </h3>
                <p className={`${currentTheme.textSecondary} mb-8 max-w-md mx-auto`}>
                  Create your first fee  to get started with fee management. Fees are the building blocks of your fee structures.
                </p>
                <button
                  onClick={() => setActiveModal('fee-head')}
                  className={`px-8 py-3 rounded-lg ${currentTheme.button} flex items-center gap-2 mx-auto font-medium transition-colors`}
                >
                  <Plus size={20} />
                  Create Fees
                </button>
              </div>
            )}
          </div>
        )}

        {/* Fee Structures Tab */}
        {activeTab === 'fee-structures' && (
          <div>
            {filteredFeeStructures.length > 0 ? (
              <div className="space-y-4">
                {filteredFeeStructures.map((structure) => (
                  <div key={structure.id} className={`${currentTheme.cardBg} ${currentTheme.border} border rounded-xl p-6 ${currentTheme.shadow} hover:shadow-md transition-all duration-200`}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className={`text-lg font-semibold ${currentTheme.text}`}>{structure.name}</h3>
                          <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                            structure.isActive ? currentTheme.statusActive : currentTheme.statusInactive
                          }`}>
                            {structure.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <GraduationCap size={16} className={currentTheme.textMuted} />
                            <span className={`text-sm ${currentTheme.textSecondary}`}>Department:</span>
                            <span className={`text-sm font-medium ${currentTheme.text}`}>{structure.Department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Filter size={16} className={currentTheme.textMuted} />
                            <span className={`text-sm ${currentTheme.textSecondary}`}>Program:</span>
                            <span className={`text-sm font-medium ${currentTheme.text}`}>{structure.Program}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className={currentTheme.textMuted} />
                            <span className={`text-sm ${currentTheme.textSecondary}`}>Academic Year:</span>
                            <span className={`text-sm font-medium ${currentTheme.text}`}>{structure.academicYear}</span>
                          </div>
                          
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
  {/* ...existing columns... */}
  <div className="flex items-center gap-2">
    <Calendar size={16} className={currentTheme.textMuted} />
    <span className={`text-sm ${currentTheme.textSecondary}`}>Semester:</span>
    <span className={`text-sm font-medium ${currentTheme.text}`}>{structure.Semester}</span>
</div>

<div className="flex items-center gap-2">
    <Calendar size={16} className={currentTheme.textMuted} />
    <span className={`text-sm ${currentTheme.textSecondary}`}>Year:</span>
    <span className={`text-sm font-medium ${currentTheme.text}`}>{structure.Year}</span>
  </div>
    <div className="flex items-center gap-2">
                            <UserRound size={16} className={currentTheme.textMuted} />
                            <span className={`text-sm ${currentTheme.textSecondary}`}>Category:</span>
                            <span className={`text-sm font-medium ${currentTheme.text}`}>{structure.Category}</span>
                          </div>
  </div>
  


                        <div className="flex flex-wrap items-center gap-6">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm ${currentTheme.textSecondary}`}>Fee Items:</span>
                            <span className={`text-sm font-medium ${currentTheme.text} bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full`}>{structure.items.length}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IndianRupee size={16} className={currentTheme.textMuted} />
                            <span className={`text-lg font-bold ${currentTheme.text}`}>{structure.totalAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 lg:flex-col">
                        <button
                          onClick={() => {
                            setEditingItem(structure);
                            setActiveModal('view-structure');
                          }}
                          className={`px-4 py-2.5 rounded-lg ${currentTheme.buttonSecondary} text-sm flex items-center justify-center gap-2 transition-colors font-medium`}
                        >
                          <Eye size={16} />
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            setEditingItem(structure);
                            setActiveModal('fee-structure');
                          }}
                          className={`px-4 py-2.5 rounded-lg ${currentTheme.button} text-sm flex items-center justify-center gap-2 transition-colors font-medium`}
                        >
                          <Edit size={16} />
                          Edit Structure
                        </button>
                      </div>
                    </div>
                    <div className={`mt-5 pt-4 border-t ${currentTheme.border}`}>
                      <div className={`text-xs ${currentTheme.textMuted} flex flex-wrap gap-4`}>
                        <span>Created: {new Date(structure.createdAt).toLocaleDateString()}</span>
                        <span>Updated: {new Date(structure.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-16 ${currentTheme.cardBg} rounded-xl border ${currentTheme.border} ${currentTheme.shadow}`}>
                <div className={`mx-auto w-16 h-16 ${currentTheme.textMuted} mb-6 flex items-center justify-center`}>
                  <GraduationCap size={64} />
                </div>
                <h3 className={`text-lg font-medium ${currentTheme.text} mb-3`}>
                  No Fee Structures Found
                </h3>
                <p className={`${currentTheme.textSecondary} mb-8 max-w-md mx-auto`}>
                  Create your first fee structure to define Department pricing. Fee structures combine multiple fee heads into comprehensive packages.
                </p>
                <button
                  onClick={() => setActiveModal('fee-structure')}
                  className={`px-8 py-3 rounded-lg ${currentTheme.button} flex items-center gap-2 mx-auto font-medium transition-colors`}
                >
                  <Plus size={20} />
                  Create Fee Structure
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {activeModal === 'fee-head' && <FeeHeadModal />}
      {activeModal === 'fee-structure' && <FeeStructureModal />}
      {activeModal === 'view-structure' && <ViewStructureModal />}
    </div>
  );
};

export default FeeStructureManagement;