import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
import React from 'react'
import {Mail, Lock, Eye, EyeOff} from 'react-feather'
import { useRouter } from "next/router"
import http from "../helper/http"
import { loginUser as loginUserAction } from "../redux/reducers/auth"
import {useDispatch} from 'react-redux'
import authPrivate from '../components/hoc/authPrivate'
import { Oval } from  'react-loader-spinner'

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [email, setEmail] = React.useState(false)
  const [password, setPassword] = React.useState(false)
  const [eyePassword, setEyePassword] = React.useState(true)

  // Login
  const [loadingLogin, setLoadingLogin] = React.useState(false)
  const [successLoginMessage, setSuccessLoginMessage] = React.useState(null)
  const [failedLoginMessage, setFailedLoginMessage] = React.useState(null)
  const cb = () => {
    router.push('/home')
  }
  const checkLogin = async (e) => {
    e.preventDefault()
    setLoadingLogin(true)
    setFailedLoginMessage(null)
    setSuccessLoginMessage(null)
    try {
      const {data} = await http().post('/auth/login', {email, password})
      const token = data?.results?.token
      dispatch(loginUserAction({token}))
      setLoadingLogin(false)
      setSuccessLoginMessage('Login success')
      cb()
    } catch (error) {
      console.log(error?.response?.data?.message)
      setLoadingLogin(false)
      setFailedLoginMessage(error?.response?.data?.message)
    }
  }

  return(
    <>
    <Head>
      <title>Login | LetsPay</title>
    </Head>
    <div className="flex font-primary">
      {/* Left */}
      <div className="hidden md:block flex-[55%] bg-primary h-screen px-28 py-5">
        <svg xmlns="http://www.w3.org/2000/svg" className='absolute left-0 top-0 h-60' viewBox="0 0 1440 320"><path fill="#ff9500" fill-opacity="1" d="M0,96L60,117.3C120,139,240,181,360,202.7C480,224,600,224,720,192C840,160,960,96,1080,85.3C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
        <svg xmlns="http://www.w3.org/2000/svg" className='absolute left-0 top-3 h-60' viewBox="0 0 1440 320"><path fill="#ff9500" fill-opacity="0.5" d="M0,96L60,117.3C120,139,240,181,360,202.7C480,224,600,224,720,192C840,160,960,96,1080,85.3C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
        <h1 className="relative font-bold text-4xl text-white mb-10">LetsPay</h1>
        <Image src={require('../assets/images/doublebanner.png')} alt='banner' className='relative w-3/5 mb-5'/>
        <h2 className="font-bold text-xl text-white mb-5">App that Covering Banking Needs.</h2>
        <p className="text-white text-sm">LetsPay is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in LetsPay everyday with worldwide users coverage.</p>
      </div>

      {/* Right */}
      <div className="relative flex-[45%] bg-orange-50 md:pl-16 md:pr-36 md:py-10">
        <div className="md:hidden text-center p-16">
          <h1 className="font-bold text-4xl text-primary">LetsPay</h1>
        </div>
        <div className="bg-white md:bg-transparent p-10 md:p-0 border-none rounded-t-3xl">
        <div className="md:hidden text-center mb-10">
          <h3 className="font-bold text-xl mb-3">Login</h3>
          <p>Login to your existing account to access all the features in LetsPay.</p>
        </div>
        <div className="hidden md:block mb-10">
          <h2 className="font-bold text-xl mb-5">Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h2>
          <p>Transfering money is eassier than ever, you can access LetsPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
        </div>
        <form onSubmit={checkLogin}>
          <div className={`flex gap-5 mb-8 pb-3 border-b-2 ${email ? ' border-primary' : ''}`}>
            <Mail className={email ? 'text-primary' : 'text-slate-300'} />
            <input onChange={(e)=> setEmail(e.target.value)} type='text' name='email' placeholder='Enter your email' className="flex-1 bg-transparent focus:outline-none"/>
          </div>
          <div className={`flex gap-5 mb-1 pb-3 border-b-2 ${password ? ' border-primary' : ''}`}>
            <Lock className={password ? 'text-primary' : 'text-slate-300'}  />
            <input onChange={(e)=> setPassword(e.target.value)} type={eyePassword ? 'password' : 'text'} name='password' placeholder='Enter your password' className="flex-1 bg-transparent focus:outline-none"/>
            {eyePassword ? <Eye onClick={() => {setEyePassword(false)}} className={password ? 'text-primary' : 'text-slate-300'}  /> : <EyeOff onClick={() => {setEyePassword(true)}} className={password ? 'text-primary' : 'text-slate-300'}  />}
          </div>
          <div className="flex justify-end mb-10 text-end">
            <p onClick={() => router.push('/reset-password')} className="cursor-pointer w-fit hover:font-bold">Forgot password?</p>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center w-full h-8 mb-10">
            <button disabled={!email || !password} className={`btn w-full ${email && password ? ' bg-primary border-primary hover:bg-primary hover:border-primary' : ' bg-gray-200'} ${email && password ? ' text-white' : ' text-gray-300'} font-bold py-3 border rounded-xl`}>Login</button>
          </div>
          {loadingLogin && <div className='mb-8 flex justify-center'>
            <Oval
              height={25}
              wdivth={25}
              color="#FF5F00"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#fACEB6"
              strokeWidth={5}
              strokeWidthSecondary={5}
            />
          </div>}
          {successLoginMessage && <p className='mb-8 text-center text-green-600'>{successLoginMessage}</p>}
          {failedLoginMessage && <p className='mb-8 text-center text-red-600'>{failedLoginMessage}</p>}
        </form>
        <div className="text-center">
          <p>Don&apos;t have an account? Let&apos;s <Link href='/sign-up' className="text-primary cursor-pointer hover:font-bold">Sign Up</Link></p>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default authPrivate(Login)
