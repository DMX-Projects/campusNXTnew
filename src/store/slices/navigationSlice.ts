import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  sidebarOpen: boolean;
  currentModule: string | null;
  breadcrumbs: Array<{ name: string; path: string }>;
}

const initialState: NavigationState = {
  sidebarOpen: true,
  currentModule: null,
  breadcrumbs: [],
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setCurrentModule: (state, action: PayloadAction<string | null>) => {
      state.currentModule = action.payload;
    },
    setBreadcrumbs: (state, action: PayloadAction<Array<{ name: string; path: string }>>) => {
      state.breadcrumbs = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setCurrentModule,
  setBreadcrumbs,
} = navigationSlice.actions;

export default navigationSlice.reducer;