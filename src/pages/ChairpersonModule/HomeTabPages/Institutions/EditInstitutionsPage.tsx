import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";
import { mockInstitutions } from "../../../../data/mockData";

export const EditInstitutionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    type: "",
    location: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    establishedYear: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const institutionTypes = [
    "University",
    "College",
    "Institute",
    "School",
    "Academy",
    "Center",
  ];

  useEffect(() => {
    const institution = mockInstitutions.find((inst) => inst.id === id);
    if (institution) {
      setFormData({
        code: institution.code,
        name: institution.name,
        type: institution.type,
        location: institution.location,
        address: institution.address || "",
        phone: institution.phone || "",
        email: institution.email || "",
        website: institution.website || "",
        establishedYear: institution.establishedYear?.toString() || "",
        description: institution.description || "",
      });
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
      newErrors.code = "Institution code is required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Institution name is required";
    }

    if (!formData.type.trim()) {
      newErrors.type = "Institution type is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Updating institution:", formData);
      navigate("/home/institutions");
    }
  };

  const handleCancel = () => {
    navigate("/home/institutions");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/home/institutions")}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Institution</h1>
          <p className="text-gray-600 mt-1">Update institution information</p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Institution Information
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Institution Code <span className="text-red-500">*</span>
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
                  ${
                    errors.code
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  }
                `}
                placeholder="Enter institution code"
              />
              {errors.code && (
                <p className="mt-1 text-sm text-red-600">{errors.code}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Institution Name <span className="text-red-500">*</span>
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
                  ${
                    errors.name
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  }
                `}
                placeholder="Enter institution name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={`
                  block w-full px-3 py-2 border rounded-md shadow-sm 
                  focus:outline-none focus:ring-1 transition duration-150 ease-in-out
                  ${
                    errors.type
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  }
                `}
              >
                <option value="">Select institution type</option>
                {institutionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`
                                 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                                 focus:outline-none focus:ring-1 transition duration-150 ease-in-out
                                 ${
                                   errors.location
                                     ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                     : "border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                 }
                               `}
                placeholder="Enter location"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`
                                 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                                 focus:outline-none focus:ring-1 transition duration-150 ease-in-out
                                 ${
                                   errors.email
                                     ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                     : "border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                 }
                               `}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out"
                placeholder="Enter website URL"
              />
            </div>

            <div>
              <label
                htmlFor="establishedYear"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Established Year
              </label>
              <input
                type="number"
                id="establishedYear"
                name="establishedYear"
                value={formData.establishedYear}
                onChange={handleInputChange}
                min="1800"
                max={new Date().getFullYear()}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out"
                placeholder="Enter established year"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out resize-none"
                placeholder="Enter full address"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out resize-none"
                placeholder="Enter institution description"
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
              Save Institution
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
