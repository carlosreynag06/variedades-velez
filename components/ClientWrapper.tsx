// components/ClientWrapper.tsx
'use client';

import React from 'react';
import { StateProvider } from '@/app/state-provider';
import { ToastProvider } from '@/components/ToastProvider';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';

/**
 * This client component wraps the main application shell.
 * It sets up all global client-side providers
 * (State, Toasts) so that the Sidebar, Topbar, and
 * page content can all consume them.
 */
export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StateProvider>
      <ToastProvider>
        {/*
          This layout structure was previously (and incorrectly) 
          in app/(app)/layout.tsx. It is now correctly
          placed inside the client-side providers.
        */}
        <div className="flex h-screen w-full bg-[var(--sidebar-bg)]">
          <Sidebar />

          <div className="flex flex-1 flex-col overflow-y-auto">
            <Topbar />
            
            <main className="flex-1 overflow-y-auto bg-[var(--bg-page)] p-6">
              {/* Constrain content width as per master plan */}
              <div className="mx-auto w-full max-w-[1200px]">
                {children}
              </div>
            </main>
          </div>
        </div>
      </ToastProvider>
    </StateProvider>
  );
}