import React from 'react'
import { TextField } from '@radix-ui/themes'
import ErrorMessage from './ErrorMessage'
import { Controller, FieldErrors } from 'react-hook-form'
import { Worker } from '@prisma/client'
import InputMask from 'react-input-mask'

type Props = {
  phoneNumber?: string
  errors: FieldErrors<Worker>
  control: any
  register: any
}

const phoneRegEx = /^((\+7)[\s-]?)?(\(?\d{3}\)?[\s-]?)?[\d\- ]{7,10}$/

const PhoneInput = ({ phoneNumber, errors, control }: Props) => {
  return (
    <>
      <Controller
        name="phone"
        control={control}
        defaultValue={phoneNumber}
        rules={{
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: phoneRegEx,
            message: 'Некорректный формат номера телефона',
          },
        }}
        render={({ field }) => (
          <InputMask mask="+7 (999) 999-99-99" value={field.value} onChange={field.onChange}>
            <TextField.Root />
          </InputMask>
        )}
      />
      <ErrorMessage>{errors.phone?.message}</ErrorMessage>
    </>
  )
}

export default PhoneInput
