 import React, { useEffect, useMemo, useState } from "react";

/**
 * SyllabusUpdates.tsx
 * - React + TypeScript component for faculty syllabus updates (post-lesson tracking)
 * - Features: list updates, create/edit update entries, mark completion status, remarks,
 *   filters (course, subject, date), quick search, responsive layout, dark/light support
 * - Persistence: localStorage by default; placeholder hooks for API integration included
 * - Styling: TailwindCSS (expects Tailwind configured and project-level dark mode support)
 *
 * Usage: import SyllabusUpdates from './SyllabusUpdates';
 */

export type CompletionStatus =
  | "Not Done"
  | "Completed"
  | "Partially Completed"
  | "Postponed";

export type SyllabusUpdate = {
  id: string;
  course: string;
  subject: string;
  topic: string;
  scheduledDate: string; // yyyy-mm-dd
  completionStatus: CompletionStatus;
  remarks?: string;
  createdAt: string;
  updatedAt?: string;
};

const LS_KEY = "erp_syllabus_updates_v1";

function uid(prefix = "su") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

const sampleUpdates = (): SyllabusUpdate[] => [
  {
    id: uid(),
    course: "B.Tech CSE",
    subject: "Data Structures",
    topic: "Linked Lists — traversal & insertion",
    scheduledDate: new Date().toISOString().slice(0, 10),
    completionStatus: "Completed",
    remarks: "Covered basic ops + in-class coding",
    createdAt: new Date().toISOString(),
  },
  {
    id: uid(),
    course: "B.Tech CSE",
    subject: "Operating Systems",
    topic: "Process Synchronization",
    scheduledDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    completionStatus: "Not Done",
    remarks: "Planned for next lecture",
    createdAt: new Date().toISOString(),
  },
];

export default function SyllabusUpdates() {
  const [updates, setUpdates] = useState<SyllabusUpdate[]>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw) as SyllabusUpdate[];
    } catch (e) {
      console.warn("Failed to parse syllabus updates from localStorage", e);
    }
    return sampleUpdates();
  });

  // UI state
  const [courseFilter, setCourseFilter] = useState<string>("All");
  const [subjectFilter, setSubjectFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SyllabusUpdate | null>(null);
  const [sortBy, setSortBy] = useState<
    "scheduledDate" | "topic" | "status"
  >("scheduledDate");
  const [isDescending, setIsDescending] = useState(false);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(updates));
  }, [updates]);

  // derive dropdown values
  const courses = useMemo(() => {
    const c = Array.from(new Set(updates.map((u) => u.course)));
    c.sort();
    return ["All", ...c];
  }, [updates]);

  const subjects = useMemo(() => {
    const s = Array.from(new Set(updates.map((u) => u.subject)));
    s.sort();
    return ["All", ...s];
  }, [updates]);

  const filtered = useMemo(() => {
    let res = [...updates];
    if (courseFilter !== "All")
      res = res.filter((u) => u.course === courseFilter);
    if (subjectFilter !== "All")
      res = res.filter((u) => u.subject === subjectFilter);
    if (dateFilter) res = res.filter((u) => u.scheduledDate === dateFilter);
    if (search) {
      const s = search.toLowerCase();
      res = res.filter(
        (u) =>
          u.topic.toLowerCase().includes(s) ||
          (u.remarks || "").toLowerCase().includes(s) ||
          u.subject.toLowerCase().includes(s) ||
          u.course.toLowerCase().includes(s)
      );
    }

    res.sort((a, b) => {
      if (sortBy === "scheduledDate") {
        const diff = a.scheduledDate.localeCompare(b.scheduledDate);
        return isDescending ? -diff : diff;
      }
      if (sortBy === "topic") {
        const diff = a.topic.localeCompare(b.topic);
        return isDescending ? -diff : diff;
      }
      if (sortBy === "status") {
        const diff = a.completionStatus.localeCompare(b.completionStatus);
        return isDescending ? -diff : diff;
      }
      return 0;
    });

    return res;
  }, [
    updates,
    courseFilter,
    subjectFilter,
    dateFilter,
    search,
    sortBy,
    isDescending,
  ]);

  // CRUD
  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(u: SyllabusUpdate) {
    setEditing(u);
    setModalOpen(true);
  }

  function saveUpdate(
    payload: Omit<SyllabusUpdate, "id" | "createdAt" | "updatedAt"> & {
      id?: string;
    }
  ) {
    // validation
    if (!payload.topic?.trim()) throw new Error("Topic is required");
    if (!payload.course?.trim()) throw new Error("Course is required");
    if (!payload.subject?.trim()) throw new Error("Subject is required");
    if (!payload.scheduledDate) throw new Error("Scheduled date is required");

    if (payload.id) {
      setUpdates((s) =>
        s.map((x) =>
          x.id === payload.id
            ? { ...x, ...payload, updatedAt: new Date().toISOString() }
            : x
        )
      );
    } else {
      const newU: SyllabusUpdate = {
        id: uid(),
        course: payload.course,
        subject: payload.subject,
        topic: payload.topic,
        scheduledDate: payload.scheduledDate,
        completionStatus: payload.completionStatus || "Not Done",
        remarks: payload.remarks,
        createdAt: new Date().toISOString(),
      };
      setUpdates((s) => [newU, ...s]);
    }

    setModalOpen(false);
  }

  function updateStatus(id: string, status: CompletionStatus) {
    setUpdates((s) =>
      s.map((u) =>
        u.id === id
          ? { ...u, completionStatus: status, updatedAt: new Date().toISOString() }
          : u
      )
    );
  }

  function deleteUpdate(id: string) {
    if (!confirm("Delete this syllabus update?")) return;
    setUpdates((s) => s.filter((u) => u.id !== id));
  }

  function formatDate(d: string) {
    try {
      const dt = new Date(d + "T00:00:00");
      return dt.toLocaleDateString();
    } catch {
      return d;
    }
  }

  // Placeholder: If you want API integration, replace these with real fetch/axios calls.
  async function fetchFromAPI() {
    // Example:
    // const res = await fetch('/api/syllabus-updates');
    // const data = await res.json();
    // setUpdates(data);
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">
          Syllabus Updates (Post-Lesson Tracking)
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={openCreate}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
          >
            + New Update
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <div>
          <label className="block text-sm mb-1">Course</label>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="w-full rounded-md px-3 py-2 border bg-white dark:bg-zinc-900"
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
            className="w-full rounded-md px-3 py-2 border bg-white dark:bg-zinc-900"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Date</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full rounded-md px-3 py-2 border bg-white dark:bg-zinc-900"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Search</label>
          <input
            placeholder="topic, remarks, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md px-3 py-2 border bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      {/* Table for updates */}
      <div className="overflow-x-auto bg-white dark:bg-zinc-900 rounded-md shadow-sm">
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="px-3 py-3">Subject</th>
              <th className="px-3 py-3">Planned Topic</th>
              <th className="px-3 py-3 hidden sm:table-cell">Course</th>
              <th className="px-3 py-3">Scheduled Date</th>
              <th className="px-3 py-3">Completion</th>
              <th className="px-3 py-3">Remarks</th>
              <th className="px-3 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-6 text-center text-zinc-500"
                >
                  No updates found.
                </td>
              </tr>
            )}

            {filtered.map((u) => (
              <tr key={u.id} className="border-b last:border-b-0">
                <td className="px-3 py-3">{u.subject}</td>
                <td className="px-3 py-3 align-top max-w-xs">
                  <div className="font-medium">{u.topic}</div>
                </td>
                <td className="px-3 py-3 hidden sm:table-cell">{u.course}</td>
                <td className="px-3 py-3">{formatDate(u.scheduledDate)}</td>
                <td className="px-3 py-3">
                  <select
                    value={u.completionStatus}
                    onChange={(e) =>
                      updateStatus(u.id, e.target.value as CompletionStatus)
                    }
                    className="rounded-md px-2 py-1 border bg-white dark:bg-zinc-900"
                  >
                    <option>Not Done</option>
                    <option>Completed</option>
                    <option>Partially Completed</option>
                    <option>Postponed</option>
                  </select>
                </td>
                <td className="px-3 py-3 max-w-sm break-words">{u.remarks}</td>
                <td className="px-3 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(u)}
                      className="px-2 py-1 rounded-md border bg-white dark:bg-zinc-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUpdate(u.id)}
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
            className="absolute inset-0 bg-black/40"
            onClick={() => setModalOpen(false)}
            aria-hidden
          />
          <div className="relative max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">
              {editing ? "Edit Update" : "New Syllabus Update"}
            </h3>
            <SyllabusUpdateForm
              initial={editing || undefined}
              onCancel={() => setModalOpen(false)}
              onSave={(d) => saveUpdate(d)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SyllabusUpdateForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: SyllabusUpdate;
  onSave: (payload: any) => void;
  onCancel: () => void;
}) {
  const [course, setCourse] = useState(initial?.course || "");
  const [subject, setSubject] = useState(initial?.subject || "");
  const [topic, setTopic] = useState(initial?.topic || "");
  const [scheduledDate, setScheduledDate] = useState(
    initial?.scheduledDate || ""
  );
  const [completionStatus, setCompletionStatus] =
    useState<CompletionStatus>(initial?.completionStatus || "Not Done");
  const [remarks, setRemarks] = useState(initial?.remarks || "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    try {
      setError(null);
      if (!topic.trim()) throw new Error("Topic is required");
      if (!course.trim()) throw new Error("Course is required");
      if (!subject.trim()) throw new Error("Subject is required");
      if (!scheduledDate) throw new Error("Scheduled date is required");

      onSave({
        id: initial?.id,
        course: course.trim(),
        subject: subject.trim(),
        topic: topic.trim(),
        scheduledDate,
        completionStatus,
        remarks: remarks.trim(),
      });
    } catch (err: any) {
      setError(err?.message || "Failed to save");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Course</label>
          <input
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full rounded-md px-3 py-2 border bg-white dark:bg-zinc-900"
            placeholder="e.g. B.Tech CSE"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-md px-3 py-2 border bg-white dark:bg-zinc-900"
            placeholder="e.g. Data Structures"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Topic</label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-md px-3 py-2 border bg-white dark:bg-zinc-900"
            placeholder="e.g. Trees: traversal"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Scheduled Date</label>
          <input
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="w-full rounded-md px-3 py-2 border bg-white dark:bg-zinc-900"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Completion Status</label>
          <select
            value={completionStatus}
            onChange={(e) =>
              setCompletionStatus(e.target.value as CompletionStatus)
            }
            className="w-full rounded-md px-3 py-2 border bg-white dark:bg-zinc-900"
          >
            <option>Not Done</option>
            <option>Completed</option>
            <option>Partially Completed</option>
            <option>Postponed</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Remarks</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full rounded-md px-3 py-2 border bg-white dark:bg-zinc-900"
            rows={3}
            placeholder="Brief remarks after completion"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 rounded-md border"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-indigo-600 text-white"
        >
          Save Update
        </button>
      </div>
    </form>
  );
}
