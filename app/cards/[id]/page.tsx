import React, { cache } from 'react'
import prisma from '@/app/utlis/connect'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

import authOptions from '@/app/auth/authOptions'
import { Text, Box, Flex, Button, Card } from '@radix-ui/themes'
import DeleteUserButton from '../_components/DeleteUserButton'
import RatingStars from '@/app/components/RatingStars'
import { getDepartmentLabel, getPositionsLabel } from '@/app/utlis/staticData'

type Props = { params: { id: string } }

const fetchWorker = cache((workerId: string) => prisma.worker.findUnique({ where: { id: workerId } }))

const WorkerDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)

  const worker = await fetchWorker(params.id)
  if (!worker) notFound()

  return (
    <>
      {session && (
        <Box className="max-w-xl mx-auto">
          <Flex gap="4" mt="2">
            <Link href={`/cards/edit/${worker.id}`}>
              <Button>Редактировать</Button>
            </Link>
            <DeleteUserButton workerId={worker.id} />
          </Flex>
        </Box>
      )}
      <Card mt="3" className="max-w-xl mx-auto">
        <Text as="p" mt="3">
          {worker.fullName}
        </Text>
        <Text as="p">{worker.birthDate.toLocaleDateString('ru-RU')}</Text>
        <Text as="p">{worker.phone}</Text>
        <Text as="p">{getDepartmentLabel(worker.department)}</Text>
        <Text as="p">{getPositionsLabel(worker.position)}</Text>
        <RatingStars rating={worker.ranking} />
      </Card>
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
