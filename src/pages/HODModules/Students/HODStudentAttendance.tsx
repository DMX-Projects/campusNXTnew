//HODStudentAttendance
import React, { useMemo, useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  GraduationCap,
  Filter,
  Search,
  Download,
  Save,
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  Building,
  User,
  Hash,
  CalendarDays,
  TrendingUp,
  BarChart3,
  Eye,
  Edit,
  Plus,
  FileSpreadsheet,
} from "lucide-react";

type AttendanceStatus = "Present" | "Absent" | "Leave";

type Student = {
  rollNo: string;
  name: string;
  year: number;
  semester: number;
  section: string;
  course: string;
  department: string;
  email: string;
  phone: string;
  guardian: string;
  guardianPhone: string;
};

type AttendanceRow = {
  id: string;
  rollNo: string;
  name: string;
  course: string;
  date: string;
  status: AttendanceStatus;
  editable: boolean;
  markedBy?: string;
  markedAt?: string;
  notes?: string;
};

const HOD_DEPARTMENT = "Computer Science";
const HOD_HANDLES_COURSES = ["Operating Systems", "Machine Learning", "Database Systems", "Data Structures"];

const STUDENTS: Student[] = [
  {
    rollNo: "CS21U001",
    name: "Rohit Kumar",
    year: 3,
    semester: 5,
    section: "A",
    course: "Machine Learning",
    department: "Computer Science",
    email: "rohit.cs21u001@bestcollege.edu",
    phone: "+91-98765-11111",
    guardian: "Raj Kumar",
    guardianPhone: "+91-98765-11112",
  },
  {
    rollNo: "CS21U002",
    name: "Priya Singh",
    year: 3,
    semester: 5,
    section: "A",
    course: "Operating Systems",
    department: "Computer Science",
    email: "priya.cs21u002@bestcollege.edu",
    phone: "+91-98765-22222",
    guardian: "Rajesh Singh",
    guardianPhone: "+91-98765-22223",
  },
  {
    rollNo: "CS21U003",
    name: "Akash Mehta",
    year: 3,
    semester: 5,
    section: "B",
    course: "Database Systems",
    department: "Computer Science",
    email: "akash.cs21u003@bestcollege.edu",
    phone: "+91-98765-33333",
    guardian: "Suresh Mehta",
    guardianPhone: "+91-98765-33334",
  },
  {
    rollNo: "CS22U004",
    name: "Sneha Patel",
    year: 2,
    semester: 3,
    section: "A",
    course: "Data Structures",
    department: "Computer Science",
    email: "sneha.cs22u004@bestcollege.edu",
    phone: "+91-98765-44444",
    guardian: "Mukesh Patel",
    guardianPhone: "+91-98765-44445",
  },
  {
    rollNo: "CS22U005",
    name: "Arjun Sharma",
    year: 2,
    semester: 3,
    section: "B",
    course: "Operating Systems",
    department: "Computer Science",
    email: "arjun.cs22u005@bestcollege.edu",
    phone: "+91-98765-55555",
    guardian: "Vikram Sharma",
    guardianPhone: "+91-98765-55556",
  },
  {
    rollNo: "CS23U006",
    name: "Kavya Reddy",
    year: 1,
    semester: 1,
    section: "A",
    course: "Data Structures",
    department: "Computer Science",
    email: "kavya.cs23u006@bestcollege.edu",
    phone: "+91-98765-66666",
    guardian: "Krishna Reddy",
    guardianPhone: "+91-98765-66667",
  },
];

