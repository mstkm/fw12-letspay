import React from 'react'
import Head from "next/head"
import { useRouter } from "next/router"
import Header from "../assets/components/Header"
import Footer from "../assets/components/Footer"
import { ArrowLeft, ArrowUp, Grid, Plus, User, LogOut, Lock, Eye, EyeOff } from "react-feather"

const ChangePassword = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState.apply(false)
  const [filledPassword, setFilledPassword] = React.useState(false)
  const [filledNewPassword, setFilledNewPassword] = React.useState(false)
  const [filledReapetNewPassword, setFilledReapetNewPassword] = React.useState(false)

  const checkValuePassword = (value) => {
    if (value) {
      setFilledPassword(true)
    } else {
      setFilledPassword(false)
    }
  }
  const checkValueNewPassword = (value) => {
    if (value) {
      setFilledNewPassword(true)
    } else {
      setFilledNewPassword(false)
    }
  }
  const checkValueRepeatNewPassword = (value) => {
    if (value) {
      setFilledReapetNewPassword(true)
    } else {
      setFilledReapetNewPassword(false)
    }
  }

  return(
    <div className="bg-orange-100">
    <Head>
      <title>Change Password | FazzPay</title>
    </Head>

    <Header />

    <section className="flex flex-col md:flex-row gap-5 font-primary text-secondary md:px-28 py-5 md:py-10">
      {/* Menu */}
      <div className="hidden md:flex flex-col flex-[30%] bg-white shadow rounded-xl py-8">
        <div className="flex-1">
          <div onClick={() => router.push('/home')} className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer mb-8">
            <Grid />
            <p>Dashboard</p>
          </div>
          <div onClick={() => router.push('/transfer')} className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer mb-8">
            <ArrowUp />
            <p>Transfer</p>
          </div>
          <div onClick={() => router.push('/top-up')} className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer mb-8">
            <Plus />
            <p>Top Up</p>
          </div>
          <div onClick={() => router.push('/profile')} className="flex items-center gap-5 px-8 text-primary font-bold border-l-2 border-primary cursor-pointer mb-8">
            <User />
            <p>Profile</p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer">
            <LogOut />
            <p>Logout</p>
          </div>
        </div>
      </div>

      <div className="flex-[70%] flex flex-col gap-5 md:bg-white md:shadow rounded-xl p-8">
        <div className='flex gap-5'>
          <ArrowLeft onClick={() => router.push('/profile')} className='md:hidden'/>
          <h3 className='font-bold'>Change Password</h3>
        </div>
        <p>You must enter your current password and then type your new password twice.</p>
        <form className='flex flex-col items-center gap-8 py-10'>
          <div className={`flex border-b-2 md:w-2/4 w-full pb-2 ${filledPassword ? 'border-primary' : ''}`}>
            <Lock className={`${filledPassword ? 'text-primary' : ''}`}/>
            <input onChange={(e) => checkValuePassword(e.target.value)} type={showPassword ? 'text' : 'password'} name='currentPassword' placeholder='Current password' className='flex-1 px-3 focus:outline-none bg-transparent'/>
            {showPassword ? <EyeOff onClick={() => setShowPassword(false)} className={`cursor-pointer ${filledPassword ? 'text-primary' : ''}`} /> : <Eye onClick={() => setShowPassword(true)} className={`cursor-pointer ${filledPassword ? 'text-primary' : ''}`} />}
          </div>
          <div className={`flex border-b-2 md:w-2/4 w-full pb-2 ${filledNewPassword ? 'border-primary' : ''}`}>
            <Lock className={`${filledNewPassword ? 'text-primary' : ''}`}/>
            <input onChange={(e) => checkValueNewPassword(e.target.value)} type={showPassword ? 'text' : 'password'} name='newPassword' placeholder='New password' className='flex-1 px-3 focus:outline-none bg-transparent'/>
            {showPassword ? <EyeOff onClick={() => setShowPassword(false)} className={`cursor-pointer ${filledNewPassword ? 'text-primary' : ''}`} /> : <Eye onClick={() => setShowPassword(true)} className={`cursor-pointer ${filledNewPassword ? 'text-primary' : ''}`} />}
          </div>
          <div className={`flex border-b-2 md:w-2/4 w-full pb-2 ${filledReapetNewPassword ? 'border-primary' : ''}`}>
            <Lock className={`${filledReapetNewPassword ? 'text-primary' : ''}`}/>
            <input onChange={(e) => checkValueRepeatNewPassword(e.target.value)} type={showPassword ? 'text' : 'password'} name='repeatNewPassword' placeholder='Repeat password' className='flex-1 px-3 focus:outline-none bg-transparent'/>
            {showPassword ? <EyeOff onClick={() => setShowPassword(false)} className={`cursor-pointer ${filledReapetNewPassword ? 'text-primary' : ''}`} /> : <Eye onClick={() => setShowPassword(true)} className={`cursor-pointer ${filledPassword ? 'text-primary' : ''}`} />}
          </div>
          <div className='flex-1 flex justify-center w-full py-5'>
            {filledPassword && filledNewPassword && filledReapetNewPassword ?
            <button className='bg-primary md:w-2/4 w-full h-12 text-white font-bold rounded-xl active:border-2'>Change Password</button>
            :
            <button disabled className='bg-slate-400 md:w-2/4 w-full h-12 font-bold rounded-xl'>Change Password</button>}
          </div>
        </form>
      </div>
    </section>

    <Footer />
    </div>
  )
}

export default ChangePassword
