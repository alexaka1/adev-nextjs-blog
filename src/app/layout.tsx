import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
// import Footer from '@/components/footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Alex Martossy',
  description: 'Personal website of Alex Martossy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-svh flex-col antialiased`}
      >
        {/*<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>*/}
        <Header />
        <main className="container mx-auto flex-grow px-4 py-8">
          {children}
        </main>
        <Footer />
        {/*</ThemeProvider>*/}
      </body>
    </html>
  );
}
