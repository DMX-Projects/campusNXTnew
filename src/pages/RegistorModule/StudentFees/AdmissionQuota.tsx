// import React, { useState, useEffect } from 'react';
// import { Search, Filter, Download, Edit, Plus, Eye } from 'lucide-react';

// // Types and Interfaces
// interface QuotaFeeDetail {
//   id: string;
//   quotaType: 'Government' | 'Management' | 'NRI' | 'COMEDK' | 'KCET' | 'Minority' | 'Sports' | 'Defense';
//   courseName: string;
//   branch: string;
//   category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
//   annualFee: number;
//   admissionFee: number;
//   securityDeposit: number;
//   developmentFee: number;
//   examFee: number;
//   libraryFee: number;
//   labFee: number;
//   otherFees: number;
//   totalFee: number;
//   hostelFee?: number;
//   messFee?: number;
//   status: 'Active' | 'Inactive';
//   academicYear: string;
//   lastUpdated: string;
//   updatedBy: string;
// }

// interface AdmissionQuotaFeesProps {
//   isDarkMode: boolean;
// }

// const AdmissionQuota: React.FC<AdmissionQuotaFeesProps> = ({ isDarkMode }) => {
//   const [quotaFees, setQuotaFees] = useState<QuotaFeeDetail[]>([]);
//   const [filteredFees, setFilteredFees] = useState<QuotaFeeDetail[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedQuota, setSelectedQuota] = useState<string>('All');
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedFeeDetail, setSelectedFeeDetail] = useState<QuotaFeeDetail | null>(null);
//   const [loading, setLoading] = useState(false);

//   // Sample data - in real implementation, this would come from API
//   const sampleQuotaFees: QuotaFeeDetail[] = [
//     {
//       id: '1',
//       quotaType: 'Government',
//       courseName: 'B.E.',
//       branch: 'Computer Science Engineering',
//       category: 'General',
//       annualFee: 44200,
//       admissionFee: 5000,
//       securityDeposit: 10000,
//       developmentFee: 15000,
//       examFee: 3000,
//       libraryFee: 2000,
//       labFee: 8000,
//       otherFees: 2000,
//       totalFee: 89200,
//       hostelFee: 45000,
//       messFee: 48000,
//       status: 'Active',
//       academicYear: '2025-26',
//       lastUpdated: '2025-09-28',
//       updatedBy: 'Admin'
//     },
//     {
//       id: '2',
//       quotaType: 'Management',
//       courseName: 'B.E.',
//       branch: 'Computer Science Engineering',
//       category: 'General',
//       annualFee: 750000,
//       admissionFee: 25000,
//       securityDeposit: 50000,
//       developmentFee: 100000,
//       examFee: 5000,
//       libraryFee: 5000,
//       labFee: 25000,
//       otherFees: 15000,
//       totalFee: 975000,
//       hostelFee: 120000,
//       messFee: 60000,
//       status: 'Active',
//       academicYear: '2025-26',
//       lastUpdated: '2025-09-28',
//       updatedBy: 'Registrar'
//     },
//     {
//       id: '3',
//       quotaType: 'NRI',
//       courseName: 'B.E.',
//       branch: 'Computer Science Engineering',
//       category: 'General',
//       annualFee: 1500000,
//       admissionFee: 50000,
//       securityDeposit: 100000,
//       developmentFee: 200000,
//       examFee: 10000,
//       libraryFee: 10000,
//       labFee: 50000,
//       otherFees: 30000,
//       totalFee: 1950000,
//       hostelFee: 150000,
//       messFee: 80000,
//       status: 'Active',
//       academicYear: '2025-26',
//       lastUpdated: '2025-09-28',
//       updatedBy: 'Admin'
//     },
//     {
//       id: '4',
//       quotaType: 'COMEDK',
//       courseName: 'B.E.',
//       branch: 'Electronics & Communication',
//       category: 'General',
//       annualFee: 290000,
//       admissionFee: 15000,
//       securityDeposit: 25000,
//       developmentFee: 40000,
//       examFee: 4000,
//       libraryFee: 3000,
//       labFee: 15000,
//       otherFees: 8000,
//       totalFee: 400000,
//       hostelFee: 80000,
//       messFee: 50000,
//       status: 'Active',
//       academicYear: '2025-26',
//       lastUpdated: '2025-09-25',
//       updatedBy: 'Admin'
//     },
//     {
//       id: '5',
//       quotaType: 'Government',
//       courseName: 'B.E.',
//       branch: 'Mechanical Engineering',
//       category: 'SC',
//       annualFee: 0,
//       admissionFee: 750,
//       securityDeposit: 5000,
//       developmentFee: 0,
//       examFee: 1500,
//       libraryFee: 1000,
//       labFee: 3000,
//       otherFees: 1000,
//       totalFee: 12250,
//       hostelFee: 20000,
//       messFee: 25000,
//       status: 'Active',
//       academicYear: '2025-26',
//       lastUpdated: '2025-09-20',
//       updatedBy: 'Registrar'
//     }
//   ];

//   useEffect(() => {
//     // Initialize with sample data
//     setQuotaFees(sampleQuotaFees);
//     setFilteredFees(sampleQuotaFees);
//   }, []);

//   // Filter and search functionality
//   useEffect(() => {
//     let filtered = quotaFees;

//     // Apply search filter
//     if (searchTerm) {
//       filtered = filtered.filter(fee =>
//         fee.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         fee.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         fee.quotaType.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Apply quota filter
//     if (selectedQuota !== 'All') {
//       filtered = filtered.filter(fee => fee.quotaType === selectedQuota);
//     }

//     // Apply category filter
//     if (selectedCategory !== 'All') {
//       filtered = filtered.filter(fee => fee.category === selectedCategory);
//     }

//     setFilteredFees(filtered);
//   }, [searchTerm, selectedQuota, selectedCategory, quotaFees]);

//   const formatCurrency = (amount: number): string => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   const quotaTypes = ['All', 'Government', 'Management', 'NRI', 'COMEDK', 'KCET', 'Minority', 'Sports', 'Defense'];
//   const categories = ['All', 'General', 'OBC', 'SC', 'ST', 'EWS'];

//   const handleViewDetails = (feeDetail: QuotaFeeDetail) => {
//     setSelectedFeeDetail(feeDetail);
//     setShowViewModal(true);
//   };

//   const handleExport = () => {
//     setLoading(true);
//     // Export functionality would be implemented here
//     setTimeout(() => {
//       setLoading(false);
//       alert('Data exported successfully!');
//     }, 1000);
//   };

//   // Theme classes
//   const containerClass = isDarkMode 
//     ? 'min-h-screen bg-gray-900 text-white' 
//     : 'min-h-screen bg-gray-50 text-gray-900';
    
//   const cardClass = isDarkMode 
//     ? 'bg-gray-800 border-gray-700 shadow-xl' 
//     : 'bg-white border-gray-200 shadow-lg';
    
//   const inputClass = isDarkMode 
//     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500';
    
//   const buttonClass = isDarkMode 
//     ? 'bg-blue-600 hover:bg-blue-700 text-white' 
//     : 'bg-blue-500 hover:bg-blue-600 text-white';
    
//   const tableHeaderClass = isDarkMode 
//     ? 'bg-gray-700 text-gray-200' 
//     : 'bg-gray-50 text-gray-600';
    
//   const tableRowClass = isDarkMode 
//     ? 'hover:bg-gray-700 border-gray-600' 
//     : 'hover:bg-gray-50 border-gray-200';

//   return (
//     <div className={`${containerClass} p-4 lg:p-6`}>
//       {/* Header Section */}
//       <div className="mb-6">
//         <h1 className="text-2xl lg:text-3xl font-bold mb-2">
//           Admission Quota Fees Management
//         </h1>
//         <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//           Manage admission fees for different quota categories and courses
//         </p>
//       </div>

