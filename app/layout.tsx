import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import AuthProvider from './auth/Provider'
import '@radix-ui/themes/styles.css'
import { Container, Theme } from '@radix-ui/themes'
import { Toaster } from 'react-hot-toast'

import NavBar from './NavBar'
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
