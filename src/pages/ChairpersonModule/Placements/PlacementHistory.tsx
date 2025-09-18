import React, { useState } from "react";

interface Placement {
  id: number;
  date: string;
  company: string;
  role: string;
  department: string;
  ctc: string;
  location: string;
}

const PlacementHistory: React.FC = () => {
  const [placements, setPlacements] = useState<Placement[]>([
    {
      id: 1,
      date: "2024-01-15",
      company: "Tech Solutions Inc.",
      role: "Software Engineer",
      department: "Engineering",
      ctc: "6 LPA",
      location: "Bangalore",
    },
    {
      id: 2,
      date: "2024-02-10",
      company: "Data Insights Ltd.",
      role: "Data Analyst",
      department: "Analytics",
      ctc: "5 LPA",
      location: "Hyderabad",
    },
    {
      id: 3,
      date: "2024-03-22",
      company: "Creative Agency",
      role: "Marketing Specialist",
      department: "Marketing",
      ctc: "4.5 LPA",
      location: "Mumbai",
    },
    {
      id: 4,
      date: "2024-04-05",
      company: "FinTech Global",
      role: "Business Analyst",
      department: "Finance",
      ctc: "7 LPA",
      location: "Pune",
    },
    {
      id: 5,
      date: "2024-05-18",
      company: "NextGen Robotics",
      role: "Robotics Engineer",
      department: "Mechanical",
      ctc: "8 LPA",
      location: "Chennai",
    },
    {
      id: 6,
      date: "2024-06-30",
      company: "HealthCare Plus",
      role: "ML Engineer",
      department: "Computer Science",
      ctc: "10 LPA",
      location: "Bangalore",
    },
    {
      id: 7,
      date: "2024-07-12",
      company: "EduTech Hub",
      role: "Frontend Developer",
      department: "IT",
      ctc: "5.5 LPA",
      location: "Delhi",
    },
    {
      id: 8,
      date: "2024-08-21",
      company: "Green Energy Corp",
      role: "Electrical Engineer",
      department: "Electrical",
      ctc: "6.2 LPA",
      location: "Hyderabad",
    },
    {
      id: 9,
      date: "2024-09-10",
      company: "CyberSecure Ltd.",
      role: "Cybersecurity Analyst",
      department: "Information Security",
      ctc: "9 LPA",
      location: "Noida",
    },
    {
      id: 10,
      date: "2024-10-02",
      company: "AI Innovators",
      role: "AI Research Associate",
      department: "Artificial Intelligence",
      ctc: "12 LPA",
      location: "Bangalore",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter placements based on search query
  const filteredPlacements = placements.filter(
    (p) =>
      p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ctc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              Company Placement History
            </h1>
            <p className="text-blue-100 mt-1">View all placement records and company visits</p>
          </div>

          {/* Search Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search by company, role, department, CTC, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="ml-4 text-sm text-gray-600 font-medium">
                Showing {filteredPlacements.length} of {placements.length} records
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    CTC
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlacements.map((placement) => (
                  <tr key={placement.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        #{placement.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(placement.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{placement.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{placement.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {placement.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-green-600">
                        ₹ {placement.ctc}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {placement.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* No Results Message */}
            {filteredPlacements.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No placement records found</div>
                <p className="text-gray-500">
                  {searchQuery ? 'Try adjusting your search criteria' : 'No records available at the moment'}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredPlacements.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Total Companies: <span className="font-semibold">{new Set(placements.map(p => p.company)).size}</span>
                  <span className="mx-2">•</span>
                  Total Departments: <span className="font-semibold">{new Set(placements.map(p => p.department)).size}</span>
                  <span className="mx-2">•</span>
                  Latest Update: <span className="font-semibold">{new Date().toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacementHistory;