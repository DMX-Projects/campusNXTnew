import React, { useState, useEffect, useRef } from 'react';
import { 
  SendIcon, 
  PaperclipIcon, 
  SmileIcon, 
  PhoneIcon, 
  VideoIcon,
  MoreVerticalIcon,
  SearchIcon,
  CheckIcon,
  CheckCheckIcon,
  ImageIcon,
  FileTextIcon,
  DownloadIcon,
  MicIcon,
  CameraIcon,
  CalendarIcon
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'student' | 'mentor';
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'audio' | 'video';
  fileName?: string;
  fileSize?: string;
  fileUrl?: string;
  isRead: boolean;
  isDelivered: boolean;
  replyTo?: string;
}

interface ChatRoom {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorTitle: string;
  mentorDepartment: string;
  mentorAvatar: string;
  isOnline: boolean;
  lastSeen: string;
  unreadCount: number;
  lastMessage: Message | null;
  isTyping: boolean;
  chatType: 'academic' | 'career' | 'personal' | 'project';
}

const ChatWithMentorStu: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      id: '1',
      mentorId: 'mentor1',
      mentorName: 'Dr. Rajesh Kumar',
      mentorTitle: 'Professor & Academic Mentor',
      mentorDepartment: 'Computer Science',
      mentorAvatar: '👨‍🏫',
      isOnline: true,
      lastSeen: '',
      unreadCount: 2,
      isTyping: false,
      chatType: 'academic',
      lastMessage: {
        id: '1',
        senderId: 'mentor1',
        senderName: 'Dr. Rajesh Kumar',
        senderType: 'mentor',
        content: 'Great work on your data structures assignment! I have some feedback to share.',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        type: 'text',
        isRead: false,
        isDelivered: true
      }
    },
    {
      id: '2',
      mentorId: 'mentor2',
      mentorName: 'Prof. Priya Sharma',
      mentorTitle: 'Career Counselor',
      mentorDepartment: 'Training & Placement',
      mentorAvatar: '👩‍💼',
      isOnline: false,
      lastSeen: '2 hours ago',
      unreadCount: 0,
      isTyping: false,
      chatType: 'career',
      lastMessage: {
        id: '2',
        senderId: 'student',
        senderName: 'You',
        senderType: 'student',
        content: 'Thank you for the interview tips! I feel more confident now.',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        type: 'text',
        isRead: true,
        isDelivered: true
      }
    },
    {
      id: '3',
      mentorId: 'mentor3',
      mentorName: 'Dr. Amit Singh',
      mentorTitle: 'Project Guide',
      mentorDepartment: 'Computer Science',
      mentorAvatar: '👨‍💻',
      isOnline: true,
      lastSeen: '',
      unreadCount: 1,
      isTyping: true,
      chatType: 'project',
      lastMessage: {
        id: '3',
        senderId: 'mentor3',
        senderName: 'Dr. Amit Singh',
        senderType: 'mentor',
        content: 'Let\'s schedule a meeting to discuss your project progress.',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        type: 'text',
        isRead: false,
        isDelivered: true
      }
    }
  ]);

  const [messages, setMessages] = useState<{ [chatId: string]: Message[] }>({
    '1': [
      {
        id: '1',
        senderId: 'student',
        senderName: 'You',
        senderType: 'student',
        content: 'Good morning Dr. Kumar! I have completed the binary tree implementation you assigned.',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        type: 'text',
        isRead: true,
        isDelivered: true
      },
      {
        id: '2',
        senderId: 'mentor1',
        senderName: 'Dr. Rajesh Kumar',
        senderType: 'mentor',
        content: 'Excellent! Could you please share your code for review?',
        timestamp: new Date(Date.now() - 1500000).toISOString(),
        type: 'text',
        isRead: true,
        isDelivered: true
      },
      {
        id: '3',
        senderId: 'student',
        senderName: 'You',
        senderType: 'student',
        content: 'Here is my implementation with test cases.',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        type: 'file',
        fileName: 'binary_tree.cpp',
        fileSize: '2.3 KB',
        fileUrl: '/files/binary_tree.cpp',
        isRead: true,
        isDelivered: true
      },
      {
        id: '4',
        senderId: 'mentor1',
        senderName: 'Dr. Rajesh Kumar',
        senderType: 'mentor',
        content: 'Great work on your data structures assignment! I have some feedback to share.',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        type: 'text',
        isRead: false,
        isDelivered: true
      },
      {
        id: '5',
        senderId: 'mentor1',
        senderName: 'Dr. Rajesh Kumar',
        senderType: 'mentor',
        content: 'Your code structure is clean, but consider optimizing the search function for better time complexity.',
        timestamp: new Date(Date.now() - 240000).toISOString(),
        type: 'text',
        isRead: false,
        isDelivered: true
      }
    ]
  });

  const [activeChatId, setActiveChatId] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeChat = chatRooms.find(chat => chat.id === activeChatId);
  const chatMessages = messages[activeChatId] || [];

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    // Simulate typing indicator
    if (newMessage.trim()) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [newMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'student',
      senderName: 'You',
      senderType: 'student',
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      type: 'text',
      isRead: false,
      isDelivered: false
    };

    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), message]
    }));

    // Update last message in chat room
    setChatRooms(prev => prev.map(chat =>
      chat.id === activeChatId
        ? { ...chat, lastMessage: message }
        : chat
    ));

    setNewMessage('');

    // Simulate delivery
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [activeChatId]: prev[activeChatId].map(msg =>
          msg.id === message.id ? { ...msg, isDelivered: true } : msg
        )
      }));
    }, 1000);

    // Simulate mentor response (for demo)
    if (Math.random() > 0.7) {
      setTimeout(() => {
        const responses = [
          "I understand your concern. Let me help you with that.",
          "That's a great question! Here's what I think...",
          "Good observation. Have you considered this approach?",
          "Let's schedule a meeting to discuss this in detail.",
          "I'll review this and get back to you with feedback."
        ];

        const mentorResponse: Message = {
          id: (Date.now() + 1).toString(),
          senderId: activeChat.mentorId,
          senderName: activeChat.mentorName,
          senderType: 'mentor',
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toISOString(),
          type: 'text',
          isRead: false,
          isDelivered: true
        };

        setMessages(prev => ({
          ...prev,
          [activeChatId]: [...prev[activeChatId], mentorResponse]
        }));

        setChatRooms(prev => prev.map(chat =>
          chat.id === activeChatId
            ? { ...chat, lastMessage: mentorResponse, unreadCount: chat.unreadCount + 1 }
            : chat
        ));
      }, 2000 + Math.random() * 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !activeChat) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'student',
      senderName: 'You',
      senderType: 'student',
      content: `Sent a file: ${file.name}`,
      timestamp: new Date().toISOString(),
      type: 'file',
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(1)} KB`,
      fileUrl: URL.createObjectURL(file),
      isRead: false,
      isDelivered: false
    };

    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), message]
    }));

    setChatRooms(prev => prev.map(chat =>
      chat.id === activeChatId
        ? { ...chat, lastMessage: message }
        : chat
    ));

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowAttachmentMenu(false);
  };

  const markMessagesAsRead = (chatId: string) => {
    setMessages(prev => ({
      ...prev,
      [chatId]: prev[chatId]?.map(msg => ({ ...msg, isRead: true })) || []
    }));

    setChatRooms(prev => prev.map(chat =>
      chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
    ));
  };

  const startVideoCall = () => {
    alert(`Starting video call with ${activeChat?.mentorName}...`);
  };

  const startVoiceCall = () => {
    alert(`Starting voice call with ${activeChat?.mentorName}...`);
  };

  const scheduleAppointment = () => {
    alert(`Opening appointment scheduler with ${activeChat?.mentorName}...`);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording simulation
      setTimeout(() => {
        setIsRecording(false);
        alert('Voice message recorded and sent!');
      }, 3000);
    }
  };

  const insertEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const filteredChats = chatRooms.filter(chat =>
    chat.mentorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.mentorDepartment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Chat List Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Chat with Mentors</h1>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search mentors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.map(chat => (
            <div
              key={chat.id}
              onClick={() => {
                setActiveChatId(chat.id);
                markMessagesAsRead(chat.id);
              }}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                activeChatId === chat.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                    {chat.mentorAvatar}
                  </div>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{chat.mentorName}</h3>
                    {chat.unreadCount > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{chat.mentorTitle}</p>
                  {chat.lastMessage && (
                    <p className="text-xs text-gray-500 truncate">
                      {chat.lastMessage.senderType === 'student' ? 'You: ' : ''}
                      {chat.lastMessage.type === 'text' 
                        ? chat.lastMessage.content 
                        : `Sent a ${chat.lastMessage.type}`
                      }
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-1">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      chat.chatType === 'academic' ? 'bg-blue-100 text-blue-800' :
                      chat.chatType === 'career' ? 'bg-green-100 text-green-800' :
                      chat.chatType === 'project' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {chat.chatType}
                    </span>
                    <span className="text-xs text-gray-400">
                      {chat.isOnline ? 'Online' : chat.lastSeen}
                    </span>
                  </div>
                  {chat.isTyping && (
                    <div className="text-xs text-blue-600 italic mt-1">typing...</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                      {activeChat.mentorAvatar}
                    </div>
                    {activeChat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{activeChat.mentorName}</h2>
                    <p className="text-sm text-gray-600">{activeChat.mentorTitle}</p>
                    <p className="text-xs text-gray-500">
                      {activeChat.isOnline ? 'Online' : `Last seen ${activeChat.lastSeen}`}
                      {activeChat.isTyping && ' • typing...'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={startVoiceCall}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Voice Call"
                  >
                    <PhoneIcon size={20} />
                  </button>
                  <button
                    onClick={startVideoCall}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Video Call"
                  >
                    <VideoIcon size={20} />
                  </button>
                  <button
                    onClick={scheduleAppointment}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Schedule Appointment"
                  >
                    <CalendarIcon size={20} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors">
                    <MoreVerticalIcon size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message, index) => {
                const isOwn = message.senderType === 'student';
                const showAvatar = index === 0 || chatMessages[index - 1].senderId !== message.senderId;
                
                return (
                  <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-2 max-w-[70%] ${isOwn ? 'flex-row-reverse' : ''}`}>
                      {!isOwn && showAvatar && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm flex-shrink-0">
                          {activeChat.mentorAvatar}
                        </div>
                      )}
                      {!isOwn && !showAvatar && <div className="w-8"></div>}
                      
                      <div className={`rounded-2xl px-4 py-2 ${
                        isOwn 
                          ? 'bg-blue-600 text-white rounded-br-md' 
                          : 'bg-gray-100 text-gray-900 rounded-bl-md'
                      }`}>
                        {message.type === 'text' && (
                          <p className="whitespace-pre-wrap break-words">{message.content}</p>
                        )}
                        
                        {message.type === 'file' && (
                          <div className="flex items-center gap-3 p-2 bg-black bg-opacity-10 rounded-lg">
                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                              <FileTextIcon size={16} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{message.fileName}</p>
                              <p className="text-xs opacity-75">{message.fileSize}</p>
                            </div>
                            <button className="p-1 hover:bg-black hover:bg-opacity-10 rounded">
                              <DownloadIcon size={16} />
                            </button>
                          </div>
                        )}
                        
                        {message.type === 'image' && (
                          <div className="max-w-xs">
                            <img 
                              src={message.fileUrl} 
                              alt="Shared image" 
                              className="w-full rounded-lg"
                            />
                          </div>
                        )}
                        
                        <div className={`flex items-center justify-between mt-1 text-xs ${
                          isOwn ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          <span>{formatTime(message.timestamp)}</span>
                          {isOwn && (
                            <div className="flex items-center gap-1">
                              {message.isDelivered ? (
                                message.isRead ? (
                                  <CheckCheckIcon size={12} className="text-blue-200" />
                                ) : (
                                  <CheckCheckIcon size={12} />
                                )
                              ) : (
                                <CheckIcon size={12} />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              {isTyping && (
                <div className="mb-2 text-sm text-gray-500">
                  {activeChat.mentorName} is typing...
                </div>
              )}
              
              <div className="flex items-end gap-2">
                <div className="relative">
                  <button
                    onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <PaperclipIcon size={20} />
                  </button>
                  
                  {showAttachmentMenu && (
                    <div className="absolute bottom-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                      <div className="space-y-1">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                          <FileTextIcon size={16} />
                          Document
                        </button>
                        <button
                          onClick={() => alert('Camera feature coming soon!')}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                          <CameraIcon size={16} />
                          Camera
                        </button>
                        <button
                          onClick={() => alert('Gallery feature coming soon!')}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                          <ImageIcon size={16} />
                          Gallery
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt,.jpg,.png,.gif"
                  />
                </div>
                
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Message ${activeChat.mentorName}...`}
                    className="w-full resize-none border border-gray-300 rounded-lg px-4 py-2 pr-10 max-h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={1}
                    style={{
                      minHeight: '40px',
                      height: 'auto',
                      lineHeight: '20px'
                    }}
                  />
                  
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute right-2 top-2 p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <SmileIcon size={20} />
                  </button>
                  
                  {showEmojiPicker && (
                    <div className="absolute bottom-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
                      <div className="grid grid-cols-6 gap-2">
                        {['😀', '😊', '😂', '🤔', '👍', '❤️', '😢', '😮', '🔥', '💯', '🎉', '👏'].map(emoji => (
                          <button
                            key={emoji}
                            onClick={() => insertEmoji(emoji)}
                            className="text-lg hover:bg-gray-100 rounded p-1"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-1">
                  <button
                    onClick={toggleRecording}
                    className={`p-2 rounded-lg transition-colors ${
                      isRecording 
                        ? 'bg-red-500 text-white' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <MicIcon size={20} />
                  </button>
                  
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <SendIcon size={20} />
                  </button>
                </div>
              </div>
              
              {isRecording && (
                <div className="mt-2 text-sm text-red-600 text-center">
                  🔴 Recording... Tap to stop
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a mentor to start chatting</h3>
              <p className="text-gray-600">Choose from your mentors on the left to begin the conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWithMentorStu;
