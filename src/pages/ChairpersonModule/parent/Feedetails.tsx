import React, { useState } from 'react';

// Static data to simulate fee details without an API
const initialFeeData = {
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
  const [feeData, setFeeData] = useState(initialFeeData);
  const [processingPayment, setProcessingPayment] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [paymentFormData, setPaymentFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'card'
  });

  // Function to open payment form for individual fee
  const handlePayNow = (feeId) => {
    const fee = feeData.details.find(f => f.id === feeId);
    setSelectedFee(fee);
    setShowPaymentForm(true);
  };

  // Function to handle form submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setProcessingPayment(selectedFee ? selectedFee.id : 'all');
    
    // Simulate payment processing
    setTimeout(() => {
      if (selectedFee) {
        // Process individual payment
        const updatedDetails = feeData.details.map(fee => {
          if (fee.id === selectedFee.id) {
            return { ...fee, status: 'Paid' };
          }
          return fee;
        });

        const newPayment = {
          receiptNo: `REC-${Math.floor(Math.random() * 100000) + 100000}`,
          date: new Date().toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
          }),
          amount: selectedFee.amount,
          method: paymentFormData.paymentMethod === 'card' ? 'Credit Card' : 
                  paymentFormData.paymentMethod === 'netbanking' ? 'Net Banking' : 'UPI',
        };

        const newTotalDues = updatedDetails
          .filter(fee => fee.status === 'Pending')
          .reduce((total, fee) => {
            const amount = parseInt(fee.amount.replace('₹ ', '').replace(',', ''));
            return total + amount;
          }, 0);

        setFeeData({
          ...feeData,
          summary: {
            ...feeData.summary,
            totalDues: `₹ ${newTotalDues.toLocaleString()}`,
            lastPaidAmount: selectedFee.amount,
            lastPaidDate: newPayment.date,
          },
          details: updatedDetails,
          paymentHistory: [newPayment, ...feeData.paymentHistory],
        });

        alert(`Payment successful for ${selectedFee.head}! Receipt: ${newPayment.receiptNo}`);
      } else {
        // Process bulk payment
        const pendingFees = feeData.details.filter(fee => fee.status === 'Pending');
        const updatedDetails = feeData.details.map(fee => ({
          ...fee,
          status: 'Paid'
        }));

        const totalAmount = pendingFees.reduce((total, fee) => {
          const amount = parseInt(fee.amount.replace('₹ ', '').replace(',', ''));
          return total + amount;
        }, 0);

        const newPayment = {
          receiptNo: `REC-${Math.floor(Math.random() * 100000) + 100000}`,
          date: new Date().toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
          }),
          amount: `₹ ${totalAmount.toLocaleString()}`,
          method: paymentFormData.paymentMethod === 'card' ? 'Credit Card' : 
                  paymentFormData.paymentMethod === 'netbanking' ? 'Net Banking' : 'UPI',
        };

        setFeeData({
          ...feeData,
          summary: {
            ...feeData.summary,
            totalDues: '₹ 0',
            lastPaidAmount: newPayment.amount,
            lastPaidDate: newPayment.date,
          },
          details: updatedDetails,
          paymentHistory: [newPayment, ...feeData.paymentHistory],
        });

        alert(`All payments successful! Total paid: ${newPayment.amount}. Receipt: ${newPayment.receiptNo}`);
      }

      // Reset form and close modal
      setProcessingPayment(null);
      setShowPaymentForm(false);
      setSelectedFee(null);
      setPaymentFormData({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        paymentMethod: 'card'
      });
    }, 2000);
  };

  // Function to handle bulk payment (Pay Now button in summary)
  const handlePayAll = () => {
    const pendingFees = feeData.details.filter(fee => fee.status === 'Pending');
    if (pendingFees.length === 0) {
      alert('No pending payments!');
      return;
    }
    setSelectedFee(null); // null indicates bulk payment
    setShowPaymentForm(true);
  };

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
        <button 
          onClick={handlePayAll}
          disabled={processingPayment !== null || summary.totalDues === '₹ 0'}
          className={`p-6 rounded-lg shadow-md flex items-center justify-center transition-colors ${
            processingPayment !== null 
              ? 'bg-gray-400 cursor-not-allowed' 
              : summary.totalDues === '₹ 0'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
          } text-white`}
        >
          <span className="font-semibold text-lg">
            {summary.totalDues === '₹ 0' ? 'All Paid ✓' : 'Pay Now →'}
          </span>
        </button>
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
                      <button 
                        onClick={() => handlePayNow(fee.id)}
                        disabled={processingPayment !== null}
                        className={`${
                          processingPayment !== null 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-blue-600 hover:text-blue-900'
                        } font-medium`}
                      >
                        Pay Now
                      </button>
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

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Payment Details
                </h3>
                <button 
                  onClick={() => {
                    setShowPaymentForm(false);
                    setSelectedFee(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Payment Summary */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-blue-800 mb-2">Payment Summary</h4>
                {selectedFee ? (
                  <div>
                    <p className="text-sm text-blue-600">Fee: {selectedFee.head}</p>
                    <p className="text-lg font-bold text-blue-800">{selectedFee.amount}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-blue-600">Total Outstanding Amount</p>
                    <p className="text-lg font-bold text-blue-800">{summary.totalDues}</p>
                  </div>
                )}
              </div>

              {/* Payment Form */}
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentFormData({...paymentFormData, paymentMethod: 'card'})}
                      className={`p-3 border rounded-lg text-sm font-medium ${
                        paymentFormData.paymentMethod === 'card'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      💳 Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentFormData({...paymentFormData, paymentMethod: 'netbanking'})}
                      className={`p-3 border rounded-lg text-sm font-medium ${
                        paymentFormData.paymentMethod === 'netbanking'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      🏦 Net Banking
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentFormData({...paymentFormData, paymentMethod: 'upi'})}
                      className={`p-3 border rounded-lg text-sm font-medium ${
                        paymentFormData.paymentMethod === 'upi'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      📱 UPI
                    </button>
                  </div>
                </div>

                {/* Card Payment Form */}
                {paymentFormData.paymentMethod === 'card' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentFormData.cardNumber}
                        onChange={(e) => setPaymentFormData({...paymentFormData, cardNumber: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        maxLength="19"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={paymentFormData.cardName}
                        onChange={(e) => setPaymentFormData({...paymentFormData, cardName: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={paymentFormData.expiryDate}
                          onChange={(e) => setPaymentFormData({...paymentFormData, expiryDate: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          maxLength="5"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          value={paymentFormData.cvv}
                          onChange={(e) => setPaymentFormData({...paymentFormData, cvv: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          maxLength="4"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Net Banking Form */}
                {paymentFormData.paymentMethod === 'netbanking' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Bank
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                      <option value="">Choose your bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="kotak">Kotak Mahindra Bank</option>
                      <option value="pnb">Punjab National Bank</option>
                    </select>
                  </div>
                )}

                {/* UPI Form */}
                {paymentFormData.paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      placeholder="yourname@paytm"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPaymentForm(false);
                      setSelectedFee(null);
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processingPayment !== null}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium ${
                      processingPayment !== null
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {processingPayment !== null ? 'Processing...' : 
                     `Pay ${selectedFee ? selectedFee.amount : summary.totalDues}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeDetails;