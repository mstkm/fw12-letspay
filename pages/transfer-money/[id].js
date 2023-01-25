import React from 'react'
import Head from 'next/head'
import Image from "next/image"
import { useRouter } from "next/router"
import Header from '../../components/Header'
import Footer from "../../components/Footer"
import { ArrowLeft, ArrowUp, Grid, Plus, User, LogOut, Edit2 } from "react-feather"
import UserPNG from '../../assets/images/user.png'
import { useSelector, useDispatch } from 'react-redux'
import {transfer} from '../../redux/reducers/transfer'
import http from '../../helper/http'
import CurrencyInput from 'react-currency-input-field'

const TransferMoney = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const token = useSelector((state) => state?.auth?.token)
  const [amount, setAmount] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const recipientId = router.query['id']
  const [alertAmount, setAlertAmount] = React.useState(false)

  // Get Recipient
  const [recipient, setRecipient] = React.useState({})
  React.useEffect(()=>{
    getRecipient()
  }, [recipientId])
  const getRecipient = async () => {
    try {
      const response = await http(token).get(`/transactions/recipient/${recipientId}`)
      setRecipient(response?.data?.results)
    } catch(error) {
      console.log(error)
    }
  }

  // Get User
  const [user, setUser] = React.useState({})
  React.useEffect(()=>{
    getUser()
  }, [])
  const getUser = async () => {
    try {
      const response = await http(token).get('/profile')
      setUser(response?.data?.results)
    } catch(error) {
      console.log(error)
    }
  }

  // // Dispatch transfer
  const continueTransfer = () => {
    try {
      if ((amount > 0) && (amount <= user?.balance)) {
        dispatch(transfer({amount, recipientId, notes}))
        router.push('/transfer-confirmation')
      } else {
        setAlertAmount(true)
      }
    } catch(error) {
      console.log(error)
    }
  }

  return(
    <div className="bg-orange-100 h-full">
    <Head>
      <title>Transfer | LetsPay</title>
    </Head>

    <Header token={token} />

    <section className="px-5 pt-10 pb-5 bg-primary rounded-b-3xl font-primary md:hidden">
      <div onClick={() => router.push('/home')} className="flex items-center gap-5 text-white mb-5">
        <ArrowLeft />
        <h3 className="font-bold">Transfer</h3>
      </div>
      <div className="flex items-center bg-white shadow p-3 rounded cursor-pointer">
          <div className="bg-slate-300 w-10 h-10 rounded mr-3">
            <Image src={UserPNG} alt='user' className="w-10 h-10 p-1" />
          </div>
          <div className="flex-1">
            <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap font-bold">{`${recipient?.firstName} ${recipient?.lastName}`}</p>
            <p>{recipient?.phoneNumber}</p>
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

    {/* Transfer */}
      <div className="flex-[70%] md:flex flex-col gap-8 md:bg-white md:shadow rounded-xl p-5">
        <div className="hidden md:flex flex-col gap-5">
          <div className="flex-1">
            <h3 className="font-bold">Transfer Money</h3>
          </div>
        </div>
        <div className="hidden md:flex items-center bg-white shadow p-3 rounded cursor-pointer">
          <div className="bg-slate-300 w-10 h-10 rounded mr-3">
            <Image src={UserPNG} alt='user' className="w-10 h-10 p-1" />
          </div>
          <div className="flex-1">
            <p className="w-[115px] text-ellipsis overflow-hidden whitespace-nowrap font-bold">{`${recipient?.firstName} ${recipient?.lastName}`}</p>
            {(recipient?.phoneNumber) ? <p>{recipient?.phoneNumber}</p> : <p>-</p>}
          </div>
        </div>
        <div className='hidden md:block'>
          <p className="w-2/4">Type the amount you want to transfer and then press continue to the next steps.</p>
        </div>
        <div className="relative flex flex-col items-center gap-5 md:py-10 mb-10 md:mb-0">
          {alertAmount && <p className='absolute top-0 text-red-500'>The amount is out of bounds</p>}
          <div>
          <CurrencyInput
            id="input-example"
            name="input-name"
            placeholder="0.00"
            decimalSeparator=','
            groupSeparator='.'
            defaultValue=''
            decimalsLimit={2}
            onValueChange={(value, name) => setAmount(Number(value))}
            className="text-center bg-transparent text-primary text-3xl font-bold focus:outline-none"
          />
          </div>
          <p className="font-bold py-5">Rp{new Intl.NumberFormat('en-DE').format(user?.balance)} Available</p>
          <div className={`relative border-b-2 ${notes?.length ? 'border-primary' : ''} py-2`}>
            <Edit2 className={`absolute ${notes?.length ? 'text-primary' : ''}`} />
            <input onChange={(e) => setNotes(e.target.value)} type='text' name='notes' placeholder="Add some notes" className="pl-10 focus:outline-none bg-transparent"/>
          </div>
        </div>
        <div className="flex justify-end">
          <div onClick={continueTransfer} className="flex justify-center items-center w-full md:w-32 h-12">
            <button className="btn bg-primary border-primary hover:bg-primary hover:border-primary w-full h-12 rounded-xl text-white font-bold">Continue</button>
          </div>
        </div>
      </div>
    </section>

    <Footer />
    </div>
  )
}

export default TransferMoney
