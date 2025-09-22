

import React, { useState } from "react";
import {
  Calendar,
  Settings,
  Clock,
  Users,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Moon,
  Sun,
  Menu,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
} from "lucide-react";
 import { useTheme } from "../../../contexts/ThemeContext";

interface LeavePolicy {
  id: string;
  name: string;
  type: "casual" | "sick" | "annual" | "maternity" | "paternity" | "emergency" | "study";
  daysAllowed: number;
  carryForward: boolean;
  maxCarryForward?: number;
  requiresApproval: boolean;
  minAdvanceNotice: number;
  maxConsecutiveDays?: number;
  applicableFor: string;
  isActive: boolean;
}

interface Holiday {
  id: string;
  name: string;
  date: string;
  type: "fixed" | "floating" | "regional";
  isOptional: boolean;
  description?: string;
}

interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  isExceptional: boolean;
  appliedDate: string;
  approver?: string;
}

const leaveTypes = [
  { value: "casual", label: "Casual Leave", color: "bg-blue-500" },
  { value: "sick", label: "Sick Leave", color: "bg-red-500" },
  { value: "annual", label: "Annual Leave", color: "bg-green-500" },
  { value: "maternity", label: "Maternity Leave", color: "bg-pink-500" },
  { value: "paternity", label: "Paternity Leave", color: "bg-purple-500" },
  { value: "emergency", label: "Emergency Leave", color: "bg-orange-500" },
  { value: "study", label: "Study Leave", color: "bg-indigo-500" },
];

