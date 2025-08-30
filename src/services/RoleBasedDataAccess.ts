import { User } from '../types';

export class RoleBasedDataAccess {
  static filterByRole(data: any[], userRole: string, user: User): any[] {
    const filters: { [key: string]: (data: any[]) => any[] } = {
      'Student': (data) => data.filter(item => 
        item.studentId === user.studentId || 
        item.id === user.studentId ||
        item.userId === user.id
      ),
      
      'Faculty': (data) => data.filter(item => 
        item.facultyId === user.employeeId || 
        item.departmentId === user.departmentId ||
        (item.assignedFaculty && item.assignedFaculty === user.employeeId)
      ),
      
      'Parent': (data) => data.filter(item => 
        item.studentId === user.childStudentId ||
        item.id === user.childStudentId
      ),
      
      'HoD': (data) => data.filter(item => 
        item.departmentId === user.departmentId ||
        item.department === user.department
      ),
      
      'Transportation Incharge': (data) => data.filter(item => 
        user.routeIds?.includes(item.routeId) ||
        user.routeIds?.includes(item.id)
      ),
      
      'Hostel Incharge': (data) => data.filter(item => 
        user.hostelIds?.includes(item.hostelId) ||
        user.hostelIds?.includes(item.id)
      ),
      
      'Lab Assistant': (data) => data.filter(item => 
        user.labIds?.includes(item.labId) ||
        user.labIds?.includes(item.id)
      ),
      
      'Lab Technician': (data) => data.filter(item => 
        user.labIds?.includes(item.labId) ||
        user.labIds?.includes(item.id)
      ),
      
      'Library Incharge': (data) => data, // Full library access
      
      'TPO': (data) => data, // Campus-wide placement access
      
      'Controller of Examination': (data) => data, // Campus-wide exam access
      
      'Principal': (data) => data.filter(item => 
        item.campusId === user.campusId || !item.campusId
      ),
      
      'Dean': (data) => data.filter(item => 
        item.collegeId === user.collegeId || !item.collegeId
      ),
      
      'Administration Officer': (data) => data.filter(item => 
        item.campusId === user.campusId || !item.campusId
      ),
      
      'Accounts Officer': (data) => data.filter(item => 
        item.campusId === user.campusId || !item.campusId
      ),
      
      'ERP Admin': (data) => data, // Full system access
      
      'College Secretary': (data) => data, // Full institutional access
      
      'Chairperson': (data) => data, // Full institutional access
    };
    
    return filters[userRole] ? filters[userRole](data) : [];
  }

  static getModuleAccess(userRole: string): string[] {
    const moduleAccess: { [key: string]: string[] } = {
      'Student': ['Learning Management', 'Library', 'Transport', 'Hostel'],
      'Faculty': ['Academics Management', 'Examination', 'Library', 'Learning'],
      'Principal': ['Administration', 'Academics', 'Examination', 'Placement', 'Library', 'Transport', 'Hostel', 'Communication'],
      'Dean': ['Administration', 'Academics', 'Examination', 'Placement', 'Library', 'Communication'],
      'HoD': ['Academics', 'Examination', 'Placement', 'Library', 'Communication'],
      'TPO': ['Placement', 'Academics', 'Communication'],
      'Controller of Examination': ['Examination', 'Academics'],
      'Lab Assistant': ['Academics', 'Learning'],
      'Lab Technician': ['Academics', 'Learning'],
      'Parent': ['Communication'],
      'Administration Officer': ['Administration', 'Communication'],
      'Transportation Incharge': ['Transport'],
      'Hostel Incharge': ['Hostel'],
      'Library Incharge': ['Library'],
      'Accounts Officer': ['Administration'],
      'Scholarship Incharge': ['Administration'],
      'Stores Incharge': ['Administration'],
      'Sports Incharge': ['Administration', 'Communication'],
      'Security Incharge': ['Administration', 'Communication'],
      'IT Department': ['Administration', 'Academics', 'Examination', 'Placement', 'Library', 'Transport', 'Hostel', 'Communication'],
      'Student Services': ['Administration', 'Communication'],
      'College Maintenance Incharge': ['Administration', 'Communication'],
      'ERP Admin': ['Administration', 'Academics', 'Examination', 'Placement', 'Library', 'Transport', 'Hostel', 'Communication'],
      'College Secretary': ['Administration', 'Academics', 'Examination', 'Placement', 'Library', 'Transport', 'Hostel', 'Communication'],
      'Chairperson': ['Administration', 'Academics', 'Examination', 'Placement', 'Library', 'Transport', 'Hostel', 'Communication']
    };
    
    return moduleAccess[userRole] || [];
  }

  static getDashboardData(userRole: string, user: User): any {
    const dashboardConfigs: { [key: string]: any } = {
      'Student': {
        widgets: ['Personal Attendance', 'Academic Calendar', 'Personal Timetable', 'Fee Status', 'Library Books'],
        dataScope: 'personal'
      },
      'Faculty': {
        widgets: ['My Classes', 'Student Attendance', 'Class Performance', 'Academic Calendar'],
        dataScope: 'assigned_classes'
      },
      'Principal': {
        widgets: ['Campus Overview', 'Employee Attendance', 'Student Performance', 'Budget Summary', 'Pending Approvals'],
        dataScope: 'campus_wide'
      },
      'HoD': {
        widgets: ['Department Overview', 'Faculty Performance', 'Student Results', 'Department Budget'],
        dataScope: 'department'
      },
      'TPO': {
        widgets: ['Placement Statistics', 'Company Drives', 'Student Training', 'Placement Calendar'],
        dataScope: 'placement'
      },
      'Transportation Incharge': {
        widgets: ['Route Status', 'Vehicle Tracking', 'Passenger Details', 'Maintenance Schedule'],
        dataScope: 'assigned_routes'
      },
      'Hostel Incharge': {
        widgets: ['Occupancy Status', 'Student Check-in/out', 'Fee Collection', 'Maintenance Requests'],
        dataScope: 'assigned_hostels'
      },
      'Library Incharge': {
        widgets: ['Book Circulation', 'Overdue Books', 'New Acquisitions', 'Popular Books'],
        dataScope: 'library_wide'
      }
    };
    
    return dashboardConfigs[userRole] || { widgets: [], dataScope: 'none' };
  }
}

export const MODULE_ACCESS_CONTROL = {
  'Student': ['learning', 'library', 'transport', 'hostel'],
  'Faculty': ['academics', 'examination', 'library', 'learning'],
  'Principal': ['administration', 'academics', 'examination', 'placement', 'library', 'transport', 'hostel', 'communication'],
  'Dean': ['administration', 'academics', 'examination', 'placement', 'library', 'communication'],
  'HoD': ['academics', 'examination', 'placement', 'library', 'communication'],
  'TPO': ['placement', 'academics', 'communication'],
  'Controller of Examination': ['examination', 'academics'],
  'Lab Assistant': ['academics', 'learning'],
  'Lab Technician': ['academics', 'learning'],
  'Parent': ['communication'],
  'Administration Officer': ['administration', 'communication'],
  'Transportation Incharge': ['transport'],
  'Hostel Incharge': ['hostel'],
  'Library Incharge': ['library'],
  'Accounts Officer': ['administration'],
  'Scholarship Incharge': ['administration'],
  'Stores Incharge': ['administration'],
  'Sports Incharge': ['administration', 'communication'],
  'Security Incharge': ['administration', 'communication'],
  'IT Department': ['administration', 'academics', 'examination', 'placement', 'library', 'transport', 'hostel', 'communication'],
  'Student Services': ['administration', 'communication'],
  'College Maintenance Incharge': ['administration', 'communication'],
  'ERP Admin': ['administration', 'academics', 'examination', 'placement', 'library', 'transport', 'hostel', 'communication'],
  'College Secretary': ['administration', 'academics', 'examination', 'placement', 'library', 'transport', 'hostel', 'communication'],
  'Chairperson': ['administration', 'academics', 'examination', 'placement', 'library', 'transport', 'hostel', 'communication']
};