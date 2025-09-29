import React, { useState } from 'react';
import { Plus, CreditCard as Edit, Trash2, BookOpen, User, Calendar, Clock, X, Save, GraduationCap, FileText, Eye, Download, Sun, Moon } from 'lucide-react';

// Types
interface LessonPlanTopic {
  id: string;
  slNo: number;
  topic: string;
  module: number;
  hoursRequired: number;
  modeOfTeaching: string;
}

interface LessonPlan {
  id: string;
  facultyName: string;
  courseName: string;
  courseCode: string;
  programName: string;
  courseYear: string;
  semester: string;
  academicPeriod: string;
  classesPerWeek: number;
  totalPlannedClasses: number;
  topics: LessonPlanTopic[];
  createdAt: Date;
  updatedAt: Date;
}

interface LessonPlanFormData {
  facultyName: string;
  courseName: string;
  courseCode: string;
  programName: string;
  courseYear: string;
  semester: string;
  academicPeriod: string;
  classesPerWeek: number;
  totalPlannedClasses: number;
  topics: Omit<LessonPlanTopic, 'id'>[];
}

// Mock data
const initialLessonPlans: LessonPlan[] = [
  {
    id: '1',
    facultyName: 'ASUTOSH MOHARANA',
    courseName: 'BASIC MANUFACTURING PROCESS',
    courseCode: 'RME5C001',
    programName: 'B.TECH in Mechanical Engineering',
    courseYear: 'THIRD',
    semester: '5th',
    academicPeriod: '2022-23',
    classesPerWeek: 4,
    totalPlannedClasses: 40,
    topics: [
      {
        id: '1',
        slNo: 1,
        topic: 'Foundry: Types of Patterns, Pattern Materials and Pattern Allowances',
        module: 1,
        hoursRequired: 2,
        modeOfTeaching: 'Lecture'
      },
      {
        id: '2',
        slNo: 2,
        topic: 'Moulding Materials- Sand Moulding, Metal Moulding',
        module: 1,
        hoursRequired: 2,
        modeOfTeaching: 'Lecture'
      },
      {
        id: '3',
        slNo: 3,
        topic: 'Invest Moulding and Shell Moulding',
        module: 1,
        hoursRequired: 2,
        modeOfTeaching: 'Lab'
      },
      {
        id: '4',
        slNo: 4,
        topic: 'Composition of Moulding Sand, Silica and Zircon Sand Binder',
        module: 1,
        hoursRequired: 1,
        modeOfTeaching: 'Lecture'
      },
      {
        id: '5',
        slNo: 5,
        topic: 'Melting Furnance- Cupola Furnance, Resistance Furnance',
        module: 1,
        hoursRequired: 2,
        modeOfTeaching: 'Lecture'
      },
      {
        id: '6',
        slNo: 6,
        topic: 'Induction and Arc Furnance, Solidification of Castings',
        module: 1,
        hoursRequired: 1,
        modeOfTeaching: 'Lab'
      }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    facultyName: 'DR. RAJESH KUMAR',
    courseName: 'MACHINE DESIGN',
    courseCode: 'RME6C002',
    programName: 'B.TECH in Mechanical Engineering',
    courseYear: 'FOURTH',
    semester: '7th',
    academicPeriod: '2023-24',
    classesPerWeek: 3,
    totalPlannedClasses: 30,
    topics: [
      {
        id: '4',
        slNo: 1,
        topic: 'Design Philosophy and Process',
        module: 1,
        hoursRequired: 3,
        modeOfTeaching: 'Lecture'
      },
      {
        id: '5',
        slNo: 2,
        topic: 'Material Selection and Properties',
        module: 1,
        hoursRequired: 2,
        modeOfTeaching: 'Lab'
      }
    ],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  }
];

const emptyForm: LessonPlanFormData = {
  facultyName: '',
  courseName: '',
  courseCode: '',
  programName: '',
  courseYear: '',
  semester: '',
  academicPeriod: '',
  classesPerWeek: 0,
  totalPlannedClasses: 0,
  topics: []
};

const emptyTopic = {
  slNo: 1,
  topic: '',
  module: 1,
  hoursRequired: 1,
  modeOfTeaching: 'Lecture'
};

const LessonPlanManager: React.FC = () => {
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>(initialLessonPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);
  const [viewingPlan, setViewingPlan] = useState<LessonPlan | null>(null);
  const [formData, setFormData] = useState<LessonPlanFormData>(emptyForm);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle form changes
  const handleFormChange = (field: keyof Omit<LessonPlanFormData, 'topics'>, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle topic changes
  const handleTopicChange = (index: number, field: keyof Omit<LessonPlanTopic, 'id'>, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.map((topic, i) => 
        i === index ? { ...topic, [field]: value } : topic
      )
    }));
  };

  // Add new topic
  const addTopic = () => {
    setFormData(prev => ({
      ...prev,
      topics: [...prev.topics, { ...emptyTopic, slNo: prev.topics.length + 1 }]
    }));
  };

  // Remove topic
  const removeTopic = (index: number) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index).map((topic, i) => ({ ...topic, slNo: i + 1 }))
    }));
  };

  // Open modal for adding
  const openAddModal = () => {
    setFormData(emptyForm);
    setIsEditing(false);
    setCurrentPlanId(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (plan: LessonPlan) => {
    setFormData({
      facultyName: plan.facultyName,
      courseName: plan.courseName,
      courseCode: plan.courseCode,
      programName: plan.programName,
      courseYear: plan.courseYear,
      semester: plan.semester,
      academicPeriod: plan.academicPeriod,
      classesPerWeek: plan.classesPerWeek,
      totalPlannedClasses: plan.totalPlannedClasses,
      topics: plan.topics.map(({ id, ...topic }) => topic)
    });
    setIsEditing(true);
    setCurrentPlanId(plan.id);
    setIsModalOpen(true);
  };

  // Open view modal
  const openViewModal = (plan: LessonPlan) => {
    setViewingPlan(plan);
    setIsViewModalOpen(true);
  };

  // Close modals
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(emptyForm);
    setIsEditing(false);
    setCurrentPlanId(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingPlan(null);
  };

  // Save lesson plan
  const saveLessonPlan = () => {
    if (isEditing && currentPlanId) {
      // Update existing plan
      setLessonPlans(prev => prev.map(plan => 
        plan.id === currentPlanId 
          ? {
              ...plan,
              ...formData,
              topics: formData.topics.map((topic, index) => ({
                ...topic,
                id: `${currentPlanId}-${index}`
              })),
              updatedAt: new Date()
            }
          : plan
      ));
    } else {
      // Add new plan
      const newPlan: LessonPlan = {
        id: Date.now().toString(),
        ...formData,
        topics: formData.topics.map((topic, index) => ({
          ...topic,
          id: `${Date.now()}-${index}`
        })),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setLessonPlans(prev => [...prev, newPlan]);
    }
    closeModal();
  };

  // Delete lesson plan
  const deleteLessonPlan = (id: string) => {
    if (confirm('Are you sure you want to delete this lesson plan?')) {
      setLessonPlans(prev => prev.filter(plan => plan.id !== id));
    }
  };

  // Download lesson plan as PDF-like format
  const downloadLessonPlan = (plan: LessonPlan) => {
    const content = `
GANDHI INSTITUTE FOR EDUCATION AND TECHNOLOGY
Lesson Plan

Faculty Name: ${plan.facultyName}
Course Name: ${plan.courseName}
Course Code: ${plan.courseCode}
Program Name: ${plan.programName}
Course Year: ${plan.courseYear}
Semester: ${plan.semester}
Academic Period: ${plan.academicPeriod}
Classes per Week: ${plan.classesPerWeek}
Total Planned Classes: ${plan.totalPlannedClasses}

Topics to be Covered:
${plan.topics.map(topic => 
  `${topic.slNo}. ${topic.topic} | Module: ${topic.module} | Hours: ${topic.hoursRequired} | Mode: ${topic.modeOfTeaching}`
).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${plan.courseCode}_${plan.courseName}_LessonPlan.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gray-50 text-gray-900';

  const cardClasses = isDarkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  const modalClasses = isDarkMode 
    ? 'bg-gray-800 text-white' 
    : 'bg-white text-gray-900';

  const inputClasses = isDarkMode 
    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400' 
    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500';

  return (
    <div className={`p-4 md:p-6 min-h-screen transition-colors duration-200 ${themeClasses}`}>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Lesson Plan Management</h1>
            
          </div>
          <div className="flex gap-2">
            
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-md"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add New Lesson Plan</span>
              <span className="sm:hidden">Add Plan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lesson Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {lessonPlans.map(plan => {
          const totalHours = plan.topics.reduce((sum, topic) => sum + topic.hoursRequired, 0);
          return (
            <div key={plan.id} className={`rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ${cardClasses}`}>
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1 truncate">{plan.courseName}</h3>
                    <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {plan.courseCode}
                    </p>
                    <div className={`flex items-center text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <User size={16} className="mr-2 flex-shrink-0" />
                      <span className="truncate">{plan.facultyName}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => openViewModal(plan)}
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => openEditModal(plan)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteLessonPlan(plan.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className={`space-y-2 text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex items-center">
                    <GraduationCap size={16} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{plan.programName}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 flex-shrink-0" />
                    <span>{plan.courseYear} Year, {plan.semester} Semester</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 flex-shrink-0" />
                    <span>{plan.classesPerWeek} classes/week, {totalHours}hrs total</span>
                  </div>
                </div>

                <div className="border-t pt-4 dark:border-gray-600">
                  <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Topics: {plan.topics.length}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {plan.topics.slice(0, 3).map(topic => (
                      <span key={topic.id} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">
                        Module {topic.module}
                      </span>
                    ))}
                    {plan.topics.length > 3 && (
                      <span className={`px-2 py-1 text-xs rounded ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        +{plan.topics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto ${modalClasses}`}>
            <div className={`p-4 md:p-6 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {isEditing ? 'Edit Lesson Plan' : 'Add New Lesson Plan'}
                </h2>
                <button 
                  onClick={closeModal} 
                  className={`hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-400'
                  }`}
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-4 md:p-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Faculty Name
                  </label>
                  <input
                    type="text"
                    value={formData.facultyName}
                    onChange={(e) => handleFormChange('facultyName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={formData.courseName}
                    onChange={(e) => handleFormChange('courseName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Course Code
                  </label>
                  <input
                    type="text"
                    value={formData.courseCode}
                    onChange={(e) => handleFormChange('courseCode', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Program Name
                  </label>
                  <input
                    type="text"
                    value={formData.programName}
                    onChange={(e) => handleFormChange('programName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Course Year
                  </label>
                  <select
                    value={formData.courseYear}
                    onChange={(e) => handleFormChange('courseYear', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                  >
                    <option value="">Select Year</option>
                    <option value="FIRST">First</option>
                    <option value="SECOND">Second</option>
                    <option value="THIRD">Third</option>
                    <option value="FOURTH">Fourth</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Semester
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) => handleFormChange('semester', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                  >
                    <option value="">Select Semester</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                    <option value="7th">7th</option>
                    <option value="8th">8th</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Academic Period
                  </label>
                  <input
                    type="text"
                    value={formData.academicPeriod}
                    onChange={(e) => handleFormChange('academicPeriod', e.target.value)}
                    placeholder="e.g., 2023-24"
                    className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Classes per Week
                  </label>
                  <input
                    type="number"
                    value={formData.classesPerWeek}
                    onChange={(e) => handleFormChange('classesPerWeek', parseInt(e.target.value))}
                    min="1"
                    className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Total Planned Classes
                  </label>
                  <input
                    type="number"
                    value={formData.totalPlannedClasses}
                    onChange={(e) => handleFormChange('totalPlannedClasses', parseInt(e.target.value))}
                    min="1"
                    className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                  />
                </div>
              </div>

              {/* Topics Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Topics to be Covered</h3>
                  <button
                    onClick={addTopic}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                  >
                    <Plus size={16} />
                    Add Topic
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.topics.map((topic, index) => (
                    <div key={index} className={`border rounded-lg p-4 ${
                      isDarkMode ? 'border-gray-600' : 'border-gray-200'
                    }`}>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                          }`}>
                            Sl No.
                          </label>
                          <input
                            type="number"
                            value={topic.slNo}
                            onChange={(e) => handleTopicChange(index, 'slNo', parseInt(e.target.value))}
                            className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className={`block text-sm font-medium mb-1 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                          }`}>
                            Topic
                          </label>
                          <textarea
                            value={topic.topic}
                            onChange={(e) => handleTopicChange(index, 'topic', e.target.value)}
                            rows={2}
                            className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                          }`}>
                            Module
                          </label>
                          <input
                            type="number"
                            value={topic.module}
                            onChange={(e) => handleTopicChange(index, 'module', parseInt(e.target.value))}
                            min="1"
                            className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                          }`}>
                            Hours
                          </label>
                          <input
                            type="number"
                            value={topic.hoursRequired}
                            onChange={(e) => handleTopicChange(index, 'hoursRequired', parseInt(e.target.value))}
                            min="1"
                            className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                          }`}>
                            Mode of Teaching
                          </label>
                          <select
                            value={topic.modeOfTeaching}
                            onChange={(e) => handleTopicChange(index, 'modeOfTeaching', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                          >
                            <option value="Lecture">Lecture</option>
                            <option value="Lab">Lab</option>
                          </select>
                        </div>
                      </div>
                      {formData.topics.length > 1 && (
                        <div className="mt-2 flex justify-end">
                          <button
                            onClick={() => removeTopic(index)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1 text-sm"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button
                  onClick={closeModal}
                  className={`px-6 py-2 border rounded-lg transition-colors duration-200 ${
                    isDarkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={saveLessonPlan}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <Save size={16} />
                  {isEditing ? 'Update' : 'Save'} Lesson Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto ${modalClasses}`}>
            <div className={`p-4 md:p-6 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Lesson Plan Details</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => downloadLessonPlan(viewingPlan)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                  >
                    <Download size={16} />
                    Download
                  </button>
                  <button 
                    onClick={closeViewModal} 
                    className={`hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-400'
                    }`}
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6">
              {/* Header Section */}
              <div className="text-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold mb-2">
                   AICAS INSTITUTE FOR EDUCATION AND TECHNOLOGY
                </h1>
                <h2 className="text-lg md:text-xl font-semibold">Lesson Plan</h2>
              </div>

              {/* Course Information Table */}
              <div className={`border-2 mb-6 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className={`border-b border-r p-3 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                    <div className="grid grid-cols-3">
                      <div className={`font-semibold border-r pr-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                        Faculty Name
                      </div>
                      <div className="col-span-2 pl-2">{viewingPlan.facultyName}</div>
                    </div>
                  </div>
                  <div className={`border-b p-3 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                    <div className="grid grid-cols-3">
                      <div className={`font-semibold border-r pr-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                        Name of the Program
                      </div>
                      <div className="col-span-2 pl-2">{viewingPlan.programName}</div>
                    </div>
                  </div>
                  <div className={`border-b border-r p-3 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                    <div className="grid grid-cols-3">
                      <div className={`font-semibold border-r pr-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                        Course Name
                      </div>
                      <div className="col-span-2 pl-2">{viewingPlan.courseName}</div>
                    </div>
                  </div>
                  <div className={`border-b p-3 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                    <div className="grid grid-cols-3">
                      <div className={`font-semibold border-r pr-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                        Course Code
                      </div>
                      <div className="col-span-2 pl-2">{viewingPlan.courseCode}</div>
                    </div>
                  </div>
                  <div className={`border-b border-r p-3 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                    <div className="grid grid-cols-6">
                      <div className={`font-semibold border-r pr-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                        Course Year
                      </div>
                      <div className={`pl-2 border-r pr-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                        {viewingPlan.courseYear}
                      </div>
                      <div className={`font-semibold border-r pr-2 pl-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                        Semester
                      </div>
                      <div className={`pl-2 border-r pr-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                        {viewingPlan.semester}
                      </div>
                      <div className={`font-semibold border-r pr-2 pl-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                        Academic Period
                      </div>
                      <div className="pl-2">{viewingPlan.academicPeriod}</div>
                    </div>
                  </div>
                  <div className={`p-3 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                    <div className="grid grid-cols-6">
                      <div className={`font-semibold border-r pr-2 col-span-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                        No. of Classes allotted per Week
                      </div>
                      <div className={`pl-2 border-r pr-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                        {viewingPlan.classesPerWeek}
                      </div>
                      <div className={`font-semibold border-r pr-2 pl-2 col-span-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                        Planned Classes Required to Complete the Course
                      </div>
                      <div className="pl-2">{viewingPlan.totalPlannedClasses}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Topics Table */}
              <div className={`border-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                <div className={`grid grid-cols-6 bg-gray-200 dark:bg-gray-700 font-semibold ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                  <div className={`p-3 border-r text-center ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                    Sl No.
                  </div>
                  <div className={`p-3 border-r text-center col-span-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                    Topics to be covered
                  </div>
                  <div className={`p-3 border-r text-center ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                    Module
                  </div>
                  <div className={`p-3 border-r text-center ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                    No. of hours Required
                  </div>
                  <div className="p-3 text-center">Mode of Teaching</div>
                </div>
                {viewingPlan.topics.map((topic, index) => (
                  <div key={topic.id} className={`grid grid-cols-6 ${
                    index !== viewingPlan.topics.length - 1 ? `border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}` : ''
                  }`}>
                    <div className={`p-3 border-r text-center ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                      {topic.slNo}
                    </div>
                    <div className={`p-3 border-r col-span-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                      {topic.topic}
                    </div>
                    <div className={`p-3 border-r text-center ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                      {topic.module}
                    </div>
                    <div className={`p-3 border-r text-center ${isDarkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                      {topic.hoursRequired.toString().padStart(2, '0')}
                    </div>
                    <div className="p-3 text-center">{topic.modeOfTeaching}</div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-6 text-center">
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Total Topics: {viewingPlan.topics.length} | 
                  Total Hours: {viewingPlan.topics.reduce((sum, topic) => sum + topic.hoursRequired, 0)} | 
                  Generated on: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonPlanManager;