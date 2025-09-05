//  // StudentAssignments.tsx
// import React, { useState, useMemo } from 'react';
// import { 
//   Search, 
//   Filter, 
//   Upload, 
//   Download, 
//   Eye, 
//   FileText, 
//   Calendar, 
//   Clock, 
//   CheckCircle, 
//   AlertCircle, 
//   Star,
//   User,
//   BookOpen,
//   Send,
//   Paperclip,
//   MessageSquare,
//   Award,
//   TrendingUp,
//   X,
//   Plus
// } from 'lucide-react';

// interface Assignment {
//   id: string;
//   title: string;
//   description: string;
//   subject: string;
//   subjectCode: string;
//   instructor: string;
//   assignedDate: string;
//   dueDate: string;
//   submissionDate?: string;
//   status: 'pending' | 'submitted' | 'graded' | 'overdue';
//   marksObtained?: number;
//   totalMarks: number;
//   feedback?: string;
//   attachments?: string[];
//   submittedFiles?: SubmittedFile[];
//   priority: 'low' | 'medium' | 'high';
//   type: 'individual' | 'group';
//   groupMembers?: string[];
// }

// interface SubmittedFile {
//   id: string;
//   name: string;
//   size: string;
//   uploadDate: string;
//   type: string;
// }

// const StudentAssignments: React.FC = () => {
//   // Student Information
//   const [studentInfo] = useState({
//     name: 'Arjun Kumar',
//     rollNumber: '2022CSE001',
//     department: 'Computer Science Engineering',
//     semester: '5th Semester',
//     section: 'A',
//     profileImage: '/api/placeholder/80/80'
//   });

//   // Assignments Data
//   const [assignments] = useState<Assignment[]>([
//     {
//       id: 'A001',
//       title: 'Binary Search Tree Implementation',
//       description: 'Implement a complete Binary Search Tree with insertion, deletion, and traversal operations. Include proper documentation and test cases.',
//       subject: 'Data Structures',
//       subjectCode: 'CS501',
//       instructor: 'Dr. Rajesh Kumar',
//       assignedDate: '2025-08-25',
//       dueDate: '2025-09-15',
//       status: 'pending',
//       totalMarks: 20,
//       priority: 'high',
//       type: 'individual',
//       attachments: ['BST_Requirements.pdf', 'Sample_Code.cpp']
//     },
//     {
//       id: 'A002',
//       title: 'Database Design Project',
//       description: 'Design a complete database system for a library management system including ER diagrams, normalization, and SQL queries.',
//       subject: 'Database Management Systems',
//       subjectCode: 'CS502',
//       instructor: 'Prof. Priya Sharma',
//       assignedDate: '2025-08-20',
//       dueDate: '2025-09-10',
//       submissionDate: '2025-09-08',
//       status: 'submitted',
//       totalMarks: 25,
//       priority: 'medium',
//       type: 'group',
//       groupMembers: ['Arjun Kumar', 'Priya Singh', 'Rohit Verma'],
//       submittedFiles: [
//         {
//           id: 'sf1',
//           name: 'Library_DB_Design.pdf',
//           size: '2.5 MB',
//           uploadDate: '2025-09-08T14:30:00Z',
//           type: 'pdf'
//         },
//         {
//           id: 'sf2',
//           name: 'SQL_Queries.sql',
//           size: '15 KB',
//           uploadDate: '2025-09-08T14:35:00Z',
//           type: 'sql'
//         }
//       ]
//     },
//     {
//       id: 'A003',
//       title: 'Operating System Scheduling Algorithms',
//       description: 'Implement and compare different CPU scheduling algorithms: FCFS, SJF, Round Robin, and Priority Scheduling.',
//       subject: 'Operating Systems',
//       subjectCode: 'CS503',
//       instructor: 'Dr. Amit Singh',
//       assignedDate: '2025-08-15',
//       dueDate: '2025-09-05',
//       submissionDate: '2025-09-04',
//       status: 'graded',
//       marksObtained: 18,
//       totalMarks: 20,
//       priority: 'high',
//       type: 'individual',
//       feedback: 'Excellent implementation of all algorithms. Good analysis and comparison. Minor improvement needed in code documentation.',
//       submittedFiles: [
//         {
//           id: 'sf3',
//           name: 'Scheduling_Algorithms.cpp',
//           size: '8.2 KB',
//           uploadDate: '2025-09-04T16:20:00Z',
//           type: 'cpp'
//         }
//       ]
//     },
//     {
//       id: 'A004',
//       title: 'Network Protocol Analysis',
//       description: 'Analyze TCP/IP protocol behavior using Wireshark. Submit packet capture files and detailed analysis report.',
//       subject: 'Computer Networks',
//       subjectCode: 'CS504',
//       instructor: 'Dr. Neha Gupta',
//       assignedDate: '2025-09-01',
//       dueDate: '2025-09-08',
//       status: 'overdue',
//       totalMarks: 15,
//       priority: 'medium',
//       type: 'individual'
//     }
//   ]);

//   const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
//   const [showSubmissionModal, setShowSubmissionModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState<'all' | Assignment['status']>('all');
//   const [filterSubject, setFilterSubject] = useState<'all' | string>('all');
//   const [sortBy, setSortBy] = useState<'dueDate' | 'assignedDate' | 'title'>('dueDate');
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [submissionText, setSubmissionText] = useState('');

//   // Filter and sort assignments
//   const filteredAndSortedAssignments = useMemo(() => {
//     let filtered = assignments.filter(assignment => {
//       const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
//       const matchesSubject = filterSubject === 'all' || assignment.subjectCode === filterSubject;
      
//       return matchesSearch && matchesStatus && matchesSubject;
//     });

//     // Sort assignments
//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case 'dueDate':
//           return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
//         case 'assignedDate':
//           return new Date(b.assignedDate).getTime() - new Date(a.assignedDate).getTime();
//         case 'title':
//           return a.title.localeCompare(b.title);
//         default:
//           return 0;
//       }
//     });

//     return filtered;
//   }, [assignments, searchTerm, filterStatus, filterSubject, sortBy]);

//   // Calculate statistics
//   const stats = useMemo(() => {
//     const pending = assignments.filter(a => a.status === 'pending').length;
//     const submitted = assignments.filter(a => a.status === 'submitted').length;
//     const graded = assignments.filter(a => a.status === 'graded').length;
//     const overdue = assignments.filter(a => a.status === 'overdue').length;
//     const totalMarks = assignments.filter(a => a.marksObtained !== undefined)
//       .reduce((sum, a) => sum + (a.marksObtained || 0), 0);
//     const maxMarks = assignments.filter(a => a.marksObtained !== undefined)
//       .reduce((sum, a) => sum + a.totalMarks, 0);
//     const avgScore = maxMarks > 0 ? ((totalMarks / maxMarks) * 100).toFixed(1) : '0';

//     return { pending, submitted, graded, overdue, avgScore };
//   }, [assignments]);

//   // Get unique subjects for filter
//   const subjects = useMemo(() => {
//     return Array.from(new Set(assignments.map(a => a.subjectCode)));
//   }, [assignments]);

//   const getStatusColor = (status: Assignment['status']) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'graded': return 'bg-green-100 text-green-800 border-green-200';
//       case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status: Assignment['status']) => {
//     switch (status) {
//       case 'pending': return <Clock className="w-4 h-4" />;
//       case 'submitted': return <CheckCircle className="w-4 h-4" />;
//       case 'graded': return <Award className="w-4 h-4" />;
//       case 'overdue': return <AlertCircle className="w-4 h-4" />;
//       default: return <Clock className="w-4 h-4" />;
//     }
//   };

//   const getPriorityColor = (priority: Assignment['priority']) => {
//     switch (priority) {
//       case 'high': return 'text-red-600';
//       case 'medium': return 'text-yellow-600';
//       case 'low': return 'text-green-600';
//       default: return 'text-gray-600';
//     }
//   };

//   const isOverdue = (dueDate: string, status: Assignment['status']) => {
//     return new Date(dueDate) < new Date() && status === 'pending';
//   };

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     setSelectedFiles(prev => [...prev, ...files]);
//   };

//   const removeFile = (index: number) => {
//     setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmission = () => {
//     if (selectedFiles.length === 0 && !submissionText.trim()) {
//       alert('Please add files or enter submission text');
//       return;
//     }

