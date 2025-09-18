import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";

export const AddProgramsPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    institutionCode: "",
    branchCode: "",
    branchName: "",
    duration: "",
    notes: "",
    status: "active",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const statusOptions = ["active", "inactive"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = "Program code is required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Program name is required";
    }

    if (!formData.institutionCode.trim()) {
      newErrors.institutionCode = "Institution code is required";
    }

    if (!formData.branchCode.trim()) {
      newErrors.branchCode = "Branch code is required";
    }

    if (!formData.branchName.trim()) {
      newErrors.branchName = "Branch name is required";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Saving program:", formData);
      navigate("/home/programs");
    }
  };

  const handleCancel = () => {
    navigate("/home/programs");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/home/programs")}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Program</h1>
          <p className="text-gray-600 mt-1">Create a new academic program</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Program Information</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Program Code */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Program Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-1 transition duration-150 ease-in-out
                  ${errors.code
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-purple-500 focus:ring-purple-500"}`}
                placeholder="Enter program code"
              />
              {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
            </div>

            {/* Program Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Program Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-1 transition duration-150 ease-in-out
                  ${errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-purple-500 focus:ring-purple-500"}`}
                placeholder="Enter program name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Institution Code */}
            <div>
              <label
                htmlFor="institutionCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Institution Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="institutionCode"
                name="institutionCode"
                value={formData.institutionCode}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-1 transition duration-150 ease-in-out
                  ${errors.institutionCode
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-purple-500 focus:ring-purple-500"}`}
                placeholder="Enter institution code"
              />
              {errors.institutionCode && (
                <p className="mt-1 text-sm text-red-600">{errors.institutionCode}</p>
              )}
            </div>

            {/* Branch Code */}
            <div>
              <label htmlFor="branchCode" className="block text-sm font-medium text-gray-700 mb-1">
                Branch Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="branchCode"
                name="branchCode"
                value={formData.branchCode}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-1 transition duration-150 ease-in-out
                  ${errors.branchCode
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-purple-500 focus:ring-purple-500"}`}
                placeholder="Enter branch code"
              />
              {errors.branchCode && (
                <p className="mt-1 text-sm text-red-600">{errors.branchCode}</p>
              )}
            </div>

            {/* Branch Name */}
            <div>
              <label htmlFor="branchName" className="block text-sm font-medium text-gray-700 mb-1">
                Branch Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="branchName"
                name="branchName"
                value={formData.branchName}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-1 transition duration-150 ease-in-out
                  ${errors.branchName
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-purple-500 focus:ring-purple-500"}`}
                placeholder="Enter branch name"
              />
              {errors.branchName && (
                <p className="mt-1 text-sm text-red-600">{errors.branchName}</p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-1 transition duration-150 ease-in-out
                  ${errors.duration
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-purple-500 focus:ring-purple-500"}`}
                placeholder="e.g. 4 years"
              />
              {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out resize-none"
                placeholder="Additional notes"
              />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer Buttons */}
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
              Save Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
