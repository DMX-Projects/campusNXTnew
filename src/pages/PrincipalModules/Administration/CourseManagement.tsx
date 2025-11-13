import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  BuildingOfficeIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  ClockIcon,
  BookOpenIcon,
  ChartBarIcon,  
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,  
  XCircleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  MinusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HashtagIcon
} from '@heroicons/react/24/outline';

// --- Interfaces ---

interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  isActive: boolean;
  createdAt: string;
}

interface SeatQuota {
  id: string;
  type: string;
  seats: number;
}

interface ProgramSemester {
  id: string;
  name: string;
  number: number;
  startDate: string;
  endDate: string;
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

interface AcademicYear {
  id: string;
  programId: string;
  name: string;
  yearNumber: number;
  startDate: string;
  endDate: string;
  semesters: Semester[];
  isActive: boolean;
  createdAt: string;
}

interface Program {
  id: string;
  departmentId: string;
  name: string;
  code: string;
  totalSeats: number;
  seatQuotas: SeatQuota[];
  duration: number;
  degreeLevel: 'Undergraduate' | 'Postgraduate' | 'Doctoral';
  accreditation: string;
  years: AcademicYear[];
  isActive: boolean;
  createdAt: string;
}

interface Course {
  id: string;
  name: string;
  code: string;
  program: string;
  department: string;
  year: number;
  semester: number;
  credits: number;
  type: 'Core' | 'Elective' | 'Lab';
  status: 'active' | 'inactive';
  regulation: string; // <-- Updated: Regulation Name
  regulationYear: string; // <-- Updated: Regulation Year
  ph: boolean;
  subjects: string[];
  createdAt: string;
  // Temporary fields for form logic simplification
  programId?: string;
  departmentId?: string;
  yearId?: string;
  semesterId?: string;
}

interface PrincipalDashboardProps {
  principalId: string;
  instituteName: string;
}

type PrincipalTabType = 'overview' | 'departments' | 'programs' | 'courses';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

interface FilterState {
  search: string;
  status: 'all' | 'active' | 'inactive';
  department?: string;
  program?: string;
  degreeLevel?: string;
  // NEW FILTER FIELDS
  yearId?: string;
  semesterId?: string;
}

interface ProgramAcademicYear {
  id: string;
  name: string;
  yearNumber: number;
  startDate: string;
  endDate: string;
  semesters: ProgramSemester[];
}

const mockCourses: Course[] = [
  { id: 'cs101', name: 'Programming Fundamentals', code: 'CS101', program: 'B.Tech in Computer Science', department: 'Computer Science & Engineering', year: 1, semester: 1, credits: 4, type: 'Core', status: 'active', regulation: 'R2023', regulationYear: '2023', ph: false, subjects: ['Variables', 'Loops', 'Functions'], createdAt: '2025-01-01', programId: 'prog1', departmentId: 'dept1', yearId: 'prog1year1', semesterId: 'prog1sem1' },
  { id: 'math101', name: 'Mathematics for CS', code: 'MATH101', program: 'B.Tech in Computer Science', department: 'Computer Science & Engineering', year: 1, semester: 1, credits: 3, type: 'Core', status: 'active', regulation: 'R2023', regulationYear: '2023', ph: false, subjects: ['Logic', 'Set Theory'], createdAt: '2025-01-01', programId: 'prog1', departmentId: 'dept1', yearId: 'prog1year1', semesterId: 'prog1sem1' },
  { id: 'cs201', name: 'Database Management Systems', code: 'CS201', program: 'B.Tech in Computer Science', department: 'Computer Science & Engineering', year: 2, semester: 3, credits: 3, type: 'Core', status: 'active', regulation: 'R2023', regulationYear: '2023', ph: true, subjects: ['SQL', 'Transactions'], createdAt: '2025-09-01', programId: 'prog1', departmentId: 'dept1', yearId: 'prog1year2', semesterId: 'prog1sem3' },
  { id: 'cs303', name: 'Machine Learning', code: 'CS303', program: 'B.Tech in Computer Science', department: 'Computer Science & Engineering', year: 3, semester: 6, credits: 4, type: 'Core', status: 'active', regulation: 'R2023', regulationYear: '2023', ph: false, subjects: ['Regression', 'Classification'], createdAt: '2027-01-01', programId: 'prog1', departmentId: 'dept1', yearId: 'prog1year3', semesterId: 'prog1sem6' },
  { id: 'ece101', name: 'Basic Electronics', code: 'ECE101', program: 'B.Tech in Electronics', department: 'Electronics & Communication', year: 1, semester: 1, credits: 4, type: 'Core', status: 'active', regulation: 'R2023', regulationYear: '2023', ph: false, subjects: ['Circuits', 'Diodes'], createdAt: '2025-01-01', programId: 'prog3', departmentId: 'dept2', yearId: 'prog3year1', semesterId: 'prog3sem1' },
];


const PrincipalDashboard: React.FC<PrincipalDashboardProps> = ({
  principalId,
  instituteName
}) => {
  // State management
  const [activeTab, setActiveTab] = useState<PrincipalTabType>('overview');
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    // Initialize new filter fields
    yearId: undefined,
    semesterId: undefined
  });

  // Data states
  const [departments, setDepartments] = useState<Department[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  // Form states
  const [departmentForm, setDepartmentForm] = useState({
    name: '', code: '', head: '', isActive: true
  });

  const [programForm, setProgramForm] = useState({
    departmentId: '', name: '', code: '', totalSeats: 0, 
    seatQuotas: [] as SeatQuota[], duration: 4, 
    degreeLevel: 'Undergraduate' as const, accreditation: '', 
    academicYears: [] as ProgramAcademicYear[], isActive: true
  });

  const [courseForm, setCourseForm] = useState({
    semesterId: '', departmentId: '', programId: '', yearId: '', name: '', 
    code: '', credits: 0, type: 'Core' as const, isActive: true,
    regulation: '', // <-- ADDED
    regulationYear: '', // <-- ADDED
  });

  const [stats, setStats] = useState({
    totalDepartments: 0,
    totalPrograms: 0,
    activeCourses: 0,
    totalYears: 0,
    totalSemesters: 0
  });

  // --- Utility functions ---
  
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const generateId = useCallback(() => Date.now().toString() + Math.random().toString(36).substr(2, 9), []);

  const getDepartmentName = (id: string) => departments.find(d => d.id === id)?.name || 'Unknown';
  const getProgramName = (id: string) => programs.find(p => p.id === id)?.name || 'Unknown';
  const getYearName = (id: string) => academicYears.find(y => y.id === id)?.name || 'Unknown';
  const getSemesterName = (id: string) => semesters.find(s => s.id === id)?.name || 'Unknown';

  const generateAcademicYearsBasedOnDuration = useCallback((duration: number): ProgramAcademicYear[] => {
    const years: ProgramAcademicYear[] = [];
    const currentYear = new Date().getFullYear();
    for (let i = 1; i <= duration; i++) {
      const yearId = `prog${i}year${i}`; // Ensure unique ID generation
      years.push({
        id: yearId,
        name: `Year ${i}`,
        yearNumber: i,
        startDate: new Date(currentYear, 6, 1).toISOString().split('T')[0],
        endDate: new Date(currentYear + 1, 5, 30).toISOString().split('T')[0],
        semesters: [
          {
            id: `${yearId}sem${(i - 1) * 2 + 1}`,
            name: `Semester ${(i - 1) * 2 + 1}`,
            number: (i - 1) * 2 + 1,
            startDate: new Date(currentYear, 6, 1).toISOString().split('T')[0],
            endDate: new Date(currentYear, 10, 30).toISOString().split('T')[0]
          },
          {
            id: `${yearId}sem${(i - 1) * 2 + 2}`,
            name: `Semester ${(i - 1) * 2 + 2}`,
            number: (i - 1) * 2 + 2,
            startDate: new Date(currentYear + 1, 0, 1).toISOString().split('T')[0],
            endDate: new Date(currentYear + 1, 4, 31).toISOString().split('T')[0]
          }
        ]
      });
    }
    return years;
  }, [generateId]);

  const addAcademicYear = () => {
    const yearNumber = programForm.academicYears.length + 1;
    const currentYear = new Date().getFullYear();
    const newYearId = generateId(); // Use generic ID generation here

    const newYear: ProgramAcademicYear = {
      id: newYearId,
      name: `Year ${yearNumber}`,
      yearNumber: yearNumber,
      startDate: new Date(currentYear, 6, 1).toISOString().split('T')[0],
      endDate: new Date(currentYear + 1, 5, 30).toISOString().split('T')[0],
      semesters: [
        {
          id: generateId(),
          name: `Semester ${(yearNumber - 1) * 2 + 1}`,
          number: (yearNumber - 1) * 2 + 1,
          startDate: new Date(currentYear, 6, 1).toISOString().split('T')[0],
          endDate: new Date(currentYear, 10, 30).toISOString().split('T')[0]
        },
        {
          id: generateId(),
          name: `Semester ${(yearNumber - 1) * 2 + 2}`,
          number: (yearNumber - 1) * 2 + 2,
          startDate: new Date(currentYear + 1, 0, 1).toISOString().split('T')[0],
          endDate: new Date(currentYear + 1, 4, 31).toISOString().split('T')[0]
        }
      ]
    };
    setProgramForm({ ...programForm, academicYears: [...programForm.academicYears, newYear], duration: yearNumber });
  };

  const removeAcademicYear = (index: number) => {
    const updatedYears = programForm.academicYears.filter((_, i) => i !== index);
    // Renumber remaining years and semesters
    const renumberedYears = updatedYears.map((year, i) => ({
      ...year,
      yearNumber: i + 1,
      name: `Year ${i + 1}`,
      semesters: year.semesters.map((sem, semIndex) => ({
        ...sem,
        name: `Semester ${i * 2 + semIndex + 1}`,
        number: i * 2 + semIndex + 1
      }))
    }));
    setProgramForm({ ...programForm, academicYears: renumberedYears, duration: renumberedYears.length });
  };

  const updateAcademicYear = (index: number, field: keyof ProgramAcademicYear, value: any) => {
    const updatedYears = [...programForm.academicYears];
    updatedYears[index] = { ...updatedYears[index], [field]: value };
    setProgramForm({ ...programForm, academicYears: updatedYears });
  };

  const updateSemester = (yearIndex: number, semesterIndex: number, field: keyof ProgramSemester, value: any) => {
    const updatedYears = [...programForm.academicYears];
    updatedYears[yearIndex].semesters[semesterIndex] = { 
      ...updatedYears[yearIndex].semesters[semesterIndex], 
      [field]: value 
    };
    setProgramForm({ ...programForm, academicYears: updatedYears });
  };

  // Seat quota management
  const addSeatQuota = () => {
    const newQuota: SeatQuota = { id: generateId(), type: '', seats: 0 };
    setProgramForm({ ...programForm, seatQuotas: [...programForm.seatQuotas, newQuota] });
  };

  const updateSeatQuota = (index: number, field: keyof SeatQuota, value: string | number) => {
    const updatedQuotas = [...programForm.seatQuotas];
    updatedQuotas[index] = { ...updatedQuotas[index], [field]: value };
    setProgramForm({ ...programForm, seatQuotas: updatedQuotas });
  };

  const removeSeatQuota = (index: number) => {
    const updatedQuotas = programForm.seatQuotas.filter((_, i) => i !== index);
    setProgramForm({ ...programForm, seatQuotas: updatedQuotas });
  };

  // --- Data Loading and Initialization ---
  
  const loadSampleData = useCallback(() => {
    const currentDate = new Date().toISOString();

    const sampleDepartments: Department[] = [
      { id: 'dept1', name: 'Computer Science & Engineering', code: 'CSE', head: 'Dr. John Smith', isActive: true, createdAt: currentDate },
      { id: 'dept2', name: 'Electronics & Communication', code: 'ECE', head: 'Dr. Sarah Johnson', isActive: true, createdAt: currentDate },
      { id: 'dept3', name: 'Mechanical Engineering', code: 'MECH', head: 'Dr. Robert Wilson', isActive: true, createdAt: currentDate }
    ];

    // These calls use the updated generateAcademicYearsBasedOnDuration to ensure consistent IDs
    const prog1Years = generateAcademicYearsBasedOnDuration(4);
    const prog2Years = generateAcademicYearsBasedOnDuration(2);
    const prog3Years = generateAcademicYearsBasedOnDuration(4);
    
    // Convert ProgramAcademicYear (form structure) to AcademicYear (data structure)
    const convertToAcademicYear = (pYears: ProgramAcademicYear[], progId: string) => pYears.map((year, i) => ({
      ...year,
      id: progId + 'year' + (i + 1), // Standardize IDs for lookups: prog1year1, prog1year2, etc.
      programId: progId,
      isActive: true,
      createdAt: currentDate,
      semesters: year.semesters.map((sem, j) => ({
        ...sem,
        id: progId + 'sem' + ((i * 2) + j + 1), // Standardize semester IDs: prog1sem1, prog1sem2, etc.
        yearId: progId + 'year' + (i + 1),
        isActive: true,
        createdAt: currentDate
      }))
    }));
    
    const actualProg1Years = convertToAcademicYear(prog1Years, 'prog1');
    const actualProg2Years = convertToAcademicYear(prog2Years, 'prog2');
    const actualProg3Years = convertToAcademicYear(prog3Years, 'prog3');

    // Update mockCourses with correct, standardized IDs based on the above logic
    const updatedMockCourses = mockCourses.map(course => {
        if (course.programId === 'prog1') {
            return {
                ...course,
                yearId: `prog1year${course.year}`,
                semesterId: `prog1sem${course.semester}`
            };
        }
        if (course.programId === 'prog3') {
            return {
                ...course,
                yearId: `prog3year${course.year}`,
                semesterId: `prog3sem${course.semester}`
            };
        }
        return course;
    });

    const samplePrograms: Program[] = [
      {
        id: 'prog1', departmentId: 'dept1', name: 'B.Tech in Computer Science', code: 'B.TECH CSE',
        totalSeats: 120, seatQuotas: [
          { id: 'sq1', type: 'Merit', seats: 60 }, { id: 'sq2', type: 'Management', seats: 40 },
        ], duration: 4, degreeLevel: 'Undergraduate', accreditation: 'NBA Accredited',
        years: actualProg1Years, isActive: true, createdAt: currentDate
      },
      {
        id: 'prog2', departmentId: 'dept1', name: 'M.Tech in Computer Science', code: 'M.TECH CSE',
        totalSeats: 40, seatQuotas: [
          { id: 'sq5', type: 'Merit', seats: 30 }, { id: 'sq6', type: 'Management', seats: 10 }
        ], duration: 2, degreeLevel: 'Postgraduate', accreditation: 'AICTE Approved',
        years: actualProg2Years, isActive: true, createdAt: currentDate
      },
      {
        id: 'prog3', departmentId: 'dept2', name: 'B.Tech in Electronics', code: 'B.TECH ECE',
        totalSeats: 100, seatQuotas: [
          { id: 'sq7', type: 'Merit', seats: 50 }, { id: 'sq8', type: 'Management', seats: 35 },
        ], duration: 4, degreeLevel: 'Undergraduate', accreditation: 'NBA Accredited',
        years: actualProg3Years, isActive: true, createdAt: currentDate
      }
    ];

    const allYears = [...actualProg1Years, ...actualProg2Years, ...actualProg3Years];
    const allSemesters = allYears.flatMap(year => year.semesters);
    
    // Set all data
    setDepartments(sampleDepartments);
    setPrograms(samplePrograms);
    setAcademicYears(allYears);
    setSemesters(allSemesters);
    setCourses(updatedMockCourses);

    // Update stats
    setStats({
      totalDepartments: sampleDepartments.length,
      totalPrograms: samplePrograms.length,
      activeCourses: updatedMockCourses.filter(c => c.status === 'active').length,
      totalYears: allYears.length,
      totalSemesters: allSemesters.length
    });
  }, [generateAcademicYearsBasedOnDuration, generateId]);

  useEffect(() => {
    loadSampleData();
  }, [loadSampleData]);

  // --- CRUD Operations (Abbreviated for brevity, focusing on the filter feature) ---
  const handleDepartmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setDepartments(prev => prev.map(dept => 
        dept.id === editingId 
          ? { ...departmentForm, id: editingId, createdAt: prev.find(d => d.id === editingId)?.createdAt || new Date().toISOString() }
          : dept
      ));
      showToast('Department updated successfully', 'success');
    } else {
      const newDept: Department = { ...departmentForm, id: generateId(), createdAt: new Date().toISOString() };
      setDepartments(prev => [...prev, newDept]);
      showToast('Department added successfully', 'success');
      setStats(prev => ({ ...prev, totalDepartments: prev.totalDepartments + 1 }));
    }

    setDepartmentForm({ name: '', code: '', head: '', isActive: true });
    setEditingId(null);
    setShowModal(false);
  };

  const handleProgramSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentProgramId = editingId || generateId();

    const actualAcademicYears: AcademicYear[] = programForm.academicYears.map(year => ({
      id: year.id,
      programId: currentProgramId,
      name: year.name,
      yearNumber: year.yearNumber,
      startDate: year.startDate,
      endDate: year.endDate,
      semesters: year.semesters.map(sem => ({
        id: sem.id,
        yearId: year.id,
        name: sem.name,
        number: sem.number,
        startDate: sem.startDate,
        endDate: sem.endDate,
        isActive: true,
        createdAt: new Date().toISOString()
      })),
      isActive: true,
      createdAt: new Date().toISOString()
    }));
    
    const allSemesters = actualAcademicYears.flatMap(year => year.semesters);
    
    if (editingId) {
      setPrograms(prev => prev.map(prog => 
        prog.id === editingId 
          ? { 
              ...programForm, 
              id: editingId, 
              years: actualAcademicYears,
              createdAt: prog.createdAt
            }
          : prog
      ));
      
      setAcademicYears(prev => [
        ...prev.filter(y => y.programId !== editingId),
        ...actualAcademicYears
      ]);
      
      // Update semesters in a more robust way: remove all semesters associated with the old program, then add the new ones
      const semestersToRemove = academicYears.filter(y => y.programId === editingId).flatMap(y => y.semesters.map(s => s.id));
      setSemesters(prev => [
        ...prev.filter(s => !semestersToRemove.includes(s.id)),
        ...allSemesters
      ]);
      
      showToast('Program updated successfully', 'success');
    } else {
      const newProgram: Program = { 
        ...programForm, 
        id: currentProgramId, 
        years: actualAcademicYears,
        createdAt: new Date().toISOString() 
      };
      
      setPrograms(prev => [...prev, newProgram]);
      setAcademicYears(prev => [...prev, ...newProgram.years]);
      setSemesters(prev => [...prev, ...allSemesters]);
      
      showToast('Program added successfully', 'success');
      setStats(prev => ({ ...prev, totalPrograms: prev.totalPrograms + 1 }));
    }

    // Reset form
    setProgramForm({ 
      departmentId: '', name: '', code: '', totalSeats: 0, seatQuotas: [], 
      duration: 4, degreeLevel: 'Undergraduate', accreditation: '', 
      academicYears: [], isActive: true 
    });
    setEditingId(null);
    setShowModal(false);
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedProgram = programs.find(p => p.id === courseForm.programId);
    const selectedDepartment = departments.find(d => d.id === courseForm.departmentId);
    const selectedYear = academicYears.find(y => y.id === courseForm.yearId);
    const selectedSemester = semesters.find(s => s.id === courseForm.semesterId);

    if (!selectedProgram || !selectedDepartment || !selectedYear || !selectedSemester) {
        showToast('Please select a valid Program, Year, and Semester.', 'error');
        return;
    }
    
    const baseCourse = {
        name: courseForm.name,
        code: courseForm.code,
        credits: courseForm.credits,
        type: courseForm.type,
        status: courseForm.isActive ? 'active' : 'inactive',
        program: selectedProgram.name,
        department: selectedDepartment.name,
        year: selectedYear.yearNumber,
        semester: selectedSemester.number,
        regulation: courseForm.regulation, // <-- USING FORM DATA
        regulationYear: courseForm.regulationYear, // <-- USING FORM DATA
        ph: false, 
        subjects: ['Details'], 
        createdAt: new Date().toISOString(),
        programId: selectedProgram.id,
        departmentId: selectedDepartment.id,
        yearId: selectedYear.id,
        semesterId: selectedSemester.id
    };

    if (editingId) {
      setCourses(prev => prev.map(course => 
        course.id === editingId 
          ? { ...course, ...baseCourse, id: editingId }
          : course
      ));
      showToast('Course updated successfully', 'success');
    } else {
      const newCourse: Course = { ...baseCourse, id: generateId() };
      setCourses(prev => [...prev, newCourse]);
      showToast('Course added successfully', 'success');
      setStats(prev => ({ ...prev, activeCourses: prev.activeCourses + (newCourse.status === 'active' ? 1 : 0) }));
    }

    // Reset form
    setCourseForm({ semesterId: '', departmentId: '', programId: '', yearId: '', name: '', code: '', credits: 0, type: 'Core', isActive: true, regulation: '', regulationYear: '' });
    setEditingId(null);
    setShowModal(false);
  };


  // Edit functions (Abbreviated for brevity, focusing on the filter feature)
  const editDepartment = (dept: Department) => {
    setDepartmentForm({ name: dept.name, code: dept.code, head: dept.head, isActive: dept.isActive });
    setEditingId(dept.id);
    setShowModal(true);
  };

  const editProgram = (prog: Program) => {
    const formYears: ProgramAcademicYear[] = prog.years.map(year => ({
      id: year.id,
      name: year.name,
      yearNumber: year.yearNumber,
      startDate: year.startDate,
      endDate: year.endDate,
      semesters: year.semesters.map(sem => ({
        id: sem.id,
        name: sem.name,
        number: sem.number,
        startDate: sem.startDate,
        endDate: sem.endDate
      }))
    }));

    setProgramForm({
      departmentId: prog.departmentId, name: prog.name, code: prog.code, totalSeats: prog.totalSeats,
      seatQuotas: prog.seatQuotas, duration: prog.duration, degreeLevel: prog.degreeLevel,
      accreditation: prog.accreditation, academicYears: formYears, isActive: prog.isActive
    });
    setEditingId(prog.id);
    setShowModal(true);
  };

  const editCourse = (course: Course) => {
    setCourseForm({
      semesterId: course.semesterId || '', 
      departmentId: course.departmentId || '', 
      programId: course.programId || '',
      yearId: course.yearId || '', 
      name: course.name, 
      code: course.code, 
      credits: course.credits,
      type: course.type as 'Core' | 'Elective' | 'Lab', 
      isActive: course.status === 'active',
      regulation: course.regulation, // <-- LOADED
      regulationYear: course.regulationYear // <-- LOADED
    });
    setEditingId(course.id);
    setShowModal(true);
  };
  
  // Delete functions (using mock window.confirm replacement)
  const handleDelete = (id: string, type: 'department' | 'program' | 'course') => {
    // In a real app, this would be a custom confirmation modal, not window.confirm
    if (window.confirm(`Are you sure you want to delete this ${type}? This action cannot be undone.`)) {
      switch (type) {
        case 'department':
          setDepartments(prev => prev.filter(dept => dept.id !== id));
          setStats(prev => ({ ...prev, totalDepartments: prev.totalDepartments - 1 }));
          break;
        case 'program':
          setPrograms(prev => prev.filter(prog => prog.id !== id));
          setAcademicYears(prev => prev.filter(year => year.programId !== id));
          setSemesters(prev => prev.filter(sem => !academicYears.some(y => y.programId === id && y.id === sem.yearId)));
          setStats(prev => ({ ...prev, totalPrograms: prev.totalPrograms - 1 }));
          break;
        case 'course':
          setCourses(prev => prev.filter(course => course.id !== id));
          setStats(prev => ({ ...prev, activeCourses: prev.activeCourses - (courses.find(c => c.id === id)?.status === 'active' ? 1 : 0) }));
          break;
      }
      showToast(`${type} deleted successfully`, 'success');
    }
  };

  // --- Derived state for Course Filters Dropdowns ---
  const yearsForFilter = useMemo(() => {
    if (activeTab !== 'courses') return [];
    // Filter years by the currently selected program, if available
    return filters.program
      ? academicYears.filter(y => y.programId === filters.program)
      : academicYears;
  }, [academicYears, filters.program, activeTab]);

  const semestersForFilter = useMemo(() => {
    if (activeTab !== 'courses' || !filters.yearId) return [];
    // Filter semesters by the currently selected year
    return semesters.filter(s => s.yearId === filters.yearId);
  }, [semesters, filters.yearId, activeTab]);

  // Filtering logic
  const applyFilters = (data: any[]) => {
    return data.filter(item => {
      const matchesSearch = item.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
                           item.code?.toLowerCase().includes(filters.search.toLowerCase()) ||
                           (activeTab === 'departments' && item.head?.toLowerCase().includes(filters.search.toLowerCase()));
      
      const matchesStatus = filters.status === 'all' || 
                           (filters.status === 'active' && (item.isActive || item.status === 'active')) ||
                           (filters.status === 'inactive' && (!item.isActive || item.status === 'inactive'));

      const itemDeptId = item.departmentId || departments.find(d => d.name === item.department)?.id;
      const matchesDepartment = !filters.department || itemDeptId === filters.department;

      const matchesProgram = !filters.program || item.programId === filters.program;
      const matchesDegreeLevel = !filters.degreeLevel || item.degreeLevel === filters.degreeLevel;
      
      // NEW COURSE FILTERS
      const matchesYear = activeTab !== 'courses' || !filters.yearId || item.yearId === filters.yearId;
      const matchesSemester = activeTab !== 'courses' || !filters.semesterId || item.semesterId === filters.semesterId;


      return matchesSearch && matchesStatus && matchesDepartment && matchesProgram && matchesDegreeLevel && matchesYear && matchesSemester;
    });
  };

  const getFilteredData = () => {
    switch (activeTab) {
      case 'departments': return applyFilters(departments);
      case 'programs': return applyFilters(programs);
      case 'courses': return applyFilters(courses);
      default: return [];
    }
  };

  const resetFilters = () => {
    setFilters({ 
        search: '', 
        status: 'all', 
        department: undefined, 
        program: undefined, 
        degreeLevel: undefined,
        yearId: undefined, // Reset new filters
        semesterId: undefined // Reset new filters
    });
  };

  const principalTabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'departments', label: 'Departments', icon: BuildingOfficeIcon },
    { id: 'programs', label: 'Programs', icon: AcademicCapIcon },
    { id: 'courses', label: 'Courses', icon: BookOpenIcon }
  ];

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Institution Overview';
      case 'departments': return 'Department Management';
      case 'programs': return 'Program Management';
      case 'courses': return 'Course Management';
      default: return 'Dashboard';
    }
  };

  const getAddButtonText = () => {
    switch (activeTab) {
      case 'departments': return 'Add Department';
      case 'programs': return 'Add Program';
      case 'courses': return 'Add Course';
      default: return 'Add';
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    
    // Reset forms
    setDepartmentForm({ name: '', code: '', head: '', isActive: true });
    setProgramForm({ 
      departmentId: '', name: '', code: '', totalSeats: 0, seatQuotas: [], 
      duration: 4, degreeLevel: 'Undergraduate', accreditation: '', 
      academicYears: generateAcademicYearsBasedOnDuration(4), isActive: true 
    }); // Initialize years based on default duration
    setCourseForm({ semesterId: '', departmentId: '', programId: '', yearId: '', name: '', code: '', credits: 0, type: 'Core', isActive: true, regulation: '', regulationYear: '' }); // <-- RESET includes new fields
    
    setShowModal(true);
  };

  const filteredData = getFilteredData();
  
  // --- UI Components ---
  
  const OverviewTab = () => {
    const Card = ({ icon: Icon, title, value, colorClass }) => (
      <div className={`p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border-b-4 ${colorClass} transition duration-300 transform hover:scale-[1.02]`}>
        <div className="flex items-center space-x-4">
          <Icon className={`w-8 h-8 ${colorClass.replace('border-', 'text-')}`} />
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
          </div>
        </div>
      </div>
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card icon={BuildingOfficeIcon} title="Total Departments" value={stats.totalDepartments} colorClass="border-blue-500" />
        <Card icon={AcademicCapIcon} title="Total Programs" value={stats.totalPrograms} colorClass="border-emerald-500" />
        <Card icon={BookOpenIcon} title="Active Courses" value={stats.activeCourses} colorClass="border-amber-500" />
        <Card icon={CalendarDaysIcon} title="Academic Years Setup" value={stats.totalYears} colorClass="border-rose-500" />
      </div>
    );
  };

  const FiltersPanel = () => (
    <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
      <div className={`p-4 bg-slate-100 dark:bg-slate-800 rounded-lg grid grid-cols-1 md:grid-cols-${activeTab === 'courses' ? 4 : 3} gap-4 border border-slate-300 dark:border-slate-700`}>
        
        {/* Department Filter (Applicable to Programs/Courses) */}
        {(activeTab === 'programs' || activeTab === 'courses') && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Department</label>
            <select
              value={filters.department || ''}
              onChange={(e) => {
                // When department changes, reset program, year, and semester filters for courses
                if (activeTab === 'courses') {
                    setFilters({ ...filters, department: e.target.value, program: undefined, yearId: undefined, semesterId: undefined });
                } else {
                    setFilters({ ...filters, department: e.target.value });
                }
            }}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            >
              <option value="">All Departments</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Program Filter (Applicable to Courses) */}
        {activeTab === 'courses' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Program</label>
            <select
              value={filters.program || ''}
              onChange={(e) => {
                // When program changes, reset year and semester
                setFilters({ ...filters, program: e.target.value, yearId: undefined, semesterId: undefined })
            }}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            >
              <option value="">All Programs</option>
              {programs
                .filter(p => !filters.department || p.departmentId === filters.department)
                .map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Academic Year Filter (NEW - Applicable to Courses) */}
        {activeTab === 'courses' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Academic Year</label>
            <select
              value={filters.yearId || ''}
              onChange={(e) => {
                // When year changes, reset semester
                setFilters({ ...filters, yearId: e.target.value, semesterId: undefined })
            }}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            >
              <option value="">All Years</option>
              {yearsForFilter.map(y => (
                <option key={y.id} value={y.id}>{y.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Semester Filter (NEW - Applicable to Courses) */}
        {activeTab === 'courses' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Semester</label>
            <select
              value={filters.semesterId || ''}
              onChange={(e) => setFilters({ ...filters, semesterId: e.target.value })}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
             disabled={!filters.yearId}
            >
              <option value="">All Semesters</option>
              {semestersForFilter.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        )}


        {/* Degree Level Filter (Applicable to Programs) */}
        {activeTab === 'programs' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Degree Level</label>
            <select
              value={filters.degreeLevel || ''}
              onChange={(e) => setFilters({ ...filters, degreeLevel: e.target.value })}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            >
              <option value="">All Levels</option>
              {['Undergraduate', 'Postgraduate', 'Doctoral'].map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        )}

        {/* Status Filter (Always Applicable) */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value as 'all' | 'active' | 'inactive' })}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className={`${activeTab === 'courses' ? 'md:col-span-4' : 'md:col-span-3'} flex justify-end space-x-3 pt-2`}>
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 dark:bg-slate-600 dark:text-white dark:border-slate-500 dark:hover:bg-slate-500"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
  // ... (rest of the component UI methods like DepartmentTable, ProgramTable, etc., which are omitted for brevity but remain in the final file)

  const DepartmentTable = ({ data }: { data: Department[] }) => (
    <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Code</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Head</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {data.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{item.code}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{item.head}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100' : 'bg-rose-100 text-rose-800 dark:bg-rose-800 dark:text-rose-100'}`}>
                                {item.isActive ? 'Active' : 'Inactive'}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => editDepartment(item)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600 mr-3">
                                <PencilIcon className="w-5 h-5 inline" />
                            </button>
                            <button onClick={() => handleDelete(item.id, 'department')} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600">
                                <TrashIcon className="w-5 h-5 inline" />
                            </button>
                        </td>
                    </tr>
                ))}
                {data.length === 0 && (
                    <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-slate-500 dark:text-slate-400">No departments found.</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  );

  const ProgramTable = ({ data }: { data: Program[] }) => (
    <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Name (Code)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Department</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Level / Duration</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Seats / Quotas</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {data.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{item.name} <span className="text-xs text-slate-500 dark:text-slate-400">({item.code})</span></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{getDepartmentName(item.departmentId)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{item.degreeLevel} / {item.duration} yrs</td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                            Total: {item.totalSeats}
                            <span className="block text-xs text-slate-400 dark:text-slate-500">({item.seatQuotas.length} quotas)</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100' : 'bg-rose-100 text-rose-800 dark:bg-rose-800 dark:text-rose-100'}`}>
                                {item.isActive ? 'Active' : 'Inactive'}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => editProgram(item)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600 mr-3">
                                <PencilIcon className="w-5 h-5 inline" />
                            </button>
                            <button onClick={() => handleDelete(item.id, 'program')} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600">
                                <TrashIcon className="w-5 h-5 inline" />
                            </button>
                        </td>
                    </tr>
                ))}
                {data.length === 0 && (
                    <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-slate-500 dark:text-slate-400">No programs found matching the filters.</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  );

  const CourseTable = ({ data }: { data: Course[] }) => (
    <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Course (Code)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Program / Dept</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Year / Sem</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Credits / Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Regulation</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-300">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {data.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{item.name} <span className="text-xs text-slate-500 dark:text-slate-400">({item.code})</span></td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                            {item.program}
                            <span className="block text-xs text-slate-400 dark:text-slate-500">({item.department})</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                            {getYearName(item.yearId || '')}
                            <span className="block text-xs text-slate-400 dark:text-slate-500">({getSemesterName(item.semesterId || '')})</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{item.credits} / {item.type}</td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                            {item.regulation}
                            <span className="block text-xs text-slate-400 dark:text-slate-500">({item.regulationYear})</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100' : 'bg-rose-100 text-rose-800 dark:bg-rose-800 dark:text-rose-100'}`}>
                                {item.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => editCourse(item)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600 mr-3">
                                <PencilIcon className="w-5 h-5 inline" />
                            </button>
                            <button onClick={() => handleDelete(item.id, 'course')} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600">
                                <TrashIcon className="w-5 h-5 inline" />
                            </button>
                        </td>
                    </tr>
                ))}
                {data.length === 0 && (
                    <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-slate-500 dark:text-slate-400">No courses found matching the filters.</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  );

  // --- Modals (Department Form) ---
  const DepartmentFormModal = () => (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-75 z-50 flex justify-center items-center p-4" onClick={() => setShowModal(false)}>
      <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-lg shadow-2xl transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{editingId ? 'Edit Department' : 'Add New Department'}</h3>
          <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400"><XMarkIcon className="w-6 h-6" /></button>
        </div>
        <form onSubmit={handleDepartmentSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="deptName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
            <input
              type="text" id="deptName" required
              value={departmentForm.name}
              onChange={(e) => setDepartmentForm({ ...departmentForm, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="deptCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Code</label>
            <input
              type="text" id="deptCode" required
              value={departmentForm.code}
              onChange={(e) => setDepartmentForm({ ...departmentForm, code: e.target.value })}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="deptHead" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Head of Department</label>
            <input
              type="text" id="deptHead" required
              value={departmentForm.head}
              onChange={(e) => setDepartmentForm({ ...departmentForm, head: e.target.value })}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />
          </div>
          <div className="flex items-center">
            <input
              id="deptActive" type="checkbox"
              checked={departmentForm.isActive}
              onChange={(e) => setDepartmentForm({ ...departmentForm, isActive: e.target.checked })}
              className="h-4 w-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 dark:bg-slate-700 dark:border-slate-600"
            />
            <label htmlFor="deptActive" className="ml-2 block text-sm text-slate-900 dark:text-slate-300">Active</label>
          </div>
          <div className="pt-4 flex justify-end">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {editingId ? 'Save Changes' : 'Add Department'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Program Form Modal (Abbreviated for brevity)
  const ProgramFormModal = () => {
    // Helper component to render each year's setup
    const YearSetup = ({ year, yearIndex }: { year: ProgramAcademicYear, yearIndex: number }) => (
        <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg space-y-3 bg-slate-50 dark:bg-slate-700/50">
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-medium text-slate-800 dark:text-slate-100">{year.name}</h4>
                <button type="button" onClick={() => removeAcademicYear(yearIndex)} className="text-red-500 hover:text-red-700 disabled:opacity-50" disabled={programForm.academicYears.length <= 1}>
                    <MinusIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <label className="block">
                    <span className="text-sm text-slate-700 dark:text-slate-300">Start Date</span>
                    <input type="date" value={year.startDate} onChange={(e) => updateAcademicYear(yearIndex, 'startDate', e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                </label>
                <label className="block">
                    <span className="text-sm text-slate-700 dark:text-slate-300">End Date</span>
                    <input type="date" value={year.endDate} onChange={(e) => updateAcademicYear(yearIndex, 'endDate', e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                </label>
            </div>
            <h5 className="text-md font-medium text-slate-700 dark:text-slate-200 mt-4">Semesters:</h5>
            {year.semesters.map((sem, semIndex) => (
                <div key={sem.id} className="grid grid-cols-3 gap-3 pl-2 border-l border-slate-300 dark:border-slate-600">
                    <span className="col-span-3 text-sm font-semibold text-slate-600 dark:text-slate-300">{sem.name}</span>
                    <label className="block">
                        <span className="text-xs text-slate-600 dark:text-slate-400">Start Date</span>
                        <input type="date" value={sem.startDate} onChange={(e) => updateSemester(yearIndex, semIndex, 'startDate', e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                    </label>
                    <label className="block col-span-2">
                        <span className="text-xs text-slate-600 dark:text-slate-400">End Date</span>
                        <input type="date" value={sem.endDate} onChange={(e) => updateSemester(yearIndex, semIndex, 'endDate', e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                    </label>
                </div>
            ))}
        </div>
    );
    return (
      <div className="fixed inset-0 bg-slate-900 bg-opacity-75 z-50 flex justify-center items-center p-4" onClick={() => setShowModal(false)}>
        <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-4xl shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 bg-white dark:bg-slate-800 p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center z-10">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{editingId ? 'Edit Program' : 'Add New Program'}</h3>
            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400"><XMarkIcon className="w-6 h-6" /></button>
          </div>
          <form onSubmit={handleProgramSubmit} className="p-6 space-y-6">
            {/* Basic Program Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="progDept" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Department</label>
                <select id="progDept" required value={programForm.departmentId} onChange={(e) => setProgramForm({ ...programForm, departmentId: e.target.value })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <option value="">Select Department</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="progName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Program Name</label>
                <input type="text" id="progName" required value={programForm.name} onChange={(e) => setProgramForm({ ...programForm, name: e.target.value })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
              </div>
              <div>
                <label htmlFor="progCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Code (e.g., B.TECH CSE)</label>
                <input type="text" id="progCode" required value={programForm.code} onChange={(e) => setProgramForm({ ...programForm, code: e.target.value })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
              </div>
              <div>
                <label htmlFor="progLevel" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Degree Level</label>
                <select id="progLevel" required value={programForm.degreeLevel} onChange={(e) => setProgramForm({ ...programForm, degreeLevel: e.target.value as 'Undergraduate' | 'Postgraduate' | 'Doctoral' })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Doctoral">Doctoral</option>
                </select>
              </div>
              <div>
                <label htmlFor="progAccreditation" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Accreditation</label>
                <input type="text" id="progAccreditation" required value={programForm.accreditation} onChange={(e) => setProgramForm({ ...programForm, accreditation: e.target.value })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
              </div>
              <div className="flex items-center">
                <input id="progActive" type="checkbox" checked={programForm.isActive} onChange={(e) => setProgramForm({ ...programForm, isActive: e.target.checked })} className="h-4 w-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 dark:bg-slate-700 dark:border-slate-600" />
                <label htmlFor="progActive" className="ml-2 block text-sm text-slate-900 dark:text-slate-300">Active Program</label>
              </div>
            </div>

            {/* Seats & Quotas */}
            <h4 className="text-lg font-semibold border-b pb-2 text-slate-800 dark:text-slate-100 dark:border-slate-700">Admission Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="totalSeats" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Total Seats</label>
                <input type="number" id="totalSeats" required value={programForm.totalSeats} onChange={(e) => setProgramForm({ ...programForm, totalSeats: parseInt(e.target.value) })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
              </div>
            </div>

            {/* Academic Year Setup */}
            <h4 className="text-lg font-semibold border-b pb-2 text-slate-800 dark:text-slate-100 dark:border-slate-700">Academic Structure ({programForm.duration} Years / {programForm.academicYears.length * 2} Semesters)</h4>
            <div className="space-y-4">
              {programForm.academicYears.map((year, index) => (
                <YearSetup key={year.id} year={year} yearIndex={index} />
              ))}
            </div>
            <button type="button" onClick={addAcademicYear} className="flex items-center justify-center w-full py-2 border border-blue-200 text-blue-600 rounded-md bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700 dark:hover:bg-blue-800">
                <PlusIcon className="w-5 h-5 mr-1" /> Add Another Year
            </button>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {editingId ? 'Save Program Changes' : 'Create Program'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Course Form Modal (Abbreviated for brevity)
  const CourseFormModal = () => {
    // Determine available years and semesters based on selected program/year
    const availableYears = courseForm.programId ? academicYears.filter(y => y.programId === courseForm.programId) : [];
    const availableSemesters = courseForm.yearId ? semesters.filter(s => s.yearId === courseForm.yearId) : [];
    
    // Handler to reset year and semester when program/dept changes
    const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newProgramId = e.target.value;
        const selectedProgram = programs.find(p => p.id === newProgramId);
        
        setCourseForm(prev => ({ 
            ...prev, 
            programId: newProgramId, 
            departmentId: selectedProgram?.departmentId || '', // Auto-set department
            yearId: '', 
            semesterId: '' 
        }));
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCourseForm(prev => ({ 
            ...prev, 
            yearId: e.target.value, 
            semesterId: '' // Reset semester when year changes
        }));
    };

    return (
      <div className="fixed inset-0 bg-slate-900 bg-opacity-75 z-50 flex justify-center items-center p-4" onClick={() => setShowModal(false)}>
        <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-2xl shadow-2xl transform transition-all" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{editingId ? 'Edit Course' : 'Add New Course'}</h3>
            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400"><XMarkIcon className="w-6 h-6" /></button>
          </div>
          <form onSubmit={handleCourseSubmit} className="p-6 space-y-4">
            {/* Course Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="courseProgram" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Program</label>
                <select id="courseProgram" required value={courseForm.programId} onChange={handleProgramChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <option value="">Select Program</option>
                  {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="courseDept" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Department (Auto-filled)</label>
                <input type="text" id="courseDept" disabled value={getDepartmentName(courseForm.departmentId)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 bg-slate-100 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-400" />
              </div>
            </div>

            {/* Year & Semester */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="courseYear" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Academic Year</label>
                <select id="courseYear" required value={courseForm.yearId} onChange={handleYearChange} disabled={!courseForm.programId} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white disabled:bg-slate-50 disabled:dark:bg-slate-700/50">
                  <option value="">Select Year</option>
                  {availableYears.map(y => <option key={y.id} value={y.id}>{y.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="courseSemester" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Semester</label>
                <select id="courseSemester" required value={courseForm.semesterId} onChange={(e) => setCourseForm({ ...courseForm, semesterId: e.target.value })} disabled={!courseForm.yearId} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white disabled:bg-slate-50 disabled:dark:bg-slate-700/50">
                  <option value="">Select Semester</option>
                  {availableSemesters.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>

            {/* Name & Code */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="courseName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Course Name</label>
                <input type="text" id="courseName" required value={courseForm.name} onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
              </div>
              <div>
                <label htmlFor="courseCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Course Code</label>
                <input type="text" id="courseCode" required value={courseForm.code} onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
              </div>
            </div>

            {/* Credits, Type, Regulation */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="courseCredits" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Credits</label>
                <input type="number" id="courseCredits" required value={courseForm.credits} onChange={(e) => setCourseForm({ ...courseForm, credits: parseInt(e.target.value) })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
              </div>
              <div>
                <label htmlFor="courseType" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Type</label>
                <select id="courseType" required value={courseForm.type} onChange={(e) => setCourseForm({ ...courseForm, type: e.target.value as 'Core' | 'Elective' | 'Lab' })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <option value="Core">Core</option>
                  <option value="Elective">Elective</option>
                  <option value="Lab">Lab</option>
                </select>
              </div>
              <div>
                <label htmlFor="courseRegulation" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Regulation Name (e.g., R2023)</label>
                <input type="text" id="courseRegulation" required value={courseForm.regulation} onChange={(e) => setCourseForm({ ...courseForm, regulation: e.target.value })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
              </div>
            </div>
            
            {/* Regulation Year & Status */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label htmlFor="courseRegulationYear" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Regulation Year (e.g., 2023)</label>
                <input type="text" id="courseRegulationYear" required value={courseForm.regulationYear} onChange={(e) => setCourseForm({ ...courseForm, regulationYear: e.target.value })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
              </div>
              <div className="flex items-center pt-5">
                <input id="courseActive" type="checkbox" checked={courseForm.isActive} onChange={(e) => setCourseForm({ ...courseForm, isActive: e.target.checked })} className="h-4 w-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 dark:bg-slate-700 dark:border-slate-600" />
                <label htmlFor="courseActive" className="ml-2 block text-sm text-slate-900 dark:text-slate-300">Active Course</label>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {editingId ? 'Save Course Changes' : 'Add Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white p-4 sm:p-6 font-sans">
      <header className="pb-6 border-b border-slate-200 dark:border-slate-700 mb-6">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">{instituteName}</h1>
        <p className="text-xl dark:text-slate-300">{getTabTitle()}</p>
      </header>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 sm:space-x-3 border-b border-slate-300 dark:border-slate-700 mb-6 overflow-x-auto">
        {principalTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id as PrincipalTabType); resetFilters(); setShowFilters(false); }}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 
              ${activeTab === tab.id
                ? 'text-blue-600 border-b-4 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'overview' && <OverviewTab />}

      {activeTab !== 'overview' && (
        <div className="space-y-6">
          {/* Control Panel (Search, Filter, Add) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {/* Search and Filter Toggle */}
            <div className="flex w-full md:w-auto space-x-3">
              <div className="relative flex-grow">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full md:w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center p-2 rounded-lg transition duration-150 ${showFilters ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'}`}
                title="Toggle Filters"
              >
                <FunnelIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={openAddModal}
              className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <PlusIcon className="w-5 h-5 mr-1" /> {getAddButtonText()}
            </button>
          </div>

          {/* Filters Panel */}
          <FiltersPanel />

          {/* Data Table */}
          {activeTab === 'departments' && <DepartmentTable data={filteredData as Department[]} />}
          {activeTab === 'programs' && <ProgramTable data={filteredData as Program[]} />}
          {activeTab === 'courses' && <CourseTable data={filteredData as Course[]} />}
        </div>
      )}

      {/* Modals */}
      {showModal && activeTab === 'departments' && <DepartmentFormModal />}
      {showModal && activeTab === 'programs' && <ProgramFormModal />}
      {showModal && activeTab === 'courses' && <CourseFormModal />}

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-xl text-white transition-opacity duration-300 ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default PrincipalDashboard;