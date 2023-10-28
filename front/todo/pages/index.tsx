import { Inter } from 'next/font/google'
import LoginPage from './loginpage'
import NavBar from './components/Navbar'
import { RecoilRoot } from 'recoil'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      {/* <LoginPage /> */}
      <RecoilRoot>
        {/* <NavBar /> */}
        <LoginPage />
      </RecoilRoot>
    </>
  )
}
