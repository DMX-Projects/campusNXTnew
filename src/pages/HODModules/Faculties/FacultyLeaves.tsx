import React, { useMemo, useState } from "react";

type LeaveStatus = "Pending" | "Approved" | "Rejected";
type Leave = {
  id: string;
  facultyId: string;
  facultyName: string;
  department: string;
  from: string; // ISO
  to: string; // ISO
  days: number;
  reason: string;
  status: LeaveStatus;
  note?: string;
};

// Hardcoded HOD department
const HOD_DEPARTMENT = "Computer Science";

const LEAVES: Leave[] = [
  {
    id: "L001",
    facultyId: "FAC001",
    facultyName: "Dr. Ananya Sharma",
    department: "Computer Science",
    from: "2025-09-20",
    to: "2025-09-22",
    days: 3,
    reason: "Conference presentation",
    status: "Pending",
  },
  {
    id: "L002",
    facultyId: "FAC002",
    facultyName: "Prof. Rahul Verma",
    department: "Computer Science",
    from: "2025-09-25",
    to: "2025-09-25",
    days: 1,
    reason: "Medical appointment",
    status: "Approved",
    note: "Approved - submit report post-visit",
  },
  {
    id: "L003",
    facultyId: "FAC003",
    facultyName: "Dr. Neha Iyer",
    department: "Electronics",
    from: "2025-09-18",
    to: "2025-09-19",
    days: 2,
    reason: "Personal work",
    status: "Pending",
  },
];

const ui = {
  wrap: "w-full max-w-7xl mx-auto p-4 md:p-6 text-sm md:text-base",
  header: "mb-4",
  title: "text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100",
  sub: "text-gray-600 dark:text-gray-300",
  section:
    "rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm p-4",
  filters: "grid grid-cols-1 md:grid-cols-5 gap-3",
  input:
    "w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none",
  tableWrap: "overflow-auto -mx-2 md:mx-0 mt-3",
  table: "min-w-[740px] w-full border-separate border-spacing-0 text-sm",
  th: "bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-left p-3 border-b border-gray-200 dark:border-gray-800",
  td: "p-3 border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 align-top",
  btnRow: "flex items-center gap-2",
  btnApprove:
    "inline-flex items-center rounded-md bg-green-600 text-white px-3 py-1.5 hover:bg-green-700 active:bg-green-800 transition",
  btnReject:
    "inline-flex items-center rounded-md bg-red-600 text-white px-3 py-1.5 hover:bg-red-700 active:bg-red-800 transition",
  badge:
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
  modalBackdrop:
    "fixed inset-0 bg-black/50 flex items-end md:items-center justify-center p-0 md:p-4 z-50",
  modal:
    "w-full md:max-w-md bg-white dark:bg-gray-950 rounded-t-xl md:rounded-xl border border-gray-200 dark:border-gray-800 p-4",
  modalTitle: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2",
  modalActions: "flex items-center justify-end gap-2 mt-3",
  btnGhost:
    "rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900",
  btnPrimary:
    "rounded-md bg-indigo-600 text-white px-3 py-1.5 hover:bg-indigo-700 active:bg-indigo-800",
};

export default function FacultyLeaves() {
  const [statusFilter, setStatusFilter] = useState<LeaveStatus | "">("");
  const [facultyFilter, setFacultyFilter] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rows, setRows] = useState<Leave[]>(LEAVES);

  const [rejecting, setRejecting] = useState<Leave | null>(null);
  const [rejectNote, setRejectNote] = useState("");

  const deptRows = useMemo(
    () => rows.filter(r => r.department === HOD_DEPARTMENT),
    [rows]
  );

  const filtered = useMemo(() => {
    return deptRows
      .filter(r => (statusFilter ? r.status === statusFilter : true))
      .filter(r =>
        facultyFilter
          ? r.facultyName.toLowerCase().includes(facultyFilter.toLowerCase())
          : true
      )
      .filter(r => (from ? r.to >= from : true))
      .filter(r => (to ? r.from <= to : true));
  }, [deptRows, statusFilter, facultyFilter, from, to]);

  const approve = (id: string) => {
    setRows(prev =>
      prev.map(r => (r.id === id ? { ...r, status: "Approved", note: r.note } : r))
    );
  };

  const startReject = (row: Leave) => {
    setRejecting(row);
    setRejectNote("");
  };

  const confirmReject = () => {
    if (!rejecting) return;
    setRows(prev =>
      prev.map(r =>
        r.id === rejecting.id ? { ...r, status: "Rejected", note: rejectNote } : r
      )
    );
    setRejecting(null);
    setRejectNote("");
  };

  return (
    <div className={ui.wrap}>
      <div className={ui.header}>
        <div className={ui.title}>Faculty Leave Requests</div>
        <div className={ui.sub}>Department: {HOD_DEPARTMENT}</div>
      </div>

      <section className={ui.section}>
        <div className={ui.filters}>
          <input
            className={ui.input}
            type="date"
            value={from}
            onChange={e => setFrom(e.target.value)}
            placeholder="From"
          />
          <input
            className={ui.input}
            type="date"
            value={to}
            onChange={e => setTo(e.target.value)}
            placeholder="To"
          />
          <input
            className={ui.input}
            placeholder="Filter by faculty name"
            value={facultyFilter}
            onChange={e => setFacultyFilter(e.target.value)}
          />
          <select
            className={ui.input}
            value={statusFilter}
            onChange={e => setStatusFilter((e.target.value as LeaveStatus) || "")}
          >
            <option value="">All statuses</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
          <button
            className={ui.btnGhost}
            onClick={() => {
              setFrom("");
              setTo("");
              setFacultyFilter("");
              setStatusFilter("");
            }}
          >
            Clear
          </button>
        </div>

        <div className={ui.tableWrap}>
          <table className={ui.table}>
            <thead>
              <tr>
                <th className={ui.th}>Faculty</th>
                <th className={ui.th}>Department</th>
                <th className={ui.th}>Dates</th>
                <th className={ui.th}>Days</th>
                <th className={ui.th}>Reason</th>
                <th className={ui.th}>Status</th>
                <th className={ui.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id}>
                  <td className={ui.td}>
                    <div className="font-medium">{row.facultyName}</div>
                    {row.note && (
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Note: {row.note}
                      </div>
                    )}
                  </td>
                  <td className={ui.td}>{row.department}</td>
                  <td className={ui.td}>
                    {row.from} → {row.to}
                  </td>
                  <td className={ui.td}>{row.days}</td>
                  <td className={ui.td}>{row.reason}</td>
                  <td className={ui.td}>
                    <span className={ui.badge}>{row.status}</span>
                  </td>
                  <td className={ui.td}>
                    <div className={ui.btnRow}>
                      <button
                        className={ui.btnApprove}
                        onClick={() => approve(row.id)}
                        disabled={row.status === "Approved"}
                      >
                        Approve
                      </button>
                      <button
                        className={ui.btnReject}
                        onClick={() => startReject(row)}
                        disabled={row.status === "Rejected"}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className={ui.td} colSpan={7}>
                    No leave requests for current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {rejecting && (
        <div className={ui.modalBackdrop} role="dialog" aria-modal="true">
          <div className={ui.modal}>
            <div className={ui.modalTitle}>Add rejection note</div>
            <textarea
              className="w-full h-28 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Provide reason for rejection..."
              value={rejectNote}
              onChange={e => setRejectNote(e.target.value)}
            />
            <div className={ui.modalActions}>
              <button className={ui.btnGhost} onClick={() => setRejecting(null)}>
                Cancel
              </button>
              <button
                className={ui.btnPrimary}
                onClick={confirmReject}
                disabled={!rejectNote.trim()}
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
