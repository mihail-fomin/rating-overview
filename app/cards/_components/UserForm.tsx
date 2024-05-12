'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast/headless'
import { Button, Select, TextField } from '@radix-ui/themes'
import { Worker } from '@prisma/client'
import CustomDatePicker from './DatePicker'

interface DepartmentSelectProps {
  name: string
  control: any
  defaultValue: string
}

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      if (worker) {
        await axios.patch('/api/cards/' + worker.id, data)
        toast.success('Карточка была обновлена')
      } else {
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
    <form className="max-w-xl flex flex-col gap-2" onSubmit={onSubmit}>
      <TextField.Root defaultValue={worker?.fullName} placeholder="Имя" {...register('fullName')} />
      <CustomDatePicker control={control} />

      <TextField.Root defaultValue={worker?.phone} placeholder="Телефон" {...register('phone')} />

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

      <TextField.Root defaultValue={worker?.ranking} placeholder="Рейтинг" {...register('ranking')} />
      <Button type="submit">Отправить</Button>
    </form>
  )
}

export default UserForm

interface SelectFieldProps {
  name: string
  placeholder: string
  control: any
  defaultValue: string | undefined
  options: { label: string; value: string }[]
}

const SelectField = React.forwardRef<HTMLDivElement, SelectFieldProps>(
  ({ name, placeholder, control, defaultValue, options }, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          // @ts-ignore
          <Select.Root {...field} onValueChange={field.onChange} ref={ref}>
            <Select.Trigger placeholder={placeholder} />
            <Select.Content>
              {options.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        )}
      />
    )
  },
)
