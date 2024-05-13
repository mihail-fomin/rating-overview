import React, { cache } from 'react'
import prisma from '@/app/utlis/connect'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import UserForm from '../../_components/UserForm'
import authOptions from '@/app/auth/authOptions'

type Props = { params: { id: string } }

const fetchWorker = cache((workerId: string) => prisma.worker.findUnique({ where: { id: workerId } }))

const EditWorkerPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }

  const worker = await prisma.worker.findUnique({ where: { id: params.id } })

  return <UserForm worker={worker || undefined} />
}

export async function generateMetadata({ params }: Props) {
  const worker = await fetchWorker(params.id)

  return {
    title: 'Редактировать ' + worker?.fullName,
    description: 'Редактировать пользователя' + worker?.id,
  }
}

export default EditWorkerPage
