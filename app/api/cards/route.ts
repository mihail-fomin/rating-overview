import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/utlis/connect'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'

export async function POST(req: NextRequest) {

    const { fullName, birthDate,
        phone,
        department,
        position,
        ranking,} = await req.json()

  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const newWorker = await prisma.worker.create({
    data: { fullName, birthDate,
        phone,
        department,
        position,
        ranking: Number(ranking),
    },
  })

  return NextResponse.json(newWorker, { status: 201 })
}