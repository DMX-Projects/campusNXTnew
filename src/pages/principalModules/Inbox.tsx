



import React, { useState } from 'react';
import { Moon, Sun, Send, X, MailIcon } from 'lucide-react';

type Message = {
  id: number;
  sender: string;
  subject: string;
  date: string;
  status: 'Read' | 'Unread';
};

const sampleMessages: Message[] = [
  { id: 1, sender: 'Dean', subject: 'Meeting Update', date: '2025-09-17', status: 'Unread' },
  { id: 2, sender: 'Library', subject: 'Book Due', date: '2025-09-16', status: 'Read' },
  { id: 3, sender: 'Registrar', subject: 'Exam Schedule', date: '2025-09-15', status: 'Unread' },
  { id: 4, sender: 'Finance', subject: 'Payment Reminder', date: '2025-09-14', status: 'Read' },
  { id: 5, sender: 'IT Support', subject: 'System Maintenance', date: '2025-09-13', status: 'Unread' },
];

const Inbox: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [selected, setSelected] = useState<Message | null>(null);
  const [filter, setFilter] = useState<{ sender?: string, status?: string, date?: string }>({});
  const [composeData, setComposeData] = useState({ to: '', subject: '', message: '' });

  const filteredMessages = sampleMessages.filter(msg =>
    (!filter.sender || msg.sender.toLowerCase().includes(filter.sender.toLowerCase())) &&
    (!filter.status || msg.status === filter.status) &&
    (!filter.date || msg.date === filter.date)
  );

  const handleSendMessage = () => {
    // Handle send logic here
    console.log('Sending message:', composeData);
    setShowCompose(false);
    setComposeData({ to: '', subject: '', message: '' });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-4 lg:p-6 transition-colors duration-300`}>
      {/* Header with Theme Toggle */}
       <div className="flex items-center gap-1 mb-6">
            <MailIcon className={`w-6 h-6 ${isDark ? 'text-white' : 'text-blue-600'}`} />
            <div></div>
    <h1 className="text-xl lg:text-1xl font-semibold">Inbox</h1>
    </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Left Compose Section */}
        <aside className={`w-full lg:w-1/4 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <button
            onClick={() => setShowCompose(true)}
            className="w-full lg:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Compose
          </button>

          {/* Mobile message count */}
          <div className="mt-4 lg:hidden">
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {filteredMessages.length} messages
            </p>
          </div>
        </aside>

        {/* Right: Message List & Read Panel */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            <input
              type="text"
              className={`p-3 rounded-lg border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Filter by sender"
              value={filter.sender || ''}
              onChange={e => setFilter(f => ({ ...f, sender: e.target.value }))}
            />
            <select
              className={`p-3 rounded-lg border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              value={filter.status || ''}
              onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
            >
              <option value="">All Status</option>
              <option value="Read">Read</option>
              <option value="Unread">Unread</option>
            </select>
            <input
              type="date"
              className={`p-3 rounded-lg border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              value={filter.date || ''}
              onChange={e => setFilter(f => ({ ...f, date: e.target.value }))}
            />
          </div>

          {/* Message List - Mobile Cards / Desktop Table */}
          <div className="space-y-4">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-auto rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-sm">
              <table className={`min-w-full text-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <thead>
                  <tr className={`${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'}`}>
                    <th className="py-4 px-6 text-left font-semibold">Sender</th>
                    <th className="py-4 px-6 text-left font-semibold">Subject</th>
                    <th className="py-4 px-6 text-left font-semibold">Date</th>
                    <th className="py-4 px-6 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.length === 0 ? (
                    <tr>
                      <td colSpan={4} className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        No messages found
                      </td>
                    </tr>
                  ) : (
                    filteredMessages.map(msg => (
                      <tr
                        key={msg.id}
                        className={`cursor-pointer border-b transition-colors ${
                          isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                        } ${
                          selected?.id === msg.id 
                            ? isDark ? 'bg-blue-900/50' : 'bg-blue-50' 
                            : ''
                        }`}
                        onClick={() => setSelected(msg)}
                      >
                        <td className="py-4 px-6">{msg.sender}</td>
                        <td className="py-4 px-6 truncate max-w-xs">{msg.subject}</td>
                        <td className="py-4 px-6">{msg.date}</td>
                        <td className={`py-4 px-6 ${
                          msg.status === 'Unread' 
                            ? 'font-semibold text-blue-600' 
                            : isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {msg.status}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3">
              {filteredMessages.length === 0 ? (
                <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  No messages found
                </div>
              ) : (
                filteredMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50'
                    } ${
                      selected?.id === msg.id 
                        ? isDark ? 'ring-2 ring-blue-500' : 'ring-2 ring-blue-500' 
                        : ''
                    }`}
                    onClick={() => setSelected(msg)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{msg.sender}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        msg.status === 'Unread' 
                          ? 'bg-blue-100 text-blue-800' 
                          : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                    <p className="font-medium mb-1 truncate">{msg.subject}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {msg.date}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Message Reading Panel */}
          {selected && (
            <div className={`mt-6 border rounded-lg p-6 ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } shadow-sm`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">From: {selected.sender}</h3>
                <button 
                  className={`p-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setSelected(null)}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-2 mb-4">
                <p><span className="font-medium">Subject:</span> {selected.subject}</p>
                <p><span className="font-medium">Date:</span> {selected.date}</p>
                <p><span className="font-medium">Status:</span> 
                  <span className={`ml-2 ${
                    selected.status === 'Unread' ? 'text-blue-600 font-semibold' : ''
                  }`}>
                    {selected.status}
                  </span>
                </p>
              </div>
              <div className={`${isDark ? 'text-gray-200' : 'text-gray-700'} leading-relaxed`}>
                <p>This is the detailed message content from {selected.sender} regarding "{selected.subject}". 
                The full message content would be displayed here with proper formatting and styling.</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-lg rounded-lg p-6 shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">New Message</h2>
              <button 
                onClick={() => setShowCompose(false)}
                className={`p-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                className={`w-full p-3 border rounded-lg ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="To"
                value={composeData.to}
                onChange={e => setComposeData(prev => ({ ...prev, to: e.target.value }))}
              />
              <input
                type="text"
                className={`w-full p-3 border rounded-lg ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Subject"
                value={composeData.subject}
                onChange={e => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
              />
              <textarea
                className={`w-full p-3 border rounded-lg resize-none ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Type your message here..."
                rows={6}
                value={composeData.message}
                onChange={e => setComposeData(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowCompose(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Cancel
              </button>
              <button 
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Send size={16} />
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default Inbox;