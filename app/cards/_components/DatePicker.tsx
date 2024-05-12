import React from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form';

interface Props {
  control: Control
}

const CustomDatePicker = ({ control }: Props) => {
  return (
    <Controller
      control={control}
      name='birthDate'
      render={({ field }) => (
        <DatePicker
        selected={field.value ? field.value : new Date()}
        onChange={(date) => field.onChange(date)}
        dateFormat='dd.MM.yyyy'
        className='date-picker'
        showMonthDropdown
        showYearDropdown
        minDate={new Date(1900, 0 ,1)}
        maxDate={new Date()}
        />
      )}
    />
  );
};

export default CustomDatePicker;
