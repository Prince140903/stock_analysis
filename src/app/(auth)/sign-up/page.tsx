'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../../components/ui/button'
import InputField from '../../../components/forms/InputField'

const SignUp = () => {

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<SignUpFormData>({ defaultValues: { fullName: '', email: '', password: '', country: 'US', investmentGoals: 'Growth', riskTolerance: 'Medium', preferredIndustry: 'Technology' }, mode: 'onBlur' })
  const onSubmit = async (data: SignUpFormData) => {
    try {
      // Handle form submission logic here
      console.log('Form Data:', data)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <>
      <h1 className='form-title'>Sign Up & Personalize</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        {/* Form fields go here */}
        <InputField name="fullName" label="Full Name" placeholder="Enter your full name" register={register} error={errors.fullName} validation={{ required: 'Full Name is required', minLength: 2 }} />

        <Button className='w-full yellow-btn mt-5' type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Start your Investing Journey'}

        </Button>
      </form>
    </>
  )
}

export default SignUp