const INITIAL_ATTENDANCE: AttendanceRow[] = [
  {
    id: "A1",
    rollNo: "CS21U001",
    name: "Rohit Kumar",
    course: "Machine Learning",
    date: "2025-09-18",
    status: "Present",
    editable: true,
    markedBy: "Dr. Ananya Sharma",
    markedAt: "09:15 AM",
  },
  {
    id: "A2",
    rollNo: "CS21U002",
    name: "Priya Singh",
    course: "Operating Systems",
    date: "2025-09-18",
    status: "Absent",
    editable: true,
    markedBy: "Prof. Rahul Verma",
    markedAt: "10:30 AM",
    notes: "Informed absence - medical appointment",
  },
  {
    id: "A3",
    rollNo: "CS21U003",
    name: "Akash Mehta",
    course: "Database Systems",
    date: "2025-09-18",
    status: "Present",
    editable: true,
    markedBy: "Dr. Karthik Rao",
    markedAt: "11:45 AM",
  },
  {
    id: "A4",
    rollNo: "CS22U004",
    name: "Sneha Patel",
    course: "Data Structures",
    date: "2025-09-18",
    status: "Leave",
    editable: true,
    markedBy: "Prof. Arjun Singh",
    markedAt: "08:00 AM",
    notes: "Pre-approved leave for family function",
  },
  {
    id: "A5",
    rollNo: "CS22U005",
    name: "Arjun Sharma",
    course: "Operating Systems",
    date: "2025-09-18",
    status: "Present",
    editable: true,
    markedBy: "Prof. Rahul Verma",
    markedAt: "10:30 AM",
  },
  {
    id: "A6",
    rollNo: "CS21U001",
    name: "Rohit Kumar",
    course: "Machine Learning",
    date: "2025-09-17",
    status: "Absent",
    editable: true,
    markedBy: "Dr. Ananya Sharma",
    markedAt: "09:15 AM",
  },
  {
    id: "A7",
    rollNo: "CS23U006",
    name: "Kavya Reddy",
    course: "Data Structures",
    date: "2025-09-18",
    status: "Present",
    editable: true,
    markedBy: "Prof. Arjun Singh",
    markedAt: "08:00 AM",
  },
];

const styles = {
  page: "w-full max-w-full min-h-screen overflow-x-clip bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
  container: "w-full max-w-[1920px] mx-auto p-4 sm:p-6 lg:p-8 xl:p-12",

  // Header
  header: "mb-8",
  headerTitle: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-indigo-600 dark:from-gray-100 dark:to-indigo-400 bg-clip-text text-transparent mb-3",
  headerSubtitle: "text-lg sm:text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 mb-4",
  headerActions: "flex flex-col sm:flex-row gap-3",

  // Quick Stats
  statsGrid: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mb-8",
  statCard: "group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 p-4 lg:p-6",
  statIcon: "w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-3 lg:mb-4 transition-transform group-hover:scale-110",
  statValue: "text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1",
  statLabel: "text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium",

  // Filters Section
  filtersSection: "rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm p-4 lg:p-6 mb-8",
  filtersHeader: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6",
  filtersTitle: "text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2",
  filtersActions: "flex flex-wrap gap-2",
  filtersGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6",
  filterGroup: "space-y-2",
  filterLabel: "text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2",
  input: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",
  select: "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm",

  // Table Section
  tableSection: "rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm overflow-hidden mb-8",
  tableHeader: "px-4 lg:px-6 py-4 lg:py-5 border-b border-gray-200 dark:border-gray-700 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4",
  tableTitle: "text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2",
  tableActions: "flex flex-wrap gap-2",
  tableContainer: "overflow-x-auto",
  table: "w-full min-w-[1200px]",
  tableHead: "bg-gray-50 dark:bg-gray-800",
  tableRow: "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors",
  th: "px-4 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider",
  td: "px-4 lg:px-6 py-4 text-sm lg:text-base text-gray-900 dark:text-gray-100 align-middle",

  // Status and Action Elements
  statusSelect: "px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none text-sm",
  statusBadge: "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium",
  statusPresent: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
  statusAbsent: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800",
  statusLeave: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800",

  // Buttons
  button: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
  buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm hover:shadow-md",
  buttonSecondary: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 focus:ring-gray-500 border border-gray-200 dark:border-gray-600",
  buttonSuccess: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm hover:shadow-md",
  buttonWarning: "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500 shadow-sm hover:shadow-md",

  // Student Info Display
  studentInfo: "space-y-1",
  studentName: "font-semibold text-gray-900 dark:text-gray-100",
  studentMeta: "text-xs text-gray-600 dark:text-gray-400",
  studentContact: "text-xs text-gray-500 dark:text-gray-500",

  // Course Info
  courseInfo: "space-y-1",
  courseName: "font-medium text-gray-900 dark:text-gray-100",
  courseDetails: "text-xs text-gray-600 dark:text-gray-400",

  // Notes and Additional Info
  notesContainer: "mt-1 text-xs text-gray-600 dark:text-gray-400 italic",
  markedInfo: "text-xs text-gray-500 dark:text-gray-500 mt-1",

  // Empty State
  empty: "text-center py-16",
  emptyIcon: "w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4",
  emptyTitle: "text-xl font-semibold text-gray-400 dark:text-gray-500 mb-2",
  emptyText: "text-gray-500 dark:text-gray-400",

  // Summary Panel
  summaryPanel: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8",
  summaryCard: "rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm p-6",
  summaryTitle: "text-sm font-medium text-gray-600 dark:text-gray-400 mb-2",
  summaryValue: "text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1",
  summaryChange: "text-sm text-gray-600 dark:text-gray-400",
};

