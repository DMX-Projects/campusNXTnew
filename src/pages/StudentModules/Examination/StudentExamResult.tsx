import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, ReferenceLine
} from "recharts";
import { Download } from "lucide-react";

type ResultRecord = {
  examId: number;
  examName: string; // e.g. Midterm/Semester
  examDate: string; // ISO date
  session: string; // Morning/Afternoon
  subjectCode: string;
  subjectName: string;
  marksObtained: number;
  maxMarks: number;
  grade: string;
  passFail: "Pass" | "Fail";
};

const resultsData: ResultRecord[] = [
  {
    examId: 1,
    examName: "Midterm",
    examDate: "2025-09-10",
    session: "Morning",
    subjectCode: "CS201",
    subjectName: "Data Structures",
    marksObtained: 75,
    maxMarks: 100,
    grade: "B",
    passFail: "Pass",
  },
  {
    examId: 1,
    examName: "Midterm",
    examDate: "2025-09-10",
    session: "Morning",
    subjectCode: "CS202",
    subjectName: "Computer Networks",
    marksObtained: 62,
    maxMarks: 100,
    grade: "C",
    passFail: "Pass",
  },
  {
    examId: 1,
    examName: "Midterm",
    examDate: "2025-09-10",
    session: "Morning",
    subjectCode: "CS203",
    subjectName: "Operating Systems",
    marksObtained: 83,
    maxMarks: 100,
    grade: "A",
    passFail: "Pass",
  },
  {
    examId: 2,
    examName: "Semester",
    examDate: "2025-12-20",
    session: "Afternoon",
    subjectCode: "CS201",
    subjectName: "Data Structures",
    marksObtained: 85,
    maxMarks: 100,
    grade: "A",
    passFail: "Pass",
  },
  {
    examId: 2,
    examName: "Semester",
    examDate: "2025-12-20",
    session: "Afternoon",
    subjectCode: "CS202",
    subjectName: "Computer Networks",
    marksObtained: 58,
    maxMarks: 100,
    grade: "D",
    passFail: "Fail",
  },
  {
    examId: 2,
    examName: "Semester",
    examDate: "2025-12-20",
    session: "Afternoon",
    subjectCode: "CS203",
    subjectName: "Operating Systems",
    marksObtained: 91,
    maxMarks: 100,
    grade: "A+",
    passFail: "Pass",
  },
];

// Helper to group results by exam for comparisons
const examsList = Array.from(
  new Set(resultsData.map((r) => r.examName))
);

export default function ResultsPerformance() {
  const [selectedExam, setSelectedExam] = useState<string>(examsList[0]);

  // Filter results by selected exam
  const filteredResults = resultsData.filter(
    (r) => r.examName === selectedExam
  );

  // Generate data for bar chart: subject vs marks %
  const barChartData = filteredResults.map((r) => ({
    subject: r.subjectName,
    marks: ((r.marksObtained / r.maxMarks) * 100).toFixed(2),
    passFail: r.passFail,
  }));

  // Calculate summary stats
  const totalMarksObtained = filteredResults.reduce(
    (sum, r) => sum + r.marksObtained,
    0
  );
  const totalMaxMarks = filteredResults.reduce(
    (sum, r) => sum + r.maxMarks,
    0
  );
  const averagePercent = (
    (totalMarksObtained / totalMaxMarks) *
    100
  ).toFixed(2);
  const passedAll = filteredResults.every((r) => r.passFail === "Pass");

  // Handler for download (simulate)
  const handleDownload = () => {
    const filename = `${selectedExam}_Marksheet.csv`;
    let csv = "Subject,Exam Date,Session,Marks Obtained,Max Marks,Grade,Result\n";

    filteredResults.forEach((r) => {
      csv += `${r.subjectName},${new Date(r.examDate).toLocaleDateString()},${r.session},${r.marksObtained},${r.maxMarks},${r.grade},${r.passFail}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="max-w-7xl mx-auto p-6 bg-white rounded-md shadow space-y-8 font-sans">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900">
        Exam Results & Performance
      </h1>

      {/* Exam Selector */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <label
          htmlFor="exam-select"
          className="font-semibold text-gray-700"
        >
          Select Exam:
        </label>
        <select
          id="exam-select"
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {examsList.map((exam) => (
            <option key={exam} value={exam}>
              {exam}
            </option>
          ))}
        </select>
      </div>

      {/* Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-indigo-50 text-indigo-700 rounded-md p-5 shadow-sm flex flex-col items-center">
          <div className="text-2xl font-bold">{averagePercent}%</div>
          <div>Average Marks</div>
        </div>
        <div className="bg-indigo-50 text-indigo-700 rounded-md p-5 shadow-sm flex flex-col items-center">
          <div className={`text-2xl font-bold ${passedAll ? 'text-green-700' : 'text-red-700'}`}>
            {passedAll ? 'Pass' : 'Fail'}
          </div>
          <div>Result Status</div>
        </div>
        <div className="bg-indigo-50 text-indigo-700 rounded-md p-5 shadow-sm flex flex-col items-center">
          <div className="text-2xl font-bold">{filteredResults.length}</div>
          <div>Subjects</div>
        </div>
      </section>

      {/* Bar Chart: Marks per Subject */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Marks per Subject (%)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={barChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="marks"
              fill="#6366f1"
              isAnimationActive
              label={{ position: 'top' }}
            />
            <ReferenceLine y={75} stroke="#f59e0b" strokeDasharray="3 3" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-2">
          <span className="inline-block w-3 h-3 bg-yellow-400 mr-1 align-middle rounded-full"></span>
          Minimum passing marks (75%)
        </p>
      </section>

      {/* Detailed Table */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Detailed Results</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Exam Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Session</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Semester</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Marks Obtained</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Max Marks</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Grade</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Result</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((r) => (
                <tr key={`${r.examId}-${r.subjectCode}`} className="border-b border-gray-200">
                  <td className="border border-gray-300 px-4 py-2">{r.subjectName}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(r.examDate).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{r.session}</td>
                  <td className="border border-gray-300 px-4 py-2">{r.examDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{r.marksObtained}</td>
                  <td className="border border-gray-300 px-4 py-2">{r.maxMarks}</td>
                  <td className="border border-gray-300 px-4 py-2">{r.grade}</td>
                  <td className={`border border-gray-300 px-4 py-2 font-semibold ${r.passFail === "Pass" ? "text-green-600" : "text-red-600"}`}>
                    {r.passFail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          Downloads a comprehensive CSV file with all exam results and summary statistics
        </p>
      </section>
    </main>
  );
}
