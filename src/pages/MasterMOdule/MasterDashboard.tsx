import React from 'react';
import {
  BarChart3,
  ShoppingBag,
  Database,
  Calendar,
  Mail,
  Users,
  IndianRupee,
  DollarSign,
  ArrowRight,
  ClipboardList,
  Building,
} from 'lucide-react';

// --- Reusable Components for the Dashboard ---

// 1. StatCard: For displaying key metrics at the top
const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
    <div className={`rounded-full p-3 ${color}`}>
      <Icon className="text-white" size={24} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
    </div>
  </div>
);

// 2. ActionCard: For linking to important management pages
const ActionCard = ({ title, description, icon: Icon, path }) => (
  <a href={path} className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 flex flex-col">
    <div className="flex justify-between items-start">
      <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
        <Icon className="text-indigo-600 dark:text-indigo-400" size={28} />
      </div>
      <ArrowRight className="text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform duration-300 group-hover:translate-x-1" size={20} />
    </div>
    <div className="mt-4 flex-grow">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
    </div>
  </a>
);


// --- Main Dashboard Component ---

const MasterDashboard = () => {
  // Mock data for demonstration
  const stats = {
    totalStudents: '1,250',
    totalEmployees: '150',
    totalCourses: '45',
    infrastructureItems: '500+',
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Master Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome! Here's an overview of the institution's key areas.
          </p>
        </header>

        {/* Top Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Students" value={stats.totalStudents} icon={Users} color="bg-blue-500" />
          <StatCard title="Total Employees" value={stats.totalEmployees} icon={Users} color="bg-green-500" />
          <StatCard title="Total Courses" value={stats.totalCourses} icon={Database} color="bg-purple-500" />
          <StatCard title="Infrastructure Items" value={stats.infrastructureItems} icon={Building} color="bg-amber-500" />
        </div>

        {/* Quick Actions Section */}
        <main>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Management & Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Infrastructure Management */}
            <ActionCard
              title="Infrastructure"
              description="Manage all campus assets, labs, and equipment."
              icon={ShoppingBag}
              path="/management/infrastructure-management/infrastructure"
            />
            {/* Data/Course Management */}
            <ActionCard
              title="Courses & Data"
              description="Administer departments, courses, and academic data."
              icon={Database}
              path="/master/home/data-management"
            />
             {/* Timetable Management */}
            <ActionCard
              title="Timetable"
              description="Create, view, and manage class schedules."
              icon={Calendar}
              path="/master/create/timetable"
            />
            {/* Academic Calendar */}
            <ActionCard
              title="Academic Calendar"
              description="Set and publish key academic dates and events."
              icon={Mail}
              path="/master/academic/calendar"
            />
            {/* Fee Management */}
            <ActionCard
              title="Fee Management"
              description="Configure fee structures and track payments."
              icon={DollarSign}
              path="/master/fee-management"
            />
            {/* Scholarship Management */}
            <ActionCard
              title="Scholarships"
              description="Manage scholarship programs and registrations."
              icon={IndianRupee}
              path="/master/scholarship-registration"
            />
          </div>
          
          <div className="mt-8">
             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Leave Configuration
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Employee Leave Configuration */}
                <ActionCard
                  title="Employee Leave Configure"
                  description="Set up leave types and policies for all employees."
                  icon={ClipboardList}
                  path="/master/faculty/leave-configure"
                />
                {/* Student Leave Configuration */}
                <ActionCard
                  title="Student Leave Configure"
                  description="Define leave rules and approval workflows for students."
                  icon={ClipboardList}
                  path="/master/student/leave-configure"
                />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MasterDashboard;