export default function HODStudentAttendance() {
  const [year, setYear] = useState<string>("");
  const [sem, setSem] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<AttendanceStatus | "">("");

  const deptStudents = useMemo(
    () => STUDENTS.filter((s) => s.department === HOD_DEPARTMENT),
    []
  );

  const years = useMemo(
    () => Array.from(new Set(deptStudents.map((s) => s.year))).sort(),
    [deptStudents]
  );
  const semesters = useMemo(
    () => Array.from(new Set(deptStudents.map((s) => s.semester))).sort(),
    [deptStudents]
  );
  const sections = useMemo(
    () => Array.from(new Set(deptStudents.map((s) => s.section))).sort(),
    [deptStudents]
  );
  const courses = useMemo(
    () => Array.from(new Set(deptStudents.map((s) => s.course))).sort(),
    [deptStudents]
  );

  const [rows, setRows] = useState<AttendanceRow[]>(
    INITIAL_ATTENDANCE.map((r) => ({
      ...r,
      editable: HOD_HANDLES_COURSES.includes(r.course),
    }))
  );

  const filtered = useMemo(() => {
    return rows
      .filter((r) => deptStudents.some((s) => s.rollNo === r.rollNo))
      .filter((r) =>
        year
          ? deptStudents.find((s) => s.rollNo === r.rollNo)?.year === Number(year)
          : true
      )
      .filter((r) =>
        sem
          ? deptStudents.find((s) => s.rollNo === r.rollNo)?.semester === Number(sem)
          : true
      )
      .filter((r) =>
        section
          ? deptStudents.find((s) => s.rollNo === r.rollNo)?.section === section
          : true
      )
      .filter((r) => (course ? r.course === course : true))
      .filter((r) => (from ? r.date >= from : true))
      .filter((r) => (to ? r.date <= to : true))
      .filter((r) => (statusFilter ? r.status === statusFilter : true))
      .filter((r) =>
        searchTerm
          ? r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.course.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [rows, deptStudents, year, sem, section, course, from, to, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    const present = filtered.filter((r) => r.status === "Present").length;
    const absent = filtered.filter((r) => r.status === "Absent").length;
    const leave = filtered.filter((r) => r.status === "Leave").length;
    const total = filtered.length;
    const attendanceRate = total > 0 ? ((present / total) * 100).toFixed(1) : "0";

    return {
      total,
      present,
      absent,
      leave,
      attendanceRate: parseFloat(attendanceRate),
      editableRecords: filtered.filter((r) => r.editable).length,
    };
  }, [filtered]);

  const updateStatus = (id: string, status: AttendanceStatus) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              markedBy: "HOD - " + HOD_DEPARTMENT,
              markedAt: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : r
      )
    );
  };

  const clearFilters = () => {
    setYear("");
    setSem("");
    setSection("");
    setCourse("");
    setFrom("");
    setTo("");
    setSearchTerm("");
    setStatusFilter("");
  };

  const exportCSV = () => {
    const headers = [
      "Roll No",
      "Name",
      "Course",
      "Date",
      "Status",
      "Year",
      "Semester",
      "Section",
      "Marked By",
      "Marked At",
      "Notes",
    ];
    const csvRows = [headers.join(",")];

    filtered.forEach((record) => {
      const student = deptStudents.find((s) => s.rollNo === record.rollNo);
      const row = [
        record.rollNo,
        record.name,
        record.course,
        record.date,
        record.status,
        student?.year || "",
        student?.semester || "",
        student?.section || "",
        record.markedBy || "",
        record.markedAt || "",
        record.notes || "",
      ];
      csvRows.push(row.join(","));
    });

    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveChanges = () => {
    const editableRecords = filtered.filter((r) => r.editable);
    const payload = editableRecords.map((r) => ({
      id: r.id,
      rollNo: r.rollNo,
      status: r.status,
      date: r.date,
      course: r.course,
    }));

    // Simulate API call
    console.log("Saving attendance changes:", payload);
    alert(`Successfully saved ${payload.length} attendance records!`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Student Attendance Management</h2>
          <p className={styles.headerSubtitle}>
            <Building className="w-6 h-6" />
            {HOD_DEPARTMENT} Department - Comprehensive Attendance Tracking
          </p>
          <div className={styles.headerActions}>
            <button onClick={exportCSV} className={`${styles.button} ${styles.buttonSecondary}`}>
              <Download className="w-5 h-5" />
              Export Report
            </button>
            <button onClick={saveChanges} className={`${styles.button} ${styles.buttonSuccess}`}>
              <Save className="w-5 h-5" />
              Save All Changes
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400`}>
              <Users className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statLabel}>Total Records</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400`}>
              <CheckCircle className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.present}</div>
            <div className={styles.statLabel}>Present</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400`}>
              <XCircle className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.absent}</div>
            <div className={styles.statLabel}>Absent</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400`}>
              <AlertCircle className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.leave}</div>
            <div className={styles.statLabel}>On Leave</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400`}>
              <TrendingUp className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.attendanceRate}%</div>
            <div className={styles.statLabel}>Attendance Rate</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400`}>
              <Edit className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className={styles.statValue}>{stats.editableRecords}</div>
            <div className={styles.statLabel}>Editable</div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filtersSection}>
          <div className={styles.filtersHeader}>
            <h2 className={styles.filtersTitle}>
              <Filter className="w-6 h-6" />
              Filter & Search
            </h2>
            <div className={styles.filtersActions}>
              <button onClick={clearFilters} className={`${styles.button} ${styles.buttonSecondary}`}>
                <RotateCcw className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>

          <div className={styles.filtersGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <Search className="w-4 h-4" />
                Search
              </label>
              <input
                className={styles.input}
                placeholder="Name, Roll No, Course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <GraduationCap className="w-4 h-4" />
                Year
              </label>
              <select className={styles.select} value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">All Years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    Year {y}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <Hash className="w-4 h-4" />
                Semester
              </label>
              <select className={styles.select} value={sem} onChange={(e) => setSem(e.target.value)}>
                <option value="">All Semesters</option>
                {semesters.map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <Users className="w-4 h-4" />
                Section
              </label>
              <select className={styles.select} value={section} onChange={(e) => setSection(e.target.value)}>
                <option value="">All Sections</option>
                {sections.map((s) => (
                  <option key={s} value={s}>
                    Section {s}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <BookOpen className="w-4 h-4" />
                Course
              </label>
              <select className={styles.select} value={course} onChange={(e) => setCourse(e.target.value)}>
                <option value="">All Courses</option>
                {courses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <AlertCircle className="w-4 h-4" />
                Status
              </label>
              <select
                className={styles.select}
                value={statusFilter}
                onChange={(e) => setStatusFilter((e.target.value as AttendanceStatus) || "")}
              >
                <option value="">All Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Leave">On Leave</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <Calendar className="w-4 h-4" />
                From Date
              </label>
              <input
                className={styles.input}
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <CalendarDays className="w-4 h-4" />
                To Date
              </label>
              <input
                className={styles.input}
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>
              <BarChart3 className="w-6 h-6" />
              Attendance Records ({filtered.length})
            </h2>
            <div className={styles.tableActions}>
              <button className={`${styles.button} ${styles.buttonWarning}`}>
                <FileSpreadsheet className="w-4 h-4" />
                Bulk Edit
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <Users className={styles.emptyIcon} />
              <h3 className={styles.emptyTitle}>No Records Found</h3>
              <p className={styles.emptyText}>
                Try adjusting your filters or search terms to find attendance records.
              </p>
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead className={styles.tableHead}>
                  <tr>
                    <th className={styles.th}>Student Details</th>
                    <th className={styles.th}>Course Information</th>
                    <th className={styles.th}>Date</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th}>Marked By</th>
                    <th className={styles.th}>Notes</th>
                    <th className={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((record) => {
                    const student = deptStudents.find((s) => s.rollNo === record.rollNo);
                    return (
                      <tr key={record.id} className={styles.tableRow}>
                        <td className={styles.td}>
                          <div className={styles.studentInfo}>
                            <div className={styles.studentName}>{record.name}</div>
                            <div className={styles.studentMeta}>
                              {record.rollNo} • Year {student?.year} • Sem {student?.semester} • Sec {student?.section}
                            </div>
                            <div className={styles.studentContact}>
                              {student?.email}
                            </div>
                          </div>
                        </td>

                        <td className={styles.td}>
                          <div className={styles.courseInfo}>
                            <div className={styles.courseName}>{record.course}</div>
                            <div className={styles.courseDetails}>
                              {HOD_HANDLES_COURSES.includes(record.course) ? "✓ Editable" : "View Only"}
                            </div>
                          </div>
                        </td>

                        <td className={styles.td}>
                          <div>
                            <div className="font-medium">
                              {new Date(record.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              {new Date(record.date).toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </div>
                          </div>
                        </td>

                        <td className={styles.td}>
                          {record.editable ? (
                            <select
                              className={styles.statusSelect}
                              value={record.status}
                              onChange={(e) => updateStatus(record.id, e.target.value as AttendanceStatus)}
                            >
                              <option value="Present">Present</option>
                              <option value="Absent">Absent</option>
                              <option value="Leave">Leave</option>
                            </select>
                          ) : (
                            <span
                              className={`${styles.statusBadge} ${
                                record.status === "Present"
                                  ? styles.statusPresent
                                  : record.status === "Absent"
                                  ? styles.statusAbsent
                                  : styles.statusLeave
                              }`}
                            >
                              {record.status === "Present" && <CheckCircle className="w-3 h-3" />}
                              {record.status === "Absent" && <XCircle className="w-3 h-3" />}
                              {record.status === "Leave" && <AlertCircle className="w-3 h-3" />}
                              {record.status}
                            </span>
                          )}
                        </td>

                        <td className={styles.td}>
                          <div>
                            <div className="text-sm font-medium">{record.markedBy || "-"}</div>
                            <div className={styles.markedInfo}>{record.markedAt || "-"}</div>
                          </div>
                        </td>

                        <td className={styles.td}>
                          <div className={styles.notesContainer}>
                            {record.notes || "No notes"}
                          </div>
                        </td>

                        <td className={styles.td}>
                          <div className="flex gap-1">
                            <button
                              className={`${styles.button} ${styles.buttonSecondary} px-3 py-2`}
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {record.editable && (
                              <button
                                className={`${styles.button} ${styles.buttonSecondary} px-3 py-2`}
                                title="Add Note"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
