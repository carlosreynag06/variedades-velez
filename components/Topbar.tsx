// components/Topbar.tsx
'use client';

import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { useAppState } from '@/app/state-provider';
import { Button } from '@/components/ui/button'; // Assuming a <Button> component

// --- Main Topbar Component ---

export function Topbar() {
  const { toggleSidebar } = useAppState();

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full flex-shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-header)] px-4 sm:px-6">
      
      {/* 1. Left Side: Mobile Sidebar Toggle */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-[var(--text-secondary)] lg:hidden"
        >
          <span className="sr-only">Toggle sidebar</span>
          <Menu size={20} />
        </Button>
      </div>

      {/* 2. Right Side: Actions (Search, User) */}
      <div className="flex items-center gap-3">
        {/* Quick Search (Icon-based) */}
        <Button
          variant="ghost"
          size="icon"
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <span className="sr-only">Buscar</span>
          <Search size={20} strokeWidth={1.5} />
        </Button>

        {/* User Avatar & Menu */}
        {/* This would be a <DropdownMenu> component from shadcn/ui or similar.
          For now, it's a styled button placeholder.
        */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-050)] text-[var(--primary)]"
          aria-label="Cuenta y ajustes"
        >
          <User size={18} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}