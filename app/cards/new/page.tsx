import React from 'react'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import authOptions from '@/app/auth/authOptions'
import UserForm from '../_components/UserForm'

const NewWorkerPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }

  return <UserForm />
}

export default NewWorkerPage

export const metadata: Metadata = {
  title: 'Добавить пользователя',
  description: 'Добавить нового пользователя',
}
