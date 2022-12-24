import Image from "next/image"
import Head from "next/head"
import React from 'react'
import {Mail, Lock, Eye, EyeOff } from 'react-feather'

const Login = () => {
  const [filledEmail, setFilledEmail] = React.useState(false)
  const [filledPassword, setFilledPassword] = React.useState(false)
  const [filledConfirmPassword, setFilledConfirmPassword] = React.useState(false)
  const [eyePassword, setEyePassword] = React.useState(true)
  const [confirmEmail, setConfirmEmail] = React.useState(true)

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
  const checkConfirmPasswordValue = (value) => {
    if (value) {
      setFilledConfirmPassword(true)
    } else {
      setFilledConfirmPassword(false)
    }
  }
  const showPassword = () => {
    setEyePassword(true)
  }
  const hidePassword = () => {
    setEyePassword(false)
  }
  const showConfirmPassword = () => {
    setEyePassword(true)
  }
  const hideConfirmPassword = () => {
    setEyePassword(false)
  }
  const checkEmail = (e) => {
    e.preventDefault()
    setConfirmEmail(false)
  }

  return(
    <>
    <Head>
      <title>Reset Password | FazzPay</title>
    </Head>
    <div className="flex font-primary">
      {/* Left */}
      <div className="hidden md:block flex-[55%] bg-[url('../assets/images/authbackground.png')] h-screen px-28 py-5">
        <h1 className="font-bold text-xl text-white mb-10">FazzPay</h1>
        <Image src={require('../assets/images/doublebanner.png')} alt='banner' className='w-3/5 mb-5'/>
        <h2 className="font-bold text-xl text-white mb-5">App that Covering Banking Needs.</h2>
        <p className="text-white text-sm">FazzPay is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in FazzPay everyday with worldwide users coverage.</p>
      </div>

      {/* Right */}
      <div className="flex-[45%] bg-blue-50 md:pl-16 md:pr-36 md:py-10">
        <div className="md:hidden text-center p-16">
          <h1 className="font-bold text-2xl text-primary">FazzPay</h1>
        </div>
        <div className="bg-white md:flex flex-col md:h-full justify-center md:bg-transparent p-10 md:p-0 border-none rounded-t-3xl">
        <div className="md:hidden text-center mb-10">
          <h3 className="font-bold text-xl mb-3">Reset Password</h3>
          <p>Enter your FazzPay e-mail so we can send you a password reset link.</p>
        </div>
        <div className="hidden md:block mb-10">
          <h2 className="font-bold text-xl mb-5">Did You Forgot Your Password? Don&apos;t Worry, You Can Reset Your Password In a Minutes.</h2>
          <p>To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</p>
        </div>
        {confirmEmail ?
        <form onSubmit={checkEmail}>
          <div className={`flex gap-5 mb-16 pb-3 border-b-2 ${filledEmail ? ' border-primary' : ''}`}>
            <Mail className={filledEmail ? 'text-primary' : 'text-slate-300'} />
            <input onChange={(e)=> checkEmailValue(e.target.value)} type='text' name='email' placeholder='Enter your email' className="flex-1 bg-transparent focus:outline-none"/>
          </div>
          <div className="flex justify-center items-center w-full h-8 mb-10">
            <button disabled={!filledEmail} className={`w-full ${filledEmail ? ' bg-primary' : ' bg-slate-300'} font-bold py-3 border rounded-xl active:w-11/12 active:py-2 active:text-sm`}>Confirm</button>
          </div>
        </form>
        :
        // Reset Password
        <form>
          <div className={`flex gap-5 mb-8 pb-3 border-b-2 ${filledPassword ? ' border-primary' : ''}`}>
            <Lock className={filledPassword ? 'text-primary' : 'text-slate-300'}  />
            <input onChange={(e)=> checkPasswordValue(e.target.value)} type={eyePassword ? 'password' : 'text'} name='newPassword' placeholder='Create new password' className="flex-1 bg-transparent focus:outline-none"/>
            {eyePassword ? <Eye onClick={hidePassword} className={filledPassword ? 'text-primary' : 'text-slate-300'}  /> : <EyeOff onClick={showPassword} className={filledPassword ? 'text-primary' : 'text-slate-300'}  />}
          </div>
          <div className={`flex gap-5 mb-10 pb-3 border-b-2 ${filledConfirmPassword ? ' border-primary' : ''}`}>
            <Lock className={filledConfirmPassword ? 'text-primary' : 'text-slate-300'}  />
            <input onChange={(e)=> checkConfirmPasswordValue(e.target.value)} type={eyePassword ? 'password' : 'text'} name='confirmNewPassword' placeholder='Confirm new password' className="flex-1 bg-transparent focus:outline-none"/>
            {eyePassword ? <Eye onClick={hideConfirmPassword} className={filledConfirmPassword ? 'text-primary' : 'text-slate-300'}  /> : <EyeOff onClick={showConfirmPassword} className={filledConfirmPassword ? 'text-primary' : 'text-slate-300'}  />}
          </div>
          <div className="flex justify-center items-center w-full h-8 mb-10">
            <button disabled={!filledPassword} className={`w-full ${filledPassword ? ' bg-primary' : ' bg-slate-300'} font-bold py-3 border rounded-xl active:w-11/12 active:py-2 active:text-sm`}>Reset Password</button>
          </div>
        </form> }
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
