import React, { useState } from "react";
import { Search, UserPlus, Users, GraduationCap, Hash, MapPin, BookOpen, Calendar, Edit3, Trash2, Filter } from "lucide-react";

interface Student {
  id: number;
  name: string;
  rollNo: string;
  roomNo: string;
  course: string;
  year: string;
}

const HostelStudentsList: React.FC = () => {
  // Sample initial data for demonstration
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "Rajesh Kumar",
      rollNo: "CS21001",
      roomNo: "A-201",
      course: "B.Tech Computer Science",
      year: "3rd Year"
    },
    {
      id: 2,
      name: "Priya Sharma",
      rollNo: "ME21045",
      roomNo: "B-103",
      course: "B.Tech Mechanical",
      year: "2nd Year"
    },
    {
      id: 3,
      name: "Ankit Patel",
      rollNo: "EE21023",
      roomNo: "A-305",
      course: "B.Tech Electrical",
      year: "4th Year"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      rollNo: "CE21067",
      roomNo: "C-202",
      course: "B.Tech Civil",
      year: "1st Year"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    roomNo: "",
    course: "",
    year: "",
  });
  
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filterYear, setFilterYear] = useState("");
  const [filterCourse, setFilterCourse] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.rollNo || !formData.roomNo) {
      alert("Please fill required fields!");
      return;
    }

    if (editingId) {
      // Update existing student
      setStudents(prev => prev.map(s => 
        s.id === editingId 
          ? { 
              ...s, 
              name: formData.name.trim(),
              rollNo: formData.rollNo.trim(),
              roomNo: formData.roomNo.trim(),
              course: formData.course.trim(),
              year: formData.year.trim()
            }
          : s
      ));
      setEditingId(null);
    } else {
      // Add new student
      const newStudent: Student = {
        id: Date.now(),
        name: formData.name.trim(),
        rollNo: formData.rollNo.trim(),
        roomNo: formData.roomNo.trim(),
        course: formData.course.trim(),
        year: formData.year.trim(),
      };
      setStudents((prev) => [...prev, newStudent]);
    }

    setFormData({ name: "", rollNo: "", roomNo: "", course: "", year: "" });
  };

  const handleEdit = (student: Student) => {
    setFormData({
      name: student.name,
      rollNo: student.rollNo,
      roomNo: student.roomNo,
      course: student.course,
      year: student.year,
    });
    setEditingId(student.id);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this student record?")) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", rollNo: "", roomNo: "", course: "", year: "" });
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch = [s.name, s.rollNo, s.roomNo].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    );
    const matchesYear = filterYear === "" || s.year.includes(filterYear);
    const matchesCourse = filterCourse === "" || s.course.toLowerCase().includes(filterCourse.toLowerCase());
    
    return matchesSearch && matchesYear && matchesCourse;
  });

  const getUniqueYears = () => {
    const years = students.map(s => s.year).filter(year => year);
    return [...new Set(years)].sort();
  };

  const getUniqueCourses = () => {
    const courses = students.map(s => s.course).filter(course => course);
    return [...new Set(courses)].sort();
  };

  const getYearColor = (year: string) => {
    const colors = {
      "1st": "bg-blue-100 text-blue-800",
      "2nd": "bg-green-100 text-green-800", 
      "3rd": "bg-yellow-100 text-yellow-800",
      "4th": "bg-purple-100 text-purple-800",
    };
    const yearNum = year.split(' ')[0];
    return colors[yearNum as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Student Management System
          </h1>
          <p className="text-gray-600 text-lg">Manage hostel student records efficiently</p>
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Total Students: {students.length}
            </div>
            <div className="flex items-center">
              <Filter className="w-4 h-4 mr-1" />
              Filtered: {filteredStudents.length}
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, roll no, or room..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                />
              </div>

              {/* Year Filter */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 appearance-none bg-white"
                >
                  <option value="">All Years</option>
                  {getUniqueYears().map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Course Filter */}
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 appearance-none bg-white"
                >
                  <option value="">All Courses</option>
                  {getUniqueCourses().map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Student Form */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                {editingId ? <Edit3 className="w-5 h-5 text-emerald-600" /> : <UserPlus className="w-5 h-5 text-emerald-600" />}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {editingId ? "Edit Student" : "Add New Student"}
              </h2>
              {editingId && (
                <button
                  onClick={cancelEdit}
                  className="ml-auto px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Student Name *"
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    required
                  />
                </div>

                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="rollNo"
                    value={formData.rollNo}
                    placeholder="Roll Number *"
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    required
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="roomNo"
                    value={formData.roomNo}
                    placeholder="Room Number *"
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    required
                  />
                </div>

                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    placeholder="Course (e.g., B.Tech Computer Science)"
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  />
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:ring-4 focus:ring-emerald-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {editingId ? "Update Student" : "Add Student"}
              </button>
            </div>
          </div>
        </div>

        {/* Students Display */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
                Student Records ({filteredStudents.length})
              </h3>
            </div>

            {filteredStudents.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">No students found</p>
                <p className="text-gray-400 text-sm mt-2">Add some student records to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{student.name}</h4>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Hash className="w-4 h-4 mr-1" />
                          {student.rollNo}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(student)}
                          className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors duration-150"
                          title="Edit student"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-150"
                          title="Delete student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">Room: </span>
                        <span className="ml-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium">
                          {student.roomNo}
                        </span>
                      </div>

                      {student.course && (
                        <div className="flex items-center">
                          <GraduationCap className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-700 truncate">{student.course}</span>
                        </div>
                      )}

                      {student.year && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getYearColor(student.year)}`}>
                            {student.year}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelStudentsList;