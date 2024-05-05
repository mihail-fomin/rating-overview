import React from 'react'
import UserForm from '../../_components/UserForm'
import prisma from '@/app/utlis/connect'



const EditWorkerPage = async ({ params }: {params: {id: string}}) => {
  const worker = await prisma.worker.findUnique({where: { id: params.id}})
  
  return <UserForm worker={worker || undefined}/>}

export default EditWorkerPage