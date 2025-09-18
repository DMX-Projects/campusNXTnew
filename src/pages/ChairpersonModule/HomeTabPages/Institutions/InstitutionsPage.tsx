import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus, Filter } from 'lucide-react';
import { mockInstitutions,Institution } from '../../../../data/mockData';
import { SearchBar } from '../../../../components/UI/SearchBar';
import { Table } from '../../../../components/UI/Table';
import { StatusToggle } from '../../../../components/UI/StatusToggle';
import { Pagination } from '../../../../components/UI/Pagination';
import { usePagination } from '../../../../hooks/usePagination';

export const InstitutionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [institutions, setInstitutions] = useState<Institution[]>(mockInstitutions);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    status: ''
  });

  const filteredInstitutions = useMemo(() => {
    return institutions.filter(institution => {
      const matchesSearch = 
        institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institution.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institution.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institution.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = !filters.type || institution.type === filters.type;
      const matchesLocation = !filters.location || institution.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesStatus = !filters.status || institution.status === filters.status;
      
      return matchesSearch && matchesType && matchesLocation && matchesStatus;
    });
  }, [institutions, searchTerm, filters]);

  const pagination = usePagination({
    data: filteredInstitutions,
    itemsPerPage: 10
  });

  const handleStatusToggle = (institutionId: string, newStatus: 'active' | 'inactive') => {
    setInstitutions(prev => prev.map(institution =>
      institution.id === institutionId ? { ...institution, status: newStatus } : institution
    ));
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    pagination.goToPage(1);
  };

  const clearFilters = () => {
    setFilters({ type: '', location: '', status: '' });
    pagination.goToPage(1);
  };

  // Get unique values for filter options
  const typeOptions = [...new Set(institutions.map(inst => inst.type))];
  const locationOptions = [...new Set(institutions.map(inst => inst.location))];

  const columns = [
    { key: 'code', label: 'Institution Code' },
    { key: 'name', label: 'Institution Name' },
    { key: 'type', label: 'Type' },
    { key: 'location', label: 'Institution Location' },
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
            <div className="flex items-center space-x-4">
              <div className="w-80">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search institutions..."
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">All Types</option>
                    {typeOptions.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">All Locations</option>
                    {locationOptions.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
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