import React, { useState } from 'react';
import { 
  CreditCard, 
  Clock, 
  DollarSign, 
  Download, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  Receipt,
  Lock,
  ArrowLeft,
  Info,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const FeePayment = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Sample fee data - in real app this would come from API
  const feeItems = [
    {
      id: 1,
      name: "Admission Fee",
      amount: 50000,
      deadline: "March 15, 2024",
      status: "pending",
      description: "One-time admission processing fee",
      mandatory: true
    },
    {
      id: 2,
      name: "First Semester Tuition Fee",
      amount: 85000,
      deadline: "March 20, 2024",
      status: "pending",
      description: "Tuition fee for Fall 2024 semester",
      mandatory: true
    },
    {
      id: 3,
      name: "Library Fee",
      amount: 15000,
      deadline: "March 25, 2024",
      status: "pending",
      description: "Annual library access and services",
      mandatory: true
    },
    {
      id: 4,
      name: "Student Activity Fee",
      amount: 20000,
      deadline: "March 25, 2024",
      status: "pending",
      description: "Sports, clubs, and campus activities",
      mandatory: false
    },
    {
      id: 5,
      name: "Health Insurance",
      amount: 120000,
      deadline: "April 1, 2024",
      status: "pending",
      description: "Comprehensive health coverage",
      mandatory: false
    }
  ];

  // Sample payment history
  const paymentHistory = [
    {
      id: "TXN001",
      date: "February 10, 2024",
      description: "Application Processing Fee",
      amount: 7500,
      status: "completed",
      receiptUrl: "#"
    },
    {
      id: "TXN002",
      date: "February 5, 2024",
      description: "Document Verification Fee",
      amount: 2500,
      status: "completed",
      receiptUrl: "#"
    }
  ];

  const toggleItemSelection = (itemId) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId);
    } else {
      newSelection.add(itemId);
    }
    setSelectedItems(newSelection);
  };

  const selectAllMandatory = () => {
    const mandatoryIds = feeItems.filter(item => item.mandatory && item.status === 'pending').map(item => item.id);
    setSelectedItems(new Set(mandatoryIds));
  };

  const calculateTotal = () => {
    return feeItems
      .filter(item => selectedItems.has(item.id))
      .reduce((total, item) => total + item.amount, 0);
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handlePayment = () => {
    if (selectedItems.size === 0) {
      alert('Please select at least one fee item to pay.');
      return;
    }
    // In real app, this would integrate with payment gateway
    alert(`Processing payment of ₹${calculateTotal().toLocaleString()} via ${paymentMethod}`);
  };

  const FeeItem = ({ item }) => {
    const isSelected = selectedItems.has(item.id);
    const daysLeft = getDaysUntilDeadline(item.deadline);
    const isUrgent = daysLeft <= 7;
    const isPastDue = daysLeft < 0;

    return (
      <div 
        className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
          isSelected 
            ? 'border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
        }`}
        onClick={() => toggleItemSelection(item.id)}
      >
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleItemSelection(item.id)}
              className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-medium text-slate-900 dark:text-white flex items-center">
                {item.name}
                {item.mandatory && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full">
                    Mandatory
                  </span>
                )}
              </h4>
              <span className="text-lg font-semibold text-slate-900 dark:text-white">
                ₹{item.amount.toLocaleString()}
              </span>
            </div>
            
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              {item.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-3 w-3 text-slate-500" />
                <span className={`text-xs ${
                  isPastDue 
                    ? 'text-red-600 dark:text-red-400 font-medium' 
                    : isUrgent 
                    ? 'text-orange-600 dark:text-orange-400 font-medium'
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  Due: {item.deadline}
                </span>
              </div>
              
              {isPastDue ? (
                <span className="flex items-center text-xs text-red-600 dark:text-red-400">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Overdue
                </span>
              ) : isUrgent ? (
                <span className="flex items-center text-xs text-orange-600 dark:text-orange-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {daysLeft} days left
                </span>
              ) : (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {daysLeft} days left
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PaymentHistoryItem = ({ payment }) => (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center space-x-3">
        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-slate-900 dark:text-white">
            {payment.description}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {payment.date} • Transaction ID: {payment.id}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-sm font-medium text-slate-900 dark:text-white">
          ₹{payment.amount}
        </span>
        <button 
          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          onClick={() => alert('Downloading receipt...')}
        >
          <Download className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg--to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        
      <div className="container mx-auto px-4 py-6">
        {!showPaymentHistory ? (
          <>
            {/* Fee Summary */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Outstanding Fees</h2>
                <button
                  onClick={selectAllMandatory}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Select All Mandatory
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <div>
                      <p className="text-sm text-red-600 dark:text-red-400">Mandatory Fees</p>
                      <p className="text-lg font-semibold text-red-700 dark:text-red-300">
                        ₹{feeItems.filter(item => item.mandatory).reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Optional Fees</p>
                      <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                        ₹{feeItems.filter(item => !item.mandatory).reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm text-green-600 dark:text-green-400">Selected Total</p>
                      <p className="text-lg font-semibold text-green-700 dark:text-green-300">
                        ₹{calculateTotal().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
                      Payment Deadline Notice
                    </h3>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Mandatory fees must be paid by their respective deadlines to secure your enrollment. 
                      Late payments may result in additional charges or enrollment cancellation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fee Items */}
            <div className="space-y-3 mb-6">
              {feeItems.map((item) => (
                <FeeItem key={item.id} item={item} />
              ))}
            </div>

            {/* Payment Section */}
            {selectedItems.size > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Payment Details</h3>

                {/* Payment Method Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
                      { id: 'bank', name: 'Bank Transfer', icon: DollarSign },
                      { id: 'wallet', name: 'Digital Wallet', icon: DollarSign }
                    ].map((method) => (
                      <div key={method.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          id={`payment-${method.id}`}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <label
                          htmlFor={`payment-${method.id}`}
                          className={`block p-3 rounded-lg border-2 transition-all cursor-pointer ${
                            paymentMethod === method.id
                              ? 'border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setPaymentMethod(method.id);
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <method.icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                            <span className="text-sm font-medium text-slate-900 dark:text-white">
                              {method.name}
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Selected Items:</span>
                    <span className="text-sm text-slate-900 dark:text-white">{selectedItems.size}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Subtotal:</span>
                    <span className="text-sm text-slate-900 dark:text-white">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Processing Fee:</span>
                    <span className="text-sm text-slate-900 dark:text-white">₹250</span>
                  </div>
                  <hr className="border-slate-200 dark:border-slate-600 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-slate-900 dark:text-white">Total:</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      ₹{(calculateTotal() + 250).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Lock className="h-4 w-4" />
                  <span>Pay Securely - ₹{(calculateTotal() + 250).toLocaleString()}</span>
                </button>

                <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2">
                  🔒 Your payment information is encrypted and secure
                </p>
              </div>
            )}
          </>
        ) : (
          /* Payment History */
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Payment History</h2>
              <button
                onClick={() => setShowPaymentHistory(false)}
                className="flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700"
              >
                <ChevronUp className="h-4 w-4" />
                <span>Back to Payments</span>
              </button>
            </div>

            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <PaymentHistoryItem key={payment.id} payment={payment} />
              ))}
            </div>

            {paymentHistory.length === 0 && (
              <div className="text-center py-8">
                <Receipt className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600 dark:text-slate-400">No payment history found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeePayment;