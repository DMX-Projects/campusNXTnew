import React, { useMemo, useState, useCallback } from 'react';
import {
  Bell, Menu, BarChart2, BookOpen, Users, ClipboardList, FlaskConical, Calendar,
  User, GraduationCap, Activity, Target, FileText, AlertCircle, CheckCircle,
  Flag, Upload, UserCheck, Plus, X, MapPin, Clock, Info, ChevronRight
} from 'lucide-react';

// Types
type ClassType = 'lecture' | 'practical' | 'tutorial';
type AssignmentStatus = 'active' | 'completed' | 'overdue';
type NotificationType = 'info' | 'warning' | 'success' | 'error' | 'urgent';

interface Course {
  id: string;
  name: string;
  code: string;
  semester: number;
  credits: number;
  classType: ClassType;
  enrolledStudents: number;
  maxStudents: number;
  avgAttendance: number; // 0-100
  syllabusCompleted: number; // 0-100
  pendingEvaluations: number;
  schedule: { day: string; time: string; venue: string }[];
  nextClassISO?: string;
}

interface Student {
  id: string;
  name: string;
  roll: string;
  sem: number;
  section: string;
  cgpa: number;
  attendancePct: number;
  avgMarksPct: number;
  performance: 'excellent' | 'good' | 'average' | 'poor';
}

interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  maxMarks: number;
  dueISO: string;
  submitted: number;
  evaluated: number;
  totalStudents: number;
  status: AssignmentStatus;
  type: 'project' | 'lab' | 'quiz' | 'homework';
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  dateISO: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'academic' | 'administrative' | 'student' | 'system';
}

interface Research {
  id: string;
  title: string;
  type: 'project' | 'publication' | 'conference' | 'patent';
  status: 'ongoing' | 'completed' | 'submitted' | 'published';
  startISO: string;
  endISO?: string;
  funding?: number;
  collaborators: string[];
  students: string[];
}

// Utilities
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

const daysUntil = (iso: string) => Math.ceil((new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

const classTypeChip = (t: ClassType) =>
  t === 'lecture'
    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
    : t === 'practical'
    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';

const attendanceColor = (v: number) =>
  v >= 90 ? 'text-green-600 dark:text-green-400' : v >= 75 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400';

const statusChip = (s: AssignmentStatus) =>
  s === 'active'
    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
    : s === 'completed'
    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';

const notifStyle = (t: NotificationType) =>
  t === 'success'
    ? 'border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20'
    : t === 'warning'
    ? 'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
    : t === 'error'
    ? 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20'
    : t === 'urgent'
    ? 'border-l-4 border-red-600 bg-red-100 dark:bg-red-900/30'
    : 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20';

const notifIcon = (t: NotificationType) =>
  t === 'success' ? <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" /> :
  t === 'warning' ? <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" /> :
  t === 'error'   ? <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" /> :
  t === 'urgent'  ? <Flag className="w-4 h-4 text-red-600 dark:text-red-400" /> :
                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />;

// Hardcoded data
const FACULTY = {
  name: 'Dr. Rajesh Kumar',
  empId: 'FAC001',
  role: 'Associate Professor',
  dept: 'Computer Science & Engineering',
//   exp: '12 years',
  specs: ['Machine Learning', 'Data Science', 'Artificial Intelligence'],
};

const COURSES: Course[] = [
  {
    id: 'c1', name: 'Machine Learning', code: 'CS501', semester: 7, credits: 4, classType: 'lecture',
    enrolledStudents: 85, maxStudents: 90, avgAttendance: 92, syllabusCompleted: 78, pendingEvaluations: 12,
    schedule: [
      { day: 'Monday', time: '10:00-11:00', venue: 'Room 201' },
      { day: 'Wednesday', time: '10:00-11:00', venue: 'Room 201' },
      { day: 'Friday', time: '10:00-11:00', venue: 'Room 201' },
    ],
    nextClassISO: new Date(Date.now() + 86400000).toISOString(), // tomorrow
  },
  {
    id: 'c2', name: 'Data Structures Lab', code: 'CS301L', semester: 3, credits: 2, classType: 'practical',
    enrolledStudents: 45, maxStudents: 50, avgAttendance: 88, syllabusCompleted: 85, pendingEvaluations: 8,
    schedule: [
      { day: 'Tuesday', time: '14:00-17:00', venue: 'Lab 3' },
      { day: 'Thursday', time: '14:00-17:00', venue: 'Lab 3' },
    ],
    nextClassISO: new Date(Date.now() + 2 * 86400000).toISOString(),
  },
  {
    id: 'c3', name: 'Artificial Intelligence', code: 'CS502', semester: 7, credits: 3, classType: 'lecture',
    enrolledStudents: 92, maxStudents: 100, avgAttendance: 91, syllabusCompleted: 65, pendingEvaluations: 18,
    schedule: [
      { day: 'Tuesday', time: '11:00-12:00', venue: 'Room 305' },
      { day: 'Thursday', time: '11:00-12:00', venue: 'Room 305' },
    ],
    nextClassISO: new Date(Date.now() + 3 * 86400000).toISOString(),
  },
  {
    id: 'c4', name: 'Research Methodology', code: 'CS601', semester: 8, credits: 2, classType: 'tutorial',
    enrolledStudents: 28, maxStudents: 30, avgAttendance: 95, syllabusCompleted: 92, pendingEvaluations: 3,
    schedule: [{ day: 'Friday', time: '15:00-17:00', venue: 'Seminar Hall' }],
    nextClassISO: new Date(Date.now() + 4 * 86400000).toISOString(),
  }
];

const STUDENTS: Student[] = [
  { id: 's1', name: 'Arjun Kumar', roll: '2022CSE001', sem: 7, section: 'A', cgpa: 8.45, attendancePct: 91.7, avgMarksPct: 85.5, performance: 'excellent' },
  { id: 's2', name: 'Priya Singh', roll: '2023CSE045', sem: 3, section: 'B', cgpa: 7.85, attendancePct: 90.0, avgMarksPct: 78.5, performance: 'good' },
  { id: 's3', name: 'Rohit Mehta', roll: '2022CSE078', sem: 7, section: 'A', cgpa: 9.12, attendancePct: 95.6, avgMarksPct: 93.5, performance: 'excellent' },
  { id: 's4', name: 'Neha Verma', roll: '2022CSE032', sem: 7, section: 'A', cgpa: 7.12, attendancePct: 82.4, avgMarksPct: 74.2, performance: 'average' },
];

const ASSIGNMENTS: Assignment[] = [
  { id: 'a1', title: 'Linear Regression Implementation', courseId: 'c1', courseName: 'Machine Learning', maxMarks: 100,
    dueISO: new Date(Date.now() + 2 * 86400000).toISOString(), submitted: 73, evaluated: 61, totalStudents: 85, status: 'active', type: 'project' },
  { id: 'a2', title: 'Binary Tree Operations', courseId: 'c2', courseName: 'Data Structures Lab', maxMarks: 50,
    dueISO: new Date(Date.now() + 1 * 86400000).toISOString(), submitted: 37, evaluated: 29, totalStudents: 45, status: 'active', type: 'lab' },
  { id: 'a3', title: 'Neural Network Quiz', courseId: 'c3', courseName: 'Artificial Intelligence', maxMarks: 25,
    dueISO: new Date(Date.now() - 1 * 86400000).toISOString(), submitted: 92, evaluated: 92, totalStudents: 92, status: 'completed', type: 'quiz' },
  { id: 'a4', title: 'Research Paper Review', courseId: 'c4', courseName: 'Research Methodology', maxMarks: 75,
    dueISO: new Date(Date.now() + 5 * 86400000).toISOString(), submitted: 25, evaluated: 22, totalStudents: 28, status: 'active', type: 'homework' },
];

const NOTIFS: Notification[] = [
  { id: 'n1', title: 'Assignment Submission Reminder', message: '12 students haven’t submitted the ML assignment.',
    type: 'warning', dateISO: new Date().toISOString(), read: false, priority: 'high', category: 'academic' },
  { id: 'n2', title: 'Faculty Meeting Scheduled', message: 'Department meeting tomorrow 3 PM, Conference Hall.',
    type: 'info', dateISO: new Date().toISOString(), read: false, priority: 'medium', category: 'administrative' },
  { id: 'n3', title: 'Student Feedback Available', message: 'Mid-semester feedback available for review.',
    type: 'success', dateISO: new Date().toISOString(), read: true, priority: 'medium', category: 'academic' },
];

const RESEARCH: Research[] = [
  { id: 'r1', title: 'DL for Medical Image Analysis', type: 'project', status: 'ongoing', startISO: '2024-01-15',
    endISO: '2025-12-31', funding: 2500000, collaborators: ['Dr. Kumar', 'Dr. Singh'], students: ['Arjun', 'Rohit', 'Priya'] },
  { id: 'r2', title: 'XAI in Finance', type: 'publication', status: 'submitted', startISO: '2025-03-01',
    collaborators: ['Dr. Neha'], students: ['Vikram'] },
];

// Weekly timetable derived from courses schedule
const WEEK_DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const TIMETABLE = WEEK_DAYS.flatMap(day => {
  const slots = COURSES.flatMap(c =>
    c.schedule
      .filter(s => s.day === day)
      .map(s => ({
        id: `${c.id}-${day}-${s.time}`,
        day,
        time: s.time,
        courseId: c.id,
        courseName: c.name,
        courseCode: c.code,
        venue: s.venue,
        durationMins: s.time.includes('-')
          ? (() => {
              const [start, end] = s.time.split('-');
              const [sh, sm] = start.split(':').map(Number);
              const [eh, em] = end.split(':').map(Number);
              return (eh * 60 + em) - (sh * 60 + sm);
            })()
          : 60,
        type: c.classType as ClassType,
        students: c.enrolledStudents,
      }))
  );
  return slots;
});

const FacultyAcademicDashboard: React.FC = () => {
  const [tab, setTab] = useState<'overview' | 'courses' | 'students' | 'assignments' | 'research' | 'schedule' | 'profile'>('overview');
  const [showNotifs, setShowNotifs] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFS);

  const todayName = useMemo(() => new Date().toLocaleDateString('en-US', { weekday: 'long' }), []);
  const todaysClasses = useMemo(() => TIMETABLE.filter(t => t.day === todayName), [todayName]);

  const stats = useMemo(() => {
    const totalStudents = COURSES.reduce((s, c) => s + c.enrolledStudents, 0);
    const avgAttendance = Math.round(COURSES.reduce((s, c) => s + c.avgAttendance, 0) / COURSES.length);
    const avgSyllabus = Math.round(COURSES.reduce((s, c) => s + c.syllabusCompleted, 0) / COURSES.length);
    const pendingEvaluations = COURSES.reduce((s, c) => s + c.pendingEvaluations, 0);
    const unread = notifications.filter(n => !n.read).length;
    const activeResearch = RESEARCH.filter(r => r.status === 'ongoing').length;
    const todayClasses = todaysClasses.length;
    return { totalCourses: COURSES.length, totalStudents, avgAttendance, avgSyllabus, pendingEvaluations, unread, activeResearch, todayClasses };
  }, [notifications, todaysClasses]);

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return STUDENTS;
    return STUDENTS.filter(s => s.name.toLowerCase().includes(term) || s.roll.toLowerCase().includes(term));
  }, [search]);

  const filteredAssignments = useMemo(() => {
    const list = selectedCourse === 'all' ? ASSIGNMENTS : ASSIGNMENTS.filter(a => a.courseId === selectedCourse);
    return list.sort((a, b) => new Date(a.dueISO).getTime() - new Date(b.dueISO).getTime());
  }, [selectedCourse]);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const markOneRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur p-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="flex items-center gap-4 min-w-0">
              <button
                onClick={() => {}}
                className="lg:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow grid place-content-center text-xl font-bold">
                {FACULTY.name.split(' ').map(n => n[0]).join('').slice(0,2)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight truncate">{FACULTY.name}</h1>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">Faculty</span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{FACULTY.role}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{FACULTY.dept}  {FACULTY.exp}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {FACULTY.specs.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-md text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="grid grid-cols-4 gap-3 text-center">
                <div><div className="text-lg font-semibold text-blue-600 dark:text-blue-400">{stats.totalCourses}</div><div className="text-[11px] text-gray-500 dark:text-gray-400">Courses</div></div>
                <div><div className="text-lg font-semibold text-green-600 dark:text-green-400">{stats.totalStudents}</div><div className="text-[11px] text-gray-500 dark:text-gray-400">Students</div></div>
                <div><div className="text-lg font-semibold text-orange-600 dark:text-orange-400">{stats.pendingEvaluations}</div><div className="text-[11px] text-gray-500 dark:text-gray-400">Pending</div></div>
                <div><div className="text-lg font-semibold text-purple-600 dark:text-purple-400">{stats.activeResearch}</div><div className="text-[11px] text-gray-500 dark:text-gray-400">Research</div></div>
              </div>

              <button
                onClick={() => setShowNotifs(true)}
                className="relative p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md"
                aria-label="Open notifications"
              >
                <Bell className="w-5 h-5" />
                {stats.unread > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 text-[11px] rounded-full bg-red-500 text-white font-semibold grid place-content-center">
                    {stats.unread}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats tiles */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {[
            { id: 'courses', icon: BookOpen, label: 'Courses', value: stats.totalCourses, bar: 100, color: 'bg-blue-500' },
            { id: 'students', icon: Users, label: 'Students', value: stats.totalStudents, bar: 100, color: 'bg-green-500' },
            { id: 'pending', icon: ClipboardList, label: 'Pending Eval', value: stats.pendingEvaluations, bar: Math.min(100, (stats.pendingEvaluations/ (stats.totalStudents||1))*100), color: 'bg-orange-500' },
            { id: 'attendance', icon: Activity, label: 'Avg Attendance', value: `${stats.avgAttendance}%`, bar: stats.avgAttendance, color: 'bg-emerald-500' },
            { id: 'syllabus', icon: BarChart2, label: 'Syllabus Avg', value: `${stats.avgSyllabus}%`, bar: stats.avgSyllabus, color: 'bg-indigo-500' },
            { id: 'today', icon: Calendar, label: 'Today’s Classes', value: stats.todayClasses, bar: Math.min(100, stats.todayClasses*20), color: 'bg-purple-500' },
          ].map(t => (
            <div key={t.id} className="rounded-xl border border-gray-200/60 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg grid place-content-center bg-gray-100 dark:bg-gray-800">
                  <t.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </div>
                <div>
                  <div className="text-xl font-semibold">{t.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{t.label}</div>
                </div>
              </div>
              <div className="mt-3 h-2 rounded bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div className={`h-2 ${t.color}`} style={{ width: `${t.bar}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
          <div className="sticky top-0 z-10 bg-white/85 dark:bg-gray-900/85 rounded-t-2xl">
            <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-gray-800 px-3 py-2">
              {[
                { id: 'overview', label: 'Overview', icon: <BarChart2 className="w-4 h-4" /> },
                { id: 'courses', label: 'My Courses', icon: <BookOpen className="w-4 h-4" /> },
                { id: 'students', label: 'Students', icon: <Users className="w-4 h-4" /> },
                { id: 'assignments', label: 'Assignments', icon: <ClipboardList className="w-4 h-4" /> },
                { id: 'research', label: 'Research', icon: <FlaskConical className="w-4 h-4" /> },
                { id: 'schedule', label: 'Schedule', icon: <Calendar className="w-4 h-4" /> },
                { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
              ].map(ti => {
                const active = tab === ti.id;
                return (
                  <button
                    key={ti.id}
                    onClick={() => setTab(ti.id as any)}
                    className={`relative px-3 py-2 rounded-md text-sm flex items-center gap-2 transition
                      ${active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
                  >
                    {ti.icon}<span className="hidden sm:inline">{ti.label}</span>
                    {active && <span className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {/* OVERVIEW */}
            {tab === 'overview' && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Left: Today + Triage */}
                <div className="xl:col-span-2 space-y-6">
                  <div className="rounded-xl border border-gray-200/60 dark:border-gray-800 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold flex items-center gap-2"><Clock className="w-4 h-4" /> Today’s Classes</h3>
                      <span className="text-xs text-gray-500">{stats.todayClasses} classes</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {todaysClasses.map(s => (
                        <div key={s.id} className="rounded-lg border border-blue-200/60 dark:border-blue-900/30 bg-blue-50/60 dark:bg-blue-900/10 p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-medium text-blue-900 dark:text-blue-200">{s.courseName}</div>
                              <div className="text-xs text-blue-700 dark:text-blue-300">{s.courseCode} • {s.time}</div>
                              <div className="text-[11px] text-blue-700/80 dark:text-blue-300/80 mt-1"><MapPin className="inline w-3 h-3 mr-1" />{s.venue} • {s.students} students</div>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[11px] ${classTypeChip(s.type)}`}>{s.type}</span>
                          </div>
                          <div className="mt-3 flex items-center justify-end">
                            <button className="px-3 py-1.5 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700">Open</button>
                          </div>
                        </div>
                      ))}
                      {todaysClasses.length === 0 && (
                        <div className="col-span-full p-8 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-center text-gray-500">
                          No classes today
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-200/60 dark:border-gray-800 p-5">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><ClipboardList className="w-4 h-4" /> Pending Evaluations</h3>
                    <div className="space-y-3">
                      {ASSIGNMENTS
                        .filter(a => a.submitted > a.evaluated)
                        .sort((a, b) => new Date(a.dueISO).getTime() - new Date(b.dueISO).getTime())
                        .slice(0, 5)
                        .map(a => {
                          const pending = a.submitted - a.evaluated;
                          const evalPct = Math.round((a.evaluated / Math.max(1, a.submitted)) * 100);
                          const dueIn = daysUntil(a.dueISO);
                          const dueChip = dueIn < 0 ? 'Overdue' : dueIn === 0 ? 'Today' : `${dueIn} days`;
                          return (
                            <div key={a.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="font-medium">{a.title}</div>
                                  <div className="text-xs text-gray-600">{a.courseName} • Max {a.maxMarks}</div>
                                  <div className="mt-2 w-full h-2 rounded bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                    <div className="h-2 bg-green-500" style={{ width: `${evalPct}%` }} />
                                  </div>
                                  <div className="text-[11px] text-gray-500 mt-1">
                                    {a.evaluated}/{a.submitted} evaluated • {pending} pending
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <div className={`px-2 py-0.5 rounded text-[11px] inline-block ${statusChip(a.status)}`}>{a.status}</div>
                                  <div className="mt-2 text-[11px] text-gray-600">{fmtDate(a.dueISO)} • {dueChip}</div>
                                  <button className="mt-2 px-3 py-1.5 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700">Start</button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* Right: Quick Actions + Notifs */}
                <div className="space-y-6">
                  <div className="rounded-xl border border-gray-200/60 dark:border-gray-800 p-5">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><Target className="w-4 h-4" /> Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 text-sm font-medium">
                        <div className="flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> Assignment</div>
                      </button>
                      <button className="p-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 text-sm font-medium">
                        <div className="flex items-center justify-center gap-2"><UserCheck className="w-4 h-4" /> Attendance</div>
                      </button>
                      <button className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-700 hover:to-fuchsia-700 text-sm font-medium">
                        <div className="flex items-center justify-center gap-2"><FileText className="w-4 h-4" /> Reports</div>
                      </button>
                      <button className="p-3 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700 text-sm font-medium">
                        <div className="flex items-center justify-center gap-2"><Upload className="w-4 h-4" /> Materials</div>
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-200/60 dark:border-gray-800 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold flex items-center gap-2"><Bell className="w-4 h-4" /> Notifications</h3>
                      <button onClick={markAllRead} className="text-xs text-blue-600 hover:underline">Mark all read</button>
                    </div>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {notifications.slice(0,5).map(n => (
                        <button
                          key={n.id}
                          onClick={() => markOneRead(n.id)}
                          className={`w-full text-left p-3 rounded-lg border transition ${notifStyle(n.type)} ${!n.read ? '' : 'opacity-80'}`}
                        >
                          <div className="flex items-start gap-2">
                            {notifIcon(n.type)}
                            <div className="min-w-0">
                              <div className="text-sm font-medium truncate">{n.title}</div>
                              <div className="text-xs text-gray-600 line-clamp-2">{n.message}</div>
                              <div className="mt-1 text-[11px] text-gray-500">{fmtDate(n.dateISO)}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* COURSES */}
            {tab === 'courses' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {COURSES.map(c => (
                  <div key={c.id} className="rounded-2xl border border-gray-200/60 dark:border-gray-800 p-6">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0">
                        <div className="text-lg font-semibold truncate">{c.name}</div>
                        <div className="text-sm text-gray-600">{c.code} • Sem {c.semester} • {c.credits} Credits</div>
                        <div className="text-xs text-gray-500">{c.enrolledStudents}/{c.maxStudents} enrolled</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[11px] ${classTypeChip(c.classType)}`}>{c.classType}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 my-4">
                      <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-center">
                        <div className="text-base font-semibold text-orange-700 dark:text-orange-300">{c.pendingEvaluations}</div>
                        <div className="text-xs text-gray-600">Pending Eval</div>
                      </div>
                      <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-center">
                        <div className={`text-base font-semibold ${attendanceColor(c.avgAttendance)}`}>{c.avgAttendance}%</div>
                        <div className="text-xs text-gray-600">Attendance</div>
                      </div>
                      <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-center">
                        <div className="text-base font-semibold text-indigo-700 dark:text-indigo-300">{c.syllabusCompleted}%</div>
                        <div className="text-xs text-gray-600">Syllabus</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {c.schedule.map((s, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs">
                          {s.day} • {s.time} • {s.venue}
                        </span>
                      ))}
                    </div>

                    {c.nextClassISO && (
                      <div className="mt-3 text-xs text-blue-700 dark:text-blue-300">
                        Next: {fmtDate(c.nextClassISO)} • {fmtTime(c.nextClassISO)}
                      </div>
                    )}

                    <div className="mt-4 flex gap-2">
                      <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">Manage</button>
                      <button className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-700">Students</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* STUDENTS */}
            {tab === 'students' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                  <div className="relative w-full md:w-80">
                    <input
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      placeholder="Search name or roll..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                    <BarChart2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedCourse}
                      onChange={e => setSelectedCourse(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    >
                      <option value="all">All Courses</option>
                      {COURSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredStudents.map(s => (
                    <div key={s.id} className="rounded-2xl border border-gray-200/60 dark:border-gray-800 p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold grid place-content-center">
                            {s.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{s.name}</div>
                            <div className="text-sm text-gray-600 truncate">{s.roll}</div>
                            <div className="text-xs text-gray-500">Sem {s.sem} • Section {s.section}</div>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          s.performance === 'excellent' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                          s.performance === 'good' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                          s.performance === 'average' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {s.performance}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20 text-center">
                          <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">{s.cgpa}</div>
                          <div className="text-[11px] text-gray-600">CGPA</div>
                        </div>
                        <div className="p-2 rounded bg-green-50 dark:bg-green-900/20 text-center">
                          <div className={`text-sm font-semibold ${attendanceColor(s.attendancePct)}`}>{s.attendancePct.toFixed(1)}%</div>
                          <div className="text-[11px] text-gray-600">Attend</div>
                        </div>
                        <div className="p-2 rounded bg-purple-50 dark:bg-purple-900/20 text-center">
                          <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">{s.avgMarksPct.toFixed(1)}%</div>
                          <div className="text-[11px] text-gray-600">Avg</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">Profile</button>
                        <button className="flex-1 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-700">Contact</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ASSIGNMENTS */}
            {tab === 'assignments' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2"><ClipboardList className="w-4 h-4" /> Assignment Management</h3>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedCourse}
                      onChange={e => setSelectedCourse(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    >
                      <option value="all">All Courses</option>
                      {COURSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <button className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"><Plus className="w-4 h-4 inline mr-1" />Create</button>
                  </div>
                </div>

                <div className="space-y-6">
                  {filteredAssignments.map(a => {
                    const submissionPct = Math.round((a.submitted / a.totalStudents) * 100);
                    const evalPct = a.submitted ? Math.round((a.evaluated / a.submitted) * 100) : 0;
                    const dueIn = daysUntil(a.dueISO);
                    return (
                      <div key={a.id} className="rounded-2xl border border-gray-200/60 dark:border-gray-800 p-6">
                        <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="text-lg font-semibold truncate">{a.title}</div>
                                <div className="text-sm text-gray-600">{a.courseName} • Max {a.maxMarks}</div>
                                <div className="text-xs text-gray-500">Due: {fmtDate(a.dueISO)} ({dueIn < 0 ? 'Overdue' : dueIn === 0 ? 'Today' : `${dueIn} days`})</div>
                              </div>
                              <div className="text-right shrink-0">
                                <div className={`px-2 py-0.5 rounded text-[11px] ${statusChip(a.status)}`}>{a.status}</div>
                                <div className="mt-1 px-2 py-0.5 rounded text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{a.type}</div>
                              </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                              <div>
                                <div className="text-[11px] text-gray-500 mb-1">Submissions ({a.submitted}/{a.totalStudents})</div>
                                <div className="w-full h-2 rounded bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                  <div className="h-2 bg-blue-500" style={{ width: `${submissionPct}%` }} />
                                </div>
                              </div>
                              <div>
                                <div className="text-[11px] text-gray-500 mb-1">Evaluation ({a.evaluated}/{a.submitted})</div>
                                <div className="w-full h-2 rounded bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                  <div className="h-2 bg-green-500" style={{ width: `${evalPct}%` }} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex xl:flex-col gap-2">
                            <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">Evaluate</button>
                            <button className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-700">Submissions</button>
                            <button className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-700">Export</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* RESEARCH */}
            {tab === 'research' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {RESEARCH.map(r => (
                  <div key={r.id} className="rounded-2xl border border-gray-200/60 dark:border-gray-800 p-6">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0">
                        <div className="text-lg font-semibold truncate">{r.title}</div>
                        <div className="text-sm text-gray-600 capitalize">{r.type}</div>
                        <div className="text-xs text-gray-500">Duration: {fmtDate(r.startISO)} - {r.endISO ? fmtDate(r.endISO) : 'Ongoing'}</div>
                        {typeof r.funding === 'number' && (
                          <div className="text-xs text-gray-500">Funding: ₹ {r.funding.toLocaleString('en-IN')}</div>
                        )}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        r.status === 'ongoing' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                        r.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                        r.status === 'submitted' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                      }`}>{r.status}</span>
                    </div>

                    <div className="mt-3 text-xs">
                      {r.collaborators.length > 0 && (
                        <div className="mb-1">
                          <span className="text-gray-600">Collaborators:</span>{' '}
                          {r.collaborators.join(', ')}
                        </div>
                      )}
                      {r.students.length > 0 && (
                        <div>
                          <span className="text-gray-600">Students:</span>{' '}
                          {r.students.join(', ')}
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SCHEDULE */}
            {tab === 'schedule' && (
              <div>
                <div className="mb-4 rounded-lg border border-gray-200/60 dark:border-gray-800 p-4 flex items-center justify-between">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Weekly Teaching Load:{' '}
                    <span className="font-semibold">
                      {Math.round(TIMETABLE.reduce((s, t) => s + t.durationMins, 0) / 60)} hrs
                    </span>
                  </div>
                                    <div className="flex gap-2 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">Lecture</span>
                    <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">Practical</span>
                    <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">Tutorial</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                  {WEEK_DAYS.map(day => (
                    <div key={day} className="rounded-2xl border border-gray-200/60 dark:border-gray-800 p-4">
                      <h4 className="font-semibold text-center mb-3 pb-2 border-b border-gray-200 dark:border-gray-800">
                        {day}
                      </h4>
                      <div className="space-y-3">
                        {TIMETABLE
                          .filter(s => s.day === day)
                          .sort((a, b) => a.time.localeCompare(b.time))
                          .map(s => (
                            <div key={s.id} className={`p-3 rounded-lg border transition ${
                              s.type === 'lecture'
                                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/40'
                                : s.type === 'practical'
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/40'
                                : 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-900/40'
                            }`}>
                              <div className="text-sm font-medium">{s.courseCode}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">{s.time}</div>
                              <div className="text-xs text-gray-500">{s.venue}</div>
                              <div className="text-xs mt-1">
                                <span className={`px-2 py-0.5 rounded ${classTypeChip(s.type)}`}>{s.type}</span>
                              </div>
                              <div className="text-[11px] text-gray-500 mt-1">{s.students} students</div>
                            </div>
                          ))}
                        {TIMETABLE.filter(s => s.day === day).length === 0 && (
                          <div className="text-center text-gray-500 py-8">
                            <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                            <p className="text-sm">No classes</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROFILE */}
            {tab === 'profile' && (
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Profile Card */}
                <div className="xl:col-span-1">
                  <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800 p-6 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-2xl grid place-content-center mx-auto mb-4">
                      {FACULTY.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </div>
                    <h4 className="text-xl font-semibold">{FACULTY.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{FACULTY.role}</p>
                    <p className="text-sm text-gray-500">ID: {FACULTY.empId}</p>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div className="text-lg font-semibold text-blue-700 dark:text-blue-300">{COURSES.length}</div>
                        <div className="text-xs text-gray-600">Courses</div>
                      </div>
                      <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <div className="text-lg font-semibold text-green-700 dark:text-green-300">
                          {COURSES.reduce((s, c) => s + c.enrolledStudents, 0)}
                        </div>
                        <div className="text-xs text-gray-600">Students</div>
                      </div>
                    </div>

                    <button className="mt-5 w-full px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">
                      Edit Profile
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="xl:col-span-3 space-y-6">
                  <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800 p-6">
                    <h5 className="text-lg font-semibold mb-4">Personal & Academic</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div><div className="text-xs text-gray-500">Department</div><div className="font-medium">{FACULTY.dept}</div></div>
                      <div><div className="text-xs text-gray-500">Experience</div><div className="font-medium">{FACULTY.exp}</div></div>
                      <div><div className="text-xs text-gray-500">Email</div><div className="font-medium">priya.sharma@college.edu</div></div>
                      <div><div className="text-xs text-gray-500">Phone</div><div className="font-medium">+91-9876543210</div></div>
                      <div><div className="text-xs text-gray-500">Office</div><div className="font-medium">Block A, Room 305</div></div>
                      <div>
                        <div className="text-xs text-gray-500">Specialization</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {FACULTY.specs.map(s => (
                            <span key={s} className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800 p-6">
                    <h5 className="text-lg font-semibold mb-4">Teaching & Research Stats</h5>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-center">
                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{COURSES.length}</div>
                        <div className="text-xs text-gray-600">Courses Teaching</div>
                      </div>
                      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-center">
                        <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                          {COURSES.reduce((s, c) => s + c.enrolledStudents, 0)}
                        </div>
                        <div className="text-xs text-gray-600">Students Taught</div>
                      </div>
                      <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-center">
                        <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                          {RESEARCH.filter(r => r.type === 'publication').length}
                        </div>
                        <div className="text-xs text-gray-600">Publications</div>
                      </div>
                      <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-center">
                        <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                          {RESEARCH.filter(r => r.status === 'ongoing').length}
                        </div>
                        <div className="text-xs text-gray-600">Active Research</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Drawer */}
      {showNotifs && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowNotifs(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <div className="flex items-center gap-2">
                <button onClick={markAllRead} className="text-sm text-blue-600 hover:underline">Mark all read</button>
                <button onClick={() => setShowNotifs(false)} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100%-64px)] space-y-3">
              {notifications.map(n => (
                <div key={n.id} className={`p-3 rounded-lg border ${notifStyle(n.type)} ${n.read ? 'opacity-80' : ''}`}>
                  <div className="flex items-start gap-2">
                    {notifIcon(n.type)}
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{n.title}</div>
                      <div className="text-xs text-gray-600 line-clamp-2">{n.message}</div>
                      <div className="mt-1 text-[11px] text-gray-500">{fmtDate(n.dateISO)}</div>
                      {!n.read && (
                        <button
                          onClick={() => markOneRead(n.id)}
                          className="mt-2 px-2 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="text-sm text-gray-500">No notifications</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyAcademicDashboard;

