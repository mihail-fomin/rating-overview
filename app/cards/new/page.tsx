import React from 'react'
import UserForm from '../_components/UserForm'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import { redirect } from 'next/navigation'

const NewWorkerPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }

  return <UserForm />
}

export default NewWorkerPage