//       {/* Filters and Actions */}
//       <div className={`${cardClass} rounded-lg border p-4 lg:p-6 mb-6`}>
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
//           <h2 className="text-lg font-semibold">Quota Fees Overview</h2>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <button
//               onClick={() => setShowAddModal(true)}
//               className={`${buttonClass} px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors`}
//             >
//               <Plus size={16} />
//               Add New Fee Structure
//             </button>
//             <button
//               onClick={handleExport}
//               disabled={loading}
//               className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
//                 isDarkMode 
//                   ? 'bg-gray-600 hover:bg-gray-700 text-white' 
//                   : 'bg-gray-500 hover:bg-gray-600 text-white'
//               } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             >
//               <Download size={16} />
//               {loading ? 'Exporting...' : 'Export Data'}
//             </button>
//           </div>
//         </div>

//         {/* Search and Filter Row */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//             <input
//               type="text"
//               placeholder="Search courses, branches..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputClass}`}
//             />
//           </div>
          
//           <select
//             value={selectedQuota}
//             onChange={(e) => setSelectedQuota(e.target.value)}
//             className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputClass}`}
//           >
//             {quotaTypes.map(quota => (
//               <option key={quota} value={quota}>{quota} Quota</option>
//             ))}
//           </select>

//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputClass}`}
//           >
//             {categories.map(category => (
//               <option key={category} value={category}>{category} Category</option>
//             ))}
//           </select>

//           <div className="flex items-center gap-2">
//             <Filter size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
//             <span className="text-sm font-medium">
//               {filteredFees.length} of {quotaFees.length} records
//             </span>
//           </div>
//         </div>

//         {/* Responsive Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-full">
//             <thead className={`${tableHeaderClass}`}>
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                   Course Details
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                   Quota Type
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                   Category
//                 </th>
//                 <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">
//                   Annual Fee
//                 </th>
//                 <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">
//                   Total Fee
//                 </th>
//                 <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className={isDarkMode ? 'bg-gray-800 divide-y divide-gray-600' : 'bg-white divide-y divide-gray-200'}>
//               {filteredFees.map((fee) => (
//                 <tr key={fee.id} className={`${tableRowClass} transition-colors`}>
//                   <td className="px-4 py-4">
//                     <div>
//                       <div className="text-sm font-medium">
//                         {fee.courseName} - {fee.branch}
//                       </div>
//                       <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                         Academic Year: {fee.academicYear}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-4">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                       fee.quotaType === 'Government' 
//                         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//                         : fee.quotaType === 'Management'
//                         ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
//                         : fee.quotaType === 'NRI'
//                         ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
//                         : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
//                     }`}>
//                       {fee.quotaType}
//                     </span>
//                   </td>
//                   <td className="px-4 py-4">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                       fee.category === 'SC' || fee.category === 'ST'
//                         ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//                         : fee.category === 'OBC'
//                         ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
//                         : fee.category === 'EWS'
//                         ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
//                         : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
//                     }`}>
//                       {fee.category}
//                     </span>
//                   </td>
//                   <td className="px-4 py-4 text-right text-sm font-medium">
//                     {formatCurrency(fee.annualFee)}
//                   </td>
//                   <td className="px-4 py-4 text-right text-sm font-bold">
//                     {formatCurrency(fee.totalFee)}
//                   </td>
//                   <td className="px-4 py-4 text-center">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                       fee.status === 'Active'
//                         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//                         : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//                     }`}>
//                       {fee.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-4 text-center">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         onClick={() => handleViewDetails(fee)}
//                         className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
//                           isDarkMode ? 'text-gray-300' : 'text-gray-600'
//                         }`}
//                         title="View Details"
//                       >
//                         <Eye size={16} />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setSelectedFeeDetail(fee);
//                           setShowAddModal(true);
//                         }}
//                         className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
//                           isDarkMode ? 'text-gray-300' : 'text-gray-600'
//                         }`}
//                         title="Edit"
//                       >
//                         <Edit size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {filteredFees.length === 0 && (
//           <div className="text-center py-8">
//             <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               No quota fee records found matching your criteria
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <div className={`${cardClass} rounded-lg border p-4`}>
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white text-sm font-bold">G</span>
//               </div>
//             </div>
//             <div className="ml-4">
//               <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 Government Quota
//               </div>
//               <div className="text-2xl font-bold">
//                 {quotaFees.filter(f => f.quotaType === 'Government').length}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={`${cardClass} rounded-lg border p-4`}>
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white text-sm font-bold">M</span>
//               </div>
//             </div>
//             <div className="ml-4">
//               <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 Management Quota
//               </div>
//               <div className="text-2xl font-bold">
//                 {quotaFees.filter(f => f.quotaType === 'Management').length}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={`${cardClass} rounded-lg border p-4`}>
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white text-sm font-bold">N</span>
//               </div>
//             </div>
//             <div className="ml-4">
//               <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 NRI Quota
//               </div>
//               <div className="text-2xl font-bold">
//                 {quotaFees.filter(f => f.quotaType === 'NRI').length}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={`${cardClass} rounded-lg border p-4`}>
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white text-sm font-bold">T</span>
//               </div>
//             </div>
//             <div className="ml-4">
//               <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 Total Structures
//               </div>
//               <div className="text-2xl font-bold">{quotaFees.length}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* View Modal */}
//       {showViewModal && selectedFeeDetail && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className={`${cardClass} rounded-lg border max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">Fee Structure Details</h3>
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-600'
//                   }`}
//                 >
//                   ×
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <h4 className="font-medium mb-2">Course Information</h4>
//                   <div className="space-y-2 text-sm">
//                     <div><strong>Course:</strong> {selectedFeeDetail.courseName}</div>
//                     <div><strong>Branch:</strong> {selectedFeeDetail.branch}</div>
//                     <div><strong>Quota Type:</strong> {selectedFeeDetail.quotaType}</div>
//                     <div><strong>Category:</strong> {selectedFeeDetail.category}</div>
//                     <div><strong>Academic Year:</strong> {selectedFeeDetail.academicYear}</div>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="font-medium mb-2">Fee Breakdown</h4>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span>Annual Fee:</span>
//                       <span className="font-medium">{formatCurrency(selectedFeeDetail.annualFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Admission Fee:</span>
//                       <span className="font-medium">{formatCurrency(selectedFeeDetail.admissionFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Security Deposit:</span>
//                       <span className="font-medium">{formatCurrency(selectedFeeDetail.securityDeposit)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Development Fee:</span>
//                       <span className="font-medium">{formatCurrency(selectedFeeDetail.developmentFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Exam Fee:</span>
//                       <span className="font-medium">{formatCurrency(selectedFeeDetail.examFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Library Fee:</span>
//                       <span className="font-medium">{formatCurrency(selectedFeeDetail.libraryFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Lab Fee:</span>
//                       <span className="font-medium">{formatCurrency(selectedFeeDetail.labFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Other Fees:</span>
//                       <span className="font-medium">{formatCurrency(selectedFeeDetail.otherFees)}</span>
//                     </div>
//                     <hr className={`my-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`} />
//                     <div className="flex justify-between font-bold text-lg">
//                       <span>Total Fee:</span>
//                       <span>{formatCurrency(selectedFeeDetail.totalFee)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {(selectedFeeDetail.hostelFee || selectedFeeDetail.messFee) && (
//                   <div className="md:col-span-2">
//                     <h4 className="font-medium mb-2">Additional Fees (Optional)</h4>
//                     <div className="grid grid-cols-2 gap-4 text-sm">
//                       {selectedFeeDetail.hostelFee && (
//                         <div className="flex justify-between">
//                           <span>Hostel Fee:</span>
//                           <span className="font-medium">{formatCurrency(selectedFeeDetail.hostelFee)}</span>
//                         </div>
//                       )}
//                       {selectedFeeDetail.messFee && (
//                         <div className="flex justify-between">
//                           <span>Mess Fee:</span>
//                           <span className="font-medium">{formatCurrency(selectedFeeDetail.messFee)}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 <div className="md:col-span-2">
//                   <h4 className="font-medium mb-2">Administrative Info</h4>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div><strong>Status:</strong> {selectedFeeDetail.status}</div>
//                     <div><strong>Last Updated:</strong> {selectedFeeDetail.lastUpdated}</div>
//                     <div><strong>Updated By:</strong> {selectedFeeDetail.updatedBy}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdmissionQuota;
// import React, { useState, useEffect } from 'react';
// import { Search, Filter, Download, Edit, Plus, Eye } from 'lucide-react';

