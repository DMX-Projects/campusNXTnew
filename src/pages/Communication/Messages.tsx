import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'system';
  isOwn: boolean;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  reactions?: string[];
}

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
}

const Messages: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState("You");
  const [isTyping, setIsTyping] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const users: User[] = [
    { id: "you", name: "You", avatar: "👤", isOnline: true },
    { id: "alice", name: "Alice", avatar: "👩", isOnline: true },
    { id: "bob", name: "Bob", avatar: "👨", isOnline: false, lastSeen: new Date(Date.now() - 30 * 60 * 1000) },
    { id: "charlie", name: "Charlie", avatar: "🧑", isOnline: true }
  ];

  const emojis = ['😀', '😂', '❤️', '👍', '👎', '😢', '😡', '🤔', '👏', '🎉', '🔥', '💯'];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate other users sending messages
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        simulateIncomingMessage();
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [nextId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const simulateIncomingMessage = () => {
    const randomUser = users[Math.floor(Math.random() * (users.length - 1)) + 1];
    const randomMessages = [
      "Hey there! How's it going?",
      "Just checking in 👋",
      "Did you see the latest update?",
      "Working on something interesting",
      "Coffee break time! ☕",
      "Anyone up for a quick call?",
      "Thanks for the help earlier!",
      "Looking forward to the meeting"
    ];

    const newMessage: Message = {
      id: nextId,
      text: randomMessages[Math.floor(Math.random() * randomMessages.length)],
      sender: randomUser.name,
      timestamp: new Date(),
      type: 'text',
      isOwn: false,
      status: 'delivered',
      reactions: []
    };

    setMessages(prev => [...prev, newMessage]);
    setNextId(prev => prev + 1);

    // Show typing indicator briefly before message
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const handleSend = () => {
    if (message.trim() === "" && !selectedFile) return;

    const newMessage: Message = {
      id: nextId,
      text: message.trim(),
      sender: currentUser,
      timestamp: new Date(),
      type: selectedFile ? 'file' : 'text',
      isOwn: true,
      status: 'sending',
      reactions: []
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    setSelectedFile(null);
    setReplyTo(null);
    setNextId(prev => prev + 1);

    // Simulate message status updates
    setTimeout(() => updateMessageStatus(newMessage.id, 'sent'), 500);
    setTimeout(() => updateMessageStatus(newMessage.id, 'delivered'), 1000);
    setTimeout(() => updateMessageStatus(newMessage.id, 'read'), 2000);
  };

  const updateMessageStatus = (messageId: number, status: Message['status']) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, status } : msg
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const addReaction = (messageId: number, emoji: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, reactions: [...(msg.reactions || []), emoji] }
          : msg
      )
    );
  };

  const deleteMessage = (messageId: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending': return '⏳';
      case 'sent': return '✓';
      case 'delivered': return '✓✓';
      case 'read': return '👁️';
      default: return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen p-4">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Team Chat</h1>
                <div className="flex items-center space-x-2 text-sm text-indigo-100">
                  <div className="flex -space-x-2">
                    {users.filter(u => u.isOnline).map((user, idx) => (
                      <div key={user.id} className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-xs border-2 border-white">
                        {user.avatar}
                      </div>
                    ))}
                  </div>
                  <span>{users.filter(u => u.isOnline).length} online</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                📞
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                📹
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                ⚙️
              </button>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">💬</span>
              </div>
              <p className="text-gray-500 text-lg">Start the conversation!</p>
              <p className="text-gray-400 text-sm mt-2">Send your first message to begin chatting</p>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => {
                const showAvatar = index === 0 || messages[index - 1].sender !== msg.sender;
                const showTimestamp = index === 0 || 
                  (msg.timestamp.getTime() - messages[index - 1].timestamp.getTime()) > 300000;

                return (
                  <div key={msg.id}>
                    {showTimestamp && (
                      <div className="text-center text-xs text-gray-400 my-4">
                        {msg.timestamp.toLocaleDateString() === new Date().toLocaleDateString() 
                          ? `Today at ${formatTime(msg.timestamp)}`
                          : msg.timestamp.toLocaleDateString()
                        }
                      </div>
                    )}
                    
                    <div className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} group`}>
                      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        
                        {!msg.isOwn && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                            {showAvatar ? (
                              users.find(u => u.name === msg.sender)?.avatar || msg.sender[0]
                            ) : ''}
                          </div>
                        )}

                        <div className="flex flex-col">
                          {!msg.isOwn && showAvatar && (
                            <span className="text-xs text-gray-500 mb-1 ml-2">
                              {msg.sender}
                            </span>
                          )}
                          
                          <div 
                            className={`relative px-4 py-2 rounded-2xl shadow-sm ${
                              msg.isOwn 
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                                : 'bg-white border border-gray-200 text-gray-800'
                            } ${msg.isOwn ? 'rounded-br-md' : 'rounded-bl-md'}`}
                          >
                            {replyTo && msg.id === nextId - 1 && (
                              <div className="text-xs opacity-70 border-l-2 border-white/30 pl-2 mb-2">
                                Replying to: {replyTo.text.substring(0, 30)}...
                              </div>
                            )}
                            
                            <p className="break-words">{msg.text}</p>
                            
                            {selectedFile && msg.id === messages[messages.length - 1].id && (
                              <div className="mt-2 p-2 bg-black/10 rounded-lg flex items-center space-x-2">
                                <span>📎</span>
                                <span className="text-sm">{selectedFile.name}</span>
                              </div>
                            )}

                            {msg.reactions && msg.reactions.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {[...new Set(msg.reactions)].map((emoji, idx) => (
                                  <span key={idx} className="text-xs bg-black/10 rounded-full px-2 py-1">
                                    {emoji} {msg.reactions!.filter(r => r === emoji).length}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className={`flex items-center mt-1 space-x-2 text-xs text-gray-400 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                            <span>{formatTime(msg.timestamp)}</span>
                            {msg.isOwn && (
                              <span className="flex items-center space-x-1">
                                <span>{getStatusIcon(msg.status)}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Message Actions */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col space-y-1">
                          <button
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="p-1 hover:bg-gray-200 rounded text-xs"
                          >
                            😊
                          </button>
                          <button
                            onClick={() => setReplyTo(msg)}
                            className="p-1 hover:bg-gray-200 rounded text-xs"
                          >
                            ↩️
                          </button>
                          {msg.isOwn && (
                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="p-1 hover:bg-red-200 rounded text-xs text-red-500"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                      <div className="flex flex-wrap gap-2 mt-2 p-3 bg-white rounded-xl shadow-lg border max-w-xs">
                        {emojis.map(emoji => (
                          <button
                            key={emoji}
                            onClick={() => {
                              addReaction(msg.id, emoji);
                              setShowEmojiPicker(false);
                            }}
                            className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-500">Someone is typing...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Reply Preview */}
        {replyTo && (
          <div className="px-4 py-2 bg-blue-50 border-l-4 border-blue-400 flex items-center justify-between">
            <div className="text-sm">
              <span className="text-blue-600 font-medium">Replying to {replyTo.sender}:</span>
              <p className="text-gray-600 truncate">{replyTo.text}</p>
            </div>
            <button
              onClick={() => setReplyTo(null)}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* File Preview */}
        {selectedFile && (
          <div className="px-4 py-2 bg-green-50 border-l-4 border-green-400 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>📎</span>
              <span className="text-sm text-green-700">{selectedFile.name}</span>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200 rounded-b-3xl">
          <div className="flex items-end space-x-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              📎
            </button>

            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message... (Press Enter to send)"
                className="w-full p-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent resize-none max-h-32"
                rows={1}
                style={{ minHeight: '48px' }}
              />
              
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                😊
              </button>
            </div>

            <button
              onClick={handleSend}
              disabled={message.trim() === "" && !selectedFile}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>{message.length}/1000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;