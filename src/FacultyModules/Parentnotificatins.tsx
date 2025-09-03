

import React, { useState } from 'react';
import {
  Bell,
  Send,
  Users,
  Calendar,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Save,
  ArrowLeft,
} from 'lucide-react';

type NotificationTypeValue = 'info' | 'warning' | 'alert' | 'success';

interface NotificationType {
  value: NotificationTypeValue;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  textColor: string;
  borderColor: string;
  bgColor: string;
}

interface Template {
  id: number;
  name: string;
  type: NotificationTypeValue;
  subject: string;
  message: string;
  createdDate: string;
  lastUsed: string | null;
}

interface Student {
  id: number;
  name: string;
  rollNo: string;
  class: string;
  parentName: string;
  parentEmail: string;
}

interface SentNotification {
  id: number;
  title: string;
  type: NotificationTypeValue;
  recipients: number;
  sentDate: string;
  status: string;
  readCount: number;
}

const ParentNotifications: React.FC = () => {
  const userRole = 'faculty'; // Example role

  const [activeTab, setActiveTab] = useState<'compose' | 'sent' | 'templates'>('compose');
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [notificationType, setNotificationType] = useState<NotificationTypeValue>('info');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  // Templates without Fee Payment Reminder template
  const [templates, setTemplates] = useState<Template[]>([
    // Removed fee payment reminder template (id: 1)
    {
      id: 2,
      name: 'Exam Schedule Notification',
      type: 'info',
      subject: 'Upcoming Examination Schedule',
      message:
        'Dear Parent,\n\nWe would like to inform you about the upcoming examination schedule for your child. Please ensure they are well-prepared.\n\nBest regards,\nAcademic Office',
      createdDate: '2024-01-08',
      lastUsed: '2024-01-15',
    },
    {
      id: 3,
      name: 'Academic Performance Alert',
      type: 'alert',
      subject: 'Academic Performance - Immediate Attention Required',
      message:
        "Dear Parent,\n\nWe need to discuss your child's academic performance. Please schedule a meeting with the class teacher at your earliest convenience.\n\nRegards,\nAcademic Coordinator",
      createdDate: '2024-01-05',
      lastUsed: '2024-01-13',
    },
  ]);

  const [templateForm, setTemplateForm] = useState({
    name: '',
    type: 'info' as NotificationTypeValue,
    subject: '',
    message: '',
  });

  const students: Student[] = [
    { id: 1, name: 'John Smith', rollNo: 'CS001', class: 'CSE 3rd Year', parentName: 'Robert Smith', parentEmail: 'robert.smith@email.com' },
    { id: 2, name: 'Emma Johnson', rollNo: 'EE002', class: 'EEE 2nd Year', parentName: 'Lisa Johnson', parentEmail: 'lisa.johnson@email.com' },
    { id: 3, name: 'Michael Brown', rollNo: 'ME003', class: 'Mech 4th Year', parentName: 'David Brown', parentEmail: 'david.brown@email.com' },
    { id: 4, name: 'Sarah Davis', rollNo: 'CE004', class: 'Civil 1st Year', parentName: 'Mary Davis', parentEmail: 'mary.davis@email.com' },
  ];

  // Sent notifications without fee payment reminder
  const sentNotifications: SentNotification[] = [
    {
      id: 1,
      title: 'Mid-Term Examination Schedule',
      type: 'info',
      recipients: 45,
      sentDate: '2024-01-15',
      status: 'delivered',
      readCount: 42,
    },
    // Removed Fee Payment Reminder sent notification (id: 2)
    {
      id: 3,
      title: 'Academic Performance Alert',
      type: 'alert',
      recipients: 8,
      sentDate: '2024-01-13',
      status: 'delivered',
      readCount: 8,
    },
  ];

  // Notification types excluding 'warning' (fee payment reminder)
  const notificationTypes: NotificationType[] = [
    { value: 'info', label: 'Information', icon: Info, color: 'bg-blue-500', textColor: 'text-blue-600', borderColor: 'border-blue-500', bgColor: 'bg-blue-50' },
    // Warning type removed
    // { value: 'warning', label: 'Warning', icon: AlertTriangle, color: 'bg-yellow-500', textColor: 'text-yellow-600', borderColor: 'border-yellow-500', bgColor: 'bg-yellow-50' },
    { value: 'alert', label: 'Alert', icon: AlertTriangle, color: 'bg-red-500', textColor: 'text-red-600', borderColor: 'border-red-500', bgColor: 'bg-red-50' },
    { value: 'success', label: 'Success', icon: CheckCircle, color: 'bg-green-500', textColor: 'text-green-600', borderColor: 'border-green-500', bgColor: 'bg-green-50' },
  ];

  const handleStudentSelection = (studentId: number) => {
    setSelectedStudents((prev) => (prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]));
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((s) => s.id));
    }
  };

  const getTypeConfig = (type: NotificationTypeValue) => notificationTypes.find((t) => t.value === type);

  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    setTemplateForm({
      name: '',
      type: 'info',
      subject: '',
      message: '',
    });
    setShowTemplateForm(true);
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setTemplateForm({
      name: template.name,
      type: template.type,
      subject: template.subject,
      message: template.message,
    });
    setShowTemplateForm(true);
  };

  const handleSaveTemplate = () => {
    if (!templateForm.name || !templateForm.subject || !templateForm.message) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingTemplate) {
      setTemplates((prev) => prev.map((t) => (t.id === editingTemplate.id ? { ...t, ...templateForm } : t)));
    } else {
      const newTemplate: Template = {
        id: templates.length + 1,
        ...templateForm,
        createdDate: new Date().toISOString().split('T')[0],
        lastUsed: null,
      };
      setTemplates((prev) => [...prev, newTemplate]);
    }

    setShowTemplateForm(false);
    setEditingTemplate(null);
    setTemplateForm({
      name: '',
      type: 'info',
      subject: '',
      message: '',
    });
  };

  const handleDeleteTemplate = (templateId: number) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setTemplates((prev) => prev.filter((t) => t.id !== templateId));
    }
  };

  const handleUseTemplate = (template: Template) => {
    setActiveTab('compose');
    setNotificationType(template.type);
    alert(`Template "${template.name}" loaded in compose tab!`);
  };

  const handleCancelTemplate = () => {
    setShowTemplateForm(false);
    setEditingTemplate(null);
    setTemplateForm({
      name: '',
      type: 'info',
      subject: '',
      message: '',
    });
  };

  const handleSaveDraft = () => {
    alert('Notification draft saved!');
  };

  const handlePreview = () => {
    alert('Preview not implemented yet!');
  };

  const handleSendNotification = () => {
    alert('Notification sent!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-3 rounded-lg">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Parent Notifications</h1>
                  <p className="text-gray-600">Send important alerts and updates to parents</p>
                  {/* <p className="text-sm text-gray-500 mt-1 italic">Current user role: {userRole}</p> */}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">{students.length} Students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'compose', label: 'Compose Notification', icon: Plus },
                { id: 'sent', label: 'Sent Notifications', icon: Eye },
                { id: 'templates', label: 'Templates', icon: Edit },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {activeTab === 'compose' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Student Selection */}
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Select Recipients</h3>

                  {/* Search and Select All */}
                  <div className="space-y-4 mb-4">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <button
                      onClick={handleSelectAll}
                      className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">{selectedStudents.length === students.length ? 'Deselect All' : 'Select All'}</span>
                      <span className="text-xs text-gray-500">{students.length} students</span>
                    </button>
                  </div>

                  {/* Student List */}
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {students
                      .filter(
                        (student) =>
                          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((student) => (
                        <div
                          key={student.id}
                          onClick={() => handleStudentSelection(student.id)}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            selectedStudents.includes(student.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
                              <p className="text-xs text-gray-500">
                                {student.rollNo} • {student.class}
                              </p>
                              <p className="text-xs text-gray-400">{student.parentName}</p>
                            </div>
                            <div
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                selectedStudents.includes(student.id) ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                              }`}
                            >
                              {selectedStudents.includes(student.id) && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">
                      {selectedStudents.length} recipient{selectedStudents.length !== 1 ? 's' : ''} selected
                    </p>
                  </div>
                </div>

                {/* Notification Form */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Compose Notification</h3>

                  <div className="space-y-6">
                    {/* Notification Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notification Type</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {notificationTypes.map((type) => {
                          const IconComponent = type.icon;
                          return (
                            <button
                              key={type.value}
                              onClick={() => setNotificationType(type.value)}
                              className={`p-3 border-2 rounded-lg flex flex-col items-center space-y-1 transition-all ${
                                notificationType === type.value ? `${type.borderColor} ${type.bgColor}` : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <IconComponent className={`w-5 h-5 ${notificationType === type.value ? type.textColor : 'text-gray-400'}`} />
                              <span className={`text-xs font-medium ${notificationType === type.value ? type.textColor : 'text-gray-600'}`}>
                                {type.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        placeholder="Enter notification subject..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        rows={8}
                        placeholder="Enter your message here..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    {/* Schedule Options */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Options</label>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="radio" name="delivery" value="immediate" defaultChecked className="mr-2" />
                          <span className="text-sm text-gray-700">Send immediately</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="delivery" value="scheduled" className="mr-2" />
                          <span className="text-sm text-gray-700">Schedule for later</span>
                        </label>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <button onClick={handleSaveDraft} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                        Save as Draft
                      </button>
                      <div className="flex items-center space-x-3">
                        <button onClick={handlePreview} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                          Preview
                        </button>
                        <button
                          onClick={handleSendNotification}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send Notification</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sent' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Sent Notifications</h3>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search notifications..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="all">All Types</option>
                    <option value="info">Information</option>
                    {/* Warning option removed */}
                    <option value="alert">Alert</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {sentNotifications.map((notification) => {
                  const typeConfig = getTypeConfig(notification.type);
                  const IconComponent = typeConfig?.icon || Info;

                  return (
                    <div key={notification.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`p-2 rounded-lg ${typeConfig?.color || 'bg-blue-500'}`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 mb-1">{notification.title}</h4>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>Sent to {notification.recipients} parents</span>
                              <span>•</span>
                              <span>{notification.readCount} read</span>
                              <span>•</span>
                              <span>{notification.sentDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {notification.status}
                          </span>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Read Rate</span>
                          <span>{Math.round((notification.readCount / notification.recipients) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(notification.readCount / notification.recipients) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="p-6">
              {!showTemplateForm ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Notification Templates</h3>
                    <button
                      onClick={handleCreateTemplate}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Template</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => {
                      const typeConfig = getTypeConfig(template.type);
                      const IconComponent = typeConfig?.icon || Info;

                      return (
                        <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <div className={`p-2 rounded-lg ${typeConfig?.color || 'bg-blue-500'}`}>
                                <IconComponent className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{template.name}</h4>
                                <span className={`text-xs px-2 py-1 rounded-full ${typeConfig?.textColor} ${typeConfig?.bgColor}`}>
                                  {typeConfig?.label}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button onClick={() => handleEditTemplate(template)} className="p-1 text-gray-400 hover:text-blue-600">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeleteTemplate(template.id)} className="p-1 text-gray-400 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-1">{template.subject}</h5>
                            <p className="text-xs text-gray-600 line-clamp-3">{template.message}</p>
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span>Created: {template.createdDate}</span>
                            {template.lastUsed && <span>Last used: {template.lastUsed}</span>}
                          </div>

                          <button
                            onClick={() => handleUseTemplate(template)}
                            className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            Use Template
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {templates.length === 0 && (
                    <div className="text-center py-12">
                      <Edit className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Templates Yet</h3>
                      <p className="text-gray-600 mb-4">Create your first notification template to get started</p>
                      <button onClick={handleCreateTemplate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Create Template
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleCancelTemplate}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <h3 className="text-lg font-medium text-gray-900">{editingTemplate ? 'Edit Template' : 'Create Template'}</h3>
                    </div>
                  </div>

                  <div className="max-w-2xl space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Template Name *</label>
                      <input
                        type="text"
                        placeholder="Enter template name..."
                        value={templateForm.name}
                        onChange={(e) => setTemplateForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notification Type *</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {notificationTypes.map((type) => {
                          const IconComponent = type.icon;
                          return (
                            <button
                              key={type.value}
                              onClick={() => setTemplateForm((prev) => ({ ...prev, type: type.value }))}
                              className={`p-3 border-2 rounded-lg flex flex-col items-center space-y-1 transition-all ${
                                templateForm.type === type.value ? `${type.borderColor} ${type.bgColor}` : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <IconComponent className={`w-5 h-5 ${templateForm.type === type.value ? type.textColor : 'text-gray-400'}`} />
                              <span className={`text-xs font-medium ${templateForm.type === type.value ? type.textColor : 'text-gray-600'}`}>
                                {type.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                      <input
                        type="text"
                        placeholder="Enter notification subject..."
                        value={templateForm.subject}
                        onChange={(e) => setTemplateForm((prev) => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <textarea
                        rows={10}
                        placeholder={`Enter your message template here...

You can use placeholders like:
- {student_name}
- {parent_name}
- {class}
- {roll_number}`}
                        value={templateForm.message}
                        onChange={(e) => setTemplateForm((prev) => ({ ...prev, message: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Tip: Use placeholders like {'{student_name}'}, {'{parent_name}'} to personalize messages
                      </p>
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                      <button
                        onClick={handleCancelTemplate}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveTemplate}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>{editingTemplate ? 'Update Template' : 'Save Template'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentNotifications;
