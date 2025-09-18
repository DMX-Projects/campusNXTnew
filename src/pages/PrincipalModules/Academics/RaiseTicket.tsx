import React, { useState } from 'react';
import { AlertCircle, Send, X, CheckCircle, Clock, AlertTriangle, Zap, Tag, User, Mail, Phone, FileText, Building, ChevronDown } from 'lucide-react';
// Update the import path to the correct location of ThemeContext, for example:
import { useTheme } from '../../../contexts/ThemeContext';
// If ThemeContext does not exist, create it at src/contexts/ThemeContext.tsx

type TicketPriority = 'low' | 'medium' | 'high' | 'critical';
type TicketCategory = 'technical' | 'academic' | 'administrative' | 'infrastructure' | 'other';

interface TicketData {
  title: string;
  category: TicketCategory;
  priority: TicketPriority;
  description: string;
  department: string;
  contactEmail: string;
  contactPhone: string;
}

interface RaiseTicketProps {
  userName: string;
  userEmail: string;
  onSubmit: (ticket: TicketData) => void;
  onClose?: () => void;
}

const RaiseTicketComponent: React.FC<RaiseTicketProps> = ({
  userName,
  userEmail,
  onSubmit,
  onClose
}) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState<TicketData>({
    title: '',
    category: 'technical',
    priority: 'medium',
    description: '',
    department: '',
    contactEmail: userEmail,
    contactPhone: ''
  });

  const [errors, setErrors] = useState<Partial<TicketData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = [
    { value: 'technical', label: 'Technical Issues', icon: '🔧' },
    { value: 'academic', label: 'Academic Matters', icon: '📚' },
    { value: 'administrative', label: 'Administrative', icon: '📋' },
    { value: 'infrastructure', label: 'Infrastructure', icon: '🏢' },
    { value: 'other', label: 'Other', icon: '📝' }
  ];

  const priorities = [
    { 
      value: 'low', 
      label: 'Low', 
      color: 'text-green-600 dark:text-green-400',
      icon: <CheckCircle className="w-4 h-4" />
    },
    { 
      value: 'medium', 
      label: 'Medium', 
      color: 'text-yellow-600 dark:text-yellow-400',
      icon: <Clock className="w-4 h-4" />
    },
    { 
      value: 'high', 
      label: 'High', 
      color: 'text-orange-600 dark:text-orange-400',
      icon: <AlertTriangle className="w-4 h-4" />
    },
    { 
      value: 'critical', 
      label: 'Critical', 
      color: 'text-red-600 dark:text-red-400',
      icon: <Zap className="w-4 h-4" />
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<TicketData> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.title.length > 100) newErrors.title = 'Title must be less than 100 characters';
    
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters';
    
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email format';
    }
    
    if (formData.contactPhone && !/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.contactPhone)) {
      newErrors.contactPhone = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSubmit(formData);
      
      setIsSuccess(true);
      
      setTimeout(() => {
        setFormData({
          title: '',
          category: 'technical',
          priority: 'medium',
          description: '',
          department: '',
          contactEmail: userEmail,
          contactPhone: ''
        });
        setIsSuccess(false);
        setErrors({});
      }, 3000);
      
    } catch (error) {
      alert('Error raising ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof TicketData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'technical',
      priority: 'medium',
      description: '',
      department: '',
      contactEmail: userEmail,
      contactPhone: ''
    });
    setErrors({});
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="rounded-2xl border p-8 max-w-md w-full text-center bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-xl">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
              Ticket Submitted Successfully!
            </h2>
            <p className="text-gray-600 dark:text-slate-300">
              Your support ticket has been created and assigned a unique ID. 
              You'll receive an email confirmation shortly.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">Ticket ID:</span>
              <span className="font-mono font-bold">#TK-{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">Priority:</span>
              <span className={`font-semibold ${priorities.find(p => p.value === formData.priority)?.color}`}>
                {priorities.find(p => p.value === formData.priority)?.label}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">Category:</span>
              <span className="font-semibold">
                {categories.find(c => c.value === formData.category)?.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="rounded-2xl border p-6 mb-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Support Ticket
                </h1>
                <p className="text-gray-600 dark:text-slate-300">
                  Welcome, {userName}
                </p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-3 rounded-xl transition-all duration-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-600 dark:text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border p-8 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="flex items-center text-sm font-semibold mb-3">
                    <FileText className="w-4 h-4 mr-2 text-blue-500" />
                    Ticket Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Brief, descriptive title of your issue"
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:outline-none bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                  <div className="flex justify-between mt-2">
                    {errors.title && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.title}
                      </p>
                    )}
                    <p className="text-gray-400 dark:text-slate-500 text-xs ml-auto">
                      {formData.title.length}/100
                    </p>
                  </div>
                </div>

                {/* Category and Priority Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Dropdown */}
                  <div>
                    <label className="flex items-center text-sm font-semibold mb-3">
                      <Tag className="w-4 h-4 mr-2 text-blue-500" />
                      Category *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:outline-none appearance-none pr-10 bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 focus:border-blue-500 dark:focus:border-blue-400"
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.icon} {cat.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Priority Dropdown */}
                  <div>
                    <label className="flex items-center text-sm font-semibold mb-3">
                      <AlertTriangle className="w-4 h-4 mr-2 text-blue-500" />
                      Priority Level *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:outline-none appearance-none pr-10 bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 focus:border-blue-500 dark:focus:border-blue-400"
                      >
                        {priorities.map(priority => (
                          <option key={priority.value} value={priority.value}>
                            {priority.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500 pointer-events-none" />
                    </div>
                    {/* Priority indicator */}
                    <div className="mt-2 flex items-center">
                      <span className={`flex items-center text-sm ${priorities.find(p => p.value === formData.priority)?.color}`}>
                        {priorities.find(p => p.value === formData.priority)?.icon}
                        <span className="ml-2">
                          {formData.priority === 'low' && 'Minor issue, can wait'}
                          {formData.priority === 'medium' && 'Normal priority'}
                          {formData.priority === 'high' && 'Urgent, needs attention'}
                          {formData.priority === 'critical' && 'Emergency, immediate action'}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Department */}
                <div>
                  <label className="flex items-center text-sm font-semibold mb-3">
                    <Building className="w-4 h-4 mr-2 text-blue-500" />
                    Department *
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    placeholder="Your department or division"
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:outline-none bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                  {errors.department && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.department}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="flex items-center text-sm font-semibold mb-3">
                    <FileText className="w-4 h-4 mr-2 text-blue-500" />
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Please provide detailed information about your issue:&#10;• What happened?&#10;• When did it occur?&#10;• Steps to reproduce&#10;• Expected vs actual behavior&#10;• Any error messages"
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:outline-none resize-vertical bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                  <div className="flex justify-between mt-2">
                    {errors.description && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.description}
                      </p>
                    )}
                    <p className="text-gray-400 dark:text-slate-500 text-xs ml-auto">
                      {formData.description.length} characters
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="rounded-2xl border p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-500" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="your.email@domain.com"
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:outline-none bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                  {errors.contactEmail && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.contactEmail}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium mb-2">
                    <Phone className="w-4 h-4 mr-1" />
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:outline-none bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400"
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

            {/* Tips */}
            <div className="rounded-2xl border p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-green-600 dark:text-green-400">
                💡 Tips for Better Support
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Be specific and detailed in your description</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Include screenshots if applicable</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Mention browser/device information for technical issues</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Set appropriate priority level</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="font-semibold">Submitting Ticket...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span className="font-semibold">Submit Ticket</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                Reset Form
              </button>
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
    email: 'John.Smith@university.edu'
  });

  const handleTicketSubmit = (ticket: TicketData) => {
    console.log('Ticket submitted:', ticket);
    // Here you would typically send the ticket to your backend API
  };

  return (
    <RaiseTicketComponent
      userName={currentUser.name}
      userEmail={currentUser.email}
      onSubmit={handleTicketSubmit}
    />
  );
};

export default App;
