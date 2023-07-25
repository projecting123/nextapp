"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'


export default function VerifyEmail() {
  const[isVerified, setVerified] = useState(false)
  const[notFound, setNotFound] = useState(false)
  const[isTokenExpired, setTokenExpired] = useState(null)
  const router = useRouter()
  useEffect(() => {
    const token = window.location.search.split("=")[1]
    const verifyEmail = async () => {
      try {
        const res = await axios.post('/api/verifyemail', {token})
        console.log(res)
        if(res.data.status == 201){
          setVerified(true)
        }
        else if("type" in res.data && res.data.type == "expired"){
          setTokenExpired(true)
        }
        else if("type" in res.data && res.data.type == "not-found"){
          setNotFound(true)
        }
      } catch (error) {
        setError(true)
      }
    }
    verifyEmail()
  }, [])
  
  return (
    <div>
      {notFound && <h1>User not found</h1>}
      {!notFound && isTokenExpired && <h1>Token expired, You have to send email again</h1>}
      {!notFound && !isTokenExpired && isVerified && router.push('login')}
    </div>
  )
}


// We can't move the no-16 line outside the useEfect because in Next js all components are by default is
// server component, so during mounting this component "window" is not available, but after mounting(code is executing...)
// then it executes "use-client", means it is client component then it sets the environment from server to client
// and then all are executed and we can't face any error.

