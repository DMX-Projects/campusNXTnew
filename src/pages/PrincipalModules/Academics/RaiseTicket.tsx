import React, { useState, useCallback, useEffect, ElementType } from 'react';
import { 
    AlertCircle, Send, X, CheckCircle, Clock, AlertTriangle, Zap, Tag, User, 
    Mail, Phone, FileText, Building, ChevronDown, Shield, Activity, TrendingUp, 
    BarChart3, Star, Award, BookOpen, MessageSquare, Settings, Info, Target, 
    Briefcase, Globe, Upload, Paperclip, Calendar, RefreshCw, Search, Filter, 
    Download, Eye, Edit, Trash2, Archive, History, Bell, HelpCircle, Lightbulb, 
    Camera, Link, Plus, ChevronUp 
} from 'lucide-react';


// --- TYPES ---
type TicketPriority = 'low' | 'medium' | 'high' | 'critical';
type TicketCategory = 'it_technical' | 'it_network' | 'it_account' | 'academic_courses' | 'admissions_records' | 'financials_billing' | 'facilities_maintenance' | 'library_services' | 'hr_faculty_support' | 'website_portal' | 'other';
type TicketStatus = 'draft' | 'submitted' | 'in-progress' | 'resolved' | 'closed';

interface TicketData {
  id?: string;
  title: string;
  category: TicketCategory;
  priority: TicketPriority;
  description: string;
  department: string;
  contactEmail: string;
  contactPhone: string;
  attachments?: File[];
  tags?: string[];
  expectedResolution?: string;
  businessImpact?: string;
  stepsToReproduce?: string;
  environment?: string;
  affectedUsers?: number;
  relatedTickets?: string;
  status?: TicketStatus;
  submittedAt?: string;
  estimatedResolution?: string;
}

interface RaiseTicketProps {
  userName: string;
  userEmail: string;
  userDepartment?: string;
  onSubmit: (ticket: TicketData) => void;
  onClose?: () => void;
}

