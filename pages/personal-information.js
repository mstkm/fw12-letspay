import React from 'react'
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import Header from "../assets/components/Header"
import Footer from "../assets/components/Footer"
import { ArrowLeft, ArrowUp, Grid, Plus, User, LogOut, Edit2, ArrowRight } from "react-feather"

const PersonalInformation = () => {
  const router = useRouter()
  const [toggleNotification, setToggleNotification] = React.useState(true)

  const clickToggle = () => {
    if (toggleNotification === true) {
      setToggleNotification(false)
    } else {
      setToggleNotification(true)
    }
  }

  return(
    <div className="bg-orange-100 relative">
    <Head>
      <title>Personal Information | FazzPay</title>
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
        <div className='flex md:hidden gap-5'>
          <ArrowLeft />
          <h3 className='font-bold'>Personal Information</h3>
        </div>
        <p>We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</p>
        <div className='bg-white shadow p-4 rounded'>
          <p className='mb-1'>First Name</p>
          <p className='font-bold text-lg'>Robert</p>
        </div>
        <div className='bg-white shadow p-4 rounded'>
          <p className='mb-1'>Last Name</p>
          <p className='font-bold text-lg'>Chandler</p>
        </div>
        <div className='bg-white shadow p-4 rounded'>
          <p className='mb-1'>Verified E-mail</p>
          <p className='font-bold text-lg'>pewdiepie1@gmail.com</p>
        </div>
        <div className='flex items-center bg-white shadow p-4 rounded'>
          <div className='flex-1'>
            <p className='mb-1'>Phone Number</p>
            <p className='font-bold text-lg'>+62 813-9387-7946</p>
          </div>
          <div>
            <p className='text-primary cursor-pointer font-bold active:font-medium'>Manage</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
    </div>
  )
}

export default PersonalInformation