// // Types and Interfaces
// interface QuotaFeeDetail {
//   id: string;
//   quotaType: 'Government' | 'Management' | 'NRI' | 'COMEDK' | 'KCET' | 'Minority' | 'Sports' | 'Defense';
//   courseName: string;
//   branch: string;
//   category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
//   annualFee: number;
//   admissionFee: number;
//   securityDeposit: number;
//   developmentFee: number;
//   examFee: number;
//   libraryFee: number;
//   labFee: number;
//   otherFees: number;
//   totalFee: number;
//   hostelFee?: number;
//   messFee?: number;
//   status: 'Active' | 'Inactive';
//   academicYear: string;
//   lastUpdated: string;
//   updatedBy: string;
// }

// interface AdmissionQuotaFeesProps {
//   isDarkMode: boolean;
// }

// const AdmissionQuota: React.FC<AdmissionQuotaFeesProps> = ({ isDarkMode }) => {
//   const theme = isDarkMode ? 'dark' : 'light';
  
//   const [quotaFees, setQuotaFees] = useState<QuotaFeeDetail[]>([]);
//   const [filteredFees, setFilteredFees] = useState<QuotaFeeDetail[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedQuota, setSelectedQuota] = useState<string>('All');
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedFeeDetail, setSelectedFeeDetail] = useState<QuotaFeeDetail | null>(null);
//   const [loading, setLoading] = useState(false);

//   // Theme classes - matching BulkOperationsInterface
//   const themeClasses = {
//     light: {
//       bg: 'bg-white',
//       cardBg: 'bg-white',
//       text: 'text-slate-900',
//       textSecondary: 'text-slate-600',
//       textMuted: 'text-slate-500',
//       border: 'border-slate-200',
//       hover: 'hover:bg-slate-50',
//       hoverCard: 'hover:bg-slate-25',
//       button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
//       buttonSecondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300',
//       buttonDanger: 'bg-red-600 hover:bg-red-700 text-white',
//       input: 'bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400',
//       modal: 'bg-white',
//       overlay: 'bg-black/50 backdrop-blur-sm',
//       tableHeader: 'bg-slate-50',
//       statusPaid: 'bg-emerald-100 text-emerald-800',
//       statusPending: 'bg-yellow-100 text-yellow-800',
//       statusOverdue: 'bg-red-100 text-red-800',
//       highlight: 'bg-blue-50',
//       shadow: 'shadow-sm',
//       shadowLarge: 'shadow-xl'
//     },
//     dark: {
//       bg: 'bg-gray-900',
//       cardBg: 'bg-slate-800',
//       text: 'text-slate-100',
//       textSecondary: 'text-slate-300',
//       textMuted: 'text-slate-400',
//       border: 'border-slate-700',
//       hover: 'hover:bg-slate-700',
//       hoverCard: 'hover:bg-slate-750',
//       button: 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm',
//       buttonSecondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600',
//       buttonDanger: 'bg-red-600 hover:bg-red-500 text-white',
//       input: 'bg-slate-700 border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400',
//       modal: 'bg-slate-800',
//       overlay: 'bg-black/70 backdrop-blur-sm',
//       tableHeader: 'bg-slate-750',
//       statusPaid: 'bg-emerald-900 text-emerald-300',
//       statusPending: 'bg-yellow-900 text-yellow-300',
//       statusOverdue: 'bg-red-900 text-red-300',
//       highlight: 'bg-blue-900/20',
//       shadow: 'shadow-sm shadow-black/20',
//       shadowLarge: 'shadow-xl shadow-black/30'
//     }
//   };

//   const currentTheme = themeClasses[theme];

//   // Sample student data
//   const sampleQuotaFees: QuotaFeeDetail[] = [
//     {
//       id: '1',
//       quotaType: 'Government',
//       courseName: 'B.E.',
//       branch: 'Computer Science Engineering',
//       category: 'General',
//       annualFee: 44200,
//       admissionFee: 5000,
//       securityDeposit: 10000,
//       developmentFee: 15000,
//       examFee: 3000,
//       libraryFee: 2000,
//       labFee: 8000,
//       otherFees: 2000,
//       totalFee: 89200,
//       hostelFee: 45000,
//       messFee: 48000,
//       status: 'Active',
//       academicYear: '2025-26',
//       lastUpdated: '2025-09-28',
//       updatedBy: 'Admin'
//     },
//     {
//       id: '2',
//       quotaType: 'Management',
//       courseName: 'B.E.',
//       branch: 'Computer Science Engineering',
//       category: 'General',
//       annualFee: 750000,
//       admissionFee: 25000,
//       securityDeposit: 50000,
//       developmentFee: 100000,
//       examFee: 5000,
//       libraryFee: 5000,
//       labFee: 25000,
//       otherFees: 15000,
//       totalFee: 975000,
//       hostelFee: 120000,
//       messFee: 60000,
//       status: 'Active',
//       academicYear: '2025-26',
//       lastUpdated: '2025-09-28',
//       updatedBy: 'Registrar'
//     },
//     {
//       id: '3',
//       quotaType: 'NRI',
//       courseName: 'B.E.',
//       branch: 'Computer Science Engineering',
//       category: 'General',
//       annualFee: 1500000,
//       admissionFee: 50000,
//       securityDeposit: 100000,
//       developmentFee: 200000,
//       examFee: 10000,
//       libraryFee: 10000,
//       labFee: 50000,
//       otherFees: 30000,
//       totalFee: 1950000,
//       hostelFee: 150000,
//       messFee: 80000,
//       status: 'Active',
//       academicYear: '2025-26',
//       lastUpdated: '2025-09-28',
//       updatedBy: 'Admin'
//     },
//     {
//       id: '4',
//       quotaType: 'COMEDK',
//       courseName: 'B.E.',
//       branch: 'Electronics & Communication',
//       category: 'General',
//       annualFee: 290000,
//       admissionFee: 15000,
//       securityDeposit: 25000,
//       developmentFee: 40000,
//       examFee: 4000,
//       libraryFee: 3000,
//       labFee: 15000,
//       otherFees: 8000,
//       totalFee: 400000,
//       hostelFee: 80000,
//       messFee: 50000,
//       status: 'Active',
//       academicYear: '2025-26',
//       lastUpdated: '2025-09-25',
//       updatedBy: 'Admin'
//     },
//     {
//       id: '5',
//       quotaType: 'Government',
//       courseName: 'B.E.',
//       branch: 'Mechanical Engineering',
//       category: 'SC',
//       annualFee: 0,
//       admissionFee: 750,
//       securityDeposit: 5000,
//       developmentFee: 0,
//       examFee: 1500,
//       libraryFee: 1000,
//       labFee: 3000,
//       otherFees: 1000,
//       totalFee: 12250,
//       hostelFee: 20000,
//       messFee: 25000,
//       status: 'Active',
//       academicYear: '2025-26',
//       lastUpdated: '2025-09-20',
//       updatedBy: 'Registrar'
//     }
//   ];

//   useEffect(() => {
//     setQuotaFees(sampleQuotaFees);
//     setFilteredFees(sampleQuotaFees);
//   }, []);

//   useEffect(() => {
//     let filtered = quotaFees;

