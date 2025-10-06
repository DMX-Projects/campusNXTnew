import { useContext } from 'react';
import { NavigationContext } from '../contexts/NavigationContext';

export const useNavigationLegacy = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigationLegacy must be used within a NavigationProvider');
  }
  return context;
};
