import prisma from './utlis/connect'
import Link from 'next/link'
import classNames from 'classnames'

import { Card, Text, Flex } from '@radix-ui/themes'
import { Worker } from '@prisma/client'
import CreatePersonButton from './components/CreatePersonButton'
import RatingStars from './components/RatingStars'
import { getHighestRank } from './utlis'

export default async function Home() {
  const workers: Worker[] = await prisma.worker.findMany({
    orderBy: {
      ranking: 'desc',
    },
  })
  const rankings = workers.map((worker) => worker.ranking)

  const highestRank = getHighestRank(rankings)

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <CreatePersonButton />

      <Flex gap="3" mt="3" wrap="wrap" justify="center">
        {workers.map((worker: Worker) => (
          <Link key={worker.id} href={`/cards/${worker.id}`}>
            <Card
              className={classNames('min-w-[16rem] p-2 transition hover:bg-slate-900', {
                'shadow-lg border-2': worker.ranking === highestRank,
              })}
            >
              <Text as="p">{worker.fullName}</Text>
              <RatingStars rating={worker.ranking} />
            </Card>
          </Link>
        ))}
      </Flex>
    </main>
  )
}
