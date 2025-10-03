import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { cn } from '../../lib/utils'

const InputField = ({ name, label, placeholder, register, error, validation, value, disabled, type = "text" }: FormInputProps) => {
  return (
    <div className='space-y-2'>
      <Label htmlFor='{name}' className='form-label'>
        {label}
      </Label>
      <Input
        id={name}
        placeholder={placeholder}
        {...register(name, validation)}
        error={error}
        value={value}
        disabled={disabled}
        type={type}
        className={cn('form-input', { 'opacity-50 cursor-not-allowed': disabled })}
        {...register(name, validation)}
      />
      {error && <p className='text-sm text-red-600'>{error.message}</p>}
    </div>
  )
}

export default InputField