import { Inter } from 'next/font/google'
import LoginPage from './loginpage'
import NavBar from './components/Navbar'
import { RecoilRoot, useRecoilState } from 'recoil'
import { userDataState } from './atoms'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      {/* <LoginPage /> */}
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </>
  )
}

function App() {
  const [data, setData] = useRecoilState(userDataState)
  const [pushState, setPushState] = useState(false)

  useEffect(() => {
    if (data) {
      console.log(data)
     setPushState(!pushState)
    }
  }, [data])

  return (
    <>
      {
        pushState ? <LoginPage /> : <NavBar />
      }
    </>
  )
}
