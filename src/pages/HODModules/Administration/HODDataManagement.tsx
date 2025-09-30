// HODDashboard.tsx - Complete with Working Filters and Buttons (Faculty & Students Removed)
import React, { useState, useEffect } from 'react';
import { 
  AcademicCapIcon,
  CalendarDaysIcon,
  ClockIcon,
  BookOpenIcon,
  ChartBarIcon,
  DocumentTextIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  RectangleGroupIcon,
  AdjustmentsHorizontalIcon,
  DocumentArrowUpIcon,
  DocumentIcon
} from '@heroicons/react/24/outline';

// Complete Interfaces
interface Program {
  id: string;
  departmentId: string;
  name: string;
  code: string;
  totalSeats: number;
  duration: number;
  degreeLevel: 'Undergraduate' | 'Postgraduate' | 'Doctoral';
  accreditation: string;
  isActive: boolean;
  createdAt: string;
}

interface AcademicYear {
  id: string;
  programId: string;
  name: string;
  yearNumber: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

interface Semester {
  id: string;
  yearId: string;
  name: string;
  number: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

interface Course {
  id: string;
  semesterId: string;
  departmentId: string;
  programId: string;
  yearId: string;
  name: string;
  code: string;
  credits: number;
  type: 'Core' | 'Elective' | 'Lab';
  assignedFaculty: string[];
  isActive: boolean;
  createdAt: string;
}

interface Unit {
  id: string;
  number: number;
  title: string;
  description: string;
  hours: number;
  lectures: LectureSession[];
  tutorials: TutorialSession[];
  practicals: PracticalSession[];
}

interface LectureSession {
  id: string;
  topic: string;
  duration: number;
  learningOutcomes: string[];
}

interface TutorialSession {
  id: string;
  topic: string;
  duration: number;
  exercises: string[];
}

interface PracticalSession {
  id: string;
  topic: string;
  duration: number;
  experiments: string[];
  equipment: string[];
}

interface AssessmentStructure {
  internals: number;
  externals: number;
  assignments: number;
  practicals: number;
}

interface Syllabus {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: SyllabusContent;
  definition: SyllabusDefinition;
  status: 'Draft' | 'Under Review' | 'Approved' | 'Rejected';
  createdBy: string;
  approvedBy?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

interface SyllabusContent {
  units: Unit[];
  totalHours: number;
}

interface SyllabusDefinition {
  duration: number;
  credits: number;
  assessmentStructure: AssessmentStructure;
}

interface Section {
  id: string;
  programId: string;
  yearId: string;
  semesterNumber: number;
  name: string;
  maxStudents: number;
  currentStudents: number;
  isActive: boolean;
  createdAt: string;
}

interface CourseDocument {
  id: string;
  name: string;
  type: 'syllabus' | 'notes' | 'assignments' | 'references';
  fileUrl: string;
  fileSize: number;
  uploadedAt: string;
}

interface HODDashboardProps {
  hodId: string;
  hodName: string;
  hodDepartmentId: string;
  hodDepartmentName: string;
}

type HODTabType = 'overview' | 'programs' | 'courses' | 'syllabus' | 'sections';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

interface FilterState {
  search: string;
  status: 'all' | 'active' | 'inactive';
  program?: string;
  year?: string;
  semester?: string;
  type?: string;
  syllabusStatus?: 'all' | 'Draft' | 'Under Review' | 'Approved' | 'Rejected';
}

const HODDashboard: React.FC<HODDashboardProps> = ({
  hodId,
  hodName,
  hodDepartmentId,
  hodDepartmentName
}) => {
  // State management
  const [activeTab, setActiveTab] = useState<HODTabType>('overview');
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Enhanced filters state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    syllabusStatus: 'all'
  });

