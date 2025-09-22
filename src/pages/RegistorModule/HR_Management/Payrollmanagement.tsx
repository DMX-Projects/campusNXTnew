
import React, { useState } from 'react';
import { 
  Users, 
  IndianRupee, 
  DollarSign, 
  FileText, 
  Upload, 
  Calculator, 
  CheckCircle, 
  Download,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

import { useTheme } from '../../../contexts/ThemeContext';

interface Employee {
  id: string;
  name: string;
  position: string;
  basicSalary: number;
  deductions: number;
  overtime: number;
  netPay: number;
  status: 'pending' | 'calculated' | 'processed';
}

const PayrollManagement: React.FC = () => {
  const { isDark } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '001',
      name: 'John Smith',
      position: 'Software Engineer',
      basicSalary: 75000,
      deductions: 8500,
      overtime: 2400,
      netPay: 68900,
      status: 'pending'
    },
    {
      id: '002',
      name: 'Sarah Johnson',
      position: 'Product Manager',
      basicSalary: 85000,
      deductions: 9200,
      overtime: 1800,
      netPay: 77600,
      status: 'pending'
    },
    {
      id: '003',
      name: 'Mike Davis',
      position: 'UI/UX Designer',
      basicSalary: 65000,
      deductions: 7100,
      overtime: 3200,
      netPay: 61100,
      status: 'pending'
    }
  ]);

  const stats = {
    totalEmployees: employees.length,
    totalPayroll: employees.reduce((sum, emp) => sum + emp.netPay, 0),
    totalDeductions: employees.reduce((sum, emp) => sum + emp.deductions, 0),
    processedCount: employees.filter(emp => emp.status === 'processed').length
  };

  const steps = [
    { id: 1, title: 'Import Data', description: 'Import attendance and leave data', icon: Upload },
    { id: 2, title: 'Review & Calculate', description: 'Review and calculate salaries', icon: Calculator },
    { id: 3, title: 'Finalize & Process', description: 'Generate reports and process payments', icon: CheckCircle }
  ];

  const calculatePayroll = () => {
    setEmployees(prev => prev.map(emp => ({
      ...emp,
      status: 'calculated' as const,
      netPay: emp.basicSalary + emp.overtime - emp.deductions
    })));
    setCurrentStep(3);
  };

  const processPayroll = () => {
    setEmployees(prev => prev.map(emp => ({
      ...emp,
      status: 'processed' as const
    })));
  };

  // Import attendance data handler
  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv, application/json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          console.log('Imported Data:', content);
          // Parsing logic can be implemented here if needed
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // Preview reports handler
  const handlePreviewReports = () => {
    const reportPreview = JSON.stringify(employees, null, 2);
    alert(`Payroll Report Preview:\n₹{reportPreview}`);
  };

  // Download reports handler
  const handleDownloadReports = () => {
    const header = ['ID', 'Name', 'Position', 'Basic Salary', 'Deductions', 'Overtime', 'Net Pay', 'Status'];
    const csvRows = [
      header.join(','),
      ...employees.map(emp =>
        [
          emp.id,
          `"₹{emp.name.replace(/"/g, '""')}"`,
          `"₹{emp.position.replace(/"/g, '""')}"`,
          emp.basicSalary,
          emp.deductions,
          emp.overtime,
          emp.netPay,
          emp.status
        ].join(',')
      )
    ];
    const csvContent = csvRows.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `payroll-report-₹{selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ₹{
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`₹{isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 lg:px-6 h-16 flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          
          <div className="flex items-center gap-2">
            <IndianRupee className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold">Payroll Management</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className={`px-3 py-2 rounded-md border text-sm ₹{
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
          {/* Theme toggle button */}
          {/* You can implement your own toggle button here if needed */}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`₹{isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 ₹{isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r transition-transform duration-200 ease-in-out`}>
          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ₹{isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm opacity-75">Total Employees</p>
                    <p className="text-xl font-bold">{stats.totalEmployees}</p>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ₹{isDark ? 'bg-gray-700' : 'bg-green-50'}`}>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm opacity-75">Total Payroll</p>
                    <p className="text-xl font-bold">₹{stats.totalPayroll.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow Steps */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm uppercase tracking-wide opacity-75">
                Workflow
              </h3>
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ₹{
                      isActive 
                        ? isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                        : isCompleted
                        ? isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                        : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <Icon size={16} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{step.title}</p>
                      <p className="text-xs opacity-75">{step.description}</p>
                    </div>
                    {isCompleted && <CheckCircle size={16} />}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* Step Header */}
          <div className={`p-6 rounded-lg ₹{isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{steps[currentStep - 1].title}</h2>
                <p className="opacity-75">{steps[currentStep - 1].description}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ₹{isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                Step {currentStep} of {steps.length}
              </div>
            </div>

            {/* Step Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              {currentStep === 1 && (
                <>
                  <button 
                    onClick={handleImportData} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Upload size={16} />
                    Import Attendance Data
                  </button>
                  <button 
                    onClick={() => setCurrentStep(2)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ₹{
                      isDark 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    Next Step
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
             
              {currentStep === 2 && (
                <>
                  <button 
                    onClick={calculatePayroll}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Calculator size={16} />
                    Calculate Payroll
                  </button>
                  <button 
                    onClick={handlePreviewReports}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ₹{
                      isDark 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    <FileText size={16} />
                    Preview Reports
                  </button>
                </>
              )}
             
              {currentStep === 3 && (
                <>
                  <button 
                    onClick={processPayroll}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    <CheckCircle size={16} />
                    Process Payments
                  </button>
                  <button 
                    onClick={handleDownloadReports} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Download size={16} />
                    Download Reports
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Employee Table */}
          <div className={`rounded-lg border overflow-hidden ₹{isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Employee Payroll Data</h3>
            </div>
            
            {/* Mobile Cards */}
            <div className="block lg:hidden">
              {employees.map((employee) => (
                <div key={employee.id} className={`p-4 border-b ₹{isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{employee.name}</h4>
                      <p className="text-sm opacity-75">{employee.position}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ₹{
                      employee.status === 'processed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : employee.status === 'calculated'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {employee.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="opacity-75">Basic Salary</p>
                      <p className="font-medium">₹{employee.basicSalary.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="opacity-75">Deductions</p>
                      <p className="font-medium text-red-600">₹{employee.deductions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="opacity-75">Overtime</p>
                      <p className="font-medium text-green-600">₹{employee.overtime.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="opacity-75">Net Pay</p>
                      <p className="font-bold">₹{employee.netPay.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className={`₹{isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Basic Salary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Overtime</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Deductions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Net Pay</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ₹{isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {employees.map((employee) => (
                    <tr key={employee.id} className={`hover:₹{isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm opacity-75">{employee.position}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">₹{employee.basicSalary.toLocaleString()}</td>
                      <td className="px-6 py-4 text-green-600 font-medium">₹{employee.overtime.toLocaleString()}</td>
                      <td className="px-6 py-4 text-red-600 font-medium">₹{employee.deductions.toLocaleString()}</td>
                      <td className="px-6 py-4 font-bold">₹{employee.netPay.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full capitalize ₹{
                          employee.status === 'processed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : employee.status === 'calculated'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {employee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-lg ₹{isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm opacity-75">Total Payroll</p>
                  <p className="text-2xl font-bold">₹{stats.totalPayroll.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className={`p-6 rounded-lg ₹{isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-md">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm opacity-75">Total Deductions</p>
                  <p className="text-2xl font-bold">₹{stats.totalDeductions.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className={`p-6 rounded-lg ₹{isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-md">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm opacity-75">Processed</p>
                  <p className="text-2xl font-bold">{stats.processedCount}/{stats.totalEmployees}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PayrollManagement;
