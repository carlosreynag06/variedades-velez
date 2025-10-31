// app/state-provider.tsx
'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';

// Define the shape of the context state
interface AppState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  // We can add more global state here later:
  // e.g., preferences, etc.
}

// Create the context with a default value (will be overridden by Provider)
const AppStateContext = createContext<AppState | undefined>(undefined);

/**
 * Provides global application state to all child components.
 * Manages UI state like sidebar visibility.
 */
export function StateProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Memoize the context value to prevent unnecessary re-renders
  // of consuming components when the state hasn't changed.
  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
    }),
    [isSidebarOpen]
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

/**
 * Custom hook to easily consume the AppStateContext.
 * Throws an error if used outside of a StateProvider.
 */
export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
}