  // Data states
  const [programs, setPrograms] = useState<Program[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [syllabusList, setSyllabusList] = useState<Syllabus[]>([]);
  const [sections, setSections] = useState<Section[]>([]);

  // Form states with proper initialization
  const [courseForm, setCourseForm] = useState({
    semesterId: '', programId: '', yearId: '', name: '', code: '', 
    credits: 0, type: 'Core' as const, assignedFaculty: [] as string[], 
    documents: [] as CourseDocument[], isActive: true
  });

  const [sectionForm, setSectionForm] = useState({
    programId: '', yearId: '', semesterNumber: 1, name: '', 
    maxStudents: 60, currentStudents: 0, isActive: true
  });

  const [stats, setStats] = useState({
    totalPrograms: 0,
    totalCourses: 0,
    pendingSyllabus: 0,
    activeSections: 0
  });

  useEffect(() => {
    loadHODData();
  }, [hodDepartmentId]);

  // Load comprehensive sample data for HOD's department
  const loadHODData = () => {
    const currentDate = new Date().toISOString();

    // Sample Programs (only for HOD's department)
    const samplePrograms: Program[] = [
      {
        id: 'prog1',
        departmentId: hodDepartmentId,
        name: 'Bachelor of Technology in Computer Science',
        code: 'B.TECH CSE',
        totalSeats: 120,
        duration: 4,
        degreeLevel: 'Undergraduate',
        accreditation: 'NBA Accredited',
        isActive: true,
        createdAt: currentDate
      },
      {
        id: 'prog2',
        departmentId: hodDepartmentId,
        name: 'Master of Technology in Computer Science',
        code: 'M.TECH CSE',
        totalSeats: 40,
        duration: 2,
        degreeLevel: 'Postgraduate',
        accreditation: 'AICTE Approved',
        isActive: true,
        createdAt: currentDate
      },
      {
        id: 'prog3',
        departmentId: hodDepartmentId,
        name: 'Bachelor of Computer Applications',
        code: 'BCA',
        totalSeats: 60,
        duration: 3,
        degreeLevel: 'Undergraduate',
        accreditation: 'University Approved',
        isActive: true,
        createdAt: currentDate
      }
    ];

    // Sample Academic Years
    const sampleYears: AcademicYear[] = [
      { id: 'year1', programId: 'prog1', name: 'First Year', yearNumber: 1, startDate: '2024-07-01', endDate: '2025-06-30', isActive: true, createdAt: currentDate },
      { id: 'year2', programId: 'prog1', name: 'Second Year', yearNumber: 2, startDate: '2024-07-01', endDate: '2025-06-30', isActive: true, createdAt: currentDate },
      { id: 'year3', programId: 'prog1', name: 'Third Year', yearNumber: 3, startDate: '2024-07-01', endDate: '2025-06-30', isActive: true, createdAt: currentDate },
      { id: 'year4', programId: 'prog1', name: 'Fourth Year', yearNumber: 4, startDate: '2024-07-01', endDate: '2025-06-30', isActive: true, createdAt: currentDate },
      { id: 'year5', programId: 'prog2', name: 'First Year', yearNumber: 1, startDate: '2024-07-01', endDate: '2025-06-30', isActive: true, createdAt: currentDate },
      { id: 'year6', programId: 'prog2', name: 'Second Year', yearNumber: 2, startDate: '2024-07-01', endDate: '2025-06-30', isActive: true, createdAt: currentDate },
      { id: 'year7', programId: 'prog3', name: 'First Year', yearNumber: 1, startDate: '2024-07-01', endDate: '2025-06-30', isActive: true, createdAt: currentDate },
      { id: 'year8', programId: 'prog3', name: 'Second Year', yearNumber: 2, startDate: '2024-07-01', endDate: '2025-06-30', isActive: true, createdAt: currentDate },
      { id: 'year9', programId: 'prog3', name: 'Third Year', yearNumber: 3, startDate: '2024-07-01', endDate: '2025-06-30', isActive: true, createdAt: currentDate }
    ];

    // Sample Semesters
    const sampleSemesters: Semester[] = [
      { id: 'sem1', yearId: 'year1', name: 'First Semester', number: 1, startDate: '2024-07-01', endDate: '2024-11-30', isActive: true, createdAt: currentDate },
      { id: 'sem2', yearId: 'year1', name: 'Second Semester', number: 2, startDate: '2025-01-01', endDate: '2025-05-31', isActive: true, createdAt: currentDate },
      { id: 'sem3', yearId: 'year2', name: 'Third Semester', number: 3, startDate: '2024-07-01', endDate: '2024-11-30', isActive: true, createdAt: currentDate },
      { id: 'sem4', yearId: 'year2', name: 'Fourth Semester', number: 4, startDate: '2025-01-01', endDate: '2025-05-31', isActive: true, createdAt: currentDate },
      { id: 'sem5', yearId: 'year3', name: 'Fifth Semester', number: 5, startDate: '2024-07-01', endDate: '2024-11-30', isActive: true, createdAt: currentDate },
      { id: 'sem6', yearId: 'year3', name: 'Sixth Semester', number: 6, startDate: '2025-01-01', endDate: '2025-05-31', isActive: true, createdAt: currentDate },
      { id: 'sem7', yearId: 'year4', name: 'Seventh Semester', number: 7, startDate: '2024-07-01', endDate: '2024-11-30', isActive: true, createdAt: currentDate },
      { id: 'sem8', yearId: 'year4', name: 'Eighth Semester', number: 8, startDate: '2025-01-01', endDate: '2025-05-31', isActive: true, createdAt: currentDate },
      { id: 'sem9', yearId: 'year5', name: 'First Semester', number: 1, startDate: '2024-07-01', endDate: '2024-11-30', isActive: true, createdAt: currentDate },
      { id: 'sem10', yearId: 'year5', name: 'Second Semester', number: 2, startDate: '2025-01-01', endDate: '2025-05-31', isActive: true, createdAt: currentDate }
    ];

    // Sample Courses (only for HOD's department)
    const sampleCourses: Course[] = [
      {
        id: 'course1', semesterId: 'sem1', departmentId: hodDepartmentId, programId: 'prog1', yearId: 'year1',
        name: 'Programming Fundamentals', code: 'CS101', credits: 4, type: 'Core',
        assignedFaculty: ['fac1'], isActive: true, createdAt: currentDate
      },
      {
        id: 'course2', semesterId: 'sem1', departmentId: hodDepartmentId, programId: 'prog1', yearId: 'year1',
        name: 'Mathematics for Computer Science', code: 'MATH101', credits: 3, type: 'Core',
        assignedFaculty: ['fac2'], isActive: true, createdAt: currentDate
      },
      {
        id: 'course3', semesterId: 'sem2', departmentId: hodDepartmentId, programId: 'prog1', yearId: 'year1',
        name: 'Data Structures & Algorithms', code: 'CS102', credits: 4, type: 'Core',
        assignedFaculty: ['fac1'], isActive: true, createdAt: currentDate
      },
      {
        id: 'course4', semesterId: 'sem3', departmentId: hodDepartmentId, programId: 'prog1', yearId: 'year2',
        name: 'Database Management Systems', code: 'CS201', credits: 3, type: 'Core',
        assignedFaculty: ['fac1', 'fac3'], isActive: true, createdAt: currentDate
      },
      {
        id: 'course5', semesterId: 'sem5', departmentId: hodDepartmentId, programId: 'prog1', yearId: 'year3',
        name: 'Machine Learning', code: 'CS301', credits: 4, type: 'Elective',
        assignedFaculty: ['fac4'], isActive: true, createdAt: currentDate
      },
      {
        id: 'course6', semesterId: 'sem1', departmentId: hodDepartmentId, programId: 'prog1', yearId: 'year1',
        name: 'Programming Lab', code: 'CS101L', credits: 2, type: 'Lab',
        assignedFaculty: ['fac1'], isActive: true, createdAt: currentDate
      },
      {
        id: 'course7', semesterId: 'sem9', departmentId: hodDepartmentId, programId: 'prog2', yearId: 'year5',
        name: 'Advanced Algorithms', code: 'CS501', credits: 4, type: 'Core',
        assignedFaculty: ['fac3'], isActive: true, createdAt: currentDate
      },
      {
        id: 'course8', semesterId: 'sem1', departmentId: hodDepartmentId, programId: 'prog3', yearId: 'year7',
        name: 'Computer Fundamentals', code: 'BCA101', credits: 3, type: 'Core',
        assignedFaculty: ['fac5'], isActive: true, createdAt: currentDate
      }
    ];

    // Sample Syllabus with different statuses
    const sampleSyllabus: Syllabus[] = [
      {
        id: 'syl1',
        courseId: 'course1',
        title: 'Programming Fundamentals Syllabus',
        description: 'Introduction to programming concepts and problem-solving techniques',
        content: {
          units: [
            {
              id: 'unit1', number: 1, title: 'Introduction to Programming', 
              description: 'Basic programming concepts', hours: 15,
              lectures: [{
                id: 'lec1', topic: 'Programming Languages Overview', duration: 2,
                learningOutcomes: ['Understand different paradigms', 'Learn syntax basics']
              }],
              tutorials: [{
                id: 'tut1', topic: 'Basic Programming Exercises', duration: 1,
                exercises: ['Hello World', 'Variable Declaration']
              }],
              practicals: [{
                id: 'prac1', topic: 'IDE Setup', duration: 2,
                experiments: ['Install IDE', 'First Program'],
                equipment: ['Computer', 'IDE Software']
              }]
            }
          ],
          totalHours: 60
        },
        definition: {
          duration: 16, credits: 4,
          assessmentStructure: { internals: 30, externals: 50, assignments: 10, practicals: 10 }
        },
        status: 'Under Review', createdBy: 'fac1', createdAt: currentDate, updatedAt: currentDate
      },
      {
        id: 'syl2',
        courseId: 'course2',
        title: 'Mathematics for Computer Science Syllabus',
        description: 'Discrete mathematics and mathematical foundations',
        content: { units: [], totalHours: 45 },
        definition: {
          duration: 16, credits: 3,
          assessmentStructure: { internals: 40, externals: 50, assignments: 10, practicals: 0 }
        },
        status: 'Approved', createdBy: 'fac2', approvedBy: hodId, createdAt: currentDate, updatedAt: currentDate
      },
      {
        id: 'syl3',
        courseId: 'course3',
        title: 'Data Structures & Algorithms Syllabus',
        description: 'Advanced data structures and algorithmic techniques',
        content: { units: [], totalHours: 60 },
        definition: {
          duration: 16, credits: 4,
          assessmentStructure: { internals: 30, externals: 50, assignments: 10, practicals: 10 }
        },
        status: 'Draft', createdBy: 'fac1', createdAt: currentDate, updatedAt: currentDate
      },
      {
        id: 'syl4',
        courseId: 'course4',
        title: 'Database Management Systems Syllabus',
        description: 'Database design and implementation',
        content: { units: [], totalHours: 45 },
        definition: {
          duration: 16, credits: 3,
          assessmentStructure: { internals: 30, externals: 40, assignments: 15, practicals: 15 }
        },
        status: 'Rejected', createdBy: 'fac3', rejectionReason: 'Assessment structure needs revision',
        createdAt: currentDate, updatedAt: currentDate
      }
    ];

    // Sample Sections
    const sampleSections: Section[] = [
      {
        id: 'sec1', programId: 'prog1', yearId: 'year1', semesterNumber: 1, name: 'A',
        maxStudents: 60, currentStudents: 58, isActive: true, createdAt: currentDate
      },
      {
        id: 'sec2', programId: 'prog1', yearId: 'year1', semesterNumber: 1, name: 'B',
        maxStudents: 60, currentStudents: 55, isActive: true, createdAt: currentDate
      },
      {
        id: 'sec3', programId: 'prog1', yearId: 'year2', semesterNumber: 3, name: 'A',
        maxStudents: 60, currentStudents: 57, isActive: true, createdAt: currentDate
      },
      {
        id: 'sec4', programId: 'prog2', yearId: 'year5', semesterNumber: 1, name: 'A',
        maxStudents: 40, currentStudents: 35, isActive: true, createdAt: currentDate
      },
      {
        id: 'sec5', programId: 'prog3', yearId: 'year7', semesterNumber: 1, name: 'A',
        maxStudents: 60, currentStudents: 45, isActive: true, createdAt: currentDate
      },
      {
        id: 'sec6', programId: 'prog1', yearId: 'year1', semesterNumber: 2, name: 'A',
        maxStudents: 60, currentStudents: 0, isActive: false, createdAt: currentDate
      }
    ];

    setPrograms(samplePrograms);
    setAcademicYears(sampleYears);
    setSemesters(sampleSemesters);
    setCourses(sampleCourses);
    setSyllabusList(sampleSyllabus);
    setSections(sampleSections);

    // Update stats
    setStats({
      totalPrograms: samplePrograms.length,
      totalCourses: sampleCourses.filter(c => c.isActive).length,
      pendingSyllabus: sampleSyllabus.filter(s => s.status === 'Under Review').length,
      activeSections: sampleSections.filter(s => s.isActive).length
    });
  };

  // Utility functions
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  // Document management
  const addDocument = (file: File, type: 'syllabus' | 'notes' | 'assignments' | 'references') => {
    const newDocument: CourseDocument = {
      id: generateId(),
      name: file.name,
      type: type,
      fileUrl: URL.createObjectURL(file),
      fileSize: file.size,
      uploadedAt: new Date().toISOString()
    };
    setCourseForm({
      ...courseForm,
      documents: [...courseForm.documents, newDocument]
    });
  };

  const removeDocument = (index: number) => {
    const updatedDocs = courseForm.documents.filter((_, i) => i !== index);
    setCourseForm({
      ...courseForm,
      documents: updatedDocs
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'syllabus' | 'notes' | 'assignments' | 'references') => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showToast('File size should not exceed 10MB', 'error');
        return;
      }
      
      const allowedTypes = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.txt'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        showToast('Only PDF, DOC, DOCX, PPT, PPTX, and TXT files are allowed', 'error');
        return;
      }
      
      addDocument(file, type);
      showToast(`${type} document uploaded successfully`, 'success');
    }
  };

