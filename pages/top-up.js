import React from 'react'
import Head from "next/head"
import { useRouter } from "next/router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { ArrowLeft, ArrowUp, Grid, Plus, User, LogOut, X } from "react-feather"
import { useSelector } from 'react-redux'
import http from '../helper/http'
import withAuth from '../components/hoc/withAuth'

const TopUp = () => {
  const router = useRouter()
  const token = useSelector((state) => state?.auth?.token?.token)
  const [message, setMessage] = React.useState('')
  const [alertSuccessTopup, setAlertSuccessTopup] = React.useState(false)

  // Top Up
  const [amount, setAmount] = React.useState(null)

  const topUp = async () => {
    try {
      const response = await http(token).post('/transactions/topup', {amount})
      setMessage(response?.data?.message)
      setAlertSuccessTopup(true)
      setTimeout(() => {
        router.push('/home')
      }, 3000)
    } catch(error) {
      console.log(error)
    }
  }

  // Mobile: Show Input Top Up
  const [inputTopup, setInputTopup] = React.useState(false)

  return(
    <div className="bg-orange-100 relative">
    <Head>
      <title>Top Up | LetsPay</title>
    </Head>

    <Header token={token}/>

    <section className="px-5 pb-5 pt-10 bg-primary rounded-b-3xl font-primary md:hidden">
      <div onClick={() => router.push('/home')} className="flex items-center gap-5 text-white mb-5">
        <ArrowLeft />
        <h3 className="font-bold">Top Up</h3>
      </div>
      <div className="flex items-center bg-white shadow p-3 rounded cursor-pointer">
        <div className="flex items-center justify-center bg-slate-300 w-10 h-10 rounded mr-3">
          <Plus className='text-primary'/>
        </div>
        <div className="flex-1">
          <p>Virtual Account Number</p>
          <p className="font-bold">2389 081393877946</p>
        </div>
      </div>
    </section>

    <section className="flex flex-col md:flex-row gap-5 font-primary text-secondary md:px-28 py-5 md:py-10">
      {/* Menu */}
      <div className="hidden md:flex flex-col flex-[30%] bg-white shadow rounded-xl py-8">
        <div className="flex-1">
          <div onClick={() => router.push('/home')} className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer mb-8">
            <Grid />
            <p>Dashboard</p>
          </div>
          <div className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer mb-8">
            <ArrowUp />
            <p>Transfer</p>
          </div>
          <div className="flex items-center gap-5 px-8 text-primary font-bold border-l-2 border-primary cursor-pointer mb-8">
            <Plus />
            <p>Top Up</p>
          </div>
          <div className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer mb-8">
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

      {/* Mobile: Top Up Steps */}
      <div className="flex-[70%] md:flex flex-col gap-5 md:bg-white md:shadow rounded-xl p-5">
        <div className="flex flex-col gap-5">
          <div className='mb-5'>
            <h3 className='font-bold'>How to Top-up</h3>
          </div>
        </div>
        <div className="flex items-center gap-5 bg-white shadow p-5 rounded cursor-pointer mb-3 md:mb-0">
          <div className="flex items-center justify-center">
            <p className='text-primary font-bold'>1</p>
          </div>
          <div className="flex-1">
            <p>Go to the nearest ATM or you can use E-Banking.</p>
          </div>
        </div>
        <div className="flex items-center gap-5 bg-white shadow p-5 rounded cursor-pointer mb-3 md:mb-0">
          <div className="flex items-center justify-center">
            <p className='text-primary font-bold'>2</p>
          </div>
          <div className="flex-1">
            <p>Type your security number on the ATM or E-Banking.</p>
          </div>
        </div>
        <div className="flex items-center gap-5 bg-white shadow p-5 rounded cursor-pointer mb-3 md:mb-0">
          <div className="flex items-center justify-center">
            <p className='text-primary font-bold'>3</p>
          </div>
          <div className="flex-1">
            <p>Select “Transfer” in the menu</p>
          </div>
        </div>
        <div className="flex items-center gap-5 bg-white shadow p-5 rounded cursor-pointer mb-3 md:mb-0">
          <div className="flex items-center justify-center">
            <p className='text-primary font-bold'>4</p>
          </div>
          <div className="flex-1">
            <p>Type the virtual account number that we provide you at the top.</p>
          </div>
        </div>
        <div className="flex items-center gap-5 bg-white shadow p-5 rounded cursor-pointer mb-3 md:mb-0">
          <div className="flex items-center justify-center">
            <p className='text-primary font-bold'>5</p>
          </div>
          <div className="flex-1">
            <p>Type the amount of the money you want to top up.</p>
          </div>
        </div>
        <div className="flex items-center gap-5 bg-white shadow p-5 rounded cursor-pointer mb-3 md:mb-0">
          <div className="flex items-center justify-center">
            <p className='text-primary font-bold'>6</p>
          </div>
          <div className="flex-1">
            <p>Read the summary details</p>
          </div>
        </div>
        <div className="flex items-center gap-5 bg-white shadow p-5 rounded cursor-pointer mb-3 md:mb-0">
          <div className="flex items-center justify-center">
            <p className='text-primary font-bold'>7</p>
          </div>
          <div className="flex-1">
            <p>Press transfer / top up</p>
          </div>
        </div>
        <div className="flex items-center gap-5 bg-white shadow p-5 rounded cursor-pointer mb-3 md:mb-0">
          <div className="flex items-center justify-center">
            <p className='text-primary font-bold'>8</p>
          </div>
          <div className="flex-1">
            <p>You can see your money in Zwallet within 3 hours.</p>
          </div>
        </div>
        <div onClick={() => setInputTopup(true)} className='flex justify-center items-center mb-3 md:mb-0'>
          <button className='bg-primary w-full h-12 rounded text-white font-bold active:border-2'>Top Up</button>
        </div>
      </div>
    </section>

    {/* Top Up */}
    <section className={`${inputTopup ? 'block' : 'hidden'} md:block font-primary absolute top-0 h-full w-screen bg-slate-300/80`}>
      <div className='sticky bg-white w-[90%] md:w-[30%] p-8 rounded-xl left-6 inset-y-1/4 md:inset-x-1/3 md:inset-y-1/4'>
        {alertSuccessTopup && <p className='text-center text-green-500'>{message}</p>}
        <div className='relative'>
          <p className='font-bold mb-5'>Topup</p>
          <p>Enter the amount of money, and click submit</p>
          <div onClick={() => router.push('/home')} className='absolute top-0 right-0'>
            <button><X /></button>
          </div>
        </div>
        <div className='py-10'>
          <div className='border-2 rounded-lg pb-1 pt-2 text-center'>
            <input onChange={(e)=> setAmount(Number(e.target.value)) & setAlertSuccessTopup(false)} type='number' name='top-up' className='border-b-2 focus:outline-none text-center'/>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex justify-center items-center bg-primary rounded-xl w-32 h-10 active:border-2 cursor-pointer">
            <button onClick={topUp} className="text-white font-bold">Submit</button>
          </div>
        </div>
      </div>
    </section>

    <Footer />
    </div>
  )
}

export default withAuth(TopUp)
