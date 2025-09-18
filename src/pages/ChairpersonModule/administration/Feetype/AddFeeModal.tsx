import React, { useState, useEffect } from 'react';
import { X, Save, DollarSign } from 'lucide-react';
import { FeeStructure } from '../types/fee';

interface AddFeeModalProps {
  existingFee?: FeeStructure;
  onSave: (fee: FeeStructure | Omit<FeeStructure, 'id'>) => void;
  onCancel: () => void;
}

const AddFeeModal: React.FC<AddFeeModalProps> = ({ existingFee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    feeType: '',
    amount: '',
    year: '',
    semester: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const feeTypes = ['Tuition Fee', 'Lab Fee', 'Hostel Fee', 'Transport Fee'];
  const years = ['2024-25', '2023-24', '2022-23', '2021-22'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  useEffect(() => {
    if (existingFee) {
      setFormData({
        feeType: existingFee.feeType,
        amount: existingFee.amount.toString(),
        year: existingFee.year,
        semester: existingFee.semester,
        status: existingFee.status
      });
    }
  }, [existingFee]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.feeType) newErrors.feeType = 'Fee type is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (formData.amount && isNaN(Number(formData.amount))) newErrors.amount = 'Amount must be a valid number';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.semester) newErrors.semester = 'Semester is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const feeData = {
      feeType: formData.feeType,
      amount: Number(formData.amount),
      year: formData.year,
      semester: formData.semester,
      status: formData.status
    };

    if (existingFee) {
      onSave({ ...feeData, id: existingFee.id, course: existingFee.course });
    } else {
      onSave(feeData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl border border-gray-300 w-full max-w-md shadow-lg transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {existingFee ? 'Edit Fee Structure' : 'Add Fee Structure'}
              </h2>
              <p className="text-sm text-gray-500">
                {existingFee ? 'Update fee structure details' : 'Create new fee structure'}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Fee Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fee Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.feeType}
              onChange={(e) => handleInputChange('feeType', e.target.value)}
              className={`w-full bg-white border text-gray-700 text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.feeType ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
            >
              <option value="">Select Fee Type</option>
              {feeTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.feeType && (
              <p className="mt-1 text-sm text-red-500">{errors.feeType}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="Enter amount"
              className={`w-full bg-white border text-gray-700 text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.amount ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
            )}
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Academic Year <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              className={`w-full bg-white border text-gray-700 text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.year ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
            >
              <option value="">Select Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.year && (
              <p className="mt-1 text-sm text-red-500">{errors.year}</p>
            )}
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semester <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.semester}
              onChange={(e) => handleInputChange('semester', e.target.value)}
              className={`w-full bg-white border text-gray-700 text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.semester ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
            >
              <option value="">Select Semester</option>
              {semesters.map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
            {errors.semester && (
              <p className="mt-1 text-sm text-red-500">{errors.semester}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>{existingFee ? 'Update' : 'Save'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFeeModal;
