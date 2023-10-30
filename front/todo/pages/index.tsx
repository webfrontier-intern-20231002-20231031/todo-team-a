import { Inter } from 'next/font/google'
import LoginPage from './loginpage'
import NavBar from './components/Navbar'
import { RecoilRoot, useRecoilState } from 'recoil'
import { userDataState } from './atoms'

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

  return (
    <>
      {
        data ? <LoginPage /> : <NavBar />
      }
    </>
  )
}