//     if (searchTerm) {
//       filtered = filtered.filter(fee =>
//         fee.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         fee.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         fee.quotaType.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (selectedQuota !== 'All') {
//       filtered = filtered.filter(fee => fee.quotaType === selectedQuota);
//     }

//     if (selectedCategory !== 'All') {
//       filtered = filtered.filter(fee => fee.category === selectedCategory);
//     }

//     setFilteredFees(filtered);
//   }, [searchTerm, selectedQuota, selectedCategory, quotaFees]);

//   const formatCurrency = (amount: number): string => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   const quotaTypes = ['All', 'Government', 'Management', 'NRI', 'COMEDK', 'KCET', 'Minority', 'Sports', 'Defense'];
//   const categories = ['All', 'General', 'OBC', 'SC', 'ST', 'EWS'];

//   const handleViewDetails = (feeDetail: QuotaFeeDetail) => {
//     setSelectedFeeDetail(feeDetail);
//     setShowViewModal(true);
//   };

//   const handleExport = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       alert('Data exported successfully!');
//     }, 1000);
//   };

//   return (
//     <div className={`${currentTheme.bg} min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300`}>
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className={`text-2xl font-bold ${currentTheme.text}`}>
//             Admission Quota Fees Management
//           </h1>
//           <p className={`text-sm mt-1 ${currentTheme.textMuted}`}>
//             Manage admission fees for different quota categories and courses
//           </p>
//         </div>

//         {/* Filters and Actions */}
//         <div className={`${currentTheme.cardBg} bg-gray-50 dark:bg-slate-900 transition-colors duration-300rounded-xl ${currentTheme.shadow} p-6 mb-6 border ${currentTheme.border}`}>
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
//             <h2 className={`text-lg font-semibold ${currentTheme.text}`}>Quota Fees Overview</h2>
//             <div className="flex flex-col sm:flex-row gap-2">
//               <button
//                 onClick={() => setShowAddModal(true)}
//                 className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${currentTheme.button}`}
//               >
//                 <Plus size={16} />
//                 Add New Fee Structure
//               </button>
//               <button
//                 onClick={handleExport}
//                 disabled={loading}
//                 className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${currentTheme.buttonSecondary} ${
//                   loading ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               >
//                 <Download size={16} />
//                 {loading ? 'Exporting...' : 'Export Data'}
//               </button>
//             </div>
//           </div>

//           {/* Search and Filter Row */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="relative ">
//               <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textMuted}`} />
//               <input
//                 type="text"
//                 placeholder="Search courses, branches..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${currentTheme.input} transition-colors`}
//               />
//             </div>
            
//             <select
//               value={selectedQuota}
//               onChange={(e) => setSelectedQuota(e.target.value)}
//               className={`px-3 py-2.5 rounded-lg border ${currentTheme.input} transition-colors`}
//             >
//               {quotaTypes.map(quota => (
//                 <option key={quota} value={quota}>{quota} Quota</option>
//               ))}
//             </select>

//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className={`px-3 py-2.5 rounded-lg border ${currentTheme.input} transition-colors`}
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>{category} Category</option>
//               ))}
//             </select>

//             <div className="flex items-center gap-2">
//               <Filter size={16} className={currentTheme.textMuted} />
//               <span className={`text-sm font-medium ${currentTheme.text}`}>
//                 {filteredFees.length} of {quotaFees.length} records
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <div className={`${currentTheme.cardBg}bg-gray-50 dark:bg-slate-900 transition-colors duration-300 rounded-xl border ${currentTheme.border} ${currentTheme.shadow} p-4`}>
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white text-sm font-bold">G</span>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <div className={`text-sm font-medium ${currentTheme.textMuted}`}>
//                   Government Quota
//                 </div>
//                 <div className={`text-2xl font-bold ${currentTheme.text}`}>
//                   {quotaFees.filter(f => f.quotaType === 'Government').length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={`${currentTheme.cardBg} bg-gray-50 dark:bg-slate-900 transition-colors duration-300rounded-xl border ${currentTheme.border} ${currentTheme.shadow} p-4`}>
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white text-sm font-bold">M</span>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <div className={`text-sm font-medium ${currentTheme.textMuted}`}>
//                   Management Quota
//                 </div>
//                 <div className={`text-2xl font-bold ${currentTheme.text}`}>
//                   {quotaFees.filter(f => f.quotaType === 'Management').length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={`${currentTheme.cardBg} bg-gray-50 dark:bg-slate-900 transition-colors duration-300 rounded-xl border ${currentTheme.border} ${currentTheme.shadow} p-4`}>
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white text-sm font-bold">N</span>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <div className={`text-sm font-medium ${currentTheme.textMuted}`}>
//                   NRI Quota
//                 </div>
//                 <div className={`text-2xl font-bold ${currentTheme.text}`}>
//                   {quotaFees.filter(f => f.quotaType === 'NRI').length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={`${currentTheme.cardBg} rounded-xl border ${currentTheme.border} ${currentTheme.shadow} p-4`}>
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white text-sm font-bold">T</span>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <div className={`text-sm font-medium ${currentTheme.textMuted}`}>
//                   Total Structures
//                 </div>
//                 <div className={`text-2xl font-bold ${currentTheme.text}`}>{quotaFees.length}</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className={`${currentTheme.cardBg} rounded-xl ${currentTheme.shadow} overflow-hidden border ${currentTheme.border}`}>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className={currentTheme.tableHeader}>
//                 <tr>
//                   <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
//                     Course Details
//                   </th>
//                   <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
//                     Quota Type
//                   </th>
//                   <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
//                     Category
//                   </th>
//                   <th className={`px-6 py-4 text-right text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
//                     Annual Fee
//                   </th>
//                   <th className={`px-6 py-4 text-right text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
//                     Total Fee
//                   </th>
//                   <th className={`px-6 py-4 text-center text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
//                     Status
//                   </th>
//                   <th className={`px-6 py-4 text-center text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className={`divide-y ${currentTheme.border}`}>
//                 {filteredFees.map((fee) => (
//                   <tr key={fee.id} className={`${currentTheme.hover} transition-colors`}>
//                     <td className="px-6 py-4">
//                       <div>
//                         <div className={`text-sm font-medium ${currentTheme.text}`}>
//                           {fee.courseName} - {fee.branch}
//                         </div>
//                         <div className={`text-xs ${currentTheme.textMuted}`}>
//                           Academic Year: {fee.academicYear}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         fee.quotaType === 'Government' 
//                           ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
//                           : fee.quotaType === 'Management'
//                           ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
//                           : fee.quotaType === 'NRI'
//                           ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
//                           : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
//                       }`}>
//                         {fee.quotaType}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         fee.category === 'SC' || fee.category === 'ST'
//                           ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
//                           : fee.category === 'OBC'
//                           ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
//                           : fee.category === 'EWS'
//                           ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
//                           : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
//                       }`}>
//                         {fee.category}
//                       </span>
//                     </td>
//                     <td className={`px-6 py-4 text-right text-sm font-medium ${currentTheme.text}`}>
//                       {formatCurrency(fee.annualFee)}
//                     </td>
//                     <td className={`px-6 py-4 text-right text-sm font-bold ${currentTheme.text}`}>
//                       {formatCurrency(fee.totalFee)}
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         fee.status === 'Active' ? currentTheme.statusPaid : currentTheme.statusOverdue
//                       }`}>
//                         {fee.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <div className="flex justify-center gap-2">
//                         <button
//                           onClick={() => handleViewDetails(fee)}
//                           className={`p-2 rounded-lg ${currentTheme.hover} transition-colors ${currentTheme.textSecondary}`}
//                           title="View Details"
//                         >
//                           <Eye size={16} />
//                         </button>
//                         <button
//                           onClick={() => {
//                             setSelectedFeeDetail(fee);
//                             setShowAddModal(true);
//                           }}
//                           className={`p-2 rounded-lg ${currentTheme.hover} transition-colors ${currentTheme.textSecondary}`}
//                           title="Edit"
//                         >
//                           <Edit size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {filteredFees.length === 0 && (
//             <div className="text-center py-8">
//               <div className={`text-sm ${currentTheme.textMuted}`}>
//                 No quota fee records found matching your criteria
//               </div>
//             </div>
//           )}
//         </div>

