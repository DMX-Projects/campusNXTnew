import React, { useState } from 'react';
import { Bus, CreditCard, Calendar, MapPin, AlertCircle, CheckCircle, Clock, Receipt, X, Printer, Download, Eye, Smartphone, Banknote, Building, QrCode } from 'lucide-react';

const StudentFeeDetail = () => {
  const [activeModal, setActiveModal] = useState(null);
  
  // Student fee data based on the provided information
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
    feeStructure: {
      monthlyFee: 1500,
      annualFee: 18000,
      paid: 12000,
      pending: 6000,
      lastPayment: {
        amount: 3000,
        method: "UPI",
        transactionId: "TXN45678",
        date: "2025-08-15"
      },
      dueDate: "10-Sep-2025",
      status: "Partially Paid"
    },
    paymentHistory: [
      { date: "2025-08-15", amount: 3000, method: "UPI", txnId: "TXN45678", status: "Success" },
      { date: "2025-07-10", amount: 4500, method: "Net Banking", txnId: "TXN34567", status: "Success" },
      { date: "2025-06-05", amount: 4500, method: "UPI", txnId: "TXN23456", status: "Success" },
      { date: "2025-05-12", amount: 1500, method: "Card", txnId: "TXN12345", status: "Success" },
      { date: "2025-04-08", amount: 1500, method: "UPI", txnId: "TXN11234", status: "Success" },
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Partially Paid": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Paid": return "bg-green-100 text-green-700 border-green-200";
      case "Overdue": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

  const handlePayment = (method) => {
    alert(`Payment initiated via ${method}. Redirecting to payment gateway...`);
    setActiveModal(null);
  };

  const handleDownloadReceipt = () => {
    // Create and download receipt
    const receiptContent = `
TRANSPORT FEE RECEIPT
Student: ${feeData.name}
Student ID: ${feeData.studentId}
Course: ${feeData.course}
Route: ${feeData.transportDetails.routeNo}
Bus: ${feeData.transportDetails.busNo}
Pickup: ${feeData.transportDetails.pickupPoint}

PAYMENT DETAILS:
Amount: ${formatCurrency(feeData.feeStructure.lastPayment.amount)}
Date: ${feeData.feeStructure.lastPayment.date}
Method: ${feeData.feeStructure.lastPayment.method}
Transaction ID: ${feeData.feeStructure.lastPayment.transactionId}

Total Paid: ${formatCurrency(feeData.feeStructure.paid)}
Pending: ${formatCurrency(feeData.feeStructure.pending)}
Next Due: ${feeData.feeStructure.dueDate}
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt_${feeData.studentId}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Select Payment Method</h3>
            <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600 mb-1">Amount to Pay</p>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(feeData.feeStructure.pending)}</p>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => handlePayment('UPI')}
              className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3"
            >
              <QrCode className="w-8 h-8 text-purple-600" />
              <div className="text-left">
                <p className="font-medium">UPI Payment</p>
                <p className="text-sm text-gray-600">Pay using UPI apps</p>
              </div>
            </button>

            <button 
              onClick={() => handlePayment('Net Banking')}
              className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3"
            >
              <Building className="w-8 h-8 text-blue-600" />
              <div className="text-left">
                <p className="font-medium">Net Banking</p>
                <p className="text-sm text-gray-600">Pay using your bank account</p>
              </div>
            </button>

            <button 
              onClick={() => handlePayment('Credit/Debit Card')}
              className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3"
            >
              <CreditCard className="w-8 h-8 text-green-600" />
              <div className="text-left">
                <p className="font-medium">Credit/Debit Card</p>
                <p className="text-sm text-gray-600">Pay using your card</p>
              </div>
            </button>

            <button 
              onClick={() => handlePayment('Mobile Wallet')}
              className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3"
            >
              <Smartphone className="w-8 h-8 text-orange-600" />
              <div className="text-left">
                <p className="font-medium">Mobile Wallet</p>
                <p className="text-sm text-gray-600">Paytm, PhonePe, Google Pay</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PaymentHistoryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Complete Payment History</h3>
            <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Total Payments</p>
                <p className="text-xl font-bold text-blue-600">{feeData.paymentHistory.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Paid</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(feeData.feeStructure.paid)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold text-orange-600">{formatCurrency(feeData.feeStructure.pending)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Completion</p>
                <p className="text-xl font-bold text-purple-600">
                  {Math.round((feeData.feeStructure.paid / feeData.feeStructure.annualFee) * 100)}%
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Transaction ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {feeData.paymentHistory.map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">{index + 1}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">{payment.date}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">{payment.method}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-mono hidden sm:table-cell">{payment.txnId}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-1 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => {
                const csv = [
                  ['Date', 'Amount', 'Method', 'Transaction ID', 'Status'],
                  ...feeData.paymentHistory.map(p => [p.date, p.amount, p.method, p.txnId, p.status])
                ].map(row => row.join(',')).join('\n');
                
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `payment_history_${feeData.studentId}.csv`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <Bus className="w-6 sm:w-8 h-6 sm:h-8" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Transport Fee Details</h1>
              <p className="text-blue-100 text-sm sm:text-base">Student Transportation Payment Information</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Student & Transport Info */}
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Student Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3">Student Information</h2>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Student ID</p>
                  <p className="font-medium">{feeData.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{feeData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Course</p>
                  <p className="font-medium text-sm sm:text-base">{feeData.course}</p>
                </div>
              </div>
            </div>

            {/* Transport Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Bus className="w-5 h-5" />
                Transport Information
              </h2>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Route No</p>
                  <p className="font-medium text-blue-700">{feeData.transportDetails.routeNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bus No</p>
                  <p className="font-medium text-blue-700">{feeData.transportDetails.busNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pickup Point</p>
                  <p className="font-medium flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {feeData.transportDetails.pickupPoint}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Drop Time</p>
                  <p className="font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {feeData.transportDetails.dropTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Structure */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              Fee Structure & Payment Status
            </h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Monthly Fee</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">{formatCurrency(feeData.feeStructure.monthlyFee)}</p>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Annual Fee</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-700">{formatCurrency(feeData.feeStructure.annualFee)}</p>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Amount Paid</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600">{formatCurrency(feeData.feeStructure.paid)}</p>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Pending Amount</p>
                <p className="text-lg sm:text-2xl font-bold text-orange-600">{formatCurrency(feeData.feeStructure.pending)}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Payment Progress</span>
                <span className="text-sm text-gray-600">
                  {Math.round((feeData.feeStructure.paid / feeData.feeStructure.annualFee) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(feeData.feeStructure.paid / feeData.feeStructure.annualFee) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Status and Due Date */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(feeData.feeStructure.status)}`}>
                  {feeData.feeStructure.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Next Due Date</p>
                <p className="font-medium flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {feeData.feeStructure.dueDate}
                </p>
              </div>
            </div>
          </div>

          {/* Last Payment Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Last Payment Details
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Amount</p>
                <p className="font-semibold text-green-600">{formatCurrency(feeData.feeStructure.lastPayment.amount)}</p>
              </div>
              <div>
                <p className="text-gray-600">Payment Method</p>
                <p className="font-semibold">{feeData.feeStructure.lastPayment.method}</p>
              </div>
              <div>
                <p className="text-gray-600">Transaction ID</p>
                <p className="font-semibold font-mono text-xs sm:text-sm">{feeData.feeStructure.lastPayment.transactionId}</p>
              </div>
              <div>
                <p className="text-gray-600">Payment Date</p>
                <p className="font-semibold">{feeData.feeStructure.lastPayment.date}</p>
              </div>
            </div>
          </div>

          {/* Payment History Table - Mobile Responsive */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 sm:px-6 py-3 border-b">
              <h3 className="font-semibold">Recent Payment History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Method</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Transaction ID</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {feeData.paymentHistory.slice(0, 3).map((payment, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">{payment.date}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm hidden sm:table-cell">{payment.method}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-mono hidden md:table-cell">{payment.txnId}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="flex items-center gap-1 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="hidden sm:inline">{payment.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
            <button 
              onClick={() => setActiveModal('payment')}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Pay Now</span>
              <span className="sm:hidden">Pay</span>
            </button>
            <button 
              onClick={handleDownloadReceipt}
              className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download Receipt</span>
              <span className="sm:hidden">Receipt</span>
            </button>
            <button 
              onClick={() => setActiveModal('history')}
              className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Payment History</span>
              <span className="sm:hidden">History</span>
            </button>
            <button 
              onClick={handlePrint}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Statement</span>
              <span className="sm:hidden">Print</span>
            </button>
          </div>

          {/* Alert for Pending Payment */}
          {feeData.feeStructure.pending > 0 && (
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-orange-800">Payment Reminder</h4>
                  <p className="text-orange-700 text-sm mt-1">
                    You have a pending amount of {formatCurrency(feeData.feeStructure.pending)} due on {feeData.feeStructure.dueDate}. 
                    Please make the payment to avoid service disruption.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'payment' && <PaymentModal />}
      {activeModal === 'history' && <PaymentHistoryModal />}
    </div>
  );
};

export default StudentFeeDetail;