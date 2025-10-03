import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth-layout">
      <section className='auth-left-section scrollbar-hide-default'>
        <Link href='/' className='auth-logo'>
          <Image src='/assets/icons/logo.svg' alt='Logo' width={140} height={32} className='h-8 w-auto' />
        </Link>

        <div className="flex-1 pb-6 lg:pb-8">
          {children}
        </div>
      </section>

      <section className='auth-right-section'>
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className='auth-blockquote'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae odit ipsa obcaecati deleniti corporis placeat voluptas sunt consequuntur ab autem laboriosam sequi voluptatum repellat adipisci at itaque dolorum, qui pariatur eius? Optio provident minus, veniam nobis vel ab consequuntur sit quaerat officiis sequi quas doloribus pariatur soluta accusamus? Repellat, quo?
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className='auth-testimonial-author '>Jane Cooper</cite>
              <p className='max-md:text-xs text-gray-500'>Retail Investor</p>
            </div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((start) => (
                <Image src='/assets/icons/star.svg' alt='Star' width={20} height={20} key={start} className='w-5 h-5' />
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          <Image src='/assets/images/dashboard.png' alt='dashboard' width={1440} height={1440} className='auth-dashboard-preview absolute top-0' />
        </div>
      </section>
    </main>
  )
}

export default Layout