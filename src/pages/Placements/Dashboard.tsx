import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  Building,
  Calendar,
  FileText,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import AddNewCompany from "./components/AddNewCompany"; // Import modal container

// Mock data for charts and stats
const placementStats = {
  totalCompanies: 45,
  totalStudents: 1200,
  upcomingInterviews: 32,
  placedStudents: 780,
};

const recentActivities = [
  { id: 1, action: "New job posting from Google", time: "2 hours ago" },
  { id: 2, action: "Student John Doe scheduled for interview", time: "4 hours ago" },
  { id: 3, action: "Report generated for Q3 placements", time: "1 day ago" },
];

const chartData = [
  { month: "Jan", placed: 50, applied: 200 },
  { month: "Feb", placed: 70, applied: 250 },
  { month: "Mar", placed: 90, applied: 300 },
  { month: "Apr", placed: 110, applied: 280 },
  { month: "May", placed: 130, applied: 320 },
  { month: "Jun", placed: 150, applied: 350 },
];

const PlacementDashboard: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Placements Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage companies, students, assessments, interviews, and reports
            efficiently.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Add New Company
          </button>
        </div>
      </header>

      {/* Key Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Building className="w-8 h-8 text-blue-500" />}
          title="Companies"
          value={placementStats.totalCompanies}
          change="+5%"
        />
        <StatCard
          icon={<Users className="w-8 h-8 text-green-500" />}
          title="Students"
          value={placementStats.totalStudents}
          change="+12%"
        />
        <StatCard
          icon={<Calendar className="w-8 h-8 text-yellow-500" />}
          title="Upcoming Interviews"
          value={placementStats.upcomingInterviews}
          change="-2%"
        />
        <StatCard
          icon={<TrendingUp className="w-8 h-8 text-purple-500" />}
          title="Placed Students"
          value={placementStats.placedStudents}
          change="+18%"
        />
      </section>

      {/* Charts and Analytics Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Placement Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Placement Trends (Last 6 Months)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="placed" fill="#4f46e5" />
              <Bar dataKey="applied" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <ul className="space-y-4">
            {recentActivities.map((activity) => (
              <li
                key={activity.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-gray-500 mr-2" />
                  <span>{activity.action}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickAccessCard
          title="Companies"
          description="Manage company details and job postings."
          icon={<Building className="w-6 h-6" />}
          link="Placement_Companies/companies"
        />
        <QuickAccessCard
          title="Students"
          description="View applications, resumes, and status."
          icon={<Users className="w-6 h-6" />}
          link="/students"
        />
        <QuickAccessCard
          title="Interviews"
          description="Schedule and track student interviews."
          icon={<Calendar className="w-6 h-6" />}
          link="calendar"
        />
        <QuickAccessCard
          title="Reports"
          description="Generate reports and analytics."
          icon={<FileText className="w-6 h-6" />}
          link="/reports"
        />
      </section>

      {/* Add New Company Modal */}
      {openModal && (
  <AddNewCompany
    isOpen={openModal}
    onClose={() => setOpenModal(false)}
    onSave={(company) => {
      console.log("New company added:", company);
      // later: push this into state or call API
    }}
  />
)}

    </div>
  );
};

// Reusable StatCard Component
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  change: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <span
        className={`text-sm ${
          change.startsWith("+") ? "text-green-500" : "text-red-500"
        }`}
      >
        {change}
      </span>
    </div>
    {icon}
  </div>
);

// Reusable QuickAccessCard Component
interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  title,
  description,
  icon,
  link,
}) => (
  <Link
    to={link}
    className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 flex items-start space-x-4"
  >
    <div className="text-blue-500">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </Link>
);

export default PlacementDashboard;
