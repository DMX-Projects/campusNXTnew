import React, { useState, useMemo, ElementType } from 'react';
import { Search, UserCheck, Upload, ArrowLeft, CheckCircle, XCircle, Clock, Eye, MessageSquare, X, Save, Edit, XSquare, BookOpen } from 'lucide-react';

// --- TYPES ---
type Document = {
  id: number;
  name: string;
  url: string;
  status: 'Approved' | 'Rejected' | 'Pending';
};

type StudentProfile = {
  id: string;
  name: string;
  avatar: string;
  course: string;
  applicationStatus: 'Pending Verification' | 'Verified' | 'Action Required';
  personalDetails: {
    dob: string;
    email: string;
    phone: string;
  };
  academicDetails: {
    previousInstitution: string;
    board: 'CBSE' | 'ISC' | 'State Board' | 'Other';
    percentage: string;
    yearOfPassing: string;
    entranceExam: string;
    entranceExamScore: string;
    selectedCourses: string[];
  };
  documents: Document[];
  remarks: string;
};

// --- MOCK DATA ---
const initialStudentsForAcademicVerification: StudentProfile[] = [
  {
    id: 'ACAD001', name: 'Ishita Sharma', avatar: 'IS', course: 'B.Tech AI & ML', applicationStatus: 'Pending Verification',
    personalDetails: { dob: '15-08-2005', email: 'ishita.sharma@example.com', phone: '+91 98765 43210' },
    academicDetails: { previousInstitution: 'Delhi Public School, Bangalore', board: 'CBSE', percentage: '92.5%', yearOfPassing: '2023', entranceExam: 'JEE Main', entranceExamScore: '98.5 percentile', selectedCourses: ['AI & ML', 'Data Science', 'Cyber Security'] },
    documents: [ { id: 1, name: '12th Marksheet.pdf', url: '#', status: 'Pending' }, { id: 2, name: 'JEE Scorecard.pdf', url: '#', status: 'Approved' } ],
    remarks: 'Awaiting 12th marksheet verification from board.'
  },
  {
    id: 'ACAD002', name: 'Reyansh Gupta', avatar: 'RG', course: 'B.Com', applicationStatus: 'Verified',
    personalDetails: { dob: '22-05-2004', email: 'reyansh.gupta@example.com', phone: '+91 98765 43211' },
    academicDetails: { previousInstitution: 'St. Xavier\'s College, Mumbai', board: 'ISC', percentage: '88.0%', yearOfPassing: '2023', entranceExam: 'N/A', entranceExamScore: 'N/A', selectedCourses: ['B.Com (Honours)', 'B.Com (General)'] },
    documents: [ { id: 1, name: '12th Marksheet.pdf', url: '#', status: 'Approved' }, { id: 2, name: 'Migration Certificate.pdf', url: '#', status: 'Approved' } ],
    remarks: 'Verified with university records.'
  },
   {
    id: 'ACAD003', name: 'Anika Reddy', avatar: 'AR', course: 'BBA', applicationStatus: 'Action Required',
    personalDetails: { dob: '10-01-2005', email: 'anika.reddy@example.com', phone: '+91 98765 43212' },
    academicDetails: { previousInstitution: 'Narayana Junior College, Hyderabad', board: 'State Board', percentage: '75.2%', yearOfPassing: '2022', entranceExam: 'University Entrance Test', entranceExamScore: 'Rank 512', selectedCourses: ['BBA Finance', 'BBA Marketing'] },
    documents: [ { id: 1, name: 'Consolidated Marksheet.pdf', url: '#', status: 'Rejected' }, { id: 2, name: 'Backlog Clearance.pdf', url: '#', status: 'Pending' } ],
    remarks: 'Consolidated marksheet is illegible. Backlog clearance form required.'
  },
  {
    id: 'ACAD004', name: 'Arnav Choudhary', avatar: 'AC', course: 'B.Sc Physics', applicationStatus: 'Pending Verification',
    personalDetails: { dob: '05-11-2004', email: 'arnav.c@example.com', phone: '+91 98765 43213' },
    academicDetails: { previousInstitution: 'Modern School, Delhi', board: 'CBSE', percentage: '85.0%', yearOfPassing: '2023', entranceExam: 'N/A', entranceExamScore: 'N/A', selectedCourses: ['B.Sc Physics (Honours)', 'B.Sc Chemistry'] },
    documents: [ { id: 1, name: 'Provisional Certificate.pdf', url: '#', status: 'Pending' }, { id: 2, name: 'Character Certificate.pdf', url: '#', status: 'Approved' } ],
    remarks: 'Awaiting initial review of provisional certificate.'
  },
  {
    id: 'ACAD005', name: 'Kabir Das', avatar: 'KD', course: 'B.Tech CSE', applicationStatus: 'Pending Verification',
    personalDetails: { dob: '20-04-2005', email: 'kabir.das@example.com', phone: '+91 98765 11223' },
    academicDetails: { previousInstitution: 'Amity International School, Noida', board: 'CBSE', percentage: '95.1%', yearOfPassing: '2023', entranceExam: 'JEE Main', entranceExamScore: '99.2 percentile', selectedCourses: ['Computer Science', 'Artificial Intelligence'] },
    documents: [ { id: 1, name: '12th Marksheet.pdf', url: '#', status: 'Approved' }, { id: 2, name: 'JEE Scorecard.pdf', url: '#', status: 'Pending' } ],
    remarks: 'Awaiting confirmation for JEE scorecard from NTA.'
  },
  {
    id: 'ACAD006', name: 'Zara Khan', avatar: 'ZK', course: 'MBA', applicationStatus: 'Verified',
    personalDetails: { dob: '11-11-2001', email: 'zara.khan@example.com', phone: '+91 98765 22334' },
    academicDetails: { previousInstitution: 'Christ University, Bangalore', board: 'Other', percentage: '8.5 CGPA', yearOfPassing: '2022', entranceExam: 'CAT', entranceExamScore: '95 percentile', selectedCourses: ['MBA Finance', 'MBA Analytics'] },
    documents: [ { id: 1, name: 'Degree Certificate.pdf', url: '#', status: 'Approved' }, { id: 2, name: 'CAT Scorecard.pdf', url: '#', status: 'Approved' } ],
    remarks: 'All academic credentials verified.'
  },
  {
    id: 'ACAD007', name: 'Aryan Singh', avatar: 'AS', course: 'B.Tech ECE', applicationStatus: 'Action Required',
    personalDetails: { dob: '01-03-2005', email: 'aryan.singh@example.com', phone: '+91 98765 33445' },
    academicDetails: { previousInstitution: 'Bishop Cotton Boys\' School, Bangalore', board: 'ISC', percentage: '89.0%', yearOfPassing: '2023', entranceExam: 'COMEDK', entranceExamScore: 'Rank 1200', selectedCourses: ['Electronics & Comm', 'Electrical Engg.'] },
    documents: [ { id: 1, name: '12th Marksheet.pdf', url: '#', status: 'Approved' }, { id: 2, name: 'COMEDK Rank Card.pdf', url: '#', status: 'Approved' } ],
    remarks: 'Discrepancy found between reported percentage (89%) and marksheet (88.2%). Clarification requested.'
  },
  {
    id: 'ACAD008', name: 'Diya Patel', avatar: 'DP', course: 'B.Sc Chemistry', applicationStatus: 'Pending Verification',
    personalDetails: { dob: '07-08-2005', email: 'diya.patel@example.com', phone: '+91 98765 44556' },
    academicDetails: { previousInstitution: 'Kendriya Vidyalaya, Ahmedabad', board: 'CBSE', percentage: '86.4%', yearOfPassing: '2023', entranceExam: 'N/A', entranceExamScore: 'N/A', selectedCourses: ['B.Sc Chemistry', 'B.Sc Biology'] },
    documents: [ { id: 1, name: '12th Marksheet.pdf', url: '#', status: 'Approved' }, { id: 2, name: 'Transfer Certificate.pdf', url: '#', status: 'Pending' } ],
    remarks: 'Awaiting initial review.'
  },
  {
    id: 'ACAD009', name: 'Rohan Verma', avatar: 'RV', course: 'BBA', applicationStatus: 'Verified',
    personalDetails: { dob: '25-09-2004', email: 'rohan.verma@example.com', phone: '+91 98765 55667' },
    academicDetails: { previousInstitution: 'Symbiosis College, Pune', board: 'Other', percentage: '82.0%', yearOfPassing: '2023', entranceExam: 'SET', entranceExamScore: 'Score 112', selectedCourses: ['BBA International Business', 'BBA Management'] },
    documents: [ { id: 1, name: '12th Marksheet.pdf', url: '#', status: 'Approved' }, { id: 2, name: 'SET Scorecard.pdf', url: '#', status: 'Approved' } ],
    remarks: 'Academics confirmed via online university portal.'
  }
];


