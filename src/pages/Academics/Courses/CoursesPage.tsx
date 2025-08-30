 import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus } from 'lucide-react';
import { mockCourses } from  '../../Academics/data/mockData'
import { Course } from '../../Academics/Courses/CoursesPage'
import { SearchBar } from '../UI/SearchBar'
import { Table } from '../UI/Table'
import { StatusToggle } from '../UI/StatusToggle'
import { Pagination } from '../UI/Pagination';
import { usePagination } from '../hooks/usePagination';

 const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = useMemo(() => {
    return courses.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courses, searchTerm]);

  const pagination = usePagination({
    data: filteredCourses,
    itemsPerPage: 10
  });

  const handleStatusToggle = (courseId: string, newStatus: 'active' | 'inactive') => {
    setCourses(prev => prev.map(course =>
      course.id === courseId ? { ...course, status: newStatus } : course
    ));
  };

  const columns = [
    { key: 'code', label: 'Course ID' },
    { key: 'name', label: 'Course Name' },
    { key: 'credits', label: 'Credits' },
  ];

  const renderActions = (course: Course) => (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => navigate(`/home/courses/edit/${course.id}`)}
        className="text-purple-600 hover:text-purple-900 transition-colors duration-150"
      >
        <Edit className="h-4 w-4" />
      </button>
      <StatusToggle
        isActive={course.status === 'active'}
        onChange={(isActive) => handleStatusToggle(course.id, isActive ? 'active' : 'inactive')}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">MANAGE COURSES</h1>
          <p className="text-gray-600 mt-1">Manage course catalog and information</p>
        </div>
        <button
          onClick={() => navigate('/home/courses/add')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Courses List</h2>
            <div className="w-80">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search courses..."
              />
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          data={pagination.paginatedData}
          actions={renderActions}
        />

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          itemsPerPage={pagination.itemsPerPage}
          totalItems={pagination.totalItems}
          onPageChange={pagination.goToPage}
          onPrevious={pagination.goToPrevious}
          onNext={pagination.goToNext}
        />
      </div>
    </div>
  );
};

export default CoursesPage;