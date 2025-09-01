import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area,
  RadialBarChart, RadialBar, ScatterChart, Scatter, ComposedChart,
  CartesianGrid, FunnelChart, Funnel, LabelList
} from "recharts";
import { Search, Filter, Users, Bed, Building2, Utensils, Package, TrendingUp, TrendingDown, AlertCircle, Wifi, Zap, Droplets, Car, Shield, Thermometer, Clock, Star, DollarSign, UserCheck, AlertTriangle } from "lucide-react";

const HostelDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("monthly");

  // Enhanced Static Data
  const hostelStats = {
    totalStudents: 1247,
    totalRooms: 425,
    totalBeds: 1360,
    occupiedBeds: 1247,
    vacantBeds: 113,
    occupancyRate: 91.7,
    totalEmployees: 68,
    messCapacity: 1400,
    monthlyRevenue: 2450000,
    avgRoomRent: 4800,
    maintenanceRequests: 23,
    complaintsPending: 8,
    guestRooms: 12,
    wifiConnections: 1156,
    powerConsumption: 45600,
    waterConsumption: 28900
  };

  const hostelBlocks = [
    { name: "Block A", rooms: 85, capacity: 272, occupied: 268, vacant: 4, occupancy: 98.5, floors: 4, warden: "Dr. Sharma", condition: "Excellent" },
    { name: "Block B", rooms: 90, capacity: 288, occupied: 275, vacant: 13, occupancy: 95.5, floors: 4, warden: "Prof. Kumar", condition: "Good" },
    { name: "Block C", rooms: 75, capacity: 240, occupied: 228, vacant: 12, occupancy: 95.0, floors: 3, warden: "Dr. Patel", condition: "Good" },
    { name: "Block D", rooms: 95, capacity: 304, occupied: 246, vacant: 58, occupancy: 80.9, floors: 5, warden: "Prof. Singh", condition: "Fair" },
    { name: "Block E", rooms: 80, capacity: 256, occupied: 230, vacant: 26, occupancy: 89.8, floors: 4, warden: "Dr. Mehta", condition: "Good" }
  ];

  const roomTypes = [
    { type: "Single AC", count: 45, occupied: 43, rate: 8500, revenue: 365500, satisfaction: 4.6 },
    { type: "Single Non-AC", count: 85, occupied: 78, rate: 6500, revenue: 507000, satisfaction: 4.2 },
    { type: "Double AC", count: 125, occupied: 122, rate: 5500, revenue: 671000, satisfaction: 4.4 },
    { type: "Double Non-AC", count: 145, occupied: 140, rate: 4200, revenue: 588000, satisfaction: 4.0 },
    { type: "Triple Non-AC", count: 25, occupied: 24, rate: 3800, revenue: 91200, satisfaction: 3.8 }
  ];

  const employeeData = [
    { department: "Mess Staff", count: 28, present: 26, absent: 2, salary: 18000, performance: 4.3 },
    { department: "Housekeeping", count: 18, present: 17, absent: 1, salary: 15000, performance: 4.1 },
    { department: "Security", count: 12, present: 12, absent: 0, salary: 20000, performance: 4.7 },
    { department: "Maintenance", count: 6, present: 5, absent: 1, salary: 22000, performance: 4.2 },
    { department: "Administration", count: 4, present: 4, absent: 0, salary: 35000, performance: 4.5 }
  ];

  const messData = [
    { meal: "Breakfast", capacity: 1400, served: 1156, cost: 45000, avgRating: 4.2, wastage: 8.5 },
    { meal: "Lunch", capacity: 1400, served: 1289, cost: 78000, avgRating: 4.5, wastage: 12.3 },
    { meal: "Snacks", capacity: 1400, served: 892, cost: 25000, avgRating: 4.1, wastage: 6.2 },
    { meal: "Dinner", capacity: 1400, served: 1234, cost: 82000, avgRating: 4.4, wastage: 10.1 }
  ];

  const monthlyOccupancy = [
    { month: "Jan", occupancy: 89.5, revenue: 2350000, complaints: 15, maintenance: 28 },
    { month: "Feb", occupancy: 91.2, revenue: 2420000, complaints: 12, maintenance: 22 },
    { month: "Mar", occupancy: 88.9, revenue: 2280000, complaints: 18, maintenance: 35 },
    { month: "Apr", occupancy: 85.4, revenue: 2180000, complaints: 8, maintenance: 15 },
    { month: "May", occupancy: 78.2, revenue: 1950000, complaints: 5, maintenance: 12 },
    { month: "Jun", occupancy: 92.8, revenue: 2580000, complaints: 25, maintenance: 42 },
    { month: "Jul", occupancy: 94.1, revenue: 2650000, complaints: 20, maintenance: 38 },
    { month: "Aug", occupancy: 93.7, revenue: 2620000, complaints: 16, maintenance: 30 },
    { month: "Sep", occupancy: 91.7, revenue: 2450000, complaints: 14, maintenance: 26 }
  ];

  const inventoryData = [
    { item: "Bed Sheets", stock: 2845, required: 3000, status: "low", cost: 450000, lastOrder: "2024-08-15" },
    { item: "Pillows", stock: 1456, required: 1400, status: "good", cost: 291200, lastOrder: "2024-07-20" },
    { item: "Mattresses", stock: 1389, required: 1400, status: "critical", cost: 2778000, lastOrder: "2024-06-10" },
    { item: "Study Tables", stock: 1247, required: 1247, status: "good", cost: 4988000, lastOrder: "2024-01-15" },
    { item: "Chairs", stock: 1189, required: 1247, status: "low", cost: 1785000, lastOrder: "2024-03-22" },
    { item: "Wardrobes", stock: 623, required: 625, status: "good", cost: 4984000, lastOrder: "2024-02-08" }
  ];

  const feeStatus = [
    { status: "Paid", count: 1089, amount: 22869000, percentage: 87.3 },
    { status: "Pending", count: 128, amount: 2688000, percentage: 10.3 },
    { status: "Overdue", count: 30, amount: 630000, percentage: 2.4 }
  ];

  // New data for additional charts
  const studentDemographics = [
    { year: "1st Year", count: 389, male: 245, female: 144 },
    { year: "2nd Year", count: 342, male: 218, female: 124 },
    { year: "3rd Year", count: 298, male: 189, female: 109 },
    { year: "4th Year", count: 218, male: 138, female: 80 }
  ];

  const branchWiseDistribution = [
    { branch: "CSE", students: 285, occupancy: 94.2 },
    { branch: "ECE", students: 234, occupancy: 89.6 },
    { branch: "ME", students: 198, occupancy: 87.3 },
    { branch: "EE", students: 176, occupancy: 92.1 },
    { branch: "CE", students: 154, occupancy: 85.8 },
    { branch: "IT", students: 142, occupancy: 91.4 },
    { branch: "Others", students: 58, occupancy: 78.9 }
  ];

  const facilitiesUsage = [
    { facility: "Wi-Fi", usage: 92.7, satisfaction: 4.1, issues: 12 },
    { facility: "Laundry", usage: 78.3, satisfaction: 3.8, issues: 8 },
    { facility: "Gym", usage: 34.6, satisfaction: 4.5, issues: 3 },
    { facility: "Study Hall", usage: 56.2, satisfaction: 4.3, issues: 2 },
    { facility: "Recreation", usage: 41.8, satisfaction: 4.0, issues: 5 },
    { facility: "Parking", usage: 67.4, satisfaction: 3.6, issues: 15 }
  ];

  const maintenanceRequests = [
    { type: "Electrical", pending: 8, completed: 45, inProgress: 3, priority: "High" },
    { type: "Plumbing", pending: 5, completed: 32, inProgress: 2, priority: "Medium" },
    { type: "Furniture", pending: 6, completed: 28, inProgress: 4, priority: "Low" },
    { type: "AC/Heating", pending: 4, completed: 19, inProgress: 1, priority: "High" },
    { type: "Network", pending: 3, completed: 15, inProgress: 2, priority: "Medium" }
  ];

  const weeklyFootfall = [
    { day: "Mon", mess: 1289, library: 145, gym: 67, recreation: 89 },
    { day: "Tue", mess: 1234, library: 158, gym: 72, recreation: 94 },
    { day: "Wed", mess: 1276, library: 162, gym: 69, recreation: 78 },
    { day: "Thu", mess: 1198, library: 139, gym: 75, recreation: 86 },
    { day: "Fri", mess: 1156, library: 124, gym: 81, recreation: 112 },
    { day: "Sat", mess: 998, library: 89, gym: 95, recreation: 145 },
    { day: "Sun", mess: 876, library: 67, gym: 88, recreation: 167 }
  ];

  const securityIncidents = [
    { month: "Jan", incidents: 2, severity: "Low", resolved: 2 },
    { month: "Feb", incidents: 1, severity: "Low", resolved: 1 },
    { month: "Mar", incidents: 4, severity: "Medium", resolved: 4 },
    { month: "Apr", incidents: 0, severity: "None", resolved: 0 },
    { month: "May", incidents: 1, severity: "Low", resolved: 1 },
    { month: "Jun", incidents: 3, severity: "Medium", resolved: 3 },
    { month: "Jul", incidents: 2, severity: "Low", resolved: 2 },
    { month: "Aug", incidents: 1, severity: "Low", resolved: 1 },
    { month: "Sep", incidents: 0, severity: "None", resolved: 0 }
  ];

  const utilityConsumption = [
    { utility: "Electricity", current: 45600, target: 42000, cost: 456000, trend: "up" },
    { utility: "Water", current: 28900, target: 30000, cost: 289000, trend: "down" },
    { utility: "Gas", current: 1250, target: 1200, cost: 62500, trend: "up" },
    { utility: "Internet", current: 1156, target: 1400, cost: 125000, trend: "stable" }
  ];

  const COLORS = {
    primary: "#3B82F6",
    secondary: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#8B5CF6",
    success: "#06D6A0",
    accent: "#FF6B6B",
    purple: "#A855F7",
    indigo: "#6366F1",
    pink: "#EC4899",
    teal: "#14B8A6"
  };

  const pieColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6"];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search students, rooms, blocks, facilities..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Blocks</option>
              <option value="blockA">Block A</option>
              <option value="blockB">Block B</option>
              <option value="blockC">Block C</option>
              <option value="blockD">Block D</option>
              <option value="blockE">Block E</option>
            </select>
            
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Key Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{hostelStats.totalStudents}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +3.2% from last month
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
              <p className="text-3xl font-bold text-gray-900">{hostelStats.occupancyRate}%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +1.5% from last month
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Bed className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900">₹{(hostelStats.monthlyRevenue / 100000).toFixed(1)}L</p>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <TrendingDown className="w-4 h-4 mr-1" />
                -2.1% from last month
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <DollarSign className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Maintenance Requests</p>
              <p className="text-3xl font-bold text-gray-900">{hostelStats.maintenanceRequests}</p>
              <p className="text-sm text-orange-600 flex items-center mt-1">
                <AlertTriangle className="w-4 h-4 mr-1" />
                8 pending today
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">WiFi Connected</p>
              <p className="text-3xl font-bold text-gray-900">{hostelStats.wifiConnections}</p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <Wifi className="w-4 h-4 mr-1" />
                92.7% usage rate
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Wifi className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Power Usage</p>
              <p className="text-3xl font-bold text-gray-900">{(hostelStats.powerConsumption / 1000).toFixed(0)}kW</p>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.6% this month
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Zap className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 - Occupancy and Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Radial Chart - Block Occupancy */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Block Occupancy Rates</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={hostelBlocks}>
              <RadialBar dataKey="occupancy" cornerRadius={10} fill="#3B82F6" />
              <Legend />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Stacked Bar - Student Demographics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Demographics by Year</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentDemographics}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="male" stackId="a" fill="#3B82F6" name="Male" />
              <Bar dataKey="female" stackId="a" fill="#EC4899" name="Female" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart - Monthly Trends */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Complaints & Maintenance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyOccupancy}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="complaints" fill="#EF4444" name="Complaints" />
              <Line type="monotone" dataKey="maintenance" stroke="#F59E0B" name="Maintenance" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 - Branch Distribution and Facilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Scatter Plot - Branch wise distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Branch-wise Student Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={branchWiseDistribution}>
              <CartesianGrid />
              <XAxis type="number" dataKey="students" name="Students" />
              <YAxis type="number" dataKey="occupancy" name="Occupancy %" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Branches" dataKey="occupancy" fill="#8B5CF6" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Funnel Chart - Room Types */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Types Satisfaction</h3>
          <div className="space-y-4">
            {roomTypes.map((room, index) => (
              <div key={room.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{room.type}</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{room.satisfaction}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{room.occupied}/{room.count} occupied</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-400 h-2 rounded-full" 
                      style={{ width: `${(room.occupied / room.count) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-green-600">₹{(room.revenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-500">Monthly</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 3 - Weekly Footfall and Facilities Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Multi-line Chart - Weekly Footfall */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Facilities Footfall</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyFootfall}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="mess" stroke="#EF4444" name="Mess" />
              <Line type="monotone" dataKey="library" stroke="#3B82F6" name="Library" />
              <Line type="monotone" dataKey="gym" stroke="#10B981" name="Gym" />
              <Line type="monotone" dataKey="recreation" stroke="#F59E0B" name="Recreation" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Horizontal Bar - Facilities Usage */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Facilities Usage & Satisfaction</h3>
          <div className="space-y-4">
            {facilitiesUsage.map((facility, index) => (
              <div key={facility.facility} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{facility.facility}</h4>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm">{facility.satisfaction}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Usage: {facility.usage}%</span>
                  <span className="text-red-500">{facility.issues} issues</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full" 
                    style={{ width: `${facility.usage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 4 - Maintenance and Security */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Donut Chart - Maintenance Requests */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Requests Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={maintenanceRequests}
                  dataKey="pending"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  label
                >
                  {maintenanceRequests.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {maintenanceRequests.map((item, index) => (
                <div key={item.type} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2`} style={{backgroundColor: pieColors[index]}}></div>
                    <span className="text-sm font-medium">{item.type}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{item.pending} pending</p>
                    <p className="text-xs text-gray-500">{item.completed} done</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line Chart - Security Incidents */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Incidents Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={securityIncidents}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="incidents" stroke="#EF4444" fill="#FEE2E2" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <Shield className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Total Incidents</p>
              <p className="text-xl font-bold text-green-600">14</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <UserCheck className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-xl font-bold text-blue-600">14</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <Clock className="w-6 h-6 text-gray-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Avg Response</p>
              <p className="text-xl font-bold text-gray-600">2.3hrs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 5 - Utility Consumption and Employee Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        

        {/* Employee Performance Radar */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Performance & Attendance</h3>
          <div className="space-y-4">
            {employeeData.map((dept, index) => (
              <div key={dept.department} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{dept.department}</h4>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Performance</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-medium">{dept.performance}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Salary</p>
                      <p className="font-medium">₹{(dept.salary / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Attendance Today</span>
                  <span className="text-sm font-medium">{dept.present}/{dept.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full" 
                    style={{ width: `${(dept.present / dept.count) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Inventory & Cost Analysis</h3>
            <Package className="w-6 h-6 text-purple-500" />
          </div>
          <div className="space-y-4">
            {inventoryData.map((item, index) => (
              <div key={item.item} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{item.item}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'good' ? 'bg-green-100 text-green-800' :
                      item.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{item.stock}/{item.required} available</p>
                  <p className="text-xs text-gray-500">Last Order: {item.lastOrder}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.status === 'good' ? 'bg-green-400' :
                        item.status === 'low' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${(item.stock / item.required) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-purple-600">₹{(item.cost / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-500">Total Value</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Inventory Value</span>
              <span className="text-lg font-bold text-purple-600">
                ₹{(inventoryData.reduce((sum, item) => sum + item.cost, 0) / 100000).toFixed(1)}L
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mess Operations Enhanced */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gauge Chart - Utility Consumption */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Utility Consumption vs Target</h3>
          <div className="grid grid-cols-2 gap-4">
            {utilityConsumption.map((utility, index) => (
              <div key={utility.utility} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{utility.utility}</h4>
                  {utility.utility === 'Electricity' && <Zap className="w-5 h-5 text-yellow-500" />}
                  {utility.utility === 'Water' && <Droplets className="w-5 h-5 text-blue-500" />}
                  {utility.utility === 'Gas' && <Thermometer className="w-5 h-5 text-orange-500" />}
                  {utility.utility === 'Internet' && <Wifi className="w-5 h-5 text-purple-500" />}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current: {utility.current.toLocaleString()}</span>
                    <span className={`${
                      utility.trend === 'up' ? 'text-red-500' : 
                      utility.trend === 'down' ? 'text-green-500' : 'text-gray-500'
                    }`}>
                      {utility.trend === 'up' ? '↑' : utility.trend === 'down' ? '↓' : '→'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        utility.current > utility.target ? 'bg-red-400' : 'bg-green-400'
                      }`}
                      style={{ width: `${Math.min((utility.current / utility.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: {utility.target.toLocaleString()}</span>
                    <span>₹{(utility.cost / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Mess Details with Wastage */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Mess Operations & Food Wastage</h3>
            <Utensils className="w-6 h-6 text-orange-500" />
          </div>
          <div className="space-y-4">
            {messData.map((meal, index) => (
              <div key={meal.meal} className="border-l-4 border-orange-400 pl-4 py-3 bg-orange-50 rounded-r-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{meal.meal}</h4>
                    <p className="text-sm text-gray-600">{meal.served}/{meal.capacity} served</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 mr-1" />
                        <span className="text-xs">{meal.avgRating}/5.0</span>
                      </div>
                      <span className="text-xs text-red-500">Wastage: {meal.wastage}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-orange-600">₹{(meal.cost / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-500">Daily Cost</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Utilization</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full" 
                        style={{ width: `${(meal.served / meal.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Wastage Level</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-400 h-2 rounded-full" 
                        style={{ width: `${meal.wastage * 5}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Inventory with Cost Analysis */}
        
      </div>

      {/* Enhanced Fee Collection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fee Collection Analysis</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={feeStatus}
                dataKey="amount"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({status, percentage}) => `${status}: ${percentage}%`}
              >
                {feeStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${(value/100000).toFixed(1)}L`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Summary</h3>
          <div className="space-y-4">
            {feeStatus.map((status, index) => (
              <div key={status.status} className="p-3 rounded-lg border-l-4" style={{borderColor: pieColors[index]}}>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium" style={{color: pieColors[index]}}>{status.status}</h4>
                    <p className="text-sm text-gray-600">{status.count} students</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{(status.amount/100000).toFixed(1)}L</p>
                    <p className="text-xs text-gray-500">{status.percentage}%</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-3 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Total Expected</span>
                <span className="font-bold text-gray-900">
                  ₹{(feeStatus.reduce((sum, item) => sum + item.amount, 0) / 100000).toFixed(1)}L
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Trends</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">On-time Payments</p>
                  <p className="text-2xl font-bold text-green-600">87.3%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Late Payments</p>
                  <p className="text-2xl font-bold text-yellow-600">10.3%</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Defaulters</p>
                  <p className="text-2xl font-bold text-red-600">2.4%</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Detailed Block Information Table */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Comprehensive Block Management</h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              Generate Report
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Export Data
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warden</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hostelBlocks.map((block, index) => (
                <tr key={block.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{block.name}</div>
                      <div className="text-sm text-gray-500">{block.floors} floors, {block.rooms} rooms</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{block.capacity} beds</div>
                    <div className="text-sm text-gray-500">{block.rooms} rooms</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{block.occupied}/{block.capacity}</div>
                    <div className="text-sm text-gray-500">{block.occupancy}% occupied</div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-blue-400 h-1 rounded-full" 
                        style={{ width: `${block.occupancy}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{block.warden}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      block.condition === 'Excellent' ? 'bg-green-100 text-green-800' :
                      block.condition === 'Good' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {block.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      block.occupancy >= 95 ? 'bg-red-100 text-red-800' :
                      block.occupancy >= 90 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {block.occupancy >= 95 ? 'Nearly Full' : block.occupancy >= 90 ? 'High Occupancy' : 'Available'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions Panel */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-center">
            <div className="p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Student Management</h4>
            <p className="text-sm text-gray-500 mb-3">Manage admissions, transfers</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              Manage Students
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-center">
            <div className="p-3 bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Room Allocation</h4>
            <p className="text-sm text-gray-500 mb-3">Assign and manage rooms</p>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
              Allocate Rooms
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-center">
            <div className="p-3 bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Maintenance</h4>
            <p className="text-sm text-gray-500 mb-3">Handle requests & issues</p>
            <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700">
              View Requests
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-center">
            <div className="p-3 bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Fee Management</h4>
            <p className="text-sm text-gray-500 mb-3">Track payments & dues</p>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
              Manage Fees
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HostelDashboard;