import React from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  BarChart, Bar
} from "recharts";
import {
  Users, Clock, UserCheck, Calendar, AlertCircle,
  TrendingUp, Layers, FileText
} from "lucide-react";
import { motion } from "framer-motion";

const COLORS = ["#6366f1", "#fbbf24", "#ef4444", "#10b981", "#3b82f6"];

const metrics = [
  { label: "Total Students", value: 320, icon: Users },
  { label: "Today's Classes", value: 21, icon: Calendar },
  { label: "Pending Leaves", value: 12, icon: Clock },
  { label: "Active Faculty", value: 28, icon: UserCheck },
  { label: "Upcoming Events", value: 4, icon: AlertCircle },
];

const pieData = [
  { name: "Medical", value: 22 },
  { name: "Personal", value: 15 },
  { name: "Conference", value: 7 },
  { name: "Competition", value: 4 },
  { name: "Other", value: 6 },
];

const attendanceData = [
  { week: "W1", attendance: 93 },
  { week: "W2", attendance: 95 },
  { week: "W3", attendance: 89 },
  { week: "W4", attendance: 97 },
  { week: "W5", attendance: 96 },
];

const monthlyData = [
  { month: "Jan", leaves: 19, faculty: 2 },
  { month: "Feb", leaves: 17, faculty: 1 },
  { month: "Mar", leaves: 21, faculty: 3 },
  { month: "Apr", leaves: 24, faculty: 2 },
  { month: "May", leaves: 18, faculty: 2 },
  { month: "Jun", leaves: 10, faculty: 1 },
];

function AnimatedNumber({ value }: { value: number }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (count < value) {
      const id = requestAnimationFrame(() => setCount(count + 1));
      return () => cancelAnimationFrame(id);
    }
  }, [count, value]);
  return <span className="text-4xl font-extrabold">{count}</span>;
}

function StatCard({ label, value, icon: Icon }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex flex-col items-center gap-3"
    >
      <Icon size={44} className="text-indigo-600" />
      <div className="text-lg font-semibold text-gray-700 dark:text-white">{label}</div>
      <AnimatedNumber value={value} />
    </motion.div>
  );
}

export default function SimpleDashboard() {
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white max-w-7xl mx-auto font-sans">
      

      {/* Stat cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-12">
        {metrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Pie chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-white">Leave Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, idx) => (
                  <Cell key={`pie-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} leaves`} />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-white">Attendance Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={attendanceData}>
              <XAxis dataKey="week" />
              <YAxis domain={[85, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-white">Leaves & Faculty</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="leaves" name="Leaves" fill="#fbbf24" />
              <Bar dataKey="faculty" name="New Faculty" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
