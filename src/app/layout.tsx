import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Happy Boyfriend's Day, Rishi ❤️ | Our Little Universe",
  description: "A digital world built with love, memories, laughter, and forever for Rishi Raghav Singh Pathania from Gauravi Ojhha.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">❤️</text></svg>',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#120814',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-romance-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