  // CRUD Operations for HOD
  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!courseForm.semesterId || !courseForm.programId || !courseForm.yearId || 
        !courseForm.name || !courseForm.code || courseForm.credits <= 0) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    
    if (editingId) {
      setCourses(prev => prev.map(course => 
        course.id === editingId 
          ? { 
              ...courseForm, 
              id: editingId, 
              departmentId: hodDepartmentId,
              createdAt: prev.find(c => c.id === editingId)?.createdAt || new Date().toISOString() 
            }
          : course
      ));
      showToast('Course updated successfully', 'success');
    } else {
      const newCourse: Course = {
        ...courseForm,
        id: generateId(),
        departmentId: hodDepartmentId,
        createdAt: new Date().toISOString()
      };
      setCourses(prev => [...prev, newCourse]);
      showToast('Course added successfully', 'success');
    }

    // Reset form
    setCourseForm({
      semesterId: '', programId: '', yearId: '', name: '', code: '', 
      credits: 0, type: 'Core', assignedFaculty: [], documents: [], isActive: true
    });
    setEditingId(null);
    setShowModal(false);
  };

  const handleSyllabusApproval = (syllabusId: string, action: 'approve' | 'reject', reason?: string) => {
    setSyllabusList(prev => prev.map(syl =>
      syl.id === syllabusId 
        ? { 
            ...syl, 
            status: action === 'approve' ? 'Approved' : 'Rejected',
            approvedBy: action === 'approve' ? hodId : undefined,
            rejectionReason: action === 'reject' ? reason : undefined,
            updatedAt: new Date().toISOString()
          }
        : syl
    ));
    showToast(`Syllabus ${action}d successfully`, 'success');
  };

  const handleSectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!sectionForm.programId || !sectionForm.yearId || !sectionForm.name || 
        sectionForm.maxStudents <= 0 || sectionForm.semesterNumber <= 0) {
      showToast('Please fill all required fields correctly', 'error');
      return;
    }
    
    if (editingId) {
      setSections(prev => prev.map(sec => 
        sec.id === editingId 
          ? { ...sectionForm, id: editingId, createdAt: prev.find(s => s.id === editingId)?.createdAt || new Date().toISOString() }
          : sec
      ));
      showToast('Section updated successfully', 'success');
    } else {
      const newSection: Section = {
        ...sectionForm,
        id: generateId(),
        createdAt: new Date().toISOString()
      };
      setSections(prev => [...prev, newSection]);
      showToast('Section added successfully', 'success');
    }

    // Reset form
    setSectionForm({
      programId: '', yearId: '', semesterNumber: 1, name: '', 
      maxStudents: 60, currentStudents: 0, isActive: true
    });
    setEditingId(null);
    setShowModal(false);
  };

  // Edit functions
  const editCourse = (course: Course) => {
    setCourseForm({
      semesterId: course.semesterId,
      programId: course.programId,
      yearId: course.yearId,
      name: course.name,
      code: course.code,
      credits: course.credits,
      type: course.type,
      assignedFaculty: course.assignedFaculty,
      documents: [],
      isActive: course.isActive
    });
    setEditingId(course.id);
    setShowModal(true);
  };

  const editSection = (section: Section) => {
    setSectionForm({
      programId: section.programId,
      yearId: section.yearId,
      semesterNumber: section.semesterNumber,
      name: section.name,
      maxStudents: section.maxStudents,
      currentStudents: section.currentStudents,
      isActive: section.isActive
    });
    setEditingId(section.id);
    setShowModal(true);
  };

  // Delete functions
  const deleteCourse = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(prev => prev.filter(course => course.id !== id));
      showToast('Course deleted successfully', 'success');
    }
  };

  const deleteSection = (id: string) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      setSections(prev => prev.filter(sec => sec.id !== id));
      showToast('Section deleted successfully', 'success');
    }
  };

  // Enhanced filter functions
  const applyFilters = (data: any[]) => {
    return data.filter(item => {
      // Search filter
      const matchesSearch = item.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
                           item.code?.toLowerCase().includes(filters.search.toLowerCase()) ||
                           item.title?.toLowerCase().includes(filters.search.toLowerCase());
      
      // Status filter
      const matchesStatus = filters.status === 'all' || 
                           (filters.status === 'active' && item.isActive) ||
                           (filters.status === 'inactive' && !item.isActive);

      // Program filter
      const matchesProgram = !filters.program || item.programId === filters.program;
      
      // Year filter
      const matchesYear = !filters.year || item.yearId === filters.year;
      
      // Semester filter
      const matchesSemester = !filters.semester || item.semesterId === filters.semester || item.semesterNumber?.toString() === filters.semester;
      
      // Type filter (for courses)
      const matchesType = !filters.type || item.type === filters.type;
      
      // Syllabus status filter
      const matchesSyllabusStatus = filters.syllabusStatus === 'all' || item.status === filters.syllabusStatus;

      return matchesSearch && matchesStatus && matchesProgram && matchesYear && 
             matchesSemester && matchesType && matchesSyllabusStatus;
    });
  };

  const getFilteredData = () => {
    switch (activeTab) {
      case 'programs': return applyFilters(programs);
      case 'courses': return applyFilters(courses);
      case 'syllabus': return applyFilters(syllabusList);
      case 'sections': return applyFilters(sections);
      default: return [];
    }
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      syllabusStatus: 'all'
    });
  };

  // Helper functions
  const getProgramName = (id: string) => programs.find(p => p.id === id)?.name || 'Unknown';
  const getYearName = (id: string) => academicYears.find(y => y.id === id)?.name || 'Unknown';
  const getSemesterName = (id: string) => semesters.find(s => s.id === id)?.name || 'Unknown';
  const getCourseName = (id: string) => courses.find(c => c.id === id)?.name || 'Unknown';

  const hodTabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'programs', label: 'Programs', icon: AcademicCapIcon },
    { id: 'courses', label: 'Courses', icon: BookOpenIcon },
    { id: 'syllabus', label: 'Syllabus', icon: DocumentTextIcon },
    { id: 'sections', label: 'Sections', icon: RectangleGroupIcon },
  ];

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview': return `${hodDepartmentName} - Overview`;
      case 'programs': return 'Program Management';
      case 'courses': return 'Course Management';
      case 'syllabus': return 'Syllabus Management';
      case 'sections': return 'Section Management';
      default: return 'Dashboard';
    }
  };

  const getAddButtonText = () => {
    switch (activeTab) {
      case 'courses': return 'Add Course';
      case 'sections': return 'Add Section';
      default: return null;
    }
  };

  const canAdd = () => {
    return ['courses', 'sections'].includes(activeTab);
  };

  const openAddModal = () => {
    if (!canAdd()) return;
    setEditingId(null);
    
    // Reset forms based on active tab
    if (activeTab === 'courses') {
      setCourseForm({
        semesterId: '', programId: '', yearId: '', name: '', code: '', 
        credits: 0, type: 'Core', assignedFaculty: [], documents: [], isActive: true
      });
    } else if (activeTab === 'sections') {
      setSectionForm({
        programId: '', yearId: '', semesterNumber: 1, name: '', 
        maxStudents: 60, currentStudents: 0, isActive: true
      });
    }
    
    setShowModal(true);
  };

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            {toast.type === 'success' ? (
              <CheckCircleIcon className="h-5 w-5" />
            ) : (
              <XCircleIcon className="h-5 w-5" />
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
      {/* Navigation Tabs */}
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {hodTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as HODTabType);
                    setShowModal(false);
                    setEditingId(null);
                    resetFilters();
                  }}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600 dark:text-green-400'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {hodDepartmentName} Overview
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Department statistics and management dashboard
              </p>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <AcademicCapIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Programs</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalPrograms}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <BookOpenIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Courses</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalCourses}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                    <DocumentTextIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Pending Syllabus</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.pendingSyllabus}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                    <RectangleGroupIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Sections</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.activeSections}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Active Programs</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {programs.slice(0, 5).map(prog => (
                      <div key={prog.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                            <AcademicCapIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{prog.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{prog.code}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{prog.totalSeats} seats</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Courses</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {courses.slice(0, 5).map(course => (
                      <div key={course.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                            <BookOpenIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{course.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{course.code} - {course.credits} credits</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          course.type === 'Core' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : course.type === 'Elective' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {course.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Syllabus Status Overview */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Syllabus Status Overview</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Draft</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {syllabusList.filter(s => s.status === 'Draft').length}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Under Review</p>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {syllabusList.filter(s => s.status === 'Under Review').length}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Approved</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {syllabusList.filter(s => s.status === 'Approved').length}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Rejected</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {syllabusList.filter(s => s.status === 'Rejected').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Management Tabs */}
        {activeTab !== 'overview' && (
          <div>
            {/* Page Header with Enhanced Controls */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{getTabTitle()}</h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    {activeTab === 'programs' ? 'View department programs (Read-only)' :
                     activeTab === 'syllabus' ? 'Review and approve course syllabus' :
                     `Manage department ${activeTab}`}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
                      showFilters 
                        ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900 dark:border-green-600 dark:text-green-300' 
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <FunnelIcon className="h-5 w-5" />
                    <span>Filters</span>
                  </button>
                  {getAddButtonText() && (
                    <button
                      onClick={openAddModal}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      <PlusIcon className="h-5 w-5" />
                      <span>{getAddButtonText()}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Filters Panel */}
            {showFilters && (
              <div className="mb-6 bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {/* Search Filter */}
                  <div className="col-span-full md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Search
                    </label>
                    <div className="relative">
                      <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search by name, code..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value as 'all' | 'active' | 'inactive' })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Program Filter - for courses, sections */}
                  {(['courses', 'sections'].includes(activeTab)) && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Program
                      </label>
                      <select
                        value={filters.program || ''}
                        onChange={(e) => setFilters({ ...filters, program: e.target.value || undefined })}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                      >
                        <option value="">All Programs</option>
                        {programs.filter(prog => prog.isActive).map(prog => (
                          <option key={prog.id} value={prog.id}>{prog.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Year Filter - for courses, sections */}
                  {(['courses', 'sections'].includes(activeTab)) && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Year
                      </label>
                      <select
                        value={filters.year || ''}
                        onChange={(e) => setFilters({ ...filters, year: e.target.value || undefined })}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                      >
                        <option value="">All Years</option>
                        {academicYears.filter(year => year.isActive).map(year => (
                          <option key={year.id} value={year.id}>{year.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Type Filter - for courses */}
                  {activeTab === 'courses' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Type
                      </label>
                      <select
                        value={filters.type || ''}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value || undefined })}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                      >
                        <option value="">All Types</option>
                        <option value="Core">Core</option>
                        <option value="Elective">Elective</option>
                        <option value="Lab">Lab</option>
                      </select>
                    </div>
                  )}

                  {/* Syllabus Status Filter - for syllabus */}
                  {activeTab === 'syllabus' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Syllabus Status
                      </label>
                      <select
                        value={filters.syllabusStatus || 'all'}
                        onChange={(e) => setFilters({ ...filters, syllabusStatus: e.target.value as any })}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                      >
                        <option value="all">All Status</option>
                        <option value="Draft">Draft</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Filter Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Showing {filteredData.length} results
                  </div>
                  <button
                    onClick={resetFilters}
                    className="flex items-center space-x-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200"
                  >
                    <AdjustmentsHorizontalIcon className="h-4 w-4" />
                    <span>Reset Filters</span>
                  </button>
                </div>
              </div>
            )}

            {/* Syllabus Management Special View */}
            {activeTab === 'syllabus' && (
              <div className="space-y-6">
                {filteredData.length === 0 ? (
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-8 text-center">
                    <DocumentTextIcon className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">No syllabus found matching your criteria.</p>
                  </div>
                ) : (
                  filteredData.map((syllabus: Syllabus) => (
                    <div key={syllabus.id} className="bg-white dark:bg-slate-800 rounded-lg shadow">
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                <DocumentTextIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <h4 className="text-lg font-medium text-slate-900 dark:text-white">
                                  {syllabus.title}
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  Course: {getCourseName(syllabus.courseId)} |
                                  Duration: {syllabus.definition.duration} weeks |
                                  Credits: {syllabus.definition.credits}
                                </p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-sm text-slate-600 dark:text-slate-300">
                                {syllabus.description}
                              </p>
                            </div>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400">Units</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{syllabus.content.units.length}</p>
                              </div>
                              <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400">Total Hours</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{syllabus.content.totalHours}</p>
                              </div>
                              <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400">Credits</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{syllabus.definition.credits}</p>
                              </div>
                              <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400">Assessment</p>
                                <p className="text-xs text-slate-600 dark:text-slate-300">
                                  I:{syllabus.definition.assessmentStructure.internals}% 
                                  E:{syllabus.definition.assessmentStructure.externals}%
                                </p>
                              </div>
                            </div>
                            
                            {syllabus.rejectionReason && (
                              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <p className="text-sm text-red-800 dark:text-red-200">
                                  <span className="font-medium">Rejection Reason:</span> {syllabus.rejectionReason}
                                </p>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-3 ml-6">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              syllabus.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              syllabus.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                              syllabus.status === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                              'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                            }`}>
                              {syllabus.status}
                            </span>
                            
                            <button
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              title="View Details"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            
                            {syllabus.status === 'Under Review' && (
                              <>
                                <button
                                  onClick={() => handleSyllabusApproval(syllabus.id, 'approve')}
                                  className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                  title="Approve"
                                >
                                  <CheckCircleIcon className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => {
                                    const reason = prompt('Please provide a reason for rejection:');
                                    if (reason) {
                                      handleSyllabusApproval(syllabus.id, 'reject', reason);
                                    }
                                  }}
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                  title="Reject"
                                >
                                  <XCircleIcon className="h-5 w-5" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Regular Data Tables for other tabs */}
            {activeTab !== 'syllabus' && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {getTabTitle()} ({filteredData.length})
                  </h3>
                </div>
                
                {filteredData.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      {activeTab === 'programs' && <AcademicCapIcon className="h-6 w-6 text-slate-400" />}
                      {activeTab === 'courses' && <BookOpenIcon className="h-6 w-6 text-slate-400" />}
                      {activeTab === 'sections' && <RectangleGroupIcon className="h-6 w-6 text-slate-400" />}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">No data found matching your criteria.</p>
                    {canAdd() && (
                      <button
                        onClick={openAddModal}
                        className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <PlusIcon className="h-4 w-4" />
                        <span>{getAddButtonText()}</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                      {/* Programs Table (Read-only) */}
                      {activeTab === 'programs' && (
                        <>
                          <thead className="bg-slate-50 dark:bg-slate-700">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Program
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Code
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Level
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Duration
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Seats
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                            {filteredData.map((prog: Program) => (
                              <tr key={prog.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                                      <AcademicCapIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-slate-900 dark:text-white">{prog.name}</div>
                                      <div className="text-sm text-slate-500 dark:text-slate-400">{prog.accreditation}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    {prog.code}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    prog.degreeLevel === 'Undergraduate' 
                                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                      : prog.degreeLevel === 'Postgraduate'
                                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                                  }`}>
                                    {prog.degreeLevel}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                                  {prog.duration} Years
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                                  <span className="font-semibold text-slate-900 dark:text-white">{prog.totalSeats}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    prog.isActive 
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                      : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                                  }`}>
                                    {prog.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      )}

                      {/* Courses Table */}
                      {activeTab === 'courses' && (
                        <>
                          <thead className="bg-slate-50 dark:bg-slate-700">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Course
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Program
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Year/Semester
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Credits & Type
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                            {filteredData.map((course: Course) => (
                              <tr key={course.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                                      <BookOpenIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-slate-900 dark:text-white">{course.name}</div>
                                      <div className="text-sm text-slate-500 dark:text-slate-400">{course.code}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                                  {getProgramName(course.programId)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                                  <div>
                                    <div>{getYearName(course.yearId)}</div>
                                    <div className="text-xs text-slate-400">{getSemesterName(course.semesterId)}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                                  <div>
                                    <div className="font-medium">{course.credits} Credits</div>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                      course.type === 'Core' 
                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                        : course.type === 'Elective' 
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    }`}>
                                      {course.type}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    course.isActive 
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                      : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                                  }`}>
                                    {course.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => editCourse(course)}
                                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                      title="Edit"
                                    >
                                      <PencilIcon className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => deleteCourse(course.id)}
                                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                      title="Delete"
                                    >
                                      <TrashIcon className="h-4 w-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      )}

                      {/* Sections Table */}
                      {activeTab === 'sections' && (
                        <>
                          <thead className="bg-slate-50 dark:bg-slate-700">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Section
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Program
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Year & Semester
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Capacity
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Students
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                            {filteredData.map((section: Section) => (
                              <tr key={section.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                                      <RectangleGroupIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                                        Section {section.name}
                                      </div>
                                      <div className="text-sm text-slate-500 dark:text-slate-400">
                                        Created {new Date(section.createdAt).toLocaleDateString()}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                                  {getProgramName(section.programId)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                                  <div>
                                    <div>{getYearName(section.yearId)}</div>
                                    <div className="text-xs text-slate-400">Semester {section.semesterNumber}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                                  <span className="font-semibold text-slate-900 dark:text-white">{section.maxStudents}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                                  <div className="flex items-center space-x-2">
                                    <div className={`w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 ${
                                      section.currentStudents > section.maxStudents * 0.9 ? 'bg-red-200' : 
                                      section.currentStudents > section.maxStudents * 0.8 ? 'bg-yellow-200' : 'bg-green-200'
                                    }`}>
                                      <div className={`h-2 rounded-full ${
                                        section.currentStudents > section.maxStudents * 0.9 ? 'bg-red-500' : 
                                        section.currentStudents > section.maxStudents * 0.8 ? 'bg-yellow-500' : 'bg-green-500'
                                      }`} style={{width: `${Math.min((section.currentStudents / section.maxStudents) * 100, 100)}%`}}></div>
                                    </div>
                                    <span className="text-xs font-medium whitespace-nowrap">
                                      {section.currentStudents}/{section.maxStudents}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    section.isActive 
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                      : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                                  }`}>
                                    {section.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => editSection(section)}
                                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                      title="Edit"
                                    >
                                      <PencilIcon className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => deleteSection(section.id)}
                                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                      title="Delete"
                                    >
                                      <TrashIcon className="h-4 w-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      )}
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Enhanced Modal for Forms */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {editingId ? `Edit ${activeTab.slice(0, -1)}` : `Add ${activeTab.slice(0, -1)}`}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Course Form */}
              {activeTab === 'courses' && (
                <form onSubmit={handleCourseSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Program *
                      </label>
                      <select
                        value={courseForm.programId}
                        onChange={(e) => setCourseForm({...courseForm, programId: e.target.value, yearId: '', semesterId: ''})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                        required
                      >
                        <option value="">Select Program</option>
                        {programs.filter(p => p.isActive).map(prog => (
                          <option key={prog.id} value={prog.id}>{prog.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Academic Year *
                      </label>
                      <select
                        value={courseForm.yearId}
                        onChange={(e) => setCourseForm({...courseForm, yearId: e.target.value, semesterId: ''})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                        required
                      >
                        <option value="">Select Academic Year</option>
                        {academicYears.filter(y => y.isActive && y.programId === courseForm.programId).map(year => (
                          <option key={year.id} value={year.id}>{year.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Semester *
                    </label>
                    <select
                      value={courseForm.semesterId}
                      onChange={(e) => setCourseForm({...courseForm, semesterId: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                      required
                    >
                      <option value="">Select Semester</option>
                      {semesters.filter(s => s.isActive && s.yearId === courseForm.yearId).map(sem => (
                        <option key={sem.id} value={sem.id}>{sem.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Course Name *
                      </label>
                      <input
                        type="text"
                        value={courseForm.name}
                        onChange={(e) => setCourseForm({...courseForm, name: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                        placeholder="e.g., Data Structures & Algorithms"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Course Code *
                      </label>
                      <input
                        type="text"
                        value={courseForm.code}
                        onChange={(e) => setCourseForm({...courseForm, code: e.target.value.toUpperCase()})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                        placeholder="e.g., CS201"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Credits *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={courseForm.credits}
                        onChange={(e) => setCourseForm({...courseForm, credits: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Course Type *
                      </label>
                      <select
                        value={courseForm.type}
                        onChange={(e) => setCourseForm({...courseForm, type: e.target.value as 'Core' | 'Elective' | 'Lab'})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                        required
                      >
                        <option value="Core">Core</option>
                        <option value="Elective">Elective</option>
                        <option value="Lab">Lab</option>
                      </select>
                    </div>
                  </div>

                  {/* Course Documents Section */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                      Course Documents
                    </label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                          Syllabus
                        </label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload(e, 'syllabus')}
                          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                          Lecture Notes
                        </label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          onChange={(e) => handleFileUpload(e, 'notes')}
                          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                          Assignments
                        </label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload(e, 'assignments')}
                          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                          References
                        </label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload(e, 'references')}
                          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        />
                      </div>
                    </div>

                    {/* Uploaded Documents List */}
                    {courseForm.documents.length > 0 && (
                      <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">Uploaded Documents</h4>
                        <div className="space-y-2">
                          {courseForm.documents.map((doc, index) => (
                            <div key={doc.id} className="flex items-center justify-between p-2 bg-white dark:bg-slate-600 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <DocumentIcon className="h-5 w-5 text-slate-400" />
                                <div>
                                  <p className="text-sm font-medium text-slate-900 dark:text-white">{doc.name}</p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {doc.type} | {(doc.fileSize / 1024).toFixed(1)} KB
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeDocument(index)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={courseForm.isActive}
                      onChange={(e) => setCourseForm({...courseForm, isActive: e.target.checked})}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-slate-300 rounded"
                    />
                    <label className="ml-3 block text-sm text-slate-700 dark:text-slate-300">
                      Active Course
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200 dark:border-slate-600">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                    >
                      {editingId ? 'Update' : 'Create'} Course
                    </button>
                  </div>
                </form>
              )}

              {/* Section Form */}
              {activeTab === 'sections' && (
                <form onSubmit={handleSectionSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Program *
                      </label>
                      <select
                        value={sectionForm.programId}
                        onChange={(e) => setSectionForm({...sectionForm, programId: e.target.value, yearId: ''})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                        required
                      >
                        <option value="">Select Program</option>
                        {programs.filter(p => p.isActive).map(prog => (
                          <option key={prog.id} value={prog.id}>{prog.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Academic Year *
                      </label>
                      <select
                        value={sectionForm.yearId}
                        onChange={(e) => setSectionForm({...sectionForm, yearId: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                        required
                      >
                        <option value="">Select Academic Year</option>
                        {academicYears.filter(y => y.isActive && y.programId === sectionForm.programId).map(year => (
                          <option key={year.id} value={year.id}>{year.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Semester Number *
                      </label>
                      <select
                        value={sectionForm.semesterNumber}
                        onChange={(e) => setSectionForm({...sectionForm, semesterNumber: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                        required
                      >
                        <option value={0}>Select Semester</option>
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>Semester {num}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Section Name *
                      </label>
                      <input
                        type="text"
                        value={sectionForm.name}
                        onChange={(e) => setSectionForm({...sectionForm, name: e.target.value.toUpperCase()})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                        placeholder="e.g., A, B, C"
                        maxLength={2}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Max Students *
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="100"
                        value={sectionForm.maxStudents}
                        onChange={(e) => setSectionForm({...sectionForm, maxStudents: parseInt(e.target.value) || 60})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Current Students
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={sectionForm.maxStudents}
                      value={sectionForm.currentStudents}
                      onChange={(e) => setSectionForm({...sectionForm, currentStudents: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Number of students currently enrolled in this section
                    </p>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={sectionForm.isActive}
                      onChange={(e) => setSectionForm({...sectionForm, isActive: e.target.checked})}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-slate-300 rounded"
                    />
                    <label className="ml-3 block text-sm text-slate-700 dark:text-slate-300">
                      Active Section
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200 dark:border-slate-600">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                    >
                      {editingId ? 'Update' : 'Create'} Section
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HODDashboard;
