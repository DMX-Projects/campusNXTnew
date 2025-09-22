
import React, { useState } from 'react';
import { Plus, User, Calendar, MapPin, DollarSign, Moon, Sun, Menu, X, Eye, Edit, Trash2, Briefcase, Users, TrendingUp } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

// Interfaces for Applicant and JobOpening unchanged
interface Applicant {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  location: string;
  salary: string;
  appliedDate: string;
  resume?: string;
  notes?: string;
  avatar?: string;
}

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

const RecruitmentManagement = () => {
  const { isDark, toggleTheme } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showApplicantDetails, setShowApplicantDetails] = useState<string | null>(null);
  const [applicants, setApplicants] = useState<Record<string, Applicant[]>>({
    applied: [
      {
        id: '1',
        name: 'John Smith',
        position: 'Software Engineer',
        email: 'john.smith@email.com',
        phone: '+1 234 567 8900',
        location: 'New York, NY',
        salary: '₹80,000',
        appliedDate: '2024-01-15',
        notes: 'Strong technical background with React and TypeScript experience.'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        position: 'UX Designer',
        email: 'sarah.j@email.com',
        phone: '+1 234 567 8901',
        location: 'San Francisco, CA',
        salary: '₹75,000',
        appliedDate: '2024-01-14',
        notes: 'Excellent portfolio with 5 years of design experience.'
      }
    ],
    shortlisted: [
      {
        id: '3',
        name: 'Michael Chen',
        position: 'Data Scientist',
        email: 'michael.chen@email.com',
        phone: '+1 234 567 8902',
        location: 'Seattle, WA',
        salary: '₹95,000',
        appliedDate: '2024-01-12',
        notes: 'PhD in Computer Science, specializes in machine learning.'
      }
    ],
    interview: [
      {
        id: '4',
        name: 'Emily Davis',
        position: 'Product Manager',
        email: 'emily.davis@email.com',
        phone: '+1 234 567 8903',
        location: 'Austin, TX',
        salary: '₹90,000',
        appliedDate: '2024-01-10',
        notes: 'Scheduled for final round interview on Friday.'
      }
    ],
    offer: [
      {
        id: '5',
        name: 'David Wilson',
        position: 'DevOps Engineer',
        email: 'david.wilson@email.com',
        phone: '+1 234 567 8904',
        location: 'Denver, CO',
        salary: '₹85,000',
        appliedDate: '2024-01-08',
        notes: 'Offer extended, awaiting response.'
      }
    ],
    hired: [
      {
        id: '6',
        name: 'Lisa Thompson',
        position: 'Marketing Manager',
        email: 'lisa.thompson@email.com',
        phone: '+1 234 567 8905',
        location: 'Chicago, IL',
        salary: '₹70,000',
        appliedDate: '2024-01-05',
        notes: 'Offer accepted, start date confirmed.'
      }
    ]
  });

  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([
    {
      id: '1',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '₹100,000 - ₹130,000',
      description: 'We are looking for a senior software engineer to join our growing team.',
      requirements: ['5+ years experience', 'React/TypeScript', 'Node.js', 'AWS'],
      postedDate: '2024-01-01'
    }
  ]);

  const [draggedItem, setDraggedItem] = useState<{ applicant: Applicant; fromColumn: string } | null>(null);

  const columns = [
    { id: 'applied', title: 'Applied', color: 'bg-blue-500', textColor: 'text-blue-600', bgLight: 'bg-blue-50', count: applicants.applied.length },
    { id: 'shortlisted', title: 'Shortlisted', color: 'bg-yellow-500', textColor: 'text-yellow-600', bgLight: 'bg-yellow-50', count: applicants.shortlisted.length },
    { id: 'interview', title: 'Interview Scheduled', color: 'bg-purple-500', textColor: 'text-purple-600', bgLight: 'bg-purple-50', count: applicants.interview.length },
    { id: 'offer', title: 'Offer Extended', color: 'bg-orange-500', textColor: 'text-orange-600', bgLight: 'bg-orange-50', count: applicants.offer.length },
    { id: 'hired', title: 'Hired', color: 'bg-green-500', textColor: 'text-green-600', bgLight: 'bg-green-50', count: applicants.hired.length }
  ];

  const handleDragStart = (applicant: Applicant, fromColumn: string) => {
    setDraggedItem({ applicant, fromColumn });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (toColumn: string) => {
    if (!draggedItem || draggedItem.fromColumn === toColumn) return;

    const newApplicants = { ...applicants };

    newApplicants[draggedItem.fromColumn] = newApplicants[draggedItem.fromColumn].filter(
      app => app.id !== draggedItem.applicant.id
    );

    newApplicants[toColumn] = [...newApplicants[toColumn], draggedItem.applicant];

    setApplicants(newApplicants);
    setDraggedItem(null);
  };

  const addJobOpening = (job: Omit<JobOpening, 'id' | 'postedDate'>) => {
    const newJob: JobOpening = {
      ...job,
      id: Date.now().toString(),
      postedDate: new Date().toISOString().split('T')[0]
    };
    setJobOpenings([...jobOpenings, newJob]);
    setShowJobForm(false);
  };

  const moveApplicantToColumn = (applicantId: string, targetColumn: string) => {
    const newApplicants = { ...applicants };
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
      setApplicants(newApplicants);
    }
  };

  const handleScheduleInterview = (applicantId: string) => {
    moveApplicantToColumn(applicantId, 'interview');
    setShowApplicantDetails(null);
    alert('Interview scheduled! Applicant moved to Interview column.');
  };

  const handleSendOffer = (applicantId: string) => {
    moveApplicantToColumn(applicantId, 'offer');
    setShowApplicantDetails(null);
    alert('Offer sent! Applicant moved to Offer Extended column.');
  };

  const ApplicantCard = ({ applicant, column }: { applicant: Applicant; column: string }) => (
    <div
      draggable
      onDragStart={() => handleDragStart(applicant, column)}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-3 cursor-move hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-sm">
            {applicant.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{applicant.name}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{applicant.position}</p>
          </div>
        </div>
        <button
          onClick={() => setShowApplicantDetails(applicant.id)}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <Eye size={14} />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs">
          <MapPin size={12} className="text-slate-400 dark:text-slate-500" />
          <span className="text-slate-600 dark:text-slate-400">{applicant.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <DollarSign size={12} className="text-slate-400 dark:text-slate-500" />
          <span className="text-slate-600 dark:text-slate-400 font-medium">{applicant.salary}</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <Calendar size={12} className="text-slate-400 dark:text-slate-500" />
          <span className="text-slate-600 dark:text-slate-400">Applied {new Date(applicant.appliedDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );

  const JobForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      salary: '',
      description: '',
      requirements: ''
    });

    const handleSubmit = () => {
      addJobOpening({
        ...formData,
        requirements: formData.requirements.split(',').map(req => req.trim())
      });
      setFormData({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        salary: '',
        description: '',
        requirements: ''
      });
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Create Job Opening</h3>
            </div>
            <button
              onClick={() => setShowJobForm(false)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Job Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Department</label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., Engineering"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Remote"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Salary Range</label>
              <input
                type="text"
                required
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                placeholder="e.g., ₹60,000 - ₹80,000"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Brief description of the role..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Requirements (comma-separated)</label>
              <textarea
                required
                rows={2}
                value={formData.requirements}
                onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                placeholder="e.g., 3+ years experience, JavaScript, React"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Create Job Opening
              </button>
              <button
                type="button"
                onClick={() => setShowJobForm(false)}
                className="flex-1 py-3 px-6 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ApplicantDetails = ({ applicantId }: { applicantId: string }) => {
    const applicant = Object.values(applicants).flat().find(app => app.id === applicantId);
    if (!applicant) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Applicant Details</h3>
            </div>
            <button
              onClick={() => setShowApplicantDetails(null)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                {applicant.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">{applicant.name}</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium">{applicant.position}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg">{applicant.email}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg">{applicant.phone}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg">{applicant.location}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Expected Salary</label>
                <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg font-medium">{applicant.salary}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Applied Date</label>
                <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg">{new Date(applicant.appliedDate).toLocaleDateString()}</p>
              </div>

              {applicant.notes && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Notes</label>
                  <p className="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg">{applicant.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => handleScheduleInterview(applicant.id)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl"
              >
                Schedule Interview
              </button>
              <button
                onClick={() => handleSendOffer(applicant.id)}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl"
              >
                Send Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const totalApplicants = Object.values(applicants).flat().length;
  const totalHired = applicants.hired.length;
  const totalOffers = applicants.offer.length;
  const totalInterviews = applicants.interview.length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ₹{isDark ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 sticky top-0 z-40 backdrop-blur-sm bg-white/95 dark:bg-slate-800/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Recruitment Management</h1>
            </div>
          </div>

          <div className="flex items-center space-x-3  ">
            

            <button
              onClick={() => setShowJobForm(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Create Job Opening</span>
              <span className="sm:hidden">Create Job</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      

      <div className="p-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Total Applicants</p>
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
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Interviews</p>
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
                <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400" />
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

        {/* Kanban Board */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recruitment Pipeline</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Drag and drop candidates to move them through the hiring process</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {columns.map((column) => (
                <div
                  key={column.id}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(column.id)}
                  className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 min-h-[600px] border-2 border-dashed border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ₹{column.color}`} />
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{column.title}</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300">
                      {applicants[column.id]?.length || 0}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {applicants[column.id]?.map((applicant) => (
                      <ApplicantCard
                        key={applicant.id}
                        applicant={applicant}
                        column={column.id}
                      />
                    ))}
                  </div>

                  {(!applicants[column.id] || applicants[column.id].length === 0) && (
                    <div className="flex items-center justify-center h-32 text-slate-400 dark:text-slate-500">
                      <div className="text-center">
                        <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No candidates</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Openings Section */}
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Job Openings</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">Currently available positions</p>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold">
                {jobOpenings.length} Active
              </span>
            </div>
          </div>
          <div className="p-6">
            {jobOpenings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobOpenings.map((job) => (
                  <div key={job.id} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{job.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{job.department}</p>
                      </div>
                      <span className="px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">
                        {job.type}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin size={14} className="text-slate-400 dark:text-slate-500" />
                        <span className="text-slate-600 dark:text-slate-400">{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <DollarSign size={14} className="text-slate-400 dark:text-slate-500" />
                        <span className="text-slate-600 dark:text-slate-400 font-medium">{job.salary}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar size={14} className="text-slate-400 dark:text-slate-500" />
                        <span className="text-slate-600 dark:text-slate-400">Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {job.requirements.slice(0, 2).map((req, index) => (
                          <span key={index} className="px-2 py-1 rounded-md bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs">
                            {req}
                          </span>
                        ))}
                        {job.requirements.length > 2 && (
                          <span className="px-2 py-1 rounded-md bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs">
                            +{job.requirements.length - 2}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        <button className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 transition-colors">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 transition-colors">
                          <Edit size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Active Job Openings</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Create your first job opening to start recruiting candidates.</p>
                <button
                  onClick={() => setShowJobForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Create Job Opening
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showJobForm && <JobForm />}
      {showApplicantDetails && <ApplicantDetails applicantId={showApplicantDetails} />}
    </div>
  );
};

export default RecruitmentManagement;

