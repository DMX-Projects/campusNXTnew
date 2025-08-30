import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus } from 'lucide-react';
import { mockPrograms } from '../data/mockData';
import { Program } from '../../../types/index';
import { SearchBar } from '../UI/SearchBar';
import { Table } from '../UI/Table';
import { StatusToggle } from '../UI/StatusToggle';
import { Pagination } from '../UI/Pagination';
import { usePagination } from '../hooks/usePagination';

export const ProgramsPage: React.FC = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Program[]>(mockPrograms);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrograms = useMemo(() => {
    return programs.filter(program =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [programs, searchTerm]);

  const pagination = usePagination({
    data: filteredPrograms,
    itemsPerPage: 10
  });

  const handleStatusToggle = (programId: string, newStatus: 'active' | 'inactive') => {
    setPrograms(prev => prev.map(program =>
      program.id === programId ? { ...program, status: newStatus } : program
    ));
  };

  const columns = [
    { key: 'code', label: 'Program ID' },
    { key: 'name', label: 'Program Name' },
    { key: 'duration', label: 'Duration' },
  ];

  const renderActions = (program: Program) => (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => navigate(`/home/programs/edit/${program.id}`)}
        className="text-purple-600 hover:text-purple-900 transition-colors duration-150"
      >
        <Edit className="h-4 w-4" />
      </button>
      <StatusToggle
        isActive={program.status === 'active'}
        onChange={(isActive) => handleStatusToggle(program.id, isActive ? 'active' : 'inactive')}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">MANAGE PROGRAMS</h1>
          <p className="text-gray-600 mt-1">Manage academic programs</p>
        </div>
        <button
          onClick={() => navigate('/home/programs/add')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Program
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Programs List</h2>
            <div className="w-80">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search programs..."
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