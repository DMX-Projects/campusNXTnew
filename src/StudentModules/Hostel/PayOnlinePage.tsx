import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, DollarSign, CheckCircle, AlertCircle, 
  Calendar, Clock, FileText, Home, Building2, User,
  Phone, Mail, Info, X, Eye, Lock, Shield, ArrowLeft
} from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'netbanking' | 'upi' | 'wallet';
  icon: string;
  description: string;
  processingFee: number;
  available: boolean;
}

interface PaymentDetails {
  studentId: string;
  studentName: string;
  roomNumber: string;
  amount: number;
  description: string;
  dueDate: string;
  lateFee: number;
  totalAmount: number;
}

const PayOnlinePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'method' | 'details' | 'confirmation'>('method');
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    bankAccount: '',
    walletType: '',
    otp: ''
  });

  // Sample data - would come from API in real application
  const currentStudent = {
    id: 'CS2023001',
    name: 'Arjun Kumar',
    rollNumber: 'CS2023001',
    roomNumber: 'A-201',
    phoneNumber: '+91-9876543210',
    email: 'arjun.kumar@college.edu.in'
  };

  const paymentDetails: PaymentDetails = {
    studentId: 'CS2023001',
    studentName: 'Arjun Kumar',
    roomNumber: 'A-201',
    amount: 9200,
    description: 'February 2025 - Hostel Fee (Rent + Mess + Electricity)',
    dueDate: '2025-02-01',
    lateFee: 0,
    totalAmount: 9200
  };

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'credit_card',
      name: 'Credit Card',
      type: 'card',
      icon: '💳',
      description: 'Visa, Mastercard, American Express',
      processingFee: 0,
      available: true
    },
    {
      id: 'debit_card',
      name: 'Debit Card',
      type: 'card',
      icon: '💳',
      description: 'All major debit cards',
      processingFee: 0,
      available: true
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      type: 'netbanking',
      icon: '🏦',
      description: 'Direct bank transfer',
      processingFee: 0,
      available: true
    },
    {
      id: 'upi',
      name: 'UPI',
      type: 'upi',
      icon: '📱',
      description: 'PhonePe, Google Pay, Paytm',
      processingFee: 0,
      available: true
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      type: 'wallet',
      icon: '💰',
      description: 'Paytm, PhonePe Wallet',
      processingFee: 0,
      available: true
    }
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setShowPaymentForm(true);
    setPaymentStep('details');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('confirmation');
  };

  const processPayment = () => {
    alert('Payment processed successfully! Redirecting to receipt...');
    setShowPaymentForm(false);
    setPaymentStep('method');
    setSelectedMethod('');
  };

  const getSelectedMethod = () => {
    return paymentMethods.find(method => method.id === selectedMethod);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Online Payment</h1>
                <p className="text-gray-600">Secure and convenient payment for your hostel fees</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/hostel/student-dashboard')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Student Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Student Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{currentStudent.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Room</p>
                <p className="font-medium">{currentStudent.roomNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{currentStudent.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{currentStudent.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Summary</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{paymentDetails.description}</h3>
                  <p className="text-sm text-gray-600">Room {paymentDetails.roomNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">₹{paymentDetails.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Base amount</p>
                </div>
              </div>

              {paymentDetails.lateFee > 0 && (
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-sm text-red-600">Late Fee</p>
                    <p className="text-xs text-gray-500">Payment delay charges</p>
                  </div>
                  <p className="font-medium text-red-600">₹{paymentDetails.lateFee.toLocaleString()}</p>
                </div>
              )}

              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <p className="font-bold text-gray-800">Total Amount</p>
                  <p className="text-sm text-gray-600">Due: {new Date(paymentDetails.dueDate).toLocaleDateString('en-IN')}</p>
                </div>
                <p className="text-3xl font-bold text-green-600">₹{paymentDetails.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Select Payment Method</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handlePaymentMethodSelect(method.id)}
                disabled={!method.available}
                className={`p-6 border-2 rounded-lg text-left transition-all duration-200 ${
                  method.available
                    ? 'border-gray-200 hover:border-green-500 hover:bg-green-50'
                    : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{method.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                    {method.processingFee > 0 && (
                      <p className="text-xs text-orange-600">Processing fee: ₹{method.processingFee}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">Secure</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Security Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Security & Privacy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Lock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">SSL Encrypted</h3>
                <p className="text-sm text-gray-600">All transactions are secured with 256-bit SSL encryption</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">PCI Compliant</h3>
                <p className="text-sm text-gray-600">We follow PCI DSS standards for card data protection</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Instant Confirmation</h3>
                <p className="text-sm text-gray-600">Receive immediate payment confirmation and receipt</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {paymentStep === 'method' && 'Select Payment Method'}
                  {paymentStep === 'details' && 'Payment Details'}
                  {paymentStep === 'confirmation' && 'Payment Confirmation'}
                </h3>
                <button
                  onClick={() => setShowPaymentForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Payment Details Step */}
              {paymentStep === 'details' && (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Payment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-medium">₹{paymentDetails.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Method:</span>
                        <span className="font-medium">{getSelectedMethod()?.name}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total:</span>
                        <span>₹{paymentDetails.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {selectedMethod === 'credit_card' || selectedMethod === 'debit_card' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={paymentForm.cardNumber}
                          onChange={(e) => setPaymentForm({...paymentForm, cardNumber: formatCardNumber(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={paymentForm.expiryDate}
                            onChange={(e) => setPaymentForm({...paymentForm, expiryDate: formatExpiryDate(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={paymentForm.cvv}
                            onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value.replace(/\D/g, '')})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="123"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={paymentForm.cardholderName}
                          onChange={(e) => setPaymentForm({...paymentForm, cardholderName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                  ) : selectedMethod === 'upi' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UPI ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={paymentForm.upiId}
                        onChange={(e) => setPaymentForm({...paymentForm, upiId: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="yourname@paytm"
                        required
                      />
                    </div>
                  ) : selectedMethod === 'netbanking' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Bank <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={paymentForm.bankAccount}
                        onChange={(e) => setPaymentForm({...paymentForm, bankAccount: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        required
                      >
                        <option value="">Select your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  ) : selectedMethod === 'wallet' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Wallet Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={paymentForm.walletType}
                        onChange={(e) => setPaymentForm({...paymentForm, walletType: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        required
                      >
                        <option value="">Select wallet</option>
                        <option value="paytm">Paytm Wallet</option>
                        <option value="phonepe">PhonePe Wallet</option>
                        <option value="amazonpay">Amazon Pay</option>
                      </select>
                    </div>
                  ) : null}

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-900 mb-1">Payment Security</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Your payment information is encrypted and secure</li>
                          <li>• We do not store your card details</li>
                          <li>• Payment will be processed immediately</li>
                          <li>• Receipt will be sent to your email</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowPaymentForm(false)}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </form>
              )}

              {/* Confirmation Step */}
              {paymentStep === 'confirmation' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Confirm Payment</h3>
                    <p className="text-gray-600">Please review your payment details before proceeding</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-4">Payment Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-medium">₹{paymentDetails.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Method:</span>
                        <span className="font-medium">{getSelectedMethod()?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Student:</span>
                        <span className="font-medium">{currentStudent.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Room:</span>
                        <span className="font-medium">{currentStudent.roomNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">Important</h4>
                        <p className="text-sm text-blue-800">
                          By clicking "Pay Now", you agree to process this payment. The amount will be deducted from your selected payment method immediately.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setPaymentStep('details')}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      Back
                    </button>
                    <button
                      onClick={processPayment}
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayOnlinePage;