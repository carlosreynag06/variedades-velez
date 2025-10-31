// app/(app)/actions.ts
'use server';

import { PersonalKpiData, WeekFeedItem } from '@/lib/types';

// Placeholder function to simulate fetching Personal KPI data
export async function getPersonalKpiData(): Promise<PersonalKpiData | null> {
  // In a real app, this would query Supabase
  console.log('Fetching Personal KPI data...');
  
  // Mock data based on the plan
  const mockData: PersonalKpiData = {
    disponibleMes: 1450.00,
    gastoPlanificado: 3200.00,
    gastoReal: 2980.50,
    diferencia: 219.50,
  };
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockData;
  // return null; // To test empty state
}

// Placeholder function to simulate fetching the "Esta Semana" feed
export async function getPersonalWeekFeed(): Promise<WeekFeedItem[] | null> {
  // In a real app, this queries calendar events and budget items
  console.log('Fetching Personal Week Feed data...');

  // Mock data based on the plan
  const mockData: WeekFeedItem[] = [
    { id: '1', title: 'Pago Electricidad', date: '2 Nov - Vencimiento', type: 'pago', amount: 120.00 },
    { id: '2', title: 'Reunión Cliente', date: '3 Nov - 10:00 AM', type: 'evento' },
    { id: '3', title: 'Supermercado', date: '4 Nov - Planificado', type: 'pago', amount: 250.00 },
  ];

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));

  return mockData;
  // return []; // To test empty state
}