//         {/* View Modal */}
//         {showViewModal && selectedFeeDetail && (
//           <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${currentTheme.overlay}`}>
//             <div className={`${currentTheme.modal} rounded-xl ${currentTheme.shadowLarge} p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border ${currentTheme.border}`}>
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Fee Structure Details</h3>
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className={`p-2 rounded-lg ${currentTheme.hover} transition-colors ${currentTheme.textSecondary} text-2xl leading-none`}
//                 >
//                   ×
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className={`font-medium mb-3 ${currentTheme.text}`}>Course Information</h4>
//                   <div className={`space-y-2 text-sm ${currentTheme.textSecondary}`}>
//                     <div><strong className={currentTheme.text}>Course:</strong> {selectedFeeDetail.courseName}</div>
//                     <div><strong className={currentTheme.text}>Branch:</strong> {selectedFeeDetail.branch}</div>
//                     <div><strong className={currentTheme.text}>Quota Type:</strong> {selectedFeeDetail.quotaType}</div>
//                     <div><strong className={currentTheme.text}>Category:</strong> {selectedFeeDetail.category}</div>
//                     <div><strong className={currentTheme.text}>Academic Year:</strong> {selectedFeeDetail.academicYear}</div>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className={`font-medium mb-3 ${currentTheme.text}`}>Fee Breakdown</h4>
//                   <div className={`space-y-2 text-sm ${currentTheme.textSecondary}`}>
//                     <div className="flex justify-between">
//                       <span>Annual Fee:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.annualFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Admission Fee:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.admissionFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Security Deposit:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.securityDeposit)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Development Fee:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.developmentFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Exam Fee:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.examFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Library Fee:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.libraryFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Lab Fee:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.labFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Other Fees:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.otherFees)}</span>
//                     </div>
//                     <hr className={`my-2 ${currentTheme.border} border-t`} />
//                     <div className={`flex justify-between font-bold text-base ${currentTheme.text}`}>
//                       <span>Total Fee:</span>
//                       <span>{formatCurrency(selectedFeeDetail.totalFee)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {(selectedFeeDetail.hostelFee || selectedFeeDetail.messFee) && (
//                   <div className="md:col-span-2">
//                     <h4 className={`font-medium mb-3 ${currentTheme.text}`}>Additional Fees (Optional)</h4>
//                     <div className={`grid grid-cols-2 gap-4 text-sm ${currentTheme.textSecondary}`}>
//                       {selectedFeeDetail.hostelFee && (
//                         <div className="flex justify-between">
//                           <span>Hostel Fee:</span>
//                           <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.hostelFee)}</span>
//                         </div>
//                       )}
//                       {selectedFeeDetail.messFee && (
//                         <div className="flex justify-between">
//                           <span>Mess Fee:</span>
//                           <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.messFee)}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 <div className="md:col-span-2">
//                   <h4 className={`font-medium mb-3 ${currentTheme.text}`}>Administrative Info</h4>
//                   <div className={`grid grid-cols-2 gap-4 text-sm ${currentTheme.textSecondary}`}>
//                     <div><strong className={currentTheme.text}>Status:</strong> {selectedFeeDetail.status}</div>
//                     <div><strong className={currentTheme.text}>Last Updated:</strong> {selectedFeeDetail.lastUpdated}</div>
//                     <div><strong className={currentTheme.text}>Updated By:</strong> {selectedFeeDetail.updatedBy}</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-3 justify-end mt-6">
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className={`px-4 py-2 rounded-lg ${currentTheme.buttonSecondary} transition-colors`}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdmissionQuota;

// import React, { useState, useEffect } from 'react';
// import { Search, Filter, Download, Edit, Plus, Eye, Moon, Sun } from 'lucide-react';
// import { useTheme } from '../../../contexts/ThemeContext';

// // Types and Interfaces
// interface QuotaFeeDetail {
//   id: string;
//   quotaType: 'Government' | 'Management' | 'NRI' | 'COMEDK' | 'KCET' | 'Minority' | 'Sports' | 'Defense';
//   courseName: string;
//   branch: string;
//   category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
//   annualFee: number;
//   admissionFee: number;
//   securityDeposit: number;
//   developmentFee: number;
//   examFee: number;
//   libraryFee: number;
//   labFee: number;
//   otherFees: number;
//   totalFee: number;
//   hostelFee?: number;
//   messFee?: number;
//   status: 'Active' | 'Inactive';
//   academicYear: string;
//   lastUpdated: string;
//   updatedBy: string;
// }

// const AdmissionQuota: React.FC = () => {
//   const [isDark, setIsDark] = useState(false);
//   const useTheme = isDark ? 'dark' : 'light';
  
//   const [quotaFees, setQuotaFees] = useState<QuotaFeeDetail[]>([]);
//   const [filteredFees, setFilteredFees] = useState<QuotaFeeDetail[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedQuota, setSelectedQuota] = useState<string>('All');
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedFeeDetail, setSelectedFeeDetail] = useState<QuotaFeeDetail | null>(null);
//   const [loading, setLoading] = useState(false);

//   // Theme classes
//   const themeClasses = {
//     light: {
//       bg: 'bg-white',
//       cardBg: 'bg-white',
//       text: 'text-slate-900',
//       textSecondary: 'text-slate-600',
//       textMuted: 'text-slate-500',
//       border: 'border-slate-200',
//       hover: 'hover:bg-slate-50',
//       button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
//       buttonSecondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300',
//       input: 'bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400',
//       tableHeader: 'bg-slate-50',
//       activeTab: 'border-blue-500 text-blue-600',
//       inactiveTab: 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
//       statusPaid: 'bg-emerald-100 text-emerald-800',
//       statusPartial: 'bg-yellow-100 text-yellow-800',
//       statusOverDue: 'bg-red-100 text-red-800',
//       statusCompleted: 'bg-emerald-100 text-emerald-800',
//       statusPending: 'bg-yellow-100 text-yellow-800',
//       statusFailed: 'bg-red-100 text-red-800',
//       shadow: 'shadow-sm',
//       shadowLarge: 'shadow-xl'
//     },
//     dark: {
//       bg: 'bg-gray-900',
//       cardBg: 'bg-slate-800',
//       text: 'text-slate-100',
//       textSecondary: 'text-slate-300',
//       textMuted: 'text-slate-400',
//       border: 'border-slate-700',
//       hover: 'hover:bg-slate-700',
//       button: 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm',
//       buttonSecondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600',
//       input: 'bg-slate-700 border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400',
//       tableHeader: 'bg-slate-750',
//       activeTab: 'border-blue-400 text-blue-400',
//       inactiveTab: 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600',
//       statusPaid: 'bg-emerald-900 text-emerald-300',
//       statusPartial: 'bg-yellow-900 text-yellow-300',
//       statusOverDue: 'bg-red-900 text-red-300',
//       statusCompleted: 'bg-emerald-900 text-emerald-300',
//       statusPending: 'bg-yellow-900 text-yellow-300',
//       statusFailed: 'bg-red-900 text-red-300',
//       shadow: 'shadow-sm shadow-black/20',
//       shadowLarge: 'shadow-xl shadow-black/30'
//     }
//   };
//   const currentTheme = themeClasses[Theme];

