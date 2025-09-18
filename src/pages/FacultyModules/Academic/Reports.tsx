 import { useState } from "react";

type Report = {
  id: number;
  name: string;
  submittedBy: string;
  date: string;
  type: string;
  status: "Reviewed" | "Pending" | "Rejected";
};

export default function FacultyReports() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      name: "Annual Department Review",
      submittedBy: "Prof. Sharma",
      date: "2025-09-05",
      type: "Review",
      status: "Reviewed",
    },
    {
      id: 2,
      name: "Lab Equipment Status",
      submittedBy: "Dr. Patel",
      date: "2025-09-12",
      type: "Inventory",
      status: "Pending",
    },
  ]);

  const [filters, setFilters] = useState({
    type: "",
    fromDate: "",
    toDate: "",
    search: "",
  });

  const [showUpload, setShowUpload] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: "",
    type: "General",
    file: null as File | null,
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as any;
    setUploadForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.name || !uploadForm.file) {
      alert("Please fill all fields and upload a file");
      return;
    }
    const newReport: Report = {
      id: reports.length + 1,
      name: uploadForm.name,
      submittedBy: "You",
      date: new Date().toISOString().split("T")[0],
      type: uploadForm.type,
      status: "Pending",
    };
    setReports((prev) => [newReport, ...prev]);
    setShowUpload(false);
    setUploadForm({ name: "", type: "General", file: null });
  };

  // Export filtered reports as CSV
  const handleDownload = () => {
    const headers = ["Report Name", "Submitted By", "Date", "Type", "Status"];
    const rows = filteredReports.map((r) =>
      [r.name, r.submittedBy, r.date, r.type, r.status].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "faculty-reports.csv";
    a.click();
  };

  const filteredReports = reports.filter((report) => {
    const matchType = filters.type ? report.type === filters.type : true;
    const matchFrom = filters.fromDate ? report.date >= filters.fromDate : true;
    const matchTo = filters.toDate ? report.date <= filters.toDate : true;
    const matchSearch = filters.search
      ? report.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        report.submittedBy.toLowerCase().includes(filters.search.toLowerCase()) ||
        report.type.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    return matchType && matchFrom && matchTo && matchSearch;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">
        Department Reports
      </h2>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md mb-6 grid gap-4 md:grid-cols-4">
        <div>
          <label className="block mb-1 text-sm font-medium dark:text-gray-200">
            Report Type
          </label>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All</option>
            <option>Review</option>
            <option>Inventory</option>
            <option>General</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium dark:text-gray-200">
            From Date
          </label>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium dark:text-gray-200">
            To Date
          </label>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium dark:text-gray-200">
            Search
          </label>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search reports..."
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mb-4 flex flex-wrap gap-3">
        <button
          onClick={() => setShowUpload(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Upload Report
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Download CSV
        </button>
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2 text-left dark:text-white">Report Name</th>
              <th className="px-4 py-2 text-left dark:text-white">Submitted By</th>
              <th className="px-4 py-2 text-left dark:text-white">Date</th>
              <th className="px-4 py-2 text-left dark:text-white">Type</th>
              <th className="px-4 py-2 text-left dark:text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center px-4 py-6 text-gray-500 dark:text-gray-400"
                >
                  No reports found.
                </td>
              </tr>
            ) : (
              filteredReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2 dark:text-gray-200">{report.name}</td>
                  <td className="px-4 py-2 dark:text-gray-200">
                    {report.submittedBy}
                  </td>
                  <td className="px-4 py-2 dark:text-gray-200">{report.date}</td>
                  <td className="px-4 py-2 dark:text-gray-200">{report.type}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        report.status === "Reviewed"
                          ? "bg-green-100 text-green-700"
                          : report.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md relative z-50">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Upload Report
            </h3>
            <form onSubmit={handleUploadSubmit}>
              <div className="mb-3">
                <label className="block mb-1 text-sm font-medium dark:text-gray-200">
                  Report Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={uploadForm.name}
                  onChange={handleUploadChange}
                  className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm font-medium dark:text-gray-200">
                  Report Type
                </label>
                <select
                  name="type"
                  value={uploadForm.type}
                  onChange={handleUploadChange}
                  className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
                >
                  <option>General</option>
                  <option>Review</option>
                  <option>Inventory</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm font-medium dark:text-gray-200">
                  File
                </label>
                <input
                  type="file"
                  name="file"
                  onChange={handleUploadChange}
                  className="w-full text-gray-700 dark:text-gray-200"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