const LeavePolicyManagement: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"policies" | "calendar" | "approvals">("calendar");

  const [leavePolicies, setLeavePolicies] = useState<LeavePolicy[]>([
    {
      id: "1",
      name: "Casual Leave",
      type: "casual",
      daysAllowed: 12,
      carryForward: true,
      maxCarryForward: 3,
      requiresApproval: true,
      minAdvanceNotice: 1,
      maxConsecutiveDays: 5,
      applicableFor: "All Employees",
      isActive: true,
    },
    {
      id: "2",
      name: "Sick Leave",
      type: "sick",
      daysAllowed: 10,
      carryForward: false,
      requiresApproval: false,
      minAdvanceNotice: 0,
      applicableFor: "All Employees",
      isActive: true,
    },
    {
      id: "3",
      name: "Annual Leave",
      type: "annual",
      daysAllowed: 21,
      carryForward: true,
      maxCarryForward: 5,
      requiresApproval: true,
      minAdvanceNotice: 7,
      applicableFor: "All Employees",
      isActive: true,
    },
  ]);

  const [holidays, setHolidays] = useState<Holiday[]>([
    {
      id: "1",
      name: "New Year's Day",
      date: "2025-01-01",
      type: "fixed",
      isOptional: false,
      description: "National Holiday",
    },
    {
      id: "2",
      name: "Independence Day",
      date: "2025-08-15",
      type: "fixed",
      isOptional: false,
      description: "National Holiday",
    },
    {
      id: "3",
      name: "Diwali",
      date: "2025-11-01",
      type: "floating",
      isOptional: true,
      description: "Festival of Lights",
    },
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: "1",
      employeeName: "John Smith",
      employeeId: "EMP001",
      leaveType: "Annual Leave",
      startDate: "2025-02-15",
      endDate: "2025-02-25",
      days: 8,
      reason: "Family vacation - extended duration",
      status: "pending",
      isExceptional: true,
      appliedDate: "2025-01-15",
    },
    {
      id: "2",
      employeeName: "Sarah Johnson",
      employeeId: "EMP002",
      leaveType: "Study Leave",
      startDate: "2025-03-01",
      endDate: "2025-03-07",
      days: 5,
      reason: "Professional certification exam",
      status: "pending",
      isExceptional: true,
      appliedDate: "2025-01-20",
    },
  ]);

  const [showPolicyForm, setShowPolicyForm] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<LeavePolicy | null>(null);

  const [showHolidayForm, setShowHolidayForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const PolicyForm = () => {
    const [formData, setFormData] = useState<Partial<LeavePolicy>>(
      editingPolicy || {
        name: "",
        type: "casual",
        daysAllowed: 0,
        carryForward: false,
        requiresApproval: true,
        minAdvanceNotice: 1,
        applicableFor: "All Employees",
        isActive: true,
      }
    );

    const handleSave = () => {
      if (!formData.name || formData.daysAllowed === undefined) {
        alert("Please enter required fields.");
        return;
      }
      if (editingPolicy) {
        setLeavePolicies((policies) =>
          policies.map((p) =>
            p.id === editingPolicy.id ? ({ ...formData, id: editingPolicy.id } as LeavePolicy) : p
          )
        );
      } else {
        const newPolicy: LeavePolicy = {
          ...(formData as LeavePolicy),
          id: Date.now().toString(),
        };
        setLeavePolicies((policies) => [...policies, newPolicy]);
      }
      setShowPolicyForm(false);
      setEditingPolicy(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div
          className={`${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">
              {editingPolicy ? "Edit Leave Policy" : "Create Leave Policy"}
            </h3>
            <button
              onClick={() => {
                setShowPolicyForm(false);
                setEditingPolicy(null);
              }}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Policy Name</label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full p-2 rounded border ${
                  isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                }`}
                placeholder="e.g., Casual Leave"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Leave Type</label>
              <select
                value={formData.type || "casual"}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as LeavePolicy["type"] })
                }
                className={`w-full p-2 rounded border ${
                  isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                }`}
              >
                {leaveTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Days Allowed / Year</label>
                <input
                  type="number"
                  min={0}
                  value={formData.daysAllowed || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, daysAllowed: parseInt(e.target.value) || 0 })
                  }
                  className={`w-full p-2 rounded border ${
                    isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Min. Advance Notice (days)</label>
                <input
                  type="number"
                  min={0}
                  value={formData.minAdvanceNotice || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, minAdvanceNotice: parseInt(e.target.value) || 0 })
                  }
                  className={`w-full p-2 rounded border ${
                    isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Max Consecutive Days (optional)</label>
              <input
                type="number"
                min={1}
                value={formData.maxConsecutiveDays || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxConsecutiveDays: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                placeholder="No limit"
                className={`w-full p-2 rounded border ${
                  isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                }`}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="carryForward"
                checked={formData.carryForward || false}
                onChange={(e) => setFormData({ ...formData, carryForward: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="carryForward" className="text-sm">
                Allow carry forward to next year
              </label>
            </div>

            {formData.carryForward && (
              <div>
                <label className="block text-sm font-medium mb-1">Max Carry Forward Days</label>
                <input
                  type="number"
                  min={0}
                  value={formData.maxCarryForward || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxCarryForward: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  placeholder="No limit"
                  className={`w-full p-2 rounded border ${
                    isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  }`}
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="requiresApproval"
                checked={formData.requiresApproval || false}
                onChange={(e) => setFormData({ ...formData, requiresApproval: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="requiresApproval" className="text-sm">
                Requires manager approval
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive !== false}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="isActive" className="text-sm">
                Active policy
              </label>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                {editingPolicy ? (
                  <>
                    <Save className="inline mr-2" size={16} />
                    Update Policy
                  </>
                ) : (
                  <>
                    <Save className="inline mr-2" size={16} />
                    Create Policy
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowPolicyForm(false);
                  setEditingPolicy(null);
                }}
                className={`flex-1 py-2 px-4 rounded border transition-colors ${
                  isDark
                    ? "border-gray-600 text-gray-400 hover:bg-gray-700"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HolidayForm = () => {
    const [formData, setFormData] = useState<Partial<Holiday>>({
      name: "",
      date: selectedDate,
      type: "fixed",
      isOptional: false,
      description: "",
    });

    const handleSave = () => {
      if (!formData.name || !formData.date) {
        alert("Please enter holiday name and date.");
        return;
      }
      const newHoliday: Holiday = {
        ...(formData as Holiday),
        id: Date.now().toString(),
      };
      setHolidays((holidays) => [...holidays, newHoliday]);
      setShowHolidayForm(false);
      setFormData({
        name: "",
        date: "",
        type: "fixed",
        isOptional: false,
        description: "",
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div
          className={`${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } rounded-lg p-6 w-full max-w-md`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Add Holiday</h3>
            <button
              onClick={() => setShowHolidayForm(false)}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Holiday Name</label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full p-2 rounded border ${
                  isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                }`}
                placeholder="e.g., Christmas Day"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={formData.date || ""}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full p-2 rounded border ${
                  isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={formData.type || "fixed"}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Holiday["type"] })}
                className={`w-full p-2 rounded border ${
                  isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                }`}
              >
                <option value="fixed">Fixed Holiday</option>
                <option value="floating">Floating Holiday</option>
                <option value="regional">Regional Holiday</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isOptional"
                checked={formData.isOptional || false}
                onChange={(e) => setFormData({ ...formData, isOptional: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="isOptional" className="text-sm">
                Optional holiday
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description (optional)</label>
              <textarea
                className={`w-full p-2 rounded border ${
                  isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                }`}
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                placeholder="Holiday description"
              ></textarea>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                <Plus size={16} className="inline mr-2" />
                Add Holiday
              </button>
              <button
                onClick={() => setShowHolidayForm(false)}
                className={`flex-1 py-2 px-4 rounded border transition-colors ${
                  isDark
                    ? "border-gray-600 text-gray-400 hover:bg-gray-700"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let day = 1; day <= daysInMonth; day++) days.push(day);

  const getHolidayForDate = (day: number) => {
    if (!day) return undefined;
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return holidays.find((h) => h.date === dateStr);
  };

  const handleApproval = (requestId: string, action: "approved" | "rejected") => {
    setLeaveRequests((requests) =>
      requests.map((req) => (req.id === requestId ? { ...req, status: action, approver: "Current User" } : req))
    );
  };

  const handleDateClick = (day: number) => {
    if (!day) return;
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setShowHolidayForm(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <header className={` ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b px-4 py-3 sticky top-0 z-40`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Leave Policy Management</h1>
          </div>
        </div>
      </header>

      <div className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b px-4 flex space-x-8 overflow-x-auto`}>
        <button
          onClick={() => setActiveTab("policies")}
          className={`py-3 px-1 border-b-2 whitespace-nowrap flex items-center space-x-2 ${
            activeTab === "policies" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Settings size={16} />
          <span>Leave Policies</span>
        </button>

        <button
          onClick={() => setActiveTab("calendar")}
          className={`py-3 px-1 border-b-2 whitespace-nowrap flex items-center space-x-2 ${
            activeTab === "calendar" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Calendar size={16} />
          <span>Holiday Calendar</span>
        </button>

        <button
          onClick={() => setActiveTab("approvals")}
          className={`py-3 px-1 border-b-2 whitespace-nowrap flex items-center space-x-2 ${
            activeTab === "approvals" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Users size={16} />
          <span>Approval Queue</span>
          {leaveRequests.filter((r) => r.status === "pending").length > 0 && (
            <span className="ml-2 rounded-full bg-yellow-300 px-2 text-xs font-semibold text-yellow-900">
              {leaveRequests.filter((r) => r.status === "pending").length}
            </span>
          )}
        </button>
      </div>

      <div className="p-4">
        {activeTab === "policies" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Leave Policies Configuration</h2>
              <button
                onClick={() => setShowPolicyForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Policy</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leavePolicies.map((policy) => {
                const leaveType = leaveTypes.find((t) => t.value === policy.type);
                return (
                  <div
                    key={policy.id}
                    className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg p-6 shadow-sm border ${
                      isDark ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${leaveType?.color || "bg-gray-400"}`}></div>
                        <h3 className="font-medium">{policy.name}</h3>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => {
                            setEditingPolicy(policy);
                            setShowPolicyForm(true);
                          }}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => setLeavePolicies((policies) => policies.filter((p) => p.id !== policy.id))}
                          className="p-1 rounded text-red-400 hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{leaveType?.label || policy.type}</p>
                    <div className="space-y-1 mt-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Days Allowed</span>
                        <span>{policy.daysAllowed} year</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Advance Notice</span>
                        <span>
                          {policy.minAdvanceNotice} day{policy.minAdvanceNotice !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Consecutive</span>
                        <span>{policy.maxConsecutiveDays ?? "Unlimited"} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Carry Forward</span>
                        <span>
                          {policy.carryForward
                            ? policy.maxCarryForward
                              ? `${policy.maxCarryForward} days`
                              : "Unlimited"
                            : "No"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Status</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            policy.isActive
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {policy.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700 text-xs space-x-4">
                      {policy.requiresApproval && (
                        <span className="flex items-center space-x-1 text-orange-600">
                          <AlertCircle size={12} />
                          <span>Requires Approval</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "calendar" && (
          <div>
            <h2 className="mb-2 text-lg font-semibold">Holiday Calendar Management</h2>
            <p className={`mb-6 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Configure official college holidays. Click on any date to add or edit holidays.</p>

            <div className="lg:grid lg:grid-cols-3 lg:gap-6">
              <div className="lg:col-span-1 mb-6 lg:mb-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Upcoming Holidays</h3>
                  <button
                    onClick={() => {
                      setSelectedDate(new Date().toISOString().split('T')[0]);
                      setShowHolidayForm(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors flex items-center space-x-1"
                  >
                    <Plus size={14} />
                    <span>Add Holiday</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {[...holidays]
                    .filter((h) => new Date(h.date) >= new Date())
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .slice(0, 6)
                    .map((holiday) => (
                      <div
                        key={holiday.id}
                        className={`flex items-start space-x-3 p-3 rounded-lg border ${
                          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            holiday.isOptional ? "bg-yellow-400" : "bg-red-400"
                          } mt-1 flex-shrink-0`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{holiday.name}</p>
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            {new Date(holiday.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                          {holiday.description && (
                            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"} mt-1`}>
                              {holiday.description}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => setHolidays(holidays.filter(h => h.id !== holiday.id))}
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  {holidays.filter((h) => new Date(h.date) >= new Date()).length === 0 && (
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} text-center py-4`}>
                      No upcoming holidays scheduled
                    </p>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Calendar View</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        if (selectedMonth === 0) {
                          setSelectedMonth(11);
                          setSelectedYear(selectedYear - 1);
                        } else {
                          setSelectedMonth(selectedMonth - 1);
                        }
                      }}
                      className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700`}
                    >
                      ←
                    </button>
                    <span className="font-medium min-w-32 text-center">
                      {monthNames[selectedMonth]} {selectedYear}
                    </span>
                    <button
                      onClick={() => {
                        if (selectedMonth === 11) {
                          setSelectedMonth(0);
                          setSelectedYear(selectedYear + 1);
                        } else {
                          setSelectedMonth(selectedMonth + 1);
                        }
                      }}
                      className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700`}
                    >
                      →
                    </button>
                  </div>
                </div>

                <div className={`rounded-lg border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-4`}>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day) => (
                      <div
                        key={day}
                        className={`p-2 text-center text-sm font-medium ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((day, index) => {
                      const holiday = day ? getHolidayForDate(day) : null;
                      const isToday = day && 
                        day === new Date().getDate() && 
                        selectedMonth === new Date().getMonth() && 
                        selectedYear === new Date().getFullYear();

                      return (
                        <div
                          key={index}
                          onClick={() => day && handleDateClick(day)}
                          className={`
                            p-2 h-10 flex items-center justify-center text-sm cursor-pointer rounded
                            ${day ? "hover:bg-blue-100 dark:hover:bg-blue-900" : ""}
                            ${isToday ? "bg-blue-500 text-white font-bold" : ""}
                            ${holiday ? (holiday.isOptional ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200") : ""}
                            ${!day ? "cursor-default" : ""}
                          `}
                        >
                          {day || ""}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex items-center justify-center space-x-6 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded"></div>
                      <span>Fixed Holiday</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                      <span>Optional Holiday</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "approvals" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Leave Request Approvals</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>{leaveRequests.filter((r) => r.status === "pending").length} pending requests</span>
              </div>
            </div>

            <div className="space-y-4">
              {leaveRequests
                .filter((req) => req.status === "pending")
                .map((request) => (
                  <div
                    key={request.id}
                    className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg p-6 shadow-sm border ${
                      isDark ? "border-gray-700" : "border-gray-200"
                    } ${request.isExceptional ? "border-l-4 border-l-yellow-500" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <User size={16} className="text-gray-400" />
                          <h3 className="font-medium">{request.employeeName}</h3>
                          <span className="text-sm text-gray-500">({request.employeeId})</span>
                          {request.isExceptional && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs font-medium">
                              Exceptional Request
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Leave Type:</span>
                            <p className="font-medium">{request.leaveType}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Duration:</span>
                            <p className="font-medium">
                              {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-500">{request.days} day{request.days !== 1 ? "s" : ""}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Applied:</span>
                            <p className="font-medium">{new Date(request.appliedDate).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <span className="text-gray-400 text-sm">Reason:</span>
                          <p className="mt-1 text-sm">{request.reason}</p>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleApproval(request.id, "approved")}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                        >
                          <CheckCircle size={16} />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleApproval(request.id, "rejected")}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                        >
                          <XCircle size={16} />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              {leaveRequests.filter((req) => req.status === "pending").length === 0 && (
                <div className="text-center py-8">
                  <Users size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    No pending leave requests
                  </p>
                  <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-500"} mt-1`}>
                    All caught up! New requests will appear here.
                  </p>
                </div>
              )}

              {/* Recent Approvals */}
              {leaveRequests.filter((req) => req.status !== "pending").length > 0 && (
                <div className="mt-8">
                  <h3 className="text-md font-semibold mb-4">Recent Decisions</h3>
                  <div className="space-y-3">
                    {leaveRequests
                      .filter((req) => req.status !== "pending")
                      .slice(0, 3)
                      .map((request) => (
                        <div
                          key={request.id}
                          className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg p-4 shadow-sm border ${
                            isDark ? "border-gray-700" : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <User size={14} className="text-gray-400" />
                              <span className="font-medium text-sm">{request.employeeName}</span>
                              <span className="text-xs text-gray-500">{request.leaveType}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {request.status === "approved" ? (
                                <CheckCircle size={16} className="text-green-500" />
                              ) : (
                                <XCircle size={16} className="text-red-500" />
                              )}
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  request.status === "approved"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                              >
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Render forms conditionally */}
      {showPolicyForm && <PolicyForm />}
      {showHolidayForm && <HolidayForm />}
    </div>
  );
};

export default LeavePolicyManagement;