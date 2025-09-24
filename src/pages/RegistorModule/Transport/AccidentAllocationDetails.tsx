import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { 
  ArrowLeft, 
  Shield, 
  AlertTriangle, 
  Calendar, 
  Car,
  MapPin,
  DollarSign,
  Download,
  Clock,
  FileText,
  CheckCircle,
  XCircle
} from 'lucide-react';

const AccidentAllocationDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Sample accident data
  const accidentData = {
    id: requestId,
    date: '2024-01-10',
    time: '14:30',
    vehicle: 'BUS-001',
    route: 'Route A',
    driver: 'John Smith',
    type: 'Minor Collision',
    location: 'Main Street & Oak Avenue',
    description: 'Minor rear-end collision while stopping at traffic light. No injuries reported.',
    costs: {
      total: '₹26,600',
      vehicleRepair: '₹18,500',
      propertyDamage: '₹5,800',
      medicalExpenses: '₹0',
      legalFees: '₹2,300'
    },
    insurance: {
      claimNumber: 'INS-2024-001',
      coverage: '₹16,000',
      deductible: '₹2,000',
      status: 'Approved'
    },
    allocation: {
      insurancePaid: '₹16,000',
      selfPay: '₹10,600',
      pending: '₹0'
    },
    timeline: [
      { date: '2024-01-10 14:30', event: 'Accident occurred', status: 'incident' },
      { date: '2024-01-10 15:00', event: 'Police report filed', status: 'completed' },
      { date: '2024-01-11 09:00', event: 'Insurance claim submitted', status: 'completed' },
      { date: '2024-01-12 14:00', event: 'Vehicle inspection completed', status: 'completed' },
      { date: '2024-01-15 10:00', event: 'Insurance claim approved', status: 'completed' },
      { date: '2024-01-18 16:00', event: 'Repairs completed', status: 'completed' },
      { date: '2024-01-20 11:00', event: 'Final settlement', status: 'completed' }
    ]
  };

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
                <Shield className="w-6 h-6 mr-3 text-red-500" />
                Accident Allocation Summary
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Request ID: {requestId} • {accidentData.type} - {accidentData.vehicle}
              </p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full dark:bg-red-900/30 dark:text-red-400">
                Total Cost
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Accident Cost
            </h3>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {accidentData.costs.total}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">
                Insurance
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Covered Amount
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {accidentData.allocation.insurancePaid}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full dark:bg-orange-900/30 dark:text-orange-400">
                Self Pay
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Out of Pocket
            </h3>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {accidentData.allocation.selfPay}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                Status
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Case Status
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Settled
            </p>
          </div>
        </div>

        {/* Accident Details */}
        <div className={`p-6 rounded-xl shadow-md mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Accident Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Date & Time</p>
                <p className="text-lg font-semibold flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {accidentData.date} at {accidentData.time}
                </p>
              </div>
              
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Vehicle</p>
                <p className="text-lg font-semibold flex items-center">
                  <Car className="w-4 h-4 mr-2" />
                  {accidentData.vehicle}
                </p>
              </div>
              
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Route</p>
                <p className="text-lg font-semibold flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {accidentData.route}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Driver</p>
                <p className="text-lg font-semibold">{accidentData.driver}</p>
              </div>
              
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Location</p>
                <p className="text-lg font-semibold">{accidentData.location}</p>
              </div>
              
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Type</p>
                <p className="text-lg font-semibold text-orange-600">{accidentData.type}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Description</p>
            <p className="text-lg">{accidentData.description}</p>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className={`p-6 rounded-xl shadow-md mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-blue-500" />
            Cost Breakdown & Allocation
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Cost Categories</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span>Vehicle Repair</span>
                  <span className="font-semibold">{accidentData.costs.vehicleRepair}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span>Property Damage</span>
                  <span className="font-semibold">{accidentData.costs.propertyDamage}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span>Medical Expenses</span>
                  <span className="font-semibold">{accidentData.costs.medicalExpenses}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span>Legal Fees</span>
                  <span className="font-semibold">{accidentData.costs.legalFees}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 border-t-2 border-blue-500">
                  <span className="font-semibold">Total Cost</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{accidentData.costs.total}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Payment Allocation</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <span>Insurance Coverage</span>
                  <span className="font-semibold text-green-600">{accidentData.allocation.insurancePaid}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                  <span>Self Payment</span>
                  <span className="font-semibold text-orange-600">{accidentData.allocation.selfPay}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span>Pending Amount</span>
                  <span className="font-semibold">{accidentData.allocation.pending}</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <h5 className="font-semibold mb-2">Insurance Details</h5>
                <p><span className="font-medium">Claim #:</span> {accidentData.insurance.claimNumber}</p>
                <p><span className="font-medium">Deductible:</span> {accidentData.insurance.deductible}</p>
                <p><span className="font-medium">Status:</span> <span className="text-green-600 font-semibold">{accidentData.insurance.status}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-purple-500" />
            Case Timeline
          </h3>
          
          <div className="space-y-4">
            {accidentData.timeline.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                  item.status === 'incident' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                  'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}>
                  {item.status === 'completed' ? <CheckCircle className="w-4 h-4" /> :
                   item.status === 'incident' ? <AlertTriangle className="w-4 h-4" /> :
                   <Clock className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{item.event}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccidentAllocationDetails;
