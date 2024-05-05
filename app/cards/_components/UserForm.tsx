'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast/headless'
import { Button, Select, TextField } from '@radix-ui/themes'
import { Worker } from '@prisma/client'

type Props = {}

const UserForm = ({ worker }: { worker?: Worker}) => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Worker>()

  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      if (worker) {
        await axios.patch('/api/cards/' + worker.id, data)
        toast.success('Задача была обновлена')
      } else {
        await axios.post('/api/cards', data)
        toast.success('Задача была создана')
      }
      router.push('/cards/list')
      router.refresh()
    } catch (error) {
      setSubmitting(false)
      setError('Произошла внезапная ошибка((')
      toast.error('Задача не может быть создана')
    }
  })

  return (
    <form className='max-w-xl flex flex-col gap-2'>
      <TextField.Root  defaultValue={worker?.fullName} placeholder="Имя" {...register('fullName')}/>
      <TextField.Root  defaultValue={worker?.birthDate.toLocaleDateString()} placeholder="Дата" {...register('birthDate')}/>
      <TextField.Root  defaultValue={worker?.phone} placeholder="Телефон" {...register('phone')}/>
      <Select.Root defaultValue='123'>
        <Select.Trigger />
        <Select.Content>
          {worker?.department.map()}
            <Select.Item value="orange">Orange</Select.Item>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="grape" disabled>
              Grape
            </Select.Item>
        </Select.Content>
      </Select.Root>
      <TextField.Root  defaultValue={worker?.department} placeholder="Отделение" {...register('department')}/>
      <TextField.Root  defaultValue={worker?.position} placeholder="Должность" {...register('position')}/>
      <TextField.Root  defaultValue={worker?.ranking} placeholder="Рейтинг" {...register('ranking')}/>
      <Button type='submit'>Отправить</Button>
    </form>
  )
}

export default UserForm