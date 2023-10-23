import { Inter } from 'next/font/google'
import LoginPage from './loginpage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <LoginPage />
    </>
  )
}
