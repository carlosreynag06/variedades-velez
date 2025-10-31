// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import clsx from 'clsx';
import './globals.css';
import { ToastProvider } from '@/components/ToastProvider';

// Setup fonts based on the master plan
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Suite Carol Vélez',
  description: 'Gestión financiera personal y de negocios.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={clsx(
          inter.variable,
          plusJakartaSans.variable,
          'font-sans' // 'font-sans' will default to --font-inter from globals.css
        )}
        suppressHydrationWarning
      >
        {/* StateProvider can be wrapped here if/when needed */}
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}