import React from 'react'
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import Header from "../assets/components/Header"
import Footer from "../assets/components/Footer"
import { ArrowLeft, ArrowUp, Grid, Plus, User, LogOut, Search, X } from "react-feather"
import PinInput from "react-pin-input"

const Confirmation = () => {
  const router = useRouter()
  const [pin, setPin] = React.useState(null)
  const [showEnterPIN, setShowEnterPIN] = React.useState(false)

  return(
    <div className="bg-orange-100 relative">
    <Head>
      <title>Confirmation | FazzPay</title>
    </Head>

    <Header />

    <section className="px-5 pb-5 pt-10 bg-primary rounded-b-3xl font-primary md:hidden">
      <div onClick={() => router.push('/home')} className="flex items-center gap-5 text-white mb-5">
        <ArrowLeft />
        <h3 className="font-bold">Confirmation</h3>
      </div>
      <div className="flex items-center bg-white shadow p-3 rounded-lg cursor-pointer">
        <div className="bg-slate-300 w-10 h-10 rounded mr-3">
          <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
        </div>
        <div className="flex-1">
          <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap font-bold">Samuel Suhi</p>
          <p>+62 813-8492-9994</p>
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
          <div className="flex items-center gap-5 px-8 text-primary font-bold border-l-2 border-primary cursor-pointer mb-8">
            <ArrowUp />
            <p>Transfer</p>
          </div>
          <div className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer mb-8">
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

      <div className="flex-[70%] md:flex flex-col gap-5 md:bg-white md:shadow rounded-xl md:p-5">
        <div className="flex flex-col gap-5">
          <div className="hidden md:block flex-1">
            <h3 className="font-bold">Transfer To</h3>
          </div>
        </div>
        <div className="hidden md:flex items-center bg-white shadow p-3 rounded cursor-pointer mb-3 md:mb-0">
          <div className="bg-slate-300 w-10 h-10 rounded mr-3">
            <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
          </div>
          <div className="flex-1">
            <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap font-bold">Samuel Suhi</p>
            <p>+62 813-8492-9994</p>
          </div>
        </div>
        <div className='grid grid-cols-2 md:flex md:flex-col gap-5 p-5'>
          <h3 className="hidden md:block font-bold">Details</h3>
          <div className="bg-white shadow rounded p-3">
            <p>Amount</p>
            <p className="font-bold">Rp100.000</p>
          </div>
          <div className="bg-white shadow rounded p-3">
            <p>Balance Left</p>
            <p className="font-bold">Rp20.000</p>
          </div>
          <div className="hidden md:block bg-white shadow rounded p-3">
            <p>Date & Time</p>
            <p className="font-bold">May 11, 2020 - 12.20</p>
          </div>
          <div className="md:hidden bg-white shadow rounded p-3">
            <p>Date</p>
            <p className="font-bold">May 11, 2020</p>
          </div>
          <div className="md:hidden bg-white shadow rounded p-3">
            <p>Time</p>
            <p className="font-bold">12.20</p>
          </div>
          <div className="col-span-2 bg-white shadow rounded p-3">
            <p>Notes</p>
            <p className="font-bold">For buying some socks</p>
          </div>
        </div>
        <div className="flex md:justify-end p-5">
          <div onClick={() => setShowEnterPIN(true)} className="flex justify-center items-center w-full md:w-28 h-12">
            <button className="bg-primary w-full md:w-28 px-5 py-3 rounded-xl text-white font-bold active:text-sm active:px-4 active:py-2">Continue</button>
          </div>
        </div>
      </div>
    </section>

    {showEnterPIN ?
    <section className='absolute top-0 h-full w-screen bg-slate-300/80'>
      <div className='sticky bg-white w-[90%] md:w-[30%] p-8 rounded-xl left-6 inset-y-1/4 md:inset-x-1/3 md:inset-y-1/4'>
        <div className='relative'>
          <p className='font-bold mb-5'>Enter PIN to Transfer</p>
          <p>Enter your 6 digits PIN for confirmation to continue transferring money. </p>
          <div onClick={() => setShowEnterPIN(false)} className='absolute top-0 right-0'>
            <button><X /></button>
          </div>
        </div>
        <div className='py-10'>
          <PinInput
              length={6}
              initialValue=""
              onChange={(value, index) => {setPin(value)}}
              type="numeric"
              inputMode="number"
              style={{}}
              inputStyle={{borderColor: '#3A3D42', borderRadius: '10px', fontWeight: 'bold', margin: '0.25rem', width: '45px'}}
              inputFocusStyle={{borderColor: '#FF5F00'}}
              onComplete={(value, index) => {}}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            />
        </div>
        <div className="hidden md:flex justify-end">
          <div onClick={() => router.push('/transfer-status')} className="flex justify-center items-center w-28 h-12">
            <button className="bg-primary px-5 py-3 rounded-xl text-white font-bold active:text-sm active:px-4 active:py-2">Continue</button>
          </div>
        </div>
        <div className=" md:hidden flex justify-end">
          <div onClick={() => router.push('/transfer-status')} className="flex justify-center items-center w-full h-12">
            <button className="bg-primary w-full px-5 py-3 rounded-xl text-white font-bold active:text-sm active:px-3 active:py-2">Transfer Now</button>
          </div>
        </div>
      </div>
    </section> : false}

    <Footer />
    </div>
  )
}

export default Confirmation
