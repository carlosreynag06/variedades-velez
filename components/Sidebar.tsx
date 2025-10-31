// components/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  LayoutDashboard,
  PiggyBank,
  Calendar,
  NotebookText,
  LayoutGrid,
  ShoppingCart,
  Box,
  ArrowDownToLine,
  BarChart3,
  Settings,
} from 'lucide-react';

// --- Navigation Data ---

// Combined navigation based on Master Plan sections 2 & 6
// and the new single-user architecture.

const personalNavLinks = [
  {
    href: '/',
    label: 'Dashboard Personal',
    icon: LayoutDashboard,
  },
  {
    href: '/personal/presupuesto',
    label: 'Presupuesto',
    icon: PiggyBank,
  },
  {
    href: '/personal/calendario',
    label: 'Calendario',
    icon: Calendar,
  },
  {
    href: '/personal/notas',
    label: 'Notas Personales',
    icon: NotebookText,
  },
];

const vvNavLinks = [
  {
    href: '/vv',
    label: 'Dashboard Negocio',
    icon: LayoutGrid,
  },
  {
    href: '/vv/compras',
    label: 'Compras',
    icon: ShoppingCart,
    count: 3, // Example count per plan [cite: 64]
  },
  {
    href: '/vv/cajas',
    label: 'Cajas & Envíos',
    icon: Box,
  },
  {
    href: '/vv/pagos',
    label: 'Pagos Recibidos',
    icon: ArrowDownToLine,
  },
  {
    href: '/vv/reportes',
    label: 'Reportes',
    icon: BarChart3,
  },
  {
    href: '/vv/notas',
    label: 'Notas Negocio',
    icon: NotebookText,
  },
  {
    href: '/vv/ajustes',
    label: 'Ajustes',
    icon: Settings,
  },
];

// --- Main Sidebar Component ---

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-r-[var(--sidebar-bg)] bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] lg:flex">
      {/* 1. Logo/Header */}
      <div className="flex h-16 items-center px-6">
        <Link
          href="/"
          className="font-sans text-xl font-bold text-white"
        >
          Suite Carol Vélez
        </Link>
      </div>

      {/* 2. Navigation */}
      <nav className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {/* Personal Group */}
        <div className="space-y-1">
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--sidebar-muted)]">
            Personal
          </h3>
          {personalNavLinks.map((link) => (
            <SidebarLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
            />
          ))}
        </div>

        {/* Variedades Vélez (Negocio) Group */}
        <div className="space-y-1">
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--sidebar-muted)]">
            Negocio
          </h3>
          {vvNavLinks.map((link) => (
            <SidebarLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              count={link.count}
            />
          ))}
        </div>
      </nav>

      {/* 3. Footer (Optional - can add user profile here later) */}
      <div className="h-16 border-t border-t-[var(--sidebar-hover)]">
        {/* User profile section */}
      </div>
    </aside>
  );
}

// --- Internal Sub-components ---

/**
 * A reusable component for navigation links
 */
function SidebarLink({
  href,
  label,
  icon: Icon,
  count,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  count?: number;
}) {
  const pathname = usePathname();
  const isActive =
    href === '/' ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={clsx(
        'group flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-colors',
        isActive
          ? 'bg-[var(--sidebar-active)] text-white'
          : 'text-[var(--sidebar-text)] hover:bg-[var(--sidebar-hover)] hover:text-white'
      )}
    >
      <Icon
        className={clsx(
          'h-5 w-5 flex-shrink-0',
          isActive
            ? 'text-white'
            : 'text-[var(--sidebar-muted)] group-hover:text-white'
        )}
        strokeWidth={1.5} // Per plan 
      />
      <span className="flex-1">{label}</span>
      {count && count > 0 && <SidebarBadge count={count} />}
    </Link>
  );
}

/**
 * A visual badge for counts (per plan [cite: 64])
 */
function SidebarBadge({ count }: { count: number }) {
  return (
    <span className="ml-auto rounded-full bg-[var(--primary)] px-2 py-0.5 text-xs font-semibold text-white">
      {count}
    </span>
  );
}