import React from 'react';
import { Download, Plus, Filter } from 'lucide-react';

interface FilterBarProps {
  filters: {
    feeType: string;
    year: string;
    semester: string;
  };
  onFiltersChange: (filters: any) => void;
  onDownload: () => void;
  onAddFee: () => void;
  hasData: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  filters, 
  onFiltersChange, 
  onDownload, 
  onAddFee,
  hasData 
}) => {
  const feeTypes = ['Tuition Fee', 'Lab Fee', 'Hostel Fee', 'Transport Fee'];
  const years = ['2024-25', '2023-24', '2022-23', '2021-22'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({ feeType: '', year: '', semester: '' });
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200">
  <div className="flex flex-wrap items-center justify-between gap-4">
    {/* Filters */}
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center space-x-2">
        <Filter className="w-4 h-4 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">Filters:</span>
      </div>

      {/* Fee Type Filter */}
      <select
        value={filters.feeType}
        onChange={(e) => updateFilter('feeType', e.target.value)}
        className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <option value="">All Fee Types</option>
        {feeTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      {/* Year Filter */}
      <select
        value={filters.year}
        onChange={(e) => updateFilter('year', e.target.value)}
        className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <option value="">All Years</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      {/* Semester Filter */}
      <select
        value={filters.semester}
        onChange={(e) => updateFilter('semester', e.target.value)}
        className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <option value="">All Semesters</option>
        {semesters.map(sem => (
          <option key={sem} value={sem}>Semester {sem}</option>
        ))}
      </select>

      {/* Clear Filters */}
      {(filters.feeType || filters.year || filters.semester) && (
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>

    {/* Action Buttons */}
    <div className="flex items-center space-x-3">
      <button
        onClick={onDownload}
        disabled={!hasData}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
      >
        <Download className="w-4 h-4" />
        <span>Download</span>
      </button>
      
      <button
        onClick={onAddFee}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
      >
        <Plus className="w-4 h-4" />
        <span>Add Fee Structure</span>
      </button>
    </div>
  </div>
</div>

  );
};

export default FilterBar;