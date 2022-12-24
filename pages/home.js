import Head from "next/head"
import Image from "next/image"
import { Bell, Grid, ArrowUp, Plus, User, LogOut, ArrowDown } from "react-feather"
import Link from "next/link"

const Home = () => {
  return(
    <div className="bg-orange-100">
    <Head>
      <title>Home | Fazzpay</title>
    </Head>

    <section className="flex items-center bg-primary md:bg-white rounded-b-3xl drop-shadow-md font-primary px-5 md:px-32 py-8">
      <div className="md:flex-1">
        <h1 className="hidden md:block font-bold text-3xl text-primary">FazzPay</h1>
      </div>
      <div className="mr-3 bg-slate-300 p-2 rounded">
        <Image src={require('../assets/images/user.png')} className='w-8' alt='photo-profile'/>
      </div>
      <div className="hidden md:block">
        <h5>Robert Chandler</h5>
        <p>+62 8139 3877 7946</p>
      </div>
      <div className="flex-1 md:hidden">
        <p className="text-sm text-slate-500">Balance</p>
        <h5 className="font-bold text-lg text-white md:text-secondary">Rp120.000</h5>
      </div>
      <div className="ml-8">
        <Bell className="text-white md:text-secondary"/>
      </div>
    </section>

    <section className="flex gap-5 font-primary md:px-32 md:py-10 text-secondary">
      <div className="hidden md:flex flex-col flex-[30%] bg-white shadow rounded-xl py-8">
        <div className="flex-1">
          <div className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer mb-8">
            <Grid />
            <p>Dashboard</p>
          </div>
          <div className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer mb-8">
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

    <footer className="hidden md:flex gap-10 bg-primary text-white px-32 py-5">
      <p className="flex-1">2020 FazzPay. All right reserved.</p>
      <p>+62 5637 8882 9901</p>
      <p>contact@fazzpay.com</p>
    </footer>
    </div>
  )
}


export default Home
