import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface Faculty {
  id: string;
  name: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  experience: string;
  qualification: string;
  joiningDate: string;
}

export default function PrincipalFacultyDetails() {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');

  const facultyData: Faculty[] = [
    {
      id: '1',
      name: 'Dr. John Smith',
      department: 'Computer Science',
      position: 'Professor',
      email: 'john.smith@college.edu',
      phone: '+1-234-567-8901',
      experience: '15 years',
      qualification: 'Ph.D. Computer Science',
      joiningDate: '2010-08-15'
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      department: 'Mathematics',
      position: 'Associate Professor',
      email: 'sarah.johnson@college.edu',
      phone: '+1-234-567-8902',
      experience: '12 years',
      qualification: 'Ph.D. Mathematics',
      joiningDate: '2012-01-20'
    },
    {
      id: '3',
      name: 'Prof. Michael Brown',
      department: 'Physics',
      position: 'Assistant Professor',
      email: 'michael.brown@college.edu',
      phone: '+1-234-567-8903',
      experience: '8 years',
      qualification: 'M.Sc. Physics',
      joiningDate: '2016-07-10'
    },
    {
      id: '4',
      name: 'Dr. Emily Davis',
      department: 'Computer Science',
      position: 'Assistant Professor',
      email: 'emily.davis@college.edu',
      phone: '+1-234-567-8904',
      experience: '6 years',
      qualification: 'Ph.D. Computer Engineering',
      joiningDate: '2018-09-01'
    },
    {
      id: '5',
      name: 'Prof. Robert Wilson',
      department: 'Chemistry',
      position: 'Professor',
      email: 'robert.wilson@college.edu',
      phone: '+1-234-567-8905',
      experience: '20 years',
      qualification: 'Ph.D. Chemistry',
      joiningDate: '2005-03-12'
    },
    {
      id: '6',
      name: 'Dr. Lisa Anderson',
      department: 'Biology',
      position: 'Associate Professor',
      email: 'lisa.anderson@college.edu',
      phone: '+1-234-567-8906',
      experience: '10 years',
      qualification: 'Ph.D. Biology',
      joiningDate: '2014-02-15'
    }
  ];

  const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
  const positions = ['Professor', 'Associate Professor', 'Assistant Professor'];
  const experienceRanges = ['0-5 years', '6-10 years', '11-15 years', '16+ years'];

  const filteredFaculty = facultyData.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.qualification.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || faculty.department === departmentFilter;
    const matchesPosition = positionFilter === 'all' || faculty.position === positionFilter;
    
    const experienceYears = parseInt(faculty.experience);
    const matchesExperience = experienceFilter === 'all' || 
      (experienceFilter === '0-5 years' && experienceYears <= 5) ||
      (experienceFilter === '6-10 years' && experienceYears >= 6 && experienceYears <= 10) ||
      (experienceFilter === '11-15 years' && experienceYears >= 11 && experienceYears <= 15) ||
      (experienceFilter === '16+ years' && experienceYears >= 16);
    
    return matchesSearch && matchesDepartment && matchesPosition && matchesExperience;
  });

  const departmentCounts = departments.reduce((acc, dept) => {
    acc[dept] = facultyData.filter(f => f.department === dept).length;
    return acc;
  }, {} as Record<string, number>);

  const filteredStats = {
    total: filteredFaculty.length,
    professors: filteredFaculty.filter(f => f.position === 'Professor').length,
    associate: filteredFaculty.filter(f => f.position === 'Associate Professor').length,
    assistant: filteredFaculty.filter(f => f.position === 'Assistant Professor').length
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('all');
    setPositionFilter('all');
    setExperienceFilter('all');
  };

  return (
    // Removed explicit background and let it inherit from parent
    <div className="space-y-6 p-6">
      
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl lg:text-4xl font-bold">
          Faculty Details
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage and view comprehensive faculty information
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="p-4 sm:p-6 rounded-xl transition-all duration-300 hover:scale-105 bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-600 shadow-md">
          <h3 className="text-xs sm:text-sm font-semibold mb-2 text-gray-600 dark:text-slate-400">
            Total Faculty
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
            {filteredStats.total}
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-xl transition-all duration-300 hover:scale-105 bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-slate-600 shadow-md">
          <h3 className="text-xs sm:text-sm font-semibold mb-2 text-gray-600 dark:text-slate-400">
            Professors
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {filteredStats.professors}
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-xl transition-all duration-300 hover:scale-105 bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-600 shadow-md">
          <h3 className="text-xs sm:text-sm font-semibold mb-2 text-gray-600 dark:text-slate-400">
            Associate Prof.
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400">
            {filteredStats.associate}
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-xl transition-all duration-300 hover:scale-105 bg-purple-50 dark:bg-slate-800 border border-purple-200 dark:border-slate-600 shadow-md">
          <h3 className="text-xs sm:text-sm font-semibold mb-2 text-gray-600 dark:text-slate-400">
            Assistant Prof.
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
            {filteredStats.assistant}
          </p>
        </div>
      </div>

      {/* Filters Panel */}
      <div className="p-4 sm:p-6 rounded-xl shadow-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-400" />
            <input
              type="text"
              placeholder="Search faculty by name, department, or qualification..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-sm sm:text-base rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400"
            />
          </div>
          
          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 flex-shrink-0 text-gray-400 dark:text-slate-400" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="flex-1 min-w-0 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept} ({departmentCounts[dept]})
                  </option>
                ))}
              </select>
            </div>
            
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
            >
              <option value="all">All Positions</option>
              {positions.map(position => (
                <option key={position} value={position}>
                  {position} ({facultyData.filter(f => f.position === position).length})
                </option>
              ))}
            </select>
            
            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
            >
              <option value="all">All Experience</option>
              {experienceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          {/* Clear filters button */}
          {(searchTerm || departmentFilter !== 'all' || positionFilter !== 'all' || experienceFilter !== 'all') && (
            <div className="flex justify-between items-center">
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 text-sm rounded-lg border transition-all duration-200 bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Active filters display */}
        {(searchTerm || departmentFilter !== 'all' || positionFilter !== 'all' || experienceFilter !== 'all') && (
          <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200 dark:border-slate-600">
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-full font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Search: "{searchTerm}"
                </span>
              )}
              {departmentFilter !== 'all' && (
                <span className="px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-full font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800">
                  Department: {departmentFilter}
                </span>
              )}
              {positionFilter !== 'all' && (
                <span className="px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-full font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  Position: {positionFilter}
                </span>
              )}
              {experienceFilter !== 'all' && (
                <span className="px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-full font-medium bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                  Experience: {experienceFilter}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Faculty Cards */}
      <div className="block sm:hidden">
        <div className="space-y-4">
          {filteredFaculty.length > 0 ? (
            filteredFaculty.map((faculty) => (
              <div key={faculty.id} className="p-4 rounded-xl border transition-all duration-200 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-slate-100">
                      {faculty.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                      {faculty.qualification}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-bold rounded-full border ${
                    faculty.position === 'Professor' 
                      ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                      : faculty.position === 'Associate Professor'
                      ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                      : 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                  }`}>
                    {faculty.position}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">Department:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-slate-200">{faculty.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">Experience:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-slate-200">{faculty.experience}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-slate-600">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{faculty.email}</p>
                    <p className="text-sm text-gray-500 dark:text-slate-400">{faculty.phone}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center rounded-xl border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400">
              <p className="text-lg mb-2 font-semibold">No faculty found</p>
              <p className="text-sm">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block rounded-xl overflow-hidden shadow-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300">
                  Faculty Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300">
                  Designation
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300">
                  Experience
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300">
                  Contact Information
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredFaculty.length > 0 ? (
                filteredFaculty.map((faculty) => (
                  <tr key={faculty.id} className="transition-all duration-200 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-5">
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-slate-100">
                          {faculty.name}
                        </div>
                        <div className="text-xs mt-1 text-gray-500 dark:text-slate-400">
                          {faculty.qualification}
                        </div>
                        <div className="text-xs mt-1 text-gray-400 dark:text-slate-500">
                          Joined: {new Date(faculty.joiningDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900 dark:text-slate-200">
                        {faculty.department}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-3 py-2 inline-flex text-xs leading-5 font-bold rounded-full border ${
                        faculty.position === 'Professor' 
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                          : faculty.position === 'Associate Professor'
                          ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                          : 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                      }`}>
                        {faculty.position}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900 dark:text-slate-200">
                        {faculty.experience}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {faculty.email}
                      </div>
                      <div className="text-sm mt-1 text-gray-500 dark:text-slate-400">
                        {faculty.phone}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="text-gray-500 dark:text-slate-400">
                      <p className="text-xl mb-3 font-semibold">No faculty found</p>
                      <p className="text-sm">Try adjusting your search criteria or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results Summary */}
      {filteredFaculty.length > 0 && (
        <div className="text-sm text-center py-4 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700">
          Showing <span className="font-semibold">{filteredFaculty.length}</span> of{' '}
          <span className="font-semibold">{facultyData.length}</span> faculty members
        </div>
      )}
    </div>
  );
}
