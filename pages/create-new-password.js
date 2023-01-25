import Image from "next/image"
import Head from "next/head"
import React from 'react'
import {Lock, Eye, EyeOff } from 'react-feather'
import { useRouter } from "next/router"
import authPrivate from "../components/hoc/authPrivate"

const CreateNewPassword = () => {
  const router = useRouter()
  const [filledPassword, setFilledPassword] = React.useState(false)
  const [filledConfirmPassword, setFilledConfirmPassword] = React.useState(false)
  const [eyePassword, setEyePassword] = React.useState(true)
  const [eyeConfirmPassword, setEyeConfirmPassword] = React.useState(true)

  const checkPasswordValue = (value) => {
    if (value) {
      setFilledPassword(true)
    } else {
      setFilledPassword(false)
    }
  }
  const checkConfirmPasswordValue = (value) => {
    if (value) {
      setFilledConfirmPassword(true)
    } else {
      setFilledConfirmPassword(false)
    }
  }
  const createNewPassword = (e) => {
    e.preventDefault()
    router.push('/login')
  }

  return(
    <>
    <Head>
      <title>Reset Password | LetsPay</title>
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
        <div className="bg-white md:flex flex-col md:h-full justify-center md:bg-transparent p-10 md:p-0 border-none rounded-t-3xl">
        <div className="md:hidden text-center mb-10">
          <h3 className="font-bold text-xl mb-3">Reset Password</h3>
          <p>Create and confirm your new password so you can login to Zwallet.</p>
        </div>
        <div className="hidden md:block mb-10">
          <h2 className="font-bold text-xl mb-5">Did You Forgot Your Password? Don&apos;t Worry, You Can Reset Your Password In a Minutes.</h2>
          <p>Now you can create a new password for your LetsPay account. Type your password twice so we can confirm your new passsword.</p>
        </div>

        <form onSubmit={createNewPassword}>
          <div className={`flex gap-5 mb-8 pb-3 border-b-2 ${filledPassword ? ' border-primary' : ''}`}>
            <Lock className={filledPassword ? 'text-primary' : 'text-slate-300'}  />
            <input onChange={(e)=> checkPasswordValue(e.target.value)} type={eyePassword ? 'password' : 'text'} name='newPassword' placeholder='Create new password' className="flex-1 bg-transparent focus:outline-none"/>
            {eyePassword ? <Eye onClick={() => setEyePassword(false)} className={filledPassword ? 'text-primary' : 'text-slate-300'}  /> : <EyeOff onClick={() => setEyePassword(true)} className={filledPassword ? 'text-primary' : 'text-slate-300'}  />}
          </div>
          <div className={`flex gap-5 mb-10 pb-3 border-b-2 ${filledConfirmPassword ? ' border-primary' : ''}`}>
            <Lock className={filledConfirmPassword ? 'text-primary' : 'text-slate-300'}  />
            <input onChange={(e)=> checkConfirmPasswordValue(e.target.value)} type={eyeConfirmPassword ? 'password' : 'text'} name='confirmNewPassword' placeholder='Confirm new password' className="flex-1 bg-transparent focus:outline-none"/>
            {eyeConfirmPassword ? <Eye onClick={() => setEyeConfirmPassword(false)} className={filledConfirmPassword ? 'text-primary' : 'text-slate-300'}  /> : <EyeOff onClick={() => setEyeConfirmPassword(true)} className={filledConfirmPassword ? 'text-primary' : 'text-slate-300'}  />}
          </div>
          <div className="flex justify-center items-center w-full h-8 mb-10">
          {!filledPassword || !filledConfirmPassword ?
          <button disabled className={`w-full bg-gray-200 text-gray-300 font-bold py-3 border rounded-xl`}>Reset Password</button> :
          <button className={`w-full btn bg-primary border-primary hover:bg-primary hover:border-primary text-white font-bold py-3 border rounded-xl`}>Reset Password</button>
          }
          </div>
        </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default authPrivate(CreateNewPassword)
