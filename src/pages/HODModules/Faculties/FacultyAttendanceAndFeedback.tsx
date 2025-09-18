import React, { useMemo, useState } from "react";

type FacultyLite = { id: string; name: string; department: string };
type AttendanceStatus = "Present" | "Absent" | "Leave";

// Hardcoded department for HOD view
const HOD_DEPARTMENT = "Computer Science";

const FACULTY_LIST: FacultyLite[] = [
  { id: "FAC001", name: "Dr. Ananya Sharma", department: "Computer Science" },
  { id: "FAC002", name: "Prof. Rahul Verma", department: "Computer Science" },
  { id: "FAC004", name: "Dr. Karthik Rao", department: "Computer Science" },
  { id: "FAC003", name: "Dr. Neha Iyer", department: "Electronics" },
];

type Feedback = {
  id: string;
  studentName: string;
  subject: string;
  facultyId: string;
  facultyName: string;
  message: string;
  date: string; // ISO
};

const FEEDBACKS: Feedback[] = [
  {
    id: "FB001",
    studentName: "Rohit Kumar",
    subject: "Machine Learning",
    facultyId: "FAC001",
    facultyName: "Dr. Ananya Sharma",
    message: "Great explanations with practical demos.",
    date: "2025-09-10",
  },
  {
    id: "FB002",
    studentName: "Priya Singh",
    subject: "Cloud Computing",
    facultyId: "FAC002",
    facultyName: "Prof. Rahul Verma",
    message: "Needs more real-world project examples.",
    date: "2025-09-12",
  },
  {
    id: "FB003",
    studentName: "Akash Mehta",
    subject: "Database Systems",
    facultyId: "FAC004",
    facultyName: "Dr. Karthik Rao",
    message: "Assignments are balanced and helpful.",
    date: "2025-09-15",
  },
];

const cls = {
  wrap: "w-full max-w-7xl mx-auto p-4 md:p-6 text-sm md:text-base",
  section:
    "rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm p-4 mb-6",
  head: "flex items-center justify-between mb-3",
  title: "text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100",
  filters: "grid grid-cols-1 md:grid-cols-4 gap-3",
  input:
    "w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none",
  tableWrap: "overflow-auto -mx-2 md:mx-0",
  table: "min-w-[640px] w-full border-separate border-spacing-0 text-sm",
  th: "sticky top-0 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-left p-3 border-b border-gray-200 dark:border-gray-800",
  td: "p-3 border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200",
  select:
    "rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500",
  primaryBtn:
    "inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 active:bg-indigo-800 transition",
  subtext: "text-gray-600 dark:text-gray-300",
  badge:
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
};

