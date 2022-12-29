import React from 'react'
import Head from "next/head"
import { useRouter } from "next/router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { ArrowLeft, ArrowUp, Grid, Plus, User, LogOut } from "react-feather"
import http from '../helper/http'
import { useSelector } from 'react-redux'
import withAuth from '../components/hoc/withAuth'

const PersonalInformation = () => {
  const router = useRouter()
  const token = useSelector((state) => state?.auth?.token?.token)

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
  const fullName = `${user.firstName} ${user.lastName}`

  return(
    <div className="bg-orange-100 relative">
    <Head>
      <title>Personal Information | LetsPay</title>
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
          <h3 className='font-bold'>Personal Information</h3>
        </div>
        <p>We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</p>
        <div className='bg-white shadow p-4 rounded'>
          <p className='mb-1'>First Name</p>
          <p className='font-bold text-lg'>{user.firstName}</p>
        </div>
        <div className='bg-white shadow p-4 rounded'>
          <p className='mb-1'>Last Name</p>
          <p className='font-bold text-lg'>{user.lastName}</p>
        </div>
        <div className='bg-white shadow p-4 rounded'>
          <p className='mb-1'>Verified E-mail</p>
          <p className='font-bold text-lg'>{user.email}</p>
        </div>
        <div className='flex items-center bg-white shadow p-4 rounded'>
          <div className='flex-1'>
            <p className='mb-1'>Phone Number</p>
            <p className='font-bold text-lg'>{user.phoneNumber}</p>
          </div>
          <div>
            <p onClick={() => router.push('/manage-phone-number')} className='text-primary cursor-pointer font-bold active:font-medium'>Manage</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
    </div>
  )
}

export default withAuth(PersonalInformation)
