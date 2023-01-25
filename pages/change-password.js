import React from 'react'
import Head from "next/head"
import { useRouter } from "next/router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { ArrowLeft, ArrowUp, Grid, Plus, User, LogOut, Lock, Eye, EyeOff } from "react-feather"
import { useSelector } from 'react-redux'
import http from '../helper/http'
import withAuth from '../components/hoc/withAuth'
import { Oval } from  'react-loader-spinner'

const ChangePassword = () => {
  const router = useRouter()
  const token = useSelector((state) => state?.auth?.token)
  const [showPassword, setShowPassword] = React.useState.apply(false)
  const [showNewPassword, setShowNewPassword] = React.useState.apply(false)
  const [showReapeatNewPassword, setShowReapeatNewPassword] = React.useState.apply(false)
  const [password, setPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [repeatNewPassword, setRepeatNewPassword] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [alertSuccess, setAlerSuccess] = React.useState(false)
  const [alertFailed, setAlerFailed] = React.useState(false)

  // Update password
  const [loadingPassword, setLoadingPassword] = React.useState(false)
  const updatePassword = async (e) => {
    e.preventDefault()
    setLoadingPassword(true)
    setAlerSuccess(false)
    setAlerFailed(false)
    try {
      const response = await http(token).post('/profile/change-password', {
        currentPassword: password,
        newPassword,
        confirmPassword: repeatNewPassword
      })
      setLoadingPassword(false)
      setMessage(response?.data?.message)
      setAlerSuccess(true)
      return response
    } catch(error) {
      setLoadingPassword(false)
      setMessage(error?.response?.data?.message)
      setAlerFailed(true)
    }
  }


  return(
    <div className="bg-orange-100">
    <Head>
      <title>Change Password | LetsPay</title>
    </Head>

    <Header token={token} />

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
        <form onSubmit={updatePassword} className='relative flex flex-col items-center gap-8 py-10'>
          <div className={`flex border-b-2 md:w-2/4 w-full pb-2 ${password ? 'border-primary' : ''}`}>
            <Lock className={`${password ? 'text-primary' : ''}`}/>
            <input onChange={(e) => setPassword(e.target.value) & setAlerFailed(false) & setAlerSuccess(false)} type={showPassword ? 'text' : 'password'} name='currentPassword' placeholder='Current password' className='flex-1 px-3 focus:outline-none bg-transparent'/>
            {showPassword ? <EyeOff onClick={() => setShowPassword(false)} className={`cursor-pointer ${password ? 'text-primary' : ''}`} /> : <Eye onClick={() => setShowPassword(true)} className={`cursor-pointer ${password ? 'text-primary' : ''}`} />}
          </div>
          <div className={`flex border-b-2 md:w-2/4 w-full pb-2 ${newPassword ? 'border-primary' : ''}`}>
            <Lock className={`${newPassword ? 'text-primary' : ''}`}/>
            <input onChange={(e) => setNewPassword(e.target.value) & setAlerFailed(false) & setAlerSuccess(false)} type={showNewPassword ? 'text' : 'password'} name='newPassword' placeholder='New password' className='flex-1 px-3 focus:outline-none bg-transparent'/>
            {showNewPassword ? <EyeOff onClick={() => setShowNewPassword(false)} className={`cursor-pointer ${newPassword ? 'text-primary' : ''}`} /> : <Eye onClick={() => setShowNewPassword(true)} className={`cursor-pointer ${newPassword ? 'text-primary' : ''}`} />}
          </div>
          <div className={`flex border-b-2 md:w-2/4 w-full pb-2 ${repeatNewPassword ? 'border-primary' : ''}`}>
            <Lock className={`${repeatNewPassword ? 'text-primary' : ''}`}/>
            <input onChange={(e) => setRepeatNewPassword(e.target.value) & setAlerFailed(false) & setAlerSuccess(false)} type={showReapeatNewPassword ? 'text' : 'password'} name='repeatNewPassword' placeholder='Repeat password' className='flex-1 px-3 focus:outline-none bg-transparent'/>
            {showReapeatNewPassword ? <EyeOff onClick={() => setShowReapeatNewPassword(false)} className={`cursor-pointer ${repeatNewPassword ? 'text-primary' : ''}`} /> : <Eye onClick={() => setShowReapeatNewPassword(true)} className={`cursor-pointer ${repeatNewPassword ? 'text-primary' : ''}`} />}
          </div>
          <div className='flex-1 flex justify-center w-full py-5'>
            {password.length && newPassword.length && repeatNewPassword.length ?
            <button className='btn bg-primary border-primary hover:bg-primary hover:border-primary md:w-2/4 w-full h-12 text-white font-bold rounded-xl'>Change Password</button>
            :
            <button disabled className='bg-gray-200 text-gray-300 md:w-2/4 w-full h-12 font-bold rounded-xl'>Change Password</button>}
            {alertSuccess &&
            <div className='text-center absolute bottom-0'>
              <p className='text-green-500'>{message}</p>
              <p onClick={()=> router.push('/profile')} className='text-blue-500 hover:font-bold cursor-pointer'>Back to profile</p>
            </div> }
            {alertFailed &&
            <div className='text-center absolute bottom-5'>
              <p className='text-red-500'>{message}</p>
            </div> }
          </div>
          {loadingPassword &&
          <div className='flex justify-center'>
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
        </form>
      </div>
    </section>

    <Footer />
    </div>
  )
}

export default withAuth(ChangePassword)
