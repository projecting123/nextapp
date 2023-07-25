import React from 'react'

export const metadata = {
    title: "Login Page",
    description: "You can Log in here."
}
export default function LoginLayout({children}) {
  return (
    <div>
      {children}
    </div>
  )
}
