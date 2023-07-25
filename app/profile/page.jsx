"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
export default function ProfilePage() {
  const [status, setStatus] = useState()
  const router = useRouter()
  useEffect(() => {
    (
      async () => {
        try {
          const res = await axios.get('/api/me')
          setStatus(res.data.status)
        } catch (error) {
        console.log(error.message)
      }
    })()
    // status === 404 && router.push('login')
  }, [status])

  return (
    <div>
      Welcome to profile page
    </div>
  )
}
