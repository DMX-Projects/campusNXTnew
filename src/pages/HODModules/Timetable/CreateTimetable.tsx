import React, { useState, useEffect } from "react";

const YEARS = ["1", "2", "3", "4"];
const SEMESTERS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const SECTIONS = ["A", "B", "C"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const PERIODS = [
  "1st Period",
  "2nd Period",
  "3rd Period",
  "4th Period",
  "5th Period",
  "6th Period",
  "7th Period",
  "8th Period",
];
const SUBJECTS = [
  { name: "Data Structures", code: "CS201", department: "CSE" },
  { name: "Digital Logic Design", code: "EC202", department: "ECE" },
  { name: "Object Oriented Programming", code: "CS203", department: "CSE" },
  { name: "Signals and Systems", code: "EC204", department: "ECE" },
  { name: "Engineering Mathematics-II", code: "MA201", department: "Maths" },
];
const FACULTIES = [
  { name: "Prof. S. Rao", department: "CSE" },
  { name: "Dr. L. Jain", department: "ECE" },
  { name: "Dr. A. Kumar", department: "Maths" },
  { name: "Prof. M. Verma", department: "CSE" },
];
interface TimetableCell {
  subjectName: string;
  subjectCode: string;
  facultyName: string;
  department: string;
  type: string;
}
interface FilterData {
  year: string;
  semester: string;
  section: string;
}
interface SavedTimetable {
  id: number;
  filters: FilterData;
  timetable: Record<string, Record<string, TimetableCell>>;
}
function createEmptyTimetable() {
  let timetable: Record<string, Record<string, TimetableCell>> = {};
  DAYS.forEach((day) => {
    timetable[day] = {};
    PERIODS.forEach((period) => {
      timetable[day][period] = {
        subjectName: "",
        subjectCode: "",
        facultyName: "",
        department: "",
        type: "",
      };
    });
  });
  return timetable;
}
const SAMPLE_TIMETABLES: SavedTimetable[] = [
  {
    id: 1,
    filters: { year: "2", semester: "4", section: "A" },
    timetable: {
      Monday: {
        "1st Period": { subjectName: "Data Structures", subjectCode: "CS201", facultyName: "Prof. S. Rao", department: "CSE", type: "Lecture" },
        "2nd Period": { subjectName: "Digital Logic Design", subjectCode: "EC202", facultyName: "Dr. L. Jain", department: "ECE", type: "Practical" },
        "3rd Period": { subjectName: "Object Oriented Programming", subjectCode: "CS203", facultyName: "Prof. S. Rao", department: "CSE", type: "Lecture" },
        "4th Period": { subjectName: "Signals and Systems", subjectCode: "EC204", facultyName: "Dr. L. Jain", department: "ECE", type: "Lecture" },
        "5th Period": { subjectName: "", subjectCode: "", facultyName: "", department: "", type: "" },
        "6th Period": { subjectName: "", subjectCode: "", facultyName: "", department: "", type: "" },
        "7th Period": { subjectName: "", subjectCode: "", facultyName: "", department: "", type: "" },
        "8th Period": { subjectName: "", subjectCode: "", facultyName: "", department: "", type: "" },
      },
      Tuesday: {
        "1st Period": { subjectName: "Engineering Mathematics-II", subjectCode: "MA201", facultyName: "Dr. A. Kumar", department: "Maths", type: "Lecture" },
        "2nd Period": { subjectName: "Data Structures", subjectCode: "CS201", facultyName: "Prof. S. Rao", department: "CSE", type: "Lecture" },
        "3rd Period": { subjectName: "Digital Logic Design", subjectCode: "EC202", facultyName: "Dr. L. Jain", department: "ECE", type: "Practical" },
        "4th Period": { subjectName: "Object Oriented Programming", subjectCode: "CS203", facultyName: "Prof. S. Rao", department: "CSE", type: "Lecture" },
        "5th Period": { subjectName: "", subjectCode: "", facultyName: "", department: "", type: "" },
        "6th Period": { subjectName: "", subjectCode: "", facultyName: "", department: "", type: "" },
        "7th Period": { subjectName: "", subjectCode: "", facultyName: "", department: "", type: "" },
        "8th Period": { subjectName: "", subjectCode: "", facultyName: "", department: "", type: "" },
      },
      Wednesday: createEmptyTimetable()["Wednesday"],
      Thursday: createEmptyTimetable()["Thursday"],
      Friday: createEmptyTimetable()["Friday"],
      Saturday: createEmptyTimetable()["Saturday"],
    },
  },
  // Add more sample timetables here if desired for demo
];

export default function DepartmentTimetable() {
  const [filters, setFilters] = useState<FilterData>({
    year: "",
    semester: "",
    section: "",
  });
  const [timetable, setTimetable] = useState<Record<string, Record<string, TimetableCell>>>(
    createEmptyTimetable()
  );
  const [savedTimetables, setSavedTimetables] = useState<SavedTimetable[]>(SAMPLE_TIMETABLES);
  const [selectedCell, setSelectedCell] = useState<{ day: string; period: string } | null>(null);
  const [tempAssign, setTempAssign] = useState<TimetableCell>({
    subjectName: "",
    subjectCode: "",
    facultyName: "",
    department: "",
    type: "",
  });
  const [filteredFaculties, setFilteredFaculties] = useState(FACULTIES);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  useEffect(() => {
    if (tempAssign.subjectName) {
      const subject = SUBJECTS.find((s) => s.name === tempAssign.subjectName);
      if (subject) {
        setTempAssign((tp) => ({
          ...tp,
          subjectCode: subject.code,
          department: subject.department,
        }));
        setFilteredFaculties(FACULTIES.filter((f) => f.department === subject.department));
        if (!tempAssign.facultyName) {
          setTempAssign((tp) => ({ ...tp, facultyName: "" }));
        }
      }
    } else {
      setFilteredFaculties(FACULTIES);
      setTempAssign((tp) => ({ ...tp, subjectCode: "", department: "" }));
    }
  }, [tempAssign.subjectName]);
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setTimetable(createEmptyTimetable());
    setViewMode(false);
    setEditingId(null);
  };
  const openEditor = (day: string, period: string) => {
    if (viewMode) return;
    setSelectedCell({ day, period });
    setTempAssign({ ...timetable[day][period] });
    const sectDept = timetable[day][period].department;
    if (sectDept) setFilteredFaculties(FACULTIES.filter((f) => f.department === sectDept));
    else setFilteredFaculties(FACULTIES);
  };
  const closeEditor = () => setSelectedCell(null);
  const onSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTempAssign((t) => ({ ...t, subjectName: e.target.value, facultyName: "", type: "" }));
  };
  const onFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTempAssign((t) => ({ ...t, facultyName: e.target.value }));
  };
  const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTempAssign((t) => ({ ...t, type: e.target.value }));
  };
  const saveCell = () => {
    if (!(tempAssign.subjectName && tempAssign.facultyName && tempAssign.type)) {
      alert("Please fill all assignment fields.");
      return;
    }
    if (selectedCell) {
      setTimetable((t) => {
        let copy = JSON.parse(JSON.stringify(t));
        copy[selectedCell.day][selectedCell.period] = { ...tempAssign };
        return copy;
      });
      closeEditor();
    }
  };
  const allAssigned = () => {
    for (let day of DAYS) {
      for (let period of PERIODS) {
        let cell = timetable[day][period];
        if (!(cell.subjectName && cell.facultyName && cell.type)) return false;
      }
    }
    return true;
  };
  const saveTimetable = () => {
    if (!(filters.year && filters.semester && filters.section)) {
      alert("Select Year, Semester, Section.");
      return;
    }
    if (!allAssigned()) {
      alert("Please assign all periods.");
      return;
    }
    const newTimetable: SavedTimetable = {
      id: editingId || Date.now(),
      filters: { ...filters },
      timetable: JSON.parse(JSON.stringify(timetable)),
    };
    if (editingId) {
      setSavedTimetables((prev) => prev.map((t) => (t.id === editingId ? newTimetable : t)));
      alert("Updated saved timetable.");
    } else {
      setSavedTimetables((prev) => [newTimetable, ...prev]);
      alert("Timetable saved.");
    }
    setViewMode(true);
    setEditingId(null);
  };
  const editTimetable = (id: number) => {
    const sel = savedTimetables.find((t) => t.id === id);
    if (sel) {
      setFilters(sel.filters);
      setTimetable(sel.timetable);
      setViewMode(false);
      setEditingId(id);
      document.getElementById("timetable")?.scrollIntoView({ behavior: "smooth" });
    }
  };
  const deleteTimetable = (id: number) => {
    if (window.confirm("Delete this timetable?")) {
      setSavedTimetables((prev) => prev.filter((t) => t.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setTimetable(createEmptyTimetable());
        setFilters({ year: "", semester: "", section: "" });
        setViewMode(false);
      }
    }
  };
  return (
    <div className="p-6 md:p-12  min-h-screen font-sans max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary-900 dark:text-white">
        Department Timetable Manager
      </h1>
      <div className="flex flex-wrap gap-4 mb-6 max-w-4xl mx-auto">
        <select
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          className="border border-primary-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-primary-900 dark:text-white"
        >
          <option value="">Select Year</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          name="semester"
          value={filters.semester}
          onChange={handleFilterChange}
          className="border border-primary-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-primary-900 dark:text-white"
        >
          <option value="">Select Semester</option>
          {SEMESTERS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          name="section"
          value={filters.section}
          onChange={handleFilterChange}
          className="border border-primary-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-primary-900 dark:text-white"
        >
          <option value="">Select Section</option>
          {SECTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div
          id="timetable"
          className="overflow-auto border border-primary-300 dark:border-gray-600 rounded-lg max-w-full md:w-2/3"
        >
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-primary-200 dark:bg-gray-700 font-semibold text-primary-900 dark:text-white sticky top-0 z-10">
              <tr>
                <th
                  className="sticky left-0 bg-primary-200 dark:bg-gray-700 border border-primary-300 dark:border-gray-600 px-3 py-2 z-20"
                >
                  Day / Period
                </th>
                {PERIODS.map((period) => (
                  <th key={period} className="border border-primary-300 dark:border-gray-600 px-3 py-2">
                    {period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day) => (
                <tr
                  key={day}
                  className="odd:bg-primary-50 dark:odd:bg-gray-800 even:bg-white dark:even:bg-gray-900"
                >
                  <td
                    className="sticky left-0 bg-primary-200 dark:bg-gray-700 border border-primary-300 dark:border-gray-600 px-3 py-2 font-bold z-10"
                  >
                    {day}
                  </td>
                  {PERIODS.map((period) => {
                    const cell = timetable[day][period];
                    return (
                      <td
                        key={`${day}-${period}`}
                        className="border border-primary-300 dark:border-gray-600 px-3 py-2 cursor-pointer select-none max-w-xs truncate hover:bg-primary-100 dark:hover:bg-gray-800"
                        onClick={() => {
                          if (!viewMode) openEditor(day, period);
                        }}
                        title={`${cell.subjectName ? `${cell.subjectName} (${cell.subjectCode})` : "Unassigned"} - ${
                          cell.facultyName || ""
                        }`}
                      >
                        <div className="text-sm font-semibold text-primary-900 dark:text-white">
                          {cell.subjectName || "Unassigned"}
                        </div>
                        <div className="text-xs text-primary-700 dark:text-gray-400">
                          {cell.facultyName || "-"}
                        </div>
                        <div className="text-xs">{cell.department}</div>
                        <div className="text-xs font-bold uppercase">{cell.type}</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-3 text-center">
            <button
              onClick={saveTimetable}
              disabled={!filters.year || !filters.semester || !filters.section || !allAssigned()}
              className={`px-6 py-2 rounded-md text-white ${
                filters.year && filters.semester && filters.section && allAssigned()
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-300 cursor-not-allowed"
              } transition`}
            >
              {editingId ? "Update Timetable" : "Save Timetable"}
            </button>
          </div>
        </div>
        <div className="md:w-1/3 w-full max-h-[80vh] overflow-y-auto rounded-lg border border-primary-300 dark:border-gray-600 p-4 bg-white dark:bg-gray-900 shadow-md">
          <h2 className="text-lg font-bold mb-4 text-primary-900 dark:text-white">Saved Timetables</h2>
          {savedTimetables.length === 0 ? (
            <p className="text-primary-700 dark:text-gray-400 italic">No saved timetables.</p>
          ) : (
            <table className="min-w-full border-collapse rounded-lg border border-primary-300 dark:border-gray-600">
              <thead className="bg-primary-100 dark:bg-gray-700 font-semibold text-primary-900 dark:text-white">
                <tr>
                  <th className="p-3">Year</th>
                  <th className="p-3">Semester</th>
                  <th className="p-3">Section</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {savedTimetables.map(({ id, filters }) => (
                  <tr
                    key={id}
                    className="odd:bg-white dark:odd:bg-gray-800 even:bg-gray-100 dark:even:bg-gray-900"
                  >
                    <td className="p-3">{filters.year}</td>
                    <td className="p-3">{filters.semester}</td>
                    <td className="p-3">{filters.section}</td>
                    <td className="p-3 whitespace-nowrap space-x-4">
                      <button
                        onClick={() => editTimetable(id)}
                        className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTimetable(id)}
                        className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {selectedCell && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4"
          onClick={closeEditor}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl mb-4 text-primary-900 dark:text-white font-bold">Assign Period Details</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveCell();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block mb-1 font-semibold text-primary-700 dark:text-gray-400">Course Name</label>
                <select
                  className="w-full px-3 py-2 border border-primary-300 rounded-md bg-white dark:bg-gray-700 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
                  value={tempAssign.subjectName}
                  onChange={onSubjectChange}
                >
                  <option value="">Select Course</option>
                  {SUBJECTS.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold text-primary-700 dark:text-gray-400">Course Code</label>
                <input
                  type="text"
                  readOnly
                  value={tempAssign.subjectCode}
                  className="w-full px-3 py-2 border border-primary-300 rounded-md bg-gray-200 dark:bg-gray-700 text-primary-700 dark:text-gray-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-primary-700 dark:text-gray-400">Type</label>
                <select
                  className="w-full px-3 py-2 border border-primary-300 rounded-md bg-white dark:bg-gray-700 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
                  value={tempAssign.type}
                  onChange={onTypeChange}
                >
                  <option value="">Select Type</option>
                  <option value="Lecture">Lecture</option>
                  <option value="Practical">Practical</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold text-primary-700 dark:text-gray-400">Faculty Name</label>
                <select
                  className="w-full px-3 py-2 border border-primary-300 rounded-md bg-white dark:bg-gray-700 text-primary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
                  value={tempAssign.facultyName}
                  onChange={onFacultyChange}
                >
                  <option value="">Select Faculty</option>
                  {filteredFaculties.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold text-primary-700 dark:text-gray-400">Department</label>
                <input
                  type="text"
                  readOnly
                  value={tempAssign.department}
                  className="w-full px-3 py-2 border border-primary-300 rounded-md bg-gray-200 dark:bg-gray-700 text-primary-700 dark:text-gray-400"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-primary-900 dark:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
