import React from 'react'
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import Header from "../assets/components/Header"
import Footer from "../assets/components/Footer"
import { ArrowLeft, ArrowUp, Grid, Plus, User, LogOut, Search, ChevronRight, ChevronLeft } from "react-feather"
import { useSelector } from 'react-redux'
import http from '../helper/http'

const Transfer = () => {
  const router = useRouter()
  const token = useSelector((state) => state?.auth?.token?.token)

  // Get Recipients
  const [recipients, setRecipients] = React.useState([])
  const [page, setPage] = React.useState(1);
  React.useEffect(() => {
    getRecipients().then((response)=> {
      setRecipients(response?.data?.results)
    })
  }, [page])
  const getRecipients = async () => {
    const response = await http(token).get(`/transactions/recipient?page=${page}&limit=5`)
    return response
  }

  // Pagination
  const nextPage = () => {
      setPage(page+1)
  }
  const prevPage = () => {
    if (page > 1) {
      setPage(page-1)
    } else {
      setPage(page)
    }
  }

  return(
    <div className="bg-orange-100">
    <Head>
      <title>Transfer | LetsPay</title>
    </Head>

    <Header token={token} />

    <section className="px-5 pb-5 pt-10 bg-primary rounded-b-3xl font-primary md:hidden">
      <div onClick={() => router.push('/home')} className="flex items-center gap-5 text-white mb-5">
        <ArrowLeft />
        <h3 className="font-bold">Find Receiver</h3>
      </div>
      <div className="relative">
        <Search className="absolute top-3 left-3" />
        <input type='text' name='receiver' placeholder='Search receiver here' className="bg-white w-full h-12 rounded-xl focus:outline-none pl-12" />
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
          <div onClick={() => router.push('/top-up')} className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer mb-8">
            <Plus />
            <p>Top Up</p>
          </div>
          <div onClick={() => router.push('/profile')} className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer mb-8">
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
            <h3 className="font-bold">Search Receiver</h3>
          </div>
          <div className='px-5 mb-5 md:hidden'>
            <h3 className='font-bold'>Contacts</h3>
            <p className='text-sm'>17 Contacts Found</p>
          </div>
          <div className="relative hidden md:block">
            <Search className="absolute top-3 left-3" />
            <input type='text' name='receiver' placeholder='Search receiver here' className="bg-slate-300 w-full h-12 rounded-xl p-2 focus:outline-none pl-12" />
          </div>
        </div>
        {recipients?.map((recipient, index) => {
          return(<div key={Number(index)} onClick={() => router.push(`/transfer-money/${recipient?.id}`)} className="flex items-center bg-white shadow p-3 rounded cursor-pointer mb-3 md:mb-0">
            <div className="bg-slate-300 w-10 h-10 rounded mr-3">
              <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
            </div>
            <div className="flex-1">
              <p className="w-[115px] md:w-full text-ellipsis overflow-hidden whitespace-nowrap font-bold">{`${recipient?.firstName} ${recipient?.lastName}`}</p>
              <p>{recipient.phoneNumber}</p>
            </div>
          </div>)
        })}
        <div className='flex justify-center gap-5 items-center'>
          <div onClick={prevPage} className='flex justify-center items-center text-white bg-primary rounded shadow w-8 h-8 cursor-pointer active:border-2'><ChevronLeft /></div>
          <div>
            <p className='font-bold'>{page}</p>
          </div>
          <div onClick={nextPage} className='flex justify-center items-center text-white bg-primary rounded shadow w-8 h-8 cursor-pointer active:border-2'><ChevronRight /></div>
        </div>
      </div>
    </section>

    <Footer />
    </div>
  )
}

export default Transfer
