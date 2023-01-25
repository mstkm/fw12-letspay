import React from 'react'
import Head from "next/head"
import { useRouter } from "next/router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { ArrowLeft, ArrowUp, Grid, Plus, User, LogOut, Phone } from "react-feather"
import { useSelector } from 'react-redux'
import http from '../helper/http'
import withAuth from '../components/hoc/withAuth'
import { Oval } from  'react-loader-spinner'

const UpdatePhoneNumber = () => {
  const router = useRouter()
  const token = useSelector((state) => state?.auth?.token)
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [alertEditPhoneNumber, setAlertEditPhoneNumber] = React.useState(false)
  const [alertErrorPhoneNumber, setAlertErrorPhoneNumber] = React.useState(false)

  // Update phone number
  const [user, setUser] = React.useState.apply({})
  const [loadingLogin, setLoadingLogin] = React.useState(false)
  React.useEffect(() => {
    updatePhoneNumber().then((response) => {
      setUser(response)
    })
  }, [])
  const updatePhoneNumber = async (e) => {
    if (e && e.preventDefault) { e.preventDefault() }
    if (phoneNumber) {
      setLoadingLogin(true)
      console.log('Hello')
      setAlertEditPhoneNumber(false)
      setAlertErrorPhoneNumber(false)
      try {
        const response = await http(token).post('/profile/phone-number',
        {phoneNumber})
        if (phoneNumber) {
          setLoadingLogin(false)
          setAlertEditPhoneNumber(true)
        }
        setUser(response)
        return response
      } catch(error) {
        console.log(error)
        setLoadingLogin(false)
        setAlertErrorPhoneNumber(true)
      }
    }
  }

  return(
    <div className="bg-orange-100 h-full">
    <Head>
      <title>Manage Phone Number | LetsPay</title>
    </Head>

    <Header token={token} />

    <section className="flex flex-col md:flex-row gap-5 font-primary text-secondary md:px-28 py-5 md:py-10">
      {/* Menu */}
      <div className="hidden md:flex flex-col flex-[30%] bg-white shadow rounded-xl py-8">
        <div className="flex-1">
          <div onClick={() => router.push('/home')} className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer mb-8">
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
          <div onClick={() => router.push('/profile')} className="flex items-center gap-5 px-8 text-primary font-bold border-l-2 border-primary cursor-pointer mb-8">
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

      <div className="flex-[70%] flex flex-col gap-5 md:bg-white md:shadow rounded-xl p-8">
        <div className='flex gap-5'>
          <ArrowLeft onClick={() => router.push('/personal-information')} className='md:hidden'/>
          <h3 className='font-bold'>Edit Phone Number</h3>
        </div>
        <p>Add at least one phone number for the transfer ID so you can start transfering your money to another user.</p>
        <form onSubmit={e => updatePhoneNumber(e)} className='relative flex flex-col items-center gap-8 py-10'>
          {alertErrorPhoneNumber ? <p className='absolute top-0 text-red-500'>Phone number already exist</p> : false}
          <div className={`flex items-center gap-5 border-b-2 ${phoneNumber.length ? 'border-primary' : ''} pb-2`}>
            <div>
              <Phone className={`${phoneNumber.length ? 'text-primary' : ''}`}/>
            </div>
            <div>
              <select className='appearance-none bg-transparent focus:outline-none font-bold'>
                <option>+62</option>
              </select>
              <input onChange={(e) => setPhoneNumber('0'+e.target.value) & setAlertErrorPhoneNumber(false)} type='text' name='phoneNumber' placeholder='Enter your phone number' className='pl-3 bg-transparent focus:outline-none'/>
            </div>
          </div>
          <div className='flex-1 flex flex-col items-center gap-3 w-full py-5'>
            {loadingLogin && <div className='mb-8 flex justify-center'>
              <Oval
                height={25}
                wdivth={25}
                color="#FF5F00"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#fACEB6"
                strokeWidth={5}
                strokeWidthSecondary={5}
              />
            </div>}
            {phoneNumber?.length ?
            <button type='submit' className='btn bg-primary border-primary hover:bg-primary hover:border-primary md:w-2/4 w-full h-12 text-white font-bold rounded-xl'>Edit Phone Number</button> :
            <button disabled className='bg-gray-200 text-gray-300 md:w-2/4 w-full h-12 font-bold rounded-xl'>Edit Phone Number</button>}
            {alertEditPhoneNumber &&
            <div className='text-center absolute bottom-0'>
              <p className='text-green-500'>{user?.data?.message}</p>
              <p onClick={()=> router.push('/personal-information')} className='text-blue-500 hover:font-bold cursor-pointer'>Back to personal information</p>
            </div> }
          </div>
        </form>
      </div>
    </section>

    <Footer />
    </div>
  )
}

export default withAuth(UpdatePhoneNumber)
