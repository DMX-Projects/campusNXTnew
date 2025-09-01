import React from 'react';
import { Mail, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { messages } from './data/mockData';

export default function Inbox() {
  const priorityColors = {
    high: 'text-red-600 bg-red-50',
    medium: 'text-yellow-600 bg-yellow-50',
    low: 'text-green-600 bg-green-50',
  };

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800"></h3>
          <p className="text-sm text-gray-600"></p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Compose Message
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {messages.map((message) => (
            <div
              key={message.id}
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
    </div>
  );
}