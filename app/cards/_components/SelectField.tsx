'use client'

import React from 'react'
import { Controller } from 'react-hook-form'
import { Select } from '@radix-ui/themes'

interface SelectFieldProps {
  name: string
  placeholder: string
  control: any
  defaultValue: string | undefined
  options: { label: string; value: string }[]
}
export const SelectField = React.forwardRef<HTMLDivElement, SelectFieldProps>(
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

SelectField.displayName = 'SelectField'
