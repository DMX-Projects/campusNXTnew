import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import navigationReducer from './slices/navigationSlice';
// Import API services
import { baseApi } from './api/baseApi';
import { studentApi } from './api/studentApi';
import { facultyApi } from './api/facultyApi';
import { academicsApi } from './api/academicsApi';
import { hostelApi } from './api/hostelApi';
import { libraryApi } from './api/libraryApi';
import { placementApi } from './api/placementApi';
import { examinationApi } from './api/examinationApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    navigation: navigationReducer,
    // Add RTK Query reducers
    [baseApi.reducerPath]: baseApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [facultyApi.reducerPath]: facultyApi.reducer,
    [academicsApi.reducerPath]: academicsApi.reducer,
    [hostelApi.reducerPath]: hostelApi.reducer,
    [libraryApi.reducerPath]: libraryApi.reducer,
    [placementApi.reducerPath]: placementApi.reducer,
    [examinationApi.reducerPath]: examinationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(
      baseApi.middleware,
      studentApi.middleware,
      facultyApi.middleware,
      academicsApi.middleware,
      hostelApi.middleware,
      libraryApi.middleware,
      placementApi.middleware,
      examinationApi.middleware
    ),
});

// Enable refetchOnFocus / refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;