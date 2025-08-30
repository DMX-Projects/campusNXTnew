import React, { useState, useEffect } from "react";

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

const Notification: React.FC = () => {
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedType, setSelectedType] = useState<'success' | 'warning' | 'error' | 'info'>('info');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [nextId, setNextId] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleSend = () => {
    if (message.trim() === "") return;
    
    const newNotification: Notification = {
      id: nextId,
      message: message.trim(),
      type: selectedType,
      timestamp: new Date(),
      isRead: false,
      priority: selectedPriority
    };
    
    setNotifications([newNotification, ...notifications]);
    setMessage("");
    setNextId(nextId + 1);
    
    // Play notification sound
    if (soundEnabled) {
      playNotificationSound();
    }
    
    // Auto-clear low priority notifications after 10 seconds
    if (selectedPriority === 'low') {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 10000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = selectedType === 'error' ? 400 : 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return timestamp.toLocaleDateString();
  };

  const getTypeConfig = (type: string) => {
    const configs = {
      success: { 
        icon: "✅", 
        bg: "bg-green-50 border-green-200", 
        text: "text-green-800",
        badge: "bg-green-100 text-green-800"
      },
      warning: { 
        icon: "⚠️", 
        bg: "bg-yellow-50 border-yellow-200", 
        text: "text-yellow-800",
        badge: "bg-yellow-100 text-yellow-800"
      },
      error: { 
        icon: "❌", 
        bg: "bg-red-50 border-red-200", 
        text: "text-red-800",
        badge: "bg-red-100 text-red-800"
      },
      info: { 
        icon: "🔔", 
        bg: "bg-blue-50 border-blue-200", 
        text: "text-blue-800",
        badge: "bg-blue-100 text-blue-800"
      }
    };
    return configs[type as keyof typeof configs];
  };

  const getPriorityConfig = (priority: string) => {
    const configs = {
      low: { color: "text-gray-500", bg: "bg-gray-100" },
      medium: { color: "text-blue-500", bg: "bg-blue-100" },
      high: { color: "text-red-500", bg: "bg-red-100" }
    };
    return configs[priority as keyof typeof configs];
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'read') return n.isRead;
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-100 min-h-screen">
      <div className="bg-white rounded-3xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Notification Center
            {unreadCount > 0 && (
              <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                {unreadCount} unread
              </span>
            )}
          </h1>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-colors ${
                soundEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}
              title={soundEnabled ? 'Sound On' : 'Sound Off'}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
            
            {notifications.length > 0 && (
              <>
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                >
                  Mark All Read
                </button>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                >
                  Clear All
                </button>
              </>
            )}
          </div>
        </div>

        {/* Create Notification */}
        <div className="mb-6 p-6 bg-gray-50 rounded-2xl">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Create Notification</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                <option value="info">Info </option>
                <option value="success">Success </option>
                <option value="warning">Warning </option>
                <option value="error">Error </option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Priority</label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value as any)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                <option value="low">Low (Auto-clear)</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your notification message... (Press Enter to send)"
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 mb-4"
            maxLength={200}
          />
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {message.length}/200 characters
            </span>
            <button
              onClick={handleSend}
              disabled={message.trim() === ""}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Send Notification
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        {notifications.length > 0 && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-medium text-gray-600">Filter:</span>
            {['all', 'unread', 'read'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filter === f 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🔔</span>
              </div>
              <p className="text-gray-500 text-lg">
                {filter === 'all' ? 'No notifications yet.' : `No ${filter} notifications.`}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const typeConfig = getTypeConfig(notification.type);
              const priorityConfig = getPriorityConfig(notification.priority);
              
              return (
                <div
                  key={notification.id}
                  className={`group relative p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                    typeConfig.bg
                  } ${notification.isRead ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-xl mt-1">{typeConfig.icon}</span>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeConfig.badge}`}>
                            {notification.type.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.bg} ${priorityConfig.color}`}>
                            {notification.priority.toUpperCase()}
                          </span>
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          )}
                        </div>
                        
                        <p className={`${typeConfig.text} leading-relaxed mb-2`}>
                          {notification.message}
                        </p>
                        
                        <p className="text-xs text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          👁️
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-500"
                        title="Delete notification"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;