import Head from "next/head"
import Image from "next/image"
import { Bell, Grid, ArrowUp, Plus, User, LogOut, ArrowDown } from "react-feather"
import Link from "next/link"
import Header from "../assets/components/Header"
import Footer from "../assets/components/Footer"
import Menu from "../assets/components/Menu"

const Home = () => {
  return(
    <div className="bg-orange-100">
    <Head>
      <title>Home | Fazzpay</title>
    </Head>

    <Header />

    <section className="flex gap-5 font-primary md:px-32 md:py-10 text-secondary">
      <Menu />
      <div className="flex-[70%] flex flex-col gap-5">
        <div className="hidden md:flex items-center bg-primary shadow p-5 rounded-xl">
          <div className="flex-1 text-white">
            <p>Balance</p>
            <p className="text-4xl font-bold py-2">Rp120.000</p>
            <p>+62 813-9387-7946</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-10 w-32 flex items-center justify-center  cursor-pointer">
              <button className="flex items-center justify-center  cursor-pointer gap-2 font-bold bg-orange-400 border-2 rounded-lg h-10 w-32 text-white border-white active:h-8 active:w-28 active:text-sm">
                <ArrowUp />
                <p>Transfer</p>
              </button>
            </div>
            <div className="h-10 w-32 flex items-center justify-center  cursor-pointer">
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
            <div className="flex w-full items-center justify-center  cursor-pointer">
              <button className="flex py-3 w-full items-center justify-center  cursor-pointer gap-2 font-bold bg-orange-400 border-2 rounded-lg text-white border-white active:h-8 active:w-28 active:text-sm">
                <ArrowUp />
                <p>Transfer</p>
              </button>
            </div>
            <div className="flex w-full items-center justify-center  cursor-pointer">
              <button className="flex py-3 w-full items-center justify-center  cursor-pointer gap-2 font-bold bg-orange-400 border-2 rounded-lg text-white border-white active:h-8 active:w-28 active:text-sm">
                <Plus />
                <p>Top Up</p>
              </button>
            </div>
          </div>
          <div className="md:flex-[45%] md:bg-white md:shadow md:p-5 md:rounded-xl">
            <div className="flex items-center mb-8 px-5 md:px-0 mt-5 md:mt-0">
              <p className="flex-1 font-bold">Transaction History</p>
              <Link href='' className="text-sm font-bold text-primary hover:underline">See All</Link>
            </div>
            <div className="flex flex-col gap-3 md:gap-5 pb-10 md:pb-0">
              <div className="flex items-center bg-white shadow md:bg-transparent p-5 md:p-0 rounded-lg md:rounded-0">
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
              <div className="flex items-center bg-white shadow md:bg-transparent p-5 md:p-0 rounded-lg md:rounded-0">
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
              <div className="flex items-center bg-white shadow md:bg-transparent p-5 md:p-0 rounded-lg md:rounded-0">
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
              <div className="flex items-center bg-white shadow md:bg-transparent p-5 md:p-0 rounded-lg md:rounded-0">
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