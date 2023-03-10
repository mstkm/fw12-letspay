import React from 'react'
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { ArrowLeft, ArrowUp, Grid, Plus, User, LogOut, Edit2, ArrowRight } from "react-feather"
import { useDispatch, useSelector } from 'react-redux'
import http from '../helper/http'
import withAuth from '../components/hoc/withAuth'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { logoutUser as logoutUserAction} from '../redux/reducers/auth'
import { Oval } from 'react-loader-spinner'

const Profile = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state?.auth?.token)
  const router = useRouter()
  const [toggleNotification, setToggleNotification] = React.useState(true)
  const clickToggle = () => {
    if (toggleNotification === true) {
      setToggleNotification(false)
    } else {
      setToggleNotification(true)
    }
  }

  // Get user
  const [user, setUser] = React.useState({})
  const [userPicture, setUserPicture] = React.useState(null)
  const fullName = `${user?.firstName} ${user?.lastName}`
  React.useEffect(() => {
    getUser().then((data) => {
      setUser(data)
    } )
  }, [])
  const getUser = async () => {
    try {
      const response = await http(token).get('/profile')
      setUserPicture(response?.data?.results?.picture)
      return response?.data?.results
    } catch (error) {
      const errorMessage = error?.response?.data?.message
      console.log(errorMessage)
    }
  }

  // Upload picture
  const [showModal, setShowModal] = React.useState(false)
  const [file, setFile] = React.useState(null)
  const [loadingUpload, setLoadingUpload] = React.useState(false)
  const [successUpload, setSuccessUpload] = React.useState(null)
  const [failedUpload, setFailedUpload] = React.useState(null)
  const choosePicture = (picture) => {
    setFile(picture)
    setSuccessUpload(null)
    setFailedUpload(null)
  }
  const handleUploadPicture = async () => {
    setLoadingUpload(true)
    setSuccessUpload(null)
    setFailedUpload(null)
    if (file?.size < (5024 * 1024)) {
      try {
        const form = new FormData()
        form.append('picture', file)
        const response = await http(token).post('/profile', form)
        console.log(response)
        setUserPicture(response?.data?.results?.picture)
        setLoadingUpload(false)
        setSuccessUpload(response?.data?.message)
        setTimeout(() => {
          setSuccessUpload(false)
          setShowModal(false)
        }, 3000)
        return response
      } catch (error) {
        console.log(error)
        setLoadingUpload(false)
        setFailedUpload(error?.response?.data?.message)
      }
    } else if (file) {
      setLoadingUpload(false)
      setFailedUpload('File too large. Max 5 MB.')
    } else {
      setLoadingUpload(false)
      setFailedUpload('File not found, Choose file!')
    }
  }

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutUserAction())
  }

  return(
    <div className="bg-orange-100 relative">
    <Head>
      <title>Profile | LetsPay</title>
    </Head>

    <Header picture={userPicture} />

    {showModal && <div className='bg-black/50 z-10 fixed top-0 h-full w-full flex justify-center items-center'>
      <div className='bg-white p-8 rounded-md'>
        <input onChange={e => choosePicture(e.target.files[0])} type='file' accept='image/png, image/jpeg, image/jpg' className='file:btn file:bg-primary file:border-primary hover:file:bg-primary hover:file:border-primary file:normal-case' />
        <div className='my-8 flex justify-center gap-5'>
          <button onClick={() => setShowModal(false)} className='btn btn-sm'>Cancel</button>
          <button onClick={handleUploadPicture} className='btn btn-sm bg-primary border-primary hover:bg-primary hover:border-primary'>Upload</button>
        </div>
        {loadingUpload &&
        <div className='flex justify-center'>
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
        {successUpload && <p className='text-center text-green-600'>{successUpload}</p>}
        {failedUpload && <p className='text-center text-red-600'>{failedUpload}</p>}
      </div>
    </div>}

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
          <div className="flex items-center gap-5 px-8 text-primary font-bold border-l-2 border-primary cursor-pointer mb-8">
            <User />
            <p>Profile</p>
          </div>
        </div>
        <div onClick={handleLogout}>
          <div className="flex items-center gap-5 px-8 hover:text-primary hover:font-bold hover:border-l-2 hover:border-primary cursor-pointer">
            <LogOut />
            <p>Logout</p>
          </div>
        </div>
      </div>

      <div className="flex-[70%] flex flex-col gap-5 md:bg-white md:shadow rounded-xl p-8">
        {!user?.firstName &&
        <div>
          <Skeleton height={400} />
        </div>}
        {user?.firstName &&
        <div>
        <div className='md:hidden'>
          <ArrowLeft onClick={() => router.push('/home')} />
        </div>
        <div className='flex flex-col items-center gap-5'>
          <div className='flex flex-col items-center'>
            <Image src={userPicture ?  `https://68xkph-8888.preview.csb.app/upload/${userPicture}` : require('../assets/images/user.png')} alt='profile' className='mb-2 rounded-full w-[100px] h-[100px]' width="100" height="150" />
            <div onClick={() => setShowModal(true)} className='flex gap-2 items-center cursor-pointer'>
              <Edit2 className='w-3'/>
              <p className='text-sm'>Edit</p>
            </div>
            <h3 className='font-bold py-2'>{fullName}</h3>
            <p>{user?.phoneNumber}</p>
          </div>
          <div onClick={() => router.push('/personal-information')} className='flex items-center px-3 w-full md:w-3/5 h-12 btn bg-slate-300 border-slate-300 text-start text-black hover:bg-slate-300 hover:border-slate-300 rounded-lg cursor-pointer active:border-2'>
            <p className='flex-1 font-bold'>Personal Information</p>
            <ArrowRight />
          </div>
          <div onClick={() => router.push('/change-password')} className='flex items-center px-3 w-full md:w-3/5 h-12 btn bg-slate-300 border-slate-300 text-start text-black hover:bg-slate-300 hover:border-slate-300 rounded-lg cursor-pointer active:border-2'>
            <p className='flex-1 font-bold'>Change Password</p>
            <ArrowRight />
          </div>
          <div onClick={() => router.push('/change-pin')} className='flex items-center px-3 w-full md:w-3/5 h-12 btn bg-slate-300 border-slate-300 text-start text-black hover:bg-slate-300 hover:border-slate-300 rounded-lg cursor-pointer active:border-2'>
            <p className='flex-1 font-bold'>Change PIN</p>
            <ArrowRight />
          </div>
          <div className='flex md:hidden items-center px-3 w-full md:w-3/5 h-12 bg-slate-300 rounded-lg cursor-pointer active:border-2'>
            <p className='flex-1 font-bold'>Notification</p>
            <div onClick={clickToggle} className={`flex items-center w-12 h-6 ${toggleNotification ? 'bg-primary justify-end' : 'bg-slate-500 justify-start'} rounded-xl px-1`}>
              <div className='h-4 w-4 rounded-full bg-white'></div>
            </div>
          </div>
          <div onClick={handleLogout} className='flex items-center px-3 w-full md:w-3/5 h-12 btn bg-slate-300 border-slate-300 text-start text-black hover:bg-slate-300 hover:border-slate-300 rounded-lg cursor-pointer active:border-2'>
            <p className='flex-1 font-bold'>Logout</p>
          </div>
        </div>
        </div>}
      </div>
    </section>

    <Footer />
    </div>
  )
}

export default withAuth(Profile)
