import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setActiveModule,
  setActiveSidebarItem,
  toggleExpandedItem,
  setBreadcrumbs,
  addBreadcrumb,
  removeBreadcrumb,
  clearBreadcrumbs,
} from '../app/slices/navigationSlice';
import { useAuth } from './useAuth';
import { ModuleName } from '../types/enums';
import { MODULE_ACCESS } from '../utils/constants';

export const useNavigation = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const navigationState = useAppSelector(state => state.navigation);

  // Get modules accessible to the current user
  const getAccessibleModules = (): ModuleName[] => {
    if (!user) return [];
    return MODULE_ACCESS[user.role as keyof typeof MODULE_ACCESS] || [];
  };

  // Check if user has access to a specific module
  const hasModuleAccess = (module: ModuleName): boolean => {
    const accessibleModules = getAccessibleModules();
    return accessibleModules.includes(module);
  };

  // Set active module
  const handleSetActiveModule = (module: ModuleName) => {
    if (hasModuleAccess(module)) {
      dispatch(setActiveModule(module));
    }
  };

  // Set active sidebar item
  const handleSetActiveSidebarItem = (itemPath: string) => {
    dispatch(setActiveSidebarItem(itemPath));
  };

  // Toggle expanded state of a sidebar item
  const handleToggleExpanded = (itemPath: string) => {
    dispatch(toggleExpandedItem(itemPath));
  };

  // Set breadcrumbs
  const handleSetBreadcrumbs = (breadcrumbs: Array<{ label: string; path: string }>) => {
    dispatch(setBreadcrumbs(breadcrumbs));
  };

  // Add breadcrumb
  const handleAddBreadcrumb = (breadcrumb: { label: string; path: string }) => {
    dispatch(addBreadcrumb(breadcrumb));
  };

  // Remove breadcrumb at index
  const handleRemoveBreadcrumb = (index: number) => {
    dispatch(removeBreadcrumb(index));
  };

  // Clear all breadcrumbs
  const handleClearBreadcrumbs = () => {
    dispatch(clearBreadcrumbs());
  };

  // Generate breadcrumbs from current path
  const generateBreadcrumbsFromPath = (pathname: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = segments.map((segment, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/');
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return { label, path };
    });
    
    handleSetBreadcrumbs(breadcrumbs);
  };

  // Get sidebar items for a specific module
  const getSidebarItemsForModule = (module: ModuleName) => {
    if (!user || !hasModuleAccess(module)) return [];

    // This would typically come from a configuration or API
    // For now, return a basic structure
    const sidebarConfig = {
      [ModuleName.HOME]: [
        { name: 'Dashboard', path: '/home/dashboard', icon: 'BarChart3' },
        { name: 'Profile', path: '/home/profile', icon: 'User' },
        { name: 'Settings', path: '/home/settings', icon: 'Settings' },
      ],
      [ModuleName.ACADEMICS]: [
        { name: 'Dashboard', path: '/academics/dashboard', icon: 'BarChart3' },
        { name: 'Students', path: '/academics/students', icon: 'Users' },
        { name: 'Faculty', path: '/academics/faculty', icon: 'GraduationCap' },
        { name: 'Courses', path: '/academics/courses', icon: 'BookOpen' },
        { name: 'Timetable', path: '/academics/timetable', icon: 'Calendar' },
      ],
      [ModuleName.EXAMINATION]: [
        { name: 'Dashboard', path: '/examination/dashboard', icon: 'BarChart3' },
        { name: 'Exam Schedule', path: '/examination/schedule', icon: 'Calendar' },
        { name: 'Results', path: '/examination/results', icon: 'Award' },
        { name: 'Hall Tickets', path: '/examination/hall-tickets', icon: 'CreditCard' },
      ],
      [ModuleName.PLACEMENTS]: [
        { name: 'Dashboard', path: '/placements/dashboard', icon: 'BarChart3' },
        { name: 'Companies', path: '/placements/companies', icon: 'Building' },
        { name: 'Drives', path: '/placements/drives', icon: 'Briefcase' },
        { name: 'Students', path: '/placements/students', icon: 'Users' },
      ],
      [ModuleName.LIBRARY]: [
        { name: 'Dashboard', path: '/library/dashboard', icon: 'BarChart3' },
        { name: 'Books', path: '/library/books', icon: 'BookOpen' },
        { name: 'Issues', path: '/library/issues', icon: 'ArrowRight' },
        { name: 'Members', path: '/library/members', icon: 'Users' },
      ],
      [ModuleName.HOSTEL]: [
        { name: 'Dashboard', path: '/hostel/dashboard', icon: 'BarChart3' },
        { name: 'Rooms', path: '/hostel/rooms', icon: 'Home' },
        { name: 'Allocations', path: '/hostel/allocations', icon: 'UserCheck' },
        { name: 'Students', path: '/hostel/students', icon: 'Users' },
      ],
      [ModuleName.TRANSPORT]: [
        { name: 'Dashboard', path: '/transport/dashboard', icon: 'BarChart3' },
        { name: 'Routes', path: '/transport/routes', icon: 'Map' },
        { name: 'Vehicles', path: '/transport/vehicles', icon: 'Bus' },
        { name: 'Drivers', path: '/transport/drivers', icon: 'User' },
      ],
    };

    return sidebarConfig[module] || [];
  };

  return {
    // State
    activeModule: navigationState.activeModule,
    activeSidebarItem: navigationState.activeSidebarItem,
    expandedItems: navigationState.expandedItems,
    breadcrumbs: navigationState.breadcrumbs,

    // Computed values
    accessibleModules: getAccessibleModules(),
    currentModuleItems: getSidebarItemsForModule(navigationState.activeModule),

    // Actions
    setActiveModule: handleSetActiveModule,
    setActiveSidebarItem: handleSetActiveSidebarItem,
    toggleExpanded: handleToggleExpanded,
    setBreadcrumbs: handleSetBreadcrumbs,
    addBreadcrumb: handleAddBreadcrumb,
    removeBreadcrumb: handleRemoveBreadcrumb,
    clearBreadcrumbs: handleClearBreadcrumbs,
    generateBreadcrumbsFromPath,

    // Utilities
    hasModuleAccess,
    getSidebarItemsForModule,
  };
};

