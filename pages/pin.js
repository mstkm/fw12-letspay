import Image from "next/image"
import Head from "next/head"
import React from 'react'
import PinInput from "react-pin-input"
import { Check } from "react-feather"

const Pin = () => {
  const [pin, setPin] = React.useState(null)
  const [confirm, setConfirm] = React.useState(false)
  const [confirmSubmit, setConfirmSubmit] = React.useState(true)

  const createPin = (e) => {
    e.preventDefault()
    setConfirmSubmit(false)
  }

  return(
    <>
    <Head>
      <title>Create PIN | FazzPay</title>
    </Head>
    <div className="flex font-primary">
      {/* Left */}
      <div className="hidden md:block flex-[55%] bg-[url('../assets/images/authbackground.png')] h-screen px-28 py-5">
        <h1 className="font-bold text-4xl text-white mb-10">FazzPay</h1>
        <Image src={require('../assets/images/doublebanner.png')} alt='banner' className='w-3/5 mb-5'/>
        <h2 className="font-bold text-xl text-white mb-5">App that Covering Banking Needs.</h2>
        <p className="text-white text-sm">FazzPay is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in FazzPay everyday with worldwide users coverage.</p>
      </div>

      {/* Right */}
      <div className="flex-[45%] bg-blue-50 md:pl-16 md:pr-36 md:py-10">
        <div className="md:hidden text-center p-16">
          <h1 className="font-bold text-4xl text-primary">FazzPay</h1>
        </div>
        {confirmSubmit ?
        <div className="bg-white md:bg-transparent p-10 md:p-0 border-none rounded-t-3xl">
        <div className="md:hidden text-center mb-10">
          <h3 className="font-bold text-xl mb-3">Create Security PIN</h3>
          <p>Create a PIN that&apos;s contain 6 digits number for security purpose in FazzPay.</p>
        </div>
        <div className="hidden md:block mb-10">
          <h2 className="font-bold text-xl mb-5">Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.</h2>
          <p>Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it secret and don&apos;t tell anyone about your FazzPay account password and the PIN.</p>
        </div>
        <form onSubmit={createPin}>
          <PinInput
            length={6}
            initialValue=""
            onChange={(value, index) => {setPin(value)}}
            type="numeric"
            inputMode="number"
            style={{marginBottom: '50px'}}
            inputStyle={{borderColor: '#3A3D42', borderRadius: '10px', fontWeight: 'bold'}}
            inputFocusStyle={{borderColor: '#FF5F00'}}
            onComplete={(value, index) => {setConfirm(true)}}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />
          <div className="flex justify-center items-center w-full h-8 mb-10">
            {confirm ?
            <button className='w-full text-white bg-primary font-bold py-3 border rounded-xl active:w-11/12 active:py-2 active:text-sm'>Confirm</button> :
            <button disabled className='w-full bg-slate-300 font-bold py-3 border rounded-xl'>Confirm</button>}
          </div>
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
          <p>Your PIN was successfully created and you can now access all the features in FazzPay.</p>
        </div>
        <div className="hidden md:block mb-10">
          <h2 className="font-bold text-xl mb-5">Your PIN Was Successfully Created.</h2>
          <p>Your PIN was successfully created and you can now access all the features in FazzPay.</p>
        </div>
        <div className="flex justify-center items-center w-full h-8 mb-10">
          <button className='w-full text-white bg-primary font-bold py-3 border rounded-xl active:w-11/12 active:py-2 active:text-sm'>Go To Dashboard</button>
        </div>
        </div>}
      </div>
    </div>
    </>
  )
}

export default Pin
