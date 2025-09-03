import React, { useState, useEffect, useRef } from 'react';
import { SendIcon, SearchIcon, UserIcon, PaperclipIcon, MoreVerticalIcon } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  department: string;
  specialization: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image';
  status: 'sent' | 'delivered' | 'read';
}

interface ChatSession {
  id: string;
  mentorId: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  subject: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'active' | 'resolved' | 'pending';
}

const ChatWithMentor: React.FC = () => {
  const [mentors] = useState<Mentor[]>([
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      department: 'CSE',
      specialization: 'Data Structures & Algorithms',
      avatar: '👩‍🏫',
      status: 'online',
      lastSeen: 'now'
    },
    {
      id: '2',
      name: 'Prof. Rajesh Kumar',
      department: 'CSE',
      specialization: 'Database Management',
      avatar: '👨‍🏫',
      status: 'offline',
      lastSeen: '2 hours ago'
    },
    {
      id: '3',
      name: 'Dr. Anita Gupta',
      department: 'ECE',
      specialization: 'Digital Electronics',
      avatar: '👩‍🔬',
      status: 'busy',
      lastSeen: '30 minutes ago'
    }
  ]);

  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      mentorId: '1',
      studentId: 'S001',
      studentName: 'Rahul Sharma',
      studentRoll: 'CSE001',
      subject: 'Data Structures Doubt',
      lastMessage: 'Thank you for the explanation!',
      lastMessageTime: '10:30 AM',
      unreadCount: 0,
      status: 'resolved'
    },
    {
      id: '2',
      mentorId: '2',
      studentId: 'S002',
      studentName: 'Priya Singh',
      studentRoll: 'CSE002',
      subject: 'SQL Query Help',
      lastMessage: 'Could you help with this query?',
      lastMessageTime: '9:45 AM',
      unreadCount: 2,
      status: 'active'
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'S001',
      receiverId: '1',
      content: 'Hello Dr. Sharma, I need help with binary trees.',
      timestamp: '2025-09-02T10:00:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      senderId: '1',
      receiverId: 'S001',
      content: 'Hi Rahul! I\'d be happy to help. What specific concept are you struggling with?',
      timestamp: '2025-09-02T10:15:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      senderId: 'S001',
      receiverId: '1',
      content: 'I\'m having trouble understanding tree traversal algorithms.',
      timestamp: '2025-09-02T10:20:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: '4',
      senderId: '1',
      receiverId: 'S001',
      content: 'Tree traversal is fundamental. There are three main types: Inorder, Preorder, and Postorder. Let me explain each one.',
      timestamp: '2025-09-02T10:25:00Z',
      type: 'text',
      status: 'read'
    }
  ]);

  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(chatSessions[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const departments = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const filteredSessions = chatSessions.filter(session => {
    const mentor = mentors.find(m => m.id === session.mentorId);
    return (
      session.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.subject.toLowerCase().includes(searchTerm.toLowerCase())
    ) && (selectedDepartment === 'all' || mentor?.department === selectedDepartment);
  });

  const getSessionMessages = (sessionId: string) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (!session) return [];
    
    return messages.filter(m => 
      (m.senderId === session.studentId && m.receiverId === session.mentorId) ||
      (m.senderId === session.mentorId && m.receiverId === session.studentId)
    );
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedSession) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'chairperson',
        receiverId: selectedSession.mentorId,
        content: newMessage,
        timestamp: new Date().toISOString(),
        type: 'text',
        status: 'sent'
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Update last message in session
      const updatedSessions = chatSessions.map(session => 
        session.id === selectedSession.id 
          ? { ...session, lastMessage: newMessage, lastMessageTime: new Date().toLocaleTimeString().slice(0, 5) }
          : session
      );
      setChatSessions(updatedSessions);
    }
  };

  const assignMentor = (sessionId: string, newMentorId: string) => {
    const updatedSessions = chatSessions.map(session => 
      session.id === sessionId 
        ? { ...session, mentorId: newMentorId }
        : session
    );
    setChatSessions(updatedSessions);
    setIsAssignModalOpen(false);
    alert('Mentor assigned successfully!');
  };

  const resolveSession = (sessionId: string) => {
    const updatedSessions = chatSessions.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'resolved' as const }
        : session
    );
    setChatSessions(updatedSessions);
    alert('Session marked as resolved!');
  };

  const escalateSession = (sessionId: string) => {
    alert(`Session ${sessionId} escalated to department head!`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'busy': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mentor Chat Management</h1>
              <p className="text-gray-600 mt-1">Monitor and manage student-mentor communications</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Assign Mentor
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Chat Sessions Sidebar */}
          <div className="col-span-4 bg-white rounded-xl border border-gray-200 flex flex-col">
            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative mb-3">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search sessions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto">
              {filteredSessions.map((session) => {
                const mentor = mentors.find(m => m.id === session.mentorId);
                return (
                  <div
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedSession?.id === session.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <UserIcon className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{session.studentName}</h4>
                          <p className="text-xs text-gray-500">{session.studentRoll}</p>
                        </div>
                      </div>
                      {session.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {session.unreadCount}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm font-medium text-gray-700 mb-1">{session.subject}</p>
                    <p className="text-xs text-gray-500 truncate mb-2">{session.lastMessage}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{session.lastMessageTime}</span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          session.status === 'active' ? 'bg-green-100 text-green-800' :
                          session.status === 'resolved' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {session.status}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(mentor?.status || 'offline')}`}></div>
                          <span className="text-xs text-gray-500">{mentor?.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-8 bg-white rounded-xl border border-gray-200 flex flex-col">
            {selectedSession ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <UserIcon className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedSession.studentName}</h3>
                      <p className="text-sm text-gray-500">{selectedSession.subject}</p>
                    </div>
                    <div className="ml-4">
                      <span className="text-sm text-gray-500">Mentor: </span>
                      <span className="text-sm font-medium">
                        {mentors.find(m => m.id === selectedSession.mentorId)?.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => resolveSession(selectedSession.id)}
                      className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-sm transition-colors"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => escalateSession(selectedSession.id)}
                      className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1 rounded text-sm transition-colors"
                    >
                      Escalate
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVerticalIcon size={20} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {getSessionMessages(selectedSession.id).map((message) => {
                    const isFromStudent = message.senderId === selectedSession.studentId;
                    const isFromMentor = message.senderId === selectedSession.mentorId;
                    
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isFromStudent ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          isFromStudent 
                            ? 'bg-gray-100 text-gray-900' 
                            : isFromMentor 
                            ? 'bg-blue-500 text-white'
                            : 'bg-green-500 text-white'
                        }`}>
                          <div className="text-sm">{message.content}</div>
                          <div className={`text-xs mt-1 ${
                            isFromStudent ? 'text-gray-500' : 'text-white opacity-75'
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString().slice(0, 5)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <button className="text-gray-400 hover:text-gray-600">
                      <PaperclipIcon size={20} />
                    </button>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type a message as chairperson..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                    >
                      <SendIcon size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Chat Selected</h3>
                  <p className="text-gray-500">Select a chat session to view messages</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Assign Mentor Modal */}
        {isAssignModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Assign Mentor</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chat Session</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                    {chatSessions.map(session => (
                      <option key={session.id} value={session.id}>
                        {session.studentName} - {session.subject}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Mentor</label>
                  <div className="space-y-2">
                    {mentors.map(mentor => (
                      <div key={mentor.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{mentor.avatar}</div>
                            <div>
                              <h4 className="font-medium text-gray-900">{mentor.name}</h4>
                              <p className="text-sm text-gray-600">{mentor.department} - {mentor.specialization}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(mentor.status)}`}></div>
                            <span className="text-sm capitalize text-gray-600">{mentor.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => assignMentor(chatSessions[0].id, mentors[0].id)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Assign Mentor
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWithMentor;
