import React from 'react'
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { ArrowDown, ArrowLeft, ArrowUp, Grid, Plus, User, LogOut, ChevronLeft, ChevronRight } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../redux/reducers/auth"
import { transferLogout } from "../redux/reducers/transfer"
import http from '../helper/http'
import withAuth from '../components/hoc/withAuth'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const History = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const token = useSelector((state) => state?.auth?.token)
  const [page, setPage] = React.useState(1)

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
  const fullName = `${user.firstName} ${user.lastName}`

  // Get List Transctions
  const [transactions, setTransactions] = React.useState([])
  React.useEffect(() => {
    getTransactions()
  }, [page])
  const getTransactions = async () => {
    try {
      const response = await http(token).get(`/transactions?page=${page}&limit=5`)
      console.log(response)
      setTransactions(response?.data)
    } catch (error) {
      console.log(error)
    }
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

  // Logout
  const logout = () => {
    dispatch(logoutUser())
    dispatch(transferLogout())
  }

  return(
    <div className="bg-orange-100">
    <Head>
      <title>History | LetsPay</title>
    </Head>

    <Header token={token}/>

    <section className="px-5 py-10 bg-primary rounded-b-3xl font-primary md:hidden">
      <div onClick={() => router.push('/home')} className="flex items-center gap-5 text-white">
        <ArrowLeft />
        <h3 className="font-bold">History</h3>
      </div>
    </section>

    <section className="flex flex-col md:flex-row gap-5 font-primary text-secondary md:px-28 py-10">
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
        <div onClick={logout}>
          <div className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer">
            <LogOut />
            <p>Logout</p>
          </div>
        </div>
      </div>

      {/* Transaction History Laptop */}
      <div className="flex-[70%] hidden md:flex flex-col gap-8 md:bg-white md:shadow rounded-xl p-5">
        <div className="flex items-center">
          <div className="flex-1">
            <h3 className="font-bold">Transaction History</h3>
          </div>
          <div>
            <select className="bg-slate-300 rounded-xl px-5 py-2 focus:outline-none font-bold text-sm appearance-none">
              <option>--Select Filter--</option>
            </select>
          </div>
        </div>
        {!transactions?.results &&
        <div>
          <Skeleton height={400} />
        </div>}
        {transactions?.results?.length === 0 &&
        <p className='text-center py-32'>No results</p>}
        {transactions?.results?.map((transaction, index) => {
          return(
            <div key={Number(index)} className="flex items-center md:bg-transparent p-5 md:p-0 rounded-lg md:rounded-0">
              <div className="bg-slate-300 w-10 h-10 rounded mr-2">
                <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
              </div>
              <div className="flex-1">
                <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap">{transaction.recipientname}</p>
                  {transaction.sendername === ' ' ? <p className="text-sm">Top Up</p> : false}
                  {transaction.sendername === fullName ? <p className="text-sm">Transfer</p> : false}
              </div>
              <div className="flex-2">
                {transaction.sendername === ' ' ? <p className="text-green-500 font-bold">+Rp{new Intl.NumberFormat('en-DE').format(transaction.amount)}</p> : false}
                {transaction.sendername === fullName ? <p className="text-red-500 font-bold">-Rp{new Intl.NumberFormat('en-DE').format(transaction.amount)}</p> : false}
              </div>
            </div>
          )
        })}
        <div className='flex justify-center gap-5 items-center'>
          <div onClick={prevPage} className='flex justify-center items-center text-white bg-primary rounded shadow w-8 h-8 cursor-pointer active:border-2'><ChevronLeft /></div>
          <div>
            <p className='font-bold'>{page}</p>
          </div>
          <div onClick={nextPage} className='flex justify-center items-center text-white bg-primary rounded shadow w-8 h-8 cursor-pointer active:border-2'><ChevronRight /></div>
        </div>
      </div>

      {/* Transaction History Mobile */}
      <div className="px-5 md:hidden">
        <h3>This Week</h3>
      </div>
      <div className="flex items-center bg-white shadow md:bg-transparent md:shadow-none p-5 md:p-0 rounded-lg md:rounded-0 md:hidden">
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
      <div className="flex items-center bg-white shadow md:bg-transparent md:shadow-none p-5 md:p-0 rounded-lg md:rounded-0 md:hidden">
        <div className="bg-slate-300 w-10 h-10 rounded mr-2">
          <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
        </div>
        <div className="flex-1">
          <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap">Spotify</p>
          <p className="text-sm">Subscription</p>
        </div>
        <div className="flex-2">
          <p className="text-red-500 font-bold">-Rp49.000</p>
        </div>
      </div>

      <div className="px-5 mt-8 md:hidden">
        <h3>This Month</h3>
      </div>
      <div className="flex items-center bg-white shadow md:bg-transparent md:shadow-none p-5 md:p-0 rounded-lg md:rounded-0 md:hidden">
        <div className="bg-slate-300 w-10 h-10 rounded mr-2">
          <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
        </div>
        <div className="flex-1">
          <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap">Netflix</p>
          <p className="text-sm">Subscription</p>
        </div>
        <div className="flex-2">
          <p className="text-red-500 font-bold">-Rp149.000</p>
        </div>
      </div>
      <div className="flex items-center bg-white shadow md:bg-transparent md:shadow-none p-5 md:p-0 rounded-lg md:rounded-0 md:hidden">
        <div className="bg-slate-300 w-10 h-10 rounded mr-2">
          <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
        </div>
        <div className="flex-1">
          <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap">Bobi Sammy</p>
          <p className="text-sm">Transfer</p>
        </div>
        <div className="flex-2">
          <p className="text-green-500 font-bold">+Rp1.150.000</p>
        </div>
      </div>
      <div className="flex items-center bg-white shadow md:bg-transparent md:shadow-none p-5 md:p-0 rounded-lg md:rounded-0 md:hidden">
        <div className="bg-slate-300 w-10 h-10 rounded mr-2">
          <Image src={require('../assets/images/user.png')} alt='user' className="w-10 h-10 p-1" />
        </div>
        <div className="flex-1">
          <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap">Momo Taro</p>
          <p className="text-sm">Transfer</p>
        </div>
        <div className="flex-2">
          <p className="text-red-500 font-bold">-Rp200.000</p>
        </div>
      </div>

      <div className="flex gap-5 px-5 md:hidden">
        <div className="bg-white rounded text-green-500 p-2">
          <ArrowUp />
        </div>
        <div className="bg-white rounded text-red-500 p-2">
          <ArrowDown />
        </div>
        <div className="flex-1 font-bold text-center text-primary bg-white shadow rounded-xl p-2">
          <h1>Filter by Date</h1>
        </div>
      </div>

    </section>

    <Footer />
    </div>
  )
}

export default withAuth(History)
