import React, { useState, useEffect } from 'react';
import { Download, Plus, Filter, DollarSign } from 'lucide-react';
import FeeTable from './FeeTable';
import AddFeeModal from './AddFeeModal';
import FilterBar from './FilterBar';
import { FeeStructure, FeeType } from '../types/fee';

const FeeTypesContent: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('CSE');
  const [feeData, setFeeData] = useState<FeeStructure[]>([]);
  const [filteredData, setFilteredData] = useState<FeeStructure[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingFee, setEditingFee] = useState<FeeStructure | null>(null);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ code: '', name: '' });
  const [filters, setFilters] = useState({
    feeType: '',
    year: '',
    semester: ''
  });

  const [courses, setCourses] = useState([
    { code: 'CSE', name: 'Computer Science Engineering' },
    { code: 'ECE', name: 'Electronics & Communication Engineering' },
    { code: 'EEE', name: 'Electrical & Electronics Engineering' },
    { code: 'ME', name: 'Mechanical Engineering' }
  ]);

  // Mock data for demonstration
  const mockData: Record<string, FeeStructure[]> = {
    CSE: [
      { id: '1', feeType: 'Tuition Fee', amount: 50000, year: '2024-25', semester: '1', status: 'Active', course: 'CSE' },
      { id: '2', feeType: 'Lab Fee', amount: 10000, year: '2024-25', semester: '1', status: 'Active', course: 'CSE' },
      { id: '3', feeType: 'Hostel Fee', amount: 25000, year: '2024-25', semester: '1', status: 'Active', course: 'CSE' },
      { id: '4', feeType: 'Transport Fee', amount: 8000, year: '2024-25', semester: '1', status: 'Active', course: 'CSE' },
      { id: '5', feeType: 'Tuition Fee', amount: 52000, year: '2024-25', semester: '2', status: 'Active', course: 'CSE' },
    ],
    ECE: [
      { id: '6', feeType: 'Tuition Fee', amount: 48000, year: '2024-25', semester: '1', status: 'Active', course: 'ECE' },
      { id: '7', feeType: 'Lab Fee', amount: 12000, year: '2024-25', semester: '1', status: 'Active', course: 'ECE' },
      { id: '8', feeType: 'Hostel Fee', amount: 24000, year: '2024-25', semester: '1', status: 'Active', course: 'ECE' },
      { id: '9', feeType: 'Transport Fee', amount: 8000, year: '2024-25', semester: '1', status: 'Active', course: 'ECE' },
    ],
    EEE: [
      { id: '10', feeType: 'Tuition Fee', amount: 47000, year: '2024-25', semester: '1', status: 'Active', course: 'EEE' },
      { id: '11', feeType: 'Lab Fee', amount: 11000, year: '2024-25', semester: '1', status: 'Active', course: 'EEE' },
      { id: '12', feeType: 'Hostel Fee', amount: 23000, year: '2024-25', semester: '1', status: 'Active', course: 'EEE' },
      { id: '13', feeType: 'Transport Fee', amount: 7500, year: '2024-25', semester: '1', status: 'Active', course: 'EEE' },
    ],
    ME: [
      { id: '14', feeType: 'Tuition Fee', amount: 46000, year: '2024-25', semester: '1', status: 'Active', course: 'ME' },
      { id: '15', feeType: 'Lab Fee', amount: 9000, year: '2024-25', semester: '1', status: 'Active', course: 'ME' },
      { id: '16', feeType: 'Hostel Fee', amount: 22000, year: '2024-25', semester: '1', status: 'Active', course: 'ME' },
      { id: '17', feeType: 'Transport Fee', amount: 7000, year: '2024-25', semester: '1', status: 'Active', course: 'ME' },
    ]
  };

  useEffect(() => {
    const courseData = mockData[selectedCourse] || [];
    setFeeData(courseData);
    setFilteredData(courseData);
  }, [selectedCourse]);

  useEffect(() => {
    let filtered = feeData;

    if (filters.feeType) {
      filtered = filtered.filter(fee => fee.feeType === filters.feeType);
    }
    if (filters.year) {
      filtered = filtered.filter(fee => fee.year === filters.year);
    }
    if (filters.semester) {
      filtered = filtered.filter(fee => fee.semester === filters.semester);
    }

    setFilteredData(filtered);
  }, [filters, feeData]);

  const handleAddFee = (newFee: Omit<FeeStructure, 'id'>) => {
    const fee: FeeStructure = {
      ...newFee,
      id: Date.now().toString(),
      course: selectedCourse
    };
    
    setFeeData(prev => [...prev, fee]);
    setIsAddModalOpen(false);
  };

  const handleEditFee = (updatedFee: FeeStructure) => {
    setFeeData(prev => prev.map(fee => 
      fee.id === updatedFee.id ? updatedFee : fee
    ));
    setEditingFee(null);
  };

  const handleDeleteFee = (feeId: string) => {
    if (window.confirm('Are you sure you want to delete this fee structure?')) {
      setFeeData(prev => prev.filter(fee => fee.id !== feeId));
    }
  };

  const handleDownload = () => {
    const csvContent = [
      ['Fee Type', 'Amount', 'Year', 'Semester', 'Status'],
      ...filteredData.map(fee => [
        fee.feeType,
        fee.amount.toString(),
        fee.year,
        fee.semester,
        fee.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCourse}_fee_structure.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleAddCourse = () => {
    if (newCourse.code.trim() && newCourse.name.trim()) {
      setCourses(prev => [...prev, { code: newCourse.code.trim(), name: newCourse.name.trim() }]);
      setNewCourse({ code: '', name: '' });
      setIsAddCourseModalOpen(false);
    }
  };

  const handleCancelAddCourse = () => {
    setNewCourse({ code: '', name: '' });
    setIsAddCourseModalOpen(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Fee Types Management</h1>
        
      </div>

      {/* Course Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {courses.map((course) => (
              <button
                key={course.code}
                onClick={() => setSelectedCourse(course.code)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  selectedCourse === course.code
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="font-semibold">{course.code}</span>
                  <span className="text-xs opacity-75">{course.name}</span>
                </div>
              </button>
            ))}
            <button
              onClick={() => setIsAddCourseModalOpen(true)}
              className="py-4 px-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all duration-200"
            >
              <div className="flex flex-col items-center space-y-1">
                <Plus className="w-4 h-4" />
                <span className="text-xs">Add Course</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="mb-6">
        <FilterBar 
          filters={filters}
          onFiltersChange={setFilters}
          onDownload={handleDownload}
          onAddFee={() => setIsAddModalOpen(true)}
          hasData={filteredData.length > 0}
        />
      </div>

      {/* Fee Table */}
      <FeeTable 
        data={filteredData}
        onEdit={setEditingFee}
        onDelete={handleDeleteFee}
      />

      {/* Add Fee Modal */}
      {isAddModalOpen && (
        <AddFeeModal
          onSave={handleAddFee}
          onCancel={() => setIsAddModalOpen(false)}
        />
      )}

      {/* Edit Fee Modal */}
      {editingFee && (
        <AddFeeModal
          existingFee={editingFee}
          onSave={handleEditFee}
          onCancel={() => setEditingFee(null)}
        />
      )}

      {/* Add Course Modal */}
      {isAddCourseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Course</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Code
                </label>
                <input
                  type="text"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, code: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., IT"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name
                </label>
                <input
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Information Technology"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCancelAddCourse}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCourse}
                disabled={!newCourse.code.trim() || !newCourse.name.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeTypesContent;