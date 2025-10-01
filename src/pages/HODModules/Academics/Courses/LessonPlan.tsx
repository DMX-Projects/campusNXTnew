import React, { useState, useMemo } from 'react';
import { Plus, Edit3, Trash2, BookOpen, User, Calendar, Clock, X, Save, GraduationCap, FileText, Eye, Download, Search, Filter, Users, Book } from 'lucide-react';

// Types
interface LessonPlanTopic {
  id: string;
  slNo: number;
  topic: string;
  unit: number;
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

interface LessonPlanManagerProps {
  isDarkMode?: boolean;
}

// Enhanced mock data with CSE subjects
const initialLessonPlans: LessonPlan[] = [
  {
    id: '1',
    facultyName: 'Dr. Priya Sharma',
    courseName: 'DATA STRUCTURES AND ALGORITHMS',
    courseCode: 'CSE301',
    programName: 'B.TECH in Computer Science Engineering',
    courseYear: 'SECOND',
    semester: '3rd',
    academicPeriod: '2024-25',
    classesPerWeek: 4,
    totalPlannedClasses: 48,
    topics: [
      {
        id: '1-1',
        slNo: 1,
        topic: 'Introduction to Data Structures: Arrays, Linked Lists, and their Operations',
        unit: 1,
        hoursRequired: 3,
        modeOfTeaching: 'Lecture'
      },
      {
        id: '1-2',
        slNo: 2,
        topic: 'Stack Operations: Push, Pop, and Applications',
        unit: 1,
        hoursRequired: 2,
        modeOfTeaching: 'Lab'
      },
      {
        id: '1-3',
        slNo: 3,
        topic: 'Queue Implementation and Circular Queue',
        unit: 1,
        hoursRequired: 2,
        modeOfTeaching: 'Lecture'
      },
      {
        id: '1-4',
        slNo: 4,
        topic: 'Binary Trees and Tree Traversals',
        unit: 2,
        hoursRequired: 3,
        modeOfTeaching: 'Lecture'
      },
      {
        id: '1-5',
        slNo: 5,
        topic: 'Binary Search Trees and AVL Trees',
        unit: 2,
        hoursRequired: 3,
        modeOfTeaching: 'Lab'
      },
      {
        id: '1-6',
        slNo: 6,
        topic: 'Graph Representation and BFS/DFS Algorithms',
        unit: 3,
        hoursRequired: 4,
        modeOfTeaching: 'Lecture'
      }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    facultyName: 'Prof. Rajesh Kumar',
    courseName: 'DATABASE MANAGEMENT SYSTEMS',
    courseCode: 'CSE302',
    programName: 'B.TECH in Computer Science Engineering',
    courseYear: 'SECOND',
    semester: '4th',
    academicPeriod: '2024-25',
    classesPerWeek: 3,
    totalPlannedClasses: 36,
    topics: [
      {
        id: '2-1',
        slNo: 1,
        topic: 'Introduction to Database Systems and ER Model',
        unit: 1,
        hoursRequired: 3,
        modeOfTeaching: 'Lecture'
      },
      {
        id: '2-2',
        slNo: 2,
        topic: 'Relational Model and Normalization Techniques',
        unit: 1,
        hoursRequired: 4,
        modeOfTeaching: 'Lab'
      },
      {
        id: '2-3',
        slNo: 3,
        topic: 'SQL Queries and Database Design',
        unit: 2,
        hoursRequired: 3,
        modeOfTeaching: 'Lab'
      }
    ],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: '3',
    facultyName: 'Dr. Anita Singh',
    courseName: 'COMPUTER NETWORKS',
    courseCode: 'CSE401',
    programName: 'B.TECH in Computer Science Engineering',
    courseYear: 'THIRD',
    semester: '5th',
    academicPeriod: '2024-25',
    classesPerWeek: 3,
    totalPlannedClasses: 36,
    topics: [
      {
        id: '3-1',
        slNo: 1,
        topic: 'Network Models: OSI and TCP/IP Reference Models',
        unit: 1,
        hoursRequired: 2,
        modeOfTeaching: 'Lecture'
      },
      {
        id: '3-2',
        slNo: 2,
        topic: 'Data Link Layer Protocols and Error Detection',
        unit: 1,
        hoursRequired: 3,
        modeOfTeaching: 'Lecture'
      },
      {
        id: '3-3',
        slNo: 3,
        topic: 'Network Layer: Routing Algorithms and IP Protocol',
        unit: 2,
        hoursRequired: 4,
        modeOfTeaching: 'Lab'
      }
    ],
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05')
  },
  {
    id: '4',
    facultyName: 'Prof. Amit Patel',
    courseName: 'OPERATING SYSTEMS',
    courseCode: 'CSE303',
    programName: 'B.TECH in Computer Science Engineering',
    courseYear: 'SECOND',
    semester: '4th',
    academicPeriod: '2024-25',
    classesPerWeek: 4,
    totalPlannedClasses: 48,
    topics: [
      {
        id: '4-1',
        slNo: 1,
        topic: 'Introduction to Operating Systems and System Calls',
        unit: 1,
        hoursRequired: 2,
        modeOfTeaching: 'Lecture'
      },
      {
        id: '4-2',
        slNo: 2,
        topic: 'Process Management and CPU Scheduling',
        unit: 1,
        hoursRequired: 3,
        modeOfTeaching: 'Lab'
      },
      {
        id: '4-3',
        slNo: 3,
        topic: 'Memory Management and Virtual Memory',
        unit: 2,
        hoursRequired: 4,
        modeOfTeaching: 'Lecture'
      }
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '5',
    facultyName: 'Dr. Priya Sharma',
    courseName: 'MACHINE LEARNING',
    courseCode: 'CSE501',
    programName: 'B.TECH in Computer Science Engineering',
    courseYear: 'THIRD',
    semester: '6th',
    academicPeriod: '2024-25',
    classesPerWeek: 3,
    totalPlannedClasses: 36,
    topics: [
      {
        id: '5-1',
        slNo: 1,
        topic: 'Introduction to Machine Learning and Types of Learning',
        unit: 1,
        hoursRequired: 2,
        modeOfTeaching: 'Lecture'
      },
      {
        id: '5-2',
        slNo: 2,
        topic: 'Supervised Learning: Linear and Logistic Regression',
        unit: 1,
        hoursRequired: 3,
        modeOfTeaching: 'Lab'
      },
      {
        id: '5-3',
        slNo: 3,
        topic: 'Decision Trees and Random Forest Algorithms',
        unit: 2,
        hoursRequired: 3,
        modeOfTeaching: 'Lab'
      }
    ],
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: '6',
    facultyName: 'Prof. Vikash Gupta',
    courseName: 'SOFTWARE ENGINEERING',
    courseCode: 'CSE402',
    programName: 'B.TECH in Computer Science Engineering',
    courseYear: 'THIRD',
    semester: '5th',
    academicPeriod: '2024-25',
    classesPerWeek: 3,
    totalPlannedClasses: 36,
    topics: [
      {
        id: '6-1',
        slNo: 1,
        topic: 'Software Development Life Cycle Models',
        unit: 1,
        hoursRequired: 2,
        modeOfTeaching: 'Lecture'
      },
      {
        id: '6-2',
        slNo: 2,
        topic: 'Requirements Engineering and Analysis',
        unit: 1,
        hoursRequired: 3,
        modeOfTeaching: 'Lab'
      },
      {
        id: '6-3',
        slNo: 3,
        topic: 'Software Design Patterns and Architecture',
        unit: 2,
        hoursRequired: 3,
        modeOfTeaching: 'Lecture'
      }
    ],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01')
  }
];

const emptyForm: LessonPlanFormData = {
  facultyName: '',
  courseName: '',
  courseCode: '',
  programName: 'B.TECH in Computer Science Engineering',
  courseYear: '',
  semester: '',
  academicPeriod: '2024-25',
  classesPerWeek: 0,
  totalPlannedClasses: 0,
  topics: []
};

const emptyTopic = {
  slNo: 1,
  topic: '',
  unit: 1,
  hoursRequired: 1,
  modeOfTeaching: 'Lecture'
};

const LessonPlanManager: React.FC<LessonPlanManagerProps> = ({ isDarkMode = false }) => {
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>(initialLessonPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);
  const [viewingPlan, setViewingPlan] = useState<LessonPlan | null>(null);
  const [formData, setFormData] = useState<LessonPlanFormData>(emptyForm);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filter dropdowns
  const uniqueFaculties = useMemo(() => {
    return Array.from(new Set(lessonPlans.map(plan => plan.facultyName))).sort();
  }, [lessonPlans]);

  const uniqueSubjects = useMemo(() => {
    return Array.from(new Set(lessonPlans.map(plan => plan.courseName))).sort();
  }, [lessonPlans]);

  const uniqueYears = useMemo(() => {
    return Array.from(new Set(lessonPlans.map(plan => plan.courseYear))).sort();
  }, [lessonPlans]);
    
  const uniqueSemesters = useMemo(() => {
    return Array.from(new Set(lessonPlans.map(plan => plan.semester))).sort();
  }, [lessonPlans]);

  // Filtered lesson plans
  const filteredLessonPlans = useMemo(() => {
    return lessonPlans.filter(plan => {
      const matchesSearch = searchTerm === '' || 
        plan.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.facultyName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFaculty = selectedFaculty === '' || plan.facultyName === selectedFaculty;
      const matchesSubject = selectedSubject === '' || plan.courseName === selectedSubject;
      const matchesYear = selectedYear === '' || plan.courseYear === selectedYear;
      const matchesSemester = selectedSemester === '' || plan.semester === selectedSemester;

      return matchesSearch && matchesFaculty && matchesSubject && matchesYear && matchesSemester;
    });
  }, [lessonPlans, searchTerm, selectedFaculty, selectedSubject, selectedYear, selectedSemester]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedFaculty('');
    setSelectedSubject('');
    setSelectedYear('');
    setSelectedSemester('');
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
      // Map existing topics for form, omitting the unique ID for re-creation/updates
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
              // Re-add unique IDs to topics
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
      const newId = Date.now().toString();
      const newPlan: LessonPlan = {
        id: newId,
        ...formData,
        topics: formData.topics.map((topic, index) => ({
          ...topic,
          id: `${newId}-${index}` // Assign stable topic ID based on plan ID
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
    if (window.confirm('Are you sure you want to delete this lesson plan?')) {
      setLessonPlans(prev => prev.filter(plan => plan.id !== id));
    }
  };

  // Download lesson plan as PDF-like format
  const downloadLessonPlan = (plan: LessonPlan) => {
    const content = `
GANDHI INSTITUTE FOR EDUCATION AND TECHNOLOGY
CSE Department - Lesson Plan

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
------------------------------------------------------------------------------------------------
SL. No | Topic                                 | Unit | Hours | Mode of Teaching
------------------------------------------------------------------------------------------------
${plan.topics.map(topic => 
  `${String(topic.slNo).padEnd(6)} | ${topic.topic.padEnd(35).substring(0, 35)} | ${String(topic.unit).padEnd(4)} | ${String(topic.hoursRequired).padEnd(5)} | ${topic.modeOfTeaching}`
).join('\n')}
------------------------------------------------------------------------------------------------

Total Hours Planned: ${plan.topics.reduce((sum, topic) => sum + topic.hoursRequired, 0)}

Generated on: ${new Date().toLocaleDateString()}
HOD Approval: ________________
    `;

    // Functionality to create and trigger file download
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
    
  // Helper component for View Modal details (inlined)
  const PlanDetailItem = ({ icon: Icon, label, value }) => {
      const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
      return (
          <div className="flex items-start">
              <Icon size={18} className={`mr-3 flex-shrink-0 text-blue-500`} />
              <div>
                  <p className={`font-medium ${textSecondary}`}>{label}</p>
                  <p className="font-semibold">{value}</p>
              </div>
          </div>
      );
  };

  // View Modal Component (inlined)
  const LessonPlanViewModal = ({ plan, closeModal, downloadPlan, modalClasses }) => {
    
    // Calculate total hours for display
    const totalHours = plan.topics.reduce((sum, topic) => sum + topic.hoursRequired, 0);
    
    // Define classes based on mode for sub-elements
    const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
    const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-200';
    const tableHeaderClass = isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700';
    const tableRowClass = isDarkMode ? 'even:bg-gray-800 odd:bg-gray-900/50' : 'even:bg-gray-50 odd:bg-white';
    const cardColor = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${modalClasses}`}>
                {/* Header */}
                <div className={`p-4 md:p-6 border-b ${borderClass} flex justify-between items-center sticky top-0 ${modalClasses}`}>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <FileText size={24} className="text-blue-500" />
                        Lesson Plan: <span className="font-mono text-base">{plan.courseCode}</span>
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => downloadPlan(plan)}
                            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1 transition-colors shadow-md"
                        >
                            <Download size={16} /> Download
                        </button>
                        <button 
                            onClick={closeModal} 
                            className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-400'}`}
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="p-4 md:p-6">
                    <div className={`p-4 rounded-lg shadow-inner mb-6 ${cardColor}`}>
                        <h3 className={`text-lg font-bold mb-3 ${textPrimary}`}>{plan.courseName}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <PlanDetailItem icon={User} label="Faculty" value={plan.facultyName} />
                            <PlanDetailItem icon={GraduationCap} label="Program" value={plan.programName} />
                            <PlanDetailItem icon={Calendar} label="Academic Period" value={plan.academicPeriod} />
                            <PlanDetailItem icon={Clock} label="Total Hours" value={`${totalHours} hrs`} />
                            <PlanDetailItem icon={Calendar} label="Year/Sem" value={`${plan.courseYear} / ${plan.semester}`} />
                            <PlanDetailItem icon={Users} label="Classes/Week" value={`${plan.classesPerWeek}`} />
                            <PlanDetailItem icon={Calendar} label="Last Updated" value={new Date(plan.updatedAt).toLocaleDateString()} />
                        </div>
                    </div>

                    <h3 className={`text-lg font-bold mt-8 mb-4 border-b pb-2 ${borderClass} ${textPrimary}`}>Topic Breakdown ({plan.topics.length} topics)</h3>

                    <div className="overflow-x-auto rounded-lg border">
                        <table className={`min-w-full divide-y ${borderClass}`}>
                            <thead className={tableHeaderClass}>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider w-1/12">SL. No</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider w-5/12">Topic</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider w-1/12">Unit</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider w-2/12">Hours</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider w-3/12">Mode</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${borderClass} text-sm ${textPrimary}`}>
                                {plan.topics.map((topic, index) => (
                                    <tr key={topic.id || index} className={tableRowClass}>
                                        <td className="px-6 py-4 whitespace-nowrap">{topic.slNo}</td>
                                        <td className="px-6 py-4">{topic.topic}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{topic.unit}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{topic.hoursRequired}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                topic.modeOfTeaching === 'Lecture' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' :
                                                topic.modeOfTeaching === 'Lab' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                                            }`}>
                                                {topic.modeOfTeaching}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
  };
    
  return (
    <div className={`p-4 md:p-6 min-h-screen transition-colors duration-200 ${themeClasses}`}>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2"></h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}></p>
          </div>
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

      {/* Search and Filter Section */}
      <div className={`mb-6 p-4 rounded-lg shadow-md ${cardClasses}`}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              <input
                type="text"
                placeholder="Search by course name, code, or faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 w-full border rounded-lg transition-colors duration-200 ${inputClasses}`}
              />
            </div>
          </div>
          
          {/* Filter Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 border rounded-lg flex items-center gap-2 transition-colors duration-200 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              } ${showFilters ? 'ring-2 ring-blue-500' : ''}`}
            >
              <Filter size={16} />
              Filters
            </button>
            {(selectedFaculty || selectedSubject || selectedYear || selectedSemester) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors duration-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Dropdowns */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                <User size={16} className="inline mr-1" />
                Faculty
              </label>
              <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
              >
                <option value="">All Faculty</option>
                {uniqueFaculties.map(faculty => (
                  <option key={faculty} value={faculty}>{faculty}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                <Book size={16} className="inline mr-1" />
                Course
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
              >
                <option value="">All Courses</option>
                {uniqueSubjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                <GraduationCap size={16} className="inline mr-1" />
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
              >
                <option value="">All Years</option>
                {uniqueYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                <GraduationCap size={16} className="inline mr-1" />
                Semester
              </label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
              >
                <option value="">All Semesters</option>
                {uniqueSemesters.map(semester => (
                  <option key={semester} value={semester}>{semester}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        <p className={`text-sm mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {filteredLessonPlans.length} of {lessonPlans.length} total lesson plans.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className={`p-4 md:p-6 rounded-lg shadow-md ${cardClasses}`}>
          <div className="flex items-center">
            <FileText className="h-6 md:h-8 w-6 md:w-8 text-blue-600" />
            <div className="ml-3 md:ml-4">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Plans
              </p>
              <p className="text-xl md:text-2xl font-bold">{filteredLessonPlans.length}</p>
            </div>
          </div>
        </div>
        <div className={`p-4 md:p-6 rounded-lg shadow-md ${cardClasses}`}>
          <div className="flex items-center">
            <BookOpen className="h-6 md:h-8 w-6 md:w-8 text-green-600" />
            <div className="ml-3 md:ml-4">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Unique Courses
              </p>
              <p className="text-xl md:text-2xl font-bold">
                {new Set(filteredLessonPlans.map(p => p.courseCode)).size}
              </p>
            </div>
          </div>
        </div>
        <div className={`p-4 md:p-6 rounded-lg shadow-md ${cardClasses}`}>
          <div className="flex items-center">
            <User className="h-6 md:h-8 w-6 md:w-8 text-purple-600" />
            <div className="ml-3 md:ml-4">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Unique Faculty
              </p>
              <p className="text-xl md:text-2xl font-bold">
                {new Set(filteredLessonPlans.map(p => p.facultyName)).size}
              </p>
            </div>
          </div>
        </div>
        <div className={`p-4 md:p-6 rounded-lg shadow-md ${cardClasses}`}>
          <div className="flex items-center">
            <Clock className="h-6 md:h-8 w-6 md:w-8 text-orange-600" />
            <div className="ml-3 md:ml-4">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Hours
              </p>
              <p className="text-xl md:text-2xl font-bold">
                {filteredLessonPlans.reduce((sum, plan) => 
                  sum + plan.topics.reduce((topicSum, topic) => topicSum + topic.hoursRequired, 0), 0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {filteredLessonPlans.map(plan => {
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
                      <Edit3 size={16} />
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
                    Units: {new Set(plan.topics.map(t => t.unit)).size}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {Array.from(new Set(plan.topics.map(t => t.unit))).slice(0, 4).map(unit => (
                      <span key={unit} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">
                        Unit {unit}
                      </span>
                    ))}
                    {Array.from(new Set(plan.topics.map(t => t.unit))).length > 4 && (
                      <span className={`px-2 py-1 text-xs rounded ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        +{Array.from(new Set(plan.topics.map(t => t.unit))).length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results Message */}
      {filteredLessonPlans.length === 0 && (
        <div className={`text-center py-12 ${cardClasses} rounded-lg`}>
          <BookOpen className={`mx-auto h-12 w-12 mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            No lesson plans found
          </h3>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Try adjusting your search criteria or add a new lesson plan.
          </p>
        </div>
      )}

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
                    placeholder="e.g., DATA STRUCTURES AND ALGORITHMS"
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
                    placeholder="e.g., CSE301"
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
                    {['FIRST', 'SECOND', 'THIRD', 'FOURTH'].map(year => <option key={year} value={year}>{year}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Semester
                  </label>
                  <input
                    type="text"
                    value={formData.semester}
                    onChange={(e) => handleFormChange('semester', e.target.value)}
                    placeholder="e.g., 3rd or V"
                    className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                  />
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
                    placeholder="e.g., 2024-25"
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
                    value={formData.classesPerWeek || ''}
                    onChange={(e) => handleFormChange('classesPerWeek', Number(e.target.value))}
                    min="0"
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
                    value={formData.totalPlannedClasses || ''}
                    onChange={(e) => handleFormChange('totalPlannedClasses', Number(e.target.value))}
                    min="0"
                    className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${inputClasses}`}
                  />
                </div>
              </div>

              {/* Topic Details Section */}
              <h3 className="text-lg font-semibold border-t pt-4 mt-6 mb-4 flex items-center gap-2">
                <BookOpen size={20} />
                Topics & Hours
              </h3>
              
              <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                {formData.topics.map((topic, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${cardClasses} shadow-sm`}>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Topic {topic.slNo}</h4>
                      <button 
                        onClick={() => removeTopic(index)}
                        className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full transition-colors"
                        title="Remove Topic"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Topic Description */}
                      <div className="md:col-span-4">
                        <label className="block text-xs font-medium mb-1">Description</label>
                        <input
                          type="text"
                          value={topic.topic}
                          onChange={(e) => handleTopicChange(index, 'topic', e.target.value)}
                          className={`w-full px-3 py-2 text-sm border rounded-lg ${inputClasses}`}
                          placeholder="Topic Name"
                        />
                      </div>
                      
                      {/* Unit */}
                      <div>
                        <label className="block text-xs font-medium mb-1">Unit</label>
                        <input
                          type="number"
                          value={topic.unit}
                          onChange={(e) => handleTopicChange(index, 'unit', Number(e.target.value))}
                          min="1"
                          className={`w-full px-3 py-2 text-sm border rounded-lg ${inputClasses}`}
                        />
                      </div>
                      
                      {/* Hours Required */}
                      <div>
                        <label className="block text-xs font-medium mb-1">Hours</label>
                        <input
                          type="number"
                          value={topic.hoursRequired}
                          onChange={(e) => handleTopicChange(index, 'hoursRequired', Number(e.target.value))}
                          min="1"
                          className={`w-full px-3 py-2 text-sm border rounded-lg ${inputClasses}`}
                        />
                      </div>

                      {/* Mode of Teaching */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium mb-1">Mode of Teaching</label>
                        <select
                          value={topic.modeOfTeaching}
                          onChange={(e) => handleTopicChange(index, 'modeOfTeaching', e.target.value)}
                          className={`w-full px-3 py-2 text-sm border rounded-lg ${inputClasses}`}
                        >
                          <option value="Lecture">Lecture</option>
                          <option value="Lab">Lab</option>
                          <option value="Seminar">Seminar</option>
                          <option value="Tutorial">Tutorial</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addTopic}
                className="w-full mt-4 flex items-center justify-center gap-2 border-2 border-dashed border-blue-500 text-blue-500 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
              >
                <Plus size={20} /> Add Topic
              </button>
            </div>

            {/* Modal Footer */}
            <div className={`p-4 md:p-6 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} flex justify-end gap-3 sticky bottom-0 ${modalClasses}`}>
              <button
                onClick={closeModal}
                className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={saveLessonPlan}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-md"
              >
                <Save size={20} /> 
                {isEditing ? 'Update Plan' : 'Save Plan'}
              </button>
            </div>
          </div>
        </div>
      )}
        
      {/* View Modal */}
      {isViewModalOpen && viewingPlan && (
          <LessonPlanViewModal 
              plan={viewingPlan} 
              closeModal={closeViewModal} 
              downloadPlan={downloadLessonPlan} 
              isDarkMode={isDarkMode}
              modalClasses={modalClasses}
          />
      )}
    </div>
  );
};

export default LessonPlanManager;
