import React, { useState } from 'react';

interface FeeItem {
  description: string;
  amount: number;
}

interface PaymentRecord {
  id: number;
  date: string;
  amount: number;
  receiptUrl: string;
}

interface FinanceProps {
  darkMode: boolean;
  feeStructure?: FeeItem[];
  outstandingDue?: number;
  dueDate?: string;
  paymentHistory?: PaymentRecord[];
}

export default function Finance({
  darkMode,
  feeStructure = [
    { description: 'Tuition Fee', amount: 40000 },
    { description: 'Library Fee', amount: 2500 },
    { description: 'Lab Charges', amount: 2000 },
    { description: 'Sports Fee', amount: 1500 },
  ],
  outstandingDue = 12000,
  dueDate = '2025-10-06',
  paymentHistory = [
    { id: 1, date: '2025-08-15', amount: 20000, receiptUrl: '/dummy-receipt1.pdf' },
    { id: 2, date: '2025-04-10', amount: 18000, receiptUrl: '/dummy-receipt2.pdf' }
  ],
}: FinanceProps) {
  const [activeTab, setActiveTab] = useState<'fee' | 'history'>('fee');
  const [showPayForm, setShowPayForm] = useState(false);
  const [payAmount, setPayAmount] = useState(outstandingDue);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const totalFee = feeStructure.reduce((sum, item) => sum + item.amount, 0);

  const handlePayClick = () => {
    setShowPayForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Payment of ₹${payAmount} using ${paymentMethod} submitted`);
    setShowPayForm(false);
  };

  const handleFormCancel = () => {
    setShowPayForm(false);
  };

  return (
    <section
      className={`${darkMode ? 'dark' : ''} min-h-screen dark:bg-gray-900 transition-colors duration-500 p-10 max-w-screen-xl mx-auto`}
    >
      <div className="mb-10">
        <nav className="flex space-x-8 border-b border-blue-200 dark:border-gray-700">
          <button
            className={`px-6 py-3 font-semibold focus:outline-none transition rounded-t ${
              activeTab === 'fee'
                ? 'border-b-4 border-blue-600 text-blue-700 dark:text-blue-200 bg-white dark:bg-gray-800'
                : 'text-blue-600 dark:text-gray-400 bg-transparent hover:bg-blue-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('fee')}
            aria-current={activeTab === 'fee' ? 'page' : undefined}
          >
            Fee Structure
          </button>
          <button
            className={`px-6 py-3 font-semibold focus:outline-none transition rounded-t ${
              activeTab === 'history'
                ? 'border-b-4 border-blue-600 text-blue-700 dark:text-blue-200 bg-white dark:bg-gray-800'
                : 'text-blue-600 dark:text-gray-400 bg-transparent hover:bg-blue-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('history')}
            aria-current={activeTab === 'history' ? 'page' : undefined}
          >
            Payment History
          </button>
        </nav>
      </div>

      {activeTab === 'fee' && (
        <div className="space-y-10 max-w-5xl mx-auto">
          {/* Fee Structure */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-blue-800 dark:text-blue-100">Current Semester Fee Structure</h2>
            <table className="w-full mb-6 rounded shadow-sm text-base">
              <thead>
                <tr className="bg-blue-100 dark:bg-gray-700 text-blue-900 dark:text-blue-100">
                  <th className="text-left px-6 py-3 font-semibold rounded-tl">Description</th>
                  <th className="text-right px-6 py-3 font-semibold rounded-tr">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50 dark:divide-gray-700">
                {feeStructure.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 dark:hover:bg-gray-700 transition">
                    <td className="px-6 py-3">{item.description}</td>
                    <td className="px-6 py-3 text-right font-semibold">{item.amount.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="font-bold bg-blue-50 dark:bg-gray-800">
                  <td className="px-6 py-3 text-right">Total</td>
                  <td className="px-6 py-3 text-right">{totalFee.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 mt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <p className="text-lg">
                  Outstanding Dues:{' '}
                  <span className={outstandingDue === 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    ₹{outstandingDue.toLocaleString()}
                  </span>
                </p>
                {outstandingDue > 0 && dueDate && (
                  <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                    Payment Deadline: <time dateTime={dueDate}>{new Date(dueDate).toLocaleDateString()}</time>
                  </p>
                )}
              </div>

              <button
                onClick={handlePayClick}
                disabled={outstandingDue === 0}
                className={`px-10 py-3 rounded-md font-semibold shadow text-white transition ${
                  outstandingDue === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                }`}
                aria-disabled={outstandingDue === 0}
              >
                Pay Semester Fees
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 max-w-5xl mx-auto overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800 dark:text-blue-100">Payment History</h2>
          {paymentHistory.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No payment records found.</p>
          ) : (
            <table className="w-full rounded shadow-sm text-base">
              <thead>
                <tr className="bg-blue-100 dark:bg-gray-700 text-blue-900 dark:text-blue-100">
                  <th className="text-left px-6 py-3 font-semibold">Date</th>
                  <th className="text-right px-6 py-3 font-semibold">Amount Paid (₹)</th>
                  <th className="text-left px-6 py-3 font-semibold">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50 dark:divide-gray-700">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="hover:bg-blue-50 dark:hover:bg-gray-700 transition">
                    <td className="px-6 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                    <td className="px-6 py-2 text-right font-semibold">{payment.amount.toLocaleString()}</td>
                    <td className="px-6 py-2">
                      <button
                        onClick={() => window.open(payment.receiptUrl, '_blank')}
                        className="text-blue-600 dark:text-blue-300 underline hover:text-blue-800 dark:hover:text-blue-100"
                        aria-label={`Download receipt for payment on ${new Date(payment.date).toLocaleDateString()}`}
                      >
                        Download Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Pay Fee Modal */}
      {showPayForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-2xl mx-4">
            <h3 className="text-2xl font-semibold mb-4 text-primary-800 dark:text-primary-100">Pay Semester Fees</h3>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block mb-2 font-semibold text-primary-900 dark:text-primary-200">
                  Amount to Pay (₹)
                </label>
                <input
                  id="amount"
                  type="number"
                  min={0}
                  max={outstandingDue}
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  className="w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-primary-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="paymentMethod" className="block mb-2 font-semibold text-primary-900 dark:text-primary-200">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-primary-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>Net Banking</option>
                  <option>UPI</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleFormCancel}
                  className="px-6 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Submit Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
