import React from 'react'
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import Header from "../assets/components/Header"
import Footer from "../assets/components/Footer"
import { ArrowDown, ArrowLeft, ArrowUp, Grid, Plus, User, LogOut, Search, Edit2 } from "react-feather"

const Transfer = () => {
  const router = useRouter()
  const [selectedReceiver, setSelectedReceiver] = React.useState(false)
  const [filledNotes, setFilledNotes] = React.useState(false)

  return(
    <div className="bg-orange-100 h-screen md:h-full">
    <Head>
      <title>Transfer | FazzPay</title>
    </Head>

    <Header />

    <section className="px-5 pt-10 pb-5 bg-primary rounded-b-3xl font-primary md:hidden">
      <div onClick={() => router.push('/home')} className="flex items-center gap-5 text-white mb-5">
        <ArrowLeft />
        <h3 className="font-bold">Transfer</h3>
      </div>
      <div className="flex items-center bg-white shadow p-3 rounded cursor-pointer">
          <div className="bg-slate-300 w-10 h-10 rounded mr-3">
            <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
          </div>
          <div className="flex-1">
            <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap font-bold">Samuel Suhi</p>
            <p>+62 813-8492-9994</p>
          </div>
        </div>
      <div>

      </div>
    </section>

    <section className="flex flex-col md:flex-row gap-5 font-primary text-secondary md:px-28 py-10">
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

      <div className="flex-[70%] md:flex flex-col gap-8 md:bg-white md:shadow rounded-xl p-5">
        <div className="hidden md:flex flex-col gap-5">
          <div className="flex-1">
            <h3 className="font-bold">Transfer Money</h3>
          </div>
        </div>
        <div className="hidden md:flex items-center bg-white shadow p-3 rounded cursor-pointer">
          <div className="bg-slate-300 w-10 h-10 rounded mr-3">
            <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
          </div>
          <div className="flex-1">
            <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap font-bold">Samuel Suhi</p>
            <p>+62 813-8492-9994</p>
          </div>
        </div>
        <div className='hidden md:block'>
          <p className="w-2/4">Type the amount you want to transfer and then press continue to the next steps.</p>
        </div>
        <div className="flex flex-col items-center gap-5 md:py-10">
          <div>
            <input type='number' name='amount' placeholder='0.00' className="text-center bg-transparent text-primary text-3xl font-bold focus:outline-none "/>
          </div>
          <p className="font-bold py-5">Rp120.000 Available</p>
          <div className={`relative border-b-2 ${filledNotes ? 'border-primary' : ''} py-2`}>
            <Edit2 className={`absolute ${filledNotes ? 'text-primary' : ''}`} />
            <input onChange={() => setFilledNotes(true)} type='text' name='notes' placeholder="Add some notes" className="pl-10 focus:outline-none bg-transparent"/>
          </div>
        </div>
        <div className="hidden md:flex justify-end">
          <div className="flex justify-center items-center w-28 h-12">
            <button className="bg-primary px-5 py-2 rounded-xl text-white font-bold active:text-sm active:px-4 active:py-1">Continue</button>
          </div>
        </div>
      </div>
    </section>

    <Footer />
    </div>
  )
}

export default Transfer
