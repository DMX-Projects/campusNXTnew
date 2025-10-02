
import React, { useState, useMemo } from "react";
import { Search, Download, BookOpen, GraduationCap, FileIcon, FileText, FileImage } from "lucide-react";
import { useTheme } from "../../../../contexts/ThemeContext";

// Simple toast feedback (replace with your toast system if preferred)
const showToast = (message: string) => alert(message);

interface StudyMaterial {
  id: number;
  department: string;
  semester: string;
  year: string;
  program: string;
  subject: string;
  title: string;
  type: string;
  uploadedBy: string;
  uploadedOn: string;
  downloads: number;
  fileUrl: string;
}

// Your study materials array here (replace or extend as needed)
const studyMaterials: StudyMaterial[] = [
  {
    id: 1,
    department: "Engineering",
    semester: "Semester 3",
    year: "2024",
    program: "B.Tech",
    subject: "Mathematics",
    title: "Linear Algebra Notes",
    type: "Notes",
    uploadedBy: "Prof. Sharma",
    uploadedOn: "2024-07-01",
    downloads: 120,
    fileUrl: "/files/Linear_Algebra_Notes.pdf",
  },
  {
    id: 2,
    department: "Engineering",
    semester: "Semester 4",
    year: "2024",
    program: "B.Tech",
    subject: "Physics",
    title: "Quantum Mechanics PPT",
    type: "PPT",
    uploadedBy: "Prof. Singh",
    uploadedOn: "2024-07-05",
    downloads: 95,
    fileUrl: "/files/Quantum_Mechanics_PPT.pdf",
  },
  {
    id: 3,
    department: "Computer Science",
    semester: "Semester 5",
    year: "2024",
    program: "B.Tech",
    subject: "Computer Science",
    title: "Data Structures Assignment",
    type: "Assignment",
    uploadedBy: "Dr. Verma",
    uploadedOn: "2024-07-08",
    downloads: 75,
    fileUrl: "/files/Data_Structures_Assignment.pdf",
  },
  {
    id: 4,
    department: "Arts",
    semester: "Semester 2",
    year: "2024",
    program: "BA",
    subject: "English",
    title: "Poetry Analysis Book",
    type: "Book",
    uploadedBy: "Prof. Nair",
    uploadedOn: "2024-07-10",
    downloads: 60,
    fileUrl: "/files/Poetry_Analysis_Book.pdf",
  },
  {
    id: 5,
    department: "Science",
    semester: "Semester 3",
    year: "2024",
    program: "B.Sc",
    subject: "Chemistry",
    title: "Organic Chemistry Notes",
    type: "Notes",
    uploadedBy: "Prof. Khan",
    uploadedOn: "2024-07-12",
    downloads: 110,
    fileUrl: "/files/Organic_Chemistry_Notes.pdf",
  },
  {
    id: 6,
    department: "Engineering",
    semester: "Semester 6",
    year: "2023",
    program: "B.Tech",
    subject: "Computer Science",
    title: "Machine Learning Notes",
    type: "Notes",
    uploadedBy: "Dr. Patel",
    uploadedOn: "2024-07-15",
    downloads: 140,
    fileUrl: "/files/ML_Notes.pdf",
  },
  {
    id: 7,
    department: "Science",
    semester: "Semester 1",
    year: "2024",
    program: "M.Sc",
    subject: "Biology",
    title: "Cell Biology PPT",
    type: "PPT",
    uploadedBy: "Prof. Reddy",
    uploadedOn: "2024-07-18",
    downloads: 88,
    fileUrl: "/files/Cell_Biology.pdf",
  },
];

// Returns corresponding Lucide icon for file type
const getFileIcon = (type: string) => {
  switch(type) {
    case "Notes": return <FileText className="w-4 h-4 mr-1 text-blue-600" />;
    case "PPT": return <FileIcon className="w-4 h-4 mr-1 text-green-600" />;
    case "Assignment": return <FileText className="w-4 h-4 mr-1 text-purple-600" />;
    case "Book": return <FileImage className="w-4 h-4 mr-1 text-pink-600" />;
    default: return <FileIcon className="w-4 h-4 mr-1 text-gray-500" />;
  }
};

export default function StudyMaterialPage() {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedProgram, setSelectedProgram] = useState("All");
  const [sortBy, setSortBy] = useState<"downloads" | "uploadedOn">("downloads");

  // Unique filter option lists
  const departments = ["All", ...Array.from(new Set(studyMaterials.map(m => m.department)))];
  const semesters = ["All", ...Array.from(new Set(studyMaterials.map(m => m.semester)))];
  const years = ["All", ...Array.from(new Set(studyMaterials.map(m => m.year)))];
  const programs = ["All", ...Array.from(new Set(studyMaterials.map(m => m.program)))];

  // Filter + sort study materials list
  const filteredData = useMemo(() => {
    let data = studyMaterials.filter(
      (mat) =>
        (filterType === "All" || mat.type === filterType) &&
        (selectedDepartment === "All" || mat.department === selectedDepartment) &&
        (selectedSemester === "All" || mat.semester === selectedSemester) &&
        (selectedYear === "All" || mat.year === selectedYear) &&
        (selectedProgram === "All" || mat.program === selectedProgram) &&
        (mat.subject.toLowerCase().includes(search.toLowerCase()) ||
          mat.title.toLowerCase().includes(search.toLowerCase()))
    );
    // Sort by selected method
    data.sort((a, b) =>
      sortBy === "downloads"
        ? b.downloads - a.downloads
        : new Date(b.uploadedOn).getTime() - new Date(a.uploadedOn).getTime()
    );
    return data;
  }, [search, filterType, selectedDepartment, selectedSemester, selectedYear, selectedProgram, sortBy]);

  // Download handler with feedback
  const handleDownload = (mat: StudyMaterial) => {
    const link = document.createElement("a");
    link.href = mat.fileUrl;
    link.download = mat.title.replace(/\s+/g, "_");
    link.click();
    showToast(`"${mat.title}" download started`);
  };

  // Theme-dependent styles
  const bgMain = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const bgCard = theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white";
  const textHeader = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const border = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const tableHeaderBg = theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-700";
  const tableRowHover = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-500";
  const btnPrimary = theme === "dark"
    ? "bg-blue-600 hover:bg-blue-800 text-white"
    : "bg-blue-600 hover:bg-blue-700 text-white";
  const filterFocus = theme === "dark"
    ? "focus:ring-blue-300 focus:border-blue-300"
    : "focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 ${bgMain} transition-colors duration-300 p-4 sm:p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className={`rounded-xl shadow-sm p-4 sm:p-6 bg-gray-100 dark:bg-slate-900 transition-colors duration-300  ${bgCard}`}>
          <div className="flex items-center gap-3 mb-2 ">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <h1 className={`text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100`}>Study Materials</h1>
          </div>
          <p className={`${theme === "dark" ? "text-gray-500" : "text-gray-100"} text-sm sm:text-base`}>
            Browse and download course materials
          </p>
        </div>

        {/* Filters */}
        <div className={`rounded-xl shadow-sm p-4 sm:p-6 space-y-4 bg-gray-50 dark:bg-slate-900 transition-colors duration-300 ${bgCard} sticky top-0 z-20`}>
          <div className={`flex items-center border ${border} rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 ${filterFocus}`}>
            <Search className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              aria-label="Search materials"
              placeholder="Search by subject or title..."
              className={`w-full outline-none text-sm sm:text-base bg-gray-50 dark:bg-slate-900 transition-colors duration-300   ${theme === "dark" ? "bg-gray-800 text-gray-100 placeholder:text-gray-400" : ""}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <select
              className={`border bg-gray-50 dark:bg-slate-900 transition-colors duration-300  ${border} px-3 py-2 rounded-lg shadow-sm text-sm outline-none ${filterFocus} ${theme === "dark" ? "bg-gray-800 text-gray-100" : ""}`}
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              aria-label="Department"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept === "All" ? "All Departments" : dept}</option>
              ))}
            </select>

            <select
              className={`border bg-gray-50 dark:bg-slate-900 transition-colors duration-300  ${border} px-3 py-2 rounded-lg shadow-sm text-sm outline-none ${filterFocus} ${theme === "dark" ? "bg-gray-800 text-gray-100" : ""}`}
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              aria-label="Program"
            >
              {programs.map(prog => (
                <option key={prog} value={prog}>{prog === "All" ? "All Programs" : prog}</option>
              ))}
            </select>

            <select
              className={`border bg-gray-50 dark:bg-slate-900 transition-colors duration-300  ${border} px-3 py-2 rounded-lg shadow-sm text-sm outline-none ${filterFocus} ${theme === "dark" ? "bg-gray-800 text-gray-100" : ""}`}
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              aria-label="Year"
            >
              {years.map(yr => (
                <option key={yr} value={yr}>{yr === "All" ? "All Years" : yr}</option>
              ))}
            </select>

            <select
              className={`border bg-gray-50 dark:bg-slate-900 transition-colors duration-300  ${border} px-3 py-2 rounded-lg shadow-sm text-sm outline-none ${filterFocus} ${theme === "dark" ? "bg-gray-800 text-gray-100" : ""}`}
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              aria-label="Semester"
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>{sem === "All" ? "All Semesters" : sem}</option>
              ))}
            </select>

            <select
              className={`border bg-gray-50 dark:bg-slate-900 transition-colors duration-300  ${border} px-3 py-2 rounded-lg shadow-sm text-sm outline-none ${filterFocus} ${theme === "dark" ? "bg-gray-800 text-gray-100" : ""}`}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              aria-label="Type"
            >
              <option value="All">All Types</option>
              <option value="Notes">Notes</option>
              <option value="PPT">PPT</option>
              <option value="Assignment">Assignment</option>
              <option value="Book">Book</option>
            </select>

            <select
              className={`border bg-gray-50 dark:bg-slate-900 transition-colors duration-300  ${border} px-3 py-2 rounded-lg shadow-sm text-sm outline-none ${filterFocus} ${theme === "dark" ? "bg-gray-800 text-gray-100" : ""}`}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "downloads" | "uploadedOn")}
              aria-label="Sort by"
            >
              <option value="downloads">Sort by Popularity</option>
              <option value="uploadedOn">Sort by Newest</option>
            </select>
          </div>
          <div className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Showing <span className="font-semibold text-blue-600">{filteredData.length}</span> results
          </div>
        </div>

        {/* Desktop Table */}
        <div className={`hidden lg:block rounded-xl shadow-sm overflow-hidden bg-gray-50 dark:bg-slate-900 transition-colors duration-300  ${bgCard}`}>
          <div className="overflow-x-auto">
            <table className="min-w-full" role="table">
              <thead className={`border-b bg-gray-50 dark:bg-slate-300 transition-colors duration-300  ${tableHeaderBg}`}>
                <tr>
                  <th aria-label="Department" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Department</th>
                  <th aria-label="Program" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Program</th>
                  <th aria-label="Semester" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Semester</th>
                  <th aria-label="Subject" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Subject</th>
                  <th aria-label="Title" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Title</th>
                  <th aria-label="Type" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Type</th>
                  <th aria-label="Uploaded By" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Uploaded By</th>
                  <th aria-label="Downloads" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Downloads</th>
                  <th aria-label="Action" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
                {filteredData.map((mat) => (
                  <tr key={mat.id} className={`${tableRowHover} transition-colors`} tabIndex={0}>
                    <td className="px-4 py-3 text-sm">{mat.department}</td>
                    <td className="px-4 py-3 text-sm">{mat.program}</td>
                    <td className="px-4 py-3 text-sm">{mat.semester}</td>
                    <td className="px-4 py-3 text-sm font-medium">{mat.subject}</td>
                    <td className="px-4 py-3 text-sm flex items-center">
                      {getFileIcon(mat.type)}
                      {mat.title}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {mat.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{mat.uploadedBy}</td>
                    <td className="px-4 py-3 text-sm">{mat.downloads}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDownload(mat)}
                        className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors ${btnPrimary}`}
                        aria-label={`Download ${mat.title}`}
                      >
                        <Download className="w-4 h-4" /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredData.map((mat) => (
            <div key={mat.id} className={`rounded-xl shadow-sm p-4 space-y-3 ${bgCard}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-base mb-1 flex items-center">
                    {getFileIcon(mat.type)}
                    {mat.title}
                  </h3>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-sm`}>{mat.subject}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {mat.type}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Department:</span>
                  <p className="font-medium">{mat.department}</p>
                </div>
                <div>
                  <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Program:</span>
                  <p className="font-medium">{mat.program}</p>
                </div>
                <div>
                  <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Semester:</span>
                  <p className="font-medium">{mat.semester}</p>
                </div>
                <div>
                  <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Downloads:</span>
                  <p className="font-medium">{mat.downloads}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className={`text-xs mb-3 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  Uploaded by {mat.uploadedBy} on {mat.uploadedOn}
                </p>
                <button
                  onClick={() => handleDownload(mat)}
                  className={`w-full px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors ${btnPrimary}`}
                  aria-label={`Download ${mat.title}`}
                >
                  <Download className="w-4 h-4" /> Download Material
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Data */}
        {filteredData.length === 0 && (
          <div className={`rounded-xl shadow-sm p-12 text-center ${bgCard}`}>
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-gray-100" : "text-gray-700"}`}>No materials found</h3>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
