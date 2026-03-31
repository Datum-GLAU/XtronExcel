import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  theme: 'dark' | 'light'
  sidebarOpen: boolean
  user: { name: string; email: string; plan: 'free' | 'pro' } | null
  generationsUsed: number
  storageUsed: number
}

const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: 'dark',
    sidebarOpen: true,
    user: null,
    generationsUsed: 27,
    storageUsed: 3.4,
  } as AppState,
  reducers: {
    setTheme: (s, a: PayloadAction<'dark'|'light'>) => { s.theme = a.payload },
    toggleSidebar: (s) => { s.sidebarOpen = !s.sidebarOpen },
    setSidebar: (s, a: PayloadAction<boolean>) => { s.sidebarOpen = a.payload },
    setUser: (s, a: PayloadAction<AppState['user']>) => { s.user = a.payload },
    incrementGenerations: (s) => { s.generationsUsed += 1 },
  }
})

export const { setTheme, toggleSidebar, setSidebar, setUser, incrementGenerations } = appSlice.actions
export const store = configureStore({ reducer: { app: appSlice.reducer } })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch