import React from 'react'

export const metadata = {
    title: "Profile Page",
    description: "Profile description"
}
export default function ProfileLayout({children}) {
  return (
    <div>
      {children}
    </div>
  )
}
