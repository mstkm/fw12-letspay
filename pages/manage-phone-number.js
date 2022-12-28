import React from 'react'
import Head from "next/head"
import { useRouter } from "next/router"
import Header from "../assets/components/Header"
import Footer from "../assets/components/Footer"
import Link from 'next/link'
import { ArrowLeft, ArrowUp, Grid, Plus, User, LogOut, Phone } from "react-feather"
import { useSelector } from 'react-redux'
import http from '../helper/http'

const UpdatePhoneNumber = () => {
  const router = useRouter()
  const token = useSelector((state) => state?.auth?.token?.token)
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [alertEditPhoneNumber, setAlertEditPhoneNumber] = React.useState(false)

  // Update phone number
  const [user, setUser] = React.useState.apply({})
  React.useEffect(() => {
    updatePhoneNumber().then((response) => {
      setUser(response)
    })
  }, [])
  const updatePhoneNumber = async (e) => {
    if (e && e.preventDefault) { e.preventDefault(); }
    try {
      const response = await http(token).post('/profile/phone-number',
      {phoneNumber})
      if (phoneNumber) {
        setAlertEditPhoneNumber(true)
      }
      return response
    } catch(error) {
      console.log(error)
    }
  }

  return(
    <div className="bg-orange-100 h-full">
    <Head>
      <title>Manage Phone Number | FazzPay</title>
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
          <ArrowLeft onClick={() => router.push('/personal-information')} className='md:hidden'/>
          <h3 className='font-bold'>Edit Phone Number</h3>
        </div>
        <p>Add at least one phone number for the transfer ID so you can start transfering your money to another user.</p>
        <form onSubmit={updatePhoneNumber} className='relative flex flex-col items-center gap-8 py-10'>
          <div className={`flex items-center gap-5 border-b-2 ${phoneNumber.length ? 'border-primary' : ''} pb-2`}>
            <div>
              <Phone className={`${phoneNumber.length ? 'text-primary' : ''}`}/>
            </div>
            <div>
              <select className='appearance-none bg-transparent focus:outline-none font-bold'>
                <option>+62</option>
              </select>
              <input onChange={(e) => setPhoneNumber('0'+e.target.value) & setAlertEditPhoneNumber(false)} type='text' name='phoneNumber' placeholder='Enter your phone number' className='pl-3 bg-transparent focus:outline-none'/>
            </div>
          </div>
          <div className='flex-1 flex flex-col items-center gap-3 w-full py-5'>
            {phoneNumber.length ?
            <button type='submit' className='bg-primary md:w-2/4 w-full h-12 text-white font-bold rounded-xl active:border-2'>Edit Phone Number</button> :
            <button type='submit' disabled className='bg-slate-400 md:w-2/4 w-full h-12 font-bold rounded-xl'>Edit Phone Number</button>}
            {alertEditPhoneNumber &&
            <div className='text-center absolute bottom-0'>
              <p className='text-green-500'>{user?.data?.message}</p>
              <p onClick={()=> router.push('/personal-information')} className='text-blue-500 hover:font-bold cursor-pointer'>Back to personal information</p>
            </div> }
          </div>
        </form>
      </div>
    </section>

    <Footer />
    </div>
  )
}

export default UpdatePhoneNumber
