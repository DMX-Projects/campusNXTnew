import React, { useState, useMemo, ElementType } from 'react';
import { Search, UserCheck, Upload, ArrowLeft, CheckCircle, XCircle, Clock, Eye, Send, MessageSquare, X, Save, Edit, XSquare } from 'lucide-react';

// --- TYPES ---
type Document = {
  id: number;
  name: string;
  url: string; // In a real app, this would be a URL to the document
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
    address: string;
  };
  documents: Document[];
  remarks: string;
};

// --- MOCK DATA ---
const initialStudentsForVerification: StudentProfile[] = [
  {
    id: 'VERIFY001', name: 'Ishita Sharma', avatar: 'IS', course: 'B.Tech AI & ML', applicationStatus: 'Pending Verification',
    personalDetails: { dob: '15-08-2005', email: 'ishita.sharma@example.com', phone: '+91 98765 43210', address: '123 Tech Park, Bangalore' },
    documents: [
      { id: 1, name: '10th Marksheet.pdf', url: '#', status: 'Approved' },
      { id: 2, name: '12th Marksheet.pdf', url: '#', status: 'Pending' },
      { id: 3, name: 'Identity Proof.pdf', url: '#', status: 'Approved' },
    ],
    remarks: 'Awaiting 12th marksheet verification from board.'
  },
  {
    id: 'VERIFY002', name: 'Reyansh Gupta', avatar: 'RG', course: 'B.Com', applicationStatus: 'Verified',
    personalDetails: { dob: '22-05-2004', email: 'reyansh.gupta@example.com', phone: '+91 98765 43211', address: '456 Commerce Rd, Mumbai' },
    documents: [
      { id: 1, name: '10th Marksheet.pdf', url: '#', status: 'Approved' },
      { id: 2, name: '12th Marksheet.pdf', url: '#', status: 'Approved' },
      { id: 3, name: 'Community Certificate.pdf', url: '#', status: 'Approved' },
    ],
    remarks: 'All documents verified and found correct.'
  },
  {
    id: 'VERIFY003', name: 'Anika Reddy', avatar: 'AR', course: 'BBA', applicationStatus: 'Action Required',
    personalDetails: { dob: '10-01-2005', email: 'anika.reddy@example.com', phone: '+91 98765 43212', address: '789 Business Ave, Hyderabad' },
    documents: [
      { id: 1, name: '10th Marksheet.pdf', url: '#', status: 'Approved' },
      { id: 2, name: 'Passport Photo.jpg', url: '#', status: 'Rejected' },
      { id: 3, name: 'Transfer Certificate.pdf', url: '#', status: 'Approved' },
    ],
    remarks: 'Passport photo does not meet guidelines. Emailed student for new photo.'
  },
   {
    id: 'VERIFY004', name: 'Arnav Choudhary', avatar: 'AC', course: 'B.Sc Physics', applicationStatus: 'Pending Verification',
    personalDetails: { dob: '05-11-2004', email: 'arnav.c@example.com', phone: '+91 98765 43213', address: '321 Quantum St, Delhi' },
    documents: [
      { id: 1, name: 'Marksheet_Sem1.pdf', url: '#', status: 'Pending' },
      { id: 2, name: 'Marksheet_Sem2.pdf', url: '#', status: 'Pending' },
      { id: 3, name: 'Proof_Of_Address.pdf', url: '#', status: 'Approved' },
    ],
    remarks: 'Awaiting initial review.'
  },
  {
    id: 'VERIFY005', name: 'Myra Singh', avatar: 'MS', course: 'B.Tech CSE', applicationStatus: 'Verified',
    personalDetails: { dob: '30-03-2005', email: 'myra.s@example.com', phone: '+91 98765 43214', address: '555 Silicon Valley, Bangalore' },
    documents: [
      { id: 1, name: 'Allotment Letter.pdf', url: '#', status: 'Approved' },
      { id: 2, name: 'Fee Receipt.pdf', url: '#', status: 'Approved' },
      { id: 3, name: 'Aadhar Card.pdf', url: '#', status: 'Approved' },
    ],
    remarks: 'Verified via DigiLocker.'
  },
  {
    id: 'VERIFY006', name: 'Vivaan Joshi', avatar: 'VJ', course: 'B.Tech ECE', applicationStatus: 'Pending Verification',
    personalDetails: { dob: '12-09-2004', email: 'vivaan.joshi@example.com', phone: '+91 98765 43215', address: '101 Innovation Hub, Pune' },
    documents: [
      { id: 1, name: '10th Certificate.pdf', url: '#', status: 'Approved' },
      { id: 2, name: '12th Certificate.pdf', url: '#', status: 'Approved' },
      { id: 3, name: 'Migration Certificate.pdf', url: '#', status: 'Pending' },
    ],
    remarks: 'Awaiting initial review.'
  },
  {
    id: 'VERIFY007', name: 'Kiara Patel', avatar: 'KP', course: 'MBA', applicationStatus: 'Action Required',
    personalDetails: { dob: '19-07-2002', email: 'kiara.patel@example.com', phone: '+91 98765 43216', address: '222 Corporate Towers, Ahmedabad' },
    documents: [
      { id: 1, name: 'Degree Certificate.pdf', url: '#', status: 'Approved' },
      { id: 2, name: 'Work Experience.pdf', url: '#', status: 'Rejected' },
      { id: 3, name: 'Passport.pdf', url: '#', status: 'Approved' },
    ],
    remarks: 'Work experience letter does not state the joining date clearly.'
  },
  {
    id: 'VERIFY008', name: 'Aarav Kumar', avatar: 'AK', course: 'B.Com', applicationStatus: 'Pending Verification',
    personalDetails: { dob: '02-02-2005', email: 'aarav.kumar@example.com', phone: '+91 98765 43217', address: '888 Market St, Kolkata' },
    documents: [
      { id: 1, name: '10th Marksheet.pdf', url: '#', status: 'Approved' },
      { id: 2, name: '12th Marksheet.pdf', url: '#', status: 'Approved' },
      { id: 3, name: 'Birth Certificate.pdf', url: '#', status: 'Approved' },
    ],
    remarks: 'Awaiting initial review.'
  },
  {
    id: 'VERIFY009', name: 'Saanvi Chen', avatar: 'SC', course: 'B.Sc Chemistry', applicationStatus: 'Verified',
    personalDetails: { dob: '25-12-2004', email: 'saanvi.chen@example.com', phone: '+91 98765 43218', address: '777 Science Park, Chennai' },
    documents: [
      { id: 1, name: '10th Marksheet.pdf', url: '#', status: 'Approved' },
      { id: 2, name: '12th Marksheet.pdf', url: '#', status: 'Approved' },
      { id: 3, name: 'Transfer Certificate.pdf', url: '#', status: 'Approved' },
    ],
    remarks: 'Confirmed with previous institution.'
  },
  {
    id: 'VERIFY010', name: 'Advik Mehta', avatar: 'AM', course: 'B.Tech AI & ML', applicationStatus: 'Pending Verification',
    personalDetails: { dob: '14-06-2005', email: 'advik.mehta@example.com', phone: '+91 98765 43219', address: '404 Future Labs, Bangalore' },
    documents: [
      { id: 1, name: '10th Marksheet.pdf', url: '#', status: 'Approved' },
      { id: 2, name: 'JEE Scorecard.pdf', url: '#', status: 'Pending' },
      { id: 3, name: 'Nativity Certificate.pdf', url: '#', status: 'Pending' },
    ],
    remarks: 'Awaiting initial review.'
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
const StudentDetailsVerification = ({ student, onBack, onUpdateStudent, onApprove, onActionRequired }: { student: StudentProfile, onBack: () => void, onUpdateStudent: (updatedStudent: StudentProfile, message: string) => void, onApprove: (studentId: string) => void, onActionRequired: (studentId: string, remark: string) => void }) => {
    
    const [isEditingDetails, setIsEditingDetails] = useState(false);
    const [editedStudent, setEditedStudent] = useState<StudentProfile>(student);
    const [replaceModalState, setReplaceModalState] = useState<{isOpen: boolean; docId: number | null; remark: string; file: File | null}>({ isOpen: false, docId: null, remark: '', file: null });
    const [actionModalState, setActionModalState] = useState<{isOpen: boolean; remark: string;}>({ isOpen: false, remark: '' });

    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'remarks') {
             setEditedStudent(prev => ({...prev, remarks: value }));
        } else {
            setEditedStudent(prev => ({
                ...prev,
                personalDetails: { ...prev.personalDetails, [name]: value }
            }));
        }
    };

    const handleSaveChanges = () => {
        onUpdateStudent(editedStudent, `Details for ${editedStudent.name} have been updated.`);
        setIsEditingDetails(false);
    };

    const handleCancelEdit = () => {
        setEditedStudent(student);
        setIsEditingDetails(false);
    };

    const handleConfirmReplace = (e: React.FormEvent) => {
        e.preventDefault();
        const { docId, file, remark } = replaceModalState;
        if (!docId || !file || !remark) return;

        const updatedDocuments = editedStudent.documents.map(doc =>
            doc.id === docId ? { ...doc, name: file.name, status: 'Pending' as 'Pending' } : doc
        );
        const updatedStudentWithDoc = {...editedStudent, documents: updatedDocuments};
        setEditedStudent(updatedStudentWithDoc);
        onUpdateStudent(updatedStudentWithDoc, `Document for ${editedStudent.name} replaced.`);
        setReplaceModalState({ isOpen: false, docId: null, remark: '', file: null });
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
             {/* Replace Document Modal */}
            {replaceModalState.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                    <form onSubmit={handleConfirmReplace} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
                        <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
                            <h2 className="text-xl font-bold">Replace Document</h2>
                            <button type="button" onClick={() => setReplaceModalState({isOpen: false, docId: null, remark: '', file: null})} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-6 h-6" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label htmlFor="remark" className="block text-sm font-medium mb-1">Remark for Replacement</label>
                                <textarea id="remark" value={replaceModalState.remark} onChange={(e) => setReplaceModalState(s => ({...s, remark: e.target.value}))} required className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg" rows={3} placeholder="e.g., Document was unclear, please re-upload."></textarea>
                            </div>
                             <div>
                                <label htmlFor="new-doc" className="block text-sm font-medium mb-1">New Document</label>
                                <input id="new-doc" type="file" onChange={(e) => e.target.files && setReplaceModalState(s => ({...s, file: e.target.files![0]}))} required className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                            </div>
                        </div>
                        <div className="p-5 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                            <button type="button" onClick={() => setReplaceModalState({isOpen: false, docId: null, remark: '', file: null})} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                            <button type="submit" disabled={!replaceModalState.remark || !replaceModalState.file} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Submit Replacement</button>
                        </div>
                    </form>
                </div>
            )}

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
                    <ArrowLeft size={18} />
                    Back to Verification List
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
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Personal Details</h2>
                        {student.applicationStatus !== 'Verified' && (
                            <div>
                                {isEditingDetails ? (
                                    <div className="flex items-center gap-2">
                                        <button onClick={handleCancelEdit} className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold transition-colors">
                                            <XSquare size={16} /> Cancel
                                        </button>
                                        <button onClick={handleSaveChanges} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 font-semibold transition-colors">
                                            <Save size={16} /> Save Changes
                                        </button>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsEditingDetails(true)} className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold transition-colors">
                                        <Edit size={16} /> Edit
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                        {Object.entries(editedStudent.personalDetails).map(([key, value]) => (
                            <div key={key}>
                                <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</label>
                                <input type="text" name={key} value={value} onChange={handleDetailChange} disabled={!isEditingDetails || student.applicationStatus === 'Verified'}
                                className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none read-only:bg-gray-100 dark:read-only:bg-gray-700/50 read-only:focus:ring-transparent read-only:cursor-default" />
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Administrator Remarks</h2>
                    <textarea name="remarks" value={editedStudent.remarks} onChange={handleDetailChange}
                     disabled={!isEditingDetails || student.applicationStatus === 'Verified'}
                     className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none read-only:bg-gray-100 dark:read-only:bg-gray-700/50 read-only:focus:ring-transparent read-only:cursor-default"
                     rows={4} placeholder="Add any administrative notes here..."></textarea>
                </div>


                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Document Verification</h2>
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
                                    {student.applicationStatus !== 'Verified' && (
                                        <button onClick={() => setReplaceModalState({isOpen: true, docId: doc.id, remark: '', file: null})} className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                                            <Upload size={14} /> Replace
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

             {student.applicationStatus !== 'Verified' && (
                 <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h3 className="font-bold text-lg">Master Application Status</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Approve or reject the student's entire application based on the verification.</p>
                    </div>
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
const AdministrationVerification = () => {
    const [students, setStudents] = useState<StudentProfile[]>(initialStudentsForVerification);
    const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('underVerification');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
    const itemsPerPage = 8;
    
    const filteredStudents = useMemo(() => {
        const byStatus = students.filter(s => {
            if (activeTab === 'underVerification') return s.applicationStatus !== 'Verified';
            if (activeTab === 'verified') return s.applicationStatus === 'Verified';
            return true;
        });

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
             <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
                {toast && (<div className={`fixed top-5 right-5 z-[101] flex items-center gap-3 p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`} role="alert">{toast.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}<p>{toast.message}</p></div>)}
                <div className="max-w-7xl mx-auto">
                    <StudentDetailsVerification 
                        student={selectedStudent} 
                        onBack={() => setSelectedStudent(null)} 
                        onUpdateStudent={handleUpdateStudent}
                        onApprove={handleApproveStudent}
                        onActionRequired={handleActionRequired}
                    />
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
             {toast && (<div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`} role="alert">{toast.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}<p>{toast.message}</p></div>)}
            <div className="max-w-7xl mx-auto">
                <header className="mb-8"><h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Student Administration Verification</h1><p className="text-gray-500 dark:text-gray-400 mt-1">Review and verify student applications and documents.</p></header>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                         <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="text" placeholder="Search by name or application ID..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div className="w-full sm:w-auto flex items-center p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                           <button onClick={() => { setActiveTab('underVerification'); setCurrentPage(1); }} className={`w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'underVerification' ? 'bg-white dark:bg-gray-800 text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-200'}`}>Under Verification</button>
                           <button onClick={() => { setActiveTab('verified'); setCurrentPage(1); }} className={`w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'verified' ? 'bg-white dark:bg-gray-800 text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-200'}`}>Verified</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                    {filteredStudents.length === 0 ? (<div className="text-center py-20 text-gray-400 dark:text-gray-500"><Search className="mx-auto h-12 w-12 mb-4" /><h3 className="text-lg font-semibold">No students found</h3><p>No students match the current criteria.</p></div>) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4 whitespace-nowrap">Applicant</th>
                                        <th className="px-6 py-4 whitespace-nowrap">Course</th>
                                        <th className="px-6 py-4 whitespace-nowrap">Admin Remarks</th>
                                        <th className="px-6 py-4 whitespace-nowrap text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedStudents.map((s) => (
                                        <tr key={s.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3 whitespace-nowrap">
                                                <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-sm">{s.avatar}</div>
                                                <div>{s.name}<p className="text-xs font-mono text-gray-500 dark:text-gray-400">{s.id}</p></div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{s.course}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{s.remarks || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <button onClick={() => setSelectedStudent(s)} className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-700 font-semibold mx-auto">
                                                    <UserCheck className="w-4 h-4" /> View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                         {totalPages > 1 && (
                            <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t dark:border-gray-700 text-sm">
                                <div className="mb-2 md:mb-0">Showing <span className="font-semibold">{((currentPage - 1) * itemsPerPage) + 1}</span>-<span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredStudents.length)}</span> of <span className="font-semibold">{filteredStudents.length}</span></div>
                                <div className="flex items-center gap-1">
                                    {['First', 'Prev', 'Next', 'Last'].map(label => {
                                        const isDisabled = (label === 'First' || label === 'Prev') ? currentPage === 1 : currentPage === totalPages;
                                        const newPage = { First: 1, Prev: currentPage - 1, Next: currentPage + 1, Last: totalPages }[label] || 1;
                                        return <button key={label} onClick={() => setCurrentPage(newPage)} disabled={isDisabled} className="px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">{label}</button>;
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

export default AdministrationVerification;

