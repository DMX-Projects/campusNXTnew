import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModuleName } from '../../types/enums';

interface NavigationState {
  activeModule: ModuleName;
  activeSidebarItem: string;
  expandedItems: string[];
  breadcrumbs: Array<{
    label: string;
    path: string;
  }>;
}

const initialState: NavigationState = {
  activeModule: ModuleName.HOME,
  activeSidebarItem: '',
  expandedItems: [],
  breadcrumbs: [],
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveModule: (state, action: PayloadAction<ModuleName>) => {
      state.activeModule = action.payload;
    },
    setActiveSidebarItem: (state, action: PayloadAction<string>) => {
      state.activeSidebarItem = action.payload;
    },
    toggleExpandedItem: (state, action: PayloadAction<string>) => {
      const itemPath = action.payload;
      const isExpanded = state.expandedItems.includes(itemPath);
      
      if (isExpanded) {
        state.expandedItems = state.expandedItems.filter(path => path !== itemPath);
      } else {
        state.expandedItems.push(itemPath);
      }
    },
    setExpandedItems: (state, action: PayloadAction<string[]>) => {
      state.expandedItems = action.payload;
    },
    setBreadcrumbs: (state, action: PayloadAction<Array<{ label: string; path: string }>>) => {
      state.breadcrumbs = action.payload;
    },
    addBreadcrumb: (state, action: PayloadAction<{ label: string; path: string }>) => {
      state.breadcrumbs.push(action.payload);
    },
    removeBreadcrumb: (state, action: PayloadAction<number>) => {
      state.breadcrumbs = state.breadcrumbs.slice(0, action.payload + 1);
    },
    clearBreadcrumbs: (state) => {
      state.breadcrumbs = [];
    },
    resetNavigation: (state) => {
      state.activeModule = ModuleName.HOME;
      state.activeSidebarItem = '';
      state.expandedItems = [];
      state.breadcrumbs = [];
    },
  },
});

export const {
  setActiveModule,
  setActiveSidebarItem,
  toggleExpandedItem,
  setExpandedItems,
  setBreadcrumbs,
  addBreadcrumb,
  removeBreadcrumb,
  clearBreadcrumbs,
  resetNavigation,
} = navigationSlice.actions;

export default navigationSlice.reducer;

