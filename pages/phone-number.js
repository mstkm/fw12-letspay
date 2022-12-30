import Image from "next/image"
import Head from "next/head"
import React from 'react'
import { Phone } from "react-feather"
import {useSelector} from 'react-redux'
import http from '../helper/http'
import { useRouter } from "next/router"
import authPrivate from '../components/hoc/authPrivate'

const PhoneNumber = () => {
  const router = useRouter()
  const token = useSelector((state) => state?.auth?.token?.token)
  const [newPhoneNumber, setNewPhoneNumber] = React.useState(null)
  const [errorMessage, setErrorMessage] = React.useState(false)

  // Update phone number
  const createPhoneNumber = async (e) => {
    if (e && e.preventDefault) { e.preventDefault(); }
    try {
      const {data} = await http(token).post('/profile/phone-number', {phoneNumber: newPhoneNumber})
      router.push('/pin')
      return data?.results
    } catch (error) {
      console.log(error?.response?.data?.message)
      setErrorMessage(true)
    }
  }

  return(
    <>
    <Head>
      <title>Create PIN | LetsPay</title>
    </Head>
    <div className="flex font-primary">
      {/* Left */}
      <div className="hidden md:block flex-[55%] h-screen px-28 py-5">
        <svg xmlns="http://www.w3.org/2000/svg" className='absolute left-0 top-0 h-60' viewBox="0 0 1440 320"><path fill="#ff9500" fill-opacity="1" d="M0,96L60,117.3C120,139,240,181,360,202.7C480,224,600,224,720,192C840,160,960,96,1080,85.3C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
        <svg xmlns="http://www.w3.org/2000/svg" className='absolute left-0 top-3 h-60' viewBox="0 0 1440 320"><path fill="#ff9500" fill-opacity="0.5" d="M0,96L60,117.3C120,139,240,181,360,202.7C480,224,600,224,720,192C840,160,960,96,1080,85.3C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
        <h1 className="font-bold text-4xl text-white mb-10">LetsPay</h1>
        <Image src={require('../assets/images/doublebanner.png')} alt='banner' className='w-3/5 mb-5'/>
        <h2 className="font-bold text-xl text-white mb-5">App that Covering Banking Needs.</h2>
        <p className="text-white text-sm">LetsPay is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in LetsPay everyday with worldwide users coverage.</p>
      </div>

      {/* Right */}
      <div className="relative flex-[45%] flex flex-col justify-center h-screen bg-orange-50 md:pl-16 md:pr-36 md:py-10">
        <div className="md:hidden text-center p-16">
          <h1 className="font-bold text-4xl text-primary">LetsPay</h1>
        </div>
        <div className="bg-white md:bg-transparent p-10 md:p-0 border-none rounded-t-3xl">
        <div className="md:hidden text-center mb-10">
          <h3 className="font-bold text-xl mb-3">Create Phone Number</h3>
          <p>Add at least one phone number for the transfer ID so you can start transfering your money to another user.</p>
        </div>
        <div className="hidden md:block">
          <h2 className="font-bold text-xl mb-5">Create Phone Number</h2>
          <p>Add at least one phone number for the transfer ID so you can start transfering your money to another user.</p>
        </div>
        <form onSubmit={createPhoneNumber} className='flex flex-col items-center'>
          {errorMessage && <p className="text-red-500 pt-2">Phone number already exists</p>}
          <div className={`flex items-center gap-5 border-b-2 ${newPhoneNumber?.length ? 'border-primary' : ''} pb-2`}>
          <div>
            <Phone className={`${newPhoneNumber?.length ? 'text-primary' : ''}`}/>
          </div>
          <div>
            <select className='appearance-none bg-transparent focus:outline-none font-bold'>
              <option>+62</option>
            </select>
            <input onChange={(e) => setNewPhoneNumber('0'+e.target.value) & setErrorMessage(false)} type='number' name='phoneNumber' placeholder='Enter your phone number' className='pl-3 py-10 bg-transparent focus:outline-none'/>
          </div>
          </div>
          <div className="flex justify-center items-center w-full h-8 mb-10">
            {(newPhoneNumber?.length > 10) ?
            <button className='w-full text-white bg-primary font-bold py-3 border rounded-xl active:w-11/12 active:py-2 active:text-sm'>Confirm</button> :
            <button disabled className='w-full bg-gray-200 text-gray-300 font-bold py-3 border rounded-xl'>Confirm</button>}
          </div>
        </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default authPrivate(PhoneNumber)
