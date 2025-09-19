import React, { useState, useCallback, useEffect } from 'react';
import { 
  AlertCircle, 
  Send, 
  X, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Zap, 
  Tag, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Building, 
  ChevronDown,
  Shield,
  Activity,
  TrendingUp,
  BarChart3,
  Star,
  Award,
  BookOpen,
  MessageSquare,
  Settings,
  Info,
  Target,
  Briefcase,
  Globe,
  Upload,
  Paperclip,
  Calendar,
  RefreshCw,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Archive,
  History,
  Bell,
  HelpCircle,
  Lightbulb,
  Camera,
  Link
} from 'lucide-react';

type TicketPriority = 'low' | 'medium' | 'high' | 'critical';
type TicketCategory = 'technical' | 'academic' | 'administrative' | 'infrastructure' | 'network' | 'software' | 'hardware' | 'account' | 'other';
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
  isDarkMode?: boolean;
}

// Create a simple theme context since it doesn't exist
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      return newValue;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return { isDarkMode, toggleTheme };
};

const styles = {
  page: "w-full max-w-full min-h-screen overflow-x-clip bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
  container: "w-full max-w-[1920px] mx-auto p-4 sm:p-6 lg:p-8 xl:p-12",

  // Header
  header: "mb-8",
  headerTitle: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-indigo-600 dark:from-gray-100 dark:to-indigo-400 bg-clip-text text-transparent mb-3",
  headerSubtitle: "text-lg sm:text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 mb-4",
  headerActions: "flex flex-col sm:flex-row gap-3",

  // Stats
  statsGrid: "grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8",
  statCard: "group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 p-4 lg:p-6",
  statIcon: "w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-3 lg:mb-4 transition-transform group-hover:scale-110",
  statValue: "text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1",
  statLabel: "text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium",

  // Form sections
  formSection: "rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm p-6 lg:p-8",
  sectionTitle: "text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2",
  
  // Form elements
  formGroup: "space-y-2 mb-6",
  label: "flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2",
  input: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",
  select: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm appearance-none",
  textarea: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all backdrop-blur-sm",

  // Buttons
  button: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
  buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm hover:shadow-md",
  buttonSecondary: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 focus:ring-gray-500 border border-gray-200 dark:border-gray-600",
  buttonSuccess: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm hover:shadow-md",
  buttonDanger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm hover:shadow-md",
  buttonDisabled: "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed",

  // Tags and badges
  tag: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
  tagDefault: "bg-gray-100 text-gray-800 dark:bg-gray-800 text-gray-300 border border-gray-200 dark:border-gray-700",
  tagPrimary: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800",

  // File upload
  fileUpload: "border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors cursor-pointer",
  fileList: "space-y-2 mt-4",
  fileItem: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg",

  // Alert
  alert: "p-4 rounded-xl border mb-6",
  alertSuccess: "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200",
  alertError: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 text-red-800 dark:text-red-200",
  alertWarning: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 text-amber-800 dark:text-amber-200",
  alertInfo: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 text-blue-800 dark:text-blue-200",

  // Success modal
  successModal: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50",
  successCard: "bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl p-8 max-w-md w-full text-center",
};

