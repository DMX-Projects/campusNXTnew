import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, X } from 'lucide-react';
import { mockDepartments } from '../../../../data/mockData';

export const EditDepartmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    hod: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const department = mockDepartments.find(d => d.id === id);
    if (department) {
      setFormData({
        name: department.name,
        code: department.code,
        hod: department.hod,
        description: department.description || '',
      });
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCancel = () => {
    navigate('/home/departments');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Department name is required';
    }
    
    if (!formData.code.trim()) {
      newErrors.code = 'Department code is required';
    }
    
    if (!formData.hod.trim()) {
      newErrors.hod = 'Head of Department is required';
    }
    
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Updating department:', formData);
      navigate('/home/departments');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/home/departments')}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Department</h1>
          <p className="text-gray-600 mt-1">Update department information</p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Department Information</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Department Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`
                  block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-1 transition duration-150 ease-in-out
                  ${errors.name 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                  }
                `}
                placeholder="Enter department name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Department Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className={`
                  block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-1 transition duration-150 ease-in-out
                  ${errors.code 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                  }
                `}
                placeholder="Enter department code"
              />
              {errors.code && (
                <p className="mt-1 text-sm text-red-600">{errors.code}</p>
              )}
            </div>

            <div>
              <label htmlFor="hod" className="block text-sm font-medium text-gray-700 mb-1">
                Head of Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="hod"
                name="hod"
                value={formData.hod}
                onChange={handleInputChange}
                className={`
                  block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-1 transition duration-150 ease-in-out
                  ${errors.hod 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                  }
                `}
                placeholder="Enter HOD name"
              />
              {errors.hod && (
                <p className="mt-1 text-sm text-red-600">{errors.hod}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out resize-none"
                placeholder="Enter department description"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150"
            >
              <Save className="h-4 w-4 mr-2" />
              Update Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};