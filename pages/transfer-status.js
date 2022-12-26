import React from 'react'
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import Header from "../assets/components/Header"
import Footer from "../assets/components/Footer"
import { ArrowLeft, ArrowUp, Grid, Plus, User, LogOut, X, Check, Download } from "react-feather"
import PinInput from "react-pin-input"

const Confirmation = () => {
  const router = useRouter()
  const [pin, setPin] = React.useState(null)
  const [showEnterPIN, setShowEnterPIN] = React.useState(false)
  const [statusSuccess, seStatusSuccess] = React.useState(true)

  return(
    <div className="bg-orange-100 relative">
    <Head>
      <title>Transfer Status | FazzPay</title>
    </Head>

    <Header />

    <section className="bg-primary rounded-b-3xl font-primary md:hidden">
      <div className="flex justify-center text-white py-10">
        <h3 className="font-bold">Transfer Details</h3>
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
        {statusSuccess ?
        <div className='flex flex-col items-center gap-5 py-5'>
          <div className='flex justify-center items-center rounded-full w-12 h-12 bg-green-500'>
            <Check className='text-white'/>
          </div>
          <div>
            <p className='font-bold'>Transfer Success</p>
          </div>
        </div>
        :
        <div className='flex flex-col items-center gap-5 py-5'>
          <div className='flex justify-center items-center rounded-full w-12 h-12 bg-red-500'>
            <X className='text-white'/>
          </div>
          <div>
            <p className='font-bold text-center mb-2'>Transfer Failed</p>
            <p className='text-center px-10'>We can&apos;t transfer your money at the moment, we recommend you to check your internet connection and try again.</p>
          </div>
        </div>}
        <div className='grid grid-cols-2 md:flex md:flex-col gap-5 p-5'>
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
        <div className='md:hidden p-5'>
          <h3 className='font-bold mb-5'>From</h3>
          <div className="flex items-center bg-white shadow p-3 rounded cursor-pointer">
          <div className="bg-slate-300 w-10 h-10 rounded mr-3">
            <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
          </div>
          <div className="flex-1">
            <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap font-bold">Robert Chandler</p>
            <p>+62 813-9387-7946</p>
          </div>
        </div>
        </div>
        <div className='p-5'>
          <h3 className='font-bold mb-5'>To</h3>
          <div className="flex items-center bg-white shadow p-3 rounded cursor-pointer">
          <div className="bg-slate-300 w-10 h-10 rounded mr-3">
            <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
          </div>
          <div className="flex-1">
            <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap font-bold">Samuel Suhi</p>
            <p>+62 813-8492-9994</p>
          </div>
        </div>
        </div>
        {statusSuccess ?
        <div className='flex justify-end gap-5 py-10 px-5'>
          <div className="hidden md:flex justify-center items-center w-full md:w-48 h-12 bg-primary rounded-xl cursor-pointer active:border-2 active:border-white">
            <Download className='text-white mr-3'/>
            <button className=" text-white font-bold">Download PDF</button>
          </div>
          <div onClick={() => router.push('/home')} className="flex justify-center items-center w-full md:w-48 h-12 bg-primary rounded-xl cursor-pointer active:border-2 active:border-white">
            <button className=" text-white font-bold">Back to Home</button>
          </div>
        </div>
        :
        <div className='flex justify-end gap-5 py-10 px-5'>
          <div className="flex justify-center items-center w-full md:w-48 h-12 bg-primary rounded-xl cursor-pointer active:border-2 active:border-white">
            <button className=" text-white font-bold">Try Again</button>
          </div>
        </div>
        }
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
          <div className="flex justify-center items-center w-28 h-12">
            <button className="bg-primary px-5 py-3 rounded-xl text-white font-bold active:text-sm active:px-4 active:py-2">Continue</button>
          </div>
        </div>
        <div className=" md:hidden flex justify-end">
          <div className="flex justify-center items-center w-full h-12">
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
