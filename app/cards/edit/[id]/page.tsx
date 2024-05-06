import React from 'react'
import UserForm from '../../_components/UserForm'
import prisma from '@/app/utlis/connect'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import { redirect } from 'next/navigation'

const EditWorkerPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }

  const worker = await prisma.worker.findUnique({ where: { id: params.id } })

  return <UserForm worker={worker || undefined} />
}

export default EditWorkerPage
