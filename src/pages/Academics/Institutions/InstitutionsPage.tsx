import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus } from 'lucide-react';
import { mockInstitutions } from '../data/mockData';
import { Institution } from '../../../types/index'
import { SearchBar } from '../UI/SearchBar';
import { Table } from '../UI/Table';
import { StatusToggle } from '../UI/StatusToggle';
import { Pagination } from '../UI/Pagination';
import { usePagination } from '../hooks/usePagination';

export const InstitutionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [institutions, setInstitutions] = useState<Institution[]>(mockInstitutions);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInstitutions = useMemo(() => {
    return institutions.filter(institution =>
      institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [institutions, searchTerm]);

  const pagination = usePagination({
    data: filteredInstitutions,
    itemsPerPage: 10
  });

  const handleStatusToggle = (institutionId: string, newStatus: 'active' | 'inactive') => {
    setInstitutions(prev => prev.map(institution =>
      institution.id === institutionId ? { ...institution, status: newStatus } : institution
    ));
  };

  const columns = [
    { key: 'code', label: 'Institution ID' },
    { key: 'name', label: 'Institution Name' },
    { key: 'type', label: 'Type' },
    { key: 'location', label: 'Location' },
  ];

  const renderActions = (institution: Institution) => (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => navigate(`/home/institutions/edit/${institution.id}`)}
        className="text-purple-600 hover:text-purple-900 transition-colors duration-150"
      >
        <Edit className="h-4 w-4" />
      </button>
      <StatusToggle
        isActive={institution.status === 'active'}
        onChange={(isActive) => handleStatusToggle(institution.id, isActive ? 'active' : 'inactive')}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">MANAGE INSTITUTIONS</h1>
          <p className="text-gray-600 mt-1">Manage institution information</p>
        </div>
        <button
          onClick={() => navigate('/home/institutions/add')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Institution
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Institutions List</h2>
            <div className="w-80">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search institutions..."
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