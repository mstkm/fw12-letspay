import React from 'react'
import Head from "next/head"
import { useRouter } from "next/router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { ArrowLeft, ArrowUp, Grid, Plus, User, LogOut } from "react-feather"
import PinInput from 'react-pin-input'
import { useSelector } from 'react-redux'
import http from '../helper/http'
import withAuth from '../components/hoc/withAuth'

const ChangeNewPIN = () => {
  const router = useRouter()
  const token = useSelector((state) => state?.auth?.token?.token)
  const [pin, setPin] = React.useState('')
  const [message, setMessage] =  React.useState('')
  const [alertSuccess, setAlertSuccess] = React.useState(false)
  const [alertFailed, setAlertFailed] = React.useState(false)

  const updatePIN = async (e) => {
    if (e && e.preventDefault) { e.preventDefault(); }
    try {
      const response = await http(token).post('/profile/change-pin', {newPin: pin})
      setMessage(response?.data?.message)
      setAlertSuccess(true)
    } catch(error) {
      setMessage(error?.response?.data?.message)
      setAlertFailed(true)
    }
  }

  return(
    <div className="bg-orange-100">
    <Head>
      <title>Change PIN | LetsPay</title>
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
          <h3 className='font-bold'>Change PIN</h3>
        </div>
        <p>Type your new 6 digits security PIN to use in LetsPay.</p>
        <form onSubmit={updatePIN} className='flex relative flex-col items-center gap-8 py-10'>
          <PinInput
              length={6}
              name='pin'
              initialValue=""
              onChange={(value, index) => setPin(value)}
              type="numeric"
              inputMode="number"
              style={{}}
              inputStyle={{borderColor: '#3A3D42', borderRadius: '10px', fontWeight: 'bold'}}
              inputFocusStyle={{borderColor: '#FF5F00'}}
              onComplete={(value, index) => {}}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            />
          <div className='flex-1 flex justify-center w-full py-5'>
            {(pin.length === 6) ?
            <button type='submit' className='bg-primary md:w-2/4 w-full h-12 text-white font-bold rounded-xl active:border-2'>Change PIN</button> :
            <button type='submit' disabled className='bg-gray-200 text-gray-300 md:w-2/4 w-full h-12 font-bold rounded-xl'>Change PIN</button>}
          </div>
          {alertSuccess &&
            <div className='text-center absolute bottom-0'>
              <p className='text-green-500'>{message}</p>
              <p onClick={()=> router.push('/profile')} className='text-blue-500 hover:font-bold cursor-pointer'>Back to profile</p>
            </div> }
            {alertFailed &&
            <div className='text-center absolute bottom-5'>
              <p className='text-red-500'>{message}</p>
            </div> }
        </form>
      </div>
    </section>

    <Footer />
    </div>
  )
}

export default withAuth(ChangeNewPIN)
