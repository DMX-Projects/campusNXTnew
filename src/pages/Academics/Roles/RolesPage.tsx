import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus } from 'lucide-react';
import { mockRoles } from '../data/mockData';
import { Role } from '../../../types/index';
import { SearchBar } from '../UI/SearchBar';
import { Table } from '../UI/Table';
import { StatusToggle } from '../UI/StatusToggle';
import { Pagination } from '../UI/Pagination';
import { usePagination } from '../hooks/usePagination';

export const RolesPage: React.FC = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoles = useMemo(() => {
    return roles.filter(role =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [roles, searchTerm]);

  const pagination = usePagination({
    data: filteredRoles,
    itemsPerPage: 10
  });

  const handleStatusToggle = (roleId: string, newStatus: 'active' | 'inactive') => {
    setRoles(prev => prev.map(role =>
      role.id === roleId ? { ...role, status: newStatus } : role
    ));
  };

  const columns = [
    { key: 'name', label: 'Role Name' },
    { key: 'description', label: 'Description' },
  ];

  const renderActions = (role: Role) => (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => navigate(`/home/roles/edit/${role.id}`)}
        className="text-purple-600 hover:text-purple-900 transition-colors duration-150"
      >
        <Edit className="h-4 w-4" />
      </button>
      <StatusToggle
        isActive={role.status === 'active'}
        onChange={(isActive) => handleStatusToggle(role.id, isActive ? 'active' : 'inactive')}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">MANAGE ROLES</h1>
          <p className="text-gray-600 mt-1">Manage user roles and permissions</p>
        </div>
        <button
          onClick={() => navigate('/home/roles/add')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Role
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Roles List</h2>
            <div className="w-80">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search roles..."
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