"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const[data, setData] = useState({})
  const[isLoading, setLoading] = useState(false)
  const router = useRouter()
  
  const btnHandler = async () => {
    setLoading(true)
    try {
      const res = await axios.post('/api/login', data)
      setLoading(false)
      console.log(res)
      res.data.status == 200 ? router.push('profile') : alert(res.data.message)
    } catch (error) {
      setLoading(false)
    }
  }

  const inputHandler = ({target}) => {
    setData(prev => ({...prev, [target.name]: target.value}))
  }

  return (
    <div className='flex flex-col justify-center h-screen items-center gap-10 font-bold'>
        <h1 className='text-4xl'>Login here</h1>
      <form action="" className='flex flex-col p-6 rounded-xl bg-teal-200 gap-2 border border-t-8 border-emerald-400'>
        <label htmlFor="emal">Email:</label>
        <input onChange={inputHandler} name='email' type="email" placeholder='Enter your email' className='px-2 rounded py-1 outline-none focus:ring-2 focus:shadow'/>
        <label htmlFor="password">Password:</label>
        <input onChange={inputHandler} name='password' type="password" placeholder='Create a password' className='px-2 rounded py-1 outline-none focus:ring-2 focus:shadow'/>
        <button disabled={isLoading == true} onClick={btnHandler} type='button' className='disabled:pointer-events-none disabled:bg-slate-500 px-2 py-1 bg-sky-800 self-center text-white rounded hover:bg-sky-700 transform my-3 transition-all active:scale-95'>{isLoading == true ? "Logging in" : "Login"}</button>

        <div className='text-center'>
          <div className='flex justify-center items-center gap-2'>
           <p className='h-0.5 bg-black w-16'></p> OR <p className='h-0.5 bg-black w-16'></p>
          </div>
          <span className='font-mono'>New user ?</span> <Link href={'signup'} className='font-light hover:underline hover:text-red-600 transition'>Sign up</Link>
        </div>
      </form>
    </div>
  )
}