// --- MAIN COMPONENT ---
const RaiseTicketComponent: React.FC<RaiseTicketProps> = ({
  userName,
  userEmail,
  userDepartment = '',
  onSubmit,
  onClose
}) => {
  const [formData, setFormData] = useState<TicketData>({
    title: '',
    category: 'it_technical',
    priority: 'medium',
    description: '',
    department: userDepartment,
    contactEmail: userEmail,
    contactPhone: '',
    attachments: [],
    tags: [],
    expectedResolution: '',
    businessImpact: '',
    stepsToReproduce: '',
    environment: '',
    affectedUsers: 1,
    relatedTickets: '',
    status: 'draft'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TicketData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [ticketId, setTicketId] = useState<string>('');
  const [savedDrafts, setSavedDrafts] = useState<TicketData[]>([]);

  const categories: { value: TicketCategory; label: string; icon: ElementType }[] = [
    { value: 'it_technical', label: 'IT: Technical Support', icon: Settings },
    { value: 'it_network', label: 'IT: Network & Connectivity', icon: Globe },
    { value: 'it_account', label: 'IT: Account & Login', icon: User },
    { value: 'academic_courses', label: 'Academic & Courses', icon: BookOpen },
    { value: 'admissions_records', label: 'Admissions & Records', icon: FileText },
    { value: 'financials_billing', label: 'Financials: Billing & Aid', icon: BarChart3 },
    { value: 'facilities_maintenance', label: 'Campus Facilities & Maintenance', icon: Building },
    { value: 'library_services', label: 'Library Services', icon: History },
    { value: 'hr_faculty_support', label: 'HR & Faculty Support', icon: Briefcase },
    { value: 'website_portal', label: 'Website & Portal Feedback', icon: MessageSquare },
    { value: 'other', label: 'Other', icon: Info }
  ];

  const priorities: { value: TicketPriority; label: string; color: string; icon: ElementType; sla: string; }[] = [
    { value: 'low', label: 'Low', color: 'text-green-600 dark:text-green-400', icon: CheckCircle, sla: '5-7 business days' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600 dark:text-yellow-400', icon: Clock, sla: '2-3 business days' },
    { value: 'high', label: 'High', color: 'text-orange-600 dark:text-orange-400', icon: AlertTriangle, sla: '4-8 hours' },
    { value: 'critical', label: 'Critical', color: 'text-red-600 dark:text-red-400', icon: Zap, sla: '1-2 hours' }
  ];

  const departments = [ 'Computer Science', 'Electronics', 'Mechanical', 'Administration', 'Finance', 'IT Services' ];

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof TicketData, string>> = {};
    if (!formData.title.trim() || formData.title.length < 5) newErrors.title = 'Title must be at least 5 characters.';
    if (!formData.description.trim() || formData.description.length < 20) newErrors.description = 'Description must be at least 20 characters.';
    if (!formData.department) newErrors.department = 'Department is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) newErrors.contactEmail = 'Invalid email format.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newTicketId = `TK-${Date.now().toString().slice(-6)}`;
    const ticketWithId = { ...formData, id: newTicketId, status: 'submitted' as TicketStatus, submittedAt: new Date().toISOString() };
    setTicketId(newTicketId);
    onSubmit(ticketWithId);
    setIsSuccess(true);
    setIsSubmitting(false);
  }, [formData, onSubmit, validateForm]);

  const handleInputChange = useCallback((field: keyof TicketData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  }, [errors]);

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).slice(0, 5 - (formData.attachments?.length || 0));
    handleInputChange('attachments', [...(formData.attachments || []), ...newFiles]);
  }, [formData.attachments, handleInputChange]);

  const removeFile = useCallback((index: number) => {
    handleInputChange('attachments', (formData.attachments || []).filter((_, i) => i !== index));
  }, [formData.attachments, handleInputChange]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);
  
  const resetForm = useCallback(() => {
    setFormData({
      title: '', category: 'technical', priority: 'medium', description: '',
      department: userDepartment, contactEmail: userEmail, contactPhone: '',
      attachments: [], tags: [], expectedResolution: '', businessImpact: '',
      stepsToReproduce: '', environment: '', affectedUsers: 1, relatedTickets: '', status: 'draft'
    });
    setErrors({});
    setIsSuccess(false);
  }, [userEmail, userDepartment]);

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ticket Submitted Successfully!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Your ticket ID is <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">#{ticketId}</span>. You will receive updates via email.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={resetForm} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"><Plus size={18}/> Create Another Ticket</button>
            {onClose && <button onClick={onClose} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"><X size={18}/> Close</button>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans">
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Raise a Support Ticket</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Get help for any technical or administrative issues.</p>
          </div>
          {onClose && <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X/></button>}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl border dark:border-gray-700/50 shadow-sm">
              <fieldset>
                <legend className="text-xl font-semibold mb-6 flex items-center gap-3"><FileText/> Ticket Details</legend>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold flex items-center gap-2 mb-2">Title <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.title} onChange={e => handleInputChange('title', e.target.value)} placeholder="e.g., Unable to access course materials" className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 ${errors.title ? 'border-red-500' : 'dark:border-gray-600'}`}/>
                    {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold flex items-center gap-2 mb-2">Category <span className="text-red-500">*</span></label>
                      <select value={formData.category} onChange={e => handleInputChange('category', e.target.value as TicketCategory)} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"><option disabled>Select a category</option>{categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}</select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold flex items-center gap-2 mb-2">Priority <span className="text-red-500">*</span></label>
                      <select value={formData.priority} onChange={e => handleInputChange('priority', e.target.value as TicketPriority)} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">{priorities.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}</select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold flex items-center gap-2 mb-2">Description <span className="text-red-500">*</span></label>
                    <textarea value={formData.description} onChange={e => handleInputChange('description', e.target.value)} rows={6} placeholder="Provide a detailed description of the issue..." className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 ${errors.description ? 'border-red-500' : 'dark:border-gray-600'}`}/>
                    {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl border dark:border-gray-700/50 shadow-sm">
              <fieldset>
                <legend className="text-xl font-semibold mb-6 flex items-center gap-3"><Paperclip/> Attachments</legend>
                <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={() => document.getElementById('file-input')?.click()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}>
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2"/>
                    <p className="font-semibold">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">Max 5 files, 10MB each</p>
                    <input id="file-input" type="file" multiple className="hidden" onChange={(e) => handleFileUpload(e.target.files)}/>
                </div>
                {(formData.attachments?.length || 0) > 0 && 
                  <div className="mt-4 space-y-2">
                    {formData.attachments?.map((file, i) => 
                      <div key={i} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm truncate">{file.name}</p>
                        <button onClick={() => removeFile(i)} className="p-1 text-red-500 hover:text-red-700"><Trash2 size={16}/></button>
                      </div>
                    )}
                  </div>
                }
              </fieldset>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl border dark:border-gray-700/50 shadow-sm">
              <fieldset>
                <legend className="text-xl font-semibold mb-6 flex items-center gap-3"><User/> Your Information</legend>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold">Name</label>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">{userName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Email <span className="text-red-500">*</span></label>
                    <input type="email" value={formData.contactEmail} onChange={e => handleInputChange('contactEmail', e.target.value)} className={`w-full mt-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 ${errors.contactEmail ? 'border-red-500' : 'dark:border-gray-600'}`}/>
                    {errors.contactEmail && <p className="text-sm text-red-500 mt-1">{errors.contactEmail}</p>}
                  </div>
                   <div>
                    <label className="text-sm font-semibold">Department <span className="text-red-500">*</span></label>
                    <select value={formData.department} onChange={e => handleInputChange('department', e.target.value)} className={`w-full mt-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 ${errors.department ? 'border-red-500' : 'dark:border-gray-600'}`}><option value="">Select Department</option>{departments.map(d => <option key={d}>{d}</option>)}</select>
                    {errors.department && <p className="text-sm text-red-500 mt-1">{errors.department}</p>}
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl border dark:border-gray-700/50 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Lightbulb/> Support Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0"/><span>Be specific in your title and description.</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0"/><span>Attach screenshots of the error if possible.</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0"/><span>Select the correct priority to ensure a timely response.</span></li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={handleSubmit} disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                {isSubmitting ? <><RefreshCw className="animate-spin" size={20}/> Submitting...</> : <><Send size={18}/> Submit Ticket</>}
              </button>
               <button onClick={resetForm} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                <RefreshCw size={16}/> Reset Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example App wrapper to demonstrate usage
const App: React.FC = () => {
  const handleTicketSubmit = (ticket: TicketData) => {
    console.log('Ticket submitted:', ticket);
    // Here you would typically send the ticket to your backend API
    alert(`Ticket #${ticket.id} has been submitted!`);
  };

  return (
    <RaiseTicketComponent
      userName="Dr. Evelyn Reed"
      userEmail="e.reed@university.edu"
      userDepartment="Computer Science"
      onSubmit={handleTicketSubmit}
      onClose={() => alert('Close button clicked!')}
    />
  );
};

export default App;

