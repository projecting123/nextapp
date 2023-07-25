"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'

export default function SignupPage() {
    const[data, setData] = useState({})
    const[isLoading, setLoading] = useState(false)
    const btnHandler = async () => {
      setLoading(true)
      try{
        await axios.post('/api/signup', data)
        setLoading(false)
        alert('Registered successfully.')
      }
      catch(err){
        setLoading(false)
        console.log(err)
      }
    }

    const inputHandler = ({target}) => {
        setData(prev => ({...prev, [target.name] : target.value}))
    }
  return (
    <div className='flex flex-col justify-center h-screen items-center gap-10 font-bold'>
      <h1 className='text-4xl'>Sign up here</h1>
      <form action="" className='flex flex-col p-6 rounded-xl bg-teal-200 gap-2 border border-t-8 border-emerald-400'>
        <label htmlFor="name">Name:</label>
        <input name='name' onChange={inputHandler} type="text" placeholder='Enter your name' className='px-2 rounded py-1 outline-none focus:ring-2 focus:shadow'/>
        <label htmlFor="email">Email:</label>
        <input name='email' onChange={inputHandler} type="email" placeholder='Enter your email' className='px-2 rounded py-1 outline-none focus:ring-2 focus:shadow'/>
        <label htmlFor="password">Password:</label>
        <input name='password' onChange={inputHandler} type="password" placeholder='Create a password' className='px-2 rounded py-1 outline-none focus:ring-2 focus:shadow'/>
        <label htmlFor="name">Confirm Password:</label>
        <input name='cpass' onChange={inputHandler} type="password" placeholder='Confirm your password' className='px-2 rounded py-1 outline-none focus:ring-2 focus:shadow'/>
        <button disabled={isLoading === true} onClick={btnHandler} type='button' className='px-2 py-1 bg-sky-800 self-center text-white rounded hover:bg-sky-700 transform my-3 transition-all active:scale-95'>{isLoading === true ? "Creating account" : "Create account"}</button>
        <div className='text-center'>
          <div className='flex justify-center items-center gap-2'>
           <p className='h-0.5 bg-black w-16'></p> OR <p className='h-0.5 bg-black w-16'></p>
          </div>
          <span className='font-mono'>Already a user ?</span> <Link href={'login'} className='font-light hover:underline hover:text-red-600 transition'>Log in</Link>
        </div>
      </form>
    </div>
  )
}
