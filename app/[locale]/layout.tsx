import '@radix-ui/themes/styles.css';
import './theme-config.css'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme, ThemePanel } from '@radix-ui/themes';
import {notFound} from 'next/navigation';
import NavBar from './NavBar';
import UserPanel from './userPanel';
import AuthProvider from '../auth/Provider';
import { getServerSession } from "next-auth";
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation'
import SigninPage from './signin/page';
import { useTranslations } from 'next-intl';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
const locales = ['en', 'pl'];

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Created by RikoAI',
}

export default async function RootLayout({
  children,
  params: {locale},
}: {
  children: React.ReactNode,
  params: any
}) {
  const authData = await getServerSession(options);
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  return (
    <html lang={locale}>
      <body className={inter.variable}>
        <AuthProvider>
        <Theme appearance="dark" accentColor="crimson" grayColor="mauve" radius="small">
            {authData?
            <div className='flex'>
              <NavBar/>
              <div className='absolute right-0'>
                <UserPanel/>
              </div>
              {children}
            </div>:
            <SigninPage/>}
            {/* <ThemePanel/> */}
          </Theme>
        </AuthProvider>
        </body>
    </html>
  )
}


