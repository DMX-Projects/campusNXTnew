import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Topic = { name: string; status: "Completed" | "Pending" };
type Subject = { name: string; topics: Topic[]; faculty?: string };
type Branch = { name: string; subjects: Subject[] };
type Program = { name: string; branches: Branch[] };

const programs: Program[] = [
  {
    name: "B.Tech",
    branches: [
      {
        name: "CSE",
        subjects: [
          {
            name: "Data Structures",
            faculty: "Dr. A Kumar",
            topics: [
              { name: "Arrays", status: "Completed" },
              { name: "Linked Lists", status: "Completed" },
              { name: "Trees", status: "Pending" },
              { name: "Graphs", status: "Pending" },
            ],
          },
          {
            name: "Computer Networks",
            faculty: "Ms. S Rao",
            topics: [
              { name: "OSI Model", status: "Completed" },
              { name: "TCP/IP", status: "Completed" },
              { name: "Routing", status: "Pending" },
            ],
          },
        ],
      },
      {
        name: "ECE",
        subjects: [
          {
            name: "Signals & Systems",
            faculty: "Dr. T Mehta",
            topics: [
              { name: "Time domain analysis", status: "Completed" },
              { name: "Frequency domain", status: "Pending" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "M.Tech",
    branches: [
      {
        name: "CSE",
        subjects: [
          {
            name: "Advanced Algorithms",
            faculty: "Prof. R Sharma",
            topics: [
              { name: "Dynamic Programming", status: "Completed" },
              { name: "Greedy Algorithms", status: "Completed" },
              { name: "Approximation", status: "Pending" },
            ],
          },
        ],
      },
    ],
  },
];

function CompletionPieChart({ completed, total }: { completed: number; total: number }) {
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        label: "Progress",
        data: [completed, total - completed],
        backgroundColor: ["#22C55E", "#484848"], // no blue, darker gray in dark mode instead
        borderWidth: 0,
      },
    ],
  };
  return (
    <Pie
      data={data}
      options={{
        plugins: { legend: { display: false } },
        cutout: "70%",
      }}
    />
  );
}

export default function ExamPreparationStatus() {
  const [selectedProgram, setSelectedProgram] = useState(programs[0].name);
  const [selectedBranch, setSelectedBranch] = useState(programs[0].branches[0].name);

  const currentProgram = programs.find((p) => p.name === selectedProgram);
  const currentBranch = currentProgram?.branches.find((b) => b.name === selectedBranch);

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-primary-800 dark:text-primary-200 tracking-tight">
            Semester Exam Preparation 
          </h1>
        </header>

        {/* Filters Without Theme Toggle */}
        <section className="flex gap-4 items-center mb-6 flex-wrap">
          <div>
            <label className="font-semibold text-primary-700 dark:text-primary-300 mr-2 block">
              Program:
            </label>
            <select
              className="rounded-lg px-3 py-2 border border-primary-300 dark:border-primary-700 bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-200 font-semibold focus:outline-primary-600"
              value={selectedProgram}
              onChange={(e) => {
                setSelectedProgram(e.target.value);
                const prog = programs.find((x) => x.name === e.target.value);
                setSelectedBranch(prog?.branches[0]?.name || "");
              }}
            >
              {programs.map((prog) => (
                <option key={prog.name}>{prog.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold text-primary-700 dark:text-primary-300 mr-2 block">
              Branch:
            </label>
            <select
              className="rounded-lg px-3 py-2 border border-primary-300 dark:border-primary-700 bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-200 font-semibold focus:outline-primary-600"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              {currentProgram?.branches.map((branch) => (
                <option key={branch.name}>{branch.name}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Subjects Grid */}
        <section className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {currentBranch?.subjects.map((subject, idx) => {
            const totalTopics = subject.topics.length;
            const completedTopics = subject.topics.filter((t) => t.status === "Completed").length;
            const completionPercent = totalTopics
              ? Math.round((completedTopics / totalTopics) * 100)
              : 0;
            return (
              <div
                key={idx}
                className="relative group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-6 overflow-hidden"
              >
                <h2 className="text-xl font-bold mb-2 text-primary-900 dark:text-primary-200">
                  {subject.name}
                </h2>
                <span className="text-xs rounded px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 inline-block mt-1">
                  {subject.faculty}
                </span>

                <div className="self-center mb-4 w-28 h-28">
                  <CompletionPieChart completed={completedTopics} total={totalTopics} />
                </div>

                <div className="flex flex-col gap-2">
                  {subject.topics.map((topic, tdx) => (
                    <div
                      key={tdx}
                      className="flex justify-between flex-wrap rounded-lg p-3 border border-primary-100 dark:border-primary-700 bg-primary-50 dark:bg-primary-900"
                    >
                      <p className="text-primary-800 dark:text-primary-200">{topic.name}</p>
                      <span
                        className={`font-semibold px-3 py-1 rounded-lg text-xs shadow ${
                          topic.status === "Completed"
                            ? "bg-green-400/20 text-green-600 dark:bg-green-700/30 dark:text-green-400"
                            : "bg-red-400/20 text-red-600 dark:bg-red-700/30 dark:text-red-400"
                        }`}
                      >
                        {topic.status}
                      </span>
                    </div>
                  ))}
                  {subject.topics.length === 0 && (
                    <span className="block text-gray-400 dark:text-gray-500 mt-3 text-xs">
                      No topics yet.
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4 text-primary-500 dark:text-primary-300 text-xs select-none">
                  {completionPercent}% Prepared
                </div>
              </div>
            );
          })}
          {currentBranch?.subjects.length === 0 && (
            <span className="text-primary-700 dark:text-primary-300 text-center py-10 col-span-full">
              No subjects found in this branch.
            </span>
          )}
        </section>
      </div>
    </div>
  );
}
