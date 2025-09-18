 import React, { useEffect, useMemo, useState } from "react";
import { Upload, FileText, X } from "lucide-react";

/**
 * SubjectLessonPlans.tsx
 * - React + TypeScript single-file component for faculty lesson plans
 * - Features: list, create, edit, update status, filters (course, subject, date), search,
 *   responsive UI, validation, file uploads.
 * - Styling: TailwindCSS (expects tailwind configured in the host project)
 */

export type LessonStatus = "Planned" | "Completed" | "Postponed" | "Cancelled";

export type AttachedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl: string;
};

export type LessonPlan = {
  id: string;
  course: string;
  subject: string;
  topic: string;
  plannedDate: string;
  status: LessonStatus;
  notes?: string;
  attachedFiles?: AttachedFile[];
  createdAt: string;
  updatedAt?: string;
};

const LS_KEY = "erp_faculty_lessonplans_v1";

function uid(prefix = "lp") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

const sampleData = (): LessonPlan[] => [
  {
    id: uid(),
    course: "B.Tech CSE",
    subject: "Operating Systems",
    topic: "Process Scheduling",
    plannedDate: new Date().toISOString().slice(0, 10),
    status: "Planned",
    notes: "Introduce scheduling algorithms and hands-on examples",
    attachedFiles: [
      {
        id: uid("file"),
        name: "scheduling_algorithms.pdf",
        size: 245760,
        type: "application/pdf",
        dataUrl: "data:application/pdf;base64,dummy"
      }
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: uid(),
    course: "B.Tech ECE",
    subject: "Digital Electronics",
    topic: "Combinational Circuits",
    plannedDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    status: "Planned",
    notes: "K-maps exercise",
    attachedFiles: [
      {
        id: uid("file"),
        name: "kmap_examples.pptx",
        size: 512000,
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        dataUrl: "data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,dummy"
      }
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: uid(),
    course: "B.Tech IT",
    subject: "Data Structures",
    topic: "Binary Trees and Traversals",
    plannedDate: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
    status: "Planned",
    notes: "Implement tree traversal algorithms with practical examples",
    attachedFiles: [
      {
        id: uid("file"),
        name: "tree_traversal_code.zip",
        size: 15360,
        type: "application/zip",
        dataUrl: "data:application/zip;base64,dummy"
      },
      {
        id: uid("file"),
        name: "binary_trees_notes.docx",
        size: 89600,
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        dataUrl: "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,dummy"
      }
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: uid(),
    course: "B.Tech ME",
    subject: "Thermodynamics",
    topic: "First Law of Thermodynamics",
    plannedDate: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
    status: "Completed",
    notes: "Cover energy conservation principles with practical applications",
    attachedFiles: [
      {
        id: uid("file"),
        name: "thermodynamics_lab_manual.pdf",
        size: 1024000,
        type: "application/pdf",
        dataUrl: "data:application/pdf;base64,dummy"
      }
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uid(),
    course: "B.Tech CSE",
    subject: "Database Management Systems",
    topic: "SQL Joins and Subqueries",
    plannedDate: new Date(Date.now() + 4 * 86400000).toISOString().slice(0, 10),
    status: "Postponed",
    notes: "Hands-on session with complex SQL queries and optimization techniques",
    attachedFiles: [
      {
        id: uid("file"),
        name: "sql_practice_queries.sql",
        size: 8192,
        type: "application/sql",
        dataUrl: "data:text/plain;base64,dummy"
      },
      {
        id: uid("file"),
        name: "database_schema.png",
        size: 204800,
        type: "image/png",
        dataUrl: "data:image/png;base64,dummy"
      }
    ],
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export default function SubjectLessonPlans() {
  const [plans, setPlans] = useState<LessonPlan[]>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw) as LessonPlan[];
    } catch (e) {
      console.warn("Failed to parse lesson plans from localStorage", e);
    }
    return sampleData();
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(plans));
  }, [plans]);

  // Filters & UI state
  const [courseFilter, setCourseFilter] = useState<string>("All");
  const [subjectFilter, setSubjectFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<"plannedDate" | "topic" | "status">(
    "plannedDate"
  );
  const [isDescending, setIsDescending] = useState<boolean>(false);

  // Modal state for create/edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<LessonPlan | null>(null);

  // derive dropdowns
  const courses = useMemo(() => {
    const c = Array.from(new Set(plans.map((p) => p.course)));
    c.sort();
    return ["All", ...c];
  }, [plans]);

  const subjects = useMemo(() => {
    const s = Array.from(new Set(plans.map((p) => p.subject)));
    s.sort();
    return ["All", ...s];
  }, [plans]);

  // filtered list
  const filtered = useMemo(() => {
    let res = [...plans];
    if (courseFilter !== "All")
      res = res.filter((p) => p.course === courseFilter);
    if (subjectFilter !== "All")
      res = res.filter((p) => p.subject === subjectFilter);
    if (dateFilter) res = res.filter((p) => p.plannedDate === dateFilter);
    if (search) {
      const s = search.toLowerCase();
      res = res.filter(
        (p) =>
          p.topic.toLowerCase().includes(s) ||
          p.notes?.toLowerCase().includes(s) ||
          p.subject.toLowerCase().includes(s)
      );
    }

    res.sort((a, b) => {
      if (sortBy === "plannedDate") {
        const diff = a.plannedDate.localeCompare(b.plannedDate);
        return isDescending ? -diff : diff;
      }
      if (sortBy === "topic") {
        const diff = a.topic.localeCompare(b.topic);
        return isDescending ? -diff : diff;
      }
      if (sortBy === "status") {
        const diff = a.status.localeCompare(b.status);
        return isDescending ? -diff : diff;
      }
      return 0;
    });

    return res;
  }, [plans, courseFilter, subjectFilter, dateFilter, search, sortBy, isDescending]);

  // CRUD operations
  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(plan: LessonPlan) {
    setEditing(plan);
    setModalOpen(true);
  }

  function savePlan(
    payload: Omit<LessonPlan, "id" | "createdAt" | "updatedAt"> & { id?: string }
  ) {
    if (!payload.topic?.trim()) throw new Error("Topic is required");
    if (!payload.subject?.trim()) throw new Error("Subject is required");
    if (!payload.course?.trim()) throw new Error("Course is required");
    if (!payload.plannedDate) throw new Error("Planned Date is required");

    if (payload.id) {
      setPlans((s) =>
        s.map((p) =>
          p.id === payload.id
            ? { ...p, ...payload, updatedAt: new Date().toISOString() }
            : p
        )
      );
    } else {
      const newPlan: LessonPlan = {
        id: uid(),
        topic: payload.topic,
        course: payload.course,
        subject: payload.subject,
        plannedDate: payload.plannedDate,
        status: (payload.status || "Planned") as LessonStatus,
        notes: payload.notes,
        attachedFiles: payload.attachedFiles || [],
        createdAt: new Date().toISOString(),
      };
      setPlans((s) => [newPlan, ...s]);
    }
    setModalOpen(false);
  }

  function updateStatus(id: string, status: LessonStatus) {
    setPlans((s) =>
      s.map((p) =>
        p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p
      )
    );
  }

  function removePlan(id: string) {
    if (!confirm("Delete this lesson plan? This action cannot be undone.")) return;
    setPlans((s) => s.filter((p) => p.id !== id));
  }

  function formatDate(d: string) {
    try {
      const dt = new Date(d + "T00:00:00");
      return dt.toLocaleDateString();
    } catch {
      return d;
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold">Subject Lesson Plans</h2>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none"
        >
          + New Plan
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <div>
          <label className="block text-sm mb-1">Course</label>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="w-full rounded-md px-3 py-2 border dark:border-zinc-700 bg-white dark:bg-zinc-900"
          >
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Subject</label>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="w-full rounded-md px-3 py-2 border dark:border-zinc-700 bg-white dark:bg-zinc-900"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Planned Date</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full rounded-md px-3 py-2 border dark:border-zinc-700 bg-white dark:bg-zinc-900"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Search</label>
          <input
            placeholder="search topic / notes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md px-3 py-2 border dark:border-zinc-700 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-separate border-spacing-0">
          <thead>
            <tr className="text-left">
              <th className="px-3 py-2">Topic</th>
              <th className="px-3 py-2 hidden md:table-cell">Course</th>
              <th className="px-3 py-2">Subject</th>
              <th className="px-3 py-2">Planned Date</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Files</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-6 text-center text-sm text-zinc-500"
                >
                  No lesson plans match the selected filters.
                </td>
              </tr>
            )}

            {filtered.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-3 py-3 align-top max-w-xs">
                  <div className="font-medium">{p.topic}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {p.notes}
                  </div>
                </td>
                <td className="px-3 py-3 align-top hidden md:table-cell">
                  {p.course}
                </td>
                <td className="px-3 py-3 align-top">{p.subject}</td>
                <td className="px-3 py-3 align-top">
                  {formatDate(p.plannedDate)}
                </td>
                <td className="px-3 py-3 align-top">
                  <select
                    value={p.status}
                    onChange={(e) =>
                      updateStatus(p.id, e.target.value as LessonStatus)
                    }
                    className="rounded-md px-2 py-1 border dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  >
                    <option>Planned</option>
                    <option>Completed</option>
                    <option>Postponed</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td className="px-3 py-3 align-top">
                  {p.attachedFiles && p.attachedFiles.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {p.attachedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-md text-xs"
                          title={`${file.name} (${formatFileSize(file.size)})`}
                        >
                          <FileText className="w-3 h-3" />
                          <span className="truncate max-w-20">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-zinc-400 text-sm">No files</span>
                  )}
                </td>
                <td className="px-3 py-3 align-top text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="px-2 py-1 rounded-md border dark:border-zinc-700 bg-white/50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removePlan(p.id)}
                      className="px-2 py-1 rounded-md border border-red-500 text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
            aria-hidden
          />

          <div className="relative max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">
              {editing ? "Edit Plan" : "New Lesson Plan"}
            </h3>
            <LessonPlanForm
              initial={editing || undefined}
              onCancel={() => setModalOpen(false)}
              onSave={(data) => savePlan(data)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponent: form
function LessonPlanForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: LessonPlan;
  onSave: (payload: any) => void;
  onCancel: () => void;
}) {
  const [topic, setTopic] = useState<string>(initial?.topic || "");
  const [course, setCourse] = useState<string>(initial?.course || "");
  const [subject, setSubject] = useState<string>(initial?.subject || "");
  const [plannedDate, setPlannedDate] = useState<string>(
    initial?.plannedDate || ""
  );
  const [status, setStatus] = useState<LessonStatus>(
    initial?.status || "Planned"
  );
  const [notes, setNotes] = useState<string>(initial?.notes || "");
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>(
    initial?.attachedFiles || []
  );
  const [error, setError] = useState<string | null>(null);

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile: AttachedFile = {
          id: uid("file"),
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: e.target?.result as string,
        };
        setAttachedFiles((prev) => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });

    // Clear the input
    event.target.value = "";
  }

  function removeFile(fileId: string) {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== fileId));
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    try {
      setError(null);
      if (!topic.trim()) throw new Error("Topic is required");
      if (!course.trim()) throw new Error("Course is required");
      if (!subject.trim()) throw new Error("Subject is required");
      if (!plannedDate) throw new Error("Planned date is required");

      onSave({
        id: initial?.id,
        topic: topic.trim(),
        course: course.trim(),
        subject: subject.trim(),
        plannedDate,
        status,
        notes: notes.trim(),
        attachedFiles,
      });
    } catch (err: any) {
      setError(err?.message || "Failed to save");
    }
  }

  return (
    <div className="space-y-4">
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Topic</label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-md px-3 py-2 border dark:border-zinc-700 bg-white dark:bg-zinc-900"
            placeholder="e.g. Process Synchronization"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Course</label>
          <input
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full rounded-md px-3 py-2 border dark:border-zinc-700 bg-white dark:bg-zinc-900"
            placeholder="e.g. B.Tech CSE"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-md px-3 py-2 border dark:border-zinc-700 bg-white dark:bg-zinc-900"
            placeholder="e.g. Operating Systems"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Planned Date</label>
          <input
            type="date"
            value={plannedDate}
            onChange={(e) => setPlannedDate(e.target.value)}
            className="w-full rounded-md px-3 py-2 border dark:border-zinc-700 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-md px-3 py-2 border dark:border-zinc-700 bg-white dark:bg-zinc-900"
          rows={3}
        />
      </div>

      {/* File Upload Section */}
      <div>
        <label className="block text-sm mb-2">Attach Files (optional)</label>
        <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg p-4">
          <div className="text-center">
            <Upload className="mx-auto h-8 w-8 text-zinc-400 mb-2" />
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
              Upload lesson materials, presentations, or documents
            </div>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.png,.jpg,.jpeg,.gif,.sql"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300"
            >
              Choose Files
            </label>
          </div>
        </div>

        {/* Display attached files */}
        {attachedFiles.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className="text-sm font-medium">Attached Files:</div>
            {attachedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-800 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-zinc-500">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as LessonStatus)}
          className="rounded-md px-2 py-1 border dark:border-zinc-700 bg-white dark:bg-zinc-900"
        >
          <option>Planned</option>
          <option>Completed</option>
          <option>Postponed</option>
          <option>Cancelled</option>
        </select>

        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 rounded-md border dark:border-zinc-700"
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 rounded-md bg-indigo-600 text-white"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}