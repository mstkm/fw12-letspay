import React from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowUp, Bell } from 'react-feather'
import User from '../images/user.png'
import { useRouter } from 'next/router'
import http from '../../helper/http'

const Header = (token) => {
  const router = useRouter()
  const userToken = token?.token

  // Get USer
  const [user, setUser] = React.useState({})
  React.useEffect(()=> {
    getUser().then((data)=> {
      setUser(data)
    })
  }, [])
  const getUser = async () => {
    try {
      const {data} = await http(userToken).get('/profile')
      setUser(data?.results)
      return data?.results
    } catch (error) {
      console.log(error)
    }
  }
  const fullName = `${user?.firstName} ${user?.lastName}`

  // Get List Transaction
  const [notifications, setNotifications] = React.useState([])
  React.useEffect(() => {
    getNotifications()
  }, [])
  const getNotifications = async () => {
    try {
      const response = await http(userToken).get('/transactions/notification?page=1&limit=5')
      setNotifications(response?.data?.results)
    } catch(error) {
      console.log(error)
    }
  }
  // Show Notification
  const [showNotification, setShowNotification] = React.useState(false)
  const showNotificationHandle = () => {
    if (showNotification === false) {
      setShowNotification(true)
    } else {
      setShowNotification(false)
    }
  }


  return(
    <>
    <section className="hidden md:flex items-center bg-primary md:bg-white rounded-b-3xl drop-shadow-md font-primary px-5 md:px-28 py-8">
      <div onClick={() => router.push('/home')} className="flex-1 cursor-pointer">
        <h1 className="font-bold text-3xl text-primary">FazzPay</h1>
      </div>
      <div className="mr-3 bg-slate-300 p-2 rounded">
        <Image src={User} className='w-8' alt='photo-profile'/>
      </div>
      <div>
        <h5 className='font-bold'>{fullName}</h5>
        <p>{user?.phoneNumber}</p>
      </div>
      <div className="ml-8">
        <Bell onClick={showNotificationHandle} className="text-white md:text-secondary cursor-pointer"/>
      </div>
    </section>

    {showNotification ?
    <section className='px-28 py-1 flex justify-end'>
      <div className='absolute w-fit bg-white top-10 shadow flex flex-col gap-5 p-5 font-primary rounded-xl'>
        {notifications?.map((notification, index) => {
          return(
            <div key={Number(index)} className='flex gap-3 bg-white shadow rounded py-3 px-5'>
              <div>
                {notification.type === 'CREDIT' ? <ArrowDown className='text-green-500'/> : <ArrowUp className='text-red-500'/>}
              </div>
              <div className='flex-1'>
                <p className=''>{notification.notes}</p>
                <p className='font-bold'>{notification.amount}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section> : false
    }


    </>
  )
}

export default Header