const RaiseTicketComponent: React.FC<RaiseTicketProps> = ({
  userName,
  userEmail,
  userDepartment = '',
  onSubmit,
  onClose
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [formData, setFormData] = useState<TicketData>({
    title: '',
    category: 'technical',
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

  const [errors, setErrors] = useState<Partial<TicketData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [ticketId, setTicketId] = useState<string>('');
  const [savedDrafts, setSavedDrafts] = useState<TicketData[]>([]);

  const categories = [
    { value: 'technical', label: 'Technical Issues', icon: '🔧', description: 'Software bugs, system errors' },
    { value: 'academic', label: 'Academic Matters', icon: '📚', description: 'Course-related issues' },
    { value: 'administrative', label: 'Administrative', icon: '📋', description: 'Policy, procedures' },
    { value: 'infrastructure', label: 'Infrastructure', icon: '🏢', description: 'Physical facilities' },
    { value: 'network', label: 'Network Issues', icon: '🌐', description: 'Internet, connectivity' },
    { value: 'software', label: 'Software Support', icon: '💻', description: 'Application issues' },
    { value: 'hardware', label: 'Hardware Problems', icon: '🖥️', description: 'Equipment failures' },
    { value: 'account', label: 'Account Access', icon: '👤', description: 'Login, permissions' },
    { value: 'other', label: 'Other', icon: '📝', description: 'General inquiries' }
  ];

  const priorities = [
    { 
      value: 'low', 
      label: 'Low', 
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      icon: <CheckCircle className="w-4 h-4" />,
      description: 'Minor issue, can wait',
      sla: '5-7 business days'
    },
    { 
      value: 'medium', 
      label: 'Medium', 
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      icon: <Clock className="w-4 h-4" />,
      description: 'Normal priority',
      sla: '2-3 business days'
    },
    { 
      value: 'high', 
      label: 'High', 
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      icon: <AlertTriangle className="w-4 h-4" />,
      description: 'Urgent, needs attention',
      sla: '4-8 hours'
    },
    { 
      value: 'critical', 
      label: 'Critical', 
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      icon: <Zap className="w-4 h-4" />,
      description: 'Emergency, immediate action',
      sla: '1-2 hours'
    }
  ];

  const departments = [
    'Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Chemical',
    'Administration', 'Finance', 'HR', 'Library', 'IT Services', 'Hostel', 'Transport'
  ];

  const environments = [
    'Production', 'Development', 'Testing', 'Staging', 'Local', 'Mobile App', 'Web Browser'
  ];

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<TicketData> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    else if (formData.title.length < 5) newErrors.title = 'Title must be at least 5 characters';
    else if (formData.title.length > 150) newErrors.title = 'Title must be less than 150 characters';
    
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.length < 20) newErrors.description = 'Description must be at least 20 characters';
    
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email format';
    }
    
    if (formData.contactPhone && !/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.contactPhone)) {
      newErrors.contactPhone = 'Invalid phone number format';
    }

    if (formData.affectedUsers && (formData.affectedUsers < 1 || formData.affectedUsers > 10000)) {
      newErrors.affectedUsers = 'Affected users must be between 1 and 10000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async () => {    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newTicketId = `TK-${Date.now().toString().slice(-6)}`;
      setTicketId(newTicketId);
      
      const ticketWithId = {
        ...formData,
        id: newTicketId,
        status: 'submitted' as TicketStatus,
        submittedAt: new Date().toISOString(),
        estimatedResolution: priorities.find(p => p.value === formData.priority)?.sla || '2-3 business days'
      };
      
      onSubmit(ticketWithId);
      setIsSuccess(true);
      
      // Clear saved draft
      const drafts = savedDrafts.filter(draft => draft.id !== formData.id);
      setSavedDrafts(drafts);
      localStorage.setItem('ticketDrafts', JSON.stringify(drafts));
      
    } catch (error) {
      console.error('Error submitting ticket:', error);
      alert('Error raising ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit, savedDrafts, validateForm]);

  const handleInputChange = useCallback((field: keyof TicketData, value: string | number | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      category: 'technical',
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
    setErrors({});
    setIsSuccess(false);
    setShowAdvanced(false);
  }, [userEmail, userDepartment]);

  const saveDraft = useCallback(() => {
    const draft = {
      ...formData,
      id: formData.id || `DRAFT-${Date.now()}`,
      status: 'draft' as TicketStatus
    };
    
    const existingDrafts = savedDrafts.filter(d => d.id !== draft.id);
    const newDrafts = [draft, ...existingDrafts].slice(0, 5); // Keep only 5 drafts
    
    setSavedDrafts(newDrafts);
    localStorage.setItem('ticketDrafts', JSON.stringify(newDrafts));
    
    // Show success message
    alert('Draft saved successfully!');
  }, [formData, savedDrafts]);

  const loadDraft = useCallback((draft: TicketData) => {
    setFormData(draft);
    setErrors({});
  }, []);

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files).slice(0, 5); // Limit to 5 files
    const validFiles = newFiles.filter(file => {
      const validTypes = ['image/', 'application/pdf', 'text/', 'application/msword', 'application/vnd.openxmlformats'];
      const isValidType = validTypes.some(type => file.type.startsWith(type));
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length !== newFiles.length) {
      alert('Some files were skipped. Only images, PDFs, documents under 10MB are allowed.');
    }

    handleInputChange('attachments', [...(formData.attachments || []), ...validFiles]);
  }, [formData.attachments, handleInputChange]);

  const removeFile = useCallback((index: number) => {
    const newFiles = [...(formData.attachments || [])];
    newFiles.splice(index, 1);
    handleInputChange('attachments', newFiles);
  }, [formData.attachments, handleInputChange]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  }, [handleFileUpload]);

  const addTag = useCallback((tag: string) => {
    if (tag.trim() && !(formData.tags || []).includes(tag.trim())) {
      handleInputChange('tags', [...(formData.tags || []), tag.trim()]);
    }
  }, [formData.tags, handleInputChange]);

  const removeTag = useCallback((tagToRemove: string) => {
    handleInputChange('tags', (formData.tags || []).filter(tag => tag !== tagToRemove));
  }, [formData.tags, handleInputChange]);

  // Load drafts on component mount
  useEffect(() => {
    const drafts = localStorage.getItem('ticketDrafts');
    if (drafts) {
      try {
        setSavedDrafts(JSON.parse(drafts));
      } catch (error) {
        console.error('Error loading drafts:', error);
      }
    }
  }, []);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (formData.title || formData.description) {
      const timer = setTimeout(() => {
        if (formData.title.length > 5 || formData.description.length > 10) {
          // Auto-save logic here if needed
        }
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [formData.title, formData.description]);

  const selectedPriority = priorities.find(p => p.value === formData.priority);
  const selectedCategory = categories.find(c => c.value === formData.category);

  if (isSuccess) {
    return (
      <div className={styles.successModal}>
        <div className={styles.successCard}>
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
              Ticket Submitted Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your support ticket has been created and assigned to our support team. 
              You'll receive email updates on the progress.
            </p>
          </div>
          
          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-gray-500 dark:text-gray-400">Ticket ID:</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">#{ticketId}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-gray-500 dark:text-gray-400">Priority:</span>
              <span className={`font-semibold ${selectedPriority?.color}`}>
                {selectedPriority?.label}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-gray-500 dark:text-gray-400">Category:</span>
              <span className="font-semibold">
                {selectedCategory?.label}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-gray-500 dark:text-gray-400">Expected Resolution:</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {selectedPriority?.sla}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsSuccess(false)}
              className={`${styles.button} ${styles.buttonPrimary} flex-1`}
            >
              <Plus className="w-4 h-4" />
              Create Another Ticket
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className={`${styles.button} ${styles.buttonSecondary} flex-1`}
              >
                <X className="w-4 h-4" />
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={styles.headerTitle}>Support Ticket System</h2>
              <p className={styles.headerSubtitle}>
                <HelpCircle className="w-6 h-6" />
                Get help from our technical support team
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`${styles.button} ${styles.buttonSecondary}`}
                title="Toggle theme"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className={`${styles.button} ${styles.buttonSecondary}`}
                >
                  <X className="w-5 h-5" />
                  Close
                </button>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Welcome, {userName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {userEmail} • {userDepartment || 'Department not specified'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400`}>
              <FileText className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>24/7</div>
            <div className={styles.statLabel}>Support Available</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400`}>
              <Clock className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}> 2hrs</div>
            <div className={styles.statLabel}>Avg Response Time</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400`}>
              <Star className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>4.8/5</div>
            <div className={styles.statLabel}>Satisfaction Rating</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400`}>
              <CheckCircle className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>98%</div>
            <div className={styles.statLabel}>Resolution Rate</div>
          </div>
        </div>

        {/* Saved Drafts */}
        {savedDrafts.length > 0 && (
          <div className={`${styles.alert} ${styles.alertInfo}`}>
            <div className="flex items-start gap-2">
              <Archive className="w-5 h-5 mt-0.5 shrink-0" />
              <div className="flex-1">
                <div className="font-medium mb-2">You have {savedDrafts.length} saved draft(s)</div>
                <div className="flex flex-wrap gap-2">
                  {savedDrafts.map((draft) => (
                    <button
                      key={draft.id}
                      onClick={() => loadDraft(draft)}
                      className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      {draft.title || 'Untitled'} ({draft.category})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="xl:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>
                <FileText className="w-6 h-6" />
                Ticket Information
              </h2>

              <div className="space-y-6">
                {/* Title */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <FileText className="w-4 h-4" />
                    Ticket Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Brief, descriptive title of your issue (e.g., 'Cannot access student portal')"
                    maxLength={150}
                    className={styles.input}
                  />
                  <div className="flex justify-between items-center mt-2">
                    {errors.title && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.title}
                      </p>
                    )}
                    <p className="text-gray-400 dark:text-gray-500 text-xs ml-auto">
                      {formData.title.length}/150 characters
                    </p>
                  </div>
                </div>

                {/* Category and Priority */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <Tag className="w-4 h-4" />
                      Category *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className={styles.select}
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.icon} {cat.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                    </div>
                    {selectedCategory && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {selectedCategory.description}
                      </p>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <AlertTriangle className="w-4 h-4" />
                      Priority Level *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        className={styles.select}
                      >
                        {priorities.map(priority => (
                          <option key={priority.value} value={priority.value}>
                            {priority.label} - {priority.description}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                    </div>
                    {selectedPriority && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`flex items-center text-sm px-3 py-1 rounded-full ${selectedPriority.bgColor} ${selectedPriority.color}`}>
                          {selectedPriority.icon}
                          <span className="ml-2">{selectedPriority.description}</span>
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          SLA: {selectedPriority.sla}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Department */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <Building className="w-4 h-4" />
                    Department *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className={styles.select}
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                  </div>
                  {errors.department && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.department}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <MessageSquare className="w-4 h-4" />
                    Detailed Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Please provide detailed information about your issue:&#10;• What happened?&#10;• When did it occur?&#10;• Steps to reproduce the issue&#10;• What you expected vs what actually happened&#10;• Any error messages you saw&#10;• What you've already tried to fix it"
                    rows={8}
                    className={styles.textarea}
                  />
                  <div className="flex justify-between items-center mt-2">
                    {errors.description && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.description}
                      </p>
                    )}
                    <p className="text-gray-400 dark:text-gray-500 text-xs ml-auto">
                      {formData.description.length} characters (minimum 20)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <div className={styles.formSection}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Settings className="w-6 h-6" />
                  Advanced Options
                </h2>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className={`${styles.button} ${styles.buttonSecondary}`}
                >
                  {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {showAdvanced ? 'Hide' : 'Show'} Options
                </button>
              </div>

              {showAdvanced && (
                <div className="space-y-6">
                  {/* Steps to Reproduce */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <Activity className="w-4 h-4" />
                      Steps to Reproduce
                    </label>
                    <textarea
                      value={formData.stepsToReproduce || ''}
                      onChange={(e) => handleInputChange('stepsToReproduce', e.target.value)}
                      placeholder="Step-by-step instructions to reproduce the issue:&#10;1. Go to...&#10;2. Click on...&#10;3. Enter...&#10;4. See error..."
                      rows={4}
                      className={styles.textarea}
                    />
                  </div>

                  {/* Business Impact */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <TrendingUp className="w-4 h-4" />
                      Business Impact
                    </label>
                    <textarea
                      value={formData.businessImpact || ''}
                      onChange={(e) => handleInputChange('businessImpact', e.target.value)}
                      placeholder="How is this issue affecting your work or the department?"
                      rows={3}
                      className={styles.textarea}
                    />
                  </div>

                  {/* Environment and Affected Users */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        <Globe className="w-4 h-4" />
                        Environment
                      </label>
                      <select
                        value={formData.environment || ''}
                        onChange={(e) => handleInputChange('environment', e.target.value)}
                        className={styles.select}
                      >
                        <option value="">Select Environment</option>
                        {environments.map(env => (
                          <option key={env} value={env}>{env}</option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        <Users className="w-4 h-4" />
                        Affected Users
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10000"
                        value={formData.affectedUsers || 1}
                        onChange={(e) => handleInputChange('affectedUsers', parseInt(e.target.value) || 1)}
                        className={styles.input}
                      />
                      {errors.affectedUsers && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.affectedUsers}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Expected Resolution */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <Target className="w-4 h-4" />
                      Expected Resolution
                    </label>
                    <textarea
                      value={formData.expectedResolution || ''}
                      onChange={(e) => handleInputChange('expectedResolution', e.target.value)}
                      placeholder="What would you like to see as the outcome? What would constitute a resolution for you?"
                      rows={3}
                      className={styles.textarea}
                    />
                  </div>

                  {/* Related Tickets */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <Link className="w-4 h-4" />
                      Related Tickets
                    </label>
                    <input
                      type="text"
                      value={formData.relatedTickets || ''}
                      onChange={(e) => handleInputChange('relatedTickets', e.target.value)}
                      placeholder="Reference any related ticket IDs (e.g., TK-123456, TK-789012)"
                      className={styles.input}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* File Attachments */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>
                <Paperclip className="w-6 h-6" />
                Attachments (Optional)
              </h2>

              <div
                className={`${styles.fileUpload} ${dragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('fileInput')?.click()}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Drop files here or click to upload
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Supports: Images, PDFs, Documents (Max 10MB each, 5 files max)
                    </p>
                  </div>
                </div>
                <input
                  id="fileInput"
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt,.rtf"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />
              </div>

              {formData.attachments && formData.attachments.length > 0 && (
                <div className={styles.fileList}>
                  {formData.attachments.map((file, index) => (
                    <div key={index} className={styles.fileItem}>
                      <div className="flex items-center space-x-3">
                        <Paperclip className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>
                <Tag className="w-6 h-6" />
                Tags (Optional)
              </h2>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {(formData.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className={`${styles.tag} ${styles.tagPrimary} cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-800`}
                      onClick={() => removeTag(tag)}
                    >
                      {tag}
                      <X className="w-3 h-3 ml-1" />
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add tags (press Enter)"
                    className={styles.input}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Suggested:</span>
                  {['urgent', 'login-issue', 'network', 'software', 'hardware', 'bug', 'feature-request'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => addTag(tag)}
                      className={`${styles.tag} ${styles.tagDefault} hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer`}
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <Mail className="w-5 h-5" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className={styles.input}
                  />
                  {errors.contactEmail && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.contactEmail}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className={styles.input}
                  />
                  {errors.contactPhone && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.contactPhone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className={styles.formSection}>
              <h3 className="text-lg font-semibold mb-4 text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                💡 Support Tips
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>Be specific and detailed in your description</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>Include screenshots or error messages</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>Specify browser/device for technical issues</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>Set appropriate priority level</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>Save drafts for complex issues</span>
                </li>
              </ul>
            </div>

            {/* Priority Guide */}
            <div className={styles.formSection}>
              <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Priority Guide
              </h3>
              <div className="space-y-3">
                {priorities.map((priority) => (
                  <div key={priority.value} className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-1 ${priority.bgColor.replace('bg-', 'bg-').split(' ')[0]}`} />
                    <div>
                      <p className={`font-medium ${priority.color}`}>
                        {priority.label}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {priority.description} • SLA: {priority.sla}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 ${
                  isSubmitting 
                    ? styles.buttonDisabled 
                    : `${styles.button} ${styles.buttonPrimary} shadow-lg hover:shadow-xl`
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting Ticket...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <Send className="w-5 h-5" />
                    <span>Submit Ticket</span>
                  </div>
                )}
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={saveDraft}
                  disabled={isSubmitting || (!formData.title.trim() && !formData.description.trim())}
                  className={`${styles.button} ${styles.buttonSecondary}`}
                >
                  <Archive className="w-4 h-4" />
                  Save Draft
                </button>
                
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isSubmitting}
                  className={`${styles.button} ${styles.buttonSecondary}`}
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage component
const App: React.FC = () => {
  const [currentUser] = useState({
    name: 'Dr. John Smith',
    email: 'john.smith@university.edu',
    department: 'Computer Science'
  });

  const handleTicketSubmit = (ticket: TicketData) => {
    console.log('Ticket submitted:', ticket);
    // Here you would typically send the ticket to your backend API
    
    // Simulate API call
    fetch('/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticket),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Ticket created:', data);
    })
    .catch(error => {
      console.error('Error creating ticket:', error);
    });
  };

  return (
    <RaiseTicketComponent
      userName={currentUser.name}
      userEmail={currentUser.email}
      userDepartment={currentUser.department}
      onSubmit={handleTicketSubmit}
    />
  );
};

export default App;
