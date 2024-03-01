import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

// Font files can be colocated inside of `pages`
const fixel = localFont({ src: './FixelVariable.ttf' });
import './globals.css';

export const metadata: Metadata = {
  title: 'Shaders for the web',
  description: "Course projects from SuperHi's Shaders for the web course",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fixel.className} bg-white`}>{children}</body>
    </html>
  );
}
