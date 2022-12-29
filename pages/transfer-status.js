import React from 'react'
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import Header from "../assets/components/Header"
import Footer from "../assets/components/Footer"
import { ArrowUp, Grid, Plus, User, LogOut, X, Check, Download } from "react-feather"
import { useSelector } from 'react-redux'
import http from '../helper/http'

const TransferStatus = () => {
  const router = useRouter()
  const token = useSelector((state) => state?.auth?.token?.token)
  const [statusSuccess, seStatusSuccess] = React.useState(true)
  const recipientId = useSelector((state) => state?.transfer?.recipientId)
  const amount = useSelector((state) => state?.transfer?.amount)
  const notes = useSelector((state) => state?.transfer?.notes)
  const date = useSelector((state) => state?.transfer?.date)
  const time = useSelector((state) => state?.transfer?.time)

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

  return(
    <div className="bg-orange-100 relative">
    <Head>
      <title>Transfer Status | LetsPay</title>
    </Head>

    <Header token={token} />

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
            <p className="font-bold">Rp{new Intl.NumberFormat('en-DE').format(amount)}</p>
          </div>
          <div className="bg-white shadow rounded p-3">
            <p>Balance Left</p>
            <p className="font-bold">Rp{new Intl.NumberFormat('en-DE').format(user.balance)}</p>
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
        <div className='md:hidden p-5'>
          <h3 className='font-bold mb-5'>From</h3>
          <div className="flex items-center bg-white shadow p-3 rounded cursor-pointer">
          <div className="bg-slate-300 w-10 h-10 rounded mr-3">
            <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
          </div>
          <div className="flex-1">
            <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap font-bold">{`${user.firstName} ${user.lastName}`}</p>
            <p>{user.phoneNumber ? user.phoneNumber : '-'}</p>
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
            <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap font-bold">{`${recipient.firstName} ${recipient.lastName}`}</p>
            <p>{recipient.phoneNumber}</p>
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

    <Footer />
    </div>
  )
}

export default TransferStatus
