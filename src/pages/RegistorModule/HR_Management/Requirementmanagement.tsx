
import React, { useState } from 'react';
import { Plus, User, Calendar, MapPin, DollarSign, Menu, X, Eye, Edit, Trash2, GraduationCap, Users, TrendingUp, BookOpen, UserCheck, Award, Building, FileText, MessageSquare, CheckCircle, Clock, AlertCircle, UserPlus as UserPlusIcon } from 'lucide-react';

// Interfaces for Student Applicant and Position
interface StudentApplicant {
  id: string;
  name: string;
  course: string;
  email: string;
  phone: string;
  location: string;
  gpa: string;
  appliedDate: string;
  resume?: string;
  notes?: string;
  avatar?: string;
  previousEducation: string;
  extracurriculars?: string;
  interviewDate?: string;
  interviewFeedback?: string;
  offerDetails?: string;
  hiringDate?: string;
}

interface Position {
  id: string;
  title: string;
  department: string;
  type: 'Faculty' | 'Staff' | 'Research Assistant' | 'Teaching Assistant' | 'Student Admission';
  location: string;
  salary?: string;
  description: string;
  requirements: string[];
  postedDate: string;
  deadline: string;
}

const CollegeRecruitmentManagement = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPositionForm, setShowPositionForm] = useState(false);
  const [showApplicantDetails, setShowApplicantDetails] = useState<{id: string; status: string} | null>(null);
  const [activeTab, setActiveTab] = useState<'admissions' | 'faculty' | 'staff'>('admissions');
  const [viewPositionId, setViewPositionId] = useState<string | null>(null);
  const [editPositionId, setEditPositionId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Position | null>(null);
  
  const handleViewPosition = (id: string) => {
    setViewPositionId(id);
  };
  
  const handleEditPosition = (id: string) => {
    const pos = positions.find((p) => p.id === id) || null;
    setEditForm(pos);
    setEditPositionId(id);
  };
  
  const closeEdit = () => {
    setEditForm(null);
    setEditPositionId(null);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!editForm) return;
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };
  
  const handleRequirementsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (!editForm) return;
    const requirements = e.target.value
      .split(/[\n,]+/)
      .map((r) => r.trim())
      .filter(Boolean);
    setEditForm({ ...editForm, requirements });
  };
  
  const submitEditForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    setPositions((prev) =>
      prev.map((pos) => (pos.id === editForm.id ? editForm : pos))
    );
    closeEdit();
  };
  
  // Student Admissions Pipeline with enhanced data
  const [studentApplicants, setStudentApplicants] = useState<Record<string, StudentApplicant[]>>({
    applied: [
      {
        id: '1',
        name: 'Arjun Sharma',
        course: 'Computer Science Engineering',
        email: 'arjun.sharma@email.com',
        phone: '+91 98765 43210',
        location: 'Bangalore, Karnataka',
        gpa: '9.2/10',
        appliedDate: '2024-03-15',
        previousEducation: 'XII - Science (92%)',
        extracurriculars: 'Coding Club President, National Science Olympiad',
        notes: 'Strong academic background with excellent programming skills.',
        resume: 'Resume submitted'
      },
      {
        id: '2',
        name: 'Priya Patel',
        course: 'Electronics and Communication',
        email: 'priya.patel@email.com',
        phone: '+91 98765 43211',
        location: 'Mumbai, Maharashtra',
        gpa: '8.9/10',
        appliedDate: '2024-03-14',
        previousEducation: 'XII - Science (89%)',
        extracurriculars: 'Robotics Club, State Level Science Fair Winner',
        notes: 'Excellent practical knowledge in electronics.',
        resume: 'Resume submitted'
      }
    ],
    shortlisted: [
      {
        id: '3',
        name: 'Rahul Kumar',
        course: 'Mechanical Engineering',
        email: 'rahul.kumar@email.com',
        phone: '+91 98765 43212',
        location: 'Delhi, NCR',
        gpa: '9.0/10',
        appliedDate: '2024-03-12',
        previousEducation: 'XII - Science (90%)',
        extracurriculars: 'CAD Design Competition Winner',
        notes: 'Strong analytical skills and design thinking. Shortlisted based on academic excellence.',
        resume: 'Resume reviewed and approved'
      }
    ],
    interview: [
      {
        id: '4',
        name: 'Sneha Reddy',
        course: 'Information Technology',
        email: 'sneha.reddy@email.com',
        phone: '+91 98765 43213',
        location: 'Hyderabad, Telangana',
        gpa: '9.3/10',
        appliedDate: '2024-03-10',
        previousEducation: 'XII - Science (94%)',
        extracurriculars: 'Hackathon Winner, Tech Blog Writer',
        notes: 'Scheduled for final admission interview.',
        interviewDate: '2024-03-25',
        interviewFeedback: 'Excellent technical knowledge and communication skills.',
        resume: 'Resume reviewed'
      }
    ],
    offer: [
      {
        id: '5',
        name: 'Vikram Singh',
        course: 'Civil Engineering',
        email: 'vikram.singh@email.com',
        phone: '+91 98765 43214',
        location: 'Pune, Maharashtra',
        gpa: '8.8/10',
        appliedDate: '2024-03-08',
        previousEducation: 'XII - Science (87%)',
        extracurriculars: 'Environmental Club, Volunteer Work',
        notes: 'Admission offer extended, awaiting response.',
        interviewDate: '2024-03-20',
        interviewFeedback: 'Good performance in interview. Showed interest in environmental engineering.',
        offerDetails: 'Full admission with scholarship eligibility. Response deadline: April 1, 2024.',
        resume: 'Complete profile reviewed'
      }
    ],
    hired: [
      {
        id: '6',
        name: 'Ananya Iyer',
        course: 'Biotechnology',
        email: 'ananya.iyer@email.com',
        phone: '+91 98765 43215',
        location: 'Chennai, Tamil Nadu',
        gpa: '9.4/10',
        appliedDate: '2024-03-05',
        previousEducation: 'XII - Science (95%)',
        extracurriculars: 'Research Internship, Science Journal Publications',
        notes: 'Admission confirmed, enrollment completed.',
        interviewDate: '2024-03-18',
        interviewFeedback: 'Outstanding academic record and research potential.',
        offerDetails: 'Full admission with merit scholarship.',
        hiringDate: '2024-03-22',
        resume: 'Complete documentation submitted'
      }
    ]
  });

  const [positions, setPositions] = useState<Position[]>([
    {
      id: '1',
      title: 'Assistant Professor - Computer Science',
      department: 'Computer Science & Engineering',
      type: 'Faculty',
      location: 'Main Campus',
      salary: '₹60,000 - ₹80,000/month',
      description: 'Seeking an experienced faculty member to teach undergraduate courses in Computer Science.',
      requirements: ['PhD in Computer Science', '3+ years teaching experience', 'Research publications', 'Programming expertise'],
      postedDate: '2024-03-01',
      deadline: '2024-04-15'
    },
    {
      id: '2',
      title: 'Research Assistant - AI/ML Lab',
      department: 'Computer Science & Engineering',
      type: 'Research Assistant',
      location: 'Research Lab',
      salary: '₹25,000/month',
      description: 'Support ongoing AI/ML research projects and assist faculty with experiments.',
      requirements: ['Masters in CS/IT', 'Python/R proficiency', 'ML algorithms knowledge', 'Research experience'],
      postedDate: '2024-03-05',
      deadline: '2024-04-01'
    }
  ]);

  const toggleTheme = () => setIsDark(!isDark);

  // Updated column names to match requirements exactly
  const admissionColumns = [
    { id: 'applied', title: 'Applied', color: 'bg-blue-500', textColor: 'text-blue-600', bgLight: 'bg-blue-50', count: studentApplicants.applied.length },
    { id: 'shortlisted', title: 'Shortlisted', color: 'bg-yellow-500', textColor: 'text-yellow-600', bgLight: 'bg-yellow-50', count: studentApplicants.shortlisted.length },
    { id: 'interview', title: 'Interview Scheduled', color: 'bg-purple-500', textColor: 'text-purple-600', bgLight: 'bg-purple-50', count: studentApplicants.interview.length },
    { id: 'offer', title: 'Offer Extended', color: 'bg-orange-500', textColor: 'text-orange-600', bgLight: 'bg-orange-50', count: studentApplicants.offer.length },
    { id: 'hired', title: 'Hired', color: 'bg-green-500', textColor: 'text-green-600', bgLight: 'bg-green-50', count: studentApplicants.hired.length }
  ];

  // WORKING Drag and Drop Implementation [web:77][web:71]
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, applicantId: string) => {
    console.log('Drag start:', applicantId);
    e.dataTransfer.setData('text/plain', applicantId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumn: string) => {
    e.preventDefault();
    const applicantId = e.dataTransfer.getData('text/plain');
    
    console.log('Drop:', applicantId, 'in', targetColumn);
    
    if (!applicantId) return;

    // Find the applicant and source column
    let applicantToMove: StudentApplicant | null = null;
    let sourceColumn = '';
    
    for (const [columnKey, applicants] of Object.entries(studentApplicants)) {
      const found = applicants.find(app => app.id === applicantId);
      if (found) {
        applicantToMove = found;
        sourceColumn = columnKey;
        break;
      }
    }

    if (!applicantToMove || sourceColumn === targetColumn) return;

    // Update state
    setStudentApplicants(prev => {
      const newState = { ...prev };
      
      // Remove from source
      newState[sourceColumn] = newState[sourceColumn].filter(app => app.id !== applicantId);
      
      // Add to target
      newState[targetColumn] = [...newState[targetColumn], applicantToMove!];
      
      return newState;
    });
  };

  const addPosition = (position: Omit<Position, 'id' | 'postedDate'>) => {
    const newPosition: Position = {
      ...position,
      id: Date.now().toString(),
      postedDate: new Date().toISOString().split('T')[0]
    };
    setPositions([...positions, newPosition]);
    setShowPositionForm(false);
  };
  
  const filteredPositions = positions.filter((p) =>
    activeTab === "faculty" ? p.type === "Faculty" : p.type !== "Faculty"
  );

  const moveApplicantToColumn = (applicantId: string, targetColumn: string) => {
    const newApplicants = { ...studentApplicants };
    let applicantToMove = null;
    let sourceColumn = '';

    for (const [column, apps] of Object.entries(newApplicants)) {
      const applicantIndex = apps.findIndex(app => app.id === applicantId);
      if (applicantIndex !== -1) {
        applicantToMove = apps[applicantIndex];
        sourceColumn = column;
        newApplicants[column] = apps.filter(app => app.id !== applicantId);
        break;
      }
    }

    if (applicantToMove && sourceColumn !== targetColumn) {
      newApplicants[targetColumn] = [...newApplicants[targetColumn], applicantToMove];
      setStudentApplicants(newApplicants);
    }
  };

  const handleScheduleInterview = (applicantId: string) => {
    moveApplicantToColumn(applicantId, 'interview');
    setShowApplicantDetails(null);
    alert('Interview scheduled! Applicant moved to Interview Scheduled column.');
  };

  const handleOfferExtended = (applicantId: string) => {
    moveApplicantToColumn(applicantId, 'offer');
    setShowApplicantDetails(null);
    alert('Offer extended! Applicant moved to Offer Extended column.');
  };

  const handleHired = (applicantId: string) => {
    moveApplicantToColumn(applicantId, 'hired');
    setShowApplicantDetails(null);
    alert('Applicant hired! Moved to Hired column.');
  };

  // Working ApplicantCard [web:77]
  const ApplicantCard = ({ applicant, column }: { applicant: StudentApplicant; column: string }) => (
    <div
      draggable={true}
      onDragStart={(e) => handleDragStart(e, applicant.id)}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-3 cursor-move hover:shadow-lg transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600 transform hover:-translate-y-1"
      style={{ userSelect: 'none' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
            {applicant.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm truncate">{applicant.name}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium truncate">{applicant.course}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowApplicantDetails({id: applicant.id, status: column});
          }}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors flex-shrink-0"
        >
          <Eye size={14} />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs">
          <MapPin size={12} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
          <span className="text-slate-600 dark:text-slate-400 truncate">{applicant.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <Award size={12} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
          <span className="text-slate-600 dark:text-slate-400 font-medium">GPA: {applicant.gpa}</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <Calendar size={12} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
          <span className="text-slate-600 dark:text-slate-400 truncate">Applied {new Date(applicant.appliedDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );

  const PositionForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      department: '',
      type: 'Faculty' as Position['type'],
      location: '',
      salary: '',
      description: '',
      requirements: '',
      deadline: ''
    });

    const handleSubmit = () => {
      addPosition({
        ...formData,
        requirements: formData.requirements.split(',').map(req => req.trim())
      });
      setFormData({
        title: '',
        department: '',
        type: 'Faculty',
        location: '',
        salary: '',
        description: '',
        requirements: '',
        deadline: ''
      });
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[95vh] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Create Job Opening</h3>
            </div>
            <button
              onClick={() => setShowPositionForm(false)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 max-h-[calc(95vh-140px)] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Position Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                  placeholder="e.g., Assistant Professor - Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Department</label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                  placeholder="e.g., Computer Science & Engineering"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as Position['type']})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                >
                  <option value="Faculty">Faculty</option>
                  <option value="Staff">Staff</option>
                  <option value="Research Assistant">Research Assistant</option>
                  <option value="Teaching Assistant">Teaching Assistant</option>
                  <option value="Student Admission">Student Admission</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                  placeholder="Main Campus"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Salary Range (Optional)</label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  placeholder="e.g., ₹60,000 - ₹80,000/month"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Application Deadline</label>
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-sm"
                  placeholder="Brief description of the position..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Requirements (comma-separated)</label>
                <textarea
                  required
                  rows={2}
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  placeholder="e.g., PhD required, 3+ years experience, Research publications"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3  border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
            >
              Create Job Opening
            </button>
            <button
              type="button"
              onClick={() => setShowPositionForm(false)}
              className="flex-1 py-3 px-6 rounded-2xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Status-specific Applicant Details Modal
  const ApplicantDetails = ({ applicantData }: { applicantData: {id: string; status: string} }) => {
    const applicant = Object.values(studentApplicants).flat().find(app => app.id === applicantData.id);
    if (!applicant) return null;

    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'applied': return <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
        case 'shortlisted': return <CheckCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
        case 'interview': return <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
        case 'offer': return <MessageSquare className="h-5 w-5 text-orange-600 dark:text-orange-400" />;
        case 'hired': return <UserPlusIcon className="h-5 w-5 text-green-600 dark:text-green-400" />;
        default: return <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
      }
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'applied': return 'bg-blue-100 dark:bg-blue-900/30';
        case 'shortlisted': return 'bg-yellow-100 dark:bg-yellow-900/30';
        case 'interview': return 'bg-purple-100 dark:bg-purple-900/30';
        case 'offer': return 'bg-orange-100 dark:bg-orange-900/30';
        case 'hired': return 'bg-green-100 dark:bg-green-900/30';
        default: return 'bg-gray-100 dark:bg-gray-900/30';
      }
    };

    const getStatusTitle = (status: string) => {
      switch (status) {
        case 'applied': return 'Application Details';
        case 'shortlisted': return 'Shortlisted Candidate';
        case 'interview': return 'Interview Details';
        case 'offer': return 'Offer Details';
        case 'hired': return 'Hired Candidate';
        default: return 'Applicant Profile';
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[95vh] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${getStatusColor(applicantData.status)}`}>
                {getStatusIcon(applicantData.status)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{getStatusTitle(applicantData.status)}</h3>
            </div>
            <button
              onClick={() => setShowApplicantDetails(null)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 max-h-[calc(95vh-200px)] overflow-y-auto">
            {/* Profile Header */}
            <div className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {applicant.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-lg text-slate-900 dark:text-white truncate">{applicant.name}</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium text-sm truncate">{applicant.course}</p>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(applicantData.status)} ${applicantData.status === 'applied' ? 'text-blue-800 dark:text-blue-200' : applicantData.status === 'shortlisted' ? 'text-yellow-800 dark:text-yellow-200' : applicantData.status === 'interview' ? 'text-purple-800 dark:text-purple-200' : applicantData.status === 'offer' ? 'text-orange-800 dark:text-orange-200' : 'text-green-800 dark:text-green-200'}`}>
                  {applicantData.status.charAt(0).toUpperCase() + applicantData.status.slice(1)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Information */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg text-sm break-all mb-3">{applicant.email}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg text-sm mb-3">{applicant.phone}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg text-sm mb-3">{applicant.location}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">GPA</label>
                <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg font-medium text-sm mb-3">{applicant.gpa}</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Previous Education</label>
                <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg text-sm mb-3">{applicant.previousEducation}</p>
              </div>

              {applicant.extracurriculars && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Extracurricular Activities</label>
                  <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg text-sm mb-3">{applicant.extracurriculars}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Applied Date</label>
                <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg text-sm mb-3">{new Date(applicant.appliedDate).toLocaleDateString()}</p>
              </div>

              {applicant.resume && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Resume Status</label>
                  <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg text-sm mb-3">{applicant.resume}</p>
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Notes</label>
                <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg text-sm mb-3">{applicant.notes}</p>
              </div>
            </div>
          </div>

          {/* Action buttons based on status */}
          <div className="flex gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
            {applicantData.status === 'applied' && (
              <>
                <button
                  onClick={() => {
                    moveApplicantToColumn(applicant.id, 'shortlisted');
                    setShowApplicantDetails(null);
                  }}
                  className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-3 px-4 rounded-xl hover:from-yellow-700 hover:to-yellow-800 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl"
                >
                  Shortlist Candidate
                </button>
                <button
                  onClick={() => setShowApplicantDetails(null)}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium text-sm"
                >
                  Close
                </button>
              </>
            )}

            {applicantData.status === 'shortlisted' && (
              <>
                <button
                  onClick={() => handleScheduleInterview(applicant.id)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl"
                >
                  Schedule Interview
                </button>
                <button
                  onClick={() => setShowApplicantDetails(null)}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium text-sm"
                >
                  Close
                </button>
              </>
            )}

            {applicantData.status === 'interview' && (
              <>
                <button
                  onClick={() => handleOfferExtended(applicant.id)}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 px-4 rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl"
                >
                  Extend Offer
                </button>
                <button
                  onClick={() => setShowApplicantDetails(null)}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium text-sm"
                >
                  Close
                </button>
              </>
            )}

            {applicantData.status === 'offer' && (
              <>
                <button
                  onClick={() => handleHired(applicant.id)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl"
                >
                  Mark as Hired
                </button>
                <button
                  onClick={() => setShowApplicantDetails(null)}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium text-sm"
                >
                  Close
                </button>
              </>
            )}

            {applicantData.status === 'hired' && (
              <button
                onClick={() => setShowApplicantDetails(null)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl"
              >
                Close Profile
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const totalApplicants = Object.values(studentApplicants).flat().length;
  const totalHired = studentApplicants.hired.length;
  const totalOffers = studentApplicants.offer.length;
  const totalInterviews = studentApplicants.interview.length;

  const closeView = () => setViewPositionId(null);

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 ${isDark ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 sticky top-0 z-40 backdrop-blur-sm bg-white/95 dark:bg-slate-800/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hiring Pipeline Management</h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowPositionForm(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Create Job Opening</span>
              <span className="sm:hidden">Create</span>
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <div className="flex space-x-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl w-full overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('admissions')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === 'admissions'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <GraduationCap size={18} />
                <span>Visual Hiring Pipeline</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('faculty')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === 'faculty'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <UserCheck size={18} />
                <span>Faculty Positions</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('staff')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === 'staff'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Building size={18} />
                <span>Staff Positions</span>
              </div>
            </button>
          </div>
        </div>

        {/* Main Kanban Board - Hiring Pipeline */}
        {activeTab === 'admissions' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Total Applications</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalApplicants}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Interviews Scheduled</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalInterviews}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                    <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Offers Extended</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalOffers}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                    <BookOpen className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Successfully Hired</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalHired}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                    <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* WORKING Kanban Board [web:77][web:71] */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Visual Hiring Pipeline</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">Drag and drop applicants between stages to manage the entire talent pipeline</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {admissionColumns.map((column) => (
                    <div
                      key={column.id}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, column.id)}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 min-h-[600px] border-2 border-dashed border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${column.color}`} />
                          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{column.title}</h3>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300">
                          {studentApplicants[column.id]?.length || 0}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {studentApplicants[column.id]?.map((applicant) => (
                          <ApplicantCard
                            key={applicant.id}
                            applicant={applicant}
                            column={column.id}
                          />
                        ))}
                      </div>

                      {(!studentApplicants[column.id] || studentApplicants[column.id].length === 0) && (
                        <div className="flex items-center justify-center h-32 text-slate-400 dark:text-slate-500">
                          <div className="text-center">
                            <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Drop applicants here</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Job Positions Management */}
        {(activeTab === "faculty" || activeTab === "staff") && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {activeTab === "faculty" ? "Faculty Positions" : "Staff Positions"}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    {activeTab === "faculty"
                      ? "Manage faculty recruitment and hiring"
                      : "Manage staff recruitment and hiring"}
                  </p>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold">
                  {filteredPositions.length} Active
                </span>
              </div>
            </div>

            <div className="p-6">
              {filteredPositions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPositions.map((position) => (
                    <div
                      key={position.id}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                            {position.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {position.department}
                          </p>
                        </div>
                        <span className="px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">
                          {position.type}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin size={14} className="text-slate-400 dark:text-slate-500" />
                          <span className="text-slate-600 dark:text-slate-400">{position.location}</span>
                        </div>
                        {position.salary && (
                          <div className="flex items-center space-x-2 text-sm">
                            <DollarSign size={14} className="text-slate-400 dark:text-slate-500" />
                            <span className="text-slate-600 dark:text-slate-400 font-medium">{position.salary}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar size={14} className="text-slate-400 dark:text-slate-500" />
                          <span className="text-slate-600 dark:text-slate-400">
                            Deadline: {new Date(position.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          {position.requirements.slice(0, 2).map((req, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 rounded-md bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs"
                            >
                              {req}
                            </span>
                          ))}
                          {position.requirements.length > 2 && (
                            <span className="px-2 py-1 rounded-md bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs">
                              +{position.requirements.length - 2}
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleViewPosition(position.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 transition-colors"
                            aria-label="View Position Details"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => handleEditPosition(position.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 transition-colors"
                            aria-label="Edit Position"
                          >
                            <Edit size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <GraduationCap className="h-12 w-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    No {activeTab === "faculty" ? "Faculty" : "Staff"} Positions
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Create your first {activeTab === "faculty" ? "faculty" : "staff"} position to start recruiting.
                  </p>
                  <button
                    onClick={() => setShowPositionForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Create Job Opening
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Position Details Modal */}
        {viewPositionId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-3xl max-h-[95vh] overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Position Details</h2>
                <button
                  onClick={closeView}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
                  aria-label="Close Details"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 max-h-[calc(95vh-140px)] overflow-y-auto">
                {(() => {
                  const position = positions.find((p) => p.id === viewPositionId);
                  if (!position) return null;
                  return (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                          {position.title}
                        </h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">{position.department}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                          <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg">{position.location}</p>
                        </div>
                        
                        {position.salary && (
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Salary</label>
                            <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg">{position.salary}</p>
                          </div>
                        )}
                        
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Application Deadline</label>
                          <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg">{new Date(position.deadline).toLocaleDateString()}</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Position Type</label>
                          <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg">{position.type}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Requirements</label>
                        <div className="bg-slate-50 dark:bg-slate-700/50 px-4 py-3 rounded-lg">
                          <ul className="list-disc list-inside space-y-1 text-slate-900 dark:text-slate-100">
                            {position.requirements.map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description</label>
                        <div className="bg-slate-50 dark:bg-slate-700/50 px-4 py-3 rounded-lg">
                          <p className="whitespace-pre-wrap text-slate-900 dark:text-slate-100">
                            {position.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Edit Position Modal */}
        {editForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
            <form
              onSubmit={submitEditForm}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[95vh] overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Edit Position</h2>
                <button
                  type="button"
                  onClick={closeEdit}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
                  aria-label="Close Edit Form"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 max-h-[calc(95vh-200px)] overflow-y-auto space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Position Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      placeholder="Position Title"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Department</label>
                    <input
                      type="text"
                      name="department"
                      value={editForm.department}
                      onChange={handleEditChange}
                      placeholder="Department"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Type</label>
                    <select
                      name="type"
                      value={editForm.type}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    >
                      <option value="Faculty">Faculty</option>
                      <option value="Staff">Staff</option>
                      <option value="Research Assistant">Research Assistant</option>
                      <option value="Teaching Assistant">Teaching Assistant</option>
                      <option value="Student Admission">Student Admission</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={editForm.location}
                      onChange={handleEditChange}
                      placeholder="Location"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Salary (Optional)</label>
                    <input
                      type="text"
                      name="salary"
                      value={editForm.salary || ""}
                      onChange={handleEditChange}
                      placeholder="Salary (optional)"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Deadline</label>
                    <input
                      type="date"
                      name="deadline"
                      value={editForm.deadline ? new Date(editForm.deadline).toISOString().substring(0, 10) : ""}
                      onChange={handleEditChange}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Requirements (Enter each on new line or comma separated)</label>
                    <textarea
                      name="requirements"
                      rows={3}
                      value={editForm.requirements.join("\n")}
                      onChange={handleRequirementsChange}
                      placeholder="Requirements (Enter each on new line or comma separated)"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description</label>
                    <textarea
                      name="description"
                      rows={4}
                      value={editForm.description}
                      onChange={handleEditChange}
                      placeholder="Description"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeEdit}
                  className="flex-1 py-3 px-6 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Modals */}
      {showPositionForm && <PositionForm />}
      {showApplicantDetails && <ApplicantDetails applicantData={showApplicantDetails} />}
    </div>
  );
};

export default CollegeRecruitmentManagement;