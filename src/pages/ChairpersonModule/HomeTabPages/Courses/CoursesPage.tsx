import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Plus } from "lucide-react";
import { mockCourses } from "../../../../data/mockData";
import { Course } from "../../../../data/mockData";
import { Table } from "../../../../components/UI/Table";
import { StatusToggle } from "../../../../components/UI/StatusToggle";
import { SearchBar } from "../../../../components/UI/SearchBar";
import { Pagination } from "../../../../components/UI/Pagination";
import { usePagination } from "../../../../hooks/usePagination";

export const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    program: "",
    department: "",
    year: "",
    semester: "",
    status: "",
    examType: "",
  });

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      return (
        (filters.program ? course.program === filters.program : true) &&
        (filters.department
          ? course.department === filters.department
          : true) &&
        (filters.year ? course.year === Number(filters.year) : true) &&
        (filters.semester
          ? course.semester === Number(filters.semester)
          : true) &&
        (filters.status ? course.status === filters.status : true) &&
        (filters.examType ? course.examType === filters.examType : true) &&
        (course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.department.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  }, [courses, searchTerm, filters]);

  const pagination = usePagination({
    data: filteredCourses,
    itemsPerPage: 10,
  });

  const handleStatusToggle = (
    courseId: string,
    newStatus: "active" | "inactive"
  ) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, status: newStatus } : c))
    );
  };

  const columns = [
    { key: "code", label: "Code" },
    { key: "name", label: "Name" },
    { key: "program", label: "Program" },
    { key: "department", label: "Department" },
    { key: "year", label: "Year" },
    { key: "semester", label: "Semester" },
    { key: "credits", label: "Credits" },
    { key: "examType", label: "Exam Type" },
    { key: "internalMarks", label: "Internal" },
    { key: "externalMarks", label: "External" },
    { key: "status", label: "Status" },
  ];

  const renderActions = (course: Course) => (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => navigate(`/home/courses/edit/${course.id}`)}
        className="text-purple-600 hover:text-purple-900"
      >
        <Edit className="h-4 w-4" />
      </button>
      <StatusToggle
        isActive={course.status === "active"}
        onChange={(isActive) =>
          handleStatusToggle(course.id, isActive ? "active" : "inactive")
        }
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Courses</h1>
        <button
          onClick={() => navigate("/home/courses/add")}
          className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 inline-block mr-2" />
          Add Course
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 bg-white p-4 rounded shadow">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search..."
        />
        <select
          value={filters.program}
          onChange={(e) => setFilters({ ...filters, program: e.target.value })}
          className="border rounded px-3 py-2"
        >
          <option value="">All Programs</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Postgraduate">Postgraduate</option>
        </select>
        <select
          value={filters.department}
          onChange={(e) =>
            setFilters({ ...filters, department: e.target.value })
          }
          className="border rounded px-3 py-2"
        >
          <option value="">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mechanical">Mechanical</option>
        </select>
        <select
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          className="border rounded px-3 py-2"
        >
          <option value="">All Years</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
        <select
          value={filters.semester}
          onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
          className="border rounded px-3 py-2"
        >
          <option value="">All Semesters</option>
          <option value="1">Sem 1</option>
          <option value="2">Sem 2</option>
        </select>
        <select
          value={filters.examType}
          onChange={(e) => setFilters({ ...filters, examType: e.target.value })}
          className="border rounded px-3 py-2"
        >
          <option value="">All Exam Types</option>
          <option value="Theory">Theory</option>
          <option value="Lab">Lab</option>
          <option value="Practical">Practical</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border rounded px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow">
        <Table
          columns={columns}
          data={pagination.paginatedData}
          actions={renderActions}
        />
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
