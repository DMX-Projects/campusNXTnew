
import React, { useState, useEffect } from 'react';
import { Search, Download, CreditCard as Edit, Plus, Eye } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

interface QuotaFeeDetail {
  id: string;
  quotaType: 'Government' | 'Management' | 'NRI' | 'COMEDK' | 'KCET' | 'Minority' | 'Sports' | 'Defense';
  courseName: string;
  branch: string;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  annualFee: number;
  admissionFee: number;
  securityDeposit: number;
  developmentFee: number;
  examFee: number;
  libraryFee: number;
  labFee: number;
  otherFees: number;
  totalFee: number;
  hostelFee?: number;
  messFee?: number;
  status: 'Active' | 'Inactive';
  academicYear: string;
  lastUpdated: string;
  updatedBy: string;
}

const themeClasses = {
  light: {
    bg: 'bg-white',
    cardBg: 'bg-white',
    text: 'text-slate-900',
    textSecondary: 'text-slate-600',
    textMuted: 'text-slate-500',
    border: 'border-slate-200',
    hover: 'hover:bg-slate-50',
    button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
    buttonSecondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300',
    input: 'bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400',
    tableHeader: 'bg-slate-50',
    statusPaid: 'bg-emerald-100 text-emerald-800',
    statusPending: 'bg-yellow-100 text-yellow-800',
    statusFailed: 'bg-red-100 text-red-800',
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
    button: 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm',
    buttonSecondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600',
    input: 'bg-slate-700 border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400',
    tableHeader: 'bg-slate-750',
    statusPaid: 'bg-emerald-900 text-emerald-300',
    statusPending: 'bg-yellow-900 text-yellow-300',
    statusFailed: 'bg-red-900 text-red-300',
    shadow: 'shadow-sm shadow-black/20',
    shadowLarge: 'shadow-xl shadow-black/30'
  }
};

const quotaTypes: Array<'All'> & QuotaFeeDetail['quotaType'][] = [
  'All', 'Government', 'Management', 'NRI', 'COMEDK', 'KCET', 'Minority', 'Sports', 'Defense'
];
const categories: Array<'All'> & QuotaFeeDetail['category'][] = [
  'All', 'General', 'OBC', 'SC', 'ST', 'EWS'
];

const AdmissionQuota: React.FC = () => {
  const { isDark } = useTheme();
  const theme = isDark ? 'dark' : 'light';
  const currentTheme = themeClasses[theme];

  const [quotaFees, setQuotaFees] = useState<QuotaFeeDetail[]>([]);
  const [filteredFees, setFilteredFees] = useState<QuotaFeeDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuota, setSelectedQuota] = useState<'All' | QuotaFeeDetail['quotaType']>('All');
  const [selectedCategory, setSelectedCategory] = useState<'All' | QuotaFeeDetail['category']>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedFeeDetail, setSelectedFeeDetail] = useState<QuotaFeeDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    id: '',
    quotaType: 'Government' as QuotaFeeDetail['quotaType'],
    courseName: '',
    branch: '',
    category: 'General' as QuotaFeeDetail['category'],
    annualFee: '',
    admissionFee: '',
    securityDeposit: '',
    developmentFee: '',
    examFee: '',
    libraryFee: '',
    labFee: '',
    otherFees: '',
    hostelFee: '',
    messFee: '',
    status: 'Active' as QuotaFeeDetail['status'],
    academicYear: '',
    updatedBy: 'Admin'
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const sample: QuotaFeeDetail[] = [
      {
        id: '1', quotaType: 'Government', courseName: 'B.E.', branch: 'Computer Science Engineering', category: 'General',
        annualFee: 44200, admissionFee: 5000, securityDeposit: 10000, developmentFee: 15000, examFee: 3000,
        libraryFee: 2000, labFee: 8000, otherFees: 2000, totalFee: 89200, hostelFee: 45000, messFee: 48000,
        status: 'Active', academicYear: '2025-26', lastUpdated: '2025-09-28', updatedBy: 'Admin'
      },
      {
        id: '2', quotaType: 'Management', courseName: 'B.E.', branch: 'Computer Science Engineering', category: 'General',
        annualFee: 750000, admissionFee: 25000, securityDeposit: 50000, developmentFee: 100000, examFee: 5000,
        libraryFee: 5000, labFee: 25000, otherFees: 15000, totalFee: 975000, hostelFee: 120000, messFee: 60000,
        status: 'Active', academicYear: '2025-26', lastUpdated: '2025-09-28', updatedBy: 'Registrar'
      },
      {
        id: '3', quotaType: 'NRI', courseName: 'B.E.', branch: 'Computer Science Engineering', category: 'General',
        annualFee: 1500000, admissionFee: 50000, securityDeposit: 100000, developmentFee: 200000, examFee: 10000,
        libraryFee: 10000, labFee: 50000, otherFees: 30000, totalFee: 1950000, hostelFee: 150000, messFee: 80000,
        status: 'Active', academicYear: '2025-26', lastUpdated: '2025-09-28', updatedBy: 'Admin'
      },
      { id: '4', quotaType: 'Government', courseName: 'B.E.', branch: 'Mechanical Engineering', category: 'OBC',
        annualFee: 44200, admissionFee: 5000, securityDeposit: 10000, developmentFee: 15000, examFee: 3000,
        libraryFee: 2000, labFee: 8000, otherFees: 2000, totalFee: 89200, hostelFee: 45000, messFee: 48000,
        status: 'Active', academicYear: '2025-26', lastUpdated: '2025-09-28', updatedBy: 'Admin'
      },
      {
        id: '5', quotaType: 'Management', courseName: 'B.E.', branch: 'Mechanical Engineering', category: 'OBC',
        annualFee: 750000, admissionFee: 25000, securityDeposit: 50000, developmentFee: 100000, examFee: 5000,
        libraryFee: 5000, labFee: 25000, otherFees: 15000, totalFee: 975000, hostelFee: 120000, messFee: 60000,
        status: 'Active', academicYear: '2025-26', lastUpdated: '2025-09-28', updatedBy: 'Registrar'
      },
     
    ];
    setQuotaFees(sample);
    setFilteredFees(sample);
  }, []);

  useEffect(() => {
    let data = [...quotaFees];
    if (searchTerm) {
      data = data.filter(f =>
        f.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.quotaType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedQuota !== 'All') {
      data = data.filter(f => f.quotaType === selectedQuota);
    }
    if (selectedCategory !== 'All') {
      data = data.filter(f => f.category === selectedCategory);
    }
    setFilteredFees(data);
  }, [searchTerm, selectedQuota, selectedCategory, quotaFees]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const handleViewDetails = (fee: QuotaFeeDetail) => {
    setSelectedFeeDetail(fee);
    setShowViewModal(true);
  };

  const openAddModal = () => {
    setForm({
      id: '', quotaType: 'Government', courseName: '', branch: '', category: 'General',
      annualFee: '', admissionFee: '', securityDeposit: '', developmentFee: '',
      examFee: '', libraryFee: '', labFee: '', otherFees: '', hostelFee: '',
      messFee: '', status: 'Active', academicYear: '', updatedBy: 'Admin'
    });
    setFormErrors({});
    setShowAddModal(true);
  };

  const openEditModal = (fee: QuotaFeeDetail) => {
    setForm({
      id: fee.id,
      quotaType: fee.quotaType,
      courseName: fee.courseName,
      branch: fee.branch,
      category: fee.category,
      annualFee: String(fee.annualFee),
      admissionFee: String(fee.admissionFee),
      securityDeposit: String(fee.securityDeposit),
      developmentFee: String(fee.developmentFee),
      examFee: String(fee.examFee),
      libraryFee: String(fee.libraryFee),
      labFee: String(fee.labFee),
      otherFees: String(fee.otherFees),
      hostelFee: fee.hostelFee ? String(fee.hostelFee) : '',
      messFee: fee.messFee ? String(fee.messFee) : '',
      status: fee.status,
      academicYear: fee.academicYear,
      updatedBy: fee.updatedBy
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  // const handleExport = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     alert('Data exported successfully!');
  //   }, 1000);
  // };
  const handleExport = () => {
  const data = [
    { id: '1', quotaType: 'Government', courseName: 'B.E.', branch: 'Computer Science Engineering', category: 'General',
      annualFee: 44200, admissionFee: 5000, securityDeposit: 10000, developmentFee: 15000, examFee: 3000,
      libraryFee: 2000, labFee: 8000, otherFees: 2000, totalFee: 89200, hostelFee: 45000, messFee: 48000, },
      { id: '2', quotaType: 'Management', courseName: 'B.E.', branch: 'Computer Science Engineering', category: 'General',
      annualFee: 750000, admissionFee: 25000, securityDeposit: 50000, developmentFee: 100000, examFee: 5000,
      libraryFee: 5000, labFee: 25000, otherFees: 15000, totalFee: 975000, hostelFee: 120000, messFee: 60000, },
      { id: '3', quotaType: 'NRI', courseName: 'B.E.', branch: 'Computer Science Engineering', category: 'General',
      annualFee: 1500000, admissionFee: 50000, securityDeposit: 100000, developmentFee: 200000, examFee: 10000,
      libraryFee: 10000, labFee: 50000, otherFees: 30000, totalFee: 1950000, hostelFee: 150000, messFee: 80000, },

  ];

  // Convert data to CSV string
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  for (const row of data) {
    const values = headers.map(header => `"${row[header]}"`);
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");

  // Create a Blob and download link
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'exported_data.csv';
  link.click();

  URL.revokeObjectURL(url);
  // alert('Data exported successfully!');
};


  function validateForm() {
    const errors: { [key: string]: string } = {};
    if (!form.courseName) errors.courseName = 'Course Name is required';
    if (!form.branch) errors.branch = 'Branch is required';
    if (!form.academicYear) errors.academicYear = 'Academic Year is required';
    ['annualFee', 'admissionFee', 'securityDeposit', 'developmentFee', 'examFee', 'libraryFee', 'labFee', 'otherFees'].forEach(key => {
      if (!form[key as keyof typeof form]) errors[key] = 'Required';
      else if (isNaN(Number(form[key as keyof typeof form]))) errors[key] = 'Must be a number';
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setFormErrors(errors => ({ ...errors, [name]: '' }));
  }

  function handleAddSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;
    const totalFee =
      Number(form.annualFee) + Number(form.admissionFee) + Number(form.securityDeposit) +
      Number(form.developmentFee) + Number(form.examFee) + Number(form.libraryFee) +
      Number(form.labFee) + Number(form.otherFees);

    const newItem: QuotaFeeDetail = {
      id: String(Date.now()),
      quotaType: form.quotaType,
      courseName: form.courseName,
      branch: form.branch,
      category: form.category,
      annualFee: Number(form.annualFee),
      admissionFee: Number(form.admissionFee),
      securityDeposit: Number(form.securityDeposit),
      developmentFee: Number(form.developmentFee),
      examFee: Number(form.examFee),
      libraryFee: Number(form.libraryFee),
      labFee: Number(form.labFee),
      otherFees: Number(form.otherFees),
      hostelFee: form.hostelFee ? Number(form.hostelFee) : undefined,
      messFee: form.messFee ? Number(form.messFee) : undefined,
      status: form.status,
      academicYear: form.academicYear,
      totalFee: totalFee,
      lastUpdated: new Date().toISOString().slice(0, 10),
      updatedBy: form.updatedBy
    };
    setQuotaFees(prev => [...prev, newItem]);
    setShowAddModal(false);
  }

  function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;
    const totalFee =
      Number(form.annualFee) + Number(form.admissionFee) + Number(form.securityDeposit) +
      Number(form.developmentFee) + Number(form.examFee) + Number(form.libraryFee) +
      Number(form.labFee) + Number(form.otherFees);

    setQuotaFees(prev => prev.map(item => item.id === form.id ? {
      ...item,
      quotaType: form.quotaType,
      courseName: form.courseName,
      branch: form.branch,
      category: form.category,
      annualFee: Number(form.annualFee),
      admissionFee: Number(form.admissionFee),
      securityDeposit: Number(form.securityDeposit),
      developmentFee: Number(form.developmentFee),
      examFee: Number(form.examFee),
      libraryFee: Number(form.libraryFee),
      labFee: Number(form.labFee),
      otherFees: Number(form.otherFees),
      hostelFee: form.hostelFee ? Number(form.hostelFee) : undefined,
      messFee: form.messFee ? Number(form.messFee) : undefined,
      status: form.status,
      academicYear: form.academicYear,
      totalFee: totalFee,
      lastUpdated: new Date().toISOString().slice(0, 10),
      updatedBy: form.updatedBy
    } : item));
    setShowEditModal(false);
  }

  const FormField = ({ label, name, type = 'text', required = false, options = null }: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    options?: string[] | null;
  }) => (
    <div>
      <label className={`block text-sm font-medium mb-1 ${currentTheme.text}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {options ? (
        <select
          name={name}
          value={form[name as keyof typeof form]}
          onChange={handleFormChange}
          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.input} ${
            formErrors[name] ? 'border-red-500' : ''
          }`}
          required={required}
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={form[name as keyof typeof form]}
          onChange={handleFormChange}
          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.input} ${
            formErrors[name] ? 'border-red-500' : ''
          }`}
          placeholder={`Enter ${label.toLowerCase()}`}
          required={required}
        />
      )}
      {formErrors[name] && (
        <p className="mt-1 text-sm text-red-500">{formErrors[name]}</p>
      )}
    </div>
  );

  return (
    <div className={`${currentTheme.bg} min-h-screen transition-colors duration-300`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto p-6 flex justify-between items-center">
        <div>
          <h1 className={`text-2xl font-bold ${currentTheme.text}`}>Admission Quota Fees Management</h1>
          <p className={`text-sm mt-1 ${currentTheme.textMuted}`}>Manage admission fees for different quota categories and courses</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={openAddModal}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${currentTheme.button}`}
          >
            <Plus size={16} /> Add New
          </button>
          {/* <button
            onClick={handleExport}
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : currentTheme.buttonSecondary
            }`}
          >
            <Download size={16} /> {loading ? 'Exporting...' : 'Export Data'}
          </button> */}
          <button
            onClick={handleExport}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${currentTheme.buttonSecondary}`}
          >
            <Download size={16} /> Export Data
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className={`max-w-7xl mx-auto p-6 mb-6 rounded-xl ${currentTheme.cardBg} ${currentTheme.shadow} border ${currentTheme.border}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400`} size={20} />
            <input
              type="text"
              placeholder="Search courses, branches, quota types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${currentTheme.input}`}
            />
          </div>
          
          <select
            value={selectedQuota}
            onChange={(e) => setSelectedQuota(e.target.value as 'All' | QuotaFeeDetail['quotaType'])}
            className={`px-3 py-2 rounded-lg border ${currentTheme.input}`}
          >
            {quotaTypes.map(quota => (
              <option key={quota} value={quota}>{quota} Quota</option>
            ))}
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as 'All' | QuotaFeeDetail['category'])}
            className={`px-3 py-2 rounded-lg border ${currentTheme.input}`}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category} Category</option>
            ))}
          </select>
          
          <div className={`flex items-center justify-between text-sm ${currentTheme.textSecondary}`}>
            <span>Showing {filteredFees.length} of {quotaFees.length} records</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`max-w-7xl mx-auto p-6 rounded-xl ${currentTheme.cardBg} ${currentTheme.shadow} overflow-hidden border ${currentTheme.border}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={currentTheme.tableHeader}>
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>Course & Branch</th>
                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>Quota Type</th>
                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>Category</th>
                <th className={`px-6 py-4 text-right text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>Annual Fee</th>
                <th className={`px-6 py-4 text-right text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>Total Fee</th>
                <th className={`px-6 py-4 text-center text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>Status</th>
                <th className={`px-6 py-4 text-center text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${currentTheme.border}`}>
              {filteredFees.map(fee => (
                <tr key={fee.id} className={`${currentTheme.hover} transition-colors`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${currentTheme.text}`}>{fee.courseName} - {fee.branch}</div>
                    <div className={`text-xs ${currentTheme.textSecondary}`}>{fee.academicYear}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      fee.quotaType === 'Government' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300' :
                      fee.quotaType === 'Management' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                      fee.quotaType === 'NRI' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {fee.quotaType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      fee.category === 'SC' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                      fee.category === 'OBC' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                      fee.category === 'EWS' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300' :
                      'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
                    }`}>
                      {fee.category}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right text-sm font-medium ${currentTheme.text}`}>{formatCurrency(fee.annualFee)}</td>
                  <td className={`px-6 py-4 text-right text-sm font-bold ${currentTheme.text}`}>{formatCurrency(fee.totalFee)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      fee.status === 'Active' ? currentTheme.statusPaid : currentTheme.statusFailed
                    }`}>
                      {fee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleViewDetails(fee)}
                        className={`p-2 rounded-lg ${currentTheme.hover} transition-colors ${currentTheme.textSecondary}`}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => openEditModal(fee)}
                        className={`p-2 rounded-lg ${currentTheme.hover} transition-colors ${currentTheme.textSecondary}`}
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredFees.length === 0 && (
          <div className="text-center py-8">
            <p className={`text-sm ${currentTheme.textMuted}`}>No quota fee records found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* View Modal */}
      {showViewModal && selectedFeeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl ${currentTheme.cardBg} ${currentTheme.shadowLarge} border ${currentTheme.border}`}>
            <div className="flex justify-between items-center p-6 border-b border-transparent">
              <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Fee Structure Detail</h3>
              <button onClick={() => setShowViewModal(false)} className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.textSecondary}`}>×</button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-medium mb-3 ${currentTheme.text}`}>Course Information</h4>
                  <div className={`space-y-2 text-sm ${currentTheme.textSecondary}`}>
                    <div><strong className={currentTheme.text}>Course:</strong> {selectedFeeDetail.courseName}</div>
                    <div><strong className={currentTheme.text}>Branch:</strong> {selectedFeeDetail.branch}</div>
                    <div><strong className={currentTheme.text}>Quota:</strong> {selectedFeeDetail.quotaType}</div>
                    <div><strong className={currentTheme.text}>Category:</strong> {selectedFeeDetail.category}</div>
                    <div><strong className={currentTheme.text}>Academic Year:</strong> {selectedFeeDetail.academicYear}</div>
                  </div>
                </div>
                <div>
                  <h4 className={`font-medium mb-3 ${currentTheme.text}`}>Fee Breakdown</h4>
                  <div className={`space-y-2 text-sm ${currentTheme.textSecondary}`}>
                    <div className="flex justify-between"><span>Annual Fee</span><span className="font-medium">{formatCurrency(selectedFeeDetail.annualFee)}</span></div>
                    <div className="flex justify-between"><span>Admission Fee</span><span className="font-medium">{formatCurrency(selectedFeeDetail.admissionFee)}</span></div>
                    <div className="flex justify-between"><span>Security Deposit</span><span className="font-medium">{formatCurrency(selectedFeeDetail.securityDeposit)}</span></div>
                    <div className="flex justify-between"><span>Development Fee</span><span className="font-medium">{formatCurrency(selectedFeeDetail.developmentFee)}</span></div>
                    <div className="flex justify-between"><span>Exam Fee</span><span className="font-medium">{formatCurrency(selectedFeeDetail.examFee)}</span></div>
                    <div className="flex justify-between"><span>Library Fee</span><span className="font-medium">{formatCurrency(selectedFeeDetail.libraryFee)}</span></div>
                    <div className="flex justify-between"><span>Lab Fee</span><span className="font-medium">{formatCurrency(selectedFeeDetail.labFee)}</span></div>
                    <div className="flex justify-between"><span>Other Fees</span><span className="font-medium">{formatCurrency(selectedFeeDetail.otherFees)}</span></div>
                    <hr className={`my-2 ${currentTheme.border}`} />
                    <div className="flex justify-between font-bold"><span>Total Fees</span><span>{formatCurrency(selectedFeeDetail.totalFee)}</span></div>
                  </div>
                </div>
              </div>
              {(selectedFeeDetail.hostelFee || selectedFeeDetail.messFee) && (
                <div className="mt-6">
                  <h4 className={`font-medium mb-3 ${currentTheme.text}`}>Additional Fees</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedFeeDetail.hostelFee != null && (
                      <div className="flex justify-between"><span>Hostel Fee</span><span className="font-medium">{formatCurrency(selectedFeeDetail.hostelFee)}</span></div>
                    )}
                    {selectedFeeDetail.messFee != null && (
                      <div className="flex justify-between"><span>Mess Fee</span><span className="font-medium">{formatCurrency(selectedFeeDetail.messFee)}</span></div>
                    )}
                  </div>
                </div>
              )}
              <div className="mt-6">
                <h4 className={`font-medium mb-3 ${currentTheme.text}`}>Administrative Info</h4>
                <div className={`space-y-2 text-sm ${currentTheme.textSecondary}`}>
                  <div><strong className={currentTheme.text}>Status:</strong> {selectedFeeDetail.status}</div>
                  <div><strong className={currentTheme.text}>Last Updated:</strong> {selectedFeeDetail.lastUpdated}</div>
                  <div><strong className={currentTheme.text}>Updated By:</strong> {selectedFeeDetail.updatedBy}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-transparent">
              <button
                onClick={() => setShowViewModal(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${currentTheme.buttonSecondary}`}
              >Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl ${currentTheme.cardBg} ${currentTheme.shadowLarge} border ${currentTheme.border}`}>
            <div className="flex justify-between items-center p-6 border-b border-transparent">
              <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Add New Quota Fee</h3>
              <button onClick={() => setShowAddModal(false)} className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.textSecondary}`}>×</button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div>
                  <h4 className={`font-medium mb-4 ${currentTheme.text}`}>Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Quota Type" name="quotaType" options={['Government', 'Management', 'NRI', 'COMEDK', 'KCET', 'Minority', 'Sports', 'Defense']} required />
                    <FormField label="Category" name="category" options={['General', 'OBC', 'SC', 'ST', 'EWS']} required />
                    <FormField label="Course Name" name="courseName" required />
                    <FormField label="Branch" name="branch" required />
                    <FormField label="Academic Year" name="academicYear" required />
                    <FormField label="Status" name="status" options={['Active', 'Inactive']} required />
                  </div>
                </div>

                {/* Fee Structure */}
                <div>
                  <h4 className={`font-medium mb-4 ${currentTheme.text}`}>Fee Structure (Required)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Annual Fee" name="annualFee" type="number" required />
                    <FormField label="Admission Fee" name="admissionFee" type="number" required />
                    <FormField label="Security Deposit" name="securityDeposit" type="number" required />
                    <FormField label="Development Fee" name="developmentFee" type="number" required />
                    <FormField label="Exam Fee" name="examFee" type="number" required />
                    <FormField label="Library Fee" name="libraryFee" type="number" required />
                    <FormField label="Lab Fee" name="labFee" type="number" required />
                    <FormField label="Other Fees" name="otherFees" type="number" required />
                  </div>
                </div>

                {/* Additional Fees (Optional) */}
                <div>
                  <h4 className={`font-medium mb-4 ${currentTheme.text}`}>Additional Fees (Optional)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Hostel Fee" name="hostelFee" type="number" />
                    <FormField label="Mess Fee" name="messFee" type="number" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 p-6 border-t border-transparent">
                <button type="button"
                  onClick={() => setShowAddModal(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${currentTheme.buttonSecondary}`}
                >Cancel</button>
                <button type="submit"
                  className={`px-4 py-2 rounded-lg transition-colors ${currentTheme.button}`}
                >Add Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl ${currentTheme.cardBg} ${currentTheme.shadowLarge} border ${currentTheme.border}`}>
            <div className="flex justify-between items-center p-6 border-b border-transparent">
              <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Edit Quota Fee</h3>
              <button onClick={() => setShowEditModal(false)} className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.textSecondary}`}>×</button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div>
                  <h4 className={`font-medium mb-4 ${currentTheme.text}`}>Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Quota Type" name="quotaType" options={['Government', 'Management', 'NRI', 'COMEDK', 'KCET', 'Minority', 'Sports', 'Defense']} required />
                    <FormField label="Category" name="category" options={['General', 'OBC', 'SC', 'ST', 'EWS']} required />
                    <FormField label="Course Name" name="courseName" required />
                    <FormField label="Branch" name="branch" required />
                    <FormField label="Academic Year" name="academicYear" required />
                    <FormField label="Status" name="status" options={['Active', 'Inactive']} required />
                  </div>
                </div>

                {/* Fee Structure */}
                <div>
                  <h4 className={`font-medium mb-4 ${currentTheme.text}`}>Fee Structure (Required)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Annual Fee" name="annualFee" type="number" required />
                    <FormField label="Admission Fee" name="admissionFee" type="number" required />
                    <FormField label="Security Deposit" name="securityDeposit" type="number" required />
                    <FormField label="Development Fee" name="developmentFee" type="number" required />
                    <FormField label="Exam Fee" name="examFee" type="number" required />
                    <FormField label="Library Fee" name="libraryFee" type="number" required />
                    <FormField label="Lab Fee" name="labFee" type="number" required />
                    <FormField label="Other Fees" name="otherFees" type="number" required />
                  </div>
                </div>

                {/* Additional Fees (Optional) */}
                <div>
                  <h4 className={`font-medium mb-4 ${currentTheme.text}`}>Additional Fees (Optional)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Hostel Fee" name="hostelFee" type="number" />
                    <FormField label="Mess Fee" name="messFee" type="number" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 p-6 border-t border-transparent">
                <button type="button"
                  onClick={() => setShowEditModal(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${currentTheme.buttonSecondary}`}
                >Cancel</button>
                <button type="submit"
                  className={`px-4 py-2 rounded-lg transition-colors ${currentTheme.button}`}
                >Update Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionQuota;