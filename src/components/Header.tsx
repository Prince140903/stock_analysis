import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'
import UserDropdown from './UserDropdown'

const Header = () => {
  return (
    <header className='header sticky top-0'>
      <div className="container header-wrapper">
        <Link href="/" className="header-title">
          <Image src="/assets/icons/logo.svg" alt="Logo" width={140} height={32} className='h-8 cursor-pointer w-auto' />
        </Link>
        <nav className='hidden sm:block'>
          {/* NavItems */}
          <NavItems />
        </nav>
        {/* UserDropdown */}
        <UserDropdown />
      </div>
    </header>
  )
}

export default Header