import React, { useState } from 'react';
import { FileText, Search, Filter, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { documents } from './data/mockData';

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.documentType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.documentType === filterType;
    return matchesSearch && matchesType;
  });

  const statusColors = {
    valid: 'text-green-600 bg-green-50',
    expiring: 'text-yellow-600 bg-yellow-50',
    expired: 'text-red-600 bg-red-50',
  };

  const statusIcons = {
    valid: CheckCircle,
    expiring: Clock,
    expired: AlertTriangle,
  };

  const documentTypeColors = {
    insurance: 'text-blue-600 bg-blue-50',
    registration: 'text-purple-600 bg-purple-50',
    fitness: 'text-green-600 bg-green-50',
    permit: 'text-orange-600 bg-orange-50',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Vehicle Documents</h3>
          <p className="text-sm text-gray-600">Monitor document expiry dates and renewals</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Document
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by bus number or document type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Documents</option>
              <option value="insurance">Insurance</option>
              <option value="registration">Registration</option>
              <option value="fitness">Fitness</option>
              <option value="permit">Permit</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Bus Number</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Document Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Issue Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Expiry Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDocuments.map((document) => {
                const StatusIcon = statusIcons[document.status];
                
                return (
                  <tr key={document.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{document.busNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${documentTypeColors[document.documentType]}`}>
                        {document.documentType}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-gray-800">
                        <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                        {document.issueDate}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-gray-800">
                        <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                        {document.expiryDate}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${statusColors[document.status]}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span className="capitalize">{document.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                        <button className="text-green-600 hover:text-green-800 text-sm font-medium">Renew</button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Edit</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}