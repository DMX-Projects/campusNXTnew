 import React, { useState, useMemo, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Search, Filter, Download, Users, TrendingUp, AlertTriangle, Calendar, Clock, UserCheck, FileDown, Plus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";

interface Student {
  regNo: string;
  name: string;
  program: string;
  percentage: number;
  totalClasses: number;
  attendedClasses: number;
  department: string;
  semester: number;
  section: string;
}

interface AttendanceRecord {
  id: string;
  regNo: string;
  name: string;
  date: string;
  timeIn?: string;
  timeOut?: string;
  status: 'present' | 'absent' | 'late';
  section: string;
  department: string;
}

interface AttendanceRange {
  range: string;
  count: number;
  color: string;
}

const StudentAttendance: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  
  // Fixed student data - removed duplicates
  const students: Student[] = [
    { regNo: "01027EE001", name: "Sandeep Kumar", program: "B.TECH CS", percentage: 76, totalClasses: 120, attendedClasses: 91, department: "CSE", semester: 5, section: "A" },
    { regNo: "01027EE002", name: "Priya Sharma", program: "B.TECH CS", percentage: 67, totalClasses: 120, attendedClasses: 80, department: "CSE", semester: 5, section: "A" },
    { regNo: "01027EE003", name: "Amit Patel", program: "B.TECH CS", percentage: 81, totalClasses: 120, attendedClasses: 97, department: "CSE", semester: 5, section: "B" },
    { regNo: "01027EE004", name: "Rahul Singh", program: "B.TECH CS", percentage: 62, totalClasses: 120, attendedClasses: 74, department: "CSE", semester: 5, section: "A" },
    { regNo: "01027EE005", name: "Amit Gupta", program: "B.TECH CS", percentage: 74, totalClasses: 120, attendedClasses: 89, department: "CSE", semester: 5, section: "B" },
    { regNo: "01027EE006", name: "Neha Verma", program: "B.TECH CS", percentage: 85, totalClasses: 120, attendedClasses: 102, department: "CSE", semester: 5, section: "A" },
    { regNo: "01027EE007", name: "Ravi Kumar", program: "B.TECH CS", percentage: 59, totalClasses: 120, attendedClasses: 71, department: "CSE", semester: 5, section: "C" },
    { regNo: "01027EE008", name: "Pooja Reddy", program: "B.TECH CS", percentage: 71, totalClasses: 120, attendedClasses: 85, department: "CSE", semester: 5, section: "B" },
    { regNo: "01027EE009", name: "Karan Joshi", program: "B.TECH CS", percentage: 64, totalClasses: 120, attendedClasses: 77, department: "CSE", semester: 5, section: "C" },
    { regNo: "01027EE010", name: "Simran Kaur", program: "B.TECH CS", percentage: 78, totalClasses: 120, attendedClasses: 94, department: "CSE", semester: 5, section: "A" },
    { regNo: "02027EE011", name: "Vikash Yadav", program: "B.TECH EE", percentage: 88, totalClasses: 115, attendedClasses: 101, department: "EEE", semester: 5, section: "A" },
    { regNo: "02027EE012", name: "Anita Roy", program: "B.TECH EE", percentage: 72, totalClasses: 115, attendedClasses: 83, department: "EEE", semester: 5, section: "B" },
    { regNo: "02027EE013", name: "Deepak Mehta", program: "B.TECH EE", percentage: 67, totalClasses: 115, attendedClasses: 77, department: "EEE", semester: 5, section: "B" },
    { regNo: "02027EE014", name: "Sunita Jain", program: "B.TECH EE", percentage: 94, totalClasses: 115, attendedClasses: 108, department: "EEE", semester: 5, section: "A" },
    { regNo: "03027EE015", name: "Rohit Sharma", program: "B.TECH ME", percentage: 81, totalClasses: 110, attendedClasses: 89, department: "ME", semester: 5, section: "C" },
    { regNo: "03027EE016", name: "Neha Singh", program: "B.TECH ME", percentage: 63, totalClasses: 110, attendedClasses: 69, department: "ME", semester: 5, section: "B" },
    { regNo: "03027EE017", name: "Ajay Kumar", program: "B.TECH ME", percentage: 77, totalClasses: 110, attendedClasses: 85, department: "ME", semester: 5, section: "C" },
    { regNo: "03027EE018", name: "Alok Mishra", program: "B.TECH ME", percentage: 55, totalClasses: 110, attendedClasses: 61, department: "ME", semester: 5, section: "A" },
    { regNo: "03027EE019", name: "Priya Verma", program: "B.TECH ME", percentage: 69, totalClasses: 110, attendedClasses: 76, department: "ME", semester: 5, section: "B" },
    { regNo: "03027EE020", name: "Sanjay Reddy", program: "B.TECH ME", percentage: 80, totalClasses: 110, attendedClasses: 88, department: "ME", semester: 5, section: "C" },
    { regNo: "04027EE021", name: "Kavita Sharma", program: "B.TECH CS", percentage: 90, totalClasses: 120, attendedClasses: 108, department: "CSE", semester: 5, section: "A" },
    { regNo: "04027EE022", name: "Manish Patel", program: "B.TECH CS", percentage: 68, totalClasses: 120, attendedClasses: 82, department: "CSE", semester: 5, section: "B" },
    { regNo: "04027EE023", name: "Richa Jain", program: "B.TECH CS", percentage: 75, totalClasses: 120, attendedClasses: 90, department: "CSE", semester: 5, section: "C" },
    { regNo: "04027EE024", name: "Ajay Sharma", program: "B.TECH CS", percentage: 83, totalClasses: 120, attendedClasses: 100, department: "CSE", semester: 5, section: "A" },
    { regNo: "04027EE025", name: "Neha Gupta", program: "B.TECH CS", percentage: 61, totalClasses: 120, attendedClasses: 73, department: "CSE", semester: 5, section: "B" },
    { regNo: "05027EE026", name: "Rohit Reddy", program: "B.TECH EE", percentage: 79, totalClasses: 115, attendedClasses: 91, department: "EEE", semester: 5, section: "A" },
    { regNo: "05027EE027", name: "Anjali Sharma", program: "B.TECH EE", percentage: 84, totalClasses: 115, attendedClasses: 97, department: "EEE", semester: 5, section: "B" },
    { regNo: "05027EE028", name: "Vikas Mehta", program: "B.TECH EE", percentage: 66, totalClasses: 115, attendedClasses: 76, department: "EEE", semester: 5, section: "C" },
    { regNo: "05027EE029", name: "Sunil Kumar", program: "B.TECH EE", percentage: 73, totalClasses: 115, attendedClasses: 84, department: "EEE", semester: 5, section: "A" },
    { regNo: "05027EE030", name: "Pooja Sharma", program: "B.TECH EE", percentage: 88, totalClasses: 115, attendedClasses: 101, department: "EEE", semester: 5, section: "B" },
    { regNo: "06027EE031", name: "Karan Verma", program: "B.TECH ME", percentage: 72, totalClasses: 110, attendedClasses: 79, department: "ME", semester: 5, section: "A" },
    { regNo: "06027EE032", name: "Priya Reddy", program: "B.TECH ME", percentage: 85, totalClasses: 110, attendedClasses: 94, department: "ME", semester: 5, section: "B" },
    { regNo: "06027EE033", name: "Rohit Jain", program: "B.TECH ME", percentage: 60, totalClasses: 110, attendedClasses: 66, department: "ME", semester: 5, section: "C" },
    { regNo: "06027EE034", name: "Anita Sharma", program: "B.TECH ME", percentage: 77, totalClasses: 110, attendedClasses: 85, department: "ME", semester: 5, section: "A" },
    { regNo: "06027EE035", name: "Vikas Gupta", program: "B.TECH ME", percentage: 89, totalClasses: 110, attendedClasses: 98, department: "ME", semester: 5, section: "B" },
    { regNo: "07027EE036", name: "Sanjay Kumar", program: "B.TECH CS", percentage: 65, totalClasses: 120, attendedClasses: 78, department: "CSE", semester: 5, section: "C" },
    { regNo: "07027EE037", name: "Ritu Sharma", program: "B.TECH CS", percentage: 82, totalClasses: 120, attendedClasses: 98, department: "CSE", semester: 5, section: "A" },
    { regNo: "07027EE038", name: "Ajay Patel", program: "B.TECH CS", percentage: 74, totalClasses: 120, attendedClasses: 89, department: "CSE", semester: 5, section: "B" },
    { regNo: "07027EE039", name: "Neha Jain", program: "B.TECH CS", percentage: 69, totalClasses: 120, attendedClasses: 83, department: "CSE", semester: 5, section: "C" },
    { regNo: "07027EE040", name: "Vikash Sharma", program: "B.TECH CS", percentage: 91, totalClasses: 120, attendedClasses: 109, department: "CSE", semester: 5, section: "A" },
    { regNo: "08027EE041", name: "Pooja Verma", program: "B.TECH EE", percentage: 78, totalClasses: 115, attendedClasses: 89, department: "EEE", semester: 5, section: "B" },
    { regNo: "08027EE042", name: "Rohit Kumar", program: "B.TECH EE", percentage: 63, totalClasses: 115, attendedClasses: 72, department: "EEE", semester: 5, section: "C" },
    { regNo: "08027EE043", name: "Anjali Reddy", program: "B.TECH EE", percentage: 85, totalClasses: 115, attendedClasses: 98, department: "EEE", semester: 5, section: "A" },
    { regNo: "08027EE044", name: "Karan Mehta", program: "B.TECH EE", percentage: 71, totalClasses: 115, attendedClasses: 82, department: "EEE", semester: 5, section: "B" },
    { regNo: "08027EE045", name: "Neha Gupta", program: "B.TECH EE", percentage: 66, totalClasses: 115, attendedClasses: 76, department: "EEE", semester: 5, section: "C" },
    { regNo: "09027EE046", name: "Ravi Sharma", program: "B.TECH ME", percentage: 74, totalClasses: 110, attendedClasses: 81, department: "ME", semester: 5, section: "A" },
    { regNo: "09027EE047", name: "Priya Jain", program: "B.TECH ME", percentage: 87, totalClasses: 110, attendedClasses: 96, department: "ME", semester: 5, section: "B" },
    { regNo: "09027EE048", name: "Ajay Reddy", program: "B.TECH ME", percentage: 61, totalClasses: 110, attendedClasses: 67, department: "ME", semester: 5, section: "C" },
    { regNo: "09027EE049", name: "Anita Gupta", program: "B.TECH ME", percentage: 79, totalClasses: 110, attendedClasses: 87, department: "ME", semester: 5, section: "A" },
    { regNo: "09027EE050", name: "Vikash Patel", program: "B.TECH ME", percentage: 92, totalClasses: 110, attendedClasses: 101, department: "ME", semester: 5, section: "B" }
  ];

  // Sample attendance records with multiple dates
  const initialAttendanceRecords: AttendanceRecord[] = [
    // Today's attendance
    { id: "1", regNo: "01027EE001", name: "Sandeep Kumar", date: today, timeIn: "09:15", status: "present", section: "A", department: "CSE" },
    { id: "2", regNo: "01027EE002", name: "Priya Sharma", date: today, timeIn: "09:20", status: "late", section: "A", department: "CSE" },
    { id: "3", regNo: "01027EE003", name: "Amit Patel", date: today, timeIn: "09:10", status: "present", section: "B", department: "CSE" },
    { id: "4", regNo: "01027EE006", name: "Neha Verma", date: today, timeIn: "09:05", status: "present", section: "A", department: "CSE" },
    { id: "5", regNo: "01027EE004", name: "Rahul Singh", date: today, status: "absent", section: "A", department: "CSE" },
    
    // Yesterday's attendance
    { id: "6", regNo: "01027EE001", name: "Sandeep Kumar", date: "2025-08-31", timeIn: "09:10", status: "present", section: "A", department: "CSE" },
    { id: "7", regNo: "01027EE002", name: "Priya Sharma", date: "2025-08-31", timeIn: "09:08", status: "present", section: "A", department: "CSE" },
    { id: "8", regNo: "01027EE003", name: "Amit Patel", date: "2025-08-31", status: "absent", section: "B", department: "CSE" },
    
    // Day before yesterday
    { id: "9", regNo: "01027EE001", name: "Sandeep Kumar", date: "2025-08-30", timeIn: "09:25", status: "late", section: "A", department: "CSE" },
    { id: "10", regNo: "01027EE002", name: "Priya Sharma", date: "2025-08-30", timeIn: "09:12", status: "present", section: "A", department: "CSE" },
  ];

  // State management
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSection, setSelectedSection] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [attendanceFilter, setAttendanceFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState(today);
  const [viewMode, setViewMode] = useState<"live" | "dateWise" | "overall" | "analytics">("live");
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);
  const [newAttendance, setNewAttendance] = useState({
    regNo: "",
    status: "present" as "present" | "absent" | "late"
  });
  const recordsPerPage = 8;

  // Get unique values for filters
  const sections = ["All", ...new Set(students.map(s => s.section))];
  const departments = ["All", ...new Set(students.map(s => s.department))];

  // Filter attendance records based on selected date and filters
  const filteredAttendanceRecords = useMemo(() => {
    let filtered = attendanceRecords;

    // Filter by date for live and date-wise views
    if (viewMode === "live") {
      filtered = filtered.filter(record => record.date === today);
    } else if (viewMode === "dateWise") {
      filtered = filtered.filter(record => record.date === selectedDate);
    }

    // Apply other filters
    return filtered.filter((record) => {
      const matchesSearch = 
        record.regNo.toLowerCase().includes(search.toLowerCase()) ||
        record.name.toLowerCase().includes(search.toLowerCase()) ||
        record.department.toLowerCase().includes(search.toLowerCase());
      
      const matchesSection = selectedSection === "All" || record.section === selectedSection;
      const matchesDepartment = selectedDepartment === "All" || record.department === selectedDepartment;
      const matchesStatus = attendanceFilter === "All" || record.status === attendanceFilter;

      return matchesSearch && matchesSection && matchesDepartment && matchesStatus;
    });
  }, [attendanceRecords, search, selectedSection, selectedDepartment, attendanceFilter, selectedDate, viewMode, today]);

  // Filter students for overall view
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = 
        student.regNo.toLowerCase().includes(search.toLowerCase()) ||
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.program.toLowerCase().includes(search.toLowerCase()) ||
        student.department.toLowerCase().includes(search.toLowerCase());
      
      const matchesSection = selectedSection === "All" || student.section === selectedSection;
      const matchesDepartment = selectedDepartment === "All" || student.department === selectedDepartment;
      
      const matchesAttendance = 
        attendanceFilter === "All" ||
        (attendanceFilter === "good" && student.percentage >= 75) ||
        (attendanceFilter === "average" && student.percentage >= 65 && student.percentage < 75) ||
        (attendanceFilter === "poor" && student.percentage < 65);

      return matchesSearch && matchesSection && matchesDepartment && matchesAttendance;
    });
  }, [search, selectedSection, selectedDepartment, attendanceFilter, students]);

  // Fixed pagination calculation
  const currentData = viewMode === "overall" ? filteredStudents : filteredAttendanceRecords;
  
  // Reset page to 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedSection, selectedDepartment, attendanceFilter, viewMode, selectedDate]);

  const totalPages = Math.ceil(currentData.length / recordsPerPage);
  const indexOfFirstRecord = (currentPage - 1) * recordsPerPage;
  const indexOfLastRecord = Math.min(indexOfFirstRecord + recordsPerPage, currentData.length);
  const currentRecords = currentData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Analytics calculations
  const todayAttendance = attendanceRecords.filter(r => r.date === today);
  const presentToday = todayAttendance.filter(r => r.status === "present").length;
  const lateToday = todayAttendance.filter(r => r.status === "late").length;
  const absentToday = students.length - todayAttendance.length;

  const attendanceRanges: AttendanceRange[] = [
    { 
      range: "Present", 
      count: presentToday,
      color: "#10B981"
    },
    { 
      range: "Late", 
      count: lateToday,
      color: "#F59E0B"
    },
    { 
      range: "Absent", 
      count: absentToday,
      color: "#EF4444"
    },
  ];

  // Mark attendance function
  const markAttendance = useCallback(() => {
    if (!newAttendance.regNo) {
      alert("Please select a student!");
      return;
    }

    const student = students.find(s => s.regNo === newAttendance.regNo);
    if (!student) {
      alert("Student not found!");
      return;
    }

    const existingRecord = attendanceRecords.find(
      r => r.regNo === newAttendance.regNo && r.date === (viewMode === "dateWise" ? selectedDate : today)
    );

    if (existingRecord) {
      alert("Attendance already marked for this student on this date!");
      return;
    }

    const currentDate = viewMode === "dateWise" ? selectedDate : today;
    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      regNo: newAttendance.regNo,
      name: student.name,
      date: currentDate,
      timeIn: newAttendance.status !== "absent" ? new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }) : undefined,
      status: newAttendance.status,
      section: student.section,
      department: student.department
    };

    setAttendanceRecords(prev => [...prev, newRecord]);
    setNewAttendance({ regNo: "", status: "present" });
    setShowMarkAttendance(false);
  }, [newAttendance, students, attendanceRecords, today, selectedDate, viewMode]);

  // Export functions
  const exportToCSV = useCallback((data: any[], filename: string) => {
    try {
      let csvContent = "";
      
      if (viewMode === "overall") {
        // Export students data
        csvContent = "Registration No,Name,Program,Department,Section,Attendance %,Total Classes,Attended Classes\n";
        data.forEach((student: Student) => {
          csvContent += `${student.regNo},"${student.name}","${student.program}","${student.department}","${student.section}",${student.percentage},${student.totalClasses},${student.attendedClasses}\n`;
        });
      } else {
        // Export attendance records
        csvContent = "Registration No,Name,Date,Time In,Status,Section,Department\n";
        data.forEach((record: AttendanceRecord) => {
          csvContent += `${record.regNo},"${record.name}","${record.date}","${record.timeIn || 'N/A'}","${record.status}","${record.section}","${record.department}"\n`;
        });
      }

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    }
  }, [viewMode]);

  const handleExport = useCallback(() => {
    const timestamp = new Date().toISOString().split('T')[0];
    let filename = "";
    let data: any[] = [];

    switch (viewMode) {
      case "live":
        filename = `live_attendance_${timestamp}.csv`;
        data = filteredAttendanceRecords;
        break;
      case "dateWise":
        filename = `attendance_${selectedDate}.csv`;
        data = filteredAttendanceRecords;
        break;
      case "overall":
        filename = `student_records_${timestamp}.csv`;
        data = filteredStudents;
        break;
      default:
        filename = `attendance_export_${timestamp}.csv`;
        data = filteredAttendanceRecords;
    }

    exportToCSV(data, filename);
  }, [viewMode, filteredAttendanceRecords, filteredStudents, selectedDate, exportToCSV]);

  const resetFilters = () => {
    setSearch("");
    setSelectedSection("All");
    setSelectedDepartment("All");
    setAttendanceFilter("All");
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "text-green-600 bg-green-50";
      case "late": return "text-yellow-600 bg-yellow-50";
      case "absent": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-50";
    if (percentage >= 75) return "text-blue-600 bg-blue-50";
    if (percentage >= 65) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  // Date-wise attendance analytics
  const last7DaysAttendance = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayRecords = attendanceRecords.filter(r => r.date === dateStr);
      
      days.push({
        date: dateStr,
        present: dayRecords.filter(r => r.status === "present").length,
        late: dayRecords.filter(r => r.status === "late").length,
        absent: students.length - dayRecords.length
      });
    }
    return days;
  }, [attendanceRecords, students.length]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-purple-700 mb-2">Live Attendance Management System</h2>
          <p className="text-gray-600">Real-time attendance tracking and comprehensive analytics</p>
        </div> */}

        {/* View Mode Toggle */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setViewMode("live")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              viewMode === "live" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border hover:bg-gray-50"
            }`}
          >
            <Clock size={16} />
            Live Today
          </button>
          <button
            onClick={() => setViewMode("dateWise")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              viewMode === "dateWise" ? "bg-purple-600 text-white" : "bg-white text-gray-700 border hover:bg-gray-50"
            }`}
          >
            <Calendar size={16} />
            Date Wise
          </button>
          <button
            onClick={() => setViewMode("overall")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              viewMode === "overall" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border hover:bg-gray-50"
            }`}
          >
            <Users size={16} />
            Overall Records
          </button>
          <button
            onClick={() => setViewMode("analytics")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              viewMode === "analytics" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border hover:bg-gray-50"
            }`}
          >
            <TrendingUp size={16} />
            Analytics
          </button>
        </div>

        {/* Date Selector for Date Wise View */}
        {viewMode === "dateWise" && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Mark Attendance Button */}
        {(viewMode === "live" || viewMode === "dateWise") && (
          <div className="mb-6">
            <button
              onClick={() => setShowMarkAttendance(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
            >
              <UserCheck size={16} />
              Mark Attendance
            </button>
          </div>
        )}

        {/* Mark Attendance Modal */}
        {showMarkAttendance && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Mark Attendance</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Number
                  </label>
                  <select
                    value={newAttendance.regNo}
                    onChange={(e) => setNewAttendance({...newAttendance, regNo: e.target.value})}
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Student</option>
                    {students.map(student => (
                      <option key={student.regNo} value={student.regNo}>
                        {student.regNo} - {student.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={newAttendance.status}
                    onChange={(e) => setNewAttendance({...newAttendance, status: e.target.value as any})}
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="present">Present</option>
                    <option value="late">Late</option>
                    <option value="absent">Absent</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={markAttendance}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Mark Attendance
                </button>
                <button
                  onClick={() => setShowMarkAttendance(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {viewMode !== "analytics" && (
          <>
            {/* Enhanced Search and Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 p-2 border rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sections.map(section => (
                    <option key={section} value={section}>Section: {section}</option>
                  ))}
                </select>

                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>Dept: {dept}</option>
                  ))}
                </select>

                <select
                  value={attendanceFilter}
                  onChange={(e) => setAttendanceFilter(e.target.value)}
                  className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {viewMode === "overall" ? (
                    <>
                      <option value="All">All Students</option>
                      <option value="good">Good (≥75%)</option>
                      <option value="average">Average (65-74%)</option>
                      <option value="poor">Poor (&lt;65%)</option>
                    </>
                  ) : (
                    <>
                      <option value="All">All Status</option>
                      <option value="present">Present</option>
                      <option value="late">Late</option>
                      <option value="absent">Absent</option>
                    </>
                  )}
                </select>

                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2 transition-colors"
                >
                  <Filter size={16} />
                  Reset
                </button>

                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                  <FileDown size={16} />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Live Stats Cards */}
            {viewMode === "live" && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                  <h3 className="text-sm font-medium text-gray-500">Present Today</h3>
                  <p className="text-2xl font-bold text-green-600">{presentToday}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
                  <h3 className="text-sm font-medium text-gray-500">Late Today</h3>
                  <p className="text-2xl font-bold text-yellow-600">{lateToday}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
                  <h3 className="text-sm font-medium text-gray-500">Absent Today</h3>
                  <p className="text-2xl font-bold text-red-600">{absentToday}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
                  <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
                  <p className="text-2xl font-bold text-purple-600">{students.length}</p>
                </div>
              </div>
            )}

            {/* Data Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  {viewMode === "live" ? "Today's Attendance" : 
                   viewMode === "dateWise" ? `Attendance for ${selectedDate}` : 
                   "Overall Student Records"}
                </h3>
                <span className="text-sm text-gray-500">
                  {currentData.length} records found
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-100 text-left">
                      <th className="p-3 border font-semibold">Reg No</th>
                      <th className="p-3 border font-semibold">Name</th>
                      {viewMode === "overall" ? (
                        <>
                          <th className="p-3 border font-semibold">Program</th>
                          <th className="p-3 border font-semibold">Department</th>
                          <th className="p-3 border font-semibold">Section</th>
                          <th className="p-3 border font-semibold">Attended/Total</th>
                          <th className="p-3 border font-semibold">Percentage</th>
                        </>
                      ) : (
                        <>
                          <th className="p-3 border font-semibold">Date</th>
                          <th className="p-3 border font-semibold">Time In</th>
                          <th className="p-3 border font-semibold">Status</th>
                          <th className="p-3 border font-semibold">Section</th>
                          <th className="p-3 border font-semibold">Department</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.length > 0 ? (
                      currentRecords.map((record, index) => (
                        <tr key={viewMode === "overall" ? (record as Student).regNo : (record as AttendanceRecord).id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-3 border font-mono text-sm">
                            {viewMode === "overall" ? (record as Student).regNo : (record as AttendanceRecord).regNo}
                          </td>
                          <td className="p-3 border font-medium">
                            {viewMode === "overall" ? (record as Student).name : (record as AttendanceRecord).name}
                          </td>
                          {viewMode === "overall" ? (
                            <>
                              <td className="p-3 border">{(record as Student).program}</td>
                              <td className="p-3 border">{(record as Student).department}</td>
                              <td className="p-3 border text-center">{(record as Student).section}</td>
                              <td className="p-3 border text-center">
                                {(record as Student).attendedClasses}/{(record as Student).totalClasses}
                              </td>
                              <td className="p-3 border">
                                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getAttendanceColor((record as Student).percentage)}`}>
                                  {(record as Student).percentage}%
                                </span>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="p-3 border">{(record as AttendanceRecord).date}</td>
                              <td className="p-3 border text-center">
                                {(record as AttendanceRecord).timeIn || 'N/A'}
                              </td>
                              <td className="p-3 border">
                                <div className="flex items-center gap-2">
                                  {(record as AttendanceRecord).status === "present" && <CheckCircle size={16} className="text-green-600" />}
                                  {(record as AttendanceRecord).status === "late" && <Clock size={16} className="text-yellow-600" />}
                                  {(record as AttendanceRecord).status === "absent" && <XCircle size={16} className="text-red-600" />}
                                  <span className={`px-2 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor((record as AttendanceRecord).status)}`}>
                                    {(record as AttendanceRecord).status}
                                  </span>
                                </div>
                              </td>
                              <td className="p-3 border text-center">{(record as AttendanceRecord).section}</td>
                              <td className="p-3 border">{(record as AttendanceRecord).department}</td>
                            </>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={viewMode === "overall" ? 7 : 7} className="text-center p-8 text-gray-500">
                          No records found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Fixed Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstRecord + 1} to {indexOfLastRecord} of {currentData.length} records
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(1)}
                      className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
                    >
                      First
                    </button>
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                      className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
                    >
                      ◀ Previous
                    </button>

                    {/* Page numbers */}
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 border rounded-lg transition-colors ${
                            currentPage === pageNum ? "bg-purple-500 text-white" : "bg-white hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
                    >
                      Next ▶
                    </button>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
                    >
                      Last
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions for Live View */}
            {viewMode === "live" && (
              <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      const absentStudents = students.filter(s => 
                        !todayAttendance.some(r => r.regNo === s.regNo)
                      );
                      const newRecords = absentStudents.map(student => ({
                        id: Date.now().toString() + Math.random().toString(),
                        regNo: student.regNo,
                        name: student.name,
                        date: today,
                        status: "absent" as const,
                        section: student.section,
                        department: student.department
                      }));
                      setAttendanceRecords(prev => [...prev, ...newRecords]);
                    }}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Mark All Remaining as Absent
                  </button>
                  <button
                    onClick={() => exportToCSV(todayAttendance, `today_attendance_${today}.csv`)}
                    className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    Export Today's Report
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Analytics View */}
        {viewMode === "analytics" && (
          <div className="space-y-6">
            {/* Today's Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Today's Attendance Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={attendanceRanges}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ range, count }) => `${range}: ${count}`}
                    >
                      {attendanceRanges.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">7-Day Attendance Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={last7DaysAttendance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    />
                    <Line type="monotone" dataKey="present" stroke="#10B981" strokeWidth={3} name="Present" />
                    <Line type="monotone" dataKey="late" stroke="#F59E0B" strokeWidth={2} name="Late" />
                    <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} name="Absent" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Section and Department Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Section-wise Today's Attendance</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={sections.slice(1).map(section => {
                    const sectionToday = todayAttendance.filter(r => r.section === section);
                    const sectionStudents = students.filter(s => s.section === section);
                    return {
                      section,
                      present: sectionToday.filter(r => r.status === "present").length,
                      late: sectionToday.filter(r => r.status === "late").length,
                      absent: sectionStudents.length - sectionToday.length,
                      total: sectionStudents.length
                    };
                  })}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="section" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="present" fill="#10B981" name="Present" />
                    <Bar dataKey="late" fill="#F59E0B" name="Late" />
                    <Bar dataKey="absent" fill="#EF4444" name="Absent" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Department-wise Overall Performance</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={departments.slice(1).map(dept => {
                    const deptStudents = students.filter(s => s.department === dept);
                    const avgAttendance = deptStudents.length > 0 ? 
                      Math.round(deptStudents.reduce((sum, s) => sum + s.percentage, 0) / deptStudents.length) : 0;
                    
                    return {
                      department: dept,
                      students: deptStudents.length,
                      avgAttendance
                    };
                  })}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="#3B82F6" name="Total Students" />
                    <Bar dataKey="avgAttendance" fill="#8B5CF6" name="Avg Attendance %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detailed Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-800 mb-3">Attendance Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Attendance:</span>
                    <span className="font-semibold text-purple-600">
                      {Math.round(students.reduce((sum, s) => sum + s.percentage, 0) / students.length)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students Above 75%:</span>
                    <span className="font-semibold text-green-600">
                      {students.filter(s => s.percentage >= 75).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students Below 65%:</span>
                    <span className="font-semibold text-red-600">
                      {students.filter(s => s.percentage < 65).length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-800 mb-3">Today's Insights</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Attendance Rate:</span>
                    <span className="font-semibold text-blue-600">
                      {students.length > 0 ? Math.round(((presentToday + lateToday) / students.length) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">On Time:</span>
                    <span className="font-semibold text-green-600">{presentToday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Late Arrivals:</span>
                    <span className="font-semibold text-yellow-600">{lateToday}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-800 mb-3">Export Options</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => exportToCSV(todayAttendance, `attendance_${today}.csv`)}
                    className="w-full px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm transition-colors"
                  >
                    Export Today's Data
                  </button>
                  <button
                    onClick={() => exportToCSV(attendanceRecords, `all_attendance_records.csv`)}
                    className="w-full px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm transition-colors"
                  >
                    Export All Records
                  </button>
                  <button
                    onClick={() => exportToCSV(students, `student_database.csv`)}
                    className="w-full px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 text-sm transition-colors"
                  >
                    Export Student Database
                  </button>
                </div>
              </div>
            </div>

            {/* Students Needing Attention */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-red-600 flex items-center gap-2">
                <AlertTriangle size={20} />
                Students Requiring Immediate Attention
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Low Overall Attendance (&lt;65%)</h4>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {students.filter(s => s.percentage < 65).map(student => (
                      <div key={student.regNo} className="flex justify-between text-sm p-2 bg-red-50 rounded">
                        <span>{student.name} ({student.regNo})</span>
                        <span className="text-red-600 font-semibold">{student.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Absent Today</h4>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {students.filter(s => !todayAttendance.some(r => r.regNo === s.regNo)).map(student => (
                      <div key={student.regNo} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                        <span>{student.name} ({student.regNo})</span>
                        <span className="text-gray-600">Section {student.section}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Comparison */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Weekly Attendance Pattern</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { day: 'Monday', attendance: 85, present: 42, late: 3, absent: 5 },
                  { day: 'Tuesday', attendance: 82, present: 39, late: 4, absent: 7 },
                  { day: 'Wednesday', attendance: 88, present: 44, late: 2, absent: 4 },
                  { day: 'Thursday', attendance: 79, present: 37, late: 4, absent: 9 },
                  { day: 'Friday', attendance: 76, present: 35, late: 3, absent: 12 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#10B981" name="Present" />
                  <Bar dataKey="late" fill="#F59E0B" name="Late" />
                  <Bar dataKey="absent" fill="#EF4444" name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Live Clock and Current Info */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <span>Today: {new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={16} />
                <span>Last Updated: {new Date().toLocaleTimeString('en-IN')}</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              ERP System - Academic Management Module
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;