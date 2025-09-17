import React, { useState } from 'react';
import { X, Search, Plus, Minus, Upload, Calendar, Clock } from 'lucide-react';

export interface FormField {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  options?: string[] | number[];
  placeholder?: string;
  pattern?: string;
  accept?: string;
  min?: number;
  max?: number;
}

export interface FormConfig {
  title: string;
  fields: FormField[];
}

interface DynamicFormProps {
  config: FormConfig;
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ config, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    config.fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      if (field.pattern && formData[field.name]) {
        const regex = new RegExp(field.pattern);
        if (!regex.test(formData[field.name])) {
          newErrors[field.name] = `Invalid ${field.label} format`;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      className: `w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
        errors[field.name] ? 'border-red-500' : ''
      }`,
      placeholder: field.placeholder || field.label,
      required: field.required
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
        return (
          <input
            {...commonProps}
            type={field.type}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            pattern={field.pattern}
            min={field.min}
            max={field.max}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={3}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
      
      case 'select':
        return (
          <select
            {...commonProps}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      case 'date':
        return (
          <input
            {...commonProps}
            type="date"
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
      
      case 'time':
        return (
          <input
            {...commonProps}
            type="time"
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
      
      case 'file':
        return (
          <div className="file-upload">
            <input
              {...commonProps}
              type="file"
              accept={field.accept}
              onChange={(e) => handleChange(field.name, e.target.files?.[0])}
              className="hidden"
            />
            <label
              htmlFor={field.name}
              className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
            >
              <Upload className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                {formData[field.name] ? formData[field.name].name : `Upload ${field.label}`}
              </span>
            </label>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{config.title}</h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config.fields.map((field) => (
            <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {renderField(field)}
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            {initialData ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ 
  isOpen, 
  onClose, 
  children 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
        
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export const SearchableSelect: React.FC<{
  label: string;
  options: any[];
  value?: any;
  onChange: (value: any) => void;
  searchable?: boolean;
  required?: boolean;
  displayKey?: string;
  valueKey?: string;
}> = ({ label, options, value, onChange, searchable = false, required = false, displayKey = 'name', valueKey = 'id' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = searchable 
    ? options.filter(option => 
        option[displayKey].toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
      >
        {value ? options.find(opt => opt[valueKey] === value)?.[displayKey] : `Select ${label}`}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          {searchable && (
            <div className="p-2 border-b border-gray-200 dark:border-gray-600">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                />
              </div>
            </div>
          )}
          
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onChange(option[valueKey]);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                {option[displayKey]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const DataTable: React.FC<{
  data: any[];
  columns: any[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onView?: (item: any) => void;
  searchable?: boolean;
  filterable?: boolean;
  exportable?: boolean;
}> = ({ data, columns, onEdit, onDelete, onView, searchable = true, filterable = true, exportable = true }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = sortConfig
    ? [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      })
    : filteredData;

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      {/* Table Controls */}
      {(searchable || exportable) && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            {searchable && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            )}
            
            {exportable && (
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                  Export Excel
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                  Export PDF
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={`px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600' : ''
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && sortConfig?.key === column.key && (
                      <span className="text-blue-500">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete || onView) && (
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </td>
                ))}
                {(onEdit || onDelete || onView) && (
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center space-x-2">
                      {onView && (
                        <button
                          onClick={() => onView(item)}
                          className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors"
                        >
                          View
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};