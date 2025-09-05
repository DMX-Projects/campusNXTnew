import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area,
  RadialBarChart, RadialBar, ScatterChart, Scatter, ComposedChart,
  CartesianGrid
} from "recharts";
import { Search, Filter, Users, MapPin, Package, FileText, AlertCircle, Shield, Clock, Bed, Utensils, Wifi, Zap, Droplets, Download } from "lucide-react";

const HostelAdminDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("monthly");

  // Hostel-specific data based on implemented modules

  // Out Time/In Time Tracking Data
  const entryExitData = [
    { day: "Mon", entries: 245, exits: 238, lateEntries: 12, violations: 3 },
    { day: "Tue", entries: 278, exits: 275, lateEntries: 8, violations: 1 },
    { day: "Wed", entries: 267, exits: 262, lateEntries: 15, violations: 2 },
    { day: "Thu", entries: 289, exits: 286, lateEntries: 10, violations: 4 },
    { day: "Fri", entries: 298, exits: 295, lateEntries: 18, violations: 2 },
    { day: "Sat", entries: 234, exits: 230, lateEntries: 22, violations: 5 },
    { day: "Sun", entries: 198, exits: 195, lateEntries: 6, violations: 1 }
  ];

  // Student Location Tracking (Geofencing)
  const geofencingStatus = [
    { zone: "Inside Hostel", students: 856, percentage: 68.7 },
    { zone: "College Campus", students: 234, percentage: 18.8 },
    { zone: "Outside Campus", students: 157, percentage: 12.5 }
  ];

  // Block-wise Occupancy
  const blockOccupancy = [
    { block: "A Block", occupied: 268, capacity: 272, occupancy: 98.5, maintenance: 2 },
    { block: "B Block", occupied: 275, capacity: 288, occupancy: 95.5, maintenance: 5 },
    { block: "C Block", occupied: 228, capacity: 240, occupancy: 95.0, maintenance: 3 },
    { block: "D Block", occupied: 246, capacity: 304, occupancy: 80.9, maintenance: 8 },
    { block: "E Block", occupied: 230, capacity: 256, occupancy: 89.8, maintenance: 4 }
  ];

  // Room Type Distribution
  const roomTypes = [
    { type: "Single AC", occupied: 43, total: 45, revenue: 365500 },
    { type: "Single Non-AC", occupied: 78, total: 85, revenue: 507000 },
    { type: "Double AC", occupied: 122, total: 125, revenue: 671000 },
    { type: "Double Non-AC", occupied: 140, total: 145, revenue: 588000 },
    { type: "Triple", occupied: 24, total: 25, revenue: 91200 }
  ];

  // Support Tickets by Category
  const ticketsByCategory = [
    { category: "Maintenance", open: 12, inProgress: 5, resolved: 23, total: 40 },
    { category: "Housekeeping", open: 3, inProgress: 2, resolved: 15, total: 20 },
    { category: "Food/Mess", open: 6, inProgress: 3, resolved: 12, total: 21 },
    { category: "Wi-Fi/Internet", open: 4, inProgress: 1, resolved: 8, total: 13 },
    { category: "Security", open: 2, inProgress: 0, resolved: 5, total: 7 }
  ];

  // Permission Requests Trends
  const permissionTrends = [
    { month: "Jan", gatePass: 145, medical: 23, visitor: 67, late: 34 },
    { month: "Feb", gatePass: 167, medical: 18, visitor: 89, late: 28 },
    { month: "Mar", gatePass: 189, medical: 29, visitor: 76, late: 42 },
    { month: "Apr", gatePass: 156, medical: 15, visitor: 45, late: 25 },
    { month: "May", gatePass: 123, medical: 12, visitor: 34, late: 18 },
    { month: "Jun", gatePass: 178, medical: 25, visitor: 98, late: 38 },
    { month: "Jul", gatePass: 198, medical: 31, visitor: 112, late: 45 },
    { month: "Aug", gatePass: 212, medical: 28, visitor: 87, late: 52 },
    { month: "Sep", gatePass: 234, medical: 22, visitor: 94, late: 48 }
  ];

  // Inventory Management
  const inventoryStatus = [
    { category: "Bedding", current: 2845, required: 3000, reorderLevel: 2800, status: "Low" },
    { category: "Furniture", current: 1389, required: 1400, reorderLevel: 1350, status: "Critical" },
    { category: "Electronics", current: 456, required: 450, reorderLevel: 400, status: "Good" },
    { category: "Kitchen Items", current: 189, required: 200, reorderLevel: 180, status: "Critical" },
    { category: "Cleaning Supplies", current: 567, required: 500, reorderLevel: 450, status: "Good" }
  ];

  // Mess/Food Services
  const messUtilization = [
    { meal: "Breakfast", served: 1156, capacity: 1400, satisfaction: 4.2, wastage: 8.5 },
    { meal: "Lunch", served: 1289, capacity: 1400, satisfaction: 4.5, wastage: 12.3 },
    { meal: "Snacks", served: 892, capacity: 1400, satisfaction: 4.1, wastage: 6.2 },
    { meal: "Dinner", served: 1234, capacity: 1400, satisfaction: 4.4, wastage: 10.1 }
  ];

  // Employee/Staff Attendance
  const staffAttendance = [
    { department: "Mess Staff", present: 26, total: 28, absentToday: 2 },
    { department: "Housekeeping", present: 17, total: 18, absentToday: 1 },
    { department: "Security", present: 12, total: 12, absentToday: 0 },
    { department: "Maintenance", present: 5, total: 6, absentToday: 1 },
    { department: "Administration", present: 8, total: 8, absentToday: 0 }
  ];

  // Utility Consumption
  const utilityConsumption = [
    { month: "Jan", electricity: 45600, water: 28900, gas: 1250, internet: 15000 },
    { month: "Feb", electricity: 42300, water: 26800, gas: 1180, internet: 15000 },
    { month: "Mar", electricity: 48900, water: 31200, gas: 1320, internet: 15000 },
    { month: "Apr", electricity: 41200, water: 25600, gas: 1100, internet: 15000 },
    { month: "May", electricity: 38500, water: 23400, gas: 980, internet: 15000 },
    { month: "Jun", electricity: 52100, water: 33800, gas: 1450, internet: 15000 },
    { month: "Jul", electricity: 54200, water: 35100, gas: 1520, internet: 15000 },
    { month: "Aug", electricity: 51800, water: 32900, gas: 1480, internet: 15000 },
    { month: "Sep", electricity: 49300, water: 30500, gas: 1380, internet: 15000 }
  ];

  // Security Incidents & Violations
  const securityIncidents = [
    { month: "Jan", incidents: 2, violations: 15, lateEntries: 234 },
    { month: "Feb", incidents: 1, violations: 12, lateEntries: 198 },
    { month: "Mar", incidents: 4, violations: 28, lateEntries: 287 },
    { month: "Apr", incidents: 0, violations: 8, lateEntries: 156 },
    { month: "May", incidents: 1, violations: 5, lateEntries: 123 },
    { month: "Jun", incidents: 3, violations: 22, lateEntries: 267 },
    { month: "Jul", incidents: 2, violations: 18, lateEntries: 298 },
    { month: "Aug", incidents: 1, violations: 16, lateEntries: 256 },
    { month: "Sep", incidents: 0, violations: 12, lateEntries: 234 }
  ];

  // Fee Collection Status
  const feeCollection = [
    { status: "Paid", count: 1089, amount: 22869000, percentage: 87.3 },
    { status: "Pending", count: 128, amount: 2688000, percentage: 10.3 },
    { status: "Overdue", count: 30, amount: 630000, percentage: 2.4 }
  ];

  // Monthly Revenue Trends
  const revenueTrends = [
    { month: "Jan", hostelFees: 2350000, messFees: 890000, miscellaneous: 45000 },
    { month: "Feb", hostelFees: 2420000, messFees: 912000, miscellaneous: 52000 },
    { month: "Mar", hostelFees: 2280000, messFees: 856000, miscellaneous: 38000 },
    { month: "Apr", hostelFees: 2180000, messFees: 823000, miscellaneous: 41000 },
    { month: "May", hostelFees: 1950000, messFees: 734000, miscellaneous: 29000 },
    { month: "Jun", hostelFees: 2580000, messFees: 972000, miscellaneous: 68000 },
    { month: "Jul", hostelFees: 2650000, messFees: 998000, miscellaneous: 72000 },
    { month: "Aug", hostelFees: 2620000, messFees: 987000, miscellaneous: 69000 },
    { month: "Sep", hostelFees: 2450000, messFees: 923000, miscellaneous: 58000 }
  ];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6"];

  // Function to convert data to CSV format
  const convertToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle values that might contain commas
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ].join('\n');
    
    return csvContent;
  };

  // Function to download CSV file
  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Main export function
  const handleExportReport = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const reportType = timeFilter;
    const blockFilter = selectedFilter;
    
    try {
      // Create a comprehensive report based on current filters
      const reportData = {
        reportInfo: {
          generatedDate: currentDate,
          reportType: reportType,
          blockFilter: blockFilter,
          totalStudents: 1247,
          occupancyRate: '91.9%'
        },
        
        // Summary Statistics
        summary: {
          studentsPresent: 1247,
          occupancyRate: 91.9,
          openTickets: 27,
          lateEntries: 48,
          securityIncidents: 0,
          messAttendance: 1143,
          staffPresent: 68,
          staffTotal: 72,
          monthlyPermissions: 398
        }
      };

      // Generate multiple CSV files for different data sets
      const exports = [
        { data: entryExitData, filename: `entry-exit-data-${currentDate}.csv` },
        { data: blockOccupancy, filename: `block-occupancy-${currentDate}.csv` },
        { data: roomTypes, filename: `room-revenue-${currentDate}.csv` },
        { data: ticketsByCategory, filename: `support-tickets-${currentDate}.csv` },
        { data: permissionTrends, filename: `permission-trends-${currentDate}.csv` },
        { data: inventoryStatus, filename: `inventory-status-${currentDate}.csv` },
        { data: messUtilization, filename: `mess-utilization-${currentDate}.csv` },
        { data: staffAttendance, filename: `staff-attendance-${currentDate}.csv` },
        { data: utilityConsumption, filename: `utility-consumption-${currentDate}.csv` },
        { data: securityIncidents, filename: `security-incidents-${currentDate}.csv` },
        { data: feeCollection, filename: `fee-collection-${currentDate}.csv` },
        { data: revenueTrends, filename: `revenue-trends-${currentDate}.csv` },
        { data: geofencingStatus, filename: `student-locations-${currentDate}.csv` }
      ];

      // Create a comprehensive summary report
      const summaryReport = [
        { metric: 'Students Present', value: 1247, category: 'Occupancy' },
        { metric: 'Occupancy Rate (%)', value: 91.9, category: 'Occupancy' },
        { metric: 'Open Support Tickets', value: 27, category: 'Support' },
        { metric: 'Late Entries (Current Month)', value: 48, category: 'Security' },
        { metric: 'Security Incidents (Current Month)', value: 0, category: 'Security' },
        { metric: 'Mess Attendance Average', value: 1143, category: 'Food Services' },
        { metric: 'Staff Present', value: 68, category: 'Staff Management' },
        { metric: 'Staff Total', value: 72, category: 'Staff Management' },
        { metric: 'Staff Attendance Rate (%)', value: 94.4, category: 'Staff Management' },
        { metric: 'Monthly Permissions', value: 398, category: 'Permissions' },
        { metric: 'Revenue Current Month (₹)', value: 3431000, category: 'Finance' },
        { metric: 'Fee Collection Rate (%)', value: 87.3, category: 'Finance' }
      ];

      // Download summary report first
      const summaryCSV = convertToCSV(summaryReport, 'summary-report');
      downloadCSV(summaryCSV, `hostel-summary-report-${currentDate}.csv`);

      // Download individual data exports with a slight delay to avoid browser blocking
      exports.forEach((exportItem, index) => {
        setTimeout(() => {
          const csvContent = convertToCSV(exportItem.data, exportItem.filename);
          if (csvContent) {
            downloadCSV(csvContent, exportItem.filename);
          }
        }, index * 200); // 200ms delay between downloads
      });

      // Show success message
      alert(`Report exported successfully! ${exports.length + 1} files have been downloaded.`);
      
    } catch (error) {
      console.error('Export error:', error);
      alert('There was an error exporting the report. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Hostel Administration Dashboard</h1>
            <p className="text-gray-600 text-sm">Comprehensive hostel management overview</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Last Updated</div>
            <div className="text-lg font-semibold text-blue-600">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search students, rooms, tickets..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Blocks</option>
              <option value="blockA">A Block</option>
              <option value="blockB">B Block</option>
              <option value="blockC">C Block</option>
              <option value="blockD">D Block</option>
              <option value="blockE">E Block</option>
            </select>
            
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="daily">Today</option>
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="quarterly">This Quarter</option>
            </select>
            
            <button 
              onClick={handleExportReport}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid - Row 1: Entry/Exit & Location Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        
        {/* Daily Entry/Exit Pattern */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Daily Entry/Exit</h3>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <ComposedChart data={entryExitData}>
              <XAxis dataKey="day" tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="entries" fill="#3B82F6" />
              <Bar dataKey="exits" fill="#10B981" />
              <Line type="monotone" dataKey="violations" stroke="#EF4444" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Avg: 254 daily</span>
            <span className="text-red-500">18 violations</span>
          </div>
        </div>

        {/* Student Location Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Student Locations</h3>
            <MapPin className="w-4 h-4 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={geofencingStatus}
                dataKey="students"
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                label={({percentage}) => `${percentage}%`}
              >
                <Cell fill="#10B981" />
                <Cell fill="#3B82F6" />
                <Cell fill="#F59E0B" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-1 gap-1 text-xs text-gray-600">
            {geofencingStatus.map((zone, idx) => (
              <span key={idx} className="flex justify-between">
                <span>{zone.zone.split(' ')[0]}:</span>
                <span>{zone.students}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Block Occupancy Status */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Block Occupancy</h3>
            <Bed className="w-4 h-4 text-purple-600" />
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={blockOccupancy}>
              <XAxis dataKey="block" tick={{ fontSize: 9 }} />
              <Tooltip />
              <Bar dataKey="occupancy" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Avg: 91.9%</span>
            <span className="text-green-600">1247/1360 beds</span>
          </div>
        </div>

        {/* Room Type Revenue */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Room Revenue</h3>
            <div className="text-xs text-green-500">₹22.2L/month</div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={roomTypes} layout="horizontal">
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="type" type="category" tick={{ fontSize: 8 }} width={60} />
              <Tooltip formatter={(value) => `₹${(value/1000).toFixed(0)}K`} />
              <Bar dataKey="revenue" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>407/425 occupied</span>
            <span className="text-green-600">95.8% utilization</span>
          </div>
        </div>

      </div>

      {/* Row 2: Support & Permissions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        
        {/* Support Tickets */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Support Tickets</h3>
            <AlertCircle className="w-4 h-4 text-orange-600" />
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={ticketsByCategory}>
              <XAxis dataKey="category" tick={{ fontSize: 8 }} />
              <Tooltip />
              <Bar dataKey="open" fill="#EF4444" />
              <Bar dataKey="inProgress" fill="#F59E0B" />
              <Bar dataKey="resolved" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Open: 27</span>
            <span className="text-green-600">Resolved: 63</span>
          </div>
        </div>

        {/* Permission Requests */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Permission Trends</h3>
            <Shield className="w-4 h-4 text-indigo-600" />
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={permissionTrends}>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area type="monotone" dataKey="gatePass" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
              <Area type="monotone" dataKey="visitor" stackId="1" stroke="#10B981" fill="#10B981" />
              <Area type="monotone" dataKey="medical" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
              <Area type="monotone" dataKey="late" stackId="1" stroke="#EF4444" fill="#EF4444" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Sep: 398 total</span>
            <span className="text-blue-600">Gate Pass: 234</span>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Inventory Status</h3>
            <Package className="w-4 h-4 text-purple-600" />
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={inventoryStatus} layout="horizontal">
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 9 }} width={60} />
              <Tooltip />
              <Bar dataKey="current" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span className="text-red-500">Low: 2 items</span>
            <span className="text-green-600">94% Available</span>
          </div>
        </div>

        {/* Mess Utilization */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Mess Utilization</h3>
            <Utensils className="w-4 h-4 text-orange-600" />
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <ComposedChart data={messUtilization}>
              <XAxis dataKey="meal" tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="served" fill="#F59E0B" />
              <Line type="monotone" dataKey="satisfaction" stroke="#10B981" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Avg: 1143/day</span>
            <span className="text-green-600">Rating: 4.3⭐</span>
          </div>
        </div>

      </div>

      {/* Row 3: Staff & Security */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        
        {/* Staff Attendance */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Staff Attendance</h3>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={staffAttendance}>
              <XAxis dataKey="department" tick={{ fontSize: 9 }} />
              <Tooltip />
              <Bar dataKey="present" fill="#10B981" />
              <Bar dataKey="absentToday" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Present: 68/72</span>
            <span className="text-green-600">94.4% attendance</span>
          </div>
        </div>

        {/* Security & Violations */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Security Monitoring</h3>
            <Shield className="w-4 h-4 text-red-600" />
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <ComposedChart data={securityIncidents}>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="incidents" fill="#EF4444" />
              <Line type="monotone" dataKey="lateEntries" stroke="#F59E0B" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Sep: 0 incidents</span>
            <span className="text-yellow-600">234 late entries</span>
          </div>
        </div>

        {/* Utility Consumption */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Utility Usage</h3>
            <Zap className="w-4 h-4 text-yellow-600" />
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={utilityConsumption}>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="electricity" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="water" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span className="flex items-center"><div className="w-2 h-2 bg-yellow-500 rounded mr-1"></div>Electricity</span>
            <span className="flex items-center"><div className="w-2 h-2 bg-blue-500 rounded mr-1"></div>Water</span>
          </div>
        </div>

        {/* Fee Collection */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Fee Collection</h3>
            <div className="text-xs text-green-500">87.3% paid</div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={feeCollection}
                dataKey="count"
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                label={({percentage}) => `${percentage}%`}
              >
                <Cell fill="#10B981" />
                <Cell fill="#F59E0B" />
                <Cell fill="#EF4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-1 gap-1 text-xs text-gray-600">
            <span className="flex justify-between">
              <span>Overdue:</span>
              <span className="text-red-600">₹6.3L</span>
            </span>
            <span className="flex justify-between">
              <span>Pending:</span>
              <span className="text-yellow-600">₹26.8L</span>
            </span>
          </div>
        </div>

      </div>

      {/* Revenue Trends - Full Width */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-700">Monthly Revenue Trends</h3>
          <div className="text-sm text-green-600">Current: ₹34.3L</div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={revenueTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${(value/100000).toFixed(1)}L`} />
            <Bar dataKey="hostelFees" fill="#3B82F6" name="Hostel Fees" />
            <Bar dataKey="messFees" fill="#10B981" name="Mess Fees" />
            <Bar dataKey="miscellaneous" fill="#F59E0B" name="Miscellaneous" />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 text-xs text-gray-600 mt-2">
          <span className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>Hostel Fees</span>
          <span className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded mr-1"></div>Mess Fees</span>
          <span className="flex items-center"><div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>Miscellaneous</span>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Today's Key Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">1,247</div>
            <div className="text-xs text-gray-600">Students Present</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-xl font-bold text-green-600">91.9%</div>
            <div className="text-xs text-gray-600">Occupancy Rate</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-xl font-bold text-orange-600">27</div>
            <div className="text-xs text-gray-600">Open Tickets</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-xl font-bold text-purple-600">48</div>
            <div className="text-xs text-gray-600">Late Entries</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-xl font-bold text-red-600">0</div>
            <div className="text-xs text-gray-600">Security Incidents</div>
          </div>
          <div className="text-center p-3 bg-indigo-50 rounded-lg">
            <div className="text-xl font-bold text-indigo-600">1,143</div>
            <div className="text-xs text-gray-600">Mess Attendance</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-xl font-bold text-yellow-600">68/72</div>
            <div className="text-xs text-gray-600">Staff Present</div>
          </div>
          <div className="text-center p-3 bg-teal-50 rounded-lg">
            <div className="text-xl font-bold text-teal-600">398</div>
            <div className="text-xs text-gray-600">Month Permissions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelAdminDashboard;
