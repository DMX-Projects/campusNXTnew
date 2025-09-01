 // AcademicDashboardPage.tsx
import React, { useMemo, useState, useCallback } from "react";
import {
  Calendar,
  BookOpen,
  Sun,
  Search,
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type ProgramType = "Full-Time" | "Part-Time" | "Research" | "Diploma";

interface CalendarEntry {
  id: string;
  university: string;
  academicYear: string;
  course: string;
  programType: ProgramType;
  programName: string;
  admittedBatch: string;
  branch: string;
  year: number;
  semester: number;
  description: string;
  from: string; // YYYY-MM-DD
  to: string; // YYYY-MM-DD
  workingDays: number;
}

interface ExamEntry {
  id: string;
  university: string;
  semester: number;
  programName: string;
  examType: "Mid-Sem" | "End-Sem" | "External" | "Practical";
  from: string; // YYYY-MM-DD
  to?: string; // optional
  notes?: string;
}

interface VacationEntry {
  id: string;
  university: string;
  name: string;
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
  notes?: string;
}

// ---------- Dummy Data ----------
const CALENDAR_DUMMY: CalendarEntry[] = [
  {
    id: "C1",
    university: "Mumbai University",
    academicYear: "2024-2025",
    course: "B.Tech",
    programType: "Full-Time",
    programName: "Computer Science",
    admittedBatch: "2022",
    branch: "CSE",
    year: 3,
    semester: 6,
    description: "Spring semester - labs & electives",
    from: "2025-01-10",
    to: "2025-05-25",
    workingDays: 110,
  },
  {
    id: "C2",
    university: "Delhi University",
    academicYear: "2024-2025",
    course: "MBA",
    programType: "Full-Time",
    programName: "Business Analytics",
    admittedBatch: "2023",
    branch: "Management",
    year: 1,
    semester: 1,
    description: "Orientation and foundation modules",
    from: "2024-08-01",
    to: "2024-12-20",
    workingDays: 100,
  },
  {
    id: "C3",
    university: "IIT Kharagpur",
    academicYear: "2023-2024",
    course: "M.Tech",
    programType: "Full-Time",
    programName: "Electrical Engg.",
    admittedBatch: "2022",
    branch: "EEE",
    year: 2,
    semester: 4,
    description: "Project & thesis emphasis",
    from: "2024-01-05",
    to: "2024-05-30",
    workingDays: 102,
  },
  {
    id: "C4",
    university: "Anna University",
    academicYear: "2024-2025",
    course: "M.Tech",
    programType: "Full-Time",
    programName: "Mechanical Engg.",
    admittedBatch: "2023",
    branch: "Mech",
    year: 2,
    semester: 3,
    description: "Lab intensive semester",
    from: "2025-02-01",
    to: "2025-06-10",
    workingDays: 98,
  },
  {
    id: "C5",
    university: "JNU",
    academicYear: "2023-2024",
    course: "MA",
    programType: "Full-Time",
    programName: "Political Science",
    admittedBatch: "2022",
    branch: "Humanities",
    year: 2,
    semester: 4,
    description: "Seminars & workshops",
    from: "2024-08-15",
    to: "2024-12-15",
    workingDays: 92,
  },
  {
    id: "C6",
    university: "Pune University",
    academicYear: "2024-2025",
    course: "B.Sc",
    programType: "Part-Time",
    programName: "Data Science",
    admittedBatch: "2021",
    branch: "AI & ML",
    year: 4,
    semester: 8,
    description: "Final semester, thesis & viva",
    from: "2025-01-15",
    to: "2025-05-20",
    workingDays: 105,
  },
];

const EXAM_DUMMY: ExamEntry[] = [
  {
    id: "E1",
    university: "Mumbai University",
    semester: 6,
    programName: "Computer Science",
    examType: "Mid-Sem",
    from: "2025-03-01",
    to: "2025-03-07",
    notes: "Theory midterm",
  },
  {
    id: "E2",
    university: "Mumbai University",
    semester: 6,
    programName: "Computer Science",
    examType: "External",
    from: "2025-05-10",
    to: "2025-05-20",
    notes: "End semester external evaluation",
  },
  {
    id: "E3",
    university: "Delhi University",
    semester: 1,
    programName: "Business Analytics",
    examType: "Mid-Sem",
    from: "2024-10-15",
  },
  {
    id: "E4",
    university: "IIT Kharagpur",
    semester: 4,
    programName: "Electrical Engg.",
    examType: "Practical",
    from: "2024-05-18",
    to: "2024-05-22",
  },
];

const VACATION_DUMMY: VacationEntry[] = [
  {
    id: "V1",
    university: "Mumbai University",
    name: "Summer Vacation",
    start: "2025-05-26",
    end: "2025-07-05",
    notes: "Summer break after exams",
  },
  {
    id: "V2",
    university: "Delhi University",
    name: "Winter Break",
    start: "2024-12-20",
    end: "2025-01-05",
  },
  {
    id: "V3",
    university: "IIT Kharagpur",
    name: "Diwali Holidays",
    start: "2024-10-22",
    end: "2024-10-29",
  },
];

// ---------- Helpers ----------
const parseDate = (s: string) => {
  // s in YYYY-MM-DD
  const d = new Date(s + "T00:00:00");
  return d;
};

const daysBetweenInclusive = (start: string, end: string) => {
  const s = parseDate(start);
  const e = parseDate(end);
  const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return diff > 0 ? diff : 0;
};

const downloadCSV = (filename: string, rows: string[][]) => {
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// ---------- Component ----------
export default function AcademicDashboardPage(): JSX.Element {
  // UI state
  const [calendarSearch, setCalendarSearch] = useState("");
  const [examSearch, setExamSearch] = useState("");
  const [vacSearch, setVacSearch] = useState("");

  const [calPage, setCalPage] = useState(1);
  const CAL_PAGE_SIZE = 5;

  const [openCalendar, setOpenCalendar] = useState(true);
  const [openExams, setOpenExams] = useState(true);
  const [openVacations, setOpenVacations] = useState(true);
  const [openAnalytics, setOpenAnalytics] = useState(true);

  // Data sources (in real app fetch from API)
  const calendar = CALENDAR_DUMMY;
  const exams = EXAM_DUMMY;
  const vacations = VACATION_DUMMY;

  // ---------- Calendar filtering + pagination ----------
  const filteredCalendar = useMemo(() => {
    if (!calendarSearch.trim()) return calendar;
    const q = calendarSearch.toLowerCase();
    return calendar.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(q))
    );
  }, [calendar, calendarSearch]);

  const calTotalPages = Math.max(1, Math.ceil(filteredCalendar.length / CAL_PAGE_SIZE));
  const calPageSafe = Math.min(Math.max(1, calPage), calTotalPages);

  const calendarPageData = useMemo(() => {
    const start = (calPageSafe - 1) * CAL_PAGE_SIZE;
    return filteredCalendar.slice(start, start + CAL_PAGE_SIZE);
  }, [filteredCalendar, calPageSafe]);

  // ---------- Exams filtering ----------
  const filteredExams = useMemo(() => {
    if (!examSearch.trim()) return exams;
    const q = examSearch.toLowerCase();
    return exams.filter((e) =>
      [e.university, e.programName, e.examType, e.from, e.to || ""]
        .some((f) => String(f).toLowerCase().includes(q))
    );
  }, [exams, examSearch]);

  // ---------- Vacations filtering ----------
  const filteredVacs = useMemo(() => {
    if (!vacSearch.trim()) return vacations;
    const q = vacSearch.toLowerCase();
    return vacations.filter((v) =>
      [v.university, v.name, v.start, v.end, v.notes || ""]
        .some((f) => String(f).toLowerCase().includes(q))
    );
  }, [vacations, vacSearch]);

  // ---------- Analytics datasets ----------
  // Working days by semester (aggregate)
  const workingDaysBySemester = useMemo(() => {
    const map = new Map<number, number>();
    for (const c of calendar) {
      map.set(c.semester, (map.get(c.semester) || 0) + c.workingDays);
    }
    return Array.from(map.entries())
      .map(([semester, workingDays]) => ({ semester: `Sem ${semester}`, workingDays }))
      .sort((a, b) => (parseInt(a.semester.split(" ")[1]) - parseInt(b.semester.split(" ")[1])));
  }, [calendar]);

  // Exam type distribution
  const examTypeDistribution = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of exams) {
      map.set(e.examType, (map.get(e.examType) || 0) + 1);
    }
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [exams]);

  // Vacation durations
  const vacationDurations = useMemo(() => {
    return vacations.map((v) => ({ name: v.name, days: daysBetweenInclusive(v.start, v.end) }));
  }, [vacations]);

  // ---------- Actions ----------
  const exportCalendarCSV = useCallback(() => {
    const rows = [
      [
        "University",
        "Academic Year",
        "Course",
        "Program Type",
        "Program Name",
        "Batch",
        "Branch",
        "Year",
        "Semester",
        "Description",
        "From",
        "To",
        "Working Days",
      ],
      ...calendar.map((c) => [
        c.university,
        c.academicYear,
        c.course,
        c.programType,
        c.programName,
        c.admittedBatch,
        c.branch,
        c.year,
        c.semester,
        c.description,
        c.from,
        c.to,
        c.workingDays,
      ]),
    ];
    downloadCSV("academic_calendar.csv", rows);
  }, [calendar]);

  // ---------- Render ----------
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* <header className="flex items-center gap-3">
        <Calendar className="w-7 h-7 text-blue-600" />
        <h1 className="text-2xl font-semibold">Academic Dashboard — Admin</h1>
      </header> */}

      {/* Controls (top) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setOpenCalendar((s) => !s)}
            className="px-3 py-1 bg-white border rounded shadow-sm flex items-center gap-2"
          >
            <BookOpen /> Calendar
            {openCalendar ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setOpenExams((s) => !s)}
            className="px-3 py-1 bg-white border rounded shadow-sm flex items-center gap-2"
          >
            <Calendar /> Exams
            {openExams ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setOpenVacations((s) => !s)}
            className="px-3 py-1 bg-white border rounded shadow-sm flex items-center gap-2"
          >
            <Sun /> Vacations
            {openVacations ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setOpenAnalytics((s) => !s)}
            className="px-3 py-1 bg-white border rounded shadow-sm flex items-center gap-2"
          >
            Analytics
            {openAnalytics ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={exportCalendarCSV}
            className="px-3 py-1 bg-green-600 text-white rounded flex items-center gap-2"
          >
            <Download /> Export Calendar CSV
          </button>
        </div>
      </div>

      {/* ---------- Calendar Section ---------- */}
      <section className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="text-indigo-600 w-5 h-5" />
            <h2 className="text-lg font-medium">Academic Calendar</h2>
            <span className="text-sm text-gray-500">({calendar.length} total rows)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2 text-gray-400" />
              <input
                className="pl-8 pr-3 py-1 border rounded-md w-64"
                placeholder="Search calendar (any field)..."
                value={calendarSearch}
                onChange={(e) => {
                  setCalendarSearch(e.target.value);
                  setCalPage(1);
                }}
              />
            </div>
            <div className="text-sm text-gray-600">Page {calPageSafe} / {calTotalPages}</div>
          </div>
        </div>

        {openCalendar && (
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">University</th>
                    <th className="p-2 border">Academic Year</th>
                    <th className="p-2 border">Course</th>
                    <th className="p-2 border">Program</th>
                    <th className="p-2 border">Batch</th>
                    <th className="p-2 border">Branch</th>
                    <th className="p-2 border">Year</th>
                    <th className="p-2 border">Semester</th>
                    <th className="p-2 border">From</th>
                    <th className="p-2 border">To</th>
                    <th className="p-2 border">Working Days</th>
                    <th className="p-2 border">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {calendarPageData.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="p-2 border">{r.university}</td>
                      <td className="p-2 border">{r.academicYear}</td>
                      <td className="p-2 border">{r.course}</td>
                      <td className="p-2 border">{r.programName} ({r.programType})</td>
                      <td className="p-2 border">{r.admittedBatch}</td>
                      <td className="p-2 border">{r.branch}</td>
                      <td className="p-2 border">{r.year}</td>
                      <td className="p-2 border">{r.semester}</td>
                      <td className="p-2 border">{r.from}</td>
                      <td className="p-2 border">{r.to}</td>
                      <td className="p-2 border text-center">{r.workingDays}</td>
                      <td className="p-2 border">{r.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-between mt-3">
              <div className="text-sm text-gray-600">
                Showing {(calPageSafe - 1) * CAL_PAGE_SIZE + 1} - {Math.min(calPageSafe * CAL_PAGE_SIZE, filteredCalendar.length)} of {filteredCalendar.length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCalPage((p) => Math.max(1, p - 1))}
                  disabled={calPageSafe === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={() => setCalPage((p) => Math.min(calTotalPages, p + 1))}
                  disabled={calPageSafe === calTotalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ---------- Exams Section ---------- */}
      <section className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="text-green-600 w-5 h-5" />
            <h2 className="text-lg font-medium">Exams</h2>
            <span className="text-sm text-gray-500">({exams.length} total)</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              placeholder="Search exams..."
              className="pl-3 pr-3 py-1 border rounded-md w-56"
              value={examSearch}
              onChange={(e) => setExamSearch(e.target.value)}
            />
          </div>
        </div>

        {openExams && (
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">University</th>
                    <th className="p-2 border">Program</th>
                    <th className="p-2 border">Semester</th>
                    <th className="p-2 border">Exam Type</th>
                    <th className="p-2 border">From</th>
                    <th className="p-2 border">To</th>
                    <th className="p-2 border">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExams.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="p-2 border">{e.university}</td>
                      <td className="p-2 border">{e.programName}</td>
                      <td className="p-2 border text-center">{e.semester}</td>
                      <td className="p-2 border text-center">{e.examType}</td>
                      <td className="p-2 border text-center">{e.from}</td>
                      <td className="p-2 border text-center">{e.to || "-"}</td>
                      <td className="p-2 border">{e.notes || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* ---------- Vacations Section ---------- */}
      <section className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sun className="text-yellow-600 w-5 h-5" />
            <h2 className="text-lg font-medium">Vacations / Holidays</h2>
            <span className="text-sm text-gray-500">({vacations.length} total)</span>
          </div>
          <div>
            <input
              placeholder="Search vacations..."
              className="pl-3 pr-3 py-1 border rounded-md w-56"
              value={vacSearch}
              onChange={(e) => setVacSearch(e.target.value)}
            />
          </div>
        </div>

        {openVacations && (
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">University</th>
                    <th className="p-2 border">Holiday Name</th>
                    <th className="p-2 border">Start</th>
                    <th className="p-2 border">End</th>
                    <th className="p-2 border">Duration (days)</th>
                    <th className="p-2 border">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVacs.map((v) => (
                    <tr key={v.id} className="hover:bg-gray-50">
                      <td className="p-2 border">{v.university}</td>
                      <td className="p-2 border">{v.name}</td>
                      <td className="p-2 border text-center">{v.start}</td>
                      <td className="p-2 border text-center">{v.end}</td>
                      <td className="p-2 border text-center">{daysBetweenInclusive(v.start, v.end)}</td>
                      <td className="p-2 border">{v.notes || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* ---------- Analytics Section ---------- */}
      <section className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3v18h18" /></svg>
            <h2 className="text-lg font-medium">Analytics</h2>
            <span className="text-sm text-gray-500">Overview</span>
          </div>
        </div>

        {openAnalytics && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bar: Working days by Semester */}
            <div className="bg-white p-3 rounded shadow-sm">
              <h3 className="text-sm font-medium mb-2">Working days by semester</h3>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <BarChart data={workingDaysBySemester}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="workingDays" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie: Exam type distribution */}
            <div className="bg-white p-3 rounded shadow-sm">
              <h3 className="text-sm font-medium mb-2">Exam type distribution</h3>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={examTypeDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                      {examTypeDistribution.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][idx % 4]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar: Vacation durations */}
            <div className="bg-white p-3 rounded shadow-sm">
              <h3 className="text-sm font-medium mb-2">Vacation durations (days)</h3>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <BarChart data={vacationDurations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="days" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
