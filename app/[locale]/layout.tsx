import '@radix-ui/themes/styles.css';
import './theme-config.css'
import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme, ThemePanel } from '@radix-ui/themes';
import {notFound} from 'next/navigation';
import NavBar from './NavBar';
import UserPanel from './userPanel';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
const locales = ['en', 'pl'];

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Created by RikoAI',
}

export default function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode,
  params: any
}) {

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body className={inter.variable}>
        <Theme appearance="dark" accentColor="green" grayColor="mauve" radius="small">
          <div className='flex'>
            <NavBar/>
            <div className='absolute right-0'>
              <UserPanel/>
            </div>
            {children}
          </div>
        </Theme>
        </body>
    </html>
  )
}