//     // Simulate submission
//     alert('Assignment submitted successfully!');
//     setShowSubmissionModal(false);
//     setSelectedFiles([]);
//     setSubmissionText('');
//     setSelectedAssignment(null);
//   };

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
//               <FileText className="w-8 h-8 text-blue-600" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
//               <div className="text-gray-600">
//                 <p>{studentInfo.name} • {studentInfo.rollNumber}</p>
//                 <p>{studentInfo.department} • {studentInfo.semester}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="text-right">
//             <div className="text-2xl font-bold text-blue-600">{stats.avgScore}%</div>
//             <div className="text-sm text-gray-600">Average Score</div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-yellow-100 rounded-lg">
//               <Clock className="w-6 h-6 text-yellow-600" />
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
//               <div className="text-sm text-gray-600">Pending</div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-blue-100 rounded-lg">
//               <CheckCircle className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-900">{stats.submitted}</div>
//               <div className="text-sm text-gray-600">Submitted</div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-green-100 rounded-lg">
//               <Award className="w-6 h-6 text-green-600" />
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-900">{stats.graded}</div>
//               <div className="text-sm text-gray-600">Graded</div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-red-100 rounded-lg">
//               <AlertCircle className="w-6 h-6 text-red-600" />
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-900">{stats.overdue}</div>
//               <div className="text-sm text-gray-600">Overdue</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//         <div className="flex flex-col lg:flex-row gap-4">
//           {/* Search */}
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search assignments by title, subject, or description..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           {/* Filters */}
//           <div className="flex gap-3">
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value as any)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="all">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="submitted">Submitted</option>
//               <option value="graded">Graded</option>
//               <option value="overdue">Overdue</option>
//             </select>

//             <select
//               value={filterSubject}
//               onChange={(e) => setFilterSubject(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="all">All Subjects</option>
//               {subjects.map(subject => (
//                 <option key={subject} value={subject}>{subject}</option>
//               ))}
//             </select>

//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value as any)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="dueDate">Sort by Due Date</option>
//               <option value="assignedDate">Sort by Assigned Date</option>
//               <option value="title">Sort by Title</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Assignments List */}
//       <div className="space-y-4">
//         {filteredAndSortedAssignments.map(assignment => (
//           <div 
//             key={assignment.id} 
//             className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow ${
//               isOverdue(assignment.dueDate, assignment.status) ? 'border-l-4 border-red-500' : ''
//             }`}
//           >
//             <div className="flex justify-between items-start mb-4">
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 mb-2">
//                   <h3 className="text-xl font-semibold text-gray-900">{assignment.title}</h3>
//                   <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(assignment.status)}`}>
//                     {getStatusIcon(assignment.status)}
//                     {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
//                   </span>
//                   <span className={`text-sm font-medium ${getPriorityColor(assignment.priority)}`}>
//                     {assignment.priority.toUpperCase()} PRIORITY
//                   </span>
//                 </div>
                
//                 <p className="text-gray-700 mb-3 line-clamp-2">{assignment.description}</p>
                
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                   <div className="flex items-center gap-2">
//                     <BookOpen className="w-4 h-4" />
//                     <span>{assignment.subject} ({assignment.subjectCode})</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <User className="w-4 h-4" />
//                     <span>{assignment.instructor}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Calendar className="w-4 h-4" />
//                     <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Star className="w-4 h-4" />
//                     <span>Max Marks: {assignment.totalMarks}</span>
//                   </div>
//                 </div>

//                 {/* Group Assignment Info */}
//                 {assignment.type === 'group' && assignment.groupMembers && (
//                   <div className="mt-3 p-3 bg-blue-50 rounded-lg">
//                     <div className="text-sm text-blue-800">
//                       <strong>Group Assignment:</strong> {assignment.groupMembers.join(', ')}
//                     </div>
//                   </div>
//                 )}

//                 {/* Grade and Feedback */}
//                 {assignment.status === 'graded' && (
//                   <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="font-medium text-green-800">Grade:</span>
//                       <span className="text-lg font-bold text-green-600">
//                         {assignment.marksObtained}/{assignment.totalMarks} 
//                         ({((assignment.marksObtained! / assignment.totalMarks) * 100).toFixed(1)}%)
//                       </span>
//                     </div>
//                     {assignment.feedback && (
//                       <div>
//                         <span className="font-medium text-green-800">Feedback:</span>
//                         <p className="text-green-700 mt-1">{assignment.feedback}</p>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Submitted Files */}
//                 {assignment.submittedFiles && assignment.submittedFiles.length > 0 && (
//                   <div className="mt-4">
//                     <h4 className="font-medium text-gray-900 mb-2">Submitted Files:</h4>
//                     <div className="space-y-2">
//                       {assignment.submittedFiles.map(file => (
//                         <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
//                           <div className="flex items-center gap-2">
//                             <FileText className="w-4 h-4 text-gray-500" />
//                             <span className="text-sm text-gray-700">{file.name}</span>
//                             <span className="text-xs text-gray-500">({file.size})</span>
//                           </div>
//                           <button className="text-blue-600 hover:text-blue-800 text-sm">
//                             <Download className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex gap-3 ml-4">
//                 <button
//                   onClick={() => setSelectedAssignment(assignment)}
//                   className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//                 >
//                   <Eye className="w-4 h-4" />
//                   View Details
//                 </button>
                