//   // Sample student data
//   const sampleQuotaFees: QuotaFeeDetail[] = [
//     {
//       id: '1',
//       quotaType: 'Government',
//       courseName: 'B.E.',
//       branch: 'Computer Science Engineering',
//       category: 'General',
//       annualFee: 44200,
//       admissionFee: 5000,
//       securityDeposit: 10000,
//       developmentFee: 15000,
//       examFee: 3000,
//       libraryFee: 2000,
//       labFee: 8000,
//       otherFees: 2000,
//       totalFee: 89200,
//       hostelFee: 45000,
//       messFee: 48000,
//       status: 'Active',
//       academicYear: '2025-26',
//       lastUpdated: '2025-09-28',
//       updatedBy: 'Admin'
//     },
//     {
//       id: '2',
//       quotaType: 'Management',
//       courseName: 'B.E.',
//       branch: 'Computer Science Engineering',
//       category: 'General',
//       annualFee: 750000,
//       admissionFee: 25000,
//       securityDeposit: 50000,
//       developmentFee: 100000,
//       examFee: 5000,
//       libraryFee: 5000,
//       labFee: 25000,
//       otherFees: 15000,
//       totalFee: 975000,
//       hostelFee: 120000,
//       messFee: 60000,
//       status: 'Active',
//       academicYear: '2025-26',
//       lastUpdated: '2025-09-28',
//       updatedBy: 'Registrar'
//     },
//     {
//       id: '3',
//       quotaType: 'NRI',
//       courseName: 'B.E.',
//       branch: 'Computer Science Engineering',
//       category: 'General',
//       annualFee: 1500000,
//       admissionFee: 50000,
//       securityDeposit: 100000,
//       developmentFee: 200000,
//       examFee: 10000,
//       libraryFee: 10000,
//       labFee: 50000,
//       otherFees: 30000,
//       totalFee: 1950000,
//       hostelFee: 150000,
//       messFee: 80000,
//       status: 'Active',
//       academicYear: '2025-26',
//       lastUpdated: '2025-09-28',
//       updatedBy: 'Admin'
//     },
//     {
//       id: '4',
//       quotaType: 'COMEDK',
//       courseName: 'B.E.',
//       branch: 'Electronics & Communication',
//       category: 'General',
//       annualFee: 290000,
//       admissionFee: 15000,
//       securityDeposit: 25000,
//       developmentFee: 40000,
//       examFee: 4000,
//       libraryFee: 3000,
//       labFee: 15000,
//       otherFees: 8000,
//       totalFee: 400000,
//       hostelFee: 80000,
//       messFee: 50000,
//       status: 'Active',
//       academicYear: '2025-26',
//       lastUpdated: '2025-09-25',
//       updatedBy: 'Admin'
//     },
//     {
//       id: '5',
//       quotaType: 'Government',
//       courseName: 'B.E.',
//       branch: 'Mechanical Engineering',
//       category: 'SC',
//       annualFee: 0,
//       admissionFee: 750,
//       securityDeposit: 5000,
//       developmentFee: 0,
//       examFee: 1500,
//       libraryFee: 1000,
//       labFee: 3000,
//       otherFees: 1000,
//       totalFee: 12250,
//       hostelFee: 20000,
//       messFee: 25000,
//       status: 'Active',
//       academicYear: '2025-26',
//       lastUpdated: '2025-09-20',
//       updatedBy: 'Registrar'
//     }
//   ];

//   useEffect(() => {
//     setQuotaFees(sampleQuotaFees);
//     setFilteredFees(sampleQuotaFees);
//   }, []);

//   useEffect(() => {
//     let filtered = quotaFees;

//     if (searchTerm) {
//       filtered = filtered.filter(fee =>
//         fee.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         fee.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         fee.quotaType.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (selectedQuota !== 'All') {
//       filtered = filtered.filter(fee => fee.quotaType === selectedQuota);
//     }

//     if (selectedCategory !== 'All') {
//       filtered = filtered.filter(fee => fee.category === selectedCategory);
//     }

//     setFilteredFees(filtered);
//   }, [searchTerm, selectedQuota, selectedCategory, quotaFees]);

//   const formatCurrency = (amount: number): string => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   const quotaTypes = ['All', 'Government', 'Management', 'NRI', 'COMEDK', 'KCET', 'Minority', 'Sports', 'Defense'];
//   const categories = ['All', 'General', 'OBC', 'SC', 'ST', 'EWS'];

//   const handleViewDetails = (feeDetail: QuotaFeeDetail) => {
//     setSelectedFeeDetail(feeDetail);
//     setShowViewModal(true);
//   };

//   const handleExport = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       alert('Data exported successfully!');
//     }, 1000);
//   };

//   return (
//     <div className={`${currentTheme.bg}min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300`}>
//       <div className="max-w-7xl mx-auto p-6">
//         {/* Header with Theme Toggle */}
//         <div className="mb-6 flex justify-between items-start">
//           <div>
//             <h1 className={`text-2xl font-bold ${currentTheme.text}`}>
//               Admission Quota Fees Management
//             </h1>
//             <p className={`text-sm mt-1 ${currentTheme.textMuted}`}>
//               Manage admission fees for different quota categories and courses
//             </p>
//           </div>
        
//         </div>

//         {/* Filters and Actions */}
//         <div className={`${currentTheme.cardBg}bg-gray-50 dark:bg-slate-900 transition-colors duration-300  rounded-xl ${currentTheme.shadow} p-6 mb-6 border ${currentTheme.border}`}>
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
//             <h2 className={`text-lg font-semibold ${currentTheme.text}`}>Quota Fees Overview</h2>
//             <div className="flex flex-col sm:flex-row gap-2">
//               <button
//                 onClick={() => setShowAddModal(true)}
//                 className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${currentTheme.button}`}
//               >
//                 <Plus size={16} />
//                 Add New Fee Structure
//               </button>
//               <button
//                 onClick={handleExport}
//                 disabled={loading}
//                 className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${currentTheme.buttonSecondary} ${
//                   loading ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               >
//                 <Download size={16} />
//                 {loading ? 'Exporting...' : 'Export Data'}
//               </button>
//             </div>
//           </div>

//           {/* Search and Filter Row */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
//             <div className="relative">
//               <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textMuted}`} />
//               <input
//                 type="text"
//                 placeholder="Search courses, branches..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${currentTheme.input} transition-colors`}
//               />
//             </div>
            
//             <select
//               value={selectedQuota}
//               onChange={(e) => setSelectedQuota(e.target.value)}
//               className={`px-3 py-2.5 rounded-lg border ${currentTheme.input} transition-colors`}
//             >
//               {quotaTypes.map(quota => (
//                 <option key={quota} value={quota}>{quota} Quota</option>
//               ))}
//             </select>

//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className={`px-3 py-2.5 rounded-lg border ${currentTheme.input} transition-colors`}
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>{category} Category</option>
//               ))}
//             </select>

