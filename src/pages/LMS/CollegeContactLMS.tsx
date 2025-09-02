import React, { useState } from 'react';
import { PhoneIcon, MailIcon, MapPinIcon, SearchIcon, PlusIcon, EditIcon, TrashIcon, UserIcon, BuildingIcon } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  extension?: string;
  office: string;
  category: 'faculty' | 'staff' | 'administration' | 'emergency' | 'external';
  isPublic: boolean;
  photoUrl: string;
  specialization?: string;
  availability: string;
  lastUpdated: string;
}

interface Department {
  id: string;
  name: string;
  head: string;
  location: string;
  email: string;
  phone: string;
  description: string;
}

const CollegeContact: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      position: 'Principal',
      department: 'Administration',
      email: 'principal@college.edu',
      phone: '+91-80-12345678',
      extension: '101',
      office: 'Admin Block, Room 101',
      category: 'administration',
      isPublic: true,
      photoUrl: '👨‍💼',
      availability: 'Mon-Fri: 9:00 AM - 5:00 PM',
      lastUpdated: '2025-08-15'
    },
    {
      id: '2',
      name: 'Dr. Priya Sharma',
      position: 'Professor & HOD',
      department: 'CSE',
      email: 'priya.sharma@college.edu',
      phone: '+91-80-12345679',
      extension: '201',
      office: 'CSE Block, Room 201',
      category: 'faculty',
      isPublic: true,
      photoUrl: '👩‍🏫',
      specialization: 'Data Structures, Machine Learning',
      availability: 'Mon-Fri: 10:00 AM - 4:00 PM',
      lastUpdated: '2025-08-20'
    },
    {
      id: '3',
      name: 'Emergency Services',
      position: 'Campus Security',
      department: 'Security',
      email: 'security@college.edu',
      phone: '+91-80-12345000',
      office: 'Security Gate',
      category: 'emergency',
      isPublic: true,
      photoUrl: '🚨',
      availability: '24/7',
      lastUpdated: '2025-08-01'
    },
    {
      id: '4',
      name: 'Ms. Anita Singh',
      position: 'Registrar',
      department: 'Academic Office',
      email: 'registrar@college.edu',
      phone: '+91-80-12345680',
      extension: '102',
      office: 'Admin Block, Room 102',
      category: 'administration',
      isPublic: true,
      photoUrl: '👩‍💻',
      availability: 'Mon-Fri: 9:30 AM - 4:30 PM',
      lastUpdated: '2025-08-10'
    }
  ]);

  const [departments] = useState<Department[]>([
    {
      id: '1',
      name: 'Computer Science Engineering',
      head: 'Dr. Priya Sharma',
      location: 'CSE Block, 2nd Floor',
      email: 'cse@college.edu',
      phone: '+91-80-12345200',
      description: 'Department of Computer Science and Engineering offers undergraduate and postgraduate programs'
    },
    {
      id: '2',
      name: 'Electronics & Communication',
      head: 'Prof. Vikram Reddy',
      location: 'ECE Block, 3rd Floor',
      email: 'ece@college.edu',
      phone: '+91-80-12345300',
      description: 'Department of Electronics and Communication Engineering'
    },
    {
      id: '3',
      name: 'Mechanical Engineering',
      head: 'Dr. Suresh Kumar',
      location: 'ME Block, Ground Floor',
      email: 'me@college.edu',
      phone: '+91-80-12345400',
      description: 'Department of Mechanical Engineering with state-of-the-art labs'
    }
  ]);

  const [selectedTab, setSelectedTab] = useState<'contacts' | 'departments'>('contacts');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newContact, setNewContact] = useState<Partial<Contact>>({});

  const categories = ['faculty', 'staff', 'administration', 'emergency', 'external'];
  const departmentNames = ['Administration', 'CSE', 'ECE', 'ME', 'CE', 'EE', 'IT', 'Security', 'Library', 'Accounts'];

  const filteredContacts = contacts.filter(contact => {
    return (
      (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       contact.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
       contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       contact.phone.includes(searchTerm)) &&
      (selectedCategory === 'all' || contact.category === selectedCategory) &&
      (selectedDepartment === 'all' || contact.department === selectedDepartment)
    );
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.email && newContact.phone) {
      const contact: Contact = {
        id: Date.now().toString(),
        name: newContact.name,
        position: newContact.position || '',
        department: newContact.department || 'Administration',
        email: newContact.email,
        phone: newContact.phone,
        extension: newContact.extension,
        office: newContact.office || '',
        category: newContact.category || 'staff',
        isPublic: newContact.isPublic ?? true,
        photoUrl: newContact.photoUrl || '👤',
        specialization: newContact.specialization,
        availability: newContact.availability || 'Mon-Fri: 9:00 AM - 5:00 PM',
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      setContacts([...contacts, contact]);
      setNewContact({});
      setIsAddContactModalOpen(false);
      alert('Contact added successfully!');
    }
  };

  const handleEditContact = () => {
    if (selectedContact && newContact.name && newContact.email && newContact.phone) {
      const updatedContacts = contacts.map(contact => 
        contact.id === selectedContact.id 
          ? { 
              ...contact, 
              ...newContact,
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : contact
      );
      setContacts(updatedContacts);
      setNewContact({});
      setSelectedContact(null);
      setIsEditContactModalOpen(false);
      alert('Contact updated successfully!');
    }
  };

  const handleDeleteContact = (contactId: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(contact => contact.id !== contactId));
      alert('Contact deleted successfully!');
    }
  };

  const togglePublicStatus = (contactId: string) => {
    const updatedContacts = contacts.map(contact => 
      contact.id === contactId 
        ? { ...contact, isPublic: !contact.isPublic }
        : contact
    );
    setContacts(updatedContacts);
  };

  const exportContacts = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Position,Department,Email,Phone,Office,Category,Availability\n" +
      filteredContacts.map(contact => 
        `"${contact.name}","${contact.position}","${contact.department}",${contact.email},${contact.phone},"${contact.office}",${contact.category},"${contact.availability}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "college_contacts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      faculty: 'bg-blue-100 text-blue-800',
      staff: 'bg-green-100 text-green-800',
      administration: 'bg-purple-100 text-purple-800',
      emergency: 'bg-red-100 text-red-800',
      external: 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors];
  };

  const stats = {
    totalContacts: contacts.length,
    publicContacts: contacts.filter(c => c.isPublic).length,
    facultyCount: contacts.filter(c => c.category === 'faculty').length,
    departmentCount: departments.length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">College Contact Directory</h1>
              <p className="text-gray-600 mt-1">Manage faculty, staff, and administrative contacts</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsAddContactModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Add Contact
              </button>
              <button
                onClick={exportContacts}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Export Directory
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search contacts by name, position, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              {departmentNames.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { key: 'contacts', label: 'Contacts', icon: UserIcon },
              { key: 'departments', label: 'Departments', icon: BuildingIcon }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedTab(key as unknown as 'contacts' | 'departments')}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalContacts}</p>
              </div>
              <UserIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Public Contacts</p>
                <p className="text-2xl font-bold text-green-600">{stats.publicContacts}</p>
              </div>
              <div className="text-2xl">🌐</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Faculty Members</p>
                <p className="text-2xl font-bold text-purple-600">{stats.facultyCount}</p>
              </div>
              <div className="text-2xl">👩‍🏫</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Departments</p>
                <p className="text-2xl font-bold text-orange-600">{stats.departmentCount}</p>
              </div>
              <BuildingIcon className="text-orange-500" size={24} />
            </div>
          </div>
        </div>

        {/* Content based on selected tab */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            {selectedTab === 'contacts' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Directory ({filteredContacts.length})
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredContacts.map((contact) => (
                    <div key={contact.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-4xl">{contact.photoUrl}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                            <p className="text-sm text-gray-600">{contact.position}</p>
                            <p className="text-xs text-gray-500">{contact.department}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(contact.category)}`}>
                            {contact.category}
                          </span>
                          {contact.isPublic ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs text-center">
                              Public
                            </span>
                          ) : (
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs text-center">
                              Private
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MailIcon size={14} className="text-gray-400" />
                          <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                            {contact.email}
                          </a>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <PhoneIcon size={14} className="text-gray-400" />
                          <span>
                            {contact.phone}
                            {contact.extension && ` (Ext: ${contact.extension})`}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPinIcon size={14} className="text-gray-400" />
                          <span>{contact.office}</span>
                        </div>
                        
                        {contact.specialization && (
                          <div className="text-xs text-gray-600">
                            <span className="font-medium">Specialization:</span> {contact.specialization}
                          </div>
                        )}
                        
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">Availability:</span> {contact.availability}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedContact(contact);
                            setNewContact(contact);
                            setIsEditContactModalOpen(true);
                          }}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded transition-colors"
                        >
                          <EditIcon size={16} />
                        </button>
                        <button
                          onClick={() => togglePublicStatus(contact.id)}
                          className={`p-2 rounded transition-colors ${
                            contact.isPublic 
                              ? 'bg-green-100 hover:bg-green-200 text-green-700'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          🌐
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded transition-colors"
                        >
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {selectedTab === 'departments' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Departments ({departments.length})
                </h2>
                
                <div className="space-y-4">
                  {departments.map((dept) => (
                    <div key={dept.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg mb-2">{dept.name}</h3>
                          <p className="text-gray-600 mb-3">{dept.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <UserIcon size={14} className="text-gray-400" />
                                <span><strong>Head:</strong> {dept.head}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPinIcon size={14} className="text-gray-400" />
                                <span><strong>Location:</strong> {dept.location}</span>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <MailIcon size={14} className="text-gray-400" />
                                <a href={`mailto:${dept.email}`} className="text-blue-600 hover:underline">
                                  {dept.email}
                                </a>
                              </div>
                              <div className="flex items-center gap-2">
                                <PhoneIcon size={14} className="text-gray-400" />
                                <span>{dept.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm transition-colors">
                            View Faculty
                          </button>
                          <button className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg text-sm transition-colors">
                            Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Add Contact Modal */}
        {isAddContactModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Contact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newContact.name || ''}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    value={newContact.position || ''}
                    onChange={(e) => setNewContact({...newContact, position: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter position/designation"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={newContact.department || ''}
                    onChange={(e) => setNewContact({...newContact, department: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Department</option>
                    {departmentNames.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newContact.category || ''}
                    onChange={(e) => setNewContact({...newContact, category: e.target.value as Contact['category']})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newContact.email || ''}
                    onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newContact.phone || ''}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Extension (Optional)</label>
                  <input
                    type="text"
                    value={newContact.extension || ''}
                    onChange={(e) => setNewContact({...newContact, extension: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter extension"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Office Location</label>
                  <input
                    type="text"
                    value={newContact.office || ''}
                    onChange={(e) => setNewContact({...newContact, office: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter office location"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialization (Optional)</label>
                  <input
                    type="text"
                    value={newContact.specialization || ''}
                    onChange={(e) => setNewContact({...newContact, specialization: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter areas of specialization"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <input
                    type="text"
                    value={newContact.availability || ''}
                    onChange={(e) => setNewContact({...newContact, availability: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Mon-Fri: 9:00 AM - 5:00 PM"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newContact.isPublic ?? true}
                      onChange={(e) => setNewContact({...newContact, isPublic: e.target.checked})}
                      className="mr-2 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Make contact publicly visible</span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsAddContactModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddContact}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Contact
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Contact Modal */}
        {isEditContactModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Contact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newContact.name || ''}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    value={newContact.position || ''}
                    onChange={(e) => setNewContact({...newContact, position: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newContact.email || ''}
                    onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newContact.phone || ''}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newContact.isPublic ?? true}
                      onChange={(e) => setNewContact({...newContact, isPublic: e.target.checked})}
                      className="mr-2 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Make contact publicly visible</span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsEditContactModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditContact}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeContact;
