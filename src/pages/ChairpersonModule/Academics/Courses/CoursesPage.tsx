import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus } from 'lucide-react';
import { mockCourses } from '../data/mockData';
import { SearchBar } from '../UI/SearchBar';
import { Table } from '../UI/Table';
import { StatusToggle } from '../UI/StatusToggle';
import { Pagination } from '../UI/Pagination';
import { usePagination } from '../hooks/usePagination';

// Define interfaces for our data
interface Course {
  id: string;
  code: string;
  name: string;
  program?: string;
  year?: number;
  semester?: number;
  credits: number;
  type?: 'Core' | 'Elective';
  status: 'active' | 'inactive' | 'Active' | 'Inactive';
  regulation?: string;
  regulationYear?: string;
  department?: string;
  description?: string;
  ph?: boolean;
  subjects?: string[];
}

// Initial course data matching the screenshot
const initialCourses: Course[] = [
  {
    id: '1',
    code: 'CS101',
    name: 'Programming Fundamentals',
    program: 'Bachelor of Technology in Computer Science',
    year: 1,
    semester: 1,
    credits: 4,
    type: 'Core',
    status: 'Active',
    regulation: 'R2023'
  },
  {
    id: '2',
    code: 'MATH104',
    name: 'Mathematics for Computer Science',
    program: 'Bachelor of Technology in Computer Science',
    year: 1,
    semester: 1,
    credits: 3,
    type: 'Core',
    status: 'Active'
  },
  {
    id: '3',
    code: 'CS102',
    name: 'Data Structures & Algorithms',
    program: 'Bachelor of Technology in Computer Science',
    year: 1,
    semester: 2,
    credits: 4,
    type: 'Core',
    status: 'Active'
  },
  {
    id: '4',
    code: 'CS201',
    name: 'Database Management Systems',
    program: 'Bachelor of Technology in Computer Science',
    year: 2,
    semester: 3,
    credits: 3,
    type: 'Core',
    status: 'Active'
  },
  {
    id: '5',
    code: 'CS202',
    name: 'Operating Systems',
    program: 'Bachelor of Technology in Computer Science',
    year: 2,
    semester: 3,
    credits: 4,
    type: 'Core',
    status: 'Active'
  }
];

