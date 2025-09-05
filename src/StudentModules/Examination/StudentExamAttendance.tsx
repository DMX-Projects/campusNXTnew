// import React, { useState } from "react";
// import { Download } from "lucide-react";

// type Exam = {
//   examId: number;
//   examName: string; // e.g. "Midterm", "Semester"
//   date: string; // ISO date
//   session: string; // "Morning", "Afternoon"
//   semester: number;
// };

// type Subject = {
//   subjectCode: string;
//   subjectName: string;
// };

// type AttendanceStatus = "Present" | "Absent" | "Late" | "Excused";

// type AttendanceRecord = {
//   examId: number;
//   subjectCode: string;
//   status: AttendanceStatus;
// };

// // Sample Data
// const examsSample: Exam[] = [
//   { examId: 1, examName: "Midterm", date: "2025-09-10", session: "Morning", semester: 3 },
//   { examId: 2, examName: "Semester", date: "2025-12-20", session: "Afternoon", semester: 3 },
// ];

// const subjectsSample: Subject[] = [
//   { subjectCode: "CS201", subjectName: "Data Structures" },
//   { subjectCode: "CS202", subjectName: "Computer Networks" },
//   { subjectCode: "CS203", subjectName: "Operating Systems" },
// ];

// const attendanceRecordsSample: AttendanceRecord[] = [
//   { examId: 1, subjectCode: "CS201", status: "Present" },
//   { examId: 1, subjectCode: "CS202", status: "Absent" },
//   { examId: 1, subjectCode: "CS203", status: "Present" },

//   { examId: 2, subjectCode: "CS201", status: "Present" },
//   { examId: 2, subjectCode: "CS202", status: "Present" },
//   { examId: 2, subjectCode: "CS203", status: "Late" },
// ];

// // Build attendance map for quick lookup once
// const attendanceMap = new Map<string, AttendanceStatus>();
// attendanceRecordsSample.forEach(({ examId, subjectCode, status }) => {
//   attendanceMap.set(`${examId}-${subjectCode}`, status);
// });

// export default function ExamAttendanceTable() {
//   const [selectedSemester, setSelectedSemester] = useState<number | "all">("all");
//   const [selectedExamId, setSelectedExamId] = useState<number | "all">("all");
//   const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>("all");

//   // Filter exams by semester and examId
//   const filteredExams = examsSample.filter(
//     (e) =>
//       (selectedSemester === "all" || e.semester === selectedSemester) &&
//       (selectedExamId === "all" || e.examId === selectedExamId)
//   );

//   // Filter subjects by selected or all
//   const filteredSubjects =
//     selectedSubjectCode === "all"
//       ? subjectsSample
//       : subjectsSample.filter((s) => s.subjectCode === selectedSubjectCode);
// const handleDownload = () => {
//     const filename = `${selectedExam}_Marksheet.csv`;
//     let csv = "Subject,Exam Date,Session,Marks Obtained,Max Marks,Grade,Result\n";

//     filteredResults.forEach((r) => {
//       csv += `${r.subjectName},${new Date(r.examDate).toLocaleDateString()},${r.session},${r.marksObtained},${r.maxMarks},${r.grade},${r.passFail}\n`;
//     });
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = filename;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   // Color coding attendance
//   const statusColors: Partial<Record<AttendanceStatus, string>> = {
//     Present: "bg-green-100 text-green-800",
//     Absent: "bg-red-100 text-red-800",
//     Late: "bg-yellow-100 text-yellow-900",
//     Excused: "bg-blue-100 text-blue-900",
//   };

//   return (
//     <main className="max-w-7xl mx-auto p-6 bg-white rounded-md shadow space-y-8 font-sans">
//       <h1 className="text-3xl font-semibold text-gray-900">Exam Attendance Records</h1>

//       {/* Filters */}
//       <section className="flex flex-wrap items-center gap-4 mb-6">
//         <label htmlFor="semester-select" className="font-semibold text-gray-700">
//           Semester:
//         </label>
//         <select
//           id="semester-select"
//           value={selectedSemester}
//           onChange={(e) =>
//             setSelectedSemester(e.target.value === "all" ? "all" : Number(e.target.value))
//           }
//           className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="all">All</option>
//           {[...new Set(examsSample.map((e) => e.semester))].sort().map((sem) => (
//             <option key={sem} value={sem}>
//               {sem}
//             </option>
//           ))}
//         </select>

//         <label htmlFor="exam-select" className="font-semibold text-gray-700">
//           Exam:
//         </label>
//         <select
//           id="exam-select"
//           value={selectedExamId}
//           onChange={(e) =>
//             setSelectedExamId(e.target.value === "all" ? "all" : Number(e.target.value))
//           }
//           className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="all">All</option>
//           {examsSample.map((exam) => (
//             <option key={exam.examId} value={exam.examId}>
//               {exam.examName} ({new Date(exam.date).toLocaleDateString()})
//             </option>
//           ))}
//         </select>

