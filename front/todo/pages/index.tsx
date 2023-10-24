import { Inter } from 'next/font/google'
import LoginPage from './loginpage'
import NavBar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      {/* <LoginPage /> */}
      <NavBar />
    </>
  )
}
