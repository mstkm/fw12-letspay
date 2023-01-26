import Head from "next/head"
import Image from "next/image"
import { Bell, Grid, ArrowUp, Plus, User, LogOut, ArrowDown } from "react-feather"
import Link from "next/link"
import Header from '../components/Header'
import Footer from "../components/Footer"
import { useRouter } from "next/router"
import {useSelector, useDispatch} from 'react-redux'
import { logoutUser } from "../redux/reducers/auth"
import { transferLogout } from "../redux/reducers/transfer"
import http from "../helper/http"
import React from "react"
import withAuth from "../components/hoc/withAuth"
import ListNotifications from "../components/ListNotifications"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Home = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const token = useSelector((state) => state?.auth?.token)

  // Get User
  const [user, setUser] = React.useState({})
  const [modalSetPin, setModalSetPin] = React.useState(false)
  const fullName = `${user?.firstName} ${user?.lastName}`
  React.useEffect(()=> {
    const getUser = async () => {
      try {
        const {data} = await http(token).get('/profile')
        setUser(data)
        if (!data?.results?.phoneNumber && !data?.results?.pin) {
          setModalSetPin(true)
        } else {
          setModalSetPin(false)
        }
        return data?.results
      } catch (error) {
        console.log(error?.response?.data?.message)
      }
    }
    getUser().then((data)=> {
      setUser(data)
    })
  }, [setUser, token])

  // Get List Transctions
  const [transactions, setTransactions] = React.useState([])
  React.useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await http(token).get('/transactions?page=1&limit=5')
      setTransactions(response?.data?.results)
      } catch (error) {
        console.log(error)
      }
    }
    getTransactions()
  }, [token])


  // Show Notification
  const [showNotification, setShowNotification] = React.useState(false)
  const showNotificationHandle = () => {
    if (showNotification === false) {
      setShowNotification(true)
    } else {
      setShowNotification(false)
    }
  }

  // Logout
  const logout = () => {
    dispatch(logoutUser())
    dispatch(transferLogout())
  }

  // Check phone number and pin

  React.useEffect(() => {

  }, [])

  return(
    <div className="bg-orange-100 relative h-screen md:h-full">
    <Head>
      <title>Home | LetsPay</title>
    </Head>

    <Header token={token} />

    {user?.firstName && modalSetPin &&
    <div className="fixed top-0 bg-black/80 w-screen h-screen z-10 flex justify-center items-center">
      <div className="bg-white p-8 rounded flex flex-col justify-center items-center gap-5">
        <p className="text-xl font-bold">Congratulation! Your registration successful...</p>
        <div>
          <button onClick={() => router.push('/phone-number')} className="btn bg-primary border-primary hover:bg-primary hover:border-primary">Set Phone Number and PIN</button>
        </div>
      </div>
    </div>}

    <section className="md:hidden flex items-center bg-primary md:bg-white rounded-b-3xl drop-shadow-md font-primary px-5 md:px-32 py-8">
      <div className="md:hidden mr-3 bg-slate-300 p-2 rounded">
        <Image src={user?.picture ? `https://68xkph-8888.preview.csb.app/upload/${user?.picture}` : require('../assets/images/user.png')} className='w-12 h-12 rounded-full' alt='photo-profile' width={80} height={80} />
      </div>
      <div className="flex-1 md:hidden">
        <p className="text-sm text-slate-500">Balance</p>
        <h5 className="font-bold text-lg text-white md:text-secondary">Rp120.000</h5>
      </div>
      <div onClick={showNotificationHandle} className="ml-8 md:hidden">
        <Bell className="text-white md:text-secondary"/>
      </div>
      {showNotification ?
      <div className="absolute px-5 right-0 top-24">
      <div className="flex flex-col gap-2 bg-white p-3 rounded shadow">
        <ListNotifications />
      </div>
    </div> : false}
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
        {!user?.firstName &&
        <div>
          <Skeleton height={550} />
        </div>}
        {user?.firstName &&
        <>
          <div className="hidden md:flex items-center bg-primary shadow p-5 rounded-xl">
            <div className="flex-1 text-white">
              <p>Balance</p>
              <p className="text-4xl font-bold py-2">{'Rp' + new Intl.NumberFormat('en-DE').format(user?.balance)}</p>
              <p>{user?.phoneNumber}</p>
            </div>
            <div className="flex flex-col gap-3">
              <div onClick={() => router.push('/transfer')} className="h-10 w-32 flex items-center justify-center  cursor-pointer">
                <button type="button" className="btn flex items-center justify-center  cursor-pointer gap-2 font-bold bg-orange-400 border-white hover:bg-orange-400 hover:border-white border-2 rounded-lg h-10 w-32 text-white">
                  <ArrowUp />
                  <p>Transfer</p>
                </button>
              </div>
              <div onClick={() => router.push('/top-up')} className="h-10 w-32 flex items-center justify-center  cursor-pointer">
                <button type="button" className="btn flex items-center justify-center  cursor-pointer gap-2 font-bold bg-orange-400 border-white hover:bg-orange-400 hover:border-white border-2 rounded-lg h-10 w-32 text-white">
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
                    <p className="font-bold">No Available</p>
                  </div>
                  <div>
                    <ArrowUp className="text-red-500" />
                    <p>Expense</p>
                    <p className="font-bold">No Available</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Image src={require('../assets/images/graphic.png')} alt='graphic' className="w-4/5" width={100} height={100} />
                </div>
              </div>
              <div className="flex justify-center gap-3 px-5 py-5 md:hidden">
                <div onClick={() => router.push('/transfer')} className="flex w-full items-center justify-center  cursor-pointer">
                  <button className="btn flex py-3 w-full items-center justify-center  cursor-pointer gap-2 font-bold bg-orange-400 border-white hover:bg-orange-400 hover:border-white border-2 rounded-lg text-white">
                    <ArrowUp />
                    <p>Transfer</p>
                  </button>
                </div>
                <div onClick={() => router.push('/top-up')} className="flex w-full items-center justify-center  cursor-pointer">
                  <button className="btn flex py-3 w-full items-center justify-center  cursor-pointer gap-2 font-bold bg-orange-400 border-white hover:bg-orange-400 hover:border-white border-2 rounded-lg text-white">
                    <Plus />
                    <p>Top Up</p>
                  </button>
                </div>
              </div>

              {/* Transactions History */}
              <div className="md:flex-[45%] md:bg-white md:shadow md:p-5 md:rounded-xl">
                <div className="flex items-center mb-8 px-5 md:px-0 mt-5 md:mt-0">
                  <p className="flex-1 font-bold">Transaction History</p>
                  <Link href='/history' className="text-sm font-bold text-primary hover:underline">See All</Link>
                </div>
                <div className="flex flex-col gap-3 md:gap-5 pb-10 md:pb-0">
                  {transactions?.map((transaction, index) => {
                    return (
                      <div key={Number(index)} className="flex items-center bg-white shadow md:bg-transparent md:shadow-none p-5 md:p-0 rounded-lg md:rounded-0">
                        <div className="w-10 h-10 rounded mr-2">
                         <Image src={transaction?.recipientPicture ? `https://68xkph-8888.preview.csb.app/upload/${transaction?.recipientPicture}` : require('../assets/images/user.png')} className='w-10 h-10 rounded-full' alt='photo-profile' width={100} height={100} />
                        </div>
                        <div className="flex-1">
                          <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap">{transaction?.recipientname}</p>
                          {transaction?.sendername === ' ' ? <p className="text-sm">Top Up</p> : false}
                          {transaction?.sendername === fullName ? <p className="text-sm">Transfer</p> : false}
                        </div>
                        <div className="flex-2">
                          {transaction?.sendername === ' ' ? <p className="text-green-500 font-bold">+Rp{new Intl.NumberFormat('en-DE').format(transaction?.amount)}</p> : false}
                          {transaction?.sendername === fullName ? <p className="text-red-500 font-bold">-Rp{new Intl.NumberFormat('en-DE').format(transaction?.amount)}</p> : false}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
          </div>
        </>}
      </div>
    </section>

    <Footer />
    </div>
  )
}


export default withAuth(Home)
