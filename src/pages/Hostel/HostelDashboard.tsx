import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";

const HostelDashboard: React.FC = () => {
  // Dummy Data
  const employeeAttendance = [
    { name: "Jan", teaching: 120, nonTeaching: 100 },
    { name: "Feb", teaching: 140, nonTeaching: 110 },
    { name: "Mar", teaching: 160, nonTeaching: 130 },
    { name: "Apr", teaching: 80, nonTeaching: 60 },
    { name: "May", teaching: 170, nonTeaching: 140 },
    { name: "Jun", teaching: 150, nonTeaching: 120 },
    { name: "Jul", teaching: 180, nonTeaching: 150 },
    { name: "Aug", teaching: 160, nonTeaching: 130 },
    { name: "Sep", teaching: 190, nonTeaching: 160 },
    { name: "Oct", teaching: 170, nonTeaching: 140 },
    { name: "Nov", teaching: 200, nonTeaching: 170 },
    { name: "Dec", teaching: 180, nonTeaching: 150 },
  ];

  const studentAttendance = [
    { name: "Jan", value: 85 },
    { name: "Feb", value: 65 },
    { name: "Mar", value: 90 },
    { name: "Apr", value: 70 },
    { name: "May", value: 88 },
    { name: "Jun", value: 75 },
    { name: "Jul", value: 92 },
    { name: "Aug", value: 68 },
    { name: "Sep", value: 80 },
    { name: "Oct", value: 85 },
    { name: "Nov", value: 88 },
    { name: "Dec", value: 95 },
  ];

  const syllabusTracking = [
    { staff: "Staff A", class1: 50, class2: 60, class3: 40 },
    { staff: "Staff B", class1: 70, class2: 80, class3: 60 },
    { staff: "Staff C", class1: 90, class2: 70, class3: 80 },
  ];

  const employeeSummary = [
    { name: "Admin", value: 10 },
    { name: "Teaching", value: 30 },
    { name: "Marketing", value: 20 },
    { name: "Planning", value: 25 },
    { name: "Sales", value: 15 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FF8042", "#AA66CC", "#FF6699"];

  return (
    <div className="p-6 space-y-6">
      {/* Top Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-700">Total Student attendance (today)</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">75.3%</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-700">Total Faculty attendance (today)</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">88.2%</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-700">Total Staff attendance (today)</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">87%</p>
        </div>
        <div className="bg-pink-100 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-700">Total Fee Dues (as on today)</h3>
          <p className="text-3xl font-bold text-pink-600 mt-2">₹1,80,485</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Employee Attendance */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold mb-3">Employee Attendance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={employeeAttendance}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="teaching" stroke="#3182CE" />
              <Line type="monotone" dataKey="nonTeaching" stroke="#82CA9D" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Student Attendance */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold mb-3">Student Attendance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={studentAttendance}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3182CE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Syllabus Tracking */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold mb-3">Syllabus Tracking</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={syllabusTracking}>
              <XAxis dataKey="staff" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="class1" stackId="a" fill="#3182CE" />
              <Bar dataKey="class2" stackId="a" fill="#00C49F" />
              <Bar dataKey="class3" stackId="a" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Employee Summary */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold mb-3">Employee Summary</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={employeeSummary}
                dataKey="value"
                nameKey="name"
                outerRadius={70}
                label
              >
                {employeeSummary.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HostelDashboard;
