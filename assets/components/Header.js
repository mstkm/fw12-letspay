import Image from 'next/image'
import { Bell } from 'react-feather'
import User from '../images/user.png'

const Header = () => {
  return(
    <section className="flex items-center bg-primary md:bg-white rounded-b-3xl drop-shadow-md font-primary px-5 md:px-32 py-8">
    <div className="md:flex-1">
      <h1 className="hidden md:block font-bold text-3xl text-primary">FazzPay</h1>
    </div>
    <div className="mr-3 bg-slate-300 p-2 rounded">
      <Image src={User} className='w-8' alt='photo-profile'/>
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
  )
}

export default Header
