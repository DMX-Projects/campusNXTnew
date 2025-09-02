import React, { useState } from 'react';
import { CreditCard, User, Mail, Phone, MapPin, Calendar, Lock } from 'lucide-react';

// Static data updated to include results for multiple semesters
const studentResults = {
  name: 'Rahul Sharma',
  studentId: 'B-TECH/CS/2023/001',
  summary: {
    gpa: 8.5,
    cgpa: 8.2,
    status: 'Good Standing',
  },
  semesters: [
    {
      name: 'Semester 1',
      gpa: 7.8,
      details: [
        { id: 1, course: 'M-101', name: 'Calculus I', marks: 'B+', result: 'Pass' },
        { id: 2, course: 'PH-102', name: 'Physics for Engineers', marks: 'A-', result: 'Pass' },
        { id: 3, course: 'CS-103', name: 'Introduction to Programming', marks: 'A', result: 'Pass' },
      ],
    },
    {
      name: 'Semester 2',
      gpa: 8.0,
      details: [
        { id: 1, course: 'M-201', name: 'Linear Algebra', marks: 'A-', result: 'Pass' },
        { id: 2, course: 'EE-202', name: 'Basic Electrical Engineering', marks: 'B', result: 'Pass' },
        { id: 3, course: 'CS-203', name: 'Object-Oriented Programming', marks: 'A', result: 'Pass' },
      ],
    },
    {
      name: 'Semester 3',
      gpa: 8.5,
      details: [
        { id: 1, course: 'CS-301', name: 'Data Structures', marks: 'A', result: 'Pass' },
        { id: 2, course: 'CS-302', name: 'Algorithms', marks: 'B+', result: 'Pass' },
        { id: 3, course: 'CS-303', name: 'Database Management Systems', marks: 'A-', result: 'Pass' },
      ],
    },
    {
      name: 'Semester 4',
      gpa: 8.2,
      details: [
        { id: 1, course: 'CS-401', name: 'Operating Systems', marks: 'A', result: 'Pass' },
        { id: 2, course: 'CS-402', name: 'Software Engineering', marks: 'B+', result: 'Pass' },
        { id: 3, course: 'HS-401', name: 'Professional Ethics', marks: 'A+', result: 'Pass' },
      ],
    },
  ],
};

const YourChildResults = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    amount: '25000'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate payment processing
    alert(`Payment of ₹${formData.amount} initiated for ${studentResults.name}. This is a demo - no actual payment processed.`);
    setShowPaymentForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-800 mb-2">
            Academic Results Dashboard 📈
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-4">
            {studentResults.name} ({studentResults.studentId})
          </p>
          <button
            onClick={() => setShowPaymentForm(!showPaymentForm)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <CreditCard className="inline-block w-5 h-5 mr-2" />
            {showPaymentForm ? 'Hide Payment Form' : 'Pay Fees'}
          </button>
        </div>

        {/* Payment Form Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Payment Form</h2>
                  <button
                    onClick={() => setShowPaymentForm(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
                    
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Payment Information</h3>
                    
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400 font-semibold">₹</span>
                      <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number (1234 5678 9012 3456)"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength="19"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength="5"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength="4"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="nameOnCard"
                        placeholder="Name on Card"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Payment Button */}
                  <button
                    type="button"
                    onClick={handlePayment}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-lg font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Pay Now ₹{formData.amount}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary Section - Enhanced Responsive */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Latest Semester GPA</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600">
              {studentResults.semesters[studentResults.semesters.length - 1].gpa}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Cumulative CGPA</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">
              {studentResults.summary.cgpa}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Academic Status</p>
            <p className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
              studentResults.summary.status === 'Good Standing' ? 'text-green-600' : 'text-red-600'
            }`}>
              {studentResults.summary.status}
            </p>
          </div>
        </div>

        <hr className="my-6 sm:my-8 border-gray-300" />

        {/* Detailed Results Tables for each semester - Enhanced Responsive */}
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          {studentResults.semesters.map((semester, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-700">{semester.name} Results</h2>
                  <p className="text-blue-600 font-medium text-sm sm:text-base">GPA: {semester.gpa}</p>
                </div>
              </div>
              
              {/* Mobile Card View */}
              <div className="block sm:hidden">
                {semester.details.map((subject, subjectIndex) => (
                  <div key={subjectIndex} className={`p-4 border-b border-gray-100 last:border-b-0 ${
                    subject.result === 'Pass' ? 'bg-white' : 'bg-red-50'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{subject.course}</p>
                        <p className="text-gray-600 text-xs">{subject.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-lg">{subject.marks}</p>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          subject.result === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {subject.result}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course Code
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject Name
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {semester.details.map((subject, subjectIndex) => (
                      <tr key={subjectIndex} className={`transition-colors duration-200 ${
                        subject.result === 'Pass' ? 'hover:bg-gray-50' : 'bg-red-50 hover:bg-red-100'
                      }`}>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {subject.course}
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-sm text-gray-500">
                          <div className="truncate max-w-xs lg:max-w-none">{subject.name}</div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-gray-900">
                          {subject.marks}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-center">
                          <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${
                            subject.result === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {subject.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-6 sm:my-8 border-gray-300" />

        {/* Grade Legend Section - Enhanced Responsive */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Grade Legend</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <div className="bg-gray-50 p-2 rounded text-center">
                <span className="font-bold block">A+</span>
                <span className="text-xs">95-100</span>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <span className="font-bold block">A</span>
                <span className="text-xs">90-94</span>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <span className="font-bold block">A-</span>
                <span className="text-xs">85-89</span>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <span className="font-bold block">B+</span>
                <span className="text-xs">80-84</span>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <span className="font-bold block">B</span>
                <span className="text-xs">75-79</span>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <span className="font-bold block">B-</span>
                <span className="text-xs">70-74</span>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <span className="font-bold block">C+</span>
                <span className="text-xs">65-69</span>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <span className="font-bold block">C</span>
                <span className="text-xs">60-64</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Insights - New Section */}
        <div className="max-w-6xl mx-auto mt-6 sm:mt-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Performance Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-green-800 mb-2">Strengths</h3>
                <p className="text-sm text-green-700">Consistent performance across semesters with improving trend. Strong in core CS subjects.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-800 mb-2">Overall Progress</h3>
                <p className="text-sm text-blue-700">Maintaining good academic standing with steady CGPA of 8.2. Excellent work in Professional Ethics.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourChildResults;