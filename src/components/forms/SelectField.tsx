import React from 'react'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '../ui/select'
import { Controller } from 'react-hook-form'

const SelectField = ({ name, label, options, control, error, validation, placeholder }: SelectFieldProps) => {
    return (
        <div className='space-y-2'>
            <Label htmlFor={name} className='form-label'>
                {label}
            </Label>
            <Controller
                name={name}
                control={control}
                rules={validation}
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}> 
                        <SelectTrigger className='select-trigger'>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className='bg-gray-800 border-gray-600 text-white'>
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value} className='focus:bg-gray-600 focus:text-white'>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        {error && <p className='text-sm text-red-600 mt-1'>{error.message}</p>}
                    </Select>
                )}
            />
            {error && <p className='text-sm text-red-600'>{error.message}</p>}
        </div>
    )
}

export default SelectField