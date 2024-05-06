import prisma from '@/app/utlis/connect'
import React from 'react'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import { Text, Box, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import DeleteUserButton from '../_components/DeleteUserButton'

type Props = { params: { id: string } }

const fetchWorker = cache((workerId: string) => prisma.worker.findUnique({ where: { id: workerId } }))

const WorkerDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)

  const worker = await fetchWorker(params.id)
  if (!worker) notFound()

  return (
    <>
      {session && (
        <Box>
          <Flex gap="4" mt="2">
            <Link href={`/cards/edit/${worker.id}`}>Изменить</Link>
            <DeleteUserButton workerId={worker.id}/>
          </Flex>
        </Box>
      )}
      <Text as="p">{worker.fullName}</Text>
    </>
  )
}

export async function generateMetadata({ params }: Props) {
  const worker = await fetchWorker(params.id)

  return {
    title: worker?.fullName,
    description: 'Данные рабочего ' + worker?.id,
  }
}

export default WorkerDetailPage
