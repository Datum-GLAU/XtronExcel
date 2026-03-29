import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  theme: 'dark' | 'light';
  sidebarOpen: boolean;
  user: { name: string; email: string; plan: 'free' | 'pro' } | null;
  generationsUsed: number;
  storageUsed: number;
}

const initialState: AppState = {
  theme: 'dark',
  sidebarOpen: true,
  user: null,
  generationsUsed: 27,
  storageUsed: 3.4,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setUser: (state, action: PayloadAction<AppState['user']>) => {
      state.user = action.payload;
    },
    incrementGenerations: (state) => {
      state.generationsUsed += 1;
    },
  },
});

export const { setTheme, toggleSidebar, setSidebar, setUser, incrementGenerations } = appSlice.actions;
export const store = configureStore({ reducer: { app: appSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;