//                 {(assignment.status === 'pending' || assignment.status === 'overdue') && (
//                   <button
//                     onClick={() => {
//                       setSelectedAssignment(assignment);
//                       setShowSubmissionModal(true);
//                     }}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//                   >
//                     <Upload className="w-4 h-4" />
//                     Submit
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}

//         {filteredAndSortedAssignments.length === 0 && (
//           <div className="bg-white rounded-xl shadow-sm p-12 text-center">
//             <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-500">No assignments found matching your criteria</p>
//           </div>
//         )}
//       </div>

//       {/* Assignment Details Modal */}
//       {selectedAssignment && !showSubmissionModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-bold text-gray-900">{selectedAssignment.title}</h2>
//                 <button
//                   onClick={() => setSelectedAssignment(null)}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <X className="w-6 h-6 text-gray-500" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3">Assignment Information</h3>
//                   <div className="space-y-2 text-sm">
//                     <div><strong>Subject:</strong> {selectedAssignment.subject} ({selectedAssignment.subjectCode})</div>
//                     <div><strong>Instructor:</strong> {selectedAssignment.instructor}</div>
//                     <div><strong>Type:</strong> {selectedAssignment.type.charAt(0).toUpperCase() + selectedAssignment.type.slice(1)}</div>
//                     <div><strong>Priority:</strong> {selectedAssignment.priority.charAt(0).toUpperCase() + selectedAssignment.priority.slice(1)}</div>
//                     <div><strong>Total Marks:</strong> {selectedAssignment.totalMarks}</div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3">Important Dates</h3>
//                   <div className="space-y-2 text-sm">
//                     <div><strong>Assigned Date:</strong> {new Date(selectedAssignment.assignedDate).toLocaleDateString()}</div>
//                     <div><strong>Due Date:</strong> {new Date(selectedAssignment.dueDate).toLocaleDateString()}</div>
//                     {selectedAssignment.submissionDate && (
//                       <div><strong>Submitted Date:</strong> {new Date(selectedAssignment.submissionDate).toLocaleDateString()}</div>
//                     )}
//                     <div><strong>Status:</strong> {selectedAssignment.status.charAt(0).toUpperCase() + selectedAssignment.status.slice(1)}</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
//                 <p className="text-gray-700">{selectedAssignment.description}</p>
//               </div>

//               {selectedAssignment.attachments && selectedAssignment.attachments.length > 0 && (
//                 <div className="mb-6">
//                   <h3 className="font-semibold text-gray-900 mb-3">Assignment Files</h3>
//                   <div className="space-y-2">
//                     {selectedAssignment.attachments.map((attachment, index) => (
//                       <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                         <div className="flex items-center gap-2">
//                           <Paperclip className="w-4 h-4 text-gray-500" />
//                           <span className="text-gray-700">{attachment}</span>
//                         </div>
//                         <button className="text-blue-600 hover:text-blue-800">
//                           <Download className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Submission Modal */}
//       {showSubmissionModal && selectedAssignment && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-bold text-gray-900">Submit Assignment</h2>
//                 <button
//                   onClick={() => {
//                     setShowSubmissionModal(false);
//                     setSelectedFiles([]);
//                     setSubmissionText('');
//                   }}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <X className="w-6 h-6 text-gray-500" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-6">
//               <div className="mb-4">
//                 <h3 className="font-semibold text-gray-900">{selectedAssignment.title}</h3>
//                 <p className="text-gray-600">{selectedAssignment.subject} • Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>
//               </div>

//               {/* File Upload */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
//                   <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <div className="space-y-2">
//                     <p className="text-gray-600">
//                       <span className="font-semibold text-blue-600 cursor-pointer">Click to upload</span> or drag and drop
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       PDF, DOC, PPT, ZIP files (max 50MB each)
//                     </p>
//                   </div>
//                   <input
//                     type="file"
//                     onChange={handleFileSelect}
//                     className="hidden"
//                     multiple
//                     accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.cpp,.java,.py,.txt"
//                     id="fileInput"
//                   />
//                   <label
//                     htmlFor="fileInput"
//                     className="absolute inset-0 cursor-pointer"
//                   ></label>
//                 </div>

