'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button, Callout } from '@radix-ui/themes'
import CustomDatePicker from './DatePicker'

import { Worker } from '@prisma/client'
import { SelectField } from './SelectField'
import Spinner from '@/app/components/Spinner'
import FullNameInput from './FullNameInput'
import PhoneInput from './PhoneInput'
import RatingStars from './RatingStars'

const departments = [
  { label: 'Клиентский', value: 'CLIENT' },
  { label: 'Продажи', value: 'SALES' },
  { label: 'Разработка', value: 'DEVELOPMENT' },
]

const positions = [
  { label: 'Сотрудник', value: 'WORKER' },
  { label: 'Руководитель', value: 'LEADER' },
]

const UserForm = ({ worker }: { worker?: Worker }) => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Worker>()

  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const [rating, setRating] = useState(worker?.ranking || 0)

  const onSubmit = handleSubmit(async (data) => {
    try {
      data.ranking = rating
      setSubmitting(true)
      if (worker) {
        await axios.patch('/api/cards/' + worker.id, data)
        toast.success('Карточка была обновлена')
      } else {
        if (!data.birthDate) {
          data.birthDate = new Date()
        }
        await axios.post('/api/cards', data)
        toast.success('Карточка была создана')
      }
      router.push('/')
      router.refresh()
    } catch (error) {
      setSubmitting(false)
      setError('Произошла внезапная ошибка((')
      toast.error('Карточка не может быть создана')
    }
  })

  return (
    <div className="max-w-xl mx-auto px-4">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="max-w-xl flex flex-col gap-2" onSubmit={onSubmit}>
        <FullNameInput fullName={worker?.fullName} errors={errors} register={register} />
        <CustomDatePicker control={control} />
        <PhoneInput phoneNumber={worker?.phone} errors={errors} control={control} register={register} />
        <SelectField
          name="department"
          placeholder="Отдел"
          control={control}
          defaultValue={worker?.department}
          options={departments}
        />
        <SelectField
          name="position"
          placeholder="Позиция"
          control={control}
          defaultValue={worker?.position}
          options={positions}
        />
        <RatingStars rating={rating} onChange={setRating} />
        <Button type="submit" disabled={isSubmitting}>
          {worker ? 'Обновить карточку' : 'Создать карточку'} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default UserForm
