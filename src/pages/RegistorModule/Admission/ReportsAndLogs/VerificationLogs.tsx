import React, { useState, useMemo } from "react";
import { Search, Filter, CheckCircle, XCircle, Clock, UserCheck, FileText } from "lucide-react";

// Mock Data for demonstration
const logs = [
  {
    id: "LOG001",
    candidateId: "CAND20241001",
    candidateName: "John Doe",
    admin: "S. Gupta",
    item: "12th Marksheet",
    status: "Approved",
    remarks: "Verified",
    timestamp: "2024-09-15 10:30 AM",
  },
  {
    id: "LOG002",
    candidateId: "CAND20241002",
    candidateName: "Jane Smith",
    admin: "P. Shah",
    item: "Transfer Certificate",
    status: "Rejected",
    remarks: "TC name mismatch",
    timestamp: "2024-09-14 02:15 PM",
  },
  {
    id: "LOG003",
    candidateId: "CAND20241003",
    candidateName: "Michael Johnson",
    admin: "S. Gupta",
    item: "Photos",
    status: "Approved",
    remarks: "All valid",
    timestamp: "2024-09-13 11:10 AM",
  },
  {
    id: "LOG004",
    candidateId: "CAND20241004",
    candidateName: "Emily Brown",
    admin: "A. Roy",
    item: "Aadhaar Card",
    status: "Approved",
    remarks: "ID correct",
    timestamp: "2024-09-13 08:08 AM",
  },
  {
    id: "LOG005",
    candidateId: "CAND20242002",
    candidateName: "David Wilson",
    admin: "P. Shah",
    item: "10th Marksheet",
    status: "Rejected",
    remarks: "Invalid serial",
    timestamp: "2024-09-12 04:20 PM",
  },
];

const VerificationLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Advanced filter states
  const [adminFilter, setAdminFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [itemFilter, setItemFilter] = useState("");

  // Filter logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.candidateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || log.status === statusFilter;

      const matchesAdmin =
        adminFilter === "" ||
        log.admin.toLowerCase().includes(adminFilter.toLowerCase());

      const matchesItem =
        itemFilter === "" ||
        log.item.toLowerCase().includes(itemFilter.toLowerCase());

      const matchesDate =
        dateFilter === "" ||
        log.timestamp.startsWith(dateFilter); // crude check using YYYY-MM-DD

      return (
        matchesSearch &&
        matchesStatus &&
        matchesAdmin &&
        matchesItem &&
        matchesDate
      );
    });
  }, [searchTerm, statusFilter, adminFilter, itemFilter, dateFilter]);

  const getStatusBadge = (status: string) => {
    const base =
      "px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1";
    switch (status) {
      case "Approved":
        return `${base} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case "Rejected":
        return `${base} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      default:
        return `${base} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            Verification Logs
          </h1>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by candidate ID, name, admin, item..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {/* Status filter */}
                <div className="flex gap-2 flex-wrap">
                  {["All", "Approved", "Rejected"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        statusFilter === status
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Advanced Filters
              </button>
            </div>
          </div>

          {/* Advanced filters example UI */}
          {showFilters && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Verifier/Admin
                  </label>
                  <input
                    type="text"
                    value={adminFilter}
                    onChange={(e) => setAdminFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Search by admin name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Document/Item
                  </label>
                  <input
                    type="text"
                    value={itemFilter}
                    onChange={(e) => setItemFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Search by item"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredLogs.length} of {logs.length} verification logs
          </p>
        </div>

        {/* Logs Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto ">
            <table className="w-full ">
              <thead className="bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Log ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Candidate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Admin
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Document/Item
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Remarks
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {log.id}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {log.candidateName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-300">
                          {log.candidateId}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex gap-1 items-center text-sm text-gray-900 dark:text-white">
                        <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        {log.admin}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {log.item}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={getStatusBadge(log.status)}>
                        {getStatusIcon(log.status)}
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {log.remarks}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {log.timestamp}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No logs found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try changing your filters or search terms.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredLogs.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing 1 to {Math.min(10, filteredLogs.length)} of{" "}
              {filteredLogs.length} results
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationLogs;
