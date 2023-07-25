import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav>
        <ul className='flex h-16 items-center px-3 gap-6 bg-blue-200'>
            <li className='flex-1 text-3xl font-bold'><Link href={`/`}>Ankur</Link></li>
            <li className='hover:text-orange-400 transition-all'><Link href={`/`}>Home</Link></li>
            <li className='hover:text-orange-400 transition-all'><Link href={`signup`}>Signup</Link></li>
            <li className='hover:text-orange-400 transition-all'><Link href={`login`}>Login</Link></li>
            <li className='hover:text-orange-400 transition-all'><Link href={`profile`}>Profile</Link></li>
        </ul>
    </nav>
  )
}
