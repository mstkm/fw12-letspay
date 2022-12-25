import Image from 'next/image'
import { Bell } from 'react-feather'
import User from '../images/user.png'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()

  return(
    <section className="hidden md:flex items-center bg-primary md:bg-white rounded-b-3xl drop-shadow-md font-primary px-5 md:px-28 py-8">
      <div onClick={() => router.push('/home')} className="flex-1 cursor-pointer">
        <h1 className="font-bold text-3xl text-primary">FazzPay</h1>
      </div>
      <div className="mr-3 bg-slate-300 p-2 rounded">
        <Image src={User} className='w-8' alt='photo-profile'/>
      </div>
      <div>
        <h5 className='font-bold'>Robert Chandler</h5>
        <p>+62 8139 3877 7946</p>
      </div>
      <div className="ml-8">
        <Bell className="text-white md:text-secondary"/>
      </div>
    </section>
  )
}

export default Header
