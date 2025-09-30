// PrincipalDashboard.tsx - Enhanced Version with Academic Years & Semesters in Program Form
import React, { useState, useEffect } from 'react';
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
  MinusIcon
} from '@heroicons/react/24/outline';

// All interfaces
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
  semesterId: string;
  departmentId: string;
  programId: string;
  yearId: string;
  name: string;
  code: string;
  credits: number;
  type: 'Core' | 'Elective' | 'Lab';
  isActive: boolean;
  createdAt: string;
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
}

// Enhanced form interfaces for academic years and semesters
interface ProgramAcademicYear {
  id: string;
  name: string;
  yearNumber: number;
  startDate: string;
  endDate: string;
  semesters: ProgramSemester[];
}

interface ProgramSemester {
  id: string;
  name: string;
  number: number;
  startDate: string;
  endDate: string;
}

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
    status: 'all'
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
    code: '', credits: 0, type: 'Core' as const, isActive: true
  });

  const [stats, setStats] = useState({
    totalDepartments: 0,
    totalPrograms: 0,
    activeCourses: 0,
    totalYears: 0,
    totalSemesters: 0
  });

  useEffect(() => {
    loadSampleData();
  }, []);

  const loadSampleData = () => {
    const currentDate = new Date().toISOString();

    // Sample Departments
    const sampleDepartments: Department[] = [
      { id: 'dept1', name: 'Computer Science & Engineering', code: 'CSE', head: 'Dr. John Smith', isActive: true, createdAt: currentDate },
      { id: 'dept2', name: 'Electronics & Communication', code: 'ECE', head: 'Dr. Sarah Johnson', isActive: true, createdAt: currentDate },
      { id: 'dept3', name: 'Mechanical Engineering', code: 'MECH', head: 'Dr. Robert Wilson', isActive: true, createdAt: currentDate }
    ];

    // Sample Programs with enhanced academic structure
    const samplePrograms: Program[] = [
      {
        id: 'prog1', departmentId: 'dept1', name: 'Bachelor of Technology in Computer Science', code: 'B.TECH CSE',
        totalSeats: 120, seatQuotas: [
          { id: 'sq1', type: 'Merit', seats: 60 }, { id: 'sq2', type: 'Management', seats: 40 },
          { id: 'sq3', type: 'Sports', seats: 10 }, { id: 'sq4', type: 'NRI', seats: 10 }
        ], duration: 4, degreeLevel: 'Undergraduate', accreditation: 'NBA Accredited',
        years: [], isActive: true, createdAt: currentDate
      },
      {
        id: 'prog2', departmentId: 'dept1', name: 'Master of Technology in Computer Science', code: 'M.TECH CSE',
        totalSeats: 40, seatQuotas: [
          { id: 'sq5', type: 'Merit', seats: 30 }, { id: 'sq6', type: 'Management', seats: 10 }
        ], duration: 2, degreeLevel: 'Postgraduate', accreditation: 'AICTE Approved',
        years: [], isActive: true, createdAt: currentDate
      },
      {
        id: 'prog3', departmentId: 'dept2', name: 'Bachelor of Technology in Electronics', code: 'B.TECH ECE',
        totalSeats: 100, seatQuotas: [
          { id: 'sq7', type: 'Merit', seats: 50 }, { id: 'sq8', type: 'Management', seats: 35 },
          { id: 'sq9', type: 'Sports', seats: 8 }, { id: 'sq10', type: 'NRI', seats: 7 }
        ], duration: 4, degreeLevel: 'Undergraduate', accreditation: 'NBA Accredited',
        years: [], isActive: true, createdAt: currentDate
      }
    ];

    // Enhanced sample academic years and semesters
    const sampleYears: AcademicYear[] = [
      { id: 'year1', programId: 'prog1', name: 'First Year', yearNumber: 1, startDate: '2024-07-01', endDate: '2025-06-30', semesters: [], isActive: true, createdAt: currentDate },
      { id: 'year2', programId: 'prog1', name: 'Second Year', yearNumber: 2, startDate: '2024-07-01', endDate: '2025-06-30', semesters: [], isActive: true, createdAt: currentDate },
      { id: 'year3', programId: 'prog1', name: 'Third Year', yearNumber: 3, startDate: '2024-07-01', endDate: '2025-06-30', semesters: [], isActive: true, createdAt: currentDate },
      { id: 'year4', programId: 'prog1', name: 'Fourth Year', yearNumber: 4, startDate: '2024-07-01', endDate: '2025-06-30', semesters: [], isActive: true, createdAt: currentDate },
      { id: 'year5', programId: 'prog2', name: 'First Year', yearNumber: 1, startDate: '2024-07-01', endDate: '2025-06-30', semesters: [], isActive: true, createdAt: currentDate },
      { id: 'year6', programId: 'prog2', name: 'Second Year', yearNumber: 2, startDate: '2024-07-01', endDate: '2025-06-30', semesters: [], isActive: true, createdAt: currentDate }
    ];

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
      { id: 'sem10', yearId: 'year5', name: 'Second Semester', number: 2, startDate: '2025-01-01', endDate: '2025-05-31', isActive: true, createdAt: currentDate },
      { id: 'sem11', yearId: 'year6', name: 'Third Semester', number: 3, startDate: '2024-07-01', endDate: '2024-11-30', isActive: true, createdAt: currentDate },
      { id: 'sem12', yearId: 'year6', name: 'Fourth Semester', number: 4, startDate: '2025-01-01', endDate: '2025-05-31', isActive: true, createdAt: currentDate }
    ];

    const sampleCourses: Course[] = [
      { id: 'course1', semesterId: 'sem1', departmentId: 'dept1', programId: 'prog1', yearId: 'year1', name: 'Programming Fundamentals', code: 'CS101', credits: 4, type: 'Core', isActive: true, createdAt: currentDate },
      { id: 'course2', semesterId: 'sem1', departmentId: 'dept1', programId: 'prog1', yearId: 'year1', name: 'Mathematics for Computer Science', code: 'MATH101', credits: 3, type: 'Core', isActive: true, createdAt: currentDate },
      { id: 'course3', semesterId: 'sem2', departmentId: 'dept1', programId: 'prog1', yearId: 'year1', name: 'Data Structures & Algorithms', code: 'CS102', credits: 4, type: 'Core', isActive: true, createdAt: currentDate },
      { id: 'course4', semesterId: 'sem3', departmentId: 'dept1', programId: 'prog1', yearId: 'year2', name: 'Database Management Systems', code: 'CS201', credits: 3, type: 'Core', isActive: true, createdAt: currentDate },
      { id: 'course5', semesterId: 'sem9', departmentId: 'dept1', programId: 'prog2', yearId: 'year5', name: 'Advanced Algorithms', code: 'CS501', credits: 4, type: 'Core', isActive: true, createdAt: currentDate }
    ];

    // Update programs with years
    samplePrograms[0].years = sampleYears.filter(y => y.programId === 'prog1');
    samplePrograms[1].years = sampleYears.filter(y => y.programId === 'prog2');
    samplePrograms[2].years = sampleYears.filter(y => y.programId === 'prog3');

    // Update years with semesters
    sampleYears.forEach(year => {
      year.semesters = sampleSemesters.filter(s => s.yearId === year.id);
    });

    // Set all data
    setDepartments(sampleDepartments);
    setPrograms(samplePrograms);
    setAcademicYears(sampleYears);
    setSemesters(sampleSemesters);
    setCourses(sampleCourses);

    // Update stats
    setStats({
      totalDepartments: sampleDepartments.length,
      totalPrograms: samplePrograms.length,
      activeCourses: sampleCourses.filter(c => c.isActive).length,
      totalYears: sampleYears.length,
      totalSemesters: sampleSemesters.length
    });
  };

  // Utility functions
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  // Academic Year and Semester management functions
  const addAcademicYear = () => {
    const yearNumber = programForm.academicYears.length + 1;
    const newYear: ProgramAcademicYear = {
      id: generateId(),
      name: `Year ${yearNumber}`,
      yearNumber: yearNumber,
      startDate: '2024-07-01',
      endDate: '2025-06-30',
      semesters: [
        {
          id: generateId(),
          name: `Semester ${(yearNumber - 1) * 2 + 1}`,
          number: (yearNumber - 1) * 2 + 1,
          startDate: '2024-07-01',
          endDate: '2024-11-30'
        },
        {
          id: generateId(),
          name: `Semester ${(yearNumber - 1) * 2 + 2}`,
          number: (yearNumber - 1) * 2 + 2,
          startDate: '2025-01-01',
          endDate: '2025-05-31'
        }
      ]
    };
    setProgramForm({ ...programForm, academicYears: [...programForm.academicYears, newYear] });
  };

  const removeAcademicYear = (index: number) => {
    const updatedYears = programForm.academicYears.filter((_, i) => i !== index);
    // Renumber remaining years
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
    setProgramForm({ ...programForm, academicYears: renumberedYears });
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

  // Auto-generate academic years based on duration
  const generateAcademicYearsBasedOnDuration = (duration: number) => {
    const years: ProgramAcademicYear[] = [];
    for (let i = 1; i <= duration; i++) {
      years.push({
        id: generateId(),
        name: `Year ${i}`,
        yearNumber: i,
        startDate: '2024-07-01',
        endDate: '2025-06-30',
        semesters: [
          {
            id: generateId(),
            name: `Semester ${(i - 1) * 2 + 1}`,
            number: (i - 1) * 2 + 1,
            startDate: '2024-07-01',
            endDate: '2024-11-30'
          },
          {
            id: generateId(),
            name: `Semester ${(i - 1) * 2 + 2}`,
            number: (i - 1) * 2 + 2,
            startDate: '2025-01-01',
            endDate: '2025-05-31'
          }
        ]
      });
    }
    return years;
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

  // CRUD Operations
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
    }

    setDepartmentForm({ name: '', code: '', head: '', isActive: true });
    setEditingId(null);
    setShowModal(false);
  };

  const handleProgramSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert form academic years to actual data structure
    const actualAcademicYears: AcademicYear[] = programForm.academicYears.map(year => ({
      id: year.id,
      programId: editingId || generateId(),
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

    if (editingId) {
      setPrograms(prev => prev.map(prog => 
        prog.id === editingId 
          ? { 
              ...programForm, 
              id: editingId, 
              years: actualAcademicYears,
              createdAt: prev.find(p => p.id === editingId)?.createdAt || new Date().toISOString() 
            }
          : prog
      ));
      
      // Update academic years and semesters
      setAcademicYears(prev => [
        ...prev.filter(y => y.programId !== editingId),
        ...actualAcademicYears
      ]);
      
      const allSemesters = actualAcademicYears.flatMap(year => year.semesters);
      setSemesters(prev => [
        ...prev.filter(s => !actualAcademicYears.some(y => y.semesters.some(sem => sem.id === s.id))),
        ...allSemesters
      ]);
      
      showToast('Program updated successfully', 'success');
    } else {
      const newProgramId = generateId();
      const newProgram: Program = { 
        ...programForm, 
        id: newProgramId, 
        years: actualAcademicYears.map(year => ({ ...year, programId: newProgramId })),
        createdAt: new Date().toISOString() 
      };
      
      setPrograms(prev => [...prev, newProgram]);
      setAcademicYears(prev => [...prev, ...newProgram.years]);
      
      const allSemesters = newProgram.years.flatMap(year => year.semesters);
      setSemesters(prev => [...prev, ...allSemesters]);
      
      showToast('Program added successfully', 'success');
    }

    setProgramForm({ 
      departmentId: '', name: '', code: '', totalSeats: 0, seatQuotas: [], 
      duration: 4, degreeLevel: 'Undergraduate', accreditation: '', 
      academicYears: [], isActive: true 
    });
    setEditingId(null);
    setShowModal(false);

    // Update stats
    setStats(prev => ({
      ...prev,
      totalPrograms: programs.length + (editingId ? 0 : 1),
      totalYears: academicYears.length + actualAcademicYears.length,
      totalSemesters: semesters.length + actualAcademicYears.flatMap(y => y.semesters).length
    }));
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setCourses(prev => prev.map(course => 
        course.id === editingId 
          ? { ...courseForm, id: editingId, createdAt: prev.find(c => c.id === editingId)?.createdAt || new Date().toISOString() }
          : course
      ));
      showToast('Course updated successfully', 'success');
    } else {
      const newCourse: Course = { ...courseForm, id: generateId(), createdAt: new Date().toISOString() };
      setCourses(prev => [...prev, newCourse]);
      showToast('Course added successfully', 'success');
    }

    setCourseForm({ semesterId: '', departmentId: '', programId: '', yearId: '', name: '', code: '', credits: 0, type: 'Core', isActive: true });
    setEditingId(null);
    setShowModal(false);
  };

  // Edit functions
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
      semesterId: course.semesterId, departmentId: course.departmentId, programId: course.programId,
      yearId: course.yearId, name: course.name, code: course.code, credits: course.credits,
      type: course.type, isActive: course.isActive
    });
    setEditingId(course.id);
    setShowModal(true);
  };

  // Delete functions
  const deleteDepartment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(prev => prev.filter(dept => dept.id !== id));
      showToast('Department deleted successfully', 'success');
    }
  };

  const deleteProgram = (id: string) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      setPrograms(prev => prev.filter(prog => prog.id !== id));
      setAcademicYears(prev => prev.filter(year => year.programId !== id));
      const programYears = academicYears.filter(y => y.programId === id);
      setSemesters(prev => prev.filter(sem => !programYears.some(y => y.id === sem.yearId)));
      showToast('Program deleted successfully', 'success');
    }
  };

  const deleteCourse = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(prev => prev.filter(course => course.id !== id));
      showToast('Course deleted successfully', 'success');
    }
  };

  // Enhanced filter functions
  const applyFilters = (data: any[]) => {
    return data.filter(item => {
      const matchesSearch = item.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
                           item.code?.toLowerCase().includes(filters.search.toLowerCase()) ||
                           (activeTab === 'departments' && item.head?.toLowerCase().includes(filters.search.toLowerCase()));
      
      const matchesStatus = filters.status === 'all' || 
                           (filters.status === 'active' && item.isActive) ||
                           (filters.status === 'inactive' && !item.isActive);

      const matchesDepartment = !filters.department || item.departmentId === filters.department;
      const matchesProgram = !filters.program || item.programId === filters.program;
      const matchesDegreeLevel = !filters.degreeLevel || item.degreeLevel === filters.degreeLevel;

      return matchesSearch && matchesStatus && matchesDepartment && matchesProgram && matchesDegreeLevel;
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

  // Helper functions
  const getDepartmentName = (id: string) => departments.find(d => d.id === id)?.name || 'Unknown';
  const getProgramName = (id: string) => programs.find(p => p.id === id)?.name || 'Unknown';
  const getYearName = (id: string) => academicYears.find(y => y.id === id)?.name || 'Unknown';
  const getSemesterName = (id: string) => semesters.find(s => s.id === id)?.name || 'Unknown';

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
      academicYears: [], isActive: true 
    });
    setCourseForm({ semesterId: '', departmentId: '', programId: '', yearId: '', name: '', code: '', credits: 0, type: 'Core', isActive: true });
    
    setShowModal(true);
  };

  const resetFilters = () => {
    setFilters({ search: '', status: 'all' });
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
            {principalTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as PrincipalTabType);
                    setShowModal(false);
                    setEditingId(null);
                    resetFilters();
                  }}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
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
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Institution Overview</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Complete institutional statistics and analytics</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <BuildingOfficeIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Departments</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalDepartments}</p>
                  </div>
                </div>
              </div>

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
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <CalendarDaysIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Academic Years</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalYears}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                    <ClockIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Semesters</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalSemesters}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
                    <BookOpenIcon className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Courses</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.activeCourses}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities - Same as before but with enhanced structure display */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Department Overview</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {departments.slice(0, 5).map(dept => (
                      <div key={dept.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                            <BuildingOfficeIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{dept.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{dept.code}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          dept.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                        }`}>
                          {dept.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Programs with Academic Structure</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {programs.slice(0, 3).map(prog => {
                      const programYears = academicYears.filter(y => y.programId === prog.id);
                      const totalSemesters = programYears.reduce((sum, year) => {
                        return sum + semesters.filter(sem => sem.yearId === year.id).length;
                      }, 0);
                      
                      return (
                        <div key={prog.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                <AcademicCapIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">{prog.name}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{getDepartmentName(prog.departmentId)}</p>
                              </div>
                            </div>
                            <span className="text-sm font-medium text-slate-900 dark:text-white">{prog.totalSeats} seats</span>
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                            <div className="flex justify-between">
                              <span>{programYears.length} Academic Years</span>
                              <span>{totalSemesters} Total Semesters</span>
                            </div>
                            {programYears.map(year => {
                              const yearSemesters = semesters.filter(s => s.yearId === year.id);
                              return (
                                <div key={year.id} className="pl-4 border-l border-slate-200 dark:border-slate-600">
                                  <div className="flex justify-between">
                                    <span>{year.name}</span>
                                    <span>{yearSemesters.length} semesters</span>
                                  </div>
                                  <div className="pl-4 text-xs text-slate-500">
                                    {yearSemesters.map(sem => (
                                      <div key={sem.id}>{sem.name}</div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Management Tabs */}
        {activeTab !== 'overview' && (
          <div>
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{getTabTitle()}</h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Manage and organize your {activeTab.replace('-', ' ')}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
                      showFilters 
                        ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-300' 
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <FunnelIcon className="h-5 w-5" />
                    <span>Filters</span>
                  </button>
                  <button
                    onClick={openAddModal}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <PlusIcon className="h-5 w-5" />
                    <span>{getAddButtonText()}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Filters Panel */}
            {showFilters && (
              <div className="mb-6 bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                  <div>
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
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value as 'all' | 'active' | 'inactive' })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  {(activeTab === 'programs' || activeTab === 'courses') && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Department
                      </label>
                      <select
                        value={filters.department || ''}
                        onChange={(e) => setFilters({ ...filters, department: e.target.value || undefined })}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                      >
                        <option value="">All Departments</option>
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {activeTab === 'programs' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Degree Level
                      </label>
                      <select
                        value={filters.degreeLevel || ''}
                        onChange={(e) => setFilters({ ...filters, degreeLevel: e.target.value || undefined })}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                      >
                        <option value="">All Levels</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Doctoral">Doctoral</option>
                      </select>
                    </div>
                  )}

                  {activeTab === 'courses' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Program
                      </label>
                      <select
                        value={filters.program || ''}
                        onChange={(e) => setFilters({ ...filters, program: e.target.value || undefined })}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                      >
                        <option value="">All Programs</option>
                        {programs.map(prog => (
                          <option key={prog.id} value={prog.id}>{prog.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={resetFilters}
                    className="flex items-center space-x-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200"
                  >
                    <XMarkIcon className="h-4 w-4" />
                    <span>Reset Filters</span>
                  </button>
                </div>
              </div>
            )}

            {/* Data Table */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {getTabTitle()} ({filteredData.length})
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                  {/* Departments Table */}
                  {activeTab === 'departments' && (
                    <>
                      <thead className="bg-slate-50 dark:bg-slate-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                            Department
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                            Code
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                            Head
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
                        {filteredData.map((dept: Department) => (
                          <tr key={dept.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                                  <BuildingOfficeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-slate-900 dark:text-white">{dept.name}</div>
                                  <div className="text-sm text-slate-500 dark:text-slate-400">
                                    Created {new Date(dept.createdAt).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {dept.code}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                              {dept.head}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                dept.isActive 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                              }`}>
                                {dept.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => editDepartment(dept)}
                                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                  title="Edit"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => deleteDepartment(dept.id)}
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

                  {/* Enhanced Programs Table */}
                  {activeTab === 'programs' && (
                    <>
                      <thead className="bg-slate-50 dark:bg-slate-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                            Program
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                            Department
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                            Level & Duration
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                            Seats
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                            Academic Structure
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
                        {filteredData.map((prog: Program) => {
                          const programYears = academicYears.filter(y => y.programId === prog.id);
                          const totalSemesters = programYears.reduce((sum, year) => {
                            return sum + semesters.filter(sem => sem.yearId === year.id).length;
                          }, 0);

                          return (
                            <tr key={prog.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                                    <AcademicCapIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-slate-900 dark:text-white">{prog.name}</div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400">{prog.code}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                                {getDepartmentName(prog.departmentId)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    prog.degreeLevel === 'Undergraduate' 
                                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                      : prog.degreeLevel === 'Postgraduate'
                                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                                  }`}>
                                    {prog.degreeLevel}
                                  </span>
                                  <div className="text-sm text-slate-500 dark:text-slate-300 mt-1">{prog.duration} Years</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <span className="font-semibold text-slate-900 dark:text-white">{prog.totalSeats}</span>
                                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    {prog.seatQuotas.slice(0, 2).map(quota => (
                                      <div key={quota.id}>{quota.type}: {quota.seats}</div>
                                    ))}
                                    {prog.seatQuotas.length > 2 && (
                                      <div className="text-blue-600">+{prog.seatQuotas.length - 2} more</div>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-slate-900 dark:text-white">
                                    {programYears.length} Years • {totalSemesters} Semesters
                                  </div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 space-y-1 max-h-20 overflow-y-auto">
                                    {programYears.slice(0, 2).map(year => {
                                      const yearSemesters = semesters.filter(s => s.yearId === year.id);
                                      return (
                                        <div key={year.id} className="border-l-2 border-slate-200 dark:border-slate-600 pl-2">
                                          <div className="font-medium">{year.name}</div>
                                          <div className="text-xs">
                                            {yearSemesters.map(sem => (
                                              <span key={sem.id} className="mr-2 bg-slate-100 dark:bg-slate-700 px-1 rounded">
                                                Sem {sem.number}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      );
                                    })}
                                    {programYears.length > 2 && (
                                      <div className="text-blue-600 text-xs">+{programYears.length - 2} more years</div>
                                    )}
                                  </div>
                                </div>
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
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => editProgram(prog)}
                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                    title="Edit"
                                  >
                                    <PencilIcon className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => deleteProgram(prog.id)}
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                    title="Delete"
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </>
                  )}

                  {/* Courses Table */}
                  {activeTab === 'courses' && (
                    <>
                      <thead className="bg-slate-50 dark:bg-slate-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                            Course Info
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                            Program
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                            Year & Semester
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
                                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mr-4">
                                  <BookOpenIcon className="h-5 w-5 text-pink-600 dark:text-pink-400" />
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
                </table>

                {/* Empty State */}
                {filteredData.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 mx-auto bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                      <MagnifyingGlassIcon className="h-6 w-6 text-slate-400" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">No results found</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Modal for Forms */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {editingId ? `Edit ${activeTab.slice(0, -1).replace('-', ' ')}` : `Add ${activeTab.slice(0, -1).replace('-', ' ')}`}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Department Form */}
              {activeTab === 'departments' && (
                <form onSubmit={handleDepartmentSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Department Name *
                    </label>
                    <input
                      type="text"
                      value={departmentForm.name}
                      onChange={(e) => setDepartmentForm({...departmentForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                      placeholder="e.g., Computer Science & Engineering"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Department Code *
                      </label>
                      <input
                        type="text"
                        value={departmentForm.code}
                        onChange={(e) => setDepartmentForm({...departmentForm, code: e.target.value.toUpperCase()})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        placeholder="e.g., CSE"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Department Head *
                      </label>
                      <input
                        type="text"
                        value={departmentForm.head}
                        onChange={(e) => setDepartmentForm({...departmentForm, head: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        placeholder="e.g., Dr. John Smith"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={departmentForm.isActive}
                      onChange={(e) => setDepartmentForm({...departmentForm, isActive: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    />
                    <label className="ml-3 block text-sm text-slate-700 dark:text-slate-300">
                      Active Department
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
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                      {editingId ? 'Update' : 'Create'} Department
                    </button>
                  </div>
                </form>
              )}

              {/* Enhanced Program Form with Academic Years & Semesters */}
              {activeTab === 'programs' && (
                <form onSubmit={handleProgramSubmit} className="space-y-8">
                  {/* Basic Program Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Department *
                      </label>
                      <select
                        value={programForm.departmentId}
                        onChange={(e) => setProgramForm({...programForm, departmentId: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.filter(d => d.isActive).map(dept => (
                          <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Program Name *
                      </label>
                      <input
                        type="text"
                        value={programForm.name}
                        onChange={(e) => setProgramForm({...programForm, name: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        placeholder="e.g., Bachelor of Technology in Computer Science"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Program Code *
                      </label>
                      <input
                        type="text"
                        value={programForm.code}
                        onChange={(e) => setProgramForm({...programForm, code: e.target.value.toUpperCase()})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        placeholder="e.g., B.TECH CSE"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Total Seats *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={programForm.totalSeats}
                        onChange={(e) => setProgramForm({...programForm, totalSeats: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Duration (Years) *
                      </label>
                      <select
                        value={programForm.duration}
                        onChange={(e) => {
                          const newDuration = parseInt(e.target.value);
                          setProgramForm({
                            ...programForm, 
                            duration: newDuration,
                            academicYears: generateAcademicYearsBasedOnDuration(newDuration)
                          });
                        }}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        required
                      >
                        <option value={1}>1 Year</option>
                        <option value={2}>2 Years</option>
                        <option value={3}>3 Years</option>
                        <option value={4}>4 Years</option>
                        <option value={5}>5 Years</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Degree Level *
                      </label>
                      <select
                        value={programForm.degreeLevel}
                        onChange={(e) => setProgramForm({...programForm, degreeLevel: e.target.value as 'Undergraduate' | 'Postgraduate' | 'Doctoral'})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        required
                      >
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Doctoral">Doctoral</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Accreditation
                      </label>
                      <input
                        type="text"
                        value={programForm.accreditation}
                        onChange={(e) => setProgramForm({...programForm, accreditation: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        placeholder="e.g., NBA Accredited"
                      />
                    </div>
                  </div>

                  {/* Seat Quotas Section */}
                  <div className="border border-slate-200 dark:border-slate-600 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Seat Quotas
                      </label>
                      <button
                        type="button"
                        onClick={addSeatQuota}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <PlusIcon className="h-4 w-4" />
                        <span>Add Quota</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {programForm.seatQuotas.map((quota, index) => (
                        <div key={quota.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-slate-200 dark:border-slate-600 rounded-lg">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                              Quota Type
                            </label>
                            <input
                              type="text"
                              value={quota.type}
                              onChange={(e) => updateSeatQuota(index, 'type', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                              placeholder="e.g., Merit, Management, Sports"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                              Number of Seats
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={quota.seats}
                              onChange={(e) => updateSeatQuota(index, 'seats', parseInt(e.target.value) || 0)}
                              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                            />
                          </div>
                          <div className="flex items-end">
                            <button
                              type="button"
                              onClick={() => removeSeatQuota(index)}
                              className="w-full px-3 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <MinusIcon className="h-4 w-4 mx-auto" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Academic Years and Semesters Section */}
                  <div className="border border-slate-200 dark:border-slate-600 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="text-lg font-medium text-slate-900 dark:text-white">Academic Years & Semesters</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Configure academic years with 2 semesters each</p>
                      </div>
                      <button
                        type="button"
                        onClick={addAcademicYear}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                      >
                        <PlusIcon className="h-4 w-4" />
                        <span>Add Year</span>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {programForm.academicYears.map((year, yearIndex) => (
                        <div key={year.id} className="border border-slate-300 dark:border-slate-600 rounded-lg p-6 bg-slate-50 dark:bg-slate-700">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="text-md font-medium text-slate-900 dark:text-white">Year {year.yearNumber}</h5>
                            <button
                              type="button"
                              onClick={() => removeAcademicYear(yearIndex)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Year Name
                              </label>
                              <input
                                type="text"
                                value={year.name}
                                onChange={(e) => updateAcademicYear(yearIndex, 'name', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-white"
                                placeholder="e.g., First Year"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Start Date
                              </label>
                              <input
                                type="date"
                                value={year.startDate}
                                onChange={(e) => updateAcademicYear(yearIndex, 'startDate', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                End Date
                              </label>
                              <input
                                type="date"
                                value={year.endDate}
                                onChange={(e) => updateAcademicYear(yearIndex, 'endDate', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-white"
                              />
                            </div>
                          </div>

                          {/* Semesters for this year */}
                          <div>
                            <h6 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Semesters</h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {year.semesters.map((semester, semIndex) => (
                                <div key={semester.id} className="border border-slate-200 dark:border-slate-500 rounded-lg p-4 bg-white dark:bg-slate-800">
                                  <h7 className="text-sm font-medium text-slate-900 dark:text-white mb-3">Semester {semester.number}</h7>
                                  <div className="grid grid-cols-1 gap-3">
                                    <div>
                                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                                        Semester Name
                                      </label>
                                      <input
                                        type="text"
                                        value={semester.name}
                                        onChange={(e) => updateSemester(yearIndex, semIndex, 'name', e.target.value)}
                                        className="w-full px-2 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                                        placeholder="e.g., First Semester"
                                      />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                                          Start Date
                                        </label>
                                        <input
                                          type="date"
                                          value={semester.startDate}
                                          onChange={(e) => updateSemester(yearIndex, semIndex, 'startDate', e.target.value)}
                                          className="w-full px-2 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                                          End Date
                                        </label>
                                        <input
                                          type="date"
                                          value={semester.endDate}
                                          onChange={(e) => updateSemester(yearIndex, semIndex, 'endDate', e.target.value)}
                                          className="w-full px-2 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={programForm.isActive}
                      onChange={(e) => setProgramForm({...programForm, isActive: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    />
                    <label className="ml-3 block text-sm text-slate-700 dark:text-slate-300">
                      Active Program
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
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                      {editingId ? 'Update' : 'Create'} Program
                    </button>
                  </div>
                </form>
              )}

              {/* Course Form */}
              {activeTab === 'courses' && (
                <form onSubmit={handleCourseSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Course Name *
                      </label>
                      <input
                        type="text"
                        value={courseForm.name}
                        onChange={(e) => setCourseForm({...courseForm, name: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        placeholder="e.g., Programming Fundamentals"
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
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        placeholder="e.g., CS101"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Department *
                      </label>
                      <select
                        value={courseForm.departmentId}
                        onChange={(e) => {
                          setCourseForm({...courseForm, departmentId: e.target.value, programId: '', yearId: '', semesterId: ''});
                        }}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.filter(d => d.isActive).map(dept => (
                          <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Program *
                      </label>
                      <select
                        value={courseForm.programId}
                        onChange={(e) => {
                          setCourseForm({...courseForm, programId: e.target.value, yearId: '', semesterId: ''});
                        }}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        required
                        disabled={!courseForm.departmentId}
                      >
                        <option value="">Select Program</option>
                        {programs.filter(p => p.isActive && p.departmentId === courseForm.departmentId).map(prog => (
                          <option key={prog.id} value={prog.id}>{prog.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Academic Year *
                      </label>
                      <select
                        value={courseForm.yearId}
                        onChange={(e) => {
                          setCourseForm({...courseForm, yearId: e.target.value, semesterId: ''});
                        }}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        required
                        disabled={!courseForm.programId}
                      >
                        <option value="">Select Academic Year</option>
                        {academicYears.filter(y => y.isActive && y.programId === courseForm.programId).map(year => (
                          <option key={year.id} value={year.id}>{year.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Semester *
                      </label>
                      <select
                        value={courseForm.semesterId}
                        onChange={(e) => setCourseForm({...courseForm, semesterId: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        required
                        disabled={!courseForm.yearId}
                      >
                        <option value="">Select Semester</option>
                        {semesters.filter(s => s.isActive && s.yearId === courseForm.yearId).map(sem => (
                          <option key={sem.id} value={sem.id}>{sem.name}</option>
                        ))}
                      </select>
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
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
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
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                        required
                      >
                        <option value="Core">Core</option>
                        <option value="Elective">Elective</option>
                        <option value="Lab">Lab</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={courseForm.isActive}
                      onChange={(e) => setCourseForm({...courseForm, isActive: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
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
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                      {editingId ? 'Update' : 'Create'} Course
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

export default PrincipalDashboard;
