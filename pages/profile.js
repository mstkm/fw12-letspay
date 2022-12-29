import React from 'react'
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { ArrowLeft, ArrowUp, Grid, Plus, User, LogOut, Edit2, ArrowRight } from "react-feather"
import { useSelector } from 'react-redux'
import http from '../helper/http'
import withAuth from '../components/hoc/withAuth'

const Profile = () => {
  const token = useSelector((state) => state?.auth?.token?.token)
  const router = useRouter()
  const [toggleNotification, setToggleNotification] = React.useState(true)
  const clickToggle = () => {
    if (toggleNotification === true) {
      setToggleNotification(false)
    } else {
      setToggleNotification(true)
    }
  }

  // Get user
  const [user, setUser] = React.useState({})
  React.useEffect(() => {
    getUser().then((data) => {
      setUser(data)
    } )
  }, [])
  const getUser = async () => {
    try {
      const response = await http(token).get('/profile')
      return response?.data?.results
    } catch (error) {
      const errorMessage = error?.response?.data?.message
      console.log(errorMessage)
    }
  }
  const fullName = `${user?.firstName} ${user?.lastName}`

  return(
    <div className="bg-orange-100 relative">
    <Head>
      <title>Profile | LetsPay</title>
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
          <div className="flex items-center gap-5 px-8 text-primary font-bold border-l-2 border-primary cursor-pointer mb-8">
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
        <div className='md:hidden'>
          <ArrowLeft onClick={() => router.push('/home')} />
        </div>
        <div className='flex flex-col items-center gap-5'>
          <div className='flex flex-col items-center'>
            <Image src={require('../assets/images/user.png')} alt='profile' className='w-12 mb-2' />
            <div className='flex gap-2 items-center cursor-pointer'>
              <Edit2 className='w-3'/>
              <p className='text-sm'>Edit</p>
            </div>
            <h3 className='font-bold py-2'>{fullName}</h3>
            <p>{user?.phoneNumber}</p>
          </div>
          <div onClick={() => router.push('/personal-information')} className='flex items-center px-3 w-full md:w-3/5 h-12 bg-slate-300 rounded-lg cursor-pointer active:border-2'>
            <p className='flex-1 font-bold'>Personal Information</p>
            <ArrowRight />
          </div>
          <div onClick={() => router.push('/change-password')} className='flex items-center px-3 w-full md:w-3/5 h-12 bg-slate-300 rounded-lg cursor-pointer active:border-2'>
            <p className='flex-1 font-bold'>Change Password</p>
            <ArrowRight />
          </div>
          <div onClick={() => router.push('/change-pin')} className='flex items-center px-3 w-full md:w-3/5 h-12 bg-slate-300 rounded-lg cursor-pointer active:border-2'>
            <p className='flex-1 font-bold'>Change PIN</p>
            <ArrowRight />
          </div>
          <div className='flex md:hidden items-center px-3 w-full md:w-3/5 h-12 bg-slate-300 rounded-lg cursor-pointer active:border-2'>
            <p className='flex-1 font-bold'>Notification</p>
            <div onClick={clickToggle} className={`flex items-center w-12 h-6 ${toggleNotification ? 'bg-primary justify-end' : 'bg-slate-500 justify-start'} rounded-xl px-1`}>
              <div className='h-4 w-4 rounded-full bg-white'></div>
            </div>
          </div>
          <div className='flex items-center px-3 w-full md:w-3/5 h-12 bg-slate-300 rounded-lg cursor-pointer active:border-2'>
            <p className='flex-1 font-bold'>Logout</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
    </div>
  )
}

export default withAuth(Profile)