export default function FacultyAttendanceAndFeedback() {
  // Attendance state keyed by date+facultyId
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [facultyFilter, setFacultyFilter] = useState<string>("");
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});

  const hodFaculty = useMemo(
    () => FACULTY_LIST.filter(f => f.department === HOD_DEPARTMENT),
    []
  );

  const visibleFaculty = useMemo(
    () =>
      hodFaculty.filter(f =>
        facultyFilter ? f.name.toLowerCase().includes(facultyFilter.toLowerCase()) : true
      ),
    [hodFaculty, facultyFilter]
  );

  const attendanceKey = (fid: string) => `${date}:${fid}`;

  const setStatus = (fid: string, status: AttendanceStatus) => {
    setAttendance(prev => ({ ...prev, [attendanceKey(fid)]: status }));
  };

  // Feedback filters
  const [fbFacultyId, setFbFacultyId] = useState<string>("");
  const [fbSubject, setFbSubject] = useState<string>("");
  const [fbDate, setFbDate] = useState<string>("");

  const subjects = useMemo(() => {
    const s = new Set(FEEDBACKS.map(f => f.subject));
    return Array.from(s).sort();
  }, []);

  const filteredFeedbacks = useMemo(() => {
    return FEEDBACKS.filter(f =>
      FACULTY_LIST.find(fl => fl.id === f.facultyId)?.department === HOD_DEPARTMENT
    )
      .filter(f => (fbFacultyId ? f.facultyId === fbFacultyId : true))
      .filter(f => (fbSubject ? f.subject === fbSubject : true))
      .filter(f => (fbDate ? f.date === fbDate : true));
  }, [fbFacultyId, fbSubject, fbDate]);

  return (
    <div className={cls.wrap}>
      {/* Attendance Section */}
      <section className={cls.section}>
        <div className={cls.head}>
          <div>
            <div className={cls.title}>Faculty Attendance</div>
            <div className={cls.subtext}>Department: {HOD_DEPARTMENT}</div>
          </div>
          <button
            className={cls.primaryBtn}
            onClick={() => {
              // Simulate submit
              const payload = visibleFaculty.map(f => ({
                facultyId: f.id,
                date,
                status: attendance[attendanceKey(f.id)] || "Absent",
              }));
              alert(`Attendance saved for ${payload.length} faculty on ${date}.`);
              console.log("Attendance submission", payload);
            }}
          >
            Save Attendance
          </button>
        </div>

        <div className={cls.filters}>
          <input
            className={cls.input}
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <input
            className={cls.input}
            placeholder="Filter by faculty name"
            value={facultyFilter}
            onChange={e => setFacultyFilter(e.target.value)}
          />
          <div className="hidden md:block" />
          <div className="hidden md:block" />
        </div>

        <div className="h-3" />

        <div className={cls.tableWrap}>
          <table className={cls.table}>
            <thead>
              <tr>
                <th className={cls.th}>Faculty ID</th>
                <th className={cls.th}>Name</th>
                <th className={cls.th}>Status</th>
                <th className={cls.th}>Current</th>
              </tr>
            </thead>
            <tbody>
              {visibleFaculty.map(f => {
                const status: AttendanceStatus =
                  attendance[attendanceKey(f.id)] || "Absent";
                return (
                  <tr key={f.id}>
                    <td className={cls.td}>{f.id}</td>
                    <td className={cls.td}>{f.name}</td>
                    <td className={cls.td}>
                      <select
                        className={cls.select}
                        value={status}
                        onChange={e => setStatus(f.id, e.target.value as AttendanceStatus)}
                      >
                        <option>Present</option>
                        <option>Absent</option>
                        <option>Leave</option>
                      </select>
                    </td>
                    <td className={cls.td}>
                      <span className={cls.badge}>{status}</span>
                    </td>
                  </tr>
                );
              })}
              {visibleFaculty.length === 0 && (
                <tr>
                  <td className={cls.td} colSpan={4}>
                    No faculty to show.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Feedback Section */}
      <section className={cls.section}>
        <div className={cls.head}>
          <div>
            <div className={cls.title}>Student Feedback</div>
            <div className={cls.subtext}>Filter feedback raised against faculty</div>
          </div>
        </div>

        <div className={cls.filters}>
          <select
            className={cls.input}
            value={fbFacultyId}
            onChange={e => setFbFacultyId(e.target.value)}
          >
            <option value="">All faculty</option>
            {FACULTY_LIST.filter(f => f.department === HOD_DEPARTMENT).map(f => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>

          <select
            className={cls.input}
            value={fbSubject}
            onChange={e => setFbSubject(e.target.value)}
          >
            <option value="">All subjects</option>
            {subjects.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <input
            className={cls.input}
            type="date"
            value={fbDate}
            onChange={e => setFbDate(e.target.value)}
          />
          <button
            className="rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
            onClick={() => {
              setFbFacultyId("");
              setFbSubject("");
              setFbDate("");
            }}
          >
            Clear
          </button>
        </div>

        <div className="h-3" />

        <div className={cls.tableWrap}>
          <table className={cls.table}>
            <thead>
              <tr>
                <th className={cls.th}>Student</th>
                <th className={cls.th}>Subject</th>
                <th className={cls.th}>Faculty</th>
                <th className={cls.th}>Feedback</th>
                <th className={cls.th}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.map(fb => (
                <tr key={fb.id}>
                  <td className={cls.td}>{fb.studentName}</td>
                  <td className={cls.td}>{fb.subject}</td>
                  <td className={cls.td}>{fb.facultyName}</td>
                  <td className={cls.td}>{fb.message}</td>
                  <td className={cls.td}>{fb.date}</td>
                </tr>
              ))}
              {filteredFeedbacks.length === 0 && (
                <tr>
                  <td className={cls.td} colSpan={5}>
                    No feedback for current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