//                 {/* Selected Files */}
//                 {selectedFiles.length > 0 && (
//                   <div className="mt-4 space-y-2">
//                     {selectedFiles.map((file, index) => (
//                       <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
//                         <div className="flex items-center gap-2">
//                           <FileText className="w-4 h-4 text-blue-600" />
//                           <div>
//                             <div className="font-medium text-blue-900">{file.name}</div>
//                             <div className="text-sm text-blue-700">{formatFileSize(file.size)}</div>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => removeFile(index)}
//                           className="text-red-600 hover:text-red-800"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Submission Text */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments (Optional)</label>
//                 <textarea
//                   value={submissionText}
//                   onChange={(e) => setSubmissionText(e.target.value)}
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Add any comments or notes about your submission..."
//                 />
//               </div>
//             </div>

//             <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
//               <button
//                 onClick={() => {
//                   setShowSubmissionModal(false);
//                   setSelectedFiles([]);
//                   setSubmissionText('');
//                 }}
//                 className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmission}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//               >
//                 <Send className="w-4 h-4" />
//                 Submit Assignment
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentAssignments;



import React, { useState, useMemo, useRef } from 'react';
import { 
  Search, 
  Filter, 
  Upload, 
  Download, 
  Eye, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Star,
  User,
  BookOpen,
  Send,
  Paperclip,
  MessageSquare,
  Award,
  TrendingUp,
  X,
  Plus,
  Trash2
} from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  subjectCode: string;
  instructor: string;
  assignedDate: string;
  dueDate: string;
  submissionDate?: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  marksObtained?: number;
  totalMarks: number;
  feedback?: string;
  attachments?: string[];
  submittedFiles?: SubmittedFile[];
  priority: 'low' | 'medium' | 'high';
  type: 'individual' | 'group';
  groupMembers?: string[];
}

interface SubmittedFile {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  type: string;
}

