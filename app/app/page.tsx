// app/(app)/page.tsx
import * as React from 'react';
import { getPersonalKpiData, getPersonalWeekFeed } from './actions';
import DashboardClient from './DashboardClient';
import { PersonalKpiData, WeekFeedItem } from '@/lib/types'; // We will define these types later

export default async function PersonalDashboardServerPage() {
  // Fetch data in parallel
  const kpiDataPromise = getPersonalKpiData();
  const weekFeedPromise = getPersonalWeekFeed();

  const [kpiData, weekFeedData] = await Promise.all([
    kpiDataPromise,
    weekFeedPromise,
  ]);

  // Ensure safe data for the client component
  const safeKpiData: PersonalKpiData = kpiData ?? {
    disponibleMes: 0,
    gastoPlanificado: 0,
    gastoReal: 0,
    diferencia: 0,
  };

  const safeWeekFeed: WeekFeedItem[] = Array.isArray(weekFeedData)
    ? weekFeedData
    : [];

  return (
    <DashboardClient kpiData={safeKpiData} weekFeedItems={safeWeekFeed} />
  );
}