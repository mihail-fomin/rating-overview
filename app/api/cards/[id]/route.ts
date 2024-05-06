import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/utlis/connect'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const { fullName, birthDate, phone, department, position, ranking } = await req.json()

  const worker = await prisma.worker.findUnique({ where: { id: params.id } })

  if (!worker) {
    return NextResponse.json({ error: 'Worker not found' }, { status: 404 })
  }

  const updatedWorker = await prisma.worker.update({
    where: { id: params.id },
    data: { fullName, birthDate, phone, department, position, ranking: Number(ranking) },
  })

  return NextResponse.json(updatedWorker)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({}, { status: 401 })

    const worker = await prisma.worker.findUnique({ where: { id: params.id } })
  
    if (!worker) {
      return NextResponse.json({ error: 'Worker not found' }, { status: 404 })
    }
  
    await prisma.worker.delete({
        where: { id: worker.id },
      })
  
    return NextResponse.json({})
  }