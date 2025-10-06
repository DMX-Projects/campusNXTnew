import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'red';

interface ThemeState {
  mode: ThemeMode;
  color: ThemeColor;
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  primaryColor: string;
  secondaryColor: string;
}

const getStoredTheme = (): Partial<ThemeState> => {
  try {
    const stored = localStorage.getItem('theme');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const initialState: ThemeState = {
  mode: 'system',
  color: 'blue',
  isSidebarCollapsed: false,
  isMobileSidebarOpen: false,
  primaryColor: '#3b82f6',
  secondaryColor: '#64748b',
  ...getStoredTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      localStorage.setItem('theme', JSON.stringify({
        mode: state.mode,
        color: state.color,
        isSidebarCollapsed: state.isSidebarCollapsed,
      }));
    },
    setThemeColor: (state, action: PayloadAction<ThemeColor>) => {
      state.color = action.payload;
      
      // Set primary and secondary colors based on theme color
      const colorMap: Record<ThemeColor, { primary: string; secondary: string }> = {
        blue: { primary: '#3b82f6', secondary: '#64748b' },
        green: { primary: '#10b981', secondary: '#6b7280' },
        purple: { primary: '#8b5cf6', secondary: '#7c3aed' },
        orange: { primary: '#f59e0b', secondary: '#d97706' },
        red: { primary: '#ef4444', secondary: '#dc2626' },
      };
      
      state.primaryColor = colorMap[action.payload].primary;
      state.secondaryColor = colorMap[action.payload].secondary;
      
      localStorage.setItem('theme', JSON.stringify({
        mode: state.mode,
        color: state.color,
        isSidebarCollapsed: state.isSidebarCollapsed,
      }));
    },
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
      localStorage.setItem('theme', JSON.stringify({
        mode: state.mode,
        color: state.color,
        isSidebarCollapsed: state.isSidebarCollapsed,
      }));
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
      localStorage.setItem('theme', JSON.stringify({
        mode: state.mode,
        color: state.color,
        isSidebarCollapsed: state.isSidebarCollapsed,
      }));
    },
    toggleMobileSidebar: (state) => {
      state.isMobileSidebarOpen = !state.isMobileSidebarOpen;
    },
    setMobileSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileSidebarOpen = action.payload;
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
    },
    setSecondaryColor: (state, action: PayloadAction<string>) => {
      state.secondaryColor = action.payload;
    },
    resetTheme: (state) => {
      state.mode = 'system';
      state.color = 'blue';
      state.isSidebarCollapsed = false;
      state.isMobileSidebarOpen = false;
      state.primaryColor = '#3b82f6';
      state.secondaryColor = '#64748b';
      localStorage.removeItem('theme');
    },
  },
});

export const {
  setThemeMode,
  setThemeColor,
  toggleSidebar,
  setSidebarCollapsed,
  toggleMobileSidebar,
  setMobileSidebarOpen,
  setPrimaryColor,
  setSecondaryColor,
  resetTheme,
} = themeSlice.actions;

export default themeSlice.reducer;

