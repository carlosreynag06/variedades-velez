// app/(app)/DashboardClient.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button'; // Assuming a button component
import { Calendar, Plus, FileText } from 'lucide-react';
import { PersonalKpiData, WeekFeedItem } from '@/lib/types'; // We will define these types

// Placeholder KPI Card component
const KpiCard = ({ title, value, delta }: { title: string; value: string; delta?: string }) => (
  <div className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-1)] transition-shadow duration-200 hover:shadow-[var(--shadow-2)]">
    <span className="text-sm font-medium text-[var(--text-secondary)]">{title}</span>
    <span className="mt-1 font-sans text-3xl font-bold text-[var(--text-primary)]">
      {value}
    </span>
    {delta && (
      <span className="mt-2 text-sm font-medium text-[var(--success)]">{delta}</span>
    )}
  </div>
);

// Placeholder Weekly Feed component
const WeeklyFeed = ({ items }: { items: WeekFeedItem[] }) => (
  <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-1)]">
    <h3 className="mb-4 font-sans text-lg font-semibold text-[var(--text-primary)]">
      Esta Semana
    </h3>
    <div className="space-y-4">
      {items.length === 0 && (
        <p className="text-[var(--text-secondary)]">
          No hay eventos o pagos programados para esta semana.
        </p>
      )}
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between">
          <div>
            <p className="font-medium text-[var(--text-primary)]">{item.title}</p>
            <p className="text-sm text-[var(--text-secondary)]">{item.date}</p>
          </div>
          {item.type === 'pago' ? (
            <span className="text-base font-medium text-[var(--danger)]">
              ${item.amount?.toFixed(2)}
            </span>
          ) : (
            <span className="rounded-full bg-[var(--primary-050)] px-3 py-0.5 text-sm font-medium text-[var(--primary)]">
              {item.type}
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);

interface DashboardClientProps {
  kpiData: PersonalKpiData;
  weekFeedItems: WeekFeedItem[];
}

export default function DashboardClient({
  kpiData,
  weekFeedItems,
}: DashboardClientProps) {
  // Helper to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-sans text-[28px] font-bold tracking-[-0.01em] text-[var(--text-primary)]">
          Dashboard Personal
        </h1>
        {/* Atajos (Shortcuts) */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Plus size={16} className="mr-2" />
            Añadir entrada
          </Button>
          <Button variant="outline">
            <FileText size={16} className="mr-2" />
            Nueva regla
          </Button>
          <Button variant="outline">
            <Calendar size={16} className="mr-2" />
            Ver calendario
          </Button>
        </div>
      </div>
      
      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Disponible del Mes (USD)"
          value={formatCurrency(kpiData.disponibleMes)}
        />
        <KpiCard
          title="Gasto Planificado (USD)"
          value={formatCurrency(kpiData.gastoPlanificado)}
        />
        <KpiCard
          title="Gasto Real (USD)"
          value={formatCurrency(kpiData.gastoReal)}
        />
        <KpiCard
          title="Diferencia (USD)"
          value={formatCurrency(kpiData.diferencia)}
          delta={kpiData.diferencia > 0 ? "Ahorro" : "Sobre-gasto"}
        />
      </div>

      {/* Feed "Esta Semana" */}
      <div>
        <WeeklyFeed items={weekFeedItems} />
      </div>
    </div>
  );
}