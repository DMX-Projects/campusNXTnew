import React from 'react';

// Static data to simulate fee details without an API
const feeData = {
  summary: {
    totalDues: '₹ 15,000',
    lastPaidAmount: '₹ 25,000',
    lastPaidDate: 'June 10, 2025',
    nextDueDate: 'September 30, 2025',
  },
  details: [
    {
      id: 1,
      head: 'Tuition Fee',
      amount: '₹ 10,000',
      dueDate: 'Sep 30, 2025',
      status: 'Pending',
    },
    {
      id: 2,
      head: 'Examination Fee',
      amount: '₹ 5,000',
      dueDate: 'Sep 30, 2025',
      status: 'Pending',
    },
    {
      id: 3,
      head: 'Library Fee',
      amount: '₹ 3,000',
      dueDate: 'Feb 28, 2025',
      status: 'Paid',
    },
    {
      id: 4,
      head: 'Lab Fee',
      amount: '₹ 2,000',
      dueDate: 'Feb 28, 2025',
      status: 'Paid',
    },
  ],
  paymentHistory: [
    {
      receiptNo: 'REC-101452',
      date: 'June 10, 2025',
      amount: '₹ 25,000',
      method: 'Online Banking',
    },
    {
      receiptNo: 'REC-101321',
      date: 'Dec 15, 2024',
      amount: '₹ 20,000',
      method: 'Credit Card',
    },
  ],
};

const FeeDetails = () => {
  const { summary, details, paymentHistory } = feeData;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Fee Details 💸</h1>

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500 font-medium">Total Dues</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{summary.totalDues}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500 font-medium">Last Paid Amount</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{summary.lastPaidAmount}</p>
          <p className="text-xs text-gray-400 mt-1">{summary.lastPaidDate}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500 font-medium">Next Due Date</p>
          <p className="text-3xl font-bold text-orange-500 mt-1">{summary.nextDueDate}</p>
        </div>
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
          <span className="font-semibold text-lg">Pay Now →</span>
        </div>
      </div>

      {/* Detailed Fee Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Detailed Fee Structure</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Head</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {details.map(fee => (
                <tr key={fee.id} className={fee.status === 'Pending' ? 'bg-red-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fee.head}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      fee.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {fee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {fee.status === 'Pending' ? (
                      <button className="text-blue-600 hover:text-blue-900">Pay Now</button>
                    ) : (
                      <button className="text-gray-400 cursor-not-allowed">View Receipt</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Payment History Section */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentHistory.map((payment, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.receiptNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeeDetails;