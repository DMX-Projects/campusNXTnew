import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus } from 'lucide-react';
import { mockUsers } from '../../../../data/mockData';
import { User } from '../../../../data/mockData';
import { SearchBar } from '../../../../components/UI/SearchBar';
import { Table } from '../../../../components/UI/Table';
import { StatusToggle } from '../../../../components/UI/StatusToggle';
import { Pagination } from '../../../../components/UI/Pagination';
import { usePagination } from '../../../../hooks/usePagination';

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortBy, setSortBy] = useState<'username' | 'role' | 'firstName'>('username');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const toggleSort = (column: 'username' | 'role' | 'firstName') => {
    if (sortBy === column) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const filteredUsers = useMemo(() => {
    let data = users.filter(user =>
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()))
      && (roleFilter ? user.role === roleFilter : true)
    );
    return data.sort((a, b) => {
      const aVal = a[sortBy].toLowerCase();
      const bVal = b[sortBy].toLowerCase();
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [users, searchTerm, roleFilter, sortBy, sortOrder]);

  const pagination = usePagination({
    data: filteredUsers,
    itemsPerPage: 10,
  });

  const handleStatusToggle = (userId: string, newStatus: 'active' | 'inactive') => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user,
      ),
    );
  };

  const columns = [
    { key: 'username', label: 'User Name', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'firstName', label: 'First Name', sortable: true },
  ];

  const renderActions = (user: User) => (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => navigate(`/home/users/edit/${user.id}`)}
        className="text-purple-600 hover:text-purple-900 transition-colors duration-150"
      >
        <Edit className="h-4 w-4" />
      </button>
      <StatusToggle
        isActive={user.status === 'active'}
        onChange={isActive => handleStatusToggle(user.id, isActive ? 'active' : 'inactive')}
      />
    </div>
  );

  return (
    <div className="space-y-6 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">MANAGE USERS</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage system users and their permissions</p>
        </div>
        <button
          onClick={() => navigate('/home/users/add')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h2 className="text-lg font-medium">Users List</h2>
          <div className="flex space-x-4">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search users..."
            />
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out"
              aria-label="Filter by role"
            >
              <option value="">All Roles</option>
              <option value="STU">Student</option>
              <option value="FAC">Faculty</option>
              <option value="ADM">Administrator</option>
              <option value="HOD">Head of Department</option>
            </select>
          </div>
        </div>

        <Table
          columns={columns.map(col => ({
            ...col,
            label: (
              <button
                onClick={() => col.sortable && toggleSort(col.key as 'username' | 'role' | 'firstName')}
                className="flex items-center space-x-1 focus:outline-none"
                aria-label={`Sort by ${col.label}`}
              >
                <span>{col.label}</span>
                {sortBy === col.key && (
                  <span aria-hidden="true">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                )}
              </button>
            )
          }))}
          data={pagination.paginatedData}
          actions={renderActions}
          className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
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