//         <label htmlFor="subject-select" className="font-semibold text-gray-700">
//           Subject:
//         </label>
//         <select
//           id="subject-select"
//           value={selectedSubjectCode}
//           onChange={(e) => setSelectedSubjectCode(e.target.value)}
//           className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="all">All</option>
//           {subjectsSample.map((subject) => (
//             <option key={subject.subjectCode} value={subject.subjectCode}>
//               {subject.subjectName}
//             </option>
//           ))}
//         </select>
//       </section>

//       {/* Attendance Table */}
//       <section className="overflow-x-auto border border-gray-300 rounded-md">
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-gray-900 font-semibold">
//               <th className="border border-gray-300 px-4 py-2 text-left">Subject Code</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Subject Name</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Exam Type</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Date of Exam</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Session</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Semester</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Attendance Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSubjects.length === 0 || filteredExams.length === 0 ? (
//               <tr>
//                 <td colSpan={7} className="text-center py-6 text-gray-500 italic">
//                   No attendance records to display.
//                 </td>
//               </tr>
//             ) : (
//               filteredSubjects.flatMap((subject) =>
//                 filteredExams.map((exam) => {
//                   const key = `${exam.examId}-${subject.subjectCode}`;
//                   const status = attendanceMap.get(key);
//                   return (
//                     <tr key={key} className="even:bg-white odd:bg-gray-50">
//                       <td className="border border-gray-300 px-4 py-2">{subject.subjectCode}</td>
//                       <td className="border border-gray-300 px-4 py-2">{subject.subjectName}</td>
//                       <td className="border border-gray-300 px-4 py-2">{exam.examName}</td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         {new Date(exam.date).toLocaleDateString()}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">{exam.session}</td>
//                       <td className="border border-gray-300 px-4 py-2">{exam.semester}</td>
//                       <td
//                         className={`border border-gray-300 px-4 py-2 font-semibold ${statusColors[status ?? "Absent"] ||
//                           "text-gray-700"
//                           }`}
//                       >
//                         {status ?? "-"}
//                       </td>
//                     </tr>
//                   );
//                 })
//               )
//             )}
//           </tbody>
//         </table>
//       </section>

//       {/* Download Button */}
//   <section>
//           <button
//             onClick={handleDownload}
//             className="mt-6 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200 shadow-lg hover:shadow-xl"
//             aria-label="Download results report"
//           >
//             <Download className="w-5 h-5" />
//             Download Results Report
//           </button>
//           <p className="text-sm text-gray-600 mt-2">
//             Downloads a comprehensive CSV file with all exam results and summary statistics
//           </p>
//         </section>
    
//     </main>
//   );
// }


import React, { useState } from "react";
import { Download } from "lucide-react";

// Types
type Exam = {
  examId: number;
  examName: string; // e.g. "Midterm", "Semester"
  date: string; // ISO date
  session: string; // "Morning", "Afternoon"
  semester: number;
};

type Subject = {
  subjectCode: string;
  subjectName: string;
};

type AttendanceStatus = "Present" | "Absent" | "Late" | "Excused";

type AttendanceRecord = {
  examId: number;
  subjectCode: string;
  status: AttendanceStatus;
};

// Sample data
const examsSample: Exam[] = [
  { examId: 1, examName: "Midterm", date: "2025-09-10", session: "Morning", semester: 3 },
  { examId: 2, examName: "Semester", date: "2025-12-20", session: "Afternoon", semester: 3 },
];

const subjectsSample: Subject[] = [
  { subjectCode: "CS201", subjectName: "Data Structures" },
  { subjectCode: "CS202", subjectName: "Computer Networks" },
  { subjectCode: "CS203", subjectName: "Operating Systems" },
];

const attendanceRecordsSample: AttendanceRecord[] = [
  { examId: 1, subjectCode: "CS201", status: "Present" },
  { examId: 1, subjectCode: "CS202", status: "Absent" },
  { examId: 1, subjectCode: "CS203", status: "Present" },
  { examId: 2, subjectCode: "CS201", status: "Present" },
  { examId: 2, subjectCode: "CS202", status: "Present" },
  { examId: 2, subjectCode: "CS203", status: "Late" },
];

// Build attendance map for quick lookup
const attendanceMap = new Map<string, AttendanceStatus>();
attendanceRecordsSample.forEach(({ examId, subjectCode, status }) => {
  attendanceMap.set(`${examId}-${subjectCode}`, status);
});

