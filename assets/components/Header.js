import React from 'react'
import Image from 'next/image'
import { Bell } from 'react-feather'
import User from '../images/user.png'
import { useRouter } from 'next/router'
import http from '../../helper/http'

const Header = (token) => {
  const router = useRouter()
  const userToken = token?.token
  console.log()
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


  return(
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
        <Bell className="text-white md:text-secondary"/>
      </div>
    </section>
  )
}

export default Header
