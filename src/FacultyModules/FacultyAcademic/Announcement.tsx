 // FacultyAnnouncements.tsx
import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Bell, 
  Users, 
  BookOpen, 
  Calendar, 
  Eye,
  X,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'class' | 'exam' | 'assignment' | 'urgent';
  targetAudience: 'all' | 'specific-class';
  className?: string;
  section?: string;
  subject?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  expiryDate?: string;
}

interface FacultyInfo {
  name: string;
  subjects: string[];
  classes: string[];
}

const FacultyAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Mid-Term Exam Schedule',
      content: 'Mid-term examinations for Data Structures will be conducted on October 15th, 2025. Please prepare accordingly and bring your ID cards.',
      type: 'exam',
      targetAudience: 'specific-class',
      className: 'BTech CSE',
      section: '3A',
      subject: 'Data Structures',
      priority: 'high',
      createdAt: '2025-09-03T10:30:00',
      updatedAt: '2025-09-03T10:30:00',
      isActive: true,
      expiryDate: '2025-10-15'
    },
    {
      id: '2',
      title: 'Assignment Submission Reminder',
      content: 'Assignment 2 on Binary Trees is due tomorrow. Late submissions will not be accepted.',
      type: 'assignment',
      targetAudience: 'specific-class',
      className: 'BTech CSE',
      section: '3B',
      subject: 'Data Structures',
      priority: 'medium',
      createdAt: '2025-09-02T14:15:00',
      updatedAt: '2025-09-02T14:15:00',
      isActive: true,
      expiryDate: '2025-09-05'
    },
    {
      id: '3',
      title: 'Class Postponed',
      content: 'Today\'s Algorithms class is postponed due to faculty meeting. Make-up class will be scheduled for Friday.',
      type: 'class',
      targetAudience: 'specific-class',
      className: 'BTech CSE',
      section: '3A',
      subject: 'Algorithms',
      priority: 'high',
      createdAt: '2025-09-03T09:00:00',
      updatedAt: '2025-09-03T09:00:00',
      isActive: true
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | string>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | string>('all');

  // Faculty information (would come from context/props in real app)
  const facultyInfo: FacultyInfo = {
    name: 'Dr. Rajesh Kumar',
    subjects: ['Data Structures', 'Algorithms', 'Database Systems'],
    classes: ['BTech CSE 3A', 'BTech CSE 3B', 'BTech IT 3A']
  };

  // Form state for creating/editing announcements
  const [form, setForm] = useState({
    title: '',
    content: '',
    type: 'general' as const,
    targetAudience: 'all' as const,
    className: '',
    section: '',
    subject: '',
    priority: 'medium' as const,
    expiryDate: ''
  });

  // Reset form
  const resetForm = () => {
    setForm({
      title: '',
      content: '',
      type: 'general',
      targetAudience: 'all',
      className: '',
      section: '',
      subject: '',
      priority: 'medium',
      expiryDate: ''
    });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Open modal for creating new announcement
  const openCreateModal = () => {
    resetForm();
    setEditingAnnouncement(null);
    setIsModalOpen(true);
  };

  // Open modal for editing announcement
  const openEditModal = (announcement: Announcement) => {
    setForm({
      title: announcement.title,
      content: announcement.content,
      type: announcement.type,
      targetAudience: announcement.targetAudience,
      className: announcement.className || '',
      section: announcement.section || '',
      subject: announcement.subject || '',
      priority: announcement.priority,
      expiryDate: announcement.expiryDate || ''
    });
    setEditingAnnouncement(announcement);
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title.trim() || !form.content.trim()) {
      alert('Title and content are required');
      return;
    }

    const now = new Date().toISOString();
    
    if (editingAnnouncement) {
      // Update existing announcement
      setAnnouncements(prev => prev.map(ann => 
        ann.id === editingAnnouncement.id 
          ? {
              ...ann,
              ...form,
              updatedAt: now
            }
          : ann
      ));
    } else {
      // Create new announcement
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        ...form,
        createdAt: now,
        updatedAt: now,
        isActive: true
      };
      setAnnouncements(prev => [newAnnouncement, ...prev]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  // Delete announcement
  const deleteAnnouncement = (id: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(prev => prev.filter(ann => ann.id !== id));
    }
  };

  // Toggle announcement active status
  const toggleAnnouncementStatus = (id: string) => {
    setAnnouncements(prev => prev.map(ann => 
      ann.id === id ? { ...ann, isActive: !ann.isActive } : ann
    ));
  };

  // Filtered announcements
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(announcement => {
      const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || announcement.type === filterType;
      const matchesPriority = filterPriority === 'all' || announcement.priority === filterPriority;
      return matchesSearch && matchesType && matchesPriority;
    });
  }, [announcements, searchTerm, filterType, filterPriority]);

  // Get announcement type color and icon
  const getTypeDisplay = (type: string) => {
    switch (type) {
      case 'general':
        return { 
          color: 'bg-gray-100 text-gray-800', 
          icon: <Info className="w-4 h-4" />, 
          label: 'General' 
        };
      case 'class':
        return { 
          color: 'bg-blue-100 text-blue-800', 
          icon: <Users className="w-4 h-4" />, 
          label: 'Class' 
        };
      case 'exam':
        return { 
          color: 'bg-red-100 text-red-800', 
          icon: <BookOpen className="w-4 h-4" />, 
          label: 'Exam' 
        };
      case 'assignment':
        return { 
          color: 'bg-purple-100 text-purple-800', 
          icon: <Edit className="w-4 h-4" />, 
          label: 'Assignment' 
        };
      case 'urgent':
        return { 
          color: 'bg-red-100 text-red-800', 
          icon: <AlertCircle className="w-4 h-4" />, 
          label: 'Urgent' 
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800', 
          icon: <Info className="w-4 h-4" />, 
          label: 'General' 
        };
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
              <p className="text-gray-600">Create and manage class announcements</p>
            </div>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Announcement
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="general">General</option>
            <option value="class">Class</option>
            <option value="exam">Exam</option>
            <option value="assignment">Assignment</option>
            <option value="urgent">Urgent</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No announcements found</p>
          </div>
        ) : (
          filteredAnnouncements.map(announcement => {
            const typeDisplay = getTypeDisplay(announcement.type);
            return (
              <div key={announcement.id} className={`bg-white rounded-xl shadow-sm p-6 transition-all ${
                !announcement.isActive ? 'opacity-60' : ''
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{announcement.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${typeDisplay.color}`}>
                        {typeDisplay.icon}
                        {typeDisplay.label}
                      </span>
                      <span className={`text-sm font-medium ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                      </span>
                    </div>
                    
                    {announcement.targetAudience === 'specific-class' && (
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Target:</strong> {announcement.className} - Section {announcement.section} 
                        {announcement.subject && ` • ${announcement.subject}`}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleAnnouncementStatus(announcement.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        announcement.isActive 
                          ? 'text-green-600 hover:bg-green-100' 
                          : 'text-gray-400 hover:bg-gray-100'
                      }`}
                      title={announcement.isActive ? 'Deactivate' : 'Activate'}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openEditModal(announcement)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteAnnouncement(announcement.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="text-gray-700 mb-4 whitespace-pre-wrap">{announcement.content}</div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>Created: {new Date(announcement.createdAt).toLocaleString()}</span>
                    {announcement.updatedAt !== announcement.createdAt && (
                      <span>Updated: {new Date(announcement.updatedAt).toLocaleString()}</span>
                    )}
                  </div>
                  {announcement.expiryDate && (
                    <span className="text-orange-600">
                      Expires: {new Date(announcement.expiryDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content*</label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">General</option>
                    <option value="class">Class</option>
                    <option value="exam">Exam</option>
                    <option value="assignment">Assignment</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                <select
                  name="targetAudience"
                  value={form.targetAudience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Students</option>
                  <option value="specific-class">Specific Class</option>
                </select>
              </div>

              {form.targetAudience === 'specific-class' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                    <select
                      name="className"
                      value={form.className}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Class</option>
                      <option value="BTech CSE">BTech CSE</option>
                      <option value="BTech IT">BTech IT</option>
                      <option value="BTech ME">BTech ME</option>
                      <option value="BTech EE">BTech EE</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                    <select
                      name="section"
                      value={form.section}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Section</option>
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Subject</option>
                      {facultyInfo.subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (Optional)</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingAnnouncement ? 'Update' : 'Create'} Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyAnnouncements;
