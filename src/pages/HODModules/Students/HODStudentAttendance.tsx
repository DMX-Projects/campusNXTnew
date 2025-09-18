import React, { useMemo, useState } from "react";

type AttendanceStatus = "Present" | "Absent" | "Leave";

type Student = {
  rollNo: string;
  name: string;
  year: number;
  semester: number;
  section: string;
  course: string;
  department: string;
};

type AttendanceRow = {
  id: string;
  rollNo: string;
  name: string;
  course: string;
  date: string; // ISO
  status: AttendanceStatus;
  editable: boolean; // computed using HOD course handling
};

const HOD_DEPARTMENT = "Computer Science";
const HOD_HANDLES_COURSES = ["Operating Systems", "Machine Learning"]; // editable courses

const STUDENTS: Student[] = [
  { rollNo: "CS21U001", name: "Rohit Kumar", year: 3, semester: 5, section: "A", course: "Machine Learning", department: "Computer Science" },
  { rollNo: "CS21U002", name: "Priya Singh", year: 3, semester: 5, section: "A", course: "Operating Systems", department: "Computer Science" },
  { rollNo: "CS21U003", name: "Akash Mehta", year: 3, semester: 5, section: "B", course: "Database Systems", department: "Computer Science" },
  { rollNo: "EC21U004", name: "Neha Gupta", year: 3, semester: 5, section: "A", course: "Digital Signal Processing", department: "Electronics" },
];

const INITIAL_ATTENDANCE: AttendanceRow[] = [
  { id: "A1", rollNo: "CS21U001", name: "Rohit Kumar", course: "Machine Learning", date: "2025-09-16", status: "Present", editable: true },
  { id: "A2", rollNo: "CS21U002", name: "Priya Singh", course: "Operating Systems", date: "2025-09-16", status: "Absent", editable: true },
  { id: "A3", rollNo: "CS21U003", name: "Akash Mehta", course: "Database Systems", date: "2025-09-16", status: "Present", editable: false },
  { id: "A4", rollNo: "CS21U001", name: "Rohit Kumar", course: "Machine Learning", date: "2025-09-17", status: "Leave", editable: true },
  { id: "A5", rollNo: "CS21U003", name: "Akash Mehta", course: "Database Systems", date: "2025-09-17", status: "Absent", editable: false },
];

const ui = {
  wrap: "w-full max-w-7xl mx-auto p-4 md:p-6 text-sm md:text-base",
  head: "mb-4",
  title: "text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100",
  sub: "text-gray-600 dark:text-gray-300",
  panel: "rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm p-4 mb-6",
  filters: "grid grid-cols-1 md:grid-cols-6 gap-3",
  input: "w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none",
  tableWrap: "overflow-auto -mx-2 md:mx-0",
  table: "min-w-[760px] w-full border-separate border-spacing-0 text-sm",
  th: "bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-left p-3 border-b border-gray-200 dark:border-gray-800",
  td: "p-3 border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 align-middle",
  select: "rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500",
  badge: "inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
  summary: "grid grid-cols-3 gap-3 mt-3",
  pill: "rounded-md p-3 text-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
  btn: "inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 active:bg-indigo-800 transition",
  ghost: "rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900",
};

export default function HODStudentAttendance() {
  const [year, setYear] = useState<string>("");
  const [sem, setSem] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  // Build dynamic lists from students within HOD department
  const deptStudents = useMemo(
    () => STUDENTS.filter(s => s.department === HOD_DEPARTMENT),
    []
  );

  const years = useMemo(
    () => Array.from(new Set(deptStudents.map(s => s.year))).sort(),
    [deptStudents]
  );
  const semesters = useMemo(
    () => Array.from(new Set(deptStudents.map(s => s.semester))).sort(),
    [deptStudents]
  );
  const sections = useMemo(
    () => Array.from(new Set(deptStudents.map(s => s.section))).sort(),
    [deptStudents]
  );
  const courses = useMemo(
    () => Array.from(new Set(deptStudents.map(s => s.course))).sort(),
    [deptStudents]
  );

  // Attendance rows filtered for HOD department
  const [rows, setRows] = useState<AttendanceRow[]>(
    INITIAL_ATTENDANCE.map(r => ({ ...r, editable: HOD_HANDLES_COURSES.includes(r.course) }))
  );

  const filtered = useMemo(() => {
    return rows
      .filter(r => deptStudents.some(s => s.rollNo === r.rollNo))
      .filter(r => (year ? deptStudents.find(s => s.rollNo === r.rollNo)?.year === Number(year) : true))
      .filter(r => (sem ? deptStudents.find(s => s.rollNo === r.rollNo)?.semester === Number(sem) : true))
      .filter(r => (section ? deptStudents.find(s => s.rollNo === r.rollNo)?.section === section : true))
      .filter(r => (course ? r.course === course : true))
      .filter(r => (from ? r.date >= from : true))
      .filter(r => (to ? r.date <= to : true));
  }, [rows, deptStudents, year, sem, section, course, from, to]);

  const totals = useMemo(() => {
    let present = 0, absent = 0, leave = 0;
    filtered.forEach(r => {
      if (r.status === "Present") present++;
      else if (r.status === "Absent") absent++;
      else if (r.status === "Leave") leave++;
    });
    return { present, absent, leave, total: filtered.length };
  }, [filtered]);

  const updateStatus = (id: string, status: AttendanceStatus) => {
    setRows(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <div className={ui.wrap}>
      <div className={ui.head}>
        <div className={ui.title}>Student Attendance</div>
        <div className={ui.sub}>Department: {HOD_DEPARTMENT}</div>
      </div>

      <section className={ui.panel}>
        <div className={ui.filters}>
          <select className={ui.input} value={year} onChange={e => setYear(e.target.value)}>
            <option value="">All Years</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select className={ui.input} value={sem} onChange={e => setSem(e.target.value)}>
            <option value="">All Semesters</option>
            {semesters.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select className={ui.input} value={section} onChange={e => setSection(e.target.value)}>
            <option value="">All Sections</option>
            {sections.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select className={ui.input} value={course} onChange={e => setCourse(e.target.value)}>
            <option value="">All Courses</option>
            {courses.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input className={ui.input} type="date" value={from} onChange={e => setFrom(e.target.value)} />
          <input className={ui.input} type="date" value={to} onChange={e => setTo(e.target.value)} />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            className={ui.btn}
            onClick={() => alert("Attendance filters applied.")}
          >
            Apply
          </button>
          <button
            className={ui.ghost}
            onClick={() => {
              setYear("");
              setSem("");
              setSection("");
              setCourse("");
              setFrom("");
              setTo("");
            }}
          >
            Clear
          </button>
        </div>

        <div className={ui.summary}>
          <div className={ui.pill}>
            Present: <span className="font-medium">{totals.present}</span>
          </div>
          <div className={ui.pill}>
            Absent: <span className="font-medium">{totals.absent}</span>
          </div>
          <div className={ui.pill}>
            On Leave: <span className="font-medium">{totals.leave}</span>
          </div>
        </div>

        <div className="h-3" />

        <div className={ui.tableWrap}>
          <table className={ui.table}>
            <thead>
              <tr>
                <th className={ui.th}>Roll No</th>
                <th className={ui.th}>Name</th>
                <th className={ui.th}>Course</th>
                <th className={ui.th}>Date</th>
                <th className={ui.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td className={ui.td}>{r.rollNo}</td>
                  <td className={ui.td}>{r.name}</td>
                  <td className={ui.td}>{r.course}</td>
                  <td className={ui.td}>{r.date}</td>
                  <td className={ui.td}>
                    {r.editable ? (
                      <select
                        className={ui.select}
                        value={r.status}
                        onChange={e => updateStatus(r.id, e.target.value as AttendanceStatus)}
                      >
                        <option>Present</option>
                        <option>Absent</option>
                        <option>Leave</option>
                      </select>
                    ) : (
                      <span className={ui.badge}>{r.status}</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className={ui.td} colSpan={5}>No records found for current filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3">
          <button
            className={ui.btn}
            onClick={() => {
              const payload = filtered.map(r => ({ id: r.id, status: r.status }));
              alert(`Saved ${payload.length} attendance updates.`);
              console.log("Save attendance payload", payload);
            }}
          >
            Save Changes
          </button>
        </div>
      </section>
    </div>
  );
}
