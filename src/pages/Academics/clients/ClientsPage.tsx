import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus } from 'lucide-react';
import { mockClients } from "../data/mockData"
import { Client } from '../../../types/index'
import { SearchBar } from '../UI/SearchBar'
import { Table } from '../UI/Table'
import { StatusToggle } from '../UI/StatusToggle'
import { Pagination } from '../UI/Pagination'
import { usePagination } from '../hooks/usePagination'

export const ClientsPage: React.FC = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = useMemo(() => {
    return clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.organization.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clients, searchTerm]);

  const pagination = usePagination({
    data: filteredClients,
    itemsPerPage: 10
  });

  const handleStatusToggle = (clientId: string, newStatus: 'active' | 'inactive') => {
    setClients(prev => prev.map(client =>
      client.id === clientId ? { ...client, status: newStatus } : client
    ));
  };

  const columns = [
    { key: 'name', label: 'Client Name' },
    { key: 'organization', label: 'Organization' },
    { key: 'email', label: 'Email' },
  ];

  const renderActions = (client: Client) => (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => navigate(`/home/clients/edit/${client.id}`)}
        className="text-purple-600 hover:text-purple-900 transition-colors duration-150"
      >
        <Edit className="h-4 w-4" />
      </button>
      <StatusToggle
        isActive={client.status === 'active'}
        onChange={(isActive) => handleStatusToggle(client.id, isActive ? 'active' : 'inactive')}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">MANAGE CLIENTS</h1>
          <p className="text-gray-600 mt-1">Manage external clients and partners</p>
        </div>
        <button
          onClick={() => navigate('/home/clients/add')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Clients List</h2>
            <div className="w-80">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search clients..."
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