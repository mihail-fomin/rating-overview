import { Card, Text, Flex } from '@radix-ui/themes'
import prisma from './utlis/connect'
import Worker from '@prisma/client'

export default async function Home() {
  const workers: Worker[] = await prisma.worker.findMany()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <Flex gap="3">
        {workers.map((worker: Worker) => (
          <Card key={worker.id}>
            <Text as="p">{worker.fullName}</Text>
            <Text as="p">{worker.birthDate.toDateString()}</Text>
            <Text as="p">{worker.phone}</Text>
          </Card>
        ))}
      </Flex>
    </main>
  )
}