//             <div className="flex items-center gap-2">
//               <Filter size={16} className={currentTheme.textMuted} />
//               <span className={`text-sm font-medium ${currentTheme.text}`}>
//                 {filteredFees.length} of {quotaFees.length} records
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <div className={`${currentTheme.cardBg} bg-gray-50 dark:bg-slate-900 transition-colors duration-300 transition-colors duration-300 rounded-xl border ${currentTheme.border} ${currentTheme.shadow} p-4`}>
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white text-sm font-bold">G</span>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <div className={`text-sm font-medium ${currentTheme.textMuted}`}>
//                   Government Quota
//                 </div>
//                 <div className={`text-2xl font-bold ${currentTheme.text}`}>
//                   {quotaFees.filter(f => f.quotaType === 'Government').length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={`${currentTheme.cardBg} bg-gray-50 dark:bg-slate-900 transition-colors duration-300 rounded-xl border ${currentTheme.border} ${currentTheme.shadow} p-4`}>
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white text-sm font-bold">M</span>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <div className={`text-sm font-medium ${currentTheme.textMuted}`}>
//                   Management Quota
//                 </div>
//                 <div className={`text-2xl font-bold ${currentTheme.text}`}>
//                   {quotaFees.filter(f => f.quotaType === 'Management').length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={`${currentTheme.cardBg} bg-gray-50 dark:bg-slate-900 transition-colors duration-300 rounded-xl border ${currentTheme.border} ${currentTheme.shadow} p-4`}>
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white text-sm font-bold">N</span>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <div className={`text-sm font-medium ${currentTheme.textMuted}`}>
//                   NRI Quota
//                 </div>
//                 <div className={`text-2xl font-bold ${currentTheme.text}`}>
//                   {quotaFees.filter(f => f.quotaType === 'NRI').length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={`${currentTheme.cardBg} bg-gray-50 dark:bg-slate-900 transition-colors duration-300 rounded-xl border ${currentTheme.border} ${currentTheme.shadow} p-4`}>
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white text-sm font-bold">T</span>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <div className={`text-sm font-medium ${currentTheme.textMuted}`}>
//                   Total Structures
//                 </div>
//                 <div className={`text-2xl font-bold ${currentTheme.text}`}>{quotaFees.length}</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className={`${currentTheme.cardBg} bg-gray-50 dark:bg-slate-900 transition-colors duration-300rounded-xl ${currentTheme.shadow} overflow-hidden border ${currentTheme.border}`}>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className={currentTheme.tableHeader}>
//                 <tr>
//                   <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
//                     Course Details
//                   </th>
//                   <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
//                     Quota Type
//                   </th>
//                   <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
//                     Category
//                   </th>
//                   <th className={`px-6 py-4 text-right text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
//                     Annual Fee
//                   </th>
//                   <th className={`px-6 py-4 text-right text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
//                     Total Fee
//                   </th>
//                   <th className={`px-6 py-4 text-center text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
//                     Status
//                   </th>
//                   <th className={`px-6 py-4 text-center text-xs font-medium uppercase tracking-wider ${currentTheme.textSecondary}`}>
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className={`divide-y ${currentTheme.border}`}>
//                 {filteredFees.map((fee) => (
//                   <tr key={fee.id} className={`${currentTheme.hover} transition-colors`}>
//                     <td className="px-6 py-4">
//                       <div>
//                         <div className={`text-sm font-medium ${currentTheme.text}`}>
//                           {fee.courseName} - {fee.branch}
//                         </div>
//                         <div className={`text-xs ${currentTheme.textMuted}`}>
//                           Academic Year: {fee.academicYear}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         fee.quotaType === 'Government' 
//                           ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
//                           : fee.quotaType === 'Management'
//                           ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
//                           : fee.quotaType === 'NRI'
//                           ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
//                           : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
//                       }`}>
//                         {fee.quotaType}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         fee.category === 'SC' || fee.category === 'ST'
//                           ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
//                           : fee.category === 'OBC'
//                           ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
//                           : fee.category === 'EWS'
//                           ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
//                           : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
//                       }`}>
//                         {fee.category}
//                       </span>
//                     </td>
//                     <td className={`px-6 py-4 text-right text-sm font-medium ${currentTheme.text}`}>
//                       {formatCurrency(fee.annualFee)}
//                     </td>
//                     <td className={`px-6 py-4 text-right text-sm font-bold ${currentTheme.text}`}>
//                       {formatCurrency(fee.totalFee)}
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         fee.status === 'Active' ? currentTheme.statusPaid : currentTheme.statusOverdue
//                       }`}>
//                         {fee.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <div className="flex justify-center gap-2">
//                         <button
//                           onClick={() => handleViewDetails(fee)}
//                           className={`p-2 rounded-lg ${currentTheme.hover} transition-colors ${currentTheme.textSecondary}`}
//                           title="View Details"
//                         >
//                           <Eye size={16} />
//                         </button>
//                         <button
//                           onClick={() => {
//                             setSelectedFeeDetail(fee);
//                             setShowAddModal(true);
//                           }}
//                           className={`p-2 rounded-lg ${currentTheme.hover} transition-colors ${currentTheme.textSecondary}`}
//                           title="Edit"
//                         >
//                           <Edit size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {filteredFees.length === 0 && (
//             <div className="text-center py-8">
//               <div className={`text-sm ${currentTheme.textMuted}`}>
//                 No quota fee records found matching your criteria
//               </div>
//             </div>
//           )}
//         </div>

//         {/* View Modal */}
//         {showViewModal && selectedFeeDetail && (
//           <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${currentTheme.overlay}`}>
//             <div className={`${currentTheme.modal} bg-gray-50 dark:bg-slate-900 transition-colors duration-300 rounded-xl ${currentTheme.shadowLarge} p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border ${currentTheme.border}`}>
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Fee Structure Details</h3>
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className={`p-2 rounded-lg ${currentTheme.hover} transition-colors ${currentTheme.textSecondary} text-2xl leading-none`}
//                 >
//                   ×
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className={`font-medium mb-3 ${currentTheme.text}`}>Course Information</h4>
//                   <div className={`space-y-2 text-sm ${currentTheme.textSecondary}`}>
//                     <div><strong className={currentTheme.text}>Course:</strong> {selectedFeeDetail.courseName}</div>
//                     <div><strong className={currentTheme.text}>Branch:</strong> {selectedFeeDetail.branch}</div>
//                     <div><strong className={currentTheme.text}>Quota Type:</strong> {selectedFeeDetail.quotaType}</div>
//                     <div><strong className={currentTheme.text}>Category:</strong> {selectedFeeDetail.category}</div>
//                     <div><strong className={currentTheme.text}>Academic Year:</strong> {selectedFeeDetail.academicYear}</div>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className={`font-medium mb-3 ${currentTheme.text}`}>Fee Breakdown</h4>
//                   <div className={`space-y-2 text-sm ${currentTheme.textSecondary}`}>
//                     <div className="flex justify-between">
//                       <span>Annual Fee:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.annualFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Admission Fee:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.admissionFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Security Deposit:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.securityDeposit)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Development Fee:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.developmentFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Exam Fee:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.examFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Library Fee:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.libraryFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Lab Fee:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.labFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Other Fees:</span>
//                       <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.otherFees)}</span>
//                     </div>
//                     <hr className={`my-2 ${currentTheme.border} border-t`} />
//                     <div className={`flex justify-between font-bold text-base ${currentTheme.text}`}>
//                       <span>Total Fee:</span>
//                       <span>{formatCurrency(selectedFeeDetail.totalFee)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {(selectedFeeDetail.hostelFee || selectedFeeDetail.messFee) && (
//                   <div className="md:col-span-2">
//                     <h4 className={`font-medium mb-3 ${currentTheme.text}`}>Additional Fees (Optional)</h4>
//                     <div className={`grid grid-cols-2 gap-4 text-sm ${currentTheme.textSecondary}`}>
//                       {selectedFeeDetail.hostelFee && (
//                         <div className="flex justify-between">
//                           <span>Hostel Fee:</span>
//                           <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.hostelFee)}</span>
//                         </div>
//                       )}
//                       {selectedFeeDetail.messFee && (
//                         <div className="flex justify-between">
//                           <span>Mess Fee:</span>
//                           <span className={`font-medium ${currentTheme.text}`}>{formatCurrency(selectedFeeDetail.messFee)}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 <div className="md:col-span-2">
//                   <h4 className={`font-medium mb-3 ${currentTheme.text}`}>Administrative Info</h4>
//                   <div className={`grid grid-cols-2 gap-4 text-sm ${currentTheme.textSecondary}`}>
//                     <div><strong className={currentTheme.text}>Status:</strong> {selectedFeeDetail.status}</div>
//                     <div><strong className={currentTheme.text}>Last Updated:</strong> {selectedFeeDetail.lastUpdated}</div>
//                     <div><strong className={currentTheme.text}>Updated By:</strong> {selectedFeeDetail.updatedBy}</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-3 justify-end mt-6">
//                 <button
//                   onClick={() => setShowViewModal(false)}
//                   className={`px-4 py-2 rounded-lg ${currentTheme.buttonSecondary} transition-colors`}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdmissionQuota;

