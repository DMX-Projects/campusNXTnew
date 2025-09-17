// Authentication utility functions

export const getRedirectPath = (role: string): string => {
  const rolePathMap: Record<string, string> = {
    Student: '/home',
    Faculty: '/home',
    HoD: '/home',
    Principal: '/home',
    Admin: '/administration',
    Librarian: '/library',
    Warden: '/hostel',
    Parent: '/parent',
    Dean: '/home',
    Chairperson: '/home',
    TPO: '/placements',
    'Lab Assistant': '/lms',
    Accountant: '/administration',
    Security: '/administration',
    Maintenance: '/administration',
  };

  return rolePathMap[role] || '/home';
};

export const hasPermission = (userRole: string, requiredRoles: string[]): boolean => {
  return requiredRoles.includes(userRole);
};

export const isAdmin = (role: string): boolean => {
  return ['Admin', 'Principal'].includes(role);
};

export const isFaculty = (role: string): boolean => {
  return ['Faculty', 'HoD', 'Dean', 'Chairperson', 'Lab Assistant'].includes(role);
};

export const isStudent = (role: string): boolean => {
  return role === 'Student';
};

export const isParent = (role: string): boolean => {
  return role === 'Parent';
};

export const getTokenFromStorage = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const saveTokenToStorage = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

export const removeTokenFromStorage = (): void => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_data');
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; // Convert to milliseconds
    return Date.now() > expiry;
  } catch (error) {
    return true;
  }
};