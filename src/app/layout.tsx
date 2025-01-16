import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KRI Dashboard',
  description: 'Analytics dashboard for KRI data visualization',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}