// Local extension of Course to hold extra fields requested
type LocalCourse = Course & { id: string };

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<LocalCourse[]>(mockCourses as LocalCourse[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [semesterFilter, setSemesterFilter] = useState<number | 'all'>('all');
  const [regulationFilter, setRegulationFilter] = useState<string>('');

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !q ||
        course.name?.toLowerCase().includes(q) ||
        course.code?.toLowerCase().includes(q) ||
        (course.department || '').toLowerCase().includes(q);

      const matchesSemester = semesterFilter === 'all' || course.semester === semesterFilter;
      const matchesRegulation = !regulationFilter || (course.regulationYear || course.regulation || '').toString() === regulationFilter;

      return matchesSearch && matchesSemester && matchesRegulation;
    });
  }, [courses, searchTerm, semesterFilter, regulationFilter]);

  const pagination = usePagination({ data: filteredCourses, itemsPerPage: 10 });

  const handleStatusToggle = (courseId: string, newStatus: 'active' | 'inactive') => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: newStatus } : c));
  };

  const columns = [
    {
      key: 'courseInfo',
      label: 'COURSE INFO',
      render: (course: LocalCourse) => (
        <div className="flex items-start space-x-3">
          <div className="bg-purple-100 p-2 rounded">
            <span className="text-purple-600">📚</span>
          </div>
          <div>
            <div className="font-medium">{course.name}</div>
            <div className="text-sm text-gray-500">{course.code}</div>
            <div className="text-xs text-gray-400">Subjects: {course.subjects?.length || 0}</div>
            {course.ph && (
              <div className="text-xs text-green-600 font-semibold">PH</div>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'program',
      label: 'PROGRAM',
      render: (course: LocalCourse) => (
        <div>
          <div className="font-medium">{course.program || course.department || '—'}</div>
          <div className="text-sm text-gray-500">{course.department}</div>
        </div>
      )
    },
    {
      key: 'yearAndSemester',
      label: 'YEAR & SEMESTER',
      render: (course: LocalCourse) => (
        <div>
          <div className="font-medium">{course.year ? `Year ${course.year}` : '—'}</div>
          <div className="text-sm text-gray-500">{`Semester ${course.semester ?? '-'}`}</div>
          <div className="text-xs text-blue-600">Regulation Year: {course.regulationYear || course.regulation || '-'}</div>
        </div>
      )
    },
    {
      key: 'regulation',
      label: 'REGULATION',
      render: (course: LocalCourse) => (
        <div>
          <div className="font-medium">{course.regulationYear || course.regulation || '-'}</div>
        </div>
      )
    },
    {
      key: 'creditsAndType',
      label: 'CREDITS & TYPE',
      render: (course: LocalCourse) => (
        <div>
          <div className="font-medium">{course.credits} Credits</div>
          <div className="text-sm">
            <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">{course.type || 'Core'}</span>
            {course.ph && (
              <span className="ml-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">PH</span>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'STATUS',
      render: (course: LocalCourse) => (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          (course.status === 'active' || course.status === 'Active') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {(course.status === 'active' || course.status === 'Active') ? 'Active' : 'Inactive'}
        </div>
      )
    }
  ];

  const renderActions = (course: LocalCourse) => (
    <div className="flex items-center space-x-3">
      <button onClick={() => navigate(`/home/courses/edit/${course.id}`)} className="text-purple-600 hover:text-purple-900">
        <Edit className="h-4 w-4" />
      </button>
      <StatusToggle isActive={(course.status === 'active' || course.status === 'Active')} onChange={(isActive) => handleStatusToggle(course.id, isActive ? 'active' : 'inactive')} />
    </div>
  );

  // compute total credits for currently selected semester (or all if 'all')
  const totalCreditsForSemester = useMemo(() => {
    const data = filteredCourses.filter(c => semesterFilter === 'all' ? true : (c.semester ?? -1) === semesterFilter);
    return data.reduce((sum, c) => sum + (c.credits || 0), 0);
  }, [filteredCourses, semesterFilter]);

  // Bulk CSV upload handler (very simple parser)
  const handleBulkUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      if (lines.length < 2) return alert('CSV must contain a header and at least one row');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const rows = lines.slice(1).map(line => line.split(',').map(cell => cell.trim()));
      const newCourses: LocalCourse[] = [];
      const errors: string[] = [];
      rows.forEach((row, idx) => {
        const obj: any = {};
        headers.forEach((h, i) => { obj[h] = row[i] ?? ''; });
        // expected headers: code,name,credits,department,semester,regulationyear,ph,subjects,program,year,type
        if (!obj.code || !obj.name) { errors.push(`Row ${idx + 2}: missing code or name`); return; }
        if (!obj.credits || isNaN(Number(obj.credits))) { errors.push(`Row ${idx + 2}: missing or invalid credits`); return; }
        if (!obj.semester || isNaN(Number(obj.semester))) { errors.push(`Row ${idx + 2}: missing or invalid semester`); return; }
        const parsed: LocalCourse = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
          code: obj.code,
          name: obj.name,
          credits: Number(obj.credits) || 0,
          department: obj.department || obj.program || 'Unknown',
          status: 'active',
          description: obj.description || '',
          semester: obj.semester ? Number(obj.semester) : undefined,
          regulationYear: obj.regulationyear || obj.regulationYear || obj.regulation || '',
          ph: (obj.ph === '1' || obj.ph === 'true' || obj.ph === 'yes'),
          subjects: obj.subjects ? obj.subjects.split(';').map((s:string) => s.trim()) : [],
          program: obj.program || undefined,
          year: obj.year ? Number(obj.year) : undefined,
          type: obj.type || undefined
        } as LocalCourse;
        newCourses.push(parsed);
      });
      if (errors.length) alert('Errors:\n' + errors.join('\n'));
      if (newCourses.length) setCourses(prev => [...newCourses, ...prev]);
    };
    reader.readAsText(file);
  };

  const cumulativeCredits = useMemo(() => {
    return filteredCourses.reduce((sum, c) => sum + (c.credits || 0), 0);
  }, [filteredCourses]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
            <p className="text-gray-600">Manage and organize your courses</p>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => {}} className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Filters</button>
            <button onClick={() => navigate('/home/courses/add')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              <Plus className="h-5 w-5 mr-2" />
              Add Course
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-medium">Course Management ({filteredCourses.length})</div>
          <div className="flex flex-col items-end">
            {semesterFilter !== 'all' && (
              <div className="text-sm text-gray-600">Total Credits for Semester {semesterFilter}: <span className="font-medium">{totalCreditsForSemester}</span></div>
            )}
            <div className="text-xs text-gray-500">Cumulative Credits (All Semesters): <span className="font-semibold">{cumulativeCredits}</span></div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-lg">
              <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search courses by name, code or department..." />
            </div>
            <div className="flex items-center space-x-4">
              <select value={semesterFilter} onChange={(e) => setSemesterFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))} className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 sm:text-sm rounded-md">
                <option value="all">All Semesters</option>
                {[1,2,3,4,5,6,7,8].map(sem => (<option key={sem} value={sem}>Semester {sem}</option>))}
              </select>

              <input type="text" placeholder="Regulation Year" value={regulationFilter} onChange={(e) => setRegulationFilter(e.target.value)} className="block w-40 pl-3 pr-3 py-2 text-base border-gray-300 sm:text-sm rounded-md" />

              <label className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm rounded-md bg-white cursor-pointer">
                <input type="file" accept=".csv" onChange={(e) => handleBulkUpload(e.target.files?.[0] ?? null)} className="sr-only" />
                Bulk Upload
              </label>
            </div>
          </div>
        </div>

        <Table columns={columns} data={pagination.paginatedData} actions={renderActions} />

        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} itemsPerPage={pagination.itemsPerPage} totalItems={pagination.totalItems} onPageChange={pagination.goToPage} onPrevious={pagination.goToPrevious} onNext={pagination.goToNext} />
      </div>
    </div>
  );
};

export default CoursesPage;