// src/components/ManagementAdmissionProcess.tsx

import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, X, Check, XCircle, Clock } from 'lucide-react';

// Mock Data & Types
type ApplicantStatus = 'Under Review' | 'Approved' | 'Rejected' | 'On Hold';
type Applicant = {
  id: string;
  name: string;
  course: string;
  status: ApplicantStatus;
  remarks: string;
};

const initialApplicants: Applicant[] = [
  { id: 'MQ25001', name: 'Riya Kapoor', course: 'B.Tech CSE', status: 'Approved', remarks: 'High academic scores.' },
  { id: 'MQ25002', name: 'Arjun Mehta', course: 'MBA', status: 'Under Review', remarks: 'Awaiting interview feedback.' },
  { id: 'MQ25003', name: 'Sana Ali', course: 'B.Com', status: 'Rejected', remarks: 'Incomplete documentation.' },
  { id: 'MQ25004', name: 'Vikram Singh', course: 'B.Tech ECE', status: 'On Hold', remarks: 'Pending decision from board.' },
  { id: 'MQ25005', name: 'Neha Sharma', course: 'B.Tech CSE', status: 'Under Review', remarks: '' },
];

const getStatusChip = (status: ApplicantStatus) => {
    switch(status) {
        case 'Approved': return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        case 'Under Review': return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
        case 'Rejected': return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
        case 'On Hold': return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    }
};

const ManagementAdmissionProcess = () => {
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApplicants = applicants.filter(applicant => 
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id: string, newStatus: ApplicantStatus) => {
    setApplicants(applicants.map(app => app.id === id ? {...app, status: newStatus} : app));
    // In a real app, an API call would be made here.
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Management Quota Admissions</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage the lifecycle of direct admissions from application to approval.</p>
      </header>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
        {/* Table Actions Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
            <input 
                type="text" 
                placeholder="Search by applicant name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            <Plus className="w-5 h-5" /> Add New Applicant
          </button>
        </div>

        {/* Applicants Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Applicant Name</th>
                <th className="px-6 py-3">Course Applied</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Remarks</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((applicant) => (
                <tr key={applicant.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium">{applicant.name}</td>
                  <td className="px-6 py-4">{applicant.course}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusChip(applicant.status)}`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 italic">{applicant.remarks || '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative group">
                      <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 hidden group-hover:block">
                        <a href="#" onClick={() => handleStatusChange(applicant.id, 'Approved')} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"><Check className="w-4 h-4 text-green-500"/>Approve</a>
                        <a href="#" onClick={() => handleStatusChange(applicant.id, 'Rejected')} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"><XCircle className="w-4 h-4 text-red-500"/>Reject</a>
                        <a href="#" onClick={() => handleStatusChange(applicant.id, 'On Hold')} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"><Clock className="w-4 h-4 text-yellow-500"/>Put on Hold</a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Applicant Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg">
            <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold">Add New Applicant</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form className="p-6 space-y-4">
              {/* Form fields would go here */}
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" className="w-full p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter student's name"/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Academic Scores (%)</label>
                <input type="number" className="w-full p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., 95.5"/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Select Course</label>
                <select className="w-full p-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>B.Tech CSE</option>
                    <option>B.Tech ECE</option>
                    <option>MBA</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">Save Applicant</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementAdmissionProcess;