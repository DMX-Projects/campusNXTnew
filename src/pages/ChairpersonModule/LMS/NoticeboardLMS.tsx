import React, { useState } from 'react';
import { BellIcon, PinIcon, EyeIcon, EditIcon, TrashIcon, PlusIcon, SearchIcon, DownloadIcon, SendIcon } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'academic' | 'exam' | 'admission' | 'placement' | 'event' | 'urgent';
  department: string;
  targetAudience: string[];
  publishedBy: string;
  publishedDate: string;
  expiryDate: string;
  isPinned: boolean;
  isUrgent: boolean;
  attachments: string[];
  viewCount: number;
  status: 'draft' | 'published' | 'archived';
  priority: 'low' | 'medium' | 'high';
}

const Noticeboard: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      title: 'Mid-Semester Examination Schedule Released',
      content: 'The mid-semester examination schedule for all departments has been released. Students are advised to check their respective timetables and prepare accordingly. The examinations will commence from September 15, 2025.',
      type: 'exam',
      department: 'All',
      targetAudience: ['Students', 'Faculty'],
      publishedBy: 'Dr. Academic Controller',
      publishedDate: '2025-09-01',
      expiryDate: '2025-09-30',
      isPinned: true,
      isUrgent: true,
      attachments: ['exam_schedule.pdf'],
      viewCount: 450,
      status: 'published',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Annual Technical Symposium 2025',
      content: 'Department of Computer Science Engineering is organizing the Annual Technical Symposium on September 20, 2025. Students are invited to participate in various technical events including paper presentations, coding competitions, and project exhibitions.',
      type: 'event',
      department: 'CSE',
      targetAudience: ['Students'],
      publishedBy: 'Dr. Priya Sharma',
      publishedDate: '2025-08-28',
      expiryDate: '2025-09-21',
      isPinned: false,
      isUrgent: false,
      attachments: ['symposium_details.pdf', 'registration_form.pdf'],
      viewCount: 230,
      status: 'published',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Library Renovation Notice',
      content: 'The central library will be under renovation from September 5-10, 2025. During this period, students can access books from the departmental libraries. Online resources will remain available 24/7.',
      type: 'general',
      department: 'All',
      targetAudience: ['Students', 'Faculty', 'Staff'],
      publishedBy: 'Librarian',
      publishedDate: '2025-09-02',
      expiryDate: '2025-09-12',
      isPinned: false,
      isUrgent: false,
      attachments: [],
      viewCount: 125,
      status: 'published',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Placement Drive - Google',
      content: 'Google will be conducting a placement drive for final year students on September 25, 2025. Eligible students from CSE and IT departments should register by September 20, 2025.',
      type: 'placement',
      department: 'CSE',
      targetAudience: ['Students'],
      publishedBy: 'Placement Officer',
      publishedDate: '2025-08-30',
      expiryDate: '2025-09-25',
      isPinned: true,
      isUrgent: true,
      attachments: ['google_eligibility.pdf'],
      viewCount: 380,
      status: 'published',
      priority: 'high'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [newNotice, setNewNotice] = useState<Partial<Notice>>({});

  const departments = ['All', 'CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];
  const noticeTypes = ['general', 'academic', 'exam', 'admission', 'placement', 'event', 'urgent'];
  const targetAudiences = ['Students', 'Faculty', 'Staff', 'Parents'];
  const statuses = ['draft', 'published', 'archived'];

  const getTypeColor = (type: string) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800',
      academic: 'bg-green-100 text-green-800',
      exam: 'bg-red-100 text-red-800',
      admission: 'bg-purple-100 text-purple-800',
      placement: 'bg-orange-100 text-orange-800',
      event: 'bg-indigo-100 text-indigo-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[type as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      published: 'bg-green-100 text-green-800',
      archived: 'bg-orange-100 text-orange-800'
    };
    return colors[status as keyof typeof colors];
  };

  const filteredNotices = notices.filter(notice => {
    return (
      (notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       notice.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedType === 'all' || notice.type === selectedType) &&
      (selectedDepartment === 'all' || notice.department === selectedDepartment) &&
      (selectedStatus === 'all' || notice.status === selectedStatus)
    );
  });

  const handleCreateNotice = () => {
    if (newNotice.title && newNotice.content && newNotice.type) {
      const notice: Notice = {
        id: Date.now().toString(),
        title: newNotice.title,
        content: newNotice.content,
        type: newNotice.type,
        department: newNotice.department || 'All',
        targetAudience: newNotice.targetAudience || ['Students'],
        publishedBy: 'Chairperson',
        publishedDate: new Date().toISOString().split('T')[0],
        expiryDate: newNotice.expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isPinned: newNotice.isPinned || false,
        isUrgent: newNotice.isUrgent || false,
        attachments: newNotice.attachments || [],
        viewCount: 0,
        status: 'published',
        priority: newNotice.priority || 'medium'
      };
      
      setNotices([...notices, notice]);
      setNewNotice({});
      setIsCreateModalOpen(false);
      alert('Notice published successfully!');
    }
  };

  const handleEditNotice = () => {
    if (selectedNotice && newNotice.title && newNotice.content) {
      const updatedNotices = notices.map(notice => 
        notice.id === selectedNotice.id 
          ? { ...notice, ...newNotice }
          : notice
      );
      setNotices(updatedNotices);
      setNewNotice({});
      setSelectedNotice(null);
      setIsEditModalOpen(false);
      alert('Notice updated successfully!');
    }
  };

  const handleDeleteNotice = (noticeId: string) => {
    if (confirm('Are you sure you want to delete this notice?')) {
      setNotices(notices.filter(notice => notice.id !== noticeId));
      alert('Notice deleted successfully!');
    }
  };

  const togglePin = (noticeId: string) => {
    const updatedNotices = notices.map(notice => 
      notice.id === noticeId 
        ? { ...notice, isPinned: !notice.isPinned }
        : notice
    );
    setNotices(updatedNotices);
  };

  const updateStatus = (noticeId: string, status: 'draft' | 'published' | 'archived') => {
    const updatedNotices = notices.map(notice => 
      notice.id === noticeId 
        ? { ...notice, status }
        : notice
    );
    setNotices(updatedNotices);
    alert(`Notice ${status} successfully!`);
  };

  const sendNotification = (noticeId: string) => {
    const notice = notices.find(n => n.id === noticeId);
    if (notice) {
      alert(`Notifications sent!\n\nNotice: ${notice.title}\nTo: ${notice.targetAudience.join(', ')}\nDepartment: ${notice.department}`);
    }
  };

  const exportNotices = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Title,Type,Department,Published By,Published Date,Status,View Count,Priority\n" +
      filteredNotices.map(notice => 
        `"${notice.title}",${notice.type},${notice.department},"${notice.publishedBy}",${notice.publishedDate},${notice.status},${notice.viewCount},${notice.priority}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "notices_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = {
    totalNotices: notices.length,
    publishedNotices: notices.filter(n => n.status === 'published').length,
    pinnedNotices: notices.filter(n => n.isPinned).length,
    urgentNotices: notices.filter(n => n.isUrgent).length,
    totalViews: notices.reduce((sum, n) => sum + n.viewCount, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Digital Noticeboard</h1>
              <p className="text-gray-600 mt-1">Manage and publish college notices and announcements</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Create Notice
              </button>
              <button
                onClick={exportNotices}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Export
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search notices by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              {noticeTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Notices</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalNotices}</p>
              </div>
              <BellIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Published</p>
                <p className="text-2xl font-bold text-green-600">{stats.publishedNotices}</p>
              </div>
              <div className="text-2xl">📢</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pinned</p>
                <p className="text-2xl font-bold text-purple-600">{stats.pinnedNotices}</p>
              </div>
              <PinIcon className="text-purple-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{stats.urgentNotices}</p>
              </div>
              <div className="text-2xl">🚨</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalViews}</p>
              </div>
              <EyeIcon className="text-orange-500" size={24} />
            </div>
          </div>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pinned Notices */}
          {filteredNotices.filter(notice => notice.isPinned).length > 0 && (
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">📌 Pinned Notices</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {filteredNotices.filter(notice => notice.isPinned).map(notice => (
                  <NoticeCard
                    key={notice.id}
                    notice={notice}
                    onView={() => {
                      setSelectedNotice(notice);
                      setIsViewModalOpen(true);
                    }}
                    onEdit={() => {
                      setSelectedNotice(notice);
                      setNewNotice(notice);
                      setIsEditModalOpen(true);
                    }}
                    onDelete={() => handleDeleteNotice(notice.id)}
                    onTogglePin={() => togglePin(notice.id)}
                    onUpdateStatus={updateStatus}
                    onSendNotification={() => sendNotification(notice.id)}
                    getTypeColor={getTypeColor}
                    getPriorityColor={getPriorityColor}
                    getStatusColor={getStatusColor}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Notices */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              All Notices ({filteredNotices.length})
            </h2>
            <div className="space-y-4">
              {filteredNotices
                .sort((a, b) => {
                  if (a.isPinned !== b.isPinned) return b.isPinned ? 1 : -1;
                  if (a.isUrgent !== b.isUrgent) return b.isUrgent ? 1 : -1;
                  return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
                })
                .map(notice => (
                  <NoticeCard
                    key={notice.id}
                    notice={notice}
                    onView={() => {
                      setSelectedNotice(notice);
                      setIsViewModalOpen(true);
                    }}
                    onEdit={() => {
                      setSelectedNotice(notice);
                      setNewNotice(notice);
                      setIsEditModalOpen(true);
                    }}
                    onDelete={() => handleDeleteNotice(notice.id)}
                    onTogglePin={() => togglePin(notice.id)}
                    onUpdateStatus={updateStatus}
                    onSendNotification={() => sendNotification(notice.id)}
                    getTypeColor={getTypeColor}
                    getPriorityColor={getPriorityColor}
                    getStatusColor={getStatusColor}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Create Notice Modal */}
        {isCreateModalOpen && (
          <NoticeModal
            isOpen={isCreateModalOpen}
            title="Create New Notice"
            notice={newNotice}
            onNoticeChange={setNewNotice}
            onSave={handleCreateNotice}
            onCancel={() => setIsCreateModalOpen(false)}
            departments={departments}
            noticeTypes={noticeTypes}
            targetAudiences={targetAudiences}
          />
        )}

        {/* Edit Notice Modal */}
        {isEditModalOpen && (
          <NoticeModal
            isOpen={isEditModalOpen}
            title="Edit Notice"
            notice={newNotice}
            onNoticeChange={setNewNotice}
            onSave={handleEditNotice}
            onCancel={() => setIsEditModalOpen(false)}
            departments={departments}
            noticeTypes={noticeTypes}
            targetAudiences={targetAudiences}
          />
        )}

        {/* View Notice Modal */}
        {isViewModalOpen && selectedNotice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedNotice.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedNotice.type)}`}>
                      {selectedNotice.type.charAt(0).toUpperCase() + selectedNotice.type.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedNotice.priority)}`}>
                      {selectedNotice.priority.toUpperCase()} Priority
                    </span>
                    {selectedNotice.isPinned && (
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        📌 Pinned
                      </span>
                    )}
                    {selectedNotice.isUrgent && (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        🚨 Urgent
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedNotice.content}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Publication Details</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Published by:</span> {selectedNotice.publishedBy}</p>
                    <p><span className="font-medium">Published on:</span> {new Date(selectedNotice.publishedDate).toLocaleDateString()}</p>
                    <p><span className="font-medium">Expires on:</span> {new Date(selectedNotice.expiryDate).toLocaleDateString()}</p>
                    <p><span className="font-medium">Department:</span> {selectedNotice.department}</p>
                    <p><span className="font-medium">Views:</span> {selectedNotice.viewCount}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Target Audience</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedNotice.targetAudience.map((audience, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {audience}
                      </span>
                    ))}
                  </div>
                  
                  {selectedNotice.attachments.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Attachments</h4>
                      <div className="space-y-2">
                        {selectedNotice.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-sm">📎 {attachment}</span>
                            <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => sendNotification(selectedNotice.id)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Send Notifications
                </button>
                <button
                  onClick={() => {
                    setNewNotice(selectedNotice);
                    setIsViewModalOpen(false);
                    setIsEditModalOpen(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Edit Notice
                </button>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Notice Card Component
interface NoticeCardProps {
  notice: Notice;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
  onUpdateStatus: (id: string, status: 'draft' | 'published' | 'archived') => void;
  onSendNotification: () => void;
  getTypeColor: (type: string) => string;
  getPriorityColor: (priority: string) => string;
  getStatusColor: (status: string) => string;
}

const NoticeCard: React.FC<NoticeCardProps> = ({
  notice,
  onView,
  onEdit,
  onDelete,
  onTogglePin,
  onSendNotification,
  getTypeColor,
  getPriorityColor,
  getStatusColor
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          {notice.isPinned && <PinIcon size={16} className="text-purple-500" />}
          {notice.isUrgent && <span className="text-red-500">🚨</span>}
          <h3 className="font-semibold text-gray-900 truncate">{notice.title}</h3>
        </div>
        <p className="text-gray-600 text-sm line-clamp-3">{notice.content}</p>
      </div>
    </div>
    
    <div className="flex flex-wrap gap-2 mb-4">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notice.type)}`}>
        {notice.type}
      </span>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notice.priority)}`}>
        {notice.priority}
      </span>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(notice.status)}`}>
        {notice.status}
      </span>
    </div>
    
    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
      <span>{notice.publishedBy}</span>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <EyeIcon size={14} />
          {notice.viewCount}
        </span>
        <span>{new Date(notice.publishedDate).toLocaleDateString()}</span>
      </div>
    </div>
    
    <div className="flex gap-2">
      <button
        onClick={onView}
        className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-1 rounded transition-colors"
      >
        <EyeIcon size={16} />
      </button>
      <button
        onClick={onEdit}
        className="bg-green-100 hover:bg-green-200 text-green-700 p-1 rounded transition-colors"
      >
        <EditIcon size={16} />
      </button>
      <button
        onClick={onTogglePin}
        className={`p-1 rounded transition-colors ${
          notice.isPinned 
            ? 'bg-purple-100 hover:bg-purple-200 text-purple-700'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        <PinIcon size={16} />
      </button>
      <button
        onClick={onSendNotification}
        className="bg-green-100 hover:bg-green-200 text-green-700 p-1 rounded transition-colors"
      >
        <SendIcon size={16} />
      </button>
      <button
        onClick={onDelete}
        className="bg-red-100 hover:bg-red-200 text-red-700 p-1 rounded transition-colors"
      >
        <TrashIcon size={16} />
      </button>
    </div>
  </div>
);

// Notice Modal Component
interface NoticeModalProps {
  isOpen: boolean;
  title: string;
  notice: Partial<Notice>;
  onNoticeChange: (notice: Partial<Notice>) => void;
  onSave: () => void;
  onCancel: () => void;
  departments: string[];
  noticeTypes: string[];
  targetAudiences: string[];
}

const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  title,
  notice,
  onNoticeChange,
  onSave,
  onCancel,
  departments,
  noticeTypes,
  targetAudiences
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notice Title</label>
              <input
                type="text"
                value={notice.title || ''}
                onChange={(e) => onNoticeChange({...notice, title: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter notice title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={notice.type || ''}
                onChange={(e) => onNoticeChange({...notice, type: e.target.value as Notice["type"]})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                {noticeTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={notice.department || ''}
                onChange={(e) => onNoticeChange({...notice, department: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={notice.priority || 'medium'}
                onChange={(e) => onNoticeChange({...notice, priority: e.target.value as Notice["priority"]})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
              <input
                type="date"
                value={notice.expiryDate || ''}
                onChange={(e) => onNoticeChange({...notice, expiryDate: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notice.isPinned || false}
                  onChange={(e) => onNoticeChange({...notice, isPinned: e.target.checked})}
                  className="mr-2 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Pin this notice</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notice.isUrgent || false}
                  onChange={(e) => onNoticeChange({...notice, isUrgent: e.target.checked})}
                  className="mr-2 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Mark as urgent</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={notice.content || ''}
                onChange={(e) => onNoticeChange({...notice, content: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-40 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter notice content"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <div className="space-y-2">
                {targetAudiences.map(audience => (
                  <label key={audience} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notice.targetAudience?.includes(audience) || false}
                      onChange={(e) => {
                        const currentAudience = notice.targetAudience || [];
                        const newAudience = e.target.checked 
                          ? [...currentAudience, audience]
                          : currentAudience.filter(a => a !== audience);
                        onNoticeChange({...notice, targetAudience: newAudience});
                      }}
                      className="mr-2 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{audience}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {title.includes('Create') ? 'Publish Notice' : 'Update Notice'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Noticeboard;
