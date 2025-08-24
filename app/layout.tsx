import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VISIONX.AI 2025 - Premium AI Festival',
  description: 'Step into the Future of Artificial Intelligence - Aditya Degree College AI Department',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}