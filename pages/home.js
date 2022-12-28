import Head from "next/head"
import Image from "next/image"
import { Bell, Grid, ArrowUp, Plus, User, LogOut, ArrowDown } from "react-feather"
import Link from "next/link"
import Header from "../assets/components/Header"
import Footer from "../assets/components/Footer"
import { useRouter } from "next/router"
import {useSelector, useDispatch} from 'react-redux'
import { logoutUser } from "../redux/reducers/auth"
import jwt_decode from "jwt-decode"
import http from "../helper/http"
import React from "react"


const Home = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const token = useSelector((state) => state?.auth?.token?.token)
  if (token === null) {
    router.push('login')
  }

  // Get User
  const [user, setUser] = React.useState({})
  React.useEffect(()=> {
    getUser().then((data)=> {
      setUser(data)
    })
  }, [])

  const getUser = async () => {
    try {
      const {data} = await http(token).get('/profile')
      return data?.results
    } catch (error) {
      console.log(error?.response?.data?.message)
    }
  }

  const logout = () => {
    dispatch(logoutUser())
    router.push('/login')
  }

  return(
    <div className="bg-orange-100">
    <Head>
      <title>Home | Fazzpay</title>
    </Head>

    <Header token={token} />
    <section className="md:hidden flex items-center bg-primary md:bg-white rounded-b-3xl drop-shadow-md font-primary px-5 md:px-32 py-8">
      <div className="md:hidden mr-3 bg-slate-300 p-2 rounded">
        <Image src={require('../assets/images/user.png')} className='w-8' alt='photo-profile'/>
      </div>
      <div className="flex-1 md:hidden">
        <p className="text-sm text-slate-500">Balance</p>
        <h5 className="font-bold text-lg text-white md:text-secondary">Rp120.000</h5>
      </div>
      <div className="ml-8 md:hidden">
        <Bell className="text-white md:text-secondary"/>
      </div>
    </section>

    <section className="flex gap-5 font-primary md:px-28 md:py-10 text-secondary">
      {/* Menu */}
      <div className="hidden md:flex flex-col flex-[30%] bg-white shadow rounded-xl py-8">
        <div className="flex-1">
          <div className="flex items-center gap-5 px-8 text-primary font-bold border-l-2 border-primary cursor-pointer mb-8">
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
          <div onClick={() => router.push('/profile')} className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer mb-8">
            <User />
            <p>Profile</p>
          </div>
        </div>
        <div>
          <div onClick={logout} className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer">
            <LogOut />
            <p>Logout</p>
          </div>
        </div>
      </div>

      <div className="flex-[70%] flex flex-col gap-5">
        <div className="hidden md:flex items-center bg-primary shadow p-5 rounded-xl">
          <div className="flex-1 text-white">
            <p>Balance</p>
            <p className="text-4xl font-bold py-2">{'Rp'+new Intl.NumberFormat('en-DE').format(user?.balance)}</p>
            <p>{user?.phoneNumber}</p>
          </div>
          <div className="flex flex-col gap-3">
            <div onClick={() => router.push('/transfer')} className="h-10 w-32 flex items-center justify-center  cursor-pointer">
              <button className="flex items-center justify-center  cursor-pointer gap-2 font-bold bg-orange-400 border-2 rounded-lg h-10 w-32 text-white border-white active:h-8 active:w-28 active:text-sm">
                <ArrowUp />
                <p>Transfer</p>
              </button>
            </div>
            <div onClick={() => router.push('/top-up')} className="h-10 w-32 flex items-center justify-center  cursor-pointer">
              <button className="flex items-center justify-center  cursor-pointer gap-2 font-bold bg-orange-400 border-2 rounded-lg h-10 w-32 text-white border-white active:h-8 active:w-28 active:text-sm">
                <Plus />
                <p>Top Up</p>
              </button>
            </div>
          </div>
        </div>
        <div className="md:flex gap-5">
          <div className="hidden md:block flex-[55%] bg-white shadow p-5 rounded-xl">
            <div className="flex items-center mb-10">
              <div className="flex-1">
                <ArrowDown className="text-green-500" />
                <p>Income</p>
                <p className="font-bold">Rp2.120.000</p>
              </div>
              <div>
                <ArrowUp className="text-red-500"/>
                <p>Expense</p>
                <p className="font-bold">Rp1.560.000</p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image src={require('../assets/images/graphic.png')} alt='graphic' className="w-4/5" />
            </div>
          </div>
          <div className="flex justify-center gap-3 px-5 py-5 md:hidden">
            <div onClick={() => router.push('/transfer')} className="flex w-full items-center justify-center  cursor-pointer">
              <button className="flex py-3 w-full items-center justify-center  cursor-pointer gap-2 font-bold bg-orange-400 border-2 rounded-lg text-white border-white active:h-8 active:w-28 active:text-sm">
                <ArrowUp />
                <p>Transfer</p>
              </button>
            </div>
            <div onClick={() => router.push('/top-up')} className="flex w-full items-center justify-center  cursor-pointer">
              <button className="flex py-3 w-full items-center justify-center  cursor-pointer gap-2 font-bold bg-orange-400 border-2 rounded-lg text-white border-white active:h-8 active:w-28 active:text-sm">
                <Plus />
                <p>Top Up</p>
              </button>
            </div>
          </div>
          <div className="md:flex-[45%] md:bg-white md:shadow md:p-5 md:rounded-xl">
            <div className="flex items-center mb-8 px-5 md:px-0 mt-5 md:mt-0">
              <p className="flex-1 font-bold">Transaction History</p>
              <Link href='/history' className="text-sm font-bold text-primary hover:underline">See All</Link>
            </div>
            <div className="flex flex-col gap-3 md:gap-5 pb-10 md:pb-0">
              <div className="flex items-center bg-white shadow md:bg-transparent md:shadow-none p-5 md:p-0 rounded-lg md:rounded-0">
                <div className="bg-slate-300 w-10 h-10 rounded mr-2">
                  <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
                </div>
                <div className="flex-1">
                  <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap">Samuel Suhi</p>
                  <p className="text-sm">Accept</p>
                </div>
                <div className="flex-2">
                  <p className="text-green-500 font-bold">+Rp50.000</p>
                </div>
              </div>
              <div className="flex items-center bg-white shadow md:bg-transparent md:shadow-none p-5 md:p-0 rounded-lg md:rounded-0">
                <div className="bg-slate-300 w-10 h-10 rounded mr-2">
                  <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
                </div>
                <div className="flex-1">
                  <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap">Netflix</p>
                  <p className="text-sm">Transfer</p>
                </div>
                <div className="flex-2">
                  <p className="text-red-500 font-bold">-Rp149.000</p>
                </div>
              </div>
              <div className="flex items-center bg-white shadow md:bg-transparent md:shadow-none p-5 md:p-0 rounded-lg md:rounded-0">
                <div className="bg-slate-300 w-10 h-10 rounded mr-2">
                  <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
                </div>
                <div className="flex-1">
                  <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap">Christine Marhaban Marhaban</p>
                  <p className="text-sm">Accept</p>
                </div>
                <div className="flex-2">
                  <p className="text-green-500 font-bold">+Rp150.000</p>
                </div>
              </div>
              <div className="flex items-center bg-white shadow md:bg-transparent md:shadow-none p-5 md:p-0 rounded-lg md:rounded-0">
                <div className="bg-slate-300 w-10 h-10 rounded mr-2">
                  <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
                </div>
                <div className="flex-1">
                  <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap">Netflix</p>
                  <p className="text-sm">Transfer</p>
                </div>
                <div className="flex-2">
                  <p className="text-red-500 font-bold">-Rp249.000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
    </div>
  )
}


export default Home
