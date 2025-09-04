import React, { useState } from 'react';
import { Bus, CreditCard, Calendar, MapPin, AlertCircle, CheckCircle, Clock, Receipt, X, Printer, Download, Eye, Smartphone, Banknote, Building, QrCode, IndianRupee, TrendingUp, Award, Target } from 'lucide-react';

const StudentFeeDetail = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  // Student fee data with semester-wise structure
  const feeData = {
    studentId: "2025STU001",
    name: "Anil Kumar",
    course: "B.Tech - CSE - 3rd Year - A Section",
    transportDetails: {
      routeNo: "12",
      busNo: "AP 29 XX 1234",
      pickupPoint: "Madhapur Signal",
      dropTime: "4:45 PM"
    },
    // Semester-wise fee structure
    semesterFees: [
      {
        id: 1,
        semester: "Semester 1 (2025-26)",
        academicPeriod: "June 2025 - November 2025",
        totalFee: 9000,
        monthlyFee: 1500,
        paymentStartDate: "Jun 01, 2025",
        paymentEndDate: "Jun 30, 2025",
        actualPayments: [
          { month: "June", amount: 1500, date: "2025-06-05", status: "Paid", method: "UPI" },
          { month: "July", amount: 1500, date: "2025-07-10", status: "Paid", method: "Net Banking" },
          { month: "August", amount: 1500, date: "2025-08-15", status: "Paid", method: "UPI" },
          { month: "September", amount: 1500, date: "2025-09-12", status: "Paid", method: "Card" },
          { month: "October", amount: 1500, date: "2025-10-08", status: "Paid", method: "UPI" },
          { month: "November", amount: 1500, date: "2025-11-05", status: "Paid", method: "UPI" }
        ],
        totalPaid: 9000,
        pending: 0,
        status: "Completed",
        completionRate: 100,
        gradient: "from-green-400 to-emerald-600"
      },
      {
        id: 2,
        semester: "Semester 2 (2025-26)",
        academicPeriod: "December 2025 - May 2026",
        totalFee: 9000,
        monthlyFee: 1500,
        paymentStartDate: "Dec 01, 2025",
        paymentEndDate: "Dec 31, 2025",
        actualPayments: [
          { month: "December", amount: 1500, date: "2025-12-05", status: "Due Soon", method: "", daysLeft: 93 },
          { month: "January", amount: 1500, date: "", status: "Upcoming", method: "" },
          { month: "February", amount: 1500, date: "", status: "Upcoming", method: "" },
          { month: "March", amount: 1500, date: "", status: "Upcoming", method: "" },
          { month: "April", amount: 1500, date: "", status: "Upcoming", method: "" },
          { month: "May", amount: 1500, date: "", status: "Upcoming", method: "" }
        ],
        totalPaid: 0,
        pending: 9000,
        status: "Active",
        completionRate: 0,
        gradient: "from-blue-400 to-indigo-600"
      },
      {
        id: 3,
        semester: "Semester 3 (2026-27)",
        academicPeriod: "June 2026 - November 2026",
        totalFee: 9500,
        monthlyFee: 1583, // Slight increase
        paymentStartDate: "Jun 01, 2026",
        paymentEndDate: "Jun 30, 2026",
        actualPayments: [],
        totalPaid: 0,
        pending: 9500,
        status: "Future",
        completionRate: 0,
        gradient: "from-purple-400 to-pink-600"
      },
      {
        id: 4,
        semester: "Semester 4 (2026-27)",
        academicPeriod: "December 2026 - May 2027",
        totalFee: 9500,
        monthlyFee: 1583,
        paymentStartDate: "Dec 01, 2026",
        paymentEndDate: "Dec 31, 2026",
        actualPayments: [],
        totalPaid: 0,
        pending: 9500,
        status: "Future",
        completionRate: 0,
        gradient: "from-orange-400 to-red-600"
      }
    ],
    // Overall summary
    feeStructure: {
      totalAnnualFee: 37000,
      totalPaid: 9000,
      totalPending: 28000,
      lastPayment: {
        amount: 1500,
        method: "UPI",
        transactionId: "TXN45678",
        date: "2025-11-05"
      },
      nextDueDate: "05-Dec-2025",
      status: "Active"
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700 border-green-200";
      case "Active": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Due Soon": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Future": return "bg-gray-100 text-gray-700 border-gray-200";
      case "Overdue": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

  const handlePayment = (method, semesterId = null) => {
    if (semesterId) {
      alert(`Payment initiated for Semester ${semesterId} via ${method}. Redirecting to payment gateway...`);
    } else {
      alert(`Payment initiated via ${method}. Redirecting to payment gateway...`);
    }
    setActiveModal(null);
  };

  const handleSemesterPayment = (semesterId) => {
    setActiveModal(`payment-${semesterId}`);
  };

  const handleDownloadReceipt = () => {
    const receiptContent = `
TRANSPORT FEE RECEIPT - SEMESTER WISE
====================================

Student: ${feeData.name}
Student ID: ${feeData.studentId}
Course: ${feeData.course}
Route: ${feeData.transportDetails.routeNo}
Bus: ${feeData.transportDetails.busNo}
Pickup: ${feeData.transportDetails.pickupPoint}

SEMESTER WISE FEE BREAKDOWN:
===========================
${feeData.semesterFees.map(sem => `
${sem.semester}
Period: ${sem.academicPeriod}
Total Fee: ${formatCurrency(sem.totalFee)}
Paid: ${formatCurrency(sem.totalPaid)}
Pending: ${formatCurrency(sem.pending)}
Status: ${sem.status}
Payment Window: ${sem.paymentStartDate} to ${sem.paymentEndDate}
`).join('\n')}

OVERALL SUMMARY:
================
Total Annual Fee: ${formatCurrency(feeData.feeStructure.totalAnnualFee)}
Total Paid: ${formatCurrency(feeData.feeStructure.totalPaid)}
Total Pending: ${formatCurrency(feeData.feeStructure.totalPending)}
Next Due: ${feeData.feeStructure.nextDueDate}
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `semester_fee_statement_${feeData.studentId}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  // Payment Modal for specific semester
  const SemesterPaymentModal = ({ semesterData }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{semesterData.semester}</h3>
              <p className="text-sm text-gray-600">{semesterData.academicPeriod}</p>
            </div>
            <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee className="w-5 h-5 text-blue-600" />
              <p className="text-sm font-medium text-blue-600">Amount to Pay</p>
            </div>
            <p className="text-3xl font-bold text-blue-700">{formatCurrency(semesterData.pending)}</p>
            <div className="mt-2 text-xs text-blue-600">
              <p>Payment window: {semesterData.paymentStartDate} - {semesterData.paymentEndDate}</p>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => handlePayment('UPI', semesterData.id)}
              className="w-full p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-purple-200 transition-all flex items-center gap-3 group"
            >
              <QrCode className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="font-semibold text-gray-800">UPI Payment</p>
                <p className="text-sm text-gray-600">Pay using UPI apps (Recommended)</p>
              </div>
            </button>

            <button 
              onClick={() => handlePayment('Net Banking', semesterData.id)}
              className="w-full p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-200 transition-all flex items-center gap-3 group"
            >
              <Building className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="font-semibold text-gray-800">Net Banking</p>
                <p className="text-sm text-gray-600">Pay using your bank account</p>
              </div>
            </button>

            <button 
              onClick={() => handlePayment('Credit/Debit Card', semesterData.id)}
              className="w-full p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-green-200 transition-all flex items-center gap-3 group"
            >
              <CreditCard className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="font-semibold text-gray-800">Credit/Debit Card</p>
                <p className="text-sm text-gray-600">Pay using your card</p>
              </div>
            </button>
          </div>

          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> Payment must be made within the payment window for the semester to avoid late fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const currentSemesterForPayment = feeData.semesterFees.find(sem => 
    activeModal?.includes('payment-') && activeModal.split('-')[1] == sem.id
  );

  function handlePaymentHistory(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    alert('Payment history feature is coming soon!');
  }

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-4 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Bus className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Semester-wise Transport Fees</h1>
              <p className="text-blue-100 text-sm sm:text-base mt-1">Complete payment breakdown and management</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
          {/* Student & Transport Info */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Student Info */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Student Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Student ID</p>
                  <p className="font-bold text-lg text-gray-900">{feeData.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Name</p>
                  <p className="font-bold text-lg text-gray-900">{feeData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Course</p>
                  <p className="font-semibold text-gray-900">{feeData.course}</p>
                </div>
              </div>
            </div>

            {/* Transport Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Bus className="w-6 h-6 text-blue-600" />
                Transport Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 font-medium">Route & Bus:</span>
                  <span className="font-bold text-blue-700">Route {feeData.transportDetails.routeNo} • {feeData.transportDetails.busNo}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-medium">Pickup Point:</span>
                  <span className="font-semibold flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-red-500" />
                    {feeData.transportDetails.pickupPoint}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 font-medium">Drop Time:</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-500" />
                    {feeData.transportDetails.dropTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Fee Summary */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-xl p-6 border border-emerald-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Overall Fee Summary</h2>
                <p className="text-sm text-gray-600">Complete 4-semester breakdown</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <p className="text-sm text-gray-600 font-medium mb-2">Total Annual Fee</p>
                <div className="flex items-center justify-center gap-1">
                  <IndianRupee className="w-5 h-5 text-gray-700" />
                  <p className="text-2xl font-bold text-gray-900">{feeData.feeStructure.totalAnnualFee.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <p className="text-sm text-gray-600 font-medium mb-2">Amount Paid</p>
                <div className="flex items-center justify-center gap-1">
                  <IndianRupee className="w-5 h-5 text-green-600" />
                  <p className="text-2xl font-bold text-green-700">{feeData.feeStructure.totalPaid.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <p className="text-sm text-gray-600 font-medium mb-2">Pending Amount</p>
                <div className="flex items-center justify-center gap-1">
                  <IndianRupee className="w-5 h-5 text-orange-600" />
                  <p className="text-2xl font-bold text-orange-700">{feeData.feeStructure.totalPending.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <p className="text-sm text-gray-600 font-medium mb-2">Completion</p>
                <div className="flex items-center justify-center gap-1">
                  <Target className="w-5 h-5 text-purple-600" />
                  <p className="text-2xl font-bold text-purple-700">
                    {Math.round((feeData.feeStructure.totalPaid / feeData.feeStructure.totalAnnualFee) * 100)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Payment Progress</span>
                <span className="text-sm text-gray-600">
                  {Math.round((feeData.feeStructure.totalPaid / feeData.feeStructure.totalAnnualFee) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-4 rounded-full transition-all duration-500 relative"
                  style={{ width: `${(feeData.feeStructure.totalPaid / feeData.feeStructure.totalAnnualFee) * 100}%` }}
                >
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Semester-wise Fee Cards */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Semester-wise Fee Breakdown</h2>
                <p className="text-sm text-gray-600">Detailed payment schedule for each semester</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {feeData.semesterFees.map((semester) => (
                <div key={semester.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Semester Header */}
                  <div className={`bg-gradient-to-r ${semester.gradient} text-white p-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{semester.semester}</h3>
                        <p className="text-white/90 text-sm">{semester.academicPeriod}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-5 h-5" />
                          <span className="text-2xl font-bold">{semester.totalFee.toLocaleString()}</span>
                        </div>
                        <p className="text-white/90 text-sm">Total Fee</p>
                      </div>
                    </div>

                    {/* Payment Window */}
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">Payment Window</span>
                        </div>
                        <span className="font-semibold">{semester.paymentStartDate} to {semester.paymentEndDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Semester Content */}
                  <div className="p-6">
                    {/* Status and Progress */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(semester.status)}`}>
                        {semester.status}
                      </span>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{semester.completionRate}%</p>
                        <p className="text-xs text-gray-500">Complete</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`bg-gradient-to-r ${semester.gradient} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${semester.completionRate}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 font-medium">Monthly</p>
                        <p className="font-bold text-blue-600">{formatCurrency(semester.monthlyFee)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 font-medium">Paid</p>
                        <p className="font-bold text-green-600">{formatCurrency(semester.totalPaid)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 font-medium">Pending</p>
                        <p className="font-bold text-orange-600">{formatCurrency(semester.pending)}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {semester.pending > 0 && semester.status !== 'Future' && (
                        <button
                          onClick={() => handleSemesterPayment(semester.id)}
                          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                            semester.status === 'Active' 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          }`}
                        >
                          {semester.status === 'Active' ? 'Pay Now' : 'Not Available'}
                        </button>
                      )}
                      {semester.status === 'Completed' && (
                        <button className="flex-1 py-3 px-4 bg-green-100 text-green-700 rounded-lg font-semibold flex items-center justify-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Completed
                        </button>
                      )}
                      {semester.status === 'Future' && (
                        <button className="flex-1 py-3 px-4 bg-gray-100 text-gray-600 rounded-lg font-semibold" disabled>
                          Future Semester
                        </button>
                      )}
                    </div>

                    {/* Due Soon Alert */}
                    {semester.actualPayments.some(p => p.status === 'Due Soon') && (
                      <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          <p className="text-sm font-medium text-orange-800">
                            Payment due in {semester.actualPayments.find(p => p.status === 'Due Soon')?.daysLeft} days
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Last Payment Info */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Receipt className="w-6 h-6 text-yellow-600" />
              Latest Payment Details
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Amount</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(feeData.feeStructure.lastPayment.amount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Payment Method</p>
                <p className="font-semibold text-gray-800">{feeData.feeStructure.lastPayment.method}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Transaction ID</p>
                <p className="font-semibold font-mono text-sm text-blue-600">{feeData.feeStructure.lastPayment.transactionId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Payment Date</p>
                <p className="font-semibold text-gray-800">{feeData.feeStructure.lastPayment.date}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <button 
              onClick={handleDownloadReceipt}
              className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Download Statement</span>
              <span className="sm:hidden">Download</span>
            </button>
            <button 
              onClick={handlePaymentHistory}
              className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl"
            >
              <Eye className="w-5 h-5" />
              <span className="hidden sm:inline">Payment History</span>
              <span className="sm:hidden">History</span>
            </button>
            <button 
              onClick={handlePrint}
              className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
            >
              <Printer className="w-5 h-5" />
              <span className="hidden sm:inline">Print Statement</span>
              <span className="sm:hidden">Print</span>
            </button>
            <button onClick={handlePayment}
              className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl"
            >
              <CreditCard className="w-5 h-5" />
              <span className="hidden sm:inline">Quick Pay</span>
              <span className="sm:hidden">Pay</span>
            </button>
          </div>

          {/* Next Due Alert */}
          {feeData.feeStructure.totalPending > 0 && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-orange-800 text-lg">Payment Reminder</h4>
                  <p className="text-orange-700 mt-2">
                    You have a pending amount of <strong>{formatCurrency(feeData.feeStructure.totalPending)}</strong> for upcoming semesters. 
                    Next payment of <strong>₹1,500</strong> is due on <strong>{feeData.feeStructure.nextDueDate}</strong>.
                  </p>
                  <p className="text-sm text-orange-600 mt-1">
                    Make timely payments to avoid service disruption and late fees.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Semester Payment Modal */}
      {activeModal?.includes('payment-') && currentSemesterForPayment && (
        <SemesterPaymentModal semesterData={currentSemesterForPayment} />
      )}
    </div>
  );
};

export default StudentFeeDetail;
