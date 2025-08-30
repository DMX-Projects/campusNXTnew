import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlaceholderPageProps {
  module: string;
  feature: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ module, feature }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'Home': return '🏠';
      case 'Academics': return '🎓';
      case 'Administration': return '🏛️';
      case 'Examination': return '📋';
      case 'Placements': return '💼';
      case 'LMS': return '💻';
      case 'Library': return '📚';
      case 'Transport': return '🚌';
      case 'Hostel': return '🏠';
      case 'Parent': return '👨‍👩‍👧‍👦';
      case 'Communications': return '📢';
      default: return '📊';
    }
  };

  const getModuleDashboardPath = (module: string) => {
    switch (module) {
      case 'Home': return '/dashboard';
      case 'Academics': return '/academics/dashboard';
      case 'Administration': return '/administration/dashboard';
      case 'Examination': return '/examination/dashboard';
      case 'Placements': return '/placements/dashboard';
      case 'LMS': return '/lms/dashboard';
      case 'Library': return '/library/dashboard';
      case 'Transport': return '/transport/dashboard';
      case 'Hostel': return '/hostel/dashboard';
      case 'Parent': return '/parent/dashboard';
      case 'Communications': return '/communications/dashboard';
      default: return '/dashboard';
    }
  };

  return (
    <div className="space-y-6">
      {/* Back to Dashboard Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(getModuleDashboardPath(module))}
          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {module} Dashboard</span>
        </button>
      </div>

      {/* Feature Under Development */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          
          <div className="mb-6">
            <div className="text-4xl mb-4">{getModuleIcon(module)}</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {feature}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              This feature is part of the {module} module and will be implemented in Phase 2.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-blue-800 dark:text-blue-400">Module</p>
                <p className="text-blue-600 dark:text-blue-300">{module}</p>
              </div>
              <div>
                <p className="font-semibold text-purple-800 dark:text-purple-400">Feature</p>
                <p className="text-purple-600 dark:text-purple-300">{feature}</p>
              </div>
              <div>
                <p className="font-semibold text-green-800 dark:text-green-400">Access Level</p>
                <p className="text-green-600 dark:text-green-300">{user?.role}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(getModuleDashboardPath(module))}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Go to {module} Dashboard
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Development Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Development Timeline</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Phase 1: Core Navigation & Dashboard Structure</span>
            <span className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">Completed</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Phase 2: {module} Module Implementation</span>
            <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium">In Progress</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Phase 3: Advanced Features & Integrations</span>
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">Planned</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;