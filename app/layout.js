import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Next App',
  description: 'Next JS App created on 21st July - 2023',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        </body>
    </html>
  )
}
