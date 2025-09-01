import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, Loader } from "lucide-react";
import { mockCourses } from "../../../data/mockData";
import { Course } from "../../../data/mockData";

interface FormErrors {
  [key: string]: string;
}

export const EditCoursesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Course>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [courseNotFound, setCourseNotFound] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const course = mockCourses.find((c) => c.id === id);
        if (course) {
          setFormData(course);
        } else {
          setCourseNotFound(true);
        }
      } catch (error) {
        console.error("Error loading course:", error);
        setCourseNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadCourse();
    }
  }, [id]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validations
    if (!formData.name?.trim()) {
      newErrors.name = "Course name is required";
    }

    if (!formData.code?.trim()) {
      newErrors.code = "Course code is required";
    } else if (!/^[A-Z]{2,4}\d{3,4}$/.test(formData.code)) {
      newErrors.code = "Course code must be in format like 'CS101' or 'MATH1001'";
    }

    if (!formData.department?.trim()) {
      newErrors.department = "Department is required";
    }

    if (!formData.year) {
      newErrors.year = "Year is required";
    } else if (formData.year < 1 || formData.year > 4) {
      newErrors.year = "Year must be between 1 and 4";
    }

    if (!formData.semester) {
      newErrors.semester = "Semester is required";
    } else if (formData.semester < 1 || formData.semester > 2) {
      newErrors.semester = "Semester must be 1 or 2";
    }

    if (!formData.credits) {
      newErrors.credits = "Credits are required";
    } else if (formData.credits < 1 || formData.credits > 10) {
      newErrors.credits = "Credits must be between 1 and 10";
    }

    if (!formData.facultyId?.trim()) {
      newErrors.facultyId = "Faculty ID is required";
    }

    if (!formData.internalMarks) {
      newErrors.internalMarks = "Internal marks are required";
    } else if (formData.internalMarks < 0 || formData.internalMarks > 100) {
      newErrors.internalMarks = "Internal marks must be between 0 and 100";
    }

    if (!formData.externalMarks) {
      newErrors.externalMarks = "External marks are required";
    } else if (formData.externalMarks < 0 || formData.externalMarks > 100) {
      newErrors.externalMarks = "External marks must be between 0 and 100";
    }

    // Check if total marks don't exceed 100
    if (formData.internalMarks && formData.externalMarks) {
      const total = formData.internalMarks + formData.externalMarks;
      if (total !== 100) {
        newErrors.totalMarks = "Internal and external marks must total 100";
      }
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Course description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const processedValue = e.target.type === "number" ? Number(value) : value;
    
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Course Updated:", formData);
      navigate("/home/courses");
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormField: React.FC<{
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    children?: React.ReactNode;
  }> = ({ label, name, type = "text", placeholder, required = false, children }) => (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children || (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={formData[name as keyof Course] || ""}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
            errors[name] ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
          }`}
          required={required}
        />
      )}
      {errors[name] && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{errors[name]}</span>
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-gray-600">
          <Loader className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading course...</span>
        </div>
      </div>
    );
  }

  if (courseNotFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-red-500">
            <AlertCircle className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Course Not Found</h1>
          <p className="text-gray-600">The course you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/home/courses")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back</span>
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
            <p className="text-gray-600 mt-1">Update course details below</p>
          </div>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Course Information</h2>
            <p className="text-gray-600 text-sm mt-1">
              Fields marked with <span className="text-red-500">*</span> are required
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Course Name"
                  name="name"
                  placeholder="e.g., Data Structures and Algorithms"
                  required
                />
                
                <FormField
                  label="Course Code"
                  name="code"
                  placeholder="e.g., CS101"
                  required
                />

                <FormField label="Program" name="program" required>
                  <select
                    id="program"
                    name="program"
                    value={formData.program || ""}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                      errors.program ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                    required
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </FormField>

                <FormField
                  label="Department"
                  name="department"
                  placeholder="e.g., Computer Science"
                  required
                />

                <FormField
                  label="Faculty ID"
                  name="facultyId"
                  placeholder="e.g., FAC001"
                  required
                />
              </div>
            </div>

            {/* Academic Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Academic Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  label="Year"
                  name="year"
                  type="number"
                  placeholder="1-4"
                  required
                />

                <FormField
                  label="Semester"
                  name="semester"
                  type="number"
                  placeholder="1-2"
                  required
                />

                <FormField
                  label="Credits"
                  name="credits"
                  type="number"
                  placeholder="1-10"
                  required
                />
              </div>
            </div>

            {/* Examination Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Examination Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField label="Exam Type" name="examType" required>
                  <select
                    id="examType"
                    name="examType"
                    value={formData.examType || ""}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                      errors.examType ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                    required
                  >
                    <option value="Theory">Theory</option>
                    <option value="Lab">Lab</option>
                    <option value="Practical">Practical</option>
                  </select>
                </FormField>

                <FormField
                  label="Internal Marks"
                  name="internalMarks"
                  type="number"
                  placeholder="0-100"
                  required
                />

                <FormField
                  label="External Marks"
                  name="externalMarks"
                  type="number"
                  placeholder="0-100"
                  required
                />
              </div>

              {errors.totalMarks && (
                <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.totalMarks}</span>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Additional Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Status" name="status" required>
                  <select
                    id="status"
                    name="status"
                    value={formData.status || ""}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                      errors.status ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </FormField>

                <FormField
                  label="Thumbnail URL"
                  name="thumbnail"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <FormField label="Course Description" name="description" required>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Provide a detailed description of the course content, objectives, and outcomes..."
                  value={formData.description || ""}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-vertical ${
                    errors.description ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  required
                />
              </FormField>
            </div>

            {/* Form Actions */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/home/courses")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-purple-600 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center space-x-2 ${
                  isSubmitting 
                    ? "opacity-50 cursor-not-allowed" 
                    : "hover:bg-purple-700 transform hover:scale-105"
                }`}
              >
                <Save className="h-5 w-5" />
                <span>{isSubmitting ? "Updating..." : "Update Course"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};