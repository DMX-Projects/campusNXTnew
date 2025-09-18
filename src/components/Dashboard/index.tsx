import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '../../contexts/NavigationContext';
import { RoleBasedDataAccess } from '../../services/RoleBasedDataAccess';
import PrincipalDashboard from './PrincipalDashboard';
import StudentDashboard from './StudentDashboard';
import FacultyDashboard from './FacultyDashboard';
import ParentDashboard from './ParentDashboard';
import TPODashboard from './TPODashboard';
import ExaminationDashboard from './ExaminationDashboard';
import AdministrationDashboard from './AdministrationDashboard';
import TransportDashboard from './TransportDashboard';
import HostelDashboard from './HostelDashboard';
import LibraryDashboard from './LibraryDashboard';
import CollegeSecretaryDashboard from '../../pages/ChairpersonModule/Academics/AcademicDashboar/CollegeSecretaryDashboard';
import DeanDashboard from './DeanDashboard';
import HoDDashboard from './HoDDashboard';
import LabAssistantDashboard from './LabAssistantDashboard';
import AccountsDashboard from './AccountsDashboard';
import ScholarshipDashboard from './ScholarshipDashboard';
import SportsDashboard from './SportsDashboard';
import SecurityDashboard from './SecurityDashboard';
import ITDashboard from './ITDashboard';
import MaintenanceDashboard from './MaintenanceDashboard';
import ChairpersonHomeDashboard from './ChairpersonHomeDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { activeModule } = useNavigation();

  const renderDashboard = () => {
    if (!user) return <PrincipalDashboard />;
    
    // If not on Home module, show module-specific content
    if (activeModule !== 'Home') {
      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">
                  {activeModule === 'Academics' ? '🎓' :
                   activeModule === 'Administration' ? '🏛️' :
                   activeModule === 'Examination' ? '📋' :
                   activeModule === 'Placements' ? '💼' :
                   activeModule === 'LMS' ? '💻' :
                   activeModule === 'Library' ? '📚' :
                   activeModule === 'Transport' ? '🚌' :
                   activeModule === 'Hostel' ? '🏠' :
                   activeModule === 'Parent' ? '👨‍👩‍👧‍👦' :
                   activeModule === 'Communications' ? '📢' : '📊'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {activeModule} Module
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Welcome to the {activeModule} module. Use the sidebar navigation to access specific features.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-3">
                <p className="text-xs text-blue-800 dark:text-blue-400">
                  <strong>Role:</strong> {user.role} | <strong>Access Level:</strong> {activeModule} Module
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Home module - show role-specific dashboard
    switch (user?.role) {
      case 'College Secretary':
        return <ChairpersonHomeDashboard />;
        return <CollegeSecretaryDashboard />;
      case 'Chairperson':
        return <ChairpersonHomeDashboard />;
      case 'Principal':
        return <PrincipalDashboard />;
      case 'Dean':
        return <DeanDashboard />;
      case 'HoD':
        return <HoDDashboard />;
      case 'TPO':
        return <TPODashboard />;
      case 'Controller of Examination':
        return <ExaminationDashboard />;
      case 'Faculty':
        return <FacultyDashboard />;
      case 'Lab Assistant':
        return <LabAssistantDashboard />;
      case 'Lab Technician':
        return <LabAssistantDashboard />;
      case 'Student':
        return <StudentDashboard />;
      case 'Parent':
        return <ParentDashboard />;
      case 'Administration Officer':
        return <AdministrationDashboard />;
      case 'Accounts Officer':
        return <AccountsDashboard />;
      case 'Scholarship Incharge':
        return <ScholarshipDashboard />;
      case 'Stores Incharge':
        return <AdministrationDashboard />;
      case 'Sports Incharge':
        return <SportsDashboard />;
      case 'Security Incharge':
        return <SecurityDashboard />;
      case 'Student Services':
        return <AdministrationDashboard />;
      case 'College Maintenance Incharge':
        return <MaintenanceDashboard />;
      case 'Transportation Incharge':
        return <TransportDashboard />;
      case 'Hostel Incharge':
        return <HostelDashboard />;
      case 'Library Incharge':
        return <LibraryDashboard />;
      case 'IT Department':
        return <ITDashboard />;
      case 'ERP Admin':
        return <ITDashboard />;
      default:
        return <PrincipalDashboard />;
    }
  };

  return renderDashboard();
};

export default Dashboard;