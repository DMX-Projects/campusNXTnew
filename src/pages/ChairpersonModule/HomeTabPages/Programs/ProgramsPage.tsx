import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Plus } from "lucide-react";
import { mockPrograms, Program } from "../../../../data/mockData";
import { SearchBar } from "../../../../components/UI/SearchBar";
import { Table } from "../../../../components/UI/Table";
import { StatusToggle } from "../../../../components/UI/StatusToggle";
import { Pagination } from "../../../../components/UI/Pagination";
import { usePagination } from "../../../../hooks/usePagination";

export const ProgramsPage: React.FC = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Program[]>(mockPrograms);
  const [searchTerm, setSearchTerm] = useState("");
  const [institutionFilter, setInstitutionFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Extract unique values for dropdown filters
  const institutions = Array.from(new Set(mockPrograms.map((p) => p.institutionCode)));
  const branches = Array.from(new Set(mockPrograms.map((p) => p.branchCode)));

  // Apply filters + search
  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesSearch =
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.branchName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesInstitution =
        !institutionFilter || program.institutionCode === institutionFilter;

      const matchesBranch = !branchFilter || program.branchCode === branchFilter;

      const matchesStatus = !statusFilter || program.status === statusFilter;

      return matchesSearch && matchesInstitution && matchesBranch && matchesStatus;
    });
  }, [programs, searchTerm, institutionFilter, branchFilter, statusFilter]);

  const pagination = usePagination({
    data: filteredPrograms,
    itemsPerPage: 10,
  });

  const handleStatusToggle = (programId: string, newStatus: "active" | "inactive") => {
    setPrograms((prev) =>
      prev.map((program) =>
        program.id === programId ? { ...program, status: newStatus } : program
      )
    );
  };

  const columns = [
    { key: "code", label: "Program Code" },
    { key: "name", label: "Program Name" },
    { key: "institutionCode", label: "Institution Code" },
    { key: "branchCode", label: "Branch Code" },
    { key: "branchName", label: "Branch Name" },
    { key: "duration", label: "Duration" },
    { key: "notes", label: "Notes" },
  ];

  const renderActions = (program: Program) => (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => navigate(`/home/programs/edit/${program.id}`)}
        className="text-purple-600 hover:text-purple-900 transition-colors duration-150"
      >
        <Edit className="h-4 w-4" />
      </button>
      <StatusToggle
        isActive={program.status === "active"}
        onChange={(isActive) => handleStatusToggle(program.id, isActive ? "active" : "inactive")}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">MANAGE PROGRAMS</h1>
          <p className="text-gray-600 mt-1">Manage academic programs</p>
        </div>
        <button
          onClick={() => navigate("/home/programs/add")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Program
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 shadow-sm rounded-lg flex flex-wrap gap-4 items-center">
        <div className="w-60">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search programs..."
          />
        </div>

        <select
          value={institutionFilter}
          onChange={(e) => setInstitutionFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Institutions</option>
          {institutions.map((inst) => (
            <option key={inst} value={inst}>
              {inst}
            </option>
          ))}
        </select>

        <select
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Branches</option>
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Programs List</h2>
        </div>

        <Table columns={columns} data={pagination.paginatedData} actions={renderActions} />

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          itemsPerPage={pagination.itemsPerPage}
          totalItems={pagination.totalItems}
          onPageChange={pagination.goToPage}
          onPrevious={pagination.goToPrevious}
          onNext={pagination.goToNext}
        />
      </div>
    </div>
  );
};
