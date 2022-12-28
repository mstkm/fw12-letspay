import React from 'react'
import {Phone, Lock, Download, ArrowLeft, ArrowRight} from 'react-feather'
import Link from "next/link"
import Image from "next/image"
import Head from 'next/head'
import bannerSatu from "../assets/images/bannersatu.png"
import bannerDua from "../assets/images/bannerdua.png"
import appStore from "../assets/images/appstore.png"
import microsoft from "../assets/images/microsoft.png"
import dropbox from "../assets/images/dropbox.png"
import hdanm from "../assets/images/hdanm.png"
import airbnb from "../assets/images/airbnb.png"
import canon from "../assets/images/canon.png"
import dell from "../assets/images/dell.png"
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const LandingPage = () => {
  const token = useSelector((state) => state?.auth?.token?.token)
  const router = useRouter()

  if (token) {
    router.push('/home')
  }

  return(
    <>
    <Head>
      <title>LetsPay</title>
    </Head>
    <div className="font-primary">
      {/* Navbar and Jumbotron */}
      <div className="bg-blue-100 px-5 md:px-28 py-5">
        {/* Navbar */}
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="flex-1">
            <h1 className="font-bold text-primary text-3xl">LetsPay</h1>
          </div>
          <Link href='/login' className="flex justify-center items-center w-28 h-8">
            <button className="text-primary font-bold bg-white border-[1px] border-primary py-1 w-24 rounded-lg hover:bg-primary hover:text-white active:py-0 active:w-20 active:h-6 active:text-xs md:active:text-sm text-sm md:text-base">Login</button>
          </Link>
          <Link href='/sign-up' className="flex justify-center items-center w-28 h-8">
            <button className="text-primary font-bold bg-white border-[1px] border-primary py-1 w-24 rounded-lg hover:bg-primary hover:text-white active:py-0 active:w-20 active:h-6 active:text-xs md:active:text-sm text-sm md:text-base">Sign Up</button>
          </Link>
        </div>

        {/* Jumbotron */}
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div >
            <Image src={bannerSatu} alt='banner' className="hidden md:block md:w-84" />
          </div>
          <div className="flex-1 md:pr-10 text-secondary">
            <h1 className="font-bold md:text-6xl mb-5 md:mb-10">Awesome App For Saving <span className="text-primary">Time.</span></h1>
            <p className="mb-5 md:mb-10 text-sm md:text-lg">We bring you a mobile app for banking problems that oftenly wasting much of your times.</p>
            <div className="flex items-center justify-center h-20 w-28">
              <button className="text-white font-bold bg-primary border-[1px] border-primary py-2 w-28 rounded-lg hover:bg-primary hover:text-white active:py-1 active:w-24 active:text-xs md:active:text-sm md:mb-10 text-sm md:text-base">Try It Free</button>
            </div>
            <p className="mb-5 text-sm md:text-lg">Available on</p>
            <div className="flex gap-10 items-center">
              <Image src={require('../assets/images/playstore.png')} alt='play store' className="w-5 md:w-10"/>
              <Image src={appStore} alt='app store' className="w-5 md:w-10"/>
            </div>
          </div>
        </div>
      </div>

      {/* List company */}
      <div className="grid grid-cols-3 justify-center gap-5 md:flex items-center md:gap-10 md:px-28 md:py-12 py-5 px-5 bg-slate-100">
        <div className='flex justify-center items-center'>
          <Image src={microsoft} alt='microsoft' className="w-10 md:w-36"/>
        </div>
        <div className='flex justify-center items-center'>
          <Image src={dropbox} alt='dropbox' className="w-10 md:w-36"/>
        </div>
        <div className='flex justify-center items-center'>
          <Image src={hdanm} alt='hdanm' className="w-10 md:w-36"/>
        </div>
        <div className='flex justify-center items-center'>
          <Image src={airbnb} alt='airbnb' className="w-10 md:w-36"/>
        </div>
        <div className='flex justify-center items-center'>
          <Image src={canon} alt='canon' className="w-10 md:w-36"/>
        </div>
        <div className='flex justify-center items-center'>
          <Image src={dell} alt='dell' className="w-10 md:w-24"/>
        </div>
      </div>

      {/* About */}
      <div className="bg-blue-100 flex flex-col justify-center items-center p-5 md:px-28 md:py-12 text-secondary">
        <h1 className="md:text-6xl font-bold text-center mb-3 md:mb-10"><span className="text-primary">About</span> the Application.</h1>
        <p className="text-sm md:text-lg md:w-7/12 text-center mb-3 md:mb-10">We have some great features from the application and it&apos;s totally free to use by all users around the world.</p>
        <div className='grid md:grid-cols-3 gap-3 md:gap-5'>
          <div className='flex flex-col items-center justify-center border hover:bg-white hover:rounded-xl p-5 md:px-8 md:py-12'>
            <div className='bg-slate-300 flex justify-center items-center w-12 h-12 rounded-full mb-3 md:mb-6'><Phone className='text-primary'/></div>
            <h3 className='md:text-xl font-bold mb-5 md:mb-12'>24/7 Support</h3>
            <p className='text-center text-sm md:text-base'>We have 24/7 contact support so you can contact us whenever you want and we will respond it.</p>
          </div>
          <div className='flex flex-col items-center justify-center border hover:bg-white hover:rounded-xl p-5 md:px-8 md:py-12'>
            <div className='bg-slate-300 flex justify-center items-center w-12 h-12 rounded-full mb-3 md:mb-6'><Lock className='text-primary'/></div>
            <h3 className='md:text-xl font-bold mb-5 md:mb-12'>Data Privacy</h3>
            <p className='text-center text-sm md:text-base'>We make sure your data is safe in our database and we will encrypt any data you submitted to us.</p>
          </div>
          <div className='flex flex-col items-center justify-center border hover:bg-white hover:rounded-xl p-5 md:px-8 md:py-12'>
            <div className='bg-slate-300 flex justify-center items-center w-12 h-12 rounded-full mb-3 md:mb-6'><Download className='text-primary'/></div>
            <h3 className='md:text-xl font-bold mb-5 md:mb-12'>Easy Download</h3>
            <p className='text-center text-sm md:text-base'>Zwallet is 100% totally free to use it&apos;s now available on Google Play Store and App Store.</p>
          </div>
        </div>
      </div>

      {/* Feature */}
      <div className="grid md:flex bg-slate-100 md:gap-10 items-center p-5 md:px-28 md:pb-10 text-secondary">
        <div>
          <Image src={bannerDua} alt='banner' className="hidden md:block w-84" />
        </div>
        <div className="flex-1 md:pr-10">
          <h1 className="font-bold md:text-6xl mb-5 md:mb-12 text-center md:text-left">All the <span className="text-primary">Great</span> LetsPay Features.</h1>
          <div className='bg-white border-none rounded-3xl p-3 md:p-5 md:mb-5 mb-3 text-sm md:text-base'>
            <p className='font-bold mb-3'><span className='text-primary mr-3'>1.</span> <span>Small Fee</span></p>
            <p>We only charge 5% of every success transaction done in LetsPay app.</p>
          </div>
          <div className='bg-white border-none rounded-3xl p-3 md:p-5 md:mb-5 mb-3 text-sm md:text-base'>
            <p className='font-bold mb-3'><span className='text-primary mr-3'>2.</span> <span>Data Secured</span></p>
            <p>All your data is secured properly in our system and it&apos;s encrypted.</p>
          </div>
          <div className='bg-white border-none rounded-3xl p-3 md:p-5 text-sm md:text-base'>
            <p className='font-bold mb-3'><span className='text-primary mr-3 mb-3'>3.</span> <span>User Friendly</span></p>
            <p>LetsPay come up with modern and sleek design and not complicated.</p>
          </div>
        </div>
      </div>

      {/* Testimony */}
      <div className="bg-blue-100 flex flex-col justify-center items-center p-5 md:px-28 md:py-12 text-secondary">
        <h1 className="md:text-6xl font-bold text-center mb-3 md:mb-10">What Users are <span className="text-primary">Saying.</span></h1>
        <p className="text-sm md:text-lg md:w-7/12 text-center mb-3 md:mb-10">We have some great features from the application and it&apos;s totally free to use by all users around the world.</p>
        <div className='flex items-center gap-2 md:gap-5'>
          <div className='bg-slate-300 flex justify-center items-center w-6 h-6 md:w-12 md:h-12 rounded-full cursor-pointer hover:bg-slate-500 hover:text-white'><ArrowLeft /></div>
          <div className='flex-1 flex flex-col items-center justify-center bg-white border rounded-xl p-5 md:p-12'>
            <div className='border w-16 h-16 md:w-20 md:h-20 rounded-lg bg-slate-300 p-3 mb-3'>
              <Image src={require('../assets/images/user.png')} alt='user' className='w-10 md:w-20'/>
            </div>
            <h3 className='md:text-lg font-bold mb-2'>Alex Hansinburg</h3>
            <p className='text-sm md:text-base mb-5 md:mb-10'>Designer</p>
            <p className='text-sm md:text-base text-center'>“This is the most outstanding app that I&apos;ve ever try in my live, this app is such an amazing masterpiece and it&apos;s suitable for you who is bussy with their bussiness and must transfer money to another person aut there. Just try this app and see the power!”</p>
          </div>
          <div className='bg-slate-300 flex justify-center items-center w-6 h-6 md:w-12 md:h-12 rounded-full cursor-pointer hover:bg-slate-500 hover:text-white'><ArrowRight /></div>
        </div>
      </div>

      {/* Footer */}
      <div className='bg-primary p-5 md:px-28 md:py-10 text-white'>
        <div>
          <h1 className='font-bold md:text-3xl mb-5 md:mb-10'>LetsPay</h1>
          <p className='text-sm md:text-base md:w-64 mb-5 md:mb-10'>Simplify financial needs and saving much time in banking needs with one single app.</p>
        </div>
        <hr className='mb-5 md:mb-10'/>
        <div className='flex flex-col md:flex-row gap-1 md:gap-10'>
          <p className='text-sm md:text-base flex-1'>2020 LetsPay. All right reserved.</p>
          <p className='text-sm md:text-base'>+62 5637 8882 9901</p>
          <p className='text-sm md:text-base'>contact@LetsPay.com</p>
        </div>
      </div>

    </div>
    </>
  )
}

export default LandingPage
