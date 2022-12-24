import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
import React from 'react'
import {User, Mail, Lock, Eye, EyeOff} from 'react-feather'

const SignUp = () => {
  const [filledFirstName, setFilledFirstName] = React.useState(false)
  const [filledLastName, setfilledLastName] = React.useState(false)
  const [filledEmail, setFilledEmail] = React.useState(false)
  const [filledPassword, setFilledPassword] = React.useState(false)
  const [eyePassword, setEyePassword] = React.useState(true)
  const checkFirstNameValue = (value) => {
    if (value) {
      setFilledFirstName(true)
    } else {
      setFilledFirstName(false)
    }
  }
  const checkLastNameValue = (value) => {
    if (value) {
      setfilledLastName(true)
    } else {
      setfilledLastName(false)
    }
  }
  const checkEmailValue = (value) => {
    if (value) {
      setFilledEmail(true)
    } else {
      setFilledEmail(false)
    }
  }
  const checkPasswordValue = (value) => {
    if (value) {
      setFilledPassword(true)
    } else {
      setFilledPassword(false)
    }
  }

  return(
    <>
    <Head>
      <title>Sign Up | FazzPay</title>
    </Head>
    <div className="flex font-primary">
      {/* Left */}
      <div className="hidden md:block flex-[55%] bg-[url('../assets/images/authbackground.png')] h-screen px-28 py-5">
        <h1 className="font-bold text-4xl text-white mb-10">FazzPay</h1>
        <Image src={require('../assets/images/doublebanner.png')} alt='banner' className='w-3/5 mb-5'/>
        <h2 className="font-bold text-xl text-white mb-5">App that Covering Banking Needs.</h2>
        <p className="text-white text-sm">FazzPay is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in FazzPay everyday with worldwide users coverage.</p>
      </div>

      {/* Right */}
      <div className="flex-[45%] bg-blue-50 md:pl-16 md:pr-36 md:py-10 overflow-y-scroll h-screen">
        <div className="md:hidden text-center p-16">
          <h1 className="font-bold text-4xl text-primary">FazzPay</h1>
        </div>
        <div className="bg-white md:bg-transparent p-10 md:p-0 border-none rounded-t-3xl">
        <div className="md:hidden text-center mb-10">
          <h3 className="font-bold text-xl mb-3">Sign Up</h3>
          <p>Create your account to access FazzPay.</p>
        </div>
        <div className="hidden md:block mb-10">
          <h2 className="font-bold text-xl mb-5">Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h2>
          <p>Transfering money is eassier than ever, you can access FazzPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
        </div>
        <form>
          <div className={`flex gap-5 mb-8 pb-3 border-b-2 ${filledFirstName ? ' border-primary' : ''}`}>
            <User className={filledFirstName ? 'text-primary' : 'text-slate-300'} />
            <input onChange={(e)=> checkFirstNameValue(e.target.value)} type='text' name='firstName' placeholder='Enter your firtsname' className="flex-1 bg-transparent focus:outline-none"/>
          </div>
          <div className={`flex gap-5 mb-8 pb-3 border-b-2 ${filledLastName ? ' border-primary' : ''}`}>
            <User className={filledLastName ? 'text-primary' : 'text-slate-300'} />
            <input onChange={(e)=> checkLastNameValue(e.target.value)} type='text' name='lastName' placeholder='Enter your lastsname' className="flex-1 bg-transparent focus:outline-none"/>
          </div>
          <div className={`flex gap-5 mb-8 pb-3 border-b-2 ${filledEmail ? ' border-primary' : ''}`}>
            <Mail className={filledEmail ? 'text-primary' : 'text-slate-300'} />
            <input onChange={(e)=> checkEmailValue(e.target.value)} type='text' name='email' placeholder='Enter your email' className="flex-1 bg-transparent focus:outline-none"/>
          </div>
          <div className={`flex gap-5 mb-16 pb-3 border-b-2 ${filledPassword ? ' border-primary' : ''}`}>
            <Lock className={filledPassword ? 'text-primary' : 'text-slate-300'}  />
            <input onChange={(e)=> checkPasswordValue(e.target.value)} type={eyePassword ? 'password' : 'text'} name='password' placeholder='Enter your password' className="flex-1 bg-transparent focus:outline-none"/>
            {eyePassword ? <Eye onClick={() => setEyePassword(false)} className={filledPassword ? 'text-primary' : 'text-slate-300'}  /> : <EyeOff onClick={() => setEyePassword(true)} className={filledPassword ? 'text-primary' : 'text-slate-300'}  />}
          </div>
          <div className="flex justify-center items-center w-full h-8 mb-10">
            <button disabled={!filledEmail || !filledPassword || !filledFirstName || !filledLastName} className={`w-full ${filledEmail && filledPassword ? ' bg-primary' : ' bg-slate-300'} ${filledEmail && filledPassword ? ' text-white' : ' text-secondary'} font-bold py-3 border rounded-xl active:w-11/12 active:py-2 active:text-sm text-white`}>Sign Up</button>
          </div>
        </form>
        <div className="text-center">
          <p>Already have an account? Let&apos;s <Link href='/login' className="text-primary cursor-pointer hover:font-bold">Login</Link></p>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default SignUp
