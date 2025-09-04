import React, { useState, useEffect } from "react";
import {
  Search,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  GraduationCap,
  Eye,
  Download,
} from "lucide-react";

interface EvaluationTask {
  id: string;
  examCode: string;
  subject: string;
  examDate: Date;
  totalPapers: number;
  evaluatedPapers: number;
  evaluator: string;
  evaluatorId: string;
  status: "pending" | "in_progress" | "completed" | "overdue" | "under_review";
  priority: "low" | "medium" | "high";
  deadline: Date;
  submittedDate?: Date;
  remarks?: string;
  semester: string;
  department: string;
}

const EvaluationStatusIcons = {
  completed: CheckCircle,
  in_progress: Clock,
  pending: Clock,
  overdue: AlertTriangle,
  under_review: Eye,
};

const EvaluationStatusColors = {
  completed: "bg-green-100 text-green-800",
  in_progress: "bg-blue-100 text-blue-800",
  pending: "bg-gray-100 text-gray-800",
  overdue: "bg-red-100 text-red-800",
  under_review: "bg-orange-100 text-orange-800",
};

const PriorityColors = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

const ExamEvaluation: React.FC = () => {
  const [evaluations, setEvaluations] = useState<EvaluationTask[]>([
    {
      id: "1",
      examCode: "CSE301-MID",
      subject: "Data Structures and Algorithms",
      examDate: new Date("2025-08-25"),
      totalPapers: 85,
      evaluatedPapers: 85,
      evaluator: "Dr. Sarah Williams",
      evaluatorId: "FAC001",
      status: "completed",
      priority: "medium",
      deadline: new Date("2025-09-01"),
      submittedDate: new Date("2025-08-31"),
      semester: "Fall 2025",
      department: "Computer Science",
    },
    {
      id: "2",
      examCode: "MAT201-FINAL",
      subject: "Calculus",
      examDate: new Date("2025-08-28"),
      totalPapers: 92,
      evaluatedPapers: 67,
      evaluator: "Prof. Michael Brown",
      evaluatorId: "FAC002",
      status: "in_progress",
      priority: "high",
      deadline: new Date("2025-09-03"),
      semester: "Fall 2025",
      department: "Mathematics",
    },
    {
      id: "3",
      examCode: "PHY101",
      subject: "Physics",
      examDate: new Date("2025-08-30"),
      totalPapers: 78,
      evaluatedPapers: 0,
      evaluator: "Dr. Emily Davis",
      evaluatorId: "FAC003",
      status: "pending",
      priority: "medium",
      deadline: new Date("2025-09-05"),
      semester: "Fall 2025",
      department: "Physics",
    },
    {
      id: "4",
      examCode: "ENG101",
      subject: "English",
      examDate: new Date("2025-08-26"),
      totalPapers: 65,
      evaluatedPapers: 45,
      evaluator: "Dr. Lisa Wilson",
      evaluatorId: "FAC004",
      status: "overdue",
      priority: "high",
      deadline: new Date("2025-09-01"),
      semester: "Fall 2025",
      department: "English",
    },
    {
      id: "5",
      examCode: "CHE101",
      subject: "Chemistry",
      examDate: new Date("2025-08-29"),
      totalPapers: 88,
      evaluatedPapers: 88,
      evaluator: "Prof. John Mitchell",
      evaluatorId: "FAC005",
      status: "under_review",
      priority: "medium",
      deadline: new Date("2025-09-04"),
      submittedDate: new Date("2025-09-02"),
      remarks: "Grade distribution seems unusual, requires review",
      semester: "Fall 2025",
      department: "Chemistry",
    },
  ]);

  const [selectedEvaluation, setSelectedEvaluation] = React.useState<EvaluationTask | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("all");
  const [filterDepartment, setFilterDepartment] = React.useState("all");

  const filteredEvaluations = evaluations.filter((evaluation) => {
    const matchesSearch =
      evaluation.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.examCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.evaluator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || evaluation.status === filterStatus;
    const matchesDepartment = filterDepartment === "all" || evaluation.department === filterDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getIconComponent = (status: string) => {
    const Icon = (EvaluationStatusIcons as any)[status];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  const getStatusColor = (status: string) => {
    return (EvaluationStatusColors as any)[status] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority: string) => {
    return (PriorityColors as any)[priority] || "bg-gray-500";
  };

  const progressPercentage = (task: EvaluationTask) => {
    if (task.totalPapers === 0) return 0;
    return Math.round((task.evaluatedPapers / task.totalPapers) * 100);
  };

  // Generate JSON report
  const generateReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      totalEvaluations: evaluations.length,
      summary: {
        pending: evaluations.filter((e) => e.status === "pending").length,
        in_progress: evaluations.filter((e) => e.status === "in_progress").length,
        completed: evaluations.filter((e) => e.status === "completed").length,
        overdue: evaluations.filter((e) => e.status === "overdue").length,
        under_review: evaluations.filter((e) => e.status === "under_review").length,
      },
    };

    const filename = "evaluation_report.json";
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export all evaluation data
  const exportData = () => {
    const filename = "evaluations_data.json";
    const blob = new Blob([JSON.stringify(evaluations, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const departmentOptions = Array.from(new Set(evaluations.map((e) => e.department)));
  const statusOptions = Array.from(new Set(evaluations.map((e) => e.status)));

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">Exam Evaluation Management</h1>
        </div>

        <div className="flex gap-4">
          {evaluations.filter((e) => e.status === "overdue").length > 0 && (
            <span className="rounded-full bg-red-600 text-white px-3 py-1 text-xs">Overdue evaluations</span>
          )}
          {evaluations.filter((e) => e.status === "under_review").length > 0 && (
            <span className="rounded-full bg-orange-600 text-white px-3 py-1 text-xs">Under Review</span>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            className="w-full pl-10 pr-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="Search by subject, code, evaluator"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="border rounded-md border-gray-300 p-2"
          aria-label="Filter by status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
            </option>
          ))}
        </select>
        <select
          className="border rounded-md border-gray-300 p-2"
          aria-label="Filter by department"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="all">All Departments</option>
          {departmentOptions.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <div className="flex gap-4 mt-4" style={{ height: 'calc(100vh - 170px)' }}>
        {/* List */}
        <div className="bg-white flex-1 overflow-y-auto rounded-md shadow-sm p-4">
          {filteredEvaluations.length === 0 ? (
            <p className="text-center text-gray-500">No evaluations found.</p>
          ) : (
            filteredEvaluations.map((evalTask) => {
              const ProgressBarWidth = `${Math.min(100, (evalTask.evaluatedPapers / evalTask.totalPapers) * 100)}%`;

              return (
                <div
                  key={evalTask.id}
                  className={`border-b last:border-b-0 border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition`}
                  onClick={() => setSelectedEvaluation(evalTask)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selectedEvaluation?.id === evalTask.id}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{evalTask.subject}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getStatusColor(evalTask.status)}`}>
                      {evalTask.status.charAt(0).toUpperCase() + evalTask.status.slice(1).replace("_", " ")}
                    </span>
                  </div>

                  <div className="flex gap-4 mb-2 flex-wrap">
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                      <FileText className="w-4 h-4" />
                      <span>{`Papers: ${evalTask.evaluatedPapers} / ${evalTask.totalPapers}`}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                      <User className="w-4 h-4" />
                      <span>{evalTask.evaluator}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{evalTask.examDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{`Deadline: ${evalTask.deadline.toLocaleDateString()}`}</span>
                    </div>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 mb-1">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: ProgressBarWidth }}></div>
                  </div>

                  <div className={`inline-block px-2 py-0.5 rounded-full text-white text-xs font-semibold ${PriorityColors[evalTask.priority]}`}>
                    {evalTask.priority.charAt(0).toUpperCase() + evalTask.priority.slice(1)}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Details Side Panel */}
        <aside className="w-96 bg-white rounded-md shadow-sm p-4 overflow-auto" style={{ maxHeight: 'calc(100vh - 170px)' }}>
          {selectedEvaluation ? (
            <>
              <h2 className="text-xl font-semibold mb-2">{selectedEvaluation.subject} - {selectedEvaluation.examCode}</h2>
              <div className="mb-2 text-gray-600 text-sm">
                <strong>Evaluator:</strong> {selectedEvaluation.evaluator} ({selectedEvaluation.evaluatorId})
              </div>
              <div className="mb-2 text-gray-600 text-sm">
                <strong>Department:</strong> {selectedEvaluation.department}
              </div>
              <div className="mb-2 text-gray-600 text-sm">
                <strong>Semester:</strong> {selectedEvaluation.semester}
              </div>
              <div className="mb-2 text-gray-600 text-sm">
                <strong>Exam Date:</strong> {selectedEvaluation.examDate.toLocaleDateString()}
              </div>
              <div className="mb-2 text-gray-600 text-sm">
                <strong>Deadline:</strong> {selectedEvaluation.deadline.toLocaleDateString()}
              </div>
              {selectedEvaluation.submittedDate && (
                <div className="mb-2 text-gray-600 text-sm">
                  <strong>Submitted:</strong> {selectedEvaluation.submittedDate.toLocaleDateString()}
                </div>
              )}
              <div className="mb-2 text-gray-600 text-sm">
                <strong>Status:</strong> 
                <span className={`ml-2 px-2 py-0.5 rounded text-white text-xs font-semibold ${EvaluationStatusColors[selectedEvaluation.status]}`}>
                  {selectedEvaluation.status.charAt(0).toUpperCase() + selectedEvaluation.status.slice(1).replace("_", " ")}
                </span>
              </div>
              <div className="mb-2 text-gray-600 text-sm">
                <strong>Priority:</strong> 
                <span className={`ml-2 px-2 py-0.5 rounded text-white text-xs font-semibold ${PriorityColors[selectedEvaluation.priority]}`}>
                  {selectedEvaluation.priority.charAt(0).toUpperCase() + selectedEvaluation.priority.slice(1)}
                </span>
              </div>
              {selectedEvaluation.remarks && (
                <div className="mb-2 text-gray-600 text-sm">
                  <strong>Remarks:</strong> {selectedEvaluation.remarks}
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-400 mt-10">
              <GraduationCap className="mx-auto mb-4 w-16 h-16" />
              <p>Select an evaluation task to see details</p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6">
            <button
              className="w-full mb-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
              onClick={generateReport}
            >
              Generate Report
            </button>

            <button
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300 transition"
              onClick={exportData}
            >
              Export Data
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ExamEvaluation;
