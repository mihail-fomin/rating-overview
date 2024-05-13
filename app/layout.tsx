import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import NextTopLoader from 'nextjs-toploader'

import { Container, Theme } from '@radix-ui/themes'
import AuthProvider from './auth/Provider'
import NavBar from './NavBar'
import './globals.css'
import '@radix-ui/themes/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Рейтинг пользователей',
  description: 'Система рейтинга пользователей',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <NextTopLoader height={3} color="#3e63dd" easing="cubic-bezier(0.53, 0.21, 0.1)" showSpinner={true} />
        <AuthProvider>
          <Toaster />
          <Theme accentColor="indigo" appearance="dark">
            <NavBar />
            <Container size="3">{children}</Container>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  )
}
