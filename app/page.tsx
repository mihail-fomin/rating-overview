import { Card, Text, Flex } from '@radix-ui/themes'
import prisma from './utlis/connect'
import { Worker } from '@prisma/client'
import Link from 'next/link'

export default async function Home() {
  const workers: Worker[] = await prisma.worker.findMany()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <Flex gap="3">
        {workers.map((worker: Worker) => (
          <Link key={worker.id} href={`/cards/${worker.id}`}>
            <Card className="min-w-[16rem] p-2">
              <Text as="p">{worker.fullName}</Text>
              <Text as="p">{worker.birthDate.toLocaleString()}</Text>
              <Text as="p">{worker.phone}</Text>
              <Text as="p">{worker.department}</Text>
              <Text as="p">{worker.position}</Text>
              <Text as="p">{worker.ranking}</Text>
            </Card>
          </Link>
        ))}
      </Flex>
    </main>
  )
}
