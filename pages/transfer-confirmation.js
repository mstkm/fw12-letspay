import React from 'react'
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { ArrowLeft, ArrowUp, Grid, Plus, User, LogOut, Search, X } from "react-feather"
import PinInput from "react-pin-input"
import { useSelector, useDispatch } from 'react-redux'
import http from '../helper/http'
import {transfer} from '../redux/reducers/transfer'
import withAuth from '../components/hoc/withAuth'

const Confirmation = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const token = useSelector((state) => state?.auth?.token)
  const recipientId = useSelector((state) => state?.transfer?.recipientId)
  const amount = useSelector((state) => state?.transfer?.amount)
  const notes = useSelector((state) => state?.transfer?.notes)
  const [pin, setPin] = React.useState(null)
  const [showEnterPIN, setShowEnterPIN] = React.useState(false)

  // Get Recipient
  const [recipient, setRecipient] = React.useState({})
  React.useEffect(()=>{
    getRecipient()
  }, [])
  const getRecipient = async () => {
    try {
      const response = await http(token).get(`/transactions/recipient/${recipientId}`)
      setRecipient(response?.data?.results)
    } catch(error) {
      console.log(error)
    }
  }

  // Get User
  const [user, setUser] = React.useState({})
  React.useEffect(()=>{
    getUser()
  }, [])
  const getUser = async () => {
    try {
      const response = await http(token).get('/profile')
      setUser(response?.data?.results)
    } catch(error) {
      console.log(error)
    }
  }

  // Date and Time
  const dateTime = new Date()
  const dateTimeArr = String(dateTime).split(' ')
  const date = dateTimeArr[1] + ' ' + dateTimeArr[2] + ', ' + dateTimeArr[3]
  const timeArr = dateTimeArr[4].split(':')
  const time = timeArr[0] + ':' + timeArr[1]

  // Transfer
  const [messageError, setMessageError] = React.useState('')
  const transferTo = async () => {
    try {
      dispatch(transfer({amount, notes, recipientId, date, time}))
      const response = await http(token).post('/transactions/transfer', {amount, notes, recipientId, pin})
      router.push('/transfer-status')
      return response
    } catch(error) {
      setMessageError(error?.response?.data?.message)
      console.log(error)
    }
  }

  return(
    <div className="bg-orange-100 relative">
    <Head>
      <title>Confirmation | LetsPay</title>
    </Head>

    <Header token={token} />

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
          <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap font-bold">{`${recipient?.firstName} ${recipient?.lastName}`}</p>
          <p>{recipient?.phoneNumber}</p>
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
            <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap font-bold">{`${recipient.firstName} ${recipient.lastName}`}</p>
            <p>{recipient.phoneNumber}</p>
          </div>
        </div>
        <div className='grid grid-cols-2 md:flex md:flex-col gap-5 p-5'>
          <h3 className="hidden md:block font-bold">Details</h3>
          <div className="bg-white shadow rounded p-3">
            <p>Amount</p>
            <p className="font-bold">Rp{new Intl.NumberFormat('en-DE').format(amount)}</p>
          </div>
          <div className="bg-white shadow rounded p-3">
            <p>Balance Left</p>
            <p className="font-bold">Rp{new Intl.NumberFormat('en-DE').format(user.balance - amount)}</p>
          </div>
          <div className="hidden md:block bg-white shadow rounded p-3">
            <p>Date & Time</p>
            <p className="font-bold">{`${date} - ${time}`}</p>
          </div>
          <div className="md:hidden bg-white shadow rounded p-3">
            <p>Date</p>
            <p className="font-bold">{date}</p>
          </div>
          <div className="md:hidden bg-white shadow rounded p-3">
            <p>Time</p>
            <p className="font-bold">{time}</p>
          </div>
          <div className="col-span-2 bg-white shadow rounded p-3">
            <p>Notes</p>
            <p className="font-bold">{notes}</p>
          </div>
        </div>
        <div className="flex md:justify-end p-5">
          <div onClick={() => setShowEnterPIN(true)} className="flex justify-center items-center w-full md:w-28 h-12">
            <button className="btn bg-primary border-primary hover:bg-primary hover:border-primary w-full md:w-28 px-5 py-3 rounded-xl text-white font-bold">Continue</button>
          </div>
        </div>
      </div>
    </section>

    {showEnterPIN ?
    <section className='absolute top-0 h-full w-screen bg-slate-300/80'>
      <div className='sticky bg-white w-[90%] md:w-[30%] p-8 rounded-xl left-6 inset-y-1/4 md:inset-x-1/3 md:inset-y-1/4'>
        {messageError && <p className='text-red-500 text-center py-3'>{messageError}</p>}
        <div className='relative'>
          <p className='font-bold mb-5'>Enter PIN to Transfer</p>
          <p>Enter your 6 digits PIN for confirmation to continue transfering money. </p>
          <div onClick={() => setShowEnterPIN(false)} className='absolute top-0 right-0'>
            <button><X /></button>
          </div>
        </div>
        <div className='py-10'>
          <PinInput
              length={6}
              initialValue=""
              onChange={(value, index) => {setPin(value) & setMessageError(false)}}
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
          <div onClick={transferTo} className="flex justify-center items-center w-28 h-12">
            <button className="btn bg-primary border-primary hover:bg-primary hover:border-primary px-5 py-3 rounded-xl text-white font-bold">Transfer Now</button>
          </div>
        </div>
        <div className=" md:hidden flex justify-end">
          <div onClick={transferTo} className="flex justify-center items-center w-full h-12">
            <button className="btn bg-primary border-primary hover:bg-primary hover:border-primary w-full px-5 py-3 rounded-xl text-white font-bold">Transfer Now</button>
          </div>
        </div>
      </div>
    </section> : false}

    <Footer />
    </div>
  )
}

export default withAuth(Confirmation)
