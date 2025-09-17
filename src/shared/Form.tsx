import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface FormField {
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

interface FormConfig {
  title: string;
  fields: FormField[];
}

interface FormProps {
  config: FormConfig;
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const Form: React.FC<FormProps> = ({ config, initialData, onSubmit, onCancel }) => {
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
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{config.title}</h2>
      
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

export default Form;