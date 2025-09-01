


import React, { useState } from 'react';
import { Calendar, User, Mail, Phone, Clock, MessageCircle, Video, FileText, Star, Send, BookOpen, Award } from 'lucide-react';

const TalkToMentor = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [messageText, setMessageText] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  // Mock data for mentor and student information
  const mentorData = {
    id: 'MENTOR001',
    name: 'Dr. Anjali Sharma',
    designation: 'Professor & Academic Mentor',
    department: 'Computer Science & Engineering',
    image: '/api/placeholder/200/200',
    email: 'anjali.sharma@erpcollege.edu',
    phone: '+91-9876543210',
    officeHours: 'Mon-Fri: 10:00 AM - 5:00 PM',
    experience: '15 years',
    specialization: ['Academic Guidance', 'Career Counseling', 'Research Mentoring'],
    rating: 4.8,
    totalReviews: 156,
    about: 'Dr. Anjali Sharma is a dedicated academic mentor with over 15 years of experience in guiding students through their academic journey. She specializes in computer science education, career counseling, and research mentoring.'
  };

  const studentData = {
    name: 'Arjun Sharma',
    rollNo: 'CSE2021001',
    semester: '6th Semester',
    branch: 'Computer Science Engineering',
    currentGPA: '8.7',
    attendance: '92%'
  };

  const previousConversations = [
    {
      id: 1,
      date: '2025-01-15',
      subject: 'Mid-semester Performance Discussion',
      status: 'Completed',
      summary: 'Discussed Arjun\'s performance in Data Structures. Recommended additional practice problems.',
      type: 'Academic'
    },
    {
      id: 2,
      date: '2025-01-10',
      subject: 'Career Guidance Session',
      status: 'Completed',
      summary: 'Explored internship opportunities and discussed preparation for placement season.',
      type: 'Career'
    },
    {
      id: 3,
      date: '2025-01-05',
      subject: 'Project Selection Guidance',
      status: 'Completed',
      summary: 'Helped choose final year project topic in Machine Learning domain.',
      type: 'Project'
    }
  ];

  const availableSlots = [
    { date: '2025-01-20', time: '10:00 AM', available: true },
    { date: '2025-01-20', time: '2:00 PM', available: false },
    { date: '2025-01-20', time: '4:00 PM', available: true },
    { date: '2025-01-21', time: '11:00 AM', available: true },
    { date: '2025-01-21', time: '3:00 PM', available: true },
    { date: '2025-01-22', time: '10:00 AM', available: false },
    { date: '2025-01-22', time: '1:00 PM', available: true },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      date: '2025-01-18',
      time: '2:00 PM',
      subject: 'Semester Progress Review',
      type: 'In-person',
      status: 'Confirmed'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Academic': return 'bg-blue-100 text-blue-800';
      case 'Career': return 'bg-green-100 text-green-800';
      case 'Project': return 'bg-purple-100 text-purple-800';
      case 'Personal': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Talk to Mentor</h1>
              <p className="text-gray-600">Connect with your child's academic mentor for guidance and support</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                <Video size={16} />
                Video Call
              </button>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                <Calendar size={16} />
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>

        {/* Student Info Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-lg font-semibold">Student: {studentData.name}</h2>
              <p className="text-blue-100">{studentData.rollNo} • {studentData.branch} • {studentData.semester}</p>
            </div>
            <div className="flex gap-6 mt-2 md:mt-0">
              <div className="text-center">
                <p className="text-blue-100 text-sm">Current GPA</p>
                <p className="text-xl font-bold">{studentData.currentGPA}</p>
              </div>
              <div className="text-center">
                <p className="text-blue-100 text-sm">Attendance</p>
                <p className="text-xl font-bold">{studentData.attendance}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mentor Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6 text-center">
                <img 
                  src={mentorData.image} 
                  alt={mentorData.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
                />
                <h2 className="text-xl font-bold text-gray-900 mb-1">{mentorData.name}</h2>
                <p className="text-gray-600 mb-2">{mentorData.designation}</p>
                <p className="text-sm text-gray-500 mb-4">{mentorData.department}</p>
                
                <div className="flex items-center justify-center gap-1 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < Math.floor(mentorData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {mentorData.rating} ({mentorData.totalReviews} reviews)
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Mail size={14} />
                    <span>{mentorData.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Phone size={14} />
                    <span>{mentorData.phone}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Clock size={14} />
                    <span>{mentorData.officeHours}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Specializations</h4>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {mentorData.specialization.map((spec, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border mt-6 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <MessageCircle size={20} className="text-blue-600" />
                  <span className="font-medium">Send Message</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Video size={20} className="text-green-600" />
                  <span className="font-medium">Video Call</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Calendar size={20} className="text-purple-600" />
                  <span className="font-medium">Book Appointment</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <FileText size={20} className="text-orange-600" />
                  <span className="font-medium">View Reports</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm border mb-6">
              <div className="border-b">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: User },
                    { id: 'schedule', label: 'Schedule Meeting', icon: Calendar },
                    { id: 'messages', label: 'Messages', icon: MessageCircle },
                    { id: 'history', label: 'History', icon: Clock }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon size={16} />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">About Your Mentor</h3>
                      <p className="text-gray-700 leading-relaxed">{mentorData.about}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Upcoming Appointments</h3>
                      {upcomingAppointments.length > 0 ? (
                        <div className="space-y-3">
                          {upcomingAppointments.map(appointment => (
                            <div key={appointment.id} className="border rounded-lg p-4 bg-blue-50">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-gray-900">{appointment.subject}</h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {formatDate(appointment.date)} at {appointment.time}
                                  </p>
                                  <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    {appointment.type}
                                  </span>
                                </div>
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  {appointment.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No upcoming appointments scheduled</p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Student Progress Overview</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-blue-100 text-sm">Academic Performance</p>
                              <p className="text-2xl font-bold">Excellent</p>
                            </div>
                            <BookOpen className="h-8 w-8 text-blue-200" />
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-green-100 text-sm">Overall Rating</p>
                              <p className="text-2xl font-bold">A Grade</p>
                            </div>
                            <Award className="h-8 w-8 text-green-200" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Schedule Meeting Tab */}
                {activeTab === 'schedule' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Schedule a Meeting</h3>
                      <p className="text-gray-600 mb-4">Book a consultation session with your child's mentor</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Academic Discussion</option>
                          <option>Career Guidance</option>
                          <option>Performance Review</option>
                          <option>Personal Consultation</option>
                          <option>Project Guidance</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Mode</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>In-person</option>
                          <option>Video Call</option>
                          <option>Phone Call</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Available Time Slots</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {availableSlots.map((slot, index) => (
                          <button
                            key={index}
                            disabled={!slot.available}
                            onClick={() => setSelectedTimeSlot(`${slot.date}-${slot.time}`)}
                            className={`p-3 border rounded-lg text-left transition-colors ${
                              slot.available
                                ? selectedTimeSlot === `${slot.date}-${slot.time}`
                                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                                : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <div className="font-medium">{formatDate(slot.date)}</div>
                            <div className="text-sm text-gray-600">{slot.time}</div>
                            {!slot.available && <div className="text-xs text-red-500 mt-1">Unavailable</div>}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Agenda</label>
                      <textarea 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        placeholder="Please describe what you'd like to discuss in this meeting..."
                      ></textarea>
                    </div>

                    <button 
                      disabled={!selectedTimeSlot}
                      className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Book Appointment
                    </button>
                  </div>
                )}

                {/* Messages Tab */}
                {activeTab === 'messages' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Send Message</h3>
                      <p className="text-gray-600 mb-4">Send a message to discuss your child's academic progress</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input 
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter message subject..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="6"
                        placeholder="Type your message here..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                          Attach File
                        </button>
                        <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Normal Priority</option>
                          <option>High Priority</option>
                          <option>Urgent</option>
                        </select>
                      </div>
                      <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        <Send size={16} />
                        Send Message
                      </button>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Recent Messages</h4>
                      <div className="space-y-3">
                        <div className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-gray-900">Re: Mid-semester concerns</h5>
                            <span className="text-xs text-gray-500">Jan 16, 2025</span>
                          </div>
                          <p className="text-sm text-gray-600">Thank you for your concern. Arjun is showing good improvement in his recent assignments...</p>
                          <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Replied</span>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-gray-900">Career guidance request</h5>
                            <span className="text-xs text-gray-500">Jan 12, 2025</span>
                          </div>
                          <p className="text-sm text-gray-600">Could we schedule a session to discuss internship opportunities...</p>
                          <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Pending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Consultation History</h3>
                      <p className="text-gray-600 mb-4">Previous interactions and meetings with your child's mentor</p>
                    </div>

                    <div className="space-y-4">
                      {previousConversations.map(conversation => (
                        <div key={conversation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">{conversation.subject}</h4>
                              <p className="text-sm text-gray-600">{formatDate(conversation.date)}</p>
                            </div>
                            <div className="flex gap-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(conversation.type)}`}>
                                {conversation.type}
                              </span>
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                {conversation.status}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">{conversation.summary}</p>
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              View Details
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                              Download Report
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Load More History
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
            <div className="text-sm text-gray-600">Total Consultations</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">24hrs</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">98%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">Active</div>
            <div className="text-sm text-gray-600">Mentor Status</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkToMentor;