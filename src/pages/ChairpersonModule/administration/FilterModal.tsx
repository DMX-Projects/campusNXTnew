import React from 'react';
import { X, Filter } from 'lucide-react';
import { FilterOptions } from '../types/student';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters
}) => {
  if (!isOpen) return null;

  const programs = ['XI Arts', 'XI Science', 'XII Arts', 'XII Science'];
  const genders = ['Male', 'Female', 'Other'];
  const statuses = ['CAP', 'MANAGEMENT', 'SCHOLARSHIP'];
  const castes = ['General', 'OPEN', 'OBC', 'SC', 'ST', 'EWS'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 border border-gray-100">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <Filter className="w-5 h-5 mr-2 text-blue-600" />
            Filter Students
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Program Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program
              </label>
              <select
                value={filters.program}
                onChange={(e) => onFiltersChange({ ...filters, program: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">All Programs</option>
                {programs.map(program => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={filters.gender}
                onChange={(e) => onFiltersChange({ ...filters, gender: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">All Genders</option>
                {genders.map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Caste Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category/Caste
              </label>
              <select
                value={filters.caste}
                onChange={(e) => onFiltersChange({ ...filters, caste: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">All Categories</option>
                {castes.map(caste => (
                  <option key={caste} value={caste}>{caste}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClearFilters}
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200"
          >
            Clear All
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onApplyFilters}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;