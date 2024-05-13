import React from 'react'
import { TextField } from '@radix-ui/themes'
import ErrorMessage from './ErrorMessage'
import { FieldErrors } from 'react-hook-form'
import { Worker } from '@prisma/client'

type Props = {
  fullName?: string
  errors: FieldErrors<Worker>
  register: any
}

const FullNameInput = ({ fullName, errors, register }: Props) => {
  return (
    <>
      <TextField.Root
        defaultValue={fullName}
        placeholder="Имя"
        color={errors.fullName ? 'red' : ''}
        {...register('fullName', {
          required: 'Поле обязательно для заполнения',
          maxLength: { value: 30, message: 'Максимальная длина - 30 символов' },
          pattern: {
            value: /^([А-Яа-яЁё]+\s)*[А-Яа-яЁё]+\s*$/,
            message: 'Допустимы только кириллические символы',
          },
        })}
      />
      <ErrorMessage>{errors.fullName?.message}</ErrorMessage>
    </>
  )
}

export default FullNameInput
