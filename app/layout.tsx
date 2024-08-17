import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { PropsWithChildren } from 'react';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'Ammar AI',
  description: 'The ultimate coding solution for Conrad Labs.',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang='en'>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
