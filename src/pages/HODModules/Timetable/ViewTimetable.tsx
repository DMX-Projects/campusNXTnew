import React, { useState, useEffect } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const PERIODS = [
  { label: "1st Period", time: "9:00 AM - 9:45 AM" },
  { label: "2nd Period", time: "9:45 AM - 10:30 AM" },
  { label: "3rd Period", time: "10:45 AM - 11:30 AM" },
  { label: "4th Period", time: "11:30 AM - 12:15 PM" },
  { label: "5th Period", time: "1:15 PM - 2:00 PM" },
  { label: "6th Period", time: "2:00 PM - 2:45 PM" },
  { label: "7th Period", time: "3:00 PM - 3:45 PM" },
];

const semesters = ["1", "2", "3", "4", "5", "6"];
const sections = ["A", "B", "C"];

const sampleCourses = [
  { day: "Monday", period: "1st Period", subject: "Data Structures", section: "2-A", timings: "9:00 AM - 9:45 AM", semester: "2", section_code: "A" },
  { day: "Monday", period: "2nd Period", subject: "Operating Systems", section: "2-A", timings: "9:45 AM - 10:30 AM", semester: "2", section_code: "A" },
  { day: "Wednesday", period: "4th Period", subject: "Algorithms", section: "2-B", timings: "11:30 AM - 12:15 PM", semester: "2", section_code: "B" },
  { day: "Friday", period: "6th Period", subject: "Computer Networks", section: "2-A", timings: "2:00 PM - 2:45 PM", semester: "2", section_code: "A" },
];

export default function HodPersonalTimetable() {
  const [semesterFilter, setSemesterFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(sampleCourses);

  useEffect(() => {
    let filtered = sampleCourses;
    if(semesterFilter) filtered = filtered.filter(c => c.semester === semesterFilter);
    if(sectionFilter) filtered = filtered.filter(c => c.section_code === sectionFilter);
    setFilteredCourses(filtered);
  }, [semesterFilter, sectionFilter]);

  const timetableMap = {};
  DAYS.forEach(d => timetableMap[d] = {});
  filteredCourses.forEach(({day, period, subject, section, timings}) => {
    timetableMap[day][period] = {subject, section, timings};
  });

  return (
    <div className="">
      <div className="max-w-[98vw] px-2 md:px-8 mx-auto">
        <div className="flex items-center justify-between pt-6 pb-2">
          <h1 className="text-2xl md:text-3xl font-bold">HOD Personal Timetable</h1>
          <div className="flex gap-4">
            <div>
              <label htmlFor="semester" className="block mb-0.5 text-sm font-medium">Semester</label>
              <select id="semester" className="rounded border px-3 py-1 w-32 text-sm shadow-sm" 
                value={semesterFilter} onChange={e => setSemesterFilter(e.target.value)}>
                <option value="">All</option>
                {semesters.map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="section" className="block mb-0.5 text-sm font-medium">Section</label>
              <select id="section" className="rounded border px-3 py-1 w-32 text-sm shadow-sm" 
                value={sectionFilter} onChange={e => setSectionFilter(e.target.value)}>
                <option value="">All</option>
                {sections.map(s => <option key={s} value={s}>Section {s}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="mt-2 overflow-x-auto rounded-lg shadow border border-blue-200 bg-white dark:bg-gray-800">
          <table className="w-full border-separate" style={{borderSpacing: 0}}>
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="sticky left-0 z-10 px-4 py-2 font-medium bg-blue-400/90 text-left align-middle">Day / Period</th>
                {PERIODS.map(p => (
                  <th key={p.label} className="px-4 py-2 text-center font-medium border-l border-blue-200/50">
                    {p.label}
                    <div className="text-xs font-normal">{p.time}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day, i) => (
                <tr key={day} className={i%2===0 ? "bg-blue-50 dark:bg-gray-900" : "bg-white dark:bg-gray-800"}>
                  <td className="sticky left-0 z-10 px-4 py-2 bg-blue-100/80 dark:bg-gray-700 font-semibold border-t border-blue-200 text-left">{day}</td>
                  {PERIODS.map(({label}) => {
                    const c = timetableMap[day][label];
                    return (
                      <td key={label} className="px-4 py-4 font-normal text-center border-t border-blue-100 dark:border-gray-700">
                        {c ? (
                          <>
                            <div className="font-bold text-blue-900 dark:text-blue-200">{c.subject}</div>
                            <div className="text-sm">{c.section}</div>
                            <div className="text-xs text-blue-600 dark:text-blue-200">{c.timings}</div>
                          </>
                        ) : (
                          <span className="italic text-gray-400">Free</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
