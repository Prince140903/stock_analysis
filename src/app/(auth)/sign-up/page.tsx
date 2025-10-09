'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import InputField from '@/components/forms/InputField'
import SelectField from '@/components/forms/SelectField'
import {CountrySelectField} from '@/components/forms/CountrySelectField'
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from '@/lib/constants'
import FooterLink from '@/components/forms/FooterLink'
import { signUpWithEmail } from '../../../lib/actions/auth.actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const SignUp = () => {
  const router = useRouter();

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<SignUpFormData>(
    {
      defaultValues:
        { fullName: '', email: '', password: '', country: 'US', investmentGoals: 'Growth', riskTolerance: 'Medium', preferredIndustry: 'Technology' }
      , mode: 'onBlur'
    }
  )
  
  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signUpWithEmail(data);
      if(result.success) router.push('/')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error("Failed to create account. Please try again.", {
        description: (error as Error).message
      })
    }
  }

  return (
    <>
      <h1 className='form-title'>Sign Up & Personalize</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        {/* Form fields go here */}
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          register={register}
          error={errors.fullName}
          validation={{ required: 'Full Name is required', minLength: 2 }}
        />
        <InputField
          name="email"
          label="Email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          validation={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Email is invalid' } }}
        />
        <InputField
          name="password"
          label="Password"
          placeholder="Enter your password"
          type='password'
          register={register}
          error={errors.password}
          validation={{ required: 'Password is required', minLength: 6 }}
        />

        <CountrySelectField
          name="country"
          label="Country"
          control={control}
          error={errors.country}
          required
        />

        <SelectField
          name='investmentGoals'
          label='Investment Goals'
          placeholder='Select your investment goals'
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          validation={{ required: 'Investment Goals is required' }}
        />
        <SelectField
          name='riskTolerance'
          label='Risk Tolerance'
          placeholder='Select your risk tolerance'
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          validation={{ required: 'Risk Tolerance is required' }}
        />
        <SelectField
          name='preferredIndustry'
          label='Preferred Industry'
          placeholder='Select your preferred industry'
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          validation={{ required: 'Preferred Industry is required' }}
        />

        <Button className='w-full yellow-btn mt-5' type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Start your Investing Journey'}

        </Button>

        <FooterLink text='Already have an account?' linkText='Create an account' href='/sign-in' />
      </form>
    </>
  )
}

export default SignUp