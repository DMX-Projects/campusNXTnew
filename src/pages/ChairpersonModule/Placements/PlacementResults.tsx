// pages/PlacementResults.tsx
import React, { useState } from "react";
import {
  TrophyIcon,
  ChartBarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const PlacementResults: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const placementStats = {
    totalStudents: 450,
    placedStudents: 378,
    placementPercentage: 84,
    averagePackage: 6.2,
    highestPackage: 45.0,
    companiesVisited: 67,
  };

  const placementResults = [
    {
      id: 1,
      studentName: "Rahul Sharma",
      rollNumber: "CS21001",
      company: "Google",
      package: 45.0,
      position: "Software Engineer",
      placementDate: "2025-08-15",
      department: "Computer Science",
    },
    {
      id: 2,
      studentName: "Priya Patel",
      rollNumber: "IT21002",
      company: "Microsoft",
      package: 38.5,
      position: "SDE-1",
      placementDate: "2025-08-12",
      department: "Information Technology",
    },
    {
      id: 3,
      studentName: "Amit Kumar",
      rollNumber: "CS21003",
      company: "Amazon",
      package: 35.0,
      position: "Software Developer",
      placementDate: "2025-08-10",
      department: "Computer Science",
    },
    {
      id: 4,
      studentName: "Sneha Singh",
      rollNumber: "IT21004",
      company: "TCS",
      package: 4.5,
      position: "System Engineer",
      placementDate: "2025-08-08",
      department: "Information Technology",
    },
  ];

  const departmentStats = [
    { department: "Computer Science", total: 150, placed: 135, percentage: 90 },
    { department: "Information Technology", total: 120, placed: 102, percentage: 85 },
    { department: "Electronics", total: 100, placed: 78, percentage: 78 },
    { department: "Mechanical", total: 80, placed: 63, percentage: 79 },
  ];

  const filteredResults = placementResults.filter(
    (result) =>
      result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Placement Results</h1>
        <select 
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="2025">Academic Year 2024-25</option>
          <option value="2024">Academic Year 2023-24</option>
          <option value="2023">Academic Year 2022-23</option>
        </select>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-md p-3">
              <UserGroupIcon className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-semibold text-gray-900">{placementStats.totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-md p-3">
              <TrophyIcon className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Placed Students</p>
              <p className="text-2xl font-semibold text-gray-900">{placementStats.placedStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-yellow-500 rounded-md p-3">
              <ChartBarIcon className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Placement %</p>
              <p className="text-2xl font-semibold text-gray-900">{placementStats.placementPercentage}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 rounded-md p-3">
              <BuildingOfficeIcon className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Companies Visited</p>
              <p className="text-2xl font-semibold text-gray-900">{placementStats.companiesVisited}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Average Package</p>
            <p className="text-2xl font-semibold text-gray-900">₹{placementStats.averagePackage} LPA</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Highest Package</p>
            <p className="text-2xl font-semibold text-gray-900">₹{placementStats.highestPackage} LPA</p>
          </div>
        </div>
      </div>

      {/* Department-wise Statistics */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Department-wise Placement Statistics</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Total Students</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Placed</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Percentage</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Progress</th>
                </tr>
              </thead>
              <tbody>
                {departmentStats.map((dept, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">{dept.department}</td>
                    <td className="py-3 px-4">{dept.total}</td>
                    <td className="py-3 px-4">{dept.placed}</td>
                    <td className="py-3 px-4">{dept.percentage}%</td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${dept.percentage}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Placement Results Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Placements</h2>
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search placements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{result.studentName}</div>
                      <div className="text-sm text-gray-500">
                        {result.rollNumber} • {result.department}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{result.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₹{result.package} LPA</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.placementDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      onClick={() => {
                        setSelectedStudent(result);
                        setShowCertificate(false);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-900"
                      onClick={() => {
                        setSelectedStudent(result);
                        setShowCertificate(true);
                      }}
                    >
                      Certificate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            {!showCertificate ? (
              <>
                <h3 className="text-xl font-semibold mb-4">Placement Details</h3>
                <p><strong>Name:</strong> {selectedStudent.studentName}</p>
                <p><strong>Roll No:</strong> {selectedStudent.rollNumber}</p>
                <p><strong>Department:</strong> {selectedStudent.department}</p>
                <p><strong>Company:</strong> {selectedStudent.company}</p>
                <p><strong>Position:</strong> {selectedStudent.position}</p>
                <p><strong>Package:</strong> ₹{selectedStudent.package} LPA</p>
                <p><strong>Date:</strong> {selectedStudent.placementDate}</p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4">Placement Certificate</h3>
                <div className="border border-dashed border-gray-400 rounded-lg p-8 text-center">
                  <p className="text-lg font-bold">Certificate of Placement</p>
                  <p className="mt-4">
                    This is to certify that <strong>{selectedStudent.studentName}</strong> 
                    ({selectedStudent.rollNumber}) has been successfully placed at{" "}
                    <strong>{selectedStudent.company}</strong> as a{" "}
                    <strong>{selectedStudent.position}</strong> with a package of{" "}
                    <strong>₹{selectedStudent.package} LPA</strong>.
                  </p>
                  <p className="mt-6 text-gray-500">[Dummy Certificate Preview]</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementResults;
