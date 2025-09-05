import React, { useState } from 'react';
import { UsersIcon, BriefcaseIcon, GraduationCapIcon, TrendingUpIcon, SearchIcon,  PlusIcon, DownloadIcon } from 'lucide-react';

interface AlumniProfile {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  graduationYear: number;
  currentPosition: string;
  company: string;
  location: string;
  email: string;
  phone: string;
  linkedIn: string;
  achievements: string[];
  mentorshipAvailable: boolean;
  placementPackage: number;
  industryType: string;
  photoUrl: string;
  lastUpdated: string;
  isVerified: boolean;
}

interface AlumniEvent {
  id: string;
  title: string;
  date: string;
  type: 'reunion' | 'networking' | 'mentorship' | 'workshop';
  attendees: number;
  maxAttendees: number;
  location: string;
  description: string;
}

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  alumniId: string;
  alumniName: string;
  postedDate: string;
  deadline: string;
  description: string;
  requirements: string[];
  salary: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
}

const Alumni: React.FC = () => {
  const [alumni, setAlumni] = useState<AlumniProfile[]>([
    {
      id: '1',
      name: 'Rajesh Kumar Singh',
      rollNumber: 'CSE2019001',
      department: 'CSE',
      graduationYear: 2023,
      currentPosition: 'Senior Software Engineer',
      company: 'Google',
      location: 'Bangalore, India',
      email: 'rajesh.singh@gmail.com',
      phone: '+91-9876543210',
      linkedIn: 'linkedin.com/in/rajeshkumar',
      achievements: ['Employee of the Year 2024', 'Published research paper on ML'],
      mentorshipAvailable: true,
      placementPackage: 4500000,
      industryType: 'Technology',
      photoUrl: '👨‍💻',
      lastUpdated: '2025-08-15',
      isVerified: true
    },
    {
      id: '2',
      name: 'Priya Sharma',
      rollNumber: 'ECE2018045',
      department: 'ECE',
      graduationYear: 2022,
      currentPosition: 'Product Manager',
      company: 'Microsoft',
      location: 'Hyderabad, India',
      email: 'priya.sharma@outlook.com',
      phone: '+91-9876543211',
      linkedIn: 'linkedin.com/in/priyasharma',
      achievements: ['Led team of 15 engineers', 'Launched 3 successful products'],
      mentorshipAvailable: true,
      placementPackage: 3800000,
      industryType: 'Technology',
      photoUrl: '👩‍💼',
      lastUpdated: '2025-08-20',
      isVerified: true
    },
    {
      id: '3',
      name: 'Amit Patel',
      rollNumber: 'ME2017023',
      department: 'ME',
      graduationYear: 2021,
      currentPosition: 'Entrepreneur',
      company: 'Tech Innovations Pvt Ltd',
      location: 'Mumbai, India',
      email: 'amit.patel@techinnovations.com',
      phone: '+91-9876543212',
      linkedIn: 'linkedin.com/in/amitpatel',
      achievements: ['Founded startup valued at $2M', 'Forbes 30 Under 30'],
      mentorshipAvailable: false,
      placementPackage: 0,
      industryType: 'Startup',
      photoUrl: '👨‍🚀',
      lastUpdated: '2025-07-30',
      isVerified: true
    }
  ]);

  const [events, setEvents] = useState<AlumniEvent[]>([
    {
      id: '1',
      title: 'Annual Alumni Reunion 2025',
      date: '2025-10-15',
      type: 'reunion',
      attendees: 180,
      maxAttendees: 300,
      location: 'College Campus',
      description: 'Annual gathering of alumni from all batches'
    },
    {
      id: '2',
      title: 'Industry Networking Session',
      date: '2025-09-20',
      type: 'networking',
      attendees: 45,
      maxAttendees: 60,
      location: 'Virtual',
      description: 'Connect with alumni working in various industries'
    }
  ]);

  const [jobPostings] = useState<JobPosting[]>([
    {
      id: '1',
      title: 'Software Developer',
      company: 'Google',
      location: 'Bangalore',
      alumniId: '1',
      alumniName: 'Rajesh Kumar Singh',
      postedDate: '2025-09-01',
      deadline: '2025-09-30',
      description: 'Looking for talented software developers to join our team',
      requirements: ['B.Tech in CSE/IT', '2+ years experience', 'Python/Java skills'],
      salary: '₹15-25 LPA',
      type: 'full-time'
    }
  ]);

  const [selectedTab, setSelectedTab] = useState<'profiles' | 'events' | 'jobs'>('profiles');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [isAddAlumniModalOpen, setIsAddAlumniModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [newAlumni, setNewAlumni] = useState<Partial<AlumniProfile>>({});
  const [newEvent, setNewEvent] = useState<Partial<AlumniEvent>>({});

  const departments = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];
  const graduationYears = Array.from({length: 10}, (_, i) => new Date().getFullYear() - i);

  const filteredAlumni = alumni.filter(alumnus => {
    return (
      (alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       alumnus.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
       alumnus.currentPosition.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedDepartment === 'all' || alumnus.department === selectedDepartment) &&
      (selectedYear === 'all' || alumnus.graduationYear.toString() === selectedYear)
    );
  });

  const handleAddAlumni = () => {
    if (newAlumni.name && newAlumni.email && newAlumni.rollNumber) {
      const alumnus: AlumniProfile = {
        id: Date.now().toString(),
        name: newAlumni.name,
        rollNumber: newAlumni.rollNumber,
        department: newAlumni.department || 'CSE',
        graduationYear: newAlumni.graduationYear || 2023,
        currentPosition: newAlumni.currentPosition || '',
        company: newAlumni.company || '',
        location: newAlumni.location || '',
        email: newAlumni.email,
        phone: newAlumni.phone || '',
        linkedIn: newAlumni.linkedIn || '',
        achievements: [],
        mentorshipAvailable: newAlumni.mentorshipAvailable || false,
        placementPackage: newAlumni.placementPackage || 0,
        industryType: newAlumni.industryType || 'Technology',
        photoUrl: '👤',
        lastUpdated: new Date().toISOString().split('T')[0],
        isVerified: false
      };
      
      setAlumni([...alumni, alumnus]);
      setNewAlumni({});
      setIsAddAlumniModalOpen(false);
      alert('Alumni profile added successfully!');
    }
  };

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.location) {
      const event: AlumniEvent = {
        id: Date.now().toString(),
        title: newEvent.title,
        date: newEvent.date,
        type: newEvent.type || 'networking',
        attendees: 0,
        maxAttendees: newEvent.maxAttendees || 50,
        location: newEvent.location,
        description: newEvent.description || ''
      };
      
      setEvents([...events, event]);
      setNewEvent({});
      setIsCreateEventModalOpen(false);
      alert('Event created successfully!');
    }
  };

  const verifyAlumni = (alumniId: string) => {
    const updatedAlumni = alumni.map(alumnus => 
      alumnus.id === alumniId ? { ...alumnus, isVerified: true } : alumnus
    );
    setAlumni(updatedAlumni);
    alert('Alumni profile verified successfully!');
  };

  const sendInvitation = (eventId: string) => {
    alert(`Invitations sent to all alumni for event ${eventId}!`);
  };

  const exportAlumniData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Roll Number,Department,Graduation Year,Position,Company,Email,Location,Package,Industry\n" +
      filteredAlumni.map(alumnus => 
        `"${alumnus.name}",${alumnus.rollNumber},${alumnus.department},${alumnus.graduationYear},"${alumnus.currentPosition}","${alumnus.company}",${alumnus.email},"${alumnus.location}",${alumnus.placementPackage},"${alumnus.industryType}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "alumni_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = {
    totalAlumni: alumni.length,
    verifiedProfiles: alumni.filter(a => a.isVerified).length,
    mentorsAvailable: alumni.filter(a => a.mentorshipAvailable).length,
    averagePackage: alumni.length ? Math.round(alumni.reduce((sum, a) => sum + a.placementPackage, 0) / alumni.length / 100000) : 0,
    upcomingEvents: events.filter(e => new Date(e.date) > new Date()).length,
    totalJobPostings: jobPostings.length
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      reunion: 'bg-purple-100 text-purple-800',
      networking: 'bg-blue-100 text-blue-800',
      mentorship: 'bg-green-100 text-green-800',
      workshop: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Alumni Management</h1>
              <p className="text-gray-600 mt-1">Connect and engage with college alumni network</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsAddAlumniModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Add Alumni
              </button>
              <button
                onClick={() => setIsCreateEventModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Create Event
              </button>
              <button
                onClick={exportAlumniData}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Export
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search alumni by name, company, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Years</option>
              {graduationYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { key: 'profiles', label: 'Alumni Profiles', icon: UsersIcon },
              { key: 'events', label: 'Events', icon: GraduationCapIcon },
              { key: 'jobs', label: 'Job Board', icon: BriefcaseIcon }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedTab(key as 'profiles' | 'events' | 'jobs')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedTab === key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Alumni</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAlumni}</p>
              </div>
              <UsersIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Verified</p>
                <p className="text-2xl font-bold text-green-600">{stats.verifiedProfiles}</p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Mentors</p>
                <p className="text-2xl font-bold text-purple-600">{stats.mentorsAvailable}</p>
              </div>
              <div className="text-2xl">🎓</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Package</p>
                <p className="text-2xl font-bold text-orange-600">₹{stats.averagePackage}L</p>
              </div>
              <TrendingUpIcon className="text-orange-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Events</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.upcomingEvents}</p>
              </div>
              <GraduationCapIcon className="text-indigo-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Job Posts</p>
                <p className="text-2xl font-bold text-pink-600">{stats.totalJobPostings}</p>
              </div>
              <BriefcaseIcon className="text-pink-500" size={24} />
            </div>
          </div>
        </div>

        {/* Content based on selected tab */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            {selectedTab === 'profiles' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Alumni Profiles ({filteredAlumni.length})
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAlumni.map((alumnus) => (
                    <div key={alumnus.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-4xl">{alumnus.photoUrl}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{alumnus.name}</h3>
                            <p className="text-sm text-gray-500">{alumnus.rollNumber}</p>
                          </div>
                        </div>
                        {alumnus.isVerified ? (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            Verified
                          </span>
                        ) : (
                          <button
                            onClick={() => verifyAlumni(alumnus.id)}
                            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs transition-colors"
                          >
                            Verify
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <BriefcaseIcon size={14} className="text-gray-400" />
                          <span>{alumnus.currentPosition} at {alumnus.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>📍</span>
                          <span>{alumnus.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <GraduationCapIcon size={14} />
                          <span>{alumnus.department} - {alumnus.graduationYear}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>💰</span>
                          <span>₹{(alumnus.placementPackage / 100000).toFixed(1)}L package</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {alumnus.industryType}
                        </span>
                        {alumnus.mentorshipAvailable && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Mentor Available
                          </span>
                        )}
                      </div>
                      
                      {alumnus.achievements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Achievements:</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {alumnus.achievements.slice(0, 2).map((achievement, index) => (
                              <li key={index}>• {achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        {/* <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs transition-colors">
                          Contact
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs transition-colors">
                          View Profile
                        </button> */}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {selectedTab === 'events' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Alumni Events ({events.length})
                </h2>
                
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{event.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                              {event.type}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{event.description}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              📅 {new Date(event.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              📍 {event.location}
                            </span>
                            <span className="flex items-center gap-1">
                              👥 {event.attendees}/{event.maxAttendees} attendees
                            </span>
                          </div>
                          
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{width: `${(event.attendees / event.maxAttendees) * 100}%`}}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => sendInvitation(event.id)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm transition-colors"
                          >
                            Send Invites
                          </button>
                          {/* <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                            Edit
                          </button> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {selectedTab === 'jobs' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Job Board ({jobPostings.length})
                </h2>
                
                <div className="space-y-4">
                  {jobPostings.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{job.title}</h3>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              {job.type}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              🏢 {job.company}
                            </span>
                            <span className="flex items-center gap-1">
                              📍 {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              💰 {job.salary}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{job.description}</p>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Requirements:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {job.requirements.map((req, index) => (
                                <li key={index}>• {req}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Posted by: {job.alumniName}</span>
                            <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                            <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          {/* <button className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg text-sm transition-colors">
                            Share with Students
                          </button> */}
                          {/* <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm transition-colors">
                            View Details
                          </button> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Add Alumni Modal */}
        {isAddAlumniModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add Alumni Profile</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newAlumni.name || ''}
                    onChange={(e) => setNewAlumni({...newAlumni, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                  <input
                    type="text"
                    value={newAlumni.rollNumber || ''}
                    onChange={(e) => setNewAlumni({...newAlumni, rollNumber: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter roll number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={newAlumni.department || ''}
                    onChange={(e) => setNewAlumni({...newAlumni, department: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                  <select
                    value={newAlumni.graduationYear || ''}
                    onChange={(e) => setNewAlumni({...newAlumni, graduationYear: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Year</option>
                    {graduationYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Position</label>
                  <input
                    type="text"
                    value={newAlumni.currentPosition || ''}
                    onChange={(e) => setNewAlumni({...newAlumni, currentPosition: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter current position"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={newAlumni.company || ''}
                    onChange={(e) => setNewAlumni({...newAlumni, company: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newAlumni.email || ''}
                    onChange={(e) => setNewAlumni({...newAlumni, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={newAlumni.location || ''}
                    onChange={(e) => setNewAlumni({...newAlumni, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter current location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Package (₹)</label>
                  <input
                    type="number"
                    value={newAlumni.placementPackage || ''}
                    onChange={(e) => setNewAlumni({...newAlumni, placementPackage: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter package amount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry Type</label>
                  <select
                    value={newAlumni.industryType || ''}
                    onChange={(e) => setNewAlumni({...newAlumni, industryType: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Startup">Startup</option>
                    <option value="Government">Government</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newAlumni.mentorshipAvailable || false}
                      onChange={(e) => setNewAlumni({...newAlumni, mentorshipAvailable: e.target.checked})}
                      className="mr-2 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Available for Mentorship</span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsAddAlumniModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAlumni}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Alumni
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Event Modal */}
        {isCreateEventModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Create Alumni Event</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                  <input
                    type="text"
                    value={newEvent.title || ''}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter event title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                  <select
                    value={newEvent.type || ''}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value as AlumniEvent['type']})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="reunion">Reunion</option>
                    <option value="networking">Networking</option>
                    <option value="mentorship">Mentorship</option>
                    <option value="workshop">Workshop</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={newEvent.date || ''}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Attendees</label>
                    <input
                      type="number"
                      value={newEvent.maxAttendees || ''}
                      onChange={(e) => setNewEvent({...newEvent, maxAttendees: Number(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={newEvent.location || ''}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newEvent.description || ''}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter event description"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsCreateEventModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateEvent}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alumni;
