import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Search, Phone, MapPin, Briefcase } from 'lucide-react';

// Mock data - replace with your actual data source
const staff = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    designation: "Professor",
    department: "Computer Science",
    busRoute: "Route A1",
    pickupPoint: "Central Plaza",
    contact: "+91 98765 43210"
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    designation: "Associate Professor",
    department: "Mathematics",
    busRoute: "Route B2",
    pickupPoint: "Tech Park Gate",
    contact: "+91 98765 43211"
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    designation: "Assistant Professor",
    department: "Physics",
    busRoute: "Route C3",
    pickupPoint: "Metro Station",
    contact: "+91 98765 43212"
  },
  {
    id: 4,
    name: "Prof. Rajesh Kumar",
    designation: "Professor",
    department: "Chemistry",
    busRoute: "Route A1",
    pickupPoint: "City Center",
    contact: "+91 98765 43213"
  },
  {
    id: 5,
    name: "Dr. Anjali Reddy",
    designation: "Assistant Professor",
    department: "Biology",
    busRoute: "Route B2",
    pickupPoint: "Hospital Junction",
    contact: "+91 98765 43214"
  }
];

export default function StaffList() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Add this import and hook
  
  const handleAddStaff = () => {
    // Navigate to add faculty page using the path from your TransportRoutes
    navigate('/transport/add-faculty');
  };

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800"></h3>
            <p className="text-sm text-gray-600"></p>
          </div>

          <button
            onClick={handleAddStaff}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Staff Member
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search staff members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((member) => (
              <div
                key={member.id}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {member.designation}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Department</span>
                    <span className="font-medium text-gray-800">{member.department}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Route</span>
                    <span className="font-medium text-gray-800">{member.busRoute}</span>
                  </div>

                  <div className="flex items-start justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Pickup
                    </span>
                    <span className="font-medium text-gray-800 text-right">{member.pickupPoint}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      Contact
                    </span>
                    <span className="font-medium text-gray-800">{member.contact}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-300">
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        View Details
                      </button>
                      <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No staff members found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}