export default function ExamAttendanceTable() {
  const [selectedSemester, setSelectedSemester] = useState<number | "all">("all");
  const [selectedExamId, setSelectedExamId] = useState<number | "all">("all");
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>("all");

  // Filter exams by semester and examId
  const filteredExams = examsSample.filter(
    (e) =>
      (selectedSemester === "all" || e.semester === selectedSemester) &&
      (selectedExamId === "all" || e.examId === selectedExamId)
  );

  // Filter subjects by selected or all
  const filteredSubjects =
    selectedSubjectCode === "all"
      ? subjectsSample
      : subjectsSample.filter((s) => s.subjectCode === selectedSubjectCode);

  // Color coding attendance
  const statusColors: Partial<Record<AttendanceStatus, string>> = {
    Present: "bg-green-100 text-green-800",
    Absent: "bg-red-100 text-red-800",
    Late: "bg-yellow-100 text-yellow-900",
    Excused: "bg-blue-100 text-blue-900",
  };

  // --------- NEW WORKING DOWNLOAD FUNCTION ---------
  const handleDownload = () => {
    let csv = "Subject Code,Subject Name,Exam Type,Date of Exam,Session,Semester,Attendance Status\n";
    filteredSubjects.forEach(subject => {
      filteredExams.forEach(exam => {
        const key = `${exam.examId}-${subject.subjectCode}`;
        // Get attendance status or blank if not found
        const status = attendanceMap.get(key) ?? "-";
        csv += [
          subject.subjectCode,
          subject.subjectName,
          exam.examName,
          new Date(exam.date).toLocaleDateString(),
          exam.session,
          exam.semester,
          status
        ].join(",") + "\n";
      });
    });
    const filename = "Exam_Attendance.csv";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };
  // --------------------------------------------------

  return (
    <main className="max-w-7xl mx-auto p-6 bg-white rounded-md shadow space-y-8 font-sans">
      <h1 className="text-3xl font-semibold text-gray-900">Exam Attendance Records</h1>
      {/* Filters */}
      <section className="flex flex-wrap items-center gap-4 mb-6">
        <label htmlFor="semester-select" className="font-semibold text-gray-700">
          Semester:
        </label>
        <select
          id="semester-select"
          value={selectedSemester}
          onChange={(e) =>
            setSelectedSemester(e.target.value === "all" ? "all" : Number(e.target.value))
          }
          className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All</option>
          {[...new Set(examsSample.map((e) => e.semester))].sort().map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>

        <label htmlFor="exam-select" className="font-semibold text-gray-700">
          Exam:
        </label>
        <select
          id="exam-select"
          value={selectedExamId}
          onChange={(e) =>
            setSelectedExamId(e.target.value === "all" ? "all" : Number(e.target.value))
          }
          className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All</option>
          {examsSample.map((exam) => (
            <option key={exam.examId} value={exam.examId}>
              {exam.examName} ({new Date(exam.date).toLocaleDateString()})
            </option>
          ))}
        </select>

        <label htmlFor="subject-select" className="font-semibold text-gray-700">
          Subject:
        </label>
        <select
          id="subject-select"
          value={selectedSubjectCode}
          onChange={(e) => setSelectedSubjectCode(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All</option>
          {subjectsSample.map((subject) => (
            <option key={subject.subjectCode} value={subject.subjectCode}>
              {subject.subjectName}
            </option>
          ))}
        </select>
      </section>

      {/* Attendance Table */}
      <section className="overflow-x-auto border border-gray-300 rounded-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-900 font-semibold">
              <th className="border border-gray-300 px-4 py-2 text-left">Subject Code</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Subject Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Exam Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date of Exam</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Session</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Semester</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Attendance Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.length === 0 || filteredExams.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500 italic">
                  No attendance records to display.
                </td>
              </tr>
            ) : (
              filteredSubjects.flatMap((subject) =>
                filteredExams.map((exam) => {
                  const key = `${exam.examId}-${subject.subjectCode}`;
                  const status = attendanceMap.get(key);
                  return (
                    <tr key={key} className="even:bg-white odd:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{subject.subjectCode}</td>
                      <td className="border border-gray-300 px-4 py-2">{subject.subjectName}</td>
                      <td className="border border-gray-300 px-4 py-2">{exam.examName}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(exam.date).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{exam.session}</td>
                      <td className="border border-gray-300 px-4 py-2">{exam.semester}</td>
                      <td
                        className={`border border-gray-300 px-4 py-2 font-semibold ${statusColors[status ?? "Absent"] ||
                          "text-gray-700"
                          }`}
                      >
                        {status ?? "-"}
                      </td>
                    </tr>
                  );
                })
              )
            )}
          </tbody>
        </table>
      </section>

      {/* Download Button */}
      <section>
        <button
          onClick={handleDownload}
          className="mt-6 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200 shadow-lg hover:shadow-xl"
          aria-label="Download results report"
        >
          <Download className="w-5 h-5" />
          Download Results Report
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Downloads a comprehensive CSV file with all exam attendance records
        </p>
      </section>
    </main>
  );
}