const getStatusChipClasses = (status: StudentProfile['applicationStatus'] | Document['status']) => {
  switch (status) {
    case 'Verified':
    case 'Approved':
      return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
    case 'Pending Verification':
    case 'Pending':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
    case 'Action Required':
    case 'Rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const StatusIcon = ({ status }: { status: Document['status'] }) => {
    switch (status) {
        case 'Approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
        case 'Rejected': return <XCircle className="w-5 h-5 text-red-500" />;
        case 'Pending': return <Clock className="w-5 h-5 text-amber-500" />;
        default: return null;
    }
};


// --- STUDENT DETAIL VIEW COMPONENT ---
const StudentAcademicDetailsVerification = ({ student, onBack, onUpdateStudent, onApprove, onActionRequired }: { student: StudentProfile, onBack: () => void, onUpdateStudent: (updatedStudent: StudentProfile, message: string) => void, onApprove: (studentId: string) => void, onActionRequired: (studentId: string, remark: string) => void }) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [editedStudent, setEditedStudent] = useState<StudentProfile>(student);
    const [actionModalState, setActionModalState] = useState<{isOpen: boolean; remark: string;}>({ isOpen: false, remark: '' });

    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'remarks') {
             setEditedStudent(prev => ({...prev, remarks: value }));
        } else if (name === 'selectedCourses') {
             setEditedStudent(prev => ({...prev, academicDetails: { ...prev.academicDetails, [name]: value.split(',').map(s => s.trim()) }}));
        }
        else {
            setEditedStudent(prev => ({
                ...prev,
                academicDetails: { ...prev.academicDetails, [name]: value }
            }));
        }
    };

    const handleSaveChanges = () => {
        onUpdateStudent(editedStudent, `Academic details for ${editedStudent.name} updated.`);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedStudent(student);
        setIsEditing(false);
    };

    const handleConfirmActionRequired = (e: React.FormEvent) => {
        e.preventDefault();
        const { remark } = actionModalState;
        if (!remark) return;

        onActionRequired(student.id, remark);
        setActionModalState({ isOpen: false, remark: '' });
    };

    return (
        <div className="animate-fade-in">
             {actionModalState.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                    <form onSubmit={handleConfirmActionRequired} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
                        <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
                            <h2 className="text-xl font-bold">Action Required Remark</h2>
                            <button type="button" onClick={() => setActionModalState({isOpen: false, remark: ''})} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button>
                        </div>
                        <div className="p-6">
                            <label htmlFor="action-remark" className="block text-sm font-medium mb-1">Please provide a reason for this status</label>
                            <textarea id="action-remark" value={actionModalState.remark} onChange={(e) => setActionModalState(s => ({...s, remark: e.target.value}))} required className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg" rows={4} placeholder="e.g., Inconsistent information in documents provided..."></textarea>
                        </div>
                        <div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                            <button type="button" onClick={() => setActionModalState({isOpen: false, remark: ''})} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                            <button type="submit" disabled={!actionModalState.remark} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Submit Remark</button>
                        </div>
                    </form>
                </div>
            )}

            <header className="mb-8">
                <button onClick={onBack} className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline mb-4">
                    <ArrowLeft size={18} /> Back to Academic Verification List
                </button>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-2xl">{student.avatar}</div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{student.name}</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">{student.id} &bull; {student.course}</p>
                    </div>
                </div>
            </header>

            <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                     <h2 className="text-xl font-bold mb-4">Personal Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div><p className="text-gray-500 dark:text-gray-400">Date of Birth</p><p className="font-medium">{student.personalDetails.dob}</p></div>
                        <div><p className="text-gray-500 dark:text-gray-400">Email Address</p><p className="font-medium text-indigo-600 dark:text-indigo-400 truncate">{student.personalDetails.email}</p></div>
                        <div><p className="text-gray-500 dark:text-gray-400">Phone Number</p><p className="font-medium">{student.personalDetails.phone}</p></div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Academic Details</h2>
                        {student.applicationStatus !== 'Verified' && (
                             <div>{isEditing ? ( <div className="flex items-center gap-2"><button onClick={handleCancelEdit} className="flex items-center gap-2 px-4 py-2 border text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold"><XSquare size={16} /> Cancel</button><button onClick={handleSaveChanges} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 font-semibold"><Save size={16} /> Save Changes</button></div> ) : ( <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 border text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold"><Edit size={16} /> Edit</button> )}</div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                         {Object.entries(editedStudent.academicDetails).map(([key, value]) => (
                             key !== 'selectedCourses' ? (
                                <div key={key}>
                                    <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</label>
                                    <input type="text" name={key} value={value as string} onChange={handleDetailChange} disabled={!isEditing || student.applicationStatus === 'Verified'} className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg read-only:bg-gray-100 dark:read-only:bg-gray-700/50 read-only:cursor-default" />
                                </div>
                             ): null
                         ))}
                        <div className="sm:col-span-2">
                             <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium capitalize mb-1">Selected Courses (comma-separated)</label>
                             <input type="text" name="selectedCourses" value={(editedStudent.academicDetails.selectedCourses || []).join(', ')} onChange={handleDetailChange} disabled={!isEditing || student.applicationStatus === 'Verified'} className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg read-only:bg-gray-100 dark:read-only:bg-gray-700/50 read-only:cursor-default" />
                        </div>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Academic Team Remarks</h2>
                    <textarea name="remarks" value={editedStudent.remarks} onChange={handleDetailChange} disabled={!isEditing || student.applicationStatus === 'Verified'} className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg read-only:bg-gray-100 dark:read-only:bg-gray-700/50 read-only:cursor-default" rows={4} placeholder="Add academic verification notes here..."></textarea>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Uploaded Documents</h2>
                    <div className="space-y-4">
                        {editedStudent.documents.map(doc => (
                            <div key={doc.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                <div className="flex items-center gap-3">
                                    <StatusIcon status={doc.status} />
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">{doc.name}</p>
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusChipClasses(doc.status)}`}>{doc.status}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 self-end sm:self-center">
                                     <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                                        <Eye size={14} /> View
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

             {student.applicationStatus !== 'Verified' && (
                 <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div><h3 className="font-bold text-lg">Master Application Status</h3><p className="text-sm text-gray-500 dark:text-gray-400">Approve or reject the student's entire application.</p></div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setActionModalState({isOpen: true, remark: ''})} className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors">
                            <XCircle size={18} /> Mark as Action Required
                        </button>
                        <button onClick={() => onApprove(student.id)} className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors">
                            <CheckCircle size={18} /> Mark as Verified
                        </button>
                    </div>
                </div>
             )}
        </div>
    );
};


// --- MAIN VERIFICATION LIST COMPONENT ---
const StudentAcademicVerification = () => {
    const [students, setStudents] = useState<StudentProfile[]>(initialStudentsForAcademicVerification);
    const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('underVerification');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
    const itemsPerPage = 8;
    
    const filteredStudents = useMemo(() => {
        const byStatus = students.filter(s => (activeTab === 'underVerification' ? s.applicationStatus !== 'Verified' : s.applicationStatus === 'Verified'));
        return byStatus.filter((s) => searchTerm === '' || s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, students, activeTab]);

    const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    
    const handleUpdateStudent = (updatedStudent: StudentProfile, message: string) => {
        const newStudents = students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
        setStudents(newStudents);
        setSelectedStudent(updatedStudent);
        setToast({ message, type: 'info' });
    };

    const handleApproveStudent = (studentId: string) => {
        const studentToApprove = students.find(s => s.id === studentId);
        if(!studentToApprove) return;
        const newStudents = students.map(s => s.id === studentId ? {...s, applicationStatus: 'Verified' as 'Verified'} : s);
        setStudents(newStudents);
        setSelectedStudent(null);
        setActiveTab('verified');
        setToast({ message: `${studentToApprove.name}'s application has been approved.`, type: 'success' });
    };

    const handleActionRequired = (studentId: string, remark: string) => {
        const studentToAction = students.find(s => s.id === studentId);
        if(!studentToAction) return;
        const newStudents = students.map(s => s.id === studentId ? {...s, applicationStatus: 'Action Required' as 'Action Required', remarks: remark } : s);
        setStudents(newStudents);
        setSelectedStudent(null);
        setActiveTab('underVerification');
        setToast({ message: `${studentToAction.name}'s application marked as 'Action Required'.`, type: 'info' });
    };

    if (selectedStudent) {
        return (
             <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
                {toast && (<div className={`fixed top-5 right-5 z-[101] flex items-center gap-3 p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`}>{toast.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}<p>{toast.message}</p></div>)}
                <div className="max-w-7xl mx-auto">
                    <StudentAcademicDetailsVerification student={selectedStudent} onBack={() => setSelectedStudent(null)} onUpdateStudent={handleUpdateStudent} onApprove={handleApproveStudent} onActionRequired={handleActionRequired} />
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 text-gray-800 dark:text-gray-200">
             {toast && (<div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`}>{toast.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}<p>{toast.message}</p></div>)}
            <div className="max-w-7xl mx-auto">
                <header className="mb-8"><h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Academic Verification</h1><p className="text-gray-500 dark:text-gray-400 mt-1">Review and verify student academic details and documents.</p></header>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                         <div className="relative w-full sm:w-80"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Search by name or ID..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg border-transparent focus:ring-2 focus:ring-indigo-500" /></div>
                        <div className="w-full sm:w-auto flex items-center p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                           <button onClick={() => { setActiveTab('underVerification'); setCurrentPage(1); }} className={`w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'underVerification' ? 'bg-white dark:bg-gray-800 text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-200'}`}>Under Verification</button>
                           <button onClick={() => { setActiveTab('verified'); setCurrentPage(1); }} className={`w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'verified' ? 'bg-white dark:bg-gray-800 text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-200'}`}>Verified</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                    {filteredStudents.length === 0 ? (<div className="text-center py-20 text-gray-500"><Search className="mx-auto h-12 w-12 mb-4" /><h3 className="font-semibold text-lg">No students found</h3><p>No students match the current criteria.</p></div>) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-700 dark:text-gray-400"><tr ><th className="px-6 py-4 whitespace-nowrap">Applicant</th><th className="px-6 py-4 whitespace-nowrap">Course</th><th className="px-6 py-4 whitespace-nowrap">Academic Remarks</th><th className="px-6 py-4 whitespace-nowrap text-center">Action</th></tr></thead>
                                <tbody>
                                    {paginatedStudents.map((s) => (
                                        <tr key={s.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="px-6 py-4 flex items-center gap-3 whitespace-nowrap text-gray-900 dark:text-white font-medium"><div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center font-bold">{s.avatar}</div><div>{s.name}<p className="text-xs font-mono text-gray-500 dark:text-gray-400">{s.id}</p></div></td>
                                            <td className="px-6 py-4 whitespace-nowrap">{s.course}</td>
                                            <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate text-gray-500 dark:text-gray-400">{s.remarks || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center"><button onClick={() => setSelectedStudent(s)} className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-md font-semibold mx-auto hover:bg-indigo-700"><UserCheck className="w-4 h-4" /> View Details</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                         {totalPages > 1 && ( <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t dark:border-gray-700 text-sm"><div>Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length}</div><div className="flex items-center gap-1">{['First', 'Prev', 'Next', 'Last'].map(label => { const isDisabled = (label === 'First' || label === 'Prev') ? currentPage === 1 : currentPage === totalPages; const newPage = { First: 1, Prev: currentPage - 1, Next: currentPage + 1, Last: totalPages }[label] || 1; return <button key={label} onClick={() => setCurrentPage(newPage)} disabled={isDisabled} className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600">{label}</button>; })}</div></div> )}
                    </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentAcademicVerification;

