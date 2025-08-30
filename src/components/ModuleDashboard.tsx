import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import PrincipalDashboard from './Dashboard/PrincipalDashboard';
import StudentDashboard from './Dashboard/StudentDashboard';
import FacultyDashboard from './Dashboard/FacultyDashboard';
import ParentDashboard from './Dashboard/ParentDashboard';
import TPODashboard from './Dashboard/TPODashboard';
import ExaminationDashboard from './Dashboard/ExaminationDashboard';
import AdministrationDashboard from './Dashboard/AdministrationDashboard';
import TransportDashboard from './Dashboard/TransportDashboard';
import HostelDashboard from './Dashboard/HostelDashboard';
import LibraryDashboard from './Dashboard/LibraryDashboard';
import CollegeSecretaryDashboard from './Dashboard/CollegeSecretaryDashboard';
import DeanDashboard from './Dashboard/DeanDashboard';
import HoDDashboard from './Dashboard/HoDDashboard';
import LabAssistantDashboard from './Dashboard/LabAssistantDashboard';
import AccountsDashboard from './Dashboard/AccountsDashboard';
import ScholarshipDashboard from './Dashboard/ScholarshipDashboard';
import SportsDashboard from './Dashboard/SportsDashboard';
import SecurityDashboard from './Dashboard/SecurityDashboard';
import ITDashboard from './Dashboard/ITDashboard';
import MaintenanceDashboard from './Dashboard/MaintenanceDashboard';

interface ModuleDashboardProps {
  module: string;
}

const ModuleDashboard: React.FC<ModuleDashboardProps> = ({ module }) => {
  const { user } = useAuth();

  const renderModuleDashboard = () => {
    if (!user) return <PrincipalDashboard />;

    // Module-specific dashboards based on user role
    switch (module) {
      case 'Academics':
        switch (user.role) {
          case 'College Secretary':
          case 'Chairperson':
          case 'Principal':
            return <CollegeSecretaryDashboard />;
          case 'Dean':
            return <DeanDashboard />;
          case 'HoD':
            return <HoDDashboard />;
          case 'Faculty':
            return <FacultyDashboard />;
          case 'Student':
            return <StudentDashboard />;
          default:
            return <PrincipalDashboard />;
        }

      case 'Administration':
        switch (user.role) {
          case 'College Secretary':
          case 'Chairperson':
          case 'Principal':
            return <CollegeSecretaryDashboard />;
          case 'Administration Officer':
          case 'Accounts Officer':
            return <AccountsDashboard />;
          case 'Scholarship Incharge':
            return <ScholarshipDashboard />;
          default:
            return <AdministrationDashboard />;
        }

      case 'Examination':
        switch (user.role) {
          case 'Controller of Examination':
            return <ExaminationDashboard />;
          case 'Faculty':
            return <FacultyDashboard />;
          case 'Student':
            return <StudentDashboard />;
          default:
            return <ExaminationDashboard />;
        }

      case 'Placements':
        switch (user.role) {
          case 'TPO':
            return <TPODashboard />;
          case 'Student':
            return <StudentDashboard />;
          default:
            return <TPODashboard />;
        }

      case 'LMS':
        switch (user.role) {
          case 'Faculty':
            return <FacultyDashboard />;
          case 'Student':
            return <StudentDashboard />;
          case 'Lab Assistant':
          case 'Lab Technician':
            return <LabAssistantDashboard />;
          default:
            return <StudentDashboard />;
        }

      case 'Library':
        switch (user.role) {
          case 'Library Incharge':
            return <LibraryDashboard />;
          case 'Faculty':
            return <FacultyDashboard />;
          case 'Student':
            return <StudentDashboard />;
          default:
            return <LibraryDashboard />;
        }

      case 'Transport':
        switch (user.role) {
          case 'Transportation Incharge':
            return <TransportDashboard />;
          case 'Student':
            return <StudentDashboard />;
          default:
            return <TransportDashboard />;
        }

      case 'Hostel':
        switch (user.role) {
          case 'Hostel Incharge':
            return <HostelDashboard />;
          case 'Student':
            return <StudentDashboard />;
          default:
            return <HostelDashboard />;
        }

      case 'Parent':
        return <ParentDashboard />;

      case 'Communications':
        switch (user.role) {
          case 'College Secretary':
          case 'Chairperson':
          case 'Principal':
            return <CollegeSecretaryDashboard />;
          default:
            return <AdministrationDashboard />;
        }

      default:
        return <PrincipalDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              {module === 'Academics' ? '🎓' :
               module === 'Administration' ? '🏛️' :
               module === 'Examination' ? '📋' :
               module === 'Placements' ? '💼' :
               module === 'LMS' ? '💻' :
               module === 'Library' ? '📚' :
               module === 'Transport' ? '🚌' :
               module === 'Hostel' ? '🏠' :
               module === 'Parent' ? '👨‍👩‍👧‍👦' :
               module === 'Communications' ? '📢' : '📊'}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {module} Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {user?.role} - {module} Module Overview
            </p>
          </div>
        </div>
      </div>

      {/* Module-Specific Dashboard Content */}
      {renderModuleDashboard()}
    </div>
  );
};

export default ModuleDashboard;