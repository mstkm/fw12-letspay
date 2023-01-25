import React from 'react'
import Image from 'next/image'
import { Bell } from 'react-feather'
import { useRouter } from 'next/router'
import http from '../helper/http'
import ListNotifications from './ListNotifications'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux'

const Header = picture => {
  const router = useRouter()
  const userToken = useSelector(state => state?.auth?.token)
  const profilePicture = picture?.picture

  // Get USer
  const [userPicture, setUserPicture] = React.useState()
  const [user, setUser] = React.useState({})
  React.useEffect(() => {
    getUser().then((data) => {
      setUser(data)
    })
  }, [])
  const getUser = async () => {
    try {
      const { data } = await http(userToken).get('/profile')
      setUser(data?.results)
      setUserPicture(data?.results?.picture)
      return data?.results
    } catch (error) {
      console.log(error)
    }
  }
  const fullName = `${user?.firstName} ${user?.lastName}`

  // Show Notification
  const [showNotification, setShowNotification] = React.useState(false)
  const showNotificationHandle = () => {
    if (showNotification === false) {
      setShowNotification(true)
    } else {
      setShowNotification(false)
    }
  }

  return (
    <>
      <section className="hidden md:flex items-center bg-primary md:bg-white rounded-b-3xl drop-shadow-md font-primary px-5 md:px-28 py-8">
        <div className="flex-1 cursor-pointer">
          <h1 onClick={() => router.push('/home')} className="font-bold text-3xl text-primary w-fit">LetsPay</h1>
        </div>
        {user?.firstName &&
          <div className='h-10'>
            <Skeleton height={48} />
          </div>}
        {user?.firstName &&
          <>
            <div className="mr-3 rounded">
              <Image src={profilePicture ? `https://68xkph-8888.preview.csb.app/upload/${profilePicture}` :(user?.picture ? `https://68xkph-8888.preview.csb.app/upload/${user?.picture}` : require('../assets/images/user.png'))} className='w-12 h-12 rounded-full' alt='photo-profile' width={80} height={80} />
            </div><div>
              <h5 className='font-bold'>{fullName}</h5>
              <p>{user?.phoneNumber}</p>
            </div>
          </>}
        <div className="ml-8">
          <Bell onClick={showNotificationHandle} className="text-white md:text-secondary cursor-pointer" />
        </div>
      </section>

      {showNotification ?
        <section className='px-28 py-1 flex justify-end z-[100]'>
          <div className='absolute bg-white top-50 shadow flex flex-col gap-3 p-5 font-primary rounded-xl z-10'>
            <ListNotifications />
          </div>
        </section> : false}

    </>
  )
}

export default Header
