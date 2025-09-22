// src/components/RegistrarDashboard.tsx

import React from 'react';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Users, UserCheck, CheckSquare, Building, ArrowRight, UserPlus, FileCheck, FileWarning, CalendarClock } from 'lucide-react';

// --- MOCK DATA (EXPANDED) ---
const totalSeats = 5000;
const seatsFilled = 4120;
const kpiData = [
  { title: "Total Applications", value: "12,450", icon: Users, color: "text-blue-500", bgColor: "bg-blue-100 dark:bg-blue-900/50" },
  { title: "Verified Applicants", value: "9,870", icon: UserCheck, color: "text-green-500", bgColor: "bg-green-100 dark:bg-green-900/50" },
  { title: "Seats Filled", value: `${seatsFilled}`, icon: CheckSquare, color: "text-indigo-500", bgColor: "bg-indigo-100 dark:bg-indigo-900/50", progress: (seatsFilled / totalSeats) * 100 },
  { title: "Remaining Seats", value: `${totalSeats - seatsFilled}`, icon: Building, color: "text-amber-500", bgColor: "bg-amber-100 dark:bg-amber-900/50", progress: ((totalSeats - seatsFilled) / totalSeats) * 100 },
];

const pieChartData = [
  { name: 'B.Tech CSE', value: 1250 },
  { name: 'B.Tech ECE', value: 850 },
  { name: 'B.Com Hons', value: 700 },
  { name: 'MBA Finance', value: 450 },
  { name: 'B.Sc Physics', value: 550 },
  { name: 'Other', value: 320 },
];
const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#64748b'];

const areaChartData = [
    { day: 'Day 1', total: 400, verified: 240 }, { day: 'Day 3', total: 700, verified: 450 },
    { day: 'Day 5', total: 1100, verified: 780 }, { day: 'Day 7', total: 1500, verified: 1100 },
    { day: 'Day 9', total: 1900, verified: 1450 }, { day: 'Day 11', total: 2200, verified: 1800 },
    { day: 'Day 13', total: 2500, verified: 2100 },
];

const pendingTasks = [
  { title: "Pending Application Verifications", count: 125, link: "#", icon: FileCheck, color: "text-blue-500" },
  { title: "Awaiting Fee Confirmations", count: 78, link: "#", icon: CalendarClock, color: "text-amber-500" },
  { title: "Document Discrepancies to Resolve", count: 32, link: "#", icon: FileWarning, color: "text-red-500" },
];

const recentActivities = [
    { text: "New registration #APP12451 by R. Kumar.", icon: UserPlus, time: "2m ago" },
    { text: "Document verification successful for #APP12389.", icon: FileCheck, time: "15m ago" },
    { text: "An HOD has approved a management quota seat.", icon: UserCheck, time: "45m ago" },
    { text: "Fee payment confirmed for #APP12391.", icon: Building, time: "1h ago" },
    { text: "Bulk reminder sent to 78 pending fee applicants.", icon: CalendarClock, time: "2h ago" },
];

const importantDates = [
    { date: "Sep 25, 2025", event: "Last Date for Phase 1 Applications" },
    { date: "Sep 30, 2025", event: "Phase 1 Seat Allotment Publication" },
    { date: "Oct 05, 2025", event: "Start of Phase 2 (Upgradation)" },
    { date: "Oct 15, 2025", event: "Final Admission Confirmation Deadline" },
];

const RegistrarDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Admission Command Center</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Live overview of the 2025-2026 admission cycle.</p>
      </header>
      
      {/* KPI Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-lg ${item.bgColor}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{item.value}</p>
            </div>
            <div className="mt-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{item.title}</p>
                {item.progress !== undefined && (
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                        <div className={`${item.color.replace('text-','bg-')}`} style={{ width: `${item.progress}%`, height: '100%', borderRadius: 'inherit' }}></div>
                    </div>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Application Funnel</h3>
           <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="currentColor" fontSize={12} />
                <YAxis stroke="currentColor" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.8)', border: 'none', color: '#fff', borderRadius: '0.75rem' }}/>
                <Legend />
                <Area type="monotone" dataKey="total" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTotal)" strokeWidth={2} name="Total Applications"/>
                <Area type="monotone" dataKey="verified" stroke="#10b981" fillOpacity={1} fill="url(#colorVerified)" strokeWidth={2} name="Verified Applications" />
            </AreaChart>
           </ResponsiveContainer>
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Applicants by Course</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5}>
                {pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="focus:outline-none"/>)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.8)', border: 'none', color: '#fff', borderRadius: '0.75rem' }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Action Center & Key Dates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Action Center</h3>
              <ul className="space-y-4">
                {pendingTasks.map((task, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                    <div className="flex items-center gap-4">
                        <task.icon className={`w-6 h-6 ${task.color}`}/>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{task.title}</p>
                            <span className="text-sm text-red-500 font-medium">{task.count} items need attention</span>
                        </div>
                    </div>
                    <a href={task.link} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h3>
              <ul className="space-y-4">
                {recentActivities.map((activity, index) => (
                   <li key={index} className="flex items-start gap-4">
                     <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full mt-1">
                        <activity.icon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                     </div>
                     <div className="flex-1">
                        <p className="text-sm text-gray-800 dark:text-gray-200">{activity.text}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                     </div>
                   </li>
                ))}
              </ul>
            </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Admission Dates</h3>
            <ul className="space-y-4">
                {importantDates.map((item, index) => (
                    <li key={index} className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                            <span className="text-xs font-bold text-indigo-500">{item.date.split(',')[0].slice(0, 3).toUpperCase()}</span>
                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">{item.date.split(' ')[1].replace(',', '')}</span>
                        </div>
                        <p className="font-medium text-sm flex-1 text-gray-700 dark:text-gray-300">{item.event}</p>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default RegistrarDashboard;