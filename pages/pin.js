import Image from "next/image"
import Head from "next/head"
import React from 'react'
import PinInput from "react-pin-input"
import { Check } from "react-feather"
import {useSelector} from 'react-redux'
import http from '../helper/http'
import { useRouter } from "next/router"
import jwt_decode from 'jwt-decode'
import authPrivate from "../components/hoc/authPrivate"
import { Oval } from  'react-loader-spinner'

const Pin = () => {
  const router = useRouter()
  const token = useSelector((state) => state?.auth?.token)
  const {id: userId} = jwt_decode(token)
  const [newPin, setNewPin] = React.useState(null)
  const [confirmSubmit, setConfirmSubmit] = React.useState(true)

  // Create PIN
  const [loadingPIN, setLoadingPIN] = React.useState(false)
  const [successPINMessage, setSuccessPINMessage] = React.useState(null)
  const [failedPINMessage, setFailedPINMessage] = React.useState(null)
  const createPin = async (e) => {
    if (e && e.preventDefault) { e.preventDefault(); }
    setLoadingPIN(true)
    setFailedPINMessage(null)
    setSuccessPINMessage(null)
    try {
      const {data} = await http(token).post('/auth/set-pin', {userId, pin: newPin})
      setLoadingPIN(false)
      setSuccessPINMessage('Create phone number success')
      setConfirmSubmit(false)
      return data?.results
    } catch (error) {
      console.log(error?.response?.data?.message)
      setLoadingPIN(false)
      setFailedPINMessage(error?.response?.data?.message)
    }
  }

  return(
    <>
    <Head>
      <title>Create PIN | LetsPay</title>
    </Head>
    <div className="flex font-primary">
      {/* Left */}
      <div className="hidden md:block flex-[55%] bg-primary h-screen px-28 py-5">
        <svg xmlns="http://www.w3.org/2000/svg" className='absolute left-0 top-0 h-60' viewBox="0 0 1440 320"><path fill="#ff9500" fill-opacity="1" d="M0,96L60,117.3C120,139,240,181,360,202.7C480,224,600,224,720,192C840,160,960,96,1080,85.3C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
        <svg xmlns="http://www.w3.org/2000/svg" className='absolute left-0 top-3 h-60' viewBox="0 0 1440 320"><path fill="#ff9500" fill-opacity="0.5" d="M0,96L60,117.3C120,139,240,181,360,202.7C480,224,600,224,720,192C840,160,960,96,1080,85.3C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
        <h1 className="relative font-bold text-4xl text-white mb-10">LetsPay</h1>
        <Image src={require('../assets/images/doublebanner.png')} alt='banner' className='relative w-3/5 mb-5'/>
        <h2 className="font-bold text-xl text-white mb-5">App that Covering Banking Needs.</h2>
        <p className="text-white text-sm">LetsPay is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in LetsPay everyday with worldwide users coverage.</p>
      </div>

      {/* Right */}
      <div className="relative flex-[45%] flex flex-col justify-center h-screen bg-orange-50 md:pl-16 md:pr-36 md:py-10">
        <div className="md:hidden text-center p-16">
          <h1 className="font-bold text-4xl text-primary">LetsPay</h1>
        </div>
        {confirmSubmit ?
        <div className="bg-white md:bg-transparent p-10 md:p-0 border-none rounded-t-3xl">
        <div className="md:hidden text-center mb-10">
          <h3 className="font-bold text-xl mb-3">Create Security PIN</h3>
          <p>Create a PIN that&apos;s contain 6 digits number for security purpose in LetsPay.</p>
        </div>
        <div className="hidden md:block mb-10">
          <h2 className="font-bold text-xl mb-5">Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.</h2>
          <p>Create 6 digits pin to secure all your money and your data in LetsPay app. Keep it secret and don&apos;t tell anyone about your LetsPay account password and the PIN.</p>
        </div>
        <form onSubmit={createPin} className='flex flex-col items-center'>
          <PinInput
            length={6}
            initialValue=""
            onChange={(value, index) => {setNewPin(value)}}
            type="numeric"
            inputMode="number"
            style={{marginBottom: '50px'}}
            inputStyle={{borderColor: '#3A3D42', borderRadius: '10px', fontWeight: 'bold'}}
            inputFocusStyle={{borderColor: '#FF5F00'}}
            onComplete={(value, index) => {}}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />
          <div className="flex justify-center items-center w-full h-8 mb-10">
            {newPin?.length === 6 ?
            <button className='btn w-full text-white bg-primary border-primary hover:bg-primary hover:border-primary font-bold py-3 border rounded-xl'>Confirm</button> :
            <button disabled className='w-full bg-gray-200 text-gray-300 font-bold py-3 border rounded-xl'>Confirm</button>}
          </div>
          {loadingPIN && <div className='mb-8 flex justify-center'>
            <Oval
              height={25}
              wdivth={25}
              color="#FF5F00"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#fACEB6"
              strokeWidth={5}
              strokeWidthSecondary={5}
            />
          </div>}
          {successPINMessage && <p className='mb-8 text-center text-green-600'>{successPINMessage}</p>}
          {failedPINMessage && <p className='mb-8 text-center text-red-600'>{failedPINMessage}</p>}
        </form>
        </div>
        :
        // after confirm
        <div className="md:flex flex-col justify-center md:h-full bg-white md:bg-transparent p-10 md:p-0 border-none rounded-t-3xl">
        <div className="flex justify-center md:block mb-5">
          <div className="flex items-center justify-center bg-green-500 w-12 h-12 border-none rounded-full"><Check className="text-white" /></div>
        </div>
        <div className="md:hidden text-center mb-10">
          <h3 className="font-bold text-xl mb-3">Your PIN Was Successfully Created.</h3>
          <p>Your PIN was successfully created and you can now access all the features in LetsPay.</p>
        </div>
        <div className="hidden md:block mb-10">
          <h2 className="font-bold text-xl mb-5">Your PIN Was Successfully Created.</h2>
          <p>Your PIN was successfully created and you can now access all the features in LetsPay.</p>
        </div>
        <div onClick={() => router.push('/home')} className="flex justify-center items-center w-full h-8 mb-10">
          <button className='w-full text-white bg-primary font-bold py-3 border rounded-xl active:w-11/12 active:py-2 active:text-sm'>Go To Dashboard</button>
        </div>
        </div>}
      </div>
    </div>
    </>
  )
}

export default authPrivate(Pin)
