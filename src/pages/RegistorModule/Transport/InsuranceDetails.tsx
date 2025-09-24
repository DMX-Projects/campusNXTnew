import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { 
  ArrowLeft, 
  Shield, 
  TrendingUp, 
  Calendar, 
  Car,
  MapPin,
  Clock,
  DollarSign,
  Download,
  AlertCircle,
  CheckCircle,
  FileText
} from 'lucide-react';

const InsuranceDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const insuranceData = {
    totalPremium: '₹8,900',
    renewalDate: '2024-03-15',
    coverage: '₹50,00,000',
    status: 'Active',
    vehicles: [
      { id: 'BUS-001', premium: '₹2,400', type: 'Bus', expiry: '2024-03-15', status: 'Active' },
      { id: 'BUS-002', premium: '₹2,200', type: 'Bus', expiry: '2024-03-15', status: 'Active' },
      { id: 'VAN-001', premium: '₹1,800', type: 'Van', expiry: '2024-03-15', status: 'Active' },
      { id: 'BUS-003', premium: '₹2,500', type: 'Bus', expiry: '2024-03-15', status: 'Renewal Due' }
    ]
  };

  const coverageDetails = [
    { type: 'Third Party Liability', amount: '₹15,00,000', included: true },
    { type: 'Own Damage', amount: '₹25,00,000', included: true },
    { type: 'Personal Accident', amount: '₹5,00,000', included: true },
    { type: 'Passenger Liability', amount: '₹5,00,000', included: true }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/management/transport/financial-control')}
            className={`flex items-center mb-4 px-3 py-2 rounded-lg transition-colors ${
              isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Financial Control
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Shield className="w-6 h-6 mr-3 text-purple-500" />
                Insurance Details
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Request ID: {requestId} • Fleet insurance management
              </p>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Certificate
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">
                Annual
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Premium
            </h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {insuranceData.totalPremium}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                Coverage
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Coverage
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {insuranceData.coverage}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full dark:bg-orange-900/30 dark:text-orange-400">
                Expires
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Renewal Date
            </h3>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">
              {insuranceData.renewalDate}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">
                {insuranceData.status}
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Policy Status
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              Valid
            </p>
          </div>
        </div>

        {/* Vehicle Insurance Breakdown */}
        <div className={`p-6 rounded-xl shadow-md mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <Car className="w-5 h-5 mr-2 text-purple-500" />
            Vehicle Insurance Details
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="text-left py-3 px-4 font-semibold">Vehicle ID</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Premium</th>
                  <th className="text-left py-3 px-4 font-semibold">Expiry Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {insuranceData.vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-3 px-4 font-medium">{vehicle.id}</td>
                    <td className="py-3 px-4">{vehicle.type}</td>
                    <td className="py-3 px-4 font-semibold text-purple-600 dark:text-purple-400">{vehicle.premium}</td>
                    <td className="py-3 px-4">{vehicle.expiry}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        vehicle.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                      }`}>
                        {vehicle.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coverage Details */}
        <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-500" />
            Coverage Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coverageDetails.map((coverage, index) => (
              <div key={coverage.type} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <h4 className="font-semibold">{coverage.type}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Coverage Amount</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{coverage.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;
