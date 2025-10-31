// app/(app)/layout.tsx
import React from 'react';
import { ClientWrapper } from '@/components/ClientWrapper';

/**
 * This is the main layout for the authenticated app.
 * It's a Server Component that renders the ClientWrapper.
 * The ClientWrapper, in turn, contains all providers
 * (like StateProvider) and the application shell (Sidebar, Topbar).
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientWrapper>{children}</ClientWrapper>;
}