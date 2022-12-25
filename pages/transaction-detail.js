import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
import { ArrowLeft, ArrowDown, ArrowUp } from "react-feather"

const TransactionDetail = () => {
  return(
    <div className="bg-orange-100 md:hidden">
    <Head>
      <title>Transaction Detail | FazzPay</title>
    </Head>

    {/* Header */}
    <section className="font-primary text-white bg-primary rounded-b-3xl">
      <div className='flex gap-5 items-center px-5 py-8'>
        <ArrowLeft />
        <p  className="font-bold">Transaction</p>
      </div>
      <div className="flex items-center px-5 py-8">
        <div className="flex-1 flex gap-3">
          <div>
            <ArrowDown className="text-green-500"/>
          </div>
          <div>
            <p className="text-sm">Income</p>
            <p className="font-bold">Rp2.120.000</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div>
            <ArrowUp className="text-red-500"/>
          </div>
          <div>
            <p className="text-sm">Expense</p>
            <p className="font-bold">Rp1.560.000</p>
          </div>
        </div>
      </div>
    </section>

    {/* Graphic */}
    <section className="font-primary text-secondary px-5 py-8">
      <p className="font-bold mb-5">In This Week</p>
      <div>
        <Image src={require('../assets/images/graphic.png')} alt='graphic' className='w-full'/>
      </div>
    </section>

    {/* Transactions */}
    <section className="md:flex-[45%] md:bg-white md:shadow md:p-5 md:rounded-xl font-primary text-secondary">
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
    </section>

    </div>
  )
}

export default TransactionDetail
