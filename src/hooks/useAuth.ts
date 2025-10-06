import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateUser, 
  clearError,
  initializeAuth 
} from '../app/slices/authSlice';
import { 
  useLoginMutation, 
  useLogoutMutation, 
  useGetCurrentUserQuery,
  useUpdateProfileMutation 
} from '../api/services/authApi';
import { LoginRequest } from '../types/api';
import { DEFAULT_ROUTES } from '../utils/constants';
import { UserRole } from '../types/enums';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector(state => state.auth);
  
  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();
  const [updateProfileMutation] = useUpdateProfileMutation();
  
  const { data: currentUser, isLoading: isLoadingUser } = useGetCurrentUserQuery(
    undefined,
    {
      skip: !authState.isAuthenticated,
    }
  );

  // Initialize auth state from localStorage on mount
  React.useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const login = async (credentials: LoginRequest) => {
    try {
      dispatch(loginStart());
      const response = await loginMutation(credentials).unwrap();
      dispatch(loginSuccess(response));
      
      // Navigate to default route based on user role
      const defaultRoute = DEFAULT_ROUTES[response.user.role as UserRole] || '/dashboard';
      navigate(defaultRoute);
      
      return response;
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
      throw new Error(errorMessage);
    }
  };

  const logoutUser = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      // Even if logout API fails, clear local state
      dispatch(logout());
      navigate('/login');
    }
  };

  const updateProfile = async (updates: Partial<any>) => {
    try {
      const response = await updateProfileMutation(updates).unwrap();
      dispatch(updateUser(response));
      return response;
    } catch (error: any) {
      throw new Error(error?.data?.message || 'Profile update failed');
    }
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  // Check if user has specific permission
  const hasPermission = (permission: string): boolean => {
    if (!authState.user) return false;
    
    // Master Admin has all permissions
    if (authState.user.role === 'Master Admin') return true;
    
    // Check if user has the specific permission
    return authState.user.permissions?.includes(permission) || false;
  };

  // Check if user has any of the specified permissions
  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  // Check if user has all of the specified permissions
  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  // Check if user has specific role
  const hasRole = (role: UserRole | string): boolean => {
    return authState.user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles: (UserRole | string)[]): boolean => {
    return roles.includes(authState.user?.role || '');
  };

  return {
    // State
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    
    // Actions
    login,
    logout: logoutUser,
    updateProfile,
    clearError: clearAuthError,
    
    // Permission checks
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
    
    // Computed values
    isAdmin: hasRole('Master Admin'),
    isStudent: hasRole('Student'),
    isFaculty: hasRole('Faculty'),
    isPrincipal: hasRole('Principal'),
    isHOD: hasRole('HoD'),
  };
};
