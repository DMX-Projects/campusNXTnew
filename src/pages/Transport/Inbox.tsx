import React, { useState } from 'react';
import { Mail, Clock, AlertCircle, CheckCircle, X, Send, Paperclip, Image, Trash2 } from 'lucide-react';

// Mock data for demonstration
const messages = [
  {
    id: 1,
    from: 'John Doe',
    subject: 'Project Update Required',
    preview: 'Hi there, I wanted to follow up on the project status and see if you have any updates...',
    date: '2 hours ago',
    priority: 'high',
    isRead: false
  },
  {
    id: 2,
    from: 'Sarah Wilson',
    subject: 'Meeting Reschedule',
    preview: 'Hope you\'re doing well. I need to reschedule our meeting for tomorrow due to...',
    date: '5 hours ago',
    priority: 'medium',
    isRead: true
  },
  {
    id: 3,
    from: 'Mike Johnson',
    subject: 'Weekly Report',
    preview: 'Please find attached the weekly report for your review. Let me know if you have any...',
    date: '1 day ago',
    priority: 'low',
    isRead: false
  }
];

function ComposeMail({ isOpen, onClose, onSend }) {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const [attachments, setAttachments] = useState([]);

  const handleSubmit = () => {
    // Basic validation
    if (!formData.to || !formData.subject || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    const messageWithAttachments = {
      ...formData,
      attachments: attachments
    };
    
    onSend(messageWithAttachments);
    setFormData({ to: '', subject: '', message: '', priority: 'medium' });
    setAttachments([]);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`);
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Please select an image under 5MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const newAttachment = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          preview: event.target.result
        };
        
        setAttachments(prev => [...prev, newAttachment]);
      };
      reader.readAsDataURL(file);
    });
    
    // Clear the input
    e.target.value = '';
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: -50,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  };

  return (
    <div style={overlayStyle}>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Compose Message</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input
              type="email"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="recipient@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Paperclip className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Attach Images</span>
                </label>
                <span className="text-xs text-gray-500">Max 5MB per image</span>
              </div>

              {attachments.length > 0 && (
                <div className="space-y-2">
                  {attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <img
                          src={attachment.preview}
                          alt={attachment.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {attachment.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(attachment.size)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeAttachment(attachment.id)}
                        className="flex-shrink-0 p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Inbox() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [messageList, setMessageList] = useState(messages);

  const priorityColors = {
    high: 'text-red-600 bg-red-50',
    medium: 'text-yellow-600 bg-yellow-50',
    low: 'text-green-600 bg-green-50',
  };

  const unreadCount = messageList.filter(msg => !msg.isRead).length;

  const handleSendMessage = (messageData) => {
    // Here you would typically send the message to your backend
    console.log('Sending message:', messageData);
    
    // Log attachments if any
    if (messageData.attachments && messageData.attachments.length > 0) {
      console.log('Attachments:', messageData.attachments);
    }
    
    // For demo purposes, we'll just show an alert
    const attachmentText = messageData.attachments && messageData.attachments.length > 0 
      ? ` with ${messageData.attachments.length} attachment(s)` 
      : '';
    alert(`Message sent to ${messageData.to} with subject: ${messageData.subject}${attachmentText}`);
  };

  const handleMessageClick = (messageId) => {
    setMessageList(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
          </h3>
          <p className="text-sm text-gray-600">
           
          </p>
        </div>
        <button 
          onClick={() => setIsComposeOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Compose Message
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {messageList.map((message) => (
            <div
              key={message.id}
              onClick={() => handleMessageClick(message.id)}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                !message.isRead ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm font-medium ${!message.isRead ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}>
                      {message.from}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[message.priority]}`}>
                        {message.priority}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {message.date}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className={`text-sm mb-1 ${!message.isRead ? 'font-semibold text-gray-900' : 'text-gray-800'}`}>
                    {message.subject}
                  </h3>
                  
                  <p className="text-sm text-gray-600 truncate">
                    {message.preview}
                  </p>
                </div>
                
                {!message.isRead && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ComposeMail 
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={handleSendMessage}
      />
    </div>
  );
}