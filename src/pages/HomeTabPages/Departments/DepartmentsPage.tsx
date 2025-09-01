import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus } from 'lucide-react';
import { mockDepartments,Department } from '../../../data/mockData';

import { SearchBar } from '../../../components/UI/SearchBar';
import { Table } from '../../../components/UI/Table';
import { StatusToggle } from '../../../components/UI/StatusToggle';
import { Pagination } from '../../../components/UI/Pagination';
import { usePagination } from '../../../hooks/usePagination';

export const DepartmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDepartments = useMemo(() => {
    return departments.filter(dept =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.hod.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [departments, searchTerm]);

  const pagination = usePagination({
    data: filteredDepartments,
    itemsPerPage: 10
  });

  const handleStatusToggle = (deptId: string, newStatus: 'active' | 'inactive') => {
    setDepartments(prev => prev.map(dept =>
      dept.id === deptId ? { ...dept, status: newStatus } : dept
    ));
  };

  const columns = [
    { key: 'code', label: 'Dept ID' },
    { key: 'name', label: 'Department Name' },
    { key: 'hod', label: 'HOD' },
  ];

  const renderActions = (dept: Department) => (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => navigate(`/home/departments/edit/${dept.id}`)}
        className="text-purple-600 hover:text-purple-900 transition-colors duration-150"
      >
        <Edit className="h-4 w-4" />
      </button>
      <StatusToggle
        isActive={dept.status === 'active'}
        onChange={(isActive) => handleStatusToggle(dept.id, isActive ? 'active' : 'inactive')}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">MANAGE DEPARTMENTS</h1>
          <p className="text-gray-600 mt-1">Manage academic departments</p>
        </div>
        <button
          onClick={() => navigate('/home/departments/add')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Departments List</h2>
            <div className="w-80">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search departments..."
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