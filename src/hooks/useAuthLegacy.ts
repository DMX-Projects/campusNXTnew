import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuthLegacy = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthLegacy must be used within an AuthProvider');
  }
  return context;
};