const StudentAssignments: React.FC = () => {
  // Student Information
  const [studentInfo] = useState({
    name: 'Arjun Kumar',
    rollNumber: '2022CSE001',
    department: 'Computer Science Engineering',
    semester: '5th Semester',
    section: 'A',
    profileImage: '/api/placeholder/80/80'
  });

  // Assignments Data
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 'A001',
      title: 'Binary Search Tree Implementation',
      description: 'Implement a complete Binary Search Tree with insertion, deletion, and traversal operations. Include proper documentation and test cases.',
      subject: 'Data Structures',
      subjectCode: 'CS501',
      instructor: 'Dr. Rajesh Kumar',
      assignedDate: '2025-08-25',
      dueDate: '2025-09-15',
      status: 'pending',
      totalMarks: 20,
      priority: 'high',
      type: 'individual',
      attachments: ['BST_Requirements.pdf', 'Sample_Code.cpp']
    },
    {
      id: 'A002',
      title: 'Database Design Project',
      description: 'Design a complete database system for a library management system including ER diagrams, normalization, and SQL queries.',
      subject: 'Database Management Systems',
      subjectCode: 'CS502',
      instructor: 'Prof. Priya Sharma',
      assignedDate: '2025-08-20',
      dueDate: '2025-09-10',
      submissionDate: '2025-09-08',
      status: 'submitted',
      totalMarks: 25,
      priority: 'medium',
      type: 'group',
      groupMembers: ['Arjun Kumar', 'Priya Singh', 'Rohit Verma'],
      submittedFiles: [
        {
          id: 'sf1',
          name: 'Library_DB_Design.pdf',
          size: '2.5 MB',
          uploadDate: '2025-09-08T14:30:00Z',
          type: 'pdf'
        },
        {
          id: 'sf2',
          name: 'SQL_Queries.sql',
          size: '15 KB',
          uploadDate: '2025-09-08T14:35:00Z',
          type: 'sql'
        }
      ]
    },
    {
      id: 'A003',
      title: 'Operating System Scheduling Algorithms',
      description: 'Implement and compare different CPU scheduling algorithms: FCFS, SJF, Round Robin, and Priority Scheduling.',
      subject: 'Operating Systems',
      subjectCode: 'CS503',
      instructor: 'Dr. Amit Singh',
      assignedDate: '2025-08-15',
      dueDate: '2025-09-05',
      submissionDate: '2025-09-04',
      status: 'graded',
      marksObtained: 18,
      totalMarks: 20,
      priority: 'high',
      type: 'individual',
      feedback: 'Excellent implementation of all algorithms. Good analysis and comparison. Minor improvement needed in code documentation.',
      submittedFiles: [
        {
          id: 'sf3',
          name: 'Scheduling_Algorithms.cpp',
          size: '8.2 KB',
          uploadDate: '2025-09-04T16:20:00Z',
          type: 'cpp'
        }
      ]
    },
    {
      id: 'A004',
      title: 'Network Protocol Analysis',
      description: 'Analyze TCP/IP protocol behavior using Wireshark. Submit packet capture files and detailed analysis report.',
      subject: 'Computer Networks',
      subjectCode: 'CS504',
      instructor: 'Dr. Neha Gupta',
      assignedDate: '2025-09-01',
      dueDate: '2025-09-08',
      status: 'overdue',
      totalMarks: 15,
      priority: 'medium',
      type: 'individual'
    }
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | Assignment['status']>('all');
  const [filterSubject, setFilterSubject] = useState<'all' | string>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'assignedDate' | 'title'>('dueDate');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submissionText, setSubmissionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter and sort assignments
  const filteredAndSortedAssignments = useMemo(() => {
    let filtered = assignments.filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
      const matchesSubject = filterSubject === 'all' || assignment.subjectCode === filterSubject;
      
      return matchesSearch && matchesStatus && matchesSubject;
    });

    // Sort assignments
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'assignedDate':
          return new Date(b.assignedDate).getTime() - new Date(a.assignedDate).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [assignments, searchTerm, filterStatus, filterSubject, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const pending = assignments.filter(a => a.status === 'pending').length;
    const submitted = assignments.filter(a => a.status === 'submitted').length;
    const graded = assignments.filter(a => a.status === 'graded').length;
    const overdue = assignments.filter(a => a.status === 'overdue').length;
    const totalMarks = assignments.filter(a => a.marksObtained !== undefined)
      .reduce((sum, a) => sum + (a.marksObtained || 0), 0);
    const maxMarks = assignments.filter(a => a.marksObtained !== undefined)
      .reduce((sum, a) => sum + a.totalMarks, 0);
    const avgScore = maxMarks > 0 ? ((totalMarks / maxMarks) * 100).toFixed(1) : '0';

    return { pending, submitted, graded, overdue, avgScore };
  }, [assignments]);

  // Get unique subjects for filter
  const subjects = useMemo(() => {
    return Array.from(new Set(assignments.map(a => a.subjectCode)));
  }, [assignments]);

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'graded': return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Assignment['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'submitted': return <CheckCircle className="w-4 h-4" />;
      case 'graded': return <Award className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: Assignment['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const isOverdue = (dueDate: string, status: Assignment['status']) => {
    return new Date(dueDate) < new Date() && status === 'pending';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/zip',
      'text/plain',
      'text/x-c++src',
      'text/x-java-source',
      'text/x-python'
    ];

    if (file.size > maxSize) {
      return `File ${file.name} is too large. Maximum size is 50MB.`;
    }

    const fileExtension = file.name.toLowerCase().split('.').pop();
    const allowedExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'zip', 'txt', 'cpp', 'java', 'py', 'c', 'h'];
    
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return `File ${file.name} has an unsupported format.`;
    }

    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        // Check for duplicates
        const isDuplicate = selectedFiles.some(existingFile => 
          existingFile.name === file.name && existingFile.size === file.size
        );
        if (!isDuplicate) {
          validFiles.push(file);
        }
      }
    });

    if (errors.length > 0) {
      alert('File validation errors:\n' + errors.join('\n'));
    }

    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
      // Simulate upload progress
      validFiles.forEach(file => {
        simulateUploadProgress(file.name);
      });
    }

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const simulateUploadProgress = (fileName: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadProgress(prev => ({ ...prev, [fileName]: 100 }));
      } else {
        setUploadProgress(prev => ({ ...prev, [fileName]: progress }));
      }
    }, 200);
  };

  const removeFile = (index: number) => {
    const fileToRemove = selectedFiles[index];
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileToRemove.name];
      return newProgress;
    });
  };

  const handleSubmission = async () => {
    // Validation
    if (selectedFiles.length === 0 && !submissionText.trim()) {
      alert('Please add files or enter submission comments before submitting.');
      return;
    }

    // Check if all files are fully uploaded
    const incompleteUploads = selectedFiles.filter(file => 
      !uploadProgress[file.name] || uploadProgress[file.name] < 100
    );

    if (incompleteUploads.length > 0) {
      alert('Please wait for all files to finish uploading before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (selectedAssignment) {
        // Create submitted files
        const submittedFiles: SubmittedFile[] = selectedFiles.map((file, index) => ({
          id: `sf_${selectedAssignment.id}_${Date.now()}_${index}`,
          name: file.name,
          size: formatFileSize(file.size),
          uploadDate: new Date().toISOString(),
          type: file.name.split('.').pop() || 'unknown'
        }));

        // Update assignment status
        const updatedAssignments = assignments.map(assignment => {
          if (assignment.id === selectedAssignment.id) {
            return {
              ...assignment,
              status: 'submitted' as const,
              submissionDate: new Date().toISOString().split('T')[0],
              submittedFiles: submittedFiles
            };
          }
          return assignment;
        });

        setAssignments(updatedAssignments);
        
        alert('Assignment submitted successfully! 🎉');
        handleModalClose();
      }
    } catch (error) {
      alert('Failed to submit assignment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowSubmissionModal(false);
    setSelectedFiles([]);
    setSubmissionText('');
    setSelectedAssignment(null);
    setUploadProgress({});
  };

  const handleCancel = () => {
    if (selectedFiles.length > 0 || submissionText.trim()) {
      if (window.confirm('Are you sure you want to cancel? All uploaded files and comments will be lost.')) {
        handleModalClose();
      }
    } else {
      handleModalClose();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Simple download handler for demonstration (replace with actual download logic if needed)
  const handleDownload = (filename: string) => {
    alert(`Download requested for: ${filename}`);
    // You can implement actual file download logic here
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
              <div className="text-gray-600">
                <p>{studentInfo.name} • {studentInfo.rollNumber}</p>
                <p>{studentInfo.department} • {studentInfo.semester}</p>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{stats.avgScore}%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.submitted}</div>
              <div className="text-sm text-gray-600">Submitted</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.graded}</div>
              <div className="text-sm text-gray-600">Graded</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.overdue}</div>
              <div className="text-sm text-gray-600">Overdue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search assignments by title, subject, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
              <option value="overdue">Overdue</option>
            </select>

            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="assignedDate">Sort by Assigned Date</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAndSortedAssignments.map(assignment => (
          <div 
            key={assignment.id} 
            className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow ${
              isOverdue(assignment.dueDate, assignment.status) ? 'border-l-4 border-red-500' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{assignment.title}</h3>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(assignment.status)}`}>
                    {getStatusIcon(assignment.status)}
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                  <span className={`text-sm font-medium ${getPriorityColor(assignment.priority)}`}>
                    {assignment.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3 line-clamp-2">{assignment.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{assignment.subject} ({assignment.subjectCode})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{assignment.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>Max Marks: {assignment.totalMarks}</span>
                  </div>
                </div>

                {/* Group Assignment Info */}
                {assignment.type === 'group' && assignment.groupMembers && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-800">
                      <strong>Group Assignment:</strong> {assignment.groupMembers.join(', ')}
                    </div>
                  </div>
                )}

                {/* Grade and Feedback */}
                {assignment.status === 'graded' && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-green-800">Grade:</span>
                      <span className="text-lg font-bold text-green-600">
                        {assignment.marksObtained}/{assignment.totalMarks} 
                        ({((assignment.marksObtained! / assignment.totalMarks) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    {assignment.feedback && (
                      <div>
                        <span className="font-medium text-green-800">Feedback:</span>
                        <p className="text-green-700 mt-1">{assignment.feedback}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Submitted Files */}
                {assignment.submittedFiles && assignment.submittedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Submitted Files:</h4>
                    <div className="space-y-2">
                      {assignment.submittedFiles.map(file => (
                        <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <span className="text-xs text-gray-500">({file.size})</span>
                          </div>
                          <button onClick={() => handleDownload(file.name)} className="text-blue-600 hover:text-blue-800 text-sm">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 ml-4">
                <button
                  onClick={() => setSelectedAssignment(assignment)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                
                {(assignment.status === 'pending' || assignment.status === 'overdue') && (
                  <button
                    onClick={() => {
                      setSelectedAssignment(assignment);
                      setShowSubmissionModal(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredAndSortedAssignments.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No assignments found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Assignment Details Modal */}
      {selectedAssignment && !showSubmissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedAssignment.title}</h2>
                <button
                  onClick={() => setSelectedAssignment(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Assignment Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Subject:</strong> {selectedAssignment.subject} ({selectedAssignment.subjectCode})</div>
                    <div><strong>Instructor:</strong> {selectedAssignment.instructor}</div>
                    <div><strong>Type:</strong> {selectedAssignment.type.charAt(0).toUpperCase() + selectedAssignment.type.slice(1)}</div>
                    <div><strong>Priority:</strong> {selectedAssignment.priority.charAt(0).toUpperCase() + selectedAssignment.priority.slice(1)}</div>
                    <div><strong>Total Marks:</strong> {selectedAssignment.totalMarks}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Important Dates</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Assigned Date:</strong> {new Date(selectedAssignment.assignedDate).toLocaleDateString()}</div>
                    <div><strong>Due Date:</strong> {new Date(selectedAssignment.dueDate).toLocaleDateString()}</div>
                    {selectedAssignment.submissionDate && (
                      <div><strong>Submitted Date:</strong> {new Date(selectedAssignment.submissionDate).toLocaleDateString()}</div>
                    )}
                    <div><strong>Status:</strong> {selectedAssignment.status.charAt(0).toUpperCase() + selectedAssignment.status.slice(1)}</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700">{selectedAssignment.description}</p>
              </div>

              {selectedAssignment.attachments && selectedAssignment.attachments.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Assignment Files</h3>
                  <div className="space-y-2">
                    {selectedAssignment.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Paperclip className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">{attachment}</span>
                        </div>
                        <button onClick={() => handleDownload(attachment)} className="text-blue-600 hover:text-blue-800">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submission Modal */}
      {showSubmissionModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Submit Assignment</h2>
                <button
                  onClick={handleCancel}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  disabled={isSubmitting}
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900">{selectedAssignment.title}</h3>
                <p className="text-gray-600">{selectedAssignment.subject} • Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>
                {isOverdue(selectedAssignment.dueDate, selectedAssignment.status) && (
                  <p className="text-red-600 font-medium mt-1">⚠️ This assignment is overdue!</p>
                )}
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF, DOC, PPT, ZIP, CPP, JAVA, PY files (max 50MB each)
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.cpp,.java,.py,.txt,.c,.h"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Alternative Upload Button */}
                <div className="mt-3 text-center">
                  <button
                    onClick={triggerFileInput}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                    Add More Files
                  </button>
                </div>

                {/* Selected Files */}
                {selectedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium text-gray-900">Selected Files ({selectedFiles.length})</h4>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-1">
                            <FileText className="w-4 h-4 text-blue-600" />
                            <div className="flex-1">
                              <div className="font-medium text-blue-900">{file.name}</div>
                              <div className="text-sm text-blue-700">{formatFileSize(file.size)}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            disabled={isSubmitting}
                            className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {/* Progress Bar */}
                        {uploadProgress[file.name] !== undefined && uploadProgress[file.name] < 100 && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress[file.name]}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              Uploading... {Math.round(uploadProgress[file.name])}%
                            </div>
                          </div>
                        )}
                        {uploadProgress[file.name] === 100 && (
                          <div className="mt-2 flex items-center gap-1 text-green-600 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Upload complete
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submission Text */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments 
                  {selectedFiles.length === 0 && <span className="text-red-500">*</span>}
                </label>
                <textarea
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  rows={4}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="Add any comments or notes about your submission..."
                />
                {selectedFiles.length === 0 && (
                  <p className="text-xs text-red-500 mt-1">
                    Please either upload files or add comments to submit the assignment.
                  </p>
                )}
              </div>

              {/* Submission Summary */}
              {(selectedFiles.length > 0 || submissionText.trim()) && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Submission Summary</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    {selectedFiles.length > 0 && (
                      <li>• {selectedFiles.length} file(s) ready to submit</li>
                    )}
                    {submissionText.trim() && (
                      <li>• Additional comments added</li>
                    )}
                    <li>• Assignment: {selectedAssignment.title}</li>
                    <li>• Subject: {selectedAssignment.subject}</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleCancel}
                disabled={isSubmitting}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmission}
                disabled={isSubmitting || (selectedFiles.length === 0 && !submissionText.trim())}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Assignment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAssignments;