import React, { useState, ElementType } from 'react';
import { BarChart, PieChart, CheckCircle, Clock, XCircle, Users, ExternalLink, ArrowRight, University, Zap, UserCheck } from 'lucide-react';

// --- MOCK DATA FOR DASHBOARD ---
const dashboardData = {
  kpi: {
    totalApplicants: 1250,
    seatsFilled: 890,
    pendingVerification: 125,
    actionRequired: 45,
  },
  admissionBreakdown: [
    { name: 'Phase I', value: 350, color: '#4F46E5' },
    { name: 'Phase II', value: 250, color: '#7C3AED' },
    { name: 'Phase III', value: 150, color: '#A78BFA' },
    { name: 'Management', value: 80, color: '#D8B4FE' },
    { name: 'Spot (Merit)', value: 40, color: '#FBCFE8' },
    { name: 'Spot (FCFS)', value: 20, color: '#FDA4AF' },
  ],
  verificationStatus: [
    { name: 'Admin Verified', value: 1080, color: '#10B981' },
    { name: 'Academic Verified', value: 950, color: '#34D399' },
    { name: 'Pending', value: 125, color: '#F59E0B' },
    { name: 'Action Required', value: 45, color: '#EF4444' },
  ],
  recentActivities: [
    { id: 1, studentName: 'Ishita Sharma', activity: 'Marked as Verified (Academic)', time: '2 mins ago' },
    { id: 2, studentName: 'Anika Reddy', activity: 'Status changed to Action Required', time: '15 mins ago' },
    { id: 3, studentName: 'Rohan Verma', activity: 'Details updated by Admin', time: '1 hour ago' },
    { id: 4, studentName: 'New Applicant', activity: 'Management Quota form submitted', time: '3 hours ago' },
    { id: 5, studentName: 'Aryan Singh', activity: 'Marked as Verified (Admin)', time: '5 hours ago' },
  ],
  quickNav: [
    { title: 'CAP Allotment', href: '/management/admission-process/seat-allotment/cap-phases', icon: ExternalLink },
    { title: 'Management Admission', href: '/management/admission-process/management-quota', icon: Zap },
    { title: 'Spot Admission', href: '/management/admission-process/spot-admission/merit-based', icon: Zap },
    { title: 'Admin Verification', href: '/management/verification/candidate', icon: UserCheck },
    { title: 'Academic Verification', href: '/management/verification/document', icon: UserCheck },
  ]
};


// --- CUSTOM CHART COMPONENTS (NO EXTERNAL LIBRARIES) ---

const CustomBarChart = ({ data }: { data: { name: string; value: number; color: string }[] }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  return (
    <div className="w-full h-64 flex justify-around items-end gap-2 p-4 border-l border-b border-gray-200 dark:border-gray-700">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center justify-end h-full group">
          <div className="relative w-full h-full flex items-end">
             <div
                className="w-full transition-all duration-500 ease-out"
                style={{ height: `${(item.value / maxValue) * 100}%`, backgroundColor: item.color }}
             >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70 text-white text-xs rounded py-1 px-2 absolute -top-8 left-1/2 -translate-x-1/2">
                    {item.name}: {item.value}
                </div>
             </div>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

const CustomPieChart = ({ data }: { data: { name: string; value: number; color: string }[] }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulative = 0;

  const segments = data.map(item => {
    const percentage = (item.value / total) * 100;
    const startAngle = (cumulative / total) * 360;
    cumulative += item.value;
    const endAngle = (cumulative / total) * 360;

    return { ...item, percentage, startAngle, endAngle };
  });

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-8">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {segments.map((segment, index) => {
              const largeArcFlag = segment.percentage > 50 ? 1 : 0;
              const x1 = 50 + 50 * Math.cos(2 * Math.PI * segment.startAngle / 360);
              const y1 = 50 + 50 * Math.sin(2 * Math.PI * segment.startAngle / 360);
              const x2 = 50 + 50 * Math.cos(2 * Math.PI * segment.endAngle / 360);
              const y2 = 50 + 50 * Math.sin(2 * Math.PI * segment.endAngle / 360);
              
              return (
                  <path key={index} fill="none" stroke={segment.color} strokeWidth="20"
                    d={`M ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`}
                    strokeDasharray="157" // Circumference of a 50 radius circle
                  />
              );
          })}
        </svg>
      </div>
      <div className="flex flex-col gap-2 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="font-medium text-gray-700 dark:text-gray-300">{item.name}:</span>
            <span className="text-gray-500 dark:text-gray-400">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- MAIN DASHBOARD COMPONENT ---
const AdminDashboard = () => {
  const { kpi, admissionBreakdown, verificationStatus, recentActivities, quickNav } = dashboardData;

  const KpiCard = ({ title, value, icon: Icon, iconBg, textColor }: { title: string, value: number, icon: ElementType, iconBg: string, textColor: string }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex items-center gap-6 transform hover:-translate-y-1 transition-transform duration-300">
        <div className={`p-4 rounded-lg ${iconBg}`}>
            <Icon className={`w-7 h-7 ${textColor}`} />
        </div>
        <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Admin Admission Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">A complete overview of the 2025 admission cycle.</p>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard title="Total Applicants" value={kpi.totalApplicants} icon={Users} iconBg="bg-indigo-100 dark:bg-indigo-900/50" textColor="text-indigo-600 dark:text-indigo-400" />
          <KpiCard title="Seats Filled" value={kpi.seatsFilled} icon={CheckCircle} iconBg="bg-green-100 dark:bg-green-900/50" textColor="text-green-600 dark:text-green-400" />
          <KpiCard title="Pending Verification" value={kpi.pendingVerification} icon={Clock} iconBg="bg-amber-100 dark:bg-amber-900/50" textColor="text-amber-600 dark:text-amber-400" />
          <KpiCard title="Action Required" value={kpi.actionRequired} icon={XCircle} iconBg="bg-red-100 dark:bg-red-900/50" textColor="text-red-600 dark:text-red-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Admission Type Breakdown</h2>
                    <CustomBarChart data={admissionBreakdown} />
                 </div>
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recent Activities</h2>
                    <div className="flow-root">
                        <ul role="list" className="-mb-4">
                            {recentActivities.map((activity, index) => (
                                <li key={activity.id}>
                                    <div className="relative pb-4">
                                         {index !== recentActivities.length - 1 ? <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" /> : null}
                                        <div className="relative flex space-x-3">
                                            <div><span className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center ring-8 ring-white dark:ring-gray-800"><UserCheck className="h-5 w-5 text-indigo-500" /></span></div>
                                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                <div><p className="text-sm text-gray-500 dark:text-gray-400">{activity.activity} on behalf of <a href="#" className="font-medium text-gray-900 dark:text-white">{activity.studentName}</a></p></div>
                                                <div className="text-right text-xs whitespace-nowrap text-gray-500 dark:text-gray-400"><time>{activity.time}</time></div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                 </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Verification Status</h2>
                    <CustomPieChart data={verificationStatus} />
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                     <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick Navigation</h2>
                     <div className="space-y-3">
                        {quickNav.map((nav) => (
                             <a key={nav.title} href={nav.href} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <nav.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{nav.title}</span>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:translate-x-1 transition-transform" />
                            </a>
                        ))}
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