import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Edit, Plus, Eye } from 'lucide-react';
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
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedFeeDetail, setSelectedFeeDetail] = useState<QuotaFeeDetail | null>(null);
  const [loading, setLoading] = useState(false);

  // Add missing filter states for the filter dropdowns
  const [DepartmentFilter, setDepartmentFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dummy data for dropdowns (replace with actual data as needed)
  const Departments = ['Computer Science', 'Mechanical', 'Electronics', 'Civil'];
  const years = [1, 2, 3, 4];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  // Sample Data Initialization
  useEffect(() => {
    const sample: QuotaFeeDetail[] = [
     {
      id: '1',
      quotaType: 'Government',
      courseName: 'B.E.',
      branch: 'Computer Science Engineering',
      category: 'General',
      annualFee: 44200,
      admissionFee: 5000,
      securityDeposit: 10000,
      developmentFee: 15000,
      examFee: 3000,
      libraryFee: 2000,
      labFee: 8000,
      otherFees: 2000,
      totalFee: 89200,
      hostelFee: 45000,
      messFee: 48000,
      status: 'Active',
      academicYear: '2025-26',
      lastUpdated: '2025-09-28',
      updatedBy: 'Admin'
    },
    {
      id: '2',
      quotaType: 'Management',
      courseName: 'B.E.',
      branch: 'Computer Science Engineering',
      category: 'General',
      annualFee: 750000,
      admissionFee: 25000,
      securityDeposit: 50000,
      developmentFee: 100000,
      examFee: 5000,
      libraryFee: 5000,
      labFee: 25000,
      otherFees: 15000,
      totalFee: 975000,
      hostelFee: 120000,
      messFee: 60000,
      status: 'Active',
      academicYear: '2025-26',
      lastUpdated: '2025-09-28',
      updatedBy: 'Registrar'
    },
    {
      id: '3',
      quotaType: 'NRI',
      courseName: 'B.E.',
      branch: 'Computer Science Engineering',
      category: 'General',
      annualFee: 1500000,
      admissionFee: 50000,
      securityDeposit: 100000,
      developmentFee: 200000,
      examFee: 10000,
      libraryFee: 10000,
      labFee: 50000,
      otherFees: 30000,
      totalFee: 1950000,
      hostelFee: 150000,
      messFee: 80000,
      status: 'Active',
      academicYear: '2025-26',
      lastUpdated: '2025-09-28',
      updatedBy: 'Admin'
    },
    {
      id: '4',
      quotaType: 'Sports',
      courseName: 'B.E.',
      branch: 'Electronics & Communication',
      category: 'General',
      annualFee: 290000,
      admissionFee: 15000,
      securityDeposit: 25000,
      developmentFee: 40000,
      examFee: 4000,
      libraryFee: 3000,
      labFee: 15000,
      otherFees: 8000,
      totalFee: 400000,
      hostelFee: 80000,
      messFee: 50000,
      status: 'Active',
      academicYear: '2025-26',
      lastUpdated: '2025-09-25',
      updatedBy: 'Admin'
    },
    {
      id: '5',
      quotaType: 'Government',
      courseName: 'B.E.',
      branch: 'Mechanical Engineering',
      category: 'SC',
      annualFee: 0,
      admissionFee: 750,
      securityDeposit: 5000,
      developmentFee: 0,
      examFee: 1500,
      libraryFee: 1000,
      labFee: 3000,
      otherFees: 1000,
      totalFee: 12250,
      hostelFee: 20000,
      messFee: 25000,
      status: 'Active',
      academicYear: '2025-26',
      lastUpdated: '2025-09-20',
      updatedBy: 'Registrar'
    }
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

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Data exported successfully!');
    }, 1000);
  };

  const quotaTypes: Array<'All'> & QuotaFeeDetail['quotaType'][] = [
    'All', 'Government', 'Management', 'NRI', 'COMEDK', 'KCET', 'Minority', 'Sports', 'Defense'
  ];
  const categories: Array<'All'> & QuotaFeeDetail['category'][] = [
    'All', 'General', 'OBC', 'SC', 'ST', 'EWS'
  ];

  return (
    <div className={`${currentTheme.bg} min-h-screen transition-colors duration-300`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto p-6 flex justify-between items-center">
        <div>
          <h1 className={`text-2xl font-bold ${currentTheme.text}`}>Admission Quota Fees Management</h1>
          <p className={`text-sm mt-1 ${currentTheme.textMuted}`}>Manage admission fees for different quota categories and courses</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${currentTheme.button}`}
          >
            <Plus size={16} /> Add New
          </button>
          <button
            onClick={handleExport}
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : currentTheme.buttonSecondary
            }`}
          >
            <Download size={16} /> {loading ? 'Exporting...' : 'Export Data'}
          </button>
        </div>
      </div>

      {/* Filters */}
      {/* <div className={`max-w-7xl mx-auto p-6 mb-6 rounded-xl ${currentTheme.cardBg} ${currentTheme.shadowLarge} border ${currentTheme.border}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${currentTheme.textMuted}`} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${currentTheme.input} transition-colors`}
            />
          </div>
          <select
            value={selectedQuota}
            onChange={(e) => setSelectedQuota(e.target.value as any)}
            className={`px-3 py-2.5 rounded-lg border ${currentTheme.input} transition-colors`}
          >
            {quotaTypes.map(q => <option key={q} value={q}>{q}</option>)}
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className={`px-3 py-2.5 rounded-lg border ${currentTheme.input} transition-colors`}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="flex items-end">
            <button className={`flex items-center gap-2 ${currentTheme.buttonSecondary} px-4 py-2 rounded-lg`}>
              <Filter /> Filter
            </button>
          </div>
        </div>
      </div> */}
       <div className={`${currentTheme.cardBg} p-6 rounded-xl ${currentTheme.shadow} mb-6 ${currentTheme.border} border`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div className="relative">
                        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${currentTheme.textMuted}`} />
                        <input
                          type="text"
                          placeholder="Search students..."
                          className={`pl-10 pr-4 py-2.5 border rounded-lg w-full ${currentTheme.input} transition-colors`}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      
                      <select
                        className={`px-3 py-2.5 border rounded-lg ${currentTheme.input} transition-colors`}
                        value={DepartmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                      >
                        <option value="all">Department</option>
                        {Departments.map(Department => (
                          <option key={Department} value={Department}>{Department}</option>
                        ))}
                      </select>
      
                      <select
                        className={`px-3 py-2.5 border rounded-lg ${currentTheme.input} transition-colors`}
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                      >
                        <option value="all">All Years</option>
                        {years.map(year => (
                          <option key={year} value={year.toString()}>Year {year}</option>
                        ))}
                      </select>
                      <select
        className={`px-3 py-2.5 border rounded-lg ${currentTheme.input} transition-colors`}
        value={semesterFilter}
        onChange={(e) => setSemesterFilter(e.target.value)}
      >
        <option value="all">All Semesters</option>
        {semesters.map(sem => (
          <option key={sem} value={sem}>{sem}</option>
        ))}
      </select>
      
      
                      <select
                        className={`px-3 py-2.5 border rounded-lg ${currentTheme.input} transition-colors`}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">All Status</option>
                        <option value="paid">Paid</option>
                        <option value="partial">Partial</option>
                        <option value="Over Due">Over Due</option>
                      </select>
      
                    
                    </div>
                  </div>

      {/* Quota Fees Table */}
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
                        onClick={() => { setSelectedFeeDetail(fee); setShowAddModal(true); }}
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

      {/* View Details Modal */}
      {showViewModal && selectedFeeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl ${currentTheme.cardBg} ${currentTheme.shadowLarge} border ${currentTheme.border}`}>
            <div className="flex justify-between items-center p-6 border-b border-transparent">
              <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Fee Structure Detail</h3>
              <button onClick={() => setShowViewModal(false)} className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.textSecondary}`}>
                ×
              </button>
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
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionQuota;
