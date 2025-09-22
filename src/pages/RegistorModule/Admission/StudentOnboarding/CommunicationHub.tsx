import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  Clock, 
  Users, 
  Filter, 
  Plus, 
  Search, 
  Calendar,
  Paperclip,
  Bold,
  Italic,
  Underline,
  List,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  XCircle,
  AlertCircle,
  Smartphone,
  Bell
} from 'lucide-react';

interface Message {
  id: string;
  subject: string;
  content: string;
  recipients: string[];
  recipientGroups: string[];
  type: 'email' | 'sms' | 'notification';
  status: 'draft' | 'sent' | 'scheduled' | 'failed';
  sentAt?: Date;
  scheduledAt?: Date;
  createdAt: Date;
  attachments?: string[];
  template?: string;
}

interface Template {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: string;
}

const CommunicationHub = () => {
  const [activeTab, setActiveTab] = useState('compose');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      subject: 'Admission Confirmation',
      content: 'Welcome to our institution! Your admission has been confirmed.',
      recipients: ['john@email.com', 'sarah@email.com'],
      recipientGroups: ['Verified Candidates'],
      type: 'email',
      status: 'sent',
      sentAt: new Date('2024-09-15T10:30:00'),
      createdAt: new Date('2024-09-15T10:00:00'),
      template: 'admission-confirmation'
    },
    {
      id: '2',
      subject: 'Fee Payment Reminder',
      content: 'This is a reminder about your pending fee payment.',
      recipients: ['mike@email.com'],
      recipientGroups: ['Students of B.Tech CSE'],
      type: 'sms',
      status: 'scheduled',
      scheduledAt: new Date('2024-09-25T09:00:00'),
      createdAt: new Date('2024-09-20T14:00:00'),
      template: 'fee-reminder'
    }
  ]);

  const [templates] = useState<Template[]>([
    {
      id: '1',
      name: 'Admission Confirmation',
      subject: 'Welcome to [Institution Name] - Admission Confirmed',
      content: 'Dear [Student Name],\n\nCongratulations! Your admission to [Course Name] has been confirmed...',
      category: 'Admissions'
    },
    {
      id: '2',
      name: 'Fee Payment Reminder',
      subject: 'Fee Payment Reminder - [Course Name]',
      content: 'Dear [Student Name],\n\nThis is a gentle reminder about your pending fee payment...',
      category: 'Financial'
    },
    {
      id: '3',
      name: 'Course Registration',
      subject: 'Course Registration - Action Required',
      content: 'Dear [Student Name],\n\nPlease complete your course registration before the deadline...',
      category: 'Academic'
    }
  ]);

  // Form state for compose message
  const [messageForm, setMessageForm] = useState({
    subject: '',
    content: '',
    type: 'email' as 'email' | 'sms' | 'notification',
    recipientGroups: [] as string[],
    recipients: '',
    scheduledAt: '',
    selectedTemplate: '',
    attachments: [] as string[]
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const recipientGroupOptions = [
    'All Applicants',
    'Verified Candidates',
    'Students of B.Tech CSE',
    'Students of B.Tech ECE',
    'Students of MBA',
    'Faculty Members',
    'Administrative Staff',
    'Parents/Guardians'
  ];

  // Filter messages based on search and filters
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
    const matchesType = filterType === 'all' || message.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setMessageForm(prev => ({
        ...prev,
        selectedTemplate: templateId,
        subject: template.subject,
        content: template.content
      }));
    }
  };

  const handleSendMessage = () => {
    if (!messageForm.subject || !messageForm.content || messageForm.recipientGroups.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      subject: messageForm.subject,
      content: messageForm.content,
      recipients: messageForm.recipients.split(',').map(r => r.trim()).filter(r => r),
      recipientGroups: messageForm.recipientGroups,
      type: messageForm.type,
      status: messageForm.scheduledAt ? 'scheduled' : 'sent',
      sentAt: messageForm.scheduledAt ? undefined : new Date(),
      scheduledAt: messageForm.scheduledAt ? new Date(messageForm.scheduledAt) : undefined,
      createdAt: new Date(),
      attachments: messageForm.attachments,
      template: messageForm.selectedTemplate
    };

    setMessages(prev => [newMessage, ...prev]);
    
    // Reset form
    setMessageForm({
      subject: '',
      content: '',
      type: 'email',
      recipientGroups: [],
      recipients: '',
      scheduledAt: '',
      selectedTemplate: '',
      attachments: []
    });

    setActiveTab('sent');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'sms':
        return <Smartphone className="w-4 h-4" />;
      case 'notification':
        return <Bell className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                Communication Hub
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Send bulk emails, SMS, or notifications to various applicant and student groups
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 mb-6">
          <div className="border-b border-slate-200 dark:border-slate-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'compose', label: 'Compose Message', icon: Plus },
                { id: 'sent', label: 'Sent', icon: CheckCircle },
                { id: 'scheduled', label: 'Scheduled', icon: Clock }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Compose Message Tab */}
        {activeTab === 'compose' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Compose New Message</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Message Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Message Type *
                  </label>
                  <div className="flex gap-4">
                    {[
                      { value: 'email', label: 'Email', icon: Mail },
                      { value: 'sms', label: 'SMS', icon: Smartphone },
                      { value: 'notification', label: 'Notification', icon: Bell }
                    ].map(({ value, label, icon: Icon }) => (
                      <label key={value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="messageType"
                          value={value}
                          checked={messageForm.type === value}
                          onChange={(e) => setMessageForm(prev => ({ ...prev, type: e.target.value as any }))}
                          className="w-4 h-4 text-blue-600"
                        />
                        <Icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Use Template (Optional)
                  </label>
                  <select
                    value={messageForm.selectedTemplate}
                    onChange={(e) => handleTemplateSelect(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a template...</option>
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name} ({template.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={messageForm.subject}
                    onChange={(e) => setMessageForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter message subject"
                  />
                </div>

                {/* Rich Text Formatting Toolbar */}
                {messageForm.type === 'email' && (
                  <div className="border border-slate-300 dark:border-slate-600 rounded-lg">
                    <div className="flex items-center gap-2 p-3 border-b border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50">
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-slate-600 dark:text-slate-400">
                        <Bold className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-slate-600 dark:text-slate-400">
                        <Italic className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-slate-600 dark:text-slate-400">
                        <Underline className="w-4 h-4" />
                      </button>
                      <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-2" />
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-slate-600 dark:text-slate-400">
                        <List className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-slate-600 dark:text-slate-400">
                        <Paperclip className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      value={messageForm.content}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, content: e.target.value }))}
                      rows={8}
                      className="w-full p-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-white border-none focus:ring-0 focus:outline-none resize-none"
                      placeholder="Enter your message content..."
                    />
                  </div>
                )}

                {/* Simple textarea for SMS/Notification */}
                {messageForm.type !== 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Message Content *
                    </label>
                    <textarea
                      value={messageForm.content}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, content: e.target.value }))}
                      rows={6}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your message content..."
                      maxLength={messageForm.type === 'sms' ? 160 : undefined}
                    />
                    {messageForm.type === 'sms' && (
                      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {messageForm.content.length}/160 characters
                      </div>
                    )}
                  </div>
                )}

                {/* Schedule Option */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Schedule for Later (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={messageForm.scheduledAt}
                    onChange={(e) => setMessageForm(prev => ({ ...prev, scheduledAt: e.target.value }))}
                    className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Recipients Panel */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Recipient Groups *
                  </label>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {recipientGroupOptions.map(group => (
                      <label key={group} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={messageForm.recipientGroups.includes(group)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setMessageForm(prev => ({
                                ...prev,
                                recipientGroups: [...prev.recipientGroups, group]
                              }));
                            } else {
                              setMessageForm(prev => ({
                                ...prev,
                                recipientGroups: prev.recipientGroups.filter(g => g !== group)
                              }));
                            }
                          }}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{group}</span>
                      </label>
                    ))}
                  </div>
                  
                  {messageForm.recipientGroups.length > 0 && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Selected Groups:</div>
                      <div className="space-y-1">
                        {messageForm.recipientGroups.map(group => (
                          <div key={group} className="text-sm text-blue-700 dark:text-blue-400">• {group}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Additional Recipients (Optional)
                  </label>
                  <textarea
                    value={messageForm.recipients}
                    onChange={(e) => setMessageForm(prev => ({ ...prev, recipients: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email addresses separated by commas"
                  />
                </div>

                <button
                  onClick={handleSendMessage}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  {messageForm.scheduledAt ? <Clock className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                  {messageForm.scheduledAt ? 'Schedule Message' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Messages List (Sent & Scheduled) */}
        {(activeTab === 'sent' || activeTab === 'scheduled') && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            {/* Filters */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="sent">Sent</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="failed">Failed</option>
                  </select>
                  
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="notification">Notification</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredMessages
                .filter(message => activeTab === 'sent' ? message.status === 'sent' : message.status === 'scheduled')
                .map(message => (
                <div key={message.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getTypeIcon(message.type)}
                        <h3 className="font-medium text-slate-900 dark:text-white">{message.subject}</h3>
                        {getStatusIcon(message.status)}
                        <span className="capitalize text-sm text-slate-500 dark:text-slate-400">{message.status}</span>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-2">
                        {message.content}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {message.recipientGroups.map(group => (
                          <span key={group} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {group}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {message.status === 'sent' && message.sentAt && (
                          <span>Sent: {message.sentAt.toLocaleString()}</span>
                        )}
                        {message.status === 'scheduled' && message.scheduledAt && (
                          <span>Scheduled: {message.scheduledAt.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                    
                   <div className="flex items-center gap-2">
  {/* View */}
  <button
    onClick={() => alert(`Viewing message:\n\n${message.subject}\n\n${message.content}`)}
    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
  >
    <Eye className="w-4 h-4" />
  </button>

  {/* Copy */}
  <button
    onClick={() => {
      navigator.clipboard.writeText(message.content);
      alert("Message copied to clipboard!");
    }}
    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
  >
    <Copy className="w-4 h-4" />
  </button>

  {/* Edit */}
  <button
    onClick={() => {
      setMessageForm({
        subject: message.subject,
        content: message.content,
        type: message.type,
        recipientGroups: message.recipientGroups,
        recipients: message.recipients.join(", "),
        scheduledAt: message.scheduledAt ? message.scheduledAt.toISOString().slice(0,16) : "",
        selectedTemplate: message.template || "",
        attachments: message.attachments || []
      });
      setActiveTab("compose");
    }}
    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
  >
    <Edit className="w-4 h-4" />
  </button>

  {/* Delete */}
  <button
    onClick={() => setMessages(prev => prev.filter(m => m.id !== message.id))}
    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
  >
    <Trash2 className="w-4 h-4" />
  </button>
</div>

                  </div>
                </div>
              ))}
            </div>

            {filteredMessages.filter(message => 
              activeTab === 'sent' ? message.status === 'sent' : message.status === 'scheduled'
            ).length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  No {activeTab} messages
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  {activeTab === 'sent' 
                    ? 'Messages you send will appear here' 
                    : 'Scheduled messages will appear